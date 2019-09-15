import * as __wml from '@quenk/wml';

import {Demo} from '../../../widgets/demo'; ;
import {StackSelect} from '../../../../../../lib/control/stack-select'; ;
import {StackSelectPage} from '../'; 
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

   constructor(__context: StackSelectPage  ) {

       this.template = (__this:__wml.Registry) => {

           return __this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.widget(StackSelect, {html : {  } ,wml : { 'id' : __context.values.asc .id   } ,ww : { 'name' : __context.values.asc .name  ,'label' : __context.values.asc .label  ,'stringifier' : __context.values.asc .stringifier  ,'onSearch' : __context.values.asc .onSearch  ,'onChange' : __context.values.asc .onChange   } }, [

        
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.widget(StackSelect, {html : {  } ,wml : { 'id' : __context.values.desc .id   } ,ww : { 'name' : __context.values.desc .name  ,'label' : __context.values.desc .label  ,'dir' : -1 ,'stringifier' : __context.values.desc .stringifier  ,'onSearch' : __context.values.desc .onSearch  ,'onChange' : __context.values.desc .onChange   } }, [

        
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.widget(StackSelect, {html : {  } ,wml : { 'id' : __context.values.success .id   } ,ww : { 'name' : __context.values.success .name  ,'label' : __context.values.success .label  ,'success' : __context.values.success .message  ,'stringifier' : __context.values.success .stringifier  ,'onSearch' : __context.values.success .onSearch  ,'onChange' : __context.values.success .onChange   } }, [

        
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.widget(StackSelect, {html : {  } ,wml : { 'id' : __context.values.warning .id   } ,ww : { 'name' : __context.values.warning .name  ,'label' : __context.values.warning .label  ,'warning' : __context.values.warning .message  ,'stringifier' : __context.values.warning .stringifier  ,'onSearch' : __context.values.warning .onSearch  ,'onChange' : __context.values.warning .onChange   } }, [

        
     ])
     ]),
__this.widget(Demo, {html : {  } ,wml : {  } }, [

        __this.widget(StackSelect, {html : {  } ,wml : { 'id' : __context.values.error .id   } ,ww : { 'name' : __context.values.error .name  ,'label' : __context.values.error .label  ,'error' : __context.values.error .message  ,'stringifier' : __context.values.error .stringifier  ,'onSearch' : __context.values.error .onSearch  ,'onChange' : __context.values.error .onChange   } }, [

        
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