const {
    resolve
} = require('path') ;

module.exports = {
    port:8080,
    datasources:{
        storage:{
            type:'storage.memory',
            config:{
                storagePath:resolve('data/storage.json')
            }
        },
        ajax:'axios'
    },
    server:{
        '/api/storage/item/set':{
            method:'post',
            params:[
                'key',
                'value'
            ],
            source:'./example/server/storage/item/set.js'
        },
        '/api/storage/item/get':{
            params:[
                'key'
            ],
            source:'./example/server/storage/item/get.js'
        },
        '/shop/code/verification':{
            source:'./example/shop/code/verification.js'
        },
        '/shop/login':{
            params:[
                'username',
                'password',
                'code'
            ],
            source:'./example/shop/login.js'
        }
    }
} ;