'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (make) {
  return make.node('div', { html: { 'class': make.resolve(Styles, 'LAYOUT') } }, [make.resolve(this, 'children')]);
};

var _Styles = require('common/Styles');

var Styles = _interopRequireWildcard(_Styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2xheW91dC93bWwvdmlldy5qcyJdLCJuYW1lcyI6WyJtYWtlIiwibm9kZSIsImh0bWwiLCJyZXNvbHZlIiwiU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBR2UsVUFBVUEsSUFBVixFQUFnQjtBQUFFLFNBQU9BLEtBQUtDLElBQUwsQ0FBVSxLQUFWLEVBQWdCLEVBQUNDLE1BQUssRUFBQyxTQUFTRixLQUFLRyxPQUFMLENBQWFDLE1BQWIsRUFBcUIsUUFBckIsQ0FBVixFQUFOLEVBQWhCLEVBQWlFLENBQUNKLEtBQUtHLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLFVBQW5CLENBQUQsQ0FBakUsQ0FBUDtBQUE0RyxDOztBQUg3STs7SUFBWUMsTSIsImZpbGUiOiJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU3R5bGVzIGZyb20gJ2NvbW1vbi9TdHlsZXMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChtYWtlKSB7IHJldHVybiBtYWtlLm5vZGUoJ2Rpdicse2h0bWw6eydjbGFzcyc6IG1ha2UucmVzb2x2ZShTdHlsZXMsICdMQVlPVVQnKX19LFttYWtlLnJlc29sdmUodGhpcywgJ2NoaWxkcmVuJyldKTsgfSJdfQ==