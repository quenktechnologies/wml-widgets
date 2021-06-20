"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagPage = void 0;
var views = require("./wml/tag");
var style_1 = require("../../../../../lib/content/style");
var getStyles = function () { return [
    style_1.Style.Default,
    style_1.Style.Primary,
    style_1.Style.Success,
    style_1.Style.Info,
    style_1.Style.Warning,
    style_1.Style.Error
]; };
var TagPage = /** @class */ (function () {
    function TagPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            capitalize: function (s) { return "" + s[0].toUpperCase() + s.slice(1); },
            styles: getStyles(),
            onDismiss: function (e) {
                var idx = _this.values.styles.indexOf(e.name);
                if (idx > -1)
                    _this.values.styles.splice(idx, 1);
                if (_this.values.styles.length === 0)
                    _this.values.styles = getStyles();
                _this.view.invalidate();
            }
        };
    }
    return TagPage;
}());
exports.TagPage = TagPage;
exports.default = new TagPage();
//# sourceMappingURL=index.js.map