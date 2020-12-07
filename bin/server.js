const {
    include
} = require('../lib'),
{
    join
} = require('path');

const server = include('microservice.server') ;

server(require(join(process.cwd() , 'ms.config.js'))) ;