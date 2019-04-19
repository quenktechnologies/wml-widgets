"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var description_list_1 = require("./wml/description-list");
var DescriptionListPage = /** @class */ (function () {
    function DescriptionListPage() {
        this.view = new description_list_1.Main(this);
    }
    return DescriptionListPage;
}());
exports.DescriptionListPage = DescriptionListPage;
exports.default = new DescriptionListPage();
//# sourceMappingURL=index.js.map