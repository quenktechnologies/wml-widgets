"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadSurface = exports.FILE_UPLOAD_SURFACE_TEXT = exports.FILE_UPLOAD_SURFACE_INPUT = exports.FILE_UPLOAD_SURFACE = exports.INSTRUCTION_TEXT = exports.FileChangedEvent = void 0;
var util_1 = require("../../util");
var file_input_1 = require("../file-input");
Object.defineProperty(exports, "FileChangedEvent", { enumerable: true, get: function () { return file_input_1.FileChangedEvent; } });
var __1 = require("../../");
var __2 = require("../");
var file_upload_surface_1 = require("./wml/file-upload-surface");
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
var FileUploadSurface = /** @class */ (function (_super) {
    __extends(FileUploadSurface, _super);
    function FileUploadSurface() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new file_upload_surface_1.FileUploadSurfaceView(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.FILE_UPLOAD_SURFACE, __1.getClassName(_this.attrs)),
            stop: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            drop: function (e) {
                e.stopPropagation();
                e.preventDefault();
                var name = (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : '';
                if (e.dataTransfer && e.dataTransfer.files.length > 0)
                    _this.values.input.onChange(new file_input_1.FileChangedEvent(name, file_input_1.list2Array(e.dataTransfer.files)));
            },
            input: {
                className: exports.FILE_UPLOAD_SURFACE_INPUT,
                name: __2.getName(_this.attrs),
                accept: (_this.attrs.ww && _this.attrs.ww.accept) ?
                    _this.attrs.ww.accept : '',
                multiple: (_this.attrs.ww && _this.attrs.ww.multiple) ?
                    _this.attrs.ww.multiple : undefined,
                onChange: function (e) {
                    _this.values.text.value = e.value[0].name;
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(e);
                    _this.view.invalidate();
                }
            },
            text: {
                className: exports.FILE_UPLOAD_SURFACE_TEXT,
                value: (_this.attrs.ww && _this.attrs.ww.text) ?
                    _this.attrs.ww.text : exports.INSTRUCTION_TEXT
            }
        };
        return _this;
    }
    return FileUploadSurface;
}(__2.AbstractControl));
exports.FileUploadSurface = FileUploadSurface;
//# sourceMappingURL=index.js.map