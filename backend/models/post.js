/*
this post model created with mongoose will actually be the bridge from your nodejs
express app and its code to the mongodb database without you writing any mongo code.
*/

const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

/*
You have passed two arguments, the first one is the name of the model and here this should be Post in our case,
the name is up to you but it should start with an uppercase character and it should of course make sense for the
kind of data you are storing, in this example it is Post.
And the second argument is the schema you want to use, so in your case the postSchema.
*/

module.exports = mongoose.model("Post", postSchema);
/*
Now it's important that you of course also want to use this outside of this file,
so it's this model which you'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file.
So with this setup, let's use it in the app.js file
when we do send a post request to API posts.
*/
