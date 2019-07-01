app.controller('AppCtrl', ['$scope', '$stateParams', '$http', '$transitions', '$localStorage', 'pathService', 'loginService',
function($scope, $stateParams, $http, $transitions, $localStorage, pathService, loginService) {

    domain = pathService.getDomain();
    bucket = pathService.getBucket();
    $scope.purchased = {};
    $scope.result = 0;

    $transitions.onSuccess({}, function(){
        $scope.keibamin = $stateParams.directory;
        var header = 'JWT ' + $localStorage.token;
        if(loginService.isLogged){
            if($localStorage.token){
                //getNotice
                $http({
                    method : 'GET',
                    url : domain + '/notice',
                    headers : { 'Authorization' : header }
                }).then(function onSuccess(response) {
                    if(response.data){
                        $scope.noticeNumber = 0; 
                        $scope.notices = response.data;
                        for(var i = 0; i < response.data.length; i++){
                            if(!response.data[i].read){
                                $scope.noticeNumber = $scope.noticeNumber + 1;
                            }
                        }
                        for(var i = 0; i < response.data.length; i++){
                            if(response.data[i].avatar){
                                $scope.notices[i].avatar = domain + '/resources/' + bucket + '/avatar/' + response.data[i].avatar;
                            }else{
                                $scope.notices[i].avatar = "app/img/no-avatar.png";
                            };
                        }
                        if(response.data.length > 5){                        
                            $scope.notices.splice(5,response.data.length);
                        }
                    }  
                });            
            }
        }
    });
    
    //readNotice
    $scope.readNotice = function(){
        var header = 'JWT ' + $localStorage.token;
        if(loginService.isLogged){
            if($localStorage.token){
                $http({
                    method : 'PUT',
                    url : domain + '/notice',
                    headers : { 'Authorization' : header }
                }).then(function onSuccess(response) {
                    $scope.noticeNumber = null;
                });
            }
        }
    }

    //goTop
    $scope.goTop = function(){
        window.scrollTo(0,0);
    }

    //for F5
    if(loginService.isLogged){
        if($localStorage.token){
            var header = 'JWT ' + $localStorage.token;
            //getUser
            $http({
                method : 'GET',
                url : domain + '/user',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                $scope.isLogged = true;
                $scope.display_name = response.data.display_name;
                $scope.directory = response.data.directory;
                if(response.data.avatar){
                    $scope.avatar = domain + '/resources/' + bucket + '/avatar/' + response.data.avatar;
                }else{
                    $scope.avatar = "app/img/no-avatar.png";
                };
            }, function onError(response) {
                $scope.isLogged = false;
                $localStorage.$reset();
            });

            //getALLRevenue(Result)
            $http({
                method : 'GET',
                url : domain + '/user/buyer/list',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                for(var i = 0; i < response.data.length; i++){
                    $scope.result = $scope.result + response.data[i].revenue;
                };
            });

            //getPurchased
            $http({
                method : 'GET',
                url : domain + '/contents/purchased/list',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                $scope.purchased = response.data;
            });

            //getCard
            $http({
                method : 'GET',
                url : domain + '/user/card',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                if(response.data){
                    $scope.card = response.data;
                    switch($scope.card.brand) {
                        case "Visa":
                            $scope.card.brand = "app/img/cards/visa.png";
                            break;
                        case "American Express":
                            $scope.card.brand = "app/img/cards/amex.png";
                            break;
                        case "Diners Club":
                            $scope.card.brand = "app/img/cards/diners.png";
                            break;
                        case "JCB":
                            $scope.card.brand = "app/img/cards/jcb.png";
                            break;
                        case "MasterCard":
                            $scope.card.brand = "app/img/cards/mastercard.png";
                            break;
                        case "UnionPay":
                            $scope.card.brand = "app/img/cards/unionpay.png";
                            break;
                        case "Discover":
                            $scope.card.brand = "app/img/cards/discover.png";
                            break;
                        default:
                            $scope.card.brand = "app/img/cards/credit-card.png";
                            break;
                    }
                }
            });
        }
    }

    //Login Action from Child Ctrler
    $scope.$on("login", function(event, args) {
        var header = 'JWT ' + $localStorage.token;
        if(loginService.isLogged){
            if($localStorage.token){
                //getUser
                $http({
                    method : 'GET',
                    url : domain + '/user',
                    headers : { 'Authorization' : header }
                }).then(function onSuccess(response) {
                    $scope.isLogged = true;
                    $scope.display_name = response.data.display_name;
                    $scope.directory = response.data.directory;
                    if(response.data.avatar){
                        $scope.avatar = domain + '/resources/' + bucket + '/avatar/' + response.data.avatar;
                    }else{
                        $scope.avatar = "app/img/no-avatar.png";
                    };
                }, function onError(response) {
                    $scope.isLogged = false;
                    $localStorage.$reset();
                });

                //getALLRevenue(Result)
                $http({
                    method : 'GET',
                    url : domain + '/user/buyer/list',
                    headers : { 'Authorization' : header }
                }).then(function onSuccess(response) {
                    for(var i = 0; i < response.data.length; i++){
                        $scope.result = $scope.result + response.data[i].revenue;
                    };
                });

                //getPurchased
                $http({
                    method : 'GET',
                    url : domain + '/contents/purchased/list',
                    headers : { 'Authorization' : header }
                }).then(function onSuccess(response) {
                    $scope.purchased = response.data;
                });

                //getCard
                $http({
                    method : 'GET',
                    url : domain + '/user/card',
                    headers : { 'Authorization' : header }
                }).then(function onSuccess(response) {
                    if(response.data){
                        $scope.card = response.data;
                        switch($scope.card.brand) {
                            case "Visa":
                                $scope.card.brand = "app/img/cards/visa.png";
                                break;
                            case "American Express":
                                $scope.card.brand = "app/img/cards/amex.png";
                                break;
                            case "Diners Club":
                                $scope.card.brand = "app/img/cards/diners.png";
                                break;
                            case "JCB":
                                $scope.card.brand = "app/img/cards/jcb.png";
                                break;
                            case "MasterCard":
                                $scope.card.brand = "app/img/cards/mastercard.png";
                                break;
                            case "UnionPay":
                                $scope.card.brand = "app/img/cards/unionpay.png";
                                break;
                            case "Discover":
                                $scope.card.brand = "app/img/cards/discover.png";
                                break;
                            default:
                                $scope.card.brand = "app/img/cards/credit-card.png";
                                break;
                        }
                    }
                });

                //getNotice
                $http({
                    method : 'GET',
                    url : domain + '/notice',
                    headers : { 'Authorization' : header }
                }).then(function onSuccess(response) {
                    if(response.data){
                        $scope.noticeNumber = 0; 
                        $scope.notices = response.data;
                        for(var i = 0; i < response.data.length; i++){
                            if(!response.data[i].read){
                                $scope.noticeNumber = $scope.noticeNumber + 1;
                            }
                        }
                        for(var i = 0; i < response.data.length; i++){
                            if(response.data[i].avatar){
                                $scope.notices[i].avatar = domain + '/resources/' + bucket + '/avatar/' + response.data[i].avatar;
                            }else{
                                $scope.notices[i].avatar = "app/img/no-avatar.png";
                            };
                        }
                        if(response.data.length > 5){                        
                            $scope.notices.splice(5,response.data.length);
                        }
                    }  
                }); 
            }
        }
    });

    //Login Action from Child Ctrler
    $scope.$on("changeAccount", function(event, args) {
        var header = 'JWT ' + $localStorage.token;
        if($localStorage.token){
            //getUser
            $http({
                method : 'GET',
                url : domain + '/user',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                $scope.display_name = response.data.display_name;
                $scope.directory = response.data.directory;
                if(response.data.avatar){
                    $scope.avatar = domain + '/resources/' + bucket + '/avatar/' + response.data.avatar;
                }else{
                    $scope.avatar = "app/img/no-avatar.png";
                };
            }, function onError(response) {
                $scope.isLogged = false;
                $localStorage.$reset();
            });

            //getALLRevenue(Result)
            $http({
                method : 'GET',
                url : domain + '/user/buyer/list',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                for(var i = 0; i < response.data.length; i++){
                    $scope.result = $scope.result + response.data[i].revenue;
                };
            });

            //getPurchased
            $http({
                method : 'GET',
                url : domain + '/contents/purchased/list',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                $scope.purchased = response.data;
            });

            //getCard
            $http({
                method : 'GET',
                url : domain + '/user/card',
                headers : { 'Authorization' : header }
            }).then(function onSuccess(response) {
                if(response.data){
                $scope.card = response.data;
                    switch($scope.card.brand) {
                        case "Visa":
                            $scope.card.brand = "app/img/cards/visa.png";
                            break;
                        case "American Express":
                            $scope.card.brand = "app/img/cards/amex.png";
                            break;
                        case "Diners Club":
                            $scope.card.brand = "app/img/cards/diners.png";
                            break;
                        case "JCB":
                            $scope.card.brand = "app/img/cards/jcb.png";
                            break;
                        case "MasterCard":
                            $scope.card.brand = "app/img/cards/mastercard.png";
                            break;
                        case "UnionPay":
                            $scope.card.brand = "app/img/cards/unionpay.png";
                            break;
                        case "Discover":
                            $scope.card.brand = "app/img/cards/discover.png";
                            break;
                        default:
                            $scope.card.brand = "app/img/cards/credit-card.png";
                            break;
                    }
                }
            });
        }
    });

    //Login Action from Child Ctrler
    $scope.$on("puchased", function(event, args) {
        //getPurchased
        $http({
            method : 'GET',
            url : domain + '/contents/purchased/list',
            headers : { 'Authorization' : header }
        }).then(function onSuccess(response) {
            $scope.purchased = response.data;
        });
    });

    //Logout Action from Child Ctrler
    $scope.$on("logout", function(event, args) {
        if(loginService.isLogged){
            $scope.card = null;
            $scope.display_name = null;
            $scope.directory = null;
            $scope.avatar = null;
            $scope.result = 0;
            $scope.purchased = {};
            $scope.noticeNumber = null;
            $scope.notices = null; 

            $scope.isLogged = false;
            loginService.logout();
            $localStorage.$reset();
        }
    });
}]);