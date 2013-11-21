function HomeCtrl($scope, $routeParams) {
}

function ProfileCtrl($scope, $routeParams, userSrv) {
  //Check if profile is self
  $scope.editable = userSrv.currentUser.id == $routeParams.userId ? true : false;

  //Setup profile info
  var query = new Parse.Query(Parse.User);
  query.get($routeParams.userId).then(function(user) {
    $scope.$apply(function () {
      $scope.user = {
        major: user.get('major'),
        description: user.get('description'),
        education: user.get('education'),
        profession: user.get('profession'),
        nationality: user.get('nationality'),
        name: user.get('name')
      }

      //setup watches
      $scope.$watch('user', function(newValue, oldValue){
        userSrv.currentUser.set('major', newValue.major);
        userSrv.currentUser.set('description', newValue.description);
        userSrv.currentUser.set('education', newValue.education);
        userSrv.currentUser.set('profession', newValue.profession);
        userSrv.currentUser.set('nationality', newValue.nationality);
        userSrv.currentUser.save();
      }, true);
    });
  });
}

function SearchCtrl($scope, $routeParams) {
  $scope.users = [];

  $scope.searchUser = function() {
    var query = new Parse.Query(Parse.User);
    query.select("name","description");
    var queryResult = query.equalTo($scope.choices, $scope.query).find();
    queryResult.then(function(results) {
      $scope.$apply(function(){
        $scope.users = [];
        results.forEach(function(object) {
          $scope.users.push({
            id : object.id,
            description : object.get("description"),
            name : object.get("name")
          });
        });
      });
    });
  }
}

function InformationCtrl($scope, $routeParams) {
}

function AboutCtrl($scope, $routeParams) {
}

function UserCtrl($http, $location, $scope, $rootScope, userSrv) {
  //signup
  $scope.signup = function() {
    userSrv.login();
  }
  //login
  $scope.login = function() {
    userSrv.login();
  }
  //logout
  $scope.logout = function() {
    userSrv.logout();
  }
}
