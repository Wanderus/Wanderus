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


app.controller('MainCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {



}]);


/*
app.controller('ResultsCtrl', ['$scope', '$http', '$stateParams', '$window', '$location', '$state', function($scope, $http, $stateParams, $window, $location, $state) {


}]);
*/