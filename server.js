// This should sit directly in the root folder of your application.
// The http import will turn this file into a server. This means you will import the http package. It's not found in the package.json file
// because this is a default nodejs package which was installed together with nodejs on your system.
// Require is the nodejs import syntax and this simply imports this package and stores its content in this http constant.

// NOTE: Now writing all the code just with nodejs would be very cumbersome though because for example,
// if you want to find out if we targeted just our slash nothing path or if we had our domain.com/products, then we would have to parse
// that manually on the incoming request. The same is for the request body, the request http verb, these are all things we don't want to do,
// that is why you need to add the express backend.

const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
// With http imported, you can use the http package to create a new server because the http package has a createServer method.

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Now createServer, if you hover over it in visual studio code, takes a request listener as an argument,
// so a function it will execute for every incoming request no matter which path this request targets, if
// it's targeting your domain or your IP, then this function here will be executed.

// Now you can connect from angular to the backend app.js through this server.js

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
