"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

const useListObjectRendererMap = (qLayoutHandler, qObjectHandler) => {
  const _useState = (0, _react.useState)({
    loading: true,
    error: false,
    noData: false
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        rendererProps = _useState2[0],
        set = _useState2[1];

  (0, _react.useEffect)(() => {
    const qLoading = qLayoutHandler.qLoading,
          qError = qLayoutHandler.qError,
          qLayout = qLayoutHandler.qLayout;
    const qDataPages = qLayout && qLayout.qListObject.qDataPages[0];
    set({
      loading: qLoading,
      error: qError,
      noData: !qDataPages || qDataPages && qDataPages.qMatrix.length === 0 || qDataPages === null,
      reload: qObjectHandler.reloadObject
    }); //return ()=>set(null)
  }, [qLayoutHandler, qObjectHandler.reloadObject]);
  return rendererProps;
};

var _default = useListObjectRendererMap;
exports.default = _default;