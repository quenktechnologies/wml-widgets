

export default function (make) { return make.node('li',{html:{'class': 'list-group list-group-item ' + this.attributes.read('wat:variant','default')}},[make.resolve(this, 'children')]); }