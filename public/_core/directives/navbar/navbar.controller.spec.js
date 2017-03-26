describe('NavbarController', function() {
    var $controller, NavbarController, scope;

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));

    // Inject the $controller service to create instances of the controller (NavbarController) we want to test
    beforeEach(inject(function(_$controller_, _$rootScope_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        NavbarController = $controller('NavbarController', { $scope: scope });
    }));

    // Verify our controller exists
    it('should be defined', function() {
        expect(NavbarController).toBeDefined();

    });
});