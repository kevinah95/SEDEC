describe('profileService', function() {
    var profileService, $q, $httpBackend, $scope, ProfileController, $provide, $timeout;
    var API = '/api/users/getUsers'; //'http://localhost:8080/api/users/getUsers';
    var FAKE_USER = {
        mailp: "kevinah95@gmail.com",
        passp: "123"
    };
    var user_result = {};
    var EXPECTED_RESULT = {
        userId: 1,
        organizationId: 1,
        userMail: "kevinah95@gmail.com",
        userName: "Kevin Hernandez",
        userProfilePicture: "profile.png"
    }

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    //beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));
    beforeEach(angular.mock.module('ngMockE2E'));

    // Inject the $controller service to create instances of the controller (ProfileController) we want to test
    beforeEach(inject(function(_profileService_, _$location_, _$controller_, _$rootScope_, _$q_, _$httpBackend_, _$timeout_) {
        $scope = _$rootScope_.$new();
        profileService = _profileService_;
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        $q = _$q_;
        $timeout = _$timeout_;
        ProfileController = $controller('ProfileController', { $scope: $scope });
        $location = _$location_;
    }));



    it('should be defined', function() {
        expect(profileService).toBeDefined();
    });


    describe('.checkUser()', function() {
        it('should set user_result toEqual EXPECTED_RESULT when checkUser()', function() {
            $httpBackend.expectPOST('/api/users/getUsers').respond(function(method, url, data, headers) {
                //console.log('Received these data:', method, url, data, headers);
                //console.log(angular.mock.dump(data));
                user_result = EXPECTED_RESULT;
                return [200, {}, {}];
            });
            profileService.checkUser(FAKE_USER);

            $timeout(function() {
                expect(user_result).toEqual(EXPECTED_RESULT);
            }, 1000);


            $httpBackend.flush();
            $timeout.flush();
        });

    });
});