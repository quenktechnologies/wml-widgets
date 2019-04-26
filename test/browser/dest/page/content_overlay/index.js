"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/overlay");
var OverlayPage = /** @class */ (function () {
    function OverlayPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            onClick: function () {
                var mO = _this.view.findById('overlay');
                if (mO.isJust())
                    mO.get().close();
            }
        };
    }
    return OverlayPage;
}());
exports.OverlayPage = OverlayPage;
exports.default = new OverlayPage();
//# sourceMappingURL=index.js.map