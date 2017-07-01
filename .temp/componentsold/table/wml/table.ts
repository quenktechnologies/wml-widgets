import Property from 'property-seek';
import tbody from './tbody.wml';
import thead from './thead.wml';


export default function (make) { return make.node('div',{html:{'class': "table-responsive"}},[make.node('table',{html:{'class': make.resolve(this, 'class')}},[make.node('thead',{html:{},wml:{'id': "head"}},[thead.apply(this, [make].concat([]))]),make.node('tbody',{html:{},wml:{'id': "body"}},[tbody.apply(this, [make].concat([]))])])]); }