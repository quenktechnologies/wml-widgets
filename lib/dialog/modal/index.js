"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalFooter = exports.ModalBody = exports.ModalHeader = exports.Modal = exports.MODAL_FOOTER = exports.MODAL_BODY = exports.MODAL_HEADER = exports.MODAL_CONTENT = exports.MODAL_POSITION = exports.MODAL = void 0;
var views = require("./wml/modal");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var layout_1 = require("../../layout");
///classNames:begin
exports.MODAL = 'ww-modal';
exports.MODAL_POSITION = 'ww-modal__position';
exports.MODAL_CONTENT = 'ww-modal__content';
exports.MODAL_HEADER = 'ww-modal__header';
exports.MODAL_BODY = 'ww-modal__body';
exports.MODAL_FOOTER = 'ww-modal__footer';
/**
 * Modal
 */
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Modal(_this);
        _this.values = {
            wml: {
                id: 'root'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.MODAL, __1.getClassName(_this.attrs)),
            content: {
                className: exports.MODAL_CONTENT
            },
            position: {
                className: exports.MODAL_POSITION
            }
        };
        return _this;
    }
    /**
     * close the modal.
     */
    Modal.prototype.close = function () {
        var mO = util_1.getById(this.view, this.values.wml.id);
        if (mO.isJust()) {
            var n = mO.get();
            if (n.parentNode)
                n.parentNode.removeChild(n);
        }
    };
    return Modal;
}(wml_1.Component));
exports.Modal = Modal;
/**
 * ModalHeader
 */
var ModalHeader = /** @class */ (function (_super) {
    __extends(ModalHeader, _super);
    function ModalHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.ModalHeader(_this);
        _this.values = {
            wml: {
                id: 'root'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.MODAL_HEADER, __1.getClassName(_this.attrs)),
            content: { wml: { id: 'root' } }
        };
        return _this;
    }
    return ModalHeader;
}(layout_1.AbstractLayout));
exports.ModalHeader = ModalHeader;
/**
 * ModalBodyAttrs
 */
var ModalBody = /** @class */ (function (_super) {
    __extends(ModalBody, _super);
    function ModalBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.ModalBody(_this);
        _this.values = {
            wml: {
                id: 'root'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.MODAL_BODY, __1.getClassName(_this.attrs)),
            content: { wml: { id: 'root' } }
        };
        return _this;
    }
    return ModalBody;
}(layout_1.AbstractLayout));
exports.ModalBody = ModalBody;
/**
 * ModalFooter
 */
var ModalFooter = /** @class */ (function (_super) {
    __extends(ModalFooter, _super);
    function ModalFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.ModalFooter(_this);
        _this.values = {
            wml: {
                id: 'root'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.MODAL_FOOTER, __1.getClassName(_this.attrs)),
            content: { wml: { id: 'root' } }
        };
        return _this;
    }
    return ModalFooter;
}(wml_1.Component));
exports.ModalFooter = ModalFooter;
//# sourceMappingURL=index.js.map