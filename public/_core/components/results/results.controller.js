(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('ResultsController', ResultsController);

    function ResultsController($scope, resultsService) {
        var vm = this;
        vm.results = {};
        vm.userInfo = {
            id: 1
        };

        $scope.$$postDigest(function() {
            console.log('$$postDigest executed. Digest completed');
            activate(vm.userInfo);
        });

        function activate(info) {
            return resultsService.getResults(info)
                .then(function(data) {
                    console.log(data);
                    vm.results = data;
                    return vm.results;
                })
                .catch(function(error) {
                    console.log(error);
                    return error;
                });
        };

    }
})();