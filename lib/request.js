var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xmlHttp;

module.exports = exports = {
  httpGET: function(url) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
  },

  httpPOST: function(url, request) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', url, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(request));
    return JSON.parse(xmlHttp.responseText);
  },

  httpPUT: function(url, request) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('PUT', url, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(request));
    return JSON.parse(xmlHttp.responseText);
  },

  httpDELETE: function(url, request) {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('DELETE', url, false);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(request));
    return JSON.parse(xmlHttp.responseText);
  }
};
