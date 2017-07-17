"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Styles = require("wml-widgets-common/Styles");
var util_1 = require("wml-widgets-common/util");
function $$boundary_to_dot(value) {
    return value.split('][').join('.').split('[').join('.');
}
function $$strip_braces(value) {
    return value.split('[').join('.').split(']').join('');
}
function $$escape_dots(value) {
    value = value.split('\'');
    return (value.length < 3) ? value.join('\'') : value.map(function (seg) {
        if (seg.length < 3)
            return seg;
        if ((seg[0] === '.') || (seg[seg.length - 1] === '.'))
            return seg;
        return seg.split('.').join('&&');
    }).join('');
}
function $$unescape_dots(value) {
    return value.split('&&').join('.');
}
function $$partify(value) {
    if (!value)
        return;
    return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}
function $$property(path, o) {
    var parts = $$partify(path);
    var first;
    if (typeof o !== 'object')
        throw new TypeError('get(): expects an object got ' + typeof o);
    if (parts.length === 1)
        return o[$$unescape_dots(parts[0])];
    if (parts.length === 0)
        return;
    first = o[parts.shift()];
    return ((typeof o === 'object') && (o !== null)) ?
        parts.reduce(function (target, prop) {
            if (target == null)
                return target;
            return target[$$unescape_dots(prop)];
        }, first) : null;
}
function $$adopt(child, e) {
    if (Array.isArray(child))
        return child.forEach(function (innerChild) { return $$adopt(innerChild, e); });
    if (child)
        e.appendChild((typeof child === 'object') ?
            child : document.createTextNode(child == null ? '' : child));
}
/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {
    return document.createTextNode(value == null ? '' : value);
}
/**
 * $$resolve property access expression to avoid
 * thowing errors if it does not exist.
 * @param {object} head
 * @param {string} path
 */
function $$resolve(head, path) {
    var ret = $$property(path, head);
    return (ret == null) ? '' : ret;
}
/**
 * $$node is called to create a regular DOM node
 * @param {string} tag
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 */
function $$node(tag, attributes, children, view) {
    var e = (tag === 'fragment') ? document.createDocumentFragment() : document.createElement(tag);
    if (typeof attributes.html === 'object')
        Object.keys(attributes.html).forEach(function (key) {
            if (typeof attributes.html[key] === 'function') {
                e[key] = attributes.html[key];
            }
            else {
                e.setAttribute(key, attributes.html[key]);
            }
        });
    children.forEach(function (c) { return $$adopt(c, e); });
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, e);
    return e;
}
/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
var Attributes = (function () {
    function Attributes(_attrs) {
        this._attrs = _attrs;
        this._attrs = _attrs;
    }
    Attributes.prototype.has = function (path) {
        return this.read(path) != null;
    };
    /**
     * read a value form the internal list.
     * @param {string} path
     * @param {*} defaultValue - This value is returned if the value is not set.
     */
    Attributes.prototype.read = function (path, defaultValue) {
        var ret = $$property(path.split(':').join('.'), this._attrs);
        return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';
    };
    return Attributes;
}());
/**
 * $$widget creates a wml widget.
 * @param {function} Construtor
 * @param {object} attributes
 * @param {array<string|number|Widget>} children
 * @param {View} view
 * @return {Widget}
 */
function $$widget(Constructor, attributes, children, view) {
    var childs = [];
    var w;
    children.forEach(function (child) { return Array.isArray(child) ?
        childs.push.apply(childs, child) : childs.push(child); });
    w = new Constructor(new Attributes(attributes), childs);
    if (attributes.wml)
        if (attributes.wml.id)
            view.register(attributes.wml.id, w);
    view.widgets.push(w);
    return w.render();
}
/**
 * $$if is called to create an if conditional construct
 * @param {*} predicate
 * @param {function} positive
 * @param {function} negative
 */
function $$if(predicate, positive, negative) {
    return (predicate) ? positive() : negative();
}
/**
 * $$for is called to create a for loop construct
 * @param {Iterable} collection
 * @param {function} cb
 */
function $$for(collection, cb) {
    if (Array.isArray(collection)) {
        return collection.map(cb);
    }
    else if (typeof collection === 'object') {
        return Object.keys(collection).map(function (key, _, all) { return cb(collection[key], key, all); });
    }
    return [];
}
/**
 * $$switch simulates a switch statement
 * @param {string|number|boolean} value
 * @param {object} cases
 */
function $$switch(value, cases) {
    var result = cases[value];
    var defaul = cases.default;
    if (result)
        return result;
    if (defaul)
        return defaul;
}
var Panel = (function () {
    function Panel(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': util_1.combine([$$resolve(Styles, 'PANEL'), this.attributes.read('ww:style', $$resolve(Styles, 'DEFAULT'))]) } }, [$$resolve(this, 'children')], view);
        };
    }
    Panel.render = function (context) {
        return (new Panel(context)).render();
    };
    Panel.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Panel.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Panel.prototype.invalidate = function () {
        var childs;
        var parent = this.tree.parentNode;
        var realFirstChild;
        var realFirstChildIndex;
        if (this.tree == null)
            throw new ReferenceError('Cannot invalidate a view that has not been rendered!');
        if (this.tree.parentNode == null)
            throw new ReferenceError('Attempt to invalidate a view that has not been inserted to DOM!');
        childs = this.tree.parentNode.children;
        //for some reason the reference stored does not have the correct parent node.
        //we do this to get a 'live' version of the node.
        for (var i = 0; i < childs.length; i++)
            if (childs[i] === this.tree) {
                realFirstChild = childs[i];
                realFirstChildIndex = i;
            }
        parent.replaceChild(this.render(), realFirstChild);
    };
    Panel.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Panel;
}());
exports.Panel = Panel;
var Header = (function () {
    function Header(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'PANEL_HEADER') } }, [$$resolve(this, 'children')], view);
        };
    }
    Header.render = function (context) {
        return (new Header(context)).render();
    };
    Header.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Header.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Header.prototype.invalidate = function () {
        var childs;
        var parent = this.tree.parentNode;
        var realFirstChild;
        var realFirstChildIndex;
        if (this.tree == null)
            throw new ReferenceError('Cannot invalidate a view that has not been rendered!');
        if (this.tree.parentNode == null)
            throw new ReferenceError('Attempt to invalidate a view that has not been inserted to DOM!');
        childs = this.tree.parentNode.children;
        //for some reason the reference stored does not have the correct parent node.
        //we do this to get a 'live' version of the node.
        for (var i = 0; i < childs.length; i++)
            if (childs[i] === this.tree) {
                realFirstChild = childs[i];
                realFirstChildIndex = i;
            }
        parent.replaceChild(this.render(), realFirstChild);
    };
    Header.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Header;
}());
exports.Header = Header;
var Body = (function () {
    function Body(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'PANEL_BODY') } }, [$$resolve(this, 'children')], view);
        };
    }
    Body.render = function (context) {
        return (new Body(context)).render();
    };
    Body.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Body.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Body.prototype.invalidate = function () {
        var childs;
        var parent = this.tree.parentNode;
        var realFirstChild;
        var realFirstChildIndex;
        if (this.tree == null)
            throw new ReferenceError('Cannot invalidate a view that has not been rendered!');
        if (this.tree.parentNode == null)
            throw new ReferenceError('Attempt to invalidate a view that has not been inserted to DOM!');
        childs = this.tree.parentNode.children;
        //for some reason the reference stored does not have the correct parent node.
        //we do this to get a 'live' version of the node.
        for (var i = 0; i < childs.length; i++)
            if (childs[i] === this.tree) {
                realFirstChild = childs[i];
                realFirstChildIndex = i;
            }
        parent.replaceChild(this.render(), realFirstChild);
    };
    Body.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Body;
}());
exports.Body = Body;
var Footer = (function () {
    function Footer(context) {
        var view = this;
        this.ids = {};
        this.widgets = [];
        this.tree = null;
        this.context = context;
        this.template = function () {
            return $$node('div', { html: { 'class': $$resolve(Styles, 'PANEL_FOOTER') } }, [$$resolve(this, 'children')], view);
        };
    }
    Footer.render = function (context) {
        return (new Footer(context)).render();
    };
    Footer.prototype.register = function (id, w) {
        if (this.ids.hasOwnProperty(id))
            throw new Error('Duplicate id \'' + id + '\' detected!');
        this.ids[id] = w;
        return this;
    };
    Footer.prototype.findById = function (id) {
        return (this.ids[id]) ? this.ids[id] : null;
    };
    Footer.prototype.invalidate = function () {
        var childs;
        var parent = this.tree.parentNode;
        var realFirstChild;
        var realFirstChildIndex;
        if (this.tree == null)
            throw new ReferenceError('Cannot invalidate a view that has not been rendered!');
        if (this.tree.parentNode == null)
            throw new ReferenceError('Attempt to invalidate a view that has not been inserted to DOM!');
        childs = this.tree.parentNode.children;
        //for some reason the reference stored does not have the correct parent node.
        //we do this to get a 'live' version of the node.
        for (var i = 0; i < childs.length; i++)
            if (childs[i] === this.tree) {
                realFirstChild = childs[i];
                realFirstChildIndex = i;
            }
        parent.replaceChild(this.render(), realFirstChild);
    };
    Footer.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root']) ? this.ids['root'] : this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Footer;
}());
exports.Footer = Footer;
//# sourceMappingURL=panel.js.map