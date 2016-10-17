const request = require('request-promise') 

function getHTTPResponse(uri){
const options = {  
  method: 'GET',
  uri: uri,
  json:true
}

request(options)  
  .then(function (response) {
    console.log(response);
    return response;
  })
  .catch(function (err) {
    console.log('Error from request:' + err);
  })

}

module.exports.getHTTPResponse = getHTTPResponse;