"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadSurface = exports.FILE_UPLOAD_SURFACE_TEXT = exports.FILE_UPLOAD_SURFACE_INPUT = exports.FILE_UPLOAD_SURFACE = exports.INSTRUCTION_TEXT = exports.FileChangedEvent = void 0;
const util_1 = require("../../util");
const file_input_1 = require("../file-input");
Object.defineProperty(exports, "FileChangedEvent", { enumerable: true, get: function () { return file_input_1.FileChangedEvent; } });
const __1 = require("../../");
const __2 = require("../");
const file_upload_surface_1 = require("./wml/file-upload-surface");
exports.INSTRUCTION_TEXT = 'Choose a file';
///classNames:begin
exports.FILE_UPLOAD_SURFACE = 'ww-file-upload-surface';
exports.FILE_UPLOAD_SURFACE_INPUT = 'ww-file-upload-surface__input';
exports.FILE_UPLOAD_SURFACE_TEXT = 'ww-file-upload-surface__text';
/**
 * FileUploadSurface provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
class FileUploadSurface extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new file_upload_surface_1.FileUploadSurfaceView(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.FILE_UPLOAD_SURFACE, (0, __1.getClassName)(this.attrs)),
            stop: (e) => {
                e.stopPropagation();
                e.preventDefault();
            },
            drop: (e) => {
                e.stopPropagation();
                e.preventDefault();
                let name = (this.attrs && this.attrs.name) ?
                    this.attrs.name : '';
                if (e.dataTransfer && e.dataTransfer.files.length > 0)
                    this.values.input.onChange(new file_input_1.FileChangedEvent(name, (0, file_input_1.list2Array)(e.dataTransfer.files)));
            },
            input: {
                className: exports.FILE_UPLOAD_SURFACE_INPUT,
                name: (0, __2.getName)(this.attrs),
                accept: (this.attrs && this.attrs.accept) ?
                    this.attrs.accept : '',
                multiple: (this.attrs && this.attrs.multiple) ?
                    this.attrs.multiple : undefined,
                onChange: (e) => {
                    this.values.text.value = e.value[0].name;
                    if (this.attrs && this.attrs.onChange)
                        this.attrs.onChange(e);
                    this.view.invalidate();
                }
            },
            text: {
                className: exports.FILE_UPLOAD_SURFACE_TEXT,
                value: (this.attrs && this.attrs.text) ?
                    this.attrs.text : exports.INSTRUCTION_TEXT
            }
        };
    }
}
exports.FileUploadSurface = FileUploadSurface;
//# sourceMappingURL=index.js.map