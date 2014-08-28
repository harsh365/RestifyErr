var util = require('util');

function RestifyErr(err) {

	
	//call to super constructor
    Error.call(this); 
    
   	this.Error={
   		statusCode:500,
        errType:"UnknownError",
        errMsg: "Unknown error occured",
        moreInfo:'www.foo.com'
    } 

    //Check if err is instance of RestifyErr
    if(err instanceof RestifyErr){	
    	
    	this.Error=err.Error
    	
    }
    else if(err instanceof Error){	
  
    	this.Error.errMsg= err.message
    }
    
    this.send=function(res){

    	res.statusCode=this.Error.statusCode;
        res.send(this);
    }
    
    this.setStatusCode=function(scode){	
    	if(!scode)
    		this.Error.statusCode=500;
    	else if(parseInt(scode))
    		this.Error.statusCode=parseInt(scode)
    	else 
    		this.Error.statusCode=500;
    }

    this.setType=function(etype){
    	this.Error.errType=etype;
    }

	this.setMsg=function(emsg){
    	this.Error.errMsg=emsg;
    }

    this.setMoreInfo=function(einfo){
    	this.Error.moreInfo=einfo;
    }
	
	//Method to overide the Restify framework error
    this.overrideRestifyErr=function(){
    	return {
		        formatters: {
		            'application/json': function customizedFormatJSON( req, res, resbody ) {
		                if (!(resbody instanceof Error) && (Buffer.isBuffer( resbody ))) {
		                    resbody = resbody.toString( 'base64' );
		                    res.setHeader( 'Content-Length', Buffer.byteLength( resbody ) );
		                    return resbody;
		                }
		                if(resbody instanceof Error && resbody.body){
		                    res.statusCode = resbody.statusCode;
		                    switch(resbody.body.code){
		                        case "BadDigest":
	                            resbody = {
	                            	
	                            	Error:{
	                            	statusCode:resbody.statusCode,
	                                errType:'BadDigestError',
	                                errMsg: resbody.body.message,
	                                errInfo:'www.foo.com'
	                            	}
	                            };
	                            break;

	                            case "BadMethod":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'BadMethodError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
	                            	}
	                            };
	                            break;

	                            case "InternalError":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'InternalError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
	                            	}
	                            };
	                            break;

	                            case "InvalidArgument":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'InvalidArgumentError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
		                            }
	                            };
	                            break;

	                            case "InvalidContent":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'InvalidContentError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
	                                }
	                            };
	                            break;

	                            case "InvalidCredentials":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'InvalidCredentialsError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
	                            	}
	                            };
	                            break;

	                            case "InvalidHeader":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'InvalidHeaderError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
		                            }
	                            };
	                            break;

	                            case "InvalidVersion":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'InvalidVersionError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
		                            }
	                            };
	                            break;

	                            case "MissingParameter":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'MissingParameterError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
		                            }
	                            };
	                            break;

	                            case "NotAuthorized":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'NotAuthorizedError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
	                            	}
	                            };
	                            break;

	                            case "RequestExpired":
	                            resbody = {
	                                
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'RequestExpiredError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
		                            }
	                            };
	                            break;

	                             case "RequestThrottled":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'RequestThrottledError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
		                            }
	                            };
	                            break;

	                             case "WrongAccept":
	                            resbody = {
	                                
	                            	Error:{
	                            		statusCode:resbody.statusCode,
		                                errType:'WrongAcceptError',
		                                errMsg: resbody.body.message,
		                                errInfo:'www.foo.com'
		                            }
	                            };
	                            break;

	                            case "ResourceNotFound":
	                            resbody = {
	                            	
	                            	Error:{
	                            		statusCode:resbody.statusCode,
	                                	errType:'ResourceNotFoundError',
	                                	errMsg:resbody.body.message,
	                                	errInfo:'www.foo.com'
	                            	}
	                            };
	                            break;

			                    default:
			                    resbody = {
			                        
	                            	Error:{
	                            		statusCode:resbody.statusCode,
	                                	errType:"UnknownError",
	                                	errMsg:"UnknownError",
	                                	errInfo:'www.foo.com'
			                        }
			                    }

		                    }             
		            	}
		        
		            var data = JSON.stringify(resbody);
		            res.setHeader( 'Content-Length', Buffer.byteLength( data ) );
		            return data;
		        	}
		        }
        }
    }
    
}

// inherit from Error
util.inherits(RestifyErr, Error);

//Export the constructor function as the export of this module file.
module.exports = RestifyErr;

