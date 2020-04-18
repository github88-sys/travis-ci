"use strict";
const Koa = require('koa');
const app = new Koa();
app.use((ctx, next) => {
    ctx.response.body = 'hello docker hello git hello ci'
})
// 这里是学习测试功能的代码
// module.exports = function hello(){
// 	return 'Hello Node';
// };
app.listen(3000);
