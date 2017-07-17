import * as Styles from 'wml-widgets-common/Styles';
 
 

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
        child : document.createTextNode(child == null? '' : child));

}

/**
 * $$text creates a DOMTextNode
 * @param {string} value
 */
function $$text(value) {

  return document.createTextNode(value == null ?  '' : value);

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
      view.register(attributes.wml.id, e);

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

    has(path:string): boolean{

      return this.read(path) != null;

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
          this.template = function(){
            return $$node('div',{html:{'class': $$resolve(Styles, 'DRAWER_LAYOUT')},wml:{'id': "content"}},[$$node('div',{html:{'class': $$resolve(Styles, 'DRAWER')},wml:{'id': "drawer"}},[$$node('div',{html:{'class': $$resolve(Styles, 'DRAWER_CONTENT')}},[$$if(this.attributes.read('ww:navigation'), function if0(){return [this.attributes.read('ww:navigation').apply(this, [view].concat([]))];}.bind(this),function(){})], view)], view),$$if(this.attributes.has('ww:content'), function if0(){return [this.attributes.read('ww:content').apply(this, [view].concat([]))];}.bind(this),function else_clause0() { return [$$resolve(this, 'children')];}.bind(this))], view)
          }

       }

       static render(context) {

         return (new Main(context)).render();

       }

       register(id:string, w:WMLElement): Main{


         if (this.ids.hasOwnProperty(id))
           throw new Error('Duplicate id \'' +id+'\' detected!');

         this.ids[id] = w;
         return this;

       }

       findById(id:string) : WMLElement {

        return (this.ids[id]) ? this.ids[id] : null;

       }

       invalidate(): void {

        var childs;
        var parent = this.tree.parentNode;
        var realFirstChild;
        var realFirstChildIndex;

         if (this.tree == null)
           throw new ReferenceError('Cannot invalidate a view that has not been rendered!');

         if (this.tree.parentNode == null)
           throw new ReferenceError('Attempt to invalidate a view that has not been inserted to DOM!');

         childs = (<Element> this.tree.parentNode).children;

         //for some reason the reference stored does not have the correct parent node.
         //we do this to get a 'live' version of the node.
         for (let i = 0; i < childs.length; i++)
           if (childs[i] === this.tree) {
             realFirstChild = childs[i];
             realFirstChildIndex = i;
           }

         parent.replaceChild(this.render(), realFirstChild);

       }

       render() {

        this.ids = {};
        this.widgets.forEach(w => w.removed());
        this.widgets = [];
        this.tree = this.template.call(this.context);
        this.ids['root'] = (this.ids['root'])? this.ids['root']:this.tree;
        this.widgets.forEach(w => w.rendered());

        return this.tree;

      }

     }

    