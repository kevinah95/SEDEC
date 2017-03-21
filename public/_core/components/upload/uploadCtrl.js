app.controller('uploadCtrl', function ($scope, $http, $timeout, $location) {

    $scope.errorUploading = false;

    $.fn.api.settings.api = {
        'uploadAnalysis': 'http://localhost:8080/api/users/uploadAnalysis',
        'getProcesses': 'http://localhost:8080/api/users/getProcesses'
    };

    $scope.cancelUpload = function () {
        $location.path('/home').replace()
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }

    //Get the Id from the dropdown
    $scope.diseaseID = -1;
    $scope.setDiseaseId = function (id) {
        $scope.diseaseID = id;
    }

    $scope.imageStrings = [];
    $scope.processFiles = function (files) {
        angular.forEach(files, function (flowFile, i) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                $scope.imageStrings[i] = uri;
            };
            fileReader.readAsDataURL(flowFile.file);
        });
    };


    //Array with all the info needed for the uploadAnalysis
    $scope.analysisArray = {};
    //Modal
    var modal = document.getElementById('myModal');
    $scope.openModal = function () {
        modal.style.display = "block";

        var form = $('.form');
        var allFields = form.form('get values');
        var uploadedImage = $scope.imageStrings[0];
        $scope.analysisArray =
            {
                "userId": 1, //Should be sessionStorage
                "processId": $scope.diseaseID,
                "description": allFields.description,
                "image": uploadedImage
            };

        console.log($scope.analysisArray);
        //Upload Image
        $('.ui.large.submit.button')
            .api({
                action: 'uploadAnalysis',
                method: 'POST',
                data: ($scope.analysisArray),
                onResponse: function (response) {
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

            });
        ;
    }

    $scope.closeModal = function () {
        modal.style.display = "none";
    }

    //Dropdown fill
    var info = { "Id": 1 }; //This line must be changed when we have SessionStorage
    $scope.processesList = {};

    $('.ui.dropdown').dropdown()
        .api({
            action: 'getProcesses',
            method: 'POST',
            data: info,
            on: 'mouseenter',
            onResponse: function (response) {
                $scope.processesList = response;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                console.log(response)
                return response;
            }
        });
    ;

});