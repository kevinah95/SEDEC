(function() {
    'use strict';
    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    function LoginController($scope, $rootScope, $location, $window, $auth, $timeout) {

        //When login fails, this becomes true 
        $scope.NotRegistered = false;

        $.fn.api.settings.api = {
            'login': 'http://localhost:8080/api/auth/login',
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
                        if (!$scope.$phase) {
                            $scope.$apply();
                        }
                        return;
                    } else {
                        var email = $('.ui.form').form('get value', 'email');
                        var password = $('.ui.form').form('get value', 'password');
                        $auth.login({ email: email, password: password })
                            .then(function(response) {
                                $window.localStorage.currentUser = JSON.stringify(response.data.user);
                                $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                                //console.log(response.data);
                                $timeout(function() {
                                    $location.path('/home').replace()
                                    if (!$scope.$phase) {
                                        $scope.$apply();
                                    }
                                    console.log($auth.isAuthenticated());
                                }, 1000);
                            })
                            .catch(function(response) {
                                $scope.errorMessage = {};
                                angular.forEach(response.data.message, function(message, field) {
                                    //$scope.loginForm[field].$setValidity('server', false);
                                    //$scope.errorMessage[field] = response.data.message[field];
                                    console.log(message);
                                });
                            });


                        /*var user = {
                            email: email,
                            password: password
                        };
                        // Satellizer
                        $auth.signup(user)
                            .catch(function(response) {
                                console.log(response.data);
                            });*/
                        //console.log($('.ui.form').form('get value', 'email'));
                        /*$location.path('/home').replace()
                        if (!$scope.$phase) {
                            $scope.$apply();
                        }*/
                    }
                    return response;
                }
            });

    }
})();