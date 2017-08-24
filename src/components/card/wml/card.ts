
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
 
 

export class Card<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': combine(["card",this.attributes.read('ww:class')])},wml:{}},[$$domify(this.children)], view)
        }

       }

     }



export class CardBody<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': combine(["card-body",this.attributes.read('ww:class')])},wml:{}},[$$domify(this.children)], view)
        }

       }

     }

 