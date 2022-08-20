"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Help = exports.HELP = void 0;
const document = require("@quenk/wml/lib/dom");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const feedback_1 = require("../feedback");
const __1 = require("../../");
const help_1 = require("./wml/help");
///classNames:begin
exports.HELP = 'ww-help';
/**
 * Help
 */
class Help extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new help_1.Main(this);
        this.values = {
            help: {
                wml: {
                    id: 'help'
                },
                id: (this.attrs.ww && this.attrs.ww.id) ?
                    this.attrs.ww.id : '',
                className: util_1.concat(exports.HELP, __1.getClassName(this.attrs)),
                text: (this.attrs.ww && this.attrs.ww.text) ?
                    [document.createTextNode(this.attrs.ww.text)] : this.children
            }
        };
    }
    setMessage(msg) {
        feedback_1.setMessage(this.view, this.values.help.wml.id, msg);
        return this;
    }
    removeMessage() {
        feedback_1.removeMessage(this.view, this.values.help.wml.id);
        return this;
    }
}
exports.Help = Help;
//# sourceMappingURL=index.js.map