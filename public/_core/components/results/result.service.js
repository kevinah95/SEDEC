(function() {
    'use strict';
    angular
        .module('sedecApp')
        .factory('ResultService', function($rootScope, $q, $log, $http) {
            var currentRestaurant = undefined;
            return {
                searchRest: function(model) {
                    var deferred = $q.defer();

                    $http.post('/api/users/getResults', model)
                        .then(function(data) {
                            deferred.resolve(data);
                            //console.log(data);
                            //sessionStorage.restaurant = JSON.stringify(data);

                        });
                    return deferred.promise;
                },
                checkUser: function(model) {
                    var deferred = $q.defer();

                    $http.post('/api/users/getUsers', model)
                        .then(function(data) {
                            deferred.resolve(data);
                            //console.log(data);
                            //sessionStorage.restaurant = JSON.stringify(data);

                        });
                    return deferred.promise;
                }
            };
        });
})();