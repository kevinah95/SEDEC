(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('NavbarController', NavbarController);

    function NavbarController($scope, $location) {
        var navbar = this;
        navbar.home = home;
        navbar.profile = profile;
        navbar.results = results;
        navbar.upload = upload;

        function home() {
            $location.path('/home');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function profile() {
            $location.path('/profile');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function results() {
            $location.path('/results');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        function upload() {
            $location.path('/upload');
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };



        $(function() {
            $(document).ready(function() {
                $('#notifications')
                    .dropdown({
                        action: 'select'
                    });
            });

        });
    }
})();