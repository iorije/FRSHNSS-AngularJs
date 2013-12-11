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





		$scope.myKey = 'AIzaSyAsob09ntB3bXhkmbypqqwJyZVMqY3S8V8';
		$scope.calendarId = 'gbqd45san75gsntao52shcgl30@group.calendar.google.com';
		$scope.fields = '&fields=items(summary,description,htmlLink,location,start/dateTime,end/dateTime,id)';
		$scope.timeMin = '2013-12-8T00:00:00Z'; //get events starting this date
		$scope.timeMax = '2013-12-15T00:00:00Z'; //get events till this date

		//think about how to get current week. //get today date and parse day, then get wich week it is, then set timeMin and Max

		$http({
			method: 'GET',
			url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/'+$scope.calendarId+'/events?timeMax='+$scope.timeMax+'&timeMin='+$scope.timeMin+'&key='+$scope.myKey+$scope.fields)
		}).
			success(function(data, status){
				$scope.events = data;
				$log.log("GetCalendarStatus = ", status);
				// $log.log("GetCalendarData = ", data);
			}).
			error(function(data, status){
				$scope.events = data;
				$log.log("GetCalendarStatus = ", status);
				// $log.log("GetCalendarData = ", data);
			});


		//use eventId to bind confirmed or not confirmed stuff to it. //schrijf json object to dir
		// $scope.languages = [{name:"English", value:0},{name:"Spanish", value:1},{name:"Korean", value:1}];
		// $scope.save = function() {
		// 	$http.post('data/sampleData.json', $scope.languages);
		// 	$scope.msg = 'Data sent: '+ JSON.stringify($scope.languages);
		// };
	}
]);