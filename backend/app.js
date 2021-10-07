// this app.js file will hold the express app which is still a nodejs server side app,
// just taking advantage of express features.
// the use, get and etc... keyword simply uses a new middleware.
// NOTE: the de-facto standard language for node is sticking to vanilla javascript,

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // import mongoose to connect it with the database

const Post = require("./models/post");
/*
  Here is the Post import from the model post
  NOTE: you can name this whatever you want BUT the convention is to use capital starting string
  to indicate that this allows you to define a new object based on the blueprint or the schema.

  now you can use this constant in your posts route to create a new post based on our body data.
*/

const app = express();

// paste the connection string you copied in the connect cluster.
// change the password you copied in mongodb ang paste it here in <password> including the <>
mongoose
  .connect(
    "mongodb+srv://eli:Vd7kwC1o2f5hYEk4@cluster0.w7qev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });
// it will return a promise that is why you can then and catch

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

// use the model you required on top here.

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
  /*
  and now you have a post object that's actually managed by mongoose and that's pretty close to being
  connectable to the database. now open ng serve and npm run start:server
  */
}); // now you will need to connect this to angular

// you can pass as many arguments in use or get
// the /api/posts means only requests targeting localhost:3000/api/posts will reach this middleware.
// all other requests will go into the void because you have no default error handler right now.
// the important part is now we have to target this path to reach this code.
// instead of using the send, there is another method that is the json method that
// will return data in the json format.
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents,
    });
  });
  // now you need to return the posts here with your response
  // the status code of 200 is for success
  // Now you don't need to return the response because it's the last statement in this use function.

  // You shouldn't call next here because there is no next middleware you want to execute,
  // you really want to finish with sending that response and therefore you are all set
}); // now you will need to connect this to angular

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});
// now try this in the browser: http://localhost:3000/api/posts
// the api/posts is what you defined.
module.exports = app;
