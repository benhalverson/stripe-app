'use strict';
angular.module('bookApp')
  .controller('navCtrl', function($scope, $state){
    $scope.logout = function() {
      delete $scope. $storage.myToken;
      $state.go('home');
    };
  });
