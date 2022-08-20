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
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.PROMPT, __1.getClassName(this.attrs)),
            wml: {
                id: 'modal'
            },
            header: {
                title: (this.attrs.ww && this.attrs.ww.title) ?
                    this.attrs.ww.title : ''
            },
            footer: {
                close: {
                    text: (this.attrs.ww && this.attrs.ww.closeText) ?
                        this.attrs.ww.closeText : 'Close',
                    className: exports.PROMPT_CLOSE,
                    onClick: () => {
                        if (this.attrs.ww && this.attrs.ww.onCancel)
                            this.attrs.ww.onCancel();
                        this.close();
                    }
                },
                save: {
                    text: (this.attrs.ww && this.attrs.ww.saveText) ?
                        this.attrs.ww.saveText : 'Save',
                    wml: {
                        id: 'save'
                    },
                    className: util_1.concat('-primary', exports.PROMPT_SAVE),
                    disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                        true : false,
                    onClick: () => {
                        if (this.attrs.ww && this.attrs.ww.onSave)
                            this.attrs.ww.onSave();
                        this.close();
                    }
                }
            }
        };
    }
    close() {
        exports.close(this.view, this.values.wml.id);
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
const getSave = (p) => util_1.getById(p.view, p.values.footer.save.wml.id);
/**
 * close the Modal in a view.
 */
exports.close = (view, id) => util_1.getById(view, id).map(m => m.close());
//# sourceMappingURL=index.js.map