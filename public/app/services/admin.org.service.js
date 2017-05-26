(function () {
    'use strict';
    angular
        .module('app.core')
        .factory('adminOrgService', adminOrgService);

    function adminOrgService($q, $http) {
        var service = {
            getOrganizations: getOrganizations,
            getProcesses: getProcesses,
            getProcessByOrganization: getProcessByOrganization,
            organizationUpdate: organizationUpdate,
            organizationDelete: organizationDelete,
            organizationCreate: organizationCreate,
            createProcess: createProcess
        };
        return service;

        function getOrganizations() {
            return $http.get('/api/v1/admin/org/organizations')
                .then(getOrganizationsComplete)
                .catch(getOrganizationsFailed);

            function getOrganizationsComplete(res, status, headers, config) {
                return res.data;
            }

            function getOrganizationsFailed(e) {
                return $q.reject(e);
            }

        }

        function getProcesses() {
            return $http.get('/api/v1/admin/org/allProcesses')
                .then(getProcessesComplete)
                .catch(getProcessesFailed);

            function getProcessesComplete(res, status, headers, config) {
                return res.data;
            }

            function getProcessesFailed(e) {
                return $q.reject(e);
            }

        }

        function getProcessByOrganization(orgId) {
            var dataStructure = {
                "id": orgId
            }
            return $http.post('/api/v1/admin/org/processByOrganization', dataStructure)
                .then(getProcessByOrganizationComplete)
                .catch(getProcessByOrganizationFailed);

            function getProcessByOrganizationComplete(res, status, headers, config) {
                return res.data;
            }

            function getProcessByOrganizationFailed(e) {
                return $q.reject(e);
            }
        }

        function organizationUpdate(dataStructure) {
            return $http.put('/api/v1/admin/org/organizationUpdate', dataStructure)
                .then(organizationUpdateComplete)
                .catch(organizationUpdateFailed);

            function organizationUpdateComplete(res, status, headers, config) {
                return res.data;
            }

            function organizationUpdateFailed(e) {
                return $q.reject(e);
            }
        }

        function organizationDelete(orgId) {
            var dataStructure = {
                "id": orgId
            }
            return $http.put('/api/v1/admin/org/deleteOrganization', dataStructure)
                .then(organizationDeleteComplete)
                .catch(organizationDeleteFailed);

            function organizationDeleteComplete(res, status, headers, config) {
                return res.data;
            }

            function organizationDeleteFailed(e) {
                return $q.reject(e);
            }
        }

        function organizationCreate(dataStructure) {
            return $http.put('/api/v1/admin/org/createOrganization', dataStructure)
                .then(organizationCreateComplete)
                .catch(organizationCreateFailed);

            function organizationCreateComplete(res, status, headers, config) {
                return res.data;
            }

            function organizationCreateFailed(e) {
                return $q.reject(e);
            }
        }

        function createProcess(dataStructure) {
            return $http.put('/api/v1/admin/org/createProcess', dataStructure)
                .then(createProcessComplete)
                .catch(createProcessFailed);

            function createProcessComplete(res, status, headers, config) {
                return res.data;
            }

            function createProcessFailed(e) {
                return $q.reject(e);
            }
        }
    }
})();