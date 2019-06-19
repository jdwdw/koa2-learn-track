const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  const { url } = ctx;

  const { request } = ctx;
  const req_query = request.query;
  const req_querystring = request.querystring;

  const ctx_query = ctx.query;
  const ctx_querystring = ctx.querystring;

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
  }
})

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000')
})
