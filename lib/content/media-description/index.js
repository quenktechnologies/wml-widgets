"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = exports.Media = exports.MediaDescription = exports.MEDIA_DESCRIPTION_DESCRIPTION = exports.MEDIA_DESCRIPTION_MEDIA = exports.MEDIA_DESCRIPTION = void 0;
const views = require("./wml/media-description");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.MEDIA_DESCRIPTION = 'ww-media-description';
exports.MEDIA_DESCRIPTION_MEDIA = 'ww-media-description__media';
exports.MEDIA_DESCRIPTION_DESCRIPTION = 'ww-media-description__description';
/**
 * MediaDescription
 */
class MediaDescription extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.MediaDescription(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.MEDIA_DESCRIPTION, __1.getClassName(this.attrs))
        };
    }
}
exports.MediaDescription = MediaDescription;
/**
 * Media
 */
class Media extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Media(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.MEDIA_DESCRIPTION_MEDIA, __1.getClassName(this.attrs))
        };
    }
}
exports.Media = Media;
/**
 * Description
 */
class Description extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Description(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.MEDIA_DESCRIPTION_DESCRIPTION, __1.getClassName(this.attrs))
        };
    }
}
exports.Description = Description;
//# sourceMappingURL=index.js.map