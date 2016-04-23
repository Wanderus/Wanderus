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


app.factory('searches', ['$http', function($http) {

    var searchService = {
            searchResults: []
    };

    searchService.get = function(userInput)
    {
        return $http.get('/searches' + userInput).then(function (res) {

            console.log(res.data);
            return res.data;
        });
    };
    return searchService;

}]);

app.controller('MainCtrl', ['$scope', '$http', '$state', 'searches', function($scope, $http, $state, searches) {

	// test it out
    // test it out



}]);


/*
app.controller('ResultsCtrl', ['$scope', '$http', '$stateParams', '$window', '$location', '$state', function($scope, $http, $stateParams, $window, $location, $state) {


}]);
*/
