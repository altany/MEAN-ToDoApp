 'use strict';
 
 var todoApp = angular.module('todoApp', [
  'todoController',
  'todoFilters'
]);

 var todoController = angular.module('todoController', []);
 
 todoController.controller('todoController', ['$scope',  '$filter',
  function($scope, $filter) {
	$scope.tasks = [
		{'title': 'Read Tutorials',
		 'done': true},
		{'title': 'Learn AngularJS',
		 'done': false},
		{'title': 'Create app',
		 'done': false}
	  ];
	
	$scope.todoText = '';
	
	$scope.todoAdd = function () {
		$scope.tasks.push({title:$scope.todoText, done:false});
		$scope.todoText = '';
	};

	$scope.todoRemove = function (item) {
		var index = $scope.tasks.indexOf(item)
		$scope.tasks.splice(index, 1);   
	};
	
	$scope.removeChecked = function () {
		$scope.tasks = $filter('filter')($scope.tasks, {done: false});
	};
	
  }]);
  
  angular.module('todoFilters', []).filter('checked', function() {
	  return function(input) {
		return input ? 'list-group-item-success' : '';
	  };
	}).filter('empty', function() {
	  return function(input) {
		return input.length==0 ? 'disabled' : '';
	  };
	});
	