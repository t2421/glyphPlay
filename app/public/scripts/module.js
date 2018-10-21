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
      key: "addRandom",
      value: function addRandom(seed) {
        this.startPoint = new Vector2D(this.startPoint.x + Math.random() * seed - seed / 2, this.startPoint.y + Math.random() * seed - seed / 2);

        for (var i = 0; i < this.points.length; i++) {
          var point = this.points[i];
          this.points[i] = new Vector2D(point.x + Math.random() * seed - seed / 2, point.y + Math.random() * seed - seed / 2);
        }
      }
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
      key: "addRandom",
      value: function addRandom() {
        var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
        this.segments.map(function (segment) {
          segment.addRandom(seed);
        });
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
        this.allPath.map(function (path) {
          path.addRandom(seed);
        });
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

  var MainLine =
  /*#__PURE__*/
  function (_Main) {
    _inherits(MainLine, _Main);

    function MainLine() {
      var _this;

      _classCallCheck(this, MainLine);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MainLine).call(this));
      _this._pathAnimations = [];
      _this._randomSeedX = 20;
      _this._randomSeedY = 20;
      _this._numGlyphs = 10;
      _this._glyphs = [];
      return _this;
    }

    _createClass(MainLine, [{
      key: "init",
      value: function init(data) {
        var ctx = this.ctx;

        for (var i = 0; i < this._numGlyphs; i++) {
          var g = new Glyph(data);
          g.init();
          g.initRandom(70);
          g.setOpacity(0);
          g.strokeStyle = "#ffffff";
          g.draw(ctx);

          this._glyphs.push(g);
        }

        this.loop();
      }
    }, {
      key: "loop",
      value: function loop() {
        var ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // this.glyph.setOpacity(Math.random());

        this._glyphs.map(function (glyph) {
          glyph.draw(ctx);
        });

        requestAnimationFrame(this.loop.bind(this));
      }
    }]);

    return MainLine;
  }(Main);

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
          ctx.fillStyle = "rgba(255,255,255,0.05)";
          var pos = pathAnimations[i].updatePosition();
          ctx.beginPath();
          ctx.arc(pos.x + Math.random() * randomSeedX - randomSeedX / 2, pos.y + Math.random() * randomSeedY - randomSeedY / 2, 2 + Math.random() * 2, 0, Math.PI * 2);
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
  exports.MainLine = MainLine;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvanMvZ2VvbS9SZWN0YW5nbGUuanMiLCIuLi8uLi9zcmMvanMvZ2VvbS9WZWN0b3IyRC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9JUGF0aFNlZ21lbnQuanMiLCIuLi8uLi9zcmMvanMvc2hhcGUvTW92ZVRvU2VnbWVudC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9MaW5lU2VnbWVudC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9DdWJpY0JlemllclNlZ21lbnQuanMiLCIuLi8uLi9zcmMvanMvc2hhcGUvUGF0aC5qcyIsIi4uLy4uL3NyYy9qcy9zaGFwZS9QYXRoVXRpbC5qcyIsIi4uLy4uL3NyYy9qcy9kYXRhL0dseXBoRGF0YS5qcyIsIi4uLy4uL3NyYy9qcy9nbHlwaC9HbHlwaC5qcyIsIi4uLy4uL3NyYy9qcy91dGlsL01hdGhVdGlsLmpzIiwiLi4vLi4vc3JjL2pzL2FuaW1hdGlvbi9QYXRoQW5pbWF0aW9uLmpzIiwiLi4vLi4vc3JjL2pzL2V4YW1wbGVzL01haW4uanMiLCIuLi8uLi9zcmMvanMvZXhhbXBsZXMvTWFpbkxpbmUuanMiLCIuLi8uLi9zcmMvanMvZXhhbXBsZXMvTWFpblBhcnRpY2xlLmpzIiwiLi4vLi4vc3JjL2pzL2FuaW1hdGlvbi9QYXRoQW5pbWF0aW9uRm9yY2UuanMiLCIuLi8uLi9zcmMvanMvZXhhbXBsZXMvTWFpblBhcnRpY2xlRm9yY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUmVjdGFuZ2xle1xyXG4gICAgY29uc3RydWN0b3IoeD0wLHk9MCx3aWR0aD0wLGhlaWdodD0wKXtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubGVmdCA9IHg7XHJcbiAgICAgICAgdGhpcy50b3AgPSB5O1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSB4ICsgd2lkdGg7XHJcbiAgICAgICAgdGhpcy5ib3R0b20gPSB5ICsgaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWN0YW5nbGU7IiwiXHJcbmNsYXNzIFZlY3RvcjJEIHtcclxuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICB0aGlzLnZ4ID0gMDtcclxuICAgICAgICB0aGlzLnZ5ID0gMDtcclxuICAgICAgICB0aGlzLm9yaWdpblggPSB4O1xyXG4gICAgICAgIHRoaXMub3JpZ2luWSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGludGVycG9sYXRlKHAxLCBwMiwgdCkge1xyXG4gICAgICAgIHZhciBwb2ludCA9IG5ldyBWZWN0b3IyRCh0ICogcDEueCArICgxIC0gdCkgKiBwMi54LCB0ICogcDEueSArICgxIC0gdCkgKiBwMi55KTtcclxuICAgICAgICByZXR1cm4gcG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpc3RhbmNlKHAxLHAyKXtcclxuICAgICAgICB2YXIgZHggPSBwMi54IC0gcDEueDtcclxuICAgICAgICB2YXIgZHkgPSBwMi55IC0gcDEueTtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCpkeCtkeSpkeSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRpcmVjdGlvbihwMSxwMil7XHJcbiAgICAgICAgdmFyIGRpc3QgPSBWZWN0b3IyRC5kaXN0YW5jZShwMSxwMik7XHJcbiAgICAgICAgdmFyIGR4ID0gcDIueCAtIHAxLng7XHJcbiAgICAgICAgdmFyIGR5ID0gcDIueSAtIHAxLnk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRChkeC9kaXN0LGR5L2Rpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yMkQ7IiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4uL2dlb20vVmVjdG9yMkQnO1xyXG5jbGFzcyBJUGF0aFNlZ21lbnQge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBnZXRCb3VuZHMoKXt9XHJcbiAgICBnZXRQb2ludEF0KCl7fVxyXG4gICAgZ2V0TGVuZ3RoKCl7fVxyXG4gICAgZHJhdyhjdHgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgYWRkUmFuZG9tKHNlZWQpe1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb2ludCA9IG5ldyBWZWN0b3IyRCh0aGlzLnN0YXJ0UG9pbnQueCtNYXRoLnJhbmRvbSgpKnNlZWQgLSBzZWVkLzIsdGhpcy5zdGFydFBvaW50LnkrTWF0aC5yYW5kb20oKSpzZWVkIC0gc2VlZC8yKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpPHRoaXMucG9pbnRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLnBvaW50c1tpXTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHNbaV0gPSBuZXcgVmVjdG9yMkQocG9pbnQueCArTWF0aC5yYW5kb20oKSpzZWVkIC0gc2VlZC8yLHBvaW50LnkgK01hdGgucmFuZG9tKCkqc2VlZCAtIHNlZWQvMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZHJhd1JhbmRvbSgpe31cclxuICAgIGRyYXdEZWJ1Z0luZm8oY3R4KXtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yZWN0YW5nbGUpe1xyXG4gICAgICAgICAgICB2YXIgcmVjdCA9IHRoaXMucmVjdGFuZ2xlO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8ocmVjdC5sZWZ0LHJlY3QudG9wKTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnJpZ2h0LHJlY3QudG9wKTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnJpZ2h0LHJlY3QuYm90dG9tKTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhyZWN0LmxlZnQscmVjdC5ib3R0b20pO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHJlY3QubGVmdCxyZWN0LnRvcCk7XHJcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdldEVuZFBvaW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzW3RoaXMucG9pbnRzLmxlbmd0aC0xXTtcclxuICAgIH1cclxuICAgIHRyYW5zbGF0ZSgpe31cclxuICAgIGNsb25lKCl7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IElQYXRoU2VnbWVudFxyXG4iLCJpbXBvcnQgSVBhdGhTZWdtZW50IGZyb20gJy4vSVBhdGhTZWdtZW50JztcclxuXHJcbmNsYXNzIE1vdmVUb1NlZ21lbnQgZXh0ZW5kcyBJUGF0aFNlZ21lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0UG9pbnQscG9pbnRzKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBzdGFydFBvaW50LmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHMuc2xpY2UoKTtcclxuICAgIH1cclxuICAgIGdldEJvdW5kcygpe31cclxuICAgIGdldFBvaW50QXQodCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRQb2ludDtcclxuICAgIH1cclxuICAgIGdldExlbmd0aCgpe3JldHVybiAwO31cclxuICAgIGRyYXcoY3R4KXtcclxuICAgICAgICBzdXBlci5kcmF3KGN0eCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLnBvaW50c1swXS54LHRoaXMucG9pbnRzWzBdLnkpXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBkcmF3UmFuZG9tKCl7fVxyXG4gICAgXHJcbiAgICBcclxuICAgIHRyYW5zbGF0ZShkeCxkeSl7XHJcbiAgICAgICAgdmFyIHN0YXJ0UG9pbnQgPSB0aGlzLnN0YXJ0UG9pbnQ7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0UG9pbnQubGVuZ3RoOyBpICs9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFydFBvaW50W2ldICs9IGR4O1xyXG4gICAgICAgICAgICBzdGFydFBvaW50W2kgKyAxXSArPSBkeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkgKz0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvaW50c1tpXSArPSBkeDtcclxuICAgICAgICAgICAgcG9pbnRzW2kgKyAxXSArPSBkeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbG9uZSgpe31cclxufVxyXG5leHBvcnQgZGVmYXVsdCBNb3ZlVG9TZWdtZW50XHJcbiIsImltcG9ydCBJUGF0aFNlZ21lbnQgZnJvbSAnLi9JUGF0aFNlZ21lbnQnO1xyXG5pbXBvcnQgVmVjdG9yMkQgZnJvbSAnLi4vZ2VvbS9WZWN0b3IyRCc7XHJcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9SZWN0YW5nbGUnO1xyXG5cclxuY2xhc3MgTGluZVNlZ21lbnQgZXh0ZW5kcyBJUGF0aFNlZ21lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXJ0UG9pbnQscG9pbnRzKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBzdGFydFBvaW50LmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHMuc2xpY2UoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxlbmd0aCgpO1xyXG4gICAgICAgIHRoaXMucmVjdGFuZ2xlID0gdGhpcy5nZXRSZWN0YW5nbGUoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGdldEJvdW5kcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlY3RhbmdsZTtcclxuICAgIH1cclxuICAgIGdldFBvaW50QXQodCl7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLnN0YXJ0UG9pbnQueCArICh0aGlzLnBvaW50c1swXS54IC0gdGhpcy5zdGFydFBvaW50LngpICogdDtcclxuICAgICAgICB2YXIgeSA9IHRoaXMuc3RhcnRQb2ludC55ICsgKHRoaXMucG9pbnRzWzBdLnkgLSB0aGlzLnN0YXJ0UG9pbnQueSkgKiB0O1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoeCwgeSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVMZW5ndGgoKXtcclxuICAgICAgICB0aGlzLmxlbmd0aCA9IFZlY3RvcjJELmRpc3RhbmNlKHRoaXMucG9pbnRzWzBdLHRoaXMuc3RhcnRQb2ludCk7XHJcbiAgICB9XHJcbiAgICBnZXRMZW5ndGgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBkcmF3KGN0eCl7XHJcbiAgICAgICAgc3VwZXIuZHJhdyhjdHgpO1xyXG4gICAgICAgIC8vIGN0eC5tb3ZlVG8odGhpcy5zdGFydFBvaW50WzBdLHRoaXMuc3RhcnRQb2ludFsxXSlcclxuICAgICAgICBjdHgubGluZVRvKHRoaXMucG9pbnRzWzBdLngsdGhpcy5wb2ludHNbMF0ueSlcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRyYXdSYW5kb20oKXt9XHJcbiAgICBzcGxpdCh0KXtcclxuICAgICAgICBpZiAodCA+IDEgfHwgdCA8IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIwIDw9IHQgPD0gMSDjga7nr4Tlm7LlhoXjgad044KS6Kit5a6a44GX44Gm44CC5YiG5Ymy44GZ44KL44Gj44Gm44Gp44GG44GE44GG44GT44Go44GL44KP44GL44Gj44Gm44KL44Gu77yfXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdCA9IDEgLSB0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBwMDEgPSBWZWN0b3IyRC5pbnRlcnBvbGF0ZSh0aGlzLnN0YXJ0UG9pbnQsIHRoaXMucG9pbnRzWzBdLCB0KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gW25ldyBMaW5lU2VnbWVudCh0aGlzLnN0YXJ0UG9pbnQsIFtwMDFdKSwgbmV3IExpbmVTZWdtZW50KHAwMSwgW3RoaXMucG9pbnRzWzBdXSldO1xyXG4gICAgfVxyXG4gICAgdHJhbnNsYXRlKGR4LGR5KXtcclxuICAgICAgICB2YXIgc3RhcnRQb2ludCA9IHRoaXMuc3RhcnRQb2ludDtcclxuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5wb2ludHM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRQb2ludC5sZW5ndGg7IGkgKz0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXJ0UG9pbnRbaV0gKz0gZHg7XHJcbiAgICAgICAgICAgIHN0YXJ0UG9pbnRbaSArIDFdICs9IGR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSArPSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9pbnRzW2ldICs9IGR4O1xyXG4gICAgICAgICAgICBwb2ludHNbaSArIDFdICs9IGR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJlY3RhbmdsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHAwID0gdGhpcy5zdGFydFBvaW50O1xyXG4gICAgICAgIHZhciBwMSA9IHRoaXMucG9pbnRzWzBdO1xyXG5cclxuICAgICAgICB2YXIgbGVmdCA9IDk5OTk5O1xyXG4gICAgICAgIHZhciByaWdodCA9IC05OTk5OTtcclxuICAgICAgICB2YXIgdG9wID0gOTk5OTk7XHJcbiAgICAgICAgdmFyIGJvdHRvbSA9IC05OTk5OTtcclxuICAgICAgICB2YXIgYWxsUG9pbnRzID0gW107XHJcbiAgICAgICAgYWxsUG9pbnRzWzBdID0gcDA7XHJcbiAgICAgICAgYWxsUG9pbnRzWzFdID0gcDE7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZWZ0ID0gTWF0aC5taW4obGVmdCwgYWxsUG9pbnRzW2ldLngpO1xyXG4gICAgICAgICAgICByaWdodCA9IE1hdGgubWF4KHJpZ2h0LCBhbGxQb2ludHNbaV0ueCk7XHJcbiAgICAgICAgICAgIHRvcCA9IE1hdGgubWluKHRvcCwgYWxsUG9pbnRzW2ldLnkpO1xyXG4gICAgICAgICAgICBib3R0b20gPSBNYXRoLm1heChib3R0b20sIGFsbFBvaW50c1tpXS55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUobGVmdCwgdG9wLCByaWdodCAtIGxlZnQsIGJvdHRvbSAtIHRvcCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsb25lKCl7fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IExpbmVTZWdtZW50XHJcbiIsImltcG9ydCBJUGF0aFNlZ21lbnQgZnJvbSAnLi9JUGF0aFNlZ21lbnQnO1xyXG5pbXBvcnQgeyBWZWN0b3IyRCB9IGZyb20gJy4uL21haW4nO1xyXG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vUmVjdGFuZ2xlJztcclxuXHJcbmNsYXNzIEN1YmljQmV6aWVyU2VnbWVudCBleHRlbmRzIElQYXRoU2VnbWVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhcnRQb2ludCxwb2ludHMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRQb2ludCA9IHN0YXJ0UG9pbnQuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLnBvaW50cyA9IHBvaW50cy5zbGljZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGVuZ3RoKCk7XHJcbiAgICAgICAgdGhpcy5yZWN0YW5nbGUgPSB0aGlzLmdldFJlY3RhbmdsZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0Qm91bmRzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjdGFuZ2xlO1xyXG4gICAgfVxyXG4gICAgZ2V0UG9pbnRBdCh0KXtcclxuICAgICAgICB2YXIgcCA9IG5ldyBWZWN0b3IyRCgwLDApO1xyXG4gICAgICAgIHZhciBwMCA9IHRoaXMuc3RhcnRQb2ludDtcclxuICAgICAgICB2YXIgcDEgPSB0aGlzLnBvaW50c1swXTtcclxuICAgICAgICB2YXIgcDIgPSB0aGlzLnBvaW50c1sxXTtcclxuICAgICAgICB2YXIgcDMgPSB0aGlzLnBvaW50c1syXTtcclxuICAgICAgICB2YXIgYSA9IDEgLSB0O1xyXG4gICAgICAgIHZhciBiID0gYSAqIGE7XHJcbiAgICAgICAgdmFyIGMgPSB0ICogdDtcclxuICAgICAgICB2YXIgYzAgPSBhICogYjtcclxuICAgICAgICB2YXIgYzEgPSAzICogYiAqIHQ7XHJcbiAgICAgICAgdmFyIGMyID0gMyAqIGEgKiBjO1xyXG4gICAgICAgIHZhciBjMyA9IHQgKiBjO1xyXG4gICAgICAgIHAueCA9IHAwLnggKiBjMCArIHAxLnggKiBjMSArIHAyLnggKiBjMiArIHAzLnggKiBjMztcclxuICAgICAgICBwLnkgPSBwMC55ICogYzAgKyBwMS55ICogYzEgKyBwMi55ICogYzIgKyBwMy55ICogYzM7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVMZW5ndGgobj00KXtcclxuICAgICAgICBuID0gTWF0aC5wb3coMiwgbik7XHJcbiAgICAgICAgdmFyIHAwID0gdGhpcy5nZXRQb2ludEF0KDApO1xyXG4gICAgICAgIHZhciBwMTtcclxuICAgICAgICB2YXIgbGVuID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwMSA9IHRoaXMuZ2V0UG9pbnRBdChpIC8gbik7XHJcbiAgICAgICAgICAgIGxlbiArPSBWZWN0b3IyRC5kaXN0YW5jZShwMCwgcDEpO1xyXG4gICAgICAgICAgICBwMC54ID0gcDEueDtcclxuICAgICAgICAgICAgcDAueSA9IHAxLnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuO1xyXG4gICAgfVxyXG4gICAgZ2V0TGVuZ3RoKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgZHJhdyhjdHgpe1xyXG4gICAgICAgIHN1cGVyLmRyYXcoY3R4KTtcclxuICAgICAgICBcclxuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh0aGlzLnBvaW50c1swXS54LHRoaXMucG9pbnRzWzBdLnksdGhpcy5wb2ludHNbMV0ueCx0aGlzLnBvaW50c1sxXS55LHRoaXMucG9pbnRzWzJdLngsdGhpcy5wb2ludHNbMl0ueSlcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGRyYXdSYW5kb20oKXt9XHJcbiAgICBnZXRSZWN0YW5nbGUoKXtcclxuICAgICAgICB2YXIgYSwgYiwgYywgZDtcclxuXHRcdFx0dmFyIHQsIHAgPSBuZXcgVmVjdG9yMkQoKTtcclxuXHRcdFx0dmFyIHYgPSBbXTtcclxuXHRcdFx0dmFyIG1pblgsIG1heFgsIG1pblksIG1heFk7XHJcblx0XHRcdHZhciBwMCA9IHRoaXMuc3RhcnRQb2ludDtcclxuICAgICAgICAgICAgdmFyIHAxID0gdGhpcy5wb2ludHNbMF07XHJcbiAgICAgICAgICAgIHZhciBwMiA9IHRoaXMucG9pbnRzWzFdO1xyXG4gICAgICAgICAgICB2YXIgcDMgPSB0aGlzLnBvaW50c1syXTtcclxuXHJcblx0XHRcdHZhciBfcDAgPSBuZXcgVmVjdG9yMkQocDAueCwgcDAueSk7XHJcblx0XHRcdHZhciBfcDEgPSBuZXcgVmVjdG9yMkQocDEueCwgcDEueSk7XHJcblx0XHRcdHZhciBfcDIgPSBuZXcgVmVjdG9yMkQocDIueCwgcDIueSk7XHJcblx0XHRcdHZhciBfcDMgPSBuZXcgVmVjdG9yMkQocDMueCwgcDMueSk7XHJcblx0XHRcdHYgPSBbX3AwLngsIF9wMy54XTtcclxuXHRcdFx0YiA9IDYgKiBfcDAueCAtIDEyICogX3AxLnggKyA2ICogX3AyLng7XHJcblx0XHRcdGEgPSAtMyAqIF9wMC54ICsgOSAqIF9wMS54IC0gOSAqIF9wMi54ICsgMyAqIF9wMy54O1xyXG5cdFx0XHRjID0gMyAqIF9wMS54IC0gMyAqIF9wMC54O1xyXG5cdFx0XHRpZiAoYSA9PSAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWYgKGIgIT0gMClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0ID0gLWMgLyBiO1xyXG5cdFx0XHRcdFx0aWYgKDAgPCB0ICYmIHQgPCAxKVxyXG5cdFx0XHRcdFx0XHR2LnB1c2godGhpcy5nZXRQb2ludEF0KHQsIHApLngpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdHtcclxuXHRcdFx0XHRkID0gYiAqIGIgLSA0ICogYyAqIGE7XHJcblx0XHRcdFx0aWYgKGQgPj0gMClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhICo9IDI7XHJcblx0XHRcdFx0XHRkID0gTWF0aC5zcXJ0KGQpO1xyXG5cdFx0XHRcdFx0dCA9ICgtYiArIGQpIC8gYTtcclxuXHRcdFx0XHRcdGlmICgwIDwgdCAmJiB0IDwgMSlcclxuXHRcdFx0XHRcdFx0di5wdXNoKHRoaXMuZ2V0UG9pbnRBdCh0LCBwKS54KTtcclxuXHRcdFx0XHRcdHQgPSAoLWIgLSBkKSAvIGE7XHJcblx0XHRcdFx0XHRpZiAoMCA8IHQgJiYgdCA8IDEpXHJcblx0XHRcdFx0XHRcdHYucHVzaCh0aGlzLmdldFBvaW50QXQodCwgcCkueCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdG1pblggPSBNYXRoLm1pbi5hcHBseShudWxsLCB2KTtcclxuXHRcdFx0bWF4WCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIHYpO1xyXG5cdFx0XHRcclxuXHRcdFx0diA9IFtfcDAueSwgX3AzLnldO1xyXG5cdFx0XHRiID0gNiAqIF9wMC55IC0gMTIgKiBfcDEueSArIDYgKiBfcDIueTtcclxuXHRcdFx0YSA9IC0zICogX3AwLnkgKyA5ICogX3AxLnkgLSA5ICogX3AyLnkgKyAzICogX3AzLnk7XHJcblx0XHRcdGMgPSAzICogX3AxLnkgLSAzICogX3AwLnk7XHJcblx0XHRcdGlmIChhID09IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZiAoYiAhPSAwKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHQgPSAtYyAvIGI7XHJcblx0XHRcdFx0XHRpZiAoMCA8IHQgJiYgdCA8IDEpXHJcblx0XHRcdFx0XHRcdHYucHVzaCh0aGlzLmdldFBvaW50QXQodCwgcCkueSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGQgPSBiICogYiAtIDQgKiBjICogYTtcclxuXHRcdFx0XHRpZiAoZCA+PSAwKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGEgKj0gMjtcclxuXHRcdFx0XHRcdGQgPSBNYXRoLnNxcnQoZCk7XHJcblx0XHRcdFx0XHR0ID0gKC1iICsgZCkgLyBhO1xyXG5cdFx0XHRcdFx0aWYgKDAgPCB0ICYmIHQgPCAxKVxyXG5cdFx0XHRcdFx0XHR2LnB1c2godGhpcy5nZXRQb2ludEF0KHQsIHApLnkpO1xyXG5cdFx0XHRcdFx0dCA9ICgtYiAtIGQpIC8gYTtcclxuXHRcdFx0XHRcdGlmICgwIDwgdCAmJiB0IDwgMSlcclxuXHRcdFx0XHRcdFx0di5wdXNoKHRoaXMuZ2V0UG9pbnRBdCh0LCBwKS55KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdG1pblkgPSBNYXRoLm1pbi5hcHBseShudWxsLCB2KTtcclxuXHRcdFx0bWF4WSA9IE1hdGgubWF4LmFwcGx5KG51bGwsIHYpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIG5ldyBSZWN0YW5nbGUobWluWCwgbWluWSwgTWF0aC5tYXgoMWUtNSwgbWF4WCAtIG1pblgpLCBNYXRoLm1heCgxZS01LCBtYXhZIC0gbWluWSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0cmFuc2xhdGUoZHgsZHkpe1xyXG4gICAgICAgIHZhciBzdGFydFBvaW50ID0gdGhpcy5zdGFydFBvaW50O1xyXG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydFBvaW50Lmxlbmd0aDsgaSArPSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhcnRQb2ludFtpXSArPSBkeDtcclxuICAgICAgICAgICAgc3RhcnRQb2ludFtpICsgMV0gKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb2ludHNbaV0gKz0gZHg7XHJcbiAgICAgICAgICAgIHBvaW50c1tpICsgMV0gKz0gZHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xvbmUoKXt9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ3ViaWNCZXppZXJTZWdtZW50XHJcbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9SZWN0YW5nbGUnO1xyXG5cclxuY2xhc3MgUGF0aCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzID0gW107XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBhZGQoc2VnbWVudCl7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpXHJcbiAgICB9XHJcbiAgICB1cGRhdGVJbmZvKCl7XHJcbiAgICAgICAgdGhpcy5yZWN0YW5nbGUgPSB0aGlzLmdldFJlY3RhbmdsZSgpO1xyXG4gICAgfVxyXG4gICAgZHJhdyhjdHgpe1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLnNlZ21lbnRzLmxlbmd0aDtcclxuICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTxsZW47aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zZWdtZW50c1tpXS5kcmF3KGN0eCk7ICAgXHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG4gICAgZHJhd0RlYnVnKGN0eCl7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cy5mb3JFYWNoKHNlZyA9PiB7XHJcbiAgICAgICAgICAgIHNlZy5kcmF3RGVidWdJbmZvKGN0eCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXRSZWN0YW5nbGUoKXtcclxuICAgICAgICB2YXIgbWluWCA9IDk5OTk5O1xyXG4gICAgICAgIHZhciBtaW5ZID0gOTk5OTk7XHJcbiAgICAgICAgdmFyIG1heFggPSAtOTk5OTk7XHJcbiAgICAgICAgdmFyIG1heFkgPSAtOTk5OTk7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cy5tYXAoc2VnbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHZhciByZWN0ID0gc2VnbWVudC5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgaWYocmVjdCl7XHJcbiAgICAgICAgICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCxyZWN0LmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgscmVjdC5yaWdodCk7XHJcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSxyZWN0LnRvcCk7XHJcbiAgICAgICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSxyZWN0LmJvdHRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShtaW5YLG1pblksbWF4WC1taW5YLG1heFktbWluWSk7XHJcbiAgICB9XHJcbiAgICBnZXRQb2ludEF0KHQpe1xyXG4gICAgICAgIHZhciB0b3RhbExlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRvdGFsTGVuZ3RoKnQ7XHJcbiAgICAgICAgdmFyIGxlbmd0aENvdW50ID0gMDtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgIFxyXG4gICAgICAgIHdoaWxlKGxlbmd0aCA+IGxlbmd0aENvdW50KXtcclxuICAgICAgICAgICAgbGVuZ3RoQ291bnQgKz0gdGhpcy5zZWdtZW50c1tpXS5nZXRMZW5ndGgoKTtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb3Zlckxlbmd0aCA9IGxlbmd0aENvdW50LWxlbmd0aDtcclxuICAgICAgICB2YXIgdGFyZ2V0SW5kZXggPSBpIC0gMTtcclxuICAgICAgICBpZih0YXJnZXRJbmRleDwwKXtcclxuICAgICAgICAgICAgdGFyZ2V0SW5kZXg9MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldFNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzW3RhcmdldEluZGV4XTtcclxuICAgICAgICB2YXIgdGFyZ2V0TGVuZ3RoID0gdGFyZ2V0U2VnbWVudC5nZXRMZW5ndGgoKTtcclxuICAgICAgICB2YXIgdGFyZ2V0UmF0aW8gPSAodGFyZ2V0TGVuZ3RoLW92ZXJMZW5ndGgpL3RhcmdldExlbmd0aDtcclxuICAgICAgICB2YXIgcG9pbnQgPSB0YXJnZXRTZWdtZW50LmdldFBvaW50QXQodGFyZ2V0UmF0aW8pO1xyXG4gICAgICAgIHJldHVybiBwb2ludDtcclxuICAgIH1cclxuICAgIHVwZGF0ZUxlbmd0aCgpe1xyXG4gICAgICAgIHZhciBsZW4gPSAwO1xyXG4gICAgICAgIGZvcih2YXIgaSA9MDsgaTx0aGlzLnNlZ21lbnRzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBsZW4gKz0gdGhpcy5zZWdtZW50c1tpXS5nZXRMZW5ndGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW47XHJcbiAgICB9XHJcbiAgICBnZXRMZW5ndGgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBhZGRSYW5kb20oc2VlZD0yMCl7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cy5tYXAoc2VnbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHNlZ21lbnQuYWRkUmFuZG9tKHNlZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaXNGaWxsKCl7XHJcbiAgICAgICAgdmFyIFNcdD0gMDtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5zZWdtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IGkrMTtcclxuICAgICAgICAgICAgaWYoaSA9PSBsZW4tMSl7XHJcbiAgICAgICAgICAgICAgICBuZXh0ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcDEgPSB0aGlzLnNlZ21lbnRzW25leHRdLmdldEVuZFBvaW50KCk7XHJcbiAgICAgICAgICAgIHZhciBwMCA9IHRoaXMuc2VnbWVudHNbaV0uZ2V0RW5kUG9pbnQoKTtcclxuICAgICAgICAgICAgUyArPSBwMC54ICogcDEueSAtIHAxLnggKiBwMC55OyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUzwwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFBhdGhcclxuIiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4uL2dlb20vVmVjdG9yMkQnO1xyXG5pbXBvcnQgTW92ZVRvU2VnbWVudCBmcm9tICcuLi9zaGFwZS9Nb3ZlVG9TZWdtZW50JztcclxuaW1wb3J0IExpbmVTZWdtZW50IGZyb20gJy4uL3NoYXBlL0xpbmVTZWdtZW50JztcclxuaW1wb3J0IEN1YmljQmV6aWVyU2VnbWVudCBmcm9tICcuLi9zaGFwZS9DdWJpY0JlemllclNlZ21lbnQnO1xyXG5pbXBvcnQgUGF0aCBmcm9tICcuLi9zaGFwZS9QYXRoJztcclxuXHJcbmNsYXNzIFBhdGhVdGlse1xyXG4gICAgc3RhdGljIGNyZWF0ZVBhdGhTZXQoZm9udEluZm8pe1xyXG4gICAgICAgIHZhciBwYXRoU2V0ID0gW107XHJcbiAgICAgICAgdmFyIHBlbkxvYyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB2YXIgc3RhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpZHggaW4gZm9udEluZm8pe1xyXG4gICAgICAgICAgICB2YXIgbGluZUluZm8gPSBmb250SW5mb1tpZHhdO1xyXG4gICAgICAgICAgICB2YXIgdmVjdG9yID0gbGluZUluZm8ucG9pbnRzO1xyXG5cclxuICAgICAgICAgICAgaWYobGluZUluZm8udHlwZSA9PSBcIm1vdmVUb1wiKXtcclxuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gbmV3IFBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHBlbkxvYyA9IHZlY3RvclswXVxyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSB2ZWN0b3JbMF07XHJcbiAgICAgICAgICAgICAgICBwYXRoLmFkZChuZXcgTW92ZVRvU2VnbWVudChwZW5Mb2MsdmVjdG9yKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsaW5lSW5mby50eXBlID09IFwibGluZVRvXCIpe1xyXG4gICAgICAgICAgICAgICAgcGF0aC5hZGQobmV3IExpbmVTZWdtZW50KHBlbkxvYyx2ZWN0b3IpKTtcclxuICAgICAgICAgICAgICAgIHBlbkxvYyA9IHZlY3RvclswXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGxpbmVJbmZvLnR5cGUgPT0gXCJjdXJ2ZVRvXCIpe1xyXG4gICAgICAgICAgICAgICAgcGF0aC5hZGQobmV3IEN1YmljQmV6aWVyU2VnbWVudChwZW5Mb2MsdmVjdG9yKSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcGVuTG9jID0gdmVjdG9yWzJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobGluZUluZm8udHlwZSA9PSBcImNsb3NlUGF0aFwiKXtcclxuICAgICAgICAgICAgICAgIHBhdGguYWRkKG5ldyBMaW5lU2VnbWVudChwZW5Mb2MsW3N0YXJ0XSkpO1xyXG4gICAgICAgICAgICAgICAgcGF0aFNldC5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIHBhdGhTZXRcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5pdFBhdGgocGF0aFNldCl7XHJcbiAgICAgICAgcGF0aFNldC5tYXAocGF0aCA9PiB7XHJcbiAgICAgICAgICAgIHBhdGgudXBkYXRlTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgIHBhdGgudXBkYXRlSW5mbygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5aGX44KK44Go5oqc44GN44KS5ZCr44KB44Gf44OR44K544Gu44K744OD44OI44KS5L2c5oiQXHJcbiAgICBzdGF0aWMgY3JlYXRlRmlsbFBhdGhTZXQocGF0aFNldCl7XHJcblx0XHR2YXIgZmlsbFBhdGhTZXQgPSBbXTtcclxuXHRcdHZhciB0bXAgPSBbXTtcclxuICAgICAgICB2YXIgcHJldkZpbGwgPSBmYWxzZTtcclxuICAgICAgICBmb3IodmFyIGlkeCBpbiBwYXRoU2V0KXtcclxuICAgICAgICAgICAgLy/mlrDjgZfjgYTjg5Hjgrnjga7lp4vjgb7jgopcclxuICAgICAgICAgICAgaWYoIXByZXZGaWxsID09IHBhdGhTZXRbaWR4XS5pc0ZpbGwoKSl7XHJcbiAgICAgICAgICAgICAgICBpZihmaWxsUGF0aFNldC5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbFBhdGhTZXQucHVzaCh0bXAuc2xpY2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG1wID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG1wLnB1c2gocGF0aFNldFtpZHhdKTtcclxuICAgICAgICAgICAgcHJldkZpbGwgPSBwYXRoU2V0W2lkeF0uaXNGaWxsKCk7XHJcbiAgICAgICAgfSAgXHJcbiAgICAgICAgXHJcblx0XHRmaWxsUGF0aFNldC5wdXNoKHRtcC5zbGljZSgpKTtcclxuXHRcdHJldHVybiBmaWxsUGF0aFNldFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGF0aFV0aWw7IiwiaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4uL2dlb20vVmVjdG9yMkQnO1xyXG5cclxuY2xhc3MgR2x5cGhEYXRhe1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbG9hZChjYWxsYmFjayl7XHJcbiAgICAgICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9mb250LycpXHJcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4oKGpzb24pPT57XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5mb3JtYXRSYXdEYXRhKGpzb24pO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZvcm1hdFJhd0RhdGEoanNvbil7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBbXTtcclxuICAgICAgICBqc29uWzBdW1wicGF0aFwiXS5tYXAocGF0aCA9PntcclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICBwYXRoWzFdLm1hcChwb2ludCA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMucHVzaChuZXcgVmVjdG9yMkQocG9pbnRbMF0scG9pbnRbMV0pKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOnBhdGhbMF0sXHJcbiAgICAgICAgICAgICAgICBcInBvaW50c1wiOnBvaW50c1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChvYmopO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2x5cGhEYXRhOyIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9SZWN0YW5nbGUnO1xyXG5pbXBvcnQgUGF0aFV0aWwgZnJvbSAnLi4vc2hhcGUvUGF0aFV0aWwnO1xyXG5pbXBvcnQgR2x5cGhEYXRhIGZyb20gJy4uL2RhdGEvR2x5cGhEYXRhJztcclxuXHJcbmNsYXNzIEdseXBoe1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihmb250SW5mbyl7XHJcbiAgICAgICAgdGhpcy5mb250SW5mbyA9IGZvbnRJbmZvXHJcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gMTtcclxuICAgICAgICBcclxuXHRcdHRoaXMuZmlsbFN0eWxlID0gYHJnYmEoMjU1LDI1NSwyNTUsJHt0aGlzLm9wYWNpdHl9KWBcclxuXHRcdHRoaXMuc3Ryb2tlU3R5bGUgPSBcIiNmZmZmZmZcIlxyXG5cdFx0dGhpcy5saW5lV2lkdGggPSAwLjU7XHJcbiAgICAgICAgdGhpcy5nbHlwaCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYWxsUGF0aCA9IFtdO1xyXG5cdH1cclxuXHRcclxuXHRpbml0KCl7XHJcbiAgICAgICAgdmFyIHBhdGhTZXQgPSBQYXRoVXRpbC5jcmVhdGVQYXRoU2V0KHRoaXMuZm9udEluZm8pO1xyXG4gICAgICAgIHRoaXMuYWxsUGF0aCA9IHBhdGhTZXQuc2xpY2UoKTtcclxuICAgICAgICBQYXRoVXRpbC5pbml0UGF0aChwYXRoU2V0KTtcclxuICAgICAgICB0aGlzLmdseXBoID0gUGF0aFV0aWwuY3JlYXRlRmlsbFBhdGhTZXQocGF0aFNldCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldE9wYWNpdHkob3BhY2l0eSl7XHJcbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgICAgICB0aGlzLmZpbGxTdHlsZSA9IGByZ2JhKDI1NSwyNTUsMjU1LCR7dGhpcy5vcGFjaXR5fSlgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFJhbmRvbShzZWVkPTIwKXtcclxuICAgICAgICB0aGlzLmFsbFBhdGgubWFwKHBhdGggPT4ge1xyXG4gICAgICAgICAgICBwYXRoLmFkZFJhbmRvbShzZWVkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbFBhdGgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hbGxQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm8oKXtcclxuICAgICAgICB0aGlzLnJlY3RhbmdsZSA9IHRoaXMuZ2V0UmVjdGFuZ2xlKCk7XHJcbiAgICB9XHJcbiAgICBnZXRSZWN0YW5nbGUoKXtcclxuICAgICAgICB2YXIgbWluWCA9IDk5OTk5O1xyXG4gICAgICAgIHZhciBtaW5ZID0gOTk5OTk7XHJcbiAgICAgICAgdmFyIG1heFggPSAtOTk5OTk7XHJcbiAgICAgICAgdmFyIG1heFkgPSAtOTk5OTk7XHJcbiAgICAgICAgdGhpcy5hbGxQYXRoLm1hcChwYXRoID0+IHtcclxuICAgICAgICAgICAgdmFyIHJlY3QgPSBwYXRoLmdldFJlY3RhbmdsZSgpO1xyXG4gICAgICAgICAgICBpZihyZWN0KXtcclxuICAgICAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLHJlY3QubGVmdCk7XHJcbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCxyZWN0LnJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLHJlY3QudG9wKTtcclxuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLHJlY3QuYm90dG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKG1pblgsbWluWSxtYXhYLW1pblgsbWF4WS1taW5ZKTtcclxuICAgIH1cclxuICAgIGRyYXdEZWJ1ZyhjdHgpe1xyXG4gICAgICAgIHZhciBwYXRoZXMgPSB0aGlzLmdldEFsbFBhdGgoKTtcclxuICAgICAgICBwYXRoZXMuZm9yRWFjaChwYXRoID0+IHtcclxuICAgICAgICAgICAgcGF0aC5kcmF3RGVidWcoY3R4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih0aGlzLnJlY3RhbmdsZSl7XHJcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5yZWN0YW5nbGU7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhyZWN0LmxlZnQscmVjdC50b3ApO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHJlY3QucmlnaHQscmVjdC50b3ApO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHJlY3QucmlnaHQscmVjdC5ib3R0b20pO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKHJlY3QubGVmdCxyZWN0LmJvdHRvbSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocmVjdC5sZWZ0LHJlY3QudG9wKTtcclxuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cdGRyYXcoY3R4KXtcclxuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZVxyXG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2VTdHlsZVxyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aFxyXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aTx0aGlzLmdseXBoLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBmb3IodmFyIGo9MDtqPHRoaXMuZ2x5cGhbaV0ubGVuZ3RoO2orKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdseXBoW2ldW2pdLmRyYXcoY3R4KTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpXHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdseXBoIiwiXHJcbmNsYXNzIE1hdGhVdGlsIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYWJzKG51bSl7XHJcbiAgICAgICAgcmV0dXJuIG51bT4wP251bTotbnVtO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG5vcm1hbGl6ZShudW0pe1xyXG4gICAgXHRyZXR1cm4gbnVtL01hdGhVdGlsLmFicyhudW0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJhbmRvbURpcmVjdGlvbigpe1xyXG4gICAgICAgIHJldHVybiAoTWF0aFV0aWwucmFuZG9tSW50KDEpIC0gMC41KSAqIDI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgcmFuZG9tSW50KGEsYj0xKXtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGEgKyAxKSkgKiBiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXRoVXRpbFxyXG4iLCJpbXBvcnQgTWF0aFV0aWwgZnJvbSBcIi4uL3V0aWwvTWF0aFV0aWxcIjtcclxuXHJcbmNsYXNzIFBhdGhBbmltYXRpb257XHJcbiAgICBjb25zdHJ1Y3RvcihwYXRoKXtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gMTtcclxuICAgICAgICB0aGlzLnJhdGlvID0gMDtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIHRoaXMucmF0aW9WZWxvY2l0eSA9IHRoaXMuc3BlZWQgLyBwYXRoLmdldExlbmd0aCgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNldFZlbG9jaXR5KHZlbG9jaXR5KXtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdmVsb2NpdHk7XHJcbiAgICAgICAgdGhpcy5yYXRpb1ZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eSAvIHRoaXMucGF0aC5nZXRMZW5ndGgoKTtcclxuICAgICAgICB0aGlzLnJhdGlvVmVsb2NpdHkgKj0gTWF0aFV0aWwucmFuZG9tRGlyZWN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUG9zaXRpb24oKXtcclxuICAgICAgICB0aGlzLnJhdGlvICs9IHRoaXMucmF0aW9WZWxvY2l0eTtcclxuICAgICAgICBpZih0aGlzLnJhdGlvID4gMSl7XHJcbiAgICAgICAgICAgIHRoaXMucmF0aW8gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnJhdGlvIDwgMCl7XHJcbiAgICAgICAgICAgIHRoaXMucmF0aW8gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoLmdldFBvaW50QXQodGhpcy5yYXRpbyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhdGhBbmltYXRpb247IiwiaW1wb3J0IEdseXBoIGZyb20gXCIuLi9nbHlwaC9HbHlwaFwiO1xyXG5pbXBvcnQgR2x5cGhEYXRhIGZyb20gXCIuLi9kYXRhL0dseXBoRGF0YVwiO1xyXG5cclxuXHJcbmNsYXNzIE1haW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gJCgnI2NhbnZhcycpWzBdO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmdseXBoO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgdmFyIGdseXBoRGF0YSA9IG5ldyBHbHlwaERhdGEoKTtcclxuICAgICAgICBnbHlwaERhdGEubG9hZCgoZGF0YSk9PntcclxuICAgICAgICAgICAgdGhpcy5pbml0KGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICBcclxuICAgICAgICB2YXIgZyA9IG5ldyBHbHlwaChkYXRhKVxyXG4gICAgICAgIGcuaW5pdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGcuaW5pdFJhbmRvbSgyMClcclxuICAgICAgICBnLnNldE9wYWNpdHkoMC41KTtcclxuICAgICAgICBnLnN0cm9rZVN0eWxlID0gXCIjZmZmZmZmXCJcclxuICAgICAgICBnLmRyYXcoY3R4KTtcclxuICAgICAgICB0aGlzLmdseXBoID0gZztcclxuXHJcbiAgICAgICAgdGhpcy5sb29wKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvb3AoKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCx0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2x5cGguc2V0T3BhY2l0eShNYXRoLnJhbmRvbSgpKTtcclxuICAgICAgICB0aGlzLmdseXBoLmRyYXcoY3R4KTtcclxuICAgICAgICB0aGlzLmdseXBoLmRyYXdEZWJ1ZyhjdHgpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluOyIsImltcG9ydCBHbHlwaCBmcm9tIFwiLi4vZ2x5cGgvR2x5cGhcIjtcclxuaW1wb3J0IFBhdGhBbmltYXRpb24gZnJvbSBcIi4uL2FuaW1hdGlvbi9QYXRoQW5pbWF0aW9uXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuL01haW5cIjtcclxuXHJcblxyXG5jbGFzcyBNYWluTGluZSBleHRlbmRzIE1haW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fcGF0aEFuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9yYW5kb21TZWVkWCA9IDIwO1xyXG4gICAgICAgIHRoaXMuX3JhbmRvbVNlZWRZID0gMjA7XHJcbiAgICAgICAgdGhpcy5fbnVtR2x5cGhzID0gMTA7XHJcbiAgICAgICAgdGhpcy5fZ2x5cGhzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5fbnVtR2x5cGhzO2krKyl7XHJcbiAgICAgICAgICAgIHZhciBnID0gbmV3IEdseXBoKGRhdGEpXHJcbiAgICAgICAgICAgIGcuaW5pdCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZy5pbml0UmFuZG9tKDcwKVxyXG4gICAgICAgICAgICBnLnNldE9wYWNpdHkoMCk7XHJcbiAgICAgICAgICAgIGcuc3Ryb2tlU3R5bGUgPSBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgICBnLmRyYXcoY3R4KTtcclxuICAgICAgICAgICAgdGhpcy5fZ2x5cGhzLnB1c2goZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9vcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvb3AoKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsMCx0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIC8vIHRoaXMuZ2x5cGguc2V0T3BhY2l0eShNYXRoLnJhbmRvbSgpKTtcclxuICAgICAgICB0aGlzLl9nbHlwaHMubWFwKGdseXBoID0+e1xyXG4gICAgICAgICAgICBnbHlwaC5kcmF3KGN0eCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgIFxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluTGluZTsiLCJpbXBvcnQgR2x5cGggZnJvbSBcIi4uL2dseXBoL0dseXBoXCI7XHJcbmltcG9ydCBQYXRoQW5pbWF0aW9uIGZyb20gXCIuLi9hbmltYXRpb24vUGF0aEFuaW1hdGlvblwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi9NYWluXCI7XHJcblxyXG5cclxuY2xhc3MgTWFpblBhcnRpY2xlIGV4dGVuZHMgTWFpbntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9wYXRoQW5pbWF0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3JhbmRvbVNlZWRYID0gMjA7XHJcbiAgICAgICAgdGhpcy5fcmFuZG9tU2VlZFkgPSAyMDtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KGRhdGEpe1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuY3R4O1xyXG4gICAgICAgIHZhciBwYXRoOyBcclxuXHJcbiAgICAgICAgdmFyIGcgPSBuZXcgR2x5cGgoZGF0YSlcclxuICAgICAgICBnLmluaXQoKTtcclxuICAgICAgICBnLnNldE9wYWNpdHkoMC41KTtcclxuICAgICAgICBnLnN0cm9rZVN0eWxlID0gXCIjZmZmZmZmXCJcclxuICAgICAgICAvLyBnLmRyYXcoY3R4KTtcclxuICAgICAgICB0aGlzLmdseXBoID0gZztcclxuICAgICAgICBwYXRoID0gZy5nZXRBbGxQYXRoKCk7XHJcbiAgICAgICAgdGhpcy5sb29wKCk7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICBwYXRoLm1hcChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgdmFyIHBhdGhMZW5ndGggPSBlbGVtZW50LmdldExlbmd0aCgpO1xyXG4gICAgICAgICAgICAvLyB2YXIgbnVtQW5pbSA9IE1hdGguZmxvb3IocGF0aExlbmd0aC8xMCk7XHJcbiAgICAgICAgICAgIHZhciBudW1BbmltID0gTWF0aC5jZWlsKHBhdGhMZW5ndGgvMjAwKTtcclxuICAgICAgICAgICAgLy8gdmFyIG51bUFuaW0gPSAxO1xyXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwO2o8bnVtQW5pbTtqKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IG5ldyBQYXRoQW5pbWF0aW9uKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLnJhdGlvID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5zZXRWZWxvY2l0eSgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhdGhBbmltYXRpb25zLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5sb29wKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLChlKT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9yYW5kb21TZWVkWCA9IGUucGFnZVgvMjA7XHJcbiAgICAgICAgICAgIHRoaXMuX3JhbmRvbVNlZWRZID0gZS5wYWdlWS8yMDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGxvb3AoKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICAgICBjb25zdCByYW5kb21TZWVkWCA9IHRoaXMuX3JhbmRvbVNlZWRYO1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVNlZWRZID0gdGhpcy5fcmFuZG9tU2VlZFk7XHJcbiAgICAgICAgY29uc3QgcGF0aEFuaW1hdGlvbnMgPSB0aGlzLl9wYXRoQW5pbWF0aW9ucztcclxuICAgICAgICBcclxuICAgICAgICAvLyBjdHguY2xlYXJSZWN0KDAsMCx0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8cGF0aEFuaW1hdGlvbnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4wNSlcIjtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IHBhdGhBbmltYXRpb25zW2ldLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LmFyYyhwb3MueCtNYXRoLnJhbmRvbSgpKnJhbmRvbVNlZWRYLXJhbmRvbVNlZWRYLzIscG9zLnkrTWF0aC5yYW5kb20oKSpyYW5kb21TZWVkWS1yYW5kb21TZWVkWS8yLDIrTWF0aC5yYW5kb20oKSoyLDAsTWF0aC5QSSoyKTtcclxuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmdseXBoLmRyYXcoY3R4KTtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFpblBhcnRpY2xlOyIsImltcG9ydCBNYXRoVXRpbCBmcm9tIFwiLi4vdXRpbC9NYXRoVXRpbFwiO1xyXG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4uL2dlb20vVmVjdG9yMkRcIjtcclxuXHJcbmNsYXNzIFBhdGhBbmltYXRpb25Gb3JjZXtcclxuICAgIGNvbnN0cnVjdG9yKHBvaW50cyl7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5yYXRpbyA9IDA7XHJcbiAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5wb2ludHMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLm5leHRJbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9pbnRzW3RoaXMuY3VycmVudEluZGV4XS5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMubmV4dFBvc2l0aW9uID0gdGhpcy5wb2ludHNbdGhpcy5uZXh0SW5kZXhdO1xyXG5cclxuICAgICAgICBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLm5leHRJbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dFBvc2l0aW9uID0gdGhpcy5wb2ludHNbdGhpcy5uZXh0SW5kZXhdO1xyXG4gICAgICAgIH0sMzAwKTtcclxuICAgIH1cclxuICAgIGdldE5leHRJbmRleCgpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudEluZGV4KzEgPT0gdGhpcy5wb2ludHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRJbmRleCsxO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUG9zaXRpb24oKXtcclxuICAgICAgICB2YXIgcDAgPSB0aGlzLnBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBwMSA9IHRoaXMubmV4dFBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IFZlY3RvcjJELmRpc3RhbmNlKHAwLHAxKTtcclxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gVmVjdG9yMkQuZGlyZWN0aW9uKHAwLHAxKTtcclxuICAgICAgICBwMC52eCArPSBkaXJlY3Rpb24ueC81MDAqZGlzdGFuY2U7XHJcbiAgICAgICAgcDAudnkgKz0gZGlyZWN0aW9uLnkvNTAwKmRpc3RhbmNlO1xyXG4gICAgICAgIHAwLnZ4ID0gTWF0aC5taW4oMTAwLHAwLnZ4KSowLjk1O1xyXG4gICAgICAgIHAwLnZ5ID0gTWF0aC5taW4oMTAwLHAwLnZ5KSowLjk1O1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBwMC54ICs9IHAwLnZ4O1xyXG4gICAgICAgIHAwLnkgKz0gcDAudnk7XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gcDA7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXRoQW5pbWF0aW9uRm9yY2U7IiwiaW1wb3J0IEdseXBoIGZyb20gXCIuLi9nbHlwaC9HbHlwaFwiO1xyXG5pbXBvcnQgUGF0aEFuaW1hdGlvbkZvcmNlIGZyb20gXCIuLi9hbmltYXRpb24vUGF0aEFuaW1hdGlvbkZvcmNlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuL01haW5cIjtcclxuXHJcblxyXG5jbGFzcyBNYWluUGFydGljbGVGb3JjZSBleHRlbmRzIE1haW57XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fcGF0aEFuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9yYW5kb21TZWVkWCA9IDIwO1xyXG4gICAgICAgIHRoaXMuX3JhbmRvbVNlZWRZID0gMjA7XHJcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhKXtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmN0eDtcclxuICAgICAgICB2YXIgcGF0aDsgXHJcblxyXG4gICAgICAgIHZhciBnID0gbmV3IEdseXBoKGRhdGEpXHJcbiAgICAgICAgZy5pbml0KCk7XHJcbiAgICAgICAgZy5zZXRPcGFjaXR5KDAuNSk7XHJcbiAgICAgICAgZy5zdHJva2VTdHlsZSA9IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgLy8gZy5kcmF3KGN0eCk7XHJcbiAgICAgICAgdGhpcy5nbHlwaCA9IGc7XHJcbiAgICAgICAgcGF0aCA9IGcuZ2V0QWxsUGF0aCgpO1xyXG4gICAgICAgIHRoaXMubG9vcCgpO1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgcGF0aC5tYXAoZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoTGVuZ3RoID0gZWxlbWVudC5nZXRMZW5ndGgoKTtcclxuICAgICAgICAgICAgdmFyIG51bVBvaW50cyA9IE1hdGguY2VpbChwYXRoTGVuZ3RoLzUwKTtcclxuICAgICAgICAgICAgdmFyIHJhdGlvVW5pdCA9IDEvbnVtUG9pbnRzO1xyXG4gICAgICAgICAgICB2YXIgdG1wUG9pbnRzID0gW107XHJcbiAgICAgICAgICAgIC8vIHZhciBudW1BbmltID0gMTtcclxuICAgICAgICAgICAgZm9yKHZhciBqID0gMDtqPG51bVBvaW50cztqKyspe1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gZWxlbWVudC5nZXRQb2ludEF0KHJhdGlvVW5pdCpqKTtcclxuICAgICAgICAgICAgICAgIHRtcFBvaW50cy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwO2o8MTAwO2orKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXRoQW5pbWF0aW9ucy5wdXNoKG5ldyBQYXRoQW5pbWF0aW9uRm9yY2UodG1wUG9pbnRzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHRtcFBvaW50cyk7XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3BvaW50cy5tYXAocG9pbnRzPT57XHJcbiAgICAgICAgICAgIHBvaW50cy5tYXAocG9pbnQ9PntcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4zKVwiO1xyXG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmFyYyhwb2ludC54LHBvaW50LnksMiwwLE1hdGguUEkqMik7XHJcbiAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9vcCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vICQod2luZG93KS5vbignbW91c2Vtb3ZlJywoZSk9PntcclxuICAgICAgICAvLyAgICAgdGhpcy5fcmFuZG9tU2VlZFggPSBlLnBhZ2VYLzIwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9yYW5kb21TZWVkWSA9IGUucGFnZVkvMjA7XHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxuXHJcbiAgICBsb29wKCl7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5jdHg7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgwLDAsMCwwLjAzKVwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9wYXRoQW5pbWF0aW9ucy5tYXAoYW5pbWF0aW9uPT57XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSBhbmltYXRpb24udXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5hcmMocG9zLngscG9zLnksMiwwLE1hdGguUEkqMik7XHJcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYWluUGFydGljbGVGb3JjZTsiXSwibmFtZXMiOlsiUmVjdGFuZ2xlIiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsIlZlY3RvcjJEIiwidngiLCJ2eSIsIm9yaWdpblgiLCJvcmlnaW5ZIiwicDEiLCJwMiIsInQiLCJwb2ludCIsImR4IiwiZHkiLCJNYXRoIiwic3FydCIsImRpc3QiLCJkaXN0YW5jZSIsIklQYXRoU2VnbWVudCIsImN0eCIsInNlZWQiLCJzdGFydFBvaW50IiwicmFuZG9tIiwiaSIsInBvaW50cyIsImxlbmd0aCIsInJlY3RhbmdsZSIsInJlY3QiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjbG9zZVBhdGgiLCJzdHJva2UiLCJNb3ZlVG9TZWdtZW50IiwiY2xvbmUiLCJzbGljZSIsIkxpbmVTZWdtZW50IiwidXBkYXRlTGVuZ3RoIiwiZ2V0UmVjdGFuZ2xlIiwiRXJyb3IiLCJwMDEiLCJpbnRlcnBvbGF0ZSIsInAwIiwiYWxsUG9pbnRzIiwibWluIiwibWF4IiwiQ3ViaWNCZXppZXJTZWdtZW50IiwicCIsInAzIiwiYSIsImIiLCJjIiwiYzAiLCJjMSIsImMyIiwiYzMiLCJuIiwicG93IiwiZ2V0UG9pbnRBdCIsImxlbiIsImJlemllckN1cnZlVG8iLCJkIiwidiIsIm1pblgiLCJtYXhYIiwibWluWSIsIm1heFkiLCJfcDAiLCJfcDEiLCJfcDIiLCJfcDMiLCJwdXNoIiwiYXBwbHkiLCJQYXRoIiwic2VnbWVudHMiLCJzZWdtZW50IiwiZHJhdyIsImZvckVhY2giLCJzZWciLCJkcmF3RGVidWdJbmZvIiwibWFwIiwiZ2V0Qm91bmRzIiwidG90YWxMZW5ndGgiLCJnZXRMZW5ndGgiLCJsZW5ndGhDb3VudCIsIm92ZXJMZW5ndGgiLCJ0YXJnZXRJbmRleCIsInRhcmdldFNlZ21lbnQiLCJ0YXJnZXRMZW5ndGgiLCJ0YXJnZXRSYXRpbyIsImFkZFJhbmRvbSIsIlMiLCJuZXh0IiwiZ2V0RW5kUG9pbnQiLCJQYXRoVXRpbCIsImZvbnRJbmZvIiwicGF0aFNldCIsInBlbkxvYyIsInVuZGVmaW5lZCIsInN0YXJ0IiwiaWR4IiwibGluZUluZm8iLCJ2ZWN0b3IiLCJ0eXBlIiwicGF0aCIsImFkZCIsInVwZGF0ZUluZm8iLCJmaWxsUGF0aFNldCIsInRtcCIsInByZXZGaWxsIiwiaXNGaWxsIiwiR2x5cGhEYXRhIiwiY2FsbGJhY2siLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiZm9ybWF0UmF3RGF0YSIsIm9iaiIsIkdseXBoIiwib3BhY2l0eSIsImZpbGxTdHlsZSIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwiZ2x5cGgiLCJhbGxQYXRoIiwiY3JlYXRlUGF0aFNldCIsImluaXRQYXRoIiwiY3JlYXRlRmlsbFBhdGhTZXQiLCJwYXRoZXMiLCJnZXRBbGxQYXRoIiwiZHJhd0RlYnVnIiwiaiIsImZpbGwiLCJNYXRoVXRpbCIsIm51bSIsImFicyIsInJhbmRvbUludCIsImZsb29yIiwiUGF0aEFuaW1hdGlvbiIsInZlbG9jaXR5IiwicmF0aW8iLCJyYXRpb1ZlbG9jaXR5Iiwic3BlZWQiLCJyYW5kb21EaXJlY3Rpb24iLCJNYWluIiwiY2FudmFzIiwiJCIsImdldENvbnRleHQiLCJnbHlwaERhdGEiLCJsb2FkIiwiaW5pdCIsImciLCJzZXRPcGFjaXR5IiwibG9vcCIsImNsZWFyUmVjdCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJpbmQiLCJNYWluTGluZSIsIl9wYXRoQW5pbWF0aW9ucyIsIl9yYW5kb21TZWVkWCIsIl9yYW5kb21TZWVkWSIsIl9udW1HbHlwaHMiLCJfZ2x5cGhzIiwiaW5pdFJhbmRvbSIsIk1haW5QYXJ0aWNsZSIsImVsZW1lbnQiLCJwYXRoTGVuZ3RoIiwibnVtQW5pbSIsImNlaWwiLCJhbmltYXRpb24iLCJzZXRWZWxvY2l0eSIsIndpbmRvdyIsIm9uIiwiZSIsInBhZ2VYIiwicGFnZVkiLCJyYW5kb21TZWVkWCIsInJhbmRvbVNlZWRZIiwicGF0aEFuaW1hdGlvbnMiLCJwb3MiLCJ1cGRhdGVQb3NpdGlvbiIsImFyYyIsIlBJIiwiUGF0aEFuaW1hdGlvbkZvcmNlIiwiY3VycmVudEluZGV4IiwibmV4dEluZGV4IiwiZ2V0TmV4dEluZGV4IiwicG9zaXRpb24iLCJuZXh0UG9zaXRpb24iLCJzZXRJbnRlcnZhbCIsImRpcmVjdGlvbiIsIk1haW5QYXJ0aWNsZUZvcmNlIiwiX3BvaW50cyIsIm51bVBvaW50cyIsInJhdGlvVW5pdCIsInRtcFBvaW50cyIsImZpbGxSZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBTUEsWUFDRixxQkFBcUM7RUFBQSxNQUF6QkMsQ0FBeUIsdUVBQXZCLENBQXVCO0VBQUEsTUFBckJDLENBQXFCLHVFQUFuQixDQUFtQjtFQUFBLE1BQWpCQyxLQUFpQix1RUFBWCxDQUFXO0VBQUEsTUFBVEMsTUFBUyx1RUFBRixDQUFFOztFQUFBOztFQUNqQyxPQUFLSCxDQUFMLEdBQVNBLENBQVQ7RUFDQSxPQUFLQyxDQUFMLEdBQVNBLENBQVQ7RUFDQSxPQUFLQyxLQUFMLEdBQWFBLEtBQWI7RUFDQSxPQUFLQyxN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
