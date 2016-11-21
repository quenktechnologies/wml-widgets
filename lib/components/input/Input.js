'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DefaultInputDelegate = undefined;

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

var DefaultInputDelegate = function () {
    function DefaultInputDelegate(attributes) {
        _classCallCheck(this, DefaultInputDelegate);

        this.attributes = attributes;
    }

    _createClass(DefaultInputDelegate, [{
        key: 'onAttached',
        value: function onAttached(input) {}

        /**
         * onInput is called when the underlying control fires an input event.
         * @param {Event} e
         */

    }, {
        key: 'onInput',
        value: function onInput(e) {

            this.attributes.read('wat:onInput', function () {})(e);
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
        _this.delegate = attrs.read('wat:delegate', new DefaultInputDelegate(attrs));

        return _this;
    }

    _createClass(Input, [{
        key: 'onRendered',
        value: function onRendered() {

            this.delegate.onAttached(this);
        }
    }, {
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

            return c + ' has-error';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2lucHV0L0lucHV0LmpzIl0sIm5hbWVzIjpbIklOUFVUX1NVQ0NFU1MiLCJJTlBVVF9FUlJPUiIsIklOUFVUX1dBUk5JTkciLCJEZWZhdWx0SW5wdXREZWxlZ2F0ZSIsImF0dHJpYnV0ZXMiLCJpbnB1dCIsImUiLCJyZWFkIiwiSW5wdXQiLCJhdHRycyIsImNoaWxkcmVuIiwidmlldyIsImRlbGVnYXRlIiwib25BdHRhY2hlZCIsInJldCIsImMiLCJtc2ciLCJtZXNzYWdlIiwiZmluZEJ5SWQiLCJub2RlIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsImZpcnN0Q2hpbGQiLCJyZXBsYWNlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsInZhbHVlIiwiY2xhc3NOYW1lIiwic3BsaXQiLCJpbmRleE9mIiwic2V0TWVzc2FnZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInJvb3QiLCJpbm5lckhUTUwiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsYUFBdEI7QUFDQSxJQUFNQyxjQUFjLFdBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLGFBQXRCOztJQUVNQyxvQjtBQUVGLGtDQUFZQyxVQUFaLEVBQXdCO0FBQUE7O0FBRXBCLGFBQUtBLFVBQUwsR0FBa0JBLFVBQWxCO0FBRUg7Ozs7bUNBRVVDLEssRUFBTyxDQUVqQjs7QUFFRDs7Ozs7OztnQ0FJUUMsQyxFQUFHOztBQUVQLGlCQUFLRixVQUFMLENBQWdCRyxJQUFoQixDQUFxQixhQUFyQixFQUFvQyxZQUFXLENBQUUsQ0FBakQsRUFBbURELENBQW5EO0FBRUg7Ozs7OztBQUlMOzs7OztJQUdNRSxLOzs7QUFFRixtQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxrSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBR3pCLGNBQUtDLElBQUwsR0FBWSwwQ0FBWjtB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QUFBLGdCQUFkaUIsT0FBYyx1RUFBSixFQUFJOzs7QUFFZixnQkFBSUEsT0FBSixFQUNJLEtBQUtZLFVBQUwsQ0FBZ0JaLE9BQWhCOztBQUVKLGlCQUFLTixJQUFMLENBQVVPLFFBQVYsQ0FBbUIsTUFBbkIsRUFBMkJZLFNBQTNCLENBQXFDQyxNQUFyQyxDQUE0QzdCLGFBQTVDO0FBQ0EsaUJBQUtTLElBQUwsQ0FBVU8sUUFBVixDQUFtQixNQUFuQixFQUEyQlksU0FBM0IsQ0FBcUNFLEdBQXJDLENBQXlDOUIsYUFBekM7QUFFSDs7QUFFRDs7Ozs7Ozs7Z0NBS1E7O0FBRUosZ0JBQUkrQixPQUFPLEtBQUt0QixJQUFMLENBQVVPLFFBQVYsQ0FBbUIsTUFBbkIsQ0FBWDs7QUFFQWUsaUJBQUtILFNBQUwsQ0FBZUMsTUFBZixDQUFzQi9CLGFBQXRCO0FBQ0FpQyxpQkFBS0gsU0FBTCxDQUFlQyxNQUFmLENBQXNCOUIsV0FBdEI7QUFDQWdDLGlCQUFLSCxTQUFMLENBQWVDLE1BQWYsQ0FBc0I3QixhQUF0Qjs7QUFFQSxpQkFBS1MsSUFBTCxDQUFVTyxRQUFWLENBQW1CLFNBQW5CLEVBQThCZ0IsU0FBOUIsR0FBMEMsRUFBMUM7QUFFSDs7QUFFRDs7Ozs7OztrQ0FJVTs7QUFFTixtQkFBTyxLQUFLOUIsVUFBTCxDQUFnQkcsSUFBaEIsQ0FBcUIsVUFBckIsQ0FBUDtBQUVIOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBS0ksSUFBTCxDQUFVd0IsTUFBVixFQUFQO0FBRUg7Ozs0QkE5Slc7O0FBRVQsbUJBQU8sS0FBS3hCLElBQUwsQ0FBVU8sUUFBVixDQUFtQixPQUFuQixFQUE0Qk8sS0FBbkM7QUFFRjs7Ozs7O1FBOEpJdEIsb0IsR0FBQUEsb0I7a0JBQ01LLEsiLCJmaWxlIjoiSW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2xheW91dC53bWwnO1xuXG5jb25zdCBJTlBVVF9TVUNDRVNTID0gJ2hhcy1zdWNjZXNzJztcbmNvbnN0IElOUFVUX0VSUk9SID0gJ2hhcy1lcnJvcic7XG5jb25zdCBJTlBVVF9XQVJOSU5HID0gJ2hhcy13YXJuaW5nJztcblxuY2xhc3MgRGVmYXVsdElucHV0RGVsZWdhdGUge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cmlidXRlcykge1xuXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG5cbiAgICB9XG5cbiAgICBvbkF0dGFjaGVkKGlucHV0KSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbklucHV0IGlzIGNhbGxlZCB3aGVuIHRoZSB1bmRlcmx5aW5nIGNvbnRyb2wgZmlyZXMgYW4gaW5wdXQgZXZlbnQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuICAgIG9uSW5wdXQoZSkge1xuXG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25JbnB1dCcsIGZ1bmN0aW9uKCkge30pKGUpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogSW5wdXRcbiAqL1xuY2xhc3MgSW5wdXQgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IGF0dHJzLnJlYWQoJ3dhdDpkZWxlZ2F0ZScsIG5ldyBEZWZhdWx0SW5wdXREZWxlZ2F0ZShhdHRycykpO1xuXG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCkge1xuXG4gICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCgnaW5wdXQnKS52YWx1ZTtcblxuICAgIH1cblxuICAgIG9uUmVuZGVyZWQoKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5vbkF0dGFjaGVkKHRoaXMpO1xuXG4gICAgfVxuXG4gICAgd2F0VmFsdWUoKSB7XG5cbiAgICAgICAgdmFyIHJldCA9IHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWUnKTtcblxuICAgICAgICByZXR1cm4gKHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicpID8gcmV0KHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6bmFtZScpKSA6IHJldDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldENsYXNzXG4gICAgICovXG4gICAgZ2V0Q2xhc3MoKSB7XG5cbiAgICAgICAgdmFyIGMgPSBgZm9ybS1ncm91cCAke3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6Y2xhc3MnKX1gO1xuXG4gICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDptZXNzYWdlJykpXG4gICAgICAgICAgICByZXR1cm4gYztcblxuICAgICAgICByZXR1cm4gYCR7Y30gaGFzLWVycm9yYDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE1lc3NhZ2Ugc2V0cyB0aGUgbWVzc2FnZSBmb3IgdGhlIG1lc3NhZ2UgcG9ydGlvbiBvZlxuICAgICAqIHRoaXMgaW5wdXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICAgICAqL1xuICAgIHNldE1lc3NhZ2UobXNnID0gJycpIHtcblxuICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMudmlldy5maW5kQnlJZCgnbWVzc2FnZScpO1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1zZyk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgbWVzc2FnZS5yZXBsYWNlQ2hpbGQobm9kZSwgbWVzc2FnZS5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzRmlsbGVkIHRlbGxzIGlmIHRoaXMgSW5wdXQgaGFzIGEgZmlsbGVkIHZhbHVlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRmlsbGVkKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2lucHV0JykudmFsdWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc1JlcXVpcmVkIHRlbGxzIGlmIHRoZSBJbnB1dCB3YXMgcmVxdWlyZWQuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNSZXF1aXJlZCgpIHtcblxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpyZXF1aXJlZCcpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc1ZhbGlkIHF1ZXJpZXMgd2hldGhlciB0aGUgSW5wdXQgaGFzIGJlZW4gaW52YWxpZGF0ZWRcbiAgICAgKiBvciBub3QuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNWYWxpZCgpIHtcblxuICAgICAgICByZXR1cm4gKHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoSU5QVVRfRVJST1IpID09PSAtMSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpbnZhbGlkYXRlIHRoaXMgSW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gICAgICogQHJldHVybnMge0lucHV0fVxuICAgICAqL1xuICAgIGludmFsaWRhdGUobWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9FUlJPUik7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZSB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgdmFsaWRhdGUobWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9TVUNDRVNTKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9TVUNDRVNTKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHdhcm4gdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgd2FybihtZXNzYWdlID0gJycpIHtcblxuICAgICAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1dBUk5JTkcpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QuYWRkKElOUFVUX1dBUk5JTkcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzZXQgdGhpcyBpbnB1dCB0byBhIGNsZWFuIHN0YXRlLlxuICAgICAqIFJlbW92ZXMgbWVzc2FnZXMsIHZhbGlkYXRpb24gc3RhdGUgZXRjLlxuICAgICAqIEByZXR1cm4ge0lucHV0fVxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuXG4gICAgICAgIHZhciByb290ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdyb290Jyk7XG5cbiAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfRVJST1IpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfV0FSTklORyk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdtZXNzYWdlJykuaW5uZXJIVE1MID0gJyc7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXROYW1lIHJldHVybnMgdGhlIG5hbWUgb2YgdGhpcyBJbnB1dFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0TmFtZSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpuYW1lJyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgeyBEZWZhdWx0SW5wdXREZWxlZ2F0ZSB9XG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuIl19