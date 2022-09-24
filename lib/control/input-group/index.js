"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOn = exports.InputGroup = exports.INPUT_GROUP_BUTTON_ADDON = exports.INPUT_GROUP_ADDON = exports.INPUT_GROUP = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const input_group_1 = require("./wml/input-group");
///classNames:begin
exports.INPUT_GROUP = 'ww-input-group';
exports.INPUT_GROUP_ADDON = 'ww-input-group__addon';
exports.INPUT_GROUP_BUTTON_ADDON = 'ww-input-group__button-addon';
/**
 * InputGroup allows an input to be wrapped together with other controls to
 * appear as one.
 *
 * This is useful for creating inputs that may have related fields that should
 * be modified when changed. For example, entering an amount and currency in the
 * same place.
 *
 *  +--------------------------------+
 *  | TTD ^ | 5000.00                |
 *  +--------------------------------+
 */
class InputGroup extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new input_group_1.InputGroupView(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.INPUT_GROUP, (0, __1.getClassName)(this.attrs)),
        };
    }
}
exports.InputGroup = InputGroup;
/**
 * AddOn is used to attach the extra text or control to the input.
 */
class AddOn extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new input_group_1.AddOnView(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(this.attrs.button ?
                exports.INPUT_GROUP_BUTTON_ADDON :
                exports.INPUT_GROUP_ADDON, (0, __1.getClassName)(this.attrs)),
        };
    }
}
exports.AddOn = AddOn;
//# sourceMappingURL=index.js.map