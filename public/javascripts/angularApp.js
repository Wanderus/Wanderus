var app = angular.module('angularApp', ['ui.router']);


app.controller('MainCtrl', ['$scope', function($scope) {
    $scope.name = "World";




}]);

app.controller('AuthCtrl', ['$scope', '$state', 'auth', '$location', function($scope, $state, auth, $location)
{

    $scope.user = {};

    $scope.isLoggedin = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

    $scope.register = function()
    {
        auth.register($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {

            //$state.go('home');
            $location.url('/searchPart2');
        });
    };

    $scope.logIn = function()
    {
        auth.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $state.go('home');
        });
    };


}]);


app.factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};

    auth.saveToken = function(token)
    {
        $window.localStorage['GETfit-token'] = token;
    };

    auth.getToken = function()
    {
        return $window.localStorage['GETfit-token'];
    };

    auth.isLoggedIn = function()
    {
        var token = auth.getToken();

        if (token)
        {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        }
        else
        {
            return false;
        }
    };

    auth.currentUser = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.register = function(user)
    {
        return $http.post('/register', user).success(function(data) {

            auth.saveToken(data.token);

        });
    };

    auth.logIn = function(user)
    {
        return $http.post('/login', user).success(function(data) {

            auth.saveToken(data.token);

        });
    };

    auth.logOut = function()
    {
        $window.localStorage.removeItem('GETfit-token');
    };
    return auth;
}]);
