import * as property from 'property-seek';
import * as Styles from 'wml-widgets-common/Styles';
import { HeadingClickedEvent,RowClickedEvent,RowSelectedEvent,CellClickedEvent } from '../Table';
 
 

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

    if((head == null) || head == '')
        return '';

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
      } else if((attributes.html[key] != null) && (attributes.html[key] != '')) {
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
function $$for(collection, cb, cb2) {

  if (Array.isArray(collection)) {

    return collection.length > 0 ? collection.map(cb) : cb2();

   } else if (typeof collection === 'object') {

       var l = Object.keys(collection);

     return (l.length > 0)?
           l.map((key, _, all) => cb(collection[key], key, all)) : cb2;

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
 export function thead(view,fields) { return $$node('tr',{html:{}},[$$if(this.attributes.read('ww:selectable'), function if0(){return [$$node('th',{html:{}},[$$node('input',{html:{'type': "checkbox",'onclick': function function_literal_1(_){ return this.model.allRowsSelected(); }.bind(this)}},[], view)], view)];}.bind(this),function(){}),$$for(fields,function for2 (field, _, __) {return [$$if(!field.hidden, function if0(){return [$$if(field.sortAs, function if0(){return [$$node('th',{html:{'class': [this.attributes.read('ww:headingClass'),(this.sortedOn === field.name)? Styles.ACTIVE : ''].join(' '),'onclick': function function_literal_2(_){ return this.model.headingClicked(new HeadingClickedEvent(field.name,field,this)); }.bind(this)}},[field.heading,$$if(this.sortedOn === field.name, function if0(){return [this.arrow];}.bind(this),function(){})], view)];}.bind(this),function else_clause4() { return [$$node('th',{html:{'class': [this.attributes.read('ww:headingClass'),(this.sortedOn === field.name)? Styles.ACTIVE : ''].join(' '),'onclick': function function_literal_3(_){ return this.model.headingClicked(new HeadingClickedEvent(field.name,field,this)); }.bind(this)}},[field.heading,$$if(this.sortedOn === field.name, function if0(){return [this.arrow];}.bind(this),function(){})], view)];}.bind(this))];}.bind(this),function(){})]; }.bind(this),function otherwise2() {
               return [];
            })], view);}
export function tbody(view,data,fields) { return $$node('fragment',{html:{}},[$$for(data,function for4 (row, index, __) {return [$$node('tr',{html:{'class': this.attributes.read('ww:rowClass'),'onclick': function function_literal_4(_){ return this.model.rowClicked(new RowClickedEvent(row,index,data,this)); }.bind(this)}},[$$if(this.attributes.read('ww:selectable'), function if0(){return [$$node('td',{html:{}},[$$node('input',{html:{'type': "checkbox",'onclick': function function_literal_5(_){ return this.model.rowSelected(new RowSelectedEvent(row,index,data,this)); }.bind(this)}},[], view)], view)];}.bind(this),function(){}),$$for(fields,function for3 (field, _, __) {return [$$if(!field.hidden, function if0(){return [$$node('td',{html:{'class': this.attributes.read('ww:cellClass'),'onclick': function function_literal_6(_){ return this.model.cellClicked(new CellClickedEvent(property(field.name,row),field.name,index,row,this)); }.bind(this)}},[$$if(field.fragment, function if0(){return [field.fragment.apply(this, [view, property(field.name,row),field.name,row,field])];}.bind(this),function else_clause5() { return [property(field.name,row)];}.bind(this))], view)];}.bind(this),function(){})]; }.bind(this),function otherwise3() {
               return [];
            })], view)]; }.bind(this),function otherwise4() {
               return [];
            })], view);}
export class TableView implements View{

      
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
            return $$node('table',{html:{'class': [Styles.TABLE,this.attributes.read('ww:class','')].join(' ')}},[$$node('thead',{html:{},wml:{'id': "head"}},[thead.apply(this, [view, this.attributes.read('ww:fields')])], view),$$node('tbody',{html:{},wml:{'id': "body"}},[tbody.apply(this, [view, this.data,this.attributes.read('ww:fields')])], view)], view)
          }

       }

       static render(context) {

         return (new TableView(context)).render();

       }

       register(id:string, w:WMLElement): TableView{


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

     