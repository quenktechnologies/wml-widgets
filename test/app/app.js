"use strict";
exports.__esModule = true;
var view_1 = require("./view");
var Application = (function () {
    function Application() {
        this.view = new view_1.Main(this);
    }
    Application.prototype.run = function () {
        window.app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = this.view.findById('drawer');
    };
    Application.main = function () {
        return (new this()).run();
    };
    return Application;
}());
describe('Application', function () {
    it('should render', function () {
        Application.main();
    });
});
