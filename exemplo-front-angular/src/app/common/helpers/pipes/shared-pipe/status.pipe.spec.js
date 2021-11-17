"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status_pipe_1 = require("./status.pipe");
describe('StatusPipe', function () {
    it('create an instance', function () {
        var pipe = new status_pipe_1.StatusPipe();
        expect(pipe).toBeTruthy();
    });
});
