import * as Class from 'wat-classes';


export default function (make) { return make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_NOTIFICATION')},wml:{'id': "message"}},[]); }