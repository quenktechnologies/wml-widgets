'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal = require('./wml/modal.wml');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Modal
 * NOTE: Using this requires jQuery and boostrap plugin.
 */
var Modal = function (_Widget) {
    _inherits(Modal, _Widget);

    function Modal(attrs, children) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, attrs, children));

        _this.view = new _runtime.View(_modal2.default, _this);
        _this.modal = null;

        return _this;
    }

    /**
     * put content on to this modal.
     * @param {Renderable} r
     */


    _createClass(Modal, [{
        key: 'put',
        value: function put(r) {

            var root = this.view.findById('root');

            while (root.lastChild) {
                root.removeChild(root.lastChild);
            }root.appendChild(r.render());

            this.modal.modal(this.attributes.read('wat:options', {
                backdrop: false,
                keyboard: true,
                fade: true,
                show: true
            }));

            this.modal.show();
        }

        /**
         * off this modal
         */

    }, {
        key: 'off',
        value: function off() {

            this.modal.hide();
            this.modal.off();

            document.body.classList.remove('modal-open');
        }
    }, {
        key: 'render',
        value: function render() {

            var ret = this.view.render();

            this.modal = jQuery(ret);
            return ret;
        }
    }]);

    return Modal;
}(_runtime.Widget);

exports.default = Modal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsL01vZGFsLmpzIl0sIm5hbWVzIjpbIk1vZGFsIiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciLCJtb2RhbCIsInIiLCJyb290IiwiZmluZEJ5SWQiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwicmVuZGVyIiwiYXR0cmlidXRlcyIsInJlYWQiLCJiYWNrZHJvcCIsImtleWJvYXJkIiwiZmFkZSIsInNob3ciLCJoaWRlIiwib2ZmIiwiZG9jdW1lbnQiLCJib2R5IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwicmV0IiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxLOzs7QUFFRixtQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxrSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLElBQUwsR0FBWSx5Q0FBWjtBQUNBLGNBQUtDLEtBQUwsR0FBYSxJQUFiOztBQUx5QjtBQU81Qjs7QUFFRDs7Ozs7Ozs7NEJBSUlDLEMsRUFBRzs7QUFFSCxnQkFBSUMsT0FBTyxLQUFLSCxJQUFMLENBQVVJLFFBQVYsQ0FBbUIsTUFBbkIsQ0FBWDs7QUFFQSxtQkFBT0QsS0FBS0UsU0FBWjtBQUNJRixxQkFBS0csV0FBTCxDQUFpQkgsS0FBS0UsU0FBdEI7QUFESixhQUdBRixLQUFLSSxXQUFMLENBQWlCTCxFQUFFTSxNQUFGLEVBQWpCOztBQUVBLGlCQUFLUCxLQUFMLENBQVdBLEtBQVgsQ0FBaUIsS0FBS1EsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsYUFBckIsRUFBb0M7QUFDakRDLDBCQUFVLEtBRHVDO0FBRWpEQywwQkFBVSxJQUZ1QztBQUdqREMsc0JBQU0sSUFIMkM7QUFJakRDLHNCQUFNO0FBSjJDLGFBQXBDLENBQWpCOztBQU9BLGlCQUFLYixLQUFMLENBQVdhLElBQVg7QUFFSDs7QUFFRDs7Ozs7OzhCQUdNOztBQUVGLGlCQUFLYixLQUFMLENBQVdjLElBQVg7QUFDQSxpQkFBS2QsS0FBTCxDQUFXZSxHQUFYOztBQUVBQyxxQkFBU0MsSUFBVCxDQUFjQyxTQUFkLENBQXdCQyxNQUF4QixDQUErQixZQUEvQjtBQUVIOzs7aUNBRVE7O0FBRUwsZ0JBQUlDLE1BQU0sS0FBS3JCLElBQUwsQ0FBVVEsTUFBVixFQUFWOztBQUVBLGlCQUFLUCxLQUFMLEdBQWFxQixPQUFPRCxHQUFQLENBQWI7QUFDQSxtQkFBT0EsR0FBUDtBQUVIOzs7Ozs7a0JBSVV4QixLIiwiZmlsZSI6Ik1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vd21sL21vZGFsLndtbCc7XG5cbi8qKlxuICogTW9kYWxcbiAqIE5PVEU6IFVzaW5nIHRoaXMgcmVxdWlyZXMgalF1ZXJ5IGFuZCBib29zdHJhcCBwbHVnaW4uXG4gKi9cbmNsYXNzIE1vZGFsIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobW9kYWwsIHRoaXMpO1xuICAgICAgICB0aGlzLm1vZGFsID0gbnVsbDtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHB1dCBjb250ZW50IG9uIHRvIHRoaXMgbW9kYWwuXG4gICAgICogQHBhcmFtIHtSZW5kZXJhYmxlfSByXG4gICAgICovXG4gICAgcHV0KHIpIHtcblxuICAgICAgICB2YXIgcm9vdCA9IHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpO1xuXG4gICAgICAgIHdoaWxlIChyb290Lmxhc3RDaGlsZClcbiAgICAgICAgICAgIHJvb3QucmVtb3ZlQ2hpbGQocm9vdC5sYXN0Q2hpbGQpO1xuXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoci5yZW5kZXIoKSk7XG5cbiAgICAgICAgdGhpcy5tb2RhbC5tb2RhbCh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9wdGlvbnMnLCB7XG4gICAgICAgICAgICBiYWNrZHJvcDogZmFsc2UsXG4gICAgICAgICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgIH0pKTtcblxuICAgICAgICB0aGlzLm1vZGFsLnNob3coKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG9mZiB0aGlzIG1vZGFsXG4gICAgICovXG4gICAgb2ZmKCkge1xuXG4gICAgICAgIHRoaXMubW9kYWwuaGlkZSgpO1xuICAgICAgICB0aGlzLm1vZGFsLm9mZigpO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtb3BlbicpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciByZXQgPSB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICAgICAgdGhpcy5tb2RhbCA9IGpRdWVyeShyZXQpO1xuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsXG4iXX0=