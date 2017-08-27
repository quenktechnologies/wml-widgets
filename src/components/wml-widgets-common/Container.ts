import { Component, Renderable, Content } from '@quenk/wml-runtime';

/**
 * Container is an abstract class implementing widgets
 * that hold content as their primary purpose such 
 * as a DrawerLayout or an object form 'grid'.
 */
export abstract class Container<A> extends Component<A>{

  /**
   * content is dynamic content that can be changed 
   * after the Widget has been rendered. It's up
   * to the respective template to utilize this property or ignore it.
   */
  content : Content;

  /**
   * setContent changes the content value.
   */
   setContent(content:Content): Container<A> {

     let root = <Node>this.view.findById('root');
     let parent = root.parentNode;

     if(!root)
      throw new Error(`${this.constructor.name}#setContent:`+
        `Cannot set content of a widget `+
        `that has no root in it's template!`);

     if(!parent)
     throw new Error(`${this.constructor.name}#setContent:`+
       `Cannot set content of a widget with no parent!`);

     this.content = content;

     parent.replaceChild(this.render(), root); 

     return this;
   
   }

  /**
   * removeContent removes existing content. 
   */ 
   removeContent() : Container<A> {

     this.content = null;

     return this;

   }

}

 


