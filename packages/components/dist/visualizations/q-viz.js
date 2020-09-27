"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _layout = require("@reaqtive/layout");

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/visualizations/q-viz.js";

/**
 * QViz
 *
 * It is a component that allows to retrieve Qlik visualizations.
 * Qlik visualizations can be retrieved by id (if they already exists in the Qlik Sense app) or
 * they can be created on the fly providing the properties to the engine.
 * QViz also provide an imperative handle to inteact with Qlik visualizazion.
 * To access the handle you have to provide a handle to the QViz component
 *
 */
const QViz = (0, _react.forwardRef)((props, ref) => {
  const qAppHandler = (0, _react.useContext)(_q.QApp);
  const system = (0, _react.useContext)(_layout.System);
  const qVizWrapperEl = (0, _react.useRef)();
  const qVizHandler = (0, _q.useQVizHandler)(qAppHandler.qApp, props.id, props.chartProps);
  const qVizRef = (0, _react.useRef)(qVizHandler.qViz);
  (0, _react.useEffect)(() => {
    if (qVizHandler.qVizLoading === false && props.showTitle === false && !(props.chartProps && props.chartProps.rest.showTitles === true)) {
      qVizHandler.qViz.setOptions({
        showTitles: false
      });
    }

    qVizRef.current = qVizHandler.qViz;
  }, [qVizHandler.qViz]);
  (0, _react.useEffect)(() => {
    //console.log(1)
    setTimeout(() => resize(), 300);
  }, [system]);

  const resize = () => {
    qVizRef.current && qVizRef.current.resize();
  };

  const exportExcel = () => {
    qVizRef && qVizRef.current.exportData({
      format: 'OOXML',
      state: 'A'
    }).then(function (link) {
      window.open(link);
    });
  };

  const exportImg = () => {
    const settings = {
      format: 'png',
      height: qVizWrapperEl.current.offsetHeight,
      width: qVizWrapperEl.current.offsetWidth
    };
    qVizRef && qVizRef.current.exportImg(settings).then(function (link) {
      window.open(link);
    });
  };

  const exportPdf = () => {
    const settings = {
      documentSize: 'a4',
      aspectRatio: 2,
      orientation: "landscape"
    };
    qVizRef && qVizRef.current.exportPdf(settings).then(function (link) {
      window.open(link);
    });
  };

  (0, _react.useImperativeHandle)(ref, () => ({
    exportExcel: () => {
      exportExcel();
    },
    exportImg: () => {
      exportImg();
    },
    exportPdf: () => {
      exportPdf();
    },
    getQViz: () => {
      return qVizRef.current;
    }
  }));
  return _react.default.createElement("div", {
    style: {
      height: props.height,
      width: '100%'
    },
    ref: qVizWrapperEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: void 0
  }, qVizHandler.qViz !== null ? _react.default.createElement("div", {
    id: qVizHandler.vizId,
    style: {
      height: '100%',
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: void 0
  }) : _react.default.createElement(_index.RqtvSpinner, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: void 0
  }));
});
QViz.propTypes = {
  /**
   * show/hide the title in Qlik visualization
   *
   */
  showTitle: _propTypes.default.bool,

  /**
   * the id of the visualization to be retrieved and of the div that will contain it
   *
   */
  id: _propTypes.default.string.isRequired,

  /**
   * the properties of the object to be created on the fly
   * chartProps must be passed as: {'chartType':'string', 'columns':'array', 'rest':'object'} see this link for details https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/VisualizationAPI.htm
   *
   */
  chartProps: _propTypes.default.object
};
QViz.defaultProps = {
  showTitle: false
};
var _default = QViz;
exports.default = _default;