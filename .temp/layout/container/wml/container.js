import * as Class from 'wat-classes';


export default function (make) { return make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_CONTAINER')}},[make.resolve(this, 'children')]); }