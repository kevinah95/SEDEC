describe('resultsService', function() {
    var resultsService, $q, $httpBackend;
    var API = 'http://localhost:8080/api/results/getResults';

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    //beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));

    beforeEach(inject(function(_$q_, _$httpBackend_, _resultsService_) {
        $q = _$q_;
        resultsService = _resultsService_;
        $httpBackend = _$httpBackend_;
    }));

    it('should be defined', function() {
        expect(resultsService).toBeDefined();
    });
    describe('.getResults()', function() {
        it('should exist', function() {
            expect(resultsService.getResults).toBeDefined();
        });

        it('should have true returned for proper sendPost', function() {

            var post = { id: 1 };
            $httpBackend.when('POST', API,
                function(postData) {
                    jsonData = JSON.parse(postData);
                    expect(jsonData.id).toBe(post.id);
                    console.log(jsonData)
                    return true;
                }
            ).respond(200, { status: "success" });

            resultsService.getResults(post).then(function(d) {
                console.log("=======");
                expect(d).toBeTruthy();
            });

            //$httpBackend.flush();
        });

        /*it('should return a hard-coded list of users', function() {
            expect(Users.all()).toEqual(userList);
        });*/
    });
});