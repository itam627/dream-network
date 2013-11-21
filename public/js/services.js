angular.module('dreamnetwork')
  .factory('userSrv', function($rootScope, $location) {
    var service = {};

    service.login = function () {
      var currentUser = Parse.User.current();
      if (currentUser) {
        $rootScope.userLoggedIn = true;
        $rootScope.userId = currentUser.id;
        service.currentUser = currentUser;
        $location.path('/profile');
      } else {
        Parse.FacebookUtils.logIn("user_location,user_interests,user_education_history,user_work_history", {
          success: function(user) {
            $rootScope.$apply(function () {
              $rootScope.userLoggedIn = true;
              $rootScope.userId = user.id;
              service.currentUser = user;

	      var query = new Parse.Query(Parse.User);
	      query.get(user.id).then(function(user) {
                if (!user.get('first_time')) {
                 FB.api('/me', function(response) {
                   user.set("first_time", true);
                   user.set('name', response.name);

                   user.save(null, {
                     success: function(data) {
                      $location.path('/profile');
                     },
                      error: function(data, error) {
                      console.log(error);
                     }
                    });
                  });
                }
               });
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

