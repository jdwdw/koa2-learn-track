const Koa = require('koa');

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'hello koa2'
})

app.listen(3000);
console.log('koa2 use point 30000');
