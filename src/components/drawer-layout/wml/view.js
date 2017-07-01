import * as Styles from 'common/Styles';


export default function (make) { return make.node('div',{html:{'class': make.resolve(Styles, 'DRAWER_LAYOUT')}},[make.node('div',{html:{'class': make.resolve(Styles, 'DRAWER')},wml:{'id': "drawer"}},[make.node('div',{html:{'class': make.resolve(Styles, 'DRAWER_CONTENT')}},[this.drawerContent()])]),make.node('div',{html:{'class': make.resolve(Styles, 'MAIN_VIEW')}},[this.mainViewContent()])]); }