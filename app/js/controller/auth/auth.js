app.controller('authCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$http', '$sessionStorage', 'pathService', function($scope, $state, $stateParams, $timeout, $http, $sessionStorage, pathService) {

    var domain = pathService.getDomain();
   
    $scope.init = function(){
        $http({
            method : 'PUT',
            url : domain + '/user/auth',
            data : {auth:$stateParams.auth}
        }).then(function onSuccess(response) {
            $sessionStorage.token = response.data.token;
            $scope.successed = true;
            $timeout(function() {
                $state.go("app.register");
            },3000);        
        }, function onError(response) {
            $scope.successed = false;  
        });
    }

    $scope.resend = function(email){
        $http({
            method : 'POST',
            url : domain + '/signup/resend',
            data : {email:email}
        }).then(function onSuccess(response) {
            $scope.submitResendSuccess = true;
            $timeout(function() {
                $state.go("app.index");
            },3000);        
        }, function onError(response) {
            $scope.submitResendError = response.data.message; 
            $timeout(function() {
                $scope.submitResendError = ""; 
            },3000); 
        });
    }

}]);