 'use strict';
 
 var todoApp = angular.module('todoApp', [
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