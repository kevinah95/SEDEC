describe('EditUserController', function() {
    var $controller, EditUserController, scope, vm;
    var location;

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));

    // Inject the $controller service to create instances of the controller (EditUserController) we want to test
    beforeEach(inject(function(_$location_, _$controller_, _$rootScope_) {
        scope = _$rootScope_.$new();
        $controller = _$controller_;
        EditUserController = $controller('EditUserController', { $scope: scope, vm: vm });
        location = _$location_;
    }));

    // Verify our controller exists
    it('should be defined', function() {
        expect(EditUserController).toBeDefined();
    });

    describe('.cancelEdit()', function() {
        it('should exist', function() {
            expect(EditUserController.cancelEdit).toBeDefined();
        });

        it('should change location to /profile when setting it via cancelEdit function', inject(function() {
            spyOn(location, 'path');
            EditUserController.cancelEdit();
            expect(location.path).toHaveBeenCalledWith('/profile');
        }));

    });

    describe('.closeModal()', function() {
        it('should exist', function() {
            expect(EditUserController.closeModal).toBeDefined();
        });

        /*it('should exist modal', function() {
            //expect(EditUserController.modal).toBeDefined();
            //expect(element(by.id('myModal')).isPresent()).toBe(true);
        });*/

        /*it('should change modal.style.display object to none if it exists', inject(function() {
            //modal.style.display = "none";
            expect(EditUserController.modal.style.display).expect('none');
        }));*/

    });
});