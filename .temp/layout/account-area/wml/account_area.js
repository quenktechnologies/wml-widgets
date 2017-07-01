import * as Class from "wat-classes";


export default function (make) { return make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_ACCOUNT_AREA')},wml:{'id': "root"}},[make.node('button',{html:{'onclick': this.toggle.bind(this)}},[make.node('span',{html:{'class': make.resolve(Class, 'LAYOUT_ACCOUNT_AREA_TITLE')}},[this.attributes.read('wat:title')])]),make.resolve(this, 'children')]); }