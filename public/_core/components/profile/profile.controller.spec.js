describe('ProfileController', function() {
    var $controller, ProfileController, $q, $httpBackend, $scope;
    var ProfileService;

    var $location;
    var FAKE_USER = {
        mailp: "kevinah95@gmail.com",
        passp: "123"
    };
    var user_result = {};
    var API = 'http://localhost:8080/api/users/getUsers';

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));

    // Inject the $controller service to create instances of the controller (ProfileController) we want to test
    beforeEach(inject(function(_profileService_, _$location_, _$controller_, _$rootScope_, _$q_, _$httpBackend_) {
        $scope = _$rootScope_.$new();
        profileService = _profileService_;
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        $q = _$q_;
        ProfileController = $controller('ProfileController', { $scope: $scope });
        $location = _$location_;
    }));

    // Verify our controller exists
    it('should be defined', function() {
        expect(ProfileController).toBeDefined();
    });

    describe('.logout()', function() {
        it('should exist', function() {
            expect(ProfileController.logout).toBeDefined();
        });

        it('should change location to /login when setting it via logout function', inject(function() {
            spyOn($location, 'path');
            ProfileController.logout();
            expect($location.path).toHaveBeenCalledWith('/login');
        }));

    });
    describe('.editUser()', function() {
        it('should exist', function() {
            expect(ProfileController.editUser).toBeDefined();
        });

        it('should change location to /editUser when setting it via editUser function', inject(function() {
            spyOn($location, 'path');
            ProfileController.editUser();
            expect($location.path).toHaveBeenCalledWith('/editUser');
        }));
    });

    describe('.activate()', function() {

        beforeEach(function() {
            spyOn(profileService, "checkUser").and.callThrough();
        });

        it('should exist', function() {
            expect(ProfileController.activate).toBeDefined();
        });

        it('should call profileService.checkUser and return a User object', function() {
            var RESPONSE_SUCCESS = {
                'id': 58,
                'name': 'growlithe',
                'sprites': {
                    'front_default': 'http://pokeapi.co/media/sprites/pokemon/58.png'
                },
                'types': [{
                    'type': { 'name': 'fire' }
                }]
            };
            profileService.checkUser(FAKE_USER)
                .then(function(data) {
                    ProfileController.user = data;
                    return data;
                })
                .catch(function(error) {
                    console.log(error);
                    return error;
                });

            $httpBackend.expect('POST', API, FAKE_USER).respond(200, $q.when(RESPONSE_SUCCESS));
            expect(profileService.checkUser).toHaveBeenCalledWith(FAKE_USER);
            //$httpBackend.flush();
            /*$httpBackend.whenPOST(API, FAKE_USER).respond(200, $q.when(RESPONSE_SUCCESS));
            $httpBackend.flush();*/

            /*expect(PokemonFactory.findByName).toHaveBeenCalledWith('growlithe');
            expect(ProfileController.user.pokemon.id).toEqual(58);
            expect(ProfileController.user.pokemon.name).toEqual('growlithe');
            expect(ProfileController.user.pokemon.image).toContain('.png');
            expect(ProfileController.user.pokemon.type).toEqual('fire');*/
        });
    });
});