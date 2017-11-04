/**
 * HIDDEN indicates an element should be hidden from sight.
 */
export const HIDDEN = '-hidden';

/**
 * DISABLED indicates an element should appear to be inaccesible
 */
export const DISABLED = '-disabled';

/**
 * ON indicates an 'on' state.
 */
export const ON = '-on';

/**
 * OFF indicates an 'off' state.
 */
export const OFF = '-off';

/**
 * open indicates an open state in collapsable widgets
 */
export const OPEN = '-open';

/**
 * PUSHABLE is used by other styles to move an element around.
 */
export const PUSHABLE = '-pushable';

/**
 * FIXED_PUSHABLE is like PUSHABLE but used for fixed elements. 
 */
export const FIXED_PUSHABLE = '-fixed-pushable';

/**
 * NO_HOVER indicates hover effects should be disabled.
 */
export const NO_HOVER = '-no-hover';

export const SPACED = '-spaced';

/**
 * DEFAULT style modifier.
 */
export const DEFAULT = '-default';

/**
 * PRIMARY style modifier.
 */
export const PRIMARY = '-primary';

/**
 * SUCCESS style modifier.
 */
export const SUCCESS = '-success';

/**
 * INFO style modifier. 
 */
export const INFO = '-info';

/**
 * WARNING style modifier.
 */
export const WARNING = '-warning';

/**
 * DANGER style modifier.
 */
export const DANGER = '-danger';

export const LARGE = '-large';
export const SMALL = '-small';
export const EXTRA_SMALL = '-extra-small';

export const ACTIVE = 'active'; //@todo: refactor to flag syntax

export const DRAWER = 'ww-drawer-layout';

export const ASIDE = 'ww-drawer';
export const ASIDE_CONTENT = 'ww-drawer__content';
export const ASIDE_PUSHABLE = '-drawer-pushable';
export const ASIDE_PUSHABLE_FIXED = '-drawer-pushable-fixed';

/**
 * ACTION_BAR classes for the ActionBar root.
 */
export const ACTION_BAR = 'ww-action-bar';

/**
 * ACTION_BAR_CONTENT classes 
 */
export const ACTION_BAR_CONTENT = 'ww-action-bar__content';

/**
 * ICON_BUTTON clasess for IconButtons.
 */
export const ICON_BUTTON = 'ww-icon-button';

/**
 * BUTTON_MENU classes
 */
export const BUTTON_MENU = 'ww-button-menu btn-group';

/**
 * BUTTON_MENU_BUTTON classes
 */
export const BUTTON_MENU_BUTTON = `${BUTTON_MENU}__button`;

/**
 * BUTTON_MENU_MENU classes
 */
export const BUTTON_MENU_MENU = `${BUTTON_MENU_BUTTON}__menu`;

/**
 * BUTTON_SELECT
 */
export const BUTTON_SELECT = 'btn-group';

export const BUTTON_SELECT_OPTION = `${BUTTON_SELECT}__option btn`;

export const MAIN_VIEW = 'ww-main-view';

/**
 * MENU classes.
 */
export const MENU = 'ww-menu';

/**
 * MENU_ITEM classes.
 */
export const MENU_ITEM = `${MENU}__item`;

/**
 * MENU_HEADER classes.
 */
export const MENU_HEADER = `${MENU}__header`;

/**
 * MENU_DIVIDER classes.
 */
export const MENU_DIVIDER = `${MENU}__divider`;

/**
 * DASH classes
 */
export const DASH = 'ww-dash';

/**
 * NAV classes
 */
export const NAV = 'ww-nav';

/**
 * NAV_LINK classes
 */
export const NAV_LINK = 'ww-nav-link';

/**
 * NAV_LIST classes
 */
export const NAV_LIST = 'ww-nav-list';

/**
 * NAV_LIST_ITEM classes
 */
export const NAV_LIST_ITEM = 'ww-nav-list__item';

/**
 * NAV_LIST_ITEM_TEXT classes
 */
export const NAV_LIST_ITEM_TEXT = 'ww-nav-list__item__text';

export const BUTTON = 'ww-button';
export const BUTTON_GROUP = 'ww-button-group';

//@todo: refactor this to be inline with other class names
export const GRID = 'ww-grid container-fluid';
export const GRID_COLUMN = 'ww-grid-column';
export const GRID_ROW = 'ww-grid-row row';

/**
 * PANEL wrapper class.
 */
export const PANEL = 'ww-panel';

/**
 * PANEL_HEADER classes.
 */
export const PANEL_HEADER = 'ww-panel__header';

/**
 * PANEL_BODY classes.
 */
export const PANEL_BODY = 'ww-panel__body';

/**
 * PANEL_FOOTER classes.
 */
export const PANEL_FOOTER = 'ww-panel__footer';

/**
 * HEADER classes.
 */
export const HEADER = 'ww-header';

export const MODAL = 'ww-modal';
export const MODAL_DIALOG = 'ww-modal__dialog';
export const MODAL_CONTENT = 'ww-modal__content';
export const MODAL_HEADER = 'ww-modal__header';
export const MODAL_BODY = 'ww-modal__body';
export const MODAL_FOOTER = 'ww-moadl__footer';

export const FORM_GROUP = 'form-group';
export const CONTROL_LABEL = 'control-label';

export const INPUT = 'form-control';
export const TEXTAREA = 'form-control';
export const SELECT = 'form-control';

/**
 * Tabs classes.
 */
export const TABS = 'nav nav-tabs'; //@todo un-bootstrap

/**
 * SWITCH classes.
 */
export const SWITCH = 'ww-switch';

/**
 * SWITCH_SLIDER classes.
 */
export const SWITCH_SLIDER = 'ww-switch__slider';

/**
 * CHECKBOX classes.
 */
export const CHECKBOX = 'checkbox';

export const TABLE = 'table'; //@todo un-bootstrap

/**
 * BREAD_CRUMBS clasess
 */
export const BREAD_CRUMBS = 'breadcrumb'; //@todo un-bootstrap

/**
 * BREAD_CRUMBS_ITEM classes
 */
export const BREAD_CRUMBS_ITEM = `${BREAD_CRUMBS}__item`;

export const LIST = 'ww-list';
export const LIST_ITEM = 'ww-list__item';

/**
 * SEARCH classes.
 */
export const SEARCH = 'ww-search';

/**
 * SEARCH_INPUT classes
 */
export const SEARCH_INPUT = 'ww-search__input';

/**
 * DATE classes
 */
export const DATE = 'ww-date';

/**
 * DATE_DAY classes.
 */
export const DATE_DAY = `${DATE}__day`;

/**
 * DATE_MONTH classes.
 */
export const DATE_MONTH = `${DATE}_month`;

/**
 * DATE_YEAR classes.
 */
export const DATE_YEAR = `${DATE}__year`;

/**
 * STACK classes
 */
export const STACK = 'ww-stack';

/**
 * STACK_CLOSE classes
 */
export const STACK_CLOSE = `${STACK}__close`;

/**
 * STACK_MEMBER classes
 */
export const STACK_MEMBER = `${STACK}__member`;

/**
 * SEARCH_STACK classes
 */
export const SEARCH_STACK = 'ww-search-stack';
