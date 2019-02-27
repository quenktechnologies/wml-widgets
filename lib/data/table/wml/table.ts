import * as __wml from '@quenk/wml';

import {Record} from '@quenk/noni/lib/data/record'; ;
import {TableLayout} from '../../../layout/table'; ;
import {Column,DataTable} from '../'; 
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
export const thead = 

<C  ,R extends Record <C  >   > (t: DataTable <C  ,R  >   )=> (columns: Column <C  ,R  >  [] )=> (__this:__wml.Registry) : __wml.Content[] => {

   return [

        __this.node('thead', {html : { 'class' : t.values.table .thead .className   } ,wml : { 'id' : t.values.table .thead .wml .id   } }, [

        __this.node('tr', {html : {  } ,wml : {  } }, [

        ...__forIn (columns, (field , _$$i, _$$all)=> 
([

        __this.node('th', {html : { 'class' : t.values.table .thead .th .className  ,'onclick' : t.values.table .thead .th .onclick (field.name)  } ,wml : {  } }, [

        t.values.table .thead .th .content (field)
     ])
     ]), 
()=> ([]))
     ])
     ])
     ];

};;
export const tbody = 

<C  ,R extends Record <C  >   > (t: DataTable <C  ,R  >   )=> (data: R  [] )=> (columns: Column <C  ,R  >  [] )=> (__this:__wml.Registry) : __wml.Content[] => {

   return [

        __this.node('tbody', {html : {  } ,wml : { 'id' : t.values.table .tbody .id   } }, [

        ...__forIn (data, (rowData: R   , rowIdx: number   , _$$all)=> 
([

        __this.node('tr', {html : { 'class' : t.values.table .tbody .tr .className  ,'onclick' : t.values.table .tbody .tr .onclick (rowIdx)  } ,wml : {  } }, [

        ...__forIn (columns, (field: Column <C  ,R  >   , cellIdx: number   , _$$all)=> 
([

        __this.node('td', {html : { 'class' : t.values.table .tbody .td .className  ,'onclick' : t.values.table .tbody .td .onclick (field.name)(rowIdx)  } ,wml : { 'id' : t.values.table .tbody .td .id (field.name)(cellIdx)(rowIdx)  } }, [

        ... (t.values.table .tbody .td .content (rowData)(field))
     ])
     ]), 
()=> ([]))
     ])
     ]), 
()=> ([]))
     ])
     ];

};;
export class Main <C  ,R extends Record <C  >   >  implements __wml.View {

   constructor(__context: DataTable <C  ,R  >  ) {

       this.template = (__this:__wml.Registry) => {

           return __this.widget(TableLayout, {html : {  } ,wml : { 'id' : __context.values.table .wml .id   } ,ww : { 'id' : __context.values.table .id  ,'class' : __context.values.table .className  ,'alternate' : __context.values.table .alternate  ,'bordered' : __context.values.table .bordered  ,'compact' : __context.values.table .compact  ,'hoverable' : __context.values.table .hoverable   } }, [

        ... (__context.values.table .thead .template () (__context)(__context.values.columns )(__this)),
... (__context.values.table .tbody .template () (__context)(__context.values.table .data )(__context.values.columns )(__this))
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