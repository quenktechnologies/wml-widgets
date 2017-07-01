import * as Styles from 'common/Styles';


export default function (make) { return make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_MAIN')}},[make.resolve(this, 'children')]); }