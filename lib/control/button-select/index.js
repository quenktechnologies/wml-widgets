"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiButtonSelect = exports.ButtonSelect = exports.MultiButtonSection = exports.ButtonSection = exports.ButtonSelectValues = exports.ButtonChangedEvent = exports.BUTTON_SELECT_OPTION = exports.BUTTON_SELECT = void 0;
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const button_select_1 = require("./wml/button-select");
///className:begin
exports.BUTTON_SELECT = 'ww-button-select';
exports.BUTTON_SELECT_OPTION = 'ww-button-select__option';
/**
 * ButtonChangedEvent
 */
class ButtonChangedEvent extends __2.Event {
}
exports.ButtonChangedEvent = ButtonChangedEvent;
/**
 * @private
 */
class ButtonSelectValues {
    constructor(ref, button) {
        this.ref = ref;
        this.button = button;
        this.id = __1.getId(this.ref.attrs);
        this.className = util_1.concat(exports.BUTTON_SELECT, __1.getClassName(this.ref.attrs));
    }
}
exports.ButtonSelectValues = ButtonSelectValues;
/**
 * @private
 */
class ButtonSection {
    constructor(ref, onClick) {
        this.ref = ref;
        this.onClick = onClick;
        this.current = getCurrent(this.ref.attrs);
        this.selected = [];
        this.options = (this.ref.attrs.ww && this.ref.attrs.ww.options) ?
            this.ref.attrs.ww.options : [];
        this.isActive = (n) => this.ref.values.button.current === n;
        this.getClassNames = (n) => util_1.concat(exports.BUTTON_SELECT_OPTION, this.ref.values.button.options[n].className);
    }
}
exports.ButtonSection = ButtonSection;
/**
 * @private
 */
class MultiButtonSection extends ButtonSection {
    constructor(ref, onClick) {
        super(ref, onClick);
        this.ref = ref;
        this.onClick = onClick;
        this.selected = getSelected(this.ref);
        this.isActive = (n) => this.ref.values.button.selected.indexOf(n) > -1;
    }
}
exports.MultiButtonSection = MultiButtonSection;
/**
 * ButtonSelect
 */
class ButtonSelect extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new button_select_1.ButtonSelectView(this);
        this.values = new ButtonSelectValues(this, new ButtonSection(this, (idx) => {
            this.values.button.current = idx;
            if ((this.attrs.ww && this.attrs.ww.onChange))
                this.attrs.ww.onChange(new ButtonChangedEvent(this.attrs.ww.name, this.values.button.options[idx].value));
            this.view.invalidate();
        }));
    }
}
exports.ButtonSelect = ButtonSelect;
/**
 * MultiButtonSelect
 */
class MultiButtonSelect extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new button_select_1.ButtonSelectView(this);
        this.values = new ButtonSelectValues(this, new MultiButtonSection(this, (n) => {
            let selected = this.values.button.selected;
            let pos = selected.indexOf(n);
            if (pos > -1)
                selected.splice(pos, 1);
            else
                selected.push(n);
            if (this.attrs.ww && this.attrs.ww.onChange)
                this.attrs.ww.onChange(new ButtonChangedEvent(this.attrs.ww.name, selected.map(n => this.values.button.options[n].value)));
            this.view.invalidate();
        }));
    }
}
exports.MultiButtonSelect = MultiButtonSelect;
const getCurrent = (attrs) => {
    if ((attrs.ww != null) &&
        (attrs.ww.value != null) &&
        (attrs.ww.options != null)) {
        return attrs.ww.options.reduce((p, c, k) => c.value ===
            attrs.ww.value ? k : p, -1);
    }
    return -1;
};
const getSelected = (that) => {
    if (that.attrs &&
        that.attrs.ww &&
        that.attrs.ww.value &&
        that.attrs.ww.options) {
        let { value, options } = that.attrs.ww;
        return value.map(v => options.reduce((p, c, i) => (p > -1) ? p : (c.value === v) ? i : p, -1));
    }
    else {
        return [];
    }
};
//# sourceMappingURL=index.js.map