"use strict";
exports.__esModule = true;
var must = require("must/register");
var Styles = require("wml-widgets-common/Styles");
var view_1 = require("./view");
var count = 0;
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
        //this.modal.put(new CreateDialog(this));
        //      this.view.invalidate();
    };
    Application.prototype.run = function () {
        window.app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = this.view.findById('layout');
    };
    Application.main = function () {
        return new this();
    };
    return Application;
}());
var app;
describe('Application', function () {
    before('should render', function () {
        app = Application.main();
        app.run();
    });
    describe('DrawerLayout', function () {
        describe('DrawerLayout#toggleDrawer()', function () {
            it('should hide and show the drawer', function (done) {
                var layout = app.view.findById('layout');
                var drawer = document.getElementsByClassName(Styles.DRAWER)[0];
                must(drawer.clientWidth).not.be(0);
                layout.toggleDrawer();
                setTimeout(function () {
                    must(drawer.clientWidth).be(0);
                    layout.toggleDrawer();
                    setTimeout(function () {
                        must(drawer.clientWidth).not.be(0);
                        done();
                    }, 1000);
                }, 1000);
            });
        });
    });
});
//# sourceMappingURL=app.js.map