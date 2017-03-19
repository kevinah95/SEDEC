app.controller('navbarCtrl', function($scope, $timeout, $location) {

    $(document).ready(function() {
        $('.dropdown')
            .dropdown({
                action: 'select'
            });
    });
});