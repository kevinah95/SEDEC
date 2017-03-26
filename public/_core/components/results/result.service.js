(function() {
    'use strict';
    angular
        .module('sedecApp')
        .factory('resultService', resultService);

    function resultService($rootScope, $q, $log, $http) {
        var service = {
            getResults: getResults
        };
        return service;

        function getResults(model) {
            return $http.post('/api/results/getResults', model)
                .then(getResultsComplete)
                .catch(getResultsFailed);

            function getResultsComplete(res, status, headers, config) {
                return res.data;
            }

            function getResultsFailed(e) {
                console.error(e.data.message);
                return $q.reject(e);
            }

        }
    }
})();