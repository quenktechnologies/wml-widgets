'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DrawerLayout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('@quenk/wml/lib/runtime');

var _Styles = require('common/Styles');

var Styles = _interopRequireWildcard(_Styles);

var _view = require('./wml/view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
var DrawerLayout = exports.DrawerLayout = function (_Widget) {
    _inherits(DrawerLayout, _Widget);

    function DrawerLayout() {
        _classCallCheck(this, DrawerLayout);

        return _possibleConstructorReturn(this, (DrawerLayout.__proto__ || Object.getPrototypeOf(DrawerLayout)).apply(this, arguments));
    }

    _createClass(DrawerLayout, [{
        key: '_getDrawerDOM',
        value: function _getDrawerDOM() {

            return this.view.findById('drawer');
        }

        /**
         * drawerContent provides the content for this layout's Drawer.
         */

    }, {
        key: 'drawerContent',
        value: function drawerContent() {

            return this.children[0];
        }

        /**
         * mainViewContent provides the content for this layout's MainView.
         */

    }, {
        key: 'mainViewContent',
        value: function mainViewContent() {

            return this.children[1];
        }

        /**
         * drawerVisible queries whether the Drawer is visible or not.
         * @returns {Boolean}
         */

    }, {
        key: 'drawerVisible',
        value: function drawerVisible() {

            return !this._getDrawerDOM().classList.contains(Styles.HIDDEN);
        }

        /**
         * hideDrawer hides the drawer.
         */

    }, {
        key: 'hideDrawer',
        value: function hideDrawer() {

            if (this.drawerVisible()) this._getDrawerDOM().classList.add(Styles.HIDDEN);
        }

        /**
         * showDrawer shows the drawer
         */

    }, {
        key: 'showDrawer',
        value: function showDrawer() {

            if (!this.drawerVisible()) this._getDrawerDOM().classList.remove(Styles.HIDDEN);
        }

        /**
         * toggle the visibility of this Drawer
         */

    }, {
        key: 'toggle',
        value: function toggle() {

            this._getDrawerDOM().classList.toggle(Styles.HIDDEN);
        }
    }, {
        key: 'onRendered',
        value: function onRendered() {

            if (window.matchMedia('(max-width: 480px').matches) window.addEventListener('click', this);
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(e) {

            if (e instanceof MouseEvent) {

                var drawer = this.view.findById('drawer');
                var target = e.target;

                if (target !== drawer || !drawer.contains(target)) if (!window.document.contains(drawer)) window.removeEventListener(this);else this.hideDrawer();
            }
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.children.length !== 2) console.warn('DrawerLayout: Expected 2 child widgets got ' + this.children.length + '!');

            return this.view = _runtime.View.render(_view2.default, this);
        }
    }]);

    return DrawerLayout;
}(_runtime.Widget);

exports.default = DrawerLayout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RyYXdlci1sYXlvdXQvRHJhd2VyTGF5b3V0LmpzIl0sIm5hbWVzIjpbIlN0eWxlcyIsIkRyYXdlckxheW91dCIsInZpZXciLCJmaW5kQnlJZCIsImNoaWxkcmVuIiwiX2dldERyYXdlckRPTSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiSElEREVOIiwiZHJhd2VyVmlzaWJsZSIsImFkZCIsInJlbW92ZSIsInRvZ2dsZSIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJNb3VzZUV2ZW50IiwiZHJhd2VyIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGlkZURyYXdlciIsImxlbmd0aCIsImNvbnNvbGUiLCJ3YXJuIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsTTs7QUFDWjs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlhQyxZLFdBQUFBLFk7Ozs7Ozs7Ozs7O3dDQUVPOztBQUVaLG1CQUFPLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQixRQUFuQixDQUFQO0FBRUg7O0FBRUQ7Ozs7Ozt3Q0FHZ0I7O0FBRVosbUJBQU8sS0FBS0MsUUFBTCxDQUFjLENBQWQsQ0FBUDtBQUVIOztBQUVEOzs7Ozs7MENBR2tCOztBQUVkLG1CQUFPLEtBQUtBLFFBQUwsQ0FBYyxDQUFkLENBQVA7QUFFSDs7QUFFRDs7Ozs7Ozt3Q0FJZ0I7O0FBRVosbUJBQU8sQ0FBQyxLQUFLQyxhQUFMLEdBQXFCQyxTQUFyQixDQUErQkMsUUFBL0IsQ0FBd0NQLE9BQU9RLE1BQS9DLENBQVI7QUFFSDs7QUFFRDs7Ozs7O3FDQUdhOztBQUVULGdCQUFJLEtBQUtDLGFBQUwsRUFBSixFQUNJLEtBQUtKLGFBQUwsR0FBcUJDLFNBQXJCLENBQStCSSxHQUEvQixDQUFtQ1YsT0FBT1EsTUFBMUM7QUFFUDs7QUFFRDs7Ozs7O3FDQUdhOztBQUVULGdCQUFJLENBQUMsS0FBS0MsYUFBTCxFQUFMLEVBQ0ksS0FBS0osYUFBTCxHQUFxQkMsU0FBckIsQ0FBK0JLLE1BQS9CLENBQXNDWCxPQUFPUSxNQUE3QztBQUVQOztBQUVEOzs7Ozs7aUNBR1M7O0FBRUwsaUJBQUtILGFBQUwsR0FBcUJDLFNBQXJCLENBQStCTSxNQUEvQixDQUFzQ1osT0FBT1EsTUFBN0M7QUFFSDs7O3FDQUVZOztBQUVULGdCQUFJSyxPQUFPQyxVQUFQLENBQWtCLG1CQUFsQixFQUF1Q0MsT0FBM0MsRUFDSUYsT0FBT0csZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsSUFBakM7QUFFUDs7O29DQUVXQyxDLEVBQUc7O0FBRVgsZ0JBQUlBLGFBQWFDLFVBQWpCLEVBQTZCOztBQUV6QixvQkFBSUMsU0FBUyxLQUFLakIsSUFBTCxDQUFVQyxRQUFWLENBQW1CLFFBQW5CLENBQWI7QUFDQSxvQkFBSWlCLFNBQVNILEVBQUVHLE1BQWY7O0FBRUEsb0JBQUtBLFdBQVdELE1BQVosSUFBd0IsQ0FBQ0EsT0FBT1osUUFBUCxDQUFnQmEsTUFBaEIsQ0FBN0IsRUFDSSxJQUFJLENBQUNQLE9BQU9RLFFBQVAsQ0FBZ0JkLFFBQWhCLENBQXlCWSxNQUF6QixDQUFMLEVBQ0lOLE9BQU9TLG1CQUFQLENBQTJCLElBQTNCLEVBREosS0FHSSxLQUFLQyxVQUFMO0FBRVg7QUFFSjs7O2lDQUVROztBQUVMLGdCQUFJLEtBQUtuQixRQUFMLENBQWNvQixNQUFkLEtBQXlCLENBQTdCLEVBQ0lDLFFBQVFDLElBQVIsaURBQTJELEtBQUt0QixRQUFMLENBQWNvQixNQUF6RTs7QUFFSixtQkFBTyxLQUFLdEIsSUFBTCxHQUFZLGNBQUt5QixNQUFMLGlCQUFrQixJQUFsQixDQUFuQjtBQUVIOzs7Ozs7a0JBSVUxQixZIiwiZmlsZSI6IkRyYXdlckxheW91dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ0BxdWVuay93bWwvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgU3R5bGVzIGZyb20gJ2NvbW1vbi9TdHlsZXMnO1xuaW1wb3J0IHZpZXcgZnJvbSAnLi93bWwvdmlldyc7XG5cbi8qKlxuICogRHJhd2VyTGF5b3V0IHByb3ZpZGVzIGEgdG9wIGxldmVsIGxheW91dCBjb25zaXN0aW5nIG9mIGEgZHJhd2VyIGFuZFxuICogYSBtYWluIGNvbnRlbnQgdmlldy5cbiAqL1xuZXhwb3J0IGNsYXNzIERyYXdlckxheW91dCBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBfZ2V0RHJhd2VyRE9NKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZHJhd2VyQ29udGVudCBwcm92aWRlcyB0aGUgY29udGVudCBmb3IgdGhpcyBsYXlvdXQncyBEcmF3ZXIuXG4gICAgICovXG4gICAgZHJhd2VyQ29udGVudCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG1haW5WaWV3Q29udGVudCBwcm92aWRlcyB0aGUgY29udGVudCBmb3IgdGhpcyBsYXlvdXQncyBNYWluVmlldy5cbiAgICAgKi9cbiAgICBtYWluVmlld0NvbnRlbnQoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMV07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkcmF3ZXJWaXNpYmxlIHF1ZXJpZXMgd2hldGhlciB0aGUgRHJhd2VyIGlzIHZpc2libGUgb3Igbm90LlxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGRyYXdlclZpc2libGUoKSB7XG5cbiAgICAgICAgcmV0dXJuICF0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QuY29udGFpbnMoU3R5bGVzLkhJRERFTik7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoaWRlRHJhd2VyIGhpZGVzIHRoZSBkcmF3ZXIuXG4gICAgICovXG4gICAgaGlkZURyYXdlcigpIHtcblxuICAgICAgICBpZiAodGhpcy5kcmF3ZXJWaXNpYmxlKCkpXG4gICAgICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QuYWRkKFN0eWxlcy5ISURERU4pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2hvd0RyYXdlciBzaG93cyB0aGUgZHJhd2VyXG4gICAgICovXG4gICAgc2hvd0RyYXdlcigpIHtcblxuICAgICAgICBpZiAoIXRoaXMuZHJhd2VyVmlzaWJsZSgpKVxuICAgICAgICAgICAgdGhpcy5fZ2V0RHJhd2VyRE9NKCkuY2xhc3NMaXN0LnJlbW92ZShTdHlsZXMuSElEREVOKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGlzIERyYXdlclxuICAgICAqL1xuICAgIHRvZ2dsZSgpIHtcblxuICAgICAgICB0aGlzLl9nZXREcmF3ZXJET00oKS5jbGFzc0xpc3QudG9nZ2xlKFN0eWxlcy5ISURERU4pO1xuXG4gICAgfVxuXG4gICAgb25SZW5kZXJlZCgpIHtcblxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhtYXgtd2lkdGg6IDQ4MHB4JykubWF0Y2hlcylcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnQoZSkge1xuXG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuXG4gICAgICAgICAgICBsZXQgZHJhd2VyID0gdGhpcy52aWV3LmZpbmRCeUlkKCdkcmF3ZXInKTtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcblxuICAgICAgICAgICAgaWYgKCh0YXJnZXQgIT09IGRyYXdlcikgfHwgKCFkcmF3ZXIuY29udGFpbnModGFyZ2V0KSkpXG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cuZG9jdW1lbnQuY29udGFpbnMoZHJhd2VyKSlcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVEcmF3ZXIoKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAyKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBEcmF3ZXJMYXlvdXQ6IEV4cGVjdGVkIDIgY2hpbGQgd2lkZ2V0cyBnb3QgJHt0aGlzLmNoaWxkcmVuLmxlbmd0aH0hYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldyA9IFZpZXcucmVuZGVyKHZpZXcsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdlckxheW91dFxuIl19