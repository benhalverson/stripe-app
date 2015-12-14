'use strict';
angular.module('bookApp')
  .controller('booksIndexCtrl', function($scope, $state, BookService){
    BookService.index();
    .then(function(res){
      $scope.books = res.data;
    }, function(err){
      console.error(err);
    });
  });
