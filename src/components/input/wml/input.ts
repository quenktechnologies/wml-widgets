
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
 
 import * as Styles from "wml-widgets-common/Styles";
import { Opt } from "../Input";
 
 export function label<Z>(view:AppView<Z>){ return $$node('label',{html:{'for': this.attributes.read('ww:id'),'class': Styles.CONTROL_LABEL},wml:{}},[$$domify(this.attributes.read('ww:label'))], view); } export function message<Z>(view:AppView<Z>){ return $$node('span',{html:{'class': "help-block"},wml:{'id': "message"}},[$$domify(this.attributes.read('ww:message',''))], view); } 

export class SelectView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': [Styles.FORM_GROUP,this.attributes.read('ww:variant','')].join(',')},wml:{}},[label.call(this,view,),$$node('select',{html:{'id': this.attributes.read('ww:id',''),'title': this.attributes.read('ww:title'),'name': this.attributes.read('ww:name',this.attributes.read('ww:id','')),'onchange': this.delegate.onInput.bind(this.delegate),'value': this.initialValue(),'disabled': this.attributes.read('ww:disabled',null),'readonly': this.attributes.read('ww:readonly',null),'class': Styles.SELECT},wml:{'id': "input"}},[$$for(this.attributes.read('ww:options',[]), function for4 (opt:Opt){ return (function() { return (typeof opt === 'string')? $$box($$node('option',{html:{},wml:{}},[$$domify(opt)], view),$$node('option',{html:{},wml:{}},[$$domify(opt)], view),$$node('option',{html:{},wml:{}},[$$domify(opt)], view)) : $$node('option',{html:{'value': opt.value},wml:{}},[$$domify(opt.label)], view); }).call(this) }.bind(this),function for_otherwise4(){ return $$node('p',{html:{},wml:{}},[], view) }.bind(this))], view),message.call(this,view,)], view)
        }

       }

     }



export class InputView<C> extends AppView<C>{

    constructor(context:C) {

        super(context);

        let view = this;

        this.template = function() {
            return $$node('div',{html:{'class': [Styles.FORM_GROUP,this.attributes.read('ww:variant','')].join(',')},wml:{}},[label.call(this,view,),$$if(this.attributes.read('ww:type','text') !== 'textarea', function if12(){ return $$node('input',{html:{'id': this.attributes.read('ww:id',''),'title': this.attributes.read('ww:title'),'name': this.attributes.read('ww:name',this.attributes.read('ww:id','')),'type': this.attributes.read('ww:type','text'),'placeholder': this.attributes.read('ww:placeholder'),'oninput': this.delegate.onInput.bind(this.delegate),'value': this.initialValue(),'disabled': this.attributes.read('ww:disabled',null),'readonly': this.attributes.read('ww:readonly',null),'class': Styles.INPUT},wml:{'id': "input"}},[], view) }.bind(this),function else_clause6(){ return $$node('textarea',{html:{'id': this.attributes.read('ww:id',''),'title': this.attributes.read('ww:title'),'name': this.attributes.read('ww:name',this.attributes.read('ww:id','')),'class': Styles.TEXTAREA,'placeholder': this.attributes.read('ww:placeholder'),'oninput': this.delegate.onInput.bind(this.delegate),'disabled': this.attributes.read('ww:disabled',null),'readonly': this.attributes.read('ww:readonly',null),'rows': this.attributes.read('wat:rows')},wml:{'id': "input"}},[$$domify(this.initialValue())], view) }.bind(this)),message.call(this,view,)], view)
        }

       }

     }

 