import * as __wml from '@quenk/wml';

import {Demo} from '../../../widgets/demo'; ;
import {DropList} from '../../../../../../lib/control/drop-list'; ;
import {DropListPage} from '../'; 
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
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
const __if = (__expr:boolean, __conseq:__IfArg,__alt:__IfArg) : Content[]=>
(__expr) ? __conseq() :  __alt();

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
export class Main  implements __wml.View {

   constructor(__context: DropListPage  ) {

       this.template = (__this:__wml.Registry) => {

           return __this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.node('b', {html : {  } ,wml : {  } }, [

        document.createTextNode(`Normal`)
     ]),
__this.node('p', {html : {  } ,wml : {  } }, [

        __this.widget(DropList, {html : {  } ,wml : { 'id' : __context.values.normal .name   } ,ww : { 'name' : __context.values.normal .name  ,'value' : __context.values.normal .value  ,'options' : __context.values.normal .options  ,'onSelect' : __context.values.normal .onSelect   } }, [

        
     ])
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.node('b', {html : {  } ,wml : {  } }, [

        document.createTextNode(`Success`)
     ]),
__this.node('p', {html : {  } ,wml : {  } }, [

        __this.widget(DropList, {html : {  } ,wml : { 'id' : __context.values.success .id   } ,ww : { 'className' : `-success` ,'name' : __context.values.success .name  ,'options' : __context.values.success .options  ,'onSelect' : __context.values.success .onSelect   } }, [

        
     ])
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.node('b', {html : {  } ,wml : {  } }, [

        document.createTextNode(`Warning`)
     ]),
__this.node('p', {html : {  } ,wml : {  } }, [

        __this.widget(DropList, {html : {  } ,wml : { 'id' : __context.values.warning .id   } ,ww : { 'className' : `-warning` ,'name' : __context.values.warning .name  ,'options' : __context.values.warning .options  ,'onSelect' : __context.values.warning .onSelect   } }, [

        
     ])
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.node('b', {html : {  } ,wml : {  } }, [

        document.createTextNode(`Error`)
     ]),
__this.node('p', {html : {  } ,wml : {  } }, [

        __this.widget(DropList, {html : {  } ,wml : { 'id' : __context.values.error .id   } ,ww : { 'className' : `-error` ,'name' : __context.values.error .name  ,'options' : __context.values.error .options  ,'onSelect' : __context.values.error .onSelect   } }, [

        
     ])
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.node('p', {html : {  } ,wml : {  } }, [

        __this.node('b', {html : {  } ,wml : {  } }, [

        document.createTextNode(`Block`)
     ]),
__this.widget(DropList, {html : {  } ,wml : { 'id' : __context.values.block .id   } ,ww : { 'className' : `-block` ,'name' : __context.values.block .name  ,'block' : true  ,'onSelect' : __context.values.block .onSelect   } }, [

        
     ])
     ])
     ])
     ]);

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   widgets: __wml.Widget[] = [];

   tree: __wml.Content = document.createElement('div');

   template: __wml.Template;

   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) {

       let id = (<__wml.Attrs><any>attrs).wml.id;
       let group = <string>(<__wml.Attrs><any>attrs).wml.group;

       if(id != null) {

           if (this.ids.hasOwnProperty(id))
             throw new Error(`Duplicate id '${id}' detected!`);

           this.ids[id] = e;

       }

       if(group != null) {

           this.groups[group] = this.groups[group] || [];
           this.groups[group].push(e);

       }

       return e;
}

   node(tag:string, attrs:__wml.Attributes<any>, children: __wml.Content[]) {

       let e = document.createElement(tag);

       if (typeof attrs['html'] === 'object')

       Object.keys(attrs['html']).forEach(key => {

           let value = (<any>attrs['html'])[key];

           if (typeof value === 'function') {

           (<any>e)[key] = value;

           } else if (typeof value === 'string') {

               //prevent setting things like disabled=''
               if (value !== '')
               e.setAttribute(key, value);

           } else if (typeof value === 'boolean') {

             e.setAttribute(key, `${value}`);

           }

       });

       children.forEach(c => {

               switch (typeof c) {

                   case 'string':
                   case 'number':
                   case 'boolean':
                     let tn = document.createTextNode(''+c);
                     e.appendChild(tn)
                   case 'object':
                       e.appendChild(<Node>c);
                   break;
                   default:
                                throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);

               }})


       this.register(e, attrs);

       return e;

   }


   widget<A extends __wml.Attrs, W extends __wml.
   WidgetConstructor<A>>(C: W, attrs:A, children: __wml.Content[]) {

       let w = new C(attrs, children);

       this.register(w, attrs);

       this.widgets.push(w);

       return w.render();

   }

   findById<E extends __wml.WMLElement>(id: string): __Maybe<E> {

       return __fromNullable<E>(<E>this.ids[id])

   }

   findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]> {

       return __fromArray(this.groups.hasOwnProperty(name) ?
           <any>this.groups[name] : 
           []);

   }

   invalidate() : void {

       let {tree} = this;
       let parent = <Node>tree.parentNode;

       if (tree == null)
           return console.warn('invalidate(): '+       'Missing DOM tree!');

       if (tree.parentNode == null)
                  throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');

       parent.replaceChild(this.render(), tree) 

   }

   render(): __wml.Content {

       this.ids = {};
       this.widgets.forEach(w => w.removed());
       this.widgets = [];
       this.tree = this.template(this);

       this.ids['root'] = (this.ids['root']) ?
       this.ids['root'] : 
       this.tree;

       this.widgets.forEach(w => w.rendered());

       return this.tree;

   }

}