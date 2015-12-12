'use strict';

angular.module('NGQuiz')
.controller('NavbarController', function($scope) {
	$scope.links = [
		{url: '/step1', title: 'Step 1'},
		{url: '/step2', title: 'Step 2'},
		{url: '/step3', title: 'Step 3'},
		{url: '/step4', title: 'Results'}
	];
});
