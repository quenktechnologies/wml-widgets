

export default function (make) { return make.node('section',{html:{'class': make.resolve(this, 'className')}},[make.resolve(this, 'children')]); }