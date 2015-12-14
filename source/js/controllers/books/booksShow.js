'use strict';

angular.module('bookApp')
  .controller('booksShowCtrl', function($scope, $state, $http, ENV, BookService){
    BookService.show($state.params.booksId)
    .then(function(res){
      $scope.book = res.data;
      console.log('data', res.data);
    });

    $scope.doCheckout = function(tokenObj) {
      $http.post(`${ENV.API_URL}/checkout`, {
        tokenObj: tokenObj,
        book: $scope.book
      })
      .then(function(res) {
        console.log('res: ', res);
      }, function(err) {
        console.log('error ', err);
      });
    };
    $scope.formatPrice = function(num) {
      return Math.round(num * 100);
    };
  });
