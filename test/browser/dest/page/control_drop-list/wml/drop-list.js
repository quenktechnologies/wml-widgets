"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const demo_1 = require("../../../widgets/demo");
;
const drop_list_1 = require("../../../../../../lib/control/drop-list");
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
                    __this.node('b', {}, [
                        __document.createTextNode('Normal')
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': __context.values.normal.name }, 'name': __context.values.normal.name, 'value': __context.values.normal.value, 'options': __context.values.normal.options, 'onSelect': __context.values.normal.onSelect }, []), { wml: { 'id': __context.values.normal.name }, 'name': __context.values.normal.name, 'value': __context.values.normal.value, 'options': __context.values.normal.options, 'onSelect': __context.values.normal.onSelect })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        __document.createTextNode('Success')
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': __context.values.success.id }, 'className': "-success", 'name': __context.values.success.name, 'options': __context.values.success.options, 'onSelect': __context.values.success.onSelect }, []), { wml: { 'id': __context.values.success.id }, 'className': "-success", 'name': __context.values.success.name, 'options': __context.values.success.options, 'onSelect': __context.values.success.onSelect })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        __document.createTextNode('Warning')
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': __context.values.warning.id }, 'className': "-warning", 'name': __context.values.warning.name, 'options': __context.values.warning.options, 'onSelect': __context.values.warning.onSelect }, []), { wml: { 'id': __context.values.warning.id }, 'className': "-warning", 'name': __context.values.warning.name, 'options': __context.values.warning.options, 'onSelect': __context.values.warning.onSelect })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        __document.createTextNode('Error')
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': __context.values.error.id }, 'className': "-error", 'name': __context.values.error.name, 'options': __context.values.error.options, 'onSelect': __context.values.error.onSelect }, []), { wml: { 'id': __context.values.error.id }, 'className': "-error", 'name': __context.values.error.name, 'options': __context.values.error.options, 'onSelect': __context.values.error.onSelect })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('p', {}, [
                        __this.node('b', {}, [
                            __document.createTextNode('Disabled')
                        ]),
                        __this.widget(new drop_list_1.DropList({ 'name': __context.values.normal.name, 'disabled': true, 'onSelect': __context.values.normal.onSelect }, []), { 'name': __context.values.normal.name, 'disabled': true, 'onSelect': __context.values.normal.onSelect })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('p', {}, [
                        __this.node('b', {}, [
                            __document.createTextNode('Block')
                        ]),
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': __context.values.block.id }, 'className': "-block", 'name': __context.values.block.name, 'block': true, 'onSelect': __context.values.block.onSelect }, []), { wml: { 'id': __context.values.block.id }, 'className': "-block", 'name': __context.values.block.name, 'block': true, 'onSelect': __context.values.block.onSelect })
                    ])
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
//# sourceMappingURL=drop-list.js.map