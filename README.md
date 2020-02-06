babel-plugin-class-properties
======================

[![NPM version](https://img.shields.io/npm/v/babel-plugin-class-properties.svg)](https://www.npmjs.com/package/babel-plugin-class-properties)
[![NPM downloads](https://img.shields.io/npm/dm/babel-plugin-class-properties.svg)](https://www.npmjs.com/package/babel-plugin-class-properties)
[![Build Status](https://travis-ci.org/d-band/babel-plugin-class-properties.svg?branch=master)](https://travis-ci.org/d-band/babel-plugin-class-properties)
[![Coverage Status](https://coveralls.io/repos/github/d-band/babel-plugin-class-properties/badge.svg?branch=master)](https://coveralls.io/github/d-band/babel-plugin-class-properties?branch=master)
[![Dependency Status](https://david-dm.org/d-band/babel-plugin-class-properties.svg)](https://david-dm.org/d-band/babel-plugin-class-properties)
[![Greenkeeper badge](https://badges.greenkeeper.io/d-band/babel-plugin-class-properties.svg)](https://greenkeeper.io/)

## Install

```bash
$ npm install --save-dev babel-plugin-class-properties
```

## Usage

```json
{
  "plugins": [
    ["babel-plugin-class-properties", {
      "all": true,
      "props": [{
        "key": "name",
        "static": true
      }, {
        "key": "foo",
        "value": "2 + 3"
      }]
    }]
  ]
}
```

## Options

| Name | Type | Default | Description |
| :--: | :--: | :-----: | :---------- |
| `all` | `{Boolean}` | `false` | Is enabled for all classes |
| `classes` | `{Array[String]}` | `[]` | Is enabled for specify classes |
| `superClasses` | `{Array[String]}` | `[]` | Is enabled for specify superClasses |
| `props` | `{Array[Object]}` | `[]` | Class properties that need to be added |

#### `props`

- `key`: `String` (required)
- `value`: `String | Function` (default: `null`)
- `computed`: `Boolean` (default: `false`)
- `static`: `Boolean` (default: `false`)