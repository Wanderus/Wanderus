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


/*
app.controller('ResultsCtrl', ['$scope', '$http', '$stateParams', '$window', '$location', '$state', function($scope, $http, $stateParams, $window, $location, $state) {


}]);
*/
