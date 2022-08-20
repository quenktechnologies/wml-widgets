"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionListPage = void 0;
const description_list_1 = require("./wml/description-list");
class DescriptionListPage {
    constructor() {
        this.view = new description_list_1.Main(this);
    }
}
exports.DescriptionListPage = DescriptionListPage;
exports.default = new DescriptionListPage();
//# sourceMappingURL=index.js.map