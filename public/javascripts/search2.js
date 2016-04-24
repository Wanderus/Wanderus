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


        $urlRouterProvider.otherwise('search2');
    }
]);


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

    searchService.sendData = function(data)
    {
        searchService.searchResults = data;
    };

    searchService.getData = function()
    {
        return searchService.searchResults;
    }


    return searchService;

}]);

app.controller('MainCtrl', ['$scope', '$http', '$state', 'search', function($scope, $http, $state, search) {

    //$scope.search = search;
	// test it out
    // test it out



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

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 16});




    // function for adding markers

    function addMarkers(results)
    {
        //L.marker([38.907347, -77.036591]).addTo(map);
        console.log(results);

        angular.forEach(results, function(value, key) {

            var lat = value.lat;
            var long = value.lng;
            //L.marker([lat, long]).addTo(map);




            console.log("lat: " + lat + "long: " + long);
            var marker = L.marker([lat, long]).addTo(map);
            marker.bindPopup("<b>" + value.name + "</b><br>" + value.fcodeName);

        });
    }



    $scope.getData = function()
    {
        //var a = {};
        //console.log($scope.results);
        var place = $scope.place;
        var state = $scope.state;
        //console.log("Feature: " + feature);
        //console.log("State: " + state);
        //console.log(search);

        search.get(place).then(function(data)
        {

            //console.log(data);
            //a.searchResults = data;
            //console.log(a.searchResults);
            // track the number of results
            $scope.resultsCount = data.totalCount;

            var queryResults = data.results;
            console.log(queryResults);
            addMarkers(queryResults);

            search.sendData(queryResults);
            console.log(search.getData());

            // broadcast Event that search is clicked
            $scope.$broadcast("searchClicked");

        });

    }



}]);

function calculatePages(resultsCount)
{
    console.log(Math.round(resultsCount / 10));
    return Math.round(resultsCount / 10);
}


function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
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
