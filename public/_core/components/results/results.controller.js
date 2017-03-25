(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('resultsCtrl', function($scope, $timeout, $location, $http, ResultService) {
            var info = {
                id: 1
            }

            $scope.results = {}

            /*$timeout(
                function() {
                    console.log("$timeout 1");
                }
            );
            $scope.$evalAsync(function() {

                $http.get('/api/users/getUsers')
                    .then(function(response) {
                        data = response.data;
                        //$scope.results = data;
                        console.log(data)
                    });

                //ResultService.searchRest(info)
            });
            $scope.$applyAsync(
                function($scope) {
                    console.log("$aplyAsync");
                }
            );*/
            /*$scope.name = 'World';

            $scope.$watch(
                function(scope) { return scope.name; },
                function(newValue, oldValue, scope) {

                    console.log('First watch executed \nAdding $evalAsync');
                    scope.$evalAsync(function(scope) {

                        console.log('$evalAsync executed');
                        scope.newValue = "new value!";
                    });
                }
            );

            $scope.$$postDigest(function() {

                console.log('$$postDigest executed. Digest completed');
                console.log($scope.newValue);
            });*/

            /*setTimeout(function() {
                $scope.message = 'Fetched after two seconds';
                console.log('message:' + $scope.message);
                $scope.$apply(); //this triggers a $digest
            }, 2000);*/

            /*$timeout(function() {
                console.log("Running after the digest cycle");
            }, 0, false);*/

            /*$scope.$watch('enabled', function(val) {
                console.log('You are now: ' + (val ? 'enabled' : 'disabled'));
            });
            $scope.enabled = 0;
            $scope.enabled = 0;
            $scope.enabled = true;*/
            $scope.$$postDigest(function() {
                console.log('$$postDigest executed. Digest completed');
                /*$http.get('/api/users/getUsers')
                    .then(function(response) {
                        data = response.data;
                        //$scope.results = data;
                        console.log(data)
                    });*/
                ResultService.searchRest(info).then(function(res) {
                    console.log(res.data)
                    $scope.results = res.data

                }, function() {
                    console.log("FAILED")
                });
            });



        });
})();