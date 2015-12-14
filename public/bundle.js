'use strict';
angular.module('bookApp', ['ui.router', 'ngStorage', 'stripe.checkout'])
      .constant('ENV', {
        API_URL: 'http://localhost:3000'
      })
      .run(function($rootScope, $localstorage) {
        $rootScope.$storage = $localstorage;
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
          .state('home',
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
           templateUrl: 'templates/books/booksIndex.html'
           controller: 'booksIndexCtrl'
          })
          .state('books.show',
          { url: '/{bookId}',
           templateUrl: 'templates/books/booksShow.html',
           controller: 'booksShowCtrl'
          })
      })

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
        $scope.$storage.myToken = res.data.token;
        $state.go('home');
      }, function(err){
        console.error(err);
      });
    }
  });
