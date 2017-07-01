

export default function (make) { return make.node('li',{html:{'role': "presentation",'class': (this.attributes.read('wat:active',false))? 'active' : ''},wml:{'id': "root"}},[make.node('a',{html:{'href': "#",'onclick': this.clicked.bind(this)},wml:{'id': "link"}},[make.resolve(this, 'children'),this.attributes.read('wat:text','')])]); }