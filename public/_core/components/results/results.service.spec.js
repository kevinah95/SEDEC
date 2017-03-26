describe('resultsService', function() {
    var resultsService, $q, $httpBackend;

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
});