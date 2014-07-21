'use strict';

angular.module('app')
  .controller('board', function($scope, socket) {
      socket.on('connect', function() {
        $scope.connected = true;
        $scope.connecting = false;
        $scope.disconnected = false;
      });
      socket.on('connecting', function() {
        $scope.connected = false;
        $scope.connecting = true;
        $scope.disconnected = false;
      });
      socket.on('disconnect', function() {
        $scope.connected = false;
        $scope.connecting = false;
        $scope.disconnected = true;
      });
  });