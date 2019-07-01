'use strict';

angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {
	
				$urlRouterProvider
				.otherwise('/');
                
				$stateProvider
					.state('app', {
						url: '/',
						abstract:true,
						templateUrl: 'app/html/parts/app.html',
						resolve: {
							deps: ['$ocLazyLoad', function($ocLazyLoad) {
								return $ocLazyLoad.load([{
								serie: true,
								files: [
									 'app/js/controller/parts/header.js',
									 'app/js/controller/auth/login.js',
									 'app/js/controller/auth/signup.js',
								]
							}]);
							}]
						}
					})
					.state('app.index2', {
                        url: '',
						templateUrl: 'app/html/keibamin/new.html',
						data:{
							title:"新しいコンテンツを作成"
						},
						resolve: {
							deps: ['$ocLazyLoad', function($ocLazyLoad) {
								return $ocLazyLoad.load([{
								serie: true,
								files: [
									'app/js/controller/keibamin/new.js'					 
								]
							}]);
							}]
						}
					})            
			}
        ]
	);

angular.module('app').run(['$rootScope', '$state', '$stateParams', '$transitions', '$templateCache', 'loginService',  
	function ($rootScope, $state, $stateParams, $transitions, $templateCache, loginService) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;

    $transitions.onSuccess({}, function(trans){
		$templateCache.removeAll();
  		window.scrollTo(0,0);				
	});

	$transitions.onStart({}, function(trans){
        if(trans.to().isLoginRequired){
            if (!loginService.isLogged()) {
				return $state.target("app.index2");
				// on maintainance
				// return $state.target("app.closed");     
            }
        }
	});
}]);