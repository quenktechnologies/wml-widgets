
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
 
 import * as Style from 'wml-widgets-common/Styles';
import { noop } from 'wml-widgets-common/util';
 
  

export class Main<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('button',{html:{'class': Style.MENU_BUTTON,'onclick': this.attributes.read('ww:onClick',noop)}},[$$node('span',{html:{'class': ""}},[], view),$$node('span',{html:{'class': ""}},[], view),$$node('span',{html:{'class': ""}},[], view)], view)
        }

       }

     }

