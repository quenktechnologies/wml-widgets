

export default function (make) { return make.node('ul',{html:{'class': "list-group"}},[make.resolve(this, 'children')]); }