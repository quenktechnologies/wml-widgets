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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2lucHV0L0lucHV0LmpzIl0sIm5hbWVzIjpbIklOUFVUX1NVQ0NFU1MiLCJJTlBVVF9FUlJPUiIsIklOUFVUX1dBUk5JTkciLCJJbnB1dCIsImF0dHJzIiwiY2hpbGRyZW4iLCJ2aWV3IiwiYyIsImF0dHJpYnV0ZXMiLCJyZWFkIiwiZSIsInNldCIsInJlc2V0IiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwibXNnIiwibWVzc2FnZSIsImZpbmRCeUlkIiwibm9kZSIsImRvY3VtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJmaXJzdENoaWxkIiwicmVwbGFjZUNoaWxkIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJzcGxpdCIsImluZGV4T2YiLCJzZXRNZXNzYWdlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicm9vdCIsImlubmVySFRNTCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLFlBQXRCO0FBQ0EsSUFBTUMsY0FBYyxXQUFwQjtBQUNBLElBQU1DLGdCQUFnQixhQUF0Qjs7QUFFQTs7OztJQUdNQyxLOzs7QUFFRixtQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxrSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBR3pCLGNBQUtDLElBQUwsR0FBWSwwQ0FBWjs7QUFIeUI7QUFLNUI7O0FBRUQ7Ozs7Ozs7bUNBR1c7O0FBRVAsZ0JBQUlDLG9CQUFrQixLQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixXQUFyQixDQUF0Qjs7QUFFQSxnQkFBSSxDQUFDLEtBQUtELFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLGFBQXJCLENBQUwsRUFDSSxPQUFPRixDQUFQOztBQUVKLG1CQUFVQSxDQUFWO0FBRUg7Ozs4QkFFS0csQyxFQUFHOztBQUVMLGdCQUFJQyxNQUFNLEtBQUtILFVBQUwsQ0FBZ0JDLElB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LEVBQThCZSxTQUE5QixHQUEwQyxFQUExQztBQUVIOzs7aUNBRVE7O0FBRUwsbUJBQU8sS0FBSzNCLElBQUwsQ0FBVTRCLE1BQVYsRUFBUDtBQUVIOzs7Ozs7a0JBSVUvQixLIiwiZmlsZSI6IklucHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuY29uc3QgSU5QVVRfU1VDQ0VTUyA9ICdoYXMtc3VjY2VzJztcbmNvbnN0IElOUFVUX0VSUk9SID0gJ2hhcy1lcnJvcic7XG5jb25zdCBJTlBVVF9XQVJOSU5HID0gJ2hhcy13YXJuaW5nJztcblxuLyoqXG4gKiBJbnB1dFxuICovXG5jbGFzcyBJbnB1dCBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhsYXlvdXQsICB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldENsYXNzXG4gICAgICovXG4gICAgZ2V0Q2xhc3MoKSB7XG5cbiAgICAgICAgdmFyIGMgPSBgZm9ybS1ncm91cCAke3RoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6Y2xhc3MnKX1gO1xuXG4gICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDptZXNzYWdlJykpXG4gICAgICAgICAgICByZXR1cm4gYztcblxuICAgICAgICByZXR1cm4gYCR7Y30gaGFzLWVycm9yYDtcblxuICAgIH1cblxuICAgIGlucHV0KGUpIHtcblxuICAgICAgICB2YXIgc2V0ID0gdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpzZXQnLCBmdW5jdGlvbigpIHt9KTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHNldChlLnRhcmdldC5uYW1lLCBlLnRhcmdldC52YWx1ZSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXRNZXNzYWdlIHNldHMgdGhlIG1lc3NhZ2UgZm9yIHRoZSBtZXNzYWdlIHBvcnRpb24gb2ZcbiAgICAgKiB0aGlzIGlucHV0LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICAgKi9cbiAgICBzZXRNZXNzYWdlKG1zZyA9ICcnKSB7XG5cbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ21lc3NhZ2UnKTtcbnZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnKTtcblxuICAgICAgICBpZiAobWVzc2FnZS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBtZXNzYWdlLnJlcGxhY2VDaGlsZChtZXNzYWdlLmZpcnN0Q2hpbGQsIG5vZGUgICk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbWVzc2FnZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaXNGaWxsZWQgdGVsbHMgaWYgdGhpcyBJbnB1dCBoYXMgYSBmaWxsZWQgdmFsdWUuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGaWxsZWQoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5maW5kQnlJZCgnaW5wdXQnKS52YWx1ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzUmVxdWlyZWQgdGVsbHMgaWYgdGhlIElucHV0IHdhcyByZXF1aXJlZC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1JlcXVpcmVkKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnJlcXVpcmVkJykpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGlzVmFsaWQgcXVlcmllcyB3aGV0aGVyIHRoZSBJbnB1dCBoYXMgYmVlbiBpbnZhbGlkYXRlZFxuICAgICAqIG9yIG5vdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1ZhbGlkKCkge1xuXG4gICAgICAgIHJldHVybiAodGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihJTlBVVF9FUlJPUikgPT09IC0xKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGludmFsaWRhdGUgdGhpcyBJbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgaW52YWxpZGF0ZShtZXNzYWdlID0gJycpIHtcblxuICAgICAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX0VSUk9SKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9FUlJPUik7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZSB0aGlzIGlucHV0IHdpdGggYW4gb3B0aW9uYWwgbWVzc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgdmFsaWRhdGUobWVzc2FnZSA9ICcnKSB7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UpXG4gICAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LnJlbW92ZShJTlBVVF9TVUNDRVNTKTtcbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY2xhc3NMaXN0LmFkZChJTlBVVF9TVUNDRVNTKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHdhcm4gdGhpcyBpbnB1dCB3aXRoIGFuIG9wdGlvbmFsIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcmV0dXJucyB7SW5wdXR9XG4gICAgICovXG4gICAgd2FybihtZXNzYWdlID0gJycpIHtcblxuICAgICAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1dBUk5JTkcpO1xuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKS5jbGFzc0xpc3QuYWRkKElOUFVUX1dBUk5JTkcpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzZXQgdGhpcyBpbnB1dCB0byBhIGNsZWFuIHN0YXRlLlxuICAgICAqIFJlbW92ZXMgbWVzc2FnZXMsIHZhbGlkYXRpb24gc3RhdGUgZXRjLlxuICAgICAqIEByZXR1cm4ge0lucHV0fVxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuXG4gICAgICAgIHZhciByb290ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdyb290Jyk7XG5cbiAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKElOUFVUX1NVQ0NFU1MpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfRVJST1IpO1xuICAgICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoSU5QVVRfV0FSTklORyk7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdtZXNzYWdlJykuaW5uZXJIVE1MID0gJyc7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuIl19