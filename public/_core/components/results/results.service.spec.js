describe('resultsService', function() {
    var resultsService, $q, $httpBackend, $timeout;
    var API = 'http://localhost:8080/api/results/getResults';
    var sample_result = {};
    var EXPECTED_RESULT = {
        analysisId: 1,
        notificationDatetime: "2017-03-19T20:16:00.000Z",
        processName: "Sigatoka negra",
        resultMessage: "Minimizar su propagación en el plantío eliminando brotes de inoculo a través del deshoje de hojas afectadas por Sigatoka y mejor aun quemándolas.",
        sampleDescription: "Puntos cafés rojizos. Los puntos se alargan y forman estrías café rojizas. La estría se alarga ligeramente y hay un cambio de color de café rojizo a café oscuro o casi negro.",
        samplePicture: "samplePicture.png"
    }
    var FAKE_SAMPLE = {
        id: 1
    };

    // Load ngRoute and our components.home module which we'll create next
    //beforeEach(angular.mock.module('sedecApp', ['ngRoute', 'angularCSS', 'flow']));
    //beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('sedecApp'));

    beforeEach(inject(function(_$q_, _$httpBackend_, _resultsService_, _$timeout_) {
        $q = _$q_;
        resultsService = _resultsService_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
    }));

    it('should be defined', function() {
        expect(resultsService).toBeDefined();
    });
    describe('.getResults()', function() {
        it('should exist', function() {
            expect(resultsService.getResults).toBeDefined();
        });

        it('should set sample_result toEqual EXPECTED_RESULT when getResults()', function() {
            $httpBackend.expectPOST('/api/results/getResults').respond(function(method, url, data, headers) {
                //console.log('Received these data:', method, url, data, headers);
                //console.log(angular.mock.dump(data));
                sample_result = EXPECTED_RESULT;
                return [200, {}, {}];
            });
            resultsService.getResults(FAKE_SAMPLE);

            $timeout(function() {
                expect(sample_result).toEqual(EXPECTED_RESULT);
            }, 1000);



            $httpBackend.flush();
            $timeout.flush();
        });

        /*it('should return a hard-coded list of users', function() {
            expect(Users.all()).toEqual(userList);
        });*/
    });
});