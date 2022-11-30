
<hr>

<h1 align="center">
  <br>
  <a href="http://txpipe.io"><img src="assets/logo.svg" alt="TxPipe" width="100"></a>
  <br>
  Starter Kits
  <br>
</h1>

<h4 align="center">A list of Starter-Kits to help get your Cardano dapp started in no time.</h4>

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>

<hr>

## How To Use

To include your Starter Kit in <a href="http://demeter.run" target="_blank">Demeter.run</a> you need to submit a pull request to this repository with the information required to list your project.

**1.** Clone the repository

```bash
# Clone this repository
$ git clone https://github.com/txpipe/awesome-starter-kits.git

# Go into the repository
$ cd awesome-starter-kits
```

**2.** Create a new branch for adding the metadata with your Starter Kit information.

```bash
# Create a new branch
$ git checkout -b starter-kit/my-awesome-starter-kit
```

**3.** Create a new folder for your Starter Kit.

```bash
# Create a new directory
$ mkdir my-awesome-starter-kit

# Go into your new feature
cd my-awesome-starter-kit
```

**4.** Add your Starter Kit metadata
   
Now you can create the file with the metadata for listing your starter kit. Metadata files are defined in <a href="https://yaml.org/" target="_blank">YAML</a> format: 

```bash
# Create a new metadata file
$ touch metadata.yaml
```

You can always copy the metadata file from another starter kit into your folder and update the information in case you don't want to generate the metadata file from scratch.

Example format for your Starter Kit metadata:
```yaml
title: Name 
logo: URL for your starter-kit logo
description: A NodeJS package that provides several examples of how to leverage Ogmios typescript client to execute local-state-queries, chain-sync and tx-monitoring operations against a node.
repository: https://github.com/cardanosolutions/ogmios-client-starter-kit.git
features:
  - ogmios
settings:
  template: typescript
  size: small
author:
  name: TxPipe
  logo: https://demeter.run/assets/logos/txpipe.svg
social:
  twitter_handle: txpipe_tools
  discord: ZTHcHUy5HY
```

#### Features

| Name | Description |
| --- | --- |
| cardano-nodes | Fully-synced nodes ready to be used through any of the available ports |
| cardano-dbsync | Provides a relational view of Cardano on-chain data using a PostgreSQL database |
| cardano-ogmios | Provides a WebSocket API for clients to speak Ouroboros' mini-protocols via JSON/RPC. |
| cardano-containers | Provides docker containers hosting on the web. |
| cardano-hydra | Hydra head instances that can be shared among different peers in the cluster |
| cardano-kuber | Haskell library and API server for composing balanced Cardano transactions. |
| cardano-submitapi | Provides an HTTP endpoint to submit CBOR-encoded transactions onto the Node |
| cardano-webhooks | Subscribe to events in the node |
| cardano-workspaces | Provides custom cloud-based development environments based off on VSCode with access to a node |

#### Templates

| Name | Description |
| --- | --- |
| plutus | VSCode + Haskell + GHC + Cabal + Nix. The latest Cardano derivations from IOHK Nix cache. |
| haskell | VSCode + Haskell + GHC. Good for starting from scratch with the Haskell language. |
| typescript | VSCode + NodeJS + Typescript. Good for creating frontends using Berry-Pool's Lucid framework. |
| rust | VSCode + Rust + Cargo. Good for creating projects using Pallas building blocks |
| golang | VSCode + Golang. Good for creating projects using CloudStruct Ouroboros library. |
| python | VSCode + Python 3.8. Good for creating projects using the PyCardano framework. |

#### Sizes

| Name | Description |
| --- | --- |
| small |  |
| medium |  |
| large |  |

## Starter Kit Information 

If you want to include additional information about how to use your starter kit, you can add an additional markdown file inside of your starter kit folder. 

```bash
# Create a new markdown file
$ touch readme.md
```


## Support

If you have questions join our discord server

[![Join our Discord server!](https://invidget.switchblade.xyz/ZTHcHUy5HY)](http://discord.gg/ZTHcHUy5HY)

## License

MIT
