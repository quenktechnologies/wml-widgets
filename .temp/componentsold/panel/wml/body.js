

export default function (make) { return make.node('div',{html:{'class': "panel-body"}},[make.resolve(this, 'children')]); }