"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list2Array = exports.FileInput = exports.FileChangedEvent = exports.FILE_INPUT = void 0;
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const file_input_1 = require("./wml/file-input");
///classNames:begin
exports.FILE_INPUT = 'ww-file-input';
/**
 * FileChangedEvent is fired when
 */
class FileChangedEvent extends __2.Event {
}
exports.FileChangedEvent = FileChangedEvent;
/**
 * FileInput provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
class FileInput extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new file_input_1.FileInputView(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.FILE_INPUT, (0, __1.getClassName)(this.attrs)),
            name: (0, __2.getName)(this.attrs),
            accept: (this.attrs && this.attrs.accept) ?
                this.attrs.accept : '',
            multiple: (this.attrs && this.attrs.multiple) ?
                this.attrs.multiple : undefined,
            change: (e) => {
                let input = e.target;
                if ((input.files != null) &&
                    (input.files.length > 0) &&
                    this.attrs &&
                    this.attrs.onChange) {
                    this.attrs.onChange(new FileChangedEvent(input.name, (0, exports.list2Array)(input.files)));
                }
            }
        };
    }
}
exports.FileInput = FileInput;
/**
 * list2Array converts a FileList into a plain array of files.
 */
const list2Array = (list) => {
    let ret = [];
    for (let i = 0; i < list.length; i++)
        ret[i] = list[i];
    return ret;
};
exports.list2Array = list2Array;
//# sourceMappingURL=index.js.map