app.controller('loginCtrl', function($scope, $http, $timeout, $location) {

    //When login fails, this becomes true 
    $scope.NotRegistered = false;

    //Login Function
    $scope.login = function() {
        var $form = $('.form'),
            allFields = $form.form('get values');
        $form.form('validate form'); //Check form
        //You can put here the database part, Kevin, if the result from the query is false (I mean, the guy is not registered in SEDEC, so you must change the boolean NotRegistered and set it in True) :D
    };

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
                    alert(response.result);
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