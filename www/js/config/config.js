var config ={
    endPointUrl:'http://localhost:8090/',
    auth:false
}

var _GET = (function() {
    var _get = {};
    var re = /[?&]([^=&]+)(=?)([^&]*)/g;
    while (m = re.exec(location.search))
        _get[decodeURIComponent(m[1])] = (m[2] == '=' ? decodeURIComponent(m[3]) : true);
    return _get;
})();