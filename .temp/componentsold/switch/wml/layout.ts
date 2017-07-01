import * as Class from 'wat-classes';


export default function (make) { return make.node('label',{html:{'class': make.resolve(Class, 'WAT_COMPONENTS_SWITCH')}},[make.node('input',{html:{'type': "checkbox",'name': this.attributes.read('wat:name'),'value': this.calculateValue(),'onchange': this.changed.bind(this)}},[]),make.node('div',{html:{'class': make.resolve(Class, 'WAT_COMPONENTS_SWITCH_SLIDER')}},[])]); }