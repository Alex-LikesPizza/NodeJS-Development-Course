const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
      <head>
        <title>Get Data</title>
      </head>
      <body>
        <form action="/message" method="POST">
          <input type="text" name="message">
          <button type="submit">Submit Message</button>
        </form>
      </body>
    `);
  }
  if(req.url === '/message' && req.method === 'POST'){
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader("Location", '/');
        return res.end();
      });
    });
    
  }

});

server.listen(3000);