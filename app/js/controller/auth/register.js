app.controller('registerCtrl', ['$scope', '$state', '$http', '$localStorage', '$sessionStorage', '$timeout', 'pathService', function ($scope, $state, $http, $localStorage, $sessionStorage, $timeout, pathService) {

    $scope.user = {};
    $scope.registerError = "";
    domain = pathService.getDomain();
    var header = 'JWT ' + $sessionStorage.token;

    $scope.register = function(){
        $http({
            method : 'POST',
            url : domain + '/register',
            data : $scope.user,
            headers : { 'Authorization' : header }
        }).then(function onSuccess(response) {
            $localStorage.token = response.data.token;
            $timeout(function() {
                $state.go("app.keibamin.index", {directory:response.data.directory});
              },1500);
        }, function onError(response) {
            $scope.registerError = response.data.message;
            $timeout(function() {
                $scope.registerError = ""
              },1500);
            $scope.user = {};
        }).finally(function(){
            if($localStorage.token){
                $scope.$emit("login");
            }
        });
    };
}]);