import * as Class from "wat-classes";


export default function (make) { return make.node('header',{html:{'class': make.resolve(Class, 'LAYOUT_LOGOIMAGE')}},[make.$if(this.attributes.read('wat:image',false), function if0(){return [make.node('h1',{html:{}},[make.node('a',{html:{'href': this.attributes.read('wat:href','#')}},[make.node('img',{html:{'class': make.resolve(Class, 'LAYOUT_LOGOIMAGE_IMAGE'),'src': this.attributes.read('wat:image'),'alt': this.attributes.read('wat:alt')}},[])])])];}.bind(this),)]); }