const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const config = require('./config');
var cors = require('koa2-cors');

const koaBody = require('koa-body');
const staticFile = require('koa-static');
const send = require('koa-send');

const router = new Router();
const app = new Koa();
const { uuid } = require("./utils")
app.use(cors({
  methods: ['GET', 'PUT', 'POST']
}));
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '139.196.40.161',
  port: "13080",
  user: 'root',
  password: 'Bboy120708',
  database: 'goods'
});
connection.connect();


function responseSuccess(data) {
  return {
    code: 0,
    data: data,
    msg:"SUCCESS"
  }
}
function responseFaild(msg) {
  return {
    code: 1,
    data: null,
    msg:msg
  }
}
router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let filePath = 'static/' + uuid();
  // 创建可写流
  const upStream = fs.createWriteStream(path.join(__dirname, filePath));
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = filePath;
});

router.get('/file', async (ctx) => {
  const id = ctx.query.id;
  const path = 'static/' + uuid();
  ctx.attachment(path);
  await send(ctx, path);
});


router.post('/login', async (ctx) => {
  // login
  let {
    email,
    password
  } = ctx.request.body;

  let res = await new Promise((resolve, reject) => {
    connection.query(`select * from user where email='${email}' and password='${password}'`, function (error, results, fields) {
      if (error) throw error;
      resolve(results)
    });
  })
  // connection.close();
  if(res.length){
    ctx.body = responseSuccess(res[0]);
  }else{
    ctx.body = responseFaild("email or password is not correct");
  }
});



router.post('/register', async (ctx) => {
  // register
  const {
    firstname,lastname,phone,email,password
  } = ctx.request.body;

  let res = await new Promise((resolve, reject) => {
    connection.query(`select * from user where email='${email}'`, function (error, results, fields) {
      if (error) throw error;
      resolve(results)
    });
  })

  if(res.length>0){
    ctx.body = responseFaild("email is registered");
    return;
  }

  var addSql = 'insert into user(firstname,lastname,phone,email,password) VALUES(?,?,?,?,?)';
  var addSqlParams = [firstname,lastname,phone,email,password];
  let res2 = await new Promise((resolve, reject) => {
    connection.query(addSql, addSqlParams, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
      }

      console.log('--------------------------INSERT----------------------------');
      //console.log('INSERT ID:',result.insertId);        
      console.log('INSERT ID:', result);
      resolve(result)
      console.log('-----------------------------------------------------------------\n\n');
    });
  })
  ctx.body = responseSuccess({
    firstname,lastname,phone,email,password
  });
});



app.use(staticFile(path.join(__dirname)));

app.use(router.routes());

app.listen(32325)
console.log('app started at port 32325...')
