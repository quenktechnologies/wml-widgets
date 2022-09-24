"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalFooter = exports.ModalBody = exports.ModalHeader = exports.Modal = exports.MODAL_FOOTER = exports.MODAL_BODY = exports.MODAL_HEADER = exports.MODAL_CONTENT = exports.MODAL_POSITION = exports.MODAL = void 0;
const views = require("./wml/modal");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const layout_1 = require("../../layout");
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
class Modal extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Modal(this);
        this.values = {
            wml: {
                id: 'root'
            },
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.MODAL, (0, __1.getClassName)(this.attrs)),
            content: {
                className: exports.MODAL_CONTENT
            },
            position: {
                className: exports.MODAL_POSITION
            }
        };
    }
    /**
     * close the modal.
     */
    close() {
        let mO = (0, util_1.getById)(this.view, this.values.wml.id);
        if (mO.isJust()) {
            let n = mO.get();
            if (n.parentNode)
                n.parentNode.removeChild(n);
        }
    }
}
exports.Modal = Modal;
/**
 * ModalHeader
 */
class ModalHeader extends layout_1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.ModalHeader(this);
        this.values = {
            wml: {
                id: 'root'
            },
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.MODAL_HEADER, (0, __1.getClassName)(this.attrs)),
            content: { wml: { id: 'root' } }
        };
    }
}
exports.ModalHeader = ModalHeader;
/**
 * ModalBodyAttrs
 */
class ModalBody extends layout_1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.ModalBody(this);
        this.values = {
            wml: {
                id: 'root'
            },
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.MODAL_BODY, (0, __1.getClassName)(this.attrs)),
            content: { wml: { id: 'root' } }
        };
    }
}
exports.ModalBody = ModalBody;
/**
 * ModalFooter
 */
class ModalFooter extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.ModalFooter(this);
        this.values = {
            wml: {
                id: 'root'
            },
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.MODAL_FOOTER, (0, __1.getClassName)(this.attrs)),
            content: { wml: { id: 'root' } }
        };
    }
}
exports.ModalFooter = ModalFooter;
//# sourceMappingURL=index.js.map