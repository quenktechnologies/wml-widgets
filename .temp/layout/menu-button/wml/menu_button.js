import * as Class from 'wat-classes';


export default function (make) { return make.node('button',{html:{'class': make.resolve(Class, 'LAYOUT_MENU_BUTTON'),'onclick': this.clicked.bind(this)}},[make.node('span',{html:{'class': ""}},[]),make.node('span',{html:{'class': ""}},[]),make.node('span',{html:{'class': ""}},[])]); }