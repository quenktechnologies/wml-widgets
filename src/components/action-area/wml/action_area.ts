
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
 
  

export class Main<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': combine([Styles.ACTION_AREA,Styles.DRAWER_PUSHABLE_FIXED])},wml:{}},[$$node('div',{html:{'class': Styles.ACTION_AREA_CONTENT},wml:{'id': "content"}},[$$domify(this.children)], view)], view)
        }

       }

     }

