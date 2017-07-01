

export default function (make) { return make.node('div',{html:{'class': "row"}},[make.resolve(this, 'children')]); }