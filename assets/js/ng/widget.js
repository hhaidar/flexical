'use strict';

angular.module('app')
  .controller('widget', function($scope, $attrs, socket) {
      $attrs.fxID;
      socket.on('job:' + $attrs.jobId + ':update', function(data) {
        $scope.data = data;
      });
  });
