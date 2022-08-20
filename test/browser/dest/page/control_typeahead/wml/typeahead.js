"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const demo_1 = require("../../../widgets/demo");
;
const typeahead_1 = require("../../../../../../lib/control/typeahead");
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
                    __this.widget(new typeahead_1.Typeahead({ wml: { 'id': __context.values.normal.id }, ww: { 'name': __context.values.normal.name, 'label': __context.values.normal.label, 'stringifier': __context.values.normal.stringifier, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } }, []), { wml: { 'id': __context.values.normal.id }, ww: { 'name': __context.values.normal.name, 'label': __context.values.normal.label, 'stringifier': __context.values.normal.stringifier, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new typeahead_1.Typeahead({ wml: { 'id': __context.values.success.id }, ww: { 'name': __context.values.success.name, 'label': __context.values.success.label, 'success': __context.values.success.message, 'stringifier': __context.values.success.stringifier, 'onSearch': __context.values.success.onSearch, 'onChange': __context.values.success.onChange } }, []), { wml: { 'id': __context.values.success.id }, ww: { 'name': __context.values.success.name, 'label': __context.values.success.label, 'success': __context.values.success.message, 'stringifier': __context.values.success.stringifier, 'onSearch': __context.values.success.onSearch, 'onChange': __context.values.success.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new typeahead_1.Typeahead({ wml: { 'id': __context.values.warning.id }, ww: { 'name': __context.values.warning.name, 'label': __context.values.warning.label, 'warning': __context.values.warning.message, 'stringifier': __context.values.warning.stringifier, 'onSearch': __context.values.warning.onSearch, 'onChange': __context.values.warning.onChange } }, []), { wml: { 'id': __context.values.warning.id }, ww: { 'name': __context.values.warning.name, 'label': __context.values.warning.label, 'warning': __context.values.warning.message, 'stringifier': __context.values.warning.stringifier, 'onSearch': __context.values.warning.onSearch, 'onChange': __context.values.warning.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new typeahead_1.Typeahead({ wml: { 'id': __context.values.error.id }, ww: { 'name': __context.values.error.name, 'label': __context.values.error.label, 'error': __context.values.error.message, 'stringifier': __context.values.error.stringifier, 'onSearch': __context.values.error.onSearch, 'onChange': __context.values.error.onChange } }, []), { wml: { 'id': __context.values.error.id }, ww: { 'name': __context.values.error.name, 'label': __context.values.error.label, 'error': __context.values.error.message, 'stringifier': __context.values.error.stringifier, 'onSearch': __context.values.error.onSearch, 'onChange': __context.values.error.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new typeahead_1.Typeahead({ wml: { 'id': __context.values.block.id }, ww: { 'name': __context.values.block.name, 'label': __context.values.block.label, 'block': true, 'stringifier': __context.values.block.stringifier, 'onSearch': __context.values.block.onSearch, 'onChange': __context.values.block.onChange } }, []), { wml: { 'id': __context.values.block.id }, ww: { 'name': __context.values.block.name, 'label': __context.values.block.label, 'block': true, 'stringifier': __context.values.block.stringifier, 'onSearch': __context.values.block.onSearch, 'onChange': __context.values.block.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new typeahead_1.Typeahead({ ww: { 'name': __context.values.normal.name, 'label': 'Disabled', 'disabled': true, 'stringifier': __context.values.normal.stringifier, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } }, []), { ww: { 'name': __context.values.normal.name, 'label': 'Disabled', 'disabled': true, 'stringifier': __context.values.normal.stringifier, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } })
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
//# sourceMappingURL=typeahead.js.map