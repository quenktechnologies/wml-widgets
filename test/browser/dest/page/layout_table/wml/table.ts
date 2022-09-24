import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
import {Demo} from '../../../widgets/demo'; ;
import {TableLayout,TableHeader,TableBody,TableFooter,TableRow,TableHeading,TableCell,TableWindow} from '../../../../../../lib/layout/table'; ;
import {TableLayoutPage} from '../'; 


//@ts-ignore:6192
type __IfArg = ()=>__wml.Content[]

//@ts-ignore:6192
type __ForAlt = ()=> __wml.Content[]

//@ts-ignore:6192
type __ForInBody<A> =(val:A, idx:number, all:A[])=>__wml.Content[]

//@ts-ignore:6192
type __ForOfBody<A> = (val:A, key:string, all:object) =>__wml.Content[]

//@ts-ignore:6192
interface __Record<A> {

 [key:string]: A

}

//@ts-ignore:6192
const __if = (__expr:boolean, __conseq:__IfArg,__alt?:__IfArg) : Content[]=>
(__expr) ? __conseq() :  __alt ? __alt() : [];

//@ts-ignore:6192
const __forIn = <A>(list:A[], f:__ForInBody<A>, alt:__ForAlt) : __wml.Content[] => {

   let ret:__wml.Content[] = [];

   for(let i=0; i<list.length; i++)
       ret = ret.concat(f(list[i], i, list));

   return ret.length === 0 ? alt() : ret;

}
//@ts-ignore:6192
const __forOf = <A>(o:__Record<A>, f:__ForOfBody<A>,alt:__ForAlt) : __wml.Content[] => {

    let ret:__wml.Content[] = [];

    for(let key in o)
  	    if(o.hasOwnProperty(key)) 
	        ret = ret.concat(f((o)[key], key, o));

    return ret.length === 0 ? alt(): ret;

}


// @ts-ignore 6192
const text = __document.text;
// @ts-ignore 6192
const unsafe = __document.unsafe
// @ts-ignore 6192
const isSet = (value:any) => value != null
export class HeaderView  implements __wml.View {

   constructor(__context: object) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new TableHeader({}, [

        __this.widget(new TableRow({}, [

        __this.widget(new TableHeading({}, [

        __document.createTextNode('Name')
     ]),<__wml.Attrs>{}),
__this.widget(new TableHeading({}, [

        __document.createTextNode('Email')
     ]),<__wml.Attrs>{}),
__this.widget(new TableHeading({}, [

        __document.createTextNode('Balance')
     ]),<__wml.Attrs>{}),
__this.widget(new TableHeading({}, [

        __document.createTextNode('Username')
     ]),<__wml.Attrs>{}),
__this.widget(new TableHeading({}, [

        __document.createTextNode('Status')
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{});

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   views: __wml.View[] = [];

   widgets: __wml.Widget[] = [];

   tree: Node = <Node>__document.createElement('div');

   template: __wml.Template;

   registerView(v:__wml.View) : __wml.View {

       this.views.push(v);

       return v;

}
   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) : __wml.WMLElement {

       let attrsMap = (<__wml.Attrs><any>attrs)

       if(attrsMap.wml) {

         let {id, group} = attrsMap.wml;

         if(id != null) {

             if (this.ids.hasOwnProperty(id))
               throw new Error(`Duplicate id '${id}' detected!`);

             this.ids[id] = e;

         }

         if(group != null) {

             this.groups[group] = this.groups[group] || [];
             this.groups[group].push(e);

         }

         }
       return e;
}

   node(tag:string, attrs:__wml.Attrs, children: __wml.Content[]): __wml.Content {

       let e = __document.createElement(tag);

       Object.keys(attrs).forEach(key => {

           let value = (<any>attrs)[key];

           if (typeof value === 'function') {

           (<any>e)[key] = value;

           } else if (typeof value === 'string') {

               //prevent setting things like disabled=''
               if (value !== '')
               e.setAttribute(key, value);

           } else if (typeof value === 'boolean') {

             e.setAttribute(key, '');

           } else if(!__document.isBrowser && 
                     value instanceof __document.WMLDOMText) {

             e.setAttribute(key, <any>value);

           }

       });

       children.forEach(c => {

               switch (typeof c) {

                   case 'string':
                   case 'number':
                   case 'boolean':
                     let tn = __document.createTextNode(''+c);
                     e.appendChild(<Node>tn)
                   case 'object':
                       e.appendChild(<Node>c);
                   break;
                   default:
                                throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);

               }})

       this.register(e, attrs);

       return e;

   }


   widget(w: __wml.Widget, attrs:__wml.Attrs) : __wml.Content {

       this.register(w, attrs);

       this.widgets.push(w);

       return w.render();

   }

   findById<E extends __wml.WMLElement>(id: string): __Maybe<E> {

       let mW:__Maybe<E> = __fromNullable<E>(<E>this.ids[id])

       return this.views.reduce((p,c)=>
       p.isJust() ? p : c.findById(id), mW);

   }

   findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]> {

      let mGroup:__Maybe<E[]> =
           __fromArray(this.groups.hasOwnProperty(name) ?
           <any>this.groups[name] : 
           []);

      return this.views.reduce((p,c) =>
       p.isJust() ? p : c.findByGroup(name), mGroup);

   }

   invalidate() : void {

       let {tree} = this;
       let parent = <Node>tree.parentNode;

       if (tree == null)
           return console.warn('invalidate(): '+       'Missing DOM tree!');

       if (tree.parentNode == null)
                  throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');

       parent.replaceChild(<Node>this.render(), tree) 

   }

   render(): __wml.Content {

       this.ids = {};
       this.widgets.forEach(w => w.removed());
       this.widgets = [];
       this.views = [];
       this.tree = <Node>this.template(this);

       this.ids['root'] = (this.ids['root']) ?
       this.ids['root'] : 
       this.tree;

       this.widgets.forEach(w => w.rendered());

       return this.tree;

   }

};
export class BodyView  implements __wml.View {

   constructor(__context: object) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new TableBody({}, [

        __this.widget(new TableRow({}, [

        __this.widget(new TableCell({}, [

        __document.createTextNode('Length Wise')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('lw@theemailplace.com')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('$5000')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('lw')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('Active')
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new TableRow({}, [

        __this.widget(new TableCell({}, [

        __document.createTextNode('First Chance')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('fchacne@live.tt')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('$1.00')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('chance')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('Inactive')
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new TableRow({}, [

        __this.widget(new TableCell({}, [

        __document.createTextNode('Du Pear')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('dupear@gmail.com')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('$10,000.00')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('pearboy')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('Active')
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new TableRow({}, [

        __this.widget(new TableCell({'rowspan': 2,'colspan': 5}, [

        __document.createTextNode('This spans 2 rows 5 columns.')
     ]),<__wml.Attrs>{'rowspan': 2,'colspan': 5})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{});

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   views: __wml.View[] = [];

   widgets: __wml.Widget[] = [];

   tree: Node = <Node>__document.createElement('div');

   template: __wml.Template;

   registerView(v:__wml.View) : __wml.View {

       this.views.push(v);

       return v;

}
   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) : __wml.WMLElement {

       let attrsMap = (<__wml.Attrs><any>attrs)

       if(attrsMap.wml) {

         let {id, group} = attrsMap.wml;

         if(id != null) {

             if (this.ids.hasOwnProperty(id))
               throw new Error(`Duplicate id '${id}' detected!`);

             this.ids[id] = e;

         }

         if(group != null) {

             this.groups[group] = this.groups[group] || [];
             this.groups[group].push(e);

         }

         }
       return e;
}

   node(tag:string, attrs:__wml.Attrs, children: __wml.Content[]): __wml.Content {

       let e = __document.createElement(tag);

       Object.keys(attrs).forEach(key => {

           let value = (<any>attrs)[key];

           if (typeof value === 'function') {

           (<any>e)[key] = value;

           } else if (typeof value === 'string') {

               //prevent setting things like disabled=''
               if (value !== '')
               e.setAttribute(key, value);

           } else if (typeof value === 'boolean') {

             e.setAttribute(key, '');

           } else if(!__document.isBrowser && 
                     value instanceof __document.WMLDOMText) {

             e.setAttribute(key, <any>value);

           }

       });

       children.forEach(c => {

               switch (typeof c) {

                   case 'string':
                   case 'number':
                   case 'boolean':
                     let tn = __document.createTextNode(''+c);
                     e.appendChild(<Node>tn)
                   case 'object':
                       e.appendChild(<Node>c);
                   break;
                   default:
                                throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);

               }})

       this.register(e, attrs);

       return e;

   }


   widget(w: __wml.Widget, attrs:__wml.Attrs) : __wml.Content {

       this.register(w, attrs);

       this.widgets.push(w);

       return w.render();

   }

   findById<E extends __wml.WMLElement>(id: string): __Maybe<E> {

       let mW:__Maybe<E> = __fromNullable<E>(<E>this.ids[id])

       return this.views.reduce((p,c)=>
       p.isJust() ? p : c.findById(id), mW);

   }

   findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]> {

      let mGroup:__Maybe<E[]> =
           __fromArray(this.groups.hasOwnProperty(name) ?
           <any>this.groups[name] : 
           []);

      return this.views.reduce((p,c) =>
       p.isJust() ? p : c.findByGroup(name), mGroup);

   }

   invalidate() : void {

       let {tree} = this;
       let parent = <Node>tree.parentNode;

       if (tree == null)
           return console.warn('invalidate(): '+       'Missing DOM tree!');

       if (tree.parentNode == null)
                  throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');

       parent.replaceChild(<Node>this.render(), tree) 

   }

   render(): __wml.Content {

       this.ids = {};
       this.widgets.forEach(w => w.removed());
       this.widgets = [];
       this.views = [];
       this.tree = <Node>this.template(this);

       this.ids['root'] = (this.ids['root']) ?
       this.ids['root'] : 
       this.tree;

       this.widgets.forEach(w => w.rendered());

       return this.tree;

   }

};
export class FooterView  implements __wml.View {

   constructor(__context: object) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new TableFooter({}, [

        __this.widget(new TableRow({}, [

        __this.widget(new TableCell({}, [

        __document.createTextNode('1')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('2')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('3')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('4')
     ]),<__wml.Attrs>{}),
__this.widget(new TableCell({}, [

        __document.createTextNode('5')
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{});

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   views: __wml.View[] = [];

   widgets: __wml.Widget[] = [];

   tree: Node = <Node>__document.createElement('div');

   template: __wml.Template;

   registerView(v:__wml.View) : __wml.View {

       this.views.push(v);

       return v;

}
   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) : __wml.WMLElement {

       let attrsMap = (<__wml.Attrs><any>attrs)

       if(attrsMap.wml) {

         let {id, group} = attrsMap.wml;

         if(id != null) {

             if (this.ids.hasOwnProperty(id))
               throw new Error(`Duplicate id '${id}' detected!`);

             this.ids[id] = e;

         }

         if(group != null) {

             this.groups[group] = this.groups[group] || [];
             this.groups[group].push(e);

         }

         }
       return e;
}

   node(tag:string, attrs:__wml.Attrs, children: __wml.Content[]): __wml.Content {

       let e = __document.createElement(tag);

       Object.keys(attrs).forEach(key => {

           let value = (<any>attrs)[key];

           if (typeof value === 'function') {

           (<any>e)[key] = value;

           } else if (typeof value === 'string') {

               //prevent setting things like disabled=''
               if (value !== '')
               e.setAttribute(key, value);

           } else if (typeof value === 'boolean') {

             e.setAttribute(key, '');

           } else if(!__document.isBrowser && 
                     value instanceof __document.WMLDOMText) {

             e.setAttribute(key, <any>value);

           }

       });

       children.forEach(c => {

               switch (typeof c) {

                   case 'string':
                   case 'number':
                   case 'boolean':
                     let tn = __document.createTextNode(''+c);
                     e.appendChild(<Node>tn)
                   case 'object':
                       e.appendChild(<Node>c);
                   break;
                   default:
                                throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);

               }})

       this.register(e, attrs);

       return e;

   }


   widget(w: __wml.Widget, attrs:__wml.Attrs) : __wml.Content {

       this.register(w, attrs);

       this.widgets.push(w);

       return w.render();

   }

   findById<E extends __wml.WMLElement>(id: string): __Maybe<E> {

       let mW:__Maybe<E> = __fromNullable<E>(<E>this.ids[id])

       return this.views.reduce((p,c)=>
       p.isJust() ? p : c.findById(id), mW);

   }

   findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]> {

      let mGroup:__Maybe<E[]> =
           __fromArray(this.groups.hasOwnProperty(name) ?
           <any>this.groups[name] : 
           []);

      return this.views.reduce((p,c) =>
       p.isJust() ? p : c.findByGroup(name), mGroup);

   }

   invalidate() : void {

       let {tree} = this;
       let parent = <Node>tree.parentNode;

       if (tree == null)
           return console.warn('invalidate(): '+       'Missing DOM tree!');

       if (tree.parentNode == null)
                  throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');

       parent.replaceChild(<Node>this.render(), tree) 

   }

   render(): __wml.Content {

       this.ids = {};
       this.widgets.forEach(w => w.removed());
       this.widgets = [];
       this.views = [];
       this.tree = <Node>this.template(this);

       this.ids['root'] = (this.ids['root']) ?
       this.ids['root'] : 
       this.tree;

       this.widgets.forEach(w => w.rendered());

       return this.tree;

   }

};
export class Main  implements __wml.View {

   constructor(__context: TableLayoutPage) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new Demo({}, [

        __this.widget(new Demo({}, [

        __this.node('h3', <__wml.Attrs>{}, [

        __document.createTextNode('Normal')
     ]),
__this.widget(new TableLayout({}, [

        __this.registerView(new HeaderView(__context)).render(),
__this.registerView(new BodyView(__context)).render(),
__this.registerView(new FooterView(__context)).render()
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h3', <__wml.Attrs>{}, [

        __document.createTextNode(' Alternate')
     ]),
__this.widget(new TableLayout({'alternate': true }, [

        __this.registerView(new HeaderView(__context)).render(),
__this.registerView(new BodyView(__context)).render(),
__this.registerView(new FooterView(__context)).render()
     ]),<__wml.Attrs>{'alternate': true })
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h3', <__wml.Attrs>{}, [

        __document.createTextNode('Bordered')
     ]),
__this.widget(new TableLayout({'bordered': true }, [

        __this.registerView(new HeaderView(__context)).render(),
__this.registerView(new BodyView(__context)).render(),
__this.registerView(new FooterView(__context)).render()
     ]),<__wml.Attrs>{'bordered': true })
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h3', <__wml.Attrs>{}, [

        __document.createTextNode('Hoverable')
     ]),
__this.widget(new TableLayout({'hoverable': true }, [

        __this.registerView(new HeaderView(__context)).render(),
__this.registerView(new BodyView(__context)).render(),
__this.registerView(new FooterView(__context)).render()
     ]),<__wml.Attrs>{'hoverable': true })
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h3', <__wml.Attrs>{}, [

        __document.createTextNode('Compact')
     ]),
__this.widget(new TableLayout({'compact': true }, [

        __this.registerView(new HeaderView(__context)).render(),
__this.registerView(new BodyView(__context)).render(),
__this.registerView(new FooterView(__context)).render()
     ]),<__wml.Attrs>{'compact': true })
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.widget(new TableWindow({}, [

        __this.widget(new TableLayout({}, [

        __this.registerView(new HeaderView(__context)).render(),
__this.registerView(new BodyView(__context)).render(),
__this.registerView(new FooterView(__context)).render()
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{});

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   views: __wml.View[] = [];

   widgets: __wml.Widget[] = [];

   tree: Node = <Node>__document.createElement('div');

   template: __wml.Template;

   registerView(v:__wml.View) : __wml.View {

       this.views.push(v);

       return v;

}
   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) : __wml.WMLElement {

       let attrsMap = (<__wml.Attrs><any>attrs)

       if(attrsMap.wml) {

         let {id, group} = attrsMap.wml;

         if(id != null) {

             if (this.ids.hasOwnProperty(id))
               throw new Error(`Duplicate id '${id}' detected!`);

             this.ids[id] = e;

         }

         if(group != null) {

             this.groups[group] = this.groups[group] || [];
             this.groups[group].push(e);

         }

         }
       return e;
}

   node(tag:string, attrs:__wml.Attrs, children: __wml.Content[]): __wml.Content {

       let e = __document.createElement(tag);

       Object.keys(attrs).forEach(key => {

           let value = (<any>attrs)[key];

           if (typeof value === 'function') {

           (<any>e)[key] = value;

           } else if (typeof value === 'string') {

               //prevent setting things like disabled=''
               if (value !== '')
               e.setAttribute(key, value);

           } else if (typeof value === 'boolean') {

             e.setAttribute(key, '');

           } else if(!__document.isBrowser && 
                     value instanceof __document.WMLDOMText) {

             e.setAttribute(key, <any>value);

           }

       });

       children.forEach(c => {

               switch (typeof c) {

                   case 'string':
                   case 'number':
                   case 'boolean':
                     let tn = __document.createTextNode(''+c);
                     e.appendChild(<Node>tn)
                   case 'object':
                       e.appendChild(<Node>c);
                   break;
                   default:
                                throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);

               }})

       this.register(e, attrs);

       return e;

   }


   widget(w: __wml.Widget, attrs:__wml.Attrs) : __wml.Content {

       this.register(w, attrs);

       this.widgets.push(w);

       return w.render();

   }

   findById<E extends __wml.WMLElement>(id: string): __Maybe<E> {

       let mW:__Maybe<E> = __fromNullable<E>(<E>this.ids[id])

       return this.views.reduce((p,c)=>
       p.isJust() ? p : c.findById(id), mW);

   }

   findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]> {

      let mGroup:__Maybe<E[]> =
           __fromArray(this.groups.hasOwnProperty(name) ?
           <any>this.groups[name] : 
           []);

      return this.views.reduce((p,c) =>
       p.isJust() ? p : c.findByGroup(name), mGroup);

   }

   invalidate() : void {

       let {tree} = this;
       let parent = <Node>tree.parentNode;

       if (tree == null)
           return console.warn('invalidate(): '+       'Missing DOM tree!');

       if (tree.parentNode == null)
                  throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');

       parent.replaceChild(<Node>this.render(), tree) 

   }

   render(): __wml.Content {

       this.ids = {};
       this.widgets.forEach(w => w.removed());
       this.widgets = [];
       this.views = [];
       this.tree = <Node>this.template(this);

       this.ids['root'] = (this.ids['root']) ?
       this.ids['root'] : 
       this.tree;

       this.widgets.forEach(w => w.rendered());

       return this.tree;

   }

}