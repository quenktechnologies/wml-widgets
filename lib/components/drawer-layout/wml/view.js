'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Styles, 'DRAWER_LAYOUT') } }, [make.node('div', { html: { 'class': make.resolve(Styles, 'DRAWER') }, wml: { 'id': "drawer" } }, [make.node('div', { html: { 'class': make.resolve(Styles, 'DRAWER_CONTENT') } }, [this.drawerContent()])]), make.node('div', { html: { 'class': make.resolve(Styles, 'MAIN_VIEW') } }, [this.mainViewContent()])]);
};

var _Styles = require('common/Styles');

var Styles = _interopRequireWildcard(_Styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2RyYXdlci1sYXlvdXQvd21sL3ZpZXcuanMiXSwibmFtZXMiOlsibWFrZSIsIm5vZGUiLCJodG1sIiwicmVzb2x2ZSIsIlN0eWxlcyIsIndtbCIsImRyYXdlckNvbnRlbnQiLCJtYWluVmlld0NvbnRlbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFHZSxVQUFVQSxJQUFWLEVBQWdCO0FBQUUsU0FBT0EsS0FBS0MsSUFBTCxDQUFVLEtBQVYsRUFBZ0IsRUFBQ0MsTUFBSyxFQUFDLFNBQVNGLEtBQUtHLE9BQUwsQ0FBYUMsTUFBYixFQUFxQixlQUFyQixDQUFWLEVBQU4sRUFBaEIsRUFBd0UsQ0FBQ0osS0FBS0MsSUFBTCxDQUFVLEtBQVYsRUFBZ0IsRUFBQ0MsTUFBSyxFQUFDLFNBQVNGLEtBQUtHLE9BQUwsQ0FBYUMsTUFBYixFQUFxQixRQUFyQixDQUFWLEVBQU4sRUFBZ0RDLEtBQUksRUFBQyxNQUFNLFFBQVAsRUFBcEQsRUFBaEIsRUFBc0YsQ0FBQ0wsS0FBS0MsSUFBTCxDQUFVLEtBQVYsRUFBZ0IsRUFBQ0MsTUFBSyxFQUFDLFNBQVNGLEtBQUtHLE9BQUwsQ0FBYUMsTUFBYixFQUFxQixnQkFBckIsQ0FBVixFQUFOLEVBQWhCLEVBQXlFLENBQUMsS0FBS0UsYUFBTCxFQUFELENBQXpFLENBQUQsQ0FBdEYsQ0FBRCxFQUEyTE4sS0FBS0MsSUFBTCxDQUFVLEtBQVYsRUFBZ0IsRUFBQ0MsTUFBSyxFQUFDLFNBQVNGLEtBQUtHLE9BQUwsQ0FBYUMsTUFBYixFQUFxQixXQUFyQixDQUFWLEVBQU4sRUFBaEIsRUFBb0UsQ0FBQyxLQUFLRyxlQUFMLEVBQUQsQ0FBcEUsQ0FBM0wsQ0FBeEUsQ0FBUDtBQUE0VyxDOztBQUg3WTs7SUFBWUgsTSIsImZpbGUiOiJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU3R5bGVzIGZyb20gJ2NvbW1vbi9TdHlsZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChtYWtlKSB7IHJldHVybiBtYWtlLm5vZGUoJ2Rpdicse2h0bWw6eydjbGFzcyc6IG1ha2UucmVzb2x2ZShTdHlsZXMsICdEUkFXRVJfTEFZT1VUJyl9fSxbbWFrZS5ub2RlKCdkaXYnLHtodG1sOnsnY2xhc3MnOiBtYWtlLnJlc29sdmUoU3R5bGVzLCAnRFJBV0VSJyl9LHdtbDp7J2lkJzogXCJkcmF3ZXJcIn19LFttYWtlLm5vZGUoJ2Rpdicse2h0bWw6eydjbGFzcyc6IG1ha2UucmVzb2x2ZShTdHlsZXMsICdEUkFXRVJfQ09OVEVOVCcpfX0sW3RoaXMuZHJhd2VyQ29udGVudCgpXSldKSxtYWtlLm5vZGUoJ2Rpdicse2h0bWw6eydjbGFzcyc6IG1ha2UucmVzb2x2ZShTdHlsZXMsICdNQUlOX1ZJRVcnKX19LFt0aGlzLm1haW5WaWV3Q29udGVudCgpXSldKTsgfSJdfQ==