"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * misc class names.
 */
exports.misc = {
    /**
     * NO_HOVER means no effects on hover.
     */
    NO_HOVER: '-no-hover'
};
/**
 * states commonly used by the widgets.
 */
exports.states = {
    /**
     * ACTIVE usually means an element is active like a link.
     */
    ACTIVE: '-active',
    /**
     * HIDDEN means an element should not be visible but not removed
     * from the DOM.
     */
    HIDDEN: '-hidden',
    /**
     * DISABLED means an element should not be interactable.
     */
    DISABLED: '-disabled',
    /**
     * ON state.
     */
    ON: '-on',
    /**
     * OFF state.
     */
    OFF: '-off',
    /**
     * OPEN state.
     */
    OPEN: '-open'
};
/**
 * sizes used by widgets that ship with preset sizes.
 */
exports.sizes = {
    EXTRA_SMALL: '-xs-small',
    SMALL: '-small',
    MEDIUM: '-medium',
    LARGE: '-large',
    EXTRA_LARGE: '-xs-large'
};
/**
 * styles preset for contexual widgets.
 */
exports.styles = {
    /**
     * DEFAULT style.
     */
    DEFAULT: '-default',
    /**
     * PRIMARY style.
     */
    PRIMARY: '-primary',
    /**
     * SUCCESS style.
     */
    SUCCESS: '-success',
    /**
     * INFO style.
     */
    INFO: '-info',
    /**
     * WARNING style.
     */
    WARNING: '-warning',
    /**
     * DANGER style.
     */
    DANGER: '-danger'
};
/**
 * features provides class names used for indicating support for
 * particular features by a widget's DOM available to other widets.
 */
exports.features = {
    /**
     * PUSHABLE usually means the widget can be moved by some margin.
     */
    PUSHABLE: '-pushable',
    /**
     * FIXED_PUSHABLE is PUSHABLE for position:fixed widgets.
     */
    FIXED_PUSHABLE: '-fixed-pushable',
    /**
     * BLOCK makes an element block scoped.
     */
    BLOCK: '-block',
    /**
     * OUTLINE indicates no background with only borders shown.
     */
    OUTLINE: '-outline',
    /**
     * LINK indicates an element should be styled like a link.
     */
    LINK: '-link',
};
//# sourceMappingURL=index.js.map