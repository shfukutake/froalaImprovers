app.factory('pathService', ['$http', function ($http) {

     var _domain = 'http://127.0.0.1:3000';
    //var _domain = 'https://api.oshiete-keibamin.com';

    var domain_web = 'https://www.oshiete-keibamin.com';
    
    // var bucket = 'keibamin-dev';
    var bucket = 'keibamin';

    return {
        getDomain: function(){ return _domain; },
        getDomainWeb: function(){ return domain_web; },
        getBucket: function(){ return bucket; },
    };
}]);