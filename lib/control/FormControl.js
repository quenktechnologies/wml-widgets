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
var Control_1 = require("./Control");
var DefaultDelegate_1 = require("./DefaultDelegate");
var INPUT_SUCCESS = 'has-success';
var INPUT_ERROR = 'has-error';
var INPUT_WARNING = 'has-warning';
var FormControl = /** @class */ (function (_super) {
    __extends(FormControl, _super);
    function FormControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delegate = _this.attrs.ww.delegate ?
            _this.attrs.ww.delegate : new DefaultDelegate_1.DefaultDelegate(_this.attrs.ww);
        return _this;
    }
    /**
     * isFilled
     */
    //   abstract isFilled(): boolean;
    /**
     * clear
     */
    // abstract clear(): FormControl<V, A>;
    /**
     * isRequired tells if the Input was required.
     * @deprecated
     */
    FormControl.prototype.isRequired = function () {
        return (this.attrs.ww.required);
    };
    /**
     * hasClass queries whether a class exists on the root element on not.
     */
    FormControl.prototype.hasClass = function (cls) {
        return this
            .view
            .findById(this.values.root.id)
            .cata(function () { return false; }, (function (e) {
            return e.className.split(' ').indexOf(cls) === -1;
        }));
    };
    FormControl.prototype.hasError = function () {
        return this.hasClass(INPUT_ERROR);
    };
    FormControl.prototype.hasWarning = function () {
        return this.hasClass(INPUT_WARNING);
    };
    FormControl.prototype.hasSuccess = function () {
        return this.hasClass(INPUT_SUCCESS);
    };
    /**
     * setHelpText sets the message for the message portion of
     * this input.
     */
    FormControl.prototype.setHelpText = function (msg) {
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
    FormControl.prototype.setState = function (state) {
        var _this = this;
        return this
            .view
            .findById(this.values.root.id)
            .map(function (e) { return e.classList.add(state); })
            .cata(function () { return _this; }, function () { return _this; });
    };
    /**
     * removeState removes the state validation state from the input.
     */
    FormControl.prototype.removeState = function () {
        var _this = this;
        return this
            .view
            .findById(this.values.root.id)
            .map(function (h) {
            h.classList.remove(INPUT_SUCCESS);
            h.classList.remove(INPUT_ERROR);
            h.classList.remove(INPUT_WARNING);
        })
            .cata(function () { return _this; }, function () { return _this; });
    };
    /**
     * state
     */
    FormControl.prototype.state = function () {
        return this.attrs.ww.success ?
            'has-success' :
            this.attrs.ww.error ?
                'has-error' :
                this.attrs.ww.warning ?
                    'has-warning' :
                    '';
    };
    /**
     * setSuccess
     */
    FormControl.prototype.setSuccess = function (message) {
        return this
            .removeState()
            .setHelpText(message)
            .setState(INPUT_SUCCESS);
    };
    /**
     * setError
     */
    FormControl.prototype.setError = function (message) {
        return this
            .removeState()
            .setHelpText(message)
            .setState(INPUT_ERROR);
    };
    /**
     * setWarning
     */
    FormControl.prototype.setWarning = function (message) {
        return this
            .removeState()
            .setHelpText(message)
            .setState(INPUT_WARNING);
    };
    /**
     * reset
     */
    FormControl.prototype.reset = function () {
        var _this = this;
        return this
            .view
            .findById(this.values.help.id)
            .map(function (m) {
            _this.removeState();
            while (m.firstChild)
                m.removeChild(m.firstChild);
            //  this.clear();
        })
            .cata(function () { return _this; }, function () { return _this; });
    };
    /**
     * rendered checks if the input should have a validation state set
     */
    FormControl.prototype.rendered = function () {
        var _a = this.attrs.ww, success = _a.success, error = _a.error, warning = _a.warning;
        if (success)
            this.setSuccess((typeof success === 'string') ? success : '');
        else if (error)
            this.setError((typeof error === 'string') ? error : '');
        else if (warning)
            this.setWarning((typeof warning === 'string') ? warning : '');
    };
    return FormControl;
}(Control_1.Control));
exports.FormControl = FormControl;
//# sourceMappingURL=FormControl.js.map