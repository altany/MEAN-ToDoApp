'use strict';

var todoController = angular.module('todoController', []);
 
todoController.controller('TaskListCtrl', function($scope, $http, $filter, $location) {
	
	$http.get('/tasks/').
    success(function(data, status, headers, config) {
		$scope.tasks = data;
    });
	
	$scope.todoText = '';
	
	$scope.toggleDone = function(id, checked) {
		var update = {
			_id: id,
			done: checked
		};
		$http.put('/tasks/', update);
	}
	
	$scope.todoRemove = function (id, index) {
		$http.delete('/tasks/' + id).
	success(function(data, status, headers, config) {
			$scope.tasks.splice(index, 1)
		});
	};
	
	$scope.removeCompleted = function (tasks) {
		angular.forEach($scope.tasks,function(value,index){
			if (value.done) {
				$http.delete('/tasks/' + value._id).
	success(function(data, status, headers, config) {
				// Update the view
					$scope.tasks.splice($scope.tasks.indexOf(value), 1);
				});
			}
		})
	};
	
  });
  todoController.controller('TaskViewCtrl', function($scope, $http, $routeParams, $location) {
	  
    $http.get('/tasks/' + $routeParams.taskId).
	success(function(data, status, headers, config) {
		$scope.task = data;
    });

	$scope.todoSave = function (form) {
		if (form.$valid){
			if ($routeParams.taskId=='new') {
				$http.post('/tasks/new/', $scope.task).
				success(function(data, status, headers, config) {
					$location.path('/');
				});
			}
			else {
				$http.put('/tasks/', $scope.task).
					success(function(data, status, headers, config) {
					$location.path('/');
				});
			}		
		}
    }
	
	// For the datepicker
	$scope.open = function($event) {
	 
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	 };
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
	