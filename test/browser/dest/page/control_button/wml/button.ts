import * as __wml from '@quenk/wml';

import {Demo} from '../../../widgets/demo'; ;
import {Button} from '../../../../../../lib/control/button'; ;
import {ButtonPage} from '../'; 
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
export class Main  implements __wml.View {

   constructor(__context: ButtonPage  ) {

       this.template = (__this:__wml.Registry) => {

           return __this.widget(new Demo({}, [

        __this.widget(new Demo({}, [

        __this.node('h1', <__wml.Attrs>{}, [

        document.createTextNode(`Buttons`)
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __this.node('h2', <__wml.Attrs>{}, [

        document.createTextNode(`Style`)
     ]),
...__forIn (__context.values.styles , (v , _$$i, _$$all)=> 
([

        __this.widget(new Button({ww : { 'name' : v ,'style' : v ,'text' : __context.values.capitalize  (v)  }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : v ,'style' : v ,'text' : __context.values.capitalize  (v)  }})
     ]), 
()=> ([]))
     ])
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h2', <__wml.Attrs>{}, [

        document.createTextNode(`Outline`)
     ]),
...__forIn (__context.values.styles , (style , _$$i, _$$all)=> 
([

        __this.widget(new Button({ww : { 'style' : style ,'outline' : true  ,'text' : __context.values.capitalize  (style)  }}, [

        
     ]),<__wml.Attrs>{ww : { 'style' : style ,'outline' : true  ,'text' : __context.values.capitalize  (style)  }})
     ]), 
()=> ([]))
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('p', <__wml.Attrs>{}, [

        __this.node('h2', <__wml.Attrs>{}, [

        document.createTextNode(`Active`)
     ]),
...__forIn (__context.values.styles , (v , _$$i, _$$all)=> 
([

        __this.widget(new Button({ww : { 'name' : v ,'active' : true  ,'style' : v ,'text' : __context.values.capitalize  (v)  }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : v ,'active' : true  ,'style' : v ,'text' : __context.values.capitalize  (v)  }})
     ]), 
()=> ([]))
     ])
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('p', <__wml.Attrs>{}, [

        __this.node('h2', <__wml.Attrs>{}, [

        document.createTextNode(`Disabled`)
     ]),
...__forIn (__context.values.styles , (v , _$$i, _$$all)=> 
([

        __this.widget(new Button({ww : { 'name' : v ,'disabled' : true  ,'style' : v ,'text' : __context.values.capitalize  (v)  }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : v ,'disabled' : true  ,'style' : v ,'text' : __context.values.capitalize  (v)  }})
     ]), 
()=> ([]))
     ])
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h2', <__wml.Attrs>{}, [

        document.createTextNode(`Size`)
     ]),
...__forIn (__context.values.styles , (style , _$$i, _$$all)=> 
([

        __this.node('p', <__wml.Attrs>{}, [

        ...__forIn (__context.values.sizes , (size , _$$i, _$$all)=> 
([

        __this.widget(new Button({ww : { 'name' : size ,'style' : style ,'size' : size ,'text' : __context.values.capitalize  (size)  }}, [

        
     ]),<__wml.Attrs>{ww : { 'name' : size ,'style' : style ,'size' : size ,'text' : __context.values.capitalize  (size)  }})
     ]), 
()=> ([]))
     ])
     ]), 
()=> ([]))
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h2', <__wml.Attrs>{}, [

        document.createTextNode(`Block`)
     ]),
...__forIn (__context.values.styles , (style , _$$i, _$$all)=> 
([

        __this.widget(new Button({ww : { 'style' : style ,'block' : true  ,'text' : __context.values.capitalize  (style)  }}, [

        
     ]),<__wml.Attrs>{ww : { 'style' : style ,'block' : true  ,'text' : __context.values.capitalize  (style)  }})
     ]), 
()=> ([]))
     ]),<__wml.Attrs>{})
     ]),<__wml.Attrs>{});

       }

   }

   ids: { [key: string]: __wml.WMLElement } = {};

   groups: { [key: string]: __wml.WMLElement[] } = {};

   widgets: __wml.Widget[] = [];

   tree: __wml.Content = document.createElement('div');

   template: __wml.Template;

   register(e:__wml.WMLElement, attrs:__wml.Attributes<any>) {

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

   node(tag:string, attrs:__wml.Attrs, children: __wml.Content[]) {

       let e = document.createElement(tag);

       Object.keys(attrs).forEach(key => {

           let value = (<any>attrs)[key];

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


   widget(w: __wml.Widget, attrs:__wml.Attrs) {

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