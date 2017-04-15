describe('A Suite or a Spec', function() {
    var controller, scope, vm;
    var location;

    beforeEach(angular.mock.module('sedecApp'));
    beforeEach(inject(function(_$location_, _$controller_, _$rootScope_) {
        scope = _$rootScope_.$new();
        controller = _$controller_('EditUserController', { $scope: scope, vm: vm });
        location = _$location_;
    }));
    it('describe it', function() {
        expect(controller).toBeDefined();
    });

    // Inject the $controller service to create instances of the controller (EditUserController) we want to test


    // Verify our controller exists
    it('should be defined', function() {
        expect(controller).toBeDefined();
    });

})