"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const text_input_1 = require("../../../../../../lib/control/text-input");
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
                        __document.createTextNode('\u000a      This is a text input: \u000a      '),
                        __this.widget(new text_input_1.TextInput({ 'match': '[a-zA-Z]', 'length': 20, 'onChange': __context.onChange }, []), { 'match': '[a-zA-Z]', 'length': 20, 'onChange': __context.onChange }),
                        __document.createTextNode('.\u000a    ')
                    ]),
                    __this.node('p', {}, [
                        __document.createTextNode('As you type '),
                        __this.node('b', { wml: { 'id': 'txt' } }, [
                            __document.createTextNode('this')
                        ]),
                        __document.createTextNode(' changes, but only for letters. (20)')
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    ...__forIn(__context.sizes, (v, _$$i, _$$all) => ([
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' neutral: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'size': v }, []), { 'onChange': __context.onChange, 'size': v })
                        ]),
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' error: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'size': v, 'className': '-error' }, []), { 'onChange': __context.onChange, 'size': v, 'className': '-error' })
                        ]),
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' warning: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'size': v, 'className': '-warning' }, []), { 'onChange': __context.onChange, 'size': v, 'className': '-warning' })
                        ]),
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' success: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'size': v, 'className': '-success' }, []), { 'onChange': __context.onChange, 'size': v, 'className': '-success' })
                        ])
                    ]), () => ([]))
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('p', {}, [
                        __document.createTextNode('\u000a      Block:\u000a      '),
                        __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'block': true }, []), { 'onChange': __context.onChange, 'block': true })
                    ])
                ]), {}),
                __this.node('p', {}, [
                    __document.createTextNode(' Textarea: ')
                ]),
                __this.widget(new demo_1.Demo({}, [
                    ...__forIn(__context.sizes, (v, _$$i, _$$all) => ([
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' neutral: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'rows': 5, 'size': v }, []), { 'onChange': __context.onChange, 'rows': 5, 'size': v })
                        ]),
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' error: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'size': v, 'rows': 5, 'className': '-error' }, []), { 'onChange': __context.onChange, 'size': v, 'rows': 5, 'className': '-error' })
                        ]),
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' warning: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'size': v, 'rows': 5, 'className': '-warning' }, []), { 'onChange': __context.onChange, 'size': v, 'rows': 5, 'className': '-warning' })
                        ]),
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Size '),
                            document.createTextNode((v + ' success: ')),
                            __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'size': v, 'rows': 5, 'className': '-success' }, []), { 'onChange': __context.onChange, 'size': v, 'rows': 5, 'className': '-success' })
                        ])
                    ]), () => ([]))
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('p', {}, [
                        __document.createTextNode('\u000a      Block:\u000a      '),
                        __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'block': true, 'rows': 5 }, []), { 'onChange': __context.onChange, 'block': true, 'rows': 5 })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('p', {}, [
                        __document.createTextNode('\u000a      Autofocused:\u000a      '),
                        __this.widget(new text_input_1.TextInput({ 'onChange': __context.onChange, 'focus': true }, []), { 'onChange': __context.onChange, 'focus': true })
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
//# sourceMappingURL=text-input.js.map