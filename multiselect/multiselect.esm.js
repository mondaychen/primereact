'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption, FilterService } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { useUpdateEffect, useMountEffect, useOverlayListener, useUnmountEffect } from 'primereact/hooks';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { TimesIcon } from 'primereact/icons/times';
import { TimesCircleIcon } from 'primereact/icons/timescircle';
import { OverlayService } from 'primereact/overlayservice';
import { Tooltip } from 'primereact/tooltip';
import { classNames, ObjectUtils, DomHandler, mergeProps, IconUtils, UniqueComponentId, ZIndexUtils } from 'primereact/utils';
import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';
import { VirtualScroller } from 'primereact/virtualscroller';
import { CheckIcon } from 'primereact/icons/check';
import { SearchIcon } from 'primereact/icons/search';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

var classes$1 = {
  root: function root(_ref) {
    var props = _ref.props,
      focusedState = _ref.focusedState,
      overlayVisibleState = _ref.overlayVisibleState;
    return classNames('p-multiselect p-component p-inputwrapper', {
      'p-multiselect-chip': props.display === 'chip',
      'p-disabled': props.disabled,
      'p-multiselect-clearable': props.showClear && !props.disabled,
      'p-focus': focusedState,
      'p-inputwrapper-filled': ObjectUtils.isNotEmpty(props.value),
      'p-inputwrapper-focus': focusedState || overlayVisibleState
    });
  },
  label: function label(_ref2) {
    var props = _ref2.props,
      empty = _ref2.empty;
    return classNames('p-multiselect-label', {
      'p-placeholder': empty && props.placeholder,
      'p-multiselect-label-empty': empty && !props.placeholder && !props.selectedItemTemplate,
      'p-multiselect-items-label': !empty && props.display !== 'chip' && props.value.length > props.maxSelectedLabels
    });
  },
  panel: function panel(_ref3) {
    var props = _ref3.panelProps,
      context = _ref3.context,
      allowOptionSelect = _ref3.allowOptionSelect;
    return classNames('p-multiselect-panel p-component', {
      'p-multiselect-inline': props.inline,
      'p-multiselect-flex': props.flex,
      'p-multiselect-limited': !allowOptionSelect,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
  },
  list: function list(_ref4) {
    var virtualScrollerOptions = _ref4.virtualScrollerOptions;
    return virtualScrollerOptions ? 'p-multiselect-items p-component' : 'p-multiselect-items p-component';
  },
  labelContainer: 'p-multiselect-label-container',
  triggerIcon: 'p-multiselect-trigger-icon p-c',
  trigger: 'p-multiselect-trigger',
  clearIcon: 'p-multiselect-clear-icon',
  tokenLabel: 'p-multiselect-token-label',
  token: 'p-multiselect-token',
  removeTokenIcon: 'p-multiselect-token-icon',
  wrapper: 'p-multiselect-items-wrapper',
  emptyMessage: 'p-multiselect-empty-message',
  itemGroup: 'p-multiselect-item-group',
  closeButton: 'p-multiselect-close p-link',
  header: 'p-multiselect-header',
  closeIcon: 'p-multiselect-close-icon',
  headerCheckboxContainer: 'p-multiselect-select-all',
  headerCheckboxIcon: 'p-multiselect-select-all p-checkbox-icon p-c',
  headerSelectAllLabel: 'p-multiselect-select-all-label',
  filterContainer: 'p-multiselect-filter-container',
  filterIcon: 'p-multiselect-filter-icon',
  item: function item(_ref5) {
    var props = _ref5.itemProps;
    return classNames('p-multiselect-item', {
      'p-highlight': props.selected,
      'p-disabled': props.disabled
    });
  },
  checkboxContainer: 'p-checkbox p-component',
  checkboxIcon: 'p-checkbox-icon p-c',
  checkbox: function checkbox(_ref6) {
    var props = _ref6.itemProps;
    return classNames('p-checkbox-box', {
      'p-highlight': props.selected
    });
  },
  transition: 'p-connected-overlay'
};
var styles$1 = "\n@layer primereact {\n    .p-multiselect {\n        display: inline-flex;\n        user-select: none;\n        cursor: pointer;\n    }\n    \n    .p-multiselect-trigger {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        cursor: pointer;\n    }\n    \n    .p-multiselect-label-container {\n        overflow: hidden;\n        flex: 1 1 auto;\n        cursor: pointer;\n    }\n    \n    .p-multiselect-label  {\n        display: block;\n        white-space: nowrap;\n        cursor: pointer;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n    \n    .p-multiselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n    \n    .p-multiselect-token {\n        cursor: default;\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n    }\n    \n    .p-multiselect-token-icon {\n        cursor: pointer;\n    }\n    \n    .p-multiselect .p-multiselect-panel {\n        min-width: 100%;\n    }\n    \n    .p-multiselect-inline.p-multiselect-panel {\n        border: none;\n        position: initial;\n        background: none;\n        box-shadow: none;\n    }\n    \n    .p-multiselect-inline.p-multiselect-panel .p-multiselect-items {\n        padding: 0;\n    }\n    \n    .p-multiselect-flex.p-multiselect-panel .p-multiselect-items {\n        display: flex;\n        flex-wrap: wrap;\n    }\n    \n    .p-multiselect-items-wrapper {\n        overflow: auto;\n    }\n    \n    .p-multiselect-items {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n    }\n    \n    .p-multiselect-item {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        font-weight: normal;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-multiselect-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n    \n    .p-multiselect-select-all-label {\n        margin-left: 0.5rem;\n    }\n    \n    .p-multiselect-filter-container {\n        position: relative;\n        flex: 1 1 auto;\n    }\n    \n    .p-multiselect-filter-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n    \n    .p-multiselect-filter-container .p-inputtext {\n        width: 100%;\n    }\n    \n    .p-multiselect-close {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        overflow: hidden;\n        position: relative;\n        margin-left: auto;\n    }\n    \n    .p-multiselect-clear-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n    \n    .p-fluid .p-multiselect {\n        display: flex;\n    }\n}\n";
var inlineStyles = {
  root: function root(_ref7) {
    var props = _ref7.props;
    return props.showClear && !props.disabled && {
      position: 'relative'
    };
  },
  itemGroup: function itemGroup(_ref8) {
    var scrollerOptions = _ref8.scrollerOptions;
    return {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
  }
};
var MultiSelectBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'MultiSelect',
    appendTo: null,
    ariaLabelledBy: null,
    checkboxIcon: null,
    className: null,
    clearIcon: null,
    closeIcon: null,
    dataKey: null,
    disabled: false,
    display: 'comma',
    dropdownIcon: null,
    emptyMessage: null,
    emptyFilterMessage: null,
    filter: false,
    filterBy: null,
    filterInputAutoFocus: true,
    filterLocale: undefined,
    filterMatchMode: 'contains',
    filterPlaceholder: null,
    filterTemplate: null,
    fixedPlaceholder: false,
    flex: false,
    id: null,
    inline: false,
    inputId: null,
    inputRef: null,
    itemCheckboxIcon: null,
    itemClassName: null,
    itemTemplate: null,
    maxSelectedLabels: null,
    name: null,
    onBlur: null,
    onChange: null,
    onClick: null,
    onFilter: null,
    onFocus: null,
    onHide: null,
    onRemove: null,
    onSelectAll: null,
    onShow: null,
    optionDisabled: null,
    optionGroupChildren: null,
    optionGroupLabel: null,
    optionGroupTemplate: null,
    optionLabel: null,
    optionValue: null,
    options: null,
    overlayVisible: false,
    panelClassName: null,
    panelFooterTemplate: null,
    panelHeaderTemplate: null,
    panelStyle: null,
    placeholder: null,
    removeIcon: null,
    resetFilterOnHide: false,
    scrollHeight: '200px',
    selectAll: false,
    selectedItemTemplate: null,
    selectedItemsLabel: '{0} items selected',
    selectionLimit: null,
    showClear: false,
    showSelectAll: true,
    style: null,
    tabIndex: 0,
    tooltip: null,
    tooltipOptions: null,
    transitionOptions: null,
    useOptionAsValue: false,
    value: null,
    virtualScrollerOptions: null,
    children: undefined
  },
  css: {
    classes: classes$1,
    styles: styles$1,
    inlineStyles: inlineStyles
  }
});

var classes = {
  icon: 'p-checkbox-icon p-c',
  input: function input(_ref) {
    var props = _ref.props,
      checked = _ref.checked,
      focusedState = _ref.focusedState;
    return classNames('p-checkbox-box', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    });
  },
  root: function root(_ref2) {
    var props = _ref2.props,
      checked = _ref2.checked,
      focusedState = _ref2.focusedState;
    return classNames('p-checkbox p-component', {
      'p-checkbox-checked': checked,
      'p-checkbox-disabled': props.disabled,
      'p-checkbox-focused': focusedState
    });
  }
};
var styles = "\n.p-checkbox {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    vertical-align: bottom;\n    position: relative;\n}\n\n.p-checkbox.p-checkbox-disabled {\n    cursor: auto;\n}\n\n.p-checkbox-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}        \n";
var CheckboxBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Checkbox',
    autoFocus: false,
    checked: false,
    className: null,
    disabled: false,
    falseValue: false,
    icon: null,
    id: null,
    inputId: null,
    inputRef: null,
    name: null,
    onChange: null,
    onClick: null,
    onContextMenu: null,
    onMouseDown: null,
    readOnly: false,
    required: false,
    style: null,
    tabIndex: null,
    tooltip: null,
    tooltipOptions: null,
    trueValue: true,
    value: null,
    children: undefined
  },
  css: {
    classes: classes,
    styles: styles
  }
});

function ownKeys$4(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$4(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$4(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Checkbox = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = CheckboxBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var _CheckboxBase$setMeta = CheckboxBase.setMetaData({
      props: props,
      state: {
        focused: focusedState
      },
      context: {
        checked: props.checked === props.trueValue,
        disabled: props.disabled
      }
    }),
    ptm = _CheckboxBase$setMeta.ptm,
    cx = _CheckboxBase$setMeta.cx,
    isUnstyled = _CheckboxBase$setMeta.isUnstyled;
  useHandleStyle(CheckboxBase.css.styles, isUnstyled, {
    name: 'checkbox',
    styled: true
  });
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var _onClick = function onClick(event) {
    if (props.disabled || props.readOnly) {
      return;
    }
    if (props.onChange || props.onClick) {
      var _checked = isChecked();
      var checkboxClicked = event.target instanceof HTMLDivElement || event.target instanceof HTMLSpanElement || event.target instanceof Object;
      var isInputToggled = event.target === inputRef.current;
      var isCheckboxToggled = checkboxClicked && event.target.checked !== _checked;
      if (isInputToggled || isCheckboxToggled) {
        var value = _checked ? props.falseValue : props.trueValue;
        var eventData = {
          originalEvent: event,
          value: props.value,
          checked: value,
          stopPropagation: function stopPropagation() {
            event.stopPropagation();
          },
          preventDefault: function preventDefault() {
            event.preventDefault();
          },
          target: {
            type: 'checkbox',
            name: props.name,
            id: props.id,
            value: props.value,
            checked: value
          }
        };
        props.onClick && props.onClick(eventData);

        // do not continue if the user defined click wants to prevent
        if (event.defaultPrevented) {
          return;
        }
        props.onChange && props.onChange(eventData);
      }
      DomHandler.focus(inputRef.current);
      event.preventDefault();
    }
  };
  var _onFocus = function onFocus() {
    setFocusedState(true);
  };
  var _onBlur = function onBlur() {
    setFocusedState(false);
  };
  var _onKeyDown = function onKeyDown(event) {
    if (event.code === 'Space' || event.key === ' ') {
      // event.key is for Android support
      _onClick(event);
    }
  };
  var isChecked = function isChecked() {
    return props.checked === props.trueValue;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  useUpdateEffect(function () {
    inputRef.current.checked = isChecked();
  }, [props.checked, props.trueValue]);
  useMountEffect(function () {
    if (props.autoFocus) {
      DomHandler.focus(inputRef.current, props.autoFocus);
    }
  });
  var checked = isChecked();
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = CheckboxBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var iconProps = mergeProps({
    className: cx('icon')
  }, ptm('icon'));
  var icon = checked ? props.icon || /*#__PURE__*/React.createElement(CheckIcon, iconProps) : null;
  var checkboxIcon = IconUtils.getJSXIcon(icon, _objectSpread$4({}, iconProps), {
    props: props,
    checked: checked
  });
  var rootProps = mergeProps({
    id: props.id,
    className: classNames(props.className, cx('root', {
      checked: checked,
      focusedState: focusedState
    })),
    style: props.style,
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onContextMenu: props.onContextMenu,
    onMouseDown: props.onMouseDown
  }, otherProps, ptm('root'));
  var hiddenInputWrapperProps = mergeProps({
    className: 'p-hidden-accessible'
  }, ptm('hiddenInputWrapper'));
  var hiddenInputProps = mergeProps(_objectSpread$4({
    id: props.inputId,
    type: 'checkbox',
    name: props.name,
    tabIndex: props.tabIndex,
    defaultChecked: checked,
    onFocus: function onFocus(e) {
      return _onFocus();
    },
    onBlur: function onBlur(e) {
      return _onBlur();
    },
    onKeyDown: function onKeyDown(e) {
      return _onKeyDown(e);
    },
    disabled: props.disabled,
    readOnly: props.readOnly,
    required: props.required
  }, ariaProps), ptm('hiddenInput'));
  var inputProps = mergeProps({
    className: cx('input', {
      checked: checked,
      focusedState: focusedState
    }),
    'data-p-highlight': checked,
    'data-p-disabled': props.disabled,
    'data-p-focus': focusedState
  }, ptm('input'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef
  }, rootProps), /*#__PURE__*/React.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputRef
  }, hiddenInputProps))), /*#__PURE__*/React.createElement("div", inputProps, checkboxIcon)), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
Checkbox.displayName = 'Checkbox';

function ownKeys$3(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$3(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$3(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MultiSelectHeader = /*#__PURE__*/React.memo(function (props) {
  var ptm = props.ptm,
    cx = props.cx,
    isUnstyled = props.isUnstyled;
  var filterOptions = {
    filter: function filter(e) {
      return onFilter(e);
    },
    reset: function reset() {
      return props.resetFilter();
    }
  };
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$3({
      hostName: props.hostName
    }, options));
  };
  var onFilter = function onFilter(event) {
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        query: event.target.value
      });
    }
  };
  var onSelectAll = function onSelectAll(event) {
    if (props.onSelectAll) {
      props.onSelectAll({
        originalEvent: event,
        checked: props.selectAll
      });
    }
    event.preventDefault();
    event.stopPropagation();
  };
  var createFilterElement = function createFilterElement() {
    var filterIconProps = mergeProps({
      className: cx('filterIcon')
    }, getPTOptions('filterIcon'));
    var icon = props.filterIcon || /*#__PURE__*/React.createElement(SearchIcon, filterIconProps);
    var filterIcon = IconUtils.getJSXIcon(icon, _objectSpread$3({}, filterIconProps), {
      props: props
    });
    if (props.filter) {
      var filterContainerProps = mergeProps({
        className: cx('filterContainer')
      }, getPTOptions('filterContainer'));
      var content = /*#__PURE__*/React.createElement("div", filterContainerProps, /*#__PURE__*/React.createElement(InputText, {
        ref: props.filterRef,
        type: "text",
        role: "textbox",
        value: props.filterValue,
        onChange: onFilter,
        className: "p-multiselect-filter",
        placeholder: props.filterPlaceholder,
        pt: ptm('filterInput'),
        __parentMetadata: {
          parent: props.metaData
        }
      }), filterIcon);
      if (props.filterTemplate) {
        var defaultContentOptions = {
          className: filterContainerProps.className,
          element: content,
          filterOptions: filterOptions,
          onFilter: onFilter,
          filterIconClassName: props.filterIconClassName,
          props: props
        };
        content = ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, content);
    }
    return null;
  };
  var filterElement = createFilterElement();
  var selectAllId = props.id ? props.id + '_selectall' : UniqueComponentId();
  var headerSelectAllLabelProps = mergeProps({
    htmlFor: selectAllId,
    className: cx('headerSelectAllLabel')
  }, getPTOptions('headerSelectAllLabel'));
  var headerCheckboxIconProps = mergeProps({
    className: cx('headerCheckboxIcon')
  }, getPTOptions('headerCheckboxIcon'));
  var headerCheckboxContainerProps = mergeProps({
    className: cx('headerCheckboxContainer')
  }, getPTOptions('headerCheckboxContainer'));
  var checkedIcon = props.itemCheckboxIcon || /*#__PURE__*/React.createElement(CheckIcon, headerCheckboxIconProps);
  var itemCheckboxIcon = IconUtils.getJSXIcon(checkedIcon, _objectSpread$3({}, headerCheckboxIconProps), {
    selected: props.selected
  });
  var checkboxElement = props.showSelectAll && /*#__PURE__*/React.createElement("div", headerCheckboxContainerProps, /*#__PURE__*/React.createElement(Checkbox, {
    id: selectAllId,
    checked: props.selectAll,
    onChange: onSelectAll,
    role: "checkbox",
    "aria-checked": props.selectAll,
    icon: itemCheckboxIcon,
    pt: ptm('headerCheckbox'),
    unstyled: isUnstyled()
  }), !props.filter && /*#__PURE__*/React.createElement("label", headerSelectAllLabelProps, props.selectAllLabel));
  var iconProps = mergeProps({
    className: cx('closeIcon'),
    'aria-hidden': true
  }, getPTOptions('closeIcon'));
  var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, iconProps);
  var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread$3({}, iconProps), {
    props: props
  });
  var headerProps = mergeProps({
    className: cx('header')
  }, getPTOptions('header'));
  var closeButtonProps = mergeProps({
    type: 'button',
    className: cx('closeButton'),
    'aria-label': localeOption('close'),
    onClick: props.onClose
  }, getPTOptions('closeButton'));
  var closeElement = /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
  var element = /*#__PURE__*/React.createElement("div", headerProps, checkboxElement, filterElement, closeElement);
  if (props.template) {
    var defaultOptions = {
      className: 'p-multiselect-header',
      checkboxElement: checkboxElement,
      checked: props.selectAll,
      onChange: onSelectAll,
      filterElement: filterElement,
      closeElement: closeElement,
      closeElementClassName: 'p-multiselect-close p-link',
      closeIconClassName: 'p-multiselect-close-icon',
      onCloseClick: props.onClose,
      element: element,
      itemCheckboxIcon: itemCheckboxIcon,
      props: props
    };
    return ObjectUtils.getJSXElement(props.template, defaultOptions);
  }
  return element;
});
MultiSelectHeader.displayName = 'MultiSelectHeader';

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MultiSelectItem = /*#__PURE__*/React.memo(function (props) {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusedState = _React$useState2[0],
    setFocusedState = _React$useState2[1];
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key) {
    return ptm(key, {
      hostName: props.hostName,
      context: {
        selected: props.selected,
        disabled: props.disabled,
        focused: focusedState
      }
    });
  };
  var onClick = function onClick(event) {
    if (props.onClick) {
      props.onClick({
        originalEvent: event,
        option: props.option
      });
    }
    event.preventDefault();
    event.stopPropagation();
  };
  var onKeyDown = function onKeyDown(event) {
    if (props.onKeyDown) {
      props.onKeyDown({
        originalEvent: event,
        option: props.option
      });
    }
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
  };
  var checkboxIconProps = mergeProps({
    className: cx('checkboxIcon')
  }, getPTOptions('checkboxIcon'));
  var icon = props.checkboxIcon || /*#__PURE__*/React.createElement(CheckIcon, checkboxIconProps);
  var checkboxIcon = props.selected ? IconUtils.getJSXIcon(icon, _objectSpread$2({}, checkboxIconProps), {
    selected: props.selected
  }) : null;
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props.option) : props.label;
  var tabIndex = props.disabled ? null : props.tabIndex || 0;
  var checkboxContainerProps = mergeProps({
    className: cx('checkboxContainer')
  }, getPTOptions('checkboxContainer'));
  var checkboxProps = mergeProps({
    className: cx('checkbox', {
      itemProps: props
    }),
    'data-p-highlight': props.selected
  }, getPTOptions('checkbox'));
  var itemProps = mergeProps({
    className: classNames(props.className, props.option.className, cx('item', {
      itemProps: props
    })),
    style: props.style,
    onClick: onClick,
    tabIndex: tabIndex,
    onKeyDown: onKeyDown,
    onFocus: onFocus,
    onBlur: onBlur,
    role: 'option',
    'aria-selected': props.selected,
    'data-p-highlight': props.selected,
    'data-p-disabled': props.disabled
  }, getPTOptions('item'));
  return /*#__PURE__*/React.createElement("li", itemProps, /*#__PURE__*/React.createElement("div", checkboxContainerProps, /*#__PURE__*/React.createElement("div", checkboxProps, checkboxIcon)), /*#__PURE__*/React.createElement("span", null, content), /*#__PURE__*/React.createElement(Ripple, null));
});
MultiSelectItem.displayName = 'MultiSelectItem';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var MultiSelectPanel = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var virtualScrollerRef = React.useRef(null);
  var filterInputRef = React.useRef(null);
  var context = React.useContext(PrimeReactContext);
  var ptm = props.ptm,
    cx = props.cx,
    sx = props.sx,
    isUnstyled = props.isUnstyled;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var onEnter = function onEnter() {
    props.onEnter(function () {
      if (virtualScrollerRef.current) {
        var selectedIndex = props.getSelectedOptionIndex();
        if (selectedIndex !== -1) {
          setTimeout(function () {
            return virtualScrollerRef.current.scrollToIndex(selectedIndex);
          }, 0);
        }
      }
    });
  };
  var onEntered = function onEntered() {
    props.onEntered(function () {
      if (props.filter && props.filterInputAutoFocus && filterInputRef.current) {
        DomHandler.focus(filterInputRef.current, false);
      }
    });
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    if (virtualScrollerRef.current) {
      virtualScrollerRef.current.scrollToIndex(0);
    }
    props.onFilterInputChange && props.onFilterInputChange(event);
  };
  var isEmptyFilter = function isEmptyFilter() {
    return !(props.visibleOptions && props.visibleOptions.length) && props.hasFilter;
  };
  var createHeader = function createHeader() {
    return /*#__PURE__*/React.createElement(MultiSelectHeader, {
      hostName: props.hostName,
      id: props.id,
      filter: props.filter,
      filterRef: filterInputRef,
      filterValue: props.filterValue,
      filterTemplate: props.filterTemplate,
      onFilter: onFilterInputChange,
      filterPlaceholder: props.filterPlaceholder,
      onClose: props.onCloseClick,
      showSelectAll: props.showSelectAll,
      selectAll: props.isAllSelected(),
      selectAllLabel: props.selectAllLabel,
      onSelectAll: props.onSelectAll,
      template: props.panelHeaderTemplate,
      resetFilter: props.resetFilter,
      closeIcon: props.closeIcon,
      filterIcon: props.filterIcon,
      itemCheckboxIcon: props.itemCheckboxIcon,
      ptm: ptm,
      cx: cx,
      isUnstyled: isUnstyled,
      metaData: props.metaData
    });
  };
  var createFooter = function createFooter() {
    if (props.panelFooterTemplate) {
      var content = ObjectUtils.getJSXElement(props.panelFooterTemplate, props, props.onOverlayHide);
      return /*#__PURE__*/React.createElement("div", {
        className: "p-multiselect-footer"
      }, content);
    }
    return null;
  };
  var createGroupChildren = function createGroupChildren(optionGroup, style) {
    var groupChildren = props.getOptionGroupChildren(optionGroup);
    return groupChildren.map(function (option, j) {
      var optionLabel = props.getOptionLabel(option);
      var optionKey = j + '_' + props.getOptionRenderKey(option);
      var disabled = props.isOptionDisabled(option);
      var tabIndex = disabled ? null : props.tabIndex || 0;
      var selected = props.isSelected(option);
      return /*#__PURE__*/React.createElement(MultiSelectItem, {
        hostName: props.hostName,
        key: optionKey,
        label: optionLabel,
        option: option,
        style: style,
        template: props.itemTemplate,
        selected: selected,
        onClick: props.onOptionSelect,
        onKeyDown: props.onOptionKeyDown,
        tabIndex: tabIndex,
        disabled: disabled,
        className: props.itemClassName,
        checkboxIcon: props.checkboxIcon,
        ptm: ptm,
        cx: cx
      });
    });
  };
  var createEmptyFilter = function createEmptyFilter() {
    var emptyFilterMessage = ObjectUtils.getJSXElement(props.emptyFilterMessage, props) || localeOption('emptyFilterMessage');
    var emptyMessageProps = mergeProps({
      className: cx('emptyMessage')
    }, getPTOptions('emptyMessage'));
    return /*#__PURE__*/React.createElement("li", emptyMessageProps, emptyFilterMessage);
  };
  var createEmptyContent = function createEmptyContent() {
    var emptyMessage = ObjectUtils.getJSXElement(props.emptyMessage, props) || localeOption('emptyMessage');
    var emptyMessageProps = mergeProps({
      className: cx('emptyMessage')
    }, getPTOptions('emptyMessage'));
    return /*#__PURE__*/React.createElement("li", emptyMessageProps, emptyMessage);
  };
  var createItem = function createItem(option, index) {
    var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var style = {
      height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
    };
    if (props.optionGroupLabel) {
      var groupContent = props.optionGroupTemplate ? ObjectUtils.getJSXElement(props.optionGroupTemplate, option, index) : props.getOptionGroupLabel(option);
      var groupChildrenContent = createGroupChildren(option, style);
      var key = index + '_' + props.getOptionGroupRenderKey(option);
      var itemGroupProps = mergeProps({
        className: cx('itemGroup'),
        style: sx('itemGroup', {
          scrollerOptions: scrollerOptions
        })
      }, getPTOptions('itemGroup'));
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: key
      }, /*#__PURE__*/React.createElement("li", itemGroupProps, groupContent), groupChildrenContent);
    } else {
      var optionLabel = props.getOptionLabel(option);
      var optionKey = index + '_' + props.getOptionRenderKey(option);
      var disabled = props.isOptionDisabled(option);
      var tabIndex = disabled ? null : props.tabIndex || 0;
      var selected = props.isSelected(option);
      return /*#__PURE__*/React.createElement(MultiSelectItem, {
        hostName: props.hostName,
        key: optionKey,
        label: optionLabel,
        option: option,
        style: style,
        template: props.itemTemplate,
        selected: selected,
        onClick: props.onOptionSelect,
        onKeyDown: props.onOptionKeyDown,
        tabIndex: tabIndex,
        disabled: disabled,
        className: props.itemClassName,
        checkboxIcon: props.checkboxIcon,
        ptm: ptm,
        cx: cx
      });
    }
  };
  var createItems = function createItems() {
    if (ObjectUtils.isNotEmpty(props.visibleOptions)) {
      return props.visibleOptions.map(createItem);
    } else {
      return props.hasFilter ? createEmptyFilter() : createEmptyContent();
    }
  };
  var createContent = function createContent() {
    if (props.virtualScrollerOptions) {
      var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
        style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
          height: props.scrollHeight
        }),
        className: classNames('p-multiselect-items-wrapper', props.virtualScrollerOptions.className),
        items: props.visibleOptions,
        autoSize: true,
        onLazyLoad: function onLazyLoad(event) {
          return props.virtualScrollerOptions.onLazyLoad(_objectSpread$1(_objectSpread$1({}, event), {
            filter: props.filterValue
          }));
        },
        itemTemplate: function itemTemplate(item, options) {
          return item && createItem(item, options.index, options);
        },
        contentTemplate: function contentTemplate(options) {
          var content = isEmptyFilter() ? createEmptyFilter() : options.children;
          var listProps = mergeProps({
            ref: options.contentRef,
            style: options.style,
            className: classNames(options.className, cx('list', {
              virtualScrollerProps: props.virtualScrollerOptions
            })),
            role: 'listbox',
            'aria-multiselectable': true
          }, getPTOptions('list'));
          return /*#__PURE__*/React.createElement("ul", listProps, content);
        }
      });
      return /*#__PURE__*/React.createElement(VirtualScroller, _extends({
        ref: virtualScrollerRef
      }, virtualScrollerProps, {
        pt: ptm('virtualScroller'),
        __parentMetadata: {
          parent: props.metaData
        }
      }));
    } else {
      var items = createItems();
      var wrapperProps = mergeProps({
        className: cx('wrapper'),
        style: {
          maxHeight: props.scrollHeight
        }
      }, getPTOptions('wrapper'));
      var listProps = mergeProps({
        className: cx('list'),
        role: 'listbox',
        'aria-multiselectable': true
      }, getPTOptions('list'));
      return /*#__PURE__*/React.createElement("div", wrapperProps, /*#__PURE__*/React.createElement("ul", listProps, items));
    }
  };
  var createElement = function createElement() {
    var allowOptionSelect = props.allowOptionSelect();
    var header = createHeader();
    var content = createContent();
    var footer = createFooter();
    var panelProps = mergeProps({
      className: classNames(props.panelClassName, cx('panel', {
        panelProps: props,
        context: context,
        allowOptionSelect: allowOptionSelect
      })),
      style: props.panelStyle,
      onClick: props.onClick
    }, getPTOptions('panel'));
    if (props.inline) {
      return /*#__PURE__*/React.createElement("div", _extends({
        ref: ref
      }, panelProps), content, footer);
    }
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": props["in"],
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onEnter,
      onEntered: onEntered,
      onExit: props.onExit,
      onExited: props.onExited
    }, getPTOptions('transition'));
    return /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: ref
    }, transitionProps), /*#__PURE__*/React.createElement("div", _extends({
      ref: ref
    }, panelProps), header, content, footer));
  };
  var element = createElement();
  if (props.inline) return element;
  return /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: props.appendTo
  });
}));
MultiSelectPanel.displayName = 'MultiSelectPanel';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var MultiSelect = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = MultiSelectBase.getProps(inProps, context);
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filterState = _React$useState2[0],
    setFilterState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    focusedState = _React$useState4[0],
    setFocusedState = _React$useState4[1];
  var _React$useState5 = React.useState(props.inline),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    overlayVisibleState = _React$useState6[0],
    setOverlayVisibleState = _React$useState6[1];
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var labelRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var hasFilter = filterState && filterState.trim().length > 0;
  var empty = ObjectUtils.isEmpty(props.value);
  var equalityKey = props.optionValue ? null : props.dataKey;
  var metaData = {
    props: props,
    state: {
      filterState: filterState,
      focused: focusedState,
      overlayVisible: overlayVisibleState
    }
  };
  var _MultiSelectBase$setM = MultiSelectBase.setMetaData(metaData),
    ptm = _MultiSelectBase$setM.ptm,
    cx = _MultiSelectBase$setM.cx,
    sx = _MultiSelectBase$setM.sx,
    isUnstyled = _MultiSelectBase$setM.isUnstyled;
  useHandleStyle(MultiSelectBase.css.styles, isUnstyled, {
    name: 'multiselect'
  });
  var _useOverlayListener = useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var type = _ref.type,
          valid = _ref.valid;
        if (valid) {
          if (type === 'outside') {
            !isClearClicked(event) && !isSelectAllClicked(event) && hide();
          } else {
            hide();
          }
        }
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var onPanelClick = function onPanelClick(event) {
    OverlayService.emit('overlay-click', {
      originalEvent: event,
      target: elementRef.current
    });
  };
  var allowOptionSelect = function allowOptionSelect() {
    return !props.selectionLimit || !props.value || props.value && props.value.length < props.selectionLimit;
  };
  var onOptionSelect = function onOptionSelect(event) {
    var originalEvent = event.originalEvent,
      option = event.option;
    if (props.disabled || isOptionDisabled(option)) {
      return;
    }
    var optionValue = getOptionValue(option);
    var isUsed = isOptionValueUsed(option);
    var selected = isSelected(option);
    var allowSelect = allowOptionSelect();
    if (selected) {
      updateModel(originalEvent, props.value.filter(function (val) {
        return !ObjectUtils.equals(isUsed ? val : getOptionValue(val), optionValue, equalityKey);
      }), option);
    } else if (allowSelect) {
      updateModel(originalEvent, [].concat(_toConsumableArray(props.value || []), [optionValue]), option);
    }
  };
  var onOptionKeyDown = function onOptionKeyDown(event) {
    var originalEvent = event.originalEvent;
    var listItem = originalEvent.currentTarget;
    switch (originalEvent.which) {
      //down
      case 40:
        var nextItem = findNextItem(listItem);
        nextItem && nextItem.focus();
        originalEvent.preventDefault();
        break;

      //up
      case 38:
        var prevItem = findPrevItem(listItem);
        prevItem && prevItem.focus();
        originalEvent.preventDefault();
        break;

      //enter and space
      case 13:
      case 32:
        onOptionSelect(event);
        originalEvent.preventDefault();
        break;

      //escape
      case 27:
        hide();
        DomHandler.focus(inputRef.current);
        break;
    }
  };
  var findNextItem = function findNextItem(item) {
    var nextItem = item.nextElementSibling;
    return nextItem ? DomHandler.getAttribute(nextItem, 'data-p-disabled') === true || DomHandler.getAttribute(nextItem, 'data-pc-section') === 'itemgroup' ? findNextItem(nextItem) : nextItem : null;
  };
  var findPrevItem = function findPrevItem(item) {
    var prevItem = item.previousElementSibling;
    return prevItem ? DomHandler.getAttribute(prevItem, 'data-p-disabled') === true || DomHandler.getAttribute(prevItem, 'data-pc-section') === 'itemgroup' ? findPrevItem(prevItem) : prevItem : null;
  };
  var onClick = function onClick(event) {
    if (!props.inline && !props.disabled && !isPanelClicked(event) && DomHandler.getAttribute(event.target, 'data-pc-section') !== 'removetokenicon' && !isClearClicked(event)) {
      overlayVisibleState ? hide() : show();
      DomHandler.focus(inputRef.current);
      event.preventDefault();
    }
  };
  var onKeyDown = function onKeyDown(event) {
    switch (event.which) {
      //down
      case 40:
        if (props.inline) break;
        if (!overlayVisibleState && event.altKey) {
          show();
          event.preventDefault();
        }
        break;

      //space
      case 32:
        if (props.inline) break;
        overlayVisibleState ? hide() : show();
        event.preventDefault();
        break;

      //escape
      case 27:
        if (props.inline) break;
        hide();
        break;

      //tab
      case 9:
        if (overlayVisibleState) {
          var firstFocusableElement = DomHandler.getFirstFocusableElement(overlayRef.current);
          if (firstFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
          }
        }
        break;
    }
  };
  var onSelectAll = function onSelectAll(event) {
    if (props.onSelectAll) {
      props.onSelectAll(event);
    } else {
      var value = null;
      if (event.checked) {
        value = [];
        if (visibleOptions) {
          var selectedOptions = visibleOptions.filter(function (option) {
            return isOptionDisabled(option) && isSelected(option);
          });
          value = selectedOptions.map(function (option) {
            return getOptionValue(option);
          });
        }
      } else if (visibleOptions) {
        var options = visibleOptions.filter(function (option) {
          return !isOptionDisabled(option) || isSelected(option);
        });
        if (props.optionGroupLabel) {
          value = [];
          options.forEach(function (optionGroup) {
            return value = [].concat(_toConsumableArray(value), _toConsumableArray(getOptionGroupChildren(optionGroup).filter(function (option) {
              return !isOptionDisabled(option);
            }).map(function (option) {
              return getOptionValue(option);
            })));
          });
        } else {
          value = options.map(function (option) {
            return getOptionValue(option);
          });
        }
      }
      updateModel(event.originalEvent, value, value);
    }
  };
  var updateModel = function updateModel(event, value, selectedOption) {
    if (props.onChange) {
      props.onChange({
        originalEvent: event,
        value: value,
        selectedOption: selectedOption,
        stopPropagation: function stopPropagation() {
          event.stopPropagation();
        },
        preventDefault: function preventDefault() {
          event.preventDefault();
        },
        target: {
          name: props.name,
          id: props.id,
          value: value
        }
      });
    }
  };
  var onFilterInputChange = function onFilterInputChange(event) {
    var filter = event.query;
    setFilterState(filter);
    if (props.onFilter) {
      props.onFilter({
        originalEvent: event,
        filter: filter
      });
    }
  };
  var resetFilter = function resetFilter() {
    setFilterState('');
    props.onFilter && props.onFilter({
      filter: ''
    });
  };
  var scrollInView = function scrollInView() {
    var highlightItem = DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
    if (highlightItem && highlightItem.scrollIntoView) {
      highlightItem.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  };
  var show = function show() {
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var onOverlayEnter = function onOverlayEnter(callback) {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['overlay'] || PrimeReact.zIndex['overlay']);
    DomHandler.addStyles(overlayRef.current, {
      position: 'absolute',
      top: '0',
      left: '0'
    });
    alignOverlay();
    scrollInView();
    callback && callback();
  };
  var onOverlayEntered = function onOverlayEntered(callback) {
    callback && callback();
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    if (props.filter && props.resetFilterOnHide) {
      resetFilter();
    }
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var alignOverlay = function alignOverlay() {
    DomHandler.alignOverlay(overlayRef.current, labelRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact.appendTo);
  };
  var isClearClicked = function isClearClicked(event) {
    return DomHandler.getAttribute(event.target, 'data-pc-section') === 'clearicon';
  };
  var isSelectAllClicked = function isSelectAllClicked(event) {
    return DomHandler.getAttribute(event.target, 'data-pc-section') === 'headercheckboxcontainer';
  };
  var isPanelClicked = function isPanelClicked(event) {
    return overlayRef.current && overlayRef.current.contains(event.target);
  };
  var onCloseClick = function onCloseClick(event) {
    hide();
    DomHandler.focus(inputRef.current);
    event.preventDefault();
    event.stopPropagation();
  };
  var getSelectedOptionIndex = function getSelectedOptionIndex() {
    if (props.value != null && props.options) {
      if (props.optionGroupLabel) {
        var groupIndex = 0;
        var optionIndex = props.options.findIndex(function (optionGroup, i) {
          return (groupIndex = i) && findOptionIndexInList(props.value, getOptionGroupChildren(optionGroup)) !== -1;
        });
        return optionIndex !== -1 ? {
          group: groupIndex,
          option: optionIndex
        } : -1;
      } else {
        return findOptionIndexInList(props.value, props.options);
      }
    }
    return -1;
  };
  var findOptionIndexInList = function findOptionIndexInList(value, list) {
    return list.findIndex(function (item) {
      return value.some(function (val) {
        return ObjectUtils.equals(val, getOptionValue(item), equalityKey);
      });
    });
  };
  var isSelected = function isSelected(option) {
    if (props.value) {
      var optionValue = getOptionValue(option);
      var isUsed = isOptionValueUsed(option);
      return props.value.some(function (val) {
        return ObjectUtils.equals(isUsed ? val : getOptionValue(val), optionValue, equalityKey);
      });
    }
    return false;
  };
  var getLabelByValue = function getLabelByValue(val) {
    var option;
    if (props.options) {
      if (props.optionGroupLabel) {
        var _iterator = _createForOfIteratorHelper(props.options),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var optionGroup = _step.value;
            option = findOptionByValue(val, getOptionGroupChildren(optionGroup));
            if (option) {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        option = findOptionByValue(val, props.options);
        if (ObjectUtils.isEmpty(option)) {
          option = findOptionByValue(val, props.value);
        }
      }
    }
    return option ? getOptionLabel(option) : null;
  };
  var findOptionByValue = function findOptionByValue(val, list) {
    return list.find(function (option) {
      return ObjectUtils.equals(getOptionValue(option), val, equalityKey);
    });
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
    props.onBlur && props.onBlur(event);
  };
  var isAllSelected = function isAllSelected() {
    if (props.onSelectAll) {
      return props.selectAll;
    } else {
      if (ObjectUtils.isEmpty(visibleOptions)) {
        return false;
      }
      var options = visibleOptions.filter(function (option) {
        return !isOptionDisabled(option);
      });
      if (props.optionGroupLabel) {
        var areAllSelected = true;
        var _iterator2 = _createForOfIteratorHelper(options),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var optionGroup = _step2.value;
            var visibleOptionsGroupChildren = getOptionGroupChildren(optionGroup).filter(function (option) {
              return !isOptionDisabled(option);
            });
            if (visibleOptionsGroupChildren.some(function (option) {
              return !isSelected(option);
            }) === true) {
              areAllSelected = false;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return areAllSelected;
      } else {
        return !options.some(function (option) {
          return !isSelected(option);
        });
      }
    }
  };
  var getOptionLabel = function getOptionLabel(option) {
    return props.optionLabel ? ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
  };
  var getOptionValue = function getOptionValue(option) {
    if (props.useOptionAsValue) {
      return option;
    }
    if (props.optionValue) {
      var data = ObjectUtils.resolveFieldData(option, props.optionValue);
      return data !== null ? data : option;
    }
    return option && option['value'] !== undefined ? option['value'] : option;
  };
  var getOptionRenderKey = function getOptionRenderKey(option) {
    return props.dataKey ? ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
  };
  var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
  };
  var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
    return ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    if (props.optionDisabled) {
      return ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : ObjectUtils.resolveFieldData(option, props.optionDisabled);
    }
    return option && option['disabled'] !== undefined ? option['disabled'] : false;
  };
  var isOptionValueUsed = function isOptionValueUsed(option) {
    return !props.useOptionAsValue && props.optionValue || option && option['value'] !== undefined;
  };
  var removeChip = function removeChip(event, item) {
    var value = props.value.filter(function (val) {
      return !ObjectUtils.equals(val, item, equalityKey);
    });
    if (props.onRemove) {
      props.onRemove({
        originalEvent: event,
        value: value
      });
    }
    updateModel(event, value, item);
  };
  var getSelectedItemsLabel = function getSelectedItemsLabel() {
    var pattern = /{(.*?)}/;
    if (pattern.test(props.selectedItemsLabel)) {
      return props.selectedItemsLabel.replace(props.selectedItemsLabel.match(pattern)[0], props.value.length + '');
    }
    return props.selectedItemsLabel;
  };
  var getLabel = function getLabel() {
    var label;
    if (!empty && !props.fixedPlaceholder) {
      if (ObjectUtils.isNotEmpty(props.maxSelectedLabels) && props.value.length > props.maxSelectedLabels) {
        return getSelectedItemsLabel();
      } else {
        if (ObjectUtils.isArray(props.value)) {
          return props.value.reduce(function (acc, value, index) {
            return acc + (index !== 0 ? ', ' : '') + getLabelByValue(value);
          }, '');
        } else {
          return '';
        }
      }
    }
    return label;
  };
  var getLabelContent = function getLabelContent() {
    if (props.selectedItemTemplate) {
      if (!empty) {
        if (ObjectUtils.isNotEmpty(props.maxSelectedLabels) && props.value.length > props.maxSelectedLabels) {
          return getSelectedItemsLabel();
        } else {
          return props.value.map(function (val, index) {
            var item = ObjectUtils.getJSXElement(props.selectedItemTemplate, val);
            return /*#__PURE__*/React.createElement(React.Fragment, {
              key: index
            }, item);
          });
        }
      } else {
        return ObjectUtils.getJSXElement(props.selectedItemTemplate);
      }
    } else {
      if (props.display === 'chip' && !empty) {
        var value = props.value.slice(0, props.maxSelectedLabels || props.value.length);
        return value.map(function (val, i) {
          var label = getLabelByValue(val);
          var iconProps = mergeProps({
            key: i,
            className: cx('removeTokenIcon'),
            onClick: function onClick(e) {
              return removeChip(e, val);
            }
          }, ptm('removeTokenIcon'));
          var icon = !props.disabled && (props.removeIcon ? IconUtils.getJSXIcon(props.removeIcon, _objectSpread({}, iconProps), {
            props: props
          }) : /*#__PURE__*/React.createElement(TimesCircleIcon, iconProps));
          var tokenProps = mergeProps({
            className: cx('token')
          }, ptm('token'));
          var tokenLabelProps = mergeProps({
            key: label + i,
            className: cx('tokenLabel')
          }, ptm('tokenLabel'));
          return /*#__PURE__*/React.createElement("div", _extends({}, tokenProps, {
            key: label
          }), /*#__PURE__*/React.createElement("span", tokenLabelProps, label), icon);
        });
      }
      return getLabel();
    }
  };
  var getVisibleOptions = function getVisibleOptions() {
    if (hasFilter) {
      var filterValue = filterState.trim().toLocaleLowerCase(props.filterLocale);
      var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];
      if (props.optionGroupLabel) {
        var filteredGroups = [];
        var _iterator3 = _createForOfIteratorHelper(props.options),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var optgroup = _step3.value;
            var filteredSubOptions = FilterService.filter(getOptionGroupChildren(optgroup), searchFields, filterValue, props.filterMatchMode, props.filterLocale);
            if (filteredSubOptions && filteredSubOptions.length) {
              filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), _defineProperty({}, props.optionGroupChildren, filteredSubOptions)));
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return filteredGroups;
      } else {
        return FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
      }
    } else {
      return props.options;
    }
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  useMountEffect(function () {
    alignOverlay();
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  React.useEffect(function () {
    setTimeout(function () {
      props.overlayVisible ? show() : hide();
    }, 100);
  }, [props.overlayVisible]);
  useUpdateEffect(function () {
    if (overlayVisibleState && filterState && hasFilter) {
      alignOverlay();
    }
  }, [overlayVisibleState, filterState, hasFilter]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var createClearIcon = function createClearIcon() {
    var clearIconProps = mergeProps({
      className: cx('clearIcon'),
      onClick: function onClick(e) {
        return updateModel(e, [], []);
      }
    }, ptm('clearIcon'));
    var icon = props.clearIcon || /*#__PURE__*/React.createElement(TimesIcon, clearIconProps);
    var clearIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, clearIconProps), {
      props: props
    });
    if (!empty && props.showClear && !props.disabled) {
      return clearIcon;
    }
    return null;
  };
  var createLabel = function createLabel() {
    var content = getLabelContent();
    var labelContainerProps = mergeProps({
      ref: labelRef,
      className: cx('labelContainer')
    }, ptm('labelContainer'));
    var labelProps = mergeProps({
      className: cx('label', {
        empty: empty
      })
    }, ptm('label'));
    return /*#__PURE__*/React.createElement("div", labelContainerProps, /*#__PURE__*/React.createElement("div", labelProps, content || props.placeholder || 'empty'));
  };
  var visibleOptions = getVisibleOptions();
  var hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = MultiSelectBase.getOtherProps(props);
  var ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
  var triggerIconProps = mergeProps({
    className: cx('triggerIcon')
  }, ptm('triggerIcon'));
  var triggerProps = mergeProps({
    className: cx('trigger')
  }, ptm('trigger'));
  var dropdownIcon = /*#__PURE__*/React.createElement("div", triggerProps, props.dropdownIcon ? IconUtils.getJSXIcon(props.dropdownIcon, _objectSpread({}, triggerIconProps), {
    props: props
  }) : /*#__PURE__*/React.createElement(ChevronDownIcon, triggerIconProps));
  var label = !props.inline && createLabel();
  var clearIcon = !props.inline && createClearIcon();
  var rootProps = mergeProps(_objectSpread(_objectSpread({
    ref: elementRef,
    id: props.id,
    style: _objectSpread(_objectSpread({}, props.style), sx('root')),
    className: classNames(props.className, cx('root', {
      focusedState: focusedState,
      overlayVisibleState: overlayVisibleState
    }))
  }, otherProps), {}, {
    onClick: onClick
  }), MultiSelectBase.getOtherProps(props), ptm('root'));
  var hiddenInputWrapperProps = mergeProps({
    className: 'p-hidden-accessible'
  }, ptm('hiddenInputWrapper'));
  var inputProps = mergeProps(_objectSpread({
    ref: inputRef,
    id: props.inputId,
    name: props.name,
    type: 'text',
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    role: 'listbox',
    'aria-expanded': overlayVisibleState,
    disabled: props.disabled,
    tabIndex: props.tabIndex
  }, ariaProps), ptm('input'));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement("div", hiddenInputWrapperProps, /*#__PURE__*/React.createElement("input", _extends({}, inputProps, {
    readOnly: true
  }))), !props.inline && /*#__PURE__*/React.createElement(React.Fragment, null, label, clearIcon, dropdownIcon), /*#__PURE__*/React.createElement(MultiSelectPanel, _extends({
    hostName: "MultiSelect",
    ref: overlayRef,
    visibleOptions: visibleOptions
  }, props, {
    onClick: onPanelClick,
    onOverlayHide: hide,
    filterValue: filterState,
    hasFilter: hasFilter,
    onFilterInputChange: onFilterInputChange,
    resetFilter: resetFilter,
    onCloseClick: onCloseClick,
    onSelectAll: onSelectAll,
    getOptionLabel: getOptionLabel,
    getOptionRenderKey: getOptionRenderKey,
    isOptionDisabled: isOptionDisabled,
    getOptionGroupChildren: getOptionGroupChildren,
    getOptionGroupLabel: getOptionGroupLabel,
    getOptionGroupRenderKey: getOptionGroupRenderKey,
    isSelected: isSelected,
    getSelectedOptionIndex: getSelectedOptionIndex,
    isAllSelected: isAllSelected,
    onOptionSelect: onOptionSelect,
    allowOptionSelect: allowOptionSelect,
    onOptionKeyDown: onOptionKeyDown,
    "in": overlayVisibleState,
    onEnter: onOverlayEnter,
    onEntered: onOverlayEntered,
    onExit: onOverlayExit,
    onExited: onOverlayExited,
    ptm: ptm,
    cx: cx,
    sx: sx,
    isUnstyled: isUnstyled,
    metaData: metaData
  }))), hasTooltip && /*#__PURE__*/React.createElement(Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions, {
    pt: ptm('tooltip')
  })));
}));
MultiSelect.displayName = 'MultiSelect';

export { MultiSelect };
