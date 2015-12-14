'use strict';
angular.module('bookApp', ['ui.router', 'ngStorage', 'stripe.checkout'])
      .constant('ENV', {
        API_URL: 'http://localhost:3000'
      })
      .run(function($rootScope, $localStorage) {
        $rootScope.$storage = $localStorage;
      })
      .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home',
          { url: '/',
           templateUrl: 'templates/home.html'
          })
          .state('login',
          { url: '/login',
           templateUrl: 'templates/login.html',
           controller: 'loginCtrl'
          })
          .state('register',
          { url: '/register',
           templateUrl: 'templates/register.html',
           controller: 'registerCtrl'
          })
          .state('books',
          { url: '/books',
           templateUrl: 'templates/books/layout.html',
           abstract: true
          })
          .state('books.index',
          { url: '/',
           templateUrl: 'templates/books/booksIndex.html',
           controller: 'booksIndexCtrl'
          })
          .state('books.show',
          { url: '/{booksId}',
           templateUrl: 'templates/books/booksShow.html',
           controller: 'booksShowCtrl'
         });
      });
