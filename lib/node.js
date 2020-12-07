

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

                    let config,get,isDefined;
    
                    let var_init_locked_1607343271109;
    
                    

                    function main(config){

        
/**
 * 
 * 启动微服务服务器
 * 
 * @import config from .config value
 * 
 * @import get from object.value.get
 * 
 * @import is.defined
 * 
 * @param {object} config 服务器启动配置
 * 
 * @require koa
 * 
 * @require @koa/router
 * 
 * @require koa-bodyparser
 * 
 */

const
Koa = require('koa'),
Router = require('@koa/router'),
Body = require('koa-bodyparser'),
{
    port,
    server
} = config;

let app = new Koa(),
    router = new Router(),
    uris = Object.keys(server);

app.use(Body()) ;

for(let uri of uris){

    let {
        method,
        params,
        source
    } = server[uri] ;

    router[method](uri , ctx => {

        const {
            request
        } = ctx,
        args = [];

        for(let {
            target,
            property
        } of params){

            args.push(get(request[target] , property)) ;
        }

        let data = source(...args),
            success = true;

        if(isDefined(data)){

            ctx.body = {
                success,
                data
            }
        
        }else{

            ctx.body = {
                success
            } ;
        }

        

    }) ;
}

app
.use(router.routes())
.use(router.allowedMethods())
.listen(port) ;



    }
    
                    return function(config){
    
                        
        if(!var_init_locked_1607343271109){

            config = include('src::microservice.config')();
get = include('src::object.value.get');
isDefined = include('src::is.defined');

            var_init_locked_1607343271109 = true ;
        }
        
    
                        return main.call(this , config) ;
                    } ;
    
                })();

innerExports['src::is.defined'] = (() =>{

                    
    
                    
    
                    

                    function main(data){

        /**
 * 
 * 判断给定数据是否定义
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果数据定义则返回 true , 否则返回 false
 * 
 */

return data !== undefined ;

    }
    
                    return function(data){
    
                        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.type'] = (() =>{

                    
    
                    
    
                    

                    function main(data , type){

        /**
 * 
 * 对于 typeof 的简单封装
 * 
 * @param {mixed} data 检验数据
 * 
 * @param {string} type 检验数据类型
 * 
 * @return {boolean} 如果检验数据的数据类型与检验数据类型一致，则返回 true，否则返回 false 
 * 
 */

 return typeof data === type ;

    }
    
                    return function(data , type){
    
                        
    
                        return main.call(this , data , type) ;
                    } ;
    
                })();

innerExports['src::is.string'] = (() =>{

                    let isType;
    
                    let var_init_locked_1594040395529;
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为字符串类型
 * 
 * @import is.type
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果给定值为字符串类型则返回 true , 否则返回 false 
 * 
 */

return isType(data , 'string') ;

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1594040395529){

            isType = include('src::is.type');

            var_init_locked_1594040395529 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.array'] = (() =>{

                    let isType;
    
                    let var_init_locked_1594040395551;
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为数组类型
 * 
 * @import is.type
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果给定值为数组类型则返回 true , 否则返回 false 
 * 
 */

 return Array.isArray(data) ;

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1594040395551){

            isType = include('src::is.type');

            var_init_locked_1594040395551 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.empty'] = (() =>{

                    let isArray;
    
                    let var_init_locked_1594040395287;
    
                    

                    function main(data , allowEmptyString){

        /**
 * 
 * 判定数据是否为空
 * 
 * @import is.array
 * 
 * @param {mixed} data 检验数据
 * 
 * @param {boolean} [allowEmptyString = false] 是否视空符串不为空，默认空符串为空
 * 
 * @return {mixed} 如果给定值为空则返回 true , 否则返回 false  
 * 
 */

return (data == null) || (!allowEmptyString ? data === '' : false) || (isArray(data) && data.length === 0);

    }
    
                    return function(data , allowEmptyString = false){
    
                        
        if(!var_init_locked_1594040395287){

            isArray = include('src::is.array');

            var_init_locked_1594040395287 = true ;
        }
        
    
                        return main.call(this , data , allowEmptyString) ;
                    } ;
    
                })();

innerExports['src::string.split'] = (() =>{

                    let isEmpty;
    
                    let var_init_locked_1594040394223;
    
                    

                    
/**
 * 
 * 将字符串通过间隔符分隔成数组
 * 
 * @import is.empty
 * 
 * @param {String} target 字符串
 * 
 * @param {RegEx} splitRe 字符串分隔符
 * 
 * @scoped
 * 
 */

function main(target , splitRe){

    return target.split(splitRe).filter(filter) ;
 }

 function filter(target){

    return !isEmpty(target) ;
 }
    
                    return function(target , splitRe){
    
                        
        if(!var_init_locked_1594040394223){

            isEmpty = include('src::is.empty');

            var_init_locked_1594040394223 = true ;
        }
        
    
                        return main.call(this , target , splitRe) ;
                    } ;
    
                })();

innerExports['src::is.object'] = (() =>{

                    let isType;
    
                    let var_init_locked_1604404336989;
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为对象类型
 * 
 * @import is.type
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果给定值为对象类型则返回 true , 否则返回 false 
 * 
 */

return typeof data === 'object' ;

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1604404336989){

            isType = include('src::is.type');

            var_init_locked_1604404336989 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::object.value.get'] = (() =>{

                    let split,isObject,isArray;
    
                    let var_init_locked_1594040394219;
    
                    

                    function main(data , key){

        
/**
 * 
 * 获得一个对象的键值
 * 
 * @import split from string.split
 * 
 * @import is.object
 * 
 * @import is.array
 * 
 * @param {object} data 对象数据
 * 
 * @param {string} [key = '.'] 对象键值
 * 
 * @return {mixed} 对应对象数据的键值的数据 
 * 
 */

if(key === '.'){

    return data ;
}

const arrayItemRe1 = /^(\w+)\[(\d+)\]$/,
      arrayItemRe2 = /^\[(\d+)\]$/;

if(isObject(data) || isArray(data)){

    let keys = split(key , /\./),
        result;

    for(let key of keys){

        if(arrayItemRe1.test(key) || arrayItemRe2.test(key)){

            {
                let keyMatch = key.match(arrayItemRe1) ;
    
                if(keyMatch){
    
                    result = data[keyMatch[1]][Number(keyMatch[2])] ;
                
                }
            }
    
            {
                let keyMatch = key.match(arrayItemRe2) ;
    
                if(keyMatch){
    
                    result = data[Number(keyMatch[1])] ;
                
                }
            }
        
        }else{

            result = data[key] ;
        }

        if(isObject(result) || isArray(result)){

            data = result ;
        
        }else{

            break ;
        }
    }

    return result ;
}

    }
    
                    return function(data , key = '.'){
    
                        
        if(!var_init_locked_1594040394219){

            split = include('src::string.split');
isObject = include('src::is.object');
isArray = include('src::is.array');

            var_init_locked_1594040394219 = true ;
        }
        
    
                        return main.call(this , data , key) ;
                    } ;
    
                })();

innerExports['config::storage'] = (() =>{

                    let get;
    
                    let var_init_locked_1599356321425;
    
                    

                    const config = {
    "name":"zbee-localforage"
};
                function main(key){

                    return get(config , key) ;

                }
                
    
                    return function(key){
    
                        
        if(!var_init_locked_1599356321425){

            get = include('src::object.value.get');

            var_init_locked_1599356321425 = true ;
        }
        
    
                        return main.call(this , key) ;
                    } ;
    
                })();

innerExports['src::storage'] = (() =>{

                let isString,name;

                let var_init_locked_1599356321461;

                let var_class_1599356321461;

                

                return function(){

                    
        if(!var_init_locked_1599356321461){

            isString = include('src::is.string');
name = config('storage' , 'name');

            var_init_locked_1599356321461 = true ;
        }
        

                    

                    
        if(!var_class_1599356321461){

            /**
 * 
 * 数据存储器
 * 
 * @import is.string
 * 
 * @config name from storage...name
 * 
 * @class
 * 
 */

 class main{

    getKey(key){

        return `${name}-${key}` ;
    }

    setItem(key , value){

        let me = this ;

        me.doSetItem(me.getKey(key) , value) ;
    }

    getItem(key){

        let me = this ;

        return me.doGetItem(me.getKey(key)) ;
    }

    removeItem(key){

        let me = this ;

        return me.doRemoveItem(me.getKey(key)) ;
    }

    key(index){

       let me = this,
           key = me.doKey(index);

        if(isString(key)){

            return key.replace(`${name}-`) ;
        }
    }

    clear(){

        return this.doClear() ;
    }
 }

            var_class_1599356321461 = class extends main{

                static get __ZBEE_IS_CLASS__(){

                    return true ;
                }


                get __ZBEE_CLASS__(){

                    return true ;
                }

                get __ZBEE_CURRENT_CLASS__(){

                    return var_class_1599356321461 ;
                }

                get __ZBEE_CLASS_NAME__(){

                    return 'src::storage' ;
                }

            } ;
        }
        

                    return var_class_1599356321461;
                } ;

            })();

innerExports['src::array.remove.index'] = (() =>{

                    
    
                    
    
                    

                    function main(data , index){

        
/**
 * 
 * 根据数组下标删除对应项
 * 
 * @param {array} data 作用数组
 * 
 * @param {number} index 数组项的下标
 * 
 * @return {boolean} 如果删除成功则返回 true , 否则返回　false 
 * 
 */

if(index >= 0 && index < data.length){

    data.splice(index , 1) ;

    return true ;
}

return false ;

    }
    
                    return function(data , index){
    
                        
    
                        return main.call(this , data , index) ;
                    } ;
    
                })();

innerExports['src::is.object.simple'] = (() =>{

                    
    
                    
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为简单对象类型
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果给定值为简单对象类型则返回 true , 否则返回 false 
 * 
 */

return data instanceof Object && data.constructor === Object;

    }
    
                    return function(data){
    
                        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.number'] = (() =>{

                    let isType;
    
                    let var_init_locked_1594040395600;
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为数值类型
 * 
 * @import is.type
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果给定值为数值类型则返回 true , 否则返回 false 
 * 
 */

return isType(data , 'number') && isFinite(data);

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1594040395600){

            isType = include('src::is.type');

            var_init_locked_1594040395600 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.boolean'] = (() =>{

                    let isType;
    
                    let var_init_locked_1594040395602;
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为布尔类型
 * 
 * @import is.type
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果给定值为布尔类型则返回 true , 否则返回 false 
 * 
 */

return isType(data , 'boolean') ;

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1594040395602){

            isType = include('src::is.type');

            var_init_locked_1594040395602 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.date'] = (() =>{

                    
    
                    
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为日期类型
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {boolean} 如果给定值为日期类型则返回 true , 否则返回 false 
 * 
 */


 return Object.prototype.toString.call(data) === '[object Date]' ;

    }
    
                    return function(data){
    
                        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.function'] = (() =>{

                    let isType;
    
                    let var_init_locked_1594040395752;
    
                    

                    function main(data){

        /**
 * 
 * 判定数据是否为函数类型
 * 
 * @import is.type
 * 
 * @param {mixed} data 检验数据
 * 
 * @return {mixed} 如果给定值为函数类型则返回 true , 否则返回 false
 * 
 */

return isType(data , 'function') && !data.__ZBEE_IS_CLASS__;

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1594040395752){

            isType = include('src::is.type');

            var_init_locked_1594040395752 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::data.type'] = (() =>{

                    let isObject,isArray,isString,isNumber,isBoolean,isDate,isFunction;
    
                    let var_init_locked_1594040395596;
    
                    

                    function main(data){

        /**
 * 
 * 返回数据类型描述
 * 
 * @import isObject from is.object.simple
 * 
 * @import is.array
 * 
 * @import is.string
 * 
 * @import is.number
 * 
 * @import is.boolean
 * 
 * @import is.date
 * 
 * @import is.string
 * 
 * @import is.function
 * 
 * @param {mixed} data 数据
 * 
 * @return {string} 数据类型描述 
 * 
 */

 if(isObject(data)){

    return 'object' ;
 }

 if(isArray(data)){

    return 'array' ;
 }

 if(isString(data)){

    return 'string' ;
 }

 if(isNumber(data)){

   return 'number' ;
 }

 if(isBoolean(data)){

   return 'boolean' ;
 }

 if(isDate(data)){

  return 'date' ;
  
 }

 if(isFunction(data)){

   return 'function' ;
 }

 return 'other' ;

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1594040395596){

            isObject = include('src::is.object.simple');
isArray = include('src::is.array');
isString = include('src::is.string');
isNumber = include('src::is.number');
isBoolean = include('src::is.boolean');
isDate = include('src::is.date');
isString = include('src::is.string');
isFunction = include('src::is.function');

            var_init_locked_1594040395596 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::data.equals'] = (() =>{

                    let getType;
    
                    let var_init_locked_1594040395587;
    
                    

                    /**
 * 
 * 匹配两个对象数据是否匹配
 * 
 * @import getType from data.type
 * 
 * @param {mixed} value1 第一个对象数据
 * 
 * @param {mixeds} value2 第二个对象数据
 * 
 * @return {boolean} 如果对象数据匹配则返回 true ， 否则返回 false
 * 
 */

 function main(value1 , value2){

    if(value1 === value2){

        return true ;
    }

    let type1 = getType(value1),
        type2 = getType(value2) ;

    if(type1 === type2){

        if(value1 === value2){

            return true ;
        }

        switch(type1){

            case 'object':

                return object_equals(value1 , value2) ;

            case 'array':

                return array_equals(value1 , value2) ;

            case 'date':

                return date_equals(value1 , value2) ;
        }
    }

    return false ;
 }

 const {
    keys
 } = Object ;

 function object_equals(value1 , value2){

    let names1 = keys(value1),
        names2 = keys(value2);

    if(names1.length !== names2.length){

        return false ;
    }

    for(let name of names1){

        if(!names2.includes(name)){

            return false ;
        }

        if(!main(value1[name] , value2[name])){

            return false ;
        }
    }

    return true ;
 }

 function array_equals(value1 , value2){

    if(value1.length !== value2.length){

        return false ;

    }

    let len = value1.length ;

    for(let i = 0 ; i < len ; i ++){

        if(!main(value1[i] , value2[i])){

            return false ;
        }
    }

    return true ;
 }

 function date_equals(value1 , value2){

    return value1.getTime() === value2.getTime() ;
 }
    
                    return function(value1 , value2){
    
                        
        if(!var_init_locked_1594040395587){

            getType = include('src::data.type');

            var_init_locked_1594040395587 = true ;
        }
        
    
                        return main.call(this , value1 , value2) ;
                    } ;
    
                })();

innerExports['src::array.indexOf'] = (() =>{

                    let equals;
    
                    let var_init_locked_1594040394767;
    
                    

                    function main(data , checkItem){

        
/**
 * 
 * 返回指定项目对应的下标
 * 
 * @import equals from data.equals
 * 
 * @param {mixed} data 数组
 * 
 * @param {mixed} checkItem 检测项
 * 
 * @return {Number} 数组下标
 * 
 */

 let {
     length
 } = data ;

for(let i = 0 ; i < length ; i ++){

    if(equals(data[i] , checkItem)){

        return i ;
    }
 }

 return -1 ;

    }
    
                    return function(data , checkItem){
    
                        
        if(!var_init_locked_1594040394767){

            equals = include('src::data.equals');

            var_init_locked_1594040394767 = true ;
        }
        
    
                        return main.call(this , data , checkItem) ;
                    } ;
    
                })();

innerExports['src::array.remove'] = (() =>{

                    let remove,indexOf;
    
                    let var_init_locked_1594040394762;
    
                    

                    function main(data , ...items){

        
/**
 * 
 * 在数组中去除项目
 * 
 * @import remove from array.remove.index
 * 
 * @import indexOf from array.indexOf
 * 
 * @param {array} data 数组
 * 
 * @param {mixed} [...items] 项目
 * 
 */

 for(let item of items){

    remove(data , indexOf(data , item)) ;
 }

    }
    
                    return function(data , ...items){
    
                        
        if(!var_init_locked_1594040394762){

            remove = include('src::array.remove.index');
indexOf = include('src::array.indexOf');

            var_init_locked_1594040394762 = true ;
        }
        
    
                        return main.call(this , data , ...items) ;
                    } ;
    
                })();

innerExports['src::is.directory'] = (() =>{

                    
    
                    
    
                    

                    function main(path){

        
/**
 * 
 * 判断路径是否为文件夹路径
 * 
 * @param {string} path 路径
 * 
 * @return {boolean} 路径是文件夹则返回 true , 否则返回 false
 * 
 */

const {
    stat
} = require('fs') ;

return new Promise(resolve => stat(path , (error , stats) => error ? resolve(false) : resolve(stats.isDirectory())))  ;


    }
    
                    return function(path){
    
                        
    
                        return main.call(this , path) ;
                    } ;
    
                })();

innerExports['src::directory.create'] = (() =>{

                    let isDirectory;
    
                    let var_init_locked_1607347296799;
    
                    

                    
/**
 * 
 * 创建不存在的目录，如果存在的话，则维持现状
 * 
 * @import is.directory
 * 
 * @param {string} path 目录路径
 * 
 * @return {mixed} 返回说明 
 * 
 * @scoped
 * 
 */

const {
    mkdir
} = require('fs'),
folderRe = /(?:^\/)|(?:[^\/\\]+(?:[\/\\]|$))/g;

async function main(path){

    let folderNames = path.match(folderRe),
        folderPath = '';

    for(let folderName of folderNames){

        folderPath += folderName ;

        if(folderName !== '/' && !await isDirectory(folderPath)){

            await new Promise((resolve , reject) => mkdir(folderPath , error => error ? reject(error) : resolve())) ;
        }
    }
}

    
                    return async function(path){
    
                        
        if(!var_init_locked_1607347296799){

            isDirectory = include('src::is.directory');

            var_init_locked_1607347296799 = true ;
        }
        
    
                        return await main.call(this , path) ;
                    } ;
    
                })();

innerExports['src::file.write'] = (() =>{

                    let create;
    
                    let var_init_locked_1607348174237;
    
                    

                    async function main(path , data){

        
/**
 * 
 * 保存文件
 * 
 * @import create from directory.create
 * 
 * @param {string} path 保存文件路径
 * 
 * @param {mixed} data 保存文件内容
 * 
 * 
 */

const {
    writeFile
} = require('fs'),
{
    dirname
} = require('path');

await create(dirname(path)) ;

return new Promise((resolve , reject) => writeFile(path , data , error => error ? reject(error) : resolve())) ;

    }
    
                    return async function(path , data){
    
                        
        if(!var_init_locked_1607348174237){

            create = include('src::directory.create');

            var_init_locked_1607348174237 = true ;
        }
        
    
                        return await main.call(this , path , data) ;
                    } ;
    
                })();

innerExports['src::file.write.json'] = (() =>{

                    let write;
    
                    let var_init_locked_1607347296764;
    
                    

                    function main(path , data){

        
/**
 * 
 * 保存JSON文件
 * 
 * @import write from file.write
 * 
 * @param {string} path 保存文件路径
 * 
 * @param {mixed} data 保存文件内容
 * 
 */

return write(path , JSON.stringify(data , null , 2)) ;

    }
    
                    return function(path , data){
    
                        
        if(!var_init_locked_1607347296764){

            write = include('src::file.write');

            var_init_locked_1607347296764 = true ;
        }
        
    
                        return main.call(this , path , data) ;
                    } ;
    
                })();

innerExports['src::storage.memory'] = (() =>{

                    let Storage,remove,save,isDefined;
    
                    let var_init_locked_1607348248802;
    
                    let var_class_1607348248802;
    
                    

                    let var_global_main_1607348248802 ;
    
                    return function(config = {}){
    
                        
        if(!var_init_locked_1607348248802){

            Storage = include('src::storage')();
remove = include('src::array.remove');
save = include('src::file.write.json');
isDefined = include('src::is.defined');

            
/**
 * 
 * 内存键值存储器
 * 
 * @import Storage from ..storage value
 * 
 * @import remove from array.remove
 * 
 * @import save from file.write.json
 * 
 * @import is.defined
 * 
 * @param {object} [config = {}] 配置
 * 
 */

 async function doStorage(){

    let me = this,
    {
      storagePath,
      storage,
      storageVersion
    } = me ;

    if(isDefined(storagePath)){

      await save(storagePath , storage) ;

      if(storageVersion !== me.storageVersion){

        await doStorage() ;

      }
    }
 }

 class main{

    constructor({
      storagePath
    }){

      let me = this ;

      me.storage = {} ;

      me.keys = [] ;

      me.storagePath = storagePath ;

      me.storageVersion = 0 ;
    }

    setItem(key , value){

      let me = this,
      {
         storage,
         keys
      } = me ;

      if(!keys.includes(key)){

        keys.push(key) ;

      }

      storage[key] = value ;

      me.storageVersion ++ ;

      doStorage.call(me) ;
    }

    length(){

      return this.keys.length ;
    }

    key(index){

      return this.keys[index] ;
    }

    getItem(key){

      let {
         storage
      } = this ;

      return storage[key] || null;
    }

    removeItem(key){

      let {
         storage
      } = this ;

      if(keys.includes(key)){

         remove(keys , key) ;

         delete storage[key] ;
      }
   }
 }

            var_class_1607348248802 = class extends main{

                static get __ZBEE_IS_CLASS__(){

                    return true ;
                }


                get __ZBEE_CLASS__(){

                    return true ;
                }

                get __ZBEE_CURRENT_CLASS__(){

                    return var_class_1607348248802 ;
                }

                get __ZBEE_CLASS_NAME__(){

                    return 'src::storage.memory' ;
                }

            } ;

            main = var_class_1607348248802 ;
        
var_global_main_1607348248802 = main;

            var_init_locked_1607348248802 = true ;
        }
        
    
                        return new var_global_main_1607348248802(config) ;
                    } ;
    
                })();

innerExports['src::microservice.config.datasources'] = (() =>{

                    let storageMemory,isString,isObject;
    
                    let var_init_locked_1607342654541;
    
                    

                    function main(datasources){

        
/**
 * 
 * 处理数据源配置信息
 * 
 * @import storage.memory
 * 
 * @import is.string
 * 
 * @import isObject from is.object.simple
 * 
 * @param {object} datasources 数据源配置
 * 
 * @return {object} 处理后的数据源配置
 * 
 */

 let names = Object.keys(datasources),
     result = {};

for(let name of names){

    let datasource = datasources[name],
        datasourceClassName,
        datasourceConfig;

    if(isString(datasource)){

        datasourceClassName = datasource ;
    
    }else if(isObject(datasource)){

        datasourceClassName = datasource.type ;

        datasourceConfig = datasource.config ;
    }

    if(datasourceClassName){

        result[name] = include(datasourceClassName)(datasourceConfig) ;
    }
}

return result ;



    }
    
                    return function(datasources){
    
                        
        if(!var_init_locked_1607342654541){

            storageMemory = include('src::storage.memory');
isString = include('src::is.string');
isObject = include('src::is.object.simple');

            var_init_locked_1607342654541 = true ;
        }
        
    
                        return main.call(this , datasources) ;
                    } ;
    
                })();

innerExports['src::microservice.config.server'] = (() =>{

                    let isString,isObject,isFunction;
    
                    let var_init_locked_1607342521403;
    
                    

                    
/**
 * 
 * 处理服务端配置信息
 * 
 * @import is.string
 * 
 * @import isObject from is.object.simple
 * 
 * @import is.function
 * 
 * @param {object} server 服务端配置
 * 
 * @return {object} 处理后的服务端配置
 * 
 */

const {
    join
} = require('path'),
rootPath = process.cwd();

function main(server){

    let uris = Object.keys(server),
        result = {};

    for(let uri of uris){

        let service = server[uri],
            method,
            params,
            source;
    
        if(isString(service)){

            method = processMethod('get') ;

            params = [] ;
    
            source = processSource(service) ;
        
        }else if(isObject(service)){
    
            source = processSource(service.source) ;

            method = processMethod(service.method) ;

            params = processParams(method , service.params) ;

        }
    
        if(method && params && source){
    
            result[uri] = {
                method,
                params,
                source
            } ;
        }
    }
    
    return result ;
}

function processSource(source = () => {}){

    if(isString(source)){

        return (...args) => require(join(rootPath , source))(...args) ;
    
    }else if(isFunction(source)){

        return source ;
    }

    return () => {} ;
}

function processMethod(method = 'get'){

    switch(method){

        case 'delete':

            return 'del' ;

        case 'post':
        case 'put':
        case 'get':

            return method ;
    }

    return 'get' ;
}

function processParams(method , params = []){

    let result = [] ;

    for(let param of params){

        if(isString(param)){

            result.push({
                target:getDefaultParamTarget(method),
                property:param
            }) ;
        
        }else if(isObject(param)){

            let {
                target = getDefaultParamTarget(method),
                property
            } = param ;

            result.push({
                target,
                property
            }) ;
        }
    }

    return result ;
}

function getDefaultParamTarget(method){

    switch(method){

        case 'get':
        case 'del':

            return 'query' ;

        case 'post':
        case 'put':

            return 'body' ;
    }
}


    
                    return function(server){
    
                        
        if(!var_init_locked_1607342521403){

            isString = include('src::is.string');
isObject = include('src::is.object.simple');
isFunction = include('src::is.function');

            var_init_locked_1607342521403 = true ;
        }
        
    
                        return main.call(this , server) ;
                    } ;
    
                })();

innerExports['src::microservice.config'] = (() =>{

                    let isDefined,processDatasourceMap,processServerMap;
    
                    let var_init_locked_1607342521344;
    
                    

                    
/**
 * 
 * 处理传入的服务器配置
 * 
 * @import is.defined
 * 
 * @import processDatasourceMap from .config.datasources
 * 
 * @import processServerMap from .config.server
 * 
 * @param {object} config 服务器配置
 * 
 * @return {object} 处理后的服务器配置 
 * 
 */

 let innerConfig ;

 function main(config){

    if(isDefined(config)){

        let {
            port = 8080,
            datasources,
            server
        } = config ;

        innerConfig = {
            port,
            datasources:processDatasourceMap(datasources),
            server:processServerMap(server)
        } ;
    }

    return innerConfig ;
 }
    
                    return function(config){
    
                        
        if(!var_init_locked_1607342521344){

            isDefined = include('src::is.defined');
processDatasourceMap = include('src::microservice.config.datasources');
processServerMap = include('src::microservice.config.server');

            var_init_locked_1607342521344 = true ;
        }
        
    
                        return main.call(this , config) ;
                    } ;
    
                })();

innerExports['src::microservice.datasource'] = (() =>{

                    let config;
    
                    let var_init_locked_1607342521416;
    
                    

                    function main(name){

        
/**
 * 
 * 数据源
 * 
 * @import config from .config value
 * 
 * @param {string} name 数据源名称
 * 
 * @return {mixed} 数据源对象
 * 
 */

return config.datasources[name] ;



    }
    
                    return function(name){
    
                        
        if(!var_init_locked_1607342521416){

            config = include('src::microservice.config')();

            var_init_locked_1607342521416 = true ;
        }
        
    
                        return main.call(this , name) ;
                    } ;
    
                })();







