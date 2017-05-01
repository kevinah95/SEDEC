(function() {
    'use strict';
    angular
        .module('app.upload')
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('upload', {
                url: '/upload',
                templateUrl: 'app/upload/upload.view.html',
                controller: 'UploadController',
                controllerAs: 'vm',
                css: 'app/upload/upload.style.css'
            });
    };
})();