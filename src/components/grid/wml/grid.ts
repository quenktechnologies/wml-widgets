
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
 
 import { combine } from 'wml-widgets-common/util';
import * as Styles from 'wml-widgets-common/Styles';
 
 

export class Container<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('section',{html:{'class': combine([Styles.GRID_CONTAINER,this.attributes.read('ww:class','')])}},[this.children], view)
        }

       }

     }



export class Row<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': combine([Styles.GRID_ROW,this.attributes.read('ww:class','')])}},[this.children], view)
        }

       }

     }



export class Column<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': this._getClass()}},[this.children], view)
        }

       }

     }

 