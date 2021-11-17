"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_size_pipe_1 = require("./file-size.pipe");
describe('FileSizePipe', function () {
    it('create an instance', function () {
        var pipe = new file_size_pipe_1.FileSizePipe();
        expect(pipe).toBeTruthy();
    });
});
