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
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.FILE_INPUT, __1.getClassName(this.attrs)),
            name: __2.getName(this.attrs),
            accept: (this.attrs.ww && this.attrs.ww.accept) ?
                this.attrs.ww.accept : '',
            multiple: (this.attrs.ww && this.attrs.ww.multiple) ?
                this.attrs.ww.multiple : undefined,
            change: (e) => {
                let input = e.target;
                if ((input.files != null) &&
                    (input.files.length > 0) &&
                    this.attrs.ww &&
                    this.attrs.ww.onChange) {
                    this.attrs.ww.onChange(new FileChangedEvent(input.name, exports.list2Array(input.files)));
                }
            }
        };
    }
}
exports.FileInput = FileInput;
/**
 * list2Array converts a FileList into a plain array of files.
 */
exports.list2Array = (list) => {
    let ret = [];
    for (let i = 0; i < list.length; i++)
        ret[i] = list[i];
    return ret;
};
//# sourceMappingURL=index.js.map