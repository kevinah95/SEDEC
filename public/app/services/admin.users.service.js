(function() {
    'use strict';
    angular
        .module('app.core')
        .factory('adminUsersService', adminUsersService);

    function adminUsersService($q, $http) {
        var service = {
            getAllUsers: getAllUsers,
            disableUser: disableUser,
            getOrganizations: getOrganizations,
            getOrganizationProcesses: getOrganizationProcesses,
            createUser: createUser,
            updateUser: updateUser,
            associateUserProcess: associateUserProcess,
            removeUserProcesses: removeUserProcesses
        };
        return service;

        function getAllUsers() {
            return $http.get('/api/v1/admin/users/getAllUsers')
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

        function disableUser(obj) {
            return $http.post('/api/v1/admin/users/disableUser', obj)
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

        function getOrganizations() {
            return $http.get('/api/v1/admin/users/getOrganizations')
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

        function getOrganizationProcesses(obj) {
            return $http.post('/api/v1/admin/users/getOrganizationProcesses', obj)
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

        function createUser(obj) {
            return $http.post('/api/v1/admin/users/createUser', obj)
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

        function updateUser(obj) {

            return $http.post('/api/v1/admin/users/updateUser', obj)
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

        function associateUserProcess(obj) {

            return $http.post('/api/v1/admin/users/associateUserProcess', obj)
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
        
        function removeUserProcesses(obj) {

            return $http.post('/api/v1/admin/users/removeUserProcesses', obj)
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