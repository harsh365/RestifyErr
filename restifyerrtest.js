var request = require('superagent');
var expect = require('expect.js');
var id;

describe('Testing of restifyerr', function () {

  it ('Tests the default error object creation', function(done){
        request.get("http://localhost:3000/error1")
           .end(function(err,res){
            
            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(500)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('UnknownError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('Unknown error occured')
            expect(res.body.Error).to.have.property('moreInfo')
            
            
            done()
          })
  });

  it ('Tests the custom error object creation', function(done){
        request.get("http://localhost:3000/error2")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(401)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('TestErrorType')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('TestErrorMsg')
            expect(res.body.Error).to.have.property('moreInfo')
            expect(res.body.Error).to.have.property('myProperty')
            expect(res.body.Error.myProperty).to.be.eql('abc')
            done()

          })
  })

  it ('Tests the uncaught exception', function(done){
        request.get("http://localhost:3000/error3")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(500)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('UnknownError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('ENOENT, open \'somefile.txt\'')
            expect(res.body.Error).to.have.property('moreInfo')    

            done()
          })
  })

  it ('Tests the application error occured and handled by restifyerr', function(done){
        request.get("http://localhost:3000/error4")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(500)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('UnknownError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('ENOENT, open \'somefile.txt\'')
            expect(res.body.Error).to.have.property('moreInfo')    

            done()
          })
  })
  
  it ('Tests the error object created and handled in uncaught exception section', function(done){
        request.get("http://localhost:3000/error5")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(500)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('UnknownError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('Unknown error occured')
            expect(res.body.Error).to.have.property('moreInfo')        

            done()
          })
  })

  it ('Tests the Restify Fx ResourceNotFound Error', function(done){
        request.get("http://localhost:3000/error6")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(404)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('ResourceNotFoundError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('/error6 does not exist')
               
           
            done()
          })
  })

  it ('Tests the custom error object creation with invalid header(statuscode is number in string format)', function(done){
        request.get("http://localhost:3000/error7")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(401)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('UnknownError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('Unknown error occured')
            expect(res.body.Error).to.have.property('moreInfo')    

            done()
          })
  })

  it ('Tests the custom error object creation with invalid header(statuscode is number in string format)', function(done){
        request.get("http://localhost:3000/error8")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(500)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('UnknownError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('Unknown error occured')
            expect(res.body.Error).to.have.property('moreInfo')   

            done()
          })
  })
  
});


describe('Testing of restifyerr with CRUD operations', function () {

  it ('Tests the post method without posting name parameter ', function(done){
        request.post("http://localhost:3000/user")
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(409)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('InvalidArgumentError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('Name must be supplied')
               

            done()
          })
  })

  it ('Tests the post method with name parameter posted', function(done){
        request.post("http://localhost:3000/user")
        .send(({ name: 'foo'}))
        .set('Accept', 'application/json')
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(201)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('name')
            expect(res.body.name).to.be.eql('foo')
            id=res.body._id
            console.log(id)
            done()
          })
  })

  it ('Tests the get method to get all user object ', function(done){
        request.get("http://localhost:3000/user")
        .end(function(err,res){


            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(200)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.be.an(Array);
            

            done()
          })
  })

  it ('Tests the put method to update the value of name parameter ', function(done){
        request.put("http://localhost:3000/user/"+id)
        .send(({ name: 'abc'}))
        .set('Accept', 'application/json')
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(200)
    
            
            done()
          })
  })

  it ('Tests the put method with invalid parameter ', function(done){
        request.put("http://localhost:3000/user/1")
        .send(({ names: 'abc'}))
        .set('Accept', 'application/json')
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(409)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('InvalidArgumentError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('Name must be supplied')
    
            
            done()
          })
  })

  it ('Tests the dele method with invalid parameter ', function(done){
        request.put("http://localhost:3000/user/999")
        .send(({ names: 'abc'}))
        .set('Accept', 'application/json')
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(409)
            expect(res.headers).to.have.property('content-type')
            expect(res.headers['content-type']).to.be.eql('application/json')
            expect(res.body).to.have.property('Error')
            expect(res.body.Error).to.have.property('statusCode')
            expect(res.body.Error.statusCode).to.be.eql(res.statusCode)
            expect(res.body.Error).to.have.property('errType')
            expect(res.body.Error.errType).to.be.eql('InvalidArgumentError')
            expect(res.body.Error).to.have.property('errMsg')
            expect(res.body.Error.errMsg).to.be.eql('Name must be supplied')
    
            
            done()
          })
  })

  it ('Tests the delete method with valid parameter ', function(done){
        request.del("http://localhost:3000/user/"+id)
        .set('Accept', 'application/json')
        .end(function(err,res){

            expect(err).to.eql(null)
            expect(res).to.have.property('statusCode')
            expect(res.statusCode).to.be.eql(200)
    
            done()
          })
  })

});

