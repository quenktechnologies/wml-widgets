
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
    AppView} from "@quenk/wml-runtime";
 
 import * as Styles from 'wml-widgets-common/Styles';
 
  

export class Main<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.DRAWER_LAYOUT},wml:{'id': "content"}},[$$node('div',{html:{'class': Styles.DRAWER},wml:{'id': "drawer"}},[$$node('div',{html:{'class': Styles.DRAWER_CONTENT}},[$$if(this.attributes.read('ww:navigation'), function if3() {return $$box([this.attributes.read('ww:navigation').apply(this, [view, ])])}.bind(this),  $$empty)], view)], view),$$if(this.attributes.has('ww:content'), function if4() {return $$box([this.attributes.read('ww:content').apply(this, [view, ])])}.bind(this),  function else_clause3() {return $$box([this.children]);}.bind(this))], view)
        }

       }

     }

