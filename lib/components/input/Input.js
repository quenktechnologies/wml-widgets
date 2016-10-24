'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INPUT_SUCCESS = 'has-succes';
var INPUT_ERROR = 'has-error';
var INPUT_WARNING = 'has-warning';

/**
 * Input
 */

var Input = function (_Widget) {
    _inherits(Input, _Widget);

    function Input(attrs, children) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, attrs, children));

        _this.view = new _runtime.View(_layout2.default, _this);

        return _this;
    }

    /**
     * getClass
     */


    _createClass(Input, [{
        key: 'getClass',
        value: function getClass() {

            var c = 'form-group ' + this.attributes.read('wat:class');

            if (!this.attributes.read('wat:message')) return c;

            return c + ' has-error';
        }
    }, {
        key: 'input',
        value: function input(e) {

            var set = this.attributes.read('wat:set', function () {});

            this.reset();
            set(e.target.name, e.target.value, this);
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
                message.replaceChild(message.firstChild, node);
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


            if (message) this.setMessage(message);

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


            if (message) this.setMessage(message);

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
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Input;
}(_runtime.Widget);

exports.default = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2lucHV0L0lucHV0LmpzIl0sIm5hbWVzIjpbIklOUFVUX1NVQ0NFU1MiLCJJTlBVVF9FUlJPUiIsIklOUFVUX1dBUk5JTkciLCJJbnB1dCIsImF0dHJzIiwiY2hpbGRyZW4iLCJ2aWV3IiwiYyIsImF0dHJpYnV0ZXMiLCJyZWFkIiwiZSIsInNldCIsInJlc2V0IiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwibXNnIiwibWVzc2FnZSIsImZpbmRCeUlkIiwibm9kZSIsImRvY3VtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJmaXJzdENoaWxkIiwicmVwbGFjZUNoaWxkIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJzcGxpdCIsImluZGV4T2YiLCJzZXRNZXNzYWdlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicm9vdCIsImlubmVySFRNTCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLFlBQXRCO0FBQ0EsSUFBTUMsY0FBYyxXQUFwQjtBQUNBLElBQU1DLGdCQUFnQixhQUF0Qjs7QUFFQTs7OztJQUdNQyxLOzs7QUFFRixtQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxrSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBR3pCLGNBQUtDLElBQUwsR0FBWSwwQ0FBWjs7QUFIeUI7QUFLNUI7O0FBRUQ7Ozs7Ozs7bUNBR1c7O0FBRVAsZ0JBQUlDLG9CQUFrQixLQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixXQUFyQixDQUF0Qjs7QUFFQSxnQkFBSSxDQUFDLEtBQUtELFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLGFBQXJCLENBQUwsRUFDSSxPQUFPRixDQUFQOztBQUVKLG1CQUFVQSxDQUFWO0FBRUg7Ozs4QkFFS0csQyxFQUFHOztBQUVMLGdCQUFJQyxNQUFNLEtBQUtILFVBQUwsQ0FBZ0JDLElB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LEVBQThCZSxTQUE5QixHQUEwQyxFQUExQztBQUVIOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBSzNCLElBQUwsQ0FBVTRCLE1BQVYsRUFBUDtBQUVIOzs7Ozs7a0JBSVUvQixLIiwiZmlsZSI6IklucHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuY29uc3QgSU5QVVRfU1VDQ0VTUyA9ICdoYXMtc3VjY2VzJztcbmNvbnN0IElOUFVUX0VSUk9SID0gJ2hhcy1lcnJvcic7XG5jb25zdCBJTlBVVF9XQVJOSU5HID0gJ2hhcy13YXJuaW5nJztcblxuLyoqXG4gKiBJbnB1dFxuICovXG5jbGFzcyBJbnB1dCBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhsYXlvdXQsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0Q2xhc3NcbiAgICAgKi9cbiAgICBnZXRDbGFzcygpIHtcblxuICAgICAgICB2YXIgYyA9IGBmb3JtLWdyb3VwICR7dGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpjbGFzcycpfWA7XG5cbiAgICAgICAgaWYgKCF0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om1lc3NhZ2UnKSlcbiAgICAgICAgICAgIHJldHVybiBjO1xuXG4gICAgICAgIHJldHVybiBgJHtjfSBoYXMtZXJyb3JgO1xuXG4gICAgfVxuXG4gICAgaW5wdXQoZSkge1xuXG4gICAgICAgIHZhciBzZXQgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnNldCcsIGZ1bmN0aW9uKCkge30pO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgc2V0KGUudGFyZ2V0Lm5hbWUsIGUudGFyZ2V0LnZhbHVlLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldE1lc3NhZ2Ugc2V0cyB0aGUgbWVzc2FnZSBmb3IgdGhlIG1lc3NhZ2UgcG9ydGlvbiBvZlxuICAgICAqIHRoaXMgaW5wdXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICAgICAqL1xuICAgIHNldE1lc3NhZ2UobXNnID0gJycpIHtcblxuICAgICAgICB2YXIgbWVzc2FnZSA9IHRoaXMudmlldy5maW5kQnlJZCgnbWVzc2FnZScpO1xudmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2cpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UucmVwbGFjZUNoaWxkKG1lc3NhZ2UuZmlyc3RDaGlsZCwgbm9kZSAgKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBtZXNzYWdlLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpc0ZpbGxlZCB0ZWxscyBpZiB0aGlzIElucHV0IGhhcyBhIGZpbGxlZCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZpbGxlZCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LmZpbmRCeUlkKCdpbnB1dCcpLnZhbHVlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXNSZXF1aXJlZCB0ZWxscyBpZiB0aGUgSW5wdXQgd2FzIHJlcXVpcmVkLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzUmVxdWlyZWQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6cmVxdWlyZWQnKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXNWYWxpZCBxdWVyaWVzIHdoZXRoZXIgdGhlIElucHV0IGhhcyBiZWVuIGludmFsaWRhdGVkXG4gICAgICogb3Igbm90LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVmFsaWQoKSB7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKElOUFVUX0VSUk9SKSA9PT0gLTEpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaW52YWxpZGF0ZSB0aGlzIElucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm5zIHtJbnB1dH1cbiAgICAgKi9cbiAgICBpbnZhbGlkYXRlKG1lc3NhZ2UgPSAnJykge1xuXG4gICAgICAgIGlmIChtZXNzYWdlKVxuICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfRVJST1IpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QuYWRkKElOUFVUX0VSUk9SKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHZhbGlkYXRlIHRoaXMgaW5wdXQgd2l0aCBhbiBvcHRpb25hbCBtZXNzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm5zIHtJbnB1dH1cbiAgICAgKi9cbiAgICB2YWxpZGF0ZShtZXNzYWdlID0gJycpIHtcblxuICAgICAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QuYWRkKElOUFVUX1NVQ0NFU1MpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogd2FybiB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEByZXR1cm5zIHtJbnB1dH1cbiAgICAgKi9cbiAgICB3YXJuKG1lc3NhZ2UgPSAnJykge1xuXG4gICAgICAgIGlmIChtZXNzYWdlKVxuICAgICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfV0FSTklORyk7XG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpLmNsYXNzTGlzdC5hZGQoSU5QVVRfV0FSTklORyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXNldCB0aGlzIGlucHV0IHRvIGEgY2xlYW4gc3RhdGUuXG4gICAgICogUmVtb3ZlcyBtZXNzYWdlcywgdmFsaWRhdGlvbiBzdGF0ZSBldGMuXG4gICAgICogQHJldHVybiB7SW5wdXR9XG4gICAgICovXG4gICAgcmVzZXQoKSB7XG5cbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKTtcblxuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfU1VDQ0VTUyk7XG4gICAgICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9FUlJPUik7XG4gICAgICAgIHJvb3QuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9XQVJOSU5HKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ21lc3NhZ2UnKS5pbm5lckhUTUwgPSAnJztcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0XG4iXX0=