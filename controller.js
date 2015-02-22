 'use strict';
 
 var todoApp = angular.module('todoApp', [
  'todoController',
  'todoFilters'
]);

 var todoController = angular.module('todoController', []);
 
 todoController.controller('todoController', ['$scope', 
  function($scope) {
	$scope.tasks = [
		{'title': 'Task 1',
		 'done': false},
		{'title': 'Task 2',
		 'done': false},
		{'title': 'Task 3',
		 'done': true}
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
	