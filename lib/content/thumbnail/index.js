"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caption = exports.Thumbnail = exports.THUMBNAIL_CAPTION = exports.THUMBNAIL = void 0;
const views = require("./wml/thumbnail");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.THUMBNAIL = 'ww-thumbnail';
exports.THUMBNAIL_CAPTION = 'ww-thumbnail__caption';
/**
 * Thumbnail
 */
class Thumbnail extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = (this.attrs && this.attrs.href) ?
            new views.Anchor(this) : new views.Thumbnail(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.THUMBNAIL, (0, __1.getClassName)(this.attrs)),
            href: (this.attrs && this.attrs.href) ?
                this.attrs.href : '',
            onclick: (e) => {
                if (this.attrs && this.attrs.onClick) {
                    e.preventDefault();
                    this.attrs.onClick();
                }
            }
        };
    }
}
exports.Thumbnail = Thumbnail;
/**
 * Caption
 */
class Caption extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Caption(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.THUMBNAIL_CAPTION, (0, __1.getClassName)(this.attrs))
        };
    }
}
exports.Caption = Caption;
//# sourceMappingURL=index.js.map