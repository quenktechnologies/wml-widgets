import * as Styles from 'common/Styles';


export default function (make) { return make.node('div',{html:{'class': make.resolve(Styles, 'LAYOUT')}},[make.resolve(this, 'children')]); }