// this app.js file will hold the express app which is still a nodejs server side app,
// just taking advantage of express features.
// the use, get and etc... keyword simply uses a new middleware.
// NOTE: the de-facto standard language for node is sticking to vanilla javascript,

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
}); // now you will need to connect this to angular

// you can pass as many arguments in use or get
// the /api/posts means only requests targeting localhost:3000/api/posts will reach this middleware.
// all other requests will go into the void because you have no default error handler right now.
// the important part is now we have to target this path to reach this code.
// instead of using the send, there is another method that is the json method that
// will return data in the json format.
app.get("/api/posts", (req, res, next) => {
  // you need an id here
  const posts = [
    {
      id: "asdfuw234",
      title: "this is title 1",
      content: "this is content 1",
    },
    {
      id: "qwer12334",
      title: "this is title 2",
      content: "this is content 2",
    },
    {
      id: "zxcva132",
      title: "this is title 3",
      content: "this is content 3",
    },
    {
      id: "ghd4123as",
      title: "this is title 4",
      content: "this is content 4",
    },
  ];

  // now you need to return the posts here with your response
  // the status code of 200 is for success
  // Now you don't need to return the response because it's the last statement in this use function.
  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts,
  });
  // You shouldn't call next here because there is no next middleware you want to execute,
  // you really want to finish with sending that response and therefore you are all set
}); // now you will need to connect this to angular

// now try this in the browser: http://localhost:3000/api/posts
// the api/posts is what you defined.
module.exports = app;
