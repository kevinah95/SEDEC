(function() {
    'use strict';
    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    function LoginController($scope, $rootScope, $state, $location, $window, $auth, $timeout, toastr) {

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
                },
                inline: true,
                on: 'blur'
            })
            /**
             * API Settings: https://semantic-ui.com/behaviors/api.html#/settings
             * 
             */
            .api({
                action: 'login',
                serializeForm: true,
                method: 'GET',
                data: $(this).serialize(),
                beforeSend: function(settings) {
                    /*settings.data = {
                        email: $('.ui.form').form('get value', 'email'),
                        password: $('.ui.form').form('get value', 'password')
                    };*/

                    //console.log(settings);
                    return settings;
                },
                onSuccess: function(response) {
                    //console.log(response);
                    $auth.setToken(response.token);
                    $window.localStorage.currentUser = JSON.stringify(response.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    $('#form').addClass('loading'); //simulate async
                    $timeout(function() {
                        $('#form').removeClass('loading'); //simulate async
                        $state.go('home');
                    }, 1000);
                    return response;
                },
                /**
                 * add semantic form errors: https://github.com/Semantic-Org/Semantic-UI/issues/959
                 * 
                 */
                onError: function(errorMessage, element, xhr) {
                    var errorPassword = xhr.responseJSON.message.password;
                    var errorEmail = xhr.responseJSON.message.email;
                    if (errorPassword) {
                        $('#form').form('add prompt', 'password', 'La contraseña es incorrecta');
                    }
                    if (errorEmail) {
                        $('#form').form('add prompt', 'email', 'El correo no pertenece a ningún usuario registrado.');
                    }
                }
            });

    }
})();