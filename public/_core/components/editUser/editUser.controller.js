(function() {
    'use strict';
    angular
        .module('sedecApp')
        .controller('EditUserController', EditUserController);

    function EditUserController($scope, $location) {

        var vm = this;
        vm.imageStrings = [];
        vm.errorUploading = false;
        vm.editionDataArray = {};
        vm.submitForm = submitForm;
        vm.closeModal = closeModal;
        vm.cancelEdit = cancelEdit;

        var modal = document.getElementById('myModal');

        $.fn.api.settings.api = {
            'editUser': 'http://localhost:8080/api/users/editUser'
        };

        $scope.$on('flow::filesAdded', function(event, $flow, files) {
            // document.getElementById("image_uploaded").value = "Not Empty";
            angular.forEach(files, function(flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function(event) {
                    var uri = event.target.result;
                    vm.imageStrings[i] = uri;
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        });





        function submitForm() {
            var valid = $('.ui.form').form('validate form');
            if (valid) {
                modal.style.display = "block";
                var form = $('.form');
                var allFields = form.form('get values');
                var uploadedImage = vm.imageStrings[0];
                vm.editionDataArray = {
                    "userId": 1, //Should be sessionStorage
                    "mail": allFields.mail,
                    "password": allFields.pass,
                    "name": allFields.name,
                    "image": uploadedImage
                };

                console.log(vm.editionDataArray.image);
                $('.ui.large.submit.button')
                    .api({
                        action: 'editUser',
                        method: 'POST',
                        data: (vm.editionDataArray),
                        onResponse: function(response) {
                            console.log(response);
                            if (response.result == "valid") {
                                $location.path('/home')
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            } else {
                                vm.errorUploading = true;
                            }
                            return response;
                        }

                    });;
            }
        }

        function closeModal() {
            modal.style.display = "none";
        }

        function cancelEdit() {
            $location.path('/profile')
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