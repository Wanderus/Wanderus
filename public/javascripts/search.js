
var app = angular.module('searchFunction', ['ngResource', 'ui.router']);

/*
app.factory('searchResults', ['$http', function($http) {

    var searchResultsService = {
        results: []
    };

    searchResultsService.get = function()
    {

        return $http.get("http://api.geonames.org/searchJSON?q=dc&maxRows=10&username=rhsu0268")
            .success(function(data)
            {

                //console.log(data);
                angular.copy(data, searchResultsService.results);
                console.log(searchResultsService.results);
                //searchResults = data;

            });
    };

    return searchResultsService;

}]);
*/


app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider)
    {
        $stateProvider.state('search', {
            url: '',
            templateUrl: '/searchPage.html',
            controller: 'MainCtrl'

        });

        $stateProvider.state('searchResult', {
            url: '/results',
            controller: 'ResultsCtrl',
            templateUrl: '/searchResult.html',


        });

        $urlRouterProvider.otherwise('search');
    }
]);

app.controller('MainCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.error = false;

    var map = L.map('map').setView([38.907347, -77.036591], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
	}).addTo(map);



    $scope.getData = function()
    {

        // clear the results
        /*
        var resultElement = angular.element(document.querySelector('#result'));
        resultElement.empty();
        */

        $scope.error = false;
        var place = $scope.place;
        //var state = $scope.state;

        var encodePlace = encodeURI(place);
        var dc = encodeURI("Washington, D.C.")
        var query;

        /*
        if (state)
        {
            query = 'http://api.geonames.org/searchJSON?q=' + encodePlace + '&country=US' + '&adminName1=' + dc + '&username=rhsu0268';
        }
        */

        // build the query string
        //var query = 'http://api.geonames.org/postalCodeLookupJSON?placename=' + encodePlace + '&country=US' + '&username=rhsu0268';
        query = 'http://api.geonames.org/searchJSON?q=' + encodePlace + '&country=US' + '&adminCode1=DC' + '&username=rhsu0268';
        console.log(query);



        $http({method: 'GET', url: query})
            .success(function(data, status)
            {
                console.log(data);
                if (data.geonames.length == 0)
                {
                    $scope.error = true;
                    console.log("Sorry, your search yields no results");
                    $scope.resultsCount = 0;
                    $scope.queryResult = null;
                    return;
                }

                // track the number of results
                $scope.resultsCount = data.totalResultsCount;

                $scope.queryResult = data.geonames;
                console.log($scope.queryResult);

                calculatePages($scope.resultsCount);




            })
            .error(function(data, status) {
                alert("Error");
            });

    }

    $scope.goToResult = function(searchResult)
    {
        $state.go('searchResult', {result: searchResult});
    }

    $scope.getNext = function()
    {
        console.log("getNext is called!");
    }


}]);

app.controller('ResultsCtrl', ['$scope', '$http', function($scope, $http) {
    console.log(result);

}]);

function calculatePages(resultsCount)
{
    console.log(resultsCount);
}
