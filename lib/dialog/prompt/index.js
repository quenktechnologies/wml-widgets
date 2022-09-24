"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.Prompt = exports.PROMPT_SAVE = exports.PROMPT_CLOSE = exports.PROMPT = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const prompt_1 = require("./wml/prompt");
///classNames:begin
exports.PROMPT = 'ww-prompt';
exports.PROMPT_CLOSE = 'ww-prompt__close';
exports.PROMPT_SAVE = 'ww-prompt__save';
/**
 * Prompt displays a dialog to the user suitable for collecting data
 * input.
 */
class Prompt extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new prompt_1.Main(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.PROMPT, (0, __1.getClassName)(this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (this.attrs && this.attrs.title) ?
                    this.attrs.title : ''
            },
            footer: {
                close: {
                    text: (this.attrs && this.attrs.closeText) ?
                        this.attrs.closeText : 'Close',
                    className: exports.PROMPT_CLOSE,
                    onClick: () => {
                        if (this.attrs && this.attrs.onCancel)
                            this.attrs.onCancel();
                        this.close();
                    }
                },
                save: {
                    text: (this.attrs && this.attrs.saveText) ?
                        this.attrs.saveText : 'Save',
                    wml: {
                        id: 'save'
                    },
                    className: (0, util_1.concat)('-primary', exports.PROMPT_SAVE),
                    disabled: (this.attrs && this.attrs.disabled) ?
                        true : false,
                    onClick: () => {
                        if (this.attrs && this.attrs.onSave)
                            this.attrs.onSave();
                        this.close();
                    }
                }
            }
        };
    }
    close() {
        (0, exports.close)(this.view, this.values.wml.id);
        return this;
    }
    /**
     * enable saving.
     */
    enable() {
        getSave(this).map(b => b.enable());
        return this;
    }
    /**
     * disable saving.
     */
    disable() {
        getSave(this).map(b => b.disable());
        return this;
    }
}
exports.Prompt = Prompt;
const getSave = (p) => (0, util_1.getById)(p.view, p.values.footer.save.wml.id);
/**
 * close the Modal in a view.
 */
const close = (view, id) => (0, util_1.getById)(view, id).map(m => m.close());
exports.close = close;
//# sourceMappingURL=index.js.map