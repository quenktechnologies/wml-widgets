"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("afpl/lib/util");
var app_1 = require("./wml/app");
var navigation_1 = require("./wml/navigation");
var panel_1 = require("./pages/panel");
var list_group_1 = require("./pages/list-group");
var table_1 = require("./pages/table");
var text_field_1 = require("./pages/text-field");
var date_1 = require("./pages/date");
var select_1 = require("./pages/select");
var button_1 = require("./pages/button");
var button_select_1 = require("./pages/button-select");
var checkbox_1 = require("./pages/checkbox");
var switch_1 = require("./pages/switch");
var tabs_1 = require("./pages/tabs");
var stack_1 = require("./pages/stack");
var search_stack_1 = require("./pages/search-stack");
var autocomplete_1 = require("./pages/autocomplete");
var breadcrumbs_1 = require("./pages/breadcrumbs");
var busy_indicator_1 = require("./pages/busy-indicator");
var menu_1 = require("./pages/menu");
var button_group_1 = require("./pages/button-group");
var button_menu_1 = require("./pages/button-menu");
var displayName = function (s) {
    return [s[0].toUpperCase()]
        .concat(s
        .split(s[0])
        .slice(1)
        .join(s[0]))
        .join('')
        .replace(/(\-|_|\s)+(.)?/g, function (_, __, c) { return (c ? c.toUpperCase() : ''); });
};
var flatten = function (links) {
    return util_1.reduce(links, function (flatLinks, current) {
        return util_1.reduce(current, function (p, c, k) {
            return util_1.merge(p, (_a = {}, _a[k] = c, _a));
            var _a;
        }, flatLinks);
    }, {});
};
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        /**
         * page currently displayed.
         */
        this.page = '';
        /**
         * links to the pages.
         */
        this.links = {
            layout: {
                panel: new panel_1.PanelPage(this),
                'list-group': new list_group_1.ListGroupPage(this)
            },
            table: {
                table: new table_1.TablePage(this)
            },
            control: {
                'text-field': new text_field_1.TextFieldPage(this),
                date: new date_1.DatePage(this),
                select: new select_1.SelectPage(this),
                autocomplete: new autocomplete_1.AutocompletePage(this),
                button: new button_1.ButtonPage(this),
                'button-group': new button_group_1.ButtonGroupPage(this),
                'button-select': new button_select_1.ButtonSelectPage(this),
                tabs: new tabs_1.TabsPage(this),
                stack: new stack_1.StackPage(this),
                checkbox: new checkbox_1.CheckboxPage(this),
                'switch': new switch_1.SwitchPage(this),
                'search-stack': new search_stack_1.SearchStackPage(this),
            },
            app: {
                'busy-indicator': new busy_indicator_1.BusyIndicatorPage(this)
            },
            nav: {
                breadcrumbs: new breadcrumbs_1.BreadCrumbsPage(this),
            },
            menu: {
                menu: new menu_1.MenuPage(this),
                'button-menu': new button_menu_1.ButtonMenuPage(this)
            }
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
        /**
         * displayName provides the display name for a the links.
         */
        this.displayName = displayName;
        /**
         * sort an object.
         */
        this.sort = function (o) {
            return Object.keys(o).sort().reduce(function (p, k) { p[k] = o[k]; return p; }, {});
        };
        /**
         * toggleDrawer
         */
        this.toggleDrawer = function () {
            _this
                .view
                .findById(_this.values.id.layout)
                .map(function (d) { return d.toggleDrawer(); });
        };
        /**
         * navigate is called when the user clicks on a
         * navigation link.
         */
        this.navigate = function (_a) {
            var name = _a.name;
            return _this.route(name);
        };
    }
    Object.defineProperty(App.prototype, "pages", {
        /**
         * pages to show the user.
         */
        get: function () { return flatten(this.links); },
        enumerable: true,
        configurable: true
    });
    /**
     * route the main content based on the passed string.
     */
    App.prototype.route = function (name) {
        this.page = name;
        if (this.pages.hasOwnProperty(name)) {
            this.content = this.pages[name].view;
            this.view.invalidate();
            this.navigation.invalidate();
        }
    };
    /**
     * run the application.
     */
    App.prototype.run = function () {
        var root = document.getElementById('app');
        while (root.lastChild)
            root.removeChild(root.lastChild);
        root.appendChild(this.view.render());
        this.layout = this.view.findById(this.values.id.layout);
        var path = window.location.hash.split('#')[1];
        path = path ? path.split('/').join('') : '';
        this.route(path);
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