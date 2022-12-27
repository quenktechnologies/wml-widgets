import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
//@ts-ignore: 6192
import {
Maybe as __Maybe,
fromNullable as __fromNullable,
fromArray as __fromArray
}
from '@quenk/noni/lib/data/maybe';
import {Link} from '../../../../../lib/content/link'; ;
import {Demo} from '../../widgets/demo'; ;
import {LinkPage} from '.'; 


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
export class Main  implements __wml.View {

   constructor(__context: LinkPage) {

       this.template = (__this:__wml.Registry) => {

       

           return __this.widget(new Demo({}, [

        __this.widget(new Demo({}, [

        __this.node('h1', <__wml.Attrs>{}, [

        __document.createTextNode('Links')
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('This is a '),
__this.widget(new Link({'href': "#link"}, [

        __document.createTextNode('link')
     ]),<__wml.Attrs>{'href': "#link"}),
__document.createTextNode('.')
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('This is a '),
__this.widget(new Link({'href': "#disabled",'disabled': true }, [

        __document.createTextNode('disabled')
     ]),<__wml.Attrs>{'href': "#disabled",'disabled': true }),
__document.createTextNode(' link.')
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('Links can also '),
__this.widget(new Link({'text': "specify"}, [

        
     ]),<__wml.Attrs>{'text': "specify"}),
__document.createTextNode(' contents a the text attribute')
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('Links can also have '),
__this.widget(new Link({'onClick': __context.values.onClick,'text': "handlers"}, [

        
     ]),<__wml.Attrs>{'onClick': __context.values.onClick,'text': "handlers"})
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('Disabled link '),
__this.widget(new Link({'onClick': __context.values.onClick,'disabled': true ,'text': "handlers"}, [

        
     ]),<__wml.Attrs>{'onClick': __context.values.onClick,'disabled': true ,'text': "handlers"}),
__document.createTextNode('\u000a       do nothing. \u000a    ')
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('You can remove the underline using the \u000a       '),
__this.widget(new Link({'text': "-ww-no-decoration",'className': "-ww-no-decoration"}, [

        
     ]),<__wml.Attrs>{'text': "-ww-no-decoration",'className': "-ww-no-decoration"}),
__document.createTextNode(' modifier.\u000a    ')
     ])
     ]),<__wml.Attrs>{}),
__this.widget(new Demo({}, [

        __this.node('h2', <__wml.Attrs>{}, [

        __document.createTextNode('Links can be styled like buttons.')
     ]),
__this.node('p', <__wml.Attrs>{}, [

        __document.createTextNode('\u000a      This is a button link \u000a      '),
__this.widget(new Link({'className': ("ww-button " + __context.values.getState()),'text': "link",'onClick': __context.values.onLinkClick}, [

        
     ]),<__wml.Attrs>{'className': ("ww-button " + __context.values.getState()),'text': "link",'onClick': __context.values.onLinkClick})
     ])
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

       let asDOMAttrs = <__document.WMLDOMAttrs><object>attrs

       let e = __document.createElement(tag, asDOMAttrs, children,
                attrs.wml && attrs.wml.ns || '');

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

   findGroupById<E extends __wml.WMLElement>(name: string): E[] {
           return this.groups.hasOwnProperty(name) ?
           <E[]>this.groups[name] : [];

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