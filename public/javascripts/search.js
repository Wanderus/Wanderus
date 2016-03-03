
var app = angular.module('searchFunction', ['ngResource', 'ui.router', 'angularUtils.directives.dirPagination']);

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


// create a searchResultsService
app.factory('userQuery', [function() {

    var userQueryService = {
        userQuery: []
    };

    userQueryService.sendData = function(data)
    {
        userQueryService.userQuery = data;
    }
    userQueryService.getData = function()
    {
        return userQueryService.userQuery;
    }
    return userQueryService;

}]);

app.controller('MainCtrl', ['$scope', '$http', '$state', 'userQuery', function($scope, $http, $state, userQuery) {


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

        $scope.error1 = false;
        $scope.error2 = false;
        var place = $scope.place;
        var state = $scope.state;

        var encodePlace = encodeURI(place);
        var dc = encodeURI("Washington, D.C.")
        var query;

        if (!place && !state)
        {
            $scope.error1 = true;
            console.log("You must enter text into the fields to get results!");
            $scope.resultsCount = 0;
            $scope.queryResult = null;
            return;
        }


        if (state)
        {
            // define some patterns to match
            var regex1 = /dc/i;
            var regex2 = /washington dc/i;
            var regex3 = /washington d.c./i;
            if (!regex1.test(state) && !regex2.test(state) && !regex3.test(state))
            {
                $scope.error2 = true;
                console.log("We currently support only Washington, DC and will be adding more cities to Wander soon!");
                $scope.resultsCount = 0;
                $scope.queryResult = null;
                return;
            }


            query = 'http://api.geonames.org/searchJSON?q=' + encodePlace + '&country=US' + '&adminCode1=DC' + '&username=rhsu0268';
        }
        else
        {
            // build the query string - be sure results are only from DC
            //var query = 'http://api.geonames.org/postalCodeLookupJSON?placename=' + encodePlace + '&country=US' + '&username=rhsu0268';
            query = 'http://api.geonames.org/searchJSON?q=' + encodePlace + '&country=US' + '&adminCode1=DC' + '&username=rhsu0268';
            console.log(query);
        }


        $http({method: 'GET', url: query})
            .success(function(data, status)
            {
                console.log(data);
                if (data.geonames.length == 0)
                {
                    $scope.error2 = true;
                    console.log("We currently support only Washington, DC and will be adding more cities to Wander soon!");
                    $scope.resultsCount = 0;
                    $scope.queryResult = null;
                    return;
                }

                // track the number of results
                $scope.resultsCount = data.totalResultsCount;

                $scope.queryResult = data.geonames;
                console.log($scope.queryResult);

                var queryResults = data.geonames;
                var queryResultsArray = [];
                angular.forEach(queryResults, function(value, key) {

                    this.push(key + ': ' + value);

                }, queryResultsArray);

                console.log(queryResultsArray);

                //var numberOfPages = calculatePages($scope.resultsCount);
                userQuery.sendData(queryResults);
                console.log(userQuery.getData());

                $scope.$broadcast("searchClicked");



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

    /*
    $scope.listElements = function()
    {
        var numberOfPages = calculatePages($scope.resultsCount);
        console.log(numberOfPages);
        var html = "<h1>Hello</h1>";
        return $sce.trustAsHtml(html);
    }
    */

}]);

app.controller('ResultsCtrl', ['$scope', '$http', function($scope, $http) {
    console.log(result);

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

app.controller('MyController', ['$scope', 'userQuery', function ($scope, userQuery) {

  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.meals = [];
  $scope.$on("searchClicked", function(event, args)
  {
    $scope.meals = userQuery.getData();
  });


  var dishes = [
    'noodles',
    'sausage',
    'beans on toast',
    'cheeseburger',
    'battered mars bar',
    'crisp butty',
    'yorkshire pudding',
    'wiener schnitzel',
    'sauerkraut mit ei',
    'salad',
    'onion soup',
    'bak choi',
    'avacado maki'
  ];

  var sides = [
    'with chips',
    'a la king',
    'drizzled with cheese sauce',
    'with a side salad',
    'on toast',
    'with ketchup',
    'on a bed of cabbage',
    'wrapped in streaky bacon',
    'on a stick with cheese',
    'in pitta bread'
  ];

  var data = userQuery.getData();
  console.log(typeof(data));
  $scope.meals = data.userQuery;
  console.log($scope.meals);
  for (var i = 1; i <= 100; i++) {
    var dish = dishes[Math.floor(Math.random() * dishes.length)];
    var side = sides[Math.floor(Math.random() * sides.length)];
    //$scope.meals.push('meal ' + i + ': ' + dish + ' ' + side);
    //$scope.meals.push(data);
  }

  //console.log($scope.meals);

  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  };
}]);
app.controller('OtherController', OtherController);
