"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/text-field");
var Page_1 = require("../Page");
var TextFieldPage = /** @class */ (function (_super) {
    __extends(TextFieldPage, _super);
    function TextFieldPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'text';
        _this.view = new views.Main(_this);
        _this.onChange = function (_a) {
            var value = _a.value;
            (value === 'error') ?
                _this.get(_this.id, function (c) {
                    return c.error('This control is now in the error state!');
                }) :
                (value === 'success') ?
                    _this.get(_this.id, function (c) {
                        return c.success('This control is now in the success state!');
                    }) :
                    (value === 'warning') ?
                        _this.get(_this.id, function (c) {
                            return c.warning('This control now in the warning state!');
                        }) :
                        (value === 'neutral') ?
                            _this.get(_this.id, function (c) {
                                return c.neutral();
                            }) :
                            _this
                                .view
                                .findById('content')
                                .map(function (e) {
                                while (e.lastChild)
                                    e.removeChild(e.lastChild);
                                e.appendChild(document.createTextNode(value));
                            });
        };
        return _this;
    }
    return TextFieldPage;
}(Page_1.Page));
exports.TextFieldPage = TextFieldPage;
//# sourceMappingURL=index.js.map