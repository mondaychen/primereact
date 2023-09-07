this.primereact = this.primereact || {};
this.primereact.avatargroup = (function (exports, React, utils, componentbase, api) {
    'use strict';

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

    var AvatarGroupBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'AvatarGroup',
        style: null,
        className: null,
        children: undefined
      }
    });

    var AvatarGroup = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = AvatarGroupBase.getProps(inProps, context);
      var _AvatarGroupBase$setM = AvatarGroupBase.setMetaData({
          props: props
        }),
        ptm = _AvatarGroupBase$setM.ptm;
      var elementRef = React__namespace.useRef(null);
      var className = utils.classNames('p-avatar-group p-component', props.className);
      React__namespace.useImperativeHandle(ref, function () {
        return {
          props: props,
          getElement: function getElement() {
            return elementRef.current;
          }
        };
      });
      var rootProps = utils.mergeProps({
        ref: elementRef,
        style: props.style,
        className: className
      }, AvatarGroupBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, props.children);
    });
    AvatarGroup.displayName = 'AvatarGroup';

    exports.AvatarGroup = AvatarGroup;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.utils, primereact.componentbase, primereact.api);
