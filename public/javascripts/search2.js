//var mongoose = require('mongoose');

var app = angular.module('searchFunction2', ['ngResource', 'ui.router']);


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


    return searchService;

}]);

app.controller('MainCtrl', ['$scope', '$http', '$state', 'search', function($scope, $http, $state, search) {

    //$scope.search = search;
	// test it out
    // test it out

    // init map
    initMap();


    $scope.getData = function()
    {
        //var a = {};
        console.log($scope.results);
        var place = $scope.place;
        var state = $scope.state;
        //console.log("Feature: " + feature);
        //console.log("State: " + state);
        console.log(search);

        search.get(place).then(function(data)
        {

            console.log(data);
            //a.searchResults = data;
            //console.log(a.searchResults);

        });
        //console.log(a.searchResults);

        //$scope.results = searches.searchResults;
        //console.log($scope.results);
    }



}]);

function initMap()
{
    var map = L.map('map').setView([38.907347, -77.036591], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
	}).addTo(map);
}


/*
app.controller('ResultsCtrl', ['$scope', '$http', '$stateParams', '$window', '$location', '$state', function($scope, $http, $stateParams, $window, $location, $state) {


}]);
*/
