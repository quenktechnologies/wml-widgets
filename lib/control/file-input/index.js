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
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
var file_input_1 = require("./wml/file-input");
///classNames:begin
exports.FILE_INPUT = 'ww-file-input';
/**
 * FileChangedEvent is fired when
 */
var FileChangedEvent = /** @class */ (function (_super) {
    __extends(FileChangedEvent, _super);
    function FileChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FileChangedEvent;
}(__2.Event));
exports.FileChangedEvent = FileChangedEvent;
/**
 * FileInput provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
var FileInput = /** @class */ (function (_super) {
    __extends(FileInput, _super);
    function FileInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new file_input_1.FileInputView(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.FILE_INPUT, __1.getClassName(_this.attrs)),
            name: __2.getName(_this.attrs),
            accept: (_this.attrs.ww && _this.attrs.ww.accept) ?
                _this.attrs.ww.accept : '',
            change: function (e) {
                var input = e.target;
                if ((input.files != null) &&
                    (input.files.length > 0) &&
                    _this.attrs.ww &&
                    _this.attrs.ww.onChange) {
                    _this.attrs.ww.onChange(new FileChangedEvent(input.name, input.files[0]));
                }
            }
        };
        return _this;
    }
    return FileInput;
}(__2.AbstractControl));
exports.FileInput = FileInput;
//# sourceMappingURL=index.js.map