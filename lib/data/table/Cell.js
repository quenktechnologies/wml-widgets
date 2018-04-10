"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Cell wraps around a <td> to provide an easier to use api.
 */
var Cell = /** @class */ (function () {
    function Cell(element) {
        this.element = element;
    }
    /**
     * setContent chanages the content of the Cell's <td> element.
     */
    Cell.prototype.setContent = function (r) {
        while (this.element.lastChild)
            this.element.removeChild(this.element.lastChild);
        this.element.appendChild(r.render());
        return this;
    };
    return Cell;
}());
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map