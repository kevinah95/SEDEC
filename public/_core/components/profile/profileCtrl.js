app.controller('profileCtrl', function ($scope, $timeout, $location, ResultService) {
    var info = {
        mailp: "jmaq.cr@gmail.com",
        passp: "pathfinder"
    }

    $scope.logout = function () {
        $location.path('/login').replace()
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.editUser = function () {
        $location.path('/editUser').replace()
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.$$postDigest(function () {
        console.log('$$postDigest executed. Digest completed');

        ResultService.checkUser(info).then(function (res) {
            console.log(res.data)
            $scope.user = res.data[0]

        }, function () {
            console.log("FAILED")
        });
    });
});