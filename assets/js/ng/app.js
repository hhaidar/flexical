'use strict';

angular.module('app', ['btford.socket-io'])
  .config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('{$');
      $interpolateProvider.endSymbol('$}');
  })
  .factory('socket', function(socketFactory) {
      return socketFactory();
  });