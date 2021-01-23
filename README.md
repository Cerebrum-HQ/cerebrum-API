[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Cerebrum

Cerebrum are on a miission to empower teacher to deliver high quality knowldge to students.

## Prerequisites

This project requires NodeJS (version 12.8.4 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v12.8.4
```

## Table of contents

- [Project Name](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Serving the app](#serving-the-app)
    - [Running the tests](#running-the-tests)
    - [Building a distribution version](#building-a-distribution-version)
    - [Serving the distribution version](#serving-the-distribution-version)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/Cerebrum-HQ/cerebrum-API.git
$ cd cerebrum-API
```

To install and set up the library, run:

```sh
$ npm install
```

## Usage

### Serving the app

```sh
$ npm start
```

### Running the tests

```sh
$ npm test
```

### Building a distribution version

```sh
$ npm run build
```

This task will create a distribution version of the project
inside your local `dist/` folder

### Serving the distribution version

```sh
$ npm run serve:dist
```

This will use `lite-server` for servign your already
generated distribution version of the project.

_Note_ this requires
[Building a distribution version](#building-a-distribution-version) first.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Authors

- **Njoli Patrick** - [ogmaro](https://github.com/ogmaro)

See also the list of [contributors](https://github.com/Cerebrum-HQ/cerebrum-API/graphs/contributors) who participated in this project.
