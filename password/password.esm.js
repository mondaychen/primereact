import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useOverlayListener, useUnmountEffect } from 'primereact/hooks';
import { EyeIcon } from 'primereact/icons/eye';
import { EyeSlashIcon } from 'primereact/icons/eyeslash';
import { InputText } from 'primereact/inputtext';
import { OverlayService } from 'primereact/overlayservice';
import { Portal } from 'primereact/portal';
import { ObjectUtils, DomHandler, ZIndexUtils, classNames, mergeProps, IconUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var PasswordBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Password',
    id: null,
    inputId: null,
    inputRef: null,
    promptLabel: null,
    weakLabel: null,
    mediumLabel: null,
    strongLabel: null,
    mediumRegex: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    strongRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
    feedback: true,
    toggleMask: false,
    appendTo: null,
    header: null,
    content: null,
    footer: null,
    showIcon: null,
    hideIcon: null,
    icon: null,
    tooltip: null,
    tooltipOptions: null,
    style: null,
    className: null,
    inputStyle: null,
    inputClassName: null,
    panelStyle: null,
    panelClassName: null,
    transitionOptions: null,
    onInput: null,
    onShow: null,
    onHide: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Password = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = PasswordBase.getProps(inProps, context);
  var promptLabel = props.promptLabel || localeOption('passwordPrompt');
  var weakLabel = props.weakLabel || localeOption('weak');
  var mediumLabel = props.mediumLabel || localeOption('medium');
  var strongLabel = props.strongLabel || localeOption('strong');
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    overlayVisibleState = _React$useState2[0],
    setOverlayVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    meterState = _React$useState4[0],
    setMeterState = _React$useState4[1];
  var _React$useState5 = React.useState(promptLabel),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    infoTextState = _React$useState6[0],
    setInfoTextState = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    focusedState = _React$useState8[0],
    setFocusedState = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    unmaskedState = _React$useState10[0],
    setUnmaskedState = _React$useState10[1];
  var elementRef = React.useRef(null);
  var overlayRef = React.useRef(null);
  var inputRef = React.useRef(props.inputRef);
  var mediumCheckRegExp = React.useRef(new RegExp(props.mediumRegex));
  var strongCheckRegExp = React.useRef(new RegExp(props.strongRegex));
  var type = unmaskedState ? 'text' : 'password';
  var _PasswordBase$setMeta = PasswordBase.setMetaData({
      props: props,
      state: {
        overlayVisible: overlayVisibleState,
        meter: meterState,
        infoText: infoTextState,
        focused: focusedState,
        unmasked: unmaskedState
      }
    }),
    ptm = _PasswordBase$setMeta.ptm;
  var _useOverlayListener = useOverlayListener({
      target: elementRef,
      overlay: overlayRef,
      listener: function listener(event, _ref) {
        var valid = _ref.valid;
        valid && hide();
      },
      when: overlayVisibleState
    }),
    _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
    bindOverlayListener = _useOverlayListener2[0],
    unbindOverlayListener = _useOverlayListener2[1];
  var currentValue = inputRef.current && inputRef.current.value;
  var isFilled = React.useMemo(function () {
    return ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue) || ObjectUtils.isNotEmpty(currentValue);
  }, [props.value, props.defaultValue, currentValue]);
  var updateLabels = function updateLabels() {
    if (meterState) {
      var label = null;
      switch (meterState.strength) {
        case 'weak':
          label = weakLabel;
          break;
        case 'medium':
          label = mediumLabel;
          break;
        case 'strong':
          label = strongLabel;
          break;
      }
      if (label && infoTextState !== label) {
        setInfoTextState(label);
      }
    } else {
      if (infoTextState !== promptLabel) {
        setInfoTextState(promptLabel);
      }
    }
  };
  var onPanelClick = function onPanelClick(event) {
    if (props.feedback) {
      OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    }
  };
  var onMaskToggle = function onMaskToggle() {
    setUnmaskedState(function (prevUnmasked) {
      return !prevUnmasked;
    });
  };
  var show = function show() {
    updateLabels();
    setOverlayVisibleState(true);
  };
  var hide = function hide() {
    setOverlayVisibleState(false);
  };
  var alignOverlay = function alignOverlay() {
    if (inputRef.current) {
      DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact.appendTo);
    }
  };
  var onOverlayEnter = function onOverlayEnter() {
    ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex['overlay'] || PrimeReact.zIndex['overlay']);
    alignOverlay();
  };
  var onOverlayEntered = function onOverlayEntered() {
    bindOverlayListener();
    props.onShow && props.onShow();
  };
  var onOverlayExit = function onOverlayExit() {
    unbindOverlayListener();
  };
  var onOverlayExited = function onOverlayExited() {
    ZIndexUtils.clear(overlayRef.current);
    props.onHide && props.onHide();
  };
  var onFocus = function onFocus(event) {
    setFocusedState(true);
    if (props.feedback) {
      show();
    }
    props.onFocus && props.onFocus(event);
  };
  var onBlur = function onBlur(event) {
    setFocusedState(false);
    if (props.feedback) {
      hide();
    }
    props.onBlur && props.onBlur(event);
  };
  var onKeyup = function onKeyup(e) {
    var keyCode = e.keyCode || e.which;
    if (props.feedback) {
      var value = e.target.value;
      var label = null;
      var meter = null;
      switch (testStrength(value)) {
        case 1:
          label = weakLabel;
          meter = {
            strength: 'weak',
            width: '33.33%'
          };
          break;
        case 2:
          label = mediumLabel;
          meter = {
            strength: 'medium',
            width: '66.66%'
          };
          break;
        case 3:
          label = strongLabel;
          meter = {
            strength: 'strong',
            width: '100%'
          };
          break;
        default:
          label = promptLabel;
          meter = null;
          break;
      }
      setMeterState(meter);
      setInfoTextState(label);
      if (!!keyCode && !overlayVisibleState) {
        show();
      }
    }
    props.onKeyUp && props.onKeyUp(e);
  };
  var onInput = function onInput(event, validatePattern) {
    if (props.onInput) {
      props.onInput(event, validatePattern);
    }
    if (!props.onChange) {
      ObjectUtils.isNotEmpty(event.target.value) ? DomHandler.addClass(elementRef.current, 'p-inputwrapper-filled') : DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  };
  var testStrength = function testStrength(str) {
    if (strongCheckRegExp.current.test(str)) return 3;else if (mediumCheckRegExp.current.test(str)) return 2;else if (str.length) return 1;
    return 0;
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
      getOverlay: function getOverlay() {
        return overlayRef.current;
      },
      getInput: function getInput() {
        return inputRef.current;
      }
    };
  });
  React.useEffect(function () {
    ObjectUtils.combinedRefs(inputRef, props.inputRef);
  }, [inputRef, props.inputRef]);
  React.useEffect(function () {
    mediumCheckRegExp.current = new RegExp(props.mediumRegex);
  }, [props.mediumRegex]);
  React.useEffect(function () {
    strongCheckRegExp.current = new RegExp(props.strongRegex);
  }, [props.strongRegex]);
  React.useEffect(function () {
    if (!isFilled && DomHandler.hasClass(elementRef.current, 'p-inputwrapper-filled')) {
      DomHandler.removeClass(elementRef.current, 'p-inputwrapper-filled');
    }
  }, [isFilled]);
  useUnmountEffect(function () {
    ZIndexUtils.clear(overlayRef.current);
  });
  var createIcon = function createIcon() {
    var icon;
    var hideIconProps = mergeProps(ptm('hideIcon'));
    var showIconProps = mergeProps(ptm('showIcon'));
    if (unmaskedState) {
      icon = props.hideIcon || /*#__PURE__*/React.createElement(EyeSlashIcon, hideIconProps);
    } else {
      icon = props.showIcon || /*#__PURE__*/React.createElement(EyeIcon, showIconProps);
    }
    var eyeIcon = IconUtils.getJSXIcon(icon, unmaskedState ? _objectSpread({}, hideIconProps) : _objectSpread({}, showIconProps), {
      props: props
    });
    if (props.toggleMask) {
      var content = /*#__PURE__*/React.createElement("i", {
        onClick: onMaskToggle
      }, " ", eyeIcon, " ");
      if (props.icon) {
        var defaultIconOptions = {
          onClick: onMaskToggle,
          className: className,
          element: content,
          props: props
        };
        content = ObjectUtils.getJSXElement(props.icon, defaultIconOptions);
      }
      return content;
    }
    return null;
  };
  var createPanel = function createPanel() {
    var panelClassName = classNames('p-password-panel p-component', props.panelClassName, {
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    });
    var _ref2 = meterState || {
        strength: '',
        width: '0%'
      },
      strength = _ref2.strength,
      width = _ref2.width;
    var header = ObjectUtils.getJSXElement(props.header, props);
    var footer = ObjectUtils.getJSXElement(props.footer, props);
    var panelProps = mergeProps({
      ref: overlayRef,
      className: panelClassName,
      style: props.panelStyle,
      onClick: onPanelClick
    }, ptm('panel'));
    var meterProps = mergeProps({
      className: 'p-password-meter'
    }, ptm('meter'));
    var meterLabelProps = mergeProps({
      className: "p-password-strength ".concat(strength),
      style: {
        width: width
      }
    }, ptm('meterLabel'));
    var infoProps = mergeProps({
      className: "p-password-info ".concat(strength)
    }, ptm('info'));
    var content = props.content ? ObjectUtils.getJSXElement(props.content, props) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", meterProps, /*#__PURE__*/React.createElement("div", meterLabelProps)), /*#__PURE__*/React.createElement("div", infoProps, infoTextState));
    var panel = /*#__PURE__*/React.createElement(CSSTransition, {
      nodeRef: overlayRef,
      classNames: "p-connected-overlay",
      "in": overlayVisibleState,
      timeout: {
        enter: 120,
        exit: 100
      },
      options: props.transitionOptions,
      unmountOnExit: true,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }, /*#__PURE__*/React.createElement("div", panelProps, header, content, footer));
    return /*#__PURE__*/React.createElement(Portal, {
      element: panel,
      appendTo: props.appendTo
    });
  };
  var className = classNames('p-password p-component p-inputwrapper', {
    'p-inputwrapper-filled': isFilled,
    'p-inputwrapper-focus': focusedState,
    'p-input-icon-right': props.toggleMask
  }, props.className);
  var inputClassName = classNames('p-password-input', props.inputClassName);
  var inputProps = PasswordBase.getOtherProps(props);
  var icon = createIcon();
  var panel = createPanel();
  var rootProps = mergeProps({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, PasswordBase.getOtherProps(props), ptm('root'));
  var inputTextProps = mergeProps(_objectSpread(_objectSpread({
    ref: inputRef,
    id: props.inputId
  }, inputProps), {}, {
    type: type,
    className: inputClassName,
    style: props.inputStyle,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyUp: onKeyup,
    onInput: onInput,
    tooltip: props.tooltip,
    tooltipOptions: props.tooltipOptions
  }), ptm('input'));
  return /*#__PURE__*/React.createElement("div", rootProps, /*#__PURE__*/React.createElement(InputText, inputTextProps), icon, panel);
}));
Password.displayName = 'Password';

export { Password };
