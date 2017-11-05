import { Attrs } from '@quenk/wml';
/**
 * StylableAttrs interface is for components that can be styled.
 */
export interface StylableAttrs extends Attrs {
    ww?: {
        class?: string;
    };
}
