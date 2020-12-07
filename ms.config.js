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
        }
    },
    server:{
        '/api/storage/item/set':{
            params:[
                'key',
                'value'
            ],
            source:'./src/example/server/storage/item/set.js'
        },
        '/api/storage/item/get':{
            params:[
                'key'
            ],
            source:'./src/example/server/storage/item/get.js'
        }
    },
    client:{
        '/api.js':{
            'storage.item.set':'./src/example/client/storage/item/set.js',
            'storage.item.get':'./src/example/client/storage/item/set.js'
        }
    }
} ;