"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.IMAGE = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const orientation_1 = require("../../content/orientation");
const __1 = require("../../");
const image_1 = require("./wml/image");
///classNames:begin
exports.IMAGE = 'ww-image';
/**
 * Image
 */
class Image extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new image_1.Main(this);
        this.values = {
            wml: {
                id: 'image'
            },
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.IMAGE, (0, __1.getClassName)(this.attrs), (this.attrs && this.attrs.block) ?
                orientation_1.BLOCK : ''),
            src: (this.attrs && this.attrs.src) ? this.attrs.src : '',
            alt: (this.attrs && this.attrs.alt) ? this.attrs.alt : '',
        };
    }
}
exports.Image = Image;
//# sourceMappingURL=index.js.map