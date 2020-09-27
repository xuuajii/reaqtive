"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useScrollContainer = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/utils/scrollable-container.js";

const useScrollContainer = (wrapperRef, containerRef, scrollRef, options) => {
  const system = (0, _react.useContext)(_index.System);
  const wrapperEl = wrapperRef;
  const containerEl = containerRef.current;
  const scrollEl = scrollRef.current;
  const rect = (0, _index.useResize)(wrapperEl.current);
  const containerWidth = rect && rect.width;

  const _useState = (0, _react.useState)({}),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        scrollState = _useState2[0],
        setScrollState = _useState2[1];

  const updateScrollState = (0, _react.useCallback)(() => {
    // const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, offsetWidth } = scrollEl.current||{};
    const scrollSize = scrollEl && scrollEl.offsetWidth;
    const containerScrollPosition = containerEl && containerEl.scrollLeft;
    const containerSize = containerWidth || containerEl && containerEl.offsetWidth;
    const showScroll = scrollSize > containerSize;
    const showScrollLess = showScroll === true && containerScrollPosition !== 0;
    const showScrollMore = showScroll === true && containerScrollPosition < scrollSize - containerSize;
    const scrollPagesQty = scrollSize / containerSize;
    setScrollState({
      showScroll,
      showScrollLess,
      showScrollMore,
      scrollPagesQty,
      scrollDelta: containerSize,
      scrollSize,
      containerSize,
      scrollPosition: containerScrollPosition
    });
  }, [scrollEl, containerEl, system.windowWidth, containerWidth]);
  (0, _react.useEffect)(() => {
    updateScrollState();
  }, [updateScrollState]);

  const _useSpring = (0, _reactSpring.useSpring)(() => ({
    scrollPosition: 0
  })),
        _useSpring2 = (0, _slicedToArray2.default)(_useSpring, 2),
        animatedScroll = _useSpring2[0],
        setAnimatedScroll = _useSpring2[1];

  const scroll = delta => {
    if (containerEl) {
      const scrollDelta = delta; //scrollState.containerSize*(direction==='more'?1:-1)*(options.animate?1:0.25)

      const newPosition = containerEl && containerEl.scrollLeft + scrollDelta;

      if (options.animate) {
        setAnimatedScroll({
          scrollPosition: newPosition,
          reset: true,
          from: {
            scrollPosition: containerEl.scrollLeft
          },
          onFrame: props => containerEl && (containerEl.scrollLeft = props.scrollPosition)
        });
      } else {
        containerEl && (containerEl.scrollLeft = newPosition);
      }
    }
  };

  const scrollMore = () => scrollState.showScrollMore && scroll(scrollState.scrollDelta);

  const scrollLess = () => scrollState.showScrollLess && scroll(-scrollState.scrollDelta);

  const scrollTo = position => scroll(position - scrollState.scrollPosition);

  const handleScroll = e => {
    updateScrollState();
  };

  return (0, _objectSpread2.default)({}, scrollState, {
    scrollMore,
    scrollLess,
    handleScroll,
    scrollTo
  });
};

exports.useScrollContainer = useScrollContainer;

const ScrollableContainer = (props, ref) => {
  const wrapperEl = (0, _react.useRef)();
  const containerEl = props.containerEl,
        scrollableEl = props.scrollableEl,
        animate = props.animate;

  const _useScrollContainer = useScrollContainer(wrapperEl, containerEl, scrollableEl, {
    animate: animate,
    vertical: props.vertical
  }),
        showScroll = _useScrollContainer.showScroll,
        showScrollLess = _useScrollContainer.showScrollLess,
        showScrollMore = _useScrollContainer.showScrollMore,
        scrollMore = _useScrollContainer.scrollMore,
        scrollLess = _useScrollContainer.scrollLess,
        handleScroll = _useScrollContainer.handleScroll,
        scrollTo = _useScrollContainer.scrollTo;

  const inputRef = (0, _react.useRef)();
  (0, _react.useImperativeHandle)(ref, () => ({
    scrollTo: newScrollPosition => {
      scrollTo(newScrollPosition);
    }
  }));
  return _react.default.createElement("div", {
    className: "scrollable-container ".concat(props.vertical ? 'vertical' : 'horizontal', " ").concat(props.className),
    ref: wrapperEl,
    onScroll: e => handleScroll(e),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: void 0
  }, showScroll && _react.default.createElement(_index.Button, {
    className: 'btn-scroll',
    onClick: scrollLess,
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: void 0
  }, showScrollLess && _react.default.createElement(_index.Icon, {
    type: _index.chevronLeft,
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: void 0
  })), props.children, showScroll && _react.default.createElement(_index.Button, {
    className: 'btn-scroll',
    onClick: scrollMore,
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90
    },
    __self: void 0
  }, showScrollMore && _react.default.createElement(_index.Icon, {
    type: _index.chevronRight,
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: void 0
  })));
};

var _default = (0, _react.forwardRef)(ScrollableContainer);

exports.default = _default;
ScrollableContainer.propTypes = {
  vertical: _propTypes.default.bool
};
ScrollableContainer.defaultProps = {
  direction: false
};