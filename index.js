'use strict';

var http = require('./lib/request');
var BASE_URL = 'https://api.mongolab.com/api/1/';

var MongoLab = function (apiKey) {
  if (!(this instanceof MongoLab)) {
    return new MongoLab(apiKey);
  }

  this.APIKEY = apiKey;

  var KEY_CHECK_URL = http.get(BASE_URL + 'databases?apiKey=' + this.APIKEY);
  if (KEY_CHECK_URL.message === 'Please provide a valid API key.') {
    throw new Error('Invalid API key');
  }
};

(function () {
  this.listDatabases = function (cb) {
    var res = http.get(BASE_URL + 'databases?apiKey=' + this.APIKEY);
    cb(null, res);
  };

  this.listCollections = function (database, cb) {
    if ((typeof database !== 'string') || (database === undefined)) {
      throw new Error('database name is required');
    }

    var res = http.get(BASE_URL + 'databases/' + database + '/collections?apiKey=' + this.APIKEY);
    cb(null, res);
  };

  this.listDocuments = function (options, cb) {
    var database = options.database || null;
    var collectionName = options.collectionName || null;
    var OPTIONAL_PARAMS = {
      q: options.query || null,
      c: options.resultCount || null,
      f: options.setOfFields || null,
      fo: options.findOne || null,
      s: options.sortOrder || null,
      sk: options.skipResults || null,
      l: options.limit || null
    };

    if (database === null || collectionName === null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = http.get(BASE_URL + 'databases/' + database + '/collections/' + collectionName + '?apiKey=' + this.APIKEY +
                        (OPTIONAL_PARAMS.q ? '&q=' + OPTIONAL_PARAMS.q : '') + (OPTIONAL_PARAMS.c ? '&c=' + OPTIONAL_PARAMS.c : '') +
                        (OPTIONAL_PARAMS.f ? '&f=' + OPTIONAL_PARAMS.f : '') + (OPTIONAL_PARAMS.fo ? '&fo=' + OPTIONAL_PARAMS.fo : '') +
                        (OPTIONAL_PARAMS.s ? '&s=' + OPTIONAL_PARAMS.s : '') + (OPTIONAL_PARAMS.sk ? '&sk=' + OPTIONAL_PARAMS.sk : '') +
                        (OPTIONAL_PARAMS.l ? '&l=' + OPTIONAL_PARAMS.l : ''));

      cb(null, res);
    }
  };

  this.insertDocuments = function (options, cb) {
    var database = options.database || null;
    var collectionName = options.collectionName || null;
    var documents = options.documents || null;

    if (database === null || collectionName === null || documents === null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = http.post(BASE_URL + 'databases/' + database + '/collections/' + collectionName +
                                     '?apiKey=' + this.APIKEY, documents);

      cb(null, res);
    }
  };

  this.updateDocuments = function (options, cb) {
    var database = options.database || null;
    var collectionName = options.collectionName || null;
    var data = { "$set" : options.data } || null;
    var OPTIONAL_PARAMS = {
      q: options.query || null,
      m: options.allDocuments || null,
      u: options.upsert || null
    };

    if (database === null || collectionName === null || data === null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = http.put(BASE_URL + 'databases/' + database + '/collections/' + collectionName + '?apiKey=' + this.APIKEY +
                        (OPTIONAL_PARAMS.q ? '&q=' + OPTIONAL_PARAMS.q : '') + (OPTIONAL_PARAMS.m ? '&m=' + OPTIONAL_PARAMS.m : '') +
                        (OPTIONAL_PARAMS.u ? '&u=' + OPTIONAL_PARAMS.u : ''), data);

      cb(null, res);
    }
  };

  this.deleteDocuments = function (options, cb) {
    var database = options.database || null;
    var collectionName = options.collectionName || null;
    var documents = options.documents || [];
    var OPTIONAL_PARAMS = {
      q: options.query || null
    };

    if (database === null || collectionName === null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = http.put(BASE_URL + 'databases/' + database + '/collections/' + collectionName +
                                '?apiKey=' + this.APIKEY + (OPTIONAL_PARAMS.q ? '&q=' + OPTIONAL_PARAMS.q : ''), documents);

      cb(null, res);
    }
  };

  this.viewDocument = function (options, cb) {
    var database = options.database || null;
    var collectionName = options.collectionName || null;
    var id = options.id || null;

    if (typeof id !== 'string' || id === null) {
      cb(new Error('document id is required'), null);
    } else {

      var res = http.get(BASE_URL + 'databases/' + database + '/collections/' + collectionName + '/' + id + '?apiKey=' + this.APIKEY);

      cb(null, res);
    }
  };

  this.updateDocument = function (options, cb) {
    var database = options.database || null;
    var collectionName = options.collectionName || null;
    var id = options.id || null;
    var updateObject = options.updateObject || null;

    if (typeof id !== 'string' || id === null || updateObject === null) {
      cb(new Error('document id is required'), null);
    } else {
      var res = http.put(BASE_URL + 'databases/' + database + '/collections/' + collectionName + '/' + id + '?apiKey=' +
                                this.APIKEY, updateObject);

      cb(null, res);
    }
  };

  this.deleteDocument = function (options, cb) {
    var database = options.database || null;
    var collectionName = options.collectionName || null;
    var id = options.id || null;

    if (typeof id !== 'string' || id === null) {
      cb(new Error('document id is required'), null);
    } else {
      var res = http.del(BASE_URL + 'databases/' + database + '/collections/' + collectionName + '/' + id + '?apiKey=' + this.APIKEY);

      cb(null, res);
    }
  };

  this.runCommand = function (options, cb) {
    var database = options.database || null;
    var commands = options.commands || null;

    if (database === null || commands === null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = http.post(BASE_URL + 'databases/' + database + '/runCommand?apiKey=' + this.APIKEY, commands);

      cb(null, res);
    }
  };
}).call(MongoLab.prototype);

module.exports = MongoLab;

