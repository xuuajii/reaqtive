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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\visualizations\\q-viz.js";
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
      format: 'CSV_T',
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
      lineNumber: 84
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
      lineNumber: 86
    },
    __self: void 0
  }) : _react.default.createElement(_index.RqtvSpinner, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
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
   *
   */
  chartProps: _propTypes.default.object
};
QViz.defaultProps = {
  showTitle: false
};
var _default = QViz;
exports.default = _default;