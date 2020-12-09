const {
    datasource
} = require('../../../../lib');

const AJAX = datasource('ajax') ;

module.exports = () => AJAX({
    url:'https://b2c.pm.hobooa.com/index.php/api/v1/app/method/get.app.captcha.callurl/'
}).then(({
    data
}) => data)
.then(({
    call_url
}) => call_url) ;