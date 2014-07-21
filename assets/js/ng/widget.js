'use strict';

angular.module('flexical')
  .controller('widget', function($scope, $attrs, socket) {
      $attrs.fxID;
      socket.on('job:' + $attrs.jobId + ':update', function(data) {
        $scope.data = data;
      });
  });
