

export default function (make) { return make.node('div',{html:{'class': "card"}},[this.attributes.read('wat:children'),make.resolve(this, 'children')]); }