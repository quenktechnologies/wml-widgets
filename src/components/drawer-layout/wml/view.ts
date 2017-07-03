import * as Styles from 'common/Styles';
 
 
function $$boundary_to_dot(value) {
  return value.split('][').join('.').split('[').join('.');
}

function $$strip_braces(value) {
  return value.split('[').join('.').split(']').join('');
}

function $$escape_dots(value) {
  value = value.split('\'');
  return (value.length < 3) ? value.join('\'') : value.map(function(seg) {
    if (seg.length < 3) return seg;
    if ((seg[0] === '.') || (seg[seg.length - 1] === '.')) return seg;
    return seg.split('.').join('&&');
  }).join('');
}

function $$unescape_dots(value) {
  return value.split('&&').join('.');
}

function $$partify(value) {
  if (!value) return;
  return $$escape_dots($$strip_braces($$boundary_to_dot('' + value))).split('.');
}

function $$property(path, o) {

  var parts = $$partify(path);
  var first;

  if (typeof o !== 'object')
    throw new TypeError('get(): expects an object got ' + typeof o);

  if (parts.length === 1) return o[$$unescape_dots(parts[0])];
  if (parts.length === 0) return;

  first = o[parts.shift()];

  return ((typeof o === 'object') && (o !== null)) ?

    parts.reduce(function(target, prop) {
      if (target == null) return target;
      return target[$$unescape_dots(prop)];
    }, first) : null;
}

function $$adopt(child, e) {

    if (Array.isArray(child))
      return child.forEach(innerChild => $$adopt(innerChild, e));

    if (child)
      e.appendChild(
        (typeof child === 'object') ?
        child : document.createTextNode(child || ''));

}

/**
 * $$register a Widget or Node by the specified wml:id
 * @param {string} id
 * @param {Widget|Node} target
 * @param {object} ids
 */
function $$register(id, target, ids) {

  if (ids.hasOwnProperty(id))
    throw new Error('Duplicate id \'' +id+'\' detected!');

  ids[id] = target;

  return target;

}

/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {

  return document.createTextNode(value || '');

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
    Object.keys(attributes.html).forEach(key => {

      if (typeof attributes.html[key] === 'function') {
        e[key] = attributes.html[key];
      } else {
        e.setAttribute(key, attributes.html[key]);
      }
    });

  children.forEach(c => $$adopt(c, e));

  if (attributes.wml)
    if (attributes.wml.id)
      $$register(attributes.wml.id, e, view.ids);

  return e;

}

/**
 * Attributes provides an API for reading the
 * attributes supplied to an Element.
 * @param {object} attrs
 */
class Attributes {

    constructor(public _attrs:any) {

        this._attrs = _attrs;

    }

    /**
     * read a value form the internal list.
     * @param {string} path
     * @param {*} defaultValue - This value is returned if the value is not set.
     */
    read<A>(path:string, defaultValue?:A): A {

        var ret = $$property(path.split(':').join('.'), this._attrs);
      return (ret != null) ? ret : (defaultValue != null) ? defaultValue : '';

    }

}


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

  children.forEach(child => Array.isArray(child) ?
    childs.push.apply(childs, child) : childs.push(child));

  w = new Constructor(new Attributes(attributes), childs);

  if (attributes.wml)
    if (attributes.wml.id)
      $$register(attributes.wml.id, w, view.ids);

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

   } else if (typeof collection === 'object') {

     return Object.keys(collection).map((key, _, all) => cb(collection[key], key, all));

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

    if (result) return result;

    if (defaul) return defaul;

}



export interface View {

 render(): HTMLElement;
 findById(id:string): WMLElement;

}


export interface Widget {

  rendered(): void;
  removed(): void;
  render(): HTMLElement;

}

export type WMLElement = HTMLElement | Node | EventTarget | Widget

 
 

    export class Main implements View{

      

  ids: {[key:string]: WMLElement};
  widgets: Widget[];
  tree: HTMLElement;
  context: object;
  template: ()=>HTMLElement;



       constructor(context) {

          let view = this;

          this.ids = {};
          this.widgets = [];

          this.tree = null;
          this.context = context;
          this.template = function(){return $$node('div',{html:{'class': $$resolve(Styles, 'DRAWER_LAYOUT')}},[$$node('div',{html:{'class': $$resolve(Styles, 'DRAWER')},wml:{'id': "drawer"}},[$$node('div',{html:{'class': $$resolve(Styles, 'DRAWER_CONTENT')}},[this.drawerContent()], view)], view),$$node('div',{html:{'class': this._combine([$$resolve(Styles, 'MAIN_VIEW'),$$resolve(Styles, 'DRAWER_PUSHABLE')])}},[this.mainViewContent()], view)], view)};

       }

       static render(context) {

         return (new Main(context)).render();

       }

       findById(id:string) : WMLElement {

        return (this.ids[id]) ? this.ids[id] : null;

       }

       render() {

        var tree = null;

        this.ids = {};
        this.widgets.forEach(w => w.removed());
        this.widgets = [];

        tree = this.template.call(this.context);

        this.ids['root'] = (this.ids['root'])? this.ids['root']:tree;
        this.widgets.forEach(w => w.rendered());

        return tree;

      }

     }

     export default Main;

    