
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
import { noop } from 'wml-widgets-common/util';
 
 

export class TreeNavItemView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('li',{html:{'class': Styles.TREE_NAV_LIST_ITEM},wml:{}},[$$node('a',{html:{'class': (this.attributes.read('ww:active',false))? Styles.ACTIVE : '','href': this.attributes.read('ww:href','#'),'onclick': function function_literal_1(){ return this.activate() || this.attributes.read('ww:onClick',noop)(this.attributes.read('ww:name')); }.bind(this)},wml:{'id': "link"}},[$$domify(this.children)], view)], view)
        }

       }

     }



export class TreeNavView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('nav',{html:{'class': Styles.TREE_NAV},wml:{'id': "nav"}},[$$node('ul',{html:{'class': Styles.TREE_NAV_LIST},wml:{'id': "list"}},[$$domify(this.children)], view)], view)
        }

       }

     }

 