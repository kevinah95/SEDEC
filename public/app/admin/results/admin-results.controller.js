(function() {
    'use strict';
    angular
        .module('admin.results')
        .controller('AdminResultsController', AdminResultsController);

    function AdminResultsController($scope, $location, $rootScope, $auth, resultsService, $filter) {
        var vm = this;
        vm.results = [];
        vm.original = [];
        vm.updateFilteredListID = updateFilteredListID;
        vm.updateFilteredListProcess = updateFilteredListProcess;
        vm.updateFilteredListOrg = updateFilteredListOrg;
        vm.updateFilteredListUser = updateFilteredListUser;
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
            itemsPerPage: 5,
            fillLastPage: true
        }

        function updateFilteredListID() {
            vm.results = $filter("filter")(vm.original, { analysisId: vm.queryID });
        }

        function updateFilteredListProcess() {
            vm.results = $filter("filter")(vm.original, { processName: vm.queryProcess });
        }

        function updateFilteredListOrg() {
            vm.results = $filter("filter")(vm.original, { organizationName: vm.queryOrg });
        }

        function updateFilteredListUser() {
            vm.results = $filter("filter")(vm.original, { userName: vm.queryUser });
        }
        //$filter("filter")(vm.results, vm.query);

        function activate() {
            return resultsService.getAll()
                .then(function(data) {
                    console.log(data);
                    vm.results = data;
                    vm.original = data;
                    return vm.results;
                })
                .catch(function(error) {
                    //console.log(error);
                    return error;
                });
        };

    }
})();