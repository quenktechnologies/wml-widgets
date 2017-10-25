"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var landing = require("./wml/landing");
var views = require("./wml/views");
var app_1 = require("./wml/app");
var navigation_1 = require("./wml/navigation");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        /**
         * page currently displayed.
         */
        this.page = '';
        /**
         * views to show the user.
         */
        this.views = {
            panels: new views.PanelScreen(this)
        };
        /**
         * navigation view
         */
        this.navigation = new navigation_1.Navigation(this);
        /**
         * values used within the template.
         */
        this.values = {
            id: {
                layout: 'layout'
            }
        };
        /**
         * view is the current application view.
         */
        this.view = new app_1.Main(this);
        this.content = new landing.Main(this);
        /**
         * toggleDrawer
         */
        this.toggleDrawer = function () {
            _this
                .view
                .findById(_this.values.id.layout)
                .map(function (d) { return d.toggleDrawer(); });
        };
        this.navigate = function (_a) {
            var name = _a.name;
            _this.page = name;
            if (_this.views.hasOwnProperty(name))
                _this.content = _this.views[name];
            _this.view.invalidate();
            _this.navigation.invalidate();
        };
    }
    /**
     * run the application.
     */
    App.prototype.run = function () {
        var root = document.getElementById('app');
        while (root.lastChild)
            root.removeChild(root.lastChild);
        root.appendChild(this.view.render());
        this.layout = this.view.findById(this.values.id.layout);
    };
    App.main = function () {
        return new App();
    };
    return App;
}());
exports.App = App;
var w = window;
w.app = App.main();
w.app.run();
//# sourceMappingURL=app.js.map