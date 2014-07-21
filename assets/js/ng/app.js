'use strict';

angular.module('flexical', ['ngAnimate', 'btford.socket-io', 'angularMoment'])
  .config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('{$');
      $interpolateProvider.endSymbol('$}');
  })
  .factory('socket', function(socketFactory) {
      return socketFactory();
  });