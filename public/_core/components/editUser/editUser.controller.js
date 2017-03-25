(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('EditUserController', EditUserController);

    EditUserController.$inject = ['$scope', '$timeout', '$location'];

    function EditUserController($scope, $timeout, $location) {

        $.fn.api.settings.api = {
            'editUser': 'http://localhost:8080/api/users/editUser'
        };

        $scope.imageStrings = [];
        $scope.$on('flow::filesAdded', function(event, $flow, files) {
            // document.getElementById("image_uploaded").value = "Not Empty";
            angular.forEach(files, function(flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function(event) {
                    var uri = event.target.result;
                    $scope.imageStrings[i] = uri;
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        });

        $scope.errorUploading = false;
        $scope.editionDataArray = {};
        var modal = document.getElementById('myModal');
        $scope.submitForm = function() {
            var valid = $('.ui.form').form('validate form');
            if (valid) {
                modal.style.display = "block";
                var form = $('.form');
                var allFields = form.form('get values');
                var uploadedImage = $scope.imageStrings[0];
                $scope.editionDataArray = {
                    "userId": 1, //Should be sessionStorage
                    "mail": allFields.mail,
                    "password": allFields.pass,
                    "name": allFields.name,
                    "image": uploadedImage
                };

                console.log($scope.editionDataArray.image);
                $('.ui.large.submit.button')
                    .api({
                        action: 'editUser',
                        method: 'POST',
                        data: ($scope.editionDataArray),
                        onResponse: function(response) {
                            console.log(response);
                            if (response.result == "valid") {
                                $location.path('/home').replace()
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            } else {
                                $scope.errorUploading = true;
                            }
                            return response;
                        }

                    });;
            }
        }

        $scope.closeModal = function() {
            modal.style.display = "none";
        }

        $scope.cancelEdit = function() {
            $location.path('/profile').replace()
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        $('.ui.form')
            .form({
                fields: {
                    // image_uploaded: {
                    // 	rules: [{ type: 'empty', prompt: 'Debe seleccionar una imagen' }]
                    // },
                    mail: {
                        rules: [{ type: 'email', prompt: 'Ingrese un correo válida' }]
                    },
                    pass: {
                        rules: [{ type: 'empty', prompt: 'Ingrese una contraseña' }]
                    },
                    name: {
                        rules: [{ type: 'empty', prompt: 'Ingrese un nombre' }]
                    }
                }
            })

    }
})();