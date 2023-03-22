
<hr>

<h1 align="center">
  <br>
  <a href="http://txpipe.io"><img src="assets/logo.svg" alt="TxPipe" width="100"></a>
  <br>
  Starter Kits
  <br>
</h1>

<h4 align="center">A community-driven list of starter-kit code repositories that can be used with Demeter.run.</h4>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#license">License</a>
</p>
<hr>

## Introduction

Starter kits are example code repositories that you can use for learning or as starting point for your own projects.
Each kit aims to solve a specific task and uses a particular tech stack. Once you find a kit that fits your needs, you can use it to create your own personal workspace in <a href="http://demeter.run" target="_blank">Demeter.run</a> based off that code template.

This repository works as an index of available Starter-Kits which are available and listed in  <a href="http://demeter.run" target="_blank">Demeter.run</a> platform.

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
$ mkdir kits/my-awesome-starter-kit

# Go into your new feature
cd kits/my-awesome-starter-kit
```

**4.** Add your Starter Kit metadata

Now you can create the file with the metadata for listing your starter kit. Metadata files are defined in <a href="https://yaml.org/" target="_blank">YAML</a> format:

```bash
# Create a new metadata file
$ touch metadata.yaml
```

You can always copy the metadata file from another starter kit into your folder and update the information in case you don't want to generate the metadata file from scratch.

Example format for your Starter Kit metadata:

<p align="right"><strong>metadata.yaml</strong></p>

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

#### Fields

| Name                | required | Description                                                                                                                        |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `title`             | required | the title to be displayed in the list of starter-kits                                                                              |
| `logo`              | required | a logo to be displayed next to your starter kit title                                                                              |
| `description`       | required | a short description indicating what is the scope of the starter kit                                                                |
| `repository`        | required | the link to the github repository to be used as a template. It needs to be publicly available.                                     |
| `features`          | optional | a list of features associated to this starter kit. See the list of available features below.                                       |
| `settings.template` | required | the image template to be used when building the workspace for running your starter kit. See the list of available templates below. |
| `settings.size`     | required | the size of the workspace to be created when running your starter kit. See the list of available sizes below.                      |
| `author.name`       | required | the name of the author                                                                                                             |
| `author.website`    | optional | the website of the author                                                                                                          |
| `author.logo`       | optional | a logo for the author                                                                                                              |
| `social.twitter`    | optional | the twitter handle for the author                                                                                                  |
| `social.discord`    | optional | the id of the author discord server                                                                                                |


#### Features

This is the list of currently available features in Demeter, use it as reference to tag your starter kit in the `features` field of the metadata file. Tagging your starter kit will allow us to recommend it in relevant sections of Demeter web console.

| Name                 | Description                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `nodes`              | Fully-synced nodes ready to be used through any of the available ports                         |
| `dbsync`             | Provides a relational view of Cardano on-chain data using a PostgreSQL database                |
| `ogmios`             | Provides a WebSocket API for clients to speak Ouroboros' mini-protocols via JSON/RPC.          |
| `containers`         | Provides docker containers hosting on the web.                                                 |
| `hydra`              | Hydra head instances that can be shared among different peers in the cluster                   |
| `kuber`              | Haskell library and API server for composing balanced Cardano transactions.                    |
| `submitapi`          | Provides an HTTP endpoint to submit CBOR-encoded transactions onto the Node                    |
| `webhooks`           | Subscribe to events in the node                                                                |
| `workspaces`         | Provides custom cloud-based development environments based off on VSCode with access to a node |

#### Templates

This is the list of currently available workspace templates in Demeter, use it as reference to fill the `settings.template` field in your metadata file. A template defines the pre-determined set of dependencies installed by default in the workspace running your starter kit.

| Name         | Description                                                                               |
| ------------ | ----------------------------------------------------------------------------------------- |
| `plutus`     | VSCode + Haskell + GHC + Cabal + Nix. The latest Cardano derivations from IOHK Nix cache. |
| `haskell`    | VSCode + Haskell + GHC. Good for starting from scratch with the Haskell language.         |
| `typescript` | VSCode + NodeJS + Typescript. Good for creating frontends using Lucid or Mesh framework   |
| `rust`       | VSCode + Rust + Cargo. Good for creating projects using Pallas building blocks            |
| `golang`     | VSCode + Golang. Good for creating projects using CloudStruct Ouroboros library.          |
| `python`     | VSCode + Python 3.10. Good for creating projects using the PyCardano framework.            |

#### Sizes

This is the list of currently available workspace sizes in Demeter, use is as reference to fill the `settings.size` field in your metadata file. The size of the workspace defines the amount of resources (memory, cpu, disk) allocated to the instance. Unless you're aware that your starter kit has a high level of resource requirements, you should choose `small` as the prefered choice.

| Name   |
| ------ |
| small  |
| medium |
| large  |

## Starter Kit Information

If you want to include additional information about how to use your starter kit, you can add an additional markdown file inside of your starter kit folder.

```bash
# Create a new markdown file
$ touch readme.md
```

## Making your Starter Kit available

Once you have entered all the metadata for your starter kit you can open a pull-request to the main branch of this repository.
Once the pull-request is merged your starter kit will be automatically available and displayed in <a href="http://demeter.run" target="_blank">Demeter.run</a>

## Support

If you have questions join our discord server

[![Join our Discord server!](https://invidget.switchblade.xyz/ZTHcHUy5HY)](http://discord.gg/ZTHcHUy5HY)

## License

[MIT](LICENSE)
