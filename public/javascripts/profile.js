var app = angular.module('profile', []);

app.factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};

    auth.saveToken = function(token)
    {
        $window.localStorage['kelpshell-token'] = token;
    }

    auth.getToken = function()
    {
        return $window.localStorage['kelpshell-token'];
    }

    auth.isLoggedIn = function()
    {
        var token = auth.getToken();

        if (token)
        {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp = Date.now() / 1000;
        }
        else
        {
            return false;
        }

    }

    auth.currentUser = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    }

    auth.register = function(user)
    {
        return $http.post('/register', user).success(function(data) {

            auth.saveToken(data.token);

        })
    }

    auth.getUserId = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload._id;
        }
    }


    auth.login = function(user)
    {
        return $http.post('/login', user).success(function(data) {

            auth.saveToken(data.token);

        })
    }

    auth.logOut = function()
    {
        $window.localStorage.removeItem('kelpshell-token');
        $window.location.href = '/';
    }

    return auth;

}]);


app.controller("NavCtrl", ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;

}]);

app.factory('parkInfo', ['$http', function($http) {


    var fetchedUserInfo;
    var parkInfoService = {
        parkInfo: []
    };

    var self = this;



    parkInfoService.create = function(parkInfo)
    {
        return $http.post('/savePark', parkInfo).success(function (data) {

            //userInfoService.userInfo.push(data);
            console.log(data);

        });
    };

    parkInfoService.get = function(userId)
    {
        return $http.get('/parks/' + userId).success(function(res) {


            //angular.copy(res.data, userInfoService.userInfo);
            //console.log(userInfoService.userInfo);
            //self.setUserInfo(res.data);
            console.log(res);

        });
    };




    return parkInfoService;



}]);


app.controller("ProfileCtrl", ['$scope', 'auth', '$http', 'parkInfo', function($scope, auth, $http, parkInfo) {

    console.log("profile");

    $scope.parkInfo;

    var userId = auth.getUserId();
    console.log(userId);

    //parkInfo.get()

    parkInfo.get(userId).then(function(res) {


        console.log(res.data);
        $scope.parks = res.data;


    });

    //console.log($scope.parkInfo);


}]);
