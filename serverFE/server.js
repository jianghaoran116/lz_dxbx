const express = require('express')
const http = require('http')
const path = require('path')
const proxyMiddleWare = require('http-proxy-middleware')

const app = express()
let proxyPath = "http://localhost:9093"

const proxyOption = {
  target: proxyPath,
  changeOrigoin: true,
  pathRewrite: { '^/api': '/' }
};

app.set('port', process.env.PORT || 9000)
  .set('views', path.join(__dirname, '../'))
  .engine('html', require('ejs').__express)
  .set('view engine', 'html')
  .use('/bundle', express.static(path.join(__dirname, '../bundle')))
  .use('/static', express.static(path.join(__dirname, '../static')))
  .use("/api",proxyMiddleWare(proxyOption))
  .get('/*', function (req, res) {
    res.type('html');
    res.render(path.join(__dirname, '../index'));
  })

http.createServer(app).listen(app.get('port'), function () {
  console.log('express server listening on port ' + app.get('port'))
})