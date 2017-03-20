app.controller('resultsCtrl', function($scope, $timeout, $location) {
    $scope.$watch("results", function(newVal) {
        if (newVal != null && newVal.length > 0) {
            console.log(newVal);
        }

        console.log($scope.results);
    });
});