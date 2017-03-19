app.controller('navbarCtrl', function($scope, $timeout, $location, $route) {


    $scope.home = function() {
        $location.path('/home').replace();
        $scope.$apply();
    };
    $scope.profile = function() {
        $location.path('/profile');
        /*history.go(0);*/
        $scope.$apply();
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