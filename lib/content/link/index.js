"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.LinkClickedEvent = exports.LINK = void 0;
const wml = require("@quenk/wml");
const document = require("@quenk/wml/lib/dom");
const views = require("./views");
const util_1 = require("../../util");
const active_1 = require("../state/active");
const disabled_1 = require("../state/disabled");
///classNames:begin
/**
 * LINK
 */
exports.LINK = 'ww-link';
/**
 * LinkClickedEvent indicates an Link has been clicked.
 */
class LinkClickedEvent {
    constructor(name, href) {
        this.name = name;
        this.href = href;
    }
}
exports.LinkClickedEvent = LinkClickedEvent;
/**
 * Link generates an <a> element.
 */
class Link extends wml.Component {
    constructor() {
        super(...arguments);
        this.view = (this.attrs.ww && this.attrs.ww.disabled) ?
            new views.DisabledLinkView(this) :
            new views.LinkView(this);
        /**
         * name assigned to this Link.
         */
        this.name = (this.attrs.ww && this.attrs.ww.name) ?
            this.attrs.ww.name : '';
        /**
         * title assigned to this Link.
         */
        this.title = (this.attrs.ww && this.attrs.ww.title) ?
            this.attrs.ww.title : '';
        /**
         * href assigned to this Link
         */
        this.href = (this.attrs.ww && this.attrs.ww.href) ?
            this.attrs.ww.href : '';
        this.values = {
            id: (this.attrs.ww && this.attrs.ww.id) ?
                this.attrs.ww.id : '',
            disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                this.attrs.ww.disabled : null,
            className: util_1.concat(exports.LINK, (this.attrs.ww && this.attrs.ww.className) ?
                this.attrs.ww.className : '', (this.attrs.ww && this.attrs.ww.active) ?
                active_1.ACTIVE : '', (this.attrs.ww && this.attrs.ww.disabled) ?
                disabled_1.DISABLED : '', (this.attrs.ww && this.attrs.ww.disabled) ?
                `-ww-disabled` : ''),
            title: (this.attrs.ww && this.attrs.ww.title) ?
                this.attrs.ww.title : null,
            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : null,
            href: (this.attrs.ww && this.attrs.ww.href) ?
                this.attrs.ww.href : '#',
            active: (this.attrs.ww && this.attrs.ww.active) ?
                this.attrs.ww.active : false,
            //TODO: move to dom lib
            content: (this.attrs.ww && this.attrs.ww.text) ?
                [document.createTextNode(this.attrs.ww.text)] :
                this.children,
            clicked: (e) => {
                if (this.attrs.ww && !this.attrs.ww.disabled) {
                    let { name, href, onClick } = this.attrs.ww;
                    if (!href)
                        e.preventDefault();
                    if (onClick)
                        onClick(new LinkClickedEvent(name, href));
                }
            }
        };
    }
    /**
      * activate this nav list Item.
      */
    activate() {
        let m = util_1.getById(this.view, this.values.id);
        if (m.isJust()) {
            let e = m.get();
            e.classList.remove(active_1.ACTIVE);
            e.classList.add(active_1.ACTIVE);
        }
        return this;
    }
    /**
     * deactivate this nav list item.
     */
    deactivate() {
        let m = util_1.getById(this.view, this.values.id);
        if (m.isJust())
            m.get().classList.remove(active_1.ACTIVE);
        return this;
    }
}
exports.Link = Link;
//# sourceMappingURL=index.js.map