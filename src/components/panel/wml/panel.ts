
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
import { combine } from 'wml-widgets-common/util';
 
 

export class Panel<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': combine([Styles.PANEL,this.attributes.read('ww:style',Styles.DEFAULT)])},wml:{}},[$$domify(this.children)], view)
        }

       }

     }



export class Header<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.PANEL_HEADER},wml:{}},[$$domify(this.children)], view)
        }

       }

     }



export class Body<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.PANEL_BODY},wml:{}},[$$domify(this.children)], view)
        }

       }

     }



export class Footer<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.PANEL_FOOTER},wml:{}},[$$domify(this.children)], view)
        }

       }

     }

 