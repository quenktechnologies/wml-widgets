"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedPage = void 0;
const views = require("./wml/embed");
class EmbedPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            jojo: 'https://www.youtube.com/embed/1bbr5tMuSnc',
            win: 'https://www.youtube.com/embed/itgSyPxfqoE',
            max: 'https://www.youtube.com/embed/9rrzQSbk9hI',
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; ' +
                'picture-in-picture'
        };
    }
}
exports.EmbedPage = EmbedPage;
exports.default = new EmbedPage();
//# sourceMappingURL=index.js.map