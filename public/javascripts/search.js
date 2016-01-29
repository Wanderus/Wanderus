var app = angular.module('searchFunction', ['ngResource']);

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

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {



    $scope.getData = function()
    {
        var place = $scope.place;
        var encodePlace = encodeURI(place);

        // build the query string
        var query = 'http://api.geonames.org/postalCodeLookupJSON?placename=' + encodePlace + '&country=US' + '&username=rhsu0268';
        console.log(query);


        $http({method: 'GET', url: query})
            .success(function(data, status)
            {
                $scope.queryResult = data.postalcodes;
                console.log(data.postalcodes);
                /*
                for (var i = 0; i < $scope.queryResult.length; i++)
                {
                    console.log($scope.queryResult[i]);
                }
                */


                var areaArray = [];
                for (var area in $scope.queryResult.postalcodes)
                {
                    var tempObj = $scope.queryResult.postalcodes[area];
                    areaArray.push(tempObj);
                }

                console.log(areaArray);

            })
            .error(function(data, status) {
                alert("Error");
            });


    }


}]);
