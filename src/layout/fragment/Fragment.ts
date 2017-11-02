import { Component, Attrs } from '@quenk/wml';

export class Fragment extends Component<Attrs> {

    render() {

        let frag = document.createDocumentFragment();

        this.children.forEach(c => frag.appendChild(c));

        return frag;

    }

}