
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
 
 import { combine } from 'wml-widgets-common/util';
import * as Styles from 'wml-widgets-common/Styles';
 
 

export class BreadCrumbs<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('ol',{html:{'class': combine([Styles.BREAD_CRUMBS,this.attributes.read('ww:class')])},wml:{}},[$$domify(this.children)], view)
        }

       }

     }



export class Crumb<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('li',{html:{'class': combine([Styles.BREAD_CRUMBS_CRUMB,this.attributes.read('ww:class')])},wml:{}},[$$node('a',{html:{'class': this.attributes.read('ww:anchorClass',null),'onClick': this.attributes.read('ww:onClick',null),'href': this.attributes.read('ww:href')},wml:{}},[$$domify(this.children)], view)], view)
        }

       }

     }

 