//var mongoose = require('mongoose');





var app = angular.module('searchFunction2', ['ngResource', 'ui.router', 'angularUtils.directives.dirPagination']);


app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider)
    {
        $stateProvider.state('search2', {
            url: '',
            templateUrl: '/searchPage2.html',
            controller: 'MainCtrl',
            reloadOnSearch: false

        });

        $stateProvider.state('searchResult', {
            url: '/results?result',
            templateUrl: '/searchResult.html',
            controller: 'ResultsCtrl'

        });


        $urlRouterProvider.otherwise('search2');
    }
]);


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
    $scope.logout = auth.logOut;

}]);

var resultsIndexes;


app.factory('search', ['$http', function($http) {

    var placesData = [];
    var searchService = {
        searchResults: []
    };


    /*var searchResults = [];*/

    searchService.get = function(userInput)
    {
        return $http.get('/search2/' + userInput).then(function (res) {

            console.log(res.data);
            return res.data;
        });
    };

    searchService.getState = function(state)
    {
        return $http.get('/searchState/' + state).then(function (res) {

            console.log(res.data);
            return res.data;
        });
    };

    searchService.getWithState = function(placename, state)
    {
        return $http.get('/search2/' + placename + "/" + "state").then(function (res) {

            console.log(res.data);
            return res.data;
        });
    };

    searchService.sendData = function(data)
    {
        searchService.searchResults = data;
    };

    searchService.getData = function()
    {
        return searchService.searchResults;
    };

    searchService.sendPageNumber = function(num)
    {
       searchService.pageNumber = num;
    };

    searchService.getPageNumber = function()
    {
       return searchService.pageNumber;
    };

    return searchService;

}]);

app.controller('MainCtrl', ['$scope', '$rootScope', '$http', '$state', 'search', function($scope, $rootScope, $http, $state, search) {

    //$scope.search = search;
	// test it out
    // test it out

    // create a greenLeaf icon
    var greenIcon = L.icon({
        iconUrl: '../images/leaf-green.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });



    // function to initialize the map

    var map = L.map('map').setView([38.907347, -77.036591], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
	}).addTo(map);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng, {icon: greenIcon}).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 16});


    // create an array for markers
    markers = [];

    // function for adding markers

    $scope.addMarkers = function(results, start, end)
    {
        //L.marker([38.907347, -77.036591]).addTo(map);
        console.log(results);
        //console.log(start);


        if (results.length < 10)
        {
            var i = 1;
            angular.forEach(results, function(value, key) {

                var lat = value.lat;
                var long = value.lng;
                //L.marker([lat, long]).addTo(map);




                console.log("lat: " + lat + "long: " + long);
                var marker = L.marker([lat, long]).addTo(map);
                markers.push(marker);
                marker.bindPopup("<b>" + i + '. ' + value.name + "</b><br>" + value.fcodeName);
                i += 1;
            });
        }
        else
        {
            console.log(start);
            for (var i = start; i < end; i++)
            {
                var lat = results[i].lat;
                var long = results[i].lng;
                console.log("lat: " + lat + "long: " + long);
                var marker = L.marker([lat, long]).addTo(map);
                markers.push(marker);
                marker.bindPopup(i + '. ' + "<a href='/result/" + results[i]._id + "'><b>" + results[i].name + "</b></a><br>" + results[i].fcodeName);


            }
        }
        return markers;
    }

     // function for adding markers

    function deleteMarkers(markers)
    {
        console.log("Deleting markers");
        console.log(markers);
        //L.marker([38.907347, -77.036591]).addTo(map);
        // console.log(results);

        // angular.forEach(results, function(value, key) {

        //     var lat = value.lat;
        //     var long = value.lng;
        //     //L.marker([lat, long]).addTo(map);




        //     console.log("lat: " + lat + "long: " + long);
        //     var marker = L.marker([lat, long]).addTo(map);
        //     marker.bindPopup("<b>" + value.name + "</b><br>" + value.fcodeName);

        // });

        for (var i = 0; i < markers.length; i++)
        {
            map.removeLayer(markers[i]);
        }
    }





    $scope.getData = function()
    {

        // clear markers

        if (markers.length != 0)
        {
            deleteMarkers(markers);
        }

        $scope.error1 = false;
        $scope.error2 = false;
        $scope.error3 = false;


        var place = $scope.place;
        var state = $scope.state;

        if (!place && !state)
        {
            $scope.error1 = true;
            console.log("You must enter text into the fields to get results!");
            $scope.resultsCount = 0;
            $scope.queryResult = null;
            return;
        }
        else if (place && !state)
        {
            search.get(place).then(function(data)
            {

                //console.log(data);
                //a.searchResults = data;
                //console.log(a.searchResults);
                // track the number of results
                $scope.resultsCount = data.totalCount;

                var queryResults = data.results;
                console.log(queryResults);
                var start = 0;
                var end = 10;
                $scope.addMarkers(queryResults, start, end);

                search.sendData(queryResults);
                console.log(search.getData());

                // broadcast Event that search is clicked
                $scope.$broadcast("searchClicked");

            });
        }
        else if (place && state)
        {
            search.getWithState(place, state).then(function(data)
            {

                //console.log(data);
                //a.searchResults = data;
                //console.log(a.searchResults);
                // track the number of results
                $scope.resultsCount = data.totalCount;

                var queryResults = data.results;
                console.log(queryResults);
                var start = 0;
                var end = 10;
                $scope.addMarkers(queryResults, start, end);

                search.sendData(queryResults);
                console.log(search.getData());

                // broadcast Event that search is clicked
                $scope.$broadcast("searchClicked");

            });
        }
        else if (!place && state)
        {
            search.getState(state).then(function(data)
            {

                //console.log(data);
                //a.searchResults = data;
                //console.log(a.searchResults);
                // track the number of results
                $scope.resultsCount = data.totalCount;

                var queryResults = data.results;
                console.log(queryResults);
                var start = 0;
                var end = 10;
                $scope.addMarkers(queryResults, start, end);

                search.sendData(queryResults);
                console.log(search.getData());

                // broadcast Event that search is clicked
                $scope.$broadcast("searchClicked");

            });
        }

        // $scope.$on("newPageClicked", function(event, args)
        // {
        //     console.log("newpage clicked");
        //     var num = search.getPageNumber();
        //     console.log(num);
        // });

        $rootScope.$on('addMarkers', function() {
            console.log("Add Markers");

            // delete the markers on the map
            deleteMarkers(markers);


            var data = search.getData();
            console.log(data);
            var pageNumber = search.getPageNumber();
            console.log(pageNumber);
            var indexes = getResultIndex(pageNumber);
            console.log(indexes);
            $scope.addMarkers(data, indexes[0], indexes[1]);

        });

        $scope.goToResult = function(searchResult)
        {
            console.log(searchResult);
            $state.go('searchResult', {'result': JSON.stringify(searchResult) });
        }





    }




}]);

app.controller('ResultsCtrl', ['$scope', '$http', '$stateParams', '$window', '$location', '$state', function($scope, $http, $stateParams, $window, $location, $state) {

    var result = JSON.parse($stateParams.result);
    $scope.name = result.name;
    $scope.fcodeName = result.fcodeName;

    $scope.goBack = function()
    {
        console.log("back button clicked!");

        $state.go('search2');
    }

}]);

function calculatePages(resultsCount)
{
    console.log(Math.round(resultsCount / 10));
    return Math.round(resultsCount / 10);
}


function OtherController($scope, search, $rootScope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
    resultsIndexes = getResultIndex(num);
    //$scope.$broadcast("newPageClicked");
    var data = search.getData();
    console.log(data);
    search.sendPageNumber(num);
    console.log(search.getPageNumber());


    //$scope.$broadcast("newPageClicked");
    $rootScope.$emit('addMarkers', {});



  };
}

app.controller('MyController', ['$scope', 'search', function ($scope, search) {

  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.meals = [];
  $scope.$on("searchClicked", function(event, args)
  {
    $scope.meals = search.getData();
    console.log($scope.meals);
  });




  //var data = userQuery.getData();
  //console.log(typeof(data));
  //$scope.places = data.userQuery;
  //console.log($scope.places);


  //console.log($scope.meals);

  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
}]);
app.controller('OtherController', OtherController);


function getResultIndex(num)
{
    resultsStartEnd = [];
    switch (num)
    {
        case 1:
            resultsStartEnd.push(0, 10);
            break;
        case 2:
            resultsStartEnd.push(10, 20);
            break;
        case 3:
            resultsStartEnd.push(20, 30);
            break;
        case 4:
            resultsStartEnd.push(30, 40);
            break;
        case 5:
            resultsStartEnd.push(40, 50);
            break;
        case 6:
            resultsStartEnd.push(50, 60);
            break;
        case 7:
            resultsStartEnd.push(60, 70);
            break;
        case 8:
            resultsStartEnd.push(70, 80);
            break;
        case 9:
            resultsStartEnd.push(80, 90);
            break;
        case 10:
            resultsStartEnd.push(90, 100);
            break;
    }
    return resultsStartEnd;
}


app.run( [ '$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        $rootScope.$previousState = from;
        console.log(from);
        var queryResults = from
    });
}]);


/*
$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    var queryResults = fromParams;
});
*/
