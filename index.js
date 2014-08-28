var restify = require('restify')
var fs = require('fs')
var restifyerr=require('./restifyerr')
 // Get a persistence engine for the user
var userSave = require('save')('user')
    // Create the restify server
var server = restify.createServer(new restifyerr().overrideRestifyErr())

// Start the server listening on port 3000
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})

// Maps req.body to req.params so there is no switching between them
server.use(restify.bodyParser())
	.use(restify.fullResponse())
	.use(restify.queryParser())

server.on('uncaughtException', function (req, res, route, err) {
    var errorobj= new restifyerr(err);
    errorobj.send(res);
});

server.get('/error1', function (req, res, next) {
  var errorobj= new restifyerr();
  errorobj.send(res);
})

server.get('/error2', function (req, res, next) {
  var errorobj= new restifyerr();
  errorobj.setStatusCode(401)
  errorobj.setType("TestErrorType")
  errorobj.setMsg("TestErrorMsg")
  errorobj.setMoreInfo("www.foo.co.in")
   errorobj.Error.myProperty="abc"
  errorobj.send(res);
})

server.get('/error3', function (req, res, next) {
  fs.readFile('somefile.txt', function (err, data) {
    if (err) {
        throw err
    }
  });
})

server.get('/error4', function (req, res, next) {
  fs.readFile('somefile.txt', function (err, data) {
    if (err) {
        var errorobj= new restifyerr(err);
        errorobj.send(res);
    }
  });
})

server.get('/error5', function (req, res, next) {
      var errorobj= new restifyerr();
      throw errorobj
})

// error6 intentionally unused for testing resource not found error

server.get('/error7', function (req, res, next) {
      var errorobj= new restifyerr();
      errorobj.setStatusCode("401")
      errorobj.send(res);
})

server.get('/error8', function (req, res, next) {
      var errorobj= new restifyerr();
      errorobj.setStatusCode("asfs")
      errorobj.send(res);
})

server.get('/user', function (req, res, next) {
  userSave.find({}, function (error, users) {
    res.send(users)
  })
})

server.post('/user', function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  userSave.create({ name: req.params.name }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send(201, user)
  })
})

server.put('/user/:id', function (req, res, next) {
  if (req.params.name === undefined) {
    return next(new restify.InvalidArgumentError('Name must be supplied'))
  }
 
  userSave.update({ _id: req.params.id, name: req.params.name }, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send()
  })
})

server.del('/user/:id', function (req, res, next) {
  userSave.delete(req.params.id, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
 
    res.send()
  })
})


