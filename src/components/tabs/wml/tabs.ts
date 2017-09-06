
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
 
 

export class TabView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('li',{html:{'role': "presentation",'class': (this.attributes.read('ww:active'))? Styles.ACTIVE : null},wml:{'id': "root"}},[$$node('a',{html:{'href': "#",'onclick': this.clicked.bind(this)},wml:{'id': "link"}},[$$if(this.attributes.read('ww:text'), function if14(){ return $$domify(this.attributes.read('ww:text')) }.bind(this),function else_clause8(){ return $$domify(this.children) }.bind(this))], view)], view)
        }

       }

     }



export class TabsView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('ul',{html:{'class': Styles.TABS},wml:{}},[$$domify(this.children)], view)
        }

       }

     }

 