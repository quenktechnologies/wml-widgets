"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/tab-bar");
var TabBarPage = /** @class */ (function () {
    function TabBarPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.tab = 'First';
        this.content = document.createTextNode('First Tab');
        this.clicked = function (_a) {
            var name = _a.name;
            _this.tab = name;
            _this.content = document.createTextNode(name + " Tab");
            _this.view.invalidate();
        };
    }
    return TabBarPage;
}());
exports.TabBarPage = TabBarPage;
exports.default = new TabBarPage();
//# sourceMappingURL=index.js.map