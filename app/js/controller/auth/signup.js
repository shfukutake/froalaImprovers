app.controller('signupCtrl', ['$scope', '$state', '$http', '$localStorage', '$timeout', 'pathService', function ($scope, $state, $http, $localStorage, $timeout, pathService) {

    $scope.user = {};
    $scope.signupError = "";
    domain = pathService.getDomain();
    $scope.clicking = false;

    $scope.signup = function(){
        $scope.clicking = true;
        $http({
            method : 'POST',
            url : domain + '/signup',
            data : $scope.user
        }).then(function onSuccess(response) {
            $scope.signupError = "ユーザ本登録に関するメールを送付しました。内容に従って本登録を完了させてください。"
            $localStorage.$reset();
            $timeout(function() {
                modalClose();
                $scope.clicking = false;
              },3000);
            $state.go("app.index");
        }, function onError(response) {
            $scope.signupError = response.data.message;
            $localStorage.$reset();
            $timeout(function() {
                $scope.signupError = ""
                $scope.clicking = false;
              },5000);
            $scope.user = {};
        });
    };

    function modalClose(){
        $('body').removeClass('modal-open'); 
        $('.modal-backdrop').remove();
        $('#signup').modal('hide');
    };

}]);