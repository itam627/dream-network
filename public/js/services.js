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

        Parse.FacebookUtils.logIn("user_location,user_interests,user_education_history,user_work_history,user_about_me,user_birthday", {
          success: function(user) {
            $rootScope.$apply(function () {
              $rootScope.userLoggedIn = true;
              $rootScope.userId = user.id;
              service.currentUser = user;

	      var query = new Parse.Query(Parse.User);
	      query.get(user.id).then(function(user) {
                if (!user.get('first_time')) {
                 FB.api({
                   method: 'fql.query',
                   query: 'SELECT name, sex, birthday, current_location, work, education, about_me, interests FROM user WHERE uid = me()'
                    }, function(response) {
                   response = response[0];
                   user.set("first_time", true);
                   user.set('name', response.name);
                   user.set('gender', response.sex);
                   user.set("age", getAge(response.birthday));
                   user.set('state', response.current_location.state);
                   user.set('profession', getFBProfession(response.work));
                   user.set('education', getFBEducation(response.education));
                   user.set('major', getFBMajors(response.education));
                   user.set('fb_url', response.link);
                   user.set('interests', response.interests);
                   user.set('description', response.about_me);
                   user.set('fb_username', response.username);

                   user.save(null, {
                     success: function(data) {
                      $location.path('/profile');
                     },
                      error: function(data, error) {
                      console.log(error);
                     }
                    });
                   $location.path('/profile');
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


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
