const {
    include
} = require('./node'),
{
    join
} = require('path');

include('microservice.config')(require(join(process.cwd() , 'ms.config.js'))) ;

module.exports = {
    server:include('microservice.server'),
    datasource:include('microservice.datasource')
} ;