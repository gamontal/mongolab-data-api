var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xmlHttp;

module.exports = exports = {
  get: function(url) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
  },

  post: function(url, request) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', url, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(request));
    return JSON.parse(xmlHttp.responseText);
  },

  put: function(url, request) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('PUT', url, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(request));
    return JSON.parse(xmlHttp.responseText);
  },

  del: function(url, request) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('DELETE', url, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(request));
    return JSON.parse(xmlHttp.responseText);
  }
};
