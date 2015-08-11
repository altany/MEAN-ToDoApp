'use strict';

var todoController = angular.module('todoController', []);
 
todoController.controller('TaskListCtrl', function($scope, $http, $filter, $location) {
	
	$http.get('/tasks/').
    success(function(data, status, headers, config) {
		$scope.tasks = data;
    });
	
	$scope.todoText = '';
	
	$scope.todoEdit = function(id){
		$location.path('/todo/' + id);
	};
	
	$scope.todoAdd = function () {
		$location.path('/todo/new');
	};

	$scope.todoRemove = function (id) {
		tasksService.delete({id:id});
		$scope.tasks = tasksService.query();
	};
	
	$scope.removeChecked = function () {
		tasksService.deleteDone();  
	};
	
  });
  todoController.controller('TaskViewCtrl', function($scope, $http, $routeParams, $location) {
    
	$http.get('/tasks/' + $routeParams.taskId).
	success(function(data, status, headers, config) {
		console.log(data);
		//$scope.task = data;
    });
	$scope.task = {};
	/*$scope.todoSave = function (form) {
		if (form.$valid){
		    tasksService.update($scope.task);
			$location.path('/tasks');
		}
    }
	
	// For the datepicker
	$scope.open = function($event) {
	 
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	 };*/
  });

  angular.module('todoFilters', []).filter('checked', function() {
	  return function(input) {
		return input ? 'list-group-item-success' : '';
	  };
	}).filter('empty', function() {
	  return function(input) {
		return input.length==0 ? 'disabled' : '';
	  };
	});
	