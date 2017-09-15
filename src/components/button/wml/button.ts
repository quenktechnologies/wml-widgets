
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
 
 import * as Styles from "wml-widgets-common/Styles";
import { noop,combine } from "wml-widgets-common/util";
import { Fragment } from '../../';
 
 

export class Group<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': this.getClass(),'role': "group"},wml:{}},[$$domify(this.children)], view)
        }

       }

     }



export class Button<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$widget(Fragment,{html:{},wml:{}},[$$if(this.attributes.read('ww:href'), function if14(){ return $$node('a',{html:{'href': this.attributes.read('ww:href'),'class': combine([Styles.BUTTON,this.attributes.read('ww:variant',''),this.attributes.read('ww:size',''),this.attributes.read('ww:style',Styles.DEFAULT),this.attributes.read('ww:class')]),'onclick': this.attributes.read('ww:onClick',noop)},wml:{'id': "button"}},[$$domify(this.attributes.read('ww:text')),$$domify(this.children)], view) }.bind(this),function else_clause8(){ return $$node('button',{html:{'type': this.attributes.read('ww:type','button'),'name': this.attributes.read('ww:name',''),'disabled': (this.attributes.read('ww:disabled'))? "true" : null,'class': combine([Styles.BUTTON,this.attributes.read('ww:variant',''),this.attributes.read('ww:size',''),this.attributes.read('ww:style',Styles.DEFAULT),this.attributes.read('ww:class')]),'onclick': this.attributes.read('ww:onClick',noop)},wml:{'id': "button"}},[$$domify(this.attributes.read('ww:text')),$$domify(this.children)], view) }.bind(this))], view)
        }

       }

     }

 