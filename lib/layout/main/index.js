"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayout = exports.MAIN_LAYOUT = void 0;
const views = require("./wml/main");
const util_1 = require("../../util");
const __1 = require("../");
///classNames:begin
exports.MAIN_LAYOUT = 'ww-main-layout';
/**
 * MainLayout provides a container for the main content of an application.
 */
class MainLayout extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            content: {
                wml: {
                    id: 'main'
                },
                id: (this.attrs && this.attrs.ww) ? this.attrs.ww.id : '',
                className: util_1.concat(exports.MAIN_LAYOUT, __1.LAYOUT, (this.attrs && this.attrs.ww) ?
                    this.attrs.ww.className : '')
            }
        };
    }
}
exports.MainLayout = MainLayout;
//# sourceMappingURL=index.js.map