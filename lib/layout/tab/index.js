"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabLayout = exports.TAB_LAYOUT = void 0;
const views = require("./wml/tab");
const wml_1 = require("@quenk/wml");
const dom_1 = require("@quenk/wml/lib/dom");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
///classNames:begin
exports.TAB_LAYOUT = 'ww-tab-layout';
/**
 * TabLayout provides a layout whose displayed content can be changed via tabs.
 *
 * ----------------------------------------------------------------------------
 * |                                                                          |
 * | Tab1  |  Tab2  | Tab2                                                    |
 * |                                                                          |
 * ----------------------------------------------------------------------------
 * |                                                                          |
 * |                                                                          |
 * |                             <Content>                                    |
 * |                                                                          |
 * |                                                                          |
 * |                                                                          |
 * |                                                                          |
 * |__________________________________________________________________________|
 */
class TabLayout extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.TAB_LAYOUT, __2.LAYOUT, (0, __1.getClassName)(this.attrs)),
                content: () => {
                    if ((this.attrs && this.attrs.active)) {
                        let maybeActive = (0, maybe_1.fromNullable)(this.values.tabs.data[this.attrs.active]);
                        if (maybeActive.isJust())
                            return maybeActive
                                .get()
                                .contentFun(this)(this.view);
                    }
                    return this.children;
                }
            },
            tabs: {
                current: (this.attrs && this.attrs.active) ?
                    this.attrs.active : '',
                data: (this.attrs && this.attrs.tabs) ?
                    this.attrs.tabs : {},
                content: (t) => {
                    if (t.tabFun)
                        return t.tabFun(this)(this.view);
                    if (t.text)
                        return [(0, dom_1.text)(t.text)];
                    return [];
                },
                onClick: (e) => {
                    if (this.values.tabs.current !== e.name)
                        this.values.tabs.current = e.name;
                    let tab = (0, maybe_1.fromNullable)(this.values.tabs.data[e.name]).get();
                    this.values.root.content = () => tab.contentFun(this)(this.view);
                    this.view.invalidate();
                }
            }
        };
    }
    setContent(c) {
        this.values.root.content = () => c;
        this.view.invalidate();
        return this;
    }
    removeContent() {
        this.values.root.content = () => [];
        this.view.invalidate();
        return this;
    }
}
exports.TabLayout = TabLayout;
//# sourceMappingURL=index.js.map