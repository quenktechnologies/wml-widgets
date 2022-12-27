"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const demo_1 = require("../../../widgets/demo");
;
const stack_select_1 = require("../../../../../../lib/control/stack-select");
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
                    __this.widget(new stack_select_1.StackSelect({ wml: { 'id': __context.values.asc.id }, 'name': __context.values.asc.name, 'label': __context.values.asc.label, 'stringifier': __context.values.asc.stringifier, 'onSearch': __context.values.asc.onSearch, 'onChange': __context.values.asc.onChange }, []), { wml: { 'id': __context.values.asc.id }, 'name': __context.values.asc.name, 'label': __context.values.asc.label, 'stringifier': __context.values.asc.stringifier, 'onSearch': __context.values.asc.onSearch, 'onChange': __context.values.asc.onChange })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new stack_select_1.StackSelect({ wml: { 'id': __context.values.desc.id }, 'name': __context.values.desc.name, 'label': __context.values.desc.label, 'dir': -1, 'stringifier': __context.values.desc.stringifier, 'onSearch': __context.values.desc.onSearch, 'onChange': __context.values.desc.onChange }, []), { wml: { 'id': __context.values.desc.id }, 'name': __context.values.desc.name, 'label': __context.values.desc.label, 'dir': -1, 'stringifier': __context.values.desc.stringifier, 'onSearch': __context.values.desc.onSearch, 'onChange': __context.values.desc.onChange })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new stack_select_1.StackSelect({ wml: { 'id': __context.values.success.id }, 'name': __context.values.success.name, 'label': __context.values.success.label, 'success': __context.values.success.message, 'stringifier': __context.values.success.stringifier, 'onSearch': __context.values.success.onSearch, 'onChange': __context.values.success.onChange }, []), { wml: { 'id': __context.values.success.id }, 'name': __context.values.success.name, 'label': __context.values.success.label, 'success': __context.values.success.message, 'stringifier': __context.values.success.stringifier, 'onSearch': __context.values.success.onSearch, 'onChange': __context.values.success.onChange })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new stack_select_1.StackSelect({ wml: { 'id': __context.values.warning.id }, 'name': __context.values.warning.name, 'label': __context.values.warning.label, 'warning': __context.values.warning.message, 'stringifier': __context.values.warning.stringifier, 'onSearch': __context.values.warning.onSearch, 'onChange': __context.values.warning.onChange }, []), { wml: { 'id': __context.values.warning.id }, 'name': __context.values.warning.name, 'label': __context.values.warning.label, 'warning': __context.values.warning.message, 'stringifier': __context.values.warning.stringifier, 'onSearch': __context.values.warning.onSearch, 'onChange': __context.values.warning.onChange })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new stack_select_1.StackSelect({ wml: { 'id': __context.values.error.id }, 'name': __context.values.error.name, 'label': __context.values.error.label, 'error': __context.values.error.message, 'stringifier': __context.values.error.stringifier, 'onSearch': __context.values.error.onSearch, 'onChange': __context.values.error.onChange }, []), { wml: { 'id': __context.values.error.id }, 'name': __context.values.error.name, 'label': __context.values.error.label, 'error': __context.values.error.message, 'stringifier': __context.values.error.stringifier, 'onSearch': __context.values.error.onSearch, 'onChange': __context.values.error.onChange })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new stack_select_1.StackSelect({ 'name': __context.values.asc.name, 'label': "Disabled", 'disabled': true, 'stringifier': __context.values.asc.stringifier, 'onSearch': __context.values.asc.onSearch, 'onChange': __context.values.asc.onChange }, []), { 'name': __context.values.asc.name, 'label': "Disabled", 'disabled': true, 'stringifier': __context.values.asc.stringifier, 'onSearch': __context.values.asc.onSearch, 'onChange': __context.values.asc.onChange })
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
        let asDOMAttrs = attrs;
        let e = __document.createElement(tag, asDOMAttrs, children, attrs.wml && attrs.wml.ns || '');
        this.register(e, attrs);
        return e;
    }
    widget(w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    }
    findById(id) {
        let mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findById(id), mW);
    }
    findGroupById(name) {
        return this.groups.hasOwnProperty(name) ?
            this.groups[name] : [];
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
//# sourceMappingURL=stack-select.js.map