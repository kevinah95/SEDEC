(function() {
    'use strict';
    angular
        .module('sedecApp')
        .factory('profileService', profileService);

    function profileService($rootScope, $q, $log, $http) {
        var service = {
            checkUser: checkUser
        };
        return service;

        function checkUser(model) {
            return $http.post('/api/users/getUsers', model)
                .then(checkUserComplete)
                .catch(checkUserFailed);

            function checkUserComplete(res, status, headers, config) {
                //console.log(res.data);
                return res.data;
            }

            function checkUserFailed(e) {
                console.error(e.data.message);
                return $q.reject(e);
            }
        }
    }
})();