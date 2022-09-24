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
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.INFORM, (0, __1.getClassName)(this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (this.attrs && this.attrs.title) ?
                    this.attrs.title : ''
            },
            footer: {
                ok: {
                    text: (this.attrs && this.attrs.buttonText) ?
                        this.attrs.buttonText : 'Ok',
                    wml: {
                        id: 'ok'
                    },
                    className: (0, util_1.concat)(exports.INFORM_OK, '-primary'),
                    onClick: () => {
                        if (this.attrs && this.attrs.onClose)
                            this.attrs.onClose();
                        this.close();
                    }
                }
            }
        };
    }
    close() {
        (0, prompt_1.close)(this.view, this.values.wml.id);
        return this;
    }
}
exports.Inform = Inform;
//# sourceMappingURL=index.js.map