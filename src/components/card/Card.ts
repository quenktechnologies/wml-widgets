import { Component, Attrs } from '@quenk/wml-runtime';
import * as layout from './wml/card';

export interface CardAttrs extends Attrs {

    ww?: {

        class?: string

    }

};

/**
 * Card
 */
export class Card extends Component<CardAttrs>{

    view = new layout.Card(this);

}

/**
 * CardBody 
 */
export class CardBody extends Component<CardAttrs>{

    view = new layout.CardBody(this);

}



