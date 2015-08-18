var
http = require('http'),
fs = require('fs'),
path = require('path'),
url = require('url'),
camera = require('./lib/camera.js'),
media = require('./lib/media.js')

port = Number(process.argv[2]) || 8900,

server = http.createServer(function(req, res) {
  console.log(req.url)
  var parsedUrl = url.parse(req.url, true),
    pathname = parsedUrl.pathname,
    params = parsedUrl.query,
    result = false

  switch (pathname) {
    case '/camera/se':
      result = camera.binaryState()
      break
    case '/gp/gpControl/command/shutter':
      if (Number(params.p) == 1) {
        result = camera.shutterStart()
      } else {
        result = camera.shutterStop()
        media.addPreview()
      }
      break
    case '/videos/DCIM/100GOPRO/':
      result = media.list()
      break
    case String(pathname.match(/^\/videos\/DCIM\/100GOPRO\/GOPR.*?\.THM$/)):
      result = media.servePreview()
      break
    case '/gp/gpControl/command/mode':
      result = camera.setCameraMode(Number(params.p))
      break
    default:
      console.error('Unknown URL')
  }

  sendHeaders(res, result, parsedUrl)
  sendResult(res, result)
}),

sendHeaders = function sendHeaders(res, result, url) {
  if (result) {
    var contentType = getContentType(url.pathname)
    res.writeHead(200, {'Content-Type': contentType})
  } else {
    res.writeHead(404)
  }
},

getContentType = function getContentType(pathname) {
  var ext = path.extname(pathname).toLowerCase()
  var contentType = 'text/plain'
  if (ext === '.thm' || ext === '.jpg') {
     contentType = 'image/jpg'
  }
  return contentType
},

sendResult = function sendResult(res, result) {
  if (!result) return res.end()

  if (typeof result.pipe == 'function') {
    result.pipe(res)
  } else {
    res.end(result)
  }
}

server.listen(port)
console.log("Server listening on port " + port)

