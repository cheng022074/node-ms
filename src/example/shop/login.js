const {
    datasource
} = require('../../../lib');

const AJAX = datasource('ajax') ;

module.exports = (username , password , login_code) => {

    console.log(username , password , login_code) ;

    return AJAX({
        method:'post',
        form:true,
        params:{
            appkey:'87563314',
            username,
            password,
            platform:'web',
            login_code,
            method:'login.admin.user'
        },
        url:'https://b2c.pm.hobooa.com/index.php/api/v1/admin'
    }) ;

} ;