'use strict';

/* Controllers */

var frshnssControllers = angular.module('frshnssControllers', []);


frshnssControllers.controller('HomeCtrl', ['$scope', 'DataService',
	function($scope, DataService){
		$scope.data = DataService.get({fileName: 'home'});
	}
]);

frshnssControllers.controller('CalendarCtrl', ['$scope', '$http', '$log', 'DataService',
	function($scope, $http, $log, DataService){
		$scope.data = DataService.get({fileName: 'calendar'});

		$scope.now = new Date();
		$scope.week = $scope.now.format('W');
		$scope.range =  new Date().getWeek();
		$scope.myKey = 'AIzaSyAsob09ntB3bXhkmbypqqwJyZVMqY3S8V8';
		$scope.calendarId = 'gbqd45san75gsntao52shcgl30@group.calendar.google.com';
		$scope.fields = 'items(summary,description,htmlLink,location,start/dateTime,end/dateTime,id)';
		$scope.timeMin = $scope.range[0].toISOString();
		$scope.timeMax = $scope.range[1].toISOString();

		$http({
			method: 'GET',
			url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/'+$scope.calendarId+'/events?orderBy=startTime&singleEvents=true&timeMax='+$scope.timeMax+'&timeMin='+$scope.timeMin+'&key='+$scope.myKey+'&fields='+$scope.fields)
		}).
			success(function(data, status){
				$scope.events = data;
				$log.log("GetCalendarStatus = ", status);
			}).
			error(function(data, status){
				$scope.events = data;
				$log.log("GetCalendarStatus = ", status);
			});

		
		
		$scope.save = function() {
			$http.post('data/about.json', $scope.data);
		};
	}
]);

frshnssControllers.controller('AboutCtrl', ['$scope', '$http', 'DataService',
	function($scope, $http, DataService){
		$scope.data = DataService.get({fileName: 'about'});
		$scope.save = function() {
			$http.post('data/about.json', $scope.data);
		};
	}
]);