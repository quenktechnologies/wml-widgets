

export default function (make) { return make.node('div',{html:{'class': this.attributes.read('wat:class','modal fade'),'tabindex': "-1",'role': "dialog"}},[make.node('div',{html:{'class': 'modal-dialog ' + this.attributes.read('wat:sizeClass','modal-md'),'role': "document"}},[make.node('div',{html:{'class': "modal-content"},wml:{'id': "root"}},[make.resolve(this, 'children')])])]); }