

export default function (make) { return make.node('div',{html:{'class': 'panel panel-' + this.attributes.read('wat:variant','default')}},[make.resolve(this, 'children')]); }