app.controller('headerCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.init = function(){
        $scope.screenWidth = window.screen.width;
    }

    $scope.fa = "fa-search";
    $scope.class = "";

    $scope.search = function(query){
        $state.go("app.search", {query:query});
        this.query = null;
        $scope.class = "";
        $scope.fa = "fa-search"
    };

    $scope.searchEnter = function(e,query) {
        if (e.which === 13) {
            $state.go("app.search", {query:query});
            this.query = null;
            $scope.class = "";
            $scope.fa = "fa-search"
        }
    }

    $scope.changeClass = function(){
        if ($scope.class === ""){
            $scope.class = "display-block";
            $scope.fa = "fa-close"
        }else{
            this.query = null;
            $scope.class = "";
            $scope.fa = "fa-search"
        }
    };

    $scope.logout = function(){
        $scope.$emit("logout");
        $state.go("app.index");
    };
}]);