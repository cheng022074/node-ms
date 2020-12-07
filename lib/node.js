

const innerExports = {} ;

const {
    env
} = process ;

if(!env['ZBEE-APP-PATH']){

    env['ZBEE-APP-PATH'] = __dirname ;
}

const include = (() =>{

    const nameRe = /^(\w+)\:{2}(.+?)$/,
          CODES = {};

    return name =>{

        if(CODES.hasOwnProperty(name)){

            return CODES[name] ;
        }

        let match = name.match(nameRe),
            folder,
            className;
    
        if(match){
    
            folder = match[1],
            className = match[2] ;
    
        }else{

            if(innerExports.hasOwnProperty(name)){

                return CODES[name] = innerExports[name] ;
            }
    
            folder = 'src',
            className = name ;
        }

        let fullName = `${folder}::${className}`,
            code = CODES[name] = innerExports[fullName] ;

        if(code === undefined && folder !== 'config'){

            throw new Error(`${fullName} 没有定义`) ;
        }

        return code ;
    } ;

})();

const mixins = ({
    extend,
    mixins
}) =>{

    let baseClass = extend || class {} ;

    if(mixins){

        for(let mixin of mixins){

            baseClass = mixin(baseClass) ;
        }
    }

    return baseClass ;
};


exports.include = include ;


const config = (() =>{

    const {
        freeze:freeze2,
        isFrozen,
        keys
    } = Object ;

    function freeze(data){

        if (data && typeof data === 'object' && !isFrozen(data)){

            freeze2(data);

            let names = keys(data) ;

            for(let name of names){

                freeze(data[name]) ;
            }
        }

        return data;
    }

    const config = {};

    function get_config(target , key){

        if(key){
    
            if(target.hasOwnProperty(key)){
        
                return freeze(target[key]) ;
            }
        
            let names = key.split(/\./),
                prefix = '';
        
            for(let name of names){
        
                let key = `${prefix}${name}` ;
        
                if(target.hasOwnProperty(key)){
        
                    target = target[key] ;
        
                    prefix = '' ;
                
                }else{
        
                    prefix = `${key}.` ;
                }
            }

            if(prefix){
        
                return ;
            }
        }

        return freeze(target) ; 
    }

    return (name , key) =>{

        try{

            const {
                env
            } = process ;

            let data;

            try{

                data = require(`${env['ZBEE-APP-PATH'] || __dirname}/config/${name.replace(/\./g , '/')}.json`) ;

            }catch(err){
            }

            if(data){

                return get_config(data , key) ;
            }
        
        }catch(err){

        }

        if(config.hasOwnProperty(name)){

            return get_config(config[name] , key) ;
        }

        return get_config(include(`config::${name}`)() , key) ;
    }

})();




innerExports['src::microservice.server'] = (() =>{

                    let getConfig;
    
                    let var_init_locked_1607320546655;
    
                    

                    function main(config){

        
/**
 * 
 * 启动微服务服务器
 * 
 * @import getConfig from .server.config
 * 
 * @param {object} config 服务器启动配置
 * 
 * @require koa
 * 
 * @require @koa/router
 * 
 */

const
Koa = require('koa'),
Router = require('@koa/router'),
{
    port
} = getConfig(config);

let app = new Koa(),
    router = new Router();

app.use(async ctx => ctx.body = 'Hello World');

server = app
.use(router.routes())
.use(router.allowedMethods())
.listen(port) ;



    }
    
                    return function(config){
    
                        
        if(!var_init_locked_1607320546655){

            getConfig = include('src::microservice.server.config');

            var_init_locked_1607320546655 = true ;
        }
        
    
                        return main.call(this , config) ;
                    } ;
    
                })();

innerExports['src::microservice.server.config'] = (() =>{

                    
    
                    
    
                    

                    function main(config){

        
/**
 * 
 * 处理传入的服务器配置
 * 
 * @param {object} config 服务器配置
 * 
 * @return {object} 处理后的服务器配置 
 * 
 */

 let {
    port = 8080
 } = config ;

 return {
     port
 } ;

    }
    
                    return function(config){
    
                        
    
                        return main.call(this , config) ;
                    } ;
    
                })();







