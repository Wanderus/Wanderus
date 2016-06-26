var app = angular.module('angularApp', ['ui.router']);

/*
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$window',
    function($stateProvider, $urlRouterProvider)
    {

        $stateProvider.state('userHome', {
            url: '/userHome',
            controller: 'MainCtrl'


        });

        $stateProvider.state('login', {
            url: '/login',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (auth.isLoggedIn())
                {
                    $window.location.href = '/userHome';
                }
            }]

        });

        $stateProvider.state('register', {
            url: '/register',
            controller: 'AuthCtrl',
            onEnter: ['$state', 'auth', function($state, auth) {
                if (auth.isLoggedIn())
                {
                    $window.location.href = '/userHome';
                }
            }]

        });

        $urlRouterProvider.otherwise('home');

    }

]);
*/

app.controller('MainCtrl', ['$scope', '$state', 'auth', '$window', function($scope, $state, auth, $window)
{
    console.log("MainCtrl");
}]);

app.controller('AuthCtrl', ['$scope', '$state', 'auth', '$window', function($scope, $state, auth, $window)
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
            $window.location.href = '/userHome';
        });
    };

    $scope.logIn = function()
    {
        auth.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $window.location.href = '/userHome';
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
