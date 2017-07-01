import * as Class from "wat-classes";


export default function (make) { return make.node('a',{html:{'class': (this.attributes.read('wat:active',false))? make.resolve(Class, 'ACTIVE') : '','href': this.attributes.read('wat:href'),'onclick': this.clicked.bind(this)},wml:{'id': "a"}},[make.$if(this.attributes.read('wat:icon-class',false), function if0(){return [make.node('i',{html:{'class': make.resolve(Class, 'LAYOUT_DRAWER_LINK_ICON') + this.attributes.read('wat:icon-class')}},[])];}.bind(this),),this.attributes.read('wat:title'),make.resolve(this, 'children')]); }