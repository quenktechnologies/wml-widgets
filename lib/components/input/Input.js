'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultInputDelegate = exports.Adapter = exports.InputDelegate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INPUT_SUCCESS = 'has-success';
var INPUT_ERROR = 'has-error';
var INPUT_WARNING = 'has-warning';
var noop = function noop() {};

/**
 * InputDelegate is an interface inputs can delegate all their events to.
 * Currently only supports the 'oninput' event handler.
 */

var InputDelegate = exports.InputDelegate = function () {
    function InputDelegate() {
        _classCallCheck(this, InputDelegate);
    }

    _createClass(InputDelegate, [{
        key: 'onInput',


        /**
         * onInput is called when the underlying control fires an input event.
         * @param {Event} e
         * @param {Input} input
         */
        value: function onInput() {}
    }]);

    return InputDelegate;
}();

/**
 * @private
 */


var Adapter = exports.Adapter = function () {
    function Adapter(delegate, input) {
        _classCallCheck(this, Adapter);

        this._delegate = delegate;
        this._input = input;
    }

    _createClass(Adapter, [{
        key: 'onInput',
        value: function onInput(e) {

            this._delegate.onInput(e, this._input);
        }
    }]);

    return Adapter;
}();

var DefaultInputDelegate = function () {
    function DefaultInputDelegate() {
        _classCallCheck(this, DefaultInputDelegate);
    }

    _createClass(DefaultInputDelegate, [{
        key: 'onInput',
        value: function onInput(e) {

            this.attributes.read('wat:onInput', noop)(e);
        }
    }]);

    return DefaultInputDelegate;
}();

/**
 * Input
 */


var Input = function (_Widget) {
    _inherits(Input, _Widget);

    function Input(attrs, children) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, attrs, children));

        _this.view = new _runtime.View(_layout2.default, _this);

        _this.delegate = new Adapter(attrs.read('wat:delegate', new DefaultInputDelegate(attrs)), _this);

        return _this;
    }

    _createClass(Input, [{
        key: 'watValue',
        value: function watValue() {

            var ret = this.attributes.read('wat:value');

            return typeof ret === 'function' ? ret(this.attributes.read('wat:name')) : ret;
        }

        /**
         * getClass
         */

    }, {
        key: 'getClass',
        value: function getClass() {

            var c = 'form-group ' + this.attributes.read('wat:class');

            if (!this.attributes.read('wat:message')) return c;

            return c + ' ' + this.attributes.read('wat:variant', 'has-error');
        }

        /**
         * setMessage sets the message for the message portion of
         * this input.
         * @param {string} msg
         */

    }, {
        key: 'setMessage',
        value: function setMessage() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            var message = this.view.findById('message');
            var node = document.createTextNode(msg);

            if (message.firstChild) {
                message.replaceChild(node, message.firstChild);
            } else {
                message.appendChild(node);
            }
        }

        /**
         * isFilled tells if this Input has a filled value.
         * @returns {boolean}
         */

    }, {
        key: 'isFilled',
        value: function isFilled() {

            return this.view.findById('input').value;
        }

        /**
         * isRequired tells if the Input was required.
         * @returns {boolean}
         */

    }, {
        key: 'isRequired',
        value: function isRequired() {

            if (this.attributes.read('wat:required')) return true;
        }

        /**
         * isValid queries whether the Input has been invalidated
         * or not.
         * @returns {boolean}
         */

    }, {
        key: 'isValid',
        value: function isValid() {

            return this.view.findById('root').className.split(' ').indexOf(INPUT_ERROR) === -1;
        }

        /**
         * invalidate this Input with an optional message.
         * @param {string} message
         * @returns {Input}
         */

    }, {
        key: 'invalidate',
        value: function invalidate() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            this.setMessage(message);
            this.view.findById('root').classList.remove(INPUT_SUCCESS);
            this.view.findById('root').classList.remove(INPUT_ERROR);
            this.view.findById('root').classList.add(INPUT_ERROR);
        }

        /**
         * validate this input with an optional messsage.
         * @param {string} message
         * @returns {Input}
         */

    }, {
        key: 'validate',
        value: function validate() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            this.setMessage(message);
            this.view.findById('root').classList.remove(INPUT_ERROR);
            this.view.findById('root').classList.remove(INPUT_SUCCESS);
            this.view.findById('root').classList.add(INPUT_SUCCESS);
        }

        /**
         * warn this input with an optional message.
         * @param {string} message
         * @returns {Input}
         */

    }, {
        key: 'warn',
        value: function warn() {
            var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


            if (message) this.setMessage(message);

            this.view.findById('root').classList.remove(INPUT_WARNING);
            this.view.findById('root').classList.add(INPUT_WARNING);
        }

        /**
         * reset this input to a clean state.
         * Removes messages, validation state etc.
         * @return {Input}
         */

    }, {
        key: 'reset',
        value: function reset() {

            var root = this.view.findById('root');

            root.classList.remove(INPUT_SUCCESS);
            root.classList.remove(INPUT_ERROR);
            root.classList.remove(INPUT_WARNING);

            this.view.findById('message').innerHTML = '';
        }

        /**
         * getName returns the name of this Input
         * @returns {string}
         */

    }, {
        key: 'getName',
        value: function getName() {

            return this.attributes.read('wat:name');
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }, {
        key: 'value',
        get: function get() {

            return this.view.findById('input').value;
        }
    }]);

    return Input;
}(_runtime.Widget);

exports.DefaultInputDelegate = DefaultInputDelegate;
exports.default = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2lucHV0L0lucHV0LmpzIl0sIm5hbWVzIjpbIklOUFVUX1NVQ0NFU1MiLCJJTlBVVF9FUlJPUiIsIklOUFVUX1dBUk5JTkciLCJub29wIiwiSW5wdXREZWxlZ2F0ZSIsIkFkYXB0ZXIiLCJkZWxlZ2F0ZSIsImlucHV0IiwiX2RlbGVnYXRlIiwiX2lucHV0IiwiZSIsIm9uSW5wdXQiLCJEZWZhdWx0SW5wdXREZWxlZ2F0ZSIsImF0dHJpYnV0ZXMiLCJyZWFkIiwiSW5wdXQiLCJhdHRycyIsImNoaWxkcmVuIiwidmlldyIsInJldCIsImMiLCJtc2ciLCJtZXNzYWdlIiwiZmluZEJ5SWQiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImZpcnN0Q2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsInZhbHVlIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJpbmRleE9mIiwic2V0TWVzc2FnZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInJvb3QiLCJpbm5lckhUTUwiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsYUFBdEI7QUFDQSxJQUFNQyxjQUFjLFdBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLGFBQXRCO0FBQ0EsSUFBTUMsT0FBTyxTQUFQQSxJQUFPLEdBQVcsQ0FBRSxDQUExQjs7QUFFQTs7Ozs7SUFJYUMsYSxXQUFBQSxhOzs7Ozs7Ozs7QUFFVDs7Ozs7a0NBS1UsQ0FFVDs7Ozs7O0FBSUw7Ozs7O0lBR2FDLE8sV0FBQUEsTztBQUVULHFCQUFZQyxRQUFaLEVBQXNCQyxLQUF0QixFQUE2QjtBQUFBOztBQUV6QixhQUFLQyxTQUFMLEdBQWlCRixRQUFqQjtBQUNBLGFBQUtHLE1BQUwsR0FBY0YsS0FBZDtBQUVIOzs7O2dDQUVPRyxDLEVBQUc7O0FBRVAsaUJBQUtGLFNBQUwsQ0FBZUcsT0FBZixDQUF1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Q0FFUTs7QUFFTCxtQkFBTyxLQUFLSSxJQUFMLENBQVVzQixNQUFWLEVBQVA7QUFFSDs7OzRCQXhKVzs7QUFFUixtQkFBTyxLQUFLdEIsSUFBTCxDQUFVSyxRQUFWLENBQW1CLE9BQW5CLEVBQTRCTyxLQUFuQztBQUVIOzs7Ozs7UUF3SklsQixvQixHQUFBQSxvQjtrQkFDTUcsSyIsImZpbGUiOiJJbnB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi93bWwvbGF5b3V0LndtbCc7XG5cbmNvbnN0IElOUFVUX1NVQ0NFU1MgPSAnaGFzLXN1Y2Nlc3MnO1xuY29uc3QgSU5QVVRfRVJST1IgPSAnaGFzLWVycm9yJztcbmNvbnN0IElOUFVUX1dBUk5JTkcgPSAnaGFzLXdhcm5pbmcnO1xuY29uc3Qgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogSW5wdXREZWxlZ2F0ZSBpcyBhbiBpbnRlcmZhY2UgaW5wdXRzIGNhbiBkZWxlZ2F0ZSBhbGwgdGhlaXIgZXZlbnRzIHRvLlxuICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgdGhlICdvbmlucHV0JyBldmVudCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgSW5wdXREZWxlZ2F0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBvbklucHV0IGlzIGNhbGxlZCB3aGVuIHRoZSB1bmRlcmx5aW5nIGNvbnRyb2wgZmlyZXMgYW4gaW5wdXQgZXZlbnQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEBwYXJhbSB7SW5wdXR9IGlucHV0XG4gICAgICovXG4gICAgb25JbnB1dCgpIHtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBBZGFwdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGRlbGVnYXRlLCBpbnB1dCkge1xuXG4gICAgICAgIHRoaXMuX2RlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cbiAgICB9XG5cbiAgICBvbklucHV0KGUpIHtcblxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vbklucHV0KGUsIHRoaXMuX2lucHV0KTtcblxuICAgIH1cblxufVxuXG5jbGFzcyBEZWZhdWx0SW5wdXREZWxlZ2F0ZSB7XG5cbiAgICBvbklucHV0KGUpIHtcblxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uSW5wdXQnLCBub29wKShlKTtcblxuICAgIH1cblxufVxuXG4vKipcbiAqIElucHV0XG4gKi9cbmNsYXNzIElucHV0IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gbmV3IEFkYXB0ZXIoXG4gICAgICAgICAgICBhdHRycy5yZWFkKCd3YXQ6ZGVsZWdhdGUnLFxuICAgICAgICAgICAgICAgIG5ldyBEZWZhdWx0SW5wdXREZWxlZ2F0ZShhdHRycykpLCB0aGlzKTtcblxuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LmZpbmRCeUlkKCdpbnB1dCcpLnZhbHVlO1xuXG4gICAgfVxuXG4gICAgd2F0VmFsdWUoKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWUnKTtcblxuICAgICAgICByZXR1cm4gKHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicpID8gcmV0KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bmFtZScpKSA6IHJldDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldENsYXNzXG4gICAgICovXG4gICAgZ2V0Q2xhc3MoKSB7XG5cbiAgICAgICAgdmFyIGMgPSBgZm9ybS1ncm91cCAke3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6Y2xhc3MnKX1gO1xuXG4gICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDptZXNzYWdlJykpXG4gICAgICAgICAgICByZXR1cm4gYztcblxuICAgICAgICByZXR1cm4gYCR7Y30gJHt0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhcmlhbnQnLCAnaGFzLWVycm9yJyl9YDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE1lc3NhZ2Ugc2V0cyB0aGUgbWVzc2FnZSBmb3IgdGhlIG1lc3NhZ2UgcG9ydGlvbiBvZlxuICAgICAqIHRoaXMgaW5wdXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICAgICAqL1xuICAgIHNldE1lc3NhZ2UobXNnID0gJycpIHtcblxuICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMudmlldy5maW5kQnlJZCgnbWVzc2FnZScpO1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1zZyk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgbWVzc2FnZS5yZXBsYWNlQ2hpbGQobm9kZSwgbWVzc2FnZS5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzRmlsbGVkIHRlbGxzIGlmIHRoaXMgSW5wdXQgaGFzIGEgZmlsbGVkIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRmlsbGVkKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2lucHV0JykudmFsdWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc1JlcXVpcmVkIHRlbGxzIGlmIHRoZSBJbnB1dCB3YXMgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNSZXF1aXJlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyZXF1aXJlZCcpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc1ZhbGlkIHF1ZXJpZXMgd2hldGhlciB0aGUgSW5wdXQgaGFzIGJlZW4gaW52YWxpZGF0ZWRcbiAgICAgKiBvciBub3QuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNWYWxpZCgpIHtcblxuICAgICAgICByZXR1cm4gKHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoSU5QVVRfRVJST1IpID09PSAtMSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbnZhbGlkYXRlIHRoaXMgSW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIGludmFsaWRhdGUobWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9FUlJPUik7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZSB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgdmFsaWRhdGUobWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9TVUNDRVNTKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9TVUNDRVNTKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHdhcm4gdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgd2FybihtZXNzYWdlID0gJycpIHtcblxuICAgICAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1dBUk5JTkcpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QuYWRkKElOUFVUX1dBUk5JTkcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzZXQgdGhpcyBpbnB1dCB0byBhIGNsZWFuIHN0YXRlLlxuICAgICAqIFJlbW92ZXMgbWVzc2FnZXMsIHZhbGlkYXRpb24gc3RhdGUgZXRjLlxuICAgICAqIEByZXR1cm4ge0lucHV0fVxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuXG4gICAgICAgIHZhciByb290ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdyb290Jyk7XG5cbiAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfRVJST1IpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfV0FSTklORyk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdtZXNzYWdlJykuaW5uZXJIVE1MID0gJyc7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXROYW1lIHJldHVybnMgdGhlIG5hbWUgb2YgdGhpcyBJbnB1dFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpuYW1lJyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgeyBEZWZhdWx0SW5wdXREZWxlZ2F0ZSB9XG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuIl19