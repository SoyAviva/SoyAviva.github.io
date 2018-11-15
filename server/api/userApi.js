var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};





//check user existance while log in
router.post('/login', (req, res) => {
  var params = req.body;
  var getUserByInfo = $sql.user.getUserByInfo;
  console.log(params);
  conn.query(getUserByInfo,[params.username, params.password],function (err, results){
    if (err){
      throw err
    }else{
      // 数据库不存在 就注册成功
      if (results.length == 0) {
        res.end(JSON.stringify({status:'102',msg:'该用户未注册'}));
      } else{ // 数据库存在就注册失败
        if (results[0].username == params.username && results[0].password == params.password) {
          res.end(JSON.stringify({status:'100',msg:'登录成功'}));
        }
        if(results[0].username == params.username && results[0].password != params.password){
          res.end(JSON.stringify({status:'103',msg:'密码输入错误'}));
        }
      }
    }
  })
});






// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  var getUserByInfo = $sql.user.getUserByInfo;
  console.log(params);

  conn.query(getUserByInfo,[params.username],function (err, results){
    if (err){
      throw err
    }else{
      // 数据库不存在 就注册成功
      if (results.length == 0) {
        // 把新用户插入数据库
        conn.query(sql,[params.username, params.password, params.nickname],function (err, results) {
          if(err){
            throw err
          }else{
            res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
          }
        })
      } else{ // 数据库存在就注册失败
        res.end(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
      }
    }
  })


  // conn.query(sql, [params.username, params.password, params.nickname], function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (result) {
  //     jsonWrite(res, result);
  //   }
  // })
});

module.exports = router;
