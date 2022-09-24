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
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.CONFIRM, (0, __1.getClassName)(this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (this.attrs && this.attrs.title) ?
                    this.attrs.title : ''
            },
            footer: {
                no: {
                    text: (this.attrs && this.attrs.noText) ?
                        this.attrs.noText : 'No',
                    className: (0, util_1.concat)(exports.CONFIRM_NO, (this.attrs &&
                        this.attrs.primary &&
                        this.attrs.primary === Primary.No) ? '-primary' : ''),
                    onClick: () => {
                        if (this.attrs && this.attrs.onNo)
                            this.attrs.onNo();
                        this.close();
                    }
                },
                yes: {
                    text: (this.attrs && this.attrs.yesText) ?
                        this.attrs.yesText : 'Yes',
                    wml: {
                        id: 'yes'
                    },
                    className: (0, util_1.concat)(exports.CONFIRM_YES, (this.attrs &&
                        this.attrs.primary &&
                        this.attrs.primary === Primary.No) ? '' : '-primary'),
                    onClick: () => {
                        if (this.attrs && this.attrs.onYes)
                            this.attrs.onYes();
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
exports.Confirm = Confirm;
//# sourceMappingURL=index.js.map