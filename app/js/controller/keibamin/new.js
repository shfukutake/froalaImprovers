app.controller('newCtrl', ['$scope', '$state', '$stateParams', '$http', '$localStorage', 'pathService', function($scope, $state, $stateParams, $http, $localStorage, pathService) {

    var domain = pathService.getDomain();
    var header = 'JWT ' + $localStorage.token;

    $scope.new = {};
    $scope.new.contents = "<p>default text</p>";

    $scope.init = function(){
        if($localStorage.token){
            $http({
                method : 'GET',
                url : domain + '/user/' + $stateParams.directory + '/judge',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                if(!response.data.judge){
                    $state.go("app.index");
                }
            });
        }else{
            $state.go("app.index");
        }
    }

    //froala Settings
    $scope.froalaOptions = {
        toolbarButtons: ['undo', 'redo', '|', 'bold', 'underline', 'fontSize', 'color', 'align', 'insertLink', 'insertImage', 'insertFile', 'insertHR', 'html'],
        toolbarButtonsMD: ['undo', 'redo', 'bold', 'underline', 'fontSize', 'color', 'align', 'insertLink', 'insertImage', 'insertFile', 'insertHR', 'html'],
        toolbarButtonsSM: ['undo', 'redo', 'bold', 'underline', 'fontSize', 'color', 'align', 'insertLink', 'insertImage', 'insertFile', 'insertHR'],
        toolbarButtonsXS: ['undo', 'redo', 'bold', 'underline', 'fontSize', 'color', 'align', 'insertLink', 'insertImage', 'insertFile', 'insertHR'],
        height : 600,
        imageDefaultWidth: 0,        
        imageUploadMethod: 'POST',
        imageUploadURL: domain + '/contents/image',
        fileUploadMethod: 'POST',
        fileUploadURL: domain + '/contents/file',
        imageOutputSize: true,
        language: 'ja',
        quickInsertEnabled: false,
        quickInsertTags: []
    }

    $scope.save = function(){
        $http({
            method : 'POST',
            url : domain + '/contents/draft',
            data : $scope.new,
            headers : { 'Authorization' : header }
        }).then(function onSuccess(response) {
            $state.go("app.keibamin.index", {directory:$stateParams.directory});
        });
    }

    $scope.preview = function(){
        $http({
            method : 'POST',
            url : domain + '/contents/draft',
            data : $scope.new,
            headers : { 'Authorization' : header }
        }).then(function onSuccess(response) {
            $state.go("app.keibamin.preview", {directory:$stateParams.directory, contentsid:response.data.display_id});
        });
    }
}]);

