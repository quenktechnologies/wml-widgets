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
                id: (this.attrs && this.attrs.id) ?
                    this.attrs.id : '',
                className: (0, util_1.concat)(exports.HELP, (0, __1.getClassName)(this.attrs)),
                text: (this.attrs && this.attrs.text) ?
                    [document.createTextNode(this.attrs.text)] : this.children
            }
        };
    }
    setMessage(msg) {
        (0, feedback_1.setMessage)(this.view, this.values.help.wml.id, msg);
        return this;
    }
    removeMessage() {
        (0, feedback_1.removeMessage)(this.view, this.values.help.wml.id);
        return this;
    }
}
exports.Help = Help;
//# sourceMappingURL=index.js.map