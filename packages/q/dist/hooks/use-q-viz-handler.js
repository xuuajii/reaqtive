"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

/**
 * @typedef {object} qVizHandler - the object returned by useQLayoutReducer
 * @property {boolean} qVizLoading - if true the the handler is still waiting for response from the qlik server
 * @property {object} qViz - the interface to interact with the visualization (e.g. to export it in excel, to resize it, etc.)
 */

/**
 * @typedef {function} hook
 * @type {function}
 */

/**
  *@function useQVizHandler
  *@description a hook to retrieve a variable already available in the qDoc
  *@kind hook
  *@param {object} qApp - the qApp object provided by the qApp context
  *@param {string} [id=] - if id is defined chartProps are not, the useQVizHandler will ask for an already existing viz to the qApp
  *@param {object} [chartProps=] -  if the object is defined the useQVizHandler will create the visualization on the fly not considering an eventually provided id
  *@return {qVizHandler} - handler to interact with the visualization retrieved from the qApp
*/
const useQVizHandler = (qApp, id, chartProps) => {
  const qVizInitialState = {
    qVizLoading: true,
    qViz: null
  };

  const _useState = (0, _react.useState)(qVizInitialState),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qVizHandler = _useState2[0],
        setQVizHandler = _useState2[1];

  const _useState3 = (0, _react.useState)(null),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        vizId = _useState4[0],
        setVizId = _useState4[1];

  (0, _react.useEffect)(() => {
    if (chartProps && vizId === null) {
      //qVizHandler.qVizLoading===true && qVizHandler.qViz===null && qApp!==null && qApp !== undefined){
      qApp && qApp.visualization.create(chartProps.chartType, chartProps.chartColumns, chartProps.rest).then(qViz => {
        setVizId(qViz.id);
      }).catch(qErr => console.log('error setting chart props', qErr));
    }

    if (id && !chartProps) {
      setVizId(id);
    }

    if (vizId !== null && qVizHandler.qVizLoading === true) {
      qApp && qApp.visualization.get(vizId).then(qViz => setQVizHandler({
        qVizLoading: false,
        qViz: qViz
      })).catch(qErr => console.log('error retrieving qViz', vizId));
    }
  }, [qApp, chartProps, vizId, id, qVizHandler.qVizLoading]);
  (0, _react.useEffect)(() => {
    if (qVizHandler.qViz) {
      qVizHandler.qViz.show(vizId);
    }

    return () => {
      if (qVizHandler.qViz !== null) {
        qApp && qApp.destroySessionObject(vizId);
      }
    };
  }, [qVizHandler, vizId]);
  return (0, _objectSpread2.default)({}, qVizHandler, {
    vizId
  });
};

var _default = useQVizHandler;
exports.default = _default;