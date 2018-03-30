import * as views from './wml/fragment';
import { Component, Attrs } from '@quenk/wml';

export class Fragment extends Component<Attrs> {

    view = new views.Main(null);

    render() {

        let frag = document.createDocumentFragment();

        this.children.forEach(c => frag.appendChild(c));

        return frag;

    }

}
