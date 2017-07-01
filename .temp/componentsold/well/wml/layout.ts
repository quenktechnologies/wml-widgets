

export default function (make) { return make.node('div',{html:{'class': "well"}},[make.resolve(this, 'children')]); }