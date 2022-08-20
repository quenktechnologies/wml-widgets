"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = exports.EMBED = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const embed_1 = require("./wml/embed");
///classNames:begin
exports.EMBED = 'ww-embed';
/**
 * Embed
 */
class Embed extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new embed_1.Main(this);
        this.values = {
            wml: {
                id: 'embed'
            },
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.EMBED, __1.getClassName(this.attrs)),
        };
    }
}
exports.Embed = Embed;
//# sourceMappingURL=index.js.map