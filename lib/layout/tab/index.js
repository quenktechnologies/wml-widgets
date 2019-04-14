"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/tab");
var wml_1 = require("@quenk/wml");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
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
var TabLayout = /** @class */ (function (_super) {
    __extends(TabLayout, _super);
    function TabLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.TAB_LAYOUT, __2.LAYOUT, __1.getClassName(_this.attrs)),
                content: function () {
                    if ((_this.attrs.ww && _this.attrs.ww.active)) {
                        var maybeActive = maybe_1.fromNullable(_this.values.tabs.data[_this.attrs.ww.active]);
                        if (maybeActive.isJust())
                            return maybeActive
                                .get()
                                .contentFun(_this)(_this.view);
                    }
                    return _this.children;
                }
            },
            tabs: {
                current: (_this.attrs.ww && _this.attrs.ww.active) ?
                    _this.attrs.ww.active : '',
                data: (_this.attrs.ww && _this.attrs.ww.tabs) ?
                    _this.attrs.ww.tabs : {},
                content: function (t) {
                    if (t.tabFun)
                        return t.tabFun(_this)(_this.view);
                    if (t.text)
                        return [__1.text(t.text)];
                    return [];
                },
                onClick: function (e) {
                    if (_this.values.tabs.current !== e.name)
                        _this.values.tabs.current = e.name;
                    var tab = maybe_1.fromNullable(_this.values.tabs.data[e.name]).get();
                    _this.values.root.content = function () {
                        return tab.contentFun(_this)(_this.view);
                    };
                    _this.view.invalidate();
                }
            }
        };
        return _this;
    }
    TabLayout.prototype.setContent = function (c) {
        this.values.root.content = function () { return c; };
        this.view.invalidate();
        return this;
    };
    TabLayout.prototype.removeContent = function () {
        this.values.root.content = function () { return []; };
        this.view.invalidate();
        return this;
    };
    return TabLayout;
}(wml_1.Component));
exports.TabLayout = TabLayout;
//# sourceMappingURL=index.js.map