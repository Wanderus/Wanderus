var app = angular.module('searchFunction', ['ngResource']);

app.controller('MainCtrl', ['$scope', '$resource', function($scope, $resource) {

    $scope.query= $resource("http://api.geonames.org/searchJSON?q=dc&maxRows=10&username=rhsu0268");


    $scope.getData = function()
    {
        $scope.queryResult = $scope.query.get();
    }





}]);
