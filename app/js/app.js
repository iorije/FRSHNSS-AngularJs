'use strict';

/* App Module */

var frshnss = angular.module('frshnss', [
  'ngRoute',
  'frshnssControllers',
  'templateControllers',
  'frshnssServices'
]);

frshnss.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/calendar', {
        templateUrl: 'partials/calendar.html',
        controller: 'CalendarCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);