"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HIDDEN indicates an element should be hidden from sight.
 */
exports.HIDDEN = '-hidden';
/**
 * DISABLED indicates an element should appear to be inaccesible
 */
exports.DISABLED = '-disabled';
/**
 * ON indicates an 'on' state.
 */
exports.ON = '-on';
/**
 * OFF indicates an 'off' state.
 */
exports.OFF = '-off';
/**
 * open indicates an open state in collapsable widgets
 */
exports.OPEN = '-open';
/**
 * PUSHABLE is used by other styles to move an element around.
 */
exports.PUSHABLE = '-pushable';
/**
 * FIXED_PUSHABLE is like PUSHABLE but used for fixed elements.
 */
exports.FIXED_PUSHABLE = '-fixed-pushable';
/**
 * NO_HOVER indicates hover effects should be disabled.
 */
exports.NO_HOVER = '-no-hover';
exports.SPACED = '-spaced';
/**
 * DEFAULT style modifier.
 */
exports.DEFAULT = '-default';
/**
 * PRIMARY style modifier.
 */
exports.PRIMARY = '-primary';
/**
 * SUCCESS style modifier.
 */
exports.SUCCESS = '-success';
/**
 * INFO style modifier.
 */
exports.INFO = '-info';
/**
 * WARNING style modifier.
 */
exports.WARNING = '-warning';
/**
 * DANGER style modifier.
 */
exports.DANGER = '-danger';
exports.LARGE = '-large';
exports.SMALL = '-small';
exports.EXTRA_SMALL = '-extra-small';
exports.ACTIVE = 'active'; //@todo: refactor to flag syntax
exports.DRAWER = 'ww-drawer-layout';
exports.ASIDE = 'ww-drawer';
exports.ASIDE_CONTENT = 'ww-drawer__content';
exports.ASIDE_PUSHABLE = '-drawer-pushable';
exports.ASIDE_PUSHABLE_FIXED = '-drawer-pushable-fixed';
/**
 * ACTION_BAR classes for the ActionBar root.
 */
exports.ACTION_BAR = 'ww-action-bar';
/**
 * ACTION_BAR_CONTENT classes
 */
exports.ACTION_BAR_CONTENT = 'ww-action-bar__content';
/**
 * ICON_BUTTON clasess for the MenuButton.
 */
exports.ICON_BUTTON = 'ww-menu-button';
/**
 * BUTTON_MENU classes
 */
exports.BUTTON_MENU = 'ww-button-menu btn-group';
/**
 * BUTTON_MENU_BUTTON classes
 */
exports.BUTTON_MENU_BUTTON = exports.BUTTON_MENU + "__button";
/**
 * BUTTON_MENU_MENU classes
 */
exports.BUTTON_MENU_MENU = exports.BUTTON_MENU_BUTTON + "__menu";
/**
 * BUTTON_SELECT
 */
exports.BUTTON_SELECT = 'btn-group';
exports.BUTTON_SELECT_OPTION = exports.BUTTON_SELECT + "__option btn";
exports.MAIN_VIEW = 'ww-main-view';
/**
 * MENU classes.
 */
exports.MENU = 'ww-menu';
/**
 * MENU_ITEM classes.
 */
exports.MENU_ITEM = exports.MENU + "__item";
/**
 * MENU_HEADER classes.
 */
exports.MENU_HEADER = exports.MENU + "__header";
/**
 * MENU_DIVIDER classes.
 */
exports.MENU_DIVIDER = exports.MENU + "__divider";
/**
 * DASH classes
 */
exports.DASH = 'ww-dash';
/**
 * NAV classes
 */
exports.NAV = 'ww-nav';
/**
 * NAV_LINK classes
 */
exports.NAV_LINK = 'ww-nav-link';
/**
 * NAV_LIST classes
 */
exports.NAV_LIST = 'ww-nav-list';
/**
 * NAV_LIST_ITEM classes
 */
exports.NAV_LIST_ITEM = 'ww-nav-list__item';
/**
 * NAV_LIST_ITEM_TEXT classes
 */
exports.NAV_LIST_ITEM_TEXT = 'ww-nav-list__item__text';
exports.BUTTON = 'ww-button';
exports.BUTTON_GROUP = 'ww-button-group';
//@todo: refactor this to be inline with other class names
exports.GRID = 'container-fluid';
exports.GRID_COL = '';
exports.GRID_ROW = 'row';
/**
 * PANEL wrapper class.
 */
exports.PANEL = 'ww-panel';
/**
 * PANEL_HEADER classes.
 */
exports.PANEL_HEADER = 'ww-panel__header';
/**
 * PANEL_BODY classes.
 */
exports.PANEL_BODY = 'ww-panel__body';
/**
 * PANEL_FOOTER classes.
 */
exports.PANEL_FOOTER = 'ww-panel__footer';
/**
 * HEADER classes.
 */
exports.HEADER = 'ww-header';
exports.MODAL = 'ww-modal';
exports.MODAL_DIALOG = 'ww-modal__dialog';
exports.MODAL_CONTENT = 'ww-modal__content';
exports.MODAL_HEADER = 'ww-modal__header';
exports.MODAL_BODY = 'ww-modal__body';
exports.MODAL_FOOTER = 'ww-moadl__footer';
exports.FORM_GROUP = 'form-group';
exports.CONTROL_LABEL = 'control-label';
exports.INPUT = 'form-control';
exports.TEXTAREA = 'form-control';
exports.SELECT = 'form-control';
/**
 * Tabs classes.
 */
exports.TABS = 'nav nav-tabs'; //@todo un-bootstrap
/**
 * SWITCH classes.
 */
exports.SWITCH = 'ww-switch';
/**
 * SWITCH_SLIDER classes.
 */
exports.SWITCH_SLIDER = 'ww-switch__slider';
/**
 * CHECKBOX classes.
 */
exports.CHECKBOX = 'checkbox';
exports.TABLE = 'table'; //@todo un-bootstrap
/**
 * BREAD_CRUMBS clasess
 */
exports.BREAD_CRUMBS = 'breadcrumb'; //@todo un-bootstrap
/**
 * BREAD_CRUMBS_ITEM classes
 */
exports.BREAD_CRUMBS_ITEM = exports.BREAD_CRUMBS + "__item";
exports.LIST = 'ww-list';
exports.LIST_ITEM = 'ww-list__item';
/**
 * SEARCH classes.
 */
exports.SEARCH = 'ww-search';
/**
 * SEARCH_INPUT classes
 */
exports.SEARCH_INPUT = 'ww-search__input';
/**
 * DATE classes
 */
exports.DATE = 'ww-date';
/**
 * DATE_DAY classes.
 */
exports.DATE_DAY = exports.DATE + "__day";
/**
 * DATE_MONTH classes.
 */
exports.DATE_MONTH = exports.DATE + "_month";
/**
 * DATE_YEAR classes.
 */
exports.DATE_YEAR = exports.DATE + "__year";
/**
 * STACK classes
 */
exports.STACK = 'ww-stack';
/**
 * STACK_CLOSE classes
 */
exports.STACK_CLOSE = exports.STACK + "__close";
/**
 * STACK_MEMBER classes
 */
exports.STACK_MEMBER = exports.STACK + "__member";
/**
 * SEARCH_STACK classes
 */
exports.SEARCH_STACK = 'ww-search-stack';
//# sourceMappingURL=names.js.map