app.controller('loginCtrl', ['$scope', '$state', '$stateParams', '$http', '$transitions', '$localStorage', '$sessionStorage', '$timeout', 'pathService', 'loginService', 
    function ($scope, $state, $stateParams, $http, $transitions, $localStorage, $sessionStorage, $timeout, pathService, loginService) {

    $scope.user = {};
    $scope.loginError = "";
    domain = pathService.getDomain();
    var prevState = ""
    var prevDirectory = ""
    var prevContentsid = ""
    var prevTagName = ""
    var prevQuery = ""

    $transitions.onSuccess({}, function(transition) {
        prevState = transition.from().name; 
        prevDirectory = transition.params('from').directory;
        prevContentsid = transition.params('from').contentsid;
        prevTagName = transition.params('from').tagname;
        prevQuery = transition.params('from').query;
    });    
    
    $scope.login = function(){       
        $http({
            method : 'POST',
            url : domain + '/login',
            data : $scope.user
        }).then(function onSuccess(response) {
            modalClose();
            if(response.data.directory){
                $localStorage.token = response.data.token;
                switch (prevState){
                    case "app.keibamin.index":
                        $state.go("app.keibamin.index", {directory:prevDirectory});
                        break;
                    case "app.keibamin.contents":
                        $state.go("app.keibamin.contents", {directory:prevDirectory, contentsid:prevContentsid});
                        break;
                    case "app.search":
                        $state.go("app.search", {query:prevQuery});
                        break;
                    case "app.tag":
                        $state.go("app.tag", {tagname:prevTagName});
                        break;
                    default:
                        $state.go("app.keibamin.index", {directory:response.data.directory});
                        break;
                }                
            }else{
                if(response.data.auth){
                    $state.go("app.auth", {auth:null});
                }else{
                    $sessionStorage.token = response.data.token;
                    $state.go("app.register");
                }
            }
        }, function onError(response) {
            $scope.loginError = response.data.message;
            $localStorage.$reset();
            $timeout(function() {
                $scope.loginError = ""
              },5000);
            $scope.user.password = "";
        }).finally(function(){
            if($localStorage.token){
                $scope.$emit("login");
            }
        });
    };

    $scope.forget = function(){
        $state.go("app.forget");
        modalClose();
    }

    function modalClose(){
        $('body').removeClass('modal-open'); 
        $('.modal-backdrop').remove();
        $('#login').modal('hide');
    };

}]);