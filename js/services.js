angular.module('dreamnetwork')
  .factory('userSrv', function($rootScope, $location) {
    var service = {};

    service.login = function () {
      var currentUser = Parse.User.current();
      if (currentUser) {
        $rootScope.userLoggedIn = true;
      } else {
        Parse.FacebookUtils.logIn(null, {
          success: function(user) {
            $rootScope.$apply(function () {
              $rootScope.userLoggedIn = true;
              service.currentUser = user;
              $location.path('/profile');
            });
          },
          error: function(user, error) {
          }
        });
      }
    }

    service.logout = function () {
      Parse.User.logOut();
      FB.logout();
      $rootScope.userLoggedIn = false;
      service = {};
      $location.path('/home');
    }
    return service;
  })
;

