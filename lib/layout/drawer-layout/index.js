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
var wml_1 = require("@quenk/wml");
var drawer_layout_1 = require("./wml/drawer-layout");
///classNames:begin
/**
 * DRAWER_LAYOUT
 */
exports.DRAWER_LAYOUT = 'ww-drawer-layout';
///classNames:end
var drawer = function (l) { return function (f) {
    return l
        .view
        .findById(l.values.drawer.id)
        .map(function (e) { return e; })
        .map(f)
        .map(function () { return l; })
        .orJust(function () { return l; })
        .get();
}; };
;
/**
 * DrawerLayout provides a 1 column application layout with a drawer that can
 * be shown or hidden upon requests.
 *
 * The drawer takes up most of the screen on mobile and about roughly 1/6 - 1/8 on
 * a desktop (not fact checked yet).
 *
 *  Mobile:
 *  +------------------------------------------------------------------------------+
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |   <drawer>                                 |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  |                                            |                                 |
 *  +------------------------------------------------------------------------------+
 *
 *  Desktop:
 *  +------------------------------------------------------------------------------+
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |   <drawer>  |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  |             |                                                                |
 *  +------------------------------------------------------------------------------+
 *
 */
var DrawerLayout = /** @class */ (function (_super) {
    __extends(DrawerLayout, _super);
    function DrawerLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_layout_1.Main(_this);
        _this.isHidden = function () {
            return _this
                .view
                .findById(_this.values.drawer.id)
                .map(function (d) { return d.isHidden(); })
                .orJust(function () { return false; })
                .get();
        };
        _this.hide = function () { return drawer(_this)(function (d) { return d.hide(); }); };
        _this.show = function () { return drawer(_this)(function (d) { return d.show(); }); };
        _this.toggle = function () { return drawer(_this)(function (d) { return d.toggle(); }); };
        _this.setContent = function (c) {
            _this.values.content.render = function () { return [c]; };
            return _this;
        };
        _this.removeContent = function () {
            _this.values.content.render = function () { return []; };
            return _this;
        };
        /**
         * values is a hash of values used in the template.
         */
        _this.values = {
            root: {
                class: exports.DRAWER_LAYOUT,
            },
            drawer: {
                id: 'drawer',
                content: (_this.attrs.ww && _this.attrs.ww.drawer) ? _this.attrs.ww.drawer : null
            },
            content: {
                id: 'content',
                render: function () { return _this.children; }
            }
        };
        return _this;
    }
    return DrawerLayout;
}(wml_1.Component));
exports.DrawerLayout = DrawerLayout;
//# sourceMappingURL=index.js.map