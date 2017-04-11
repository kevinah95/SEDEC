(function() {
    'use strict';
    angular
        .module('app.upload')
        .controller('UploadController', UploadController);

    function UploadController($scope, $http, $timeout, $location) {
        var modal = document.getElementById('myModal');
        var info = { "Id": 1 }; //This line must be changed when we have SessionStorage
        var vm = this;
        vm.errorUploading = false;
        vm.diseaseID = -1;
        vm.imageStrings = [];
        vm.analysisArray = {};
        vm.processesList = {};
        vm.cancelUpload = cancelUpload;
        vm.setDiseaseId = setDiseaseId;
        vm.processFiles = processFiles;
        vm.openModal = openModal;
        vm.closeModal = closeModal;

        $.fn.api.settings.api = {
            'uploadAnalysis': 'http://localhost:8080/api/analysis/uploadAnalysis',
            'getProcesses': 'http://localhost:8080/api/processes/getProcesses'
        };

        function cancelUpload() {
            $location.path('/home')
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        //Get the Id from the dropdown        
        function setDiseaseId(id) {
            vm.diseaseID = id;
        }



        function processFiles(files) {
            document.getElementById("vm.image_uploaded").value = "Not Empty";
            angular.forEach(files, function(flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function(event) {
                    var uri = event.target.result;
                    vm.imageStrings[i] = uri;
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };




        function openModal() {
            var valid = $('.ui.form').form('validate form');
            if (valid) {
                modal.style.display = "block";

                var form = $('.form');
                var allFields = form.form('get values');
                var uploadedImage = vm.imageStrings[0];
                vm.analysisArray = {
                    "userId": 1, //Should be sessionStorage
                    "processId": vm.diseaseID,
                    "description": allFields.description,
                    "image": uploadedImage
                };

                //console.log(vm.analysisArray);
                //Upload Image
                $('.ui.large.submit.button')
                    .api({
                        action: 'uploadAnalysis',
                        method: 'POST',
                        data: (vm.analysisArray),
                        onResponse: function(response) {
                            console.log(response);
                            if (response.result == "valid") {
                                $location.path('/home').replace()
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

        $('.ui.form')
            .form({
                fields: {
                    image_uploaded: {
                        rules: [{ type: 'empty', prompt: 'Debe seleccionar una imagen' }]
                    },
                    disease: {
                        rules: [{ type: 'empty', prompt: 'Seleccione una enfermedad' }]
                    }
                }
            })

        $('.ui.dropdown').dropdown()
            .api({
                action: 'getProcesses',
                method: 'POST',
                data: info,
                on: 'mouseenter',
                onResponse: function(response) {
                    vm.processesList = response;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    //console.log(response)
                    return response;
                }
            });;

    }
})();