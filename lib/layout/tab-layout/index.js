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
var views = require("./wml/tab-layout");
var Maybe_1 = require("afpl/lib/monad/Maybe");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var _1 = require("../");
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
        _this.setContent = function (c) {
            _this.values.content = views.content(c);
            _this.view.invalidate();
            return _this;
        };
        _this.removeContent = function () {
            _this.values.content = views.empty;
            _this.view.invalidate();
            return _this;
        };
        _this.values = {
            root: {
                class: util_1.concat(exports.TAB_LAYOUT, _1.LAYOUT)
            },
            tab: (_this.attrs.ww && _this.attrs.ww.active) || Object.keys(_this.attrs.ww.tabs)[0],
            tabs: _this.attrs.ww.tabs,
            content: Maybe_1.Maybe
                .fromAny(_this.attrs.ww.tabs[_this.attrs.ww.active])
                .orElse(function () { return Maybe_1.Maybe.fromAny(_this.attrs.ww.tabs[Object.keys(_this.attrs.ww.tabs)[0]]); })
                .map(function (ts) { return ts.contentTemplate; })
                .get(),
            onClick: function (e) {
                Maybe_1.Maybe
                    .fromBoolean(_this.values.tab !== e.name)
                    .map(function () { _this.values.tab = e.name; })
                    .chain(function () {
                    return Maybe_1.Maybe
                        .fromAny(_this.attrs.ww.tabs[e.name])
                        .map(function (ts) {
                        _this.values.content = ts.contentTemplate;
                    })
                        .map(function () { _this.view.invalidate(); })
                        .orJust(function () { console.error("TabLayout: unknown tab '" + e.name + "'!"); });
                });
            }
        };
        return _this;
    }
    return TabLayout;
}(wml_1.Component));
exports.TabLayout = TabLayout;
//# sourceMappingURL=index.js.map