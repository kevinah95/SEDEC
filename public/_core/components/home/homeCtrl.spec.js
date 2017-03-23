describe('homeCtrl', function() {
    var $controller, homeCtrl, scope;

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));

    // Inject the $controller service to create instances of the controller (homeCtrl) we want to test
    beforeEach(inject(function(_$controller_, _$rootScope_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        homeCtrl = $controller('homeCtrl', { $scope: scope });
    }));

    // Verify our controller exists
    it('should be defined', function() {
        expect(homeCtrl).toBeDefined();

    });
});