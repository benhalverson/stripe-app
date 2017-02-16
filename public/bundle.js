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
          { url: '/{bookId}',
           templateUrl: 'templates/books/booksShow.html',
           controller: 'booksShowCtrl'
         });
      });

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

'use strict';
angular.module('bookApp')
  .service('UserService', function($http, ENV){
    this.register= function(user) {
      return $http.post(`${ENV.API_URL}/users/register`, user);
    };
    this.login = function(user) {
      return $http.post(`${ENV.API_URL}/users/login`, user);
    };
  });

'use strict';
angular.module('bookApp')
  .controller('loginCtrl', function($scope, $state, $localStorage, UserService){
    $scope.submit = function(user) {
      UserService.login(user)
      .then(function(res){
        $scope.$storage.myToken = res.data.token;
        $state.go('home');
      }, function(err){
        console.error(err);
      });
    };
  });

'use strict';
angular.module('bookApp')
  .controller('navCtrl', function($scope, $state){
    $scope.logout = function() {
      delete $scope. $storage.myToken;
      $state.go('home');
    };
  });

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

'use strict';
angular.module('bookApp')
  .controller('booksIndexCtrl', function($scope, $state, BookService){
    BookService.index()
    .then(function(res){
      $scope.books = res.data;
      console.log('data ', res.data);
    }, function(err){
      console.error(err.data);
    });
  });

'use strict';

angular.module('bookApp')
  .controller('booksShowCtrl', function($scope, $state, $http, ENV, BookService){
    BookService.show($state.params.bookId)
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
        console.log('res: ', res.data);
      }, function(err) {
        console.log('error ', err);
        console.log(err.data.message);
      });
    };
    $scope.formatPrice = function(num) {
      return Math.round(num * 100);
    };
  });
