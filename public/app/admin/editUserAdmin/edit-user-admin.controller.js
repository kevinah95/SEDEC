(function() {
    'use strict';
    angular
        .module('admin.edituseradmin')
        .controller('EditUserAdminController', EditUserAdminController);

    function EditUserAdminController($scope, $location) {
        var vm = this;
        /*vm.logout = logout;

        function logout() {
            $location.path('/login')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };*/


        $('.list .master.checkbox')
          .checkbox({
            // check all children
            onChecked: function() {
              var
                $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
              ;
              $childCheckbox.checkbox('check');
            },
            // uncheck all children
            onUnchecked: function() {
              var
                $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
              ;
              $childCheckbox.checkbox('uncheck');
            }
          })
        ;

    }
})();