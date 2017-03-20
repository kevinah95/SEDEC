app.controller('navbarCtrl', function($scope, $timeout, $location, $route) {


    $scope.home = function() {
        $location.path('/home').replace();
    };
    $scope.profile = function() {
        $location.path('/profile');
        /*history.go(0);*/
    };
    $scope.results = function() {
        $location.path('/results');
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