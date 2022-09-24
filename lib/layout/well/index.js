"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Well = exports.WELL = void 0;
const util_1 = require("../../util");
const __1 = require("..");
const well_1 = require("./wml/well");
///classNames:begin
exports.WELL = 'ww-well';
/**
 * Well provides a rectangular container for visually seperating
 * content by context.
 */
class Well extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new well_1.WellView(this);
        this.values = {
            /**
             * root values.
             */
            content: {
                id: this.attrs && this.attrs.id,
                wml: {
                    id: 'well',
                },
                className: (0, util_1.concat)(exports.WELL, __1.LAYOUT, this.attrs && this.attrs.className ?
                    this.attrs.className : '')
            }
        };
    }
}
exports.Well = Well;
//# sourceMappingURL=index.js.map