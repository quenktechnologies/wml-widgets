"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var util_1 = require("../../../lib/util");
var app_1 = require("./wml/app");
var pages_1 = require("./pages");
var pages2Pages = function () {
    var tmp = record_1.group(pages_1.pages, function (_, k) { return k.split('_')[0]; });
    for (var sec in tmp)
        if (tmp.hasOwnProperty(sec)) {
            var newSec = {};
            for (var name_1 in tmp[sec])
                if (tmp[sec].hasOwnProperty(name_1)) {
                    newSec[name_1.split('_')[1]] = tmp[sec][name_1];
                }
            tmp[sec] = newSec;
        }
    return tmp;
};
var pages2Modules = function () {
    return record_1.reduce(pages_1.pages, {}, function (p, c, k) {
        p[k.split('_')[1]] = c;
        return p;
    });
};
/**
 * App displaying all the wml widgets.
 */
var App = /** @class */ (function () {
    function App(root) {
        var _this = this;
        this.root = root;
        this.view = new app_1.Main(this);
        this.content = [];
        this.page = '';
        this.pages = pages2Pages();
        this.modules = pages2Modules();
        this.values = {
            id: {
                layout: 'layout'
            }
        };
        /**
         * navigate is called when the user clicks on a
         * navigation link.
         */
        this.navigate = function (_a) {
            var name = _a.name;
            _this.page = name;
            if (_this.modules.hasOwnProperty(name)) {
                _this.content = [_this.modules[name].view.render()];
                _this.view.invalidate();
            }
        };
        /**
         * toggleDrawer
         */
        this.toggleDrawer = function () {
            util_1.getById(_this.view, _this.values.id.layout)
                .map(function (d) { return d.toggle(); });
        };
    }
    /**
     * run the application.
     */
    App.prototype.run = function () {
        var root = this.root;
        while (root.lastChild)
            root.removeChild(root.lastChild);
        root.appendChild(this.view.render());
        var path = window.location.hash.split('#')[1];
        path = path ? path.split('/').join('') : '';
    };
    App.main = function (root) {
        return new App(root);
    };
    return App;
}());
exports.App = App;
App.main(document.getElementById('app')).run();
//# sourceMappingURL=app.js.map