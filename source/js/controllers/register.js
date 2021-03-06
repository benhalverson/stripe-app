'use strict';
angular.module('bookApp')
  .controller('registerCtrl', function($scope, $state, UserService){
    $scope.submit = function(user) {
      if(user.password !== user.password2) {
        swal('Error', 'Passwords do not match.', 'error');
        return;
      }
      UserService.register(user)
      .then(function(data){
        $scope.$storage.myToken = data.token;
        $state.go('home');
      }, function(err){
        console.error(err);
      });
    };
  });
