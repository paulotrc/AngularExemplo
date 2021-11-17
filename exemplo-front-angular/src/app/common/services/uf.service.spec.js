"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var uf_service_1 = require("./uf.service");
describe('UfService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(uf_service_1.UfService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
