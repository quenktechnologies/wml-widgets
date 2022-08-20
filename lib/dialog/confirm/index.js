"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Confirm = exports.Primary = exports.CONFIRM_YES = exports.CONFIRM_NO = exports.CONFIRM = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const prompt_1 = require("../prompt");
const confirm_1 = require("./wml/confirm");
///classNames:begin
exports.CONFIRM = 'ww-confirm';
exports.CONFIRM_NO = 'ww-confirm__no';
exports.CONFIRM_YES = 'ww-prompt__yes';
///classNames:end
/**
 * Primary indicates whether the yes or no button should be highlighted.
 */
var Primary;
(function (Primary) {
    Primary["No"] = "no";
    Primary["Yes"] = "yes";
})(Primary = exports.Primary || (exports.Primary = {}));
/**
 * Confirm displays a dialog for confirming an action.
 */
class Confirm extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new confirm_1.Main(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.CONFIRM, __1.getClassName(this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (this.attrs.ww && this.attrs.ww.title) ?
                    this.attrs.ww.title : ''
            },
            footer: {
                no: {
                    text: (this.attrs.ww && this.attrs.ww.noText) ?
                        this.attrs.ww.noText : 'No',
                    className: util_1.concat(exports.CONFIRM_NO, (this.attrs.ww &&
                        this.attrs.ww.primary &&
                        this.attrs.ww.primary === Primary.No) ? '-primary' : ''),
                    onClick: () => {
                        if (this.attrs.ww && this.attrs.ww.onNo)
                            this.attrs.ww.onNo();
                        this.close();
                    }
                },
                yes: {
                    text: (this.attrs.ww && this.attrs.ww.yesText) ?
                        this.attrs.ww.yesText : 'Yes',
                    wml: {
                        id: 'yes'
                    },
                    className: util_1.concat(exports.CONFIRM_YES, (this.attrs.ww &&
                        this.attrs.ww.primary &&
                        this.attrs.ww.primary === Primary.No) ? '' : '-primary'),
                    onClick: () => {
                        if (this.attrs.ww && this.attrs.ww.onYes)
                            this.attrs.ww.onYes();
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
exports.Confirm = Confirm;
//# sourceMappingURL=index.js.map