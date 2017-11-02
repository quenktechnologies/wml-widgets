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
var views = require("./wml/modal");
var names = require("@package/self/common/names");
var util_1 = require("@package/self/common/util");
var Group_1 = require("@package/self/content/Group");
/**
 * Modal
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Modal(_this);
        _this.values = {
            id: {
                root: 'root',
                content: 'content'
            },
            class: {
                root: util_1.concat(names.MODAL, _this.attrs.ww ? _this.attrs.ww.class : ''),
                content: names.MODAL_CONTENT,
                dialog: names.MODAL_DIALOG
            }
        };
        return _this;
    }
    /**
     * close the modal.
     */
    Modal.prototype.close = function () {
        this
            .view
            .findById('modal')
            .map(function (n) { return n.parentNode.removeChild(n); });
    };
    return Modal;
}(Group_1.Group));
exports.Modal = Modal;
/**
 * Header
 */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Header(_this);
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: names.MODAL_HEADER
            }
        };
        return _this;
    }
    return Header;
}(wml.Component));
exports.Header = Header;
/**
 * Body
 */
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: names.MODAL_BODY
            }
        };
        return _this;
    }
    return Body;
}(Group_1.Group));
exports.Body = Body;
/**
 * Footer
 */
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: names.MODAL_FOOTER
            }
        };
        return _this;
    }
    return Footer;
}(Group_1.Group));
exports.Footer = Footer;
//# sourceMappingURL=index.js.map