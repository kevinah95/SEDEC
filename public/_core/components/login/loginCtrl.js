app.controller('loginCtrl', function($scope, $http, $timeout, $location) {

    //When login fails, this becomes true 
    $scope.NotRegistered = false;

    $.fn.api.settings.api = {
        'login': 'http://localhost:8080/api/users/login',
    };

    $('.ui.form')
        .form({
            fields: {
                email: {
                    rules: [{ type: 'email', prompt: 'Ingrese un correo válido' }]
                },
                password: {
                    rules: [{ type: 'empty', prompt: 'Ingrese una contraseña válida' }]
                }
            }
        })
        .api({
            action: 'login',
            serializeForm: true,
            method: 'POST',
            data: $(this).serialize(),
            onResponse: function(response) {
                if (response.result == "invalid") {
                    $scope.NotRegistered = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    return;
                } else {
                    $location.path('/home').replace()
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
                return response;
            }
        });

});