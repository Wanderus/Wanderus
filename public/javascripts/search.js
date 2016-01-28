var app = angular.module('searchFunction', ['ngResource']);

app.controller('MainCtrl', ['$scope', '$resource', '$http', function($scope, $resource, $http) {

    /*
    $scope.query = $resource("http://api.geonames.org/searchJSON?q=dc&maxRows=10&username=rhsu0268");


    $scope.getData = function()
    {
        $scope.queryResult = $scope.query.get();

        var result = angular.fromJson($scope.queryResult);
        console.log(result);
    }
    */


    $scope.getData = function()
    {
        $http({method: 'GET', url: 'http://api.geonames.org/searchJSON?q=dc&maxRows=10&username=rhsu0268'})
            .success(function(data, status)
            {
                $scope.queryResult = data;
                console.log(data.geonames);
            })
            .error(function(data, status) {
                alert("Error");
            });
    }


    //console.log($scope.queryResult.geonames);





}]);
