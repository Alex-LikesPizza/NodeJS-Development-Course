const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if(url === '/'){
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
  if(url === '/message' && method === 'POST'){
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader("Location", '/');
        return res.end();
      });
    });
    
  }
} 

exports.requestHandler = requestHandler;