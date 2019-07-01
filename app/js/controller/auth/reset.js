app.controller('resetCtrl', ['$scope', '$state', '$stateParams', '$http', '$localStorage', '$timeout', 'pathService', function ($scope, $state, $stateParams, $http, $localStorage, $timeout, pathService) {

    domain = pathService.getDomain();
    

    $scope.checkPassword = function(){
        if($scope.password !== $scope.password_re){
            $scope.changeErrorMsg = "同一のパスワードを入力してください。"
            $scope.changeError = true;
            $timeout(function() {
                $scope.changeErrorMsg = ""
              },1000);
        }else{
            $scope.changeErrorMsg = ""   
            $scope.changeError = false;
        }
    }

    $scope.reset = function(){

        $scope.submitData = {};
        $scope.submitData.password = $scope.password
        $scope.submitData.reset = $stateParams.resetid;

        $http({
            method : 'PUT',
            url : domain + '/user/password/reset',
            data : $scope.submitData
        }).then(function onSuccess(response) {
            $scope.resetSuccess = true;
            $timeout(function() {
                $scope.resetSuccess = ""
              },3000);
            $scope.password = null; 
            $scope.password_re = null;            
        }, function onError(response) {
            $scope.resetError = response.data.message;
            $timeout(function() {
                $scope.resetError = ""
              },1500);
              $scope.password = null; 
              $scope.password_re = null;    
        });
    };
}]);