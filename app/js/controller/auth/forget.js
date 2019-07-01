app.controller('forgetCtrl', ['$scope', '$state', '$http', '$localStorage', '$timeout', 'pathService', function ($scope, $state, $http, $localStorage, $timeout, pathService) {

    domain = pathService.getDomain();

    $scope.forget = function(){
        $http({
            method : 'GET',
            url : domain + '/user/forget/' + $scope.email
        }).then(function onSuccess(response) {
            $scope.forgetSuccess = true;
            $timeout(function() {
                $scope.forgetSuccess = ""
              },3000);
            $scope.email = null;           
        }, function onError(response) {
            $scope.forgetError = response.data.message;
            $timeout(function() {
                $scope.forgetError = ""
              },1500);
            $scope.email = null;
        });
    };
}]);