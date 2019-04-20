import * as __wml from '@quenk/wml';

import {Label} from '../../label'; ;
import {Help} from '../../help'; ;
import {text} from '../../../'; ;
import {DateField} from '../'; 
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

   constructor(__context: DateField  ) {

       this.template = (__this:__wml.Registry) => {

           return __this.node('div', {html : { 'id' : __context.values.root .id  ,'class' : __context.values.root .className   } ,wml : {  } }, [

        ...(__if((__context.values.label .text  !== null),
   ()=> ([

        __this.widget(Label, {html : {  } ,wml : {  } ,ww : { 'for' : __context.values.control .id  ,'text' : __context.values.label .text   } }, [

        
     ])
     ]),
   ()=> ([

        text (``)
     ]))) ,
__this.node('input', {html : { 'name' : __context.values.day .wml .id  ,'oninput' : __context.values.day .oninput  ,'onkeyup' : __context.values.day .onkeyup  ,'type' : `number` ,'value' : __context.values.day .value  ,'disabled' : __context.values.day .disabled  ,'class' : __context.values.day .className  ,'min' : `1` ,'max' : `31` ,'size' : `2` ,'placeholder' : `DD`  } ,wml : { 'id' : __context.values.day .wml .id   } }, [

        
     ]),
__this.node('input', {html : { 'name' : __context.values.month .wml .id  ,'class' : __context.values.month .className  ,'oninput' : __context.values.month .oninput  ,'onkeyup' : __context.values.month .onkeyup  ,'type' : `number` ,'disabled' : __context.values.month .disabled  ,'value' : __context.values.month .value  ,'min' : `1` ,'max' : `12` ,'size' : `2` ,'placeholder' : `MM`  } ,wml : { 'id' : __context.values.month .wml .id   } }, [

        
     ]),
__this.node('input', {html : { 'name' : __context.values.year .wml .id  ,'type' : `number` ,'oninput' : __context.values.year .oninput  ,'onkeyup' : __context.values.year .onkeyup  ,'value' : __context.values.year .value  ,'disabled' : __context.values.year .disabled  ,'class' : __context.values.year .className  ,'placeholder' : `YYYY` ,'min' : `0000` ,'max' : `9999` ,'size' : `4`  } ,wml : { 'id' : __context.values.year .wml .id   } }, [

        
     ]),
__this.widget(Help, {html : {  } ,wml : { 'id' : __context.values.messages .wml .id   } ,ww : { 'text' : __context.values.messages .text   } }, [

        
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
           return console.warn('invalidate(): '+       'Cannot invalidate a view that has not been rendered!');

       if (tree.parentNode == null)
                  throw new Error('Cannot invalidate a view  that has not been rendered!');

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