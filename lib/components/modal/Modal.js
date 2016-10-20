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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsL01vZGFsLmpzIl0sIm5hbWVzIjpbIk1vZGFsIiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciLCJtb2RhbCIsInIiLCJyb290IiwiZmluZEJ5SWQiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwicmVuZGVyIiwiYXR0cmlidXRlcyIsInJlYWQiLCJiYWNrZHJvcCIsImtleWJvYXJkIiwiZmFkZSIsInNob3ciLCJyZXQiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7O0lBSU1BLEs7OztBQUVGLG1CQUFZQyxLQUFaLEVBQW1CQyxRQUFuQixFQUE2QjtBQUFBOztBQUFBLGtIQUVuQkQsS0FGbUIsRUFFWkMsUUFGWTs7QUFJekIsY0FBS0MsSUFBTCxHQUFZLHlDQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhLElBQWI7O0FBTHlCO0FBTzVCOztBQUVEOzs7Ozs7Ozs0QkFJSUMsQyxFQUFHOztBQUVILGdCQUFJQyxPQUFPLEtBQUtILElBQUwsQ0FBVUksUUFBVixDQUFtQixNQUFuQixDQUFYOztBQUVBLG1CQUFPRCxLQUFLRSxTQUFaO0FBQ0lGLHFCQUFLRyxXQUFMLENBQWlCSCxLQUFLRSxTQUF0QjtBQURKLGFBR0FGLEtBQUtJLFdBQUwsQ0FBaUJMLEVBQUVNLE1BQUYsRUFBakI7O0FBRUEsaUJBQUtQLEtBQUwsQ0FBV0EsS0FBWCxDQUFpQixLQUFLUSxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixhQUFyQixFQUFvQztBQUNqREMsMEJBQVUsS0FEdUM7QUFFakRDLDBCQUFVLElBRnVDO0FBR2pEQyxzQkFBTSxJQUgyQztBQUlqREMsc0JBQU07QUFKMkMsYUFBcEMsQ0FBakI7QUFPSDs7O2lDQUVROztBQUVMLGdCQUFJQyxNQUFNLEtBQUtmLElBQUwsQ0FBVVEsTUFBVixFQUFWOztBQUVBLGlCQUFLUCxLQUFMLEdBQWFlLE9BQU9ELEdBQVAsQ0FBYjtBQUNBLG1CQUFPQSxHQUFQO0FBRUg7Ozs7OztrQkFJVWxCLEsiLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbW9kYWwgZnJvbSAnLi93bWwvbW9kYWwud21sJztcblxuLyoqXG4gKiBNb2RhbFxuICogTk9URTogVXNpbmcgdGhpcyByZXF1aXJlcyBqUXVlcnkgYW5kIGJvb3N0cmFwIHBsdWdpbi5cbiAqL1xuY2xhc3MgTW9kYWwgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhtb2RhbCwgdGhpcyk7XG4gICAgICAgIHRoaXMubW9kYWwgPSBudWxsO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcHV0IGNvbnRlbnQgb24gdG8gdGhpcyBtb2RhbC5cbiAgICAgKiBAcGFyYW0ge1JlbmRlcmFibGV9IHJcbiAgICAgKi9cbiAgICBwdXQocikge1xuXG4gICAgICAgIHZhciByb290ID0gdGhpcy52aWV3LmZpbmRCeUlkKCdyb290Jyk7XG5cbiAgICAgICAgd2hpbGUgKHJvb3QubGFzdENoaWxkKVxuICAgICAgICAgICAgcm9vdC5yZW1vdmVDaGlsZChyb290Lmxhc3RDaGlsZCk7XG5cbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChyLnJlbmRlcigpKTtcblxuICAgICAgICB0aGlzLm1vZGFsLm1vZGFsKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b3B0aW9ucycsIHtcbiAgICAgICAgICAgIGJhY2tkcm9wOiBmYWxzZSxcbiAgICAgICAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgfSkpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciByZXQgPSB0aGlzLnZpZXcucmVuZGVyKCk7XG5cbiAgICAgICAgdGhpcy5tb2RhbCA9IGpRdWVyeShyZXQpO1xuICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsXG4iXX0=