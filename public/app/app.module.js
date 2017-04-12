(function() {
    'use strict';
    angular
        .module('sedecApp', [
            /*
             * Everybody has access to these.
             * We could place these under every feature area,
             * but this is easier to maintain.
             */
            'app.core',
            /*
             * Feature areas
             */
            'app.login', 'app.home', 'app.upload',
            'app.results', 'app.profile', 'app.admin'
        ]);
})();