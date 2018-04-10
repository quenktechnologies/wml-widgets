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
var wml = require("@quenk/wml");
var views = require("./wml/tab-layout");
var Maybe_1 = require("afpl/lib/monad/Maybe");
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
                class: exports.TAB_LAYOUT
            },
            tab: _this.attrs.ww.active || Object.keys(_this.attrs.ww.tabs)[0],
            tabs: _this.attrs.ww.tabs,
            content: Maybe_1.Maybe
                .fromAny(_this.attrs.ww.tabs[_this.attrs.ww.active])
                .orElse(function () { return Maybe_1.Maybe.fromAny(_this.attrs.ww.tabs[Object.keys(_this.attrs.ww.tabs)[0]]); })
                .map(function (ts) { return ts.view; })
                .map(function (view) { return view.render(); })
                .get(),
            onClick: function (e) {
                Maybe_1.Maybe
                    .fromBoolean(_this.values.tab !== e.name)
                    .map(function () { _this.values.tab = e.name; })
                    .chain(function () {
                    return Maybe_1.Maybe
                        .fromAny(_this.attrs.ww.tabs[e.name])
                        .map(function (ts) { _this.values.content = ts.view.render(); })
                        .map(function () { _this.view.invalidate(); })
                        .orJust(function () { console.error("TabLayout: unknown tab '" + e.name + "'!"); });
                });
            }
        };
        return _this;
    }
    return TabLayout;
}(wml.Component));
exports.TabLayout = TabLayout;
//# sourceMappingURL=index.js.map