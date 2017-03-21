app.controller('navbarCtrl', function ($scope, $timeout, $location, $route) {


    $scope.home = function () {
        $location.path('/home').replace();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.profile = function () {
        $location.path('/profile');
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.results = function () {
        $location.path('/results');
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.upload = function () {
        $location.path('/upload');
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $(function () {
        $(document).ready(function () {
            $('#notifications')
                .dropdown({
                    action: 'select'
                });
        });

    });
});