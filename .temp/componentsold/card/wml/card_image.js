

export default function (make) { return make.node('img',{html:{'src': this.attributes.read('wat:src'),'alt': this.attributes.read('wat:alt')}},[]); }