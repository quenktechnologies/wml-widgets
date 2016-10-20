'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal_footer = require('./wml/modal_footer.wml');

var _modal_footer2 = _interopRequireDefault(_modal_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ModalFooter
 */
var ModalFooter = function (_Widget) {
    _inherits(ModalFooter, _Widget);

    function ModalFooter() {
        _classCallCheck(this, ModalFooter);

        return _possibleConstructorReturn(this, (ModalFooter.__proto__ || Object.getPrototypeOf(ModalFooter)).apply(this, arguments));
    }

    _createClass(ModalFooter, [{
        key: 'render',
        value: function render() {

            return new _runtime.View(_modal_footer2.default, this).render();
        }
    }]);

    return ModalFooter;
}(_runtime.Widget);

exports.default = ModalFooter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsL01vZGFsRm9vdGVyLmpzIl0sIm5hbWVzIjpbIk1vZGFsRm9vdGVyIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLFc7Ozs7Ozs7Ozs7O2lDQUVPOztBQUVMLG1CQUFRLDBDQUFpQixJQUFqQixDQUFELENBQXlCQyxNQUF6QixFQUFQO0FBRUg7Ozs7OztrQkFJVUQsVyIsImZpbGUiOiJNb2RhbEZvb3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBmb290ZXIgZnJvbSAnLi93bWwvbW9kYWxfZm9vdGVyLndtbCc7XG5cbi8qKlxuICogTW9kYWxGb290ZXJcbiAqL1xuY2xhc3MgTW9kYWxGb290ZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiAobmV3IFZpZXcoZm9vdGVyLCB0aGlzKSkucmVuZGVyKCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxGb290ZXJcbiJdfQ==