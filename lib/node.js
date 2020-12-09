

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
    
                    let var_init_locked_1607416248172;
    
                    

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
Cors = require('@koa/cors'),
{
    port,
    server
} = config;

let app = new Koa(),
    router = new Router(),
    uris = Object.keys(server);

app.use(Body()) ;

app.use(Cors()) ;

for(let uri of uris){

    let {
        method,
        params,
        source
    } = server[uri] ;

    router[method](uri , async ctx => {

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

        let data = await source(...args),
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
    
                        
        if(!var_init_locked_1607416248172){

            config = include('src::microservice.config')();
get = include('src::object.value.get');
isDefined = include('src::is.defined');

            var_init_locked_1607416248172 = true ;
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
    
                    let var_init_locked_1607322246412;
    
                    

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
    
                        
        if(!var_init_locked_1607322246412){

            isType = include('src::is.type');

            var_init_locked_1607322246412 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.array'] = (() =>{

                    let isType;
    
                    let var_init_locked_1607322246514;
    
                    

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
    
                        
        if(!var_init_locked_1607322246514){

            isType = include('src::is.type');

            var_init_locked_1607322246514 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.empty'] = (() =>{

                    let isArray;
    
                    let var_init_locked_1607322246498;
    
                    

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
    
                        
        if(!var_init_locked_1607322246498){

            isArray = include('src::is.array');

            var_init_locked_1607322246498 = true ;
        }
        
    
                        return main.call(this , data , allowEmptyString) ;
                    } ;
    
                })();

innerExports['src::string.split'] = (() =>{

                    let isEmpty;
    
                    let var_init_locked_1607322246484;
    
                    

                    
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
    
                        
        if(!var_init_locked_1607322246484){

            isEmpty = include('src::is.empty');

            var_init_locked_1607322246484 = true ;
        }
        
    
                        return main.call(this , target , splitRe) ;
                    } ;
    
                })();

innerExports['src::is.object'] = (() =>{

                    let isType;
    
                    let var_init_locked_1607322246529;
    
                    

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
    
                        
        if(!var_init_locked_1607322246529){

            isType = include('src::is.type');

            var_init_locked_1607322246529 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::object.value.get'] = (() =>{

                    let split,isObject,isArray;
    
                    let var_init_locked_1607322246469;
    
                    

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
    
                        
        if(!var_init_locked_1607322246469){

            split = include('src::string.split');
isObject = include('src::is.object');
isArray = include('src::is.array');

            var_init_locked_1607322246469 = true ;
        }
        
    
                        return main.call(this , data , key) ;
                    } ;
    
                })();

innerExports['config::storage'] = (() =>{

                    let get;
    
                    let var_init_locked_1607322246443;
    
                    

                    const config = {
    "name":"zbee-localforage"
};
                function main(key){

                    return get(config , key) ;

                }
                
    
                    return function(key){
    
                        
        if(!var_init_locked_1607322246443){

            get = include('src::object.value.get');

            var_init_locked_1607322246443 = true ;
        }
        
    
                        return main.call(this , key) ;
                    } ;
    
                })();

innerExports['src::storage'] = (() =>{

                    let isString,name;
    
                    let var_init_locked_1607322246396;
    
                    let var_class_1607322246396;
    
                    

                    let var_global_main_1607322246396 ;
    
                    return function(){
    
                        
        if(!var_init_locked_1607322246396){

            isString = include('src::is.string');
name = config('storage' , 'name');

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

            var_class_1607322246396 = class extends main{

                static get __ZBEE_IS_CLASS__(){

                    return true ;
                }


                get __ZBEE_CLASS__(){

                    return true ;
                }

                get __ZBEE_CURRENT_CLASS__(){

                    return var_class_1607322246396 ;
                }

                get __ZBEE_CLASS_NAME__(){

                    return 'src::storage' ;
                }

            } ;

            main = var_class_1607322246396 ;
        
var_global_main_1607322246396 = main;

            var_init_locked_1607322246396 = true ;
        }
        
    
                        return var_global_main_1607322246396 ;
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
    
                    let var_init_locked_1607322246658;
    
                    

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
    
                        
        if(!var_init_locked_1607322246658){

            isType = include('src::is.type');

            var_init_locked_1607322246658 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::is.boolean'] = (() =>{

                    let isType;
    
                    let var_init_locked_1607322246675;
    
                    

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
    
                        
        if(!var_init_locked_1607322246675){

            isType = include('src::is.type');

            var_init_locked_1607322246675 = true ;
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
    
                    let var_init_locked_1607322246708;
    
                    

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
    
                        
        if(!var_init_locked_1607322246708){

            isType = include('src::is.type');

            var_init_locked_1607322246708 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::data.type'] = (() =>{

                    let isObject,isArray,isString,isNumber,isBoolean,isDate,isFunction;
    
                    let var_init_locked_1607322246626;
    
                    

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
    
                        
        if(!var_init_locked_1607322246626){

            isObject = include('src::is.object.simple');
isArray = include('src::is.array');
isString = include('src::is.string');
isNumber = include('src::is.number');
isBoolean = include('src::is.boolean');
isDate = include('src::is.date');
isString = include('src::is.string');
isFunction = include('src::is.function');

            var_init_locked_1607322246626 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::data.equals'] = (() =>{

                    let getType;
    
                    let var_init_locked_1607322246610;
    
                    

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
    
                        
        if(!var_init_locked_1607322246610){

            getType = include('src::data.type');

            var_init_locked_1607322246610 = true ;
        }
        
    
                        return main.call(this , value1 , value2) ;
                    } ;
    
                })();

innerExports['src::array.indexOf'] = (() =>{

                    let equals;
    
                    let var_init_locked_1607322246590;
    
                    

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
    
                        
        if(!var_init_locked_1607322246590){

            equals = include('src::data.equals');

            var_init_locked_1607322246590 = true ;
        }
        
    
                        return main.call(this , data , checkItem) ;
                    } ;
    
                })();

innerExports['src::array.remove'] = (() =>{

                    let remove,indexOf;
    
                    let var_init_locked_1607322246558;
    
                    

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
    
                        
        if(!var_init_locked_1607322246558){

            remove = include('src::array.remove.index');
indexOf = include('src::array.indexOf');

            var_init_locked_1607322246558 = true ;
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
    
                    let var_init_locked_1607403147954;
    
                    

                    
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
    
                        
        if(!var_init_locked_1607403147954){

            isDirectory = include('src::is.directory');

            var_init_locked_1607403147954 = true ;
        }
        
    
                        return await main.call(this , path) ;
                    } ;
    
                })();

innerExports['src::file.write'] = (() =>{

                    let create;
    
                    let var_init_locked_1607403147933;
    
                    

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
    
                        
        if(!var_init_locked_1607403147933){

            create = include('src::directory.create');

            var_init_locked_1607403147933 = true ;
        }
        
    
                        return await main.call(this , path , data) ;
                    } ;
    
                })();

innerExports['src::file.write.json'] = (() =>{

                    let write;
    
                    let var_init_locked_1607403147912;
    
                    

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
    
                        
        if(!var_init_locked_1607403147912){

            write = include('src::file.write');

            var_init_locked_1607403147912 = true ;
        }
        
    
                        return main.call(this , path , data) ;
                    } ;
    
                })();

innerExports['src::is.file'] = (() =>{

                    
    
                    
    
                    

                    function main(path){

        
/**
 * 
 * 判断路径是否为文件路径
 * 
 * @param {string} path 路径
 * 
 * @return {boolean} 路径是文件则返回 true , 否则返回 false
 * 
 */

const {
    stat
} = require('fs') ;

return new Promise(resolve => stat(path , (error , stats) => error ? resolve(false) : resolve(stats.isFile())))  ;


    }
    
                    return function(path){
    
                        
    
                        return main.call(this , path) ;
                    } ;
    
                })();

innerExports['src::file.read'] = (() =>{

                    let isFile;
    
                    let var_init_locked_1607403148015;
    
                    

                    async function main(path){

        /**
 * 
 * 读取文件
 * 
 * @import is.file
 * 
 * @param {string} path 文本文件路径
 * 
 * @return {ArrayBuffer} 原生文件内容
 * 
 */

const {
    readFile
} = require('fs') ;

if(await isFile(path)){

    return new Promise((resolve , reject) => readFile(path , (error , data) => error ? reject(error) : resolve(data))) ;
}

    }
    
                    return async function(path){
    
                        
        if(!var_init_locked_1607403148015){

            isFile = include('src::is.file');

            var_init_locked_1607403148015 = true ;
        }
        
    
                        return await main.call(this , path) ;
                    } ;
    
                })();

innerExports['src::file.read.text'] = (() =>{

                    let read;
    
                    let var_init_locked_1607403147995;
    
                    

                    /**
 * 
 * 读取文本文件
 * 
 * @require chokidar
 * 
 * @import read from file.read
 * 
 * @param {string} path 文本文件路径
 * 
 * @param {function} [watchFn] 是否以监听方式获取文件内容
 * 
 * @return {string} 文本文件内容
 * 
 */

 const chokidar = require('chokidar'),
       cacheFiles = {} ;

 async function main(path , watchFn){

    if(!watchFn){

        return await getText(path) ;
    
    }else{

        if(cacheFiles.hasOwnProperty(path)){

            watchFn(cacheFiles[path]) ;
        
        }else{

            chokidar.watch(path).on('change' , async path => watchFn(cacheFiles[path] = await getText(path))) ;

            watchFn(cacheFiles[path] = await getText(path)) ;
        }   
    }
 }

 async function getText(path) {
     
    let data = await read(path) ;

    if(data){

        return data.toString('utf8') ;
    }
 }

    
                    return async function(path , watchFn){
    
                        
        if(!var_init_locked_1607403147995){

            read = include('src::file.read');

            var_init_locked_1607403147995 = true ;
        }
        
    
                        return await main.call(this , path , watchFn) ;
                    } ;
    
                })();

innerExports['src::json.parse'] = (() =>{

                    
    
                    
    
                    

                    function main(data){

        
/**
 * 
 * 将 JSON 字符串转换成 JSON 数据
 * 
 * @param {string} data JSON 字符串
 * 
 * @return {mixed} JSON 数据 
 * 
 */

try{

    return JSON.parse(data) ;

 }catch(err){


 }

    }
    
                    return function(data){
    
                        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::file.read.json'] = (() =>{

                    let read,parse;
    
                    let var_init_locked_1607403147984;
    
                    

                    
/**
 * 
 * 读取 JSON 文件
 * 
 * @import read from file.read.text
 * 
 * @import parse from json.parse
 * 
 * @param {string} path JSON文件存储路径
 * 
 *  @param {function} [watchFn] 是否以监听方式获取文件内容
 * 
 * @return {mixed} JSON数据 
 * 
 */

 async function main(path , watchFn){

    if(watchFn){

        read(path , data => watchFn(getJSON(data))) ;
     
    }else{
    
        return getJSON(await read(path)) ;
    
    }
 }

 function getJSON(data){

    if(data){

        return parse(data) ;
    }
 }

 



    
                    return async function(path , watchFn){
    
                        
        if(!var_init_locked_1607403147984){

            read = include('src::file.read.text');
parse = include('src::json.parse');

            var_init_locked_1607403147984 = true ;
        }
        
    
                        return await main.call(this , path , watchFn) ;
                    } ;
    
                })();

innerExports['src::storage.memory'] = (() =>{

                    let Storage,remove,save,read,isDefined;
    
                    let var_init_locked_1607497816322;
    
                    let var_class_1607497816322;
    
                    

                    let var_global_main_1607497816322 ;
    
                    return function(config = {}){
    
                        
        if(!var_init_locked_1607497816322){

            Storage = include('src::storage')();
remove = include('src::array.remove');
save = include('src::file.write.json');
read = include('src::file.read.json');
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
 * @import read from file.read.json
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
      storageVersion,
      storageLocked
    } = me ;

    if(isDefined(storagePath) && storageLocked !== true){

      me.storageLocked = true ;

      await save(storagePath , storage) ;

      while(storageVersion !== me.storageVersion){

        storageVersion = me.storageVersion ;

        await save(storagePath , storage) ;

      }

      me.storageLocked = false ;
    }
 }

 async function doLoad(){

    let me = this,
    {
      storagePath
    } = me,
    storage = await read(storagePath) || {};

    me.storage = storage ;

    me.keys = Object.keys(storage) ;

    doLoad = () => {} ;
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

    async setItem(key , value){

      let me = this ;

      await doLoad.call(me) ;

      let {
         storage,
         keys
      } = me ;

      if(!keys.includes(key)){

        keys.push(key) ;

      }

      storage[key] = value ;

      me.storageVersion ++ ;

      await doStorage.call(me) ;
    }

    get length(){

      let me = this ;

      return new Promise(async callback => {

        await doLoad.call(me) ;

        callback(me.keys.length) ;

      }) ;

    }

    async key(index){

      let me = this ;

      await doLoad.call(me) ;

      return me.keys[index] ;
    }

    async getItem(key){

      let me = this ;

      await doLoad.call(me) ;

      let {
         storage
      } = me ;

      return storage[key] || null;
    }

    async removeItem(key){

      let me = this ;

      await doLoad.call(me) ;

      let {
         storage
      } = me ;

      if(keys.includes(key)){

         remove(keys , key) ;

         delete storage[key] ;
      }
   }
 }

            var_class_1607497816322 = class extends main{

                static get __ZBEE_IS_CLASS__(){

                    return true ;
                }


                get __ZBEE_CLASS__(){

                    return true ;
                }

                get __ZBEE_CURRENT_CLASS__(){

                    return var_class_1607497816322 ;
                }

                get __ZBEE_CLASS_NAME__(){

                    return 'src::storage.memory' ;
                }

            } ;

            main = var_class_1607497816322 ;
        
var_global_main_1607497816322 = main;

            var_init_locked_1607497816322 = true ;
        }
        
    
                        return new var_global_main_1607497816322(config) ;
                    } ;
    
                })();

innerExports['src::array.from'] = (() =>{

                    let isEmpty,isString;
    
                    let var_init_locked_1607416327270;
    
                    

                    function main(data){

        /**
 * 
 * 将非数组数据打包成数组数据
 * 
 * @import is.empty
 * 
 * @import is.string
 * 
 * @param {mixed} data 数据
 * 
 * @return {array} 数组数据
 * 
 */

if(isEmpty(data)){

    return [];
}

if (data && data.length !== undefined && !isString(data)) {

    return Array.from(data);

}

return [
    data
];

    }
    
                    return function(data){
    
                        
        if(!var_init_locked_1607416327270){

            isEmpty = include('src::is.empty');
isString = include('src::is.string');

            var_init_locked_1607416327270 = true ;
        }
        
    
                        return main.call(this , data) ;
                    } ;
    
                })();

innerExports['src::environment.name'] = (() =>{

                    
    
                    
    
                    let var_once_value_1607416328241;

                    function main(){

        
/**
 * 
 * 检测当前环境，返回值有 browser、zbee、node
 * 
 * @return {string} 环境名称 
 * 
 * @once
 * 
 */

const {
    toString
} = Object.prototype,
BROWSER_NAMES = {
    micromessenger: 'weixin-browser',
    ue4:'ue4-browser',
    unity: 'unity-browser',
    electron:'electron-browser',
    browser:'browser'
};

if(typeof window === 'object' && toString.call(window) === '[object Window]' && typeof document === 'object' && toString.call(document) === '[object HTMLDocument]'){
    
    return BROWSER_NAMES[(navigator.userAgent.toLowerCase().match(/micromessenger|ue4|unity|electron/) || ['browser'])[0]];

}else if(typeof process === 'object' && typeof global === 'object' && typeof require === 'function'){

    try{

        let [
            path
        ] = process.argv ;

        return /electron\.exe$/.test(path) ;

    }catch(err){

    }

    return 'node' ;
}

return 'other' ;

    }
    
                    return function(){
    
                        
    
                        
        if(var_once_value_1607416328241){

            return var_once_value_1607416328241 ;

        }
        return var_once_value_1607416328241 = main.call(this ) ;
        
                    } ;
    
                })();

innerExports['src::id.generate'] = (() =>{

                    let getName;
    
                    let var_init_locked_1607416328218;
    
                    

                    
/**
 * 
 * 生成唯一的编号
 * 
 * @import getName from environment.name
 * 
 * @param {string} prefix 编号前缀
 * 
 * @return {string} 生成后的唯一编号
 * 
 * @require uuid
 * 
 */

 let count = 1 ; 

 function main(prefix = 'zb-'){

    return `${prefix}${count ++}` ;

 }
    
                    return function(prefix){
    
                        
        if(!var_init_locked_1607416328218){

            getName = include('src::environment.name');

            var_init_locked_1607416328218 = true ;
        }
        
    
                        return main.call(this , prefix) ;
                    } ;
    
                })();

innerExports['src::axios'] = (() =>{

                    let from,generate,isFunction,isString;
    
                    let var_init_locked_1607416850218;
    
                    

                    
/**
 * 
 * 基于 axios 的再封装
 * 
 * @import from from array.from
 * 
 * @import generate from id.generate
 * 
 * @import is.function
 * 
 * @import is.string
 * 
 * @param {object} params 请求参数
 * 
 * @param {function} [callback] 请求回调
 * 
 * @return {function} 取消请求函数  
 * 
 * @require axios
 * 
 * @require fs
 * 
 */

 const 
 axios = require('axios'),
 {
    stringify
 } = require('qs'),
 CancelToken = axios.CancelToken;

 function main(params , callback){

    if(isFunction(callback)){

        let source = CancelToken.source() ;

        axios({
            ...processParams(params),
            cancelToken: source.token
        })
            .then(response => callback(true , response.data , response))
            .catch(error => {

                if(!axios.isCancel(error)){

                    callback(false , error.message , error) ;
                }

            });

        return () => source.cancel() ;
    }

    return new Promise((resolve , reject) => axios(processParams(params))
                .then(({
                    data
                }) => resolve(data))
                .catch(error => reject(error))) ;
 }

 function processMethod(method){

    if(isString(method)){

        return method.toUpperCase() ;
    }

    return 'GET' ;
 }

 function processParams({
     form = false,
     params,
     files,
     ...options
 }){

    options.method = processMethod(options.method) ;

    if(form && options.method !== 'GET'){

       return processForm(options , params) ;
    }

    if(files){

        return processUpload(options , from(files)) ;
    }

    return {
        params,
        ...options
    } ;
 }

 function processForm(options , params){

    return {
        ...options,
        data:stringify(params)
    } ;
 }

 function processUpload(options , files){

    let data = new FormData() ;

    for(let file of files){

        data.append(generate('file-') , file) ;
    }

    options.method = 'POST' ;

    return {
        ...options,
        data
    } ;
 }
    
                    return function(params , callback){
    
                        
        if(!var_init_locked_1607416850218){

            from = include('src::array.from');
generate = include('src::id.generate');
isFunction = include('src::is.function');
isString = include('src::is.string');

            var_init_locked_1607416850218 = true ;
        }
        
    
                        return main.call(this , params , callback) ;
                    } ;
    
                })();

innerExports['src::microservice.config.datasources'] = (() =>{

                    let storageMemory,axios,isString,isObject;
    
                    let var_init_locked_1607507370563;
    
                    

                    function main(datasources){

        
/**
 * 
 * 处理数据源配置信息
 * 
 * @import storage.memory
 * 
 * @import axios
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

    switch(datasourceClassName){

        case 'axios':

            result[name] = axios ;

            break ;

        default:

            if(datasourceClassName){

                result[name] = include(datasourceClassName)(datasourceConfig) ;
            }
    }

    
}

return result ;



    }
    
                    return function(datasources){
    
                        
        if(!var_init_locked_1607507370563){

            storageMemory = include('src::storage.memory');
axios = include('src::axios');
isString = include('src::is.string');
isObject = include('src::is.object.simple');

            var_init_locked_1607507370563 = true ;
        }
        
    
                        return main.call(this , datasources) ;
                    } ;
    
                })();

innerExports['src::microservice.config.server'] = (() =>{

                    let isString,isObject,isFunction;
    
                    let var_init_locked_1607507370586;
    
                    

                    
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
} = require('path');

function main(server , rootPath){

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
    
            source = processSource(service , rootPath) ;
        
        }else if(isObject(service)){
    
            source = processSource(service.source , rootPath) ;

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

function processSource(source = () => {} , rootPath){

    if(isString(source)){

        return async (...args) => await require(join(rootPath , source))(...args) ;
    
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
    
                        
        if(!var_init_locked_1607507370586){

            isString = include('src::is.string');
isObject = include('src::is.object.simple');
isFunction = include('src::is.function');

            var_init_locked_1607507370586 = true ;
        }
        
    
                        return main.call(this , server) ;
                    } ;
    
                })();

innerExports['src::microservice.config'] = (() =>{

                    let isDefined,processDatasourceMap,processServerMap;
    
                    let var_init_locked_1607507370529;
    
                    

                    
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

 const {
    join
 } = require('path') ;

 let innerConfig ;

 function main(config){

    if(isDefined(config)){

        let {
            port = 8080,
            datasources = {},
            server = {},
            sourceCodeDirectory = 'src'
        } = config ;

        sourceCodeDirectory = join(process.cwd() , sourceCodeDirectory) ;

        innerConfig = {
            sourceCodeDirectory,
            port,
            datasources:processDatasourceMap(datasources),
            server:processServerMap(server , sourceCodeDirectory)
        } ;
    }

    return innerConfig ;
 }
    
                    return function(config){
    
                        
        if(!var_init_locked_1607507370529){

            isDefined = include('src::is.defined');
processDatasourceMap = include('src::microservice.config.datasources');
processServerMap = include('src::microservice.config.server');

            var_init_locked_1607507370529 = true ;
        }
        
    
                        return main.call(this , config) ;
                    } ;
    
                })();

innerExports['src::microservice.datasource'] = (() =>{

                    let config;
    
                    let var_init_locked_1607332100838;
    
                    

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
    
                        
        if(!var_init_locked_1607332100838){

            config = include('src::microservice.config')();

            var_init_locked_1607332100838 = true ;
        }
        
    
                        return main.call(this , name) ;
                    } ;
    
                })();







