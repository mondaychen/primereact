'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var api = require('primereact/api');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

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

var EditorBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Editor',
    id: null,
    value: null,
    style: null,
    className: null,
    placeholder: null,
    readOnly: false,
    modules: null,
    formats: null,
    theme: 'snow',
    showHeader: true,
    headerTemplate: null,
    onTextChange: null,
    onSelectionChange: null,
    onLoad: null,
    maxLength: null,
    children: undefined
  }
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var QuillJS = function () {
  try {
    return Quill;
  } catch (_unused) {
    return null;
  }
}();
var Editor = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = EditorBase.getProps(inProps, context);
  var _EditorBase$setMetaDa = EditorBase.setMetaData({
      props: props
    }),
    ptm = _EditorBase$setMetaDa.ptm;
  var elementRef = React__namespace.useRef(null);
  var contentRef = React__namespace.useRef(null);
  var toolbarRef = React__namespace.useRef(null);
  var quill = React__namespace.useRef(null);
  var isQuillLoaded = React__namespace.useRef(false);
  hooks.useMountEffect(function () {
    if (!isQuillLoaded.current) {
      var configuration = {
        modules: _objectSpread({
          toolbar: props.showHeader ? toolbarRef.current : false
        }, props.modules),
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        theme: props.theme,
        formats: props.formats
      };
      if (QuillJS) {
        // GitHub #3097 loaded by script only
        quill.current = new Quill(contentRef.current, configuration);
        initQuill();
        if (quill.current && quill.current.getModule('toolbar')) {
          props.onLoad && props.onLoad(quill.current);
        }
      } else {
        Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('quill')); }).then(function (module) {
          if (module && utils.DomHandler.isExist(contentRef.current)) {
            if (module["default"]) {
              // webpack
              quill.current = new module["default"](contentRef.current, configuration);
            } else {
              // parceljs
              quill.current = new module(contentRef.current, configuration);
            }
            initQuill();
          }
        }).then(function () {
          if (quill.current && quill.current.getModule('toolbar')) {
            props.onLoad && props.onLoad(quill.current);
          }
        });
      }
      isQuillLoaded.current = true;
    }
  });
  var initQuill = function initQuill() {
    if (props.value) {
      quill.current.setContents(quill.current.clipboard.convert(props.value));
    }
    quill.current.on('text-change', function (delta, oldContents, source) {
      var firstChild = contentRef.current.children[0];
      var html = firstChild ? firstChild.innerHTML : null;
      var text = quill.current.getText();
      if (html === '<p><br></p>') {
        html = null;
      }

      // GitHub #2271 prevent infinite loop on clipboard paste of HTML
      if (source === 'api') {
        var htmlValue = contentRef.current.children[0];
        var editorValue = document.createElement('div');
        editorValue.innerHTML = props.value || '';

        // this is necessary because Quill rearranged style elements
        if (utils.DomHandler.isEqualElement(htmlValue, editorValue)) {
          return;
        }
      }
      if (props.maxLength) {
        var length = quill.current.getLength();
        if (length > props.maxLength) {
          quill.current.deleteText(props.maxLength, length);
        }
      }
      if (props.onTextChange) {
        props.onTextChange({
          htmlValue: html,
          textValue: text,
          delta: delta,
          source: source
        });
      }
    });
    quill.current.on('selection-change', function (range, oldRange, source) {
      if (props.onSelectionChange) {
        props.onSelectionChange({
          range: range,
          oldRange: oldRange,
          source: source
        });
      }
    });
  };
  hooks.useUpdateEffect(function () {
    if (quill.current && !quill.current.hasFocus()) {
      props.value ? quill.current.setContents(quill.current.clipboard.convert(props.value)) : quill.current.setText('');
    }
  }, [props.value]);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getQuill: function getQuill() {
        return quill.current;
      },
      getElement: function getElement() {
        return elementRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      },
      getToolbar: function getToolbar() {
        return toolbarRef.current;
      }
    };
  });
  var createToolbarHeader = function createToolbarHeader() {
    var toolbarProps = utils.mergeProps({
      ref: toolbarRef,
      className: 'p-editor-toolbar'
    }, ptm('toolbar'));
    if (props.showHeader === false) {
      return null;
    } else if (props.headerTemplate) {
      return /*#__PURE__*/React__namespace.createElement("div", toolbarProps, props.headerTemplate);
    } else {
      var getMergeProps = function getMergeProps(params, key) {
        return utils.mergeProps(params && _objectSpread({}, params), ptm(key));
      };
      var formatsProps = utils.mergeProps({
        className: 'ql-formats'
      }, ptm('formats'));
      return /*#__PURE__*/React__namespace.createElement("div", toolbarProps, /*#__PURE__*/React__namespace.createElement("span", formatsProps, /*#__PURE__*/React__namespace.createElement("select", getMergeProps({
        className: 'ql-header',
        defaultValue: '0'
      }, 'select'), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: '1'
      }, 'option'), "Heading"), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: '2'
      }, 'option'), "Subheading"), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: '0'
      }, 'option'), "Normal")), /*#__PURE__*/React__namespace.createElement("select", getMergeProps({
        className: 'ql-font'
      }, 'select'), /*#__PURE__*/React__namespace.createElement("option", getMergeProps(undefined, 'option')), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: 'serif'
      }, 'option')), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: 'monospace'
      }, 'option')))), /*#__PURE__*/React__namespace.createElement("span", formatsProps, /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-bold',
        'aria-label': 'Bold'
      }, 'button')), /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-italic',
        'aria-label': 'Italic'
      }, 'button')), /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-underline',
        'aria-label': 'Underline'
      }, 'button'))), /*#__PURE__*/React__namespace.createElement("span", formatsProps, /*#__PURE__*/React__namespace.createElement("select", getMergeProps({
        className: 'ql-color'
      }, 'select')), /*#__PURE__*/React__namespace.createElement("select", getMergeProps({
        className: 'ql-background'
      }, 'select'))), /*#__PURE__*/React__namespace.createElement("span", formatsProps, /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-list',
        value: 'ordered',
        'aria-label': 'Ordered List'
      }, 'button')), /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-list',
        value: 'bullet',
        'aria-label': 'Unordered List'
      }, 'button')), /*#__PURE__*/React__namespace.createElement("select", getMergeProps({
        className: 'ql-align'
      }, 'select'), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        defaultValue: true
      }, 'option')), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: 'center'
      }, 'option')), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: 'right'
      }, 'option')), /*#__PURE__*/React__namespace.createElement("option", getMergeProps({
        value: 'justify'
      }, 'option')))), /*#__PURE__*/React__namespace.createElement("span", formatsProps, /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-link',
        'aria-label': 'Insert Link'
      }, 'button')), /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-image',
        'aria-label': 'Insert Image'
      }, 'button')), /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-code-block',
        'aria-label': 'Insert Code Block'
      }, 'button'))), /*#__PURE__*/React__namespace.createElement("span", formatsProps, /*#__PURE__*/React__namespace.createElement("button", getMergeProps({
        type: 'button',
        className: 'ql-clean',
        'aria-label': 'Remove Styles'
      }, 'button'))));
    }
  };
  var className = utils.classNames('p-component p-editor-container', props.className);
  var header = createToolbarHeader();
  var contentProps = utils.mergeProps({
    ref: contentRef,
    className: 'p-editor-content',
    style: props.style
  }, ptm('content'));
  var content = /*#__PURE__*/React__namespace.createElement("div", contentProps);
  var rootProps = utils.mergeProps({
    id: props.id,
    ref: elementRef,
    className: className
  }, EditorBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React__namespace.createElement("div", rootProps, header, content);
}));
Editor.displayName = 'Editor';

exports.Editor = Editor;
