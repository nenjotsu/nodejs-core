# Ubidy_NodeCore

Nodejs API Core

## Clone the project

```bash
$ git clone https://github.com/Ubidy/Ubidy_NodeCore.git
```

## Installation

```bash
$ npm install @ubidy_devs/node-core --save
```

or

```bash
$ yarn add @ubidy_devs/node-core
```

## Upgrade from Node API (usage)

If there's an update in version you need to upgrade the version from the Node API that consume this package.

### Step 1

```bash
$ yarn upgrade-interactive
```

### Step 2

Select @ubidy_devs/node-core (using space bar) and click enter in windows or return in mac

OR

```bash
$ npm update @ubidy_devs/node-core@<SPECIFIC VERSION e.g. 1.2.3>
```

[Check the latest version](https://github.com/Ubidy/Ubidy_NodeCore/releases)

## Run in Development

This will run the development with build and watch test command

```bash
$ yarn dev
```

## Publishing

### Step 1 - Commit your changes

```bash
$ git add -A .
$ git commit -m "your comment message"
$ git pull origin master
$ git push --set-upstream origin <YOUR-BRANCH-NAME e.g. ROV-GEN-123>
```

### Step 2 - Build a compiled copy

```bash
$ npm run build
```

### Step 3 - Create a Pull Request

[Create](https://github.com/Ubidy/Ubidy_NodeCore/compare) a pull requests from `your branch` to `master branch`

### Step 4 - Publish a release using np

> **Note** : Please make sure you are in master branch and the codes are updated.

```bash
$ npm run release
```

<img src="https://raw.githubusercontent.com/sindresorhus/np/master/screenshot.gif" width="688">

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).  
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/Ubidy/Ubidy_NodeCore/releases) page.

## How to generate release notes

```bash
$ version=<latest version> npm run release:notes
// e.g.
$ version=1.0.28 npm run release:notes
```

## Want to contribute?

[Submit an issue](https://github.com/Ubidy/Ubidy_NodeCore/issues/new)

## License

MIT
