
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
 
 import * as Styles from 'wml-widgets-common/Styles';
 
 
        export function label<Z>(view:AppView<Z>) {
        return $$box([$$node('label',{html:{'for': this.attributes.read('ww:id'),'class': Styles.CONTROL_LABEL}},[this.attributes.read('ww:label')], view)]);}
        
        export function message<Z>(view:AppView<Z>) {
        return $$box([$$node('span',{html:{'class': "help-block"},wml:{'id': "message"}},[this.attributes.read('ww:message','')], view)]);}
        

export class SelectView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': [Styles.FORM_GROUP,this.attributes.read('ww:variant','')].join(',')}},[label.apply(this, [view, ]),$$node('select',{html:{'id': this.attributes.read('ww:id',''),'title': this.attributes.read('ww:title'),'name': this.attributes.read('ww:name',this.attributes.read('ww:id','')),'onchange': this.delegate.onInput.bind(this.delegate),'value': this.initialValue(),'disabled': this.attributes.read('ww:disabled',null),'readonly': this.attributes.read('ww:readonly',null),'class': Styles.SELECT},wml:{'id': "input"}},[$$for(this.attributes.read('ww:options',[]),function for1 (opt, _, __) {return $$box([$$if(typeof(opt) === 'string', function if1() {return $$box([$$node('option',{html:{}},[opt], view)])}.bind(this),  function else_clause1() {return $$box([$$node('option',{html:{'value': opt.value}},[opt.label], view)]);}.bind(this))])}.bind(this), function otherwise1() {return $$box([$$node('p',{html:{}},[], view)])}.bind(this))], view),message.apply(this, [view, ])], view)
        }

       }

     }



export class InputView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': [Styles.FORM_GROUP,this.attributes.read('ww:variant','')].join(',')}},[label.apply(this, [view, ]),$$if(this.attributes.read('ww:type','text') !== 'textarea', function if2() {return $$box([$$node('input',{html:{'id': this.attributes.read('ww:id',''),'title': this.attributes.read('ww:title'),'name': this.attributes.read('ww:name',this.attributes.read('ww:id','')),'type': this.attributes.read('ww:type','text'),'placeholder': this.attributes.read('ww:placeholder'),'oninput': this.delegate.onInput.bind(this.delegate),'value': this.initialValue(),'disabled': this.attributes.read('ww:disabled',null),'readonly': this.attributes.read('ww:readonly',null),'class': Styles.INPUT},wml:{'id': "input"}},[], view)])}.bind(this),  function else_clause2() {return $$box([$$node('textarea',{html:{'id': this.attributes.read('ww:id',''),'title': this.attributes.read('ww:title'),'name': this.attributes.read('ww:name',this.attributes.read('ww:id','')),'class': Styles.TEXTAREA,'placeholder': this.attributes.read('ww:placeholder'),'oninput': this.delegate.onInput.bind(this.delegate),'disabled': this.attributes.read('ww:disabled',null),'readonly': this.attributes.read('ww:readonly',null),'rows': this.attributes.read('wat:rows')},wml:{'id': "input"}},[this.initialValue()], view)]);}.bind(this)),message.apply(this, [view, ])], view)
        }

       }

     }

 