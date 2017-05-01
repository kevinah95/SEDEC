(function() {
    'use strict';
    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $auth, $window, $location, $rootScope, $state) {
        var vm = this;
        vm.results = {};
        vm.user = {};
        vm.logout = logout;
        vm.editUser = editUser;

        /**
         * This function is called after dom is rendered
         * More info:
         * http://blogs.microsoft.co.il/choroshin/2014/04/08/angularjs-postdigest-vs-timeout-when-dom-update-is-needed/
         */
        $scope.$$postDigest(function() {
            vm.user = $rootScope.currentUser;
        });

        function logout() {
            $auth.logout();
            delete $window.localStorage.currentUser;
            $state.go('login');
        };

        function editUser() {
            $state.transitionTo('profile.edit');
        };

    }
})();