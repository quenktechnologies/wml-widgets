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
var wml = require("@quenk/wml");
var names = require("@package/wml-widgets/common/names");
var _1 = require(".");
/**
 * FeedbackControlWidget is a minimal implementation of FeedbackControl
 */
var FeedbackControlWidget = /** @class */ (function (_super) {
    __extends(FeedbackControlWidget, _super);
    function FeedbackControlWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * setState helper for changing the state of the displayed DOM.
     */
    FeedbackControlWidget.prototype.setState = function (state) {
        var _this = this;
        return this
            .view
            .findById(this.values.root.id)
            .map(function (e) { return e.classList.add(state); })
            .cata(function () { return _this; }, function () { return _this; });
    };
    FeedbackControlWidget.prototype.hasError = function () {
        return _1.hasClass(names.ERROR, this.values.root.id, this.view);
    };
    FeedbackControlWidget.prototype.hasWarning = function () {
        return _1.hasClass(names.WARNING, this.values.root.id, this.view);
    };
    FeedbackControlWidget.prototype.hasSuccess = function () {
        return _1.hasClass(names.SUCCESS, this.values.root.id, this.view);
    };
    FeedbackControlWidget.prototype.setMessage = function (msg) {
        var _this = this;
        return this
            .view
            .findById(this.values.help.id)
            .map(function (message) {
            var node = document.createTextNode(msg);
            if (message.firstChild) {
                message.replaceChild(node, message.firstChild);
            }
            else {
                message.appendChild(node);
            }
        })
            .cata(function () { return _this; }, function () { return _this; });
    };
    FeedbackControlWidget.prototype.clear = function () {
        var _this = this;
        return this
            .view
            .findById(this.values.root.id)
            .map(function (h) {
            h.classList.remove(names.SUCCESS);
            h.classList.remove(names.ERROR);
            h.classList.remove(names.WARNING);
        })
            .cata(function () { return _this; }, function () { return _this; });
    };
    FeedbackControlWidget.prototype.setSuccess = function (message) {
        return this
            .clear()
            .setMessage(message)
            .setState(names.SUCCESS);
    };
    /**
     * setError
     */
    FeedbackControlWidget.prototype.setError = function (message) {
        return this
            .clear()
            .setMessage(message)
            .setState(names.ERROR);
    };
    /**
     * setWarning
     */
    FeedbackControlWidget.prototype.setWarning = function (message) {
        return this
            .clear()
            .setMessage(message)
            .setState(names.WARNING);
    };
    return FeedbackControlWidget;
}(wml.Component));
exports.FeedbackControlWidget = FeedbackControlWidget;
//# sourceMappingURL=FeedbackControlWidget.js.map