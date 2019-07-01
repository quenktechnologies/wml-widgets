"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
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
            input: {
                className: exports.FILE_UPLOAD_SURFACE_INPUT,
                name: __2.getName(_this.attrs),
                accept: (_this.attrs.ww && _this.attrs.ww.accept) ?
                    _this.attrs.ww.accept : '',
                onChange: function (e) {
                    _this.values.text.value = e.value.name;
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(e);
                    console.error('invalids');
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