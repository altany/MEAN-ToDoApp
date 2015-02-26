 'use strict';
 
 var todoApp = angular.module('todoApp', [
	'ui.bootstrap',
	'ngRoute',
	'todoController',
	'todoFilters'	
]);

todoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/tasks', {
        templateUrl: 'taskList.html',
        controller: 'TaskListCtrl'
      }).
      when('/task/:taskId', {
        templateUrl: 'taskView.html',
        controller: 'TaskViewCtrl'
      }).
      otherwise({
        redirectTo: '/tasks'
      });
  }]);

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


