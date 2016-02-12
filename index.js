/* TODO
   View, update or delete a single document
   Run database and collection-level commands
*/

'use strict';

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xmlHttp;
var httpGET = function(url) {
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
};

var httpPOST = function(url, request) {
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('POST', url, false);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(JSON.stringify(request));
  return JSON.parse(xmlHttp.responseText);
};

var httpPUT= function(url, request) {
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('PUT', url, false);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(JSON.stringify(request));
  return JSON.parse(xmlHttp.responseText);
};

var httpDELETE= function(url, request) {
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('DELETE', url, false);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(JSON.stringify(request));
  return JSON.parse(xmlHttp.responseText);
};

var BASEURL = 'https://api.mongolab.com/api/1/';

var MongoLab = function (apiKey) {
  if (!(this instanceof MongoLab)) {
    return new MongoLab(apiKey);
  }

  this.APIKEY = apiKey;

  var KEY_CHECK_URL = httpGET(BASEURL + 'databases?apiKey=' + this.APIKEY);
  if (KEY_CHECK_URL.message === 'Please provide a valid API key.') {
    throw new Error('Invalid API key');
  }
};

(function () {

  this.listDatabases = function (cb) {
    var res = httpGET(BASEURL + 'databases?apiKey=' + this.APIKEY);
    cb(null, res);
  };

  this.listCollections = function (database, cb) {
    if ((typeof database !== 'string') || (database === undefined)) {
      throw new Error('database name is required');
    }

    var res = httpGET(BASEURL + 'databases/' + database + '/collections?apiKey=' + this.APIKEY);
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
      sk: options. resultsToSkip || null,
      l: options.limit || null
    };

    if (database == null || collectionName == null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = httpGET(BASEURL + 'databases/' + database + '/collections/' + collectionName + '?apiKey=' + this.APIKEY +
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

    if (database == null || collectionName == null || documents == null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = httpPOST(BASEURL + 'databases/' + database + '/collections/' + collectionName + '?apiKey=' + this.APIKEY, documents);

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

    if (database == null || collectionName == null || data == null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = httpPUT(BASEURL + 'databases/' + database + '/collections/' + collectionName + '?apiKey=' + this.APIKEY +
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

    if (database == null || collectionName == null) {
      cb(new Error('invalid options'), null);
    } else {
      var res = httpPUT(BASEURL + 'databases/' + database + '/collections/' + collectionName + '?apiKey=' + this.APIKEY +
                        (OPTIONAL_PARAMS.q ? '&q=' + OPTIONAL_PARAMS.q : ''), documents);

      cb(null, res);
    }
  };

}).call(MongoLab.prototype);

module.exports = MongoLab;

