

export default function (make) { return make.node('ul',{html:{'class': "nav nav-tabs"}},[make.resolve(this, 'children')]); }