"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelFooter = exports.PanelBody = exports.PanelHeader = exports.Panel = exports.PANEL_FOOTER = exports.PANEL_BODY = exports.PANEL_HEADER = exports.PANEL = void 0;
const style = require("../../content/style");
const views = require("./wml/panel");
const util_1 = require("../../util");
const __1 = require("..");
///classNames:begin
/**
 * PANEL wrapper class.
 */
exports.PANEL = 'ww-panel';
/**
 * PANEL_HEADER class name.
 */
exports.PANEL_HEADER = 'ww-panel__header';
/**
 * PANEL_BODY class name.
 */
exports.PANEL_BODY = 'ww-panel__body';
/**
 * PANEL_FOOTER class name.
 */
exports.PANEL_FOOTER = 'ww-panel__footer';
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 */
class Panel extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.Panel(this);
        /**
         * values
         */
        this.values = {
            /**
             * root values.
             */
            content: {
                id: this.attrs.ww && this.attrs.ww.id,
                wml: {
                    id: 'panel',
                },
                className: util_1.concat(exports.PANEL, __1.LAYOUT, (this.attrs.ww && this.attrs.ww.style) ?
                    `-${this.attrs.ww.style}` : style.DEFAULT, this.attrs.ww && this.attrs.ww.className ?
                    this.attrs.ww.className : '')
            }
        };
    }
}
exports.Panel = Panel;
/**
 * PanelHeader
 */
class PanelHeader extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.PanelHeader(this);
        /**
         * values
         */
        this.values = {
            content: {
                wml: {
                    id: 'header'
                },
                id: this.attrs.ww && this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_HEADER, __1.LAYOUT, this.attrs.ww && this.attrs.ww.className ?
                    this.attrs.ww.className : '')
            }
        };
    }
}
exports.PanelHeader = PanelHeader;
/**
 * PanelBody
 */
class PanelBody extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.PanelBody(this);
        /**
         * values
         */
        this.values = {
            content: {
                wml: {
                    id: 'body'
                },
                id: this.attrs.ww && this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_BODY, __1.LAYOUT, this.attrs.ww && this.attrs.ww.className ?
                    this.attrs.ww.className : '')
            }
        };
    }
}
exports.PanelBody = PanelBody;
/**
 * PanelFooter
 */
class PanelFooter extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.PanelFooter(this);
        /**
         * values
         */
        this.values = {
            content: {
                wml: {
                    id: 'footer'
                },
                id: this.attrs.ww && this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_FOOTER, __1.LAYOUT, this.attrs.ww && this.attrs.ww.className ?
                    this.attrs.ww.className : '')
            }
        };
    }
}
exports.PanelFooter = PanelFooter;
//# sourceMappingURL=index.js.map