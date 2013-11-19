function HomeCtrl($scope, $routeParams) {
}

function ProfileCtrl($scope, $routeParams) {
}

function SearchCtrl($scope, $routeParams) {
  $scope.users = [1, 2, 3, 4, 5, 6, 7, 8];

  $scope.loadUsers = function() {
    var last = $scope.users[$scope.users.length - 1];
    $scope.users.push(last + 1);
  };
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
