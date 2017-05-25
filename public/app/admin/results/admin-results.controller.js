(function() {
    'use strict';
    angular
        .module('admin.results')
        .controller('AdminResultsController', AdminResultsController);

    function AdminResultsController($scope, $location, $rootScope, $auth, resultsService) {
        var vm = this;
        vm.results = [];
        if ($auth.isAuthenticated() && $rootScope.currentUser) {
            /*API.getFeed().success(function(data) {
                $scope.photos = data;
            });*/
            console.log($auth.isAuthenticated());
            $scope.$$postDigest(function() {
                console.log('$$postDigest executed. Digest completed');
                activate();
            });
        }
        vm.config = {
            itemsPerPage: 1,
            fillLastPage: true
        }

        function activate() {
            return resultsService.getAll()
                .then(function(data) {
                    console.log(data);
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