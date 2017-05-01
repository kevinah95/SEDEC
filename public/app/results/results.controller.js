(function() {
    'use strict';
    angular
        .module('app.results')
        .controller('ResultsController', ResultsController);

    function ResultsController($rootScope, $scope, resultsService, $auth) {

        var vm = this;
        vm.results = {};
        if ($auth.isAuthenticated() && $rootScope.currentUser) {
            /*API.getFeed().success(function(data) {
                $scope.photos = data;
            });*/
            console.log($auth.isAuthenticated());
            $scope.$$postDigest(function() {
                console.log('$$postDigest executed. Digest completed');
                activate($rootScope.currentUser);
            });
        }



        function activate(info) {
            return resultsService.getResults(info)
                .then(function(data) {
                    //console.log(data);
                    vm.results = data;
                    return vm.results;
                })
                .catch(function(error) {
                    //console.log(error);
                    return error;
                });
        };

    }
})();