(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml = require("@quenk/wml");
var views = require("./wml/link");
var util_1 = require("../../util");
var active_1 = require("../state/active");
///classNames:begin
/**
 * LINK
 */
exports.LINK = 'ww-link';
/**
 * LinkClickedEvent indicates an Link has been clicked.
 */
var LinkClickedEvent = /** @class */ (function () {
    function LinkClickedEvent(name, href) {
        this.name = name;
        this.href = href;
    }
    return LinkClickedEvent;
}());
exports.LinkClickedEvent = LinkClickedEvent;
/**
 * Link generates an <a> element.
 */
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        /**
         * name assigned to this Link.
         */
        _this.name = (_this.attrs.ww && _this.attrs.ww.name) ?
            _this.attrs.ww.name : '';
        /**
         * title assigned to this Link.
         */
        _this.title = (_this.attrs.ww && _this.attrs.ww.title) ?
            _this.attrs.ww.title : '';
        /**
         * href assigned to this Link
         */
        _this.href = (_this.attrs.ww && _this.attrs.ww.href) ?
            _this.attrs.ww.href : '';
        _this.values = {
            a: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                    _this.attrs.ww.disabled : null,
                className: util_1.concat(exports.LINK, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '', (_this.attrs.ww && _this.attrs.ww.active) ?
                    active_1.ACTIVE : ''),
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : null,
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : null,
                href: (_this.attrs.ww && _this.attrs.ww.href) ?
                    _this.attrs.ww.href : '#',
                active: (_this.attrs.ww && _this.attrs.ww.active) ?
                    _this.attrs.ww.active : false,
                //TODO: move to dom lib
                content: (_this.attrs.ww && _this.attrs.ww.text) ?
                    [document.createTextNode(_this.attrs.ww.text)] :
                    _this.children,
                clicked: function (e) {
                    if (_this.attrs.ww) {
                        var _a = _this.attrs.ww, name_1 = _a.name, href = _a.href, onClick = _a.onClick;
                        if (!href)
                            e.preventDefault();
                        if (onClick)
                            onClick(new LinkClickedEvent(name_1, href));
                    }
                }
            }
        };
        return _this;
    }
    /**
      * activate this nav list Item.
      */
    Link.prototype.activate = function () {
        var m = util_1.getById(this.view, this.values.a.id);
        if (m.isJust()) {
            var e = m.get();
            e.classList.remove(active_1.ACTIVE);
            e.classList.add(active_1.ACTIVE);
        }
        return this;
    };
    /**
     * deactivate this nav list item.
     */
    Link.prototype.deactivate = function () {
        var m = util_1.getById(this.view, this.values.a.id);
        if (m.isJust())
            m.get().classList.remove(active_1.ACTIVE);
        return this;
    };
    return Link;
}(wml.Component));
exports.Link = Link;

},{"../../util":28,"../state/active":6,"./wml/link":2,"@quenk/wml":33}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('a', { html: { 'id': __context.values.a.id, 'class': __context.values.a.className, 'href': __context.values.a.href, 'title': __context.values.a.title, 'disabled': __context.values.a.disabled, 'onclick': __context.values.a.clicked }, wml: {} }, (__context.values.a.content).slice());
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/menu-icon");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
///classNames:begin
exports.MENU_ICON = 'ww-menu-icon';
exports.MENU_ICON_DASH = 'ww-menu-icon__dash';
/**
 * MenuIcon provides a css implement icon normally used
 * to toggle a side menu.
 */
var MenuIcon = /** @class */ (function (_super) {
    __extends(MenuIcon, _super);
    function MenuIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                className: util_1.concat(exports.MENU_ICON, (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '')
            },
            dash: {
                id: 'dash',
                class: exports.MENU_ICON_DASH
            }
        };
        return _this;
    }
    return MenuIcon;
}(wml_1.Component));
exports.MenuIcon = MenuIcon;

},{"../../util":28,"./wml/menu-icon":4,"@quenk/wml":33}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('span', { html: { 'id': __context.values.root.id, 'class': __context.values.root.className }, wml: {} }, [
                _this.node('span', { html: { 'class': __context.values.dash.class }, wml: {} }, []),
                _this.node('span', { html: { 'class': __context.values.dash.class }, wml: {} }, []),
                _this.node('span', { html: { 'class': __context.values.dash.class }, wml: {} }, [])
            ]);
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///classNames:begin
/**
 * VERTICAL indicates an element is vertical rendererd.
 */
exports.VERTICAL = '-vertical';
/**
 * PUSHABLE indicates an element supports being pushed
 * and can have styles added to it around the concept.
 */
exports.PUSHABLE = '-pushable';
/**
 * POSITIONED indicates an element is positioned and responds
 * to the left,right etc. properties.
 */
exports.POSITIONED = '-positioned';
/**
 * BLOCK indicates an element should be block displayed.
 */
exports.BLOCK = '-block';
/**
 * CLEARFIX hack.
 */
exports.CLEARFIX = '-clearfix';
///classNames:end

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
///classNames:begin
/**
 * ACTIVE
 */
exports.ACTIVE = '-active';
/**
 * activate helper.
 *
 * Adds the ACTIVE class.
 */
exports.activate = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) {
        e.classList.remove(exports.ACTIVE);
        e.classList.add(exports.ACTIVE);
    });
};
/**
 * deactivate helper.
 *
 * Removes the ACTIVE class.
 */
exports.deactivate = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) { return e.classList.remove(exports.ACTIVE); });
};

},{"../../util":28}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
///classNames:begin
/**
 * HIDDEN means an element should not be visible but not removed
 * from the DOM.
 */
exports.HIDDEN = '-ww-hidden';
/**
 * isHidden helper.
 *
 * Retrieves an HTMLElement by id and checks whether
 * it has the hidden class attached.
 */
exports.isHidden = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        util_1.warnMissing(view, id);
        return true;
    }
    else {
        return m.get().classList.contains(exports.HIDDEN);
    }
};
/**
 * hide helper.
 *
 * Attempts to add HIDDEN to the target elements class name.
 */
exports.hide = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        return util_1.warnMissing(view, id);
    }
    else {
        var e = m.get();
        e.classList.remove(exports.HIDDEN);
        e.classList.add(exports.HIDDEN);
    }
};
/**
 * show helper.
 *
 * Attempts to remove the HIDDEN class name from the target element.
 */
exports.show = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        return util_1.warnMissing(view, id);
    }
    else {
        m.get().classList.remove(exports.HIDDEN);
    }
};
/**
 * toggle helper.
 *
 * Attempts to toggle the HIDDEN class name from the target element
 * classList.
 */
exports.toggle = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        return util_1.warnMissing(view, id);
    }
    else {
        m.get().classList.toggle(exports.HIDDEN);
    }
};

},{"../../util":28}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///classNames:begin
/**
 * DEFAULT style.
 */
exports.DEFAULT = '-default';
/**
 * PRIMARY style.
 */
exports.PRIMARY = '-primary';
/**
 * SUCCESS style.
 */
exports.SUCCESS = '-success';
/**
 * INFO style.
 */
exports.INFO = '-info';
/**
 * WARNING style.
 */
exports.WARNING = '-warning';
/**
 * ERROR style.
 */
exports.ERROR = '-error';
/**
 * OUTLINE style.
 */
exports.OUTLINE = '-outline';
///classNames:end
/**
 * Style enum.
 */
var Style;
(function (Style) {
    Style["Default"] = "default";
    Style["Success"] = "success";
    Style["Info"] = "info";
    Style["Warning"] = "warning";
    Style["Error"] = "error";
})(Style = exports.Style || (exports.Style = {}));
exports.styles = [
    Style.Default,
    Style.Success,
    Style.Info,
    Style.Warning,
    Style.Error
];

},{}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("../../util");
var orientation = require("../../content/orientation");
var __1 = require("../");
var action_bar_1 = require("./wml/action-bar");
///classNames:begin
/**
 * ACTION_BAR class name. for the ActionBar root.
 */
exports.ACTION_BAR = 'ww-action-bar';
/**
 * ACTION_BAR_CONTENT class name.
 */
exports.ACTION_BAR_CONTENT = 'ww-action-bar__content';
/**
 * ActionBar provides a bar across the screen that can be
 * used as a toolbar, navigation menu or something simillar.
 */
var ActionBar = /** @class */ (function (_super) {
    __extends(ActionBar, _super);
    function ActionBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new action_bar_1.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root',
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                class: util.combine([
                    exports.ACTION_BAR,
                    __1.LAYOUT,
                    orientation.POSITIONED
                ])
            },
            content: {
                wml: {
                    id: 'content'
                },
                class: exports.ACTION_BAR_CONTENT
            }
        };
        return _this;
    }
    return ActionBar;
}(__1.AbstractLayout));
exports.ActionBar = ActionBar;

},{"../":15,"../../content/orientation":5,"../../util":28,"./wml/action-bar":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'id': __context.values.root.id, 'class': __context.values.root.class }, wml: { 'id': __context.values.root.wml.id } }, [
                _this.node('div', { html: { 'class': __context.values.content.class }, wml: { 'id': __context.values.content.wml.id } }, (__context.children).slice())
            ]);
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/drawer");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
/**
 * DRAWER_LAYOUT
 */
exports.DRAWER_LAYOUT = 'ww-drawer-layout';
;
/**
 * DrawerLayout provides a 1 column application layout with a drawer that can
 * be shown or hidden upon requests.
 *
 * The drawer takes up most of the screen on mobile and about roughly 1/6 - 1/8
 * on a desktop (not fact checked yet).
 *
 *  Mobile:
 *  +---------------------------------------------------------------------+
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |   <drawer>                                 |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  |                                            |                        |
 *  +---------------------------------------------------------------------+
 *
 *  Desktop:
 *  +---------------------------------------------------------------------+
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |   <drawer>  |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  |             |                                                       |
 *  +---------------------------------------------------------------------+
 */
var DrawerLayout = /** @class */ (function (_super) {
    __extends(DrawerLayout, _super);
    function DrawerLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.DrawerLayout(_this);
        /**
         * values is a hash of values used in the template.
         */
        _this.values = {
            root: {
                wml: {
                    id: 'layout'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.DRAWER_LAYOUT, __1.LAYOUT, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            },
            drawer: {
                wml: {
                    id: 'drawer'
                },
                content: (_this.attrs.ww && _this.attrs.ww.drawerContent) ?
                    _this.attrs.ww.drawerContent : []
            },
            content: {
                id: 'content',
                value: _this.children
            }
        };
        return _this;
    }
    DrawerLayout.prototype.isHidden = function () {
        var m = getDrawer(this);
        if (m.isNothing())
            return true;
        return m.get().isHidden();
    };
    DrawerLayout.prototype.hide = function () {
        var m = getDrawer(this);
        if (m.isJust())
            m.get().hide();
        return this;
    };
    DrawerLayout.prototype.show = function () {
        var m = getDrawer(this);
        if (m.isJust())
            m.get().show();
        return this;
    };
    DrawerLayout.prototype.toggle = function () {
        var m = getDrawer(this);
        if (m.isJust())
            m.get().toggle();
        return this;
    };
    DrawerLayout.prototype.setContent = function (c) {
        this.values.content.value = c;
        this.view.invalidate();
        return this;
    };
    DrawerLayout.prototype.removeContent = function () {
        this.values.content.value = [];
        return this;
    };
    return DrawerLayout;
}(wml_1.Component));
exports.DrawerLayout = DrawerLayout;
var getDrawer = function (dl) {
    var m = dl.view.findById(dl.values.drawer.wml.id);
    if (m.isNothing())
        util_1.warnMissing(dl.view, dl.values.drawer.wml.id);
    return m;
};

},{"../":15,"../../util":28,"./wml/drawer":12,"@quenk/wml":33}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawer_1 = require("../../../menu/drawer");
;
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var DrawerLayout = /** @class */ (function () {
    function DrawerLayout(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'id': __context.values.root.id, 'class': __context.values.root.className }, wml: { 'id': __context.values.root.wml.id } }, [
                _this.widget(drawer_1.Drawer, { html: {}, wml: { 'id': __context.values.drawer.wml.id }, ww: { 'content': __context.values.drawer.content } }, [])
            ].concat((__context.values.content.value)));
        };
    }
    DrawerLayout.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    DrawerLayout.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    DrawerLayout.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    DrawerLayout.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    DrawerLayout.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    DrawerLayout.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    DrawerLayout.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return DrawerLayout;
}());
exports.DrawerLayout = DrawerLayout;

},{"../../../menu/drawer":20,"@quenk/noni/lib/data/maybe":30}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/grid");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
exports.GRID_LAYOUT = 'ww-grid-layout';
exports.GRID_LAYOUT_ROW = 'ww-grid-layout__row';
exports.GRID_LAYOUT_COLUMN = 'ww-grid-layout__column';
;
/**
 * GridLayout
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.GridLayout(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'root',
                },
                className: function () {
                    var c = (_this.attrs.ww && _this.attrs.ww.className) ?
                        _this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT, __1.LAYOUT, c);
                }
            }
        };
        return _this;
    }
    return GridLayout;
}(__1.AbstractLayout));
exports.GridLayout = GridLayout;
/**
 * Row
 */
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'row',
                },
                className: function () {
                    var c = (_this.attrs.ww && _this.attrs.ww.className) ?
                        _this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT_ROW, c);
                }
            }
        };
        return _this;
    }
    return Row;
}(__1.AbstractLayout));
exports.Row = Row;
/**
 * Column
 */
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Column(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'column'
                },
                className: function () {
                    if (_this.attrs.ww != null) {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, _this.attrs.ww.span ?
                            "-span" + _this.attrs.ww.span :
                            '-span12', _this.attrs.ww.offset ?
                            "-offset" + _this.attrs.ww.offset :
                            '', _this.attrs.ww.className);
                    }
                    else {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, '-span12');
                    }
                }
            }
        };
        return _this;
    }
    return Column;
}(__1.AbstractLayout));
exports.Column = Column;

},{"../":15,"../../util":28,"./wml/grid":14}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var GridLayout = /** @class */ (function () {
    function GridLayout(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'id': __context.values.content.id, 'class': __context.values.content.className() }, wml: { 'id': __context.values.content.wml.id } }, (__context.children).slice());
        };
    }
    GridLayout.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    GridLayout.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    GridLayout.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    GridLayout.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    GridLayout.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    GridLayout.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    GridLayout.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return GridLayout;
}());
exports.GridLayout = GridLayout;
;
var Row = /** @class */ (function () {
    function Row(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'id': __context.values.content.id, 'class': __context.values.content.className() }, wml: { 'id': __context.values.content.wml.id } }, (__context.children).slice());
        };
    }
    Row.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Row.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Row.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Row.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Row.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Row.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Row.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Row;
}());
exports.Row = Row;
;
var Column = /** @class */ (function () {
    function Column(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'id': __context.values.content.id, 'class': __context.values.content.className() }, wml: { 'id': __context.values.content.wml.id } }, (__context.children).slice());
        };
    }
    Column.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Column.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Column.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Column.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Column.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Column.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Column.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Column;
}());
exports.Column = Column;

},{"@quenk/noni/lib/data/maybe":30}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml_1 = require("@quenk/wml");
var util_1 = require("../util");
///classNames:begin
exports.LAYOUT = '-layout';
/**
 * AbstractLayout provides an implementation of Layout.
 */
var AbstractLayout = /** @class */ (function (_super) {
    __extends(AbstractLayout, _super);
    function AbstractLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractLayout.prototype.setContent = function (c) {
        exports.doSetContent(this.view, this.values.content.wml.id, c);
        return this;
    };
    AbstractLayout.prototype.removeContent = function () {
        exports.doRemoveContent(this.view, this.values.content.wml.id);
        return this;
    };
    return AbstractLayout;
}(wml_1.Component));
exports.AbstractLayout = AbstractLayout;
/**
 * doSetContent on a Node found in a view.
 */
exports.doSetContent = function (view, id, content) {
    var maybeRoot = view.findById(id);
    if (maybeRoot.isNothing())
        return util_1.warnMissing(view, id);
    var n = maybeRoot.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
    for (var i = 0; i < content.length; i++)
        n.appendChild(content[i]);
};
/**
 * doRemoveContent from a View.
 */
exports.doRemoveContent = function (view, id) {
    var maybeNode = view.findById(id);
    if (maybeNode.isNothing())
        return util_1.warnMissing(view, id);
    var n = maybeNode.get();
    while (n.firstChild)
        n.removeChild(n.firstChild);
};

},{"../util":28,"@quenk/wml":33}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/main");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
exports.MAIN_LAYOUT = 'ww-main-layout';
/**
 * MainLayout provides a container for the main content of an application.
 */
var MainLayout = /** @class */ (function (_super) {
    __extends(MainLayout, _super);
    function MainLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            content: {
                wml: {
                    id: 'main'
                },
                id: (_this.attrs && _this.attrs.ww) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.MAIN_LAYOUT, __1.LAYOUT, (_this.attrs && _this.attrs.ww) ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return MainLayout;
}(__1.AbstractLayout));
exports.MainLayout = MainLayout;

},{"../":15,"../../util":28,"./wml/main":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'id': __context.values.content.id, 'class': __context.values.content.className }, wml: { 'id': __context.values.content.wml.id } }, (__context.children).slice());
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var style = require("../../content/style");
var views = require("./wml/panel");
var util_1 = require("../../util");
var __1 = require("..");
///classNames:begin
/**
 * PANEL wrapper class.
 */
exports.PANEL = 'ww-panel';
/**
 * PANEL_HEADER class name.
 */
exports.PANEL_HEADER = 'ww-panel__header';
/**
 * PANEL_BODY class name.
 */
exports.PANEL_BODY = 'ww-panel__body';
/**
 * PANEL_FOOTER class name.
 */
exports.PANEL_FOOTER = 'ww-panel__footer';
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 */
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        /**
         * values
         */
        _this.values = {
            /**
             * root values.
             */
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'panel',
                },
                className: util_1.concat(exports.PANEL, __1.LAYOUT, (_this.attrs.ww && _this.attrs.ww.style) ?
                    "-" + _this.attrs.ww.style : style.DEFAULT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return Panel;
}(__1.AbstractLayout));
exports.Panel = Panel;
/**
 * PanelHeader
 */
var PanelHeader = /** @class */ (function (_super) {
    __extends(PanelHeader, _super);
    function PanelHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelHeader(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'header'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_HEADER, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelHeader;
}(__1.AbstractLayout));
exports.PanelHeader = PanelHeader;
/**
 * PanelBody
 */
var PanelBody = /** @class */ (function (_super) {
    __extends(PanelBody, _super);
    function PanelBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelBody(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'body'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_BODY, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelBody;
}(__1.AbstractLayout));
exports.PanelBody = PanelBody;
/**
 * PanelFooter
 */
var PanelFooter = /** @class */ (function (_super) {
    __extends(PanelFooter, _super);
    function PanelFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelFooter(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'footer'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_FOOTER, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelFooter;
}(__1.AbstractLayout));
exports.PanelFooter = PanelFooter;

},{"..":15,"../../content/style":8,"../../util":28,"./wml/panel":19}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Panel = /** @class */ (function () {
    function Panel(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'class': __context.values.content.className }, wml: { 'id': __context.values.content.id } }, (__context.children).slice());
        };
    }
    Panel.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Panel.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Panel.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Panel.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Panel.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Panel.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Panel.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Panel;
}());
exports.Panel = Panel;
;
var PanelHeader = /** @class */ (function () {
    function PanelHeader(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'class': __context.values.content.className }, wml: { 'id': __context.values.content.id } }, (__context.children).slice());
        };
    }
    PanelHeader.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    PanelHeader.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    PanelHeader.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PanelHeader.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    PanelHeader.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    PanelHeader.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    PanelHeader.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return PanelHeader;
}());
exports.PanelHeader = PanelHeader;
;
var PanelBody = /** @class */ (function () {
    function PanelBody(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'class': __context.values.content.className }, wml: { 'id': __context.values.content.id } }, (__context.children).slice());
        };
    }
    PanelBody.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    PanelBody.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    PanelBody.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PanelBody.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    PanelBody.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    PanelBody.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    PanelBody.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return PanelBody;
}());
exports.PanelBody = PanelBody;
;
var PanelFooter = /** @class */ (function () {
    function PanelFooter(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'class': __context.values.content.className }, wml: { 'id': __context.values.content.id } }, (__context.children).slice());
        };
    }
    PanelFooter.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    PanelFooter.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    PanelFooter.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PanelFooter.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    PanelFooter.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    PanelFooter.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    PanelFooter.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return PanelFooter;
}());
exports.PanelFooter = PanelFooter;

},{"@quenk/noni/lib/data/maybe":30}],20:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var hidden_1 = require("../../content/state/hidden");
var layout_1 = require("../../layout");
var drawer_1 = require("./wml/drawer");
///classNames:begin
exports.DRAWER = 'ww-drawer';
exports.DRAWER_CONTENT = 'ww-drawer__content';
/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as
 * querying the current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears
 * in-front  of other content. Adjust the respective style variables to change.
 */
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_1.Main(_this);
        _this.values = {
            root: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: exports.DRAWER,
                wml: {
                    id: 'root'
                }
            },
            content: {
                wml: {
                    id: 'content'
                },
                className: exports.DRAWER_CONTENT,
                value: (_this.attrs.ww && _this.attrs.ww.content) ?
                    _this.attrs.ww.content : _this.children
            }
        };
        return _this;
    }
    Drawer.prototype.isHidden = function () {
        return hidden_1.isHidden(this.view, this.values.root.wml.id);
    };
    Drawer.prototype.hide = function () {
        hidden_1.hide(this.view, this.values.root.wml.id);
        return this;
    };
    Drawer.prototype.show = function () {
        hidden_1.show(this.view, this.values.root.wml.id);
        return this;
    };
    Drawer.prototype.toggle = function () {
        hidden_1.toggle(this.view, this.values.root.wml.id);
        return this;
    };
    return Drawer;
}(layout_1.AbstractLayout));
exports.Drawer = Drawer;

},{"../../content/state/hidden":7,"../../layout":15,"./wml/drawer":21}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('div', { html: { 'id': __context.values.root.id, 'class': __context.values.root.className }, wml: { 'id': __context.values.root.wml.id } }, [
                _this.node('div', { html: { 'class': __context.values.content.className }, wml: { 'id': __context.values.content.wml.id } }, (__context.values.content.value).slice())
            ]);
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml = require("@quenk/wml");
var views = require("./wml/header");
var util_1 = require("../../util");
///classNames:begin
/**
 * MENU_HEADER
 */
exports.MENU_HEADER = 'ww-menu-header';
/**
 * MenuHeader can be used to display non-clickable heading text in a nav menu.
 */
var MenuHeader = /** @class */ (function (_super) {
    __extends(MenuHeader, _super);
    function MenuHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            span: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.MENU_HEADER, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                [document.createTextNode(_this.attrs.ww.text)] : _this.children
        };
        return _this;
    }
    return MenuHeader;
}(wml.Component));
exports.MenuHeader = MenuHeader;

},{"../../util":28,"./wml/header":23,"@quenk/wml":33}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('span', { html: { 'id': __context.values.span.id, 'class': __context.values.span.className }, wml: {} }, (__context.values.text).slice());
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml = require("@quenk/wml");
var views = require("./wml/item");
var active_1 = require("../../content/state/active");
var active_2 = require("../../content/state/active");
var util_1 = require("../../util");
///classNames:begin
/**
 * ITEM
 */
exports.ITEM = 'ww-item';
/**
 * ItemClickedEvent is fired when the user clicks on an item in
 * a nav list.
 */
var ItemClickedEvent = /** @class */ (function () {
    function ItemClickedEvent(name) {
        this.name = name;
    }
    return ItemClickedEvent;
}());
exports.ItemClickedEvent = ItemClickedEvent;
/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.ITEM, (_this.attrs.ww && _this.attrs.ww.active) ? active_2.ACTIVE : ''),
                content: {
                    render: function () { return (_this.attrs.ww && _this.attrs.ww.text) ?
                        [document.createTextNode(_this.attrs.ww.text)] : _this.children; }
                }
            }
        };
        return _this;
    }
    Item.prototype.activate = function () {
        active_1.activate(this.view, this.values.root.wml.id);
        return this;
    };
    Item.prototype.deactivate = function () {
        active_1.deactivate(this.view, this.values.root.wml.id);
        return this;
    };
    return Item;
}(wml.Component));
exports.Item = Item;

},{"../../content/state/active":6,"../../util":28,"./wml/item":25,"@quenk/wml":33}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('li', { html: { 'id': __context.values.root.id, 'class': __context.values.root.className }, wml: { 'id': __context.values.root.wml.id } }, (__context.values.root.content.render()).slice());
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],26:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml = require("@quenk/wml");
var util = require("../../util");
var views = require("./wml/nav");
var orientation_1 = require("../../content/orientation");
var item_1 = require("../item");
exports.Item = item_1.Item;
var link_1 = require("../../content/link");
exports.Link = link_1.Link;
///classNames:begin
/**
 * NAV
 */
exports.NAV = 'ww-nav';
/**
 * Nav provides styling for displaying a list of anchor links.
 */
var Nav = /** @class */ (function (_super) {
    __extends(Nav, _super);
    function Nav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util.concat(exports.NAV, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '', (_this.attrs.ww && _this.attrs.ww.vertical) ?
                    orientation_1.VERTICAL : '')
            }
        };
        return _this;
    }
    return Nav;
}(wml.Component));
exports.Nav = Nav;

},{"../../content/link":1,"../../content/orientation":5,"../../util":28,"../item":24,"./wml/nav":27,"@quenk/wml":33}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.node('ul', { html: { 'id': __context.values.root.id, 'class': __context.values.root.className }, wml: {} }, (__context.children).slice());
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"@quenk/noni/lib/data/maybe":30}],28:[function(require,module,exports){
"use strict";
/**
 * This module provides utility functions and constants used
 * through out the wml-widgets module.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getById retreives an WMLElement from a view by its id.
 *
 * If the WMLElement is not found a warning is logged to console.
 */
exports.getById = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        exports.warnMissing(view, id);
    }
    return m;
};
/**
 * warn via console that an element is missing.
 */
exports.warnMissing = function (view, id) {
    console.warn('The view ', view, " does not have an id \"" + id + "\"!");
};
/**
 * combine the members of an array into one string.
 */
exports.combine = function (str, joiner) {
    if (joiner === void 0) { joiner = ' '; }
    return str.filter(function (s) { return ((s != null) || s != ''); }).join(joiner);
};
/**
 * concat joins various strings together to form an html class attribute value.
 *
 * Removes empty strings, null and undefined values.
 */
exports.concat = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return str.filter(function (s) { return ((s == null) || (s == '')) ? false : true; })
        .map(function (s) { return s.trim(); }).join(' ');
};
/**
 * noop
 */
exports.noop = function () { };
/**
 * replaceContent
 */
exports.replaceContent = function (r, node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
    node.appendChild(r.render());
};
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
exports.debounce = function (f, delay) {
    var timer = -1;
    return delay === 0 ? f : function (a) {
        if (timer === -1) {
            timer = window.setTimeout(function () { return f(a); }, delay);
        }
        else {
            clearTimeout(timer);
            timer = window.setTimeout(function () { return f(a); }, delay);
        }
    };
};

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The array module provides helper functions
 * for working with JS arrays.
 */
var record_1 = require("./record");
var math_1 = require("../math");
/**
 * head returns the item at index 0 of an array
 */
exports.head = function (list) { return list[0]; };
/**
 * tail returns the last item in an array
 */
exports.tail = function (list) { return list[list.length - 1]; };
/**
 * empty indicates whether an array is empty or not.
 */
exports.empty = function (list) { return (list.length === 0); };
/**
 * contains indicates whether an element exists in an array.
 */
exports.contains = function (list) { return function (a) { return (list.indexOf(a) > -1); }; };
/**
 * map is a curried version of the Array#map method.
 */
exports.map = function (list) { return function (f) { return list.map(f); }; };
/**
 * concat concatenates an element to an array without destructuring
 * the element if itself is an array.
 */
exports.concat = function (list, a) { return list.concat([a]); };
/**
 * partition an array into two using a partitioning function.
 *
 * The first array contains values that return true and the second false.
 */
exports.partition = function (list) { return function (f) { return exports.empty(list) ?
    [[], []] :
    list.reduce(function (_a, c, i) {
        var yes = _a[0], no = _a[1];
        return (f(c, i, list) ?
            [exports.concat(yes, c), no] :
            [yes, exports.concat(no, c)]);
    }, [[], []]); }; };
/**
 * group the properties of a Record into another Record using a grouping
 * function.
 */
exports.group = function (list) { return function (f) {
    return list.reduce(function (p, c, i) {
        var _a;
        var g = f(c, i, list);
        return record_1.merge(p, (_a = {},
            _a[g] = Array.isArray(p[g]) ?
                exports.concat(p[g], c) : [c],
            _a));
    }, {});
}; };
/**
 * distribute breaks an array into an array of equally (approximate) sized
 * smaller arrays.
 */
exports.distribute = function (list, size) {
    var r = list.reduce(function (p, c, i) {
        return math_1.isMultipleOf(size, i + 1) ?
            [exports.concat(p[0], exports.concat(p[1], c)), []] :
            [p[0], exports.concat(p[1], c)];
    }, [[], []]);
    return (r[1].length === 0) ? r[0] : exports.concat(r[0], r[1]);
};
/**
 * dedupe an array by filtering out elements
 * that appear twice.
 */
exports.dedupe = function (list) {
    return list.filter(function (e, i, l) { return l.indexOf(e) === i; });
};

},{"../math":32,"./record":31}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Nothing represents the absence of a usable value.
 */
var Nothing = /** @class */ (function () {
    function Nothing() {
    }
    /**
     * map simply returns a Nothing<A>
     */
    Nothing.prototype.map = function (_) {
        return new Nothing();
    };
    /**
     * ap allows for a function wrapped in a Just to apply
     * to value present in this Just.
     */
    Nothing.prototype.ap = function (_) {
        return new Nothing();
    };
    /**
     * of wraps a value in a Just.
     */
    Nothing.prototype.of = function (a) {
        return new Just(a);
    };
    /**
     * chain simply returns a Nothing<A>.
     */
    Nothing.prototype.chain = function (_) {
        return new Nothing();
    };
    /**
     * alt will prefer whatever Maybe instance provided.
     */
    Nothing.prototype.alt = function (a) {
        return a;
    };
    /**
     * empty provides a default Maybe.
     * Maybe.empty() = new Nothing()
     */
    Nothing.prototype.empty = function () {
        return new Nothing();
    };
    /**
     * extend returns a Nothing<A>.
     */
    Nothing.prototype.extend = function (_) {
        return new Nothing();
    };
    /**
     * eq returns true if compared to another Nothing instance.
     */
    Nothing.prototype.eq = function (m) {
        return m instanceof Nothing;
    };
    /**
     * orJust converts a Nothing<A> to a Just
     * using the value from the provided function.
     */
    Nothing.prototype.orJust = function (f) {
        return new Just(f());
    };
    /**
     * orElse allows an alternative Maybe value
     * to be provided since this one is Nothing<A>.
     */
    Nothing.prototype.orElse = function (f) {
        return f();
    };
    Nothing.prototype.isNothing = function () {
        return true;
    };
    Nothing.prototype.isJust = function () {
        return false;
    };
    /**
     * get throws an error because there
     * is nothing here to get.
     */
    Nothing.prototype.get = function () {
        throw new TypeError('Cannot get a value from Nothing!');
    };
    return Nothing;
}());
exports.Nothing = Nothing;
/**
 * Just represents the presence of a usable value.
 */
var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
    }
    /**
     * map over the value present in the Just.
     */
    Just.prototype.map = function (f) {
        return new Just(f(this.value));
    };
    /**
     * ap allows for a function wrapped in a Just to apply
     * to value present in this Just.
     */
    Just.prototype.ap = function (mb) {
        var _this = this;
        return mb.map(function (f) { return f(_this.value); });
    };
    /**
     * of wraps a value in a Just.
     */
    Just.prototype.of = function (a) {
        return new Just(a);
    };
    /**
     * chain allows the sequencing of functions that return a Maybe.
     */
    Just.prototype.chain = function (f) {
        return f(this.value);
    };
    /**
     * alt will prefer the first Just encountered (this).
     */
    Just.prototype.alt = function (_) {
        return this;
    };
    /**
     * empty provides a default Maybe.
     * Maybe.empty() = new Nothing()
     */
    Just.prototype.empty = function () {
        return new Nothing();
    };
    /**
     * extend allows sequencing of Maybes with
     * functions that unwrap into non Maybe types.
     */
    Just.prototype.extend = function (f) {
        return new Just(f(this));
    };
    /**
     * eq tests the value of two Justs.
     */
    Just.prototype.eq = function (m) {
        return ((m instanceof Just) && (m.value === this.value));
    };
    /**
     * orJust returns this Just.
     */
    Just.prototype.orJust = function (_) {
        return this;
    };
    /**
     * orElse returns this Just
     */
    Just.prototype.orElse = function (_) {
        return this;
    };
    Just.prototype.isNothing = function () {
        return false;
    };
    Just.prototype.isJust = function () {
        return true;
    };
    /**
     * get the value of this Just.
     */
    Just.prototype.get = function () {
        return this.value;
    };
    return Just;
}());
exports.Just = Just;
/**
 * of
 */
exports.of = function (a) { return new Just(a); };
/**
 * nothing convenience constructor
 */
exports.nothing = function () { return new Nothing(); };
/**
 * just convenience constructor
 */
exports.just = function (a) { return new Just(a); };
/**
 * fromNullable constructs a Maybe from a value that may be null.
 */
exports.fromNullable = function (a) { return a == null ?
    new Nothing() : new Just(a); };
/**
 * fromArray checks an array to see if it's empty
 *
 * Returns [[Nothing]] if it is, [[Just]] otherwise.
 */
exports.fromArray = function (a) {
    return (a.length === 0) ? new Nothing() : new Just(a);
};
/**
 * fromObject uses Object.keys to turn see if an object
 * has any own properties.
 */
exports.fromObject = function (o) {
    return Object.keys(o).length === 0 ? new Nothing() : new Just(o);
};
/**
 * fromString constructs Nothing<A> if the string is empty or Just<A> otherwise.
 */
exports.fromString = function (s) {
    return (s === '') ? new Nothing() : new Just(s);
};
/**
 * fromBoolean constructs Nothing if b is false, Just<A> otherwise
 */
exports.fromBoolean = function (b) {
    return (b === false) ? new Nothing() : new Just(b);
};
/**
 * fromNumber constructs Nothing if n is 0 Just<A> otherwise.
 */
exports.fromNumber = function (n) {
    return (n === 0) ? new Nothing() : new Just(n);
};
/**
 * fromNaN constructs Nothing if a value is not a number or
 * Just<A> otherwise.
 */
exports.fromNaN = function (n) {
    return isNaN(n) ? new Nothing() : new Just(n);
};

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The record module provides functions for treating ES objects as records.
 *
 * Some of the functions provided here are inherently unsafe (tsc will not
 * be able track integrity and may result in runtime errors if not used carefully.
 */
var array_1 = require("../array");
/**
 * isRecord tests whether a value is a record.
 *
 * This is a typeof check that excludes arrays.
 *
 * Unsafe.
 */
exports.isRecord = function (value) {
    return (typeof value === 'object') && (!Array.isArray(value));
};
/**
 * keys produces a list of property names from a Record.
 */
exports.keys = function (value) { return Object.keys(value); };
/**
 * map over a Record's properties producing a new record.
 *
 * The order of keys processed is not guaranteed.
 */
exports.map = function (o, f) {
    return exports.keys(o).reduce(function (p, k) {
        var _a;
        return exports.merge(p, (_a = {}, _a[k] = f(o[k], k, o), _a));
    }, {});
};
/**
 * reduce a Record's keys to a single value.
 *
 * The initial value (accum) must be supplied to avoid errors when
 * there are no properites on the Record.
 * The order of keys processed is not guaranteed.
 */
exports.reduce = function (o, accum, f) {
    return exports.keys(o).reduce(function (p, k) { return f(p, o[k], k); }, accum);
};
/**
 * merge two objects into one.
 *
 * The return value's type is the product of the two types supplied.
 * This function may be unsafe.
 */
exports.merge = function (left, right) { return Object.assign({}, left, right); };
/**
 * merge3 merges 3 records into one.
 */
exports.merge3 = function (r, s, t) { return Object.assign({}, r, s, t); };
/**
 * merge4 merges 4 records into one.
 */
exports.merge4 = function (r, s, t, u) { return Object.assign({}, r, s, t, u); };
/**
 * merge5 merges 5 records into one.
 */
exports.merge5 = function (r, s, t, u, v) {
    return Object.assign({}, r, s, t, u, v);
};
/**
 * rmerge merges 2 records recursively.
 *
 * This function may be unsafe.
 */
exports.rmerge = function (left, right) {
    return exports.reduce(right, left, deepMerge);
};
/**
 * rmerge3 merges 3 records recursively.
 */
exports.rmerge3 = function (r, s, t) {
    return [s, t]
        .reduce(function (p, c) {
        return exports.reduce(c, (p), deepMerge);
    }, r);
};
/**
 * rmerge4 merges 4 records recursively.
 */
exports.rmerge4 = function (r, s, t, u) {
    return [s, t, u]
        .reduce(function (p, c) {
        return exports.reduce(c, (p), deepMerge);
    }, r);
};
/**
 * rmerge5 merges 5 records recursively.
 */
exports.rmerge5 = function (r, s, t, u, v) {
    return [s, t, u, v]
        .reduce(function (p, c) {
        return exports.reduce(c, (p), deepMerge);
    }, r);
};
var deepMerge = function (pre, curr, key) {
    var _a, _b;
    return exports.isRecord(curr) ?
        exports.merge(pre, (_a = {},
            _a[key] = exports.isRecord(pre[key]) ?
                exports.rmerge(pre[key], curr) :
                curr,
            _a)) :
        exports.merge(pre, (_b = {}, _b[key] = curr, _b));
};
/**
 * exclude removes the specified properties from a Record.
 */
exports.exclude = function (o, keys) {
    var list = Array.isArray(keys) ? keys : [keys];
    return exports.reduce(o, {}, function (p, c, k) {
        var _a;
        return list.indexOf(k) > -1 ? p : exports.merge(p, (_a = {}, _a[k] = c, _a));
    });
};
/**
 * partition a Record into two sub-records using a separating function.
 *
 * This function produces an array where the first element is a record
 * of passing values and the second the failing values.
 */
exports.partition = function (r, f) {
    return exports.reduce(r, [{}, {}], function (_a, c, k) {
        var yes = _a[0], no = _a[1];
        var _b, _c;
        return f(c, k, r) ?
            [exports.merge(yes, (_b = {}, _b[k] = c, _b)), no] :
            [yes, exports.merge(no, (_c = {}, _c[k] = c, _c))];
    });
};
/**
 * group the properties of a Record into another Record using a grouping
 * function.
 */
exports.group = function (r, f) {
    return exports.reduce(r, {}, function (p, c, k) {
        var _a, _b, _c;
        var g = f(c, k, r);
        return exports.merge(p, (_a = {},
            _a[g] = exports.isRecord(p[g]) ?
                exports.merge(p[g], (_b = {}, _b[k] = c, _b)) : (_c = {}, _c[k] = c, _c),
            _a));
    });
};
/**
 * values returns a shallow array of the values of a record.
 */
exports.values = function (r) {
    return exports.reduce(r, [], function (p, c) { return array_1.concat(p, c); });
};
/**
 * contains indicates whether a Record has a given key.
 */
exports.contains = function (r, key) {
    return Object.hasOwnProperty.call(r, key);
};
/**
 * clone a Record.
 *
 * Breaks references and deep clones arrays.
 * This function should only be used on Records or objects that
 * are not class instances.
 */
exports.clone = function (r) {
    return exports.reduce(r, {}, function (p, c, k) { p[k] = _clone(c); return p; });
};
var _clone = function (a) {
    if (Array.isArray(a))
        return a.map(_clone);
    else if (typeof a === 'object')
        return exports.clone(a);
    else
        return a;
};

},{"../array":29}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * isMultipleOf tests whether the Integer 'y' is a multiple of x.
 */
exports.isMultipleOf = function (x, y) { return ((y % x) === 0); };

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * Component is an abstract Widget implementation
 * that can be used instead of manually implementing the whole interface.
 */
var Component = /** @class */ (function () {
    /**
     * @param {A} attrs is the attributes this Component excepts.
     * @param {Content[]} children is an array of content for Component.
     */
    function Component(attrs, children) {
        this.attrs = attrs;
        this.children = children;
    }
    Component.prototype.rendered = function () { };
    Component.prototype.removed = function () { };
    Component.prototype.render = function () { return this.view.render(); };
    return Component;
}());
exports.Component = Component;
;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

},{"../../../lib/util":28,"./pages":37,"./wml/app":38,"@quenk/noni/lib/data/record":31}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var panel_1 = require("./wml/panel");
var PanelPage = /** @class */ (function () {
    function PanelPage() {
        this.view = new panel_1.Main(this);
    }
    return PanelPage;
}());
exports.PanelPage = PanelPage;
exports.default = new PanelPage();

},{"./wml/panel":36}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = require("../../../../../../lib/layout/grid");
;
var panel_1 = require("../../../../../../lib/layout/panel");
;
var style_1 = require("../../../../../../lib/content/style");
;
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.widget(grid_1.GridLayout, { html: {}, wml: {} }, exports.$$forIn(style_1.styles, function (style, _$$i, _$$all) {
                return ([
                    _this.widget(grid_1.Row, { html: {}, wml: {} }, [
                        _this.widget(grid_1.Column, { html: {}, wml: {}, ww: { 'span': 4 } }, [
                            _this.widget(panel_1.Panel, { html: {}, wml: {}, ww: { 'style': style } }, [
                                _this.widget(panel_1.PanelBody, { html: {}, wml: {} }, [
                                    document.createTextNode("\n            PanelBody only.\n          ")
                                ])
                            ])
                        ]),
                        _this.widget(grid_1.Column, { html: {}, wml: {}, ww: { 'span': 4 } }, [
                            _this.widget(panel_1.Panel, { html: {}, wml: {}, ww: { 'style': style } }, [
                                _this.widget(panel_1.PanelHeader, { html: {}, wml: {} }, [
                                    document.createTextNode("\n            With PanelHeader\n          ")
                                ]),
                                _this.widget(panel_1.PanelBody, { html: {}, wml: {} }, [
                                    document.createTextNode("\n            Lorem impsum dilium net set.\n          ")
                                ])
                            ])
                        ]),
                        _this.widget(grid_1.Column, { html: {}, wml: {}, ww: { 'span': 4 } }, [
                            _this.widget(panel_1.Panel, { html: {}, wml: {}, ww: { 'style': style } }, [
                                _this.widget(panel_1.PanelHeader, { html: {}, wml: {} }, [
                                    document.createTextNode("With PanelFooter")
                                ]),
                                _this.widget(panel_1.PanelBody, { html: {}, wml: {} }, [
                                    document.createTextNode("Lorem impsum dilium net set.")
                                ]),
                                _this.widget(panel_1.PanelFooter, { html: {}, wml: {} }, [
                                    document.createTextNode("Meh foot.")
                                ])
                            ])
                        ])
                    ])
                ]);
            }, function () { return ([]); }).slice());
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"../../../../../../lib/content/style":8,"../../../../../../lib/layout/grid":13,"../../../../../../lib/layout/panel":18,"@quenk/noni/lib/data/maybe":30}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = {
    layout_panel: require('./page/layout_panel').default,
};

},{"./page/layout_panel":35}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawer_1 = require("../../../../lib/layout/drawer");
;
var action_bar_1 = require("../../../../lib/layout/action-bar");
;
;
var link_1 = require("../../../../lib/content/link");
;
var menu_icon_1 = require("../../../../lib/content/menu-icon");
;
var main_1 = require("../../../../lib/layout/main");
;
var navigation_1 = require("./navigation");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Main = /** @class */ (function () {
    function Main(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.widget(drawer_1.DrawerLayout, { html: {}, wml: { 'id': __context.values.id.layout }, ww: { 'drawerContent': [
                        (new navigation_1.Navigation(__context)).render()
                    ] } }, [
                _this.widget(action_bar_1.ActionBar, { html: {}, wml: {} }, [
                    _this.widget(link_1.Link, { html: {}, wml: {}, ww: { 'onClick': __context.toggleDrawer } }, [
                        _this.widget(menu_icon_1.MenuIcon, { html: {}, wml: {} }, [])
                    ])
                ]),
                _this.widget(main_1.MainLayout, { html: {}, wml: {} }, (__context.content).slice())
            ]);
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;

},{"../../../../lib/content/link":1,"../../../../lib/content/menu-icon":3,"../../../../lib/layout/action-bar":9,"../../../../lib/layout/drawer":11,"../../../../lib/layout/main":16,"./navigation":39,"@quenk/noni/lib/data/maybe":30}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var nav_1 = require("../../../../lib/menu/nav");
;
var item_1 = require("../../../../lib/menu/item");
;
var header_1 = require("../../../../lib/menu/header");
;
var link_1 = require("../../../../lib/content/link");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
exports.$$forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
exports.$$forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
var Navigation = /** @class */ (function () {
    function Navigation(__context) {
        var _this = this;
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return _this.widget(nav_1.Nav, { html: {}, wml: {}, ww: { 'vertical': true } }, [
                _this.widget(item_1.Item, { html: {}, wml: {} }, [
                    _this.widget(link_1.Link, { html: {}, wml: { 'group': "links" }, ww: { 'active': (__context.page === "home"), 'name': "home", 'href': "#", 'onClick': __context.navigate, 'text': "Home" } }, [])
                ])
            ].concat(exports.$$forOf(__context.pages, function (items, section, _$$all) {
                return ([
                    _this.widget(item_1.Item, { html: {}, wml: {} }, [
                        _this.widget(header_1.MenuHeader, { html: {}, wml: {}, ww: { 'text': section } }, []),
                        _this.widget(nav_1.Nav, { html: {}, wml: {}, ww: { 'vertical': true } }, exports.$$forOf(items, function (_, name, _$$all) {
                            return ([
                                _this.widget(item_1.Item, { html: {}, wml: {} }, [
                                    _this.widget(link_1.Link, { html: {}, wml: { 'group': "links" }, ww: { 'name': name, 'href': ("#/" + name), 'onClick': __context.navigate, 'active': (__context.page === name), 'text': name } }, [])
                                ])
                            ]);
                        }, function () { return ([]); }).slice())
                    ])
                ]);
            }, function () { return ([]); })));
        };
    }
    Navigation.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Navigation.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Navigation.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Navigation.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Navigation.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Navigation.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Navigation.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Navigation;
}());
exports.Navigation = Navigation;

},{"../../../../lib/content/link":1,"../../../../lib/menu/header":22,"../../../../lib/menu/item":24,"../../../../lib/menu/nav":26,"@quenk/noni/lib/data/maybe":30}]},{},[34])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY29udGVudC9saW5rL2luZGV4LmpzIiwibGliL2NvbnRlbnQvbGluay93bWwvbGluay5qcyIsImxpYi9jb250ZW50L21lbnUtaWNvbi9pbmRleC5qcyIsImxpYi9jb250ZW50L21lbnUtaWNvbi93bWwvbWVudS1pY29uLmpzIiwibGliL2NvbnRlbnQvb3JpZW50YXRpb24uanMiLCJsaWIvY29udGVudC9zdGF0ZS9hY3RpdmUuanMiLCJsaWIvY29udGVudC9zdGF0ZS9oaWRkZW4uanMiLCJsaWIvY29udGVudC9zdHlsZS9pbmRleC5qcyIsImxpYi9sYXlvdXQvYWN0aW9uLWJhci9pbmRleC5qcyIsImxpYi9sYXlvdXQvYWN0aW9uLWJhci93bWwvYWN0aW9uLWJhci5qcyIsImxpYi9sYXlvdXQvZHJhd2VyL2luZGV4LmpzIiwibGliL2xheW91dC9kcmF3ZXIvd21sL2RyYXdlci5qcyIsImxpYi9sYXlvdXQvZ3JpZC9pbmRleC5qcyIsImxpYi9sYXlvdXQvZ3JpZC93bWwvZ3JpZC5qcyIsImxpYi9sYXlvdXQvaW5kZXguanMiLCJsaWIvbGF5b3V0L21haW4vaW5kZXguanMiLCJsaWIvbGF5b3V0L21haW4vd21sL21haW4uanMiLCJsaWIvbGF5b3V0L3BhbmVsL2luZGV4LmpzIiwibGliL2xheW91dC9wYW5lbC93bWwvcGFuZWwuanMiLCJsaWIvbWVudS9kcmF3ZXIvaW5kZXguanMiLCJsaWIvbWVudS9kcmF3ZXIvd21sL2RyYXdlci5qcyIsImxpYi9tZW51L2hlYWRlci9pbmRleC5qcyIsImxpYi9tZW51L2hlYWRlci93bWwvaGVhZGVyLmpzIiwibGliL21lbnUvaXRlbS9pbmRleC5qcyIsImxpYi9tZW51L2l0ZW0vd21sL2l0ZW0uanMiLCJsaWIvbWVudS9uYXYvaW5kZXguanMiLCJsaWIvbWVudS9uYXYvd21sL25hdi5qcyIsImxpYi91dGlsLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay9ub25pL2xpYi9kYXRhL2FycmF5LmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay9ub25pL2xpYi9kYXRhL21heWJlLmpzIiwibm9kZV9tb2R1bGVzL0BxdWVuay9ub25pL2xpYi9kYXRhL3JlY29yZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvbm9uaS9saWIvbWF0aC5qcyIsIm5vZGVfbW9kdWxlcy9AcXVlbmsvd21sL2xpYi9pbmRleC5qcyIsInRlc3QvYnJvd3Nlci9kZXN0L2FwcC5qcyIsInRlc3QvYnJvd3Nlci9kZXN0L3BhZ2UvbGF5b3V0X3BhbmVsL2luZGV4LmpzIiwidGVzdC9icm93c2VyL2Rlc3QvcGFnZS9sYXlvdXRfcGFuZWwvd21sL3BhbmVsLmpzIiwidGVzdC9icm93c2VyL2Rlc3QvcGFnZXMuanMiLCJ0ZXN0L2Jyb3dzZXIvZGVzdC93bWwvYXBwLmpzIiwidGVzdC9icm93c2VyL2Rlc3Qvd21sL25hdmlnYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25aQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHdtbCA9IHJlcXVpcmUoXCJAcXVlbmsvd21sXCIpO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL2xpbmtcIik7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxcIik7XG52YXIgYWN0aXZlXzEgPSByZXF1aXJlKFwiLi4vc3RhdGUvYWN0aXZlXCIpO1xuLy8vY2xhc3NOYW1lczpiZWdpblxuLyoqXG4gKiBMSU5LXG4gKi9cbmV4cG9ydHMuTElOSyA9ICd3dy1saW5rJztcbi8qKlxuICogTGlua0NsaWNrZWRFdmVudCBpbmRpY2F0ZXMgYW4gTGluayBoYXMgYmVlbiBjbGlja2VkLlxuICovXG52YXIgTGlua0NsaWNrZWRFdmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaW5rQ2xpY2tlZEV2ZW50KG5hbWUsIGhyZWYpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5ocmVmID0gaHJlZjtcbiAgICB9XG4gICAgcmV0dXJuIExpbmtDbGlja2VkRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5MaW5rQ2xpY2tlZEV2ZW50ID0gTGlua0NsaWNrZWRFdmVudDtcbi8qKlxuICogTGluayBnZW5lcmF0ZXMgYW4gPGE+IGVsZW1lbnQuXG4gKi9cbnZhciBMaW5rID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMaW5rLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExpbmsoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLk1haW4oX3RoaXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogbmFtZSBhc3NpZ25lZCB0byB0aGlzIExpbmsuXG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy5uYW1lID0gKF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3Lm5hbWUpID9cbiAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3Lm5hbWUgOiAnJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRpdGxlIGFzc2lnbmVkIHRvIHRoaXMgTGluay5cbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLnRpdGxlID0gKF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LnRpdGxlKSA/XG4gICAgICAgICAgICBfdGhpcy5hdHRycy53dy50aXRsZSA6ICcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogaHJlZiBhc3NpZ25lZCB0byB0aGlzIExpbmtcbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLmhyZWYgPSAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuaHJlZikgP1xuICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuaHJlZiA6ICcnO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgaWQ6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCkgP1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hdHRycy53dy5pZCA6ICcnLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuZGlzYWJsZWQpID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuZGlzYWJsZWQgOiBudWxsLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdXRpbF8xLmNvbmNhdChleHBvcnRzLkxJTkssIChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5jbGFzc05hbWUpID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lIDogJycsIChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5hY3RpdmUpID9cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlXzEuQUNUSVZFIDogJycpLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cudGl0bGUpID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cudGl0bGUgOiBudWxsLFxuICAgICAgICAgICAgICAgIG5hbWU6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5uYW1lKSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3Lm5hbWUgOiBudWxsLFxuICAgICAgICAgICAgICAgIGhyZWY6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5ocmVmKSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmhyZWYgOiAnIycsXG4gICAgICAgICAgICAgICAgYWN0aXZlOiAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuYWN0aXZlKSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmFjdGl2ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC8vVE9ETzogbW92ZSB0byBkb20gbGliXG4gICAgICAgICAgICAgICAgY29udGVudDogKF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LnRleHQpID9cbiAgICAgICAgICAgICAgICAgICAgW2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKF90aGlzLmF0dHJzLnd3LnRleHQpXSA6XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmNoaWxkcmVuLFxuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5hdHRycy53dykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gX3RoaXMuYXR0cnMud3csIG5hbWVfMSA9IF9hLm5hbWUsIGhyZWYgPSBfYS5ocmVmLCBvbkNsaWNrID0gX2Eub25DbGljaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaHJlZilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25DbGljaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrKG5ldyBMaW5rQ2xpY2tlZEV2ZW50KG5hbWVfMSwgaHJlZikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAgKiBhY3RpdmF0ZSB0aGlzIG5hdiBsaXN0IEl0ZW0uXG4gICAgICAqL1xuICAgIExpbmsucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbSA9IHV0aWxfMS5nZXRCeUlkKHRoaXMudmlldywgdGhpcy52YWx1ZXMuYS5pZCk7XG4gICAgICAgIGlmIChtLmlzSnVzdCgpKSB7XG4gICAgICAgICAgICB2YXIgZSA9IG0uZ2V0KCk7XG4gICAgICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoYWN0aXZlXzEuQUNUSVZFKTtcbiAgICAgICAgICAgIGUuY2xhc3NMaXN0LmFkZChhY3RpdmVfMS5BQ1RJVkUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZGVhY3RpdmF0ZSB0aGlzIG5hdiBsaXN0IGl0ZW0uXG4gICAgICovXG4gICAgTGluay5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG0gPSB1dGlsXzEuZ2V0QnlJZCh0aGlzLnZpZXcsIHRoaXMudmFsdWVzLmEuaWQpO1xuICAgICAgICBpZiAobS5pc0p1c3QoKSlcbiAgICAgICAgICAgIG0uZ2V0KCkuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVfMS5BQ1RJVkUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBMaW5rO1xufSh3bWwuQ29tcG9uZW50KSk7XG5leHBvcnRzLkxpbmsgPSBMaW5rO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbWF5YmVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvbm9uaS9saWIvZGF0YS9tYXliZVwiKTtcbmV4cG9ydHMuJCRmb3JJbiA9IGZ1bmN0aW9uIChsaXN0LCBmLCBhbHQpIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICByZXQgPSByZXQuY29uY2F0KGYobGlzdFtpXSwgaSwgbGlzdCkpO1xuICAgIHJldHVybiByZXQubGVuZ3RoID09PSAwID8gYWx0KCkgOiByZXQ7XG59O1xuZXhwb3J0cy4kJGZvck9mID0gZnVuY3Rpb24gKG8sIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbylcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoZigobylba2V5XSwga2V5LCBvKSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubm9kZSgnYScsIHsgaHRtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmEuaWQsICdjbGFzcyc6IF9fY29udGV4dC52YWx1ZXMuYS5jbGFzc05hbWUsICdocmVmJzogX19jb250ZXh0LnZhbHVlcy5hLmhyZWYsICd0aXRsZSc6IF9fY29udGV4dC52YWx1ZXMuYS50aXRsZSwgJ2Rpc2FibGVkJzogX19jb250ZXh0LnZhbHVlcy5hLmRpc2FibGVkLCAnb25jbGljayc6IF9fY29udGV4dC52YWx1ZXMuYS5jbGlja2VkIH0sIHdtbDoge30gfSwgKF9fY29udGV4dC52YWx1ZXMuYS5jb250ZW50KS5zbGljZSgpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTWFpbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGlkID0gYXR0cnMud21sLmlkO1xuICAgICAgICB2YXIgZ3JvdXAgPSBhdHRycy53bWwuZ3JvdXA7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgICAgICB0aGlzLmlkc1tpZF0gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cnNbJ2h0bWwnXSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyc1snaHRtbCddW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvL3ByZXZlbnQgc2V0dGluZyB0aGluZ3MgbGlrZSBkaXNhYmxlZD0nJ1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIiArIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgYykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyBjKTtcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZCh0bik7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgYWRvcHQgY2hpbGQgXCIgKyBjICsgXCIgb2YgdHlwZSBcIiArIHR5cGVvZiBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoZSwgYXR0cnMpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLndpZGdldCA9IGZ1bmN0aW9uIChDLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHcgPSBuZXcgQyhhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKHcsIGF0dHJzKTtcbiAgICAgICAgdGhpcy53aWRnZXRzLnB1c2godyk7XG4gICAgICAgIHJldHVybiB3LnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbU51bGxhYmxlKHRoaXMuaWRzW2lkXSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlHcm91cCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21BcnJheSh0aGlzLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tuYW1lXSA6XG4gICAgICAgICAgICBbXSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ2ludmFsaWRhdGUoKTogJyArICdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3ICB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCB0cmVlKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgP1xuICAgICAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA6XG4gICAgICAgICAgICB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmsuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9tZW51LWljb25cIik7XG52YXIgd21sXzEgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbFwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbFwiKTtcbi8vL2NsYXNzTmFtZXM6YmVnaW5cbmV4cG9ydHMuTUVOVV9JQ09OID0gJ3d3LW1lbnUtaWNvbic7XG5leHBvcnRzLk1FTlVfSUNPTl9EQVNIID0gJ3d3LW1lbnUtaWNvbl9fZGFzaCc7XG4vKipcbiAqIE1lbnVJY29uIHByb3ZpZGVzIGEgY3NzIGltcGxlbWVudCBpY29uIG5vcm1hbGx5IHVzZWRcbiAqIHRvIHRvZ2dsZSBhIHNpZGUgbWVudS5cbiAqL1xudmFyIE1lbnVJY29uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNZW51SWNvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNZW51SWNvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuTWFpbihfdGhpcyk7XG4gICAgICAgIF90aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgICAgICBpZDogKF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmlkKSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmlkIDogJycsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB1dGlsXzEuY29uY2F0KGV4cG9ydHMuTUVOVV9JQ09OLCAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuaWQpID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuaWQgOiAnJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXNoOiB7XG4gICAgICAgICAgICAgICAgaWQ6ICdkYXNoJyxcbiAgICAgICAgICAgICAgICBjbGFzczogZXhwb3J0cy5NRU5VX0lDT05fREFTSFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNZW51SWNvbjtcbn0od21sXzEuQ29tcG9uZW50KSk7XG5leHBvcnRzLk1lbnVJY29uID0gTWVudUljb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdpZCc6IF9fY29udGV4dC52YWx1ZXMucm9vdC5pZCwgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5yb290LmNsYXNzTmFtZSB9LCB3bWw6IHt9IH0sIFtcbiAgICAgICAgICAgICAgICBfdGhpcy5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IF9fY29udGV4dC52YWx1ZXMuZGFzaC5jbGFzcyB9LCB3bWw6IHt9IH0sIFtdKSxcbiAgICAgICAgICAgICAgICBfdGhpcy5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IF9fY29udGV4dC52YWx1ZXMuZGFzaC5jbGFzcyB9LCB3bWw6IHt9IH0sIFtdKSxcbiAgICAgICAgICAgICAgICBfdGhpcy5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdjbGFzcyc6IF9fY29udGV4dC52YWx1ZXMuZGFzaC5jbGFzcyB9LCB3bWw6IHt9IH0sIFtdKVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGUsIGF0dHJzKSB7XG4gICAgICAgIHZhciBpZCA9IGF0dHJzLndtbC5pZDtcbiAgICAgICAgdmFyIGdyb3VwID0gYXR0cnMud21sLmdyb3VwO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgaWQgJ1wiICsgaWQgKyBcIicgZGV0ZWN0ZWQhXCIpO1xuICAgICAgICAgICAgdGhpcy5pZHNbaWRdID0gZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gdGhpcy5ncm91cHNbZ3JvdXBdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24gKHRhZywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJzWydodG1sJ10gPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cnNbJ2h0bWwnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cnNbJ2h0bWwnXVtrZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcmV2ZW50IHNldHRpbmcgdGhpbmdzIGxpa2UgZGlzYWJsZWQ9JydcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0biA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgYyk7XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQodG4pO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4gbm90IGFkb3B0IGNoaWxkIFwiICsgYyArIFwiIG9mIHR5cGUgXCIgKyB0eXBlb2YgYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKGUsIGF0dHJzKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21OdWxsYWJsZSh0aGlzLmlkc1tpZF0pO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5R3JvdXAgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tQXJyYXkodGhpcy5ncm91cHMuaGFzT3duUHJvcGVydHkobmFtZSkgP1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbbmFtZV0gOlxuICAgICAgICAgICAgW10pO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID9cbiAgICAgICAgICAgIHRoaXMuaWRzWydyb290J10gOlxuICAgICAgICAgICAgdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNYWluO1xufSgpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZW51LWljb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLy9jbGFzc05hbWVzOmJlZ2luXG4vKipcbiAqIFZFUlRJQ0FMIGluZGljYXRlcyBhbiBlbGVtZW50IGlzIHZlcnRpY2FsIHJlbmRlcmVyZC5cbiAqL1xuZXhwb3J0cy5WRVJUSUNBTCA9ICctdmVydGljYWwnO1xuLyoqXG4gKiBQVVNIQUJMRSBpbmRpY2F0ZXMgYW4gZWxlbWVudCBzdXBwb3J0cyBiZWluZyBwdXNoZWRcbiAqIGFuZCBjYW4gaGF2ZSBzdHlsZXMgYWRkZWQgdG8gaXQgYXJvdW5kIHRoZSBjb25jZXB0LlxuICovXG5leHBvcnRzLlBVU0hBQkxFID0gJy1wdXNoYWJsZSc7XG4vKipcbiAqIFBPU0lUSU9ORUQgaW5kaWNhdGVzIGFuIGVsZW1lbnQgaXMgcG9zaXRpb25lZCBhbmQgcmVzcG9uZHNcbiAqIHRvIHRoZSBsZWZ0LHJpZ2h0IGV0Yy4gcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0cy5QT1NJVElPTkVEID0gJy1wb3NpdGlvbmVkJztcbi8qKlxuICogQkxPQ0sgaW5kaWNhdGVzIGFuIGVsZW1lbnQgc2hvdWxkIGJlIGJsb2NrIGRpc3BsYXllZC5cbiAqL1xuZXhwb3J0cy5CTE9DSyA9ICctYmxvY2snO1xuLyoqXG4gKiBDTEVBUkZJWCBoYWNrLlxuICovXG5leHBvcnRzLkNMRUFSRklYID0gJy1jbGVhcmZpeCc7XG4vLy9jbGFzc05hbWVzOmVuZFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3JpZW50YXRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxcIik7XG4vLy9jbGFzc05hbWVzOmJlZ2luXG4vKipcbiAqIEFDVElWRVxuICovXG5leHBvcnRzLkFDVElWRSA9ICctYWN0aXZlJztcbi8qKlxuICogYWN0aXZhdGUgaGVscGVyLlxuICpcbiAqIEFkZHMgdGhlIEFDVElWRSBjbGFzcy5cbiAqL1xuZXhwb3J0cy5hY3RpdmF0ZSA9IGZ1bmN0aW9uICh2aWV3LCBpZCkge1xuICAgIHJldHVybiB1dGlsXzEuZ2V0QnlJZCh2aWV3LCBpZClcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLmNsYXNzTGlzdC5yZW1vdmUoZXhwb3J0cy5BQ1RJVkUpO1xuICAgICAgICBlLmNsYXNzTGlzdC5hZGQoZXhwb3J0cy5BQ1RJVkUpO1xuICAgIH0pO1xufTtcbi8qKlxuICogZGVhY3RpdmF0ZSBoZWxwZXIuXG4gKlxuICogUmVtb3ZlcyB0aGUgQUNUSVZFIGNsYXNzLlxuICovXG5leHBvcnRzLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiAodmlldywgaWQpIHtcbiAgICByZXR1cm4gdXRpbF8xLmdldEJ5SWQodmlldywgaWQpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuY2xhc3NMaXN0LnJlbW92ZShleHBvcnRzLkFDVElWRSk7IH0pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGl2ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbFwiKTtcbi8vL2NsYXNzTmFtZXM6YmVnaW5cbi8qKlxuICogSElEREVOIG1lYW5zIGFuIGVsZW1lbnQgc2hvdWxkIG5vdCBiZSB2aXNpYmxlIGJ1dCBub3QgcmVtb3ZlZFxuICogZnJvbSB0aGUgRE9NLlxuICovXG5leHBvcnRzLkhJRERFTiA9ICctd3ctaGlkZGVuJztcbi8qKlxuICogaXNIaWRkZW4gaGVscGVyLlxuICpcbiAqIFJldHJpZXZlcyBhbiBIVE1MRWxlbWVudCBieSBpZCBhbmQgY2hlY2tzIHdoZXRoZXJcbiAqIGl0IGhhcyB0aGUgaGlkZGVuIGNsYXNzIGF0dGFjaGVkLlxuICovXG5leHBvcnRzLmlzSGlkZGVuID0gZnVuY3Rpb24gKHZpZXcsIGlkKSB7XG4gICAgdmFyIG0gPSB2aWV3LmZpbmRCeUlkKGlkKTtcbiAgICBpZiAobS5pc05vdGhpbmcoKSkge1xuICAgICAgICB1dGlsXzEud2Fybk1pc3NpbmcodmlldywgaWQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBtLmdldCgpLmNsYXNzTGlzdC5jb250YWlucyhleHBvcnRzLkhJRERFTik7XG4gICAgfVxufTtcbi8qKlxuICogaGlkZSBoZWxwZXIuXG4gKlxuICogQXR0ZW1wdHMgdG8gYWRkIEhJRERFTiB0byB0aGUgdGFyZ2V0IGVsZW1lbnRzIGNsYXNzIG5hbWUuXG4gKi9cbmV4cG9ydHMuaGlkZSA9IGZ1bmN0aW9uICh2aWV3LCBpZCkge1xuICAgIHZhciBtID0gdmlldy5maW5kQnlJZChpZCk7XG4gICAgaWYgKG0uaXNOb3RoaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxfMS53YXJuTWlzc2luZyh2aWV3LCBpZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZSA9IG0uZ2V0KCk7XG4gICAgICAgIGUuY2xhc3NMaXN0LnJlbW92ZShleHBvcnRzLkhJRERFTik7XG4gICAgICAgIGUuY2xhc3NMaXN0LmFkZChleHBvcnRzLkhJRERFTik7XG4gICAgfVxufTtcbi8qKlxuICogc2hvdyBoZWxwZXIuXG4gKlxuICogQXR0ZW1wdHMgdG8gcmVtb3ZlIHRoZSBISURERU4gY2xhc3MgbmFtZSBmcm9tIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAqL1xuZXhwb3J0cy5zaG93ID0gZnVuY3Rpb24gKHZpZXcsIGlkKSB7XG4gICAgdmFyIG0gPSB2aWV3LmZpbmRCeUlkKGlkKTtcbiAgICBpZiAobS5pc05vdGhpbmcoKSkge1xuICAgICAgICByZXR1cm4gdXRpbF8xLndhcm5NaXNzaW5nKHZpZXcsIGlkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG0uZ2V0KCkuY2xhc3NMaXN0LnJlbW92ZShleHBvcnRzLkhJRERFTik7XG4gICAgfVxufTtcbi8qKlxuICogdG9nZ2xlIGhlbHBlci5cbiAqXG4gKiBBdHRlbXB0cyB0byB0b2dnbGUgdGhlIEhJRERFTiBjbGFzcyBuYW1lIGZyb20gdGhlIHRhcmdldCBlbGVtZW50XG4gKiBjbGFzc0xpc3QuXG4gKi9cbmV4cG9ydHMudG9nZ2xlID0gZnVuY3Rpb24gKHZpZXcsIGlkKSB7XG4gICAgdmFyIG0gPSB2aWV3LmZpbmRCeUlkKGlkKTtcbiAgICBpZiAobS5pc05vdGhpbmcoKSkge1xuICAgICAgICByZXR1cm4gdXRpbF8xLndhcm5NaXNzaW5nKHZpZXcsIGlkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG0uZ2V0KCkuY2xhc3NMaXN0LnRvZ2dsZShleHBvcnRzLkhJRERFTik7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhpZGRlbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vL2NsYXNzTmFtZXM6YmVnaW5cbi8qKlxuICogREVGQVVMVCBzdHlsZS5cbiAqL1xuZXhwb3J0cy5ERUZBVUxUID0gJy1kZWZhdWx0Jztcbi8qKlxuICogUFJJTUFSWSBzdHlsZS5cbiAqL1xuZXhwb3J0cy5QUklNQVJZID0gJy1wcmltYXJ5Jztcbi8qKlxuICogU1VDQ0VTUyBzdHlsZS5cbiAqL1xuZXhwb3J0cy5TVUNDRVNTID0gJy1zdWNjZXNzJztcbi8qKlxuICogSU5GTyBzdHlsZS5cbiAqL1xuZXhwb3J0cy5JTkZPID0gJy1pbmZvJztcbi8qKlxuICogV0FSTklORyBzdHlsZS5cbiAqL1xuZXhwb3J0cy5XQVJOSU5HID0gJy13YXJuaW5nJztcbi8qKlxuICogRVJST1Igc3R5bGUuXG4gKi9cbmV4cG9ydHMuRVJST1IgPSAnLWVycm9yJztcbi8qKlxuICogT1VUTElORSBzdHlsZS5cbiAqL1xuZXhwb3J0cy5PVVRMSU5FID0gJy1vdXRsaW5lJztcbi8vL2NsYXNzTmFtZXM6ZW5kXG4vKipcbiAqIFN0eWxlIGVudW0uXG4gKi9cbnZhciBTdHlsZTtcbihmdW5jdGlvbiAoU3R5bGUpIHtcbiAgICBTdHlsZVtcIkRlZmF1bHRcIl0gPSBcImRlZmF1bHRcIjtcbiAgICBTdHlsZVtcIlN1Y2Nlc3NcIl0gPSBcInN1Y2Nlc3NcIjtcbiAgICBTdHlsZVtcIkluZm9cIl0gPSBcImluZm9cIjtcbiAgICBTdHlsZVtcIldhcm5pbmdcIl0gPSBcIndhcm5pbmdcIjtcbiAgICBTdHlsZVtcIkVycm9yXCJdID0gXCJlcnJvclwiO1xufSkoU3R5bGUgPSBleHBvcnRzLlN0eWxlIHx8IChleHBvcnRzLlN0eWxlID0ge30pKTtcbmV4cG9ydHMuc3R5bGVzID0gW1xuICAgIFN0eWxlLkRlZmF1bHQsXG4gICAgU3R5bGUuU3VjY2VzcyxcbiAgICBTdHlsZS5JbmZvLFxuICAgIFN0eWxlLldhcm5pbmcsXG4gICAgU3R5bGUuRXJyb3Jcbl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vLi4vdXRpbFwiKTtcbnZhciBvcmllbnRhdGlvbiA9IHJlcXVpcmUoXCIuLi8uLi9jb250ZW50L29yaWVudGF0aW9uXCIpO1xudmFyIF9fMSA9IHJlcXVpcmUoXCIuLi9cIik7XG52YXIgYWN0aW9uX2Jhcl8xID0gcmVxdWlyZShcIi4vd21sL2FjdGlvbi1iYXJcIik7XG4vLy9jbGFzc05hbWVzOmJlZ2luXG4vKipcbiAqIEFDVElPTl9CQVIgY2xhc3MgbmFtZS4gZm9yIHRoZSBBY3Rpb25CYXIgcm9vdC5cbiAqL1xuZXhwb3J0cy5BQ1RJT05fQkFSID0gJ3d3LWFjdGlvbi1iYXInO1xuLyoqXG4gKiBBQ1RJT05fQkFSX0NPTlRFTlQgY2xhc3MgbmFtZS5cbiAqL1xuZXhwb3J0cy5BQ1RJT05fQkFSX0NPTlRFTlQgPSAnd3ctYWN0aW9uLWJhcl9fY29udGVudCc7XG4vKipcbiAqIEFjdGlvbkJhciBwcm92aWRlcyBhIGJhciBhY3Jvc3MgdGhlIHNjcmVlbiB0aGF0IGNhbiBiZVxuICogdXNlZCBhcyBhIHRvb2xiYXIsIG5hdmlnYXRpb24gbWVudSBvciBzb21ldGhpbmcgc2ltaWxsYXIuXG4gKi9cbnZhciBBY3Rpb25CYXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFjdGlvbkJhciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBY3Rpb25CYXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGFjdGlvbl9iYXJfMS5NYWluKF90aGlzKTtcbiAgICAgICAgX3RoaXMudmFsdWVzID0ge1xuICAgICAgICAgICAgcm9vdDoge1xuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3Jvb3QnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaWQ6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCkgP1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hdHRycy53dy5pZCA6ICcnLFxuICAgICAgICAgICAgICAgIGNsYXNzOiB1dGlsLmNvbWJpbmUoW1xuICAgICAgICAgICAgICAgICAgICBleHBvcnRzLkFDVElPTl9CQVIsXG4gICAgICAgICAgICAgICAgICAgIF9fMS5MQVlPVVQsXG4gICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uLlBPU0lUSU9ORURcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdjb250ZW50J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xhc3M6IGV4cG9ydHMuQUNUSU9OX0JBUl9DT05URU5UXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFjdGlvbkJhcjtcbn0oX18xLkFic3RyYWN0TGF5b3V0KSk7XG5leHBvcnRzLkFjdGlvbkJhciA9IEFjdGlvbkJhcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1heWJlXzEgPSByZXF1aXJlKFwiQHF1ZW5rL25vbmkvbGliL2RhdGEvbWF5YmVcIik7XG5leHBvcnRzLiQkZm9ySW4gPSBmdW5jdGlvbiAobGlzdCwgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKGxpc3RbaV0sIGksIGxpc3QpKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbmV4cG9ydHMuJCRmb3JPZiA9IGZ1bmN0aW9uIChvLCBmLCBhbHQpIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG8pXG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGtleSkpXG4gICAgICAgICAgICByZXQgPSByZXQuY29uY2F0KGYoKG8pW2tleV0sIGtleSwgbykpO1xuICAgIHJldHVybiByZXQubGVuZ3RoID09PSAwID8gYWx0KCkgOiByZXQ7XG59O1xudmFyIE1haW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbihfX2NvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKF9fdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLnJvb3QuaWQsICdjbGFzcyc6IF9fY29udGV4dC52YWx1ZXMucm9vdC5jbGFzcyB9LCB3bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5yb290LndtbC5pZCB9IH0sIFtcbiAgICAgICAgICAgICAgICBfdGhpcy5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmNsYXNzIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQud21sLmlkIH0gfSwgKF9fY29udGV4dC5jaGlsZHJlbikuc2xpY2UoKSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChlLCBhdHRycykge1xuICAgICAgICB2YXIgaWQgPSBhdHRycy53bWwuaWQ7XG4gICAgICAgIHZhciBncm91cCA9IGF0dHJzLndtbC5ncm91cDtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGlkICdcIiArIGlkICsgXCInIGRldGVjdGVkIVwiKTtcbiAgICAgICAgICAgIHRoaXMuaWRzW2lkXSA9IGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXSA9IHRoaXMuZ3JvdXBzW2dyb3VwXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUud2lkZ2V0ID0gZnVuY3Rpb24gKEMsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgdyA9IG5ldyBDKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIodywgYXR0cnMpO1xuICAgICAgICB0aGlzLndpZGdldHMucHVzaCh3KTtcbiAgICAgICAgcmV0dXJuIHcucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tTnVsbGFibGUodGhpcy5pZHNbaWRdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0cmVlID0gdGhpcy50cmVlO1xuICAgICAgICB2YXIgcGFyZW50ID0gdHJlZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAodHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignaW52YWxpZGF0ZSgpOiAnICsgJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgIHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHRyZWUpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/XG4gICAgICAgICAgICB0aGlzLmlkc1sncm9vdCddIDpcbiAgICAgICAgICAgIHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWN0aW9uLWJhci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHZpZXdzID0gcmVxdWlyZShcIi4vd21sL2RyYXdlclwiKTtcbnZhciB3bWxfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsXCIpO1xudmFyIF9fMSA9IHJlcXVpcmUoXCIuLi9cIik7XG4vLy9jbGFzc05hbWVzOmJlZ2luXG4vKipcbiAqIERSQVdFUl9MQVlPVVRcbiAqL1xuZXhwb3J0cy5EUkFXRVJfTEFZT1VUID0gJ3d3LWRyYXdlci1sYXlvdXQnO1xuO1xuLyoqXG4gKiBEcmF3ZXJMYXlvdXQgcHJvdmlkZXMgYSAxIGNvbHVtbiBhcHBsaWNhdGlvbiBsYXlvdXQgd2l0aCBhIGRyYXdlciB0aGF0IGNhblxuICogYmUgc2hvd24gb3IgaGlkZGVuIHVwb24gcmVxdWVzdHMuXG4gKlxuICogVGhlIGRyYXdlciB0YWtlcyB1cCBtb3N0IG9mIHRoZSBzY3JlZW4gb24gbW9iaWxlIGFuZCBhYm91dCByb3VnaGx5IDEvNiAtIDEvOFxuICogb24gYSBkZXNrdG9wIChub3QgZmFjdCBjaGVja2VkIHlldCkuXG4gKlxuICogIE1vYmlsZTpcbiAqICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICA8ZHJhd2VyPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICpcbiAqICBEZXNrdG9wOlxuICogICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gKiAgfCAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICA8ZHJhd2VyPiAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgfCAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqICB8ICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogIHwgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiAgKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAqL1xudmFyIERyYXdlckxheW91dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRHJhd2VyTGF5b3V0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERyYXdlckxheW91dCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuRHJhd2VyTGF5b3V0KF90aGlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHZhbHVlcyBpcyBhIGhhc2ggb2YgdmFsdWVzIHVzZWQgaW4gdGhlIHRlbXBsYXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMudmFsdWVzID0ge1xuICAgICAgICAgICAgcm9vdDoge1xuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2xheW91dCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlkOiBfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHV0aWxfMS5jb25jYXQoZXhwb3J0cy5EUkFXRVJfTEFZT1VULCBfXzEuTEFZT1VULCAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lKSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSA6ICcnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXdlcjoge1xuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2RyYXdlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5kcmF3ZXJDb250ZW50KSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmRyYXdlckNvbnRlbnQgOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICBpZDogJ2NvbnRlbnQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBfdGhpcy5jaGlsZHJlblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtID0gZ2V0RHJhd2VyKHRoaXMpO1xuICAgICAgICBpZiAobS5pc05vdGhpbmcoKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gbS5nZXQoKS5pc0hpZGRlbigpO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbSA9IGdldERyYXdlcih0aGlzKTtcbiAgICAgICAgaWYgKG0uaXNKdXN0KCkpXG4gICAgICAgICAgICBtLmdldCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBtID0gZ2V0RHJhd2VyKHRoaXMpO1xuICAgICAgICBpZiAobS5pc0p1c3QoKSlcbiAgICAgICAgICAgIG0uZ2V0KCkuc2hvdygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbSA9IGdldERyYXdlcih0aGlzKTtcbiAgICAgICAgaWYgKG0uaXNKdXN0KCkpXG4gICAgICAgICAgICBtLmdldCgpLnRvZ2dsZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHRoaXMudmFsdWVzLmNvbnRlbnQudmFsdWUgPSBjO1xuICAgICAgICB0aGlzLnZpZXcuaW52YWxpZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUucmVtb3ZlQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy52YWx1ZXMuY29udGVudC52YWx1ZSA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBEcmF3ZXJMYXlvdXQ7XG59KHdtbF8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5EcmF3ZXJMYXlvdXQgPSBEcmF3ZXJMYXlvdXQ7XG52YXIgZ2V0RHJhd2VyID0gZnVuY3Rpb24gKGRsKSB7XG4gICAgdmFyIG0gPSBkbC52aWV3LmZpbmRCeUlkKGRsLnZhbHVlcy5kcmF3ZXIud21sLmlkKTtcbiAgICBpZiAobS5pc05vdGhpbmcoKSlcbiAgICAgICAgdXRpbF8xLndhcm5NaXNzaW5nKGRsLnZpZXcsIGRsLnZhbHVlcy5kcmF3ZXIud21sLmlkKTtcbiAgICByZXR1cm4gbTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBkcmF3ZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9tZW51L2RyYXdlclwiKTtcbjtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBEcmF3ZXJMYXlvdXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRHJhd2VyTGF5b3V0KF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubm9kZSgnZGl2JywgeyBodG1sOiB7ICdpZCc6IF9fY29udGV4dC52YWx1ZXMucm9vdC5pZCwgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5yb290LmNsYXNzTmFtZSB9LCB3bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5yb290LndtbC5pZCB9IH0sIFtcbiAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQoZHJhd2VyXzEuRHJhd2VyLCB7IGh0bWw6IHt9LCB3bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5kcmF3ZXIud21sLmlkIH0sIHd3OiB7ICdjb250ZW50JzogX19jb250ZXh0LnZhbHVlcy5kcmF3ZXIuY29udGVudCB9IH0sIFtdKVxuICAgICAgICAgICAgXS5jb25jYXQoKF9fY29udGV4dC52YWx1ZXMuY29udGVudC52YWx1ZSkpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChlLCBhdHRycykge1xuICAgICAgICB2YXIgaWQgPSBhdHRycy53bWwuaWQ7XG4gICAgICAgIHZhciBncm91cCA9IGF0dHJzLndtbC5ncm91cDtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGlkICdcIiArIGlkICsgXCInIGRldGVjdGVkIVwiKTtcbiAgICAgICAgICAgIHRoaXMuaWRzW2lkXSA9IGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXSA9IHRoaXMuZ3JvdXBzW2dyb3VwXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24gKHRhZywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJzWydodG1sJ10gPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cnNbJ2h0bWwnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cnNbJ2h0bWwnXVtrZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcmV2ZW50IHNldHRpbmcgdGhpbmdzIGxpa2UgZGlzYWJsZWQ9JydcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0biA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgYyk7XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQodG4pO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4gbm90IGFkb3B0IGNoaWxkIFwiICsgYyArIFwiIG9mIHR5cGUgXCIgKyB0eXBlb2YgYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKGUsIGF0dHJzKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBEcmF3ZXJMYXlvdXQucHJvdG90eXBlLndpZGdldCA9IGZ1bmN0aW9uIChDLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHcgPSBuZXcgQyhhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKHcsIGF0dHJzKTtcbiAgICAgICAgdGhpcy53aWRnZXRzLnB1c2godyk7XG4gICAgICAgIHJldHVybiB3LnJlbmRlcigpO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tTnVsbGFibGUodGhpcy5pZHNbaWRdKTtcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUuZmluZEJ5R3JvdXAgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tQXJyYXkodGhpcy5ncm91cHMuaGFzT3duUHJvcGVydHkobmFtZSkgP1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbbmFtZV0gOlxuICAgICAgICAgICAgW10pO1xuICAgIH07XG4gICAgRHJhd2VyTGF5b3V0LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ2ludmFsaWRhdGUoKTogJyArICdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3ICB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCB0cmVlKTtcbiAgICB9O1xuICAgIERyYXdlckxheW91dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/XG4gICAgICAgICAgICB0aGlzLmlkc1sncm9vdCddIDpcbiAgICAgICAgICAgIHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gRHJhd2VyTGF5b3V0O1xufSgpKTtcbmV4cG9ydHMuRHJhd2VyTGF5b3V0ID0gRHJhd2VyTGF5b3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvZ3JpZFwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbFwiKTtcbnZhciBfXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLy8vY2xhc3NOYW1lczpiZWdpblxuZXhwb3J0cy5HUklEX0xBWU9VVCA9ICd3dy1ncmlkLWxheW91dCc7XG5leHBvcnRzLkdSSURfTEFZT1VUX1JPVyA9ICd3dy1ncmlkLWxheW91dF9fcm93JztcbmV4cG9ydHMuR1JJRF9MQVlPVVRfQ09MVU1OID0gJ3d3LWdyaWQtbGF5b3V0X19jb2x1bW4nO1xuO1xuLyoqXG4gKiBHcmlkTGF5b3V0XG4gKi9cbnZhciBHcmlkTGF5b3V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhHcmlkTGF5b3V0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEdyaWRMYXlvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkdyaWRMYXlvdXQoX3RoaXMpO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICAgICAgaWQ6IF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmlkLFxuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ3Jvb3QnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gKF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1dGlsXzEuY29uY2F0KGV4cG9ydHMuR1JJRF9MQVlPVVQsIF9fMS5MQVlPVVQsIGMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gR3JpZExheW91dDtcbn0oX18xLkFic3RyYWN0TGF5b3V0KSk7XG5leHBvcnRzLkdyaWRMYXlvdXQgPSBHcmlkTGF5b3V0O1xuLyoqXG4gKiBSb3dcbiAqL1xudmFyIFJvdyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUm93LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJvdygpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuUm93KF90aGlzKTtcbiAgICAgICAgX3RoaXMudmFsdWVzID0ge1xuICAgICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgICAgIGlkOiBfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCxcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdyb3cnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gKF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1dGlsXzEuY29uY2F0KGV4cG9ydHMuR1JJRF9MQVlPVVRfUk9XLCBjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJvdztcbn0oX18xLkFic3RyYWN0TGF5b3V0KSk7XG5leHBvcnRzLlJvdyA9IFJvdztcbi8qKlxuICogQ29sdW1uXG4gKi9cbnZhciBDb2x1bW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbHVtbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2x1bW4oKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLkNvbHVtbihfdGhpcyk7XG4gICAgICAgIF90aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICBpZDogX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuaWQsXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY29sdW1uJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5hdHRycy53dyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbF8xLmNvbmNhdChleHBvcnRzLkdSSURfTEFZT1VUX0NPTFVNTiwgX3RoaXMuYXR0cnMud3cuc3BhbiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCItc3BhblwiICsgX3RoaXMuYXR0cnMud3cuc3BhbiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1zcGFuMTInLCBfdGhpcy5hdHRycy53dy5vZmZzZXQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLW9mZnNldFwiICsgX3RoaXMuYXR0cnMud3cub2Zmc2V0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJywgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1dGlsXzEuY29uY2F0KGV4cG9ydHMuR1JJRF9MQVlPVVRfQ09MVU1OLCAnLXNwYW4xMicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb2x1bW47XG59KF9fMS5BYnN0cmFjdExheW91dCkpO1xuZXhwb3J0cy5Db2x1bW4gPSBDb2x1bW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBHcmlkTGF5b3V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdyaWRMYXlvdXQoX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmlkLCAnY2xhc3MnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQuY2xhc3NOYW1lKCkgfSwgd21sOiB7ICdpZCc6IF9fY29udGV4dC52YWx1ZXMuY29udGVudC53bWwuaWQgfSB9LCAoX19jb250ZXh0LmNoaWxkcmVuKS5zbGljZSgpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgR3JpZExheW91dC5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGlkID0gYXR0cnMud21sLmlkO1xuICAgICAgICB2YXIgZ3JvdXAgPSBhdHRycy53bWwuZ3JvdXA7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgICAgICB0aGlzLmlkc1tpZF0gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIEdyaWRMYXlvdXQucHJvdG90eXBlLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cnNbJ2h0bWwnXSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyc1snaHRtbCddW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvL3ByZXZlbnQgc2V0dGluZyB0aGluZ3MgbGlrZSBkaXNhYmxlZD0nJ1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIiArIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgYykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyBjKTtcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZCh0bik7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgYWRvcHQgY2hpbGQgXCIgKyBjICsgXCIgb2YgdHlwZSBcIiArIHR5cGVvZiBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoZSwgYXR0cnMpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIEdyaWRMYXlvdXQucHJvdG90eXBlLndpZGdldCA9IGZ1bmN0aW9uIChDLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHcgPSBuZXcgQyhhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKHcsIGF0dHJzKTtcbiAgICAgICAgdGhpcy53aWRnZXRzLnB1c2godyk7XG4gICAgICAgIHJldHVybiB3LnJlbmRlcigpO1xuICAgIH07XG4gICAgR3JpZExheW91dC5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbU51bGxhYmxlKHRoaXMuaWRzW2lkXSk7XG4gICAgfTtcbiAgICBHcmlkTGF5b3V0LnByb3RvdHlwZS5maW5kQnlHcm91cCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21BcnJheSh0aGlzLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tuYW1lXSA6XG4gICAgICAgICAgICBbXSk7XG4gICAgfTtcbiAgICBHcmlkTGF5b3V0LnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ2ludmFsaWRhdGUoKTogJyArICdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3ICB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCB0cmVlKTtcbiAgICB9O1xuICAgIEdyaWRMYXlvdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgP1xuICAgICAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA6XG4gICAgICAgICAgICB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIEdyaWRMYXlvdXQ7XG59KCkpO1xuZXhwb3J0cy5HcmlkTGF5b3V0ID0gR3JpZExheW91dDtcbjtcbnZhciBSb3cgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUm93KF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubm9kZSgnZGl2JywgeyBodG1sOiB7ICdpZCc6IF9fY29udGV4dC52YWx1ZXMuY29udGVudC5pZCwgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmNsYXNzTmFtZSgpIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQud21sLmlkIH0gfSwgKF9fY29udGV4dC5jaGlsZHJlbikuc2xpY2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFJvdy5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGlkID0gYXR0cnMud21sLmlkO1xuICAgICAgICB2YXIgZ3JvdXAgPSBhdHRycy53bWwuZ3JvdXA7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgICAgICB0aGlzLmlkc1tpZF0gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIFJvdy5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgUm93LnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIFJvdy5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbU51bGxhYmxlKHRoaXMuaWRzW2lkXSk7XG4gICAgfTtcbiAgICBSb3cucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIFJvdy5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBSb3cucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgP1xuICAgICAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA6XG4gICAgICAgICAgICB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIFJvdztcbn0oKSk7XG5leHBvcnRzLlJvdyA9IFJvdztcbjtcbnZhciBDb2x1bW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29sdW1uKF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubm9kZSgnZGl2JywgeyBodG1sOiB7ICdpZCc6IF9fY29udGV4dC52YWx1ZXMuY29udGVudC5pZCwgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmNsYXNzTmFtZSgpIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQud21sLmlkIH0gfSwgKF9fY29udGV4dC5jaGlsZHJlbikuc2xpY2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIENvbHVtbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGlkID0gYXR0cnMud21sLmlkO1xuICAgICAgICB2YXIgZ3JvdXAgPSBhdHRycy53bWwuZ3JvdXA7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgICAgICB0aGlzLmlkc1tpZF0gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIENvbHVtbi5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgQ29sdW1uLnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIENvbHVtbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbU51bGxhYmxlKHRoaXMuaWRzW2lkXSk7XG4gICAgfTtcbiAgICBDb2x1bW4ucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIENvbHVtbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBDb2x1bW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgP1xuICAgICAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA6XG4gICAgICAgICAgICB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIENvbHVtbjtcbn0oKSk7XG5leHBvcnRzLkNvbHVtbiA9IENvbHVtbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdyaWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWxfMSA9IHJlcXVpcmUoXCJAcXVlbmsvd21sXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuLy8vY2xhc3NOYW1lczpiZWdpblxuZXhwb3J0cy5MQVlPVVQgPSAnLWxheW91dCc7XG4vKipcbiAqIEFic3RyYWN0TGF5b3V0IHByb3ZpZGVzIGFuIGltcGxlbWVudGF0aW9uIG9mIExheW91dC5cbiAqL1xudmFyIEFic3RyYWN0TGF5b3V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBYnN0cmFjdExheW91dCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBYnN0cmFjdExheW91dCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBBYnN0cmFjdExheW91dC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGV4cG9ydHMuZG9TZXRDb250ZW50KHRoaXMudmlldywgdGhpcy52YWx1ZXMuY29udGVudC53bWwuaWQsIGMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFic3RyYWN0TGF5b3V0LnByb3RvdHlwZS5yZW1vdmVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBleHBvcnRzLmRvUmVtb3ZlQ29udGVudCh0aGlzLnZpZXcsIHRoaXMudmFsdWVzLmNvbnRlbnQud21sLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gQWJzdHJhY3RMYXlvdXQ7XG59KHdtbF8xLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5BYnN0cmFjdExheW91dCA9IEFic3RyYWN0TGF5b3V0O1xuLyoqXG4gKiBkb1NldENvbnRlbnQgb24gYSBOb2RlIGZvdW5kIGluIGEgdmlldy5cbiAqL1xuZXhwb3J0cy5kb1NldENvbnRlbnQgPSBmdW5jdGlvbiAodmlldywgaWQsIGNvbnRlbnQpIHtcbiAgICB2YXIgbWF5YmVSb290ID0gdmlldy5maW5kQnlJZChpZCk7XG4gICAgaWYgKG1heWJlUm9vdC5pc05vdGhpbmcoKSlcbiAgICAgICAgcmV0dXJuIHV0aWxfMS53YXJuTWlzc2luZyh2aWV3LCBpZCk7XG4gICAgdmFyIG4gPSBtYXliZVJvb3QuZ2V0KCk7XG4gICAgd2hpbGUgKG4uZmlyc3RDaGlsZClcbiAgICAgICAgbi5yZW1vdmVDaGlsZChuLmZpcnN0Q2hpbGQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudC5sZW5ndGg7IGkrKylcbiAgICAgICAgbi5hcHBlbmRDaGlsZChjb250ZW50W2ldKTtcbn07XG4vKipcbiAqIGRvUmVtb3ZlQ29udGVudCBmcm9tIGEgVmlldy5cbiAqL1xuZXhwb3J0cy5kb1JlbW92ZUNvbnRlbnQgPSBmdW5jdGlvbiAodmlldywgaWQpIHtcbiAgICB2YXIgbWF5YmVOb2RlID0gdmlldy5maW5kQnlJZChpZCk7XG4gICAgaWYgKG1heWJlTm9kZS5pc05vdGhpbmcoKSlcbiAgICAgICAgcmV0dXJuIHV0aWxfMS53YXJuTWlzc2luZyh2aWV3LCBpZCk7XG4gICAgdmFyIG4gPSBtYXliZU5vZGUuZ2V0KCk7XG4gICAgd2hpbGUgKG4uZmlyc3RDaGlsZClcbiAgICAgICAgbi5yZW1vdmVDaGlsZChuLmZpcnN0Q2hpbGQpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvbWFpblwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbFwiKTtcbnZhciBfXzEgPSByZXF1aXJlKFwiLi4vXCIpO1xuLy8vY2xhc3NOYW1lczpiZWdpblxuZXhwb3J0cy5NQUlOX0xBWU9VVCA9ICd3dy1tYWluLWxheW91dCc7XG4vKipcbiAqIE1haW5MYXlvdXQgcHJvdmlkZXMgYSBjb250YWluZXIgZm9yIHRoZSBtYWluIGNvbnRlbnQgb2YgYW4gYXBwbGljYXRpb24uXG4gKi9cbnZhciBNYWluTGF5b3V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWluTGF5b3V0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haW5MYXlvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLk1haW4oX3RoaXMpO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbWFpbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlkOiAoX3RoaXMuYXR0cnMgJiYgX3RoaXMuYXR0cnMud3cpID8gX3RoaXMuYXR0cnMud3cuaWQgOiAnJyxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHV0aWxfMS5jb25jYXQoZXhwb3J0cy5NQUlOX0xBWU9VVCwgX18xLkxBWU9VVCwgKF90aGlzLmF0dHJzICYmIF90aGlzLmF0dHJzLnd3KSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSA6ICcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBNYWluTGF5b3V0O1xufShfXzEuQWJzdHJhY3RMYXlvdXQpKTtcbmV4cG9ydHMuTWFpbkxheW91dCA9IE1haW5MYXlvdXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmlkLCAnY2xhc3MnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQuY2xhc3NOYW1lIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQud21sLmlkIH0gfSwgKF9fY29udGV4dC5jaGlsZHJlbikuc2xpY2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGUsIGF0dHJzKSB7XG4gICAgICAgIHZhciBpZCA9IGF0dHJzLndtbC5pZDtcbiAgICAgICAgdmFyIGdyb3VwID0gYXR0cnMud21sLmdyb3VwO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgaWQgJ1wiICsgaWQgKyBcIicgZGV0ZWN0ZWQhXCIpO1xuICAgICAgICAgICAgdGhpcy5pZHNbaWRdID0gZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gdGhpcy5ncm91cHNbZ3JvdXBdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24gKHRhZywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJzWydodG1sJ10gPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cnNbJ2h0bWwnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cnNbJ2h0bWwnXVtrZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcmV2ZW50IHNldHRpbmcgdGhpbmdzIGxpa2UgZGlzYWJsZWQ9JydcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0biA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgYyk7XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQodG4pO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4gbm90IGFkb3B0IGNoaWxkIFwiICsgYyArIFwiIG9mIHR5cGUgXCIgKyB0eXBlb2YgYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKGUsIGF0dHJzKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21OdWxsYWJsZSh0aGlzLmlkc1tpZF0pO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5R3JvdXAgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tQXJyYXkodGhpcy5ncm91cHMuaGFzT3duUHJvcGVydHkobmFtZSkgP1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbbmFtZV0gOlxuICAgICAgICAgICAgW10pO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID9cbiAgICAgICAgICAgIHRoaXMuaWRzWydyb290J10gOlxuICAgICAgICAgICAgdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNYWluO1xufSgpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWluLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc3R5bGUgPSByZXF1aXJlKFwiLi4vLi4vY29udGVudC9zdHlsZVwiKTtcbnZhciB2aWV3cyA9IHJlcXVpcmUoXCIuL3dtbC9wYW5lbFwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbFwiKTtcbnZhciBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG4vLy9jbGFzc05hbWVzOmJlZ2luXG4vKipcbiAqIFBBTkVMIHdyYXBwZXIgY2xhc3MuXG4gKi9cbmV4cG9ydHMuUEFORUwgPSAnd3ctcGFuZWwnO1xuLyoqXG4gKiBQQU5FTF9IRUFERVIgY2xhc3MgbmFtZS5cbiAqL1xuZXhwb3J0cy5QQU5FTF9IRUFERVIgPSAnd3ctcGFuZWxfX2hlYWRlcic7XG4vKipcbiAqIFBBTkVMX0JPRFkgY2xhc3MgbmFtZS5cbiAqL1xuZXhwb3J0cy5QQU5FTF9CT0RZID0gJ3d3LXBhbmVsX19ib2R5Jztcbi8qKlxuICogUEFORUxfRk9PVEVSIGNsYXNzIG5hbWUuXG4gKi9cbmV4cG9ydHMuUEFORUxfRk9PVEVSID0gJ3d3LXBhbmVsX19mb290ZXInO1xuLyoqXG4gKiBQYW5lbCBwcm92aWRlcyBhIHJlY3Rhbmd1bGFyIGNvbnRhaW5lciBmb3IgdmlzdWFsbHkgc2VwZXJhdGluZ1xuICogY29udGVudCBieSBjb250ZXh0LlxuICovXG52YXIgUGFuZWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBhbmVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFBhbmVsKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmlldyA9IG5ldyB2aWV3cy5QYW5lbChfdGhpcyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB2YWx1ZXNcbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogcm9vdCB2YWx1ZXMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICBpZDogX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuaWQsXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAncGFuZWwnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB1dGlsXzEuY29uY2F0KGV4cG9ydHMuUEFORUwsIF9fMS5MQVlPVVQsIChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5zdHlsZSkgP1xuICAgICAgICAgICAgICAgICAgICBcIi1cIiArIF90aGlzLmF0dHJzLnd3LnN0eWxlIDogc3R5bGUuREVGQVVMVCwgX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lIDogJycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFBhbmVsO1xufShfXzEuQWJzdHJhY3RMYXlvdXQpKTtcbmV4cG9ydHMuUGFuZWwgPSBQYW5lbDtcbi8qKlxuICogUGFuZWxIZWFkZXJcbiAqL1xudmFyIFBhbmVsSGVhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYW5lbEhlYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbEhlYWRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuUGFuZWxIZWFkZXIoX3RoaXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogdmFsdWVzXG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnaGVhZGVyJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaWQ6IF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmlkLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdXRpbF8xLmNvbmNhdChleHBvcnRzLlBBTkVMX0hFQURFUiwgX18xLkxBWU9VVCwgX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lIDogJycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFBhbmVsSGVhZGVyO1xufShfXzEuQWJzdHJhY3RMYXlvdXQpKTtcbmV4cG9ydHMuUGFuZWxIZWFkZXIgPSBQYW5lbEhlYWRlcjtcbi8qKlxuICogUGFuZWxCb2R5XG4gKi9cbnZhciBQYW5lbEJvZHkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBhbmVsQm9keSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYW5lbEJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlBhbmVsQm9keShfdGhpcyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB2YWx1ZXNcbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdib2R5J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaWQ6IF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmlkLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdXRpbF8xLmNvbmNhdChleHBvcnRzLlBBTkVMX0JPRFksIF9fMS5MQVlPVVQsIF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSA6ICcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBQYW5lbEJvZHk7XG59KF9fMS5BYnN0cmFjdExheW91dCkpO1xuZXhwb3J0cy5QYW5lbEJvZHkgPSBQYW5lbEJvZHk7XG4vKipcbiAqIFBhbmVsRm9vdGVyXG4gKi9cbnZhciBQYW5lbEZvb3RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUGFuZWxGb290ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGFuZWxGb290ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLlBhbmVsRm9vdGVyKF90aGlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHZhbHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMudmFsdWVzID0ge1xuICAgICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2Zvb3RlcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlkOiBfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHV0aWxfMS5jb25jYXQoZXhwb3J0cy5QQU5FTF9GT09URVIsIF9fMS5MQVlPVVQsIF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSA6ICcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBQYW5lbEZvb3Rlcjtcbn0oX18xLkFic3RyYWN0TGF5b3V0KSk7XG5leHBvcnRzLlBhbmVsRm9vdGVyID0gUGFuZWxGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBQYW5lbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbChfX2NvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKF9fdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQuY2xhc3NOYW1lIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQuaWQgfSB9LCAoX19jb250ZXh0LmNoaWxkcmVuKS5zbGljZSgpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWwucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGUsIGF0dHJzKSB7XG4gICAgICAgIHZhciBpZCA9IGF0dHJzLndtbC5pZDtcbiAgICAgICAgdmFyIGdyb3VwID0gYXR0cnMud21sLmdyb3VwO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgaWQgJ1wiICsgaWQgKyBcIicgZGV0ZWN0ZWQhXCIpO1xuICAgICAgICAgICAgdGhpcy5pZHNbaWRdID0gZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gdGhpcy5ncm91cHNbZ3JvdXBdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBQYW5lbC5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgUGFuZWwucHJvdG90eXBlLndpZGdldCA9IGZ1bmN0aW9uIChDLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHcgPSBuZXcgQyhhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKHcsIGF0dHJzKTtcbiAgICAgICAgdGhpcy53aWRnZXRzLnB1c2godyk7XG4gICAgICAgIHJldHVybiB3LnJlbmRlcigpO1xuICAgIH07XG4gICAgUGFuZWwucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21OdWxsYWJsZSh0aGlzLmlkc1tpZF0pO1xuICAgIH07XG4gICAgUGFuZWwucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIFBhbmVsLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ2ludmFsaWRhdGUoKTogJyArICdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3ICB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCB0cmVlKTtcbiAgICB9O1xuICAgIFBhbmVsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID9cbiAgICAgICAgICAgIHRoaXMuaWRzWydyb290J10gOlxuICAgICAgICAgICAgdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbDtcbn0oKSk7XG5leHBvcnRzLlBhbmVsID0gUGFuZWw7XG47XG52YXIgUGFuZWxIZWFkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGFuZWxIZWFkZXIoX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmNsYXNzTmFtZSB9LCB3bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmlkIH0gfSwgKF9fY29udGV4dC5jaGlsZHJlbikuc2xpY2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBhbmVsSGVhZGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChlLCBhdHRycykge1xuICAgICAgICB2YXIgaWQgPSBhdHRycy53bWwuaWQ7XG4gICAgICAgIHZhciBncm91cCA9IGF0dHJzLndtbC5ncm91cDtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGlkICdcIiArIGlkICsgXCInIGRldGVjdGVkIVwiKTtcbiAgICAgICAgICAgIHRoaXMuaWRzW2lkXSA9IGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXSA9IHRoaXMuZ3JvdXBzW2dyb3VwXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgUGFuZWxIZWFkZXIucHJvdG90eXBlLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cnNbJ2h0bWwnXSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyc1snaHRtbCddW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvL3ByZXZlbnQgc2V0dGluZyB0aGluZ3MgbGlrZSBkaXNhYmxlZD0nJ1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIiArIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgYykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyBjKTtcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZCh0bik7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgYWRvcHQgY2hpbGQgXCIgKyBjICsgXCIgb2YgdHlwZSBcIiArIHR5cGVvZiBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoZSwgYXR0cnMpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIFBhbmVsSGVhZGVyLnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIFBhbmVsSGVhZGVyLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tTnVsbGFibGUodGhpcy5pZHNbaWRdKTtcbiAgICB9O1xuICAgIFBhbmVsSGVhZGVyLnByb3RvdHlwZS5maW5kQnlHcm91cCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21BcnJheSh0aGlzLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tuYW1lXSA6XG4gICAgICAgICAgICBbXSk7XG4gICAgfTtcbiAgICBQYW5lbEhlYWRlci5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBQYW5lbEhlYWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/XG4gICAgICAgICAgICB0aGlzLmlkc1sncm9vdCddIDpcbiAgICAgICAgICAgIHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gUGFuZWxIZWFkZXI7XG59KCkpO1xuZXhwb3J0cy5QYW5lbEhlYWRlciA9IFBhbmVsSGVhZGVyO1xuO1xudmFyIFBhbmVsQm9keSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbEJvZHkoX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmNsYXNzTmFtZSB9LCB3bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5jb250ZW50LmlkIH0gfSwgKF9fY29udGV4dC5jaGlsZHJlbikuc2xpY2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFBhbmVsQm9keS5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGlkID0gYXR0cnMud21sLmlkO1xuICAgICAgICB2YXIgZ3JvdXAgPSBhdHRycy53bWwuZ3JvdXA7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgICAgICB0aGlzLmlkc1tpZF0gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIFBhbmVsQm9keS5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgUGFuZWxCb2R5LnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIFBhbmVsQm9keS5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbU51bGxhYmxlKHRoaXMuaWRzW2lkXSk7XG4gICAgfTtcbiAgICBQYW5lbEJvZHkucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIFBhbmVsQm9keS5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBQYW5lbEJvZHkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgP1xuICAgICAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA6XG4gICAgICAgICAgICB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIFBhbmVsQm9keTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsQm9keSA9IFBhbmVsQm9keTtcbjtcbnZhciBQYW5lbEZvb3RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYW5lbEZvb3RlcihfX2NvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy5ncm91cHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gZnVuY3Rpb24gKF9fdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQuY2xhc3NOYW1lIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQuaWQgfSB9LCAoX19jb250ZXh0LmNoaWxkcmVuKS5zbGljZSgpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgUGFuZWxGb290ZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGUsIGF0dHJzKSB7XG4gICAgICAgIHZhciBpZCA9IGF0dHJzLndtbC5pZDtcbiAgICAgICAgdmFyIGdyb3VwID0gYXR0cnMud21sLmdyb3VwO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgaWQgJ1wiICsgaWQgKyBcIicgZGV0ZWN0ZWQhXCIpO1xuICAgICAgICAgICAgdGhpcy5pZHNbaWRdID0gZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gdGhpcy5ncm91cHNbZ3JvdXBdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBQYW5lbEZvb3Rlci5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgUGFuZWxGb290ZXIucHJvdG90eXBlLndpZGdldCA9IGZ1bmN0aW9uIChDLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHcgPSBuZXcgQyhhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKHcsIGF0dHJzKTtcbiAgICAgICAgdGhpcy53aWRnZXRzLnB1c2godyk7XG4gICAgICAgIHJldHVybiB3LnJlbmRlcigpO1xuICAgIH07XG4gICAgUGFuZWxGb290ZXIucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21OdWxsYWJsZSh0aGlzLmlkc1tpZF0pO1xuICAgIH07XG4gICAgUGFuZWxGb290ZXIucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIFBhbmVsRm9vdGVyLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ2ludmFsaWRhdGUoKTogJyArICdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3ICB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCB0cmVlKTtcbiAgICB9O1xuICAgIFBhbmVsRm9vdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID9cbiAgICAgICAgICAgIHRoaXMuaWRzWydyb290J10gOlxuICAgICAgICAgICAgdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBQYW5lbEZvb3Rlcjtcbn0oKSk7XG5leHBvcnRzLlBhbmVsRm9vdGVyID0gUGFuZWxGb290ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYW5lbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGhpZGRlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbnRlbnQvc3RhdGUvaGlkZGVuXCIpO1xudmFyIGxheW91dF8xID0gcmVxdWlyZShcIi4uLy4uL2xheW91dFwiKTtcbnZhciBkcmF3ZXJfMSA9IHJlcXVpcmUoXCIuL3dtbC9kcmF3ZXJcIik7XG4vLy9jbGFzc05hbWVzOmJlZ2luXG5leHBvcnRzLkRSQVdFUiA9ICd3dy1kcmF3ZXInO1xuZXhwb3J0cy5EUkFXRVJfQ09OVEVOVCA9ICd3dy1kcmF3ZXJfX2NvbnRlbnQnO1xuLyoqXG4gKiBEcmF3ZXIgcHJvdmlkZXMgYSB3aWRnZXQgZm9yIGRpc3BsYXlpbmcgbmF2aWdhdGlvbiBhbmQgb3RoZXIgc2lkZWJhciBjb250ZW50LlxuICpcbiAqIEl0J3MgYXBpIGFsbG93cyBmb3IgdG9nZ2xpbmcgYmV0d2VlbiBoaWRkZW4gYW5kIHNob3duIHN0YXRlcyBhcyB3ZWxsIGFzXG4gKiBxdWVyeWluZyB0aGUgY3VycmVudCBzdGF0ZS5cbiAqXG4gKiBUaGlzIHdpZGdldCdzIHN0eWxlIGludGVudGlvbmFsbHkgZ2l2ZXMgaXQgYSBoaWdoIHotaW5kZXggc28gdGhhdCBpdCBhcHBlYXJzXG4gKiBpbi1mcm9udCAgb2Ygb3RoZXIgY29udGVudC4gQWRqdXN0IHRoZSByZXNwZWN0aXZlIHN0eWxlIHZhcmlhYmxlcyB0byBjaGFuZ2UuXG4gKi9cbnZhciBEcmF3ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERyYXdlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEcmF3ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IGRyYXdlcl8xLk1haW4oX3RoaXMpO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICByb290OiB7XG4gICAgICAgICAgICAgICAgaWQ6IF90aGlzLmF0dHJzLnd3ICYmIF90aGlzLmF0dHJzLnd3LmlkLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogZXhwb3J0cy5EUkFXRVIsXG4gICAgICAgICAgICAgICAgd21sOiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAncm9vdCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgICAgIHdtbDoge1xuICAgICAgICAgICAgICAgICAgICBpZDogJ2NvbnRlbnQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGV4cG9ydHMuRFJBV0VSX0NPTlRFTlQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5jb250ZW50KSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmNvbnRlbnQgOiBfdGhpcy5jaGlsZHJlblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERyYXdlci5wcm90b3R5cGUuaXNIaWRkZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBoaWRkZW5fMS5pc0hpZGRlbih0aGlzLnZpZXcsIHRoaXMudmFsdWVzLnJvb3Qud21sLmlkKTtcbiAgICB9O1xuICAgIERyYXdlci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGlkZGVuXzEuaGlkZSh0aGlzLnZpZXcsIHRoaXMudmFsdWVzLnJvb3Qud21sLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBEcmF3ZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGhpZGRlbl8xLnNob3codGhpcy52aWV3LCB0aGlzLnZhbHVlcy5yb290LndtbC5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRHJhd2VyLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGhpZGRlbl8xLnRvZ2dsZSh0aGlzLnZpZXcsIHRoaXMudmFsdWVzLnJvb3Qud21sLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gRHJhd2VyO1xufShsYXlvdXRfMS5BYnN0cmFjdExheW91dCkpO1xuZXhwb3J0cy5EcmF3ZXIgPSBEcmF3ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCdkaXYnLCB7IGh0bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5yb290LmlkLCAnY2xhc3MnOiBfX2NvbnRleHQudmFsdWVzLnJvb3QuY2xhc3NOYW1lIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLnJvb3Qud21sLmlkIH0gfSwgW1xuICAgICAgICAgICAgICAgIF90aGlzLm5vZGUoJ2RpdicsIHsgaHRtbDogeyAnY2xhc3MnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQuY2xhc3NOYW1lIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLmNvbnRlbnQud21sLmlkIH0gfSwgKF9fY29udGV4dC52YWx1ZXMuY29udGVudC52YWx1ZSkuc2xpY2UoKSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChlLCBhdHRycykge1xuICAgICAgICB2YXIgaWQgPSBhdHRycy53bWwuaWQ7XG4gICAgICAgIHZhciBncm91cCA9IGF0dHJzLndtbC5ncm91cDtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGlkICdcIiArIGlkICsgXCInIGRldGVjdGVkIVwiKTtcbiAgICAgICAgICAgIHRoaXMuaWRzW2lkXSA9IGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXSA9IHRoaXMuZ3JvdXBzW2dyb3VwXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUud2lkZ2V0ID0gZnVuY3Rpb24gKEMsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgdyA9IG5ldyBDKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIodywgYXR0cnMpO1xuICAgICAgICB0aGlzLndpZGdldHMucHVzaCh3KTtcbiAgICAgICAgcmV0dXJuIHcucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tTnVsbGFibGUodGhpcy5pZHNbaWRdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0cmVlID0gdGhpcy50cmVlO1xuICAgICAgICB2YXIgcGFyZW50ID0gdHJlZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAodHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignaW52YWxpZGF0ZSgpOiAnICsgJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgIHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHRyZWUpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/XG4gICAgICAgICAgICB0aGlzLmlkc1sncm9vdCddIDpcbiAgICAgICAgICAgIHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHJhd2VyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sID0gcmVxdWlyZShcIkBxdWVuay93bWxcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvaGVhZGVyXCIpO1xudmFyIHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsXCIpO1xuLy8vY2xhc3NOYW1lczpiZWdpblxuLyoqXG4gKiBNRU5VX0hFQURFUlxuICovXG5leHBvcnRzLk1FTlVfSEVBREVSID0gJ3d3LW1lbnUtaGVhZGVyJztcbi8qKlxuICogTWVudUhlYWRlciBjYW4gYmUgdXNlZCB0byBkaXNwbGF5IG5vbi1jbGlja2FibGUgaGVhZGluZyB0ZXh0IGluIGEgbmF2IG1lbnUuXG4gKi9cbnZhciBNZW51SGVhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNZW51SGVhZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1lbnVIZWFkZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLk1haW4oX3RoaXMpO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICBzcGFuOiB7XG4gICAgICAgICAgICAgICAgaWQ6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCkgPyBfdGhpcy5hdHRycy53dy5pZCA6ICcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdXRpbF8xLmNvbmNhdChleHBvcnRzLk1FTlVfSEVBREVSLCAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lKSA/XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmF0dHJzLnd3LmNsYXNzTmFtZSA6ICcnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHQ6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy50ZXh0KSA/XG4gICAgICAgICAgICAgICAgW2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKF90aGlzLmF0dHJzLnd3LnRleHQpXSA6IF90aGlzLmNoaWxkcmVuXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE1lbnVIZWFkZXI7XG59KHdtbC5Db21wb25lbnQpKTtcbmV4cG9ydHMuTWVudUhlYWRlciA9IE1lbnVIZWFkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCdzcGFuJywgeyBodG1sOiB7ICdpZCc6IF9fY29udGV4dC52YWx1ZXMuc3Bhbi5pZCwgJ2NsYXNzJzogX19jb250ZXh0LnZhbHVlcy5zcGFuLmNsYXNzTmFtZSB9LCB3bWw6IHt9IH0sIChfX2NvbnRleHQudmFsdWVzLnRleHQpLnNsaWNlKCkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChlLCBhdHRycykge1xuICAgICAgICB2YXIgaWQgPSBhdHRycy53bWwuaWQ7XG4gICAgICAgIHZhciBncm91cCA9IGF0dHJzLndtbC5ncm91cDtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGlkICdcIiArIGlkICsgXCInIGRldGVjdGVkIVwiKTtcbiAgICAgICAgICAgIHRoaXMuaWRzW2lkXSA9IGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXSA9IHRoaXMuZ3JvdXBzW2dyb3VwXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUud2lkZ2V0ID0gZnVuY3Rpb24gKEMsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgdyA9IG5ldyBDKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIodywgYXR0cnMpO1xuICAgICAgICB0aGlzLndpZGdldHMucHVzaCh3KTtcbiAgICAgICAgcmV0dXJuIHcucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tTnVsbGFibGUodGhpcy5pZHNbaWRdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0cmVlID0gdGhpcy50cmVlO1xuICAgICAgICB2YXIgcGFyZW50ID0gdHJlZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAodHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignaW52YWxpZGF0ZSgpOiAnICsgJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgIHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHRyZWUpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/XG4gICAgICAgICAgICB0aGlzLmlkc1sncm9vdCddIDpcbiAgICAgICAgICAgIHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVhZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgd21sID0gcmVxdWlyZShcIkBxdWVuay93bWxcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvaXRlbVwiKTtcbnZhciBhY3RpdmVfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb250ZW50L3N0YXRlL2FjdGl2ZVwiKTtcbnZhciBhY3RpdmVfMiA9IHJlcXVpcmUoXCIuLi8uLi9jb250ZW50L3N0YXRlL2FjdGl2ZVwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbFwiKTtcbi8vL2NsYXNzTmFtZXM6YmVnaW5cbi8qKlxuICogSVRFTVxuICovXG5leHBvcnRzLklURU0gPSAnd3ctaXRlbSc7XG4vKipcbiAqIEl0ZW1DbGlja2VkRXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gYW4gaXRlbSBpblxuICogYSBuYXYgbGlzdC5cbiAqL1xudmFyIEl0ZW1DbGlja2VkRXZlbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSXRlbUNsaWNrZWRFdmVudChuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIHJldHVybiBJdGVtQ2xpY2tlZEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuSXRlbUNsaWNrZWRFdmVudCA9IEl0ZW1DbGlja2VkRXZlbnQ7XG4vKipcbiAqIEl0ZW0gd3JhcHMgY29udGVudCBpbiBhIG5hdmlnYXRpb24gbGlzdC5cbiAqXG4gKiBJdGVtcyBzaG91bGQgbm90IGhhdmUgYW55IHNpYmxpbmdzIHRoYXQgYXJlIG5vdCBvdGhlciBJdGVtcy5cbiAqL1xudmFyIEl0ZW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEl0ZW0sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSXRlbSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZpZXcgPSBuZXcgdmlld3MuTWFpbihfdGhpcyk7XG4gICAgICAgIF90aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgICAgICB3bWw6IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdyb290J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaWQ6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCkgPyBfdGhpcy5hdHRycy53dy5pZCA6ICcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdXRpbF8xLmNvbmNhdChleHBvcnRzLklURU0sIChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5hY3RpdmUpID8gYWN0aXZlXzIuQUNUSVZFIDogJycpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiAoX3RoaXMuYXR0cnMud3cgJiYgX3RoaXMuYXR0cnMud3cudGV4dCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgW2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKF90aGlzLmF0dHJzLnd3LnRleHQpXSA6IF90aGlzLmNoaWxkcmVuOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEl0ZW0ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhY3RpdmVfMS5hY3RpdmF0ZSh0aGlzLnZpZXcsIHRoaXMudmFsdWVzLnJvb3Qud21sLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBJdGVtLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhY3RpdmVfMS5kZWFjdGl2YXRlKHRoaXMudmlldywgdGhpcy52YWx1ZXMucm9vdC53bWwuaWQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBJdGVtO1xufSh3bWwuQ29tcG9uZW50KSk7XG5leHBvcnRzLkl0ZW0gPSBJdGVtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbWF5YmVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvbm9uaS9saWIvZGF0YS9tYXliZVwiKTtcbmV4cG9ydHMuJCRmb3JJbiA9IGZ1bmN0aW9uIChsaXN0LCBmLCBhbHQpIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICByZXQgPSByZXQuY29uY2F0KGYobGlzdFtpXSwgaSwgbGlzdCkpO1xuICAgIHJldHVybiByZXQubGVuZ3RoID09PSAwID8gYWx0KCkgOiByZXQ7XG59O1xuZXhwb3J0cy4kJGZvck9mID0gZnVuY3Rpb24gKG8sIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbylcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoZigobylba2V5XSwga2V5LCBvKSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMubm9kZSgnbGknLCB7IGh0bWw6IHsgJ2lkJzogX19jb250ZXh0LnZhbHVlcy5yb290LmlkLCAnY2xhc3MnOiBfX2NvbnRleHQudmFsdWVzLnJvb3QuY2xhc3NOYW1lIH0sIHdtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLnJvb3Qud21sLmlkIH0gfSwgKF9fY29udGV4dC52YWx1ZXMucm9vdC5jb250ZW50LnJlbmRlcigpKS5zbGljZSgpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTWFpbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGlkID0gYXR0cnMud21sLmlkO1xuICAgICAgICB2YXIgZ3JvdXAgPSBhdHRycy53bWwuZ3JvdXA7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgICAgICB0aGlzLmlkc1tpZF0gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cnNbJ2h0bWwnXSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyc1snaHRtbCddW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvL3ByZXZlbnQgc2V0dGluZyB0aGluZ3MgbGlrZSBkaXNhYmxlZD0nJ1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIiArIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgYykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyBjKTtcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZCh0bik7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgYWRvcHQgY2hpbGQgXCIgKyBjICsgXCIgb2YgdHlwZSBcIiArIHR5cGVvZiBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoZSwgYXR0cnMpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLndpZGdldCA9IGZ1bmN0aW9uIChDLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHcgPSBuZXcgQyhhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKHcsIGF0dHJzKTtcbiAgICAgICAgdGhpcy53aWRnZXRzLnB1c2godyk7XG4gICAgICAgIHJldHVybiB3LnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbU51bGxhYmxlKHRoaXMuaWRzW2lkXSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlHcm91cCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21BcnJheSh0aGlzLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tuYW1lXSA6XG4gICAgICAgICAgICBbXSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ2ludmFsaWRhdGUoKTogJyArICdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3ICB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCB0cmVlKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgP1xuICAgICAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA6XG4gICAgICAgICAgICB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWl0ZW0uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB3bWwgPSByZXF1aXJlKFwiQHF1ZW5rL3dtbFwiKTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4uLy4uL3V0aWxcIik7XG52YXIgdmlld3MgPSByZXF1aXJlKFwiLi93bWwvbmF2XCIpO1xudmFyIG9yaWVudGF0aW9uXzEgPSByZXF1aXJlKFwiLi4vLi4vY29udGVudC9vcmllbnRhdGlvblwiKTtcbnZhciBpdGVtXzEgPSByZXF1aXJlKFwiLi4vaXRlbVwiKTtcbmV4cG9ydHMuSXRlbSA9IGl0ZW1fMS5JdGVtO1xudmFyIGxpbmtfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb250ZW50L2xpbmtcIik7XG5leHBvcnRzLkxpbmsgPSBsaW5rXzEuTGluaztcbi8vL2NsYXNzTmFtZXM6YmVnaW5cbi8qKlxuICogTkFWXG4gKi9cbmV4cG9ydHMuTkFWID0gJ3d3LW5hdic7XG4vKipcbiAqIE5hdiBwcm92aWRlcyBzdHlsaW5nIGZvciBkaXNwbGF5aW5nIGEgbGlzdCBvZiBhbmNob3IgbGlua3MuXG4gKi9cbnZhciBOYXYgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE5hdiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBOYXYoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52aWV3ID0gbmV3IHZpZXdzLk1haW4oX3RoaXMpO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSB7XG4gICAgICAgICAgICByb290OiB7XG4gICAgICAgICAgICAgICAgaWQ6IChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5pZCkgPyBfdGhpcy5hdHRycy53dy5pZCA6ICcnLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdXRpbC5jb25jYXQoZXhwb3J0cy5OQVYsIChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy5jbGFzc05hbWUpID9cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXR0cnMud3cuY2xhc3NOYW1lIDogJycsIChfdGhpcy5hdHRycy53dyAmJiBfdGhpcy5hdHRycy53dy52ZXJ0aWNhbCkgP1xuICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbl8xLlZFUlRJQ0FMIDogJycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIE5hdjtcbn0od21sLkNvbXBvbmVudCkpO1xuZXhwb3J0cy5OYXYgPSBOYXY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYXliZV8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL21heWJlXCIpO1xuZXhwb3J0cy4kJGZvckluID0gZnVuY3Rpb24gKGxpc3QsIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHJldCA9IHJldC5jb25jYXQoZihsaXN0W2ldLCBpLCBsaXN0KSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG5leHBvcnRzLiQkZm9yT2YgPSBmdW5jdGlvbiAobywgZiwgYWx0KSB7XG4gICAgdmFyIHJldCA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvKVxuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChmKChvKVtrZXldLCBrZXksIG8pKTtcbiAgICByZXR1cm4gcmV0Lmxlbmd0aCA9PT0gMCA/IGFsdCgpIDogcmV0O1xufTtcbnZhciBNYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW4oX19jb250ZXh0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMuZ3JvdXBzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IGZ1bmN0aW9uIChfX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ub2RlKCd1bCcsIHsgaHRtbDogeyAnaWQnOiBfX2NvbnRleHQudmFsdWVzLnJvb3QuaWQsICdjbGFzcyc6IF9fY29udGV4dC52YWx1ZXMucm9vdC5jbGFzc05hbWUgfSwgd21sOiB7fSB9LCAoX19jb250ZXh0LmNoaWxkcmVuKS5zbGljZSgpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgTWFpbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZSwgYXR0cnMpIHtcbiAgICAgICAgdmFyIGlkID0gYXR0cnMud21sLmlkO1xuICAgICAgICB2YXIgZ3JvdXAgPSBhdHRycy53bWwuZ3JvdXA7XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZHMuaGFzT3duUHJvcGVydHkoaWQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkR1cGxpY2F0ZSBpZCAnXCIgKyBpZCArIFwiJyBkZXRlY3RlZCFcIik7XG4gICAgICAgICAgICB0aGlzLmlkc1tpZF0gPSBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0gPSB0aGlzLmdyb3Vwc1tncm91cF0gfHwgW107XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tncm91cF0ucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLm5vZGUgPSBmdW5jdGlvbiAodGFnLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0cnNbJ2h0bWwnXSA9PT0gJ29iamVjdCcpXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhdHRyc1snaHRtbCddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyc1snaHRtbCddW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvL3ByZXZlbnQgc2V0dGluZyB0aGluZ3MgbGlrZSBkaXNhYmxlZD0nJ1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgXCJcIiArIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgYykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRuID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycgKyBjKTtcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZCh0bik7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgZS5hcHBlbmRDaGlsZChjKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbiBub3QgYWRvcHQgY2hpbGQgXCIgKyBjICsgXCIgb2YgdHlwZSBcIiArIHR5cGVvZiBjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoZSwgYXR0cnMpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLndpZGdldCA9IGZ1bmN0aW9uIChDLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIHcgPSBuZXcgQyhhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKHcsIGF0dHJzKTtcbiAgICAgICAgdGhpcy53aWRnZXRzLnB1c2godyk7XG4gICAgICAgIHJldHVybiB3LnJlbmRlcigpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbU51bGxhYmxlKHRoaXMuaWRzW2lkXSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlHcm91cCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21BcnJheSh0aGlzLmdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/XG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tuYW1lXSA6XG4gICAgICAgICAgICBbXSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5pbnZhbGlkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJlZSA9IHRoaXMudHJlZTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHRyZWUgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLndhcm4oJ2ludmFsaWRhdGUoKTogJyArICdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIGlmICh0cmVlLnBhcmVudE5vZGUgPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3ICB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLnJlbmRlcigpLCB0cmVlKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pZHMgPSB7fTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVtb3ZlZCgpOyB9KTtcbiAgICAgICAgdGhpcy53aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMudHJlZSA9IHRoaXMudGVtcGxhdGUodGhpcyk7XG4gICAgICAgIHRoaXMuaWRzWydyb290J10gPSAodGhpcy5pZHNbJ3Jvb3QnXSkgP1xuICAgICAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA6XG4gICAgICAgICAgICB0aGlzLnRyZWU7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbmRlcmVkKCk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1haW47XG59KCkpO1xuZXhwb3J0cy5NYWluID0gTWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgdXRpbGl0eSBmdW5jdGlvbnMgYW5kIGNvbnN0YW50cyB1c2VkXG4gKiB0aHJvdWdoIG91dCB0aGUgd21sLXdpZGdldHMgbW9kdWxlLlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIGdldEJ5SWQgcmV0cmVpdmVzIGFuIFdNTEVsZW1lbnQgZnJvbSBhIHZpZXcgYnkgaXRzIGlkLlxuICpcbiAqIElmIHRoZSBXTUxFbGVtZW50IGlzIG5vdCBmb3VuZCBhIHdhcm5pbmcgaXMgbG9nZ2VkIHRvIGNvbnNvbGUuXG4gKi9cbmV4cG9ydHMuZ2V0QnlJZCA9IGZ1bmN0aW9uICh2aWV3LCBpZCkge1xuICAgIHZhciBtID0gdmlldy5maW5kQnlJZChpZCk7XG4gICAgaWYgKG0uaXNOb3RoaW5nKCkpIHtcbiAgICAgICAgZXhwb3J0cy53YXJuTWlzc2luZyh2aWV3LCBpZCk7XG4gICAgfVxuICAgIHJldHVybiBtO1xufTtcbi8qKlxuICogd2FybiB2aWEgY29uc29sZSB0aGF0IGFuIGVsZW1lbnQgaXMgbWlzc2luZy5cbiAqL1xuZXhwb3J0cy53YXJuTWlzc2luZyA9IGZ1bmN0aW9uICh2aWV3LCBpZCkge1xuICAgIGNvbnNvbGUud2FybignVGhlIHZpZXcgJywgdmlldywgXCIgZG9lcyBub3QgaGF2ZSBhbiBpZCBcXFwiXCIgKyBpZCArIFwiXFxcIiFcIik7XG59O1xuLyoqXG4gKiBjb21iaW5lIHRoZSBtZW1iZXJzIG9mIGFuIGFycmF5IGludG8gb25lIHN0cmluZy5cbiAqL1xuZXhwb3J0cy5jb21iaW5lID0gZnVuY3Rpb24gKHN0ciwgam9pbmVyKSB7XG4gICAgaWYgKGpvaW5lciA9PT0gdm9pZCAwKSB7IGpvaW5lciA9ICcgJzsgfVxuICAgIHJldHVybiBzdHIuZmlsdGVyKGZ1bmN0aW9uIChzKSB7IHJldHVybiAoKHMgIT0gbnVsbCkgfHwgcyAhPSAnJyk7IH0pLmpvaW4oam9pbmVyKTtcbn07XG4vKipcbiAqIGNvbmNhdCBqb2lucyB2YXJpb3VzIHN0cmluZ3MgdG9nZXRoZXIgdG8gZm9ybSBhbiBodG1sIGNsYXNzIGF0dHJpYnV0ZSB2YWx1ZS5cbiAqXG4gKiBSZW1vdmVzIGVtcHR5IHN0cmluZ3MsIG51bGwgYW5kIHVuZGVmaW5lZCB2YWx1ZXMuXG4gKi9cbmV4cG9ydHMuY29uY2F0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHIgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzdHJbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5maWx0ZXIoZnVuY3Rpb24gKHMpIHsgcmV0dXJuICgocyA9PSBudWxsKSB8fCAocyA9PSAnJykpID8gZmFsc2UgOiB0cnVlOyB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnRyaW0oKTsgfSkuam9pbignICcpO1xufTtcbi8qKlxuICogbm9vcFxuICovXG5leHBvcnRzLm5vb3AgPSBmdW5jdGlvbiAoKSB7IH07XG4vKipcbiAqIHJlcGxhY2VDb250ZW50XG4gKi9cbmV4cG9ydHMucmVwbGFjZUNvbnRlbnQgPSBmdW5jdGlvbiAociwgbm9kZSkge1xuICAgIHdoaWxlIChub2RlLmxhc3RDaGlsZClcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RDaGlsZCk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChyLnJlbmRlcigpKTtcbn07XG4vKipcbiAqIGRlYm91bmNlIGEgZnVuY3Rpb24gc28gdGhhdCBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGFmdGVyXG4gKiBhIHBlcmlvZCBvZiB0aW1lLlxuICovXG5leHBvcnRzLmRlYm91bmNlID0gZnVuY3Rpb24gKGYsIGRlbGF5KSB7XG4gICAgdmFyIHRpbWVyID0gLTE7XG4gICAgcmV0dXJuIGRlbGF5ID09PSAwID8gZiA6IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIGlmICh0aW1lciA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZihhKTsgfSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZihhKTsgfSwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgYXJyYXkgbW9kdWxlIHByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnNcbiAqIGZvciB3b3JraW5nIHdpdGggSlMgYXJyYXlzLlxuICovXG52YXIgcmVjb3JkXzEgPSByZXF1aXJlKFwiLi9yZWNvcmRcIik7XG52YXIgbWF0aF8xID0gcmVxdWlyZShcIi4uL21hdGhcIik7XG4vKipcbiAqIGhlYWQgcmV0dXJucyB0aGUgaXRlbSBhdCBpbmRleCAwIG9mIGFuIGFycmF5XG4gKi9cbmV4cG9ydHMuaGVhZCA9IGZ1bmN0aW9uIChsaXN0KSB7IHJldHVybiBsaXN0WzBdOyB9O1xuLyoqXG4gKiB0YWlsIHJldHVybnMgdGhlIGxhc3QgaXRlbSBpbiBhbiBhcnJheVxuICovXG5leHBvcnRzLnRhaWwgPSBmdW5jdGlvbiAobGlzdCkgeyByZXR1cm4gbGlzdFtsaXN0Lmxlbmd0aCAtIDFdOyB9O1xuLyoqXG4gKiBlbXB0eSBpbmRpY2F0ZXMgd2hldGhlciBhbiBhcnJheSBpcyBlbXB0eSBvciBub3QuXG4gKi9cbmV4cG9ydHMuZW1wdHkgPSBmdW5jdGlvbiAobGlzdCkgeyByZXR1cm4gKGxpc3QubGVuZ3RoID09PSAwKTsgfTtcbi8qKlxuICogY29udGFpbnMgaW5kaWNhdGVzIHdoZXRoZXIgYW4gZWxlbWVudCBleGlzdHMgaW4gYW4gYXJyYXkuXG4gKi9cbmV4cG9ydHMuY29udGFpbnMgPSBmdW5jdGlvbiAobGlzdCkgeyByZXR1cm4gZnVuY3Rpb24gKGEpIHsgcmV0dXJuIChsaXN0LmluZGV4T2YoYSkgPiAtMSk7IH07IH07XG4vKipcbiAqIG1hcCBpcyBhIGN1cnJpZWQgdmVyc2lvbiBvZiB0aGUgQXJyYXkjbWFwIG1ldGhvZC5cbiAqL1xuZXhwb3J0cy5tYXAgPSBmdW5jdGlvbiAobGlzdCkgeyByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGxpc3QubWFwKGYpOyB9OyB9O1xuLyoqXG4gKiBjb25jYXQgY29uY2F0ZW5hdGVzIGFuIGVsZW1lbnQgdG8gYW4gYXJyYXkgd2l0aG91dCBkZXN0cnVjdHVyaW5nXG4gKiB0aGUgZWxlbWVudCBpZiBpdHNlbGYgaXMgYW4gYXJyYXkuXG4gKi9cbmV4cG9ydHMuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIGEpIHsgcmV0dXJuIGxpc3QuY29uY2F0KFthXSk7IH07XG4vKipcbiAqIHBhcnRpdGlvbiBhbiBhcnJheSBpbnRvIHR3byB1c2luZyBhIHBhcnRpdGlvbmluZyBmdW5jdGlvbi5cbiAqXG4gKiBUaGUgZmlyc3QgYXJyYXkgY29udGFpbnMgdmFsdWVzIHRoYXQgcmV0dXJuIHRydWUgYW5kIHRoZSBzZWNvbmQgZmFsc2UuXG4gKi9cbmV4cG9ydHMucGFydGl0aW9uID0gZnVuY3Rpb24gKGxpc3QpIHsgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiBleHBvcnRzLmVtcHR5KGxpc3QpID9cbiAgICBbW10sIFtdXSA6XG4gICAgbGlzdC5yZWR1Y2UoZnVuY3Rpb24gKF9hLCBjLCBpKSB7XG4gICAgICAgIHZhciB5ZXMgPSBfYVswXSwgbm8gPSBfYVsxXTtcbiAgICAgICAgcmV0dXJuIChmKGMsIGksIGxpc3QpID9cbiAgICAgICAgICAgIFtleHBvcnRzLmNvbmNhdCh5ZXMsIGMpLCBub10gOlxuICAgICAgICAgICAgW3llcywgZXhwb3J0cy5jb25jYXQobm8sIGMpXSk7XG4gICAgfSwgW1tdLCBbXV0pOyB9OyB9O1xuLyoqXG4gKiBncm91cCB0aGUgcHJvcGVydGllcyBvZiBhIFJlY29yZCBpbnRvIGFub3RoZXIgUmVjb3JkIHVzaW5nIGEgZ3JvdXBpbmdcbiAqIGZ1bmN0aW9uLlxuICovXG5leHBvcnRzLmdyb3VwID0gZnVuY3Rpb24gKGxpc3QpIHsgcmV0dXJuIGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIGxpc3QucmVkdWNlKGZ1bmN0aW9uIChwLCBjLCBpKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGcgPSBmKGMsIGksIGxpc3QpO1xuICAgICAgICByZXR1cm4gcmVjb3JkXzEubWVyZ2UocCwgKF9hID0ge30sXG4gICAgICAgICAgICBfYVtnXSA9IEFycmF5LmlzQXJyYXkocFtnXSkgP1xuICAgICAgICAgICAgICAgIGV4cG9ydHMuY29uY2F0KHBbZ10sIGMpIDogW2NdLFxuICAgICAgICAgICAgX2EpKTtcbiAgICB9LCB7fSk7XG59OyB9O1xuLyoqXG4gKiBkaXN0cmlidXRlIGJyZWFrcyBhbiBhcnJheSBpbnRvIGFuIGFycmF5IG9mIGVxdWFsbHkgKGFwcHJveGltYXRlKSBzaXplZFxuICogc21hbGxlciBhcnJheXMuXG4gKi9cbmV4cG9ydHMuZGlzdHJpYnV0ZSA9IGZ1bmN0aW9uIChsaXN0LCBzaXplKSB7XG4gICAgdmFyIHIgPSBsaXN0LnJlZHVjZShmdW5jdGlvbiAocCwgYywgaSkge1xuICAgICAgICByZXR1cm4gbWF0aF8xLmlzTXVsdGlwbGVPZihzaXplLCBpICsgMSkgP1xuICAgICAgICAgICAgW2V4cG9ydHMuY29uY2F0KHBbMF0sIGV4cG9ydHMuY29uY2F0KHBbMV0sIGMpKSwgW11dIDpcbiAgICAgICAgICAgIFtwWzBdLCBleHBvcnRzLmNvbmNhdChwWzFdLCBjKV07XG4gICAgfSwgW1tdLCBbXV0pO1xuICAgIHJldHVybiAoclsxXS5sZW5ndGggPT09IDApID8gclswXSA6IGV4cG9ydHMuY29uY2F0KHJbMF0sIHJbMV0pO1xufTtcbi8qKlxuICogZGVkdXBlIGFuIGFycmF5IGJ5IGZpbHRlcmluZyBvdXQgZWxlbWVudHNcbiAqIHRoYXQgYXBwZWFyIHR3aWNlLlxuICovXG5leHBvcnRzLmRlZHVwZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgcmV0dXJuIGxpc3QuZmlsdGVyKGZ1bmN0aW9uIChlLCBpLCBsKSB7IHJldHVybiBsLmluZGV4T2YoZSkgPT09IGk7IH0pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBOb3RoaW5nIHJlcHJlc2VudHMgdGhlIGFic2VuY2Ugb2YgYSB1c2FibGUgdmFsdWUuXG4gKi9cbnZhciBOb3RoaW5nID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vdGhpbmcoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIG1hcCBzaW1wbHkgcmV0dXJucyBhIE5vdGhpbmc8QT5cbiAgICAgKi9cbiAgICBOb3RoaW5nLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICByZXR1cm4gbmV3IE5vdGhpbmcoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGFwIGFsbG93cyBmb3IgYSBmdW5jdGlvbiB3cmFwcGVkIGluIGEgSnVzdCB0byBhcHBseVxuICAgICAqIHRvIHZhbHVlIHByZXNlbnQgaW4gdGhpcyBKdXN0LlxuICAgICAqL1xuICAgIE5vdGhpbmcucHJvdG90eXBlLmFwID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOb3RoaW5nKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBvZiB3cmFwcyBhIHZhbHVlIGluIGEgSnVzdC5cbiAgICAgKi9cbiAgICBOb3RoaW5nLnByb3RvdHlwZS5vZiA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBuZXcgSnVzdChhKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGNoYWluIHNpbXBseSByZXR1cm5zIGEgTm90aGluZzxBPi5cbiAgICAgKi9cbiAgICBOb3RoaW5nLnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aGluZygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogYWx0IHdpbGwgcHJlZmVyIHdoYXRldmVyIE1heWJlIGluc3RhbmNlIHByb3ZpZGVkLlxuICAgICAqL1xuICAgIE5vdGhpbmcucHJvdG90eXBlLmFsdCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZW1wdHkgcHJvdmlkZXMgYSBkZWZhdWx0IE1heWJlLlxuICAgICAqIE1heWJlLmVtcHR5KCkgPSBuZXcgTm90aGluZygpXG4gICAgICovXG4gICAgTm90aGluZy5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aGluZygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZXh0ZW5kIHJldHVybnMgYSBOb3RoaW5nPEE+LlxuICAgICAqL1xuICAgIE5vdGhpbmcucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aGluZygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZXEgcmV0dXJucyB0cnVlIGlmIGNvbXBhcmVkIHRvIGFub3RoZXIgTm90aGluZyBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBOb3RoaW5nLnByb3RvdHlwZS5lcSA9IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIHJldHVybiBtIGluc3RhbmNlb2YgTm90aGluZztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIG9ySnVzdCBjb252ZXJ0cyBhIE5vdGhpbmc8QT4gdG8gYSBKdXN0XG4gICAgICogdXNpbmcgdGhlIHZhbHVlIGZyb20gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIE5vdGhpbmcucHJvdG90eXBlLm9ySnVzdCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgSnVzdChmKCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogb3JFbHNlIGFsbG93cyBhbiBhbHRlcm5hdGl2ZSBNYXliZSB2YWx1ZVxuICAgICAqIHRvIGJlIHByb3ZpZGVkIHNpbmNlIHRoaXMgb25lIGlzIE5vdGhpbmc8QT4uXG4gICAgICovXG4gICAgTm90aGluZy5wcm90b3R5cGUub3JFbHNlID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICB9O1xuICAgIE5vdGhpbmcucHJvdG90eXBlLmlzTm90aGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBOb3RoaW5nLnByb3RvdHlwZS5pc0p1c3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGdldCB0aHJvd3MgYW4gZXJyb3IgYmVjYXVzZSB0aGVyZVxuICAgICAqIGlzIG5vdGhpbmcgaGVyZSB0byBnZXQuXG4gICAgICovXG4gICAgTm90aGluZy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgZ2V0IGEgdmFsdWUgZnJvbSBOb3RoaW5nIScpO1xuICAgIH07XG4gICAgcmV0dXJuIE5vdGhpbmc7XG59KCkpO1xuZXhwb3J0cy5Ob3RoaW5nID0gTm90aGluZztcbi8qKlxuICogSnVzdCByZXByZXNlbnRzIHRoZSBwcmVzZW5jZSBvZiBhIHVzYWJsZSB2YWx1ZS5cbiAqL1xudmFyIEp1c3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSnVzdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIG1hcCBvdmVyIHRoZSB2YWx1ZSBwcmVzZW50IGluIHRoZSBKdXN0LlxuICAgICAqL1xuICAgIEp1c3QucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgSnVzdChmKHRoaXMudmFsdWUpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGFwIGFsbG93cyBmb3IgYSBmdW5jdGlvbiB3cmFwcGVkIGluIGEgSnVzdCB0byBhcHBseVxuICAgICAqIHRvIHZhbHVlIHByZXNlbnQgaW4gdGhpcyBKdXN0LlxuICAgICAqL1xuICAgIEp1c3QucHJvdG90eXBlLmFwID0gZnVuY3Rpb24gKG1iKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBtYi5tYXAoZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYoX3RoaXMudmFsdWUpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIG9mIHdyYXBzIGEgdmFsdWUgaW4gYSBKdXN0LlxuICAgICAqL1xuICAgIEp1c3QucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBKdXN0KGEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogY2hhaW4gYWxsb3dzIHRoZSBzZXF1ZW5jaW5nIG9mIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBhIE1heWJlLlxuICAgICAqL1xuICAgIEp1c3QucHJvdG90eXBlLmNoYWluID0gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBhbHQgd2lsbCBwcmVmZXIgdGhlIGZpcnN0IEp1c3QgZW5jb3VudGVyZWQgKHRoaXMpLlxuICAgICAqL1xuICAgIEp1c3QucHJvdG90eXBlLmFsdCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZW1wdHkgcHJvdmlkZXMgYSBkZWZhdWx0IE1heWJlLlxuICAgICAqIE1heWJlLmVtcHR5KCkgPSBuZXcgTm90aGluZygpXG4gICAgICovXG4gICAgSnVzdC5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTm90aGluZygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZXh0ZW5kIGFsbG93cyBzZXF1ZW5jaW5nIG9mIE1heWJlcyB3aXRoXG4gICAgICogZnVuY3Rpb25zIHRoYXQgdW53cmFwIGludG8gbm9uIE1heWJlIHR5cGVzLlxuICAgICAqL1xuICAgIEp1c3QucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBuZXcgSnVzdChmKHRoaXMpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGVxIHRlc3RzIHRoZSB2YWx1ZSBvZiB0d28gSnVzdHMuXG4gICAgICovXG4gICAgSnVzdC5wcm90b3R5cGUuZXEgPSBmdW5jdGlvbiAobSkge1xuICAgICAgICByZXR1cm4gKChtIGluc3RhbmNlb2YgSnVzdCkgJiYgKG0udmFsdWUgPT09IHRoaXMudmFsdWUpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIG9ySnVzdCByZXR1cm5zIHRoaXMgSnVzdC5cbiAgICAgKi9cbiAgICBKdXN0LnByb3RvdHlwZS5vckp1c3QgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIG9yRWxzZSByZXR1cm5zIHRoaXMgSnVzdFxuICAgICAqL1xuICAgIEp1c3QucHJvdG90eXBlLm9yRWxzZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgSnVzdC5wcm90b3R5cGUuaXNOb3RoaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBKdXN0LnByb3RvdHlwZS5pc0p1c3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSB2YWx1ZSBvZiB0aGlzIEp1c3QuXG4gICAgICovXG4gICAgSnVzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9O1xuICAgIHJldHVybiBKdXN0O1xufSgpKTtcbmV4cG9ydHMuSnVzdCA9IEp1c3Q7XG4vKipcbiAqIG9mXG4gKi9cbmV4cG9ydHMub2YgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gbmV3IEp1c3QoYSk7IH07XG4vKipcbiAqIG5vdGhpbmcgY29udmVuaWVuY2UgY29uc3RydWN0b3JcbiAqL1xuZXhwb3J0cy5ub3RoaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE5vdGhpbmcoKTsgfTtcbi8qKlxuICoganVzdCBjb252ZW5pZW5jZSBjb25zdHJ1Y3RvclxuICovXG5leHBvcnRzLmp1c3QgPSBmdW5jdGlvbiAoYSkgeyByZXR1cm4gbmV3IEp1c3QoYSk7IH07XG4vKipcbiAqIGZyb21OdWxsYWJsZSBjb25zdHJ1Y3RzIGEgTWF5YmUgZnJvbSBhIHZhbHVlIHRoYXQgbWF5IGJlIG51bGwuXG4gKi9cbmV4cG9ydHMuZnJvbU51bGxhYmxlID0gZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEgPT0gbnVsbCA/XG4gICAgbmV3IE5vdGhpbmcoKSA6IG5ldyBKdXN0KGEpOyB9O1xuLyoqXG4gKiBmcm9tQXJyYXkgY2hlY2tzIGFuIGFycmF5IHRvIHNlZSBpZiBpdCdzIGVtcHR5XG4gKlxuICogUmV0dXJucyBbW05vdGhpbmddXSBpZiBpdCBpcywgW1tKdXN0XV0gb3RoZXJ3aXNlLlxuICovXG5leHBvcnRzLmZyb21BcnJheSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIChhLmxlbmd0aCA9PT0gMCkgPyBuZXcgTm90aGluZygpIDogbmV3IEp1c3QoYSk7XG59O1xuLyoqXG4gKiBmcm9tT2JqZWN0IHVzZXMgT2JqZWN0LmtleXMgdG8gdHVybiBzZWUgaWYgYW4gb2JqZWN0XG4gKiBoYXMgYW55IG93biBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnRzLmZyb21PYmplY3QgPSBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDAgPyBuZXcgTm90aGluZygpIDogbmV3IEp1c3Qobyk7XG59O1xuLyoqXG4gKiBmcm9tU3RyaW5nIGNvbnN0cnVjdHMgTm90aGluZzxBPiBpZiB0aGUgc3RyaW5nIGlzIGVtcHR5IG9yIEp1c3Q8QT4gb3RoZXJ3aXNlLlxuICovXG5leHBvcnRzLmZyb21TdHJpbmcgPSBmdW5jdGlvbiAocykge1xuICAgIHJldHVybiAocyA9PT0gJycpID8gbmV3IE5vdGhpbmcoKSA6IG5ldyBKdXN0KHMpO1xufTtcbi8qKlxuICogZnJvbUJvb2xlYW4gY29uc3RydWN0cyBOb3RoaW5nIGlmIGIgaXMgZmFsc2UsIEp1c3Q8QT4gb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydHMuZnJvbUJvb2xlYW4gPSBmdW5jdGlvbiAoYikge1xuICAgIHJldHVybiAoYiA9PT0gZmFsc2UpID8gbmV3IE5vdGhpbmcoKSA6IG5ldyBKdXN0KGIpO1xufTtcbi8qKlxuICogZnJvbU51bWJlciBjb25zdHJ1Y3RzIE5vdGhpbmcgaWYgbiBpcyAwIEp1c3Q8QT4gb3RoZXJ3aXNlLlxuICovXG5leHBvcnRzLmZyb21OdW1iZXIgPSBmdW5jdGlvbiAobikge1xuICAgIHJldHVybiAobiA9PT0gMCkgPyBuZXcgTm90aGluZygpIDogbmV3IEp1c3Qobik7XG59O1xuLyoqXG4gKiBmcm9tTmFOIGNvbnN0cnVjdHMgTm90aGluZyBpZiBhIHZhbHVlIGlzIG5vdCBhIG51bWJlciBvclxuICogSnVzdDxBPiBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydHMuZnJvbU5hTiA9IGZ1bmN0aW9uIChuKSB7XG4gICAgcmV0dXJuIGlzTmFOKG4pID8gbmV3IE5vdGhpbmcoKSA6IG5ldyBKdXN0KG4pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1heWJlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgcmVjb3JkIG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgZm9yIHRyZWF0aW5nIEVTIG9iamVjdHMgYXMgcmVjb3Jkcy5cbiAqXG4gKiBTb21lIG9mIHRoZSBmdW5jdGlvbnMgcHJvdmlkZWQgaGVyZSBhcmUgaW5oZXJlbnRseSB1bnNhZmUgKHRzYyB3aWxsIG5vdFxuICogYmUgYWJsZSB0cmFjayBpbnRlZ3JpdHkgYW5kIG1heSByZXN1bHQgaW4gcnVudGltZSBlcnJvcnMgaWYgbm90IHVzZWQgY2FyZWZ1bGx5LlxuICovXG52YXIgYXJyYXlfMSA9IHJlcXVpcmUoXCIuLi9hcnJheVwiKTtcbi8qKlxuICogaXNSZWNvcmQgdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIGEgcmVjb3JkLlxuICpcbiAqIFRoaXMgaXMgYSB0eXBlb2YgY2hlY2sgdGhhdCBleGNsdWRlcyBhcnJheXMuXG4gKlxuICogVW5zYWZlLlxuICovXG5leHBvcnRzLmlzUmVjb3JkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSAmJiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKTtcbn07XG4vKipcbiAqIGtleXMgcHJvZHVjZXMgYSBsaXN0IG9mIHByb3BlcnR5IG5hbWVzIGZyb20gYSBSZWNvcmQuXG4gKi9cbmV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpOyB9O1xuLyoqXG4gKiBtYXAgb3ZlciBhIFJlY29yZCdzIHByb3BlcnRpZXMgcHJvZHVjaW5nIGEgbmV3IHJlY29yZC5cbiAqXG4gKiBUaGUgb3JkZXIgb2Yga2V5cyBwcm9jZXNzZWQgaXMgbm90IGd1YXJhbnRlZWQuXG4gKi9cbmV4cG9ydHMubWFwID0gZnVuY3Rpb24gKG8sIGYpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5rZXlzKG8pLnJlZHVjZShmdW5jdGlvbiAocCwgaykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBleHBvcnRzLm1lcmdlKHAsIChfYSA9IHt9LCBfYVtrXSA9IGYob1trXSwgaywgbyksIF9hKSk7XG4gICAgfSwge30pO1xufTtcbi8qKlxuICogcmVkdWNlIGEgUmVjb3JkJ3Mga2V5cyB0byBhIHNpbmdsZSB2YWx1ZS5cbiAqXG4gKiBUaGUgaW5pdGlhbCB2YWx1ZSAoYWNjdW0pIG11c3QgYmUgc3VwcGxpZWQgdG8gYXZvaWQgZXJyb3JzIHdoZW5cbiAqIHRoZXJlIGFyZSBubyBwcm9wZXJpdGVzIG9uIHRoZSBSZWNvcmQuXG4gKiBUaGUgb3JkZXIgb2Yga2V5cyBwcm9jZXNzZWQgaXMgbm90IGd1YXJhbnRlZWQuXG4gKi9cbmV4cG9ydHMucmVkdWNlID0gZnVuY3Rpb24gKG8sIGFjY3VtLCBmKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMua2V5cyhvKS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGspIHsgcmV0dXJuIGYocCwgb1trXSwgayk7IH0sIGFjY3VtKTtcbn07XG4vKipcbiAqIG1lcmdlIHR3byBvYmplY3RzIGludG8gb25lLlxuICpcbiAqIFRoZSByZXR1cm4gdmFsdWUncyB0eXBlIGlzIHRoZSBwcm9kdWN0IG9mIHRoZSB0d28gdHlwZXMgc3VwcGxpZWQuXG4gKiBUaGlzIGZ1bmN0aW9uIG1heSBiZSB1bnNhZmUuXG4gKi9cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxlZnQsIHJpZ2h0KTsgfTtcbi8qKlxuICogbWVyZ2UzIG1lcmdlcyAzIHJlY29yZHMgaW50byBvbmUuXG4gKi9cbmV4cG9ydHMubWVyZ2UzID0gZnVuY3Rpb24gKHIsIHMsIHQpIHsgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHIsIHMsIHQpOyB9O1xuLyoqXG4gKiBtZXJnZTQgbWVyZ2VzIDQgcmVjb3JkcyBpbnRvIG9uZS5cbiAqL1xuZXhwb3J0cy5tZXJnZTQgPSBmdW5jdGlvbiAociwgcywgdCwgdSkgeyByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgciwgcywgdCwgdSk7IH07XG4vKipcbiAqIG1lcmdlNSBtZXJnZXMgNSByZWNvcmRzIGludG8gb25lLlxuICovXG5leHBvcnRzLm1lcmdlNSA9IGZ1bmN0aW9uIChyLCBzLCB0LCB1LCB2KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHIsIHMsIHQsIHUsIHYpO1xufTtcbi8qKlxuICogcm1lcmdlIG1lcmdlcyAyIHJlY29yZHMgcmVjdXJzaXZlbHkuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBtYXkgYmUgdW5zYWZlLlxuICovXG5leHBvcnRzLnJtZXJnZSA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuICAgIHJldHVybiBleHBvcnRzLnJlZHVjZShyaWdodCwgbGVmdCwgZGVlcE1lcmdlKTtcbn07XG4vKipcbiAqIHJtZXJnZTMgbWVyZ2VzIDMgcmVjb3JkcyByZWN1cnNpdmVseS5cbiAqL1xuZXhwb3J0cy5ybWVyZ2UzID0gZnVuY3Rpb24gKHIsIHMsIHQpIHtcbiAgICByZXR1cm4gW3MsIHRdXG4gICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMucmVkdWNlKGMsIChwKSwgZGVlcE1lcmdlKTtcbiAgICB9LCByKTtcbn07XG4vKipcbiAqIHJtZXJnZTQgbWVyZ2VzIDQgcmVjb3JkcyByZWN1cnNpdmVseS5cbiAqL1xuZXhwb3J0cy5ybWVyZ2U0ID0gZnVuY3Rpb24gKHIsIHMsIHQsIHUpIHtcbiAgICByZXR1cm4gW3MsIHQsIHVdXG4gICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMucmVkdWNlKGMsIChwKSwgZGVlcE1lcmdlKTtcbiAgICB9LCByKTtcbn07XG4vKipcbiAqIHJtZXJnZTUgbWVyZ2VzIDUgcmVjb3JkcyByZWN1cnNpdmVseS5cbiAqL1xuZXhwb3J0cy5ybWVyZ2U1ID0gZnVuY3Rpb24gKHIsIHMsIHQsIHUsIHYpIHtcbiAgICByZXR1cm4gW3MsIHQsIHUsIHZdXG4gICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMucmVkdWNlKGMsIChwKSwgZGVlcE1lcmdlKTtcbiAgICB9LCByKTtcbn07XG52YXIgZGVlcE1lcmdlID0gZnVuY3Rpb24gKHByZSwgY3Vyciwga2V5KSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICByZXR1cm4gZXhwb3J0cy5pc1JlY29yZChjdXJyKSA/XG4gICAgICAgIGV4cG9ydHMubWVyZ2UocHJlLCAoX2EgPSB7fSxcbiAgICAgICAgICAgIF9hW2tleV0gPSBleHBvcnRzLmlzUmVjb3JkKHByZVtrZXldKSA/XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5ybWVyZ2UocHJlW2tleV0sIGN1cnIpIDpcbiAgICAgICAgICAgICAgICBjdXJyLFxuICAgICAgICAgICAgX2EpKSA6XG4gICAgICAgIGV4cG9ydHMubWVyZ2UocHJlLCAoX2IgPSB7fSwgX2Jba2V5XSA9IGN1cnIsIF9iKSk7XG59O1xuLyoqXG4gKiBleGNsdWRlIHJlbW92ZXMgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzIGZyb20gYSBSZWNvcmQuXG4gKi9cbmV4cG9ydHMuZXhjbHVkZSA9IGZ1bmN0aW9uIChvLCBrZXlzKSB7XG4gICAgdmFyIGxpc3QgPSBBcnJheS5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtrZXlzXTtcbiAgICByZXR1cm4gZXhwb3J0cy5yZWR1Y2Uobywge30sIGZ1bmN0aW9uIChwLCBjLCBrKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIGxpc3QuaW5kZXhPZihrKSA+IC0xID8gcCA6IGV4cG9ydHMubWVyZ2UocCwgKF9hID0ge30sIF9hW2tdID0gYywgX2EpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqIHBhcnRpdGlvbiBhIFJlY29yZCBpbnRvIHR3byBzdWItcmVjb3JkcyB1c2luZyBhIHNlcGFyYXRpbmcgZnVuY3Rpb24uXG4gKlxuICogVGhpcyBmdW5jdGlvbiBwcm9kdWNlcyBhbiBhcnJheSB3aGVyZSB0aGUgZmlyc3QgZWxlbWVudCBpcyBhIHJlY29yZFxuICogb2YgcGFzc2luZyB2YWx1ZXMgYW5kIHRoZSBzZWNvbmQgdGhlIGZhaWxpbmcgdmFsdWVzLlxuICovXG5leHBvcnRzLnBhcnRpdGlvbiA9IGZ1bmN0aW9uIChyLCBmKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMucmVkdWNlKHIsIFt7fSwge31dLCBmdW5jdGlvbiAoX2EsIGMsIGspIHtcbiAgICAgICAgdmFyIHllcyA9IF9hWzBdLCBubyA9IF9hWzFdO1xuICAgICAgICB2YXIgX2IsIF9jO1xuICAgICAgICByZXR1cm4gZihjLCBrLCByKSA/XG4gICAgICAgICAgICBbZXhwb3J0cy5tZXJnZSh5ZXMsIChfYiA9IHt9LCBfYltrXSA9IGMsIF9iKSksIG5vXSA6XG4gICAgICAgICAgICBbeWVzLCBleHBvcnRzLm1lcmdlKG5vLCAoX2MgPSB7fSwgX2Nba10gPSBjLCBfYykpXTtcbiAgICB9KTtcbn07XG4vKipcbiAqIGdyb3VwIHRoZSBwcm9wZXJ0aWVzIG9mIGEgUmVjb3JkIGludG8gYW5vdGhlciBSZWNvcmQgdXNpbmcgYSBncm91cGluZ1xuICogZnVuY3Rpb24uXG4gKi9cbmV4cG9ydHMuZ3JvdXAgPSBmdW5jdGlvbiAociwgZikge1xuICAgIHJldHVybiBleHBvcnRzLnJlZHVjZShyLCB7fSwgZnVuY3Rpb24gKHAsIGMsIGspIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHZhciBnID0gZihjLCBrLCByKTtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMubWVyZ2UocCwgKF9hID0ge30sXG4gICAgICAgICAgICBfYVtnXSA9IGV4cG9ydHMuaXNSZWNvcmQocFtnXSkgP1xuICAgICAgICAgICAgICAgIGV4cG9ydHMubWVyZ2UocFtnXSwgKF9iID0ge30sIF9iW2tdID0gYywgX2IpKSA6IChfYyA9IHt9LCBfY1trXSA9IGMsIF9jKSxcbiAgICAgICAgICAgIF9hKSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKiB2YWx1ZXMgcmV0dXJucyBhIHNoYWxsb3cgYXJyYXkgb2YgdGhlIHZhbHVlcyBvZiBhIHJlY29yZC5cbiAqL1xuZXhwb3J0cy52YWx1ZXMgPSBmdW5jdGlvbiAocikge1xuICAgIHJldHVybiBleHBvcnRzLnJlZHVjZShyLCBbXSwgZnVuY3Rpb24gKHAsIGMpIHsgcmV0dXJuIGFycmF5XzEuY29uY2F0KHAsIGMpOyB9KTtcbn07XG4vKipcbiAqIGNvbnRhaW5zIGluZGljYXRlcyB3aGV0aGVyIGEgUmVjb3JkIGhhcyBhIGdpdmVuIGtleS5cbiAqL1xuZXhwb3J0cy5jb250YWlucyA9IGZ1bmN0aW9uIChyLCBrZXkpIHtcbiAgICByZXR1cm4gT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwociwga2V5KTtcbn07XG4vKipcbiAqIGNsb25lIGEgUmVjb3JkLlxuICpcbiAqIEJyZWFrcyByZWZlcmVuY2VzIGFuZCBkZWVwIGNsb25lcyBhcnJheXMuXG4gKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlIHVzZWQgb24gUmVjb3JkcyBvciBvYmplY3RzIHRoYXRcbiAqIGFyZSBub3QgY2xhc3MgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmNsb25lID0gZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5yZWR1Y2Uociwge30sIGZ1bmN0aW9uIChwLCBjLCBrKSB7IHBba10gPSBfY2xvbmUoYyk7IHJldHVybiBwOyB9KTtcbn07XG52YXIgX2Nsb25lID0gZnVuY3Rpb24gKGEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhKSlcbiAgICAgICAgcmV0dXJuIGEubWFwKF9jbG9uZSk7XG4gICAgZWxzZSBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKVxuICAgICAgICByZXR1cm4gZXhwb3J0cy5jbG9uZShhKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBhO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBpc011bHRpcGxlT2YgdGVzdHMgd2hldGhlciB0aGUgSW50ZWdlciAneScgaXMgYSBtdWx0aXBsZSBvZiB4LlxuICovXG5leHBvcnRzLmlzTXVsdGlwbGVPZiA9IGZ1bmN0aW9uICh4LCB5KSB7IHJldHVybiAoKHkgJSB4KSA9PT0gMCk7IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuO1xuLyoqXG4gKiBDb21wb25lbnQgaXMgYW4gYWJzdHJhY3QgV2lkZ2V0IGltcGxlbWVudGF0aW9uXG4gKiB0aGF0IGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgbWFudWFsbHkgaW1wbGVtZW50aW5nIHRoZSB3aG9sZSBpbnRlcmZhY2UuXG4gKi9cbnZhciBDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBfSBhdHRycyBpcyB0aGUgYXR0cmlidXRlcyB0aGlzIENvbXBvbmVudCBleGNlcHRzLlxuICAgICAqIEBwYXJhbSB7Q29udGVudFtdfSBjaGlsZHJlbiBpcyBhbiBhcnJheSBvZiBjb250ZW50IGZvciBDb21wb25lbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB0aGlzLmF0dHJzID0gYXR0cnM7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB9XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXJlZCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlbW92ZWQgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLnZpZXcucmVuZGVyKCk7IH07XG4gICAgcmV0dXJuIENvbXBvbmVudDtcbn0oKSk7XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJlY29yZF8xID0gcmVxdWlyZShcIkBxdWVuay9ub25pL2xpYi9kYXRhL3JlY29yZFwiKTtcbnZhciB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vbGliL3V0aWxcIik7XG52YXIgYXBwXzEgPSByZXF1aXJlKFwiLi93bWwvYXBwXCIpO1xudmFyIHBhZ2VzXzEgPSByZXF1aXJlKFwiLi9wYWdlc1wiKTtcbnZhciBwYWdlczJQYWdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG1wID0gcmVjb3JkXzEuZ3JvdXAocGFnZXNfMS5wYWdlcywgZnVuY3Rpb24gKF8sIGspIHsgcmV0dXJuIGsuc3BsaXQoJ18nKVswXTsgfSk7XG4gICAgZm9yICh2YXIgc2VjIGluIHRtcClcbiAgICAgICAgaWYgKHRtcC5oYXNPd25Qcm9wZXJ0eShzZWMpKSB7XG4gICAgICAgICAgICB2YXIgbmV3U2VjID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lXzEgaW4gdG1wW3NlY10pXG4gICAgICAgICAgICAgICAgaWYgKHRtcFtzZWNdLmhhc093blByb3BlcnR5KG5hbWVfMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VjW25hbWVfMS5zcGxpdCgnXycpWzFdXSA9IHRtcFtzZWNdW25hbWVfMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG1wW3NlY10gPSBuZXdTZWM7XG4gICAgICAgIH1cbiAgICByZXR1cm4gdG1wO1xufTtcbnZhciBwYWdlczJNb2R1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZWNvcmRfMS5yZWR1Y2UocGFnZXNfMS5wYWdlcywge30sIGZ1bmN0aW9uIChwLCBjLCBrKSB7XG4gICAgICAgIHBbay5zcGxpdCgnXycpWzFdXSA9IGM7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH0pO1xufTtcbi8qKlxuICogQXBwIGRpc3BsYXlpbmcgYWxsIHRoZSB3bWwgd2lkZ2V0cy5cbiAqL1xudmFyIEFwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcHAocm9vdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgYXBwXzEuTWFpbih0aGlzKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gW107XG4gICAgICAgIHRoaXMucGFnZSA9ICcnO1xuICAgICAgICB0aGlzLnBhZ2VzID0gcGFnZXMyUGFnZXMoKTtcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gcGFnZXMyTW9kdWxlcygpO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IHtcbiAgICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICAgICAgbGF5b3V0OiAnbGF5b3V0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogbmF2aWdhdGUgaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIGFcbiAgICAgICAgICogbmF2aWdhdGlvbiBsaW5rLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uYXZpZ2F0ZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lO1xuICAgICAgICAgICAgX3RoaXMucGFnZSA9IG5hbWU7XG4gICAgICAgICAgICBpZiAoX3RoaXMubW9kdWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNvbnRlbnQgPSBbX3RoaXMubW9kdWxlc1tuYW1lXS52aWV3LnJlbmRlcigpXTtcbiAgICAgICAgICAgICAgICBfdGhpcy52aWV3LmludmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRvZ2dsZURyYXdlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50b2dnbGVEcmF3ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1dGlsXzEuZ2V0QnlJZChfdGhpcy52aWV3LCBfdGhpcy52YWx1ZXMuaWQubGF5b3V0KVxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQudG9nZ2xlKCk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBydW4gdGhlIGFwcGxpY2F0aW9uLlxuICAgICAqL1xuICAgIEFwcC5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm9vdCA9IHRoaXMucm9vdDtcbiAgICAgICAgd2hpbGUgKHJvb3QubGFzdENoaWxkKVxuICAgICAgICAgICAgcm9vdC5yZW1vdmVDaGlsZChyb290Lmxhc3RDaGlsZCk7XG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy52aWV3LnJlbmRlcigpKTtcbiAgICAgICAgdmFyIHBhdGggPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdCgnIycpWzFdO1xuICAgICAgICBwYXRoID0gcGF0aCA/IHBhdGguc3BsaXQoJy8nKS5qb2luKCcnKSA6ICcnO1xuICAgIH07XG4gICAgQXBwLm1haW4gPSBmdW5jdGlvbiAocm9vdCkge1xuICAgICAgICByZXR1cm4gbmV3IEFwcChyb290KTtcbiAgICB9O1xuICAgIHJldHVybiBBcHA7XG59KCkpO1xuZXhwb3J0cy5BcHAgPSBBcHA7XG5BcHAubWFpbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpLnJ1bigpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHBhbmVsXzEgPSByZXF1aXJlKFwiLi93bWwvcGFuZWxcIik7XG52YXIgUGFuZWxQYWdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhbmVsUGFnZSgpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IHBhbmVsXzEuTWFpbih0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIFBhbmVsUGFnZTtcbn0oKSk7XG5leHBvcnRzLlBhbmVsUGFnZSA9IFBhbmVsUGFnZTtcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBQYW5lbFBhZ2UoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGdyaWRfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9saWIvbGF5b3V0L2dyaWRcIik7XG47XG52YXIgcGFuZWxfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9saWIvbGF5b3V0L3BhbmVsXCIpO1xuO1xudmFyIHN0eWxlXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbGliL2NvbnRlbnQvc3R5bGVcIik7XG47XG52YXIgbWF5YmVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvbm9uaS9saWIvZGF0YS9tYXliZVwiKTtcbmV4cG9ydHMuJCRmb3JJbiA9IGZ1bmN0aW9uIChsaXN0LCBmLCBhbHQpIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICByZXQgPSByZXQuY29uY2F0KGYobGlzdFtpXSwgaSwgbGlzdCkpO1xuICAgIHJldHVybiByZXQubGVuZ3RoID09PSAwID8gYWx0KCkgOiByZXQ7XG59O1xuZXhwb3J0cy4kJGZvck9mID0gZnVuY3Rpb24gKG8sIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbylcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoZigobylba2V5XSwga2V5LCBvKSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMud2lkZ2V0KGdyaWRfMS5HcmlkTGF5b3V0LCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIGV4cG9ydHMuJCRmb3JJbihzdHlsZV8xLnN0eWxlcywgZnVuY3Rpb24gKHN0eWxlLCBfJCRpLCBfJCRhbGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KGdyaWRfMS5Sb3csIHsgaHRtbDoge30sIHdtbDoge30gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KGdyaWRfMS5Db2x1bW4sIHsgaHRtbDoge30sIHdtbDoge30sIHd3OiB7ICdzcGFuJzogNCB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQocGFuZWxfMS5QYW5lbCwgeyBodG1sOiB7fSwgd21sOiB7fSwgd3c6IHsgJ3N0eWxlJzogc3R5bGUgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLndpZGdldChwYW5lbF8xLlBhbmVsQm9keSwgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlxcbiAgICAgICAgICAgIFBhbmVsQm9keSBvbmx5LlxcbiAgICAgICAgICBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQoZ3JpZF8xLkNvbHVtbiwgeyBodG1sOiB7fSwgd21sOiB7fSwgd3c6IHsgJ3NwYW4nOiA0IH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLndpZGdldChwYW5lbF8xLlBhbmVsLCB7IGh0bWw6IHt9LCB3bWw6IHt9LCB3dzogeyAnc3R5bGUnOiBzdHlsZSB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KHBhbmVsXzEuUGFuZWxIZWFkZXIsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcXG4gICAgICAgICAgICBXaXRoIFBhbmVsSGVhZGVyXFxuICAgICAgICAgIFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KHBhbmVsXzEuUGFuZWxCb2R5LCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXFxuICAgICAgICAgICAgTG9yZW0gaW1wc3VtIGRpbGl1bSBuZXQgc2V0LlxcbiAgICAgICAgICBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQoZ3JpZF8xLkNvbHVtbiwgeyBodG1sOiB7fSwgd21sOiB7fSwgd3c6IHsgJ3NwYW4nOiA0IH0gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLndpZGdldChwYW5lbF8xLlBhbmVsLCB7IGh0bWw6IHt9LCB3bWw6IHt9LCB3dzogeyAnc3R5bGUnOiBzdHlsZSB9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KHBhbmVsXzEuUGFuZWxIZWFkZXIsIHsgaHRtbDoge30sIHdtbDoge30gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJXaXRoIFBhbmVsRm9vdGVyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQocGFuZWxfMS5QYW5lbEJvZHksIHsgaHRtbDoge30sIHdtbDoge30gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJMb3JlbSBpbXBzdW0gZGlsaXVtIG5ldCBzZXQuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQocGFuZWxfMS5QYW5lbEZvb3RlciwgeyBodG1sOiB7fSwgd21sOiB7fSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIk1laCBmb290LlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKFtdKTsgfSkuc2xpY2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE1haW4ucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGUsIGF0dHJzKSB7XG4gICAgICAgIHZhciBpZCA9IGF0dHJzLndtbC5pZDtcbiAgICAgICAgdmFyIGdyb3VwID0gYXR0cnMud21sLmdyb3VwO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgaWQgJ1wiICsgaWQgKyBcIicgZGV0ZWN0ZWQhXCIpO1xuICAgICAgICAgICAgdGhpcy5pZHNbaWRdID0gZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gdGhpcy5ncm91cHNbZ3JvdXBdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24gKHRhZywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJzWydodG1sJ10gPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cnNbJ2h0bWwnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cnNbJ2h0bWwnXVtrZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcmV2ZW50IHNldHRpbmcgdGhpbmdzIGxpa2UgZGlzYWJsZWQ9JydcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0biA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgYyk7XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQodG4pO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4gbm90IGFkb3B0IGNoaWxkIFwiICsgYyArIFwiIG9mIHR5cGUgXCIgKyB0eXBlb2YgYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKGUsIGF0dHJzKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21OdWxsYWJsZSh0aGlzLmlkc1tpZF0pO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuZmluZEJ5R3JvdXAgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tQXJyYXkodGhpcy5ncm91cHMuaGFzT3duUHJvcGVydHkobmFtZSkgP1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbbmFtZV0gOlxuICAgICAgICAgICAgW10pO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID9cbiAgICAgICAgICAgIHRoaXMuaWRzWydyb290J10gOlxuICAgICAgICAgICAgdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBNYWluO1xufSgpKTtcbmV4cG9ydHMuTWFpbiA9IE1haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYW5lbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGFnZXMgPSB7XG4gICAgbGF5b3V0X3BhbmVsOiByZXF1aXJlKCcuL3BhZ2UvbGF5b3V0X3BhbmVsJykuZGVmYXVsdCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWdlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBkcmF3ZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9saWIvbGF5b3V0L2RyYXdlclwiKTtcbjtcbnZhciBhY3Rpb25fYmFyXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbGliL2xheW91dC9hY3Rpb24tYmFyXCIpO1xuO1xuO1xudmFyIGxpbmtfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9saWIvY29udGVudC9saW5rXCIpO1xuO1xudmFyIG1lbnVfaWNvbl8xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2xpYi9jb250ZW50L21lbnUtaWNvblwiKTtcbjtcbnZhciBtYWluXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbGliL2xheW91dC9tYWluXCIpO1xuO1xudmFyIG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRpb25cIik7XG52YXIgbWF5YmVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvbm9uaS9saWIvZGF0YS9tYXliZVwiKTtcbmV4cG9ydHMuJCRmb3JJbiA9IGZ1bmN0aW9uIChsaXN0LCBmLCBhbHQpIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICByZXQgPSByZXQuY29uY2F0KGYobGlzdFtpXSwgaSwgbGlzdCkpO1xuICAgIHJldHVybiByZXQubGVuZ3RoID09PSAwID8gYWx0KCkgOiByZXQ7XG59O1xuZXhwb3J0cy4kJGZvck9mID0gZnVuY3Rpb24gKG8sIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbylcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoZigobylba2V5XSwga2V5LCBvKSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG52YXIgTWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluKF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMud2lkZ2V0KGRyYXdlcl8xLkRyYXdlckxheW91dCwgeyBodG1sOiB7fSwgd21sOiB7ICdpZCc6IF9fY29udGV4dC52YWx1ZXMuaWQubGF5b3V0IH0sIHd3OiB7ICdkcmF3ZXJDb250ZW50JzogW1xuICAgICAgICAgICAgICAgICAgICAgICAgKG5ldyBuYXZpZ2F0aW9uXzEuTmF2aWdhdGlvbihfX2NvbnRleHQpKS5yZW5kZXIoKVxuICAgICAgICAgICAgICAgICAgICBdIH0gfSwgW1xuICAgICAgICAgICAgICAgIF90aGlzLndpZGdldChhY3Rpb25fYmFyXzEuQWN0aW9uQmFyLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KGxpbmtfMS5MaW5rLCB7IGh0bWw6IHt9LCB3bWw6IHt9LCB3dzogeyAnb25DbGljayc6IF9fY29udGV4dC50b2dnbGVEcmF3ZXIgfSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQobWVudV9pY29uXzEuTWVudUljb24sIHsgaHRtbDoge30sIHdtbDoge30gfSwgW10pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KG1haW5fMS5NYWluTGF5b3V0LCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIChfX2NvbnRleHQuY29udGVudCkuc2xpY2UoKSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBNYWluLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChlLCBhdHRycykge1xuICAgICAgICB2YXIgaWQgPSBhdHRycy53bWwuaWQ7XG4gICAgICAgIHZhciBncm91cCA9IGF0dHJzLndtbC5ncm91cDtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkcy5oYXNPd25Qcm9wZXJ0eShpZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHVwbGljYXRlIGlkICdcIiArIGlkICsgXCInIGRldGVjdGVkIVwiKTtcbiAgICAgICAgICAgIHRoaXMuaWRzW2lkXSA9IGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXSA9IHRoaXMuZ3JvdXBzW2dyb3VwXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2dyb3VwXS5wdXNoKGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyc1snaHRtbCddID09PSAnb2JqZWN0JylcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGF0dHJzWydodG1sJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGF0dHJzWydodG1sJ11ba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJldmVudCBzZXR0aW5nIHRoaW5ncyBsaWtlIGRpc2FibGVkPScnXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zZXRBdHRyaWJ1dGUoa2V5LCBcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdG4gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyArIGMpO1xuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKHRuKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBlLmFwcGVuZENoaWxkKGMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2FuIG5vdCBhZG9wdCBjaGlsZCBcIiArIGMgKyBcIiBvZiB0eXBlIFwiICsgdHlwZW9mIGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihlLCBhdHRycyk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUud2lkZ2V0ID0gZnVuY3Rpb24gKEMsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgICAgICB2YXIgdyA9IG5ldyBDKGF0dHJzLCBjaGlsZHJlbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIodywgYXR0cnMpO1xuICAgICAgICB0aGlzLndpZGdldHMucHVzaCh3KTtcbiAgICAgICAgcmV0dXJuIHcucmVuZGVyKCk7XG4gICAgfTtcbiAgICBNYWluLnByb3RvdHlwZS5maW5kQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tTnVsbGFibGUodGhpcy5pZHNbaWRdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmZpbmRCeUdyb3VwID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlXzEuZnJvbUFycmF5KHRoaXMuZ3JvdXBzLmhhc093blByb3BlcnR5KG5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW25hbWVdIDpcbiAgICAgICAgICAgIFtdKTtcbiAgICB9O1xuICAgIE1haW4ucHJvdG90eXBlLmludmFsaWRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0cmVlID0gdGhpcy50cmVlO1xuICAgICAgICB2YXIgcGFyZW50ID0gdHJlZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAodHJlZSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2FybignaW52YWxpZGF0ZSgpOiAnICsgJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyB0aGF0IGhhcyBub3QgYmVlbiByZW5kZXJlZCEnKTtcbiAgICAgICAgaWYgKHRyZWUucGFyZW50Tm9kZSA9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW52YWxpZGF0ZSBhIHZpZXcgIHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMucmVuZGVyKCksIHRyZWUpO1xuICAgIH07XG4gICAgTWFpbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW1vdmVkKCk7IH0pO1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gdGhpcy50ZW1wbGF0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5pZHNbJ3Jvb3QnXSA9ICh0aGlzLmlkc1sncm9vdCddKSA/XG4gICAgICAgICAgICB0aGlzLmlkc1sncm9vdCddIDpcbiAgICAgICAgICAgIHRoaXMudHJlZTtcbiAgICAgICAgdGhpcy53aWRnZXRzLmZvckVhY2goZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcucmVuZGVyZWQoKTsgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWU7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbjtcbn0oKSk7XG5leHBvcnRzLk1haW4gPSBNYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuO1xudmFyIG5hdl8xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2xpYi9tZW51L25hdlwiKTtcbjtcbnZhciBpdGVtXzEgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbGliL21lbnUvaXRlbVwiKTtcbjtcbnZhciBoZWFkZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi9saWIvbWVudS9oZWFkZXJcIik7XG47XG52YXIgbGlua18xID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL2xpYi9jb250ZW50L2xpbmtcIik7XG52YXIgbWF5YmVfMSA9IHJlcXVpcmUoXCJAcXVlbmsvbm9uaS9saWIvZGF0YS9tYXliZVwiKTtcbmV4cG9ydHMuJCRmb3JJbiA9IGZ1bmN0aW9uIChsaXN0LCBmLCBhbHQpIHtcbiAgICB2YXIgcmV0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICByZXQgPSByZXQuY29uY2F0KGYobGlzdFtpXSwgaSwgbGlzdCkpO1xuICAgIHJldHVybiByZXQubGVuZ3RoID09PSAwID8gYWx0KCkgOiByZXQ7XG59O1xuZXhwb3J0cy4kJGZvck9mID0gZnVuY3Rpb24gKG8sIGYsIGFsdCkge1xuICAgIHZhciByZXQgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbylcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSlcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQoZigobylba2V5XSwga2V5LCBvKSk7XG4gICAgcmV0dXJuIHJldC5sZW5ndGggPT09IDAgPyBhbHQoKSA6IHJldDtcbn07XG52YXIgTmF2aWdhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZpZ2F0aW9uKF9fY29udGV4dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkcyA9IHt9O1xuICAgICAgICB0aGlzLmdyb3VwcyA9IHt9O1xuICAgICAgICB0aGlzLndpZGdldHMgPSBbXTtcbiAgICAgICAgdGhpcy50cmVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSBmdW5jdGlvbiAoX190aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMud2lkZ2V0KG5hdl8xLk5hdiwgeyBodG1sOiB7fSwgd21sOiB7fSwgd3c6IHsgJ3ZlcnRpY2FsJzogdHJ1ZSB9IH0sIFtcbiAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQoaXRlbV8xLkl0ZW0sIHsgaHRtbDoge30sIHdtbDoge30gfSwgW1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQobGlua18xLkxpbmssIHsgaHRtbDoge30sIHdtbDogeyAnZ3JvdXAnOiBcImxpbmtzXCIgfSwgd3c6IHsgJ2FjdGl2ZSc6IChfX2NvbnRleHQucGFnZSA9PT0gXCJob21lXCIpLCAnbmFtZSc6IFwiaG9tZVwiLCAnaHJlZic6IFwiI1wiLCAnb25DbGljayc6IF9fY29udGV4dC5uYXZpZ2F0ZSwgJ3RleHQnOiBcIkhvbWVcIiB9IH0sIFtdKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdLmNvbmNhdChleHBvcnRzLiQkZm9yT2YoX19jb250ZXh0LnBhZ2VzLCBmdW5jdGlvbiAoaXRlbXMsIHNlY3Rpb24sIF8kJGFsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoW1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy53aWRnZXQoaXRlbV8xLkl0ZW0sIHsgaHRtbDoge30sIHdtbDoge30gfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KGhlYWRlcl8xLk1lbnVIZWFkZXIsIHsgaHRtbDoge30sIHdtbDoge30sIHd3OiB7ICd0ZXh0Jzogc2VjdGlvbiB9IH0sIFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLndpZGdldChuYXZfMS5OYXYsIHsgaHRtbDoge30sIHdtbDoge30sIHd3OiB7ICd2ZXJ0aWNhbCc6IHRydWUgfSB9LCBleHBvcnRzLiQkZm9yT2YoaXRlbXMsIGZ1bmN0aW9uIChfLCBuYW1lLCBfJCRhbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMud2lkZ2V0KGl0ZW1fMS5JdGVtLCB7IGh0bWw6IHt9LCB3bWw6IHt9IH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLndpZGdldChsaW5rXzEuTGluaywgeyBodG1sOiB7fSwgd21sOiB7ICdncm91cCc6IFwibGlua3NcIiB9LCB3dzogeyAnbmFtZSc6IG5hbWUsICdocmVmJzogKFwiIy9cIiArIG5hbWUpLCAnb25DbGljayc6IF9fY29udGV4dC5uYXZpZ2F0ZSwgJ2FjdGl2ZSc6IChfX2NvbnRleHQucGFnZSA9PT0gbmFtZSksICd0ZXh0JzogbmFtZSB9IH0sIFtdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gKFtdKTsgfSkuc2xpY2UoKSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIChbXSk7IH0pKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE5hdmlnYXRpb24ucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGUsIGF0dHJzKSB7XG4gICAgICAgIHZhciBpZCA9IGF0dHJzLndtbC5pZDtcbiAgICAgICAgdmFyIGdyb3VwID0gYXR0cnMud21sLmdyb3VwO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaWRzLmhhc093blByb3BlcnR5KGlkKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEdXBsaWNhdGUgaWQgJ1wiICsgaWQgKyBcIicgZGV0ZWN0ZWQhXCIpO1xuICAgICAgICAgICAgdGhpcy5pZHNbaWRdID0gZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdID0gdGhpcy5ncm91cHNbZ3JvdXBdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbZ3JvdXBdLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBOYXZpZ2F0aW9uLnByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24gKHRhZywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgICBpZiAodHlwZW9mIGF0dHJzWydodG1sJ10gPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgT2JqZWN0LmtleXMoYXR0cnNbJ2h0bWwnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cnNbJ2h0bWwnXVtrZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcmV2ZW50IHNldHRpbmcgdGhpbmdzIGxpa2UgZGlzYWJsZWQ9JydcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICBlLnNldEF0dHJpYnV0ZShrZXksIFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0biA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnICsgYyk7XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQodG4pO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGUuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW4gbm90IGFkb3B0IGNoaWxkIFwiICsgYyArIFwiIG9mIHR5cGUgXCIgKyB0eXBlb2YgYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKGUsIGF0dHJzKTtcbiAgICAgICAgcmV0dXJuIGU7XG4gICAgfTtcbiAgICBOYXZpZ2F0aW9uLnByb3RvdHlwZS53aWRnZXQgPSBmdW5jdGlvbiAoQywgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciB3ID0gbmV3IEMoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3Rlcih3LCBhdHRycyk7XG4gICAgICAgIHRoaXMud2lkZ2V0cy5wdXNoKHcpO1xuICAgICAgICByZXR1cm4gdy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIE5hdmlnYXRpb24ucHJvdG90eXBlLmZpbmRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBtYXliZV8xLmZyb21OdWxsYWJsZSh0aGlzLmlkc1tpZF0pO1xuICAgIH07XG4gICAgTmF2aWdhdGlvbi5wcm90b3R5cGUuZmluZEJ5R3JvdXAgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gbWF5YmVfMS5mcm9tQXJyYXkodGhpcy5ncm91cHMuaGFzT3duUHJvcGVydHkobmFtZSkgP1xuICAgICAgICAgICAgdGhpcy5ncm91cHNbbmFtZV0gOlxuICAgICAgICAgICAgW10pO1xuICAgIH07XG4gICAgTmF2aWdhdGlvbi5wcm90b3R5cGUuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRyZWUgPSB0aGlzLnRyZWU7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmICh0cmVlID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuKCdpbnZhbGlkYXRlKCk6ICcgKyAnQ2Fubm90IGludmFsaWRhdGUgYSB2aWV3IHRoYXQgaGFzIG5vdCBiZWVuIHJlbmRlcmVkIScpO1xuICAgICAgICBpZiAodHJlZS5wYXJlbnROb2RlID09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZhbGlkYXRlIGEgdmlldyAgdGhhdCBoYXMgbm90IGJlZW4gcmVuZGVyZWQhJyk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5yZW5kZXIoKSwgdHJlZSk7XG4gICAgfTtcbiAgICBOYXZpZ2F0aW9uLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWRzID0ge307XG4gICAgICAgIHRoaXMud2lkZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh3KSB7IHJldHVybiB3LnJlbW92ZWQoKTsgfSk7XG4gICAgICAgIHRoaXMud2lkZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLnRyZWUgPSB0aGlzLnRlbXBsYXRlKHRoaXMpO1xuICAgICAgICB0aGlzLmlkc1sncm9vdCddID0gKHRoaXMuaWRzWydyb290J10pID9cbiAgICAgICAgICAgIHRoaXMuaWRzWydyb290J10gOlxuICAgICAgICAgICAgdGhpcy50cmVlO1xuICAgICAgICB0aGlzLndpZGdldHMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy5yZW5kZXJlZCgpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZTtcbiAgICB9O1xuICAgIHJldHVybiBOYXZpZ2F0aW9uO1xufSgpKTtcbmV4cG9ydHMuTmF2aWdhdGlvbiA9IE5hdmlnYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXZpZ2F0aW9uLmpzLm1hcCJdfQ==
