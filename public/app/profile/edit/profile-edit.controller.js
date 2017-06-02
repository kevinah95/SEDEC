(function() {
    'use strict';
    angular
        .module('profile.edit')
        .controller('EditUserController', EditUserController);

    function EditUserController($scope, $location, $rootScope) {

        var vm = this;
        vm.imageStrings = [];
        vm.errorUploading = false;
        vm.editionDataArray = {};
        vm.submitForm = submitForm;
        vm.closeModal = closeModal;
        vm.processFiles = processFiles;
        vm.cancelEdit = cancelEdit;
        vm.user = {};

        var modal = document.getElementById('myModal');

        $scope.$$postDigest(function() {
            vm.user = $rootScope.currentUser;
            console.log('EditUser');
        });

        $.fn.api.settings.api = {
            'editUser': 'http://localhost:8080/api/users/editUser'
        };

        function processFiles(files) {
            document.getElementById("vm.image_uploaded").value = "Not Empty"; //Esto tiene que ir en la fución que me trae la info, en le valid
            angular.forEach(files, function(flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function(event) {
                    var uri = event.target.result;
                    vm.imageStrings[i] = uri;
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };





        function submitForm() {
            var valid = $('.ui.form').form('validate form');
            if (valid) {
                modal.style.display = "block";
                var form = $('.form');
                var allFields = form.form('get values');
                var uploadedImage = ""
                if (vm.imageStrings[0] == null){
                    uploadedImage = vm.user.userProfilePicture;
                }
                else{
                    uploadedImage = vm.imageStrings[0];
                }
                vm.editionDataArray = {
                    "userId": $rootScope.currentUser.userId,
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
                    mail: {
                        rules: [{ type: 'email', prompt: 'Ingrese un correo válida' }]
                    },
                    pass: {
                        rules: [{ type: 'empty', prompt: 'Debe ingresar su contraseña o una nueva' }]
                    },
                    name: {
                        rules: [{ type: 'empty', prompt: 'Ingrese un nombre' }]
                    }
                }
            })
    }
})();