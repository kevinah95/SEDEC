app.controller('navbarCtrl', function($scope, $timeout, $location, $route) {


    $scope.home = function() {
        $location.path('/home').replace();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.profile = function() {
        $location.path('/profile');
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        /*history.go(0);*/
    };
    $scope.results = function() {
        $location.path('/results');
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        /*history.go(0);*/
    };

    $(function() {
        $(document).ready(function() {
            $('#notifications')
                .dropdown({
                    action: 'select'
                });
        });

    });
});