
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
 
 import { get as property } from 'property-seek';
import * as Styles from 'wml-widgets-common/Styles';
import { HeadingClickedEvent,RowClickedEvent,RowSelectedEvent,CellClickedEvent } from '../Table';
import { Fragment } from '../../';
 
 
        export function thead<Z>(view:AppView<Z>,fields) {
        return $$box([$$node('tr',{html:{}},[$$if(this.attributes.read('ww:selectable'), function if5() {return $$box([$$node('th',{html:{}},[$$node('input',{html:{'type': "checkbox",'onclick': function function_literal_1(_){ return this.model.allRowsSelected(); }.bind(this)}},[], view)], view)])}.bind(this),  $$empty),$$for(fields,function for2 (field, _, __) {return $$box([$$if(!field.hidden, function if6() {return $$box([$$if(field.sortAs, function if7() {return $$box([$$node('th',{html:{'class': [this.attributes.read('ww:headingClass'),(this.sortedOn === field.name)? Styles.ACTIVE : ''].join(' '),'onclick': function function_literal_2(_){ return this.model.headingClicked(new HeadingClickedEvent(field.name,field,this)); }.bind(this)}},[field.heading,$$if(this.sortedOn === field.name, function if8() {return $$box([this.arrow])}.bind(this),  $$empty)], view)])}.bind(this),  function else_clause4() {return $$box([$$node('th',{html:{'class': [this.attributes.read('ww:headingClass'),(this.sortedOn === field.name)? Styles.ACTIVE : ''].join(' '),'onclick': function function_literal_3(_){ return this.model.headingClicked(new HeadingClickedEvent(field.name,field,this)); }.bind(this)}},[field.heading,$$if(this.sortedOn === field.name, function if9() {return $$box([this.arrow])}.bind(this),  $$empty)], view)]);}.bind(this))])}.bind(this),  $$empty)])}.bind(this), function otherwise2() {return $$box([])}.bind(this))], view)]);}
        
        export function tbody<Z>(view:AppView<Z>,data,fields) {
        return $$box([$$widget(Fragment,{html:{}},[$$for(data,function for3 (row, index, __) {return $$box([$$node('tr',{html:{'class': this.attributes.read('ww:rowClass'),'onclick': function function_literal_4(_){ return this.model.rowClicked(new RowClickedEvent(row,index,data,this)); }.bind(this)}},[$$if(this.attributes.read('ww:selectable'), function if10() {return $$box([$$node('td',{html:{}},[$$node('input',{html:{'type': "checkbox",'onclick': function function_literal_5(_){ return this.model.rowSelected(new RowSelectedEvent(row,index,data,this)); }.bind(this)}},[], view)], view)])}.bind(this),  $$empty),$$for(fields,function for4 (field, _, __) {return $$box([$$if(!field.hidden, function if11() {return $$box([$$node('td',{html:{'class': this.attributes.read('ww:cellClass'),'onclick': function function_literal_6(_){ return this.model.cellClicked(new CellClickedEvent(property(field.name,row),field.name,index,row,this)); }.bind(this)}},[$$if(field.fragment, function if12() {return $$box([field.fragment.apply(this, [view, property(field.name,row),field.name,row,field])])}.bind(this),  function else_clause5() {return $$box([property(field.name,row)]);}.bind(this))], view)])}.bind(this),  $$empty)])}.bind(this), function otherwise4() {return $$box([])}.bind(this))], view)])}.bind(this), function otherwise4() {return $$box([])}.bind(this))], view)]);}
        

export class TableView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('table',{html:{'class': [Styles.TABLE,this.attributes.read('ww:class','')].join(' ')}},[$$node('thead',{html:{},wml:{'id': "head"}},[thead.apply(this, [view, this.attributes.read('ww:fields')])], view),$$node('tbody',{html:{},wml:{'id': "body"}},[tbody.apply(this, [view, this.data,this.attributes.read('ww:fields')])], view)], view)
        }

       }

     }

 