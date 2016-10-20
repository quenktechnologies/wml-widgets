'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal_header = require('./wml/modal_header.wml');

var _modal_header2 = _interopRequireDefault(_modal_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ModalHeader
 */
var ModalHeader = function (_Widget) {
    _inherits(ModalHeader, _Widget);

    function ModalHeader() {
        _classCallCheck(this, ModalHeader);

        return _possibleConstructorReturn(this, (ModalHeader.__proto__ || Object.getPrototypeOf(ModalHeader)).apply(this, arguments));
    }

    _createClass(ModalHeader, [{
        key: 'render',
        value: function render() {

            return new _runtime.View(_modal_header2.default, this).render();
        }
    }]);

    return ModalHeader;
}(_runtime.Widget);

exports.default = ModalHeader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsL01vZGFsSGVhZGVyLmpzIl0sIm5hbWVzIjpbIk1vZGFsSGVhZGVyIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLFc7Ozs7Ozs7Ozs7O2lDQUVPOztBQUVMLG1CQUFRLDBDQUFpQixJQUFqQixDQUFELENBQXlCQyxNQUF6QixFQUFQO0FBRUg7Ozs7OztrQkFJVUQsVyIsImZpbGUiOiJNb2RhbEhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBoZWFkZXIgZnJvbSAnLi93bWwvbW9kYWxfaGVhZGVyLndtbCc7XG5cbi8qKlxuICogTW9kYWxIZWFkZXJcbiAqL1xuY2xhc3MgTW9kYWxIZWFkZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAobmV3IFZpZXcoaGVhZGVyLCB0aGlzKSkucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxIZWFkZXJcbiJdfQ==