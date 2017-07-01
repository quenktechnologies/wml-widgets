import * as Class from 'wat-classes';


export default function (make) { return make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_DRAWER')},wml:{'id': "drawer"}},[make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_DRAWER_CONTENT')}},[make.resolve(this, 'children')])]); }