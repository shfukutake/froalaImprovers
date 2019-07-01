app.factory('loginService',  ['$localStorage', function ($localStorage) {

    var _user = null;
    
    if($localStorage.token){
        _user = $localStorage.token;
    };
    
    return {
        isLogged: function(){
            return $localStorage.token; 
        },
        login: function(user){
            _user = user;
        },
        logout: function(){
            _user = null;
        }
    };  
}]);