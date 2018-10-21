//expressを使用するのでその設定
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
//処理を記述した外部ファイルを参照
const font = require("./main");

// urlencodedとjsonは別々に初期化
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use(bodyParser.json());
server.use(express.static('public'));
server.listen(3000);
server.get('/font', function(req, res) {
  res.json(font.getPath());
})

