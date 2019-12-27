"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useQVizHandler = (qApp, id, chartProps) => {
  const qVizInitialState = {
    qVizLoading: true,
    qViz: null
  };

  const _useState = (0, _react.useState)(qVizInitialState),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qVizHandler = _useState2[0],
        setQVizHandler = _useState2[1];

  if (chartProps && qVizHandler.qVizLoading === true) {
    qApp && qApp.visualization.create(chartProps.chartType, chartProps.chartColumns, chartProps.rest).then(qViz => setQVizHandler({
      qVizLoading: false,
      qViz: qViz
    }));
  }

  if (id && qVizHandler.qVizLoading === true && !chartProps) {
    qApp && qApp.visualization.get(id).then(qViz => setQVizHandler({
      qVizLoading: false,
      qViz: qViz
    }));
  }

  (0, _react.useEffect)(() => {
    if (qVizHandler.qViz) {
      qVizHandler.qViz.show(id);
    }
  }, [qVizHandler, id]);
  return qVizHandler;
};

var _default = useQVizHandler;
exports.default = _default;