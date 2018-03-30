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
var views = require("./wml/group");
var util_1 = require("../../common/util");
/**
 * Group is a generic container for child content.
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: 'group',
                class: util_1.concat(_this.attrs.ww && _this.attrs.ww.class) ? _this.attrs.ww.class : '',
                content: (_this.attrs.ww && _this.attrs.ww.content) ? _this.attrs.ww.content : _this.children
            }
        };
        return _this;
    }
    /**
     * setContent changes the content displayed.
     */
    Group.prototype.setContent = function (content) {
        this
            .view
            .findById(this.values.root.id)
            .map(function (e) {
            while (e.lastChild)
                e.removeChild(e.lastChild);
            e.appendChild(content);
        });
        return this;
    };
    return Group;
}(wml.Component));
exports.Group = Group;
//# sourceMappingURL=Group.js.map