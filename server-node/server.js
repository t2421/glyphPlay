//expressを使用するのでその設定
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//処理を記述した外部ファイルを参照
const font = require("./main");

// urlencodedとjsonは別々に初期化
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.use(bodyParser.json());
app.listen(3000);
app.get('/font', function(req, res) {
  res.json(font.getPath());
})

// app.post('/post-example', function(req, res) {
//   export_func.post_example(req.id, req.name);
// })