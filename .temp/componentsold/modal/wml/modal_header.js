

export default function (make) { return make.node('div',{html:{'class': "modal-header"}},[make.node('button',{html:{'type': "button",'class': "close",'data-dismiss': "modal",'aria-label': "Close"}},[make.node('span',{html:{'aria-hidden': "true"}},[make.text(`×`)])]),make.resolve(this, 'children')]); }