(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.fcklib = {})));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var Rectangle = function Rectangle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Rectangle);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
  };

  var Vector2D =
  /*#__PURE__*/
  function () {
    function Vector2D() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      _classCallCheck(this, Vector2D);

      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.originX = x;
      this.originY = y;
    }

    _createClass(Vector2D, [{
      key: "clone",
      value: function clone() {
        return new Vector2D(this.x, this.y);
      }
    }], [{
      key: "interpolate",
      value: function interpolate(p1, p2, t) {
        var point = new Vector2D(t * p1.x + (1 - t) * p2.x, t * p1.y + (1 - t) * p2.y);
        return point;
      }
    }, {
      key: "distance",
      value: function distance(p1, p2) {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }, {
      key: "direction",
      value: function direction(p1, p2) {
        var dist = Vector2D.distance(p1, p2);
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return new Vector2D(dx / dist, dy / dist);
      }
    }]);

    return Vector2D;
  }();

  var IPathSegment =
  /*#__PURE__*/
  function () {
    function IPathSegment() {
      _classCallCheck(this, IPathSegment);

      this.points;
      this.startPoints;
    }

    _createClass(IPathSegment, [{
      key: "getBounds",
      value: function getBounds() {}
    }, {
      key: "getPointAt",
      value: function getPointAt() {}
    }, {
      key: "getLength",
      value: function getLength() {}
    }, {
      key: "draw",
      value: function draw(ctx) {}
    }, {
      key: "drawRandom",
      value: function drawRandom() {}
    }, {
      key: "drawDebugInfo",
      value: function drawDebugInfo(ctx) {
        if (this.rectangle) {
          var rect = this.rectangle;
          ctx.beginPath();
          ctx.moveTo(rect.left, rect.top);
          ctx.lineTo(rect.right, rect.top);
          ctx.lineTo(rect.right, rect.bottom);
          ctx.lineTo(rect.left, rect.bottom);
          ctx.lineTo(rect.left, rect.top);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }, {
      key: "getEndPoint",
      value: function getEndPoint() {
        return this.points[this.points.length - 1];
      }
    }, {
      key: "translate",
      value: function translate() {}
    }, {
      key: "clone",
      value: function clone() {}
    }]);

    return IPathSegment;
  }();

  var MoveToSegment =
  /*#__PURE__*/
  function (_IPathSegment) {
    _inherits(MoveToSegment, _IPathSegment);

    function MoveToSegment(startPoint, points) {
      var _this;

      _classCallCheck(this, MoveToSegment);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveToSegment).call(this));
      _this.startPoint = startPoint.clone();
      _this.points = points.slice();
      return _this;
    }

    _createClass(MoveToSegment, [{
      key: "getBounds",
      value: function getBounds() {}
    }, {
      key: "getPointAt",
      value: function getPointAt(t) {
        return this.startPoint;
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return 0;
      }
    }, {
      key: "draw",
      value: function draw(ctx) {
        _get(_getPrototypeOf(MoveToSegment.prototype), "draw", this).call(this, ctx);

        ctx.moveTo(this.points[0].x, this.points[0].y);
      }
    }, {
      key: "drawRandom",
      value: function drawRandom() {}
    }, {
      key: "translate",
      value: function translate(dx, dy) {
        var startPoint = this.startPoint;
        var points = this.points;

        for (var i = 0; i < startPoint.length; i += 2) {
          startPoint[i] += dx;
          startPoint[i + 1] += dy;
        }

        for (i = 0; i < points.length; i += 2) {
          points[i] += dx;
          points[i + 1] += dy;
        }
      }
    }, {
      key: "clone",
      value: function clone() {}
    }]);

    return MoveToSegment;
  }(IPathSegment);

  var LineSegment =
  /*#__PURE__*/
  function (_IPathSegment) {
    _inherits(LineSegment, _IPathSegment);

    function LineSegment(startPoint, points) {
      var _this;

      _classCallCheck(this, LineSegment);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LineSegment).call(this));
      _this.startPoint = startPoint.clone();
      _this.points = points.slice();

      _this.updateLength();

      _this.rectangle = _this.getRectangle();
      return _this;
    }

    _createClass(LineSegment, [{
      key: "getBounds",
      value: function getBounds() {
        return this.rectangle;
      }
    }, {
      key: "getPointAt",
      value: function getPointAt(t) {
        var x = this.startPoint.x + (this.points[0].x - this.startPoint.x) * t;
        var y = this.startPoint.y + (this.points[0].y - this.startPoint.y) * t;
        return new Vector2D(x, y);
      }
    }, {
      key: "updateLength",
      value: function updateLength() {
        this.length = Vector2D.distance(this.points[0], this.startPoint);
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return this.length;
      }
    }, {
      key: "draw",
      value: function draw(ctx) {
        _get(_getPrototypeOf(LineSegment.prototype), "draw", this).call(this, ctx); // ctx.moveTo(this.startPoint[0],this.startPoint[1])


        ctx.lineTo(this.points[0].x, this.points[0].y);
      }
    }, {
      key: "drawRandom",
      value: function drawRandom() {}
    }, {
      key: "split",
      value: function split(t) {
        if (t > 1 || t < 0) {
          throw new Error("0 <= t <= 1 の範囲内でtを設定して。分割するってどういうことかわかってるの？");
        }

        var t = 1 - t;
        var p01 = Vector2D.interpolate(this.startPoint, this.points[0], t);
        return [new LineSegment(this.startPoint, [p01]), new LineSegment(p01, [this.points[0]])];
      }
    }, {
      key: "translate",
      value: function translate(dx, dy) {
        var startPoint = this.startPoint;
        var points = this.points;

        for (var i = 0; i < startPoint.length; i += 2) {
          startPoint[i] += dx;
          startPoint[i + 1] += dy;
        }

        for (i = 0; i < points.length; i += 2) {
          points[i] += dx;
          points[i + 1] += dy;
        }
      }
    }, {
      key: "getRectangle",
      value: function getRectangle() {
        var p0 = this.startPoint;
        var p1 = this.points[0];
        var left = 99999;
        var right = -99999;
        var top = 99999;
        var bottom = -99999;
        var allPoints = [];
        allPoints[0] = p0;
        allPoints[1] = p1;

        for (var i = 0; i < 2; i++) {
          left = Math.min(left, allPoints[i].x);
          right = Math.max(right, allPoints[i].x);
          top = Math.min(top, allPoints[i].y);
          bottom = Math.max(bottom, allPoints[i].y);
        }

        return new Rectangle(left, top, right - left, bottom - top);
      }
    }, {
      key: "clone",
      value: function clone() {}
    }]);

    return LineSegment;
  }(IPathSegment);

  var CubicBezierSegment$$1 =
  /*#__PURE__*/
  function (_IPathSegment) {
    _inherits(CubicBezierSegment$$1, _IPathSegment);

    function CubicBezierSegment$$1(startPoint, points) {
      var _this;

      _classCallCheck(this, CubicBezierSegment$$1);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CubicBezierSegment$$1).call(this));
      _this.startPoint = startPoint.clone();
      _this.points = points.slice();

      _this.updateLength();

      _this.rectangle = _this.getRectangle();
      return _this;
    }

    _createClass(CubicBezierSegment$$1, [{
      key: "getBounds",
      value: function getBounds() {
        return this.rectangle;
      }
    }, {
      key: "getPointAt",
      value: function getPointAt(t) {
        var p = new Vector2D(0, 0);
        var p0 = this.startPoint;
        var p1 = this.points[0];
        var p2 = this.points[1];
        var p3 = this.points[2];
        var a = 1 - t;
        var b = a * a;
        var c = t * t;
        var c0 = a * b;
        var c1 = 3 * b * t;
        var c2 = 3 * a * c;
        var c3 = t * c;
        p.x = p0.x * c0 + p1.x * c1 + p2.x * c2 + p3.x * c3;
        p.y = p0.y * c0 + p1.y * c1 + p2.y * c2 + p3.y * c3;
        return p;
      }
    }, {
      key: "updateLength",
      value: function updateLength() {
        var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
        n = Math.pow(2, n);
        var p0 = this.getPointAt(0);
        var p1;
        var len = 0;

        for (var i = 1; i <= n; i++) {
          p1 = this.getPointAt(i / n);
          len += Vector2D.distance(p0, p1);
          p0.x = p1.x;
          p0.y = p1.y;
        }

        this.length = len;
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return this.length;
      }
    }, {
      key: "draw",
      value: function draw(ctx) {
        _get(_getPrototypeOf(CubicBezierSegment$$1.prototype), "draw", this).call(this, ctx);

        ctx.bezierCurveTo(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
      }
    }, {
      key: "drawRandom",
      value: function drawRandom() {}
    }, {
      key: "getRectangle",
      value: function getRectangle() {
        var a, b, c, d;
        var t,
            p = new Vector2D();
        var v = [];
        var minX, maxX, minY, maxY;
        var p0 = this.startPoint;
        var p1 = this.points[0];
        var p2 = this.points[1];
        var p3 = this.points[2];

        var _p0 = new Vector2D(p0.x, p0.y);

        var _p1 = new Vector2D(p1.x, p1.y);

        var _p2 = new Vector2D(p2.x, p2.y);

        var _p3 = new Vector2D(p3.x, p3.y);

        v = [_p0.x, _p3.x];
        b = 6 * _p0.x - 12 * _p1.x + 6 * _p2.x;
        a = -3 * _p0.x + 9 * _p1.x - 9 * _p2.x + 3 * _p3.x;
        c = 3 * _p1.x - 3 * _p0.x;

        if (a == 0) {
          if (b != 0) {
            t = -c / b;
            if (0 < t && t < 1) v.push(this.getPointAt(t, p).x);
          }
        } else {
          d = b * b - 4 * c * a;

          if (d >= 0) {
            a *= 2;
            d = Math.sqrt(d);
            t = (-b + d) / a;
            if (0 < t && t < 1) v.push(this.getPointAt(t, p).x);
            t = (-b - d) / a;
            if (0 < t && t < 1) v.push(this.getPointAt(t, p).x);
          }
        }

        minX = Math.min.apply(null, v);
        maxX = Math.max.apply(null, v);
        v = [_p0.y, _p3.y];
        b = 6 * _p0.y - 12 * _p1.y + 6 * _p2.y;
        a = -3 * _p0.y + 9 * _p1.y - 9 * _p2.y + 3 * _p3.y;
        c = 3 * _p1.y - 3 * _p0.y;

        if (a == 0) {
          if (b != 0) {
            t = -c / b;
            if (0 < t && t < 1) v.push(this.getPointAt(t, p).y);
          }
        } else {
          d = b * b - 4 * c * a;

          if (d >= 0) {
            a *= 2;
            d = Math.sqrt(d);
            t = (-b + d) / a;
            if (0 < t && t < 1) v.push(this.getPointAt(t, p).y);
            t = (-b - d) / a;
            if (0 < t && t < 1) v.push(this.getPointAt(t, p).y);
          }
        }

        minY = Math.min.apply(null, v);
        maxY = Math.max.apply(null, v);
        return new Rectangle(minX, minY, Math.max(1e-5, maxX - minX), Math.max(1e-5, maxY - minY));
      }
    }, {
      key: "translate",
      value: function translate(dx, dy) {
        var startPoint = this.startPoint;
        var points = this.points;

        for (var i = 0; i < startPoint.length; i += 2) {
          startPoint[i] += dx;
          startPoint[i + 1] += dy;
        }

        for (i = 0; i < points.length; i += 2) {
          points[i] += dx;
          points[i + 1] += dy;
        }
      }
    }, {
      key: "clone",
      value: function clone() {}
    }]);

    return CubicBezierSegment$$1;
  }(IPathSegment);

  var Path =
  /*#__PURE__*/
  function () {
    function Path() {
      _classCallCheck(this, Path);

      this.segments = [];
    }

    _createClass(Path, [{
      key: "add",
      value: function add(segment) {
        this.segments.push(segment);
      }
    }, {
      key: "updateInfo",
      value: function updateInfo() {
        this.rectangle = this.getRectangle();
      }
    }, {
      key: "draw",
      value: function draw(ctx) {
        var len = this.segments.length;

        for (var i = 0; i < len; i++) {
          this.segments[i].draw(ctx);
        }
      }
    }, {
      key: "drawDebug",
      value: function drawDebug(ctx) {
        this.segments.forEach(function (seg) {
          seg.drawDebugInfo(ctx);
        });
      }
    }, {
      key: "getRectangle",
      value: function getRectangle() {
        var minX = 99999;
        var minY = 99999;
        var maxX = -99999;
        var maxY = -99999;
        this.segments.map(function (segment) {
          var rect = segment.getBounds();

          if (rect) {
            minX = Math.min(minX, rect.left);
            maxX = Math.max(maxX, rect.right);
            minY = Math.min(minY, rect.top);
            maxY = Math.max(maxY, rect.bottom);
          }
        });
        return new Rectangle(minX, minY, maxX - minX, maxY - minY);
      }
    }, {
      key: "getPointAt",
      value: function getPointAt(t) {
        var totalLength = this.getLength();
        var length = totalLength * t;
        var lengthCount = 0;
        var i = 0;

        while (length > lengthCount) {
          lengthCount += this.segments[i].getLength();
          i++;
        }

        var overLength = lengthCount - length;
        var targetIndex = i - 1;

        if (targetIndex < 0) {
          targetIndex = 0;
        }

        var targetSegment = this.segments[targetIndex];
        var targetLength = targetSegment.getLength();
        var targetRatio = (targetLength - overLength) / targetLength;
        var point = targetSegment.getPointAt(targetRatio);
        return point;
      }
    }, {
      key: "updateLength",
      value: function updateLength() {
        var len = 0;

        for (var i = 0; i < this.segments.length; i++) {
          len += this.segments[i].getLength();
        }

        this.length = len;
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return this.length;
      }
    }, {
      key: "isFill",
      value: function isFill() {
        var S = 0;
        var len = this.segments.length;

        for (var i = 0; i < len; i++) {
          var next = i + 1;

          if (i == len - 1) {
            next = 0;
          }

          var p1 = this.segments[next].getEndPoint();
          var p0 = this.segments[i].getEndPoint();
          S += p0.x * p1.y - p1.x * p0.y;
        }

        return S < 0;
      }
    }]);

    return Path;
  }();

  var PathUtil =
  /*#__PURE__*/
  function () {
    function PathUtil() {
      _classCallCheck(this, PathUtil);
    }

    _createClass(PathUtil, null, [{
      key: "createPathSet",
      value: function createPathSet(fontInfo) {
        var pathSet = [];
        var penLoc = undefined;
        var start = undefined;

        for (var idx in fontInfo) {
          var lineInfo = fontInfo[idx];
          var vector = lineInfo.points;

          if (lineInfo.type == "moveTo") {
            var path = new Path();
            penLoc = vector[0];
            start = vector[0];
            path.add(new MoveToSegment(penLoc, vector));
          }

          if (lineInfo.type == "lineTo") {
            path.add(new LineSegment(penLoc, vector));
            penLoc = vector[0];
          }

          if (lineInfo.type == "curveTo") {
            path.add(new CubicBezierSegment$$1(penLoc, vector));
            penLoc = vector[2];
          }

          if (lineInfo.type == "closePath") {
            path.add(new LineSegment(penLoc, [start]));
            pathSet.push(path);
          }
        }

        return pathSet;
      }
    }, {
      key: "initPath",
      value: function initPath(pathSet) {
        pathSet.map(function (path) {
          path.updateLength();
          path.updateInfo();
        });
      } // 塗りと抜きを含めたパスのセットを作成

    }, {
      key: "createFillPathSet",
      value: function createFillPathSet(pathSet) {
        var fillPathSet = [];
        var tmp = [];
        var prevFill = false;

        for (var idx in pathSet) {
          //新しいパスの始まり
          if (!prevFill == pathSet[idx].isFill()) {
            if (fillPathSet.length != 0) {
              fillPathSet.push(tmp.slice());
              tmp = [];
            }
          }

          tmp.push(pathSet[idx]);
          prevFill = pathSet[idx].isFill();
        }

        fillPathSet.push(tmp.slice());
        return fillPathSet;
      }
    }]);

    return PathUtil;
  }();

  var GlyphData =
  /*#__PURE__*/
  function () {
    function GlyphData() {
      _classCallCheck(this, GlyphData);
    }

    _createClass(GlyphData, [{
      key: "load",
      value: function load(callback) {
        var _this = this;

        fetch('http://localhost:3000/font/').then(function (response) {
          return response.json();
        }).then(function (json) {
          var data = _this.formatRawData(json);

          callback(data);
        });
      }
    }, {
      key: "formatRawData",
      value: function formatRawData(json) {
        var data = [];
        json[0]["path"].map(function (path) {
          var points = [];
          path[1].map(function (point) {
            points.push(new Vector2D(point[0], point[1]));
          });
          var obj = {
            "type": path[0],
            "points": points
          };
          data.push(obj);
        });
        return data;
      }
    }]);

    return GlyphData;
  }();

  var Glyph =
  /*#__PURE__*/
  function () {
    function Glyph(fontInfo) {
      _classCallCheck(this, Glyph);

      this.fontInfo = fontInfo;
      this.opacity = 1;
      this.fillStyle = "rgba(255,255,255,".concat(this.opacity, ")");
      this.strokeStyle = "#ffffff";
      this.lineWidth = 0.5;
      this.glyph = [];
      this.allPath = [];
    }

    _createClass(Glyph, [{
      key: "init",
      value: function init() {
        var pathSet = PathUtil.createPathSet(this.fontInfo);
        this.allPath = pathSet.slice();
        PathUtil.initPath(pathSet);
        this.glyph = PathUtil.createFillPathSet(pathSet);
        this.updateInfo();
      }
    }, {
      key: "setOpacity",
      value: function setOpacity(opacity) {
        this.opacity = opacity;
        this.fillStyle = "rgba(255,255,255,".concat(this.opacity, ")");
      }
    }, {
      key: "initRandom",
      value: function initRandom() {
        var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
        var fontInfo = this.fontInfo;

        for (var idx in fontInfo.path) {
          var lineInfo = fontInfo.path[idx];

          for (var i = 0; i < lineInfo[1].length; i++) {
            for (var j = 0; j < lineInfo[1][i].length; j++) {
              lineInfo[1][i][j] = lineInfo[1][i][j] + Math.random() * seed - seed / 2;
            }
          }
        }
      }
    }, {
      key: "getAllPath",
      value: function getAllPath() {
        return this.allPath;
      }
    }, {
      key: "updateInfo",
      value: function updateInfo() {
        this.rectangle = this.getRectangle();
      }
    }, {
      key: "getRectangle",
      value: function getRectangle() {
        var minX = 99999;
        var minY = 99999;
        var maxX = -99999;
        var maxY = -99999;
        this.allPath.map(function (path) {
          var rect = path.getRectangle();

          if (rect) {
            minX = Math.min(minX, rect.left);
            maxX = Math.max(maxX, rect.right);
            minY = Math.min(minY, rect.top);
            maxY = Math.max(maxY, rect.bottom);
          }
        });
        return new Rectangle(minX, minY, maxX - minX, maxY - minY);
      }
    }, {
      key: "drawDebug",
      value: function drawDebug(ctx) {
        var pathes = this.getAllPath();
        pathes.forEach(function (path) {
          path.drawDebug(ctx);
        });

        if (this.rectangle) {
          var rect = this.rectangle;
          ctx.beginPath();
          ctx.moveTo(rect.left, rect.top);
          ctx.lineTo(rect.right, rect.top);
          ctx.lineTo(rect.right, rect.bottom);
          ctx.lineTo(rect.left, rect.bottom);
          ctx.lineTo(rect.left, rect.top);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }, {
      key: "draw",
      value: function draw(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();

        for (var i = 0; i < this.glyph.length; i++) {
          for (var j = 0; j < this.glyph[i].length; j++) {
            this.glyph[i][j].draw(ctx);
          }
        }

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
    }]);

    return Glyph;
  }();

  var MathUtil =
  /*#__PURE__*/
  function () {
    function MathUtil() {
      _classCallCheck(this, MathUtil);
    }

    _createClass(MathUtil, null, [{
      key: "abs",
      value: function abs(num) {
        return num > 0 ? num : -num;
      }
    }, {
      key: "normalize",
      value: function normalize(num) {
        return num / MathUtil.abs(num);
      }
    }, {
      key: "randomDirection",
      value: function randomDirection() {
        return (MathUtil.randomInt(1) - 0.5) * 2;
      }
    }, {
      key: "randomInt",
      value: function randomInt(a) {
        var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        return Math.floor(Math.random() * (a + 1)) * b;
      }
    }]);

    return MathUtil;
  }();

  var PathAnimation =
  /*#__PURE__*/
  function () {
    function PathAnimation(path) {
      _classCallCheck(this, PathAnimation);

      this.velocity = 1;
      this.ratio = 0;
      this.path = path;
      this.ratioVelocity = this.speed / path.getLength();
    }

    _createClass(PathAnimation, [{
      key: "setVelocity",
      value: function setVelocity(velocity) {
        this.velocity = velocity;
        this.ratioVelocity = this.velocity / this.path.getLength();
        this.ratioVelocity *= MathUtil.randomDirection();
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        this.ratio += this.ratioVelocity;

        if (this.ratio > 1) {
          this.ratio = 0;
        }

        if (this.ratio < 0) {
          this.ratio = 1;
        }

        return this.path.getPointAt(this.ratio);
      }
    }]);

    return PathAnimation;
  }();

  var Main =
  /*#__PURE__*/
  function () {
    function Main() {
      _classCallCheck(this, Main);

      this.canvas = $('#canvas')[0];
      this.ctx = this.canvas.getContext('2d');
      this.glyph;
    }

    _createClass(Main, [{
      key: "start",
      value: function start() {
        var _this = this;

        var glyphData = new GlyphData();
        glyphData.load(function (data) {
          _this.init(data);
        });
      }
    }, {
      key: "init",
      value: function init(data) {
        var ctx = this.ctx;
        var g = new Glyph(data);
        g.init(); // g.initRandom(20)

        g.setOpacity(0.5);
        g.strokeStyle = "#ffffff";
        g.draw(ctx);
        this.glyph = g;
        this.loop();
      }
    }, {
      key: "loop",
      value: function loop() {
        var ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // this.glyph.setOpacity(Math.random());

        this.glyph.draw(ctx);
        this.glyph.drawDebug(ctx);
        requestAnimationFrame(this.loop.bind(this));
      }
    }]);

    return Main;
  }();

  var MainParticle =
  /*#__PURE__*/
  function (_Main) {
    _inherits(MainParticle, _Main);

    function MainParticle() {
      var _this;

      _classCallCheck(this, MainParticle);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MainParticle).call(this));
      _this._pathAnimations = [];
      _this._randomSeedX = 20;
      _this._randomSeedY = 20;
      return _this;
    }

    _createClass(MainParticle, [{
      key: "init",
      value: function init(data) {
        var _this2 = this;

        var ctx = this.ctx;
        var path;
        var g = new Glyph(data);
        g.init();
        g.setOpacity(0.5);
        g.strokeStyle = "#ffffff"; // g.draw(ctx);

        this.glyph = g;
        path = g.getAllPath();
        this.loop();
        path.map(function (element) {
          var pathLength = element.getLength(); // var numAnim = Math.floor(pathLength/10);

          var numAnim = Math.ceil(pathLength / 200); // var numAnim = 1;

          for (var j = 0; j < numAnim; j++) {
            var animation = new PathAnimation(element);
            animation.ratio = Math.random();
            animation.setVelocity(1);

            _this2._pathAnimations.push(animation);
          }
        });
        this.loop();
        $(window).on('mousemove', function (e) {
          _this2._randomSeedX = e.pageX / 20;
          _this2._randomSeedY = e.pageY / 20;
        });
      }
    }, {
      key: "loop",
      value: function loop() {
        var ctx = this.ctx;
        var randomSeedX = this._randomSeedX;
        var randomSeedY = this._randomSeedY;
        var pathAnimations = this._pathAnimations; // ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        for (var i = 0; i < pathAnimations.length; i++) {
          ctx.fillStyle = "rgba(255,255,255,0.1)";
          var pos = pathAnimations[i].updatePosition();
          ctx.beginPath();
          ctx.arc(pos.x + Math.random() * randomSeedX - randomSeedX / 2, pos.y + Math.random() * randomSeedY - randomSeedY / 2, 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        } // this.glyph.draw(ctx);


        requestAnimationFrame(this.loop.bind(this));
      }
    }]);

    return MainParticle;
  }(Main);

  var PathAnimationForce =
  /*#__PURE__*/
  function () {
    function PathAnimationForce(points) {
      var _this = this;

      _classCallCheck(this, PathAnimationForce);

      this.velocity = 1;
      this.ratio = 0;
      this.points = points;
      this.currentIndex = Math.floor(Math.random() * this.points.length);
      this.nextIndex = this.getNextIndex();
      this.position = this.points[this.currentIndex].clone();
      this.nextPosition = this.points[this.nextIndex];
      setInterval(function () {
        _this.currentIndex = _this.nextIndex;
        _this.nextIndex = _this.getNextIndex();
        _this.nextPosition = _this.points[_this.nextIndex];
      }, 300);
    }

    _createClass(PathAnimationForce, [{
      key: "getNextIndex",
      value: function getNextIndex() {
        if (this.currentIndex + 1 == this.points.length) {
          return 0;
        }

        return this.currentIndex + 1;
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        var p0 = this.position;
        var p1 = this.nextPosition;
        var distance = Vector2D.distance(p0, p1);
        var direction = Vector2D.direction(p0, p1);
        p0.vx += direction.x / 500 * distance;
        p0.vy += direction.y / 500 * distance;
        p0.vx = Math.min(100, p0.vx) * 0.95;
        p0.vy = Math.min(100, p0.vy) * 0.95;
        p0.x += p0.vx;
        p0.y += p0.vy;
        return p0;
      }
    }]);

    return PathAnimationForce;
  }();

  var MainParticleForce =
  /*#__PURE__*/
  function (_Main) {
    _inherits(MainParticleForce, _Main);

    function MainParticleForce() {
      var _this;

      _classCallCheck(this, MainParticleForce);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MainParticleForce).call(this));
      _this._pathAnimations = [];
      _this._randomSeedX = 20;
      _this._randomSeedY = 20;
      _this._points = [];
      return _this;
    }

    _createClass(MainParticleForce, [{
      key: "init",
      value: function init(data) {
        var _this2 = this;

        var ctx = this.ctx;
        var path;
        var g = new Glyph(data);
        g.init();
        g.setOpacity(0.5);
        g.strokeStyle = "#ffffff"; // g.draw(ctx);

        this.glyph = g;
        path = g.getAllPath();
        this.loop();
        path.map(function (element) {
          var pathLength = element.getLength();
          var numPoints = Math.ceil(pathLength / 50);
          var ratioUnit = 1 / numPoints;
          var tmpPoints = []; // var numAnim = 1;

          for (var j = 0; j < numPoints; j++) {
            var point = element.getPointAt(ratioUnit * j);
            tmpPoints.push(point);
          }

          for (var j = 0; j < 100; j++) {
            _this2._pathAnimations.push(new PathAnimationForce(tmpPoints));
          }

          _this2._points.push(tmpPoints);
        });

        this._points.map(function (points) {
          points.map(function (point) {
            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
          });
        });

        this.loop(); // $(window).on('mousemove',(e)=>{
        //     this._randomSeedX = e.pageX/20;
        //     this._randomSeedY = e.pageY/20;
        // })
      }
    }, {
      key: "loop",
      value: function loop() {
        var ctx = this.ctx;
        ctx.fillStyle = "rgba(0,0,0,0.03)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this._pathAnimations.map(function (animation) {
          var pos = animation.updatePosition();
          ctx.fillStyle = "rgba(255,255,255,1)";
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        });

        requestAnimationFrame(this.loop.bind(this));
      }
    }]);

    return MainParticleForce;
  }(Main);

  exports.Glyph = Glyph;
  exports.LineSegment = LineSegment;
  exports.CubicBezierSegment = CubicBezierSegment$$1;
  exports.MoveToSegment = MoveToSegment;
  exports.Path = Path;
  exports.Vector2D = Vector2D;
  exports.PathAnimation = PathAnimation;
  exports.Main = Main;
  exports.MainParticle = MainParticle;
  exports.MainParticleForce = MainParticleForce;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvZ2VvbS9SZWN0YW5nbGUuanMiLCIuLi8uLi9zcmMvanMvZ2VvbS9WZWN0b3IyRC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9JUGF0aFNlZ21lbnQuanMiLCIuLi8uLi9zcmMvanMvc2hhcGUvTW92ZVRvU2VnbWVudC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9MaW5lU2VnbWVudC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9DdWJpY0JlemllclNlZ21lbnQuanMiLCIuLi8uLi9zcmMvanMvc2hhcGUvUGF0aC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9QYXRoVXRpbC5qcyIsIi4uLy4uL3NyYy9qcy9kYXRhL0dseXBoRGF0YS5qcyIsIi4uLy4uL3NyYy9qcy9nbHlwaC9HbHlwaC5qcyIsIi4uLy4uL3NyYy9qcy91dGlsL01hdGhVdGlsLmpzIiwiLi4vLi4vc3JjL2pzL2FuaW1hdGlvbi9QYXRoQW5pbWF0aW9uLmpzIiwiLi4vLi4vc3JjL2pzL2V4YW1wbGVzL01haW4uanMiLCIuLi8uLi9zcmMvanMvZXhhbXBsZXMvTWFpblBhcnRpY2xlLmpzIiwiLi4vLi4vc3JjL2pzL2FuaW1hdGlvbi9QYXRoQW5pbWF0aW9uRm9yY2UuanMiLCIuLi8uLi9zcmMvanMvZXhhbXBsZXMvTWFpblBhcnRpY2xlRm9yY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUmVjdGFuZ2xle1xyXG4gICAgY29uc3RydWN0b3IoeD0wLHk9MCx3aWR0aD0wLGhlaWdodD0wKXtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubGVmdCA9IHg7XHJcbiAgICAgICAgdGhpcy50b3AgPSB5O1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSB4ICsgd2lkdGg7XHJcbiAgICAgICAgdGhpcy5ib3R0b20gPSB5ICsgaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWN0YW5nbGU7IiwiXHJcbmNsYXNzIFZlY3RvcjJEIHtcclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnZ4ID0gMDtcclxuICAgICAgICB0aGlzLnZ5ID0gMDtcclxuICAgICAgICB0aGlzLm9yaWdpblggPSB4O1xyXG4gICAgICAgIHRoaXMub3JpZ2luWSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGludGVycG9sYXRlKHAxLCBwMiwgdCkge1xyXG4gICAgICAgIHZhciBwb2ludCA9IG5ldyBWZWN0b3IyRCh0ICogcDEueCArICgxIC0gdCkgKiBwMi54LCB0ICogcDEueSArICgxIC0gdCkgKiBwMi55KTtcclxuICAgICAgICByZXR1cm4gcG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpc3RhbmNlKHAxLHAyKXtcclxuICAgICAgICB2YXIgZHggPSBwMi54IC0gcDEueDtcclxuICAgICAgICB2YXIgZHkgPSBwMi55IC0gcDEueTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCpkeCtkeSpkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpcmVjdGlvbihwMSxwMil7XHJcbiAgICAgICAgdmFyIGRpc3QgPSBWZWN0b3IyRC5kaXN0YW5jZShwMSxwMik7XHJcbiAgICAgICAgdmFyIGR4ID0gcDIueCAtIHAxLng7XHJcbiAgICAgICAgdmFyIGR5ID0gcDIueSAtIHAxLnk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRChkeC9kaXN0LGR5L2Rpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yMkQ7IiwiXHJcbmNsYXNzIElQYXRoU2VnbWVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnBvaW50cztcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnRzO1xyXG4gICAgfVxyXG4gICAgZ2V0Qm91bmRzKCl7fVxyXG4gICAgZ2V0UG9pbnRBdCgpe31cclxuICAgIGdldExlbmd0aCgpe31cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGRyYXdSYW5kb20oKXt9XHJcbiAgICBkcmF3RGVidWdJbmZvKGN0eCl7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVjdGFuZ2xlKXtcclxuICAgICAgICAgICAgdmFyIHJlY3QgPSB0aGlzLnJlY3RhbmdsZTtcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHJlY3QubGVmdCxyZWN0LnRvcCk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocmVjdC5yaWdodCxyZWN0LnRvcCk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocmVjdC5yaWdodCxyZWN0LmJvdHRvbSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocmVjdC5sZWZ0LHJlY3QuYm90dG9tKTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhyZWN0LmxlZnQscmVjdC50b3ApO1xyXG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBnZXRFbmRQb2ludCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50c1t0aGlzLnBvaW50cy5sZW5ndGgtMV07XHJcbiAgICB9XHJcbiAgICB0cmFuc2xhdGUoKXt9XHJcbiAgICBjbG9uZSgpe31cclxufVxyXG5leHBvcnQgZGVmYXVsdCBJUGF0aFNlZ21lbnRcclxuIiwiaW1wb3J0IElQYXRoU2VnbWVudCBmcm9tICcuL0lQYXRoU2VnbWVudCc7XHJcblxyXG5jbGFzcyBNb3ZlVG9TZWdtZW50IGV4dGVuZHMgSVBhdGhTZWdtZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGFydFBvaW50LHBvaW50cykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydFBvaW50ID0gc3RhcnRQb2ludC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMucG9pbnRzID0gcG9pbnRzLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICBnZXRCb3VuZHMoKXt9XHJcbiAgICBnZXRQb2ludEF0KHQpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0UG9pbnQ7XHJcbiAgICB9XHJcbiAgICBnZXRMZW5ndGgoKXtyZXR1cm4gMDt9XHJcbiAgICBkcmF3KGN0eCl7XHJcbiAgICAgICAgc3VwZXIuZHJhdyhjdHgpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8odGhpcy5wb2ludHNbMF0ueCx0aGlzLnBvaW50c1swXS55KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZHJhd1JhbmRvbSgpe31cclxuICAgIFxyXG4gICAgXHJcbiAgICB0cmFuc2xhdGUoZHgsZHkpe1xyXG4gICAgICAgIHZhciBzdGFydFBvaW50ID0gdGhpcy5zdGFydFBvaW50O1xyXG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydFBvaW50Lmxlbmd0aDsgaSArPSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhcnRQb2ludFtpXSArPSBkeDtcclxuICAgICAgICAgICAgc3RhcnRQb2ludFtpICsgMV0gKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb2ludHNbaV0gKz0gZHg7XHJcbiAgICAgICAgICAgIHBvaW50c1tpICsgMV0gKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xvbmUoKXt9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTW92ZVRvU2VnbWVudFxyXG4iLCJpbXBvcnQgSVBhdGhTZWdtZW50IGZyb20gJy4vSVBhdGhTZWdtZW50JztcclxuaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4uL2dlb20vVmVjdG9yMkQnO1xyXG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vUmVjdGFuZ2xlJztcclxuXHJcbmNsYXNzIExpbmVTZWdtZW50IGV4dGVuZHMgSVBhdGhTZWdtZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGFydFBvaW50LHBvaW50cykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydFBvaW50ID0gc3RhcnRQb2ludC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMucG9pbnRzID0gcG9pbnRzLnNsaWNlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMZW5ndGgoKTtcclxuICAgICAgICB0aGlzLnJlY3RhbmdsZSA9IHRoaXMuZ2V0UmVjdGFuZ2xlKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBnZXRCb3VuZHMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWN0YW5nbGU7XHJcbiAgICB9XHJcbiAgICBnZXRQb2ludEF0KHQpe1xyXG4gICAgICAgIHZhciB4ID0gdGhpcy5zdGFydFBvaW50LnggKyAodGhpcy5wb2ludHNbMF0ueCAtIHRoaXMuc3RhcnRQb2ludC54KSAqIHQ7XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLnN0YXJ0UG9pbnQueSArICh0aGlzLnBvaW50c1swXS55IC0gdGhpcy5zdGFydFBvaW50LnkpICogdDtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHgsIHkpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTGVuZ3RoKCl7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBWZWN0b3IyRC5kaXN0YW5jZSh0aGlzLnBvaW50c1swXSx0aGlzLnN0YXJ0UG9pbnQpO1xyXG4gICAgfVxyXG4gICAgZ2V0TGVuZ3RoKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgZHJhdyhjdHgpe1xyXG4gICAgICAgIHN1cGVyLmRyYXcoY3R4KTtcclxuICAgICAgICAvLyBjdHgubW92ZVRvKHRoaXMuc3RhcnRQb2ludFswXSx0aGlzLnN0YXJ0UG9pbnRbMV0pXHJcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLnBvaW50c1swXS54LHRoaXMucG9pbnRzWzBdLnkpXHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkcmF3UmFuZG9tKCl7fVxyXG4gICAgc3BsaXQodCl7XHJcbiAgICAgICAgaWYgKHQgPiAxIHx8IHQgPCAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiMCA8PSB0IDw9IDEg44Gu56+E5Zuy5YaF44GndOOCkuioreWumuOBl+OBpuOAguWIhuWJsuOBmeOCi+OBo+OBpuOBqeOBhuOBhOOBhuOBk+OBqOOBi+OCj+OBi+OBo+OBpuOCi+OBru+8n1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHQgPSAxIC0gdDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcDAxID0gVmVjdG9yMkQuaW50ZXJwb2xhdGUodGhpcy5zdGFydFBvaW50LCB0aGlzLnBvaW50c1swXSwgdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFtuZXcgTGluZVNlZ21lbnQodGhpcy5zdGFydFBvaW50LCBbcDAxXSksIG5ldyBMaW5lU2VnbWVudChwMDEsIFt0aGlzLnBvaW50c1swXV0pXTtcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZShkeCxkeSl7XHJcbiAgICAgICAgdmFyIHN0YXJ0UG9pbnQgPSB0aGlzLnN0YXJ0UG9pbnQ7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0UG9pbnQubGVuZ3RoOyBpICs9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFydFBvaW50W2ldICs9IGR4O1xyXG4gICAgICAgICAgICBzdGFydFBvaW50W2kgKyAxXSArPSBkeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkgKz0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvaW50c1tpXSArPSBkeDtcclxuICAgICAgICAgICAgcG9pbnRzW2kgKyAxXSArPSBkeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRSZWN0YW5nbGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBwMCA9IHRoaXMuc3RhcnRQb2ludDtcclxuICAgICAgICB2YXIgcDEgPSB0aGlzLnBvaW50c1swXTtcclxuXHJcbiAgICAgICAgdmFyIGxlZnQgPSA5OTk5OTtcclxuICAgICAgICB2YXIgcmlnaHQgPSAtOTk5OTk7XHJcbiAgICAgICAgdmFyIHRvcCA9IDk5OTk5O1xyXG4gICAgICAgIHZhciBib3R0b20gPSAtOTk5OTk7XHJcbiAgICAgICAgdmFyIGFsbFBvaW50cyA9IFtdO1xyXG4gICAgICAgIGFsbFBvaW50c1swXSA9IHAwO1xyXG4gICAgICAgIGFsbFBvaW50c1sxXSA9IHAxO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGVmdCA9IE1hdGgubWluKGxlZnQsIGFsbFBvaW50c1tpXS54KTtcclxuICAgICAgICAgICAgcmlnaHQgPSBNYXRoLm1heChyaWdodCwgYWxsUG9pbnRzW2ldLngpO1xyXG4gICAgICAgICAgICB0b3AgPSBNYXRoLm1pbih0b3AsIGFsbFBvaW50c1tpXS55KTtcclxuICAgICAgICAgICAgYm90dG9tID0gTWF0aC5tYXgoYm90dG9tLCBhbGxQb2ludHNbaV0ueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKGxlZnQsIHRvcCwgcmlnaHQgLSBsZWZ0LCBib3R0b20gLSB0b3ApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbG9uZSgpe31cclxufVxyXG5leHBvcnQgZGVmYXVsdCBMaW5lU2VnbWVudFxyXG4iLCJpbXBvcnQgSVBhdGhTZWdtZW50IGZyb20gJy4vSVBhdGhTZWdtZW50JztcclxuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tICcuLi9tYWluJztcclxuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL1JlY3RhbmdsZSc7XHJcblxyXG5jbGFzcyBDdWJpY0JlemllclNlZ21lbnQgZXh0ZW5kcyBJUGF0aFNlZ21lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0UG9pbnQscG9pbnRzKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBzdGFydFBvaW50LmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHMuc2xpY2UoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxlbmd0aCgpO1xyXG4gICAgICAgIHRoaXMucmVjdGFuZ2xlID0gdGhpcy5nZXRSZWN0YW5nbGUoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdldEJvdW5kcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY3RhbmdsZTtcclxuICAgIH1cclxuICAgIGdldFBvaW50QXQodCl7XHJcbiAgICAgICAgdmFyIHAgPSBuZXcgVmVjdG9yMkQoMCwwKTtcclxuICAgICAgICB2YXIgcDAgPSB0aGlzLnN0YXJ0UG9pbnQ7XHJcbiAgICAgICAgdmFyIHAxID0gdGhpcy5wb2ludHNbMF07XHJcbiAgICAgICAgdmFyIHAyID0gdGhpcy5wb2ludHNbMV07XHJcbiAgICAgICAgdmFyIHAzID0gdGhpcy5wb2ludHNbMl07XHJcbiAgICAgICAgdmFyIGEgPSAxIC0gdDtcclxuICAgICAgICB2YXIgYiA9IGEgKiBhO1xyXG4gICAgICAgIHZhciBjID0gdCAqIHQ7XHJcbiAgICAgICAgdmFyIGMwID0gYSAqIGI7XHJcbiAgICAgICAgdmFyIGMxID0gMyAqIGIgKiB0O1xyXG4gICAgICAgIHZhciBjMiA9IDMgKiBhICogYztcclxuICAgICAgICB2YXIgYzMgPSB0ICogYztcclxuICAgICAgICBwLnggPSBwMC54ICogYzAgKyBwMS54ICogYzEgKyBwMi54ICogYzIgKyBwMy54ICogYzM7XHJcbiAgICAgICAgcC55ID0gcDAueSAqIGMwICsgcDEueSAqIGMxICsgcDIueSAqIGMyICsgcDMueSAqIGMzO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTGVuZ3RoKG49NCl7XHJcbiAgICAgICAgbiA9IE1hdGgucG93KDIsIG4pO1xyXG4gICAgICAgIHZhciBwMCA9IHRoaXMuZ2V0UG9pbnRBdCgwKTtcclxuICAgICAgICB2YXIgcDE7XHJcbiAgICAgICAgdmFyIGxlbiA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcDEgPSB0aGlzLmdldFBvaW50QXQoaSAvIG4pO1xyXG4gICAgICAgICAgICBsZW4gKz0gVmVjdG9yMkQuZGlzdGFuY2UocDAsIHAxKTtcclxuICAgICAgICAgICAgcDAueCA9IHAxLng7XHJcbiAgICAgICAgICAgIHAwLnkgPSBwMS55O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbjtcclxuICAgIH1cclxuICAgIGdldExlbmd0aCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBzdXBlci5kcmF3KGN0eCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY3R4LmJlemllckN1cnZlVG8odGhpcy5wb2ludHNbMF0ueCx0aGlzLnBvaW50c1swXS55LHRoaXMucG9pbnRzWzFdLngsdGhpcy5wb2ludHNbMV0ueSx0aGlzLnBvaW50c1syXS54LHRoaXMucG9pbnRzWzJdLnkpXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBkcmF3UmFuZG9tKCl7fVxyXG4gICAgZ2V0UmVjdGFuZ2xlKCl7XHJcbiAgICAgICAgdmFyIGEsIGIsIGMsIGQ7XHJcblx0XHRcdHZhciB0LCBwID0gbmV3IFZlY3RvcjJEKCk7XHJcblx0XHRcdHZhciB2ID0gW107XHJcblx0XHRcdHZhciBtaW5YLCBtYXhYLCBtaW5ZLCBtYXhZO1xyXG5cdFx0XHR2YXIgcDAgPSB0aGlzLnN0YXJ0UG9pbnQ7XHJcbiAgICAgICAgICAgIHZhciBwMSA9IHRoaXMucG9pbnRzWzBdO1xyXG4gICAgICAgICAgICB2YXIgcDIgPSB0aGlzLnBvaW50c1sxXTtcclxuICAgICAgICAgICAgdmFyIHAzID0gdGhpcy5wb2ludHNbMl07XHJcblxyXG5cdFx0XHR2YXIgX3AwID0gbmV3IFZlY3RvcjJEKHAwLngsIHAwLnkpO1xyXG5cdFx0XHR2YXIgX3AxID0gbmV3IFZlY3RvcjJEKHAxLngsIHAxLnkpO1xyXG5cdFx0XHR2YXIgX3AyID0gbmV3IFZlY3RvcjJEKHAyLngsIHAyLnkpO1xyXG5cdFx0XHR2YXIgX3AzID0gbmV3IFZlY3RvcjJEKHAzLngsIHAzLnkpO1xyXG5cdFx0XHR2ID0gW19wMC54LCBfcDMueF07XHJcblx0XHRcdGIgPSA2ICogX3AwLnggLSAxMiAqIF9wMS54ICsgNiAqIF9wMi54O1xyXG5cdFx0XHRhID0gLTMgKiBfcDAueCArIDkgKiBfcDEueCAtIDkgKiBfcDIueCArIDMgKiBfcDMueDtcclxuXHRcdFx0YyA9IDMgKiBfcDEueCAtIDMgKiBfcDAueDtcclxuXHRcdFx0aWYgKGEgPT0gMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGlmIChiICE9IDApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dCA9IC1jIC8gYjtcclxuXHRcdFx0XHRcdGlmICgwIDwgdCAmJiB0IDwgMSlcclxuXHRcdFx0XHRcdFx0di5wdXNoKHRoaXMuZ2V0UG9pbnRBdCh0LCBwKS54KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZCA9IGIgKiBiIC0gNCAqIGMgKiBhO1xyXG5cdFx0XHRcdGlmIChkID49IDApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0YSAqPSAyO1xyXG5cdFx0XHRcdFx0ZCA9IE1hdGguc3FydChkKTtcclxuXHRcdFx0XHRcdHQgPSAoLWIgKyBkKSAvIGE7XHJcblx0XHRcdFx0XHRpZiAoMCA8IHQgJiYgdCA8IDEpXHJcblx0XHRcdFx0XHRcdHYucHVzaCh0aGlzLmdldFBvaW50QXQodCwgcCkueCk7XHJcblx0XHRcdFx0XHR0ID0gKC1iIC0gZCkgLyBhO1xyXG5cdFx0XHRcdFx0aWYgKDAgPCB0ICYmIHQgPCAxKVxyXG5cdFx0XHRcdFx0XHR2LnB1c2godGhpcy5nZXRQb2ludEF0KHQsIHApLngpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRtaW5YID0gTWF0aC5taW4uYXBwbHkobnVsbCwgdik7XHJcblx0XHRcdG1heFggPSBNYXRoLm1heC5hcHBseShudWxsLCB2KTtcclxuXHRcdFx0XHJcblx0XHRcdHYgPSBbX3AwLnksIF9wMy55XTtcclxuXHRcdFx0YiA9IDYgKiBfcDAueSAtIDEyICogX3AxLnkgKyA2ICogX3AyLnk7XHJcblx0XHRcdGEgPSAtMyAqIF9wMC55ICsgOSAqIF9wMS55IC0gOSAqIF9wMi55ICsgMyAqIF9wMy55O1xyXG5cdFx0XHRjID0gMyAqIF9wMS55IC0gMyAqIF9wMC55O1xyXG5cdFx0XHRpZiAoYSA9PSAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWYgKGIgIT0gMClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0ID0gLWMgLyBiO1xyXG5cdFx0XHRcdFx0aWYgKDAgPCB0ICYmIHQgPCAxKVxyXG5cdFx0XHRcdFx0XHR2LnB1c2godGhpcy5nZXRQb2ludEF0KHQsIHApLnkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdHtcclxuXHRcdFx0XHRkID0gYiAqIGIgLSA0ICogYyAqIGE7XHJcblx0XHRcdFx0aWYgKGQgPj0gMClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhICo9IDI7XHJcblx0XHRcdFx0XHRkID0gTWF0aC5zcXJ0KGQpO1xyXG5cdFx0XHRcdFx0dCA9ICgtYiArIGQpIC8gYTtcclxuXHRcdFx0XHRcdGlmICgwIDwgdCAmJiB0IDwgMSlcclxuXHRcdFx0XHRcdFx0di5wdXNoKHRoaXMuZ2V0UG9pbnRBdCh0LCBwKS55KTtcclxuXHRcdFx0XHRcdHQgPSAoLWIgLSBkKSAvIGE7XHJcblx0XHRcdFx0XHRpZiAoMCA8IHQgJiYgdCA8IDEpXHJcblx0XHRcdFx0XHRcdHYucHVzaCh0aGlzLmdldFBvaW50QXQodCwgcCkueSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRtaW5ZID0gTWF0aC5taW4uYXBwbHkobnVsbCwgdik7XHJcblx0XHRcdG1heFkgPSBNYXRoLm1heC5hcHBseShudWxsLCB2KTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBuZXcgUmVjdGFuZ2xlKG1pblgsIG1pblksIE1hdGgubWF4KDFlLTUsIG1heFggLSBtaW5YKSwgTWF0aC5tYXgoMWUtNSwgbWF4WSAtIG1pblkpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdHJhbnNsYXRlKGR4LGR5KXtcclxuICAgICAgICB2YXIgc3RhcnRQb2ludCA9IHRoaXMuc3RhcnRQb2ludDtcclxuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5wb2ludHM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRQb2ludC5sZW5ndGg7IGkgKz0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXJ0UG9pbnRbaV0gKz0gZHg7XHJcbiAgICAgICAgICAgIHN0YXJ0UG9pbnRbaSArIDFdICs9IGR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSArPSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9pbnRzW2ldICs9IGR4O1xyXG4gICAgICAgICAgICBwb2ludHNbaSArIDFdICs9IGR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsb25lKCl7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEN1YmljQmV6aWVyU2VnbWVudFxyXG4iLCJpbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vUmVjdGFuZ2xlJztcclxuXHJcbmNsYXNzIFBhdGgge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgYWRkKHNlZ21lbnQpe1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMucHVzaChzZWdtZW50KVxyXG4gICAgfVxyXG4gICAgdXBkYXRlSW5mbygpe1xyXG4gICAgICAgIHRoaXMucmVjdGFuZ2xlID0gdGhpcy5nZXRSZWN0YW5nbGUoKTtcclxuICAgIH1cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5zZWdtZW50cy5sZW5ndGg7XHJcbiAgICAgICBcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8bGVuO2krKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2VnbWVudHNbaV0uZHJhdyhjdHgpOyAgIFxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuICAgIGRyYXdEZWJ1ZyhjdHgpe1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMuZm9yRWFjaChzZWcgPT4ge1xyXG4gICAgICAgICAgICBzZWcuZHJhd0RlYnVnSW5mbyhjdHgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0UmVjdGFuZ2xlKCl7XHJcbiAgICAgICAgdmFyIG1pblggPSA5OTk5OTtcclxuICAgICAgICB2YXIgbWluWSA9IDk5OTk5O1xyXG4gICAgICAgIHZhciBtYXhYID0gLTk5OTk5O1xyXG4gICAgICAgIHZhciBtYXhZID0gLTk5OTk5O1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMubWFwKHNlZ21lbnQgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcmVjdCA9IHNlZ21lbnQuZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgICAgIGlmKHJlY3Qpe1xyXG4gICAgICAgICAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgscmVjdC5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLHJlY3QucmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblkscmVjdC50b3ApO1xyXG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFkscmVjdC5ib3R0b20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUobWluWCxtaW5ZLG1heFgtbWluWCxtYXhZLW1pblkpO1xyXG4gICAgfVxyXG4gICAgZ2V0UG9pbnRBdCh0KXtcclxuICAgICAgICB2YXIgdG90YWxMZW5ndGggPSB0aGlzLmdldExlbmd0aCgpO1xyXG4gICAgICAgIHZhciBsZW5ndGggPSB0b3RhbExlbmd0aCp0O1xyXG4gICAgICAgIHZhciBsZW5ndGhDb3VudCA9IDA7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICBcclxuICAgICAgICB3aGlsZShsZW5ndGggPiBsZW5ndGhDb3VudCl7XHJcbiAgICAgICAgICAgIGxlbmd0aENvdW50ICs9IHRoaXMuc2VnbWVudHNbaV0uZ2V0TGVuZ3RoKCk7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG92ZXJMZW5ndGggPSBsZW5ndGhDb3VudC1sZW5ndGg7XHJcbiAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gaSAtIDE7XHJcbiAgICAgICAgaWYodGFyZ2V0SW5kZXg8MCl7XHJcbiAgICAgICAgICAgIHRhcmdldEluZGV4PTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0YXJnZXRTZWdtZW50ID0gdGhpcy5zZWdtZW50c1t0YXJnZXRJbmRleF07XHJcbiAgICAgICAgdmFyIHRhcmdldExlbmd0aCA9IHRhcmdldFNlZ21lbnQuZ2V0TGVuZ3RoKCk7XHJcbiAgICAgICAgdmFyIHRhcmdldFJhdGlvID0gKHRhcmdldExlbmd0aC1vdmVyTGVuZ3RoKS90YXJnZXRMZW5ndGg7XHJcbiAgICAgICAgdmFyIHBvaW50ID0gdGFyZ2V0U2VnbWVudC5nZXRQb2ludEF0KHRhcmdldFJhdGlvKTtcclxuICAgICAgICByZXR1cm4gcG9pbnQ7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVMZW5ndGgoKXtcclxuICAgICAgICB2YXIgbGVuID0gMDtcclxuICAgICAgICBmb3IodmFyIGkgPTA7IGk8dGhpcy5zZWdtZW50cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgbGVuICs9IHRoaXMuc2VnbWVudHNbaV0uZ2V0TGVuZ3RoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuO1xyXG4gICAgfVxyXG4gICAgZ2V0TGVuZ3RoKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRmlsbCgpe1xyXG4gICAgICAgIHZhciBTXHQ9IDA7XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMuc2VnbWVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTxsZW47aSsrKXtcclxuICAgICAgICAgICAgdmFyIG5leHQgPSBpKzE7XHJcbiAgICAgICAgICAgIGlmKGkgPT0gbGVuLTEpe1xyXG4gICAgICAgICAgICAgICAgbmV4dCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHAxID0gdGhpcy5zZWdtZW50c1tuZXh0XS5nZXRFbmRQb2ludCgpO1xyXG4gICAgICAgICAgICB2YXIgcDAgPSB0aGlzLnNlZ21lbnRzW2ldLmdldEVuZFBvaW50KCk7XHJcbiAgICAgICAgICAgIFMgKz0gcDAueCAqIHAxLnkgLSBwMS54ICogcDAueTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFM8MDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBQYXRoXHJcbiIsImltcG9ydCBWZWN0b3IyRCBmcm9tICcuLi9nZW9tL1ZlY3RvcjJEJztcclxuaW1wb3J0IE1vdmVUb1NlZ21lbnQgZnJvbSAnLi4vc2hhcGUvTW92ZVRvU2VnbWVudCc7XHJcbmltcG9ydCBMaW5lU2VnbWVudCBmcm9tICcuLi9zaGFwZS9MaW5lU2VnbWVudCc7XHJcbmltcG9ydCBDdWJpY0JlemllclNlZ21lbnQgZnJvbSAnLi4vc2hhcGUvQ3ViaWNCZXppZXJTZWdtZW50JztcclxuaW1wb3J0IFBhdGggZnJvbSAnLi4vc2hhcGUvUGF0aCc7XHJcblxyXG5jbGFzcyBQYXRoVXRpbHtcclxuICAgIHN0YXRpYyBjcmVhdGVQYXRoU2V0KGZvbnRJbmZvKXtcclxuICAgICAgICB2YXIgcGF0aFNldCA9IFtdO1xyXG4gICAgICAgIHZhciBwZW5Mb2MgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaWR4IGluIGZvbnRJbmZvKXtcclxuICAgICAgICAgICAgdmFyIGxpbmVJbmZvID0gZm9udEluZm9baWR4XTtcclxuICAgICAgICAgICAgdmFyIHZlY3RvciA9IGxpbmVJbmZvLnBvaW50cztcclxuXHJcbiAgICAgICAgICAgIGlmKGxpbmVJbmZvLnR5cGUgPT0gXCJtb3ZlVG9cIil7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IG5ldyBQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBwZW5Mb2MgPSB2ZWN0b3JbMF1cclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdmVjdG9yWzBdO1xyXG4gICAgICAgICAgICAgICAgcGF0aC5hZGQobmV3IE1vdmVUb1NlZ21lbnQocGVuTG9jLHZlY3RvcikpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobGluZUluZm8udHlwZSA9PSBcImxpbmVUb1wiKXtcclxuICAgICAgICAgICAgICAgIHBhdGguYWRkKG5ldyBMaW5lU2VnbWVudChwZW5Mb2MsdmVjdG9yKSk7XHJcbiAgICAgICAgICAgICAgICBwZW5Mb2MgPSB2ZWN0b3JbMF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsaW5lSW5mby50eXBlID09IFwiY3VydmVUb1wiKXtcclxuICAgICAgICAgICAgICAgIHBhdGguYWRkKG5ldyBDdWJpY0JlemllclNlZ21lbnQocGVuTG9jLHZlY3RvcikpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHBlbkxvYyA9IHZlY3RvclsyXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxpbmVJbmZvLnR5cGUgPT0gXCJjbG9zZVBhdGhcIil7XHJcbiAgICAgICAgICAgICAgICBwYXRoLmFkZChuZXcgTGluZVNlZ21lbnQocGVuTG9jLFtzdGFydF0pKTtcclxuICAgICAgICAgICAgICAgIHBhdGhTZXQucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHRcdHJldHVybiBwYXRoU2V0XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluaXRQYXRoKHBhdGhTZXQpe1xyXG4gICAgICAgIHBhdGhTZXQubWFwKHBhdGggPT4ge1xyXG4gICAgICAgICAgICBwYXRoLnVwZGF0ZUxlbmd0aCgpO1xyXG4gICAgICAgICAgICBwYXRoLnVwZGF0ZUluZm8oKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWhl+OCiuOBqOaKnOOBjeOCkuWQq+OCgeOBn+ODkeOCueOBruOCu+ODg+ODiOOCkuS9nOaIkFxyXG4gICAgc3RhdGljIGNyZWF0ZUZpbGxQYXRoU2V0KHBhdGhTZXQpe1xyXG5cdFx0dmFyIGZpbGxQYXRoU2V0ID0gW107XHJcblx0XHR2YXIgdG1wID0gW107XHJcbiAgICAgICAgdmFyIHByZXZGaWxsID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKHZhciBpZHggaW4gcGF0aFNldCl7XHJcbiAgICAgICAgICAgIC8v5paw44GX44GE44OR44K544Gu5aeL44G+44KKXHJcbiAgICAgICAgICAgIGlmKCFwcmV2RmlsbCA9PSBwYXRoU2V0W2lkeF0uaXNGaWxsKCkpe1xyXG4gICAgICAgICAgICAgICAgaWYoZmlsbFBhdGhTZXQubGVuZ3RoICE9IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGxQYXRoU2V0LnB1c2godG1wLnNsaWNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRtcCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRtcC5wdXNoKHBhdGhTZXRbaWR4XSk7XHJcbiAgICAgICAgICAgIHByZXZGaWxsID0gcGF0aFNldFtpZHhdLmlzRmlsbCgpO1xyXG4gICAgICAgIH0gIFxyXG4gICAgICAgIFxyXG5cdFx0ZmlsbFBhdGhTZXQucHVzaCh0bXAuc2xpY2UoKSk7XHJcblx0XHRyZXR1cm4gZmlsbFBhdGhTZXRcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhdGhVdGlsOyIsImltcG9ydCBWZWN0b3IyRCBmcm9tICcuLi9nZW9tL1ZlY3RvcjJEJztcclxuXHJcbmNsYXNzIEdseXBoRGF0YXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvYWQoY2FsbGJhY2spe1xyXG4gICAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvZm9udC8nKVxyXG4gICAgICAgIC50aGVuKChyZXNwb25zZSk9PntcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChqc29uKT0+e1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZm9ybWF0UmF3RGF0YShqc29uKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmb3JtYXRSYXdEYXRhKGpzb24pe1xyXG4gICAgICAgIHZhciBkYXRhID0gW107XHJcbiAgICAgICAganNvblswXVtcInBhdGhcIl0ubWFwKHBhdGggPT57XHJcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgcGF0aFsxXS5tYXAocG9pbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IFZlY3RvcjJEKHBvaW50WzBdLHBvaW50WzFdKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpwYXRoWzBdLFxyXG4gICAgICAgICAgICAgICAgXCJwb2ludHNcIjpwb2ludHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnB1c2gob2JqKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdseXBoRGF0YTsiLCJpbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vUmVjdGFuZ2xlJztcclxuaW1wb3J0IFBhdGhVdGlsIGZyb20gJy4uL3NoYXBlL1BhdGhVdGlsJztcclxuaW1wb3J0IEdseXBoRGF0YSBmcm9tICcuLi9kYXRhL0dseXBoRGF0YSc7XHJcblxyXG5jbGFzcyBHbHlwaHtcclxuXHJcblx0Y29uc3RydWN0b3IoZm9udEluZm8pe1xyXG4gICAgICAgIHRoaXMuZm9udEluZm8gPSBmb250SW5mb1xyXG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgXHJcblx0XHR0aGlzLmZpbGxTdHlsZSA9IGByZ2JhKDI1NSwyNTUsMjU1LCR7dGhpcy5vcGFjaXR5fSlgXHJcblx0XHR0aGlzLnN0cm9rZVN0eWxlID0gXCIjZmZmZmZmXCJcclxuXHRcdHRoaXMubGluZVdpZHRoID0gMC41O1xyXG4gICAgICAgIHRoaXMuZ2x5cGggPSBbXTtcclxuICAgICAgICB0aGlzLmFsbFBhdGggPSBbXTtcclxuXHR9XHJcblx0XHJcblx0aW5pdCgpe1xyXG4gICAgICAgIHZhciBwYXRoU2V0ID0gUGF0aFV0aWwuY3JlYXRlUGF0aFNldCh0aGlzLmZvbnRJbmZvKTtcclxuICAgICAgICB0aGlzLmFsbFBhdGggPSBwYXRoU2V0LnNsaWNlKCk7XHJcbiAgICAgICAgUGF0aFV0aWwuaW5pdFBhdGgocGF0aFNldCk7XHJcbiAgICAgICAgdGhpcy5nbHlwaCA9IFBhdGhVdGlsLmNyZWF0ZUZpbGxQYXRoU2V0KHBhdGhTZXQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mbygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRPcGFjaXR5KG9wYWNpdHkpe1xyXG4gICAgICAgIHRoaXMub3BhY2l0eSA9IG9wYWNpdHk7XHJcbiAgICAgICAgdGhpcy5maWxsU3R5bGUgPSBgcmdiYSgyNTUsMjU1LDI1NSwke3RoaXMub3BhY2l0eX0pYFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRSYW5kb20oc2VlZD0yMCl7XHJcbiAgICAgICAgdmFyIGZvbnRJbmZvID0gdGhpcy5mb250SW5mb1xyXG4gICAgICAgIGZvcih2YXIgaWR4IGluIGZvbnRJbmZvLnBhdGgpe1xyXG4gICAgICAgICAgICB2YXIgbGluZUluZm8gPSBmb250SW5mby5wYXRoW2lkeF07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2k8bGluZUluZm9bMV0ubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwO2o8bGluZUluZm9bMV1baV0ubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVJbmZvWzFdW2ldW2pdID0gbGluZUluZm9bMV1baV1bal0gKyBNYXRoLnJhbmRvbSgpKnNlZWQtKHNlZWQvMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbFBhdGgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbGxQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm8oKXtcclxuICAgICAgICB0aGlzLnJlY3RhbmdsZSA9IHRoaXMuZ2V0UmVjdGFuZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBnZXRSZWN0YW5nbGUoKXtcclxuICAgICAgICB2YXIgbWluWCA9IDk5OTk5O1xyXG4gICAgICAgIHZhciBtaW5ZID0gOTk5OTk7XHJcbiAgICAgICAgdmFyIG1heFggPSAtOTk5OTk7XHJcbiAgICAgICAgdmFyIG1heFkgPSAtOTk5OTk7XHJcbiAgICAgICAgdGhpcy5hbGxQYXRoLm1hcChwYXRoID0+IHtcclxuICAgICAgICAgICAgdmFyIHJlY3QgPSBwYXRoLmdldFJlY3RhbmdsZSgpO1xyXG4gICAgICAgICAgICBpZihyZWN0KXtcclxuICAgICAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLHJlY3QubGVmdCk7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCxyZWN0LnJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLHJlY3QudG9wKTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLHJlY3QuYm90dG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKG1pblgsbWluWSxtYXhYLW1pblgsbWF4WS1taW5ZKTtcclxuICAgIH1cclxuICAgIGRyYXdEZWJ1ZyhjdHgpe1xyXG4gICAgICAgIHZhciBwYXRoZXMgPSB0aGlzLmdldEFsbFBhdGgoKTtcclxuICAgICAgICBwYXRoZXMuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICAgICAgcGF0aC5kcmF3RGVidWcoY3R4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih0aGlzLnJlY3RhbmdsZSl7XHJcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5yZWN0YW5nbGU7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhyZWN0LmxlZnQscmVjdC50b3ApO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHJlY3QucmlnaHQscmVjdC50b3ApO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHJlY3QucmlnaHQscmVjdC5ib3R0b20pO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHJlY3QubGVmdCxyZWN0LmJvdHRvbSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocmVjdC5sZWZ0LHJlY3QudG9wKTtcclxuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cdGRyYXcoY3R4KXtcclxuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZVxyXG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2VTdHlsZVxyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aFxyXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aTx0aGlzLmdseXBoLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuZ2x5cGhbaV0ubGVuZ3RoO2orKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdseXBoW2ldW2pdLmRyYXcoY3R4KTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpXHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdseXBoIiwiXHJcbmNsYXNzIE1hdGhVdGlsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYWJzKG51bSl7XHJcbiAgICAgICAgcmV0dXJuIG51bT4wP251bTotbnVtO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG5vcm1hbGl6ZShudW0pe1xyXG4gICAgXHRyZXR1cm4gbnVtL01hdGhVdGlsLmFicyhudW0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJhbmRvbURpcmVjdGlvbigpe1xyXG4gICAgICAgIHJldHVybiAoTWF0aFV0aWwucmFuZG9tSW50KDEpIC0gMC41KSAqIDI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgcmFuZG9tSW50KGEsYj0xKXtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGEgKyAxKSkgKiBiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbFxyXG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL3V0aWwvTWF0aFV0aWxcIjtcclxuXHJcbmNsYXNzIFBhdGhBbmltYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoKXtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMTtcclxuICAgICAgICB0aGlzLnJhdGlvID0gMDtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIHRoaXMucmF0aW9WZWxvY2l0eSA9IHRoaXMuc3BlZWQgLyBwYXRoLmdldExlbmd0aCgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNldFZlbG9jaXR5KHZlbG9jaXR5KXtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5yYXRpb1ZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eSAvIHRoaXMucGF0aC5nZXRMZW5ndGgoKTtcclxuICAgICAgICB0aGlzLnJhdGlvVmVsb2NpdHkgKj0gTWF0aFV0aWwucmFuZG9tRGlyZWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG9zaXRpb24oKXtcclxuICAgICAgICB0aGlzLnJhdGlvICs9IHRoaXMucmF0aW9WZWxvY2l0eTtcclxuICAgICAgICBpZih0aGlzLnJhdGlvID4gMSl7XHJcbiAgICAgICAgICAgIHRoaXMucmF0aW8gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnJhdGlvIDwgMCl7XHJcbiAgICAgICAgICAgIHRoaXMucmF0aW8gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmdldFBvaW50QXQodGhpcy5yYXRpbyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhdGhBbmltYXRpb247IiwiaW1wb3J0IEdseXBoIGZyb20gXCIuLi9nbHlwaC9HbHlwaFwiO1xyXG5pbXBvcnQgR2x5cGhEYXRhIGZyb20gXCIuLi9kYXRhL0dseXBoRGF0YVwiO1xyXG5cclxuXHJcbmNsYXNzIE1haW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gJCgnI2NhbnZhcycpWzBdO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdseXBoO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgdmFyIGdseXBoRGF0YSA9IG5ldyBHbHlwaERhdGEoKTtcclxuICAgICAgICBnbHlwaERhdGEubG9hZCgoZGF0YSk9PntcclxuICAgICAgICAgICAgdGhpcy5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICBcclxuICAgICAgICB2YXIgZyA9IG5ldyBHbHlwaChkYXRhKVxyXG4gICAgICAgIGcuaW5pdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGcuaW5pdFJhbmRvbSgyMClcclxuICAgICAgICBnLnNldE9wYWNpdHkoMC41KTtcclxuICAgICAgICBnLnN0cm9rZVN0eWxlID0gXCIjZmZmZmZmXCJcclxuICAgICAgICBnLmRyYXcoY3R4KTtcclxuICAgICAgICB0aGlzLmdseXBoID0gZztcclxuXHJcbiAgICAgICAgdGhpcy5sb29wKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvb3AoKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCx0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2x5cGguc2V0T3BhY2l0eShNYXRoLnJhbmRvbSgpKTtcclxuICAgICAgICB0aGlzLmdseXBoLmRyYXcoY3R4KTtcclxuICAgICAgICB0aGlzLmdseXBoLmRyYXdEZWJ1ZyhjdHgpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluOyIsImltcG9ydCBHbHlwaCBmcm9tIFwiLi4vZ2x5cGgvR2x5cGhcIjtcclxuaW1wb3J0IFBhdGhBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvbi9QYXRoQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuL01haW5cIjtcclxuXHJcblxyXG5jbGFzcyBNYWluUGFydGljbGUgZXh0ZW5kcyBNYWlue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3BhdGhBbmltYXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5fcmFuZG9tU2VlZFggPSAyMDtcclxuICAgICAgICB0aGlzLl9yYW5kb21TZWVkWSA9IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZGF0YSl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgdmFyIHBhdGg7IFxyXG5cclxuICAgICAgICB2YXIgZyA9IG5ldyBHbHlwaChkYXRhKVxyXG4gICAgICAgIGcuaW5pdCgpO1xyXG4gICAgICAgIGcuc2V0T3BhY2l0eSgwLjUpO1xyXG4gICAgICAgIGcuc3Ryb2tlU3R5bGUgPSBcIiNmZmZmZmZcIlxyXG4gICAgICAgIC8vIGcuZHJhdyhjdHgpO1xyXG4gICAgICAgIHRoaXMuZ2x5cGggPSBnO1xyXG4gICAgICAgIHBhdGggPSBnLmdldEFsbFBhdGgoKTtcclxuICAgICAgICB0aGlzLmxvb3AoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIHBhdGgubWFwKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcGF0aExlbmd0aCA9IGVsZW1lbnQuZ2V0TGVuZ3RoKCk7XHJcbiAgICAgICAgICAgIC8vIHZhciBudW1BbmltID0gTWF0aC5mbG9vcihwYXRoTGVuZ3RoLzEwKTtcclxuICAgICAgICAgICAgdmFyIG51bUFuaW0gPSBNYXRoLmNlaWwocGF0aExlbmd0aC8yMDApO1xyXG4gICAgICAgICAgICAvLyB2YXIgbnVtQW5pbSA9IDE7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7ajxudW1BbmltO2orKyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gbmV3IFBhdGhBbmltYXRpb24oZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ucmF0aW8gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLnNldFZlbG9jaXR5KDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0aEFuaW1hdGlvbnMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmxvb3AoKTtcclxuICAgICAgICBcclxuICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsKGUpPT57XHJcbiAgICAgICAgICAgIHRoaXMuX3JhbmRvbVNlZWRYID0gZS5wYWdlWC8yMDtcclxuICAgICAgICAgICAgdGhpcy5fcmFuZG9tU2VlZFkgPSBlLnBhZ2VZLzIwO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbG9vcCgpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVNlZWRYID0gdGhpcy5fcmFuZG9tU2VlZFg7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tU2VlZFkgPSB0aGlzLl9yYW5kb21TZWVkWTtcclxuICAgICAgICBjb25zdCBwYXRoQW5pbWF0aW9ucyA9IHRoaXMuX3BhdGhBbmltYXRpb25zO1xyXG5cclxuICAgICAgICAvLyBjdHguY2xlYXJSZWN0KDAsMCx0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cGF0aEFuaW1hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4xKVwiO1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gcGF0aEFuaW1hdGlvbnNbaV0udXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHguYXJjKHBvcy54K01hdGgucmFuZG9tKCkqcmFuZG9tU2VlZFgtcmFuZG9tU2VlZFgvMixwb3MueStNYXRoLnJhbmRvbSgpKnJhbmRvbVNlZWRZLXJhbmRvbVNlZWRZLzIsMiwwLE1hdGguUEkqMik7XHJcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5nbHlwaC5kcmF3KGN0eCk7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW5QYXJ0aWNsZTsiLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL3V0aWwvTWF0aFV0aWxcIjtcclxuaW1wb3J0IFZlY3RvcjJEIGZyb20gXCIuLi9nZW9tL1ZlY3RvcjJEXCI7XHJcblxyXG5jbGFzcyBQYXRoQW5pbWF0aW9uRm9yY2V7XHJcbiAgICBjb25zdHJ1Y3Rvcihwb2ludHMpe1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSAxO1xyXG4gICAgICAgIHRoaXMucmF0aW8gPSAwO1xyXG4gICAgICAgIHRoaXMucG9pbnRzID0gcG9pbnRzO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMucG9pbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5uZXh0SW5kZXggPSB0aGlzLmdldE5leHRJbmRleCgpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLnBvaW50c1t0aGlzLmN1cnJlbnRJbmRleF0uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLm5leHRQb3NpdGlvbiA9IHRoaXMucG9pbnRzW3RoaXMubmV4dEluZGV4XTtcclxuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm5leHRJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5uZXh0SW5kZXggPSB0aGlzLmdldE5leHRJbmRleCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRQb3NpdGlvbiA9IHRoaXMucG9pbnRzW3RoaXMubmV4dEluZGV4XTtcclxuICAgICAgICB9LDMwMCk7XHJcbiAgICB9XHJcbiAgICBnZXROZXh0SW5kZXgoKXtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRJbmRleCsxID09IHRoaXMucG9pbnRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50SW5kZXgrMTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBvc2l0aW9uKCl7XHJcbiAgICAgICAgdmFyIHAwID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICB2YXIgcDEgPSB0aGlzLm5leHRQb3NpdGlvbjtcclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBWZWN0b3IyRC5kaXN0YW5jZShwMCxwMSk7XHJcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IFZlY3RvcjJELmRpcmVjdGlvbihwMCxwMSk7XHJcbiAgICAgICAgcDAudnggKz0gZGlyZWN0aW9uLngvNTAwKmRpc3RhbmNlO1xyXG4gICAgICAgIHAwLnZ5ICs9IGRpcmVjdGlvbi55LzUwMCpkaXN0YW5jZTtcclxuICAgICAgICBwMC52eCA9IE1hdGgubWluKDEwMCxwMC52eCkqMC45NTtcclxuICAgICAgICBwMC52eSA9IE1hdGgubWluKDEwMCxwMC52eSkqMC45NTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcDAueCArPSBwMC52eDtcclxuICAgICAgICBwMC55ICs9IHAwLnZ5O1xyXG4gICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHAwO1xyXG4gICAgfVxyXG4gICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGF0aEFuaW1hdGlvbkZvcmNlOyIsImltcG9ydCBHbHlwaCBmcm9tIFwiLi4vZ2x5cGgvR2x5cGhcIjtcclxuaW1wb3J0IFBhdGhBbmltYXRpb25Gb3JjZSBmcm9tIFwiLi4vYW5pbWF0aW9uL1BhdGhBbmltYXRpb25Gb3JjZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi9NYWluXCI7XHJcblxyXG5cclxuY2xhc3MgTWFpblBhcnRpY2xlRm9yY2UgZXh0ZW5kcyBNYWlue1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3BhdGhBbmltYXRpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5fcmFuZG9tU2VlZFggPSAyMDtcclxuICAgICAgICB0aGlzLl9yYW5kb21TZWVkWSA9IDIwO1xyXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoZGF0YSl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgdmFyIHBhdGg7IFxyXG5cclxuICAgICAgICB2YXIgZyA9IG5ldyBHbHlwaChkYXRhKVxyXG4gICAgICAgIGcuaW5pdCgpO1xyXG4gICAgICAgIGcuc2V0T3BhY2l0eSgwLjUpO1xyXG4gICAgICAgIGcuc3Ryb2tlU3R5bGUgPSBcIiNmZmZmZmZcIlxyXG4gICAgICAgIC8vIGcuZHJhdyhjdHgpO1xyXG4gICAgICAgIHRoaXMuZ2x5cGggPSBnO1xyXG4gICAgICAgIHBhdGggPSBnLmdldEFsbFBhdGgoKTtcclxuICAgICAgICB0aGlzLmxvb3AoKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIHBhdGgubWFwKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICB2YXIgcGF0aExlbmd0aCA9IGVsZW1lbnQuZ2V0TGVuZ3RoKCk7XHJcbiAgICAgICAgICAgIHZhciBudW1Qb2ludHMgPSBNYXRoLmNlaWwocGF0aExlbmd0aC81MCk7XHJcbiAgICAgICAgICAgIHZhciByYXRpb1VuaXQgPSAxL251bVBvaW50cztcclxuICAgICAgICAgICAgdmFyIHRtcFBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICAvLyB2YXIgbnVtQW5pbSA9IDE7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7ajxudW1Qb2ludHM7aisrKXtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IGVsZW1lbnQuZ2V0UG9pbnRBdChyYXRpb1VuaXQqaik7XHJcbiAgICAgICAgICAgICAgICB0bXBQb2ludHMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBqID0gMDtqPDEwMDtqKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0aEFuaW1hdGlvbnMucHVzaChuZXcgUGF0aEFuaW1hdGlvbkZvcmNlKHRtcFBvaW50cykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9wb2ludHMucHVzaCh0bXBQb2ludHMpO1xyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICB0aGlzLl9wb2ludHMubWFwKHBvaW50cz0+e1xyXG4gICAgICAgICAgICBwb2ludHMubWFwKHBvaW50PT57XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMylcIjtcclxuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIGN0eC5hcmMocG9pbnQueCxwb2ludC55LDIsMCxNYXRoLlBJKjIpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvb3AoKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsKGUpPT57XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX3JhbmRvbVNlZWRYID0gZS5wYWdlWC8yMDtcclxuICAgICAgICAvLyAgICAgdGhpcy5fcmFuZG9tU2VlZFkgPSBlLnBhZ2VZLzIwO1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbG9vcCgpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMCwwLDAsMC4wMylcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwwLHRoaXMuY2FudmFzLndpZHRoLHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5fcGF0aEFuaW1hdGlvbnMubWFwKGFuaW1hdGlvbj0+e1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gYW5pbWF0aW9uLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSwyNTUsMSlcIjtcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHguYXJjKHBvcy54LHBvcy55LDIsMCxNYXRoLlBJKjIpO1xyXG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpblBhcnRpY2xlRm9yY2U7Il0sIm5hbWVzIjpbIlJlY3RhbmdsZSIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJWZWN0b3IyRCIsInZ4IiwidnkiLCJvcmlnaW5YIiwib3JpZ2luWSIsInAxIiwicDIiLCJ0IiwicG9pbnQiLCJkeCIsImR5IiwiTWF0aCIsInNxcnQiLCJkaXN0IiwiZGlzdGFuY2UiLCJJUGF0aFNlZ21lbnQiLCJwb2ludHMiLCJzdGFydFBvaW50cyIsImN0eCIsInJlY3RhbmdsZSIsInJlY3QiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjbG9zZVBhdGgiLCJzdHJva2UiLCJsZW5ndGgiLCJNb3ZlVG9TZWdtZW50Iiwic3RhcnRQb2ludCIsImNsb25lIiwic2xpY2UiLCJpIiwiTGluZVNlZ21lbnQiLCJ1cGRhdGVMZW5ndGgiLCJnZXRSZWN0YW5nbGUiLCJFcnJvciIsInAwMSIsImludGVycG9sYXRlIiwicDAiLCJhbGxQb2ludHMiLCJtaW4iLCJtYXgiLCJDdWJpY0JlemllclNlZ21lbnQiLCJwIiwicDMiLCJhIiwiYiIsImMiLCJjMCIsImMxIiwiYzIiLCJjMyIsIm4iLCJwb3ciLCJnZXRQb2ludEF0IiwibGVuIiwiYmV6aWVyQ3VydmVUbyIsImQiLCJ2IiwibWluWCIsIm1heFgiLCJtaW5ZIiwibWF4WSIsIl9wMCIsIl9wMSIsIl9wMiIsIl9wMyIsInB1c2giLCJhcHBseSIsIlBhdGgiLCJzZWdtZW50cyIsInNlZ21lbnQiLCJkcmF3IiwiZm9yRWFjaCIsInNlZyIsImRyYXdEZWJ1Z0luZm8iLCJtYXAiLCJnZXRCb3VuZHMiLCJ0b3RhbExlbmd0aCIsImdldExlbmd0aCIsImxlbmd0aENvdW50Iiwib3Zlckxlbmd0aCIsInRhcmdldEluZGV4IiwidGFyZ2V0U2VnbWVudCIsInRhcmdldExlbmd0aCIsInRhcmdldFJhdGlvIiwiUyIsIm5leHQiLCJnZXRFbmRQb2ludCIsIlBhdGhVdGlsIiwiZm9udEluZm8iLCJwYXRoU2V0IiwicGVuTG9jIiwidW5kZWZpbmVkIiwic3RhcnQiLCJpZHgiLCJsaW5lSW5mbyIsInZlY3RvciIsInR5cGUiLCJwYXRoIiwiYWRkIiwidXBkYXRlSW5mbyIsImZpbGxQYXRoU2V0IiwidG1wIiwicHJldkZpbGwiLCJpc0ZpbGwiLCJHbHlwaERhdGEiLCJjYWxsYmFjayIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJmb3JtYXRSYXdEYXRhIiwib2JqIiwiR2x5cGgiLCJvcGFjaXR5IiwiZmlsbFN0eWxlIiwic3Ryb2tlU3R5bGUiLCJsaW5lV2lkdGgiLCJnbHlwaCIsImFsbFBhdGgiLCJjcmVhdGVQYXRoU2V0IiwiaW5pdFBhdGgiLCJjcmVhdGVGaWxsUGF0aFNldCIsInNlZWQiLCJqIiwicmFuZG9tIiwicGF0aGVzIiwiZ2V0QWxsUGF0aCIsImRyYXdEZWJ1ZyIsImZpbGwiLCJNYXRoVXRpbCIsIm51bSIsImFicyIsInJhbmRvbUludCIsImZsb29yIiwiUGF0aEFuaW1hdGlvbiIsInZlbG9jaXR5IiwicmF0aW8iLCJyYXRpb1ZlbG9jaXR5Iiwic3BlZWQiLCJyYW5kb21EaXJlY3Rpb24iLCJNYWluIiwiY2FudmFzIiwiJCIsImdldENvbnRleHQiLCJnbHlwaERhdGEiLCJsb2FkIiwiaW5pdCIsImciLCJzZXRPcGFjaXR5IiwibG9vcCIsImNsZWFyUmVjdCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJpbmQiLCJNYWluUGFydGljbGUiLCJfcGF0aEFuaW1hdGlvbnMiLCJfcmFuZG9tU2VlZFgiLCJfcmFuZG9tU2VlZFkiLCJlbGVtZW50IiwicGF0aExlbmd0aCIsIm51bUFuaW0iLCJjZWlsIiwiYW5pbWF0aW9uIiwic2V0VmVsb2NpdHkiLCJ3aW5kb3ciLCJvbiIsImUiLCJwYWdlWCIsInBhZ2VZIiwicmFuZG9tU2VlZFgiLCJyYW5kb21TZWVkWSIsInBhdGhBbmltYXRpb25zIiwicG9zIiwidXBkYXRlUG9zaXRpb24iLCJhcmMiLCJQSSIsIlBhdGhBbmltYXRpb25Gb3JjZSIsImN1cnJlbnRJbmRleCIsIm5leHRJbmRleCIsImdldE5leHRJbmRleCIsInBvc2l0aW9uIiwibmV4dFBvc2l0aW9uIiwic2V0SW50ZXJ2YWwiLCJkaXJlY3Rpb24iLCJNYWluUGFydGljbGVGb3JjZSIsIl9wb2ludHMiLCJudW1Qb2ludHMiLCJyYXRpb1VuaXQiLCJ0bXBQb2ludHMiLCJmaWxsUmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
