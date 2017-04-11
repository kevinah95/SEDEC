describe('NavbarController', function() {
    var $controller, NavbarController, scope, $location;

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));

    // Inject the $controller service to create instances of the controller (NavbarController) we want to test
    beforeEach(inject(function(_$controller_, _$rootScope_, _$location_) {
        scope = _$rootScope_.$new();
        $location = _$location_;
        $controller = _$controller_;
        NavbarController = $controller('NavbarController', { $scope: scope });
    }));

    // Verify our controller exists
    it('should be defined', function() {
        expect(NavbarController).toBeDefined();
    });

    describe('.home()', function() {
        it('should exist', function() {
            expect(NavbarController.home).toBeDefined();
        });

        it('should change $location to /home when setting it via home function', inject(function() {
            spyOn($location, 'path');
            NavbarController.home();
            expect($location.path).toHaveBeenCalledWith('/home');
        }));

    });

    describe('.profile()', function() {
        it('should exist', function() {
            expect(NavbarController.profile).toBeDefined();
        });

        it('should change $location to /profile when setting it via profile function', inject(function() {
            spyOn($location, 'path');
            NavbarController.profile();
            expect($location.path).toHaveBeenCalledWith('/profile');
        }));
    });

    describe('.results()', function() {
        it('should exist', function() {
            expect(NavbarController.results).toBeDefined();
        });

        it('should change $location to /results when setting it via results function', inject(function() {
            spyOn($location, 'path');
            NavbarController.results();
            expect($location.path).toHaveBeenCalledWith('/results');
        }));
    });

    describe('.upload()', function() {
        it('should exist', function() {
            expect(NavbarController.upload).toBeDefined();
        });

        it('should change $location to /upload when setting it via upload function', inject(function() {
            spyOn($location, 'path');
            NavbarController.upload();
            expect($location.path).toHaveBeenCalledWith('/upload');
        }));
    });
});