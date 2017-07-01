import * as Class from "../../Class";


export default function (make) { return make.node('div',{html:{'class': make.resolve(Class, 'AUTOCOMPLETE')}},[make.node('input',{html:{'type': "text",'class': this.attributes.read('wat:inputClass'),'onkeydown': this.handleKeyDown.bind(this),'onkeyup': this.handleKeyUp.bind(this),'oninput': this.handleInput.bind(this),'placeholder': this.attributes.read('wat:placeholder','Type here to search')},wml:{'id': "input"}},[]),make.node('div',{html:{'class': make.resolve(Class, 'AUTOCOMPLETE_OPTIONS')},wml:{'id': "options"}},[])]); }