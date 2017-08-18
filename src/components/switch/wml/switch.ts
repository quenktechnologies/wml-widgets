
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
 
  

export class Main<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('label',{html:{'class': Styles.SWITCH},wml:{}},[$$node('input',{html:{'type': "checkbox",'name': this.attributes.read('ww:name'),'value': this.attributes.read('ww:value'),'onchange': this.attributes.read('ww:onChange',noop)},wml:{}},[], view),$$node('div',{html:{'class': Styles.SWITCH_SLIDER},wml:{}},[], view),$$domify(this.children)], view)
        }

       }

     }

