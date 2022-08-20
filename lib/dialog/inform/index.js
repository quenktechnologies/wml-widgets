"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inform = exports.INFORM_OK = exports.INFORM = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const prompt_1 = require("../prompt");
const inform_1 = require("./wml/inform");
///classNames:begin
exports.INFORM = 'ww-inform';
exports.INFORM_OK = 'ww-inform__ok';
/**
 * Inform displays a message to the user.
 */
class Inform extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new inform_1.Main(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.INFORM, __1.getClassName(this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (this.attrs.ww && this.attrs.ww.title) ?
                    this.attrs.ww.title : ''
            },
            footer: {
                ok: {
                    text: (this.attrs.ww && this.attrs.ww.buttonText) ?
                        this.attrs.ww.buttonText : 'Ok',
                    wml: {
                        id: 'ok'
                    },
                    className: util_1.concat(exports.INFORM_OK, '-primary'),
                    onClick: () => {
                        if (this.attrs.ww && this.attrs.ww.onClose)
                            this.attrs.ww.onClose();
                        this.close();
                    }
                }
            }
        };
    }
    close() {
        prompt_1.close(this.view, this.values.wml.id);
        return this;
    }
}
exports.Inform = Inform;
//# sourceMappingURL=index.js.map