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

    $scope.error = false;


    $scope.getData = function()
    {
        $scope.error = false;
        var place = $scope.place;
        var state = $scope.state;

        var encodePlace = encodeURI(place);
        var query;

        if (state)
        {
            query = 'http://api.geonames.org/searchJSON?q=' + encodePlace + '&country=US&adminCode1=' + state + '&username=rhsu0268';
        }
        else
        {
            // build the query string
            //var query = 'http://api.geonames.org/postalCodeLookupJSON?placename=' + encodePlace + '&country=US' + '&username=rhsu0268';
            query = 'http://api.geonames.org/searchJSON?q=' + encodePlace + '&country=US' + '&username=rhsu0268';
            console.log(query);

        }
        
        $http({method: 'GET', url: query})
            .success(function(data, status)
            {
                console.log(data);
                if (data.geonames.length == 0)
                {
                    $scope.error = true;
                    console.log("Sorry, your search yields no results");
                    return;
                }
                $scope.queryResult = data.geonames;
                console.log($scope.queryResult);



            })
            .error(function(data, status) {
                alert("Error");
            });

    }


}]);
