

export default function (make) { return make.node('li',{html:{}},[make.$if(this.attributes.read('wat:active',false), function if0(){return [make.resolve(this, 'children')];}.bind(this),function else_clause3() { return [make.node('a',{html:{'href': this.attributes.read('wat:href','#')}},[make.resolve(this, 'children')])];}.bind(this))]); }