const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) =>{
  const url = req.url;
  const method = req.method;
  if(url === "/"){
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
      <html>
        <head>
          <title> Hello User! </title>
        </head>
        <body>
          <h2> Hello User! </h2>
          <form action="/create-user" method="POST">
            <input type="text" name="user">
            <button type="submit"> Submit Request</button>
          </form>
        </body>
      </html>
    `);
  }
  if(url === "/users"){
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
      <html>
        <head>
          <title> Users </title>
        </head>
        <body>
          <ul>
            <li>Alex</li>
            <li>Sebastian</li>
            <li>Sri Jayawardenepura Kotte</li>
          </ul>
        </body>
      </html>
    `);
  }
  if(url === "/create-user" && method === "POST"){
    
    const body = [];
    req.on('data', chunk =>{
      body.push(chunk);
    });

    return req.on('end', () => {
      const data = Buffer.concat(body).toString('utf-8');

      console.log(data);

      res.setHeader("Location", "/");
      res.statusCode = 302;
      res.end();
    });

  }
});

server.listen(3000);