"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptPage = void 0;
var views = require("./wml/prompt");
var PromptPage = /** @class */ (function () {
    function PromptPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            value: 'Click the button bellow to change this text.',
            title: 'Change the text',
            onChange: function (e) { return _this.values.value = e.value; },
            onSave: function () {
                _this.view.invalidate();
            },
            onCancel: function () {
            },
            open: function () {
                document.body.appendChild(_this.v.render());
            },
            close: function () {
                _this.v.findById('open')
                    .map(function (m) { return m.close(); });
            }
        };
    }
    return PromptPage;
}());
exports.PromptPage = PromptPage;
exports.default = new PromptPage();
//# sourceMappingURL=index.js.map