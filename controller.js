 'use strict';
 
 var todoApp = angular.module('todoApp', [
  'todoController',
  'phonecatFilters'
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

	  $scope.todoAdd = function () {
		$scope.tasks.push({title:$scope.todoText, done:false});
		$scope.todoText = '';
	  };
	  
	  $scope.todoRemove = function (item) {
		var index = $scope.tasks.indexOf(item)
		$scope.tasks.splice(index, 1);   
	  };
  
  }]);
  
  angular.module('phonecatFilters', []).filter('checked', function() {
  return function(input) {
    return input ? 'list-group-item-success' : '';
  };
});