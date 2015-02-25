'use strict';
var todoController = angular.module('todoController', []);
 
todoController.service('tasksService', function ($http) {
	var uid = 4; 
	var tasks = [
	   {
		  "id":1,
		  "title":"Read Tutorials",
		  "deadline":"2015-04-01",
		  "location":"London",
		  "done":true
	   },
	   {
		  "id":2,
		  "title":"Learn AngularJS",
		  "deadline":"2015-04-02",
		  "location":"London",
		  "done":false
	   },
	   {
		  "id":3,
		  "title":"Create app",
		  "deadline":"2015-04-03",
		  "location":"London",
		  "done":false
	   }
	];
	this.list = function () {
        return tasks;
    }
	
	this.get = function (id) {
        for (var i in tasks) {
            if (tasks[i].id == id) {
                return tasks[i];
            }
        }
		return [{}]
    }
	this.save = function (task) {
        if (task.id == null) {
            //if this is new contact, add it in contacts array
            task.id = uid++;
			task.done = false;
            tasks.push(task);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (var i in tasks) {
                if (tasks[i].id == task.id) {
                    tasks[i] = task;
                }
            }
        }
 
    }
});
todoController.controller('TaskListCtrl', function($scope, $filter, $location, $http, tasksService) {

	$scope.tasks = tasksService.list();
	
	$scope.todoText = '';
	
	$scope.todoAdd = function () {
		$location.path('/task/new');
	};

	$scope.todoRemove = function (item) {
		var index = $scope.tasks.indexOf(item)
		$scope.tasks.splice(index, 1);   
	};
	
	$scope.removeChecked = function () {
		$scope.tasks = $filter('filter')($scope.tasks, {done: false});
	};
	
  });
  todoController.controller('TaskViewCtrl', function($scope, $routeParams, $location, tasksService) {
    $scope.taskId = $routeParams.taskId;
	$scope.task = tasksService.get($routeParams.taskId);
	
	$scope.todoSave = function (form) {
		if (form.$valid){
		    tasksService.save($scope.task);
			$location.path('/tasks');
		}
    }
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
	