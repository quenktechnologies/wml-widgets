"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const date_field_1 = require("../../../../../../lib/control/date-field");
;
const drop_list_1 = require("../../../../../../lib/control/drop-list");
;
const demo_1 = require("../../../widgets/demo");
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
                    __this.node('p', {}, [
                        __this.widget(new date_field_1.DateField({ wml: { 'id': __context.values.data.id }, 'name': __context.values.data.name, 'label': __context.values.data.label, 'message': __context.values.data.message, 'onChange': __context.values.data.onChange }, []), { wml: { 'id': __context.values.data.id }, 'name': __context.values.data.name, 'label': __context.values.data.label, 'message': __context.values.data.message, 'onChange': __context.values.data.onChange })
                    ])
                ]), {}),
                ...__forOf(__context.values.states, (spec, _$$k, _$$all) => ([
                    __this.widget(new demo_1.Demo({}, [
                        __this.node('p', {}, [
                            __this.widget(new date_field_1.DateField({ wml: { 'id': spec.id }, 'name': spec.name, 'label': spec.label, 'success': spec.success, 'warning': spec.warning, 'error': spec.error, 'onChange': spec.onChange }, []), { wml: { 'id': spec.id }, 'name': spec.name, 'label': spec.label, 'success': spec.success, 'warning': spec.warning, 'error': spec.error, 'onChange': spec.onChange })
                        ])
                    ]), {})
                ]), () => ([])),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('p', {}, [
                        __this.widget(new date_field_1.DateField({ wml: { 'id': __context.values.block.id }, 'name': __context.values.block.name, 'className': '-block', 'label': __context.values.block.label, 'success': __context.values.block.success, 'warning': __context.values.block.warning, 'error': __context.values.block.error, 'onChange': __context.values.block.onChange }, []), { wml: { 'id': __context.values.block.id }, 'name': __context.values.block.name, 'className': '-block', 'label': __context.values.block.label, 'success': __context.values.block.success, 'warning': __context.values.block.warning, 'error': __context.values.block.error, 'onChange': __context.values.block.onChange })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('p', {}, [
                        __this.widget(new date_field_1.DateField({ wml: { 'id': __context.values.tests.id }, 'label': __context.values.tests.label, 'name': __context.values.tests.id, 'value': __context.values.tests.value, 'onChange': __context.values.tests.onChange }, []), { wml: { 'id': __context.values.tests.id }, 'label': __context.values.tests.label, 'name': __context.values.tests.id, 'value': __context.values.tests.value, 'onChange': __context.values.tests.onChange })
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_1.DropList({ 'name': __context.values.tests.id, 'options': __context.values.tests.data, 'onSelect': __context.values.tests.onSelect }, []), { 'name': __context.values.tests.id, 'options': __context.values.tests.data, 'onSelect': __context.values.tests.onSelect })
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
//# sourceMappingURL=date-field.js.map