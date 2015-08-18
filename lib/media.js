var
fs = require('fs'),

previewsAvailable = 3,

mediaList = function mediaList() {
  var result = ''
  for (var i = 1; i <= previewsAvailable; i++) {
    var n = ('000'+i).substr(-3)
    result += '<a href="GOPR'+n+'.THM">GOPR'+n+'.THM</a>\n'
  }
  return result
},

serveFile = function serveFile(path) {
  return fs.createReadStream(path, 'binary')
},

servePreview = function servePreview() {
  return serveFile(__dirname + '../public/preview.jpg')
},

addPreview = function addPreview() {
  previewsAvailable++
}

module.exports = {
  list: mediaList,
  servePreview: servePreview,
  addPreview: addPreview
}
