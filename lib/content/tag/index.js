"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.TAG = exports.Style = void 0;
const dom_1 = require("@quenk/wml/lib/dom");
const wml_1 = require("@quenk/wml");
const style_1 = require("../../content/style");
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return style_1.Style; } });
const util_1 = require("../../util");
const __1 = require("../../");
const tag_1 = require("./wml/tag");
///classNames:begin
exports.TAG = 'ww-tag';
/**
 * Tag
 */
class Tag extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new tag_1.Main(this);
        this.values = {
            wml: {
                id: 'tag'
            },
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.TAG, __1.getClassName(this.attrs), (this.attrs.ww && this.attrs.ww.style) ?
                style_1.getStyleClassName(this.attrs.ww.style) :
                style_1.DEFAULT),
            onclick: (_) => {
                if (this.attrs.ww && this.attrs.ww.onClick)
                    this.attrs.ww.onClick();
            },
            content: (this.attrs.ww && this.attrs.ww.text) ?
                [dom_1.text(this.attrs.ww.text)] : this.children
        };
    }
}
exports.Tag = Tag;
//# sourceMappingURL=index.js.map