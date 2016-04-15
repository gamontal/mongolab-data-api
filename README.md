# mongolab-data-api [![Build Status](https://travis-ci.org/gmontalvoriv/mongolab-data-api.svg?branch=master)](https://travis-ci.org/gmontalvoriv/mongolab-data-api) [![npm version](https://badge.fury.io/js/mongolab-data-api.svg)](https://badge.fury.io/js/mongolab-data-api)

`mongolab-data-api` is a node.js module designed to allow you to access [mLab's Data API](http://docs.mlab.com/data-api/#reference) with minimal overhead.

I designed mongolab-data-api so the only documentation you need, in addition to the Data API specification, is how to install node, how to install the module, and how to make a call.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save mongolab-data-api

If you don't have or don't want to use npm:

    $ cd ~/.node_modules
    $ git clone git://github.com/gmontalvoriv/mongolab-data-api.git

## Usage

To require the library and initialize it with your account API key:

```javascript
var mLab = require('mongolab-data-api')('<Your Api Key Here>');
```

### Examples

**List databases**

```javascript
mLab.listDatabases(function (err, data) {
    if (err) { console.log(err); }
    else {
        console.log(data); // => [db1, db2, db3, ...]
    }
});
```

**List collections**

```javascript
mLab.listCollections('exampledb', function (err, collections) {
  console.log(collections); // => [coll1, coll2, ...]
});
```

**List documents**

```javascript
var options = {
  database: 'exampledb',
  collectionName: 'examples',
  query: '{ "key": "value" }'
};

mLab.listDocuments(options, function (err, data) {
  console.log(data); //=> [ { _id: 1234, ...  } ]
});
```
### Methods

#### `listDatabases`

Get the databases linked to the authenticated account

`.lastDatabases(callback)`

#### `listCollections`

Get the collections in the specified database

`.listCollections(database, callback)`

***Parameters:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |

#### `listDocuments`

Get the documents in the specified collection

`.listDocuments(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
collectionName| MongoDB collection name | `String` | Yes |
query| restrict results by the specified JSON query | `String` | No |
resultCount| return the result count for this query | `Boolean` | No |
setOfFields| specify the set of fields to include or exclude in each document (1 - include; 0 - exclude) | `Object` | No |
findOne| return a single document from the result set (same as findOne() using the mongo shell) | `Boolean` | No |
sortOrder| specify the order in which to sort each specified field (1- ascending; -1 - descending) | `String` | No |
skipResults| number of documents to skip | `Number` | No |
limit| number of documents to return | `Number` | No |

#### `insertDocuments`

Create a new document in the specified collection

`.insertDocuments(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
collectionName| MongoDB collection name | `String` | Yes |
documents| a document or array of documents to be inserted| `Object/Array` | Yes |

#### `updateDocuments`

Update one or more documents in the specified collection

`.updateDocuments(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
collectionName| MongoDB collection name | `String` | Yes |
data| replacement document or update modifiers | `Object` | Yes |
query| only update document(s) matching the specified JSON query | `String` | No |
allDocuments| update all documents collection or query (if specified). By default only one document is modified | `Boolean` | No |
upsert| insert the document defined in the request body if none match the specified query | `Boolean` | No |

#### `deleteDocuments`

Replace the contents of some or all documents of a collection

`.deleteDocuments(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
collectionName| MongoDB collection name | `String` | Yes |
query| only replace the document(s) matching the specified JSON query | `String` | No |

#### `viewDocument`

View a single document

`.viewDocument(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
collectionName| MongoDB collection name | `String` | Yes |
id| the document's id | - | Yes |

#### `updateDocument`

Update a single document

`.updateDocument(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
collectionName| MongoDB collection name | `String` | Yes |
id| the document's id | - | Yes |
updateObject| object sent as replacement | `Object` | Yes |

#### `deleteDocument`

Delete a single document

`.deleteDocument(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
collectionName| MongoDB collection name | `String` | Yes |
id| the document's id | - | Yes |

#### `runCommand`

Run a MongoDB database command

`.runCommand(options, callback)`

***Options:***

Name | Description | Type | Required |
-----|------------ |------|:----------:|
database| MongoDB database name | `String` | Yes |
commands| MongoDB database command | `Object` | Yes |

### Notes
- **Creating a new collection**
  - As soon as you POST your first document you should see the collection appear
- **runCommands**
  - Only certain MongoDB commands are exposed through the Data API
  - The available commands are:
    - getLastError
    - getPrevError
    - ping
    - profile
    - repairDatabase
    - resetError
    - whatsmyuri
    - convertToCapped
    - distinct
    - findAndModify
    - geoNear
    - reIndex
    - collStats
    - dbStats
    
## Requirements

- [mLab](https://mlab.com/) account w/API key.
- node.js v4.2.6+ (4.2.6 is the version I used to develop this module.  I'm
  unsure if it will work with previous ones.  If you run a previous version, and
  it works, let me know and I'll update this)
- [xmlhttprequest](https://github.com/driverdan/node-XMLHttpRequest) 1.8.0+

## Disclaimer

### [From the official mLab Data API documentation](http://docs.mlab.com/connecting/#methods):

> mLab databases can be accessed by your application code in two ways.

> The first method - the one we strongly recommend - is to connect using one of the MongoDB drivers (as described above). You do not need to use our API if you use the driver. In fact, using a driver provides better performance, better security, and more functionality.

> The second method is to connect via mLab’s RESTful Data API. Use this method only if you cannot connect using a MongoDB driver.

> ***Visit mLab's official documentation if you have any security concerns about using the Data API***

## Contributions

If you run into problems, have questions, or whatever else you can open an
issue on this repository, or tweet me
[@gmontalvoriv](http://twitter.com/gmontalvoriv). If you'd like to submit
a patch, shoot me a pull request.  I'd like to keep this module simple, so if
you want to add all kinds of crazy functionality - you might want to fork.
When in doubt, send a pull request - the worst that can happen is that I won't
merge it.

## Related

[mlab-cli](https://github.com/gmontalvoriv/mlab-cli): A command-line power tool for mLab (PKA MongoLab)

## License

[MIT](https://github.com/gmontalvoriv/mongolab-data-api/blob/master/LICENSE) © Gabriel Montalvo
