(function() {
    'use strict';
    angular
        .module('app.core')
        .factory('resultsService', resultsService);

    function resultsService($q, $http) {
        var service = {
            getResults: getResults,
            getAll: getAll
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
                //console.error(e.data.message);
                return $q.reject(e);
            }

        }

        function getAll() {
            return $http.get('/api/v1/admin/results')
                .then(getResultsComplete)
                .catch(getResultsFailed);

            function getResultsComplete(res, status, headers, config) {
                return res.data;
            }

            function getResultsFailed(e) {
                //console.error(e.data.message);
                return $q.reject(e);
            }

        }
    }
})();