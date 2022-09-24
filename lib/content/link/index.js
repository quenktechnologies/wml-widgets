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
        this.view = (this.attrs && this.attrs.disabled) ?
            new views.DisabledLinkView(this) :
            new views.LinkView(this);
        /**
         * name assigned to this Link.
         */
        this.name = (this.attrs && this.attrs.name) ?
            this.attrs.name : '';
        /**
         * title assigned to this Link.
         */
        this.title = (this.attrs && this.attrs.title) ?
            this.attrs.title : '';
        /**
         * href assigned to this Link
         */
        this.href = (this.attrs && this.attrs.href) ?
            this.attrs.href : '';
        this.values = {
            id: (this.attrs && this.attrs.id) ?
                this.attrs.id : '',
            disabled: (this.attrs && this.attrs.disabled) ?
                this.attrs.disabled : null,
            className: (0, util_1.concat)(exports.LINK, (this.attrs && this.attrs.className) ?
                this.attrs.className : '', (this.attrs && this.attrs.active) ?
                active_1.ACTIVE : '', (this.attrs && this.attrs.disabled) ?
                disabled_1.DISABLED : '', (this.attrs && this.attrs.disabled) ?
                `-ww-disabled` : ''),
            title: (this.attrs && this.attrs.title) ?
                this.attrs.title : null,
            name: (this.attrs && this.attrs.name) ?
                this.attrs.name : null,
            href: (this.attrs && this.attrs.href) ?
                this.attrs.href : '#',
            active: (this.attrs && this.attrs.active) ?
                this.attrs.active : false,
            //TODO: move to dom lib
            content: (this.attrs && this.attrs.text) ?
                [document.createTextNode(this.attrs.text)] :
                this.children,
            clicked: (e) => {
                if (this.attrs && !this.attrs.disabled) {
                    let { name, href, onClick } = this.attrs;
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
        let m = (0, util_1.getById)(this.view, this.values.id);
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
        let m = (0, util_1.getById)(this.view, this.values.id);
        if (m.isJust())
            m.get().classList.remove(active_1.ACTIVE);
        return this;
    }
}
exports.Link = Link;
//# sourceMappingURL=index.js.map