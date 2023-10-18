# Aiken Hello World Next.js TypeScript

Get started to write smart contracts on Cardano with Aiken and execute it with Mesh. 

[[Guide](https://meshjs.dev/guides/aiken)] [[Demo](https://aiken-next-ts-template.vercel.app/)]

## Getting Started

Start project locally using CLI:

```bash
npx create-mesh-app leap -t aiken -s next -l ts
```

Start your project on [Demeter](https://demeter.run/):

[![Code in Cardano Workspace](https://demeter.run/code/badge.svg)](https://demeter.run/code?repository=https://github.com/MeshJS/aiken-next-ts-template.git&template=typescript)

## Guide

Aiken is a functional programming language created for Cardano smart contract development. It prioritizes on-chain execution and offers a user-friendly approach for building secure and efficient smart contracts, making it a valuable choice for developers aiming to create robust on-chain applications.

In this tutorial, we will walk you through the process of writing a simple smart contract in Aiken, and create 2 transactions to lock and unlock assets on the Cardano blockchain.

You can also try the [live demo](https://aiken-template.meshjs.dev) and here are the codes on the GitHub [repository](https://github.com/MeshJS/aiken-next-ts-template/tree/main).

## System setup

This section will guide you through the process of setting up your system compile Aiken smart contracts. You can skip this section if you have already set up your system or do not wish to compile the contract.

### Install Rust and Cargo

Aiken is written in Rust, so you will need to install Rust and Cargo to compile the smart contract. You can install Rust and Cargo by following the instructions on the [Rust website](https://www.rust-lang.org/).

Next, you will need Cargo, the Rust package manager. You can install Cargo by following the instructions on the [Cargo website](https://doc.rust-lang.org/stable/book/ch01-01-installation.html).

You will know you have successfully installed Rust and Cargo when you can run the following commands in your terminal:

```bash
$ rustc --version
$ cargo --version
```

### Install the Aiken CLI

The Aiken CLI is a command-line tool that allows you to compile Aiken smart contracts. 

You can install the Aiken CLI by running the following command in your terminal:

```bash
$ curl -sSfL https://install.aiken-lang.org | bash
$ aikup
```

Check Aiken installation instructions on the [Aiken website](https://aiken-lang.org/installation-instructions) for more information.

You will know you have successfully installed the Aiken CLI when you can run the following command in your terminal:

```bash
$ aiken -V
```

## Writing a smart contract with Aiken

In this section, we will walk you through the process of writing a simple smart contract in Aiken. We will also create 2 transactions to lock and unlock assets on the Cardano blockchain.

You can read more about this example on the [Aiken website](https://aiken-lang.org/example--hello-world).

### Create a new project

First, we will create a new project. Please refer to [this guide](https://meshjs.dev/guides/nextjs) for more information on creating a new Next.js project.

Next, we create a new Aiken project within this project folder:

```bash
$ aiken meshjs/hello_world
$ cd hello_world
$ aiken check
```

Remember to check your Aiken project by running `aiken check` after creating a new project and as you develop the contract.

### Write the smart contract

Let's create file for our validator, `validators/hello_world.ak`:

```rust
use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}
 
type Datum {
  owner: Hash<Blake2b_224, VerificationKey>,
}
 
type Redeemer {
  msg: ByteArray,
}
 
validator {
  fn hello_world(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
    let must_say_hello =
      redeemer.msg == "Hello, World!"
 
    let must_be_signed =
      list.has(context.transaction.extra_signatories, datum.owner)
 
    must_say_hello && must_be_signed
  }
}
```

This validator checks that the redeemer message is "Hello, World!" and that the transaction is signed by the owner of the datum. If both conditions are met, the validator returns `true`. Otherwise, it returns `false`.

Let's compile the smart contract with the Aiken CLI:

```bash
$ aiken build
```

This command will compile the smart contract and generate the `plutus.json` file in the root folder. This file is a [CIP-0057 Plutus blueprint](https://github.com/cardano-foundation/CIPs/pull/258), blueprint describes your on-chain contract and its binary interface.

## Creating transactions

### Preparing the frontend

In this section, we will prepare the frontend for our smart contract. We will create a simple UI that allows users to lock and unlock assets on the Cardano blockchain.

Firstly, we need to install the `cbor` package:

```bash
$ npm install cbor
```

Then, we create a folder, `data` and copy the `plutus.json` file into it.

Next, open `pages/index.tsx` and import the following packages:

```js
import {
  resolvePlutusScriptAddress,
  Transaction,
  KoiosProvider,
  resolveDataHash,
  resolvePaymentKeyHash,
} from "@meshsdk/core";
import type { PlutusScript, Data } from "@meshsdk/core";
import { CardanoWallet, useWallet } from "@meshsdk/react";

import plutusScript from "../data/plutus.json";
import cbor from "cbor";
```

### Importing the contract

We import the contract into our frontend:

```js
const script: PlutusScript = {
  code: cbor
    .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
    .toString("hex"),
  version: "V2",
};
const scriptAddress = resolvePlutusScriptAddress(script, 0);
```

Here, we are using the `plutus.json` file to create the script. We are also using the `resolvePlutusScriptAddress` function to resolve the script address.

If you look at it closely, we are encoding with cbor the compiled code of the validator. This is because the validator is encoded in a flat format, which is not the format expected by the cardano-cli and `cardano serialization library`.

### Locking assets

We create the transactions to lock assets on the Cardano blockchain:

```js
const hash = resolvePaymentKeyHash((await wallet.getUsedAddresses())[0]);
const datum: Data = {
  alternative: 0,
  fields: [hash],
};

const tx = new Transaction({ initiator: wallet }).sendLovelace(
  {
    address: scriptAddress,
    datum: { value: datum },
  },
  "5000000"
);

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx);
const txHash = await wallet.submitTx(signedTx);
```

Here, we are creating a new transaction to lock assets on the Cardano blockchain. We are using the `resolvePaymentKeyHash` function to resolve the payment key hash of the wallet. We are also using the `sendLovelace` function to send lovelace to the script address.

As the contracts requires the owner's address in the datum field, we are creating a new datum with the owner's address. We are then using the `build` function to build the transaction, the `signTx` function to sign the transaction, and the `submitTx` function to submit the transaction to the Cardano blockchain.

### Unlocking assets

Next, we create the transactions to unlock assets.

First, we create a useful function to retrieve the UTXO of the locked assets:

```js
async function _getAssetUtxo({ scriptAddress, asset, datum }) {
  const utxos = await koios.fetchAddressUTxOs(scriptAddress, asset);

  const dataHash = resolveDataHash(datum);

  let utxo = utxos.find((utxo: any) => {
    return utxo.output.dataHash == dataHash;
  });

  return utxo;
}
```

And here are the codes to create the transactions to unlock assets:

```js
const scriptAddress = resolvePlutusScriptAddress(script, 0);

const address = (await wallet.getUsedAddresses())[0];
const hash = resolvePaymentKeyHash(address);
const datum: Data = {
  alternative: 0,
  fields: [hash],
};

const assetUtxo = await _getAssetUtxo({
  scriptAddress: scriptAddress,
  asset: "lovelace",
  datum: datum,
});
console.log("assetUtxo", assetUtxo);

const redeemer = { data: { alternative: 0, fields: ['Hello, World!'] } };

// create the unlock asset transaction
const tx = new Transaction({ initiator: wallet })
  .redeemValue({
    value: assetUtxo,
    script: script,
    datum: datum,
    redeemer: redeemer,
  })
  .sendValue(address, assetUtxo)
  .setRequiredSigners([address]);

const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx, true);
const txHash = await wallet.submitTx(signedTx);
```

Here, we are creating a new transaction to unlock assets on the Cardano blockchain. We are using the `resolvePlutusScriptAddress` function to resolve the script address. We are also using the `resolvePaymentKeyHash` function to resolve the payment key hash of the wallet.

As the contracts requires the owner's address in the datum field, we are creating a new datum with the owner's address. We are then using the `_getAssetUtxo` function to retrieve the UTXO of the locked assets. We are then using the `redeemValue` function to redeem the locked assets, the `sendValue` function to send the assets to the owner's address, and the `setRequiredSigners` function to set the required signers.

As the validator requires `Hello, World!` as the redeemer message, we are creating a new redeemer with the message `Hello, World!`. We are then using the `build` function to build the transaction, the `signTx` function to sign the transaction, and the `submitTx` function to submit the transaction to the Cardano blockchain.

You can check the full code on [GitHub](https://github.com/MeshJS/aiken-next-ts-template/blob/main/pages/index.tsx)

## Running the project

You can run the project by running the following command in your terminal:

```bash
$ npm run dev
```

You can also try the [live demo](https://aiken-template.meshjs.dev).

## Learn More

### [React components and hooks](https://meshjs.dev/react)

Frontend components for wallet connections, and useful React hooks to getting wallet states - Mesh provides everything you need to bring your Web3 user interface to life.

### [APIs](https://meshjs.dev/apis)

From wallet integrations to transaction builders, Mesh makes Web3 development easy with reliable, scalable, and well-engineered APIs & developer tools.

### [Guides](https://meshjs.dev/guides)

Whether you are new to web development or a seasoned blockchain full-stack developer, these guides will help you get started.

### [Aiken](https://aiken-lang.org/getting-started/hello-world)

The supporting tutorial for this start kit is available on the Aiken website.

## Connect with us

Follow us on [Twitter](https://twitter.com/meshsdk) for updates.

Join our [Discord](https://discord.gg/Z6AH9dahdH) for any questions and suggestions.