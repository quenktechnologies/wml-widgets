"use strict";
exports.__esModule = true;
var view_1 = require("./view");
;
var Application = (function () {
    function Application() {
        this.records = [{ name: 'Jozain Huldum', amount: 32000 }];
        this.view = new view_1.Main(this);
    }
    Application.prototype.toggleDrawer = function () {
        this.view.findById('layout').toggleDrawer();
    };
    Application.prototype.create = function () {
        this.records.push({
            name: prompt('Enter the name'),
            amount: parseFloat(prompt('Enter the amount.'))
        });
        this.view.invalidate();
    };
    Application.prototype.run = function () {
        window.app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = this.view.findById('layout');
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
