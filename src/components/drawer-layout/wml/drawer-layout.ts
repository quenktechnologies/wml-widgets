
import {
    empty as $$empty,
    box as $$box,
    resolve as $$resolve,
    text as $$text,
    node as $$node,
    widget as $$widget,
    ifE as $$if,
    forE as $$for,
    switchE as $$switch,
    domify as $$domify,
    AppView} from "@quenk/wml-runtime";
 
 import * as Styles from 'wml-widgets-common/Styles';
 
  

export class Main<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.DRAWER_LAYOUT},wml:{'id': "content"}},[$$node('div',{html:{'class': Styles.DRAWER},wml:{'id': "drawer"}},[$$node('div',{html:{'class': Styles.DRAWER_CONTENT},wml:{}},[$$if(this.attributes.read('ww:navigation'), function if0(){ return this.attributes.read('ww:navigation').call(this,view,) }.bind(this),$$empty)], view)], view),$$if(this.attributes.read('ww:content'), function if1(){ return this.attributes.read('ww.content').call(this,view,) }.bind(this),function else_clause0(){ return $$domify(this.children) }.bind(this))], view)
        }

       }

     }

