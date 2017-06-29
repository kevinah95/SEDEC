(function() {
    'use strict';
    angular
        .module('app.core')
        .factory('notificationsService', notificationsService);

    function notificationsService($q, $http) {
        var service = {
            getAllByUser: getAllByUser,
            update: update
        };
        return service;
        /**
         * Obtiene todas las notificaciones por el usuario
         * actual.
         * @returns response.data | response.error
         */
        function getAllByUser() {
            return $http.get('/api/v1/notifications')
                .then(getResultsComplete)
                .catch(getResultsFailed);

            function getResultsComplete(res, status, headers, config) {
                return res.data;
            }

            function getResultsFailed(e) {
                return $q.reject(e);
            }

        }

        /**
         * Actualiza la notificación cuando se marca como vista.
         * @param {json} obj ID de la notificación
         * @returns response.data | response.error
         */
        function update(obj) {
            return $http.put('/api/v1/notifications/' + obj)
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