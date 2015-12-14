'use strict';
angular.module('bookApp')
  .service('BookService', function($http, ENV) {
    this.index = function() {
      return $http.get(`${ENV.API_URL}/books/`);
    };
    this.show = function(bookId) {
      return $http.get(`${ENV.API_URL}/books/${bookId}`);
    };
  });
