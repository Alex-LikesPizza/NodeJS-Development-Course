const express = require('express');

const app = express();

// app.use(( req, res, next ) => {
//   console.log("First Middleware");
//   next();
// });
// app.use(( req, res, next ) => {
//   console.log("Second Middleware");
//   next();
// });
// app.use(( req, res, next ) => {
//   res.send("<h1>Hi! You Have Reached the Main Page!");
// });

app.use('/users', ( req, res, next ) => {
  res.send("You have reached /users");
}),
app.use('/', ( req, res, next) =>{
  res.send("You have reached main page");
})

app.listen(3000);