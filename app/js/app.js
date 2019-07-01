'use strict';
angular.module('app', [
	'bootstrap3-typeahead',
	'ui.router',
	'oc.lazyLoad',
	'ngStorage',
	'ngFileUpload',
	'froala',
	'ngSanitize',
	'angularMoment'
]).
value('froalaConfig', {
	key:'GIBEVFBOHF1c1UNYVM==',
	toolbarInline: false,
	placeholderText: ''
})
.config(function() {
	angular.lowercase = angular.$$lowercase;  
  });
