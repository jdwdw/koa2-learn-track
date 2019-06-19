const Koa = require('koa')

const app = new Koa()
app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    const html = `
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/">
          <p>userName</p>
          <input name="userName" /><br/>
          <p>nickName</p>
          <input name="nickName" /><br/>
          <p>email</p>
          <input name="email" /><br/>
          <button type="submit">submit</button>
        </form>
        `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    const postData = await parsePostDate(ctx)
    ctx.body = postData
  } else {
    ctx.body = '<h1>404</h1>'
  }
})

function parsePostDate(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = '';
      ctx.req.addListener('data', (data) => {
        postData += data
      })
      ctx.req.addListener('end', () => {
        const parseData = parseQueryStr(postData)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}

function parseQueryStr(queryStr) {
  const queryData = {}
  const queryStrList = queryStr.split('&')
  for (const index of queryStrList.keys()) {
    const itemList = queryStrList[index].split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000')
})
