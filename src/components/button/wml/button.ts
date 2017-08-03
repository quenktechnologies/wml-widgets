
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
 
 import * as Styles from "wml-widgets-common/Styles";
import { noop,combine } from "wml-widgets-common/util";
import { Fragment } from '../../';
 
  

export class Main<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$widget(Fragment,{html:{}},[$$if(this.attributes.read('ww:href'), function if0() {return $$box([$$node('a',{html:{'href': this.attributes.read('ww:href'),'class': combine([Styles.BUTTON,this.attributes.read('ww:variant',''),this.attributes.read('ww:size',''),this.attributes.read('ww:style',Styles.DEFAULT),this.attributes.read('ww:class')]),'onclick': this.attributes.read('ww:onClick',noop)},wml:{'id': "button"}},[this.attributes.read('ww:text'),this.children], view)])}.bind(this),  function else_clause0() {return $$box([$$node('button',{html:{'type': this.attributes.read('ww:type','button'),'name': this.attributes.read('ww:name',''),'class': combine([Styles.BUTTON,this.attributes.read('ww:variant',''),this.attributes.read('ww:size',''),this.attributes.read('ww:style',Styles.DEFAULT),this.attributes.read('ww:class')]),'onclick': this.attributes.read('ww:onClick',noop)},wml:{'id': "button"}},[this.attributes.read('ww:text'),this.children], view)]);}.bind(this))], view)
        }

       }

     }

