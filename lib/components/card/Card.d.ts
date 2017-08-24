import { Component, Attrs } from '@quenk/wml-runtime';
import * as layout from './wml/card';
export interface CardAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
/**
 * Card
 */
export declare class Card extends Component<CardAttrs> {
    view: layout.Card<this>;
}
/**
 * CardBody
 */
export declare class CardBody extends Component<CardAttrs> {
    view: layout.CardBody<this>;
}
