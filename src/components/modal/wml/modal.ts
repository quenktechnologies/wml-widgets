
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
 
 

export class Modal<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.MODAL,'tabindex': "-1",'role': "dialog"},wml:{'id': "modal"}},[$$node('div',{html:{'class': Styles.MODAL_DIALOG,'role': "document"},wml:{}},[$$node('div',{html:{'class': Styles.MODAL_CONTENT},wml:{'id': "content"}},[$$domify(this.children)], view)], view)], view)
        }

       }

     }



export class Header<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.MODAL_HEADER},wml:{}},[$$node('button',{html:{'type': "button",'class': "close",'aria-label': "Close",'onclick': this.attributes.read('ww:onClose',noop)},wml:{}},[$$node('span',{html:{'aria-hidden': "true"},wml:{}},[$$text(`×`)], view)], view),$$domify(this.children)], view)
        }

       }

     }



export class Body<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.MODAL_BODY},wml:{}},[$$domify(this.children)], view)
        }

       }

     }



export class Footer<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': Styles.MODAL_FOOTER},wml:{}},[$$domify(this.children)], view)
        }

       }

     }

 