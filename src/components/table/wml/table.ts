
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
 
 import { get as property } from 'property-seek';
import * as Styles from 'wml-widgets-common/Styles';
import { HeadingClickedEvent,RowClickedEvent,RowSelectedEvent,CellClickedEvent } from '../Table';
import { Fragment } from '../../';
import { Field } from '../Table';
 
 export function thead<D,Z>(view:AppView<Z>,fields:Field<D>[]){ return $$node('tr',{html:{},wml:{}},[$$if(this.attributes.read('ww:selectable'), function if5(){ return $$node('th',{html:{},wml:{}},[$$node('input',{html:{'type': "checkbox",'onclick': function function_literal_1(){ return this.model.allRowsSelected(); }.bind(this)},wml:{}},[], view)], view) }.bind(this),$$empty),$$for(fields, function for2 (field:Field<D>){ return $$if(!field.hidden, function if6(){ return $$if(field.sortAs, function if7(){ return $$node('th',{html:{'class': [this.attributes.read('ww:headingClass'),(this.sortedOn === field.name)? Styles.ACTIVE : ''].join(' '),'onclick': function function_literal_2(){ return this.model.headingClicked(new HeadingClickedEvent(field.name,field,this)); }.bind(this)},wml:{}},[$$domify(field.heading),$$if(this.sortedOn === field.name, function if8(){ return $$domify(this.arrow) }.bind(this),$$empty)], view) }.bind(this),function else_clause4(){ return $$node('th',{html:{'class': [this.attributes.read('ww:headingClass'),(this.sortedOn === field.name)? Styles.ACTIVE : ''].join(' '),'onclick': function function_literal_3(){ return this.model.headingClicked(new HeadingClickedEvent(field.name,field,this)); }.bind(this)},wml:{}},[$$domify(field.heading),$$if(this.sortedOn === field.name, function if9(){ return $$domify(this.arrow) }.bind(this),$$empty)], view) }.bind(this)) }.bind(this),$$empty) }.bind(this),function for_otherwise2(){ return $$empty() }.bind(this))], view); } export function tbody<D,Z>(view:AppView<Z>,data:D[],fields:Field<D>[]){ return $$widget(Fragment,{html:{},wml:{}},[$$for(data, function for3 (row:D,index:string){ return $$node('tr',{html:{'class': this.attributes.read('ww:rowClass'),'onclick': function function_literal_4(){ return this.model.rowClicked(new RowClickedEvent(row,index,data,this)); }.bind(this)},wml:{}},[$$if(this.attributes.read('ww:selectable'), function if10(){ return $$node('td',{html:{},wml:{}},[$$node('input',{html:{'type': "checkbox",'onclick': function function_literal_5(){ return this.model.rowSelected(new RowSelectedEvent(row,index,data,this)); }.bind(this)},wml:{}},[], view)], view) }.bind(this),$$empty),$$for(fields, function for4 (field:Field<D>){ return $$if(!field.hidden, function if11(){ return $$node('td',{html:{'class': this.attributes.read('ww:cellClass'),'onclick': function function_literal_6(){ return this.model.cellClicked(new CellClickedEvent(property(field.name,row),field.name,index,row,this)); }.bind(this)},wml:{}},[$$if(field.fragment, function if12(){ return field.fragment.call(this,view,property(field.name,row),field.name,row,field) }.bind(this),function else_clause5(){ return $$domify(property(field.name,row)) }.bind(this))], view) }.bind(this),$$empty) }.bind(this),function for_otherwise4(){ return $$empty() }.bind(this))], view) }.bind(this),function for_otherwise4(){ return $$empty() }.bind(this))], view); } 

export class TableView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('table',{html:{'class': [Styles.TABLE,this.attributes.read('ww:class','')].join(' ')},wml:{}},[$$node('thead',{html:{},wml:{'id': "head"}},[thead.call(this,view,this.attributes.read('ww:fields'))], view),$$node('tbody',{html:{},wml:{'id': "body"}},[tbody.call(this,view,this.data,this.attributes.read('ww:fields'))], view)], view)
        }

       }

     }

 