"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.FooterView = exports.BodyView = exports.HeaderView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const demo_1 = require("../../../widgets/demo");
;
const table_1 = require("../../../../../../lib/layout/table");
;
//@ts-ignore:6192
const __if = (__expr, __conseq, __alt) => (__expr) ? __conseq() : __alt ? __alt() : [];
//@ts-ignore:6192
const __forIn = (list, f, alt) => {
    let ret = [];
    for (let i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
const __forOf = (o, f, alt) => {
    let ret = [];
    for (let key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
// @ts-ignore 6192
const text = __document.text;
// @ts-ignore 6192
const unsafe = __document.unsafe;
// @ts-ignore 6192
const isSet = (value) => value != null;
class HeaderView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new table_1.TableHeader({}, [
                __this.widget(new table_1.TableRow({}, [
                    __this.widget(new table_1.TableHeading({}, [
                        __document.createTextNode('Name')
                    ]), {}),
                    __this.widget(new table_1.TableHeading({}, [
                        __document.createTextNode('Email')
                    ]), {}),
                    __this.widget(new table_1.TableHeading({}, [
                        __document.createTextNode('Balance')
                    ]), {}),
                    __this.widget(new table_1.TableHeading({}, [
                        __document.createTextNode('Username')
                    ]), {}),
                    __this.widget(new table_1.TableHeading({}, [
                        __document.createTextNode('Status')
                    ]), {})
                ]), {})
            ]), {});
        };
    }
    registerView(v) {
        this.views.push(v);
        return v;
    }
    register(e, attrs) {
        let attrsMap = attrs;
        if (attrsMap.wml) {
            let { id, group } = attrsMap.wml;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error(`Duplicate id '${id}' detected!`);
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    }
    node(tag, attrs, children) {
        let e = __document.createElement(tag);
        Object.keys(attrs).forEach(key => {
            let value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, '');
            }
            else if (!__document.isBrowser &&
                value instanceof __document.WMLDOMText) {
                e.setAttribute(key, value);
            }
        });
        children.forEach(c => {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    let tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);
            }
        });
        this.register(e, attrs);
        return e;
    }
    widget(w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    }
    findById(id) {
        let mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findById(id), mW);
    }
    findByGroup(name) {
        let mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findByGroup(name), mGroup);
    }
    invalidate() {
        let { tree } = this;
        let parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    }
    render() {
        this.ids = {};
        this.widgets.forEach(w => w.removed());
        this.widgets = [];
        this.views = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(w => w.rendered());
        return this.tree;
    }
}
exports.HeaderView = HeaderView;
;
class BodyView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new table_1.TableBody({}, [
                __this.widget(new table_1.TableRow({}, [
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('Length Wise')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('lw@theemailplace.com')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('$5000')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('lw')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('Active')
                    ]), {})
                ]), {}),
                __this.widget(new table_1.TableRow({}, [
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('First Chance')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('fchacne@live.tt')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('$1.00')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('chance')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('Inactive')
                    ]), {})
                ]), {}),
                __this.widget(new table_1.TableRow({}, [
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('Du Pear')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('dupear@gmail.com')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('$10,000.00')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('pearboy')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('Active')
                    ]), {})
                ]), {}),
                __this.widget(new table_1.TableRow({}, [
                    __this.widget(new table_1.TableCell({ ww: { 'rowspan': 2, 'colspan': 5 } }, [
                        __document.createTextNode('This spans 2 rows 5 columns.')
                    ]), { ww: { 'rowspan': 2, 'colspan': 5 } })
                ]), {})
            ]), {});
        };
    }
    registerView(v) {
        this.views.push(v);
        return v;
    }
    register(e, attrs) {
        let attrsMap = attrs;
        if (attrsMap.wml) {
            let { id, group } = attrsMap.wml;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error(`Duplicate id '${id}' detected!`);
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    }
    node(tag, attrs, children) {
        let e = __document.createElement(tag);
        Object.keys(attrs).forEach(key => {
            let value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, '');
            }
            else if (!__document.isBrowser &&
                value instanceof __document.WMLDOMText) {
                e.setAttribute(key, value);
            }
        });
        children.forEach(c => {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    let tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);
            }
        });
        this.register(e, attrs);
        return e;
    }
    widget(w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    }
    findById(id) {
        let mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findById(id), mW);
    }
    findByGroup(name) {
        let mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findByGroup(name), mGroup);
    }
    invalidate() {
        let { tree } = this;
        let parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    }
    render() {
        this.ids = {};
        this.widgets.forEach(w => w.removed());
        this.widgets = [];
        this.views = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(w => w.rendered());
        return this.tree;
    }
}
exports.BodyView = BodyView;
;
class FooterView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new table_1.TableFooter({}, [
                __this.widget(new table_1.TableRow({}, [
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('1')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('2')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('3')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('4')
                    ]), {}),
                    __this.widget(new table_1.TableCell({}, [
                        __document.createTextNode('5')
                    ]), {})
                ]), {})
            ]), {});
        };
    }
    registerView(v) {
        this.views.push(v);
        return v;
    }
    register(e, attrs) {
        let attrsMap = attrs;
        if (attrsMap.wml) {
            let { id, group } = attrsMap.wml;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error(`Duplicate id '${id}' detected!`);
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    }
    node(tag, attrs, children) {
        let e = __document.createElement(tag);
        Object.keys(attrs).forEach(key => {
            let value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, '');
            }
            else if (!__document.isBrowser &&
                value instanceof __document.WMLDOMText) {
                e.setAttribute(key, value);
            }
        });
        children.forEach(c => {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    let tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);
            }
        });
        this.register(e, attrs);
        return e;
    }
    widget(w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    }
    findById(id) {
        let mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findById(id), mW);
    }
    findByGroup(name) {
        let mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findByGroup(name), mGroup);
    }
    invalidate() {
        let { tree } = this;
        let parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    }
    render() {
        this.ids = {};
        this.widgets.forEach(w => w.removed());
        this.widgets = [];
        this.views = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(w => w.rendered());
        return this.tree;
    }
}
exports.FooterView = FooterView;
;
class Main {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new demo_1.Demo({}, [
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        __document.createTextNode('Normal')
                    ]),
                    __this.widget(new table_1.TableLayout({}, [
                        __this.registerView(new HeaderView(__context)).render(),
                        __this.registerView(new BodyView(__context)).render(),
                        __this.registerView(new FooterView(__context)).render()
                    ]), {})
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        __document.createTextNode(' Alternate')
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'alternate': true } }, [
                        __this.registerView(new HeaderView(__context)).render(),
                        __this.registerView(new BodyView(__context)).render(),
                        __this.registerView(new FooterView(__context)).render()
                    ]), { ww: { 'alternate': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        __document.createTextNode('Bordered')
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'bordered': true } }, [
                        __this.registerView(new HeaderView(__context)).render(),
                        __this.registerView(new BodyView(__context)).render(),
                        __this.registerView(new FooterView(__context)).render()
                    ]), { ww: { 'bordered': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        __document.createTextNode('Hoverable')
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'hoverable': true } }, [
                        __this.registerView(new HeaderView(__context)).render(),
                        __this.registerView(new BodyView(__context)).render(),
                        __this.registerView(new FooterView(__context)).render()
                    ]), { ww: { 'hoverable': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        __document.createTextNode('Compact')
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'compact': true } }, [
                        __this.registerView(new HeaderView(__context)).render(),
                        __this.registerView(new BodyView(__context)).render(),
                        __this.registerView(new FooterView(__context)).render()
                    ]), { ww: { 'compact': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new table_1.TableWindow({}, [
                        __this.widget(new table_1.TableLayout({}, [
                            __this.registerView(new HeaderView(__context)).render(),
                            __this.registerView(new BodyView(__context)).render(),
                            __this.registerView(new FooterView(__context)).render()
                        ]), {})
                    ]), {})
                ]), {})
            ]), {});
        };
    }
    registerView(v) {
        this.views.push(v);
        return v;
    }
    register(e, attrs) {
        let attrsMap = attrs;
        if (attrsMap.wml) {
            let { id, group } = attrsMap.wml;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error(`Duplicate id '${id}' detected!`);
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    }
    node(tag, attrs, children) {
        let e = __document.createElement(tag);
        Object.keys(attrs).forEach(key => {
            let value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, '');
            }
            else if (!__document.isBrowser &&
                value instanceof __document.WMLDOMText) {
                e.setAttribute(key, value);
            }
        });
        children.forEach(c => {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    let tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);
            }
        });
        this.register(e, attrs);
        return e;
    }
    widget(w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    }
    findById(id) {
        let mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findById(id), mW);
    }
    findByGroup(name) {
        let mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findByGroup(name), mGroup);
    }
    invalidate() {
        let { tree } = this;
        let parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    }
    render() {
        this.ids = {};
        this.widgets.forEach(w => w.removed());
        this.widgets = [];
        this.views = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(w => w.rendered());
        return this.tree;
    }
}
exports.Main = Main;
//# sourceMappingURL=table.js.map