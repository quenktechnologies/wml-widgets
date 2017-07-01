import MenuButton from "../../menu-button/MenuButton";
import * as Class from "wat-classes";


export default function (make) { return make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_ACTION_AREA')}},[make.widget(MenuButton,{html:{},wat:{'onClick': this.attributes.read('wat:onMenuButtonClicked',make.resolve(this, 'noop'))}},[]),make.node('div',{html:{'class': make.resolve(Class, 'LAYOUT_ACTION_AREA_CONTENT')},wml:{'id': "content"}},[make.resolve(this, 'children')])]); }