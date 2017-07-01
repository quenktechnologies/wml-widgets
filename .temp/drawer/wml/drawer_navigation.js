import * as Class from "wat-classes";


export default function (make) { return make.node('nav',{html:{'class': make.resolve(Class, 'LAYOUT_DRAWER_NAVIGATION')},wml:{'id': "nav"}},[make.resolve(this, 'children')]); }