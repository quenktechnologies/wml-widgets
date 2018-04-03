"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("afpl/lib/util");
var app_1 = require("./wml/app");
var navigation_1 = require("./wml/navigation");
var panel_1 = require("./pages/panel");
var list_layout_1 = require("./pages/list-layout");
var table_1 = require("./pages/table");
//import { TextFieldPage } from './pages/text-field';
//import { DatePage } from './pages/date';
//import { SelectPage } from './pages/select';
//import { ButtonPage } from './pages/button';
////import { ButtonSelectPage } from './pages/button-select';
//import { CheckboxPage } from './pages/checkbox';
//import { SwitchPage } from './pages/switch';
var tab_bar_1 = require("./pages/tab-bar");
//import { StackPage } from './pages/stack';
//import { SearchStackPage } from './pages/search-stack';
//import { AutocompletePage } from './pages/autocomplete';
//import { BreadCrumbsPage } from './pages/breadcrumbs';
var activity_indicator_1 = require("./pages/activity-indicator");
//import { MenuPage } from './pages/menu';
//import { ButtonGroupPage } from './pages/button-group';
//import { ButtonMenuPage } from './pages/button-menu';
//import { TabViewPage } from './pages/tab-view';
var horizontal_layout_1 = require("./pages/horizontal-layout");
var nav_1 = require("./pages/nav");
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
                'list-layout': new list_layout_1.ListLayoutPage(this),
                //      'tab-view': new TabViewPage(this)
                'horizontal-layout': new horizontal_layout_1.HorizontalLayoutPage(this)
            },
            data: {
                table: new table_1.TablePage(this)
            },
            control: {
                //     'text-field': new TextFieldPage(this),
                //      date: new DatePage(this),
                //      select: new SelectPage(this),
                //      autocomplete: new AutocompletePage(this),
                //      button: new ButtonPage(this),
                //      'button-group': new ButtonGroupPage(this),
                //   //   'button-select': new ButtonSelectPage(this),
                'tab-bar': new tab_bar_1.TabBarPage(this),
            },
            content: {
                nav: new nav_1.NavPage(this)
            },
            app: {
                'activity-indicator': new activity_indicator_1.ActivityIndicatorPage(this)
            },
            nav: {
            //       breadcrumbs: new BreadCrumbsPage(this),
            },
            menu: {
            //         menu: new MenuPage(this),
            //           'button-menu': new ButtonMenuPage(this)
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
                .map(function (d) { return d.toggle(); });
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