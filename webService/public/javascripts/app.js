 'use strict';
 
 var todoApp = angular.module('todoApp', [
	'ui.bootstrap',
	'ngRoute',
	'ngResource',
	'todoController',
	'todoFilters'
]);

todoApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
    $routeProvider.
      when('/todolist', {
        templateUrl: 'partials/taskList',
        controller: 'TaskListCtrl'
      }).
      when('/todo/:taskId', {
        templateUrl: 'partials/taskList',
        controller: 'TaskViewCtrl'
      }).
      otherwise({
        redirectTo: '/todolist'
      });
}]);

todoApp.directive('taskEntry', function(){
	return{
		restrict: 'E',
		templateUrl: 'partials/task-entry'
	}
});
// Added this directive to solve an issue with formating the datepicker date
todoApp.directive('datepickerPopup', function (){
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function(scope, element, attr, controller) {
		  //remove the default formatter from the input directive to prevent conflict
		  controller.$formatters.shift();
	  	}
	}
});



