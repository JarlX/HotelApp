(function () {
    var d;
    window.AmCharts ? d = window.AmCharts : (d = {}, window.AmCharts = d, d.themes = {}, d.maps = {}, d.inheriting = {}, d.charts = [], d.onReadyArray = [], d.useUTC = !1, d.updateRate = 60, d.uid = 0, d.lang = {}, d.translations = {}, d.mapTranslations = {}, d.windows = {}, d.initHandlers = [], d.amString = "am", d.pmString = "pm");
    d.Class = function (a) {
        var b = function () {
            arguments[0] !== d.inheriting && (this.events = {}, this.construct.apply(this, arguments))
        };
        a.inherits ? (b.prototype = new a.inherits(d.inheriting), b.base = a.inherits.prototype, delete a.inherits) :
            (b.prototype.createEvents = function () {
                for (var a = 0; a < arguments.length; a++) this.events[arguments[a]] = []
            }, b.prototype.listenTo = function (a, b, c) {
                this.removeListener(a, b, c);
                a.events[b].push({handler: c, scope: this})
            }, b.prototype.addListener = function (a, b, c) {
                this.removeListener(this, a, b);
                a && this.events[a] && this.events[a].push({handler: b, scope: c})
            }, b.prototype.removeListener = function (a, b, c) {
                if (a && a.events && (a = a.events[b])) for (b = a.length - 1; 0 <= b; b--) a[b].handler === c && a.splice(b, 1)
            }, b.prototype.fire = function (a) {
                for (var b =
                    this.events[a.type], c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.handler.call(d.scope, a)
                }
            });
        for (var c in a) b.prototype[c] = a[c];
        return b
    };
    d.addChart = function (a) {
        window.requestAnimationFrame ? d.animationRequested || (d.animationRequested = !0, window.requestAnimationFrame(d.update)) : d.updateInt || (d.updateInt = setInterval(function () {
            d.update()
        }, Math.round(1E3 / d.updateRate)));
        d.charts.push(a)
    };
    d.removeChart = function (a) {
        for (var b = d.charts, c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1);
        0 === b.length && (d.requestAnimation && (window.cancelAnimationFrame(d.requestAnimation),
            d.animationRequested = !1), d.updateInt && (clearInterval(d.updateInt), d.updateInt = NaN))
    };
    d.isModern = !0;
    d.getIEVersion = function () {
        var a = 0, b, c;
        "Microsoft Internet Explorer" == navigator.appName && (b = navigator.userAgent, c = /MSIE ([0-9]{1,}[.0-9]{0,})/, null !== c.exec(b) && (a = parseFloat(RegExp.$1)));
        return a
    };
    d.applyLang = function (a, b) {
        var c = d.translations;
        b.dayNames = d.extend({}, d.dayNames);
        b.shortDayNames = d.extend({}, d.shortDayNames);
        b.monthNames = d.extend({}, d.monthNames);
        b.shortMonthNames = d.extend({}, d.shortMonthNames);
        b.amString = "am";
        b.pmString = "pm";
        c && (c = c[a]) && (d.lang = c, b.langObj = c, c.monthNames && (b.dayNames = d.extend({}, c.dayNames), b.shortDayNames = d.extend({}, c.shortDayNames), b.monthNames = d.extend({}, c.monthNames), b.shortMonthNames = d.extend({}, c.shortMonthNames)), c.am && (b.amString = c.am), c.pm && (b.pmString = c.pm));
        d.amString = b.amString;
        d.pmString = b.pmString
    };
    d.IEversion = d.getIEVersion();
    9 > d.IEversion && 0 < d.IEversion && (d.isModern = !1, d.isIE = !0);
    d.dx = 0;
    d.dy = 0;
    if (document.addEventListener || window.opera) d.isNN = !0, d.isIE =
        !1, d.dx = .5, d.dy = .5;
    document.attachEvent && (d.isNN = !1, d.isIE = !0, d.isModern || (d.dx = 0, d.dy = 0));
    window.chrome && (d.chrome = !0);
    d.handleMouseUp = function (a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            e && e.handleReleaseOutside && e.handleReleaseOutside(a)
        }
    };
    d.handleMouseMove = function (a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            e && e.handleMouseMove && e.handleMouseMove(a)
        }
    };
    d.handleKeyUp = function (a) {
        for (var b = d.charts, c = 0; c < b.length; c++) {
            var e = b[c];
            e && e.handleKeyUp && e.handleKeyUp(a)
        }
    };
    d.handleWheel =
        function (a) {
            for (var b = d.charts, c = 0; c < b.length; c++) {
                var e = b[c];
                if (e && e.mouseIsOver) {
                    (e.mouseWheelScrollEnabled || e.mouseWheelZoomEnabled) && e.handleWheel && (e.handleMouseMove(a), e.handleWheel(a));
                    break
                }
            }
        };
    d.resetMouseOver = function () {
        for (var a = d.charts, b = 0; b < a.length; b++) {
            var c = a[b];
            c && (c.mouseIsOver = !1)
        }
    };
    d.ready = function (a) {
        d.onReadyArray.push(a)
    };
    d.handleLoad = function () {
        d.isReady = !0;
        for (var a = d.onReadyArray, b = 0; b < a.length; b++) {
            var c = a[b];
            isNaN(d.processDelay) ? c() : setTimeout(c, d.processDelay * b)
        }
        d.onReadyArray =
            []
    };
    d.addInitHandler = function (a, b) {
        d.initHandlers.push({method: a, types: b})
    };
    d.callInitHandler = function (a) {
        var b = d.initHandlers;
        if (d.initHandlers) for (var c = 0; c < b.length; c++) {
            var e = b[c];
            e.types ? d.isInArray(e.types, a.type) && e.method(a) : e.method(a)
        }
    };
    d.getUniqueId = function () {
        d.uid++;
        return "AmChartsEl-" + d.uid
    };
    d.addGlobalListeners = function () {
        d.globalListenersAdded || (d.globalListenersAdded = !0, d.isNN && (document.addEventListener("mousemove", d.handleMouseMove), document.addEventListener("keyup", d.handleKeyUp),
            document.addEventListener("mouseup", d.handleMouseUp, !0), window.addEventListener("load", d.handleLoad, !0)), d.isIE && (document.attachEvent("onmousemove", d.handleMouseMove), document.attachEvent("onmouseup", d.handleMouseUp), window.attachEvent("onload", d.handleLoad)))
    };
    d.addGlobalListeners();
    d.addWheelListeners = function () {
        d.wheelIsListened || (d.isNN && (window.addEventListener("DOMMouseScroll", d.handleWheel, !0), document.addEventListener("mousewheel", d.handleWheel, !0)), d.isIE && document.attachEvent("onmousewheel",
            d.handleWheel));
        d.wheelIsListened = !0
    };
    d.clear = function () {
        var a = d.charts;
        if (a) for (var b = a.length - 1; 0 <= b; b--) a[b].clear();
        d.updateInt && clearInterval(d.updateInt);
        d.requestAnimation && window.cancelAnimationFrame(d.requestAnimation);
        d.charts = [];
        d.isNN && (document.removeEventListener("mousemove", d.handleMouseMove, !0), document.removeEventListener("keyup", d.handleKeyUp, !0), document.removeEventListener("mouseup", d.handleMouseUp, !0), window.removeEventListener("load", d.handleLoad, !0), window.removeEventListener("DOMMouseScroll",
            d.handleWheel, !0), document.removeEventListener("mousewheel", d.handleWheel, !0));
        d.isIE && (document.detachEvent("onmousemove", d.handleMouseMove), document.detachEvent("onmouseup", d.handleMouseUp), window.detachEvent("onload", d.handleLoad));
        d.globalListenersAdded = !1;
        d.wheelIsListened = !1
    };
    d.makeChart = function (a, b, c) {
        var e = b.type, g = b.theme;
        d.addGlobalListeners();
        d.isString(g) && (g = d.themes[g], b.theme = g);
        var f;
        switch (e) {
            case "serial":
                f = new d.AmSerialChart(g);
                break;
            case "xy":
                f = new d.AmXYChart(g);
                break;
            case "pie":
                f =
                    new d.AmPieChart(g);
                break;
            case "radar":
                f = new d.AmRadarChart(g);
                break;
            case "gauge":
                f = new d.AmAngularGauge(g);
                break;
            case "funnel":
                f = new d.AmFunnelChart(g);
                break;
            case "map":
                f = new d.AmMap(g);
                break;
            case "stock":
                f = new d.AmStockChart(g);
                break;
            case "gantt":
                f = new d.AmGanttChart(g)
        }
        d.extend(f, b);
        d.isReady ? isNaN(c) ? f.write(a) : setTimeout(function () {
            d.realWrite(f, a)
        }, c) : d.ready(function () {
            isNaN(c) ? f.write(a) : setTimeout(function () {
                d.realWrite(f, a)
            }, c)
        });
        return f
    };
    d.realWrite = function (a, b) {
        a.write(b)
    };
    d.updateCount =
        0;
    d.validateAt = Math.round(d.updateRate / 10);
    d.update = function () {
        var a = d.charts;
        d.updateCount++;
        var b = !1;
        d.updateCount == d.validateAt && (b = !0, d.updateCount = 0);
        if (a) for (var c = a.length - 1; 0 <= c; c--) a[c].update && a[c].update(), b && (a[c].autoResize ? a[c].validateSize && a[c].validateSize() : a[c].premeasure && a[c].premeasure());
        window.requestAnimationFrame && (d.requestAnimation = window.requestAnimationFrame(d.update))
    };
    "complete" == document.readyState && d.handleLoad()
})();
(function () {
    var d = window.AmCharts;
    d.toBoolean = function (a, b) {
        if (void 0 === a) return b;
        switch (String(a).toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return !0;
            case "false":
            case "no":
            case "0":
            case null:
                return !1;
            default:
                return !!a
        }
    };
    d.removeFromArray = function (a, b) {
        var c;
        if (void 0 !== b && void 0 !== a) for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1)
    };
    d.getPath = function () {
        var a = document.getElementsByTagName("script");
        if (a) for (var b = 0; b < a.length; b++) {
            var c = a[b].src;
            if (-1 !== c.search(/\/(amcharts|ammap)\.js/)) return c.replace(/\/(amcharts|ammap)\.js.*/,
                "/")
        }
    };
    d.normalizeUrl = function (a) {
        return "" !== a && -1 === a.search(/\/$/) ? a + "/" : a
    };
    d.isAbsolute = function (a) {
        return 0 === a.search(/^http[s]?:|^\//)
    };
    d.isInArray = function (a, b) {
        for (var c = 0; c < a.length; c++) if (a[c] == b) return !0;
        return !1
    };
    d.getDecimals = function (a) {
        var b = 0;
        isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length));
        return b
    };
    d.wordwrap = function (a, b, c, e) {
        var g, f, h, k;
        a += "";
        if (1 > b) return a;
        g = -1;
        for (a = (k = a.split(/\r\n|\n|\r/)).length; ++g < a; k[g] +=
            h) {
            h = k[g];
            for (k[g] = ""; h.length > b; k[g] += d.trim(h.slice(0, f)) + ((h = h.slice(f)).length ? c : "")) f = 2 == e || (f = h.slice(0, b + 1).match(/\S*(\s)?$/))[1] ? b : f.input.length - f[0].length || 1 == e && b || f.input.length + (f = h.slice(b).match(/^\S*/))[0].length;
            h = d.trim(h)
        }
        return k.join(c)
    };
    d.trim = function (a) {
        return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    };
    d.wrappedText = function (a, b, c, e, g, f, h, k) {
        var l = d.text(a, b, c, e, g, f, h);
        if (l) {
            var m = l.getBBox();
            if (m.width > k) {
                var n = "\n";
                d.isModern || (n = "<br>");
                k = Math.floor(k / (m.width /
                    b.length));
                2 < k && (k -= 2);
                b = d.wordwrap(b, k, n, !0);
                l.remove();
                l = d.text(a, b, c, e, g, f, h)
            }
        }
        return l
    };
    d.getStyle = function (a, b) {
        var c = "";
        if (document.defaultView && document.defaultView.getComputedStyle) try {
            c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b)
        } catch (e) {
        } else a.currentStyle && (b = b.replace(/\-(\w)/g, function (a, b) {
            return b.toUpperCase()
        }), c = a.currentStyle[b]);
        return c
    };
    d.removePx = function (a) {
        if (void 0 !== a) return Number(a.substring(0, a.length - 2))
    };
    d.getURL = function (a, b) {
        if (a) if ("_self" !=
            b && b) if ("_top" == b && window.top) window.top.location.href = a; else if ("_parent" == b && window.parent) window.parent.location.href = a; else if ("_blank" == b) window.open(a); else {
            var c = document.getElementsByName(b)[0];
            c ? c.src = a : (c = d.windows[b]) ? c.opener && !c.opener.closed ? c.location.href = a : d.windows[b] = window.open(a) : d.windows[b] = window.open(a)
        } else window.location.href = a
    };
    d.ifArray = function (a) {
        return a && "object" == typeof a && 0 < a.length ? !0 : !1
    };
    d.callMethod = function (a, b) {
        var c;
        for (c = 0; c < b.length; c++) {
            var e = b[c];
            if (e) {
                if (e[a]) e[a]();
                var d = e.length;
                if (0 < d) {
                    var f;
                    for (f = 0; f < d; f++) {
                        var h = e[f];
                        if (h && h[a]) h[a]()
                    }
                }
            }
        }
    };
    d.toNumber = function (a) {
        return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
    };
    d.toColor = function (a) {
        if ("" !== a && void 0 !== a) if (-1 != a.indexOf(",")) {
            a = a.split(",");
            var b;
            for (b = 0; b < a.length; b++) {
                var c = a[b].substring(a[b].length - 6, a[b].length);
                a[b] = "#" + c
            }
        } else a = a.substring(a.length - 6, a.length), a = "#" + a;
        return a
    };
    d.toCoordinate = function (a, b, c) {
        var e;
        void 0 !== a && (a = String(a), c && c < b && (b = c), e = Number(a), -1 != a.indexOf("!") &&
        (e = b - Number(a.substr(1))), -1 != a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100));
        return e
    };
    d.fitToBounds = function (a, b, c) {
        a < b && (a = b);
        a > c && (a = c);
        return a
    };
    d.isDefined = function (a) {
        return void 0 === a ? !1 : !0
    };
    d.stripNumbers = function (a) {
        return a.replace(/[0-9]+/g, "")
    };
    d.roundTo = function (a, b) {
        if (0 > b) return a;
        var c = Math.pow(10, b);
        return Math.round(a * c) / c
    };
    d.toFixed = function (a, b) {
        var c = !1;
        0 > a && (c = !0, a = Math.abs(a));
        var e = String(Math.round(a * Math.pow(10, b)));
        if (0 < b) {
            var d = e.length;
            if (d < b) {
                var f;
                for (f = 0; f <
                b - d; f++) e = "0" + e
            }
            d = e.substring(0, e.length - b);
            "" === d && (d = 0);
            e = d + "." + e.substring(e.length - b, e.length);
            return c ? "-" + e : e
        }
        return String(e)
    };
    d.formatDuration = function (a, b, c, e, g, f) {
        var h = d.intervals, k = f.decimalSeparator;
        if (a >= h[b].contains) {
            var l = a - Math.floor(a / h[b].contains) * h[b].contains;
            "ss" == b ? (l = d.formatNumber(l, f), 1 == l.split(k)[0].length && (l = "0" + l)) : l = d.roundTo(l, f.precision);
            ("mm" == b || "hh" == b) && 10 > l && (l = "0" + l);
            c = l + "" + e[b] + "" + c;
            a = Math.floor(a / h[b].contains);
            b = h[b].nextInterval;
            return d.formatDuration(a,
                b, c, e, g, f)
        }
        "ss" == b && (a = d.formatNumber(a, f), 1 == a.split(k)[0].length && (a = "0" + a));
        "mm" == b && (a = d.roundTo(a, f.precision));
        ("mm" == b || "hh" == b) && 10 > a && (a = "0" + a);
        c = a + "" + e[b] + "" + c;
        if (h[g].count > h[b].count) for (a = h[b].count; a < h[g].count; a++) b = h[b].nextInterval, "ss" == b || "mm" == b || "hh" == b ? c = "00" + e[b] + "" + c : "DD" == b && (c = "0" + e[b] + "" + c);
        ":" == c.charAt(c.length - 1) && (c = c.substring(0, c.length - 1));
        return c
    };
    d.formatNumber = function (a, b, c, e, g) {
        a = d.roundTo(a, b.precision);
        isNaN(c) && (c = b.precision);
        var f = b.decimalSeparator;
        b =
            b.thousandsSeparator;
        void 0 == f && (f = ",");
        void 0 == b && (b = " ");
        var h;
        h = 0 > a ? "-" : "";
        a = Math.abs(a);
        var k = String(a), l = !1;
        -1 != k.indexOf("e") && (l = !0);
        0 <= c && !l && (k = d.toFixed(a, c));
        var m = "";
        if (l) m = k; else {
            var k = k.split("."), l = String(k[0]), n;
            for (n = l.length; 0 <= n; n -= 3) m = n != l.length ? 0 !== n ? l.substring(n - 3, n) + b + m : l.substring(n - 3, n) + m : l.substring(n - 3, n);
            void 0 !== k[1] && (m = m + f + k[1]);
            void 0 !== c && 0 < c && "0" != m && (m = d.addZeroes(m, f, c))
        }
        m = h + m;
        "" === h && !0 === e && 0 !== a && (m = "+" + m);
        !0 === g && (m += "%");
        return m
    };
    d.addZeroes = function (a,
                            b, c) {
        a = a.split(b);
        void 0 === a[1] && 0 < c && (a[1] = "0");
        return a[1].length < c ? (a[1] += "0", d.addZeroes(a[0] + b + a[1], b, c)) : void 0 !== a[1] ? a[0] + b + a[1] : a[0]
    };
    d.scientificToNormal = function (a) {
        var b;
        a = String(a).split("e");
        var c;
        if ("-" == a[1].substr(0, 1)) {
            b = "0.";
            for (c = 0; c < Math.abs(Number(a[1])) - 1; c++) b += "0";
            b += a[0].split(".").join("")
        } else {
            var e = 0;
            b = a[0].split(".");
            b[1] && (e = b[1].length);
            b = a[0].split(".").join("");
            for (c = 0; c < Math.abs(Number(a[1])) - e; c++) b += "0"
        }
        return b
    };
    d.toScientific = function (a, b) {
        if (0 === a) return "0";
        var c = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E), e = String(e).split(".").join(b);
        return String(e) + "e" + c
    };
    d.randomColor = function () {
        return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6)
    };
    d.hitTest = function (a, b, c) {
        var e = !1, g = a.x, f = a.x + a.width, h = a.y, k = a.y + a.height, l = d.isInRectangle;
        e || (e = l(g, h, b));
        e || (e = l(g, k, b));
        e || (e = l(f, h, b));
        e || (e = l(f, k, b));
        e || !0 === c || (e = d.hitTest(b, a, !0));
        return e
    };
    d.isInRectangle = function (a, b, c) {
        return a >= c.x - 5 && a <= c.x + c.width + 5 && b >= c.y - 5 && b <= c.y + c.height + 5 ?
            !0 : !1
    };
    d.isPercents = function (a) {
        if (-1 != String(a).indexOf("%")) return !0
    };
    d.formatValue = function (a, b, c, e, g, f, h, k) {
        if (b) {
            void 0 === g && (g = "");
            var l;
            for (l = 0; l < c.length; l++) {
                var m = c[l], n = b[m];
                void 0 !== n && (n = f ? d.addPrefix(n, k, h, e) : d.formatNumber(n, e), a = a.replace(new RegExp("\\[\\[" + g + "" + m + "\\]\\]", "g"), n))
            }
        }
        return a
    };
    d.formatDataContextValue = function (a, b) {
        if (a) {
            var c = a.match(/\[\[.*?\]\]/g), e;
            for (e = 0; e < c.length; e++) {
                var d = c[e], d = d.substr(2, d.length - 4);
                void 0 !== b[d] && (a = a.replace(new RegExp("\\[\\[" + d + "\\]\\]",
                    "g"), b[d]))
            }
        }
        return a
    };
    d.massReplace = function (a, b) {
        for (var c in b) if (b.hasOwnProperty(c)) {
            var e = b[c];
            void 0 === e && (e = "");
            a = a.replace(c, e)
        }
        return a
    };
    d.cleanFromEmpty = function (a) {
        return a.replace(/\[\[[^\]]*\]\]/g, "")
    };
    d.addPrefix = function (a, b, c, e, g) {
        var f = d.formatNumber(a, e), h = "", k, l, m;
        if (0 === a) return "0";
        0 > a && (h = "-");
        a = Math.abs(a);
        if (1 < a) for (k = b.length - 1; -1 < k; k--) {
            if (a >= b[k].number && (l = a / b[k].number, m = Number(e.precision), 1 > m && (m = 1), c = d.roundTo(l, m), m = d.formatNumber(c, {
                precision: -1, decimalSeparator: e.decimalSeparator,
                thousandsSeparator: e.thousandsSeparator
            }), !g || l == c)) {
                f = h + "" + m + "" + b[k].prefix;
                break
            }
        } else for (k = 0; k < c.length; k++) if (a <= c[k].number) {
            l = a / c[k].number;
            m = Math.abs(Math.floor(Math.log(l) * Math.LOG10E));
            l = d.roundTo(l, m);
            f = h + "" + l + "" + c[k].prefix;
            break
        }
        return f
    };
    d.remove = function (a) {
        a && a.remove()
    };
    d.getEffect = function (a) {
        ">" == a && (a = "easeOutSine");
        "<" == a && (a = "easeInSine");
        "elastic" == a && (a = "easeOutElastic");
        return a
    };
    d.getObjById = function (a, b) {
        var c, e;
        for (e = 0; e < a.length; e++) {
            var d = a[e];
            if (d.id == b) {
                c = d;
                break
            }
        }
        return c
    };
    d.applyTheme = function (a, b, c) {
        b || (b = d.theme);
        try {
            b = JSON.parse(JSON.stringify(b))
        } catch (e) {
        }
        b && b[c] && d.extend(a, b[c])
    };
    d.isString = function (a) {
        return "string" == typeof a ? !0 : !1
    };
    d.extend = function (a, b, c) {
        var e;
        a || (a = {});
        for (e in b) c ? a.hasOwnProperty(e) || (a[e] = b[e]) : a[e] = b[e];
        return a
    };
    d.copyProperties = function (a, b) {
        for (var c in a) a.hasOwnProperty(c) && "events" != c && void 0 !== a[c] && "function" != typeof a[c] && "cname" != c && (b[c] = a[c])
    };
    d.processObject = function (a, b, c, e) {
        if (!1 === a instanceof b && (a = e ? d.extend(new b(c),
            a) : d.extend(a, new b(c), !0), a.listeners)) for (var g in a.listeners) b = a.listeners[g], a.addListener(b.event, b.method);
        return a
    };
    d.fixNewLines = function (a) {
        var b = RegExp("\\n", "g");
        a && (a = a.replace(b, "<br />"));
        return a
    };
    d.fixBrakes = function (a) {
        if (d.isModern) {
            var b = RegExp("<br>", "g");
            a && (a = a.replace(b, "\n"))
        } else a = d.fixNewLines(a);
        return a
    };
    d.deleteObject = function (a, b) {
        if (a) {
            if (void 0 === b || null === b) b = 20;
            if (0 !== b) if ("[object Array]" === Object.prototype.toString.call(a)) for (var c = 0; c < a.length; c++) d.deleteObject(a[c],
                b - 1), a[c] = null; else if (a && !a.tagName) try {
                for (c in a.theme = null, a) a[c] && ("object" == typeof a[c] && d.deleteObject(a[c], b - 1), "function" != typeof a[c] && (a[c] = null))
            } catch (e) {
            }
        }
    };
    d.bounce = function (a, b, c, e, d) {
        return (b /= d) < 1 / 2.75 ? 7.5625 * e * b * b + c : b < 2 / 2.75 ? e * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? e * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : e * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    };
    d.easeInOutQuad = function (a, b, c, e, d) {
        b /= d / 2;
        if (1 > b) return e / 2 * b * b + c;
        b--;
        return -e / 2 * (b * (b - 2) - 1) + c
    };
    d.easeInSine = function (a, b, c, e, d) {
        return -e *
            Math.cos(b / d * (Math.PI / 2)) + e + c
    };
    d.easeOutSine = function (a, b, c, e, d) {
        return e * Math.sin(b / d * (Math.PI / 2)) + c
    };
    d.easeOutElastic = function (a, b, c, e, d) {
        a = 1.70158;
        var f = 0, h = e;
        if (0 === b) return c;
        if (1 == (b /= d)) return c + e;
        f || (f = .3 * d);
        h < Math.abs(e) ? (h = e, a = f / 4) : a = f / (2 * Math.PI) * Math.asin(e / h);
        return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * d - a) * Math.PI / f) + e + c
    };
    d.fixStepE = function (a) {
        a = a.toExponential(0).split("e");
        var b = Number(a[1]);
        9 == Number(a[0]) && b++;
        return d.generateNumber(1, b)
    };
    d.generateNumber = function (a, b) {
        var c = "", e;
        e = 0 > b ? Math.abs(b) - 1 : Math.abs(b);
        var d;
        for (d = 0; d < e; d++) c += "0";
        return 0 > b ? Number("0." + c + String(a)) : Number(String(a) + c)
    };
    d.setCN = function (a, b, c, e) {
        if (a.addClassNames && b && (b = b.node) && c) {
            var d = b.getAttribute("class");
            a = a.classNamePrefix + "-";
            e && (a = "");
            d ? b.setAttribute("class", d + " " + a + c) : b.setAttribute("class", a + c)
        }
    };
    d.removeCN = function (a, b, c) {
        b && (b = b.node) && c && (b = b.classList) && b.remove(a.classNamePrefix + "-" + c)
    };
    d.parseDefs = function (a, b) {
        for (var c in a) {
            var e = typeof a[c];
            if (0 < a[c].length && "object" == e) for (var g =
                0; g < a[c].length; g++) e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c][g], e); else "object" == e ? (e = document.createElementNS(d.SVG_NS, c), b.appendChild(e), d.parseDefs(a[c], e)) : b.setAttribute(c, a[c])
        }
    }
})();
(function () {
    var d = window.AmCharts;
    d.AxisBase = d.Class({
        construct: function (a) {
            this.createEvents("clickItem", "rollOverItem", "rollOutItem", "rollOverGuide", "rollOutGuide", "clickGuide");
            this.titleDY = this.y = this.x = this.dy = this.dx = 0;
            this.axisThickness = 1;
            this.axisColor = "#000000";
            this.axisAlpha = 1;
            this.gridCount = this.tickLength = 5;
            this.gridAlpha = .15;
            this.gridThickness = 1;
            this.gridColor = "#000000";
            this.dashLength = 0;
            this.labelFrequency = 1;
            this.showLastLabel = this.showFirstLabel = !0;
            this.fillColor = "#FFFFFF";
            this.fillAlpha =
                0;
            this.labelsEnabled = !0;
            this.labelRotation = 0;
            this.autoGridCount = !0;
            this.offset = 0;
            this.guides = [];
            this.visible = !0;
            this.counter = 0;
            this.guides = [];
            this.ignoreAxisWidth = this.inside = !1;
            this.minHorizontalGap = 75;
            this.minVerticalGap = 35;
            this.titleBold = !0;
            this.minorGridEnabled = !1;
            this.minorGridAlpha = .07;
            this.autoWrap = !1;
            this.titleAlign = "middle";
            this.labelOffset = 0;
            this.bcn = "axis-";
            this.centerLabels = !1;
            this.firstDayOfWeek = 1;
            this.centerLabelOnFullPeriod = this.markPeriodChange = this.boldPeriodBeginning = !0;
            this.titleWidth =
                0;
            this.periods = [{period: "fff", count: 1}, {period: "fff", count: 5}, {
                period: "fff",
                count: 10
            }, {period: "fff", count: 50}, {period: "fff", count: 100}, {period: "fff", count: 500}, {
                period: "ss",
                count: 1
            }, {period: "ss", count: 5}, {period: "ss", count: 10}, {period: "ss", count: 30}, {
                period: "mm",
                count: 1
            }, {period: "mm", count: 5}, {period: "mm", count: 10}, {period: "mm", count: 30}, {
                period: "hh",
                count: 1
            }, {period: "hh", count: 3}, {period: "hh", count: 6}, {period: "hh", count: 12}, {
                period: "DD",
                count: 1
            }, {period: "DD", count: 2}, {period: "DD", count: 3}, {
                period: "DD",
                count: 4
            }, {period: "DD", count: 5}, {period: "WW", count: 1}, {period: "MM", count: 1}, {
                period: "MM",
                count: 2
            }, {period: "MM", count: 3}, {period: "MM", count: 6}, {period: "YYYY", count: 1}, {
                period: "YYYY",
                count: 2
            }, {period: "YYYY", count: 5}, {period: "YYYY", count: 10}, {period: "YYYY", count: 50}, {
                period: "YYYY",
                count: 100
            }];
            this.dateFormats = [{period: "fff", format: "NN:SS.QQQ"}, {period: "ss", format: "JJ:NN:SS"}, {
                period: "mm",
                format: "JJ:NN"
            }, {period: "hh", format: "JJ:NN"}, {period: "DD", format: "MMM DD"}, {period: "WW", format: "MMM DD"}, {
                period: "MM",
                format: "MMM"
            }, {period: "YYYY", format: "YYYY"}];
            this.nextPeriod = {fff: "ss", ss: "mm", mm: "hh", hh: "DD", DD: "MM", MM: "YYYY"};
            d.applyTheme(this, a, "AxisBase")
        }, zoom: function (a, b) {
            this.start = a;
            this.end = b;
            this.dataChanged = !0;
            this.draw()
        }, fixAxisPosition: function () {
            var a = this.position;
            "H" == this.orientation ? ("left" == a && (a = "bottom"), "right" == a && (a = "top")) : ("bottom" == a && (a = "left"), "top" == a && (a = "right"));
            this.position = a
        }, init: function () {
            this.createBalloon()
        }, draw: function () {
            var a = this.chart;
            this.prevBY = this.prevBX = NaN;
            this.allLabels = [];
            this.counter = 0;
            this.destroy();
            this.fixAxisPosition();
            this.setBalloonBounds();
            this.labels = [];
            var b = a.container, c = b.set();
            a.gridSet.push(c);
            this.set = c;
            b = b.set();
            a.axesLabelsSet.push(b);
            this.labelsSet = b;
            this.axisLine = new this.axisRenderer(this);
            this.autoGridCount ? ("V" == this.orientation ? (a = this.height / this.minVerticalGap, 3 > a && (a = 3)) : a = this.width / this.minHorizontalGap, this.gridCountR = Math.max(a, 1)) : this.gridCountR = this.gridCount;
            this.axisWidth = this.axisLine.axisWidth;
            this.addTitle()
        },
        setOrientation: function (a) {
            this.orientation = a ? "H" : "V"
        }, addTitle: function () {
            var a = this.title;
            this.titleLabel = null;
            if (a) {
                var b = this.chart, c = this.titleColor;
                void 0 === c && (c = b.color);
                var e = this.titleFontSize;
                isNaN(e) && (e = b.fontSize + 1);
                a = d.text(b.container, a, c, b.fontFamily, e, this.titleAlign, this.titleBold);
                d.setCN(b, a, this.bcn + "title");
                this.titleLabel = a
            }
        }, positionTitle: function () {
            var a = this.titleLabel;
            if (a) {
                var b, c, e = this.labelsSet, g = {};
                0 < e.length() ? g = e.getBBox() : (g.x = 0, g.y = 0, g.width = this.width, g.height =
                    this.height, d.VML && (g.y += this.y, g.x += this.x));
                e.push(a);
                var e = g.x, f = g.y;
                d.VML && (f -= this.y, e -= this.x);
                var h = g.width, g = g.height, k = this.width, l = this.height, m = 0, n = a.getBBox().height / 2,
                    q = this.inside, p = this.titleAlign;
                switch (this.position) {
                    case "top":
                        b = "left" == p ? -1 : "right" == p ? k : k / 2;
                        c = f - 10 - n;
                        break;
                    case "bottom":
                        b = "left" == p ? -1 : "right" == p ? k : k / 2;
                        c = f + g + 10 + n;
                        break;
                    case "left":
                        b = e - 10 - n;
                        q && (b -= 5);
                        m = -90;
                        c = ("left" == p ? l + 1 : "right" == p ? -1 : l / 2) + this.titleDY;
                        this.titleWidth = n + 10;
                        break;
                    case "right":
                        b = e + h + 10 + n, q && (b += 7),
                            c = ("left" == p ? l + 2 : "right" == p ? -2 : l / 2) + this.titleDY, this.titleWidth = n + 10, m = -90
                }
                this.marginsChanged ? (a.translate(b, c), this.tx = b, this.ty = c) : a.translate(this.tx, this.ty);
                this.marginsChanged = !1;
                isNaN(this.titleRotation) || (m = this.titleRotation);
                0 !== m && a.rotate(m)
            }
        }, pushAxisItem: function (a, b) {
            var c = this, e = a.graphics();
            0 < e.length() && (b ? c.labelsSet.push(e) : c.set.push(e));
            if (e = a.getLabel()) c.labelsSet.push(e), e.click(function (b) {
                c.handleMouse(b, a, "clickItem")
            }).touchend(function (b) {
                c.handleMouse(b, a, "clickItem")
            }).mouseover(function (b) {
                c.handleMouse(b,
                    a, "rollOverItem")
            }).mouseout(function (b) {
                c.handleMouse(b, a, "rollOutItem")
            })
        }, handleMouse: function (a, b, c) {
            this.fire({
                type: c,
                value: b.value,
                serialDataItem: b.serialDataItem,
                axis: this,
                target: b.label,
                chart: this.chart,
                event: a
            })
        }, addGuide: function (a) {
            for (var b = this.guides, c = !1, e = b.length, g = 0; g < b.length; g++) b[g] == a && (c = !0, e = g);
            a = d.processObject(a, d.Guide, this.theme);
            a.id || (a.id = "guideAuto" + e + "_" + (new Date).getTime());
            c || b.push(a)
        }, removeGuide: function (a) {
            var b = this.guides, c;
            for (c = 0; c < b.length; c++) b[c] == a &&
            b.splice(c, 1)
        }, handleGuideOver: function (a) {
            clearTimeout(this.chart.hoverInt);
            var b = {x: 0, y: 0, width: 0, height: 0};
            a.graphics && (b = a.graphics.getBBox());
            var c = this.x + b.x + b.width / 2, b = this.y + b.y + b.height / 2, e = a.fillColor;
            void 0 === e && (e = a.lineColor);
            this.chart.showBalloon(a.balloonText, e, !0, c, b);
            this.fire({type: "rollOverGuide", guide: a, chart: this.chart})
        }, handleGuideOut: function (a) {
            this.chart.hideBalloon();
            this.fire({type: "rollOutGuide", guide: a, chart: this.chart})
        }, handleGuideClick: function (a) {
            this.chart.hideBalloon();
            this.fire({type: "clickGuide", guide: a, chart: this.chart})
        }, addEventListeners: function (a, b) {
            var c = this;
            a.mouseover(function () {
                c.handleGuideOver(b)
            });
            a.mouseup(function () {
                c.handleGuideClick(b)
            });
            a.touchstart(function () {
                c.handleGuideOver(b)
            });
            a.mouseout(function () {
                c.handleGuideOut(b)
            })
        }, getBBox: function () {
            var a;
            this.labelsSet && (a = this.labelsSet.getBBox());
            a ? d.VML || (a = {x: a.x + this.x, y: a.y + this.y, width: a.width, height: a.height}) : a = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            return a
        }, destroy: function () {
            d.remove(this.set);
            d.remove(this.labelsSet);
            var a = this.axisLine;
            a && d.remove(a.axisSet);
            d.remove(this.grid0)
        }, chooseMinorFrequency: function (a) {
            for (var b = 10; 0 < b; b--) if (a / b == Math.round(a / b)) return a / b
        }, parseDatesDraw: function () {
            var a, b = this.chart, c = this.showFirstLabel, e = this.showLastLabel, g, f = "",
                h = d.extractPeriod(this.minPeriod), k = d.getPeriodDuration(h.period, h.count), l, m, n, q, p,
                t = this.firstDayOfWeek, r = this.boldPeriodBeginning;
            a = this.minorGridEnabled;
            var w, z = this.gridAlpha, x, u = this.choosePeriod(0), A = u.period, u = u.count,
                y = d.getPeriodDuration(A, u);
            y < k && (A = h.period, u = h.count, y = k);
            h = A;
            "WW" == h && (h = "DD");
            this.stepWidth = this.getStepWidth(this.timeDifference);
            var B = Math.ceil(this.timeDifference / y) + 5,
                D = l = d.resetDateToMin(new Date(this.startTime - y), A, u, t).getTime();
            if (h == A && 1 == u && this.centerLabelOnFullPeriod || this.autoWrap || this.centerLabels) n = y * this.stepWidth, this.autoWrap && !this.centerLabels && (n = -n);
            this.cellWidth = k * this.stepWidth;
            q = Math.round(l / y);
            k = -1;
            q / 2 == Math.round(q / 2) && (k = -2, l -= y);
            q = this.firstTime;
            var C = 0, I = 0;
            a &&
            1 < u && (w = this.chooseMinorFrequency(u), x = d.getPeriodDuration(A, w), "DD" == A && (x += d.getPeriodDuration("hh")), "fff" == A && (x = 1));
            if (0 < this.gridCountR) for (B - 5 - k > this.autoRotateCount && !isNaN(this.autoRotateAngle) && (this.labelRotationR = this.autoRotateAngle), a = k; a <= B; a++) {
                p = q + y * (a + Math.floor((D - q) / y)) - C;
                "DD" == A && (p += 36E5);
                p = d.resetDateToMin(new Date(p), A, u, t).getTime();
                "MM" == A && (g = (p - l) / y, 1.5 <= (p - l) / y && (p = p - (g - 1) * y + d.getPeriodDuration("DD", 3), p = d.resetDateToMin(new Date(p), A, 1).getTime(), C += y));
                g = (p - this.startTime) *
                    this.stepWidth;
                if ("radar" == b.type) {
                    if (g = this.axisWidth - g, 0 > g || g > this.axisWidth) continue
                } else this.rotate ? "date" == this.type && "middle" == this.gridPosition && (I = -y * this.stepWidth / 2) : "date" == this.type && (g = this.axisWidth - g);
                f = !1;
                this.nextPeriod[h] && (f = this.checkPeriodChange(this.nextPeriod[h], 1, p, l, h));
                l = !1;
                f && this.markPeriodChange ? (f = this.dateFormatsObject[this.nextPeriod[h]], this.twoLineMode && (f = this.dateFormatsObject[h] + "\n" + f, f = d.fixBrakes(f)), l = !0) : f = this.dateFormatsObject[h];
                r || (l = !1);
                this.currentDateFormat =
                    f;
                f = d.formatDate(new Date(p), f, b);
                if (a == k && !c || a == B && !e) f = " ";
                this.labelFunction && (f = this.labelFunction(f, new Date(p), this, A, u, m).toString());
                this.boldLabels && (l = !0);
                m = new this.axisItemRenderer(this, g, f, !1, n, I, !1, l);
                this.pushAxisItem(m);
                m = l = p;
                if (!isNaN(w)) for (g = 1; g < u; g += w) this.gridAlpha = this.minorGridAlpha, f = p + x * g, f = d.resetDateToMin(new Date(f), A, w, t).getTime(), f = new this.axisItemRenderer(this, (f - this.startTime) * this.stepWidth, void 0, void 0, void 0, void 0, void 0, void 0, void 0, !0), this.pushAxisItem(f);
                this.gridAlpha = z
            }
        }, choosePeriod: function (a) {
            var b = d.getPeriodDuration(this.periods[a].period, this.periods[a].count), c = this.periods;
            return this.timeDifference < b && 0 < a ? c[a - 1] : Math.ceil(this.timeDifference / b) <= this.gridCountR ? c[a] : a + 1 < c.length ? this.choosePeriod(a + 1) : c[a]
        }, getStepWidth: function (a) {
            var b;
            this.startOnAxis ? (b = this.axisWidth / (a - 1), 1 == a && (b = this.axisWidth)) : b = this.axisWidth / a;
            return b
        }, timeZoom: function (a, b) {
            this.startTime = a;
            this.endTime = b
        }, minDuration: function () {
            var a = d.extractPeriod(this.minPeriod);
            return d.getPeriodDuration(a.period, a.count)
        }, checkPeriodChange: function (a, b, c, e, g) {
            c = new Date(c);
            var f = new Date(e), h = this.firstDayOfWeek;
            e = b;
            "DD" == a && (b = 1);
            c = d.resetDateToMin(c, a, b, h).getTime();
            b = d.resetDateToMin(f, a, b, h).getTime();
            return "DD" == a && "hh" != g && c - b < d.getPeriodDuration(a, e) - d.getPeriodDuration("hh", 1) ? !1 : c != b ? !0 : !1
        }, generateDFObject: function () {
            this.dateFormatsObject = {};
            var a;
            for (a = 0; a < this.dateFormats.length; a++) {
                var b = this.dateFormats[a];
                this.dateFormatsObject[b.period] = b.format
            }
        }, hideBalloon: function () {
            this.balloon &&
            this.balloon.hide && this.balloon.hide();
            this.prevBY = this.prevBX = NaN
        }, formatBalloonText: function (a) {
            return a
        }, showBalloon: function (a, b, c, e) {
            var d = this.offset;
            switch (this.position) {
                case "bottom":
                    b = this.height + d;
                    break;
                case "top":
                    b = -d;
                    break;
                case "left":
                    a = -d;
                    break;
                case "right":
                    a = this.width + d
            }
            c || (c = this.currentDateFormat);
            if ("V" == this.orientation) {
                if (0 > b || b > this.height) return;
                if (isNaN(b)) {
                    this.hideBalloon();
                    return
                }
                b = this.adjustBalloonCoordinate(b, e);
                e = this.coordinateToValue(b)
            } else {
                if (0 > a || a > this.width) return;
                if (isNaN(a)) {
                    this.hideBalloon();
                    return
                }
                a = this.adjustBalloonCoordinate(a, e);
                e = this.coordinateToValue(a)
            }
            var f;
            if (d = this.chart.chartCursor) f = d.index;
            if (this.balloon && void 0 !== e && this.balloon.enabled) {
                if (this.balloonTextFunction) {
                    if ("date" == this.type || !0 === this.parseDates) e = new Date(e);
                    e = this.balloonTextFunction(e)
                } else this.balloonText ? e = this.formatBalloonText(this.balloonText, f, c) : isNaN(e) || (e = this.formatValue(e, c));
                if (a != this.prevBX || b != this.prevBY) this.balloon.setPosition(a, b), this.prevBX = a, this.prevBY =
                    b, e && this.balloon.showBalloon(e)
            }
        }, adjustBalloonCoordinate: function (a) {
            return a
        }, createBalloon: function () {
            var a = this.chart, b = a.chartCursor;
            b && (b = b.cursorPosition, "mouse" != b && (this.stickBalloonToCategory = !0), "start" == b && (this.stickBalloonToStart = !0), "ValueAxis" == this.cname && (this.stickBalloonToCategory = !1));
            this.balloon && (this.balloon.destroy && this.balloon.destroy(), d.extend(this.balloon, a.balloon, !0))
        }, setBalloonBounds: function () {
            var a = this.balloon;
            if (a) {
                var b = this.chart;
                a.cornerRadius = 0;
                a.shadowAlpha =
                    0;
                a.borderThickness = 1;
                a.borderAlpha = 1;
                a.adjustBorderColor = !1;
                a.showBullet = !1;
                this.balloon = a;
                a.chart = b;
                a.mainSet = b.plotBalloonsSet;
                a.pointerWidth = this.tickLength;
                if (this.parseDates || "date" == this.type) a.pointerWidth = 0;
                a.className = this.id;
                b = "V";
                "V" == this.orientation && (b = "H");
                this.stickBalloonToCategory || (a.animationDuration = 0);
                var c, e, d, f, h = this.inside, k = this.width, l = this.height;
                switch (this.position) {
                    case "bottom":
                        c = 0;
                        e = k;
                        h ? (d = 0, f = l) : (d = l, f = l + 1E3);
                        break;
                    case "top":
                        c = 0;
                        e = k;
                        h ? (d = 0, f = l) : (d = -1E3, f = 0);
                        break;
                    case "left":
                        d = 0;
                        f = l;
                        h ? (c = 0, e = k) : (c = -1E3, e = 0);
                        break;
                    case "right":
                        d = 0, f = l, h ? (c = 0, e = k) : (c = k, e = k + 1E3)
                }
                a.drop || (a.pointerOrientation = b);
                a.setBounds(c, d, e, f)
            }
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.ValueAxis = d.Class({
        inherits: d.AxisBase, construct: function (a) {
            this.cname = "ValueAxis";
            this.createEvents("axisChanged", "logarithmicAxisFailed", "axisZoomed", "axisIntZoomed");
            d.ValueAxis.base.construct.call(this, a);
            this.dataChanged = !0;
            this.stackType = "none";
            this.position = "left";
            this.unitPosition = "right";
            this.includeAllValues = this.recalculateToPercents = this.includeHidden = this.includeGuidesInMinMax = this.integersOnly = !1;
            this.durationUnits = {DD: "d. ", hh: ":", mm: ":", ss: ""};
            this.scrollbar = !1;
            this.baseValue = 0;
            this.radarCategoriesEnabled = !0;
            this.axisFrequency = 1;
            this.gridType = "polygons";
            this.useScientificNotation = !1;
            this.axisTitleOffset = 10;
            this.pointPosition = "axis";
            this.minMaxMultiplier = 1;
            this.logGridLimit = 2;
            this.totalTextOffset = this.treatZeroAs = 0;
            this.minPeriod = "ss";
            this.relativeStart = 0;
            this.relativeEnd = 1;
            d.applyTheme(this, a, this.cname)
        }, updateData: function () {
            0 >= this.gridCountR && (this.gridCountR = 1);
            this.totals = [];
            this.data = this.chart.chartData;
            var a = this.chart;
            "xy" != a.type &&
            (this.stackGraphs("smoothedLine"), this.stackGraphs("line"), this.stackGraphs("column"), this.stackGraphs("step"));
            this.recalculateToPercents && this.recalculate();
            if (this.synchronizationMultiplier && this.synchronizeWith) d.isString(this.synchronizeWith) && (this.synchronizeWith = a.getValueAxisById(this.synchronizeWith)), this.synchronizeWith && (this.synchronizeWithAxis(this.synchronizeWith), this.foundGraphs = !0); else if (this.foundGraphs = !1, this.getMinMax(), 0 === this.start && this.end == this.data.length - 1 && isNaN(this.minZoom) &&
            isNaN(this.maxZoom) || isNaN(this.fullMin) && isNaN(this.fullMax)) this.fullMin = this.min, this.fullMax = this.max, "date" != this.type && this.strictMinMax && (isNaN(this.minimum) || (this.fullMin = this.minimum), isNaN(this.maximum) || (this.fullMax = this.maximum)), this.logarithmic && (this.fullMin = this.logMin, 0 === this.fullMin && (this.fullMin = this.treatZeroAs)), "date" == this.type && (this.minimumDate || (this.fullMin = this.minRR), this.maximumDate || (this.fullMax = this.maxRR), this.strictMinMax && (this.minimumDate && (this.fullMin = this.minimumDate.getTime()),
            this.maximumDate && (this.fullMax = this.maximumDate.getTime())))
        }, draw: function () {
            d.ValueAxis.base.draw.call(this);
            var a = this.chart, b = this.set;
            this.labelRotationR = this.labelRotation;
            d.setCN(a, this.set, "value-axis value-axis-" + this.id);
            d.setCN(a, this.labelsSet, "value-axis value-axis-" + this.id);
            d.setCN(a, this.axisLine.axisSet, "value-axis value-axis-" + this.id);
            var c = this.type;
            "duration" == c && (this.duration = "ss");
            !0 === this.dataChanged && (this.updateData(), this.dataChanged = !1);
            "date" == c && (this.logarithmic =
                !1, this.min = this.minRR, this.max = this.maxRR, this.reversed = !1, this.getDateMinMax());
            if (this.logarithmic) {
                var e = this.treatZeroAs, g = this.getExtremes(0, this.data.length - 1).min;
                !isNaN(this.minimum) && this.minimum < g && (g = this.minimum);
                this.logMin = g;
                this.minReal < g && (this.minReal = g);
                isNaN(this.minReal) && (this.minReal = g);
                0 < e && 0 === g && (this.minReal = g = e);
                if (0 >= g || 0 >= this.minimum) {
                    this.fire({type: "logarithmicAxisFailed", chart: a});
                    return
                }
            }
            this.grid0 = null;
            var f, h, k = a.dx, l = a.dy, e = !1, g = this.logarithmic;
            if (isNaN(this.min) ||
                isNaN(this.max) || !this.foundGraphs || Infinity == this.min || -Infinity == this.max) e = !0; else {
                "date" == this.type && this.min == this.max && (this.max += this.minDuration(), this.min -= this.minDuration());
                var m = this.labelFrequency, n = this.showFirstLabel, q = this.showLastLabel, p = 1, t = 0;
                this.minCalc = this.min;
                this.maxCalc = this.max;
                if (this.strictMinMax && (isNaN(this.minimum) || (this.min = this.minimum), isNaN(this.maximum) || (this.max = this.maximum), this.min == this.max)) return;
                isNaN(this.minZoom) || (this.minReal = this.min = this.minZoom);
                isNaN(this.maxZoom) || (this.max = this.maxZoom);
                if (this.logarithmic) {
                    h = this.fullMin;
                    var r = this.fullMax;
                    isNaN(this.minimum) || (h = this.minimum);
                    isNaN(this.maximum) || (r = this.maximum);
                    var r = Math.log(r) * Math.LOG10E - Math.log(h) * Math.LOG10E,
                        w = Math.log(this.max) / Math.LN10 - Math.log(h) * Math.LOG10E;
                    this.relativeStart = d.roundTo((Math.log(this.minReal) / Math.LN10 - Math.log(h) * Math.LOG10E) / r, 5);
                    this.relativeEnd = d.roundTo(w / r, 5)
                } else this.relativeStart = d.roundTo(d.fitToBounds((this.min - this.fullMin) / (this.fullMax - this.fullMin),
                    0, 1), 5), this.relativeEnd = d.roundTo(d.fitToBounds((this.max - this.fullMin) / (this.fullMax - this.fullMin), 0, 1), 5);
                var r = Math.round((this.maxCalc - this.minCalc) / this.step) + 1, z;
                !0 === g ? (z = Math.log(this.max) * Math.LOG10E - Math.log(this.minReal) * Math.LOG10E, this.stepWidth = this.axisWidth / z, z > this.logGridLimit && (r = Math.ceil(Math.log(this.max) * Math.LOG10E) + 1, t = Math.round(Math.log(this.minReal) * Math.LOG10E), r > this.gridCountR && (p = Math.ceil(r / this.gridCountR)))) : this.stepWidth = this.axisWidth / (this.max - this.min);
                var x =
                    0;
                1 > this.step && -1 < this.step && (x = d.getDecimals(this.step));
                this.integersOnly && (x = 0);
                x > this.maxDecCount && (x = this.maxDecCount);
                w = this.precision;
                isNaN(w) || (x = w);
                isNaN(this.maxZoom) && (this.max = d.roundTo(this.max, this.maxDecCount), this.min = d.roundTo(this.min, this.maxDecCount));
                h = {};
                h.precision = x;
                h.decimalSeparator = a.nf.decimalSeparator;
                h.thousandsSeparator = a.nf.thousandsSeparator;
                this.numberFormatter = h;
                var u;
                this.exponential = !1;
                for (h = t; h < r; h += p) {
                    var A = d.roundTo(this.step * h + this.min, x);
                    -1 != String(A).indexOf("e") &&
                    (this.exponential = !0)
                }
                this.duration && (this.maxInterval = d.getMaxInterval(this.max, this.duration));
                var x = this.step, y, A = this.minorGridAlpha;
                this.minorGridEnabled && (y = this.getMinorGridStep(x, this.stepWidth * x));
                if (this.autoGridCount || 0 !== this.gridCount) if ("date" == c) this.generateDFObject(), this.timeDifference = this.max - this.min, this.maxTime = this.lastTime = this.max, this.startTime = this.firstTime = this.min, this.parseDatesDraw(); else for (r >= this.autoRotateCount && !isNaN(this.autoRotateAngle) && (this.labelRotationR =
                    this.autoRotateAngle), c = this.minCalc, g && (r++, c = this.maxCalc - r * x), this.gridCountReal = r, h = this.startCount = t; h < r; h += p) if (t = x * h + c, t = d.roundTo(t, this.maxDecCount + 1), !this.integersOnly || Math.round(t) == t) if (isNaN(w) || Number(d.toFixed(t, w)) == t) {
                    if (!0 === g) if (z > this.logGridLimit) {
                        if (t = Math.pow(10, h), t > this.max) continue
                    } else if (0 >= t && (t = c + x * h + x / 2, 0 >= t)) continue;
                    u = this.formatValue(t, !1, h);
                    Math.round(h / m) != h / m && (u = void 0);
                    if (0 === h && !n || h == r - 1 && !q) u = " ";
                    f = this.getCoordinate(t);
                    var B;
                    this.rotate && this.autoWrap &&
                    (B = this.stepWidth * x - 10);
                    u = new this.axisItemRenderer(this, f, u, void 0, B, void 0, void 0, this.boldLabels);
                    this.pushAxisItem(u);
                    if (t == this.baseValue && "radar" != a.type) {
                        var D, C, I = this.width, H = this.height;
                        "H" == this.orientation ? 0 <= f && f <= I + 1 && (D = [f, f, f + k], C = [H, 0, l]) : 0 <= f && f <= H + 1 && (D = [0, I, I + k], C = [f, f, f + l]);
                        D && (f = d.fitToBounds(2 * this.gridAlpha, 0, 1), isNaN(this.zeroGridAlpha) || (f = this.zeroGridAlpha), f = d.line(a.container, D, C, this.gridColor, f, 1, this.dashLength), f.translate(this.x, this.y), this.grid0 = f, a.axesSet.push(f),
                            f.toBack(), d.setCN(a, f, this.bcn + "zero-grid-" + this.id), d.setCN(a, f, this.bcn + "zero-grid"))
                    }
                    if (!isNaN(y) && 0 < A && h < r - 1) {
                        f = x / y;
                        g && (y = x * (h + p) + this.minCalc, y = d.roundTo(y, this.maxDecCount + 1), z > this.logGridLimit && (y = Math.pow(10, h + p)), f = 9, y = (y - t) / f);
                        I = this.gridAlpha;
                        this.gridAlpha = this.minorGridAlpha;
                        for (H = 1; H < f; H++) {
                            var Q = this.getCoordinate(t + y * H),
                                Q = new this.axisItemRenderer(this, Q, "", !1, 0, 0, !1, !1, 0, !0);
                            this.pushAxisItem(Q)
                        }
                        this.gridAlpha = I
                    }
                }
                z = this.guides;
                B = z.length;
                if (0 < B) {
                    D = this.fillAlpha;
                    for (h = this.fillAlpha =
                        0; h < B; h++) C = z[h], k = NaN, y = C.above, isNaN(C.toValue) || (k = this.getCoordinate(C.toValue), u = new this.axisItemRenderer(this, k, "", !0, NaN, NaN, C), this.pushAxisItem(u, y)), l = NaN, isNaN(C.value) || (l = this.getCoordinate(C.value), u = new this.axisItemRenderer(this, l, C.label, !0, NaN, (k - l) / 2, C), this.pushAxisItem(u, y)), isNaN(k) && (l -= 3, k = l + 3), u && (m = u.label) && this.addEventListeners(m, C), isNaN(k - l) || 0 > l && 0 > k || (k = new this.guideFillRenderer(this, l, k, C), this.pushAxisItem(k, y), y = k.graphics(), C.graphics = y, this.addEventListeners(y,
                        C));
                    this.fillAlpha = D
                }
                u = this.baseValue;
                this.min > this.baseValue && this.max > this.baseValue && (u = this.min);
                this.min < this.baseValue && this.max < this.baseValue && (u = this.max);
                g && u < this.minReal && (u = this.minReal);
                this.baseCoord = this.getCoordinate(u, !0);
                u = {type: "axisChanged", target: this, chart: a};
                u.min = g ? this.minReal : this.min;
                u.max = this.max;
                this.fire(u);
                this.axisCreated = !0
            }
            g = this.axisLine.set;
            u = this.labelsSet;
            b.translate(this.x, this.y);
            u.translate(this.x, this.y);
            this.positionTitle();
            "radar" != a.type && g.toFront();
            !this.visible || e ? (b.hide(), g.hide(), u.hide()) : (b.show(), g.show(), u.show());
            this.axisY = this.y;
            this.axisX = this.x
        }, getDateMinMax: function () {
            this.minimumDate && (this.minimumDate instanceof Date || (this.minimumDate = d.getDate(this.minimumDate, this.chart.dataDateFormat, "fff")), this.min = this.minimumDate.getTime());
            this.maximumDate && (this.maximumDate instanceof Date || (this.maximumDate = d.getDate(this.maximumDate, this.chart.dataDateFormat, "fff")), this.max = this.maximumDate.getTime())
        }, formatValue: function (a, b,
                                  c) {
            var e = this.exponential, g = this.logarithmic, f = this.numberFormatter, h = this.chart;
            if (f) return !0 === this.logarithmic && (e = -1 != String(a).indexOf("e") ? !0 : !1), this.useScientificNotation && (e = !0), this.usePrefixes && (e = !1), e ? (c = -1 == String(a).indexOf("e") ? a.toExponential(15) : String(a), e = c.split("e"), c = Number(e[0]), e = Number(e[1]), c = d.roundTo(c, 14), b || isNaN(this.precision) || (c = d.roundTo(c, this.precision)), 10 == c && (c = 1, e += 1), c = c + "e" + e, 0 === a && (c = "0"), 1 == a && (c = "1")) : (g && (e = String(a).split("."), e[1] ? (f.precision = e[1].length,
            0 > c && (f.precision = Math.abs(c)), b && 1 < a && (f.precision = 0), b || isNaN(this.precision) || (f.precision = this.precision)) : f.precision = -1), c = this.usePrefixes ? d.addPrefix(a, h.prefixesOfBigNumbers, h.prefixesOfSmallNumbers, f, !b) : d.formatNumber(a, f, f.precision)), this.duration && (b && (f.precision = 0), c = d.formatDuration(a, this.duration, "", this.durationUnits, this.maxInterval, f)), "date" == this.type && (c = d.formatDate(new Date(a), this.currentDateFormat, h)), this.recalculateToPercents ? c += "%" : (b = this.unit) && (c = "left" == this.unitPosition ?
                b + c : c + b), this.labelFunction && (c = "date" == this.type ? this.labelFunction(c, new Date(a), this).toString() : this.labelFunction(a, c, this).toString()), c
        }, getMinorGridStep: function (a, b) {
            var c = [5, 4, 2];
            60 > b && c.shift();
            for (var e = Math.floor(Math.log(Math.abs(a)) * Math.LOG10E), d = 0; d < c.length; d++) {
                var f = a / c[d], h = Math.floor(Math.log(Math.abs(f)) * Math.LOG10E);
                if (!(1 < Math.abs(e - h))) if (1 > a) {
                    if (h = Math.pow(10, -h) * f, h == Math.round(h)) return f
                } else if (f == Math.round(f)) return f
            }
            return 1
        }, stackGraphs: function (a) {
            var b = this.stackType;
            "stacked" == b && (b = "regular");
            "line" == b && (b = "none");
            "100% stacked" == b && (b = "100%");
            this.stackType = b;
            var c = [], e = [], g = [], f = [], h, k = this.chart.graphs, l, m, n, q, p, t = this.baseValue, r = !1;
            if ("line" == a || "step" == a || "smoothedLine" == a) r = !0;
            if (r && ("regular" == b || "100%" == b)) for (q = 0; q < k.length; q++) n = k[q], n.stackGraph = null, n.hidden || (m = n.type, n.chart == this.chart && n.valueAxis == this && a == m && n.stackable && (l && (n.stackGraph = l), l = n));
            n = this.start - 10;
            l = this.end + 10;
            q = this.data.length - 1;
            n = d.fitToBounds(n, 0, q);
            l = d.fitToBounds(l,
                0, q);
            for (p = n; p <= l; p++) {
                var w = 0;
                for (q = 0; q < k.length; q++) if (n = k[q], n.hidden) n.newStack && (g[p] = NaN, e[p] = NaN); else if (m = n.type, n.chart == this.chart && n.valueAxis == this && a == m && n.stackable) if (m = this.data[p].axes[this.id].graphs[n.id], h = m.values.value, isNaN(h)) n.newStack && (g[p] = NaN, e[p] = NaN); else {
                    var z = d.getDecimals(h);
                    w < z && (w = z);
                    isNaN(f[p]) ? f[p] = Math.abs(h) : f[p] += Math.abs(h);
                    f[p] = d.roundTo(f[p], w);
                    z = n.fillToGraph;
                    r && z && (z = this.data[p].axes[this.id].graphs[z.id]) && (m.values.open = z.values.value);
                    "regular" ==
                    b && (r && (isNaN(c[p]) ? (c[p] = h, m.values.close = h, m.values.open = this.baseValue) : (isNaN(h) ? m.values.close = c[p] : m.values.close = h + c[p], m.values.open = c[p], c[p] = m.values.close)), "column" == a && (n.newStack && (g[p] = NaN, e[p] = NaN), m.values.close = h, 0 > h ? (m.values.close = h, isNaN(e[p]) ? m.values.open = t : (m.values.close += e[p], m.values.open = e[p]), e[p] = m.values.close) : (m.values.close = h, isNaN(g[p]) ? m.values.open = t : (m.values.close += g[p], m.values.open = g[p]), g[p] = m.values.close)))
                }
            }
            for (p = this.start; p <= this.end; p++) for (q = 0; q < k.length; q++) (n =
                k[q], n.hidden) ? n.newStack && (g[p] = NaN, e[p] = NaN) : (m = n.type, n.chart == this.chart && n.valueAxis == this && a == m && n.stackable && (m = this.data[p].axes[this.id].graphs[n.id], h = m.values.value, isNaN(h) || (c = h / f[p] * 100, m.values.percents = c, m.values.total = f[p], n.newStack && (g[p] = NaN, e[p] = NaN), "100%" == b && (isNaN(e[p]) && (e[p] = 0), isNaN(g[p]) && (g[p] = 0), 0 > c ? (m.values.close = d.fitToBounds(c + e[p], -100, 100), m.values.open = e[p], e[p] = m.values.close) : (m.values.close = d.fitToBounds(c + g[p], -100, 100), m.values.open = g[p], g[p] = m.values.close)))))
        },
        recalculate: function () {
            var a = this.chart, b = a.graphs, c;
            for (c = 0; c < b.length; c++) {
                var e = b[c];
                if (e.valueAxis == this) {
                    var g = "value";
                    if ("candlestick" == e.type || "ohlc" == e.type) g = "open";
                    var f, h, k = this.end + 2, k = d.fitToBounds(this.end + 1, 0, this.data.length - 1),
                        l = this.start;
                    0 < l && l--;
                    var m;
                    h = this.start;
                    e.compareFromStart && (h = 0);
                    if (!isNaN(a.startTime) && (m = a.categoryAxis)) {
                        var n = m.minDuration(), n = new Date(a.startTime + n / 2),
                            q = d.resetDateToMin(new Date(a.startTime), m.minPeriod).getTime();
                        d.resetDateToMin(new Date(n), m.minPeriod).getTime() >
                        q && h++
                    }
                    if (m = a.recalculateFromDate) m = d.getDate(m, a.dataDateFormat, "fff"), h = a.getClosestIndex(a.chartData, "time", m.getTime(), !0, 0, a.chartData.length), k = a.chartData.length - 1;
                    for (m = h; m <= k && (h = this.data[m].axes[this.id].graphs[e.id], f = h.values[g], e.recalculateValue && (f = h.dataContext[e.valueField + e.recalculateValue]), isNaN(f)); m++) ;
                    this.recBaseValue = f;
                    for (g = l; g <= k; g++) {
                        h = this.data[g].axes[this.id].graphs[e.id];
                        h.percents = {};
                        var l = h.values, p;
                        for (p in l) h.percents[p] = "percents" != p ? l[p] / f * 100 - 100 : l[p]
                    }
                }
            }
        },
        getMinMax: function () {
            var a = !1, b = this.chart, c = b.graphs, e;
            for (e = 0; e < c.length; e++) {
                var g = c[e].type;
                ("line" == g || "step" == g || "smoothedLine" == g) && this.expandMinMax && (a = !0)
            }
            a && (0 < this.start && this.start--, this.end < this.data.length - 1 && this.end++);
            "serial" == b.type && (!0 !== b.categoryAxis.parseDates || a || this.end < this.data.length - 1 && this.end++);
            this.includeAllValues && (this.start = 0, this.end = this.data.length - 1);
            a = this.minMaxMultiplier;
            b = this.getExtremes(this.start, this.end);
            this.min = b.min;
            this.max = b.max;
            this.minRR =
                this.min;
            this.maxRR = this.max;
            a = (this.max - this.min) * (a - 1);
            this.min -= a;
            this.max += a;
            a = this.guides.length;
            if (this.includeGuidesInMinMax && 0 < a) for (b = 0; b < a; b++) c = this.guides[b], c.toValue < this.min && (this.min = c.toValue), c.value < this.min && (this.min = c.value), c.toValue > this.max && (this.max = c.toValue), c.value > this.max && (this.max = c.value);
            isNaN(this.minimum) || (this.min = this.minimum);
            isNaN(this.maximum) || (this.max = this.maximum);
            "date" == this.type && this.getDateMinMax();
            this.min > this.max && (a = this.max, this.max = this.min,
                this.min = a);
            isNaN(this.minZoom) || (this.min = this.minZoom);
            isNaN(this.maxZoom) || (this.max = this.maxZoom);
            this.minCalc = this.min;
            this.maxCalc = this.max;
            this.minReal = this.min;
            this.maxReal = this.max;
            0 === this.min && 0 === this.max && (this.max = 9);
            this.min > this.max && (this.min = this.max - 1);
            a = this.min;
            b = this.max;
            c = this.max - this.min;
            e = 0 === c ? Math.pow(10, Math.floor(Math.log(Math.abs(this.max)) * Math.LOG10E)) / 10 : Math.pow(10, Math.floor(Math.log(Math.abs(c)) * Math.LOG10E)) / 10;
            isNaN(this.maximum) && (this.max = Math.ceil(this.max /
                e) * e + e);
            isNaN(this.minimum) && (this.min = Math.floor(this.min / e) * e - e);
            0 > this.min && 0 <= a && (this.min = 0);
            0 < this.max && 0 >= b && (this.max = 0);
            "100%" == this.stackType && (this.min = 0 > this.min ? -100 : 0, this.max = 0 > this.max ? 0 : 100);
            c = this.max - this.min;
            e = Math.pow(10, Math.floor(Math.log(Math.abs(c)) * Math.LOG10E)) / 10;
            this.step = Math.ceil(c / this.gridCountR / e) * e;
            c = Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E));
            c = d.fixStepE(c);
            e = Math.ceil(this.step / c);
            5 < e && (e = 10);
            5 >= e && 2 < e && (e = 5);
            this.step = Math.ceil(this.step /
                (c * e)) * c * e;
            isNaN(this.setStep) || (this.step = this.setStep);
            1 > c ? (this.maxDecCount = Math.abs(Math.log(Math.abs(c)) * Math.LOG10E), this.maxDecCount = Math.round(this.maxDecCount), this.step = d.roundTo(this.step, this.maxDecCount + 1)) : this.maxDecCount = 0;
            this.min = this.step * Math.floor(this.min / this.step);
            this.max = this.step * Math.ceil(this.max / this.step);
            0 > this.min && 0 <= a && (this.min = 0);
            0 < this.max && 0 >= b && (this.max = 0);
            1 < this.minReal && 1 < this.max - this.minReal && (this.minReal = Math.floor(this.minReal));
            c = Math.pow(10, Math.floor(Math.log(Math.abs(this.minReal)) *
                Math.LOG10E));
            0 === this.min && (this.minReal = c);
            0 === this.min && 1 < this.minReal && (this.minReal = 1);
            0 < this.min && 0 < this.minReal - this.step && (this.minReal = this.min + this.step < this.minReal ? this.min + this.step : this.min);
            this.logarithmic && (2 < Math.log(b) * Math.LOG10E - Math.log(a) * Math.LOG10E ? (this.minReal = this.min = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)), this.maxReal = this.max = Math.pow(10, Math.ceil(Math.log(Math.abs(b)) * Math.LOG10E))) : (a = Math.pow(10, Math.floor(Math.log(Math.abs(a)) * Math.LOG10E)) / 10,
            Math.pow(10, Math.floor(Math.log(Math.abs(this.min)) * Math.LOG10E)) / 10 < a && (this.minReal = this.min = 10 * a)))
        }, getExtremes: function (a, b) {
            var c, e, d;
            for (d = a; d <= b; d++) {
                var f = this.data[d].axes[this.id].graphs, h;
                for (h in f) if (f.hasOwnProperty(h)) {
                    var k = this.chart.graphsById[h];
                    if (k.includeInMinMax && (!k.hidden || this.includeHidden)) {
                        isNaN(c) && (c = Infinity);
                        isNaN(e) && (e = -Infinity);
                        this.foundGraphs = !0;
                        k = f[h].values;
                        this.recalculateToPercents && (k = f[h].percents);
                        var l;
                        if (this.minMaxField) l = k[this.minMaxField], l < c &&
                        (c = l), l > e && (e = l); else for (var m in k) k.hasOwnProperty(m) && "percents" != m && "total" != m && "error" != m && (l = k[m], l < c && (c = l), l > e && (e = l))
                    }
                }
            }
            return {min: c, max: e}
        }, zoomOut: function (a) {
            this.maxZoom = this.minZoom = NaN;
            this.zoomToRelativeValues(0, 1, a)
        }, zoomToRelativeValues: function (a, b, c) {
            if (this.reversed) {
                var e = a;
                a = 1 - b;
                b = 1 - e
            }
            var d = this.fullMax, e = this.fullMin, f = e + (d - e) * a, h = e + (d - e) * b;
            0 <= this.minimum && 0 > f && (f = 0);
            this.logarithmic && (isNaN(this.minimum) || (e = this.minimum), isNaN(this.maximum) || (d = this.maximum), d = Math.log(d) *
                Math.LOG10E - Math.log(e) * Math.LOG10E, f = Math.pow(10, d * a + Math.log(e) * Math.LOG10E), h = Math.pow(10, d * b + Math.log(e) * Math.LOG10E));
            return this.zoomToValues(f, h, c)
        }, zoomToValues: function (a, b, c) {
            if (b < a) {
                var e = b;
                b = a;
                a = e
            }
            var g = this.fullMax, e = this.fullMin;
            this.relativeStart = d.roundTo((a - e) / (g - e), 9);
            this.relativeEnd = d.roundTo((b - e) / (g - e), 9);
            if (this.logarithmic) {
                isNaN(this.minimum) || (e = this.minimum);
                isNaN(this.maximum) || (g = this.maximum);
                var g = Math.log(g) * Math.LOG10E - Math.log(e) * Math.LOG10E, f = Math.log(b) / Math.LN10 -
                    Math.log(e) * Math.LOG10E;
                this.relativeStart = d.roundTo((Math.log(a) / Math.LN10 - Math.log(e) * Math.LOG10E) / g, 9);
                this.relativeEnd = d.roundTo(f / g, 9)
            }
            if (this.minZoom != a || this.maxZoom != b) return this.minZoom = a, this.maxZoom = b, e = {type: "axisZoomed"}, e.chart = this.chart, e.valueAxis = this, e.startValue = a, e.endValue = b, e.relativeStart = this.relativeStart, e.relativeEnd = this.relativeEnd, this.prevStartValue == a && this.prevEndValue == b || this.fire(e), this.prevStartValue = a, this.prevEndValue = b, c || (a = {}, d.copyProperties(e, a), a.type =
                "axisIntZoomed", this.fire(a)), 0 === this.relativeStart && 1 == this.relativeEnd && (this.maxZoom = this.minZoom = NaN), !0
        }, coordinateToValue: function (a) {
            if (isNaN(a)) return NaN;
            var b = this.axisWidth, c = this.stepWidth, e = this.reversed, d = this.rotate, f = this.min,
                h = this.minReal;
            return !0 === this.logarithmic ? Math.pow(10, (d ? !0 === e ? (b - a) / c : a / c : !0 === e ? a / c : (b - a) / c) + Math.log(h) * Math.LOG10E) : !0 === e ? d ? f - (a - b) / c : a / c + f : d ? a / c + f : f - (a - b) / c
        }, getCoordinate: function (a, b) {
            if (isNaN(a)) return NaN;
            var c = this.rotate, e = this.reversed, d = this.axisWidth,
                f = this.stepWidth, h = this.min, k = this.minReal;
            !0 === this.logarithmic ? (0 === a && (a = this.treatZeroAs), h = Math.log(a) * Math.LOG10E - Math.log(k) * Math.LOG10E, c = c ? !0 === e ? d - f * h : f * h : !0 === e ? f * h : d - f * h) : c = !0 === e ? c ? d - f * (a - h) : f * (a - h) : c ? f * (a - h) : d - f * (a - h);
            1E7 < Math.abs(c) && (c = c / Math.abs(c) * 1E7);
            b || (c = Math.round(c));
            return c
        }, synchronizeWithAxis: function (a) {
            this.synchronizeWith = a;
            this.listenTo(this.synchronizeWith, "axisChanged", this.handleSynchronization)
        }, handleSynchronization: function () {
            if (this.synchronizeWith) {
                d.isString(this.synchronizeWith) &&
                (this.synchronizeWith = this.chart.getValueAxisById(this.synchronizeWith));
                var a = this.synchronizeWith, b = a.min, c = a.max, a = a.step, e = this.synchronizationMultiplier;
                e && (this.min = b * e, this.max = c * e, this.step = a * e, b = Math.abs(Math.log(Math.abs(Math.pow(10, Math.floor(Math.log(Math.abs(this.step)) * Math.LOG10E)))) * Math.LOG10E), this.maxDecCount = b = Math.round(b), this.draw())
            }
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.RecAxis = d.Class({
        construct: function (a) {
            var b = a.chart, c = a.axisThickness, e = a.axisColor, g = a.axisAlpha, f = a.offset, h = a.dx, k = a.dy,
                l = a.x, m = a.y, n = a.height, q = a.width, p = b.container;
            "H" == a.orientation ? (e = d.line(p, [0, q], [0, 0], e, g, c), this.axisWidth = a.width, "bottom" == a.position ? (k = c / 2 + f + n + m - 1, c = l) : (k = -c / 2 - f + m + k, c = h + l)) : (this.axisWidth = a.height, "right" == a.position ? (e = d.line(p, [0, 0, -h], [0, n, n - k], e, g, c), k = m + k, c = c / 2 + f + h + q + l - 1) : (e = d.line(p, [0, 0], [0, n], e, g, c), k = m, c = -c / 2 - f + l));
            e.translate(c,
                k);
            c = b.container.set();
            c.push(e);
            b.axesSet.push(c);
            d.setCN(b, e, a.bcn + "line");
            this.axisSet = c;
            this.set = e
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.RecItem = d.Class({
        construct: function (a, b, c, e, g, f, h, k, l, m, n, q) {
            b = Math.round(b);
            var p = a.chart;
            this.value = c;
            void 0 == c && (c = "");
            l || (l = 0);
            void 0 == e && (e = !0);
            var t = p.fontFamily, r = a.fontSize;
            void 0 == r && (r = p.fontSize);
            var w = a.color;
            void 0 == w && (w = p.color);
            void 0 !== n && (w = n);
            var z = a.chart.container, x = z.set();
            this.set = x;
            var u = a.axisThickness, A = a.axisColor, y = a.axisAlpha, B = a.tickLength, D = a.gridAlpha,
                C = a.gridThickness, I = a.gridColor, H = a.dashLength, Q = a.fillColor, M = a.fillAlpha,
                P = a.labelsEnabled;
            n = a.labelRotationR;
            var ia = a.counter, J = a.inside, aa = a.labelOffset, ma = a.dx, na = a.dy, Pa = a.orientation,
                Z = a.position, da = a.previousCoord, X = a.height, xa = a.width, ea = a.offset, fa, Ba;
            h ? (void 0 !== h.id && (q = p.classNamePrefix + "-guide-" + h.id), P = !0, isNaN(h.tickLength) || (B = h.tickLength), void 0 != h.lineColor && (I = h.lineColor), void 0 != h.color && (w = h.color), isNaN(h.lineAlpha) || (D = h.lineAlpha), isNaN(h.dashLength) || (H = h.dashLength), isNaN(h.lineThickness) || (C = h.lineThickness), !0 === h.inside && (J = !0, 0 < ea && (ea = 0)), isNaN(h.labelRotation) ||
            (n = h.labelRotation), isNaN(h.fontSize) || (r = h.fontSize), h.position && (Z = h.position), void 0 !== h.boldLabel && (k = h.boldLabel), isNaN(h.labelOffset) || (aa = h.labelOffset)) : "" === c && (B = 0);
            m && !isNaN(a.minorTickLength) && (B = a.minorTickLength);
            var ga = "start";
            0 < g && (ga = "middle");
            a.centerLabels && (ga = "middle");
            var V = n * Math.PI / 180, Y, Da, G = 0, v = 0, oa = 0, ha = Y = 0, Qa = 0;
            "V" == Pa && (n = 0);
            var ca;
            P && "" !== c && (ca = a.autoWrap && 0 === n ? d.wrappedText(z, c, w, t, r, ga, k, Math.abs(g), 0) : d.text(z, c, w, t, r, ga, k), ga = ca.getBBox(), ha = ga.width, Qa = ga.height);
            if ("H" == Pa) {
                if (0 <= b && b <= xa + 1 && (0 < B && 0 < y && b + l <= xa + 1 && (fa = d.line(z, [b + l, b + l], [0, B], A, y, C), x.push(fa)), 0 < D && (Ba = d.line(z, [b, b + ma, b + ma], [X, X + na, na], I, D, C, H), x.push(Ba))), v = 0, G = b, h && 90 == n && J && (G -= r), !1 === e ? (ga = "start", v = "bottom" == Z ? J ? v + B : v - B : J ? v - B : v + B, G += 3, 0 < g && (G += g / 2 - 3, ga = "middle"), 0 < n && (ga = "middle")) : ga = "middle", 1 == ia && 0 < M && !h && !m && da < xa && (e = d.fitToBounds(b, 0, xa), da = d.fitToBounds(da, 0, xa), Y = e - da, 0 < Y && (Da = d.rect(z, Y, a.height, Q, M), Da.translate(e - Y + ma, na), x.push(Da))), "bottom" == Z ? (v += X + r / 2 + ea, J ? (0 < n ? (v =
                    X - ha / 2 * Math.sin(V) - B - 3, a.centerRotatedLabels || (G += ha / 2 * Math.cos(V) - 4 + 2)) : 0 > n ? (v = X + ha * Math.sin(V) - B - 3 + 2, G += -ha * Math.cos(V) - Qa * Math.sin(V) - 4) : v -= B + r + 3 + 3, v -= aa) : (0 < n ? (v = X + ha / 2 * Math.sin(V) + B + 3, a.centerRotatedLabels || (G -= ha / 2 * Math.cos(V))) : 0 > n ? (v = X + B + 3 - ha / 2 * Math.sin(V) + 2, G += ha / 2 * Math.cos(V)) : v += B + u + 3 + 3, v += aa)) : (v += na + r / 2 - ea, G += ma, J ? (0 < n ? (v = ha / 2 * Math.sin(V) + B + 3, a.centerRotatedLabels || (G -= ha / 2 * Math.cos(V))) : v += B + 3, v += aa) : (0 < n ? (v = -(ha / 2) * Math.sin(V) - B - 6, a.centerRotatedLabels || (G += ha / 2 * Math.cos(V))) : v -= B +
                    r + 3 + u + 3, v -= aa)), "bottom" == Z ? Y = (J ? X - B - 1 : X + u - 1) + ea : (oa = ma, Y = (J ? na : na - B - u + 1) - ea), f && (G += f), r = G, 0 < n && (r += ha / 2 * Math.cos(V)), ca && (f = 0, J && (f = ha / 2 * Math.cos(V)), r + f > xa + 2 || 0 > r)) ca.remove(), ca = null
            } else {
                0 <= b && b <= X + 1 && (0 < B && 0 < y && b + l <= X + 1 && (fa = d.line(z, [0, B + 1], [b + l, b + l], A, y, C), x.push(fa)), 0 < D && (Ba = d.line(z, [0, ma, xa + ma], [b, b + na, b + na], I, D, C, H), x.push(Ba)));
                ga = "end";
                if (!0 === J && "left" == Z || !1 === J && "right" == Z) ga = "start";
                v = b - Qa / 2 + 2;
                1 == ia && 0 < M && !h && !m && (e = d.fitToBounds(b, 0, X), da = d.fitToBounds(da, 0, X), V = e - da, Da = d.polygon(z,
                    [0, a.width, a.width, 0], [0, 0, V, V], Q, M), Da.translate(ma, e - V + na), x.push(Da));
                v += r / 2;
                "right" == Z ? (G += ma + xa + ea, v += na, J ? (f || (v -= r / 2 + 3), G = G - (B + 4) - aa) : (G += B + 4 + u, v -= 2, G += aa)) : J ? (G += B + 4 - ea, f || (v -= r / 2 + 3), h && (G += ma, v += na), G += aa) : (G += -B - u - 4 - 2 - ea, v -= 2, G -= aa);
                fa && ("right" == Z ? (oa += ma + ea + xa - 1, Y += na, oa = J ? oa - u : oa + u) : (oa -= ea, J || (oa -= B + u)));
                f && (v += f);
                J = -3;
                "right" == Z && (J += na);
                ca && (v > X + 1 || v < J - r / 10) && (ca.remove(), ca = null)
            }
            fa && (fa.translate(oa, Y), d.setCN(p, fa, a.bcn + "tick"), d.setCN(p, fa, q, !0), h && d.setCN(p, fa, "guide"));
            !1 ===
            a.visible && (fa && fa.remove(), ca && (ca.remove(), ca = null));
            ca && (ca.attr({"text-anchor": ga}), ca.translate(G, v, NaN, !0), 0 !== n && ca.rotate(-n, a.chart.backgroundColor), a.allLabels.push(ca), this.label = ca, d.setCN(p, ca, a.bcn + "label"), d.setCN(p, ca, q, !0), h && d.setCN(p, ca, "guide"));
            Ba && (d.setCN(p, Ba, a.bcn + "grid"), d.setCN(p, Ba, q, !0), h && d.setCN(p, Ba, "guide"));
            Da && (d.setCN(p, Da, a.bcn + "fill"), d.setCN(p, Da, q, !0));
            m ? Ba && d.setCN(p, Ba, a.bcn + "grid-minor") : (a.counter = 0 === ia ? 1 : 0, a.previousCoord = b);
            0 === this.set.node.childNodes.length &&
            this.set.remove()
        }, graphics: function () {
            return this.set
        }, getLabel: function () {
            return this.label
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.RecFill = d.Class({
        construct: function (a, b, c, e) {
            var g = a.dx, f = a.dy, h = a.orientation, k = 0;
            if (c < b) {
                var l = b;
                b = c;
                c = l
            }
            var m = e.fillAlpha;
            isNaN(m) && (m = 0);
            var l = a.chart.container, n = e.fillColor;
            "V" == h ? (b = d.fitToBounds(b, 0, a.height), c = d.fitToBounds(c, 0, a.height)) : (b = d.fitToBounds(b, 0, a.width), c = d.fitToBounds(c, 0, a.width));
            c -= b;
            isNaN(c) && (c = 4, k = 2, m = 0);
            0 > c && "object" == typeof n && (n = n.join(",").split(",").reverse());
            "V" == h ? (h = d.rect(l, a.width, c, n, m), h.translate(g, b - k + f)) : (h = d.rect(l,
                c, a.height, n, m), h.translate(b - k + g, f));
            d.setCN(a.chart, h, "guide-fill");
            e.id && d.setCN(a.chart, h, "guide-fill-" + e.id);
            this.set = l.set([h])
        }, graphics: function () {
            return this.set
        }, getLabel: function () {
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.AmChart = d.Class({
        construct: function (a) {
            this.svgIcons = this.tapToActivate = !0;
            this.theme = a;
            this.classNamePrefix = "amcharts";
            this.addClassNames = !1;
            this.version = "3.21.14";
            d.addChart(this);
            this.createEvents("buildStarted", "dataUpdated", "init", "rendered", "drawn", "failed", "resized", "animationFinished");
            this.height = this.width = "100%";
            this.dataChanged = !0;
            this.chartCreated = !1;
            this.previousWidth = this.previousHeight = 0;
            this.backgroundColor = "#FFFFFF";
            this.borderAlpha = this.backgroundAlpha =
                0;
            this.color = this.borderColor = "#000000";
            this.fontFamily = "Verdana";
            this.fontSize = 11;
            this.usePrefixes = !1;
            this.autoResize = !0;
            this.autoDisplay = !1;
            this.addCodeCredits = this.accessible = !0;
            this.touchStartTime = this.touchClickDuration = 0;
            this.precision = -1;
            this.percentPrecision = 2;
            this.decimalSeparator = ".";
            this.thousandsSeparator = ",";
            this.labels = [];
            this.allLabels = [];
            this.titles = [];
            this.marginRight = this.marginLeft = this.autoMarginOffset = 0;
            this.timeOuts = [];
            this.creditsPosition = "top-left";
            var b = document.createElement("div"),
                c = b.style;
            c.overflow = "hidden";
            c.position = "relative";
            c.textAlign = "left";
            this.chartDiv = b;
            b = document.createElement("div");
            c = b.style;
            c.overflow = "hidden";
            c.position = "relative";
            c.textAlign = "left";
            this.legendDiv = b;
            this.titleHeight = 0;
            this.hideBalloonTime = 150;
            this.handDrawScatter = 2;
            this.cssScale = this.handDrawThickness = 1;
            this.cssAngle = 0;
            this.prefixesOfBigNumbers = [{number: 1E3, prefix: "k"}, {number: 1E6, prefix: "M"}, {
                number: 1E9,
                prefix: "G"
            }, {number: 1E12, prefix: "T"}, {number: 1E15, prefix: "P"}, {number: 1E18, prefix: "E"},
                {number: 1E21, prefix: "Z"}, {number: 1E24, prefix: "Y"}];
            this.prefixesOfSmallNumbers = [{number: 1E-24, prefix: "y"}, {number: 1E-21, prefix: "z"}, {
                number: 1E-18,
                prefix: "a"
            }, {number: 1E-15, prefix: "f"}, {number: 1E-12, prefix: "p"}, {number: 1E-9, prefix: "n"}, {
                number: 1E-6,
                prefix: "\u03bc"
            }, {number: .001, prefix: "m"}];
            this.panEventsEnabled = !0;
            this.product = "amcharts";
            this.animations = [];
            this.balloon = new d.AmBalloon(this.theme);
            this.balloon.chart = this;
            this.processTimeout = 0;
            this.processCount = 1E3;
            this.animatable = [];
            this.langObj = {};
            d.applyTheme(this, a, "AmChart")
        }, drawChart: function () {
            0 < this.realWidth && 0 < this.realHeight && (this.drawBackground(), this.redrawLabels(), this.drawTitles(), this.brr(), this.renderFix(), this.chartDiv && (this.boundingRect = this.chartDiv.getBoundingClientRect()))
        }, makeAccessible: function (a, b, c) {
            this.accessible && a && (c && a.setAttr("role", c), a.setAttr("aria-label", b))
        }, drawBackground: function () {
            d.remove(this.background);
            var a = this.container, b = this.backgroundColor, c = this.backgroundAlpha, e = this.set;
            d.isModern || 0 !==
            c || (c = .001);
            var g = this.updateWidth();
            this.realWidth = g;
            var f = this.updateHeight();
            this.realHeight = f;
            b = d.polygon(a, [0, g - 1, g - 1, 0], [0, 0, f - 1, f - 1], b, c, 1, this.borderColor, this.borderAlpha);
            d.setCN(this, b, "bg");
            this.background = b;
            e.push(b);
            if (b = this.backgroundImage) a = a.image(b, 0, 0, g, f), d.setCN(this, b, "bg-image"), this.bgImg = a, e.push(a)
        }, drawTitles: function (a) {
            var b = this.titles;
            this.titleHeight = 0;
            if (d.ifArray(b)) {
                var c = 20, e;
                for (e = 0; e < b.length; e++) {
                    var g = b[e], g = d.processObject(g, d.Title, this.theme);
                    if (!1 !== g.enabled) {
                        var f =
                            g.color;
                        void 0 === f && (f = this.color);
                        var h = g.size;
                        isNaN(h) && (h = this.fontSize + 2);
                        isNaN(g.alpha);
                        var k = this.marginLeft, l = !0;
                        void 0 !== g.bold && (l = g.bold);
                        f = d.wrappedText(this.container, g.text, f, this.fontFamily, h, "middle", l, this.realWidth - 35 - this.marginRight - k);
                        f.translate(k + (this.realWidth - this.marginRight - k) / 2, c);
                        f.node.style.pointerEvents = "none";
                        g.sprite = f;
                        void 0 !== g.tabIndex && f.setAttr("tabindex", g.tabIndex);
                        d.setCN(this, f, "title");
                        g.id && d.setCN(this, f, "title-" + g.id);
                        f.attr({opacity: g.alpha});
                        c += f.getBBox().height +
                            5;
                        a ? f.remove() : this.freeLabelsSet.push(f)
                    }
                }
                this.titleHeight = c - 10
            }
        }, write: function (a) {
            var b = this;
            if (b.listeners) for (var c = 0; c < b.listeners.length; c++) {
                var e = b.listeners[c];
                b.addListener(e.event, e.method)
            }
            b.fire({type: "buildStarted", chart: b});
            b.afterWriteTO && clearTimeout(b.afterWriteTO);
            0 < b.processTimeout ? b.afterWriteTO = setTimeout(function () {
                b.afterWrite.call(b, a)
            }, b.processTimeout) : b.afterWrite(a)
        }, afterWrite: function (a) {
            var b;
            if (b = "object" != typeof a ? document.getElementById(a) : a) {
                for (; b.firstChild;) b.removeChild(b.firstChild);
                this.div = b;
                b.style.overflow = "hidden";
                b.style.textAlign = "left";
                a = this.chartDiv;
                var c = this.legendDiv, e = this.legend, g = c.style, f = a.style;
                this.measure();
                this.previousHeight = this.divRealHeight;
                this.previousWidth = this.divRealWidth;
                var h, k = document.createElement("div");
                h = k.style;
                h.position = "relative";
                this.containerDiv = k;
                k.className = this.classNamePrefix + "-main-div";
                a.className = this.classNamePrefix + "-chart-div";
                b.appendChild(k);
                (b = this.exportConfig) && d.AmExport && !this.AmExport && (this.AmExport = new d.AmExport(this,
                    b));
                this.amExport && d.AmExport && (this.AmExport = d.extend(this.amExport, new d.AmExport(this), !0));
                this.AmExport && this.AmExport.init && this.AmExport.init();
                if (e) {
                    e = this.addLegend(e, e.divId);
                    if (e.enabled) switch (g.left = null, g.top = null, g.right = null, f.left = null, f.right = null, f.top = null, g.position = "relative", f.position = "relative", h.width = "100%", h.height = "100%", e.position) {
                        case "bottom":
                            k.appendChild(a);
                            k.appendChild(c);
                            break;
                        case "top":
                            k.appendChild(c);
                            k.appendChild(a);
                            break;
                        case "absolute":
                            g.position = "absolute";
                            f.position = "absolute";
                            void 0 !== e.left && (g.left = e.left + "px");
                            void 0 !== e.right && (g.right = e.right + "px");
                            void 0 !== e.top && (g.top = e.top + "px");
                            void 0 !== e.bottom && (g.bottom = e.bottom + "px");
                            e.marginLeft = 0;
                            e.marginRight = 0;
                            k.appendChild(a);
                            k.appendChild(c);
                            break;
                        case "right":
                            g.position = "relative";
                            f.position = "absolute";
                            k.appendChild(a);
                            k.appendChild(c);
                            break;
                        case "left":
                            g.position = "absolute";
                            f.position = "relative";
                            k.appendChild(a);
                            k.appendChild(c);
                            break;
                        case "outside":
                            k.appendChild(a)
                    } else k.appendChild(a);
                    this.prevLegendPosition =
                        e.position
                } else k.appendChild(a);
                this.listenersAdded || (this.addListeners(), this.listenersAdded = !0);
                (this.mouseWheelScrollEnabled || this.mouseWheelZoomEnabled) && d.addWheelListeners();
                this.initChart()
            }
        }, createLabelsSet: function () {
            d.remove(this.labelsSet);
            this.labelsSet = this.container.set();
            this.freeLabelsSet.push(this.labelsSet)
        }, initChart: function () {
            this.balloon = d.processObject(this.balloon, d.AmBalloon, this.theme);
            window.AmCharts_path && (this.path = window.AmCharts_path);
            void 0 === this.path && (this.path =
                d.getPath());
            void 0 === this.path && (this.path = "amcharts/");
            this.path = d.normalizeUrl(this.path);
            void 0 === this.pathToImages && (this.pathToImages = this.path + "images/");
            this.initHC || (d.callInitHandler(this), this.initHC = !0);
            d.applyLang(this.language, this);
            var a = this.numberFormatter;
            a && (isNaN(a.precision) || (this.precision = a.precision), void 0 !== a.thousandsSeparator && (this.thousandsSeparator = a.thousandsSeparator), void 0 !== a.decimalSeparator && (this.decimalSeparator = a.decimalSeparator));
            (a = this.percentFormatter) &&
            !isNaN(a.precision) && (this.percentPrecision = a.precision);
            this.nf = {
                precision: this.precision,
                thousandsSeparator: this.thousandsSeparator,
                decimalSeparator: this.decimalSeparator
            };
            this.pf = {
                precision: this.percentPrecision,
                thousandsSeparator: this.thousandsSeparator,
                decimalSeparator: this.decimalSeparator
            };
            this.destroy();
            (a = this.container) ? (a.container.innerHTML = "", a.width = this.realWidth, a.height = this.realHeight, a.addDefs(this), this.chartDiv.appendChild(a.container)) : a = new d.AmDraw(this.chartDiv, this.realWidth,
                this.realHeight, this);
            this.container = a;
            this.extension = ".png";
            this.svgIcons && d.SVG && (this.extension = ".svg");
            this.checkDisplay();
            this.checkTransform(this.div);
            a.chart = this;
            d.VML || d.SVG ? (a.handDrawn = this.handDrawn, a.handDrawScatter = this.handDrawScatter, a.handDrawThickness = this.handDrawThickness, d.remove(this.set), this.set = a.set(), d.remove(this.gridSet), this.gridSet = a.set(), d.remove(this.cursorLineSet), this.cursorLineSet = a.set(), d.remove(this.graphsBehindSet), this.graphsBehindSet = a.set(), d.remove(this.bulletBehindSet),
                this.bulletBehindSet = a.set(), d.remove(this.columnSet), this.columnSet = a.set(), d.remove(this.graphsSet), this.graphsSet = a.set(), d.remove(this.trendLinesSet), this.trendLinesSet = a.set(), d.remove(this.axesSet), this.axesSet = a.set(), d.remove(this.cursorSet), this.cursorSet = a.set(), d.remove(this.scrollbarsSet), this.scrollbarsSet = a.set(), d.remove(this.bulletSet), this.bulletSet = a.set(), d.remove(this.freeLabelsSet), this.freeLabelsSet = a.set(), d.remove(this.axesLabelsSet), this.axesLabelsSet = a.set(), d.remove(this.balloonsSet),
                this.balloonsSet = a.set(), d.remove(this.plotBalloonsSet), this.plotBalloonsSet = a.set(), d.remove(this.zoomButtonSet), this.zoomButtonSet = a.set(), d.remove(this.zbSet), this.zbSet = null, d.remove(this.linkSet), this.linkSet = a.set()) : this.fire({
                type: "failed",
                chart: this
            })
        }, premeasure: function () {
            var a = this.div;
            if (a) {
                try {
                    this.boundingRect = this.chartDiv.getBoundingClientRect()
                } catch (e) {
                }
                var b = a.offsetWidth, c = a.offsetHeight;
                a.clientHeight && (b = a.clientWidth, c = a.clientHeight);
                if (b != this.mw || c != this.mh) this.mw = b, this.mh =
                    c, this.measure()
            }
        }, measure: function () {
            var a = this.div;
            if (a) {
                var b = this.chartDiv, c = a.offsetWidth, e = a.offsetHeight, g = this.container;
                a.clientHeight && (c = a.clientWidth, e = a.clientHeight);
                var e = Math.round(e), c = Math.round(c), a = Math.round(d.toCoordinate(this.width, c)),
                    f = Math.round(d.toCoordinate(this.height, e));
                (c != this.previousWidth || e != this.previousHeight) && 0 < a && 0 < f && (b.style.width = a + "px", b.style.height = f + "px", b.style.padding = 0, g && g.setSize(a, f), this.balloon = d.processObject(this.balloon, d.AmBalloon, this.theme));
                this.balloon && this.balloon.setBounds && this.balloon.setBounds(2, 2, a - 2, f);
                this.updateWidth();
                this.balloon.chart = this;
                this.realWidth = a;
                this.realHeight = f;
                this.divRealWidth = c;
                this.divRealHeight = e
            }
        }, checkDisplay: function () {
            if (this.autoDisplay && this.container) {
                var a = d.rect(this.container, 10, 10), b = a.getBBox();
                0 === b.width && 0 === b.height && (this.divRealHeight = this.divRealWidth = this.realHeight = this.realWidth = 0, this.previousWidth = this.previousHeight = NaN);
                a.remove()
            }
        }, checkTransform: function (a) {
            if (this.autoTransform &&
                window.getComputedStyle && a) {
                if (a.style) {
                    var b = window.getComputedStyle(a, null);
                    if (b && (b = b.getPropertyValue("-webkit-transform") || b.getPropertyValue("-moz-transform") || b.getPropertyValue("-ms-transform") || b.getPropertyValue("-o-transform") || b.getPropertyValue("transform")) && "none" !== b) {
                        var c = b.split("(")[1].split(")")[0].split(","), b = c[0], c = c[1],
                            b = Math.sqrt(b * b + c * c);
                        isNaN(b) || (this.cssScale *= b)
                    }
                }
                a.parentNode && this.checkTransform(a.parentNode)
            }
        }, destroy: function () {
            this.chartDiv.innerHTML = "";
            this.clearTimeOuts();
            this.legend && this.legend.destroy && this.legend.destroy()
        }, clearTimeOuts: function () {
            var a = this.timeOuts;
            if (a) {
                var b;
                for (b = 0; b < a.length; b++) clearTimeout(a[b])
            }
            this.timeOuts = []
        }, clear: function (a) {
            try {
                document.removeEventListener("touchstart", this.docfn1, !0), document.removeEventListener("touchend", this.docfn2, !0)
            } catch (b) {
            }
            d.callMethod("clear", [this.chartScrollbar, this.scrollbarV, this.scrollbarH, this.chartCursor]);
            this.chartCursor = this.scrollbarH = this.scrollbarV = this.chartScrollbar = null;
            this.clearTimeOuts();
            this.container && (this.container.remove(this.chartDiv), this.container.remove(this.legendDiv));
            a || d.removeChart(this);
            if (a = this.div) for (; a.firstChild;) a.removeChild(a.firstChild);
            this.legend && this.legend.destroy && this.legend.destroy();
            this.AmExport && this.AmExport.clear && this.AmExport.clear()
        }, setMouseCursor: function (a) {
            "auto" == a && d.isNN && (a = "default");
            this.chartDiv.style.cursor = a;
            this.legendDiv.style.cursor = a
        }, redrawLabels: function () {
            this.labels = [];
            var a = this.allLabels;
            this.createLabelsSet();
            var b;
            for (b = 0; b < a.length; b++) this.drawLabel(a[b])
        }, drawLabel: function (a) {
            var b = this;
            if (b.container && !1 !== a.enabled) {
                a = d.processObject(a, d.Label, b.theme);
                var c = a.y, e = a.text, g = a.align, f = a.size, h = a.color, k = a.rotation, l = a.alpha, m = a.bold,
                    n = d.toCoordinate(a.x, b.realWidth), c = d.toCoordinate(c, b.realHeight);
                n || (n = 0);
                c || (c = 0);
                void 0 === h && (h = b.color);
                isNaN(f) && (f = b.fontSize);
                g || (g = "start");
                "left" == g && (g = "start");
                "right" == g && (g = "end");
                "center" == g && (g = "middle", k ? c = b.realHeight - c + c / 2 : n = b.realWidth / 2 - n);
                void 0 === l && (l =
                    1);
                void 0 === k && (k = 0);
                c += f / 2;
                e = d.text(b.container, e, h, b.fontFamily, f, g, m, l);
                e.translate(n, c);
                void 0 !== a.tabIndex && e.setAttr("tabindex", a.tabIndex);
                d.setCN(b, e, "label");
                a.id && d.setCN(b, e, "label-" + a.id);
                0 !== k && e.rotate(k);
                a.url ? (e.setAttr("cursor", "pointer"), e.click(function () {
                    d.getURL(a.url, b.urlTarget)
                })) : e.node.style.pointerEvents = "none";
                b.labelsSet.push(e);
                b.labels.push(e)
            }
        }, addLabel: function (a, b, c, e, d, f, h, k, l, m) {
            a = {x: a, y: b, text: c, align: e, size: d, color: f, alpha: k, rotation: h, bold: l, url: m, enabled: !0};
            this.container && this.drawLabel(a);
            this.allLabels.push(a)
        }, clearLabels: function () {
            var a = this.labels, b;
            for (b = a.length - 1; 0 <= b; b--) a[b].remove();
            this.labels = [];
            this.allLabels = []
        }, updateHeight: function () {
            var a = this.divRealHeight, b = this.legend;
            if (b) {
                var c = this.legendDiv.offsetHeight, b = b.position;
                if ("top" == b || "bottom" == b) {
                    a -= c;
                    if (0 > a || isNaN(a)) a = 0;
                    this.chartDiv.style.height = a + "px"
                }
            }
            return a
        }, updateWidth: function () {
            var a = this.divRealWidth, b = this.divRealHeight, c = this.legend;
            if (c) {
                var e = this.legendDiv, d = e.offsetWidth;
                isNaN(c.width) || (d = c.width);
                c.ieW && (d = c.ieW);
                var f = e.offsetHeight, e = e.style, h = this.chartDiv.style, k = c.position;
                if (("right" == k || "left" == k) && void 0 === c.divId) {
                    a -= d;
                    if (0 > a || isNaN(a)) a = 0;
                    h.width = a + "px";
                    this.balloon && this.balloon.setBounds && this.balloon.setBounds(2, 2, a - 2, this.realHeight);
                    "left" == k ? (h.left = d + "px", e.left = "0px") : (h.left = "0px", e.left = a + "px");
                    b > f && (e.top = (b - f) / 2 + "px")
                }
            }
            return a
        }, getTitleHeight: function () {
            this.drawTitles(!0);
            return this.titleHeight
        }, addTitle: function (a, b, c, e, d) {
            isNaN(b) && (b =
                this.fontSize + 2);
            a = {text: a, size: b, color: c, alpha: e, bold: d, enabled: !0};
            this.titles.push(a);
            return a
        }, handleWheel: function (a) {
            var b = 0;
            a || (a = window.event);
            a.wheelDelta ? b = a.wheelDelta / 120 : a.detail && (b = -a.detail / 3);
            b && this.handleWheelReal(b, a.shiftKey);
            a.preventDefault && a.preventDefault()
        }, handleWheelReal: function () {
        }, handleDocTouchStart: function () {
            this.handleMouseMove();
            this.tmx = this.mouseX;
            this.tmy = this.mouseY;
            this.touchStartTime = (new Date).getTime()
        }, handleDocTouchEnd: function () {
            -.5 < this.tmx && this.tmx <
            this.divRealWidth + 1 && 0 < this.tmy && this.tmy < this.divRealHeight ? (this.handleMouseMove(), 4 > Math.abs(this.mouseX - this.tmx) && 4 > Math.abs(this.mouseY - this.tmy) ? (this.tapped = !0, this.panRequired && this.panEventsEnabled && this.chartDiv && (this.chartDiv.style.msTouchAction = "none", this.chartDiv.style.touchAction = "none")) : this.mouseIsOver || this.resetTouchStyle()) : (this.tapped = !1, this.resetTouchStyle())
        }, resetTouchStyle: function () {
            this.panEventsEnabled && this.chartDiv && (this.chartDiv.style.msTouchAction = "auto", this.chartDiv.style.touchAction =
                "auto")
        }, checkTouchDuration: function (a) {
            var b = this, c = (new Date).getTime();
            if (a) if (a.touches) b.isTouchEvent = !0; else if (!b.isTouchEvent) return !0;
            if (c - b.touchStartTime > b.touchClickDuration) return !0;
            setTimeout(function () {
                b.resetTouchDuration()
            }, 300)
        }, resetTouchDuration: function () {
            this.isTouchEvent = !1
        }, checkTouchMoved: function () {
            if (4 < Math.abs(this.mouseX - this.tmx) || 4 < Math.abs(this.mouseY - this.tmy)) return !0
        }, addListeners: function () {
            var a = this, b = a.chartDiv;
            document.addEventListener ? ("ontouchstart" in document.documentElement &&
            (b.addEventListener("touchstart", function (b) {
                a.handleTouchStart.call(a, b)
            }, !0), b.addEventListener("touchmove", function (b) {
                a.handleMouseMove.call(a, b)
            }, !0), b.addEventListener("touchend", function (b) {
                a.handleTouchEnd.call(a, b)
            }, !0), a.docfn1 = function (b) {
                a.handleDocTouchStart.call(a, b)
            }, a.docfn2 = function (b) {
                a.handleDocTouchEnd.call(a, b)
            }, document.addEventListener("touchstart", a.docfn1, !0), document.addEventListener("touchend", a.docfn2, !0)), b.addEventListener("mousedown", function (b) {
                a.mouseIsOver = !0;
                a.handleMouseMove.call(a,
                    b);
                a.handleMouseDown.call(a, b);
                a.handleDocTouchStart.call(a, b)
            }, !0), b.addEventListener("mouseover", function (b) {
                a.handleMouseOver.call(a, b)
            }, !0), b.addEventListener("mouseout", function (b) {
                a.handleMouseOut.call(a, b)
            }, !0), b.addEventListener("mouseup", function (b) {
                a.handleDocTouchEnd.call(a, b)
            }, !0)) : (b.attachEvent("onmousedown", function (b) {
                a.handleMouseDown.call(a, b)
            }), b.attachEvent("onmouseover", function (b) {
                a.handleMouseOver.call(a, b)
            }), b.attachEvent("onmouseout", function (b) {
                a.handleMouseOut.call(a, b)
            }))
        },
        dispDUpd: function () {
            this.skipEvents || (this.dispatchDataUpdated && (this.dispatchDataUpdated = !1, this.fire({
                type: "dataUpdated",
                chart: this
            })), this.chartCreated || (this.chartCreated = !0, this.fire({
                type: "init",
                chart: this
            })), !this.chartRendered && 0 < this.divRealWidth && 0 < this.divRealHeight && (this.fire({
                type: "rendered",
                chart: this
            }), this.chartRendered = !0), this.fire({type: "drawn", chart: this}));
            this.skipEvents = !1
        }, validateSize: function () {
            var a = this;
            a.premeasure();
            a.checkDisplay();
            a.cssScale = 1;
            a.cssAngle = 0;
            a.checkTransform(a.div);
            if (a.divRealWidth != a.previousWidth || a.divRealHeight != a.previousHeight) {
                var b = a.legend;
                if (0 < a.realWidth && 0 < a.realHeight) {
                    a.sizeChanged = !0;
                    if (b) {
                        a.legendInitTO && clearTimeout(a.legendInitTO);
                        var c = setTimeout(function () {
                            b.invalidateSize()
                        }, 10);
                        a.timeOuts.push(c);
                        a.legendInitTO = c
                    }
                    a.marginsUpdated = !1;
                    clearTimeout(a.initTO);
                    c = setTimeout(function () {
                        a.initChart()
                    }, 10);
                    a.timeOuts.push(c);
                    a.initTO = c
                }
                a.renderFix();
                b && b.renderFix && b.renderFix();
                a.positionCred();
                clearTimeout(a.resizedTO);
                a.resizedTO = setTimeout(function () {
                    a.fire({
                        type: "resized",
                        chart: a
                    })
                }, 10);
                a.previousHeight = a.divRealHeight;
                a.previousWidth = a.divRealWidth
            }
        }, invalidateSize: function () {
            this.previousHeight = this.previousWidth = NaN;
            this.invalidateSizeReal()
        }, invalidateSizeReal: function () {
            var a = this;
            a.marginsUpdated = !1;
            clearTimeout(a.validateTO);
            var b = setTimeout(function () {
                a.validateSize()
            }, 5);
            a.timeOuts.push(b);
            a.validateTO = b
        }, validateData: function (a) {
            this.chartCreated && (this.dataChanged = !0, this.marginsUpdated = !1, this.initChart(a))
        }, validateNow: function (a, b) {
            this.initTO && clearTimeout(this.initTO);
            a && (this.dataChanged = !0, this.marginsUpdated = !1);
            this.skipEvents = b;
            this.chartRendered = !1;
            var c = this.legend;
            c && c.position != this.prevLegendPosition && (this.previousWidth = this.mw = 0, c.invalidateSize && (c.invalidateSize(), this.validateSize()));
            this.write(this.div)
        }, showItem: function (a) {
            a.hidden = !1;
            this.initChart()
        }, hideItem: function (a) {
            a.hidden = !0;
            this.initChart()
        }, hideBalloon: function () {
            var a = this;
            clearTimeout(a.hoverInt);
            clearTimeout(a.balloonTO);
            a.hoverInt = setTimeout(function () {
                    a.hideBalloonReal.call(a)
                },
                a.hideBalloonTime)
        }, cleanChart: function () {
        }, hideBalloonReal: function () {
            var a = this.balloon;
            a && a.hide && a.hide()
        }, showBalloon: function (a, b, c, e, d) {
            var f = this;
            clearTimeout(f.balloonTO);
            clearTimeout(f.hoverInt);
            f.balloonTO = setTimeout(function () {
                f.showBalloonReal.call(f, a, b, c, e, d)
            }, 1)
        }, showBalloonReal: function (a, b, c, e, d) {
            this.handleMouseMove();
            var f = this.balloon;
            f.enabled && (f.followCursor(!1), f.changeColor(b), !c || f.fixedPosition ? (f.setPosition(e, d), isNaN(e) || isNaN(d) ? f.followCursor(!0) : f.followCursor(!1)) :
                f.followCursor(!0), a && f.showBalloon(a))
        }, handleMouseOver: function () {
            this.outTO && clearTimeout(this.outTO);
            d.resetMouseOver();
            this.mouseIsOver = !0
        }, handleMouseOut: function () {
            var a = this;
            d.resetMouseOver();
            a.outTO && clearTimeout(a.outTO);
            a.outTO = setTimeout(function () {
                a.handleMouseOutReal()
            }, 10)
        }, handleMouseOutReal: function () {
            this.mouseIsOver = !1
        }, handleMouseMove: function (a) {
            a || (a = window.event);
            this.mouse2Y = this.mouse2X = NaN;
            var b, c, e, d;
            if (a) {
                if (a.touches) {
                    var f = a.touches.item(1);
                    f && this.panEventsEnabled &&
                    this.boundingRect && (e = f.clientX - this.boundingRect.left, d = f.clientY - this.boundingRect.top);
                    a = a.touches.item(0);
                    if (!a) return
                } else this.wasTouched = !1;
                this.boundingRect && a.clientX && (b = a.clientX - this.boundingRect.left, c = a.clientY - this.boundingRect.top);
                isNaN(e) ? this.mouseX = b : (this.mouseX = Math.min(b, e), this.mouse2X = Math.max(b, e));
                isNaN(d) ? this.mouseY = c : (this.mouseY = Math.min(c, d), this.mouse2Y = Math.max(c, d));
                this.autoTransform && (this.mouseX /= this.cssScale, this.mouseY /= this.cssScale)
            }
        }, handleTouchStart: function (a) {
            this.hideBalloonReal();
            a && (a.touches && this.tapToActivate && !this.tapped || !this.panRequired) || (this.handleMouseMove(a), this.handleMouseDown(a))
        }, handleTouchEnd: function (a) {
            this.wasTouched = !0;
            this.handleMouseMove(a);
            d.resetMouseOver();
            this.handleReleaseOutside(a)
        }, handleReleaseOutside: function () {
            this.handleDocTouchEnd.call(this)
        }, handleMouseDown: function (a) {
            d.resetMouseOver();
            this.mouseIsOver = !0;
            a && a.preventDefault && (this.panEventsEnabled ? a.preventDefault() : a.touches || a.preventDefault())
        }, handleKeyUp: function (a) {
        }, addLegend: function (a,
                                b) {
            a = d.processObject(a, d.AmLegend, this.theme);
            a.divId = b;
            a.ieW = 0;
            var c;
            c = "object" != typeof b && b ? document.getElementById(b) : b;
            this.legend = a;
            a.chart = this;
            c ? (a.div = c, a.position = "outside", a.autoMargins = !1) : a.div = this.legendDiv;
            return a
        }, removeLegend: function () {
            this.legend = void 0;
            this.previousWidth = 0;
            this.legendDiv.innerHTML = ""
        }, handleResize: function () {
            (d.isPercents(this.width) || d.isPercents(this.height)) && this.invalidateSizeReal();
            this.renderFix()
        }, renderFix: function () {
            if (!d.VML) {
                var a = this.container;
                a &&
                a.renderFix()
            }
        }, getSVG: function () {
            if (d.hasSVG) return this.container
        }, animate: function (a, b, c, e, g, f, h) {
            a["an_" + b] && d.removeFromArray(this.animations, a["an_" + b]);
            c = {obj: a, frame: 0, attribute: b, from: c, to: e, time: g, effect: f, suffix: h};
            a["an_" + b] = c;
            this.animations.push(c);
            return c
        }, setLegendData: function (a) {
            var b = this.legend;
            b && b.setData(a)
        }, stopAnim: function (a) {
            d.removeFromArray(this.animations, a)
        }, updateAnimations: function () {
            var a;
            this.container && this.container.update();
            if (this.animations) for (a = this.animations.length -
                1; 0 <= a; a--) {
                var b = this.animations[a], c = d.updateRate * b.time, e = b.frame + 1, g = b.obj, f = b.attribute;
                if (e <= c) {
                    b.frame++;
                    var h = Number(b.from), k = Number(b.to) - h, c = d[b.effect](0, e, h, k, c);
                    0 === k ? (this.animations.splice(a, 1), g.node.style[f] = Number(b.to) + b.suffix) : g.node.style[f] = c + b.suffix
                } else g.node.style[f] = Number(b.to) + b.suffix, g.animationFinished = !0, this.animations.splice(a, 1)
            }
        }, update: function () {
            this.updateAnimations();
            var a = this.animatable;
            if (0 < a.length) {
                for (var b = !0, c = a.length - 1; 0 <= c; c--) {
                    var e = a[c];
                    e &&
                    (e.animationFinished ? a.splice(c, 1) : b = !1)
                }
                b && (this.fire({type: "animationFinished", chart: this}), this.animatable = [])
            }
        }, inIframe: function () {
            try {
                return window.self !== window.top
            } catch (a) {
                return !0
            }
        }, brr: function () {
            if (!this.hideCredits) {
                var a = "amcharts.com", b = window.location.hostname.split("."), c;
                2 <= b.length && (c = b[b.length - 2] + "." + b[b.length - 1]);
                this.amLink && (b = this.amLink.parentNode) && b.removeChild(this.amLink);
                if (c != a || !0 === this.inIframe()) {
                    c = a = "http://www." + a;
                    var b = "JavaScript charts", e = "JS chart by amCharts";
                    "ammap" == this.product && (c = a + "/javascript-maps/", b = "Interactive JavaScript maps", e = "JS map by amCharts");
                    a = document.createElement("a");
                    e = document.createTextNode(e);
                    a.setAttribute("href", c);
                    a.setAttribute("title", b);
                    this.urlTarget && a.setAttribute("target", this.urlTarget);
                    a.appendChild(e);
                    this.chartDiv.appendChild(a);
                    this.amLink = a;
                    a = a.style;
                    a.position = "absolute";
                    a.textDecoration = "none";
                    a.color = this.color;
                    a.fontFamily = this.fontFamily;
                    a.fontSize = "11px";
                    a.opacity = .7;
                    a.display = "block";
                    this.positionCred()
                }
            }
        },
        positionCred: function () {
            var a = this.amLink;
            if (a) {
                var b = this.creditsPosition, c = a.style, e = a.offsetWidth, a = a.offsetHeight, d = 0, f = 0,
                    h = this.realWidth, k = this.realHeight, l = this.type;
                if ("serial" == l || "xy" == l || "gantt" == l) d = this.marginLeftReal, f = this.marginTopReal, h = d + this.plotAreaWidth, k = f + this.plotAreaHeight;
                var l = 5 + d, m = f + 5;
                "bottom-left" == b && (l = 5 + d, m = k - a - 3);
                "bottom-right" == b && (l = h - e - 5, m = k - a - 3);
                "top-right" == b && (l = h - e - 5, m = f + 5);
                c.left = l + "px";
                c.top = m + "px"
            }
        }
    });
    d.Slice = d.Class({
        construct: function () {
        }
    });
    d.SerialDataItem =
        d.Class({
            construct: function () {
            }
        });
    d.GraphDataItem = d.Class({
        construct: function () {
        }
    });
    d.Guide = d.Class({
        construct: function (a) {
            this.cname = "Guide";
            d.applyTheme(this, a, this.cname)
        }
    });
    d.Title = d.Class({
        construct: function (a) {
            this.cname = "Title";
            d.applyTheme(this, a, this.cname)
        }
    });
    d.Label = d.Class({
        construct: function (a) {
            this.cname = "Label";
            d.applyTheme(this, a, this.cname)
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.AmGraph = d.Class({
        construct: function (a) {
            this.cname = "AmGraph";
            this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph", "rollOverGraph", "rollOutGraph");
            this.type = "line";
            this.stackable = !0;
            this.columnCount = 1;
            this.columnIndex = 0;
            this.centerCustomBullets = this.showBalloon = !0;
            this.maxBulletSize = 50;
            this.minBulletSize = 4;
            this.balloonText = "[[value]]";
            this.hidden = this.scrollbar = this.animationPlayed = !1;
            this.pointPosition = "middle";
            this.depthCount = 1;
            this.includeInMinMax = !0;
            this.negativeBase = 0;
            this.visibleInLegend = !0;
            this.showAllValueLabels = !1;
            this.showBulletsAt = this.showBalloonAt = "close";
            this.lineThickness = 1;
            this.dashLength = 0;
            this.connect = !0;
            this.lineAlpha = 1;
            this.bullet = "none";
            this.bulletBorderThickness = 2;
            this.bulletBorderAlpha = 0;
            this.bulletAlpha = 1;
            this.bulletSize = 8;
            this.cornerRadiusTop = this.hideBulletsCount = this.bulletOffset = 0;
            this.cursorBulletAlpha = 1;
            this.gradientOrientation = "vertical";
            this.dy =
                this.dx = 0;
            this.periodValue = "";
            this.clustered = !0;
            this.periodSpan = 1;
            this.accessibleLabel = "[[title]] [[category]] [[value]]";
            this.accessibleSkipText = "Press enter to skip [[title]]";
            this.y = this.x = 0;
            this.switchable = !0;
            this.minDistance = .8;
            this.tcc = 1;
            this.labelRotation = 0;
            this.labelAnchor = "auto";
            this.labelOffset = 3;
            this.bcn = "graph-";
            this.dateFormat = "MMM DD, YYYY";
            this.noRounding = !0;
            d.applyTheme(this, a, this.cname)
        }, init: function () {
            this.createBalloon()
        }, draw: function () {
            var a = this.chart;
            a.isRolledOverBullet =
                !1;
            var b = a.type;
            if (a.drawGraphs) {
                isNaN(this.precision) || (this.numberFormatter ? this.numberFormatter.precision = this.precision : this.numberFormatter = {
                    precision: this.precision,
                    decimalSeparator: a.decimalSeparator,
                    thousandsSeparator: a.thousandsSeparator
                });
                var c = a.container;
                this.container = c;
                this.destroy();
                var e = c.set();
                this.set = e;
                e.translate(this.x, this.y);
                var g = c.set();
                this.bulletSet = g;
                g.translate(this.x, this.y);
                this.behindColumns ? (a.graphsBehindSet.push(e), a.bulletBehindSet.push(g)) : (a.graphsSet.push(e),
                    a.bulletSet.push(g));
                var f = this.bulletAxis;
                d.isString(f) && (this.bulletAxis = a.getValueAxisById(f));
                c = c.set();
                d.remove(this.columnsSet);
                this.columnsSet = c;
                d.setCN(a, e, "graph-" + this.type);
                d.setCN(a, e, "graph-" + this.id);
                d.setCN(a, g, "graph-" + this.type);
                d.setCN(a, g, "graph-" + this.id);
                this.columnsArray = [];
                this.ownColumns = [];
                this.allBullets = [];
                this.animationArray = [];
                g = this.labelPosition;
                g || (f = this.valueAxis.stackType, g = "top", "column" == this.type && (a.rotate && (g = "right"), "100%" == f || "regular" == f) && (g = "middle"),
                    this.labelPosition = g);
                d.ifArray(this.data) && (a = !1, "xy" == b ? this.xAxis.axisCreated && this.yAxis.axisCreated && (a = !0) : this.valueAxis.axisCreated && (a = !0), !this.hidden && a && this.createGraph());
                e.push(c)
            }
        }, createGraph: function () {
            var a = this, b = a.chart;
            a.startAlpha = b.startAlpha;
            a.seqAn = b.sequencedAnimation;
            a.baseCoord = a.valueAxis.baseCoord;
            void 0 === a.fillAlphas && (a.fillAlphas = 0);
            a.bulletColorR = a.bulletColor;
            void 0 === a.bulletColorR && (a.bulletColorR = a.lineColorR, a.bulletColorNegative = a.negativeLineColor);
            void 0 ===
            a.bulletAlpha && (a.bulletAlpha = a.lineAlpha);
            if ("step" == c || d.VML) a.noRounding = !1;
            var c = b.type;
            "gantt" == c && (c = "serial");
            clearTimeout(a.playedTO);
            if (!isNaN(a.valueAxis.min) && !isNaN(a.valueAxis.max)) {
                switch (c) {
                    case "serial":
                        a.categoryAxis && (a.createSerialGraph(), "candlestick" == a.type && 1 > a.valueAxis.minMaxMultiplier && a.positiveClip(a.set));
                        break;
                    case "radar":
                        a.createRadarGraph();
                        break;
                    case "xy":
                        a.createXYGraph()
                }
                a.playedTO = setTimeout(function () {
                    a.setAnimationPlayed.call(a)
                }, 500 * a.chart.startDuration)
            }
        },
        setAnimationPlayed: function () {
            this.animationPlayed = !0
        }, createXYGraph: function () {
            var a = [], b = [], c = this.xAxis, e = this.yAxis;
            this.pmh = e.height;
            this.pmw = c.width;
            this.pmy = this.pmx = 0;
            var d;
            for (d = this.start; d <= this.end; d++) {
                var f = this.data[d].axes[c.id].graphs[this.id], h = f.values, k = h.x, l = h.y,
                    h = c.getCoordinate(k, this.noRounding), m = e.getCoordinate(l, this.noRounding);
                if (!isNaN(k) && !isNaN(l) && (a.push(h), b.push(m), f.x = h, f.y = m, k = this.createBullet(f, h, m, d), l = this.labelText)) {
                    var l = this.createLabel(f, l), n = 0;
                    k && (n =
                        k.size);
                    this.positionLabel(f, h, m, l, n)
                }
            }
            this.drawLineGraph(a, b);
            this.launchAnimation()
        }, createRadarGraph: function () {
            var a = this.valueAxis.stackType, b = [], c = [], e = [], d = [], f, h, k, l, m;
            for (m = this.start; m <= this.end; m++) {
                var n = this.data[m].axes[this.valueAxis.id].graphs[this.id], q, p;
                "none" == a || "3d" == a ? q = n.values.value : (q = n.values.close, p = n.values.open);
                if (isNaN(q)) this.connect || (this.drawLineGraph(b, c, e, d), b = [], c = [], e = [], d = []); else {
                    var t = this.valueAxis.getCoordinate(q, this.noRounding) - this.height,
                        t = t * this.valueAxis.rMultiplier,
                        r = -360 / (this.end - this.start + 1) * m;
                    "middle" == this.valueAxis.pointPosition && (r -= 180 / (this.end - this.start + 1));
                    q = t * Math.sin(r / 180 * Math.PI);
                    t *= Math.cos(r / 180 * Math.PI);
                    b.push(q);
                    c.push(t);
                    if (!isNaN(p)) {
                        var w = this.valueAxis.getCoordinate(p, this.noRounding) - this.height,
                            w = w * this.valueAxis.rMultiplier, z = w * Math.sin(r / 180 * Math.PI),
                            r = w * Math.cos(r / 180 * Math.PI);
                        e.push(z);
                        d.push(r);
                        isNaN(k) && (k = z);
                        isNaN(l) && (l = r)
                    }
                    r = this.createBullet(n, q, t, m);
                    n.x = q;
                    n.y = t;
                    if (z = this.labelText) z = this.createLabel(n, z), w = 0, r && (w = r.size),
                        this.positionLabel(n, q, t, z, w);
                    isNaN(f) && (f = q);
                    isNaN(h) && (h = t)
                }
            }
            b.push(f);
            c.push(h);
            isNaN(k) || (e.push(k), d.push(l));
            this.drawLineGraph(b, c, e, d);
            this.launchAnimation()
        }, positionLabel: function (a, b, c, e, d) {
            if (e) {
                var f = this.chart, h = this.valueAxis, k = "middle", l = !1, m = this.labelPosition, n = e.getBBox(),
                    q = this.chart.rotate, p = a.isNegative, t = this.fontSize;
                void 0 === t && (t = this.chart.fontSize);
                c -= n.height / 2 - t / 2 - 1;
                void 0 !== a.labelIsNegative && (p = a.labelIsNegative);
                switch (m) {
                    case "right":
                        m = q ? p ? "left" : "right" : "right";
                        break;
                    case "top":
                        m = q ? "top" : p ? "bottom" : "top";
                        break;
                    case "bottom":
                        m = q ? "bottom" : p ? "top" : "bottom";
                        break;
                    case "left":
                        m = q ? p ? "right" : "left" : "left"
                }
                var t = a.columnGraphics, r = 0, w = 0;
                t && (r = t.x, w = t.y);
                var z = this.labelOffset;
                switch (m) {
                    case "right":
                        k = "start";
                        b += d / 2 + z;
                        break;
                    case "top":
                        c = h.reversed ? c + (d / 2 + n.height / 2 + z) : c - (d / 2 + n.height / 2 + z);
                        break;
                    case "bottom":
                        c = h.reversed ? c - (d / 2 + n.height / 2 + z) : c + (d / 2 + n.height / 2 + z);
                        break;
                    case "left":
                        k = "end";
                        b -= d / 2 + z;
                        break;
                    case "inside":
                        "column" == this.type && (l = !0, q ? p ? (k = "end", b = r - 3 -
                            z) : (k = "start", b = r + 3 + z) : c = p ? w + 7 + z : w - 10 - z);
                        break;
                    case "middle":
                        "column" == this.type && (l = !0, q ? b -= (b - r) / 2 + z - 3 : c -= (c - w) / 2 + z - 3)
                }
                "auto" != this.labelAnchor && (k = this.labelAnchor);
                e.attr({"text-anchor": k});
                this.labelRotation && e.rotate(this.labelRotation);
                e.translate(b, c);
                !this.showAllValueLabels && t && l && (n = e.getBBox(), n.height > a.columnHeight || n.width > a.columnWidth) && (e.remove(), e = null);
                if (e && "radar" != f.type) if (q) {
                    if (0 > c || c > this.height) e.remove(), e = null;
                    !this.showAllValueLabels && e && (0 > b || b > this.width) && (e.remove(),
                        e = null)
                } else {
                    if (0 > b || b > this.width) e.remove(), e = null;
                    !this.showAllValueLabels && e && (0 > c || c > this.height) && (e.remove(), e = null)
                }
                e && this.allBullets.push(e);
                return e
            }
        }, getGradRotation: function () {
            var a = 270;
            "horizontal" == this.gradientOrientation && (a = 0);
            return this.gradientRotation = a
        }, createSerialGraph: function () {
            this.dashLengthSwitched = this.fillColorsSwitched = this.lineColorSwitched = void 0;
            var a = this.chart, b = this.id, c = this.index, e = this.data, g = this.chart.container,
                f = this.valueAxis, h = this.type, k = this.columnWidthReal,
                l = this.showBulletsAt;
            isNaN(this.columnWidth) || (k = this.columnWidth);
            isNaN(k) && (k = .8);
            var m = this.useNegativeColorIfDown, n = this.width, q = this.height, p = this.y, t = this.rotate,
                r = this.columnCount, w = d.toCoordinate(this.cornerRadiusTop, k / 2), z = this.connect, x = [], u = [],
                A, y, B, D, C = this.chart.graphs.length, I, H = this.dx / this.tcc, Q = this.dy / this.tcc,
                M = f.stackType, P = this.start, ia = this.end, J = this.scrollbar, aa = "graph-column-";
            J && (aa = "scrollbar-graph-column-");
            var ma = this.categoryAxis, na = this.baseCoord, Pa = this.negativeBase,
                Z = this.columnIndex, da = this.lineThickness, X = this.lineAlpha, xa = this.lineColorR,
                ea = this.dashLength, fa = this.set, Ba, ga = this.getGradRotation(), V = this.chart.columnSpacing,
                Y = ma.cellWidth, Da = (Y * k - r) / r;
            V > Da && (V = Da);
            var G, v, oa, ha = q, Qa = n, ca = 0, tb = 0, ub = 0, vb = 0, lb = 0, mb = 0, wb = this.fillColorsR,
                Ra = this.negativeFillColors, Ja = this.negativeLineColor, bb = this.fillAlphas,
                cb = this.negativeFillAlphas;
            "object" == typeof bb && (bb = bb[0]);
            "object" == typeof cb && (cb = cb[0]);
            var xb = this.noRounding;
            "step" == h && (xb = !1);
            var nb = f.getCoordinate(f.min);
            f.logarithmic && (nb = f.getCoordinate(f.minReal));
            this.minCoord = nb;
            this.resetBullet && (this.bullet = "none");
            if (!(J || "line" != h && "smoothedLine" != h && "step" != h || (1 == e.length && "step" != h && "none" == this.bullet && (this.bullet = "round", this.resetBullet = !0), !Ra && void 0 == Ja || m))) {
                var Ua = Pa;
                Ua > f.max && (Ua = f.max);
                Ua < f.min && (Ua = f.min);
                f.logarithmic && (Ua = f.minReal);
                var Ka = f.getCoordinate(Ua) + .5, Mb = f.getCoordinate(f.max);
                t ? (ha = q, Qa = Math.abs(Mb - Ka), ub = q, vb = Math.abs(nb - Ka), mb = tb = 0, f.reversed ? (ca = 0, lb = Ka) : (ca = Ka, lb = 0)) : (Qa =
                    n, ha = Math.abs(Mb - Ka), vb = n, ub = Math.abs(nb - Ka), lb = ca = 0, f.reversed ? (mb = p, tb = Ka) : mb = Ka)
            }
            var La = Math.round;
            this.pmx = La(ca);
            this.pmy = La(tb);
            this.pmh = La(ha);
            this.pmw = La(Qa);
            this.nmx = La(lb);
            this.nmy = La(mb);
            this.nmh = La(ub);
            this.nmw = La(vb);
            d.isModern || (this.nmy = this.nmx = 0, this.nmh = this.height);
            this.clustered || (r = 1);
            k = "column" == h ? (Y * k - V * (r - 1)) / r : Y * k;
            1 > k && (k = 1);
            var Nb = this.fixedColumnWidth;
            isNaN(Nb) || (k = Nb);
            var L;
            if ("line" == h || "step" == h || "smoothedLine" == h) {
                if (0 < P) {
                    for (L = P - 1; -1 < L; L--) if (G = e[L], v = G.axes[f.id].graphs[b],
                        oa = v.values.value, !isNaN(oa)) {
                        P = L;
                        break
                    }
                    if (this.lineColorField) for (L = P; -1 < L; L--) if (G = e[L], v = G.axes[f.id].graphs[b], v.lineColor) {
                        this.lineColorSwitched = v.lineColor;
                        void 0 === this.bulletColor && (this.bulletColorSwitched = this.lineColorSwitched);
                        break
                    }
                    if (this.fillColorsField) for (L = P; -1 < L; L--) if (G = e[L], v = G.axes[f.id].graphs[b], v.fillColors) {
                        this.fillColorsSwitched = v.fillColors;
                        break
                    }
                    if (this.dashLengthField) for (L = P; -1 < L; L--) if (G = e[L], v = G.axes[f.id].graphs[b], !isNaN(v.dashLength)) {
                        this.dashLengthSwitched =
                            v.dashLength;
                        break
                    }
                }
                if (ia < e.length - 1) for (L = ia + 1; L < e.length; L++) if (G = e[L], v = G.axes[f.id].graphs[b], oa = v.values.value, !isNaN(oa)) {
                    ia = L;
                    break
                }
            }
            ia < e.length - 1 && ia++;
            var T = [], U = [], Ma = !1;
            if ("line" == h || "step" == h || "smoothedLine" == h) if (this.stackable && "regular" == M || "100%" == M || this.fillToGraph) Ma = !0;
            var Ob = this.noStepRisers, db = -1E3, eb = -1E3, ob = this.minDistance, Sa = !0, Va = !1;
            for (L = P; L <= ia; L++) {
                G = e[L];
                v = G.axes[f.id].graphs[b];
                v.index = L;
                var fb, Ta = NaN;
                if (m && void 0 == this.openField) for (var yb = L + 1; yb < e.length && (!e[yb] ||
                    !(fb = e[L + 1].axes[f.id].graphs[b]) || !fb.values || (Ta = fb.values.value, isNaN(Ta))); yb++) ;
                var S, R, K, ba, ja = NaN, E = NaN, F = NaN, O = NaN, N = NaN, qa = NaN, ra = NaN, sa = NaN, ta = NaN,
                    ya = NaN, Ea = NaN, ka = NaN, la = NaN, W = NaN, zb = NaN, Ab = NaN, ua = NaN, va = void 0, Na = wb,
                    Wa = bb, Ha = xa, Ca, za, Bb = this.proCandlesticks, pb = this.topRadius, Fa = q - 1, pa = n - 1,
                    gb = this.pattern;
                void 0 != v.pattern && (gb = v.pattern);
                isNaN(v.alpha) || (Wa = v.alpha);
                isNaN(v.dashLength) || (ea = v.dashLength);
                var Ia = v.values;
                f.recalculateToPercents && (Ia = v.percents);
                "none" == M && (Z = isNaN(v.columnIndex) ?
                    this.columnIndex : v.columnIndex);
                if (Ia) {
                    W = this.stackable && "none" != M && "3d" != M ? Ia.close : Ia.value;
                    if ("candlestick" == h || "ohlc" == h) W = Ia.close, Ab = Ia.low, ra = f.getCoordinate(Ab), zb = Ia.high, ta = f.getCoordinate(zb);
                    ua = Ia.open;
                    F = f.getCoordinate(W, xb);
                    isNaN(ua) || (N = f.getCoordinate(ua, xb), m && "regular" != M && "100%" != M && (Ta = ua, ua = N = NaN));
                    m && (void 0 == this.openField ? fb && (fb.isNegative = Ta < W ? !0 : !1, isNaN(Ta) && (v.isNegative = !Sa)) : v.isNegative = Ta > W ? !0 : !1);
                    if (!J) switch (this.showBalloonAt) {
                        case "close":
                            v.y = F;
                            break;
                        case "open":
                            v.y =
                                N;
                            break;
                        case "high":
                            v.y = ta;
                            break;
                        case "low":
                            v.y = ra
                    }
                    var ja = G.x[ma.id], Xa = this.periodSpan - 1;
                    "step" != h || isNaN(G.cellWidth) || (Y = G.cellWidth);
                    var wa = Math.floor(Y / 2) + Math.floor(Xa * Y / 2), Ga = wa, qb = 0;
                    "left" == this.stepDirection && (qb = (2 * Y + Xa * Y) / 2, ja -= qb);
                    "center" == this.stepDirection && (qb = Y / 2, ja -= qb);
                    "start" == this.pointPosition && (ja -= Y / 2 + Math.floor(Xa * Y / 2), wa = 0, Ga = Math.floor(Y) + Math.floor(Xa * Y));
                    "end" == this.pointPosition && (ja += Y / 2 + Math.floor(Xa * Y / 2), wa = Math.floor(Y) + Math.floor(Xa * Y), Ga = 0);
                    if (Ob) {
                        var Cb = this.columnWidth;
                        isNaN(Cb) || (wa *= Cb, Ga *= Cb)
                    }
                    J || (v.x = ja);
                    -1E5 > ja && (ja = -1E5);
                    ja > n + 1E5 && (ja = n + 1E5);
                    t ? (E = F, O = N, N = F = ja, isNaN(ua) && !this.fillToGraph && (O = na), qa = ra, sa = ta) : (O = E = ja, isNaN(ua) && !this.fillToGraph && (N = na));
                    if (!Bb && W < ua || Bb && W < Ba) v.isNegative = !0, Ra && (Na = Ra), cb && (Wa = cb), void 0 != Ja && (Ha = Ja);
                    Va = !1;
                    isNaN(W) || (m ? W > Ta ? (Sa && (Va = !0), Sa = !1) : (Sa || (Va = !0), Sa = !0) : v.isNegative = W < Pa ? !0 : !1, Ba = W);
                    var Pb = !1;
                    J && a.chartScrollbar.ignoreCustomColors && (Pb = !0);
                    Pb || (void 0 != v.color && (Na = v.color), v.fillColors && (Na = v.fillColors));
                    F = d.fitToBounds(F,
                        -3E4, 3E4);
                    switch (h) {
                        case "line":
                            if (isNaN(W)) z || (this.drawLineGraph(x, u, T, U), x = [], u = [], T = [], U = []); else {
                                if (Math.abs(E - db) >= ob || Math.abs(F - eb) >= ob) x.push(E), u.push(F), db = E, eb = F;
                                ya = E;
                                Ea = F;
                                ka = E;
                                la = F;
                                !Ma || isNaN(N) || isNaN(O) || (T.push(O), U.push(N));
                                if (Va || void 0 != v.lineColor && v.lineColor != this.lineColorSwitched || void 0 != v.fillColors && v.fillColors != this.fillColorsSwitched || !isNaN(v.dashLength)) this.drawLineGraph(x, u, T, U), x = [E], u = [F], T = [], U = [], !Ma || isNaN(N) || isNaN(O) || (T.push(O), U.push(N)), m ? (Sa ? (this.lineColorSwitched =
                                    xa, this.fillColorsSwitched = wb) : (this.lineColorSwitched = Ja, this.fillColorsSwitched = Ra), void 0 === this.bulletColor && (this.bulletColorSwitched = xa)) : (this.lineColorSwitched = v.lineColor, this.fillColorsSwitched = v.fillColors, void 0 === this.bulletColor && (this.bulletColorSwitched = this.lineColorSwitched)), this.dashLengthSwitched = v.dashLength;
                                v.gap && (this.drawLineGraph(x, u, T, U), x = [], u = [], T = [], U = [], eb = db = -1E3)
                            }
                            break;
                        case "smoothedLine":
                            if (isNaN(W)) z || (this.drawSmoothedGraph(x, u, T, U), x = [], u = [], T = [], U = []); else {
                                if (Math.abs(E -
                                    db) >= ob || Math.abs(F - eb) >= ob) x.push(E), u.push(F), db = E, eb = F;
                                ya = E;
                                Ea = F;
                                ka = E;
                                la = F;
                                !Ma || isNaN(N) || isNaN(O) || (T.push(O), U.push(N));
                                if (Va || void 0 != v.lineColor && v.lineColor != this.lineColorSwitched || void 0 != v.fillColors && v.fillColors != this.fillColorsSwitched || !isNaN(v.dashLength)) this.drawSmoothedGraph(x, u, T, U), x = [E], u = [F], T = [], U = [], !Ma || isNaN(N) || isNaN(O) || (T.push(O), U.push(N)), this.lineColorSwitched = v.lineColor, this.fillColorsSwitched = v.fillColors, this.dashLengthSwitched = v.dashLength;
                                v.gap && (this.drawSmoothedGraph(x,
                                    u, T, U), x = [], u = [], T = [], U = [])
                            }
                            break;
                        case "step":
                            if (!isNaN(W)) {
                                t ? (isNaN(A) || (x.push(A), u.push(F - wa)), u.push(F - wa), x.push(E), u.push(F + Ga), x.push(E), !Ma || isNaN(N) || isNaN(O) || (isNaN(B) || (T.push(B), U.push(N - wa)), T.push(O), U.push(N - wa), T.push(O), U.push(N + Ga))) : (isNaN(y) || (u.push(y), x.push(E - wa)), x.push(E - wa), u.push(F), x.push(E + Ga), u.push(F), !Ma || isNaN(N) || isNaN(O) || (isNaN(D) || (T.push(O - wa), U.push(D)), T.push(O - wa), U.push(N), T.push(O + Ga), U.push(N)));
                                A = E;
                                y = F;
                                B = O;
                                D = N;
                                ya = E;
                                Ea = F;
                                ka = E;
                                la = F;
                                if (Va || void 0 != v.lineColor ||
                                    void 0 != v.fillColors || !isNaN(v.dashLength)) {
                                    var Db = x[x.length - 2], dc = u[u.length - 2];
                                    x.pop();
                                    u.pop();
                                    T.pop();
                                    U.pop();
                                    this.drawLineGraph(x, u, T, U);
                                    x = [Db];
                                    u = [dc];
                                    T = [];
                                    U = [];
                                    Ma && (T = [Db, Db + wa + Ga], U = [D, D]);
                                    t ? (u.push(F + Ga), x.push(E)) : (x.push(E + Ga), u.push(F));
                                    this.lineColorSwitched = v.lineColor;
                                    this.fillColorsSwitched = v.fillColors;
                                    this.dashLengthSwitched = v.dashLength;
                                    m && (Sa ? (this.lineColorSwitched = xa, this.fillColorsSwitched = wb) : (this.lineColorSwitched = Ja, this.fillColorsSwitched = Ra))
                                }
                                if (Ob || v.gap) A = y = NaN, v.gap &&
                                2 >= x.length || this.drawLineGraph(x, u, T, U), x = [], u = [], T = [], U = []
                            } else if (!z) {
                                if (1 >= this.periodSpan || 1 < this.periodSpan && E - A > wa + Ga) A = y = NaN;
                                this.drawLineGraph(x, u, T, U);
                                x = [];
                                u = [];
                                T = [];
                                U = []
                            }
                            break;
                        case "column":
                            Ca = Ha;
                            void 0 != v.lineColor && (Ca = v.lineColor);
                            if (!isNaN(W)) {
                                m || (v.isNegative = W < Pa ? !0 : !1);
                                v.isNegative && (Ra && (Na = Ra), void 0 != Ja && (Ca = Ja));
                                var Qb = f.min, Rb = f.max, rb = ua;
                                isNaN(rb) && (rb = Pa);
                                if (!(W < Qb && rb < Qb || W > Rb && rb > Rb)) {
                                    var Aa;
                                    if (t) {
                                        "3d" == M ? (R = F - (r / 2 - this.depthCount + 1) * (k + V) + V / 2 + Q * Z, S = O + H * Z, Aa = Z) : (R = Math.floor(F -
                                            (r / 2 - Z) * (k + V) + V / 2), S = O, Aa = 0);
                                        K = k;
                                        ya = E;
                                        Ea = R + k / 2;
                                        ka = E;
                                        la = R + k / 2;
                                        R + K > q + Aa * Q && (K = q - R + Aa * Q);
                                        R < Aa * Q && (K += R, R = Aa * Q);
                                        ba = E - O;
                                        var ec = S;
                                        S = d.fitToBounds(S, 0, n);
                                        ba += ec - S;
                                        ba = d.fitToBounds(ba, -S, n - S + H * Z);
                                        v.labelIsNegative = 0 > ba ? !0 : !1;
                                        0 === ba && 1 / W === 1 / -0 && (v.labelIsNegative = !0);
                                        isNaN(G.percentWidthValue) || (K = this.height * G.percentWidthValue / 100, R = ja - K / 2, Ea = R + K / 2);
                                        K = d.roundTo(K, 2);
                                        ba = d.roundTo(ba, 2);
                                        R < q && 0 < K && (va = new d.Cuboid(g, ba, K, H - a.d3x, Q - a.d3y, Na, Wa, da, Ca, X, ga, w, t, ea, gb, pb, aa), v.columnWidth = Math.abs(ba), v.columnHeight =
                                            Math.abs(K))
                                    } else {
                                        "3d" == M ? (S = E - (r / 2 - this.depthCount + 1) * (k + V) + V / 2 + H * Z, R = N + Q * Z, Aa = Z) : (S = E - (r / 2 - Z) * (k + V) + V / 2, R = N, Aa = 0);
                                        K = k;
                                        ya = S + k / 2;
                                        Ea = F;
                                        ka = S + k / 2;
                                        la = F;
                                        S + K > n + Aa * H && (K = n - S + Aa * H);
                                        S < Aa * H && (K += S - Aa * H, S = Aa * H);
                                        ba = F - N;
                                        v.labelIsNegative = 0 < ba ? !0 : !1;
                                        0 === ba && 1 / W !== 1 / Math.abs(W) && (v.labelIsNegative = !0);
                                        var fc = R;
                                        R = d.fitToBounds(R, this.dy, q);
                                        ba += fc - R;
                                        ba = d.fitToBounds(ba, -R + Q * Aa, q - R);
                                        isNaN(G.percentWidthValue) || (K = this.width * G.percentWidthValue / 100, S = ja - K / 2, ya = S + K / 2);
                                        K = d.roundTo(K, 2);
                                        ba = d.roundTo(ba, 2);
                                        S < n + Z * H && 0 < K &&
                                        (this.showOnAxis && (R -= Q / 2), va = new d.Cuboid(g, K, ba, H - a.d3x, Q - a.d3y, Na, Wa, da, Ca, this.lineAlpha, ga, w, t, ea, gb, pb, aa), v.columnHeight = Math.abs(ba), v.columnWidth = Math.abs(K))
                                    }
                                }
                                if (va) {
                                    za = va.set;
                                    d.setCN(a, va.set, "graph-" + this.type);
                                    d.setCN(a, va.set, "graph-" + this.id);
                                    v.className && d.setCN(a, va.set, v.className, !0);
                                    v.columnGraphics = za;
                                    S = d.roundTo(S, 2);
                                    R = d.roundTo(R, 2);
                                    za.translate(S, R);
                                    (v.url || this.showHandOnHover) && za.setAttr("cursor", "pointer");
                                    if (!J) {
                                        "none" == M && (I = t ? (this.end + 1 - L) * C - c : C * L + c);
                                        "3d" == M && (t ? (I =
                                            (this.end + 1 - L) * C - c - 1E3 * this.depthCount, ya += H * Z, ka += H * Z, v.y += H * Z) : (I = (C - c) * (L + 1) + 1E3 * this.depthCount, Ea += Q * Z, la += Q * Z, v.y += Q * Z));
                                        if ("regular" == M || "100%" == M) I = t ? 0 < Ia.value ? (this.end + 1 - L) * C + c + 1E3 * this.depthCount : (this.end + 1 - L) * C - c + 1E3 * this.depthCount : 0 < Ia.value ? C * L + c : C * L - c;
                                        this.columnsArray.push({column: va, depth: I});
                                        v.x = t ? R + K / 2 : S + K / 2;
                                        this.ownColumns.push(va);
                                        this.animateColumns(va, L, E, O, F, N);
                                        this.addListeners(za, v);
                                        void 0 !== this.tabIndex && za.setAttr("tabindex", this.tabIndex)
                                    }
                                    this.columnsSet.push(za)
                                }
                            }
                            break;
                        case "candlestick":
                            if (!isNaN(ua) && !isNaN(W)) {
                                var Ya, hb;
                                Ca = Ha;
                                void 0 != v.lineColor && (Ca = v.lineColor);
                                ya = E;
                                la = Ea = F;
                                ka = E;
                                if (t) {
                                    "open" == l && (ka = O);
                                    "high" == l && (ka = sa);
                                    "low" == l && (ka = qa);
                                    E = d.fitToBounds(E, 0, pa);
                                    O = d.fitToBounds(O, 0, pa);
                                    qa = d.fitToBounds(qa, 0, pa);
                                    sa = d.fitToBounds(sa, 0, pa);
                                    if (0 === E && 0 === O && 0 === qa && 0 === sa) continue;
                                    if (E == pa && O == pa && qa == pa && sa == pa) continue;
                                    R = F - k / 2;
                                    S = O;
                                    K = k;
                                    R + K > q && (K = q - R);
                                    0 > R && (K += R, R = 0);
                                    if (R < q && 0 < K) {
                                        var Eb, Fb;
                                        W > ua ? (Eb = [E, sa], Fb = [O, qa]) : (Eb = [O, sa], Fb = [E, qa]);
                                        !isNaN(sa) && !isNaN(qa) &&
                                        F < q && 0 < F && (Ya = d.line(g, Eb, [F, F], Ca, X, da), hb = d.line(g, Fb, [F, F], Ca, X, da));
                                        ba = E - O;
                                        va = new d.Cuboid(g, ba, K, H, Q, Na, bb, da, Ca, X, ga, w, t, ea, gb, pb, aa)
                                    }
                                } else {
                                    "open" == l && (la = N);
                                    "high" == l && (la = ta);
                                    "low" == l && (la = ra);
                                    F = d.fitToBounds(F, 0, Fa);
                                    N = d.fitToBounds(N, 0, Fa);
                                    ra = d.fitToBounds(ra, 0, Fa);
                                    ta = d.fitToBounds(ta, 0, Fa);
                                    if (0 === F && 0 === N && 0 === ra && 0 === ta) continue;
                                    if (F == Fa && N == Fa && ra == Fa && ta == Fa) continue;
                                    S = E - k / 2;
                                    R = N + da / 2;
                                    K = k;
                                    S + K > n && (K = n - S);
                                    0 > S && (K += S, S = 0);
                                    ba = F - N;
                                    if (S < n && 0 < K) {
                                        Bb && W >= ua && (Wa = 0);
                                        var va = new d.Cuboid(g, K, ba, H,
                                            Q, Na, Wa, da, Ca, X, ga, w, t, ea, gb, pb, aa), Gb, Hb;
                                        W > ua ? (Gb = [F, ta], Hb = [N, ra]) : (Gb = [N, ta], Hb = [F, ra]);
                                        !isNaN(ta) && !isNaN(ra) && E < n && 0 < E && (Ya = d.line(g, [E, E], Gb, Ca, X, da), hb = d.line(g, [E, E], Hb, Ca, X, da), d.setCN(a, Ya, this.bcn + "line-high"), v.className && d.setCN(a, Ya, v.className, !0), d.setCN(a, hb, this.bcn + "line-low"), v.className && d.setCN(a, hb, v.className, !0))
                                    }
                                }
                                va && (za = va.set, v.columnGraphics = za, fa.push(za), za.translate(S, R - da / 2), (v.url || this.showHandOnHover) && za.setAttr("cursor", "pointer"), Ya && (fa.push(Ya), fa.push(hb)),
                                J || (v.x = t ? R + K / 2 : S + K / 2, this.animateColumns(va, L, E, O, F, N), this.addListeners(za, v), void 0 !== this.tabIndex && za.setAttr("tabindex", this.tabIndex)))
                            }
                            break;
                        case "ohlc":
                            if (!(isNaN(ua) || isNaN(zb) || isNaN(Ab) || isNaN(W))) {
                                var Sb = g.set();
                                fa.push(Sb);
                                W < ua && (v.isNegative = !0, void 0 != Ja && (Ha = Ja));
                                void 0 != v.lineColor && (Ha = v.lineColor);
                                var Za, $a, ab;
                                if (t) {
                                    la = F;
                                    ka = E;
                                    "open" == l && (ka = O);
                                    "high" == l && (ka = sa);
                                    "low" == l && (ka = qa);
                                    qa = d.fitToBounds(qa, 0, pa);
                                    sa = d.fitToBounds(sa, 0, pa);
                                    if (0 === E && 0 === O && 0 === qa && 0 === sa) continue;
                                    if (E ==
                                        pa && O == pa && qa == pa && sa == pa) continue;
                                    var Ib = F - k / 2, Ib = d.fitToBounds(Ib, 0, q), Tb = d.fitToBounds(F, 0, q),
                                        Jb = F + k / 2, Jb = d.fitToBounds(Jb, 0, q);
                                    0 <= O && O <= pa && ($a = d.line(g, [O, O], [Ib, Tb], Ha, X, da, ea));
                                    0 < F && F < q && (Za = d.line(g, [qa, sa], [F, F], Ha, X, da, ea));
                                    0 <= E && E <= pa && (ab = d.line(g, [E, E], [Tb, Jb], Ha, X, da, ea))
                                } else {
                                    la = F;
                                    "open" == l && (la = N);
                                    "high" == l && (la = ta);
                                    "low" == l && (la = ra);
                                    var ka = E, ra = d.fitToBounds(ra, 0, Fa), ta = d.fitToBounds(ta, 0, Fa),
                                        Kb = E - k / 2, Kb = d.fitToBounds(Kb, 0, n), Ub = d.fitToBounds(E, 0, n),
                                        Lb = E + k / 2, Lb = d.fitToBounds(Lb, 0,
                                            n);
                                    0 <= N && N <= Fa && ($a = d.line(g, [Kb, Ub], [N, N], Ha, X, da, ea));
                                    0 < E && E < n && (Za = d.line(g, [E, E], [ra, ta], Ha, X, da, ea));
                                    0 <= F && F <= Fa && (ab = d.line(g, [Ub, Lb], [F, F], Ha, X, da, ea))
                                }
                                fa.push($a);
                                fa.push(Za);
                                fa.push(ab);
                                d.setCN(a, $a, this.bcn + "stroke-open");
                                d.setCN(a, ab, this.bcn + "stroke-close");
                                d.setCN(a, Za, this.bcn + "stroke");
                                v.className && d.setCN(a, Sb, v.className, !0);
                                Za && this.addListeners(Za, v);
                                ab && this.addListeners(ab, v);
                                $a && this.addListeners($a, v);
                                ya = E;
                                Ea = F
                            }
                    }
                    if (!J && !isNaN(W)) {
                        var Vb = this.hideBulletsCount;
                        if (this.end - this.start <=
                            Vb || 0 === Vb) {
                            var Wb = this.createBullet(v, ka, la, L), Xb = this.labelText;
                            if (Xb && !isNaN(ya) && !isNaN(ya)) {
                                var gc = this.createLabel(v, Xb), Yb = 0;
                                Wb && (Yb = Wb.size);
                                this.positionLabel(v, ya, Ea, gc, Yb)
                            }
                            if ("regular" == M || "100%" == M) {
                                var Zb = f.totalText;
                                if (Zb) {
                                    var Oa = this.createLabel(v, Zb, f.totalTextColor);
                                    d.setCN(a, Oa, this.bcn + "label-total");
                                    this.allBullets.push(Oa);
                                    if (Oa) {
                                        var $b = Oa.getBBox(), ac = $b.width, bc = $b.height, ib, jb,
                                            sb = f.totalTextOffset, cc = f.totals[L];
                                        cc && cc.remove();
                                        var kb = 0;
                                        "column" != h && (kb = this.bulletSize);
                                        t ?
                                            (jb = Ea, ib = 0 > W ? E - ac / 2 - 2 - kb - sb : E + ac / 2 + 3 + kb + sb) : (ib = ya, jb = 0 > W ? F + bc / 2 + kb + sb : F - bc / 2 - 3 - kb - sb);
                                        Oa.translate(ib, jb);
                                        f.totals[L] = Oa;
                                        t ? (0 > jb || jb > q) && Oa.remove() : (0 > ib || ib > n) && Oa.remove()
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.lastDataItem = v;
            if ("line" == h || "step" == h || "smoothedLine" == h) "smoothedLine" == h ? this.drawSmoothedGraph(x, u, T, U) : this.drawLineGraph(x, u, T, U), J || this.launchAnimation();
            this.bulletsHidden && this.hideBullets();
            this.customBulletsHidden && this.hideCustomBullets()
        }, animateColumns: function (a, b) {
            var c = this, e = c.chart.startDuration;
            0 < e && !c.animationPlayed && (c.seqAn ? (a.set.hide(), c.animationArray.push(a), e = setTimeout(function () {
                c.animate.call(c)
            }, e / (c.end - c.start + 1) * (b - c.start) * 1E3), c.timeOuts.push(e)) : c.animate(a), c.chart.animatable.push(a))
        }, createLabel: function (a, b, c) {
            var e = this.chart, g = a.labelColor;
            g || (g = this.color);
            g || (g = e.color);
            c && (g = c);
            c = this.fontSize;
            void 0 === c && (this.fontSize = c = e.fontSize);
            var f = this.labelFunction;
            b = e.formatString(b, a);
            b = d.cleanFromEmpty(b);
            f && (b = f(a, b));
            if (void 0 !== b && "" !== b) return a = d.text(this.container,
                b, g, e.fontFamily, c), a.node.style.pointerEvents = "none", d.setCN(e, a, this.bcn + "label"), this.bulletSet.push(a), a
        }, positiveClip: function (a) {
            a.clipRect(this.pmx, this.pmy, this.pmw, this.pmh)
        }, negativeClip: function (a) {
            a.clipRect(this.nmx, this.nmy, this.nmw, this.nmh)
        }, drawLineGraph: function (a, b, c, e) {
            var g = this;
            if (1 < a.length) {
                var f = g.noRounding, h = g.set, k = g.chart, l = g.container, m = l.set(), n = l.set();
                h.push(n);
                h.push(m);
                var q = g.lineAlpha, p = g.lineThickness, h = g.fillAlphas, t = g.lineColorR, r = g.negativeLineAlpha;
                isNaN(r) &&
                (r = q);
                var w = g.lineColorSwitched;
                w && (t = w);
                var w = g.fillColorsR, z = g.fillColorsSwitched;
                z && (w = z);
                var x = g.dashLength;
                (z = g.dashLengthSwitched) && (x = z);
                var z = g.negativeLineColor, u = g.negativeFillColors, A = g.negativeFillAlphas, y = g.baseCoord;
                0 !== g.negativeBase && (y = g.valueAxis.getCoordinate(g.negativeBase, f), y > g.height && (y = g.height), 0 > y && (y = 0));
                q = d.line(l, a, b, t, q, p, x, !1, !1, f);
                q.node.setAttribute("stroke-linejoin", "round");
                d.setCN(k, q, g.bcn + "stroke");
                m.push(q);
                m.click(function (a) {
                    g.handleGraphEvent(a, "clickGraph")
                }).mouseover(function (a) {
                    g.handleGraphEvent(a,
                        "rollOverGraph")
                }).mouseout(function (a) {
                    g.handleGraphEvent(a, "rollOutGraph")
                }).touchmove(function (a) {
                    g.chart.handleMouseMove(a)
                }).touchend(function (a) {
                    g.chart.handleTouchEnd(a)
                });
                void 0 === z || g.useNegativeColorIfDown || (p = d.line(l, a, b, z, r, p, x, !1, !1, f), p.node.setAttribute("stroke-linejoin", "round"), d.setCN(k, p, g.bcn + "stroke"), d.setCN(k, p, g.bcn + "stroke-negative"), n.push(p));
                if (0 < h || 0 < A) if (p = a.join(";").split(";"), r = b.join(";").split(";"), q = k.type, "serial" == q || "radar" == q ? 0 < c.length ? (c.reverse(), e.reverse(),
                    p = a.concat(c), r = b.concat(e)) : "radar" == q ? (r.push(0), p.push(0)) : g.rotate ? (r.push(r[r.length - 1]), p.push(y), r.push(r[0]), p.push(y), r.push(r[0]), p.push(p[0])) : (p.push(p[p.length - 1]), r.push(y), p.push(p[0]), r.push(y), p.push(a[0]), r.push(r[0])) : "xy" == q && (b = g.fillToAxis) && (d.isString(b) && (b = k.getValueAxisById(b)), "H" == b.orientation ? (y = "top" == b.position ? 0 : b.height, p.push(p[p.length - 1]), r.push(y), p.push(p[0]), r.push(y), p.push(a[0]), r.push(r[0])) : (y = "left" == b.position ? 0 : b.width, r.push(r[r.length - 1]), p.push(y),
                    r.push(r[0]), p.push(y), r.push(r[0]), p.push(p[0]))), a = g.gradientRotation, 0 < h && (b = d.polygon(l, p, r, w, h, 1, "#000", 0, a, f), b.pattern(g.pattern, NaN, k.path), d.setCN(k, b, g.bcn + "fill"), m.push(b), b.toBack()), u || void 0 !== z) isNaN(A) && (A = h), u || (u = z), f = d.polygon(l, p, r, u, A, 1, "#000", 0, a, f), d.setCN(k, f, g.bcn + "fill"), d.setCN(k, f, g.bcn + "fill-negative"), f.pattern(g.pattern, NaN, k.path), n.push(f), f.toBack(), n.click(function (a) {
                    g.handleGraphEvent(a, "clickGraph")
                }).mouseover(function (a) {
                    g.handleGraphEvent(a, "rollOverGraph")
                }).mouseout(function (a) {
                    g.handleGraphEvent(a,
                        "rollOutGraph")
                }).touchmove(function (a) {
                    g.chart.handleMouseMove(a)
                }).touchend(function (a) {
                    g.chart.handleTouchEnd(a)
                });
                g.applyMask(n, m)
            }
        }, applyMask: function (a, b) {
            var c = a.length();
            "serial" != this.chart.type || this.scrollbar || (this.positiveClip(b), 0 < c && this.negativeClip(a))
        }, drawSmoothedGraph: function (a, b, c, e) {
            if (1 < a.length) {
                var g = this.set, f = this.chart, h = this.container, k = h.set(), l = h.set();
                g.push(l);
                g.push(k);
                var m = this.lineAlpha, n = this.lineThickness, g = this.dashLength, q = this.fillAlphas,
                    p = this.lineColorR,
                    t = this.fillColorsR, r = this.negativeLineColor, w = this.negativeFillColors,
                    z = this.negativeFillAlphas, x = this.baseCoord, u = this.lineColorSwitched;
                u && (p = u);
                (u = this.fillColorsSwitched) && (t = u);
                var A = this.negativeLineAlpha;
                isNaN(A) && (A = m);
                u = this.getGradRotation();
                m = new d.Bezier(h, a, b, p, m, n, t, 0, g, void 0, u);
                d.setCN(f, m, this.bcn + "stroke");
                k.push(m.path);
                void 0 !== r && (n = new d.Bezier(h, a, b, r, A, n, t, 0, g, void 0, u), d.setCN(f, n, this.bcn + "stroke"), d.setCN(f, n, this.bcn + "stroke-negative"), l.push(n.path));
                0 < q && (n = a.join(";").split(";"),
                    m = b.join(";").split(";"), p = "", 0 < c.length ? (c.push("M"), e.push("M"), c.reverse(), e.reverse(), n = a.concat(c), m = b.concat(e)) : (this.rotate ? (p += " L" + x + "," + b[b.length - 1], p += " L" + x + "," + b[0]) : (p += " L" + a[a.length - 1] + "," + x, p += " L" + a[0] + "," + x), p += " L" + a[0] + "," + b[0]), a = new d.Bezier(h, n, m, NaN, 0, 0, t, q, g, p, u), d.setCN(f, a, this.bcn + "fill"), a.path.pattern(this.pattern, NaN, f.path), k.push(a.path), w || void 0 !== r) && (z || (z = q), w || (w = r), h = new d.Bezier(h, n, m, NaN, 0, 0, w, z, g, p, u), h.path.pattern(this.pattern, NaN, f.path), d.setCN(f,
                    h, this.bcn + "fill"), d.setCN(f, h, this.bcn + "fill-negative"), l.push(h.path));
                this.applyMask(l, k)
            }
        }, launchAnimation: function () {
            var a = this, b = a.chart.startDuration;
            if (0 < b && !a.animationPlayed) {
                var c = a.set, e = a.bulletSet;
                d.VML || (c.attr({opacity: a.startAlpha}), e.attr({opacity: a.startAlpha}));
                c.hide();
                e.hide();
                a.seqAn ? (b = setTimeout(function () {
                    a.animateGraphs.call(a)
                }, a.index * b * 1E3), a.timeOuts.push(b)) : a.animateGraphs()
            }
        }, animateGraphs: function () {
            var a = this.chart, b = this.set, c = this.bulletSet, e = this.x, d = this.y;
            b.show();
            c.show();
            var f = a.startDuration, h = a.startEffect;
            b && (this.rotate ? (b.translate(-1E3, d), c.translate(-1E3, d)) : (b.translate(e, -1E3), c.translate(e, -1E3)), b.animate({
                opacity: 1,
                translate: e + "," + d
            }, f, h), c.animate({opacity: 1, translate: e + "," + d}, f, h), a.animatable.push(b))
        }, animate: function (a) {
            var b = this.chart, c = this.animationArray;
            !a && 0 < c.length && (a = c[0], c.shift());
            c = d[d.getEffect(b.startEffect)];
            b = b.startDuration;
            a && (this.rotate ? a.animateWidth(b, c) : a.animateHeight(b, c), a.set.show())
        }, legendKeyColor: function () {
            var a =
                this.legendColor, b = this.lineAlpha;
            void 0 === a && (a = this.lineColorR, 0 === b && (b = this.fillColorsR) && (a = "object" == typeof b ? b[0] : b));
            return a
        }, legendKeyAlpha: function () {
            var a = this.legendAlpha;
            void 0 === a && (a = this.lineAlpha, this.fillAlphas > a && (a = this.fillAlphas), 0 === a && (a = this.bulletAlpha), 0 === a && (a = 1));
            return a
        }, createBullet: function (a, b, c) {
            if (!isNaN(b) && !isNaN(c) && ("none" != this.bullet || this.customBullet || a.bullet || a.customBullet)) {
                var e = this.chart, g = this.container, f = this.bulletOffset, h = this.bulletSize;
                isNaN(a.bulletSize) ||
                (h = a.bulletSize);
                var k = a.values.value, l = this.maxValue, m = this.minValue, n = this.maxBulletSize,
                    q = this.minBulletSize;
                isNaN(l) || (isNaN(k) || (h = (k - m) / (l - m) * (n - q) + q), m == l && (h = n));
                l = h;
                this.bulletAxis && (h = a.values.error, isNaN(h) || (k = h), h = this.bulletAxis.stepWidth * k);
                h < this.minBulletSize && (h = this.minBulletSize);
                this.rotate ? b = a.isNegative ? b - f : b + f : c = a.isNegative ? c + f : c - f;
                q = this.bulletColorR;
                a.lineColor && void 0 === this.bulletColor && (this.bulletColorSwitched = a.lineColor);
                this.bulletColorSwitched && (q = this.bulletColorSwitched);
                a.isNegative && void 0 !== this.bulletColorNegative && (q = this.bulletColorNegative);
                void 0 !== a.color && (q = a.color);
                var p;
                "xy" == e.type && this.valueField && (p = this.pattern, a.pattern && (p = a.pattern));
                f = this.bullet;
                a.bullet && (f = a.bullet);
                var k = this.bulletBorderThickness, m = this.bulletBorderColorR, n = this.bulletBorderAlpha,
                    t = this.bulletAlpha;
                m || (m = q);
                this.useLineColorForBulletBorder && (m = this.lineColorR, a.isNegative && this.negativeLineColor && (m = this.negativeLineColor), this.lineColorSwitched && (m = this.lineColorSwitched));
                var r = a.alpha;
                isNaN(r) || (t = r);
                p = d.bullet(g, f, h, q, t, k, m, n, l, 0, p, e.path);
                l = this.customBullet;
                a.customBullet && (l = a.customBullet);
                l && (p && p.remove(), "function" == typeof l ? (l = new l, l.chart = e, a.bulletConfig && (l.availableSpace = c, l.graph = this, l.graphDataItem = a, l.bulletY = c, a.bulletConfig.minCoord = this.minCoord - c, l.bulletConfig = a.bulletConfig), l.write(g), p && l.showBullet && l.set.push(p), a.customBulletGraphics = l.cset, p = l.set) : (p = g.set(), l = g.image(l, 0, 0, h, h), p.push(l), this.centerCustomBullets && l.translate(-h / 2, -h /
                    2)));
                if (p) {
                    (a.url || this.showHandOnHover) && p.setAttr("cursor", "pointer");
                    if ("serial" == e.type || "gantt" == e.type) if (-.5 > b || b > this.width || c < -h / 2 || c > this.height) p.remove(), p = null;
                    p && (this.bulletSet.push(p), p.translate(b, c), this.addListeners(p, a), this.allBullets.push(p));
                    a.bx = b;
                    a.by = c;
                    d.setCN(e, p, this.bcn + "bullet");
                    a.className && d.setCN(e, p, a.className, !0)
                }
                if (p) {
                    p.size = h || 0;
                    if (e = this.bulletHitAreaSize) g = d.circle(g, e, "#FFFFFF", .001, 0), g.translate(b, c), a.hitBullet = g, this.bulletSet.push(g), this.addListeners(g,
                        a);
                    a.bulletGraphics = p;
                    void 0 !== this.tabIndex && p.setAttr("tabindex", this.tabIndex)
                } else p = {size: 0};
                p.graphDataItem = a;
                return p
            }
        }, showBullets: function () {
            var a = this.allBullets, b;
            this.bulletsHidden = !1;
            for (b = 0; b < a.length; b++) a[b].show()
        }, hideBullets: function () {
            var a = this.allBullets, b;
            this.bulletsHidden = !0;
            for (b = 0; b < a.length; b++) a[b].hide()
        }, showCustomBullets: function () {
            var a = this.allBullets, b;
            this.customBulletsHidden = !1;
            for (b = 0; b < a.length; b++) {
                var c = a[b].graphDataItem;
                c && c.customBulletGraphics && c.customBulletGraphics.show()
            }
        },
        hideCustomBullets: function () {
            var a = this.allBullets, b;
            this.customBulletsHidden = !0;
            for (b = 0; b < a.length; b++) {
                var c = a[b].graphDataItem;
                c && c.customBulletGraphics && c.customBulletGraphics.hide()
            }
        }, addListeners: function (a, b) {
            var c = this;
            a.mouseover(function (a) {
                c.handleRollOver(b, a)
            }).mouseout(function (a) {
                c.handleRollOut(b, a)
            }).touchend(function (a) {
                c.handleRollOver(b, a);
                c.chart.panEventsEnabled && c.handleClick(b, a)
            }).touchstart(function (a) {
                c.handleRollOver(b, a)
            }).click(function (a) {
                c.handleClick(b, a)
            }).dblclick(function (a) {
                c.handleDoubleClick(b,
                    a)
            }).contextmenu(function (a) {
                c.handleRightClick(b, a)
            });
            var e = c.chart;
            if (e.accessible && c.accessibleLabel) {
                var d = e.formatString(c.accessibleLabel, b);
                e.makeAccessible(a, d)
            }
        }, handleRollOver: function (a, b) {
            this.handleGraphEvent(b, "rollOverGraph");
            if (a) {
                var c = this.chart;
                a.bulletConfig && (c.isRolledOverBullet = !0);
                var e = {
                    type: "rollOverGraphItem",
                    item: a,
                    index: a.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: b
                };
                this.fire(e);
                c.fire(e);
                clearTimeout(c.hoverInt);
                (c = c.chartCursor) && c.valueBalloonsEnabled || this.showGraphBalloon(a,
                    "V", !0)
            }
        }, handleRollOut: function (a, b) {
            var c = this.chart;
            if (a) {
                var e = {
                    type: "rollOutGraphItem",
                    item: a,
                    index: a.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: b
                };
                this.fire(e);
                c.fire(e);
                c.isRolledOverBullet = !1
            }
            this.handleGraphEvent(b, "rollOutGraph");
            (c = c.chartCursor) && c.valueBalloonsEnabled || this.hideBalloon()
        }, handleClick: function (a, b) {
            if (!this.chart.checkTouchMoved() && this.chart.checkTouchDuration(b)) {
                if (a) {
                    var c = {
                        type: "clickGraphItem", item: a, index: a.index, graph: this, target: this, chart: this.chart,
                        event: b
                    };
                    this.fire(c);
                    this.chart.fire(c);
                    d.getURL(a.url, this.urlTarget)
                }
                this.handleGraphEvent(b, "clickGraph")
            }
        }, handleGraphEvent: function (a, b) {
            var c = {type: b, graph: this, target: this, chart: this.chart, event: a};
            this.fire(c);
            this.chart.fire(c)
        }, handleRightClick: function (a, b) {
            if (a) {
                var c = {
                    type: "rightClickGraphItem",
                    item: a,
                    index: a.index,
                    graph: this,
                    target: this,
                    chart: this.chart,
                    event: b
                };
                this.fire(c);
                this.chart.fire(c)
            }
        }, handleDoubleClick: function (a, b) {
            if (a) {
                var c = {
                    type: "doubleClickGraphItem", item: a, index: a.index,
                    graph: this, target: this, chart: this.chart, event: b
                };
                this.fire(c);
                this.chart.fire(c)
            }
        }, zoom: function (a, b) {
            this.start = a;
            this.end = b;
            this.draw()
        }, changeOpacity: function (a) {
            var b = this.set;
            b && b.setAttr("opacity", a);
            if (b = this.ownColumns) {
                var c;
                for (c = 0; c < b.length; c++) {
                    var e = b[c].set;
                    e && e.setAttr("opacity", a)
                }
            }
            (b = this.bulletSet) && b.setAttr("opacity", a)
        }, destroy: function () {
            d.remove(this.set);
            d.remove(this.bulletSet);
            var a = this.timeOuts;
            if (a) {
                var b;
                for (b = 0; b < a.length; b++) clearTimeout(a[b])
            }
            this.timeOuts = []
        }, createBalloon: function () {
            var a =
                this.chart;
            this.balloon ? this.balloon.destroy && this.balloon.destroy() : this.balloon = {};
            var b = this.balloon;
            d.extend(b, a.balloon, !0);
            b.chart = a;
            b.mainSet = a.plotBalloonsSet;
            b.className = this.id
        }, hideBalloon: function () {
            var a = this, b = a.chart;
            b.chartCursor ? b.chartCursor.valueBalloonsEnabled || b.hideBalloon() : b.hideBalloon();
            clearTimeout(a.hoverInt);
            a.hoverInt = setTimeout(function () {
                a.hideBalloonReal.call(a)
            }, b.hideBalloonTime)
        }, hideBalloonReal: function () {
            this.balloon && this.balloon.hide();
            this.fixBulletSize()
        },
        fixBulletSize: function () {
            if (d.isModern) {
                var a = this.resizedDItem;
                if (a) {
                    var b = a.bulletGraphics;
                    if (b && !b.doNotScale) {
                        b.translate(a.bx, a.by, 1);
                        var c = this.bulletAlpha;
                        isNaN(a.alpha) || (c = a.alpha);
                        b.setAttr("fill-opacity", c);
                        b.setAttr("stroke-opacity", this.bulletBorderAlpha)
                    }
                }
                this.resizedDItem = null
            }
        }, showGraphBalloon: function (a, b, c, e, g) {
            if (a) {
                var f = this.chart, h = this.balloon, k = 0, l = 0, m = f.chartCursor, n = !0;
                m ? m.valueBalloonsEnabled || (h = f.balloon, k = this.x, l = this.y, n = !1) : (h = f.balloon, k = this.x, l = this.y, n = !1);
                clearTimeout(this.hoverInt);
                if (f.chartCursor && (this.currentDataItem = a, "serial" == f.type && f.isRolledOverBullet && f.chartCursor.valueBalloonsEnabled)) {
                    this.hideBalloonReal();
                    return
                }
                this.resizeBullet(a, e, g);
                if (h && h.enabled && this.showBalloon && !this.hidden) {
                    var m = f.formatString(this.balloonText, a, !0), q = this.balloonFunction;
                    q && (m = q(a, a.graph));
                    m && (m = d.cleanFromEmpty(m));
                    m && "" !== m ? (e = f.getBalloonColor(this, a), h.drop || (h.pointerOrientation = b), b = a.x, g = a.y, f.rotate && (b = a.y, g = a.x), b += k, g += l, isNaN(b) || isNaN(g) ? this.hideBalloonReal() : (a = this.width,
                        q = this.height, n && h.setBounds(k, l, a + k, q + l), h.changeColor(e), h.setPosition(b, g), h.fixPrevious(), h.fixedPosition && (c = !1), !c && "radar" != f.type && (b < k - .5 || b > a + k || g < l - .5 || g > q + l) ? (h.showBalloon(m), h.hide(0)) : (h.followCursor(c), h.showBalloon(m)))) : (this.hideBalloonReal(), h.hide(), this.resizeBullet(a, e, g))
                } else this.hideBalloonReal()
            }
        }, resizeBullet: function (a, b, c) {
            this.fixBulletSize();
            if (a && d.isModern && (1 != b || !isNaN(c))) {
                var e = a.bulletGraphics;
                e && !e.doNotScale && (e.translate(a.bx, a.by, b), isNaN(c) || (e.setAttr("fill-opacity",
                    c), e.setAttr("stroke-opacity", c)), this.resizedDItem = a)
            }
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.ChartCursor = d.Class({
        construct: function (a) {
            this.cname = "ChartCursor";
            this.createEvents("changed", "zoomed", "onHideCursor", "onShowCursor", "draw", "selected", "moved", "panning", "zoomStarted");
            this.enabled = !0;
            this.cursorAlpha = 1;
            this.selectionAlpha = .2;
            this.cursorColor = "#CC0000";
            this.categoryBalloonAlpha = 1;
            this.color = "#FFFFFF";
            this.type = "cursor";
            this.zoomed = !1;
            this.zoomable = !0;
            this.pan = !1;
            this.categoryBalloonDateFormat = "MMM DD, YYYY";
            this.categoryBalloonText = "[[category]]";
            this.categoryBalloonEnabled = this.valueBalloonsEnabled = !0;
            this.rolledOver = !1;
            this.cursorPosition = "middle";
            this.bulletsEnabled = this.skipZoomDispatch = !1;
            this.bulletSize = 8;
            this.selectWithoutZooming = this.oneBalloonOnly = !1;
            this.graphBulletSize = 1.7;
            this.animationDuration = .3;
            this.zooming = !1;
            this.adjustment = 0;
            this.avoidBalloonOverlapping = !0;
            this.leaveCursor = !1;
            this.leaveAfterTouch = !0;
            this.valueZoomable = !1;
            this.balloonPointerOrientation = "horizontal";
            this.hLineEnabled = this.vLineEnabled = !0;
            this.vZoomEnabled =
                this.hZoomEnabled = !1;
            d.applyTheme(this, a, this.cname)
        }, draw: function () {
            this.destroy();
            var a = this.chart;
            a.panRequired = !0;
            var b = a.container;
            this.rotate = a.rotate;
            this.container = b;
            this.prevLineHeight = this.prevLineWidth = NaN;
            b = b.set();
            b.translate(this.x, this.y);
            this.set = b;
            a.cursorSet.push(b);
            this.createElements();
            d.isString(this.limitToGraph) && (this.limitToGraph = d.getObjById(a.graphs, this.limitToGraph), this.fullWidth = !1, this.cursorPosition = "middle");
            this.pointer = this.balloonPointerOrientation.substr(0, 1).toUpperCase();
            this.isHidden = !1;
            this.hideLines();
            this.valueLineAxis || (this.valueLineAxis = a.valueAxes[0])
        }, createElements: function () {
            var a = this, b = a.chart, c = b.dx, e = b.dy, g = a.width, f = a.height, h, k, l = a.cursorAlpha,
                m = a.valueLineAlpha;
            a.rotate ? (h = m, k = l) : (k = m, h = l);
            "xy" == b.type && (k = l, void 0 !== m && (k = m), h = l);
            a.vvLine = d.line(a.container, [c, 0, 0], [e, 0, f], a.cursorColor, h, 1);
            d.setCN(b, a.vvLine, "cursor-line");
            d.setCN(b, a.vvLine, "cursor-line-vertical");
            a.hhLine = d.line(a.container, [0, g, g + c], [0, 0, e], a.cursorColor, k, 1);
            d.setCN(b, a.hhLine,
                "cursor-line");
            d.setCN(b, a.hhLine, "cursor-line-horizontal");
            a.vLine = a.rotate ? a.vvLine : a.hhLine;
            a.set.push(a.vvLine);
            a.set.push(a.hhLine);
            a.set.node.style.pointerEvents = "none";
            a.fullLines = a.container.set();
            b = b.cursorLineSet;
            b.push(a.fullLines);
            b.translate(a.x, a.y);
            b.clipRect(-1, -1, g + 2, f + 2);
            void 0 !== a.tabIndex && (b.setAttr("tabindex", a.tabIndex), b.keyup(function (b) {
                a.handleKeys(b)
            }).focus(function (b) {
                a.showCursor()
            }).blur(function (b) {
                a.hideCursor()
            }));
            a.set.clipRect(0, 0, g, f)
        }, handleKeys: function (a) {
            var b =
                this.prevIndex, c = this.chart;
            if (c) {
                var e = c.chartData;
                e && (isNaN(b) && (b = e.length - 1), 37 != a.keyCode && 40 != a.keyCode || b--, 39 != a.keyCode && 38 != a.keyCode || b++, b = d.fitToBounds(b, c.startIndex, c.endIndex), (a = this.chart.chartData[b]) && this.setPosition(a.x.categoryAxis), this.prevIndex = b)
            }
        }, update: function () {
            var a = this.chart;
            if (a) {
                var b = a.mouseX - this.x, c = a.mouseY - this.y;
                this.mouseX = b;
                this.mouseY = c;
                this.mouse2X = a.mouse2X - this.x;
                this.mouse2Y = a.mouse2Y - this.y;
                var e;
                if (a.chartData && 0 < a.chartData.length) {
                    this.mouseIsOver() ?
                        (this.hideGraphBalloons = !1, this.rolledOver = e = !0, this.updateDrawing(), this.vvLine && isNaN(this.fx) && (a.rotate || !this.limitToGraph) && this.vvLine.translate(b, 0), !this.hhLine || !isNaN(this.fy) || a.rotate && this.limitToGraph || this.hhLine.translate(0, c), isNaN(this.mouse2X) ? this.dispatchMovedEvent(b, c) : e = !1) : this.forceShow || this.hideCursor();
                    if (this.zooming) {
                        if (!isNaN(this.mouse2X)) {
                            isNaN(this.mouse2X0) || this.dispatchPanEvent();
                            return
                        }
                        if (this.pan) {
                            this.dispatchPanEvent();
                            return
                        }
                        (this.hZoomEnabled || this.vZoomEnabled) &&
                        this.zooming && this.updateSelection()
                    }
                    e && this.showCursor()
                }
            }
        }, updateDrawing: function () {
            this.drawing && this.chart.setMouseCursor("crosshair");
            if (this.drawingNow && (d.remove(this.drawingLine), 1 < Math.abs(this.drawStartX - this.mouseX) || 1 < Math.abs(this.drawStartY - this.mouseY))) {
                var a = this.chart, b = a.marginTop, a = a.marginLeft;
                this.drawingLine = d.line(this.container, [this.drawStartX + a, this.mouseX + a], [this.drawStartY + b, this.mouseY + b], this.cursorColor, 1, 1)
            }
        }, fixWidth: function (a) {
            if (this.fullWidth && this.prevLineWidth !=
                a) {
                var b = this.vvLine, c = 0;
                b && (b.remove(), c = b.x);
                b = this.container.set();
                b.translate(c, 0);
                c = d.rect(this.container, a, this.height, this.cursorColor, this.cursorAlpha, this.cursorAlpha, this.cursorColor);
                d.setCN(this.chart, c, "cursor-fill");
                c.translate(-a / 2 - 1, 0);
                b.push(c);
                this.vvLine = b;
                this.fullLines.push(b);
                this.prevLineWidth = a
            }
        }, fixHeight: function (a) {
            if (this.fullWidth && this.prevLineHeight != a) {
                var b = this.hhLine, c = 0;
                b && (b.remove(), c = b.y);
                b = this.container.set();
                b.translate(0, c);
                c = d.rect(this.container, this.width,
                    a, this.cursorColor, this.cursorAlpha);
                c.translate(0, -a / 2);
                b.push(c);
                this.fullLines.push(b);
                this.hhLine = b;
                this.prevLineHeight = a
            }
        }, fixVLine: function (a, b) {
            if (!isNaN(a) && this.vvLine) {
                if (isNaN(this.prevLineX)) {
                    var c = 0, e = this.mouseX;
                    if (this.limitToGraph) {
                        var d = this.chart.categoryAxis;
                        d && (this.chart.rotate || (c = "bottom" == d.position ? this.height : -this.height), e = a)
                    }
                    this.vvLine.translate(e, c)
                } else this.prevLineX != a && this.vvLine.translate(this.prevLineX, this.prevLineY);
                this.fx = a;
                this.prevLineX != a && (c = this.animationDuration,
                this.zooming && (c = 0), this.vvLine.stop(), this.vvLine.animate({translate: a + "," + b}, c, "easeOutSine"), this.prevLineX = a, this.prevLineY = b)
            }
        }, fixHLine: function (a, b) {
            if (!isNaN(a) && this.hhLine) {
                if (isNaN(this.prevLineY)) {
                    var c = 0, e = this.mouseY;
                    if (this.limitToGraph) {
                        var d = this.chart.categoryAxis;
                        d && (this.chart.rotate && (c = "right" == d.position ? this.width : -this.width), e = a)
                    }
                    this.hhLine.translate(c, e)
                } else this.prevLineY != a && this.hhLine.translate(this.prevLineX, this.prevLineY);
                this.fy = a;
                this.prevLineY != a && (c = this.animationDuration,
                this.zooming && (c = 0), this.hhLine.stop(), this.hhLine.animate({translate: b + "," + a}, c, "easeOutSine"), this.prevLineY = a, this.prevLineX = b)
            }
        }, hideCursor: function (a) {
            this.forceShow = !1;
            this.chart.wasTouched && this.leaveAfterTouch || this.isHidden || this.leaveCursor || (this.hideCursorReal(), a ? this.chart.handleCursorHide() : this.fire({
                target: this,
                chart: this.chart,
                type: "onHideCursor"
            }), this.chart.setMouseCursor("auto"))
        }, hideCursorReal: function () {
            this.hideLines();
            this.isHidden = !0;
            this.index = this.prevLineY = this.prevLineX =
                this.mouseY0 = this.mouseX0 = this.fy = this.fx = NaN
        }, hideLines: function () {
            this.vvLine && this.vvLine.hide();
            this.hhLine && this.hhLine.hide();
            this.fullLines && this.fullLines.hide();
            this.isHidden = !0;
            this.chart.handleCursorHide()
        }, showCursor: function (a) {
            !this.drawing && this.enabled && (this.vLineEnabled && this.vvLine && this.vvLine.show(), this.hLineEnabled && this.hhLine && this.hhLine.show(), this.isHidden = !1, this.updateFullLine(), a || this.fire({
                target: this,
                chart: this.chart,
                type: "onShowCursor"
            }), this.pan && this.chart.setMouseCursor("move"))
        },
        updateFullLine: function () {
            this.zooming && this.fullWidth && this.selection && (this.rotate ? 0 < this.selection.height && this.hhLine.hide() : 0 < this.selection.width && this.vvLine.hide())
        }, updateSelection: function () {
            if (!this.pan && this.enabled) {
                var a = this.mouseX, b = this.mouseY;
                isNaN(this.fx) || (a = this.fx);
                isNaN(this.fy) || (b = this.fy);
                this.clearSelection();
                var c = this.mouseX0, e = this.mouseY0, g = this.width, f = this.height, a = d.fitToBounds(a, 0, g),
                    b = d.fitToBounds(b, 0, f), h;
                a < c && (h = a, a = c, c = h);
                b < e && (h = b, b = e, e = h);
                this.hZoomEnabled ?
                    g = a - c : c = 0;
                this.vZoomEnabled ? f = b - e : e = 0;
                isNaN(this.mouse2X) && 0 < Math.abs(g) && 0 < Math.abs(f) && (a = this.chart, b = d.rect(this.container, g, f, this.cursorColor, this.selectionAlpha), d.setCN(a, b, "cursor-selection"), b.width = g, b.height = f, b.translate(c, e), this.set.push(b), this.selection = b);
                this.updateFullLine()
            }
        }, mouseIsOver: function () {
            var a = this.mouseX, b = this.mouseY;
            if (this.justReleased) return this.justReleased = !1, !0;
            if (this.mouseIsDown) return !0;
            if (!this.chart.mouseIsOver) return this.handleMouseOut(), !1;
            if (0 < a &&
                a < this.width && 0 < b && b < this.height) return !0;
            this.handleMouseOut();
            return !1
        }, fixPosition: function () {
            this.prevY = this.prevX = NaN
        }, handleMouseDown: function () {
            this.update();
            if (this.mouseIsOver()) if (this.mouseIsDown = !0, this.mouseX0 = this.mouseX, this.mouseY0 = this.mouseY, this.mouse2X0 = this.mouse2X, this.mouse2Y0 = this.mouse2Y, this.drawing) this.drawStartY = this.mouseY, this.drawStartX = this.mouseX, this.drawingNow = !0; else if (this.dispatchMovedEvent(this.mouseX, this.mouseY), !this.pan && isNaN(this.mouse2X0) && (isNaN(this.fx) ||
            (this.mouseX0 = this.fx), isNaN(this.fy) || (this.mouseY0 = this.fy)), this.hZoomEnabled || this.vZoomEnabled) {
                this.zooming = !0;
                var a = {chart: this.chart, target: this, type: "zoomStarted"};
                a.x = this.mouseX / this.width;
                a.y = this.mouseY / this.height;
                this.index0 = a.index = this.index;
                this.timestamp0 = this.timestamp;
                this.fire(a)
            }
        }, registerInitialMouse: function () {
        }, handleReleaseOutside: function () {
            this.mouseIsDown = !1;
            if (this.drawingNow) {
                this.drawingNow = !1;
                d.remove(this.drawingLine);
                var a = this.drawStartX, b = this.drawStartY, c = this.mouseX,
                    e = this.mouseY, g = this.chart;
                (2 < Math.abs(a - c) || 2 < Math.abs(b - e)) && this.fire({
                    type: "draw",
                    target: this,
                    chart: g,
                    initialX: a,
                    initialY: b,
                    finalX: c,
                    finalY: e
                })
            }
            this.zooming && (this.zooming = !1, this.selectWithoutZooming ? this.dispatchZoomEvent("selected") : (this.hZoomEnabled || this.vZoomEnabled) && this.dispatchZoomEvent("zoomed"), this.rolledOver && this.dispatchMovedEvent(this.mouseX, this.mouseY));
            this.mouse2Y0 = this.mouse2X0 = this.mouseY0 = this.mouseX0 = NaN
        }, dispatchZoomEvent: function (a) {
            if (!this.pan) {
                var b = this.selection;
                if (b && 3 < Math.abs(b.width) && 3 < Math.abs(b.height)) {
                    var c = Math.min(this.index, this.index0), e = Math.max(this.index, this.index0), d = c, f = e,
                        h = this.chart, k = h.chartData, l = h.categoryAxis;
                    l && l.parseDates && !l.equalSpacing && (d = k[c] ? k[c].time : Math.min(this.timestamp0, this.timestamp), f = k[e] ? h.getEndTime(k[e].time) : Math.max(this.timestamp0, this.timestamp));
                    var b = {
                            type: a,
                            chart: this.chart,
                            target: this,
                            end: f,
                            start: d,
                            startIndex: c,
                            endIndex: e,
                            selectionHeight: b.height,
                            selectionWidth: b.width,
                            selectionY: b.y,
                            selectionX: b.x
                        },
                        m;
                    this.hZoomEnabled && 4 < Math.abs(this.mouseX0 - this.mouseX) && (b.startX = this.mouseX0 / this.width, b.endX = this.mouseX / this.width, m = !0);
                    this.vZoomEnabled && 4 < Math.abs(this.mouseY0 - this.mouseY) && (b.startY = 1 - this.mouseY0 / this.height, b.endY = 1 - this.mouseY / this.height, m = !0);
                    m && (this.prevY = this.prevX = NaN, this.fire(b), "selected" != a && this.clearSelection());
                    this.hideCursor()
                }
            }
        }, dispatchMovedEvent: function (a, b, c, e) {
            a = Math.round(a);
            b = Math.round(b);
            if (!this.isHidden && (a != this.prevX || b != this.prevY || "changed" == c)) {
                c ||
                (c = "moved");
                var d = this.fx, f = this.fy;
                isNaN(d) && (d = a);
                isNaN(f) && (f = b);
                var h = !1;
                this.zooming && this.pan && (h = !0);
                h = {
                    hidden: this.isHidden,
                    type: c,
                    chart: this.chart,
                    target: this,
                    x: a,
                    y: b,
                    finalX: d,
                    finalY: f,
                    zooming: this.zooming,
                    panning: h,
                    mostCloseGraph: this.mostCloseGraph,
                    index: this.index,
                    skip: e,
                    hideBalloons: this.hideGraphBalloons
                };
                this.prevIndex = this.index;
                this.rotate ? (h.position = b, h.finalPosition = f) : (h.position = a, h.finalPosition = d);
                this.prevX = a;
                this.prevY = b;
                e ? this.chart.handleCursorMove(h) : (this.fire(h), "changed" ==
                c && this.chart.fire(h))
            }
        }, dispatchPanEvent: function () {
            if (this.mouseIsDown) {
                var a = d.roundTo((this.mouseX - this.mouseX0) / this.width, 3),
                    b = d.roundTo((this.mouseY - this.mouseY0) / this.height, 3),
                    c = d.roundTo((this.mouse2X - this.mouse2X0) / this.width, 3),
                    e = d.roundTo((this.mouse2Y - this.mouse2Y0) / this.height, 2), g = !1;
                0 !== Math.abs(a) && 0 !== Math.abs(b) && (g = !0);
                if (this.prevDeltaX == a || this.prevDeltaY == b) g = !1;
                isNaN(c) || isNaN(e) || (0 !== Math.abs(c) && 0 !== Math.abs(e) && (g = !0), this.prevDelta2X != c && this.prevDelta2Y != e) || (g = !1);
                g && (this.hideLines(), this.fire({
                    type: "panning",
                    chart: this.chart,
                    target: this,
                    deltaX: a,
                    deltaY: b,
                    delta2X: c,
                    delta2Y: e,
                    index: this.index
                }), this.prevDeltaX = a, this.prevDeltaY = b, this.prevDelta2X = c, this.prevDelta2Y = e)
            }
        }, clearSelection: function () {
            var a = this.selection;
            a && (a.width = 0, a.height = 0, a.remove())
        }, destroy: function () {
            this.clear();
            d.remove(this.selection);
            this.selection = null;
            clearTimeout(this.syncTO);
            d.remove(this.set)
        }, clear: function () {
        }, setTimestamp: function (a) {
            this.timestamp = a
        }, setIndex: function (a, b) {
            a !=
            this.index && (this.index = a, b || this.isHidden || this.dispatchMovedEvent(this.mouseX, this.mouseY, "changed"))
        }, handleMouseOut: function () {
            this.enabled && this.rolledOver && (this.leaveCursor || this.setIndex(void 0), this.forceShow = !1, this.hideCursor(), this.rolledOver = !1)
        }, showCursorAt: function (a) {
            var b = this.chart.categoryAxis;
            b && this.setPosition(b.categoryToCoordinate(a), a)
        }, setPosition: function (a, b) {
            var c = this.chart, e = c.categoryAxis;
            if (e) {
                var d, f;
                void 0 === b && (b = e.coordinateToValue(a));
                e.showBalloonAt(b, a);
                this.forceShow =
                    !0;
                e.stickBalloonToCategory ? c.rotate ? this.fixHLine(a, 0) : this.fixVLine(a, 0) : (this.showCursor(), c.rotate ? this.hhLine.translate(0, a) : this.vvLine.translate(a, 0));
                c.rotate ? d = a : f = a;
                c.rotate ? (this.vvLine && this.vvLine.hide(), this.hhLine && this.hhLine.show()) : (this.hhLine && this.hhLine.hide(), this.vvLine && this.vvLine.show());
                this.updateFullLine();
                this.isHidden = !1;
                this.dispatchMovedEvent(f, d, "moved", !0)
            }
        }, enableDrawing: function (a) {
            this.enabled = !a;
            this.hideCursor();
            this.drawing = a
        }, syncWithCursor: function (a, b) {
            clearTimeout(this.syncTO);
            a && (a.isHidden ? this.hideCursor(!0) : this.syncWithCursorReal(a, b))
        }, isZooming: function (a) {
            this.zooming = a
        }, syncWithCursorReal: function (a, b) {
            var c = a.vvLine, e = a.hhLine;
            this.index = a.index;
            this.forceShow = !0;
            this.zooming && this.pan || this.showCursor(!0);
            this.hideGraphBalloons = b;
            this.justReleased = a.justReleased;
            this.zooming = a.zooming;
            this.index0 = a.index0;
            this.mouseX0 = a.mouseX0;
            this.mouseY0 = a.mouseY0;
            this.mouse2X0 = a.mouse2X0;
            this.mouse2Y0 = a.mouse2Y0;
            this.timestamp0 = a.timestamp0;
            this.prevDeltaX = a.prevDeltaX;
            this.prevDeltaY =
                a.prevDeltaY;
            this.prevDelta2X = a.prevDelta2X;
            this.prevDelta2Y = a.prevDelta2Y;
            this.fx = a.fx;
            this.fy = a.fy;
            a.zooming && this.updateSelection();
            var d = a.mouseX, f = a.mouseY;
            this.rotate ? (d = NaN, this.vvLine && this.vvLine.hide(), this.hhLine && e && (isNaN(a.fy) ? this.hhLine.translate(0, a.mouseY) : this.fixHLine(a.fy, 0))) : (f = NaN, this.hhLine && this.hhLine.hide(), this.vvLine && c && (isNaN(a.fx) ? this.vvLine.translate(a.mouseX, 0) : this.fixVLine(a.fx, 0)));
            this.dispatchMovedEvent(d, f, "moved", !0)
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.SimpleChartScrollbar = d.Class({
        construct: function (a) {
            this.createEvents("zoomed", "zoomStarted", "zoomEnded");
            this.backgroundColor = "#D4D4D4";
            this.backgroundAlpha = 1;
            this.selectedBackgroundColor = "#EFEFEF";
            this.scrollDuration = this.selectedBackgroundAlpha = 1;
            this.resizeEnabled = !0;
            this.hideResizeGrips = !1;
            this.scrollbarHeight = 20;
            this.updateOnReleaseOnly = !1;
            9 > document.documentMode && (this.updateOnReleaseOnly = !0);
            this.dragIconHeight = this.dragIconWidth = 35;
            this.dragIcon = "dragIconRoundBig";
            this.dragCursorHover = "cursor: move; cursor: grab; cursor: -moz-grab; cursor: -webkit-grab;";
            this.dragCursorDown = "cursor: move; cursor: grab; cursor: -moz-grabbing; cursor: -webkit-grabbing;";
            this.vResizeCursor = "ns-resize";
            this.hResizeCursor = "ew-resize";
            this.enabled = !0;
            this.percentStart = this.offset = 0;
            this.percentEnd = 1;
            d.applyTheme(this, a, "SimpleChartScrollbar")
        }, getPercents: function () {
            var a = this.getDBox(), b = a.x, c = a.y, e = a.width, a = a.height;
            this.rotate ? (b = 1 - c / this.height, c = 1 - (c + a) / this.height) : (c = b / this.width,
                b = (b + e) / this.width);
            this.percentStart = c;
            this.percentEnd = b
        }, draw: function () {
            var a = this;
            a.destroy();
            if (a.enabled) {
                var b = a.chart.container, c = a.rotate, e = a.chart;
                e.panRequired = !0;
                var g = b.set();
                a.set = g;
                c ? d.setCN(e, g, "scrollbar-vertical") : d.setCN(e, g, "scrollbar-horizontal");
                e.scrollbarsSet.push(g);
                var f, h;
                c ? (f = a.scrollbarHeight, h = e.plotAreaHeight) : (h = a.scrollbarHeight, f = e.plotAreaWidth);
                a.width = f;
                if ((a.height = h) && f) {
                    var k = d.rect(b, f, h, a.backgroundColor, a.backgroundAlpha, 1, a.backgroundColor, a.backgroundAlpha);
                    d.setCN(e, k, "scrollbar-bg");
                    a.bg = k;
                    g.push(k);
                    k = d.rect(b, f, h, "#000", .005);
                    g.push(k);
                    a.invisibleBg = k;
                    k.click(function () {
                        a.handleBgClick()
                    }).mouseover(function () {
                        a.handleMouseOver()
                    }).mouseout(function () {
                        a.handleMouseOut()
                    }).touchend(function () {
                        a.handleBgClick()
                    });
                    k = d.rect(b, f, h, a.selectedBackgroundColor, a.selectedBackgroundAlpha);
                    d.setCN(e, k, "scrollbar-bg-selected");
                    a.selectedBG = k;
                    g.push(k);
                    f = d.rect(b, f, h, "#000", .005);
                    a.dragger = f;
                    g.push(f);
                    f.mousedown(function (b) {
                        a.handleDragStart(b)
                    }).mouseup(function () {
                        a.handleDragStop()
                    }).mouseover(function () {
                        a.handleDraggerOver()
                    }).mouseout(function () {
                        a.handleMouseOut()
                    }).touchstart(function (b) {
                        a.handleDragStart(b)
                    }).touchend(function () {
                        a.handleDragStop()
                    });
                    h = e.pathToImages;
                    var l, k = a.dragIcon.replace(/\.[a-z]*$/i, "");
                    d.isAbsolute(k) && (h = "");
                    c ? (l = h + k + "H" + e.extension, h = a.dragIconWidth, c = a.dragIconHeight) : (l = h + k + e.extension, c = a.dragIconWidth, h = a.dragIconHeight);
                    k = b.image(l, 0, 0, c, h);
                    d.setCN(e, k, "scrollbar-grip-left");
                    l = b.image(l, 0, 0, c, h);
                    d.setCN(e, l, "scrollbar-grip-right");
                    var m = 10, n = 20;
                    e.panEventsEnabled && (m = 25, n = a.scrollbarHeight);
                    var q = d.rect(b, m, n, "#000", .005), p = d.rect(b, m, n, "#000", .005);
                    p.translate(-(m - c) / 2, -(n - h) / 2);
                    q.translate(-(m - c) / 2, -(n - h) / 2);
                    c = b.set([k, p]);
                    b = b.set([l, q]);
                    a.iconLeft = c;
                    g.push(a.iconLeft);
                    a.iconRight = b;
                    g.push(b);
                    a.updateGripCursor(!1);
                    e.makeAccessible(c, a.accessibleLabel);
                    e.makeAccessible(b, a.accessibleLabel);
                    e.makeAccessible(f, a.accessibleLabel);
                    c.setAttr("role", "menuitem");
                    b.setAttr("role", "menuitem");
                    f.setAttr("role", "menuitem");
                    void 0 !== a.tabIndex && (c.setAttr("tabindex", a.tabIndex), c.keyup(function (b) {
                        a.handleKeys(b, 1, 0)
                    }));
                    void 0 !== a.tabIndex && (f.setAttr("tabindex", a.tabIndex), f.keyup(function (b) {
                        a.handleKeys(b, 1, 1)
                    }));
                    void 0 !== a.tabIndex && (b.setAttr("tabindex", a.tabIndex), b.keyup(function (b) {
                        a.handleKeys(b, 0, 1)
                    }));
                    c.mousedown(function () {
                        a.leftDragStart()
                    }).mouseup(function () {
                        a.leftDragStop()
                    }).mouseover(function () {
                        a.iconRollOver()
                    }).mouseout(function () {
                        a.iconRollOut()
                    }).touchstart(function () {
                        a.leftDragStart()
                    }).touchend(function () {
                        a.leftDragStop()
                    });
                    b.mousedown(function () {
                        a.rightDragStart()
                    }).mouseup(function () {
                        a.rightDragStop()
                    }).mouseover(function () {
                        a.iconRollOver()
                    }).mouseout(function () {
                        a.iconRollOut()
                    }).touchstart(function () {
                        a.rightDragStart()
                    }).touchend(function () {
                        a.rightDragStop()
                    });
                    d.ifArray(e.chartData) ? g.show() : g.hide();
                    a.hideDragIcons();
                    a.clipDragger(!1)
                }
                g.translate(a.x, a.y);
                g.node.style.msTouchAction = "none";
                g.node.style.touchAction = "none"
            }
        }, handleKeys: function (a, b, c) {
            this.getPercents();
            var e = this.percentStart, d = this.percentEnd;
            if (this.rotate) var f = d, d = e, e = f;
            if (37 == a.keyCode || 40 == a.keyCode) e -= .02 * b, d -= .02 * c;
            if (39 == a.keyCode || 38 == a.keyCode) e += .02 * b, d += .02 * c;
            this.rotate && (a = d, d = e, e = a);
            isNaN(d) || isNaN(e) || this.percentZoom(e, d, !0)
        }, updateScrollbarSize: function (a, b) {
            if (!isNaN(a) &&
                !isNaN(b)) {
                a = Math.round(a);
                b = Math.round(b);
                var c = this.dragger, e, d, f, h, k;
                this.rotate ? (e = 0, d = a, f = this.width + 1, h = b - a, c.setAttr("height", b - a), c.setAttr("y", d)) : (e = a, d = 0, f = b - a, h = this.height + 1, k = b - a, c.setAttr("x", e), c.setAttr("width", k));
                this.clipAndUpdate(e, d, f, h)
            }
        }, update: function () {
            var a, b = !1, c, e, d = this.x, f = this.y, h = this.dragger, k = this.getDBox();
            if (k) {
                c = k.x + d;
                e = k.y + f;
                var l = k.width, k = k.height, m = this.rotate, n = this.chart, q = this.width, p = this.height,
                    t = n.mouseX, n = n.mouseY;
                a = this.initialMouse;
                this.forceClip &&
                this.clipDragger(!0);
                if (this.dragging) {
                    var r = this.initialCoord;
                    if (m) a = r + (n - a), 0 > a && (a = 0), r = p - k, a > r && (a = r), h.setAttr("y", a); else {
                        a = r + (t - a);
                        0 > a && (a = 0);
                        r = q - l;
                        if (a > r || isNaN(a)) a = r;
                        h.setAttr("x", a)
                    }
                    this.clipDragger(!0)
                }
                if (this.resizingRight) {
                    if (m) if (a = n - e, !isNaN(this.maxHeight) && a > this.maxHeight && (a = this.maxHeight), a + e > p + f && (a = p - e + f), 0 > a) this.resizingRight = !1, b = this.resizingLeft = !0; else {
                        if (0 === a || isNaN(a)) a = .1;
                        h.setAttr("height", a)
                    } else if (a = t - c, !isNaN(this.maxWidth) && a > this.maxWidth && (a = this.maxWidth),
                    a + c > q + d && (a = q - c + d), 0 > a) this.resizingRight = !1, b = this.resizingLeft = !0; else {
                        if (0 === a || isNaN(a)) a = .1;
                        h.setAttr("width", a)
                    }
                    this.clipDragger(!0)
                }
                if (this.resizingLeft) {
                    if (m) if (c = e, e = n, e < f && (e = f), isNaN(e) && (e = f), e > p + f && (e = p + f), a = !0 === b ? c - e : k + c - e, !isNaN(this.maxHeight) && a > this.maxHeight && (a = this.maxHeight, e = c), 0 > a) this.resizingRight = !0, this.resizingLeft = !1, h.setAttr("y", c + k - f); else {
                        if (0 === a || isNaN(a)) a = .1;
                        h.setAttr("y", e - f);
                        h.setAttr("height", a)
                    } else if (e = t, e < d && (e = d), isNaN(e) && (e = d), e > q + d && (e = q + d), a = !0 ===
                    b ? c - e : l + c - e, !isNaN(this.maxWidth) && a > this.maxWidth && (a = this.maxWidth, e = c), 0 > a) this.resizingRight = !0, this.resizingLeft = !1, h.setAttr("x", c + l - d); else {
                        if (0 === a || isNaN(a)) a = .1;
                        h.setAttr("x", e - d);
                        h.setAttr("width", a)
                    }
                    this.clipDragger(!0)
                }
            }
        }, stopForceClip: function () {
            this.animating = this.forceClip = !1
        }, clipDragger: function (a) {
            var b = this.getDBox();
            if (b) {
                var c = b.x, d = b.y, g = b.width, b = b.height, f = !1;
                if (this.rotate) {
                    if (c = 0, g = this.width + 1, this.clipY != d || this.clipH != b) f = !0
                } else if (d = 0, b = this.height + 1, this.clipX != c ||
                this.clipW != g) f = !0;
                f && this.clipAndUpdate(c, d, g, b);
                a && (this.updateOnReleaseOnly || this.dispatchScrollbarEvent())
            }
        }, maskGraphs: function () {
        }, clipAndUpdate: function (a, b, c, d) {
            this.clipX = a;
            this.clipY = b;
            this.clipW = c;
            this.clipH = d;
            this.selectedBG.setAttr("width", c);
            this.selectedBG.setAttr("height", d);
            this.selectedBG.translate(a, b);
            this.updateDragIconPositions();
            this.maskGraphs(a, b, c, d)
        }, dispatchScrollbarEvent: function () {
            if (this.skipEvent) this.skipEvent = !1; else {
                var a = this.chart;
                a.hideBalloon();
                var b = this.getDBox(),
                    c = b.x, d = b.y, g = b.width, b = b.height;
                this.getPercents();
                this.rotate ? (c = d, g = this.height / b) : g = this.width / g;
                a = {
                    type: "zoomed",
                    position: c,
                    chart: a,
                    target: this,
                    multiplier: g,
                    relativeStart: this.percentStart,
                    relativeEnd: this.percentEnd
                };
                if (this.percentStart != this.prevPercentStart || this.percentEnd != this.prevPercentEnd || this.prevMultiplier != g) this.fire(a), this.prevPercentStart = this.percentStart, this.prevPercentEnd = this.percentEnd, this.prevMultiplier = g
            }
        }, updateDragIconPositions: function () {
            var a = this.getDBox(), b = a.x,
                c = a.y, d = this.iconLeft, g = this.iconRight, f, h, k = this.scrollbarHeight;
            this.rotate ? (f = this.dragIconWidth, h = this.dragIconHeight, d.translate((k - h) / 2, c - f / 2), g.translate((k - h) / 2, c + a.height - f / 2)) : (f = this.dragIconHeight, h = this.dragIconWidth, d.translate(b - h / 2, (k - f) / 2), g.translate(b - h / 2 + a.width, (k - f) / 2))
        }, showDragIcons: function () {
            this.resizeEnabled && (this.iconLeft.show(), this.iconRight.show())
        }, hideDragIcons: function () {
            if (!this.resizingLeft && !this.resizingRight && !this.dragging) {
                if (this.hideResizeGrips || !this.resizeEnabled) this.iconLeft.hide(),
                    this.iconRight.hide();
                this.removeCursors()
            }
        }, removeCursors: function () {
            this.chart.setMouseCursor("auto")
        }, fireZoomEvent: function (a) {
            this.fire({type: a, chart: this.chart, target: this})
        }, percentZoom: function (a, b, c) {
            a = d.fitToBounds(a, 0, b);
            b = d.fitToBounds(b, a, 1);
            if (this.dragger && this.enabled) {
                this.dragger.stop();
                isNaN(a) && (a = 0);
                isNaN(b) && (b = 1);
                var e, g;
                this.rotate ? (e = this.height, b = e - e * b, g = e - e * a) : (e = this.width, g = e * b, b = e * a);
                this.updateScrollbarSize(b, g);
                this.clipDragger(!1);
                this.getPercents();
                c && this.dispatchScrollbarEvent()
            }
        },
        destroy: function () {
            this.clear();
            d.remove(this.set);
            d.remove(this.iconRight);
            d.remove(this.iconLeft)
        }, clear: function () {
        }, handleDragStart: function () {
            if (this.enabled) {
                this.fireZoomEvent("zoomStarted");
                var a = this.chart;
                this.dragger.stop();
                this.removeCursors();
                d.isModern && (this.dragger.node.style.cssText = this.dragCursorDown);
                this.dragging = !0;
                var b = this.getDBox();
                this.rotate ? (this.initialCoord = b.y, this.initialMouse = a.mouseY) : (this.initialCoord = b.x, this.initialMouse = a.mouseX)
            }
        }, handleDragStop: function () {
            this.updateOnReleaseOnly &&
            (this.update(), this.skipEvent = !1, this.dispatchScrollbarEvent());
            this.dragging = !1;
            this.mouseIsOver && this.removeCursors();
            d.isModern && (this.dragger.node.style.cssText = this.dragCursorHover);
            this.update();
            this.fireZoomEvent("zoomEnded")
        }, handleDraggerOver: function () {
            this.handleMouseOver();
            d.isModern && (this.dragger.node.style.cssText = this.dragCursorHover)
        }, leftDragStart: function () {
            this.fireZoomEvent("zoomStarted");
            this.dragger.stop();
            this.resizingLeft = !0;
            this.updateGripCursor(!0)
        }, updateGripCursor: function (a) {
            d.isModern &&
            (a = this.rotate ? a ? this.vResizeCursorDown : this.vResizeCursorHover : a ? this.hResizeCursorDown : this.hResizeCursorHover) && (this.iconRight && (this.iconRight.node.style.cssText = a), this.iconLeft && (this.iconLeft.node.style.cssText = a))
        }, leftDragStop: function () {
            this.resizingLeft && (this.resizingLeft = !1, this.mouseIsOver || this.removeCursors(), this.updateOnRelease(), this.fireZoomEvent("zoomEnded"));
            this.updateGripCursor(!1)
        }, rightDragStart: function () {
            this.fireZoomEvent("zoomStarted");
            this.dragger.stop();
            this.resizingRight =
                !0;
            this.updateGripCursor(!0)
        }, rightDragStop: function () {
            this.resizingRight && (this.resizingRight = !1, this.mouseIsOver || this.removeCursors(), this.updateOnRelease(), this.fireZoomEvent("zoomEnded"));
            this.updateGripCursor(!1)
        }, iconRollOut: function () {
            this.removeCursors()
        }, iconRollOver: function () {
            this.rotate ? this.vResizeCursor && this.chart.setMouseCursor(this.vResizeCursor) : this.hResizeCursor && this.chart.setMouseCursor(this.hResizeCursor);
            this.handleMouseOver()
        }, getDBox: function () {
            if (this.dragger) return this.dragger.getBBox()
        },
        handleBgClick: function () {
            var a = this;
            if (!a.resizingRight && !a.resizingLeft) {
                a.zooming = !0;
                var b, c, e = a.scrollDuration, g = a.dragger;
                b = a.getDBox();
                var f = b.height, h = b.width;
                c = a.chart;
                var k = a.y, l = a.x, m = a.rotate;
                m ? (b = "y", c = c.mouseY - f / 2 - k, c = d.fitToBounds(c, 0, a.height - f)) : (b = "x", c = c.mouseX - h / 2 - l, c = d.fitToBounds(c, 0, a.width - h));
                a.updateOnReleaseOnly ? (a.skipEvent = !1, g.setAttr(b, c), a.dispatchScrollbarEvent(), a.clipDragger()) : (a.animating = !0, c = Math.round(c), m ? g.animate({y: c}, e, ">") : g.animate({x: c}, e, ">"), a.forceClip =
                    !0, clearTimeout(a.forceTO), a.forceTO = setTimeout(function () {
                    a.stopForceClip.call(a)
                }, 5E3 * e))
            }
        }, updateOnRelease: function () {
            this.updateOnReleaseOnly && (this.update(), this.skipEvent = !1, this.dispatchScrollbarEvent())
        }, handleReleaseOutside: function () {
            if (this.set) {
                if (this.resizingLeft || this.resizingRight || this.dragging) this.dragging = this.resizingRight = this.resizingLeft = !1, this.updateOnRelease(), this.removeCursors();
                this.animating = this.mouseIsOver = !1;
                this.hideDragIcons();
                this.update()
            }
        }, handleMouseOver: function () {
            this.mouseIsOver =
                !0;
            this.showDragIcons()
        }, handleMouseOut: function () {
            this.mouseIsOver = !1;
            this.hideDragIcons();
            this.removeCursors()
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.ChartScrollbar = d.Class({
        inherits: d.SimpleChartScrollbar, construct: function (a) {
            this.cname = "ChartScrollbar";
            d.ChartScrollbar.base.construct.call(this, a);
            this.graphLineColor = "#BBBBBB";
            this.graphLineAlpha = 0;
            this.graphFillColor = "#BBBBBB";
            this.graphFillAlpha = 1;
            this.selectedGraphLineColor = "#888888";
            this.selectedGraphLineAlpha = 0;
            this.selectedGraphFillColor = "#888888";
            this.selectedGraphFillAlpha = 1;
            this.gridCount = 0;
            this.gridColor = "#FFFFFF";
            this.gridAlpha = .7;
            this.skipEvent =
                this.autoGridCount = !1;
            this.color = "#FFFFFF";
            this.scrollbarCreated = !1;
            this.oppositeAxis = !0;
            this.accessibleLabel = "Zoom chart using cursor arrows";
            d.applyTheme(this, a, this.cname)
        }, init: function () {
            var a = this.categoryAxis, b = this.chart, c = this.gridAxis;
            a || ("CategoryAxis" == this.gridAxis.cname ? (this.catScrollbar = !0, a = new d.CategoryAxis, a.id = "scrollbar") : (a = new d.ValueAxis, a.data = b.chartData, a.id = c.id, a.type = c.type, a.maximumDate = c.maximumDate, a.minimumDate = c.minimumDate, a.minPeriod = c.minPeriod, a.minMaxField =
                c.minMaxField), this.categoryAxis = a);
            a.chart = b;
            var e = b.categoryAxis;
            e && (a.firstDayOfWeek = e.firstDayOfWeek);
            a.dateFormats = c.dateFormats;
            a.markPeriodChange = c.markPeriodChange;
            a.boldPeriodBeginning = c.boldPeriodBeginning;
            a.labelFunction = c.labelFunction;
            a.axisItemRenderer = d.RecItem;
            a.axisRenderer = d.RecAxis;
            a.guideFillRenderer = d.RecFill;
            a.inside = !0;
            a.fontSize = this.fontSize;
            a.tickLength = 0;
            a.axisAlpha = 0;
            d.isString(this.graph) && (this.graph = d.getObjById(b.graphs, this.graph));
            (a = this.graph) && this.catScrollbar &&
            (c = this.valueAxis, c || (this.valueAxis = c = new d.ValueAxis, c.visible = !1, c.scrollbar = !0, c.axisItemRenderer = d.RecItem, c.axisRenderer = d.RecAxis, c.guideFillRenderer = d.RecFill, c.labelsEnabled = !1, c.chart = b), b = this.unselectedGraph, b || (b = new d.AmGraph, b.scrollbar = !0, this.unselectedGraph = b, b.negativeBase = a.negativeBase, b.noStepRisers = a.noStepRisers), b = this.selectedGraph, b || (b = new d.AmGraph, b.scrollbar = !0, this.selectedGraph = b, b.negativeBase = a.negativeBase, b.noStepRisers = a.noStepRisers));
            this.scrollbarCreated = !0
        },
        draw: function () {
            var a = this;
            d.ChartScrollbar.base.draw.call(a);
            if (a.enabled) {
                a.scrollbarCreated || a.init();
                var b = a.chart, c = b.chartData, e = a.categoryAxis, g = a.rotate, f = a.x, h = a.y, k = a.width,
                    l = a.height, m = a.gridAxis, n = a.set;
                e.setOrientation(!g);
                e.parseDates = m.parseDates;
                "ValueAxis" == a.categoryAxis.cname && (e.rotate = !g);
                e.equalSpacing = m.equalSpacing;
                e.minPeriod = m.minPeriod;
                e.startOnAxis = m.startOnAxis;
                e.width = k - 1;
                e.height = l;
                e.gridCount = a.gridCount;
                e.gridColor = a.gridColor;
                e.gridAlpha = a.gridAlpha;
                e.color = a.color;
                e.tickLength = 0;
                e.axisAlpha = 0;
                e.autoGridCount = a.autoGridCount;
                e.parseDates && !e.equalSpacing && e.timeZoom(b.firstTime, b.lastTime);
                e.minimum = a.gridAxis.fullMin;
                e.maximum = a.gridAxis.fullMax;
                e.strictMinMax = !0;
                e.zoom(0, c.length - 1);
                if ((m = a.graph) && a.catScrollbar) {
                    var q = a.valueAxis, p = m.valueAxis;
                    q.id = p.id;
                    q.rotate = g;
                    q.setOrientation(g);
                    q.width = k;
                    q.height = l;
                    q.dataProvider = c;
                    q.reversed = p.reversed;
                    q.logarithmic = p.logarithmic;
                    q.gridAlpha = 0;
                    q.axisAlpha = 0;
                    n.push(q.set);
                    g ? (q.y = h, q.x = 0) : (q.x = f, q.y = 0);
                    var f = Infinity,
                        h = -Infinity, t;
                    for (t = 0; t < c.length; t++) {
                        var r = c[t].axes[p.id].graphs[m.id].values, w;
                        for (w in r) if (r.hasOwnProperty(w) && "percents" != w && "total" != w) {
                            var z = r[w];
                            z < f && (f = z);
                            z > h && (h = z)
                        }
                    }
                    Infinity != f && (q.minimum = f);
                    -Infinity != h && (q.maximum = h + .1 * (h - f));
                    f == h && (--q.minimum, q.maximum += 1);
                    void 0 !== a.minimum && (q.minimum = a.minimum);
                    void 0 !== a.maximum && (q.maximum = a.maximum);
                    q.zoom(0, c.length - 1);
                    w = a.unselectedGraph;
                    w.id = m.id;
                    w.bcn = "scrollbar-graph-";
                    w.rotate = g;
                    w.chart = b;
                    w.data = c;
                    w.valueAxis = q;
                    w.chart = m.chart;
                    w.categoryAxis =
                        a.categoryAxis;
                    w.periodSpan = m.periodSpan;
                    w.valueField = m.valueField;
                    w.openField = m.openField;
                    w.closeField = m.closeField;
                    w.highField = m.highField;
                    w.lowField = m.lowField;
                    w.lineAlpha = a.graphLineAlpha;
                    w.lineColorR = a.graphLineColor;
                    w.fillAlphas = a.graphFillAlpha;
                    w.fillColorsR = a.graphFillColor;
                    w.connect = m.connect;
                    w.hidden = m.hidden;
                    w.width = k;
                    w.height = l;
                    w.pointPosition = m.pointPosition;
                    w.stepDirection = m.stepDirection;
                    w.periodSpan = m.periodSpan;
                    p = a.selectedGraph;
                    p.id = m.id;
                    p.bcn = w.bcn + "selected-";
                    p.rotate = g;
                    p.chart =
                        b;
                    p.data = c;
                    p.valueAxis = q;
                    p.chart = m.chart;
                    p.categoryAxis = e;
                    p.periodSpan = m.periodSpan;
                    p.valueField = m.valueField;
                    p.openField = m.openField;
                    p.closeField = m.closeField;
                    p.highField = m.highField;
                    p.lowField = m.lowField;
                    p.lineAlpha = a.selectedGraphLineAlpha;
                    p.lineColorR = a.selectedGraphLineColor;
                    p.fillAlphas = a.selectedGraphFillAlpha;
                    p.fillColorsR = a.selectedGraphFillColor;
                    p.connect = m.connect;
                    p.hidden = m.hidden;
                    p.width = k;
                    p.height = l;
                    p.pointPosition = m.pointPosition;
                    p.stepDirection = m.stepDirection;
                    p.periodSpan = m.periodSpan;
                    b = a.graphType;
                    b || (b = m.type);
                    w.type = b;
                    p.type = b;
                    c = c.length - 1;
                    w.zoom(0, c);
                    p.zoom(0, c);
                    p.set.click(function () {
                        a.handleBackgroundClick()
                    }).mouseover(function () {
                        a.handleMouseOver()
                    }).mouseout(function () {
                        a.handleMouseOut()
                    });
                    w.set.click(function () {
                        a.handleBackgroundClick()
                    }).mouseover(function () {
                        a.handleMouseOver()
                    }).mouseout(function () {
                        a.handleMouseOut()
                    });
                    n.push(w.set);
                    n.push(p.set)
                }
                n.push(e.set);
                n.push(e.labelsSet);
                a.bg.toBack();
                a.invisibleBg.toFront();
                a.dragger.toFront();
                a.iconLeft.toFront();
                a.iconRight.toFront()
            }
        },
        timeZoom: function (a, b, c) {
            this.startTime = a;
            this.endTime = b;
            this.timeDifference = b - a;
            this.skipEvent = !d.toBoolean(c);
            this.zoomScrollbar();
            this.dispatchScrollbarEvent()
        }, zoom: function (a, b) {
            this.start = a;
            this.end = b;
            this.skipEvent = !0;
            this.zoomScrollbar()
        }, dispatchScrollbarEvent: function () {
            if (this.categoryAxis && "ValueAxis" == this.categoryAxis.cname) d.ChartScrollbar.base.dispatchScrollbarEvent.call(this); else if (this.skipEvent) this.skipEvent = !1; else {
                var a = this.chart.chartData, b, c, e = this.dragger.getBBox();
                b = e.x;
                var g = e.y, f = e.width, e = e.height, h = this.chart;
                this.rotate ? (b = g, c = e) : c = f;
                f = {type: "zoomed", target: this};
                f.chart = h;
                var k = this.categoryAxis, l = this.stepWidth, g = h.minSelectedTime, e = h.maxSelectedTime, m = !1;
                if (k.parseDates && !k.equalSpacing) {
                    if (a = h.lastTime, h = h.firstTime, k = Math.round(b / l) + h, b = this.dragging ? k + this.timeDifference : Math.round((b + c) / l) + h, k > b && (k = b), 0 < g && b - k < g && (b = Math.round(k + (b - k) / 2), m = Math.round(g / 2), k = b - m, b += m, m = !0), 0 < e && b - k > e && (b = Math.round(k + (b - k) / 2), m = Math.round(e / 2), k = b - m, b += m, m = !0), b > a && (b =
                        a), b - g < k && (k = b - g), k < h && (k = h), k + g > b && (b = k + g), k != this.startTime || b != this.endTime) this.startTime = k, this.endTime = b, f.start = k, f.end = b, f.startDate = new Date(k), f.endDate = new Date(b), this.fire(f)
                } else {
                    k.startOnAxis || (b += l / 2);
                    c -= this.stepWidth / 2;
                    g = k.xToIndex(b);
                    b = k.getCoordinate(g) - this.stepWidth / 2;
                    b = k.xToIndex(b + c);
                    if (g != this.start || this.end != b) k.startOnAxis && (this.resizingRight && g == b && b++, this.resizingLeft && g == b && (0 < g ? g-- : b = 1)), this.start = g, this.end = this.dragging ? this.start + this.difference : b, f.start = this.start,
                        f.end = this.end, k.parseDates && (a[this.start] && (f.startDate = new Date(a[this.start].time)), a[this.end] && (f.endDate = new Date(a[this.end].time))), this.fire(f);
                    this.percentStart = g;
                    this.percentEnd = b
                }
                m && this.zoomScrollbar(!0)
            }
        }, zoomScrollbar: function (a) {
            if ((!(this.dragging || this.resizingLeft || this.resizingRight || this.animating) || a) && this.dragger && this.enabled) {
                var b, c, d = this.chart;
                a = d.chartData;
                var g = this.categoryAxis;
                g.parseDates && !g.equalSpacing ? (a = g.stepWidth, c = d.firstTime, b = a * (this.startTime - c), c = a * (this.endTime -
                    c)) : (a[this.start] && (b = a[this.start].x[g.id]), a[this.end] && (c = a[this.end].x[g.id]), a = g.stepWidth, g.startOnAxis || (d = a / 2, b -= d, c += d));
                this.stepWidth = a;
                isNaN(b) || isNaN(c) || this.updateScrollbarSize(b, c)
            }
        }, maskGraphs: function (a, b, c, d) {
            var g = this.selectedGraph;
            g && g.set.clipRect(a, b, c, d)
        }, handleDragStart: function () {
            d.ChartScrollbar.base.handleDragStart.call(this);
            this.difference = this.end - this.start;
            this.timeDifference = this.endTime - this.startTime;
            0 > this.timeDifference && (this.timeDifference = 0)
        }, handleBackgroundClick: function () {
            d.ChartScrollbar.base.handleBackgroundClick.call(this);
            this.dragging || (this.difference = this.end - this.start, this.timeDifference = this.endTime - this.startTime, 0 > this.timeDifference && (this.timeDifference = 0))
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.AmBalloon = d.Class({
        construct: function (a) {
            this.cname = "AmBalloon";
            this.enabled = !0;
            this.fillColor = "#FFFFFF";
            this.fillAlpha = .8;
            this.borderThickness = 2;
            this.borderColor = "#FFFFFF";
            this.borderAlpha = 1;
            this.cornerRadius = 0;
            this.maxWidth = 220;
            this.horizontalPadding = 8;
            this.verticalPadding = 4;
            this.pointerWidth = 6;
            this.pointerOrientation = "V";
            this.color = "#000000";
            this.adjustBorderColor = !0;
            this.show = this.follow = this.showBullet = !1;
            this.bulletSize = 3;
            this.shadowAlpha = .4;
            this.shadowColor =
                "#000000";
            this.fadeOutDuration = this.animationDuration = .3;
            this.fixedPosition = !0;
            this.offsetY = 6;
            this.offsetX = 1;
            this.textAlign = "center";
            this.disableMouseEvents = !0;
            this.deltaSignX = this.deltaSignY = 1;
            d.isModern || (this.offsetY *= 1.5);
            this.sdy = this.sdx = 0;
            d.applyTheme(this, a, this.cname)
        }, draw: function () {
            var a = this.pointToX, b = this.pointToY;
            d.isModern || (this.drop = !1);
            var c = this.chart;
            d.VML && (this.fadeOutDuration = 0);
            this.xAnim && c.stopAnim(this.xAnim);
            this.yAnim && c.stopAnim(this.yAnim);
            this.sdy = this.sdx = 0;
            if (!isNaN(a)) {
                var e =
                    this.follow, g = c.container, f = this.set;
                d.remove(f);
                this.removeDiv();
                f = g.set();
                f.node.style.pointerEvents = "none";
                this.set = f;
                this.mainSet ? (this.mainSet.push(this.set), this.sdx = this.mainSet.x, this.sdy = this.mainSet.y) : c.balloonsSet.push(f);
                if (this.show) {
                    var h = this.l, k = this.t, l = this.r, m = this.b, n = this.balloonColor, q = this.fillColor,
                        p = this.borderColor, t = q;
                    void 0 != n && (this.adjustBorderColor ? t = p = n : q = n);
                    var r = this.horizontalPadding, w = this.verticalPadding, z = this.pointerWidth,
                        x = this.pointerOrientation, u = this.cornerRadius,
                        A = c.fontFamily, y = this.fontSize;
                    void 0 == y && (y = c.fontSize);
                    var n = document.createElement("div"), B = c.classNamePrefix;
                    n.className = B + "-balloon-div";
                    this.className && (n.className = n.className + " " + B + "-balloon-div-" + this.className);
                    B = n.style;
                    this.disableMouseEvents && (B.pointerEvents = "none");
                    B.position = "absolute";
                    var D = this.minWidth, C = document.createElement("div");
                    n.appendChild(C);
                    var I = C.style;
                    isNaN(D) || (I.minWidth = D - 2 * r + "px");
                    I.textAlign = this.textAlign;
                    I.maxWidth = this.maxWidth + "px";
                    I.fontSize = y + "px";
                    I.color =
                        this.color;
                    I.fontFamily = A;
                    C.innerHTML = this.text;
                    c.chartDiv.appendChild(n);
                    this.textDiv = n;
                    var I = n.offsetWidth, H = n.offsetHeight;
                    n.clientHeight && (I = n.clientWidth, H = n.clientHeight);
                    A = H + 2 * w;
                    C = I + 2 * r;
                    !isNaN(D) && C < D && (C = D);
                    window.opera && (A += 2);
                    var Q = !1, y = this.offsetY;
                    c.handDrawn && (y += c.handDrawScatter + 2);
                    "H" != x ? (D = a - C / 2, b < k + A + 10 && "down" != x ? (Q = !0, e && (b += y), y = b + z, this.deltaSignY = -1) : (e && (b -= y), y = b - A - z, this.deltaSignY = 1)) : (2 * z > A && (z = A / 2), y = b - A / 2, a < h + (l - h) / 2 ? (D = a + z, this.deltaSignX = -1) : (D = a - C - z, this.deltaSignX =
                        1));
                    y + A >= m && (y = m - A);
                    y < k && (y = k);
                    D < h && (D = h);
                    D + C > l && (D = l - C);
                    var k = y + w, m = D + r, M = this.shadowAlpha, P = this.shadowColor, r = this.borderThickness,
                        ia = this.bulletSize, J, w = this.fillAlpha, aa = this.borderAlpha;
                    this.showBullet && (J = d.circle(g, ia, t, w), f.push(J));
                    this.drop ? (h = C / 1.6, l = 0, "V" == x && (x = "down"), "H" == x && (x = "left"), "down" == x && (D = a + 1, y = b - h - h / 3), "up" == x && (l = 180, D = a + 1, y = b + h + h / 3), "left" == x && (l = 270, D = a + h + h / 3 + 2, y = b), "right" == x && (l = 90, D = a - h - h / 3 + 2, y = b), k = y - H / 2 + 1, m = D - I / 2 - 1, q = d.drop(g, h, l, q, w, r, p, aa)) : 0 < u || 0 === z ? (0 < M && (a =
                        d.rect(g, C, A, q, 0, r + 1, P, M, u), d.isModern ? a.translate(1, 1) : a.translate(4, 4), f.push(a)), q = d.rect(g, C, A, q, w, r, p, aa, u)) : (t = [], u = [], "H" != x ? (h = a - D, h > C - z && (h = C - z), h < z && (h = z), t = [0, h - z, a - D, h + z, C, C, 0, 0], u = Q ? [0, 0, b - y, 0, 0, A, A, 0] : [A, A, b - y, A, A, 0, 0, A]) : (x = b - y, x > A - z && (x = A - z), x < z && (x = z), u = [0, x - z, b - y, x + z, A, A, 0, 0], t = a < h + (l - h) / 2 ? [0, 0, D < a ? 0 : a - D, 0, 0, C, C, 0] : [C, C, D + C > a ? C : a - D, C, C, 0, 0, C]), 0 < M && (a = d.polygon(g, t, u, q, 0, r, P, M), a.translate(1, 1), f.push(a)), q = d.polygon(g, t, u, q, w, r, p, aa));
                    this.bg = q;
                    f.push(q);
                    q.toFront();
                    d.setCN(c, q,
                        "balloon-bg");
                    this.className && d.setCN(c, q, "balloon-bg-" + this.className);
                    g = 1 * this.deltaSignX;
                    m += this.sdx;
                    k += this.sdy;
                    B.left = m + "px";
                    B.top = k + "px";
                    f.translate(D - g, y, 1, !0);
                    q = q.getBBox();
                    this.bottom = y + A + 1;
                    this.yPos = q.y + y;
                    J && J.translate(this.pointToX - D + g, b - y);
                    b = this.animationDuration;
                    0 < this.animationDuration && !e && !isNaN(this.prevX) && (f.translate(this.prevX, this.prevY, NaN, !0), f.animate({translate: D - g + "," + y}, b, "easeOutSine"), n && (B.left = this.prevTX + "px", B.top = this.prevTY + "px", this.xAnim = c.animate({node: n},
                        "left", this.prevTX, m, b, "easeOutSine", "px"), this.yAnim = c.animate({node: n}, "top", this.prevTY, k, b, "easeOutSine", "px")));
                    this.prevX = D - g;
                    this.prevY = y;
                    this.prevTX = m;
                    this.prevTY = k
                }
            }
        }, fixPrevious: function () {
            this.rPrevX = this.prevX;
            this.rPrevY = this.prevY;
            this.rPrevTX = this.prevTX;
            this.rPrevTY = this.prevTY
        }, restorePrevious: function () {
            this.prevX = this.rPrevX;
            this.prevY = this.rPrevY;
            this.prevTX = this.rPrevTX;
            this.prevTY = this.rPrevTY
        }, followMouse: function () {
            if (this.follow && this.show) {
                var a = this.chart.mouseX - this.offsetX *
                    this.deltaSignX - this.sdx, b = this.chart.mouseY - this.sdy;
                this.pointToX = a;
                this.pointToY = b;
                if (a != this.previousX || b != this.previousY) if (this.previousX = a, this.previousY = b, 0 === this.cornerRadius) this.draw(); else {
                    var c = this.set;
                    if (c) {
                        var d = c.getBBox(), a = a - d.width / 2, g = b - d.height - 10;
                        a < this.l && (a = this.l);
                        a > this.r - d.width && (a = this.r - d.width);
                        g < this.t && (g = b + 10);
                        c.translate(a, g);
                        b = this.textDiv.style;
                        b.left = a + this.horizontalPadding + "px";
                        b.top = g + this.verticalPadding + "px"
                    }
                }
            }
        }, changeColor: function (a) {
            this.balloonColor =
                a
        }, setBounds: function (a, b, c, d) {
            this.l = a;
            this.t = b;
            this.r = c;
            this.b = d;
            this.destroyTO && clearTimeout(this.destroyTO)
        }, showBalloon: function (a) {
            if (this.text != a || this.positionChanged) this.text = a, this.isHiding = !1, this.show = !0, this.destroyTO && clearTimeout(this.destroyTO), a = this.chart, this.fadeAnim1 && a.stopAnim(this.fadeAnim1), this.fadeAnim2 && a.stopAnim(this.fadeAnim2), this.draw(), this.positionChanged = !1
        }, hide: function (a) {
            var b = this;
            b.text = void 0;
            isNaN(a) && (a = b.fadeOutDuration);
            var c = b.chart;
            if (0 < a && !b.isHiding) {
                b.isHiding =
                    !0;
                b.destroyTO && clearTimeout(b.destroyTO);
                b.destroyTO = setTimeout(function () {
                    b.destroy.call(b)
                }, 1E3 * a);
                b.follow = !1;
                b.show = !1;
                var d = b.set;
                d && (d.setAttr("opacity", b.fillAlpha), b.fadeAnim1 = d.animate({opacity: 0}, a, "easeInSine"));
                b.textDiv && (b.fadeAnim2 = c.animate({node: b.textDiv}, "opacity", 1, 0, a, "easeInSine", ""))
            } else b.show = !1, b.follow = !1, b.destroy()
        }, setPosition: function (a, b) {
            if (a != this.pointToX || b != this.pointToY) this.previousX = this.pointToX, this.previousY = this.pointToY, this.pointToX = a, this.pointToY =
                b, this.positionChanged = !0
        }, followCursor: function (a) {
            var b = this;
            b.follow = a;
            clearInterval(b.interval);
            var c = b.chart.mouseX - b.sdx, d = b.chart.mouseY - b.sdy;
            !isNaN(c) && a && (b.pointToX = c - b.offsetX * b.deltaSignX, b.pointToY = d, b.followMouse(), b.interval = setInterval(function () {
                b.followMouse.call(b)
            }, 40))
        }, removeDiv: function () {
            if (this.textDiv) {
                var a = this.textDiv.parentNode;
                a && a.removeChild(this.textDiv)
            }
        }, destroy: function () {
            clearInterval(this.interval);
            d.remove(this.set);
            this.removeDiv();
            this.set = null
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.AmCoordinateChart = d.Class({
        inherits: d.AmChart, construct: function (a) {
            d.AmCoordinateChart.base.construct.call(this, a);
            this.theme = a;
            this.createEvents("rollOverGraphItem", "rollOutGraphItem", "clickGraphItem", "doubleClickGraphItem", "rightClickGraphItem", "clickGraph", "rollOverGraph", "rollOutGraph");
            this.startAlpha = 1;
            this.startDuration = 0;
            this.startEffect = "elastic";
            this.sequencedAnimation = !0;
            this.colors = "#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");
            this.balloonDateFormat = "MMM DD, YYYY";
            this.valueAxes = [];
            this.graphs = [];
            this.guides = [];
            this.gridAboveGraphs = !1;
            d.applyTheme(this, a, "AmCoordinateChart")
        }, initChart: function () {
            d.AmCoordinateChart.base.initChart.call(this);
            this.drawGraphs = !0;
            var a = this.categoryAxis;
            a && (this.categoryAxis = d.processObject(a, d.CategoryAxis, this.theme));
            this.processValueAxes();
            this.createValueAxes();
            this.processGraphs();
            this.processGuides();
            d.VML && (this.startAlpha = 1);
            this.setLegendData(this.graphs);
            this.gridAboveGraphs && (this.gridSet.toFront(),
                this.bulletSet.toFront(), this.balloonsSet.toFront())
        }, createValueAxes: function () {
            if (0 === this.valueAxes.length) {
                var a = new d.ValueAxis;
                this.addValueAxis(a)
            }
        }, parseData: function () {
            this.processValueAxes();
            this.processGraphs()
        }, parseSerialData: function (a) {
            this.chartData = [];
            if (a) if (0 < this.processTimeout) {
                1 > this.processCount && (this.processCount = 1);
                var b = a.length / this.processCount;
                this.parseCount = Math.ceil(b) - 1;
                for (var c = 0; c < b; c++) this.delayParseSerialData(a, c)
            } else this.parseCount = 0, this.parsePartSerialData(a,
                0, a.length, 0); else this.onDataUpdated()
        }, delayParseSerialData: function (a, b) {
            var c = this, d = c.processCount;
            setTimeout(function () {
                c.parsePartSerialData.call(c, a, b * d, (b + 1) * d, b)
            }, c.processTimeout)
        }, parsePartSerialData: function (a, b, c, e) {
            c > a.length && (c = a.length);
            var g = this.graphs, f = {}, h = this.seriesIdField;
            h || (h = this.categoryField);
            var k = !1, l, m = this.categoryAxis, n, q, p;
            m && (k = m.parseDates, n = m.forceShowField, p = m.classNameField, q = m.labelColorField, l = m.categoryFunction);
            var t, r, w = {}, z;
            k && (t = d.extractPeriod(m.minPeriod),
                r = t.period, t = t.count, z = d.getPeriodDuration(r, t));
            var x = {};
            this.lookupTable = x;
            var u, A = this.dataDateFormat, y = {};
            for (u = b; u < c; u++) {
                var B = {}, D = a[u];
                b = D[this.categoryField];
                B.dataContext = D;
                B.category = l ? l(b, D, m) : String(b);
                n && (B.forceShow = D[n]);
                p && (B.className = D[p]);
                q && (B.labelColor = D[q]);
                x[D[h]] = B;
                if (k && (m.categoryFunction ? b = m.categoryFunction(b, D, m) : (!A || b instanceof Date || (b = b.toString() + " |"), b = d.getDate(b, A, m.minPeriod)), b = d.resetDateToMin(b, r, t, m.firstDayOfWeek), B.category = b, B.time = b.getTime(), isNaN(B.time))) continue;
                var C = this.valueAxes;
                B.axes = {};
                B.x = {};
                var I;
                for (I = 0; I < C.length; I++) {
                    var H = C[I].id;
                    B.axes[H] = {};
                    B.axes[H].graphs = {};
                    var Q;
                    for (Q = 0; Q < g.length; Q++) {
                        b = g[Q];
                        var M = b.id, P = 1.1;
                        isNaN(b.gapPeriod) || (P = b.gapPeriod);
                        var ia = b.periodValue;
                        if (b.valueAxis.id == H) {
                            B.axes[H].graphs[M] = {};
                            var J = {};
                            J.index = u;
                            var aa = D;
                            b.dataProvider && (aa = f);
                            J.values = this.processValues(aa, b, ia);
                            if (!b.connect || b.forceGap && !isNaN(b.gapPeriod)) if (y && y[M] && 0 < P && B.time - w[M] >= z * P && (y[M].gap = !0), b.forceGap) {
                                var P = 0, ma;
                                for (ma in J.values) P++;
                                0 < P && (w[M] = B.time, y[M] = J)
                            } else w[M] = B.time, y[M] = J;
                            this.processFields(b, J, aa);
                            J.category = B.category;
                            J.serialDataItem = B;
                            J.graph = b;
                            B.axes[H].graphs[M] = J
                        }
                    }
                }
                this.chartData[u] = B
            }
            if (this.parseCount == e) {
                for (a = 0; a < g.length; a++) b = g[a], b.dataProvider && this.parseGraphData(b);
                this.dataChanged = !1;
                this.dispatchDataUpdated = !0;
                this.onDataUpdated()
            }
        }, processValues: function (a, b, c) {
            var e = {}, g, f = !1;
            "candlestick" != b.type && "ohlc" != b.type || "" === c || (f = !0);
            for (var h = "value error open close low high".split(" "), k = 0; k < h.length; k++) {
                var l =
                    h[k];
                "value" != l && "error" != l && f && (c = l.charAt(0).toUpperCase() + l.slice(1));
                var m = a[b[l + "Field"] + c];
                null !== m && (g = Number(m), isNaN(g) || (e[l] = g), "date" == b.valueAxis.type && void 0 !== m && (g = d.getDate(m, b.chart.dataDateFormat), e[l] = g.getTime()))
            }
            return e
        }, parseGraphData: function (a) {
            var b = a.dataProvider, c = a.seriesIdField;
            c || (c = this.seriesIdField);
            c || (c = this.categoryField);
            var d;
            for (d = 0; d < b.length; d++) {
                var g = b[d], f = this.lookupTable[String(g[c])], h = a.valueAxis.id;
                f && (h = f.axes[h].graphs[a.id], h.serialDataItem = f,
                    h.values = this.processValues(g, a, a.periodValue), this.processFields(a, h, g))
            }
        }, addValueAxis: function (a) {
            a.chart = this;
            this.valueAxes.push(a);
            this.validateData()
        }, removeValueAxesAndGraphs: function () {
            var a = this.valueAxes, b;
            for (b = a.length - 1; -1 < b; b--) this.removeValueAxis(a[b])
        }, removeValueAxis: function (a) {
            var b = this.graphs, c;
            for (c = b.length - 1; 0 <= c; c--) {
                var d = b[c];
                d && d.valueAxis == a && this.removeGraph(d)
            }
            b = this.valueAxes;
            for (c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1);
            this.validateData()
        }, addGraph: function (a) {
            this.graphs.push(a);
            this.chooseGraphColor(a, this.graphs.length - 1);
            this.validateData()
        }, removeGraph: function (a) {
            var b = this.graphs, c;
            for (c = b.length - 1; 0 <= c; c--) b[c] == a && (b.splice(c, 1), a.destroy());
            this.validateData()
        }, handleValueAxisZoom: function () {
        }, processValueAxes: function () {
            var a = this.valueAxes, b;
            for (b = 0; b < a.length; b++) {
                var c = a[b], c = d.processObject(c, d.ValueAxis, this.theme);
                a[b] = c;
                c.chart = this;
                c.init();
                this.listenTo(c, "axisIntZoomed", this.handleValueAxisZoom);
                c.id || (c.id = "valueAxisAuto" + b + "_" + (new Date).getTime());
                void 0 === c.usePrefixes && (c.usePrefixes = this.usePrefixes)
            }
        }, processGuides: function () {
            var a = this.guides, b = this.categoryAxis;
            if (a) for (var c = 0; c < a.length; c++) {
                var e = a[c];
                (void 0 !== e.category || void 0 !== e.date) && b && b.addGuide(e);
                e.id || (e.id = "guideAuto" + c + "_" + (new Date).getTime());
                var g = e.valueAxis;
                g ? (d.isString(g) && (g = this.getValueAxisById(g)), g ? g.addGuide(e) : this.valueAxes[0].addGuide(e)) : isNaN(e.value) || this.valueAxes[0].addGuide(e)
            }
        }, processGraphs: function () {
            var a = this.graphs, b;
            this.graphsById = {};
            for (b =
                     0; b < a.length; b++) {
                var c = a[b], c = d.processObject(c, d.AmGraph, this.theme);
                a[b] = c;
                this.chooseGraphColor(c, b);
                c.chart = this;
                c.init();
                d.isString(c.valueAxis) && (c.valueAxis = this.getValueAxisById(c.valueAxis));
                c.valueAxis || (c.valueAxis = this.valueAxes[0]);
                c.id || (c.id = "graphAuto" + b + "_" + (new Date).getTime());
                this.graphsById[c.id] = c
            }
        }, formatString: function (a, b, c) {
            var e = b.graph, g = e.valueAxis;
            if (g.duration && g.maxInterval && b.values.value) {
                var f = g.numberFormatter;
                f || (f = chart.nf);
                g = d.formatDuration(b.values.value,
                    g.duration, "", g.durationUnits, g.maxInterval, f);
                a = a.split("[[value]]").join(g)
            }
            a = d.massReplace(a, {"[[title]]": e.title, "[[description]]": b.description});
            a = c ? d.fixNewLines(a) : d.fixBrakes(a);
            return a = d.cleanFromEmpty(a)
        }, getBalloonColor: function (a, b, c) {
            var e = a.lineColor, g = a.balloonColor;
            c && (g = e);
            c = a.fillColorsR;
            "object" == typeof c ? e = c[0] : void 0 !== c && (e = c);
            b.isNegative && (c = a.negativeLineColor, a = a.negativeFillColors, "object" == typeof a ? c = a[0] : void 0 !== a && (c = a), void 0 !== c && (e = c));
            void 0 !== b.color && (e = b.color);
            void 0 !== b.lineColor && (e = b.lineColor);
            b = b.fillColors;
            void 0 !== b && (e = b, d.ifArray(b) && (e = b[0]));
            void 0 === g && (g = e);
            return g
        }, getGraphById: function (a) {
            return d.getObjById(this.graphs, a)
        }, getValueAxisById: function (a) {
            return d.getObjById(this.valueAxes, a)
        }, processFields: function (a, b, c) {
            if (a.itemColors) {
                var e = a.itemColors, g = b.index;
                b.color = g < e.length ? e[g] : d.randomColor()
            }
            e = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className columnIndex".split(" ");
            for (g = 0; g < e.length; g++) {
                var f = e[g], h = a[f + "Field"];
                h && (h = c[h], d.isDefined(h) && (b[f] = h))
            }
            b.dataContext = c
        }, chooseGraphColor: function (a, b) {
            if (a.lineColor) a.lineColorR = a.lineColor; else {
                var c;
                c = this.colors.length > b ? this.colors[b] : a.lineColorR ? a.lineColorR : d.randomColor();
                a.lineColorR = c
            }
            a.fillColorsR = a.fillColors ? a.fillColors : a.lineColorR;
            a.bulletBorderColorR = a.bulletBorderColor ? a.bulletBorderColor : a.useLineColorForBulletBorder ? a.lineColorR : a.bulletColor;
            a.bulletColorR = a.bulletColor ? a.bulletColor : a.lineColorR;
            if (c = this.patterns) a.pattern = c[b]
        }, handleLegendEvent: function (a) {
            var b = a.type;
            if (a = a.dataItem) {
                var c = a.hidden, d = a.showBalloon;
                switch (b) {
                    case "clickMarker":
                        this.textClickEnabled && (d ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a));
                        break;
                    case "clickLabel":
                        d ? this.hideGraphsBalloon(a) : this.showGraphsBalloon(a);
                        break;
                    case "rollOverItem":
                        c || this.highlightGraph(a);
                        break;
                    case "rollOutItem":
                        c || this.unhighlightGraph();
                        break;
                    case "hideItem":
                        this.hideGraph(a);
                        break;
                    case "showItem":
                        this.showGraph(a)
                }
            }
        }, highlightGraph: function (a) {
            var b =
                this.graphs;
            if (b) {
                var c, d = .2;
                this.legend && (d = this.legend.rollOverGraphAlpha);
                if (1 != d) for (c = 0; c < b.length; c++) {
                    var g = b[c];
                    g != a && g.changeOpacity(d)
                }
            }
        }, unhighlightGraph: function () {
            var a;
            this.legend && (a = this.legend.rollOverGraphAlpha);
            if (1 != a) {
                a = this.graphs;
                var b;
                for (b = 0; b < a.length; b++) a[b].changeOpacity(1)
            }
        }, showGraph: function (a) {
            a.switchable && (a.hidden = !1, this.dataChanged = !0, "xy" != this.type && (this.marginsUpdated = !1), this.chartCreated && this.initChart())
        }, hideGraph: function (a) {
            a.switchable && (this.dataChanged =
                !0, "xy" != this.type && (this.marginsUpdated = !1), a.hidden = !0, this.chartCreated && this.initChart())
        }, hideGraphsBalloon: function (a) {
            a.showBalloon = !1;
            this.updateLegend()
        }, showGraphsBalloon: function (a) {
            a.showBalloon = !0;
            this.updateLegend()
        }, updateLegend: function () {
            this.legend && this.legend.invalidateSize()
        }, resetAnimation: function () {
            this.animatable = [];
            var a = this.graphs;
            if (a) {
                var b;
                for (b = 0; b < a.length; b++) a[b].animationPlayed = !1
            }
        }, animateAgain: function () {
            this.resetAnimation();
            this.validateNow()
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.TrendLine = d.Class({
        construct: function (a) {
            this.cname = "TrendLine";
            this.createEvents("click", "rollOver", "rollOut");
            this.isProtected = !1;
            this.dashLength = 0;
            this.lineColor = "#00CC00";
            this.lineThickness = this.lineAlpha = 1;
            d.applyTheme(this, a, this.cname)
        }, draw: function () {
            var a = this;
            a.destroy();
            var b = a.chart, c = b.container, e, g, f, h, k = a.categoryAxis, l = a.initialDate, m = a.initialCategory,
                n = a.finalDate, q = a.finalCategory, p = a.valueAxis, t = a.valueAxisX, r = a.initialXValue,
                w = a.finalXValue,
                z = a.initialValue, x = a.finalValue, u = p.recalculateToPercents, A = b.dataDateFormat;
            k && (l && (l = d.getDate(l, A, "fff"), a.initialDate = l, e = k.dateToCoordinate(l)), m && (e = k.categoryToCoordinate(m)), n && (n = d.getDate(n, A, "fff"), a.finalDate = n, g = k.dateToCoordinate(n)), q && (g = k.categoryToCoordinate(q)));
            t && !u && (isNaN(r) || (e = t.getCoordinate(r)), isNaN(w) || (g = t.getCoordinate(w)));
            p && !u && (isNaN(z) || (f = p.getCoordinate(z)), isNaN(x) || (h = p.getCoordinate(x)));
            if (!(isNaN(e) || isNaN(g) || isNaN(f) || isNaN(f))) {
                b.rotate ? (k = [f, h], h = [e,
                    g]) : (k = [e, g], h = [f, h]);
                f = d.line(c, k, h, a.lineColor, a.lineAlpha, a.lineThickness, a.dashLength);
                e = k;
                g = h;
                n = k[1] - k[0];
                q = h[1] - h[0];
                0 === n && (n = .01);
                0 === q && (q = .01);
                l = n / Math.abs(n);
                m = q / Math.abs(q);
                q = 90 * Math.PI / 180 - Math.asin(n / (n * q / Math.abs(n * q) * Math.sqrt(Math.pow(n, 2) + Math.pow(q, 2))));
                n = Math.abs(5 * Math.cos(q));
                q = Math.abs(5 * Math.sin(q));
                e.push(k[1] - l * q, k[0] - l * q);
                g.push(h[1] + m * n, h[0] + m * n);
                h = d.polygon(c, e, g, "#ffffff", .005, 0);
                c = c.set([h, f]);
                c.translate(b.marginLeftReal, b.marginTopReal);
                b.trendLinesSet.push(c);
                d.setCN(b,
                    f, "trend-line");
                d.setCN(b, f, "trend-line-" + a.id);
                a.line = f;
                a.set = c;
                if (f = a.initialImage) f = d.processObject(f, d.Image, a.theme), f.chart = b, f.draw(), f.translate(e[0] + f.offsetX, g[0] + f.offsetY), c.push(f.set);
                if (f = a.finalImage) f = d.processObject(f, d.Image, a.theme), f.chart = b, f.draw(), f.translate(e[1] + f.offsetX, g[1] + f.offsetY), c.push(f.set);
                c.mouseup(function () {
                    a.handleLineClick()
                }).mouseover(function () {
                    a.handleLineOver()
                }).mouseout(function () {
                    a.handleLineOut()
                });
                c.touchend && c.touchend(function () {
                    a.handleLineClick()
                });
                c.clipRect(0, 0, b.plotAreaWidth, b.plotAreaHeight)
            }
        }, handleLineClick: function () {
            this.fire({type: "click", trendLine: this, chart: this.chart})
        }, handleLineOver: function () {
            var a = this.rollOverColor;
            void 0 !== a && this.line.attr({stroke: a});
            this.balloonText && (clearTimeout(this.chart.hoverInt), a = this.line.getBBox(), this.chart.showBalloon(this.balloonText, this.lineColor, !0, this.x + a.x + a.width / 2, this.y + a.y + a.height / 2));
            this.fire({type: "rollOver", trendLine: this, chart: this.chart})
        }, handleLineOut: function () {
            this.line.attr({stroke: this.lineColor});
            this.balloonText && this.chart.hideBalloon();
            this.fire({type: "rollOut", trendLine: this, chart: this.chart})
        }, destroy: function () {
            d.remove(this.set)
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.Image = d.Class({
        construct: function (a) {
            this.cname = "Image";
            this.height = this.width = 20;
            this.rotation = this.offsetY = this.offsetX = 0;
            this.balloonColor = this.color = "#000000";
            this.opacity = 1;
            d.applyTheme(this, a, this.cname)
        }, draw: function () {
            var a = this;
            a.set && a.set.remove();
            var b = a.chart.container;
            a.set = b.set();
            var c, d;
            a.url ? (c = b.image(a.url, 0, 0, a.width, a.height), d = 1) : a.svgPath && (c = b.path(a.svgPath), c.setAttr("fill", a.color), c.setAttr("stroke", a.outlineColor), b = c.getBBox(), d =
                Math.min(a.width / b.width, a.height / b.height));
            c && (c.setAttr("opacity", a.opacity), a.set.rotate(a.rotation), c.translate(-a.width / 2, -a.height / 2, d), a.balloonText && c.mouseover(function () {
                a.chart.showBalloon(a.balloonText, a.balloonColor, !0)
            }).mouseout(function () {
                a.chart.hideBalloon()
            }).touchend(function () {
                a.chart.hideBalloon()
            }).touchstart(function () {
                a.chart.showBalloon(a.balloonText, a.balloonColor, !0)
            }), a.set.push(c))
        }, translate: function (a, b) {
            this.set && this.set.translate(a, b)
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.circle = function (a, b, c, e, g, f, h, k, l) {
        0 >= b && (b = .001);
        if (void 0 == g || 0 === g) g = .01;
        void 0 === f && (f = "#000000");
        void 0 === h && (h = 0);
        e = {fill: c, stroke: f, "fill-opacity": e, "stroke-width": g, "stroke-opacity": h};
        a = isNaN(l) ? a.circle(0, 0, b).attr(e) : a.ellipse(0, 0, b, l).attr(e);
        k && a.gradient("radialGradient", [c, d.adjustLuminosity(c, -.6)]);
        return a
    };
    d.text = function (a, b, c, e, g, f, h, k) {
        f || (f = "middle");
        "right" == f && (f = "end");
        "left" == f && (f = "start");
        isNaN(k) && (k = 1);
        void 0 !== b && (b = String(b), d.isIE &&
        !d.isModern && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;")));
        c = {fill: c, "font-family": e, "font-size": g + "px", opacity: k};
        !0 === h && (c["font-weight"] = "bold");
        c["text-anchor"] = f;
        return a.text(b, c)
    };
    d.polygon = function (a, b, c, e, g, f, h, k, l, m, n) {
        isNaN(f) && (f = .01);
        isNaN(k) && (k = g);
        var q = e, p = !1;
        "object" == typeof q && 1 < q.length && (p = !0, q = q[0]);
        void 0 === h && (h = q);
        g = {fill: q, stroke: h, "fill-opacity": g, "stroke-width": f, "stroke-opacity": k};
        void 0 !== n && 0 < n && (g["stroke-dasharray"] = n);
        n = d.dx;
        f = d.dy;
        a.handDrawn && (c = d.makeHD(b,
            c, a.handDrawScatter), b = c[0], c = c[1]);
        h = Math.round;
        m && (h = Number);
        k = "M" + (h(b[0]) + n) + "," + (h(c[0]) + f);
        for (q = 1; q < b.length; q++) m && (b[q] = d.roundTo(b[q], 5), c[q] = d.roundTo(c[q], 5)), k += " L" + (h(b[q]) + n) + "," + (h(c[q]) + f);
        a = a.path(k + " Z").attr(g);
        p && a.gradient("linearGradient", e, l);
        return a
    };
    d.rect = function (a, b, c, e, g, f, h, k, l, m, n) {
        if (isNaN(b) || isNaN(c)) return a.set();
        isNaN(f) && (f = 0);
        void 0 === l && (l = 0);
        void 0 === m && (m = 270);
        isNaN(g) && (g = 0);
        var q = e, p = !1;
        "object" == typeof q && (q = q[0], p = !0);
        void 0 === h && (h = q);
        void 0 === k &&
        (k = g);
        b = Math.round(b);
        c = Math.round(c);
        var t = 0, r = 0;
        0 > b && (b = Math.abs(b), t = -b);
        0 > c && (c = Math.abs(c), r = -c);
        t += d.dx;
        r += d.dy;
        g = {fill: q, stroke: h, "fill-opacity": g, "stroke-opacity": k};
        void 0 !== n && 0 < n && (g["stroke-dasharray"] = n);
        a = a.rect(t, r, b, c, l, f).attr(g);
        p && a.gradient("linearGradient", e, m);
        return a
    };
    d.bullet = function (a, b, c, e, g, f, h, k, l, m, n, q, p) {
        var t;
        "circle" == b && (b = "round");
        switch (b) {
            case "round":
                t = d.circle(a, c / 2, e, g, f, h, k);
                break;
            case "square":
                t = d.polygon(a, [-c / 2, c / 2, c / 2, -c / 2], [c / 2, c / 2, -c / 2, -c / 2], e, g, f, h,
                    k, m - 180, void 0, p);
                break;
            case "rectangle":
                t = d.polygon(a, [-c, c, c, -c], [c / 2, c / 2, -c / 2, -c / 2], e, g, f, h, k, m - 180, void 0, p);
                break;
            case "diamond":
                t = d.polygon(a, [-c / 2, 0, c / 2, 0], [0, -c / 2, 0, c / 2], e, g, f, h, k);
                break;
            case "triangleUp":
                t = d.triangle(a, c, 0, e, g, f, h, k);
                break;
            case "triangleDown":
                t = d.triangle(a, c, 180, e, g, f, h, k);
                break;
            case "triangleLeft":
                t = d.triangle(a, c, 270, e, g, f, h, k);
                break;
            case "triangleRight":
                t = d.triangle(a, c, 90, e, g, f, h, k);
                break;
            case "bubble":
                t = d.circle(a, c / 2, e, g, f, h, k, !0);
                break;
            case "line":
                t = d.line(a, [-c /
                2, c / 2], [0, 0], e, g, f, h, k);
                break;
            case "yError":
                t = a.set();
                t.push(d.line(a, [0, 0], [-c / 2, c / 2], e, g, f));
                t.push(d.line(a, [-l, l], [-c / 2, -c / 2], e, g, f));
                t.push(d.line(a, [-l, l], [c / 2, c / 2], e, g, f));
                break;
            case "xError":
                t = a.set(), t.push(d.line(a, [-c / 2, c / 2], [0, 0], e, g, f)), t.push(d.line(a, [-c / 2, -c / 2], [-l, l], e, g, f)), t.push(d.line(a, [c / 2, c / 2], [-l, l], e, g, f))
        }
        t && t.pattern(n, NaN, q);
        return t
    };
    d.triangle = function (a, b, c, d, g, f, h, k) {
        if (void 0 === f || 0 === f) f = 1;
        void 0 === h && (h = "#000");
        void 0 === k && (k = 0);
        d = {
            fill: d, stroke: h, "fill-opacity": g,
            "stroke-width": f, "stroke-opacity": k
        };
        b /= 2;
        var l;
        0 === c && (l = " M" + -b + "," + b + " L0," + -b + " L" + b + "," + b + " Z");
        180 == c && (l = " M" + -b + "," + -b + " L0," + b + " L" + b + "," + -b + " Z");
        90 == c && (l = " M" + -b + "," + -b + " L" + b + ",0 L" + -b + "," + b + " Z");
        270 == c && (l = " M" + -b + ",0 L" + b + "," + b + " L" + b + "," + -b + " Z");
        return a.path(l).attr(d)
    };
    d.line = function (a, b, c, e, g, f, h, k, l, m, n) {
        if (a.handDrawn && !n) return d.handDrawnLine(a, b, c, e, g, f, h, k, l, m, n);
        f = {fill: "none", "stroke-width": f};
        void 0 !== h && 0 < h && (f["stroke-dasharray"] = h);
        isNaN(g) || (f["stroke-opacity"] =
            g);
        e && (f.stroke = e);
        e = Math.round;
        m && (e = Number, b[0] = d.roundTo(b[0], 5), c[0] = d.roundTo(c[0], 5));
        m = d.dx;
        g = d.dy;
        h = "M" + (e(b[0]) + m) + "," + (e(c[0]) + g);
        for (k = 1; k < b.length; k++) b[k] = d.roundTo(b[k], 5), c[k] = d.roundTo(c[k], 5), h += " L" + (e(b[k]) + m) + "," + (e(c[k]) + g);
        if (d.VML) return a.path(h, void 0, !0).attr(f);
        l && (h += " M0,0 L0,0");
        return a.path(h).attr(f)
    };
    d.makeHD = function (a, b, c) {
        for (var d = [], g = [], f = 1; f < a.length; f++) for (var h = Number(a[f - 1]), k = Number(b[f - 1]), l = Number(a[f]), m = Number(b[f]), n = Math.round(Math.sqrt(Math.pow(l -
            h, 2) + Math.pow(m - k, 2)) / 50) + 1, l = (l - h) / n, m = (m - k) / n, q = 0; q <= n; q++) {
            var p = k + q * m + Math.random() * c;
            d.push(h + q * l + Math.random() * c);
            g.push(p)
        }
        return [d, g]
    };
    d.handDrawnLine = function (a, b, c, e, g, f, h, k, l, m) {
        var n, q = a.set();
        for (n = 1; n < b.length; n++) for (var p = [b[n - 1], b[n]], t = [c[n - 1], c[n]], t = d.makeHD(p, t, a.handDrawScatter), p = t[0], t = t[1], r = 1; r < p.length; r++) q.push(d.line(a, [p[r - 1], p[r]], [t[r - 1], t[r]], e, g, f + Math.random() * a.handDrawThickness - a.handDrawThickness / 2, h, k, l, m, !0));
        return q
    };
    d.doNothing = function (a) {
        return a
    };
    d.drop =
        function (a, b, c, d, g, f, h, k) {
            var l = 1 / 180 * Math.PI, m = c - 20, n = Math.sin(m * l) * b, q = Math.cos(m * l) * b,
                p = Math.sin((m + 40) * l) * b, t = Math.cos((m + 40) * l) * b, r = .8 * b, w = -b / 3, z = b / 3;
            0 === c && (w = -w, z = 0);
            180 == c && (z = 0);
            90 == c && (w = 0);
            270 == c && (w = 0, z = -z);
            c = {fill: d, stroke: h, "stroke-width": f, "stroke-opacity": k, "fill-opacity": g};
            b = "M" + n + "," + q + " A" + b + "," + b + ",0,1,1," + p + "," + t + (" A" + r + "," + r + ",0,0,0," + (Math.sin((m + 20) * l) * b + z) + "," + (Math.cos((m + 20) * l) * b + w));
            b += " A" + r + "," + r + ",0,0,0," + n + "," + q;
            return a.path(b, void 0, void 0, "1000,1000").attr(c)
        };
    d.wedge = function (a, b, c, e, g, f, h, k, l, m, n, q, p, t) {
        var r = Math.round;
        f = r(f);
        h = r(h);
        k = r(k);
        var w = r(h / f * k), z = d.VML, x = 359.5 + f / 100;
        359.94 < x && (x = 359.94);
        g >= x && (g = x);
        var u = 1 / 180 * Math.PI, x = b + Math.sin(e * u) * k, A = c - Math.cos(e * u) * w,
            y = b + Math.sin(e * u) * f, B = c - Math.cos(e * u) * h, D = b + Math.sin((e + g) * u) * f,
            C = c - Math.cos((e + g) * u) * h, I = b + Math.sin((e + g) * u) * k, u = c - Math.cos((e + g) * u) * w,
            H = {fill: d.adjustLuminosity(m.fill, -.2), "stroke-opacity": 0, "fill-opacity": m["fill-opacity"]}, Q = 0;
        180 < Math.abs(g) && (Q = 1);
        e = a.set();
        var M;
        z && (x = r(10 * x), y =
            r(10 * y), D = r(10 * D), I = r(10 * I), A = r(10 * A), B = r(10 * B), C = r(10 * C), u = r(10 * u), b = r(10 * b), l = r(10 * l), c = r(10 * c), f *= 10, h *= 10, k *= 10, w *= 10, 1 > Math.abs(g) && 1 >= Math.abs(D - y) && 1 >= Math.abs(C - B) && (M = !0));
        g = "";
        var P;
        q && (H["fill-opacity"] = 0, H["stroke-opacity"] = m["stroke-opacity"] / 2, H.stroke = m.stroke);
        if (0 < l) {
            P = " M" + x + "," + (A + l) + " L" + y + "," + (B + l);
            z ? (M || (P += " A" + (b - f) + "," + (l + c - h) + "," + (b + f) + "," + (l + c + h) + "," + y + "," + (B + l) + "," + D + "," + (C + l)), P += " L" + I + "," + (u + l), 0 < k && (M || (P += " B" + (b - k) + "," + (l + c - w) + "," + (b + k) + "," + (l + c + w) + "," + I + "," + (l + u) +
                "," + x + "," + (l + A)))) : (P += " A" + f + "," + h + ",0," + Q + ",1," + D + "," + (C + l) + " L" + I + "," + (u + l), 0 < k && (P += " A" + k + "," + w + ",0," + Q + ",0," + x + "," + (A + l)));
            P += " Z";
            var ia = l;
            z && (ia /= 10);
            for (var J = 0; J < ia; J += 10) {
                var aa = a.path(P, void 0, void 0, "1000,1000").attr(H);
                e.push(aa);
                aa.translate(0, -J)
            }
            P = a.path(" M" + x + "," + A + " L" + x + "," + (A + l) + " L" + y + "," + (B + l) + " L" + y + "," + B + " L" + x + "," + A + " Z", void 0, void 0, "1000,1000").attr(H);
            l = a.path(" M" + D + "," + C + " L" + D + "," + (C + l) + " L" + I + "," + (u + l) + " L" + I + "," + u + " L" + D + "," + C + " Z", void 0, void 0, "1000,1000").attr(H);
            e.push(P);
            e.push(l)
        }
        z ? (M || (g = " A" + r(b - f) + "," + r(c - h) + "," + r(b + f) + "," + r(c + h) + "," + r(y) + "," + r(B) + "," + r(D) + "," + r(C)), h = " M" + r(x) + "," + r(A) + " L" + r(y) + "," + r(B) + g + " L" + r(I) + "," + r(u)) : h = " M" + x + "," + A + " L" + y + "," + B + (" A" + f + "," + h + ",0," + Q + ",1," + D + "," + C) + " L" + I + "," + u;
        0 < k && (z ? M || (h += " B" + (b - k) + "," + (c - w) + "," + (b + k) + "," + (c + w) + "," + I + "," + u + "," + x + "," + A) : h += " A" + k + "," + w + ",0," + Q + ",0," + x + "," + A);
        a.handDrawn && (k = d.line(a, [x, y], [A, B], m.stroke, m.thickness * Math.random() * a.handDrawThickness, m["stroke-opacity"]), e.push(k));
        a = a.path(h +
            " Z", void 0, void 0, "1000,1000").attr(m);
        if (n) {
            k = [];
            for (w = 0; w < n.length; w++) k.push(d.adjustLuminosity(m.fill, n[w]));
            "radial" != t || d.isModern || (k = []);
            0 < k.length && a.gradient(t + "Gradient", k)
        }
        d.isModern && "radial" == t && a.grad && (a.grad.setAttribute("gradientUnits", "userSpaceOnUse"), a.grad.setAttribute("r", f), a.grad.setAttribute("cx", b), a.grad.setAttribute("cy", c));
        a.pattern(q, NaN, p);
        e.wedge = a;
        e.push(a);
        return e
    };
    d.rgb2hex = function (a) {
        return (a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) &&
        4 === a.length ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice(-2) + ("0" + parseInt(a[2], 10).toString(16)).slice(-2) + ("0" + parseInt(a[3], 10).toString(16)).slice(-2) : ""
    };
    d.adjustLuminosity = function (a, b) {
        a && -1 != a.indexOf("rgb") && (a = d.rgb2hex(a));
        a = String(a).replace(/[^0-9a-f]/gi, "");
        6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
        b = b || 0;
        var c = "#", e, g;
        for (g = 0; 3 > g; g++) e = parseInt(a.substr(2 * g, 2), 16), e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16), c += ("00" +
            e).substr(e.length);
        return c
    }
})();
(function () {
    var d = window.AmCharts;
    d.Bezier = d.Class({
        construct: function (a, b, c, e, g, f, h, k, l, m, n) {
            var q = a.chart, p = d.bezierX, t = d.bezierY;
            isNaN(q.bezierX) || (p = q.bezierX);
            isNaN(q.bezierY) || (t = q.bezierY);
            isNaN(p) && (q.rotate ? (p = 20, t = 4) : (t = 20, p = 4));
            var r, w;
            "object" == typeof h && 1 < h.length && (w = !0, r = h, h = h[0]);
            "object" == typeof k && (k = k[0]);
            0 === k && (h = "none");
            f = {fill: h, "fill-opacity": k, "stroke-width": f};
            void 0 !== l && 0 < l && (f["stroke-dasharray"] = l);
            isNaN(g) || (f["stroke-opacity"] = g);
            e && (f.stroke = e);
            e = "M" + Math.round(b[0]) +
                "," + Math.round(c[0]) + " ";
            g = [];
            for (l = 0; l < b.length; l++) isNaN(b[l]) || isNaN(c[l]) ? (e += this.drawSegment(g, p, t), l < b.length - 1 && (e += "L" + b[l + 1] + "," + c[l + 1] + " "), g = []) : g.push({
                x: Number(b[l]),
                y: Number(c[l])
            });
            e += this.drawSegment(g, p, t);
            m && (e += m);
            this.path = a.path(e).attr(f);
            this.node = this.path.node;
            w && this.path.gradient("linearGradient", r, n)
        }, drawSegment: function (a, b, c) {
            var d = "";
            if (2 < a.length) for (var g = 0; g < a.length - 1; g++) {
                var f = [], h = a[g - 1], k = a[g], l = a[g + 1], m = a[g + 2];
                0 === g ? (f.push({x: k.x, y: k.y}), f.push({x: k.x, y: k.y}),
                    f.push({x: l.x, y: l.y}), f.push({x: m.x, y: m.y})) : g >= a.length - 2 ? (f.push({
                    x: h.x,
                    y: h.y
                }), f.push({x: k.x, y: k.y}), f.push({x: l.x, y: l.y}), f.push({x: l.x, y: l.y})) : (f.push({
                    x: h.x,
                    y: h.y
                }), f.push({x: k.x, y: k.y}), f.push({x: l.x, y: l.y}), f.push({x: m.x, y: m.y}));
                h = [];
                k = Math.round;
                h.push({x: k(f[1].x), y: k(f[1].y)});
                h.push({x: k((-f[0].x + b * f[1].x + f[2].x) / b), y: k((-f[0].y + c * f[1].y + f[2].y) / c)});
                h.push({x: k((f[1].x + b * f[2].x - f[3].x) / b), y: k((f[1].y + c * f[2].y - f[3].y) / c)});
                h.push({x: k(f[2].x), y: k(f[2].y)});
                d += "C" + h[1].x + "," + h[1].y + "," +
                    h[2].x + "," + h[2].y + "," + h[3].x + "," + h[3].y + " "
            } else 1 < a.length && (d += "L" + a[1].x + "," + a[1].y);
            return d
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.AmDraw = d.Class({
        construct: function (a, b, c, e) {
            d.SVG_NS = "http://www.w3.org/2000/svg";
            d.SVG_XLINK = "http://www.w3.org/1999/xlink";
            d.hasSVG = !!document.createElementNS && !!document.createElementNS(d.SVG_NS, "svg").createSVGRect;
            1 > b && (b = 10);
            1 > c && (c = 10);
            this.div = a;
            this.width = b;
            this.height = c;
            this.rBin = document.createElement("div");
            d.hasSVG ? (d.SVG = !0, b = this.createSvgElement("svg"), a.appendChild(b), this.container = b, this.addDefs(e), this.R = new d.SVGRenderer(this)) : d.isIE && d.VMLRenderer &&
                (d.VML = !0, d.vmlStyleSheet || (document.namespaces.add("amvml", "urn:schemas-microsoft-com:vml"), 31 > document.styleSheets.length ? (b = document.createStyleSheet(), b.addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true"), d.vmlStyleSheet = b) : document.styleSheets[0].addRule(".amvml", "behavior:url(#default#VML); display:inline-block; antialias:true")), this.container = a, this.R = new d.VMLRenderer(this, e), this.R.disableSelection(a))
        }, createSvgElement: function (a) {
            return document.createElementNS(d.SVG_NS,
                a)
        }, circle: function (a, b, c, e) {
            var g = new d.AmDObject("circle", this);
            g.attr({r: c, cx: a, cy: b});
            this.addToContainer(g.node, e);
            return g
        }, ellipse: function (a, b, c, e, g) {
            var f = new d.AmDObject("ellipse", this);
            f.attr({rx: c, ry: e, cx: a, cy: b});
            this.addToContainer(f.node, g);
            return f
        }, setSize: function (a, b) {
            0 < a && 0 < b && (this.container.style.width = a + "px", this.container.style.height = b + "px")
        }, rect: function (a, b, c, e, g, f, h) {
            var k = new d.AmDObject("rect", this);
            d.VML && (g = Math.round(100 * g / Math.min(c, e)), c += 2 * f, e += 2 * f, k.bw = f, k.node.style.marginLeft =
                -f, k.node.style.marginTop = -f);
            1 > c && (c = 1);
            1 > e && (e = 1);
            k.attr({x: a, y: b, width: c, height: e, rx: g, ry: g, "stroke-width": f});
            this.addToContainer(k.node, h);
            return k
        }, image: function (a, b, c, e, g, f) {
            var h = new d.AmDObject("image", this);
            h.attr({x: b, y: c, width: e, height: g});
            this.R.path(h, a);
            this.addToContainer(h.node, f);
            return h
        }, addToContainer: function (a, b) {
            b || (b = this.container);
            b.appendChild(a)
        }, text: function (a, b, c) {
            return this.R.text(a, b, c)
        }, path: function (a, b, c, e) {
            var g = new d.AmDObject("path", this);
            e || (e = "100,100");
            g.attr({cs: e});
            c ? g.attr({dd: a}) : g.attr({d: a});
            this.addToContainer(g.node, b);
            return g
        }, set: function (a) {
            return this.R.set(a)
        }, remove: function (a) {
            if (a) {
                var b = this.rBin;
                b.appendChild(a);
                b.innerHTML = ""
            }
        }, renderFix: function () {
            var a = this.container, b = a.style;
            b.top = "0px";
            b.left = "0px";
            try {
                var c = a.getBoundingClientRect(), d = c.left - Math.round(c.left), g = c.top - Math.round(c.top);
                d && (b.left = d + "px");
                g && (b.top = g + "px")
            } catch (f) {
            }
        }, update: function () {
            this.R.update()
        }, addDefs: function (a) {
            if (d.hasSVG) {
                var b = this.createSvgElement("desc"),
                    c = this.container;
                c.setAttribute("version", "1.1");
                c.style.position = "absolute";
                this.setSize(this.width, this.height);
                if (a.accessibleTitle) {
                    var e = this.createSvgElement("text");
                    c.appendChild(e);
                    e.innerHTML = a.accessibleTitle;
                    e.style.opacity = 0
                }
                d.rtl && (c.setAttribute("direction", "rtl"), c.style.left = "auto", c.style.right = "0px");
                a && (a.addCodeCredits && b.appendChild(document.createTextNode("JavaScript chart by amCharts " + a.version)), a.accessibleDescription && (b.innerHTML = "", b.appendChild(document.createTextNode(a.accessibleDescription))),
                    c.appendChild(b), a.defs && (b = this.createSvgElement("defs"), c.appendChild(b), d.parseDefs(a.defs, b), this.defs = b))
            }
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.AmDObject = d.Class({
        construct: function (a, b) {
            this.D = b;
            this.R = b.R;
            this.node = this.R.create(this, a);
            this.y = this.x = 0;
            this.scale = 1
        }, attr: function (a) {
            this.R.attr(this, a);
            return this
        }, getAttr: function (a) {
            return this.node.getAttribute(a)
        }, setAttr: function (a, b) {
            this.R.setAttr(this, a, b);
            return this
        }, clipRect: function (a, b, c, d) {
            this.R.clipRect(this, a, b, c, d)
        }, translate: function (a, b, c, d) {
            d || (a = Math.round(a), b = Math.round(b));
            this.R.move(this, a, b, c);
            this.x = a;
            this.y = b;
            this.scale =
                c;
            this.angle && this.rotate(this.angle)
        }, rotate: function (a, b) {
            this.R.rotate(this, a, b);
            this.angle = a
        }, animate: function (a, b, c) {
            for (var e in a) if (a.hasOwnProperty(e)) {
                var g = e, f = a[e];
                c = d.getEffect(c);
                this.R.animate(this, g, f, b, c)
            }
        }, push: function (a) {
            if (a) {
                var b = this.node;
                b.appendChild(a.node);
                var c = a.clipPath;
                c && b.appendChild(c);
                (a = a.grad) && b.appendChild(a)
            }
        }, text: function (a) {
            this.R.setText(this, a)
        }, remove: function () {
            this.stop();
            this.R.remove(this)
        }, clear: function () {
            var a = this.node;
            if (a.hasChildNodes()) for (; 1 <=
                                          a.childNodes.length;) a.removeChild(a.firstChild)
        }, hide: function () {
            this.setAttr("visibility", "hidden")
        }, show: function () {
            this.setAttr("visibility", "visible")
        }, getBBox: function () {
            return this.R.getBBox(this)
        }, toFront: function () {
            var a = this.node;
            if (a) {
                this.prevNextNode = a.nextSibling;
                var b = a.parentNode;
                b && b.appendChild(a)
            }
        }, toPrevious: function () {
            var a = this.node;
            a && this.prevNextNode && (a = a.parentNode) && a.insertBefore(this.prevNextNode, null)
        }, toBack: function () {
            var a = this.node;
            if (a) {
                this.prevNextNode = a.nextSibling;
                var b = a.parentNode;
                if (b) {
                    var c = b.firstChild;
                    c && b.insertBefore(a, c)
                }
            }
        }, mouseover: function (a) {
            this.R.addListener(this, "mouseover", a);
            return this
        }, mouseout: function (a) {
            this.R.addListener(this, "mouseout", a);
            return this
        }, click: function (a) {
            this.R.addListener(this, "click", a);
            return this
        }, dblclick: function (a) {
            this.R.addListener(this, "dblclick", a);
            return this
        }, mousedown: function (a) {
            this.R.addListener(this, "mousedown", a);
            return this
        }, mouseup: function (a) {
            this.R.addListener(this, "mouseup", a);
            return this
        }, touchmove: function (a) {
            this.R.addListener(this,
                "touchmove", a);
            return this
        }, touchstart: function (a) {
            this.R.addListener(this, "touchstart", a);
            return this
        }, touchend: function (a) {
            this.R.addListener(this, "touchend", a);
            return this
        }, keyup: function (a) {
            this.R.addListener(this, "keyup", a);
            return this
        }, focus: function (a) {
            this.R.addListener(this, "focus", a);
            return this
        }, blur: function (a) {
            this.R.addListener(this, "blur", a);
            return this
        }, contextmenu: function (a) {
            this.node.addEventListener ? this.node.addEventListener("contextmenu", a, !0) : this.R.addListener(this, "contextmenu",
                a);
            return this
        }, stop: function () {
            d.removeFromArray(this.R.animations, this.an_translate);
            d.removeFromArray(this.R.animations, this.an_y);
            d.removeFromArray(this.R.animations, this.an_x)
        }, length: function () {
            return this.node.childNodes.length
        }, gradient: function (a, b, c) {
            this.R.gradient(this, a, b, c)
        }, pattern: function (a, b, c) {
            a && this.R.pattern(this, a, b, c)
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.VMLRenderer = d.Class({
        construct: function (a, b) {
            this.chart = b;
            this.D = a;
            this.cNames = {circle: "oval", ellipse: "oval", rect: "roundrect", path: "shape"};
            this.styleMap = {
                x: "left",
                y: "top",
                width: "width",
                height: "height",
                "font-family": "fontFamily",
                "font-size": "fontSize",
                visibility: "visibility"
            }
        }, create: function (a, b) {
            var c;
            if ("group" == b) c = document.createElement("div"), a.type = "div"; else if ("text" == b) c = document.createElement("div"), a.type = "text"; else if ("image" == b) c = document.createElement("img"),
                a.type = "image"; else {
                a.type = "shape";
                a.shapeType = this.cNames[b];
                c = document.createElement("amvml:" + this.cNames[b]);
                var d = document.createElement("amvml:stroke");
                c.appendChild(d);
                a.stroke = d;
                var g = document.createElement("amvml:fill");
                c.appendChild(g);
                a.fill = g;
                g.className = "amvml";
                d.className = "amvml";
                c.className = "amvml"
            }
            c.style.position = "absolute";
            c.style.top = 0;
            c.style.left = 0;
            return c
        }, path: function (a, b) {
            a.node.setAttribute("src", b)
        }, setAttr: function (a, b, c) {
            if (void 0 !== c) {
                var e;
                8 === document.documentMode &&
                (e = !0);
                var g = a.node, f = a.type, h = g.style;
                "r" == b && (h.width = 2 * c, h.height = 2 * c);
                "oval" == a.shapeType && ("rx" == b && (h.width = 2 * c), "ry" == b && (h.height = 2 * c));
                "roundrect" == a.shapeType && ("width" != b && "height" != b || --c);
                "cursor" == b && (h.cursor = c);
                "cx" == b && (h.left = c - d.removePx(h.width) / 2);
                "cy" == b && (h.top = c - d.removePx(h.height) / 2);
                var k = this.styleMap[b];
                "width" == k && 0 > c && (c = 0);
                void 0 !== k && (h[k] = c);
                "text" == f && ("text-anchor" == b && (a.anchor = c, k = g.clientWidth, "end" == c && (h.marginLeft = -k + "px"), "middle" == c && (h.marginLeft = -(k / 2) +
                    "px", h.textAlign = "center"), "start" == c && (h.marginLeft = "0px")), "fill" == b && (h.color = c), "font-weight" == b && (h.fontWeight = c));
                if (h = a.children) for (k = 0; k < h.length; k++) h[k].setAttr(b, c);
                if ("shape" == f) {
                    "cs" == b && (g.style.width = "100px", g.style.height = "100px", g.setAttribute("coordsize", c));
                    "d" == b && g.setAttribute("path", this.svgPathToVml(c));
                    "dd" == b && g.setAttribute("path", c);
                    f = a.stroke;
                    a = a.fill;
                    "stroke" == b && (e ? f.color = c : f.setAttribute("color", c));
                    "stroke-width" == b && (e ? f.weight = c : f.setAttribute("weight", c));
                    "stroke-opacity" ==
                    b && (e ? f.opacity = c : f.setAttribute("opacity", c));
                    "stroke-dasharray" == b && (h = "solid", 0 < c && 3 > c && (h = "dot"), 3 <= c && 6 >= c && (h = "dash"), 6 < c && (h = "longdash"), e ? f.dashstyle = h : f.setAttribute("dashstyle", h));
                    if ("fill-opacity" == b || "opacity" == b) 0 === c ? e ? a.on = !1 : a.setAttribute("on", !1) : e ? a.opacity = c : a.setAttribute("opacity", c);
                    "fill" == b && (e ? a.color = c : a.setAttribute("color", c));
                    "rx" == b && (e ? g.arcSize = c + "%" : g.setAttribute("arcsize", c + "%"))
                }
            }
        }, attr: function (a, b) {
            for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
        },
        text: function (a, b, c) {
            var e = new d.AmDObject("text", this.D), g = e.node;
            g.style.whiteSpace = "pre";
            g.innerHTML = a;
            this.D.addToContainer(g, c);
            this.attr(e, b);
            return e
        }, getBBox: function (a) {
            return this.getBox(a.node)
        }, getBox: function (a) {
            var b = a.offsetLeft, c = a.offsetTop, d = a.offsetWidth, g = a.offsetHeight, f;
            if (a.hasChildNodes()) {
                var h, k, l;
                for (l = 0; l < a.childNodes.length; l++) {
                    f = this.getBox(a.childNodes[l]);
                    var m = f.x;
                    isNaN(m) || (isNaN(h) ? h = m : m < h && (h = m));
                    var n = f.y;
                    isNaN(n) || (isNaN(k) ? k = n : n < k && (k = n));
                    m = f.width + m;
                    isNaN(m) ||
                    (d = Math.max(d, m));
                    f = f.height + n;
                    isNaN(f) || (g = Math.max(g, f))
                }
                0 > h && (b += h);
                0 > k && (c += k)
            }
            return {x: b, y: c, width: d, height: g}
        }, setText: function (a, b) {
            var c = a.node;
            c && (c.innerHTML = b);
            this.setAttr(a, "text-anchor", a.anchor)
        }, addListener: function (a, b, c) {
            a.node["on" + b] = c
        }, move: function (a, b, c) {
            var e = a.node, g = e.style;
            "text" == a.type && (c -= d.removePx(g.fontSize) / 2 - 1);
            "oval" == a.shapeType && (b -= d.removePx(g.width) / 2, c -= d.removePx(g.height) / 2);
            a = a.bw;
            isNaN(a) || (b -= a, c -= a);
            isNaN(b) || isNaN(c) || (e.style.left = b + "px", e.style.top =
                c + "px")
        }, svgPathToVml: function (a) {
            var b = a.split(" ");
            a = "";
            var c, d = Math.round, g;
            for (g = 0; g < b.length; g++) {
                var f = b[g], h = f.substring(0, 1), f = f.substring(1), k = f.split(","), l = d(k[0]) + "," + d(k[1]);
                "M" == h && (a += " m " + l);
                "L" == h && (a += " l " + l);
                "Z" == h && (a += " x e");
                if ("Q" == h) {
                    var m = c.length, n = c[m - 1], q = k[0], p = k[1], l = k[2], t = k[3];
                    c = d(c[m - 2] / 3 + 2 / 3 * q);
                    n = d(n / 3 + 2 / 3 * p);
                    q = d(2 / 3 * q + l / 3);
                    p = d(2 / 3 * p + t / 3);
                    a += " c " + c + "," + n + "," + q + "," + p + "," + l + "," + t
                }
                "C" == h && (a += " c " + k[0] + "," + k[1] + "," + k[2] + "," + k[3] + "," + k[4] + "," + k[5]);
                "A" == h && (a += " wa " +
                    f);
                "B" == h && (a += " at " + f);
                c = k
            }
            return a
        }, animate: function (a, b, c, d, g) {
            var f = a.node, h = this.chart;
            a.animationFinished = !1;
            if ("translate" == b) {
                b = c.split(",");
                c = b[1];
                var k = f.offsetTop;
                h.animate(a, "left", f.offsetLeft, b[0], d, g, "px");
                h.animate(a, "top", k, c, d, g, "px")
            }
        }, clipRect: function (a, b, c, d, g) {
            a = a.node;
            0 === b && 0 === c ? (a.style.width = d + "px", a.style.height = g + "px", a.style.overflow = "hidden") : a.style.clip = "rect(" + c + "px " + (b + d) + "px " + (c + g) + "px " + b + "px)"
        }, rotate: function (a, b, c) {
            if (0 !== Number(b)) {
                var e = a.node;
                a = e.style;
                c || (c = this.getBGColor(e.parentNode));
                a.backgroundColor = c;
                a.paddingLeft = 1;
                c = b * Math.PI / 180;
                var g = Math.cos(c), f = Math.sin(c), h = d.removePx(a.left), k = d.removePx(a.top), l = e.offsetWidth,
                    e = e.offsetHeight;
                b /= Math.abs(b);
                a.left = h + l / 2 - l / 2 * Math.cos(c) - b * e / 2 * Math.sin(c) + 3;
                a.top = k - b * l / 2 * Math.sin(c) + b * e / 2 * Math.sin(c);
                a.cssText = a.cssText + "; filter:progid:DXImageTransform.Microsoft.Matrix(M11='" + g + "', M12='" + -f + "', M21='" + f + "', M22='" + g + "', sizingmethod='auto expand');"
            }
        }, getBGColor: function (a) {
            var b = "#FFFFFF";
            if (a.style) {
                var c =
                    a.style.backgroundColor;
                "" !== c ? b = c : a.parentNode && (b = this.getBGColor(a.parentNode))
            }
            return b
        }, set: function (a) {
            var b = new d.AmDObject("group", this.D);
            this.D.container.appendChild(b.node);
            if (a) {
                var c;
                for (c = 0; c < a.length; c++) b.push(a[c])
            }
            return b
        }, gradient: function (a, b, c, d) {
            var g = "";
            "radialGradient" == b && (b = "gradientradial", c.reverse());
            "linearGradient" == b && (b = "gradient");
            var f;
            for (f = 0; f < c.length; f++) g += Math.round(100 * f / (c.length - 1)) + "% " + c[f], f < c.length - 1 && (g += ",");
            a = a.fill;
            90 == d ? d = 0 : 270 == d ? d = 180 : 180 ==
            d ? d = 90 : 0 === d && (d = 270);
            8 === document.documentMode ? (a.type = b, a.angle = d) : (a.setAttribute("type", b), a.setAttribute("angle", d));
            g && (a.colors.value = g)
        }, remove: function (a) {
            a.clipPath && this.D.remove(a.clipPath);
            this.D.remove(a.node)
        }, disableSelection: function (a) {
            a.onselectstart = function () {
                return !1
            };
            a.style.cursor = "default"
        }, pattern: function (a, b, c, e) {
            c = a.node;
            a = a.fill;
            var g = "none";
            b.color && (g = b.color);
            c.fillColor = g;
            b = b.url;
            d.isAbsolute(b) || (b = e + b);
            8 === document.documentMode ? (a.type = "tile", a.src = b) : (a.setAttribute("type",
                "tile"), a.setAttribute("src", b))
        }, update: function () {
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.SVGRenderer = d.Class({
        construct: function (a) {
            this.D = a;
            this.animations = []
        }, create: function (a, b) {
            return document.createElementNS(d.SVG_NS, b)
        }, attr: function (a, b) {
            for (var c in b) b.hasOwnProperty(c) && this.setAttr(a, c, b[c])
        }, setAttr: function (a, b, c) {
            void 0 !== c && a.node.setAttribute(b, c)
        }, animate: function (a, b, c, e, g) {
            a.animationFinished = !1;
            var f = a.node;
            a["an_" + b] && d.removeFromArray(this.animations, a["an_" + b]);
            "translate" == b ? (f = (f = f.getAttribute("transform")) ? String(f).substring(10,
                f.length - 1) : "0,0", f = f.split(", ").join(" "), f = f.split(" ").join(","), 0 === f && (f = "0,0")) : f = Number(f.getAttribute(b));
            c = {obj: a, frame: 0, attribute: b, from: f, to: c, time: e, effect: g};
            this.animations.push(c);
            a["an_" + b] = c
        }, update: function () {
            var a, b = this.animations;
            for (a = b.length - 1; 0 <= a; a--) {
                var c = b[a], e = c.time * d.updateRate, g = c.frame + 1, f = c.obj, h = c.attribute, k, l, m;
                if (g <= e) {
                    c.frame++;
                    if ("translate" == h) {
                        k = c.from.split(",");
                        h = Number(k[0]);
                        k = Number(k[1]);
                        isNaN(k) && (k = 0);
                        l = c.to.split(",");
                        m = Number(l[0]);
                        l = Number(l[1]);
                        m = 0 === m - h ? m : Math.round(d[c.effect](0, g, h, m - h, e));
                        c = 0 === l - k ? l : Math.round(d[c.effect](0, g, k, l - k, e));
                        h = "transform";
                        if (isNaN(m) || isNaN(c)) continue;
                        c = "translate(" + m + "," + c + ")"
                    } else l = Number(c.from), k = Number(c.to), m = k - l, c = d[c.effect](0, g, l, m, e), isNaN(c) && (c = k), 0 === m && this.animations.splice(a, 1);
                    this.setAttr(f, h, c)
                } else "translate" == h ? (l = c.to.split(","), m = Number(l[0]), l = Number(l[1]), f.translate(m, l)) : (k = Number(c.to), this.setAttr(f, h, k)), f.animationFinished = !0, this.animations.splice(a, 1)
            }
        }, getBBox: function (a) {
            if (a =
                a.node) try {
                return a.getBBox()
            } catch (b) {
            }
            return {width: 0, height: 0, x: 0, y: 0}
        }, path: function (a, b) {
            a.node.setAttributeNS(d.SVG_XLINK, "xlink:href", b)
        }, clipRect: function (a, b, c, e, g) {
            var f = a.node, h = a.clipPath;
            h && this.D.remove(h);
            var k = f.parentNode;
            k && (f = document.createElementNS(d.SVG_NS, "clipPath"), h = d.getUniqueId(), f.setAttribute("id", h), this.D.rect(b, c, e, g, 0, 0, f), k.appendChild(f), b = "#", d.baseHref && !d.isIE && (b = this.removeTarget(window.location.href) + b), this.setAttr(a, "clip-path", "url(" + b + h + ")"), this.clipPathC++,
                a.clipPath = f)
        }, text: function (a, b, c) {
            var e = new d.AmDObject("text", this.D);
            a = String(a).split("\n");
            var g = d.removePx(b["font-size"]), f;
            for (f = 0; f < a.length; f++) {
                var h = this.create(null, "tspan");
                h.appendChild(document.createTextNode(a[f]));
                h.setAttribute("y", (g + 2) * f + Math.round(g / 2));
                h.setAttribute("x", 0);
                e.node.appendChild(h)
            }
            e.node.setAttribute("y", Math.round(g / 2));
            this.attr(e, b);
            this.D.addToContainer(e.node, c);
            return e
        }, setText: function (a, b) {
            var c = a.node;
            c && (c.removeChild(c.firstChild), c.appendChild(document.createTextNode(b)))
        },
        move: function (a, b, c, d) {
            isNaN(b) && (b = 0);
            isNaN(c) && (c = 0);
            b = "translate(" + b + "," + c + ")";
            d && (b = b + " scale(" + d + ")");
            this.setAttr(a, "transform", b)
        }, rotate: function (a, b) {
            var c = a.node.getAttribute("transform"), d = "rotate(" + b + ")";
            c && (d = c + " " + d);
            this.setAttr(a, "transform", d)
        }, set: function (a) {
            var b = new d.AmDObject("g", this.D);
            this.D.container.appendChild(b.node);
            if (a) {
                var c;
                for (c = 0; c < a.length; c++) b.push(a[c])
            }
            return b
        }, addListener: function (a, b, c) {
            a.node["on" + b] = c
        }, gradient: function (a, b, c, e) {
            var g = a.node, f = a.grad;
            f && this.D.remove(f);
            b = document.createElementNS(d.SVG_NS, b);
            f = d.getUniqueId();
            b.setAttribute("id", f);
            if (!isNaN(e)) {
                var h = 0, k = 0, l = 0, m = 0;
                90 == e ? l = 100 : 270 == e ? m = 100 : 180 == e ? h = 100 : 0 === e && (k = 100);
                b.setAttribute("x1", h + "%");
                b.setAttribute("x2", k + "%");
                b.setAttribute("y1", l + "%");
                b.setAttribute("y2", m + "%")
            }
            for (e = 0; e < c.length; e++) h = document.createElementNS(d.SVG_NS, "stop"), k = 100 * e / (c.length - 1), 0 === e && (k = 0), h.setAttribute("offset", k + "%"), h.setAttribute("stop-color", c[e]), b.appendChild(h);
            g.parentNode.appendChild(b);
            c = "#";
            d.baseHref && !d.isIE && (c = this.removeTarget(window.location.href) + c);
            g.setAttribute("fill", "url(" + c + f + ")");
            a.grad = b
        }, removeTarget: function (a) {
            return a.split("#")[0]
        }, pattern: function (a, b, c, e) {
            var g = a.node;
            isNaN(c) && (c = 1);
            var f = a.patternNode;
            f && this.D.remove(f);
            var f = document.createElementNS(d.SVG_NS, "pattern"), h = d.getUniqueId(), k = b;
            b.url && (k = b.url);
            d.isAbsolute(k) || -1 != k.indexOf("data:image") || (k = e + k);
            e = Number(b.width);
            isNaN(e) && (e = 4);
            var l = Number(b.height);
            isNaN(l) && (l = 4);
            e /= c;
            l /= c;
            c = b.x;
            isNaN(c) &&
            (c = 0);
            var m = -Math.random() * Number(b.randomX);
            isNaN(m) || (c = m);
            m = b.y;
            isNaN(m) && (m = 0);
            var n = -Math.random() * Number(b.randomY);
            isNaN(n) || (m = n);
            f.setAttribute("id", h);
            f.setAttribute("width", e);
            f.setAttribute("height", l);
            f.setAttribute("patternUnits", "userSpaceOnUse");
            f.setAttribute("xlink:href", k);
            b.color && (n = document.createElementNS(d.SVG_NS, "rect"), n.setAttributeNS(null, "height", e), n.setAttributeNS(null, "width", l), n.setAttributeNS(null, "fill", b.color), f.appendChild(n));
            this.D.image(k, 0, 0, e, l, f).translate(c,
                m);
            k = "#";
            d.baseHref && !d.isIE && (k = this.removeTarget(window.location.href) + k);
            g.setAttribute("fill", "url(" + k + h + ")");
            a.patternNode = f;
            g.parentNode.appendChild(f)
        }, remove: function (a) {
            a.clipPath && this.D.remove(a.clipPath);
            a.grad && this.D.remove(a.grad);
            a.patternNode && this.D.remove(a.patternNode);
            this.D.remove(a.node)
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.AmLegend = d.Class({
        construct: function (a) {
            this.enabled = !0;
            this.cname = "AmLegend";
            this.createEvents("rollOverMarker", "rollOverItem", "rollOutMarker", "rollOutItem", "showItem", "hideItem", "clickMarker", "clickLabel");
            this.position = "bottom";
            this.borderColor = this.color = "#000000";
            this.borderAlpha = 0;
            this.markerLabelGap = 5;
            this.verticalGap = 10;
            this.align = "left";
            this.horizontalGap = 0;
            this.spacing = 10;
            this.markerDisabledColor = "#AAB3B3";
            this.markerType = "square";
            this.markerSize = 16;
            this.markerBorderThickness =
                this.markerBorderAlpha = 1;
            this.marginBottom = this.marginTop = 0;
            this.marginLeft = this.marginRight = 20;
            this.autoMargins = !0;
            this.valueWidth = 50;
            this.switchable = !0;
            this.switchType = "x";
            this.switchColor = "#FFFFFF";
            this.rollOverColor = "#CC0000";
            this.reversedOrder = !1;
            this.labelText = "[[title]]";
            this.valueText = "[[value]]";
            this.accessibleLabel = "[[title]]";
            this.useMarkerColorForLabels = !1;
            this.rollOverGraphAlpha = 1;
            this.textClickEnabled = !1;
            this.equalWidths = !0;
            this.backgroundColor = "#FFFFFF";
            this.backgroundAlpha = 0;
            this.useGraphSettings =
                !1;
            this.showEntries = !0;
            this.labelDx = 0;
            d.applyTheme(this, a, this.cname)
        }, setData: function (a) {
            this.legendData = a;
            this.invalidateSize()
        }, invalidateSize: function () {
            this.destroy();
            this.entries = [];
            this.valueLabels = [];
            var a = this.legendData;
            this.enabled && (d.ifArray(a) || d.ifArray(this.data)) && this.drawLegend()
        }, drawLegend: function () {
            var a = this.chart, b = this.position, c = this.width, e = a.divRealWidth, g = a.divRealHeight,
                f = this.div, h = this.legendData;
            this.data && (h = this.combineLegend ? this.legendData.concat(this.data) :
                this.data);
            isNaN(this.fontSize) && (this.fontSize = a.fontSize);
            this.maxColumnsReal = this.maxColumns;
            if ("right" == b || "left" == b) this.maxColumnsReal = 1, this.autoMargins && (this.marginLeft = this.marginRight = 10); else if (this.autoMargins) {
                this.marginRight = a.marginRight;
                this.marginLeft = a.marginLeft;
                var k = a.autoMarginOffset;
                "bottom" == b ? (this.marginBottom = k, this.marginTop = 0) : (this.marginTop = k, this.marginBottom = 0)
            }
            c = void 0 !== c ? d.toCoordinate(c, e) : "right" != b && "left" != b ? a.realWidth : 0 < this.ieW ? this.ieW : a.realWidth;
            "outside" ==
            b ? (c = f.offsetWidth, g = f.offsetHeight, f.clientHeight && (c = f.clientWidth, g = f.clientHeight)) : (isNaN(c) || (f.style.width = c + "px"), f.className = "amChartsLegend " + a.classNamePrefix + "-legend-div");
            this.divWidth = c;
            (b = this.container) ? (b.container.innerHTML = "", f.appendChild(b.container), b.width = c, b.height = g, b.setSize(c, g), b.addDefs(a)) : b = new d.AmDraw(f, c, g, a);
            this.container = b;
            this.lx = 0;
            this.ly = 8;
            g = this.markerSize;
            g > this.fontSize && (this.ly = g / 2 - 1);
            0 < g && (this.lx += g + this.markerLabelGap);
            this.titleWidth = 0;
            if (g = this.title) g =
                d.text(this.container, g, this.color, a.fontFamily, this.fontSize, "start", !0), d.setCN(a, g, "legend-title"), g.translate(this.marginLeft, this.marginTop + this.verticalGap + this.ly + 1), a = g.getBBox(), this.titleWidth = a.width + 15, this.titleHeight = a.height + 6;
            this.index = this.maxLabelWidth = 0;
            if (this.showEntries) {
                for (a = 0; a < h.length; a++) this.createEntry(h[a]);
                for (a = this.index = 0; a < h.length; a++) this.createValue(h[a])
            }
            this.arrangeEntries();
            this.updateValues()
        }, arrangeEntries: function () {
            var a = this.position, b = this.marginLeft +
                    this.titleWidth, c = this.marginRight, e = this.marginTop, g = this.marginBottom,
                f = this.horizontalGap, h = this.div, k = this.divWidth, l = this.maxColumnsReal, m = this.verticalGap,
                n = this.spacing, q = k - c - b, p = 0, t = 0, r = this.container;
            this.set && this.set.remove();
            var w = r.set();
            this.set = w;
            var z = r.set();
            w.push(z);
            var x = this.entries, u, A;
            for (A = 0; A < x.length; A++) {
                u = x[A].getBBox();
                var y = u.width;
                y > p && (p = y);
                u = u.height;
                u > t && (t = u)
            }
            var y = t = 0, B = f, D = 0, C = 0;
            for (A = 0; A < x.length; A++) {
                var I = x[A];
                this.reversedOrder && (I = x[x.length - A - 1]);
                u = I.getBBox();
                var H;
                this.equalWidths ? H = y * (p + n + this.markerLabelGap) : (H = B, B = B + u.width + f + n);
                H + u.width > q && 0 < A && 0 !== y && (t++, H = y = 0, B = H + u.width + f + n, D = D + C + m, C = 0);
                u.height > C && (C = u.height);
                I.translate(H, D);
                y++;
                !isNaN(l) && y >= l && (y = 0, t++, D = D + C + m, B = f, C = 0);
                z.push(I)
            }
            u = z.getBBox();
            l = u.height + 2 * m - 1;
            "left" == a || "right" == a ? (n = u.width + 2 * f, k = n + b + c, h.style.width = k + "px", this.ieW = k) : n = k - b - c - 1;
            c = d.polygon(this.container, [0, n, n, 0], [0, 0, l, l], this.backgroundColor, this.backgroundAlpha, 1, this.borderColor, this.borderAlpha);
            d.setCN(this.chart,
                c, "legend-bg");
            w.push(c);
            w.translate(b, e);
            c.toBack();
            b = f;
            if ("top" == a || "bottom" == a || "absolute" == a || "outside" == a) "center" == this.align ? b = f + (n - u.width) / 2 : "right" == this.align && (b = f + n - u.width);
            z.translate(b, m + 1);
            this.titleHeight > l && (l = this.titleHeight);
            e = l + e + g + 1;
            0 > e && (e = 0);
            "absolute" != a && "outside" != a && e > this.chart.divRealHeight && (h.style.top = "0px");
            h.style.height = Math.round(e) + "px";
            r.setSize(this.divWidth, e)
        }, createEntry: function (a) {
            if (!1 !== a.visibleInLegend && !a.hideFromLegend) {
                var b = this, c = b.chart, e = b.useGraphSettings,
                    g = a.markerType;
                g && (e = !1);
                a.legendEntryWidth = b.markerSize;
                g || (g = b.markerType);
                var f = a.color, h = a.alpha;
                a.legendKeyColor && (f = a.legendKeyColor());
                a.legendKeyAlpha && (h = a.legendKeyAlpha());
                var k;
                !0 === a.hidden && (k = f = b.markerDisabledColor);
                var l = a.pattern, m, n = a.customMarker;
                n || (n = b.customMarker);
                var q = b.container, p = b.markerSize, t = 0, r = 0, w = p / 2;
                if (e) {
                    e = a.type;
                    b.switchType = void 0;
                    if ("line" == e || "step" == e || "smoothedLine" == e || "ohlc" == e) m = q.set(), a.hidden || (f = a.lineColorR, k = a.bulletBorderColorR), t = d.line(q, [0, 2 *
                    p], [p / 2, p / 2], f, a.lineAlpha, a.lineThickness, a.dashLength), d.setCN(c, t, "graph-stroke"), m.push(t), a.bullet && (a.hidden || (f = a.bulletColorR), t = d.bullet(q, a.bullet, a.bulletSize, f, a.bulletAlpha, a.bulletBorderThickness, k, a.bulletBorderAlpha)) && (d.setCN(c, t, "graph-bullet"), t.translate(p + 1, p / 2), m.push(t)), w = 0, t = p, r = p / 3; else {
                        a.getGradRotation && (m = a.getGradRotation(), 0 === m && (m = 180));
                        t = a.fillColorsR;
                        !0 === a.hidden && (t = f);
                        if (m = b.createMarker("rectangle", t, a.fillAlphas, a.lineThickness, f, a.lineAlpha, m, l, a.dashLength)) w =
                            p, m.translate(w, p / 2);
                        t = p
                    }
                    d.setCN(c, m, "graph-" + e);
                    d.setCN(c, m, "graph-" + a.id)
                } else if (n) m = q.image(n, 0, 0, p, p); else {
                    var z;
                    isNaN(b.gradientRotation) || (z = 180 + b.gradientRotation);
                    (m = b.createMarker(g, f, h, void 0, void 0, void 0, z, l)) && m.translate(p / 2, p / 2)
                }
                d.setCN(c, m, "legend-marker");
                b.addListeners(m, a);
                q = q.set([m]);
                b.switchable && a.switchable && q.setAttr("cursor", "pointer");
                void 0 !== a.id && d.setCN(c, q, "legend-item-" + a.id);
                d.setCN(c, q, a.className, !0);
                k = b.switchType;
                var x;
                k && "none" != k && 0 < p && ("x" == k ? (x = b.createX(),
                    x.translate(p / 2, p / 2)) : x = b.createV(), x.dItem = a, !0 !== a.hidden ? "x" == k ? x.hide() : x.show() : "x" != k && x.hide(), b.switchable || x.hide(), b.addListeners(x, a), a.legendSwitch = x, q.push(x), d.setCN(c, x, "legend-switch"));
                k = b.color;
                a.showBalloon && b.textClickEnabled && void 0 !== b.selectedColor && (k = b.selectedColor);
                b.useMarkerColorForLabels && !l && (k = f);
                !0 === a.hidden && (k = b.markerDisabledColor);
                f = d.massReplace(b.labelText, {"[[title]]": a.title});
                void 0 !== b.tabIndex && (q.setAttr("tabindex", b.tabIndex), q.setAttr("role", "menuitem"),
                    q.keyup(function (c) {
                        13 == c.keyCode && b.clickMarker(a, c)
                    }));
                c.accessible && b.accessibleLabel && (l = d.massReplace(b.accessibleLabel, {"[[title]]": a.title}), c.makeAccessible(q, l));
                l = b.fontSize;
                m && (p <= l && (p = p / 2 + b.ly - l / 2 + (l + 2 - p) / 2 - r, m.translate(w, p), x && x.translate(x.x, p)), a.legendEntryWidth = m.getBBox().width);
                var u;
                f && (f = d.fixBrakes(f), a.legendTextReal = f, u = b.labelWidth, u = isNaN(u) ? d.text(b.container, f, k, c.fontFamily, l, "start") : d.wrappedText(b.container, f, k, c.fontFamily, l, "start", !1, u, 0), d.setCN(c, u, "legend-label"),
                    u.translate(b.lx + t, b.ly), q.push(u), b.labelDx = t, c = u.getBBox().width, b.maxLabelWidth < c && (b.maxLabelWidth = c));
                b.entries[b.index] = q;
                a.legendEntry = b.entries[b.index];
                a.legendMarker = m;
                a.legendLabel = u;
                b.index++
            }
        }, addListeners: function (a, b) {
            var c = this;
            a && a.mouseover(function (a) {
                c.rollOverMarker(b, a)
            }).mouseout(function (a) {
                c.rollOutMarker(b, a)
            }).click(function (a) {
                c.clickMarker(b, a)
            })
        }, rollOverMarker: function (a, b) {
            this.switchable && this.dispatch("rollOverMarker", a, b);
            this.dispatch("rollOverItem", a, b)
        }, rollOutMarker: function (a,
                                    b) {
            this.switchable && this.dispatch("rollOutMarker", a, b);
            this.dispatch("rollOutItem", a, b)
        }, clickMarker: function (a, b) {
            this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b));
            this.dispatch("clickMarker", a, b)
        }, rollOverLabel: function (a, b) {
            a.hidden || this.textClickEnabled && a.legendLabel && a.legendLabel.attr({fill: this.rollOverColor});
            this.dispatch("rollOverItem", a, b)
        }, rollOutLabel: function (a, b) {
            if (!a.hidden && this.textClickEnabled && a.legendLabel) {
                var c = this.color;
                void 0 !==
                this.selectedColor && a.showBalloon && (c = this.selectedColor);
                this.useMarkerColorForLabels && (c = a.lineColor, void 0 === c && (c = a.color));
                a.legendLabel.attr({fill: c})
            }
            this.dispatch("rollOutItem", a, b)
        }, clickLabel: function (a, b) {
            this.textClickEnabled ? a.hidden || this.dispatch("clickLabel", a, b) : this.switchable && (!0 === a.hidden ? this.dispatch("showItem", a, b) : this.dispatch("hideItem", a, b))
        }, dispatch: function (a, b, c) {
            a = {type: a, dataItem: b, target: this, event: c, chart: this.chart};
            this.chart && this.chart.handleLegendEvent(a);
            this.fire(a)
        }, createValue: function (a) {
            var b = this, c = b.fontSize, e = b.chart;
            if (!1 !== a.visibleInLegend && !a.hideFromLegend) {
                var g = b.maxLabelWidth, f = 0;
                b.forceWidth && (g = b.labelWidth);
                b.equalWidths || (b.valueAlign = "left");
                f = {x: 0, y: 0, width: 0, height: 0};
                a.legendLabel && (f = a.legendLabel.getBBox());
                "left" == b.valueAlign && (g = f.width);
                var f = f.height, h = g, k = b.markerSize;
                k < c + 7 && (k = c + 7, d.VML && (k += 3));
                if (b.valueText && 0 < b.valueWidth) {
                    var l = b.color;
                    b.useMarkerColorForValues && (l = a.color, a.legendKeyColor && (l = a.legendKeyColor()));
                    !0 === a.hidden && (l = b.markerDisabledColor);
                    var m = b.valueText, g = g + b.lx + b.labelDx + b.markerLabelGap + b.valueWidth, n = "end";
                    "left" == b.valueAlign && (g -= b.valueWidth, n = "start");
                    c = d.text(b.container, m, l, b.chart.fontFamily, c, n);
                    d.setCN(e, c, "legend-value");
                    c.translate(g, b.ly);
                    b.entries[b.index].push(c);
                    h += b.valueWidth + 2 * b.markerLabelGap;
                    c.dItem = a;
                    b.valueLabels.push(c);
                    k < f + 5 && (k = f + 5)
                }
                b.index++;
                e = b.container.rect(a.legendEntryWidth, 0, h, k, 0, 0).attr({
                    stroke: "none",
                    fill: "#fff",
                    "fill-opacity": .005
                });
                e.dItem = a;
                b.entries[b.index -
                1].push(e);
                e.mouseover(function (c) {
                    b.rollOverLabel(a, c)
                }).mouseout(function (c) {
                    b.rollOutLabel(a, c)
                }).click(function (c) {
                    b.clickLabel(a, c)
                })
            }
        }, createV: function () {
            var a = this.markerSize;
            return d.polygon(this.container, [a / 5, a / 2, a - a / 5, a / 2], [a / 3, a - a / 5, a / 5, a / 1.7], this.switchColor)
        }, createX: function () {
            var a = (this.markerSize - 4) / 2, b = {stroke: this.switchColor, "stroke-width": 3}, c = this.container,
                e = d.line(c, [-a, a], [-a, a]).attr(b), a = d.line(c, [-a, a], [a, -a]).attr(b);
            return this.container.set([e, a])
        }, createMarker: function (a,
                                   b, c, e, g, f, h, k, l) {
            var m = this.markerSize, n = this.container;
            g || (g = this.markerBorderColor);
            g || (g = b);
            isNaN(e) && (e = this.markerBorderThickness);
            isNaN(f) && (f = this.markerBorderAlpha);
            return d.bullet(n, a, m, b, c, e, g, f, m, h, k, this.chart.path, l)
        }, validateNow: function () {
            this.invalidateSize()
        }, updateValues: function () {
            var a = this.valueLabels, b = this.chart, c, e = this.data;
            if (a) for (c = 0; c < a.length; c++) {
                var g = a[c], f = g.dItem;
                f.periodDataItem = void 0;
                f.periodPercentDataItem = void 0;
                var h = " ";
                if (e) f.value ? g.text(f.value) : g.text("");
                else {
                    var k = null;
                    if (void 0 !== f.type) {
                        var k = f.currentDataItem, l = this.periodValueText;
                        f.legendPeriodValueText && (l = f.legendPeriodValueText);
                        f.legendPeriodValueTextR && (l = f.legendPeriodValueTextR);
                        k ? (h = this.valueText, f.legendValueText && (h = f.legendValueText), f.legendValueTextR && (h = f.legendValueTextR), h = b.formatString(h, k)) : l && b.formatPeriodString && (l = d.massReplace(l, {"[[title]]": f.title}), h = b.formatPeriodString(l, f))
                    } else h = b.formatString(this.valueText, f);
                    l = f;
                    k && (l = k);
                    var m = this.valueFunction;
                    m && (h = m(l,
                        h, b.periodDataItem));
                    var n;
                    this.useMarkerColorForLabels && !k && f.lastDataItem && (k = f.lastDataItem);
                    k ? n = b.getBalloonColor(f, k) : f.legendKeyColor && (n = f.legendKeyColor());
                    f.legendColorFunction && (n = f.legendColorFunction(l, h, f.periodDataItem, f.periodPercentDataItem));
                    g.text(h);
                    if (!f.pattern && (this.useMarkerColorForValues && g.setAttr("fill", n), this.useMarkerColorForLabels)) {
                        if (g = f.legendMarker) g.setAttr("fill", n), g.setAttr("stroke", n);
                        (g = f.legendLabel) && (f.hidden ? g.setAttr("fill", this.markerDisabledColor) : g.setAttr("fill",
                            n))
                    }
                }
            }
        }, renderFix: function () {
            if (!d.VML && this.enabled) {
                var a = this.container;
                a && a.renderFix()
            }
        }, destroy: function () {
            this.div.innerHTML = "";
            d.remove(this.set)
        }
    })
})();
(function () {
    var d = window.AmCharts;
    d.formatMilliseconds = function (a, b) {
        if (-1 != a.indexOf("fff")) {
            var c = b.getMilliseconds(), d = String(c);
            10 > c && (d = "00" + c);
            10 <= c && 100 > c && (d = "0" + c);
            a = a.replace(/fff/g, d)
        }
        return a
    };
    d.extractPeriod = function (a) {
        var b = d.stripNumbers(a), c = 1;
        b != a && (c = Number(a.slice(0, a.indexOf(b))));
        return {period: b, count: c}
    };
    d.getDate = function (a, b, c) {
        return a instanceof Date ? d.newDate(a, c) : b && isNaN(a) ? d.stringToDate(a, b) : new Date(a)
    };
    d.daysInMonth = function (a) {
        return (new Date(a.getYear(), a.getMonth() +
            1, 0)).getDate()
    };
    d.newDate = function (a, b) {
        return b && -1 == b.indexOf("fff") ? new Date(a) : new Date(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds())
    };
    d.resetDateToMin = function (a, b, c, e) {
        void 0 === e && (e = 1);
        var g, f, h, k, l, m, n;
        d.useUTC ? (g = a.getUTCFullYear(), f = a.getUTCMonth(), h = a.getUTCDate(), k = a.getUTCHours(), l = a.getUTCMinutes(), m = a.getUTCSeconds(), n = a.getUTCMilliseconds(), a = a.getUTCDay()) : (g = a.getFullYear(), f = a.getMonth(), h = a.getDate(), k = a.getHours(), l =
            a.getMinutes(), m = a.getSeconds(), n = a.getMilliseconds(), a = a.getDay());
        switch (b) {
            case "YYYY":
                g = Math.floor(g / c) * c;
                f = 0;
                h = 1;
                n = m = l = k = 0;
                break;
            case "MM":
                f = Math.floor(f / c) * c;
                h = 1;
                n = m = l = k = 0;
                break;
            case "WW":
                h = a >= e ? h - a + e : h - (7 + a) + e;
                n = m = l = k = 0;
                break;
            case "DD":
                n = m = l = k = 0;
                break;
            case "hh":
                k = Math.floor(k / c) * c;
                n = m = l = 0;
                break;
            case "mm":
                l = Math.floor(l / c) * c;
                n = m = 0;
                break;
            case "ss":
                m = Math.floor(m / c) * c;
                n = 0;
                break;
            case "fff":
                n = Math.floor(n / c) * c
        }
        d.useUTC ? (a = new Date, a.setUTCFullYear(g, f, h), a.setUTCHours(k, l, m, n)) : a = new Date(g, f, h,
            k, l, m, n);
        return a
    };
    d.getPeriodDuration = function (a, b) {
        void 0 === b && (b = 1);
        var c;
        switch (a) {
            case "YYYY":
                c = 316224E5;
                break;
            case "MM":
                c = 26784E5;
                break;
            case "WW":
                c = 6048E5;
                break;
            case "DD":
                c = 864E5;
                break;
            case "hh":
                c = 36E5;
                break;
            case "mm":
                c = 6E4;
                break;
            case "ss":
                c = 1E3;
                break;
            case "fff":
                c = 1
        }
        return c * b
    };
    d.intervals = {
        s: {nextInterval: "ss", contains: 1E3},
        ss: {nextInterval: "mm", contains: 60, count: 0},
        mm: {nextInterval: "hh", contains: 60, count: 1},
        hh: {nextInterval: "DD", contains: 24, count: 2},
        DD: {nextInterval: "", contains: Infinity, count: 3}
    };
    d.getMaxInterval = function (a, b) {
        var c = d.intervals;
        return a >= c[b].contains ? (a = Math.round(a / c[b].contains), b = c[b].nextInterval, d.getMaxInterval(a, b)) : "ss" == b ? c[b].nextInterval : b
    };
    d.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
    d.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
    d.monthNames = "January February March April May June July August September October November December".split(" ");
    d.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
    d.getWeekNumber = function (a) {
        a = new Date(a);
        a.setHours(0, 0, 0);
        a.setDate(a.getDate() + 4 - (a.getDay() || 7));
        var b = new Date(a.getFullYear(), 0, 1);
        return Math.ceil(((a - b) / 864E5 + 1) / 7)
    };
    d.stringToDate = function (a, b) {
        var c = {}, e = [{pattern: "YYYY", period: "year"}, {pattern: "YY", period: "year"}, {
                pattern: "MM",
                period: "month"
            }, {pattern: "M", period: "month"}, {pattern: "DD", period: "date"}, {
                pattern: "D",
                period: "date"
            }, {pattern: "JJ", period: "hours"}, {pattern: "J", period: "hours"}, {
                pattern: "HH",
                period: "hours"
            }, {pattern: "H", period: "hours"},
                {pattern: "KK", period: "hours"}, {pattern: "K", period: "hours"}, {
                    pattern: "LL",
                    period: "hours"
                }, {pattern: "L", period: "hours"}, {pattern: "NN", period: "minutes"}, {
                    pattern: "N",
                    period: "minutes"
                }, {pattern: "SS", period: "seconds"}, {pattern: "S", period: "seconds"}, {
                    pattern: "QQQ",
                    period: "milliseconds"
                }, {pattern: "QQ", period: "milliseconds"}, {pattern: "Q", period: "milliseconds"}], g = !0,
            f = b.indexOf("AA");
        -1 != f && (a.substr(f, 2), "pm" == a.toLowerCase && (g = !1));
        var f = b, h, k, l;
        for (l = 0; l < e.length; l++) k = e[l].period, c[k] = 0, "date" == k && (c[k] =
            1);
        for (l = 0; l < e.length; l++) if (h = e[l].pattern, k = e[l].period, -1 != b.indexOf(h)) {
            var m = d.getFromDateString(h, a, f);
            b = b.replace(h, "");
            if ("KK" == h || "K" == h || "LL" == h || "L" == h) g || (m += 12);
            c[k] = m
        }
        d.useUTC ? (e = new Date, e.setUTCFullYear(c.year, c.month, c.date), e.setUTCHours(c.hours, c.minutes, c.seconds, c.milliseconds)) : e = new Date(c.year, c.month, c.date, c.hours, c.minutes, c.seconds, c.milliseconds);
        return e
    };
    d.getFromDateString = function (a, b, c) {
        if (void 0 !== b) return c = c.indexOf(a), b = String(b), b = b.substr(c, a.length), "0" == b.charAt(0) &&
        (b = b.substr(1, b.length - 1)), b = Number(b), isNaN(b) && (b = 0), -1 != a.indexOf("M") && b--, b
    };
    d.formatDate = function (a, b, c) {
        c || (c = d);
        var e, g, f, h, k, l, m, n, q = d.getWeekNumber(a);
        d.useUTC ? (e = a.getUTCFullYear(), g = a.getUTCMonth(), f = a.getUTCDate(), h = a.getUTCDay(), k = a.getUTCHours(), l = a.getUTCMinutes(), m = a.getUTCSeconds(), n = a.getUTCMilliseconds()) : (e = a.getFullYear(), g = a.getMonth(), f = a.getDate(), h = a.getDay(), k = a.getHours(), l = a.getMinutes(), m = a.getSeconds(), n = a.getMilliseconds());
        var p = String(e).substr(2, 2), t = "0" + h;
        b = b.replace(/W/g,
            q);
        q = k;
        24 == q && (q = 0);
        var r = q;
        10 > r && (r = "0" + r);
        b = b.replace(/JJ/g, r);
        b = b.replace(/J/g, q);
        r = k;
        0 === r && (r = 24, -1 != b.indexOf("H") && (f--, 0 === f && (e = new Date(a), e.setDate(e.getDate() - 1), g = e.getMonth(), f = e.getDate(), e = e.getFullYear())));
        a = g + 1;
        9 > g && (a = "0" + a);
        q = f;
        10 > f && (q = "0" + f);
        var w = r;
        10 > w && (w = "0" + w);
        b = b.replace(/HH/g, w);
        b = b.replace(/H/g, r);
        r = k;
        11 < r && (r -= 12);
        w = r;
        10 > w && (w = "0" + w);
        b = b.replace(/KK/g, w);
        b = b.replace(/K/g, r);
        r = k;
        0 === r && (r = 12);
        12 < r && (r -= 12);
        w = r;
        10 > w && (w = "0" + w);
        b = b.replace(/LL/g, w);
        b = b.replace(/L/g, r);
        r = l;
        10 > r && (r = "0" + r);
        b = b.replace(/NN/g, r);
        b = b.replace(/N/g, l);
        l = m;
        10 > l && (l = "0" + l);
        b = b.replace(/SS/g, l);
        b = b.replace(/S/g, m);
        m = n;
        10 > m ? m = "00" + m : 100 > m && (m = "0" + m);
        l = n;
        10 > l && (l = "00" + l);
        b = b.replace(/A/g, "@A@");
        b = b.replace(/QQQ/g, m);
        b = b.replace(/QQ/g, l);
        b = b.replace(/Q/g, n);
        b = b.replace(/YYYY/g, "@IIII@");
        b = b.replace(/YY/g, "@II@");
        b = b.replace(/MMMM/g, "@XXXX@");
        b = b.replace(/MMM/g, "@XXX@");
        b = b.replace(/MM/g, "@XX@");
        b = b.replace(/M/g, "@X@");
        b = b.replace(/DD/g, "@RR@");
        b = b.replace(/D/g, "@R@");
        b = b.replace(/EEEE/g, "@PPPP@");
        b = b.replace(/EEE/g, "@PPP@");
        b = b.replace(/EE/g, "@PP@");
        b = b.replace(/E/g, "@P@");
        b = b.replace(/@IIII@/g, e);
        b = b.replace(/@II@/g, p);
        b = b.replace(/@XXXX@/g, c.monthNames[g]);
        b = b.replace(/@XXX@/g, c.shortMonthNames[g]);
        b = b.replace(/@XX@/g, a);
        b = b.replace(/@X@/g, g + 1);
        b = b.replace(/@RR@/g, q);
        b = b.replace(/@R@/g, f);
        b = b.replace(/@PPPP@/g, c.dayNames[h]);
        b = b.replace(/@PPP@/g, c.shortDayNames[h]);
        b = b.replace(/@PP@/g, t);
        b = b.replace(/@P@/g, h);
        return b = 12 > k ? b.replace(/@A@/g, c.amString) : b.replace(/@A@/g, c.pmString)
    };
    d.changeDate =
        function (a, b, c, e, g) {
            if (d.useUTC) return d.changeUTCDate(a, b, c, e, g);
            var f = -1;
            void 0 === e && (e = !0);
            void 0 === g && (g = !1);
            !0 === e && (f = 1);
            switch (b) {
                case "YYYY":
                    a.setFullYear(a.getFullYear() + c * f);
                    e || g || a.setDate(a.getDate() + 1);
                    break;
                case "MM":
                    b = a.getMonth();
                    var h = a.getFullYear();
                    a.setMonth(b + c * f);
                    var k = a.getMonth();
                    if (e && k - b > c) for (; a.getMonth() - b > c;) a.setDate(a.getDate() - 1);
                    h == a.getFullYear() && a.getMonth() > b + c * f && a.setDate(a.getDate() - 1);
                    e || g || a.setDate(a.getDate() + 1);
                    break;
                case "DD":
                    a.setDate(a.getDate() + c *
                        f);
                    break;
                case "WW":
                    a.setDate(a.getDate() + c * f * 7);
                    break;
                case "hh":
                    a.setHours(a.getHours() + c * f);
                    break;
                case "mm":
                    a.setMinutes(a.getMinutes() + c * f);
                    break;
                case "ss":
                    a.setSeconds(a.getSeconds() + c * f);
                    break;
                case "fff":
                    a.setMilliseconds(a.getMilliseconds() + c * f)
            }
            return a
        };
    d.changeUTCDate = function (a, b, c, d, g) {
        var f = -1;
        void 0 === d && (d = !0);
        void 0 === g && (g = !1);
        !0 === d && (f = 1);
        switch (b) {
            case "YYYY":
                a.setUTCFullYear(a.getUTCFullYear() + c * f);
                d || g || a.setUTCDate(a.getUTCDate() + 1);
                break;
            case "MM":
                b = a.getUTCMonth();
                a.setUTCMonth(a.getUTCMonth() +
                    c * f);
                a.getUTCMonth() > b + c * f && a.setUTCDate(a.getUTCDate() - 1);
                d || g || a.setUTCDate(a.getUTCDate() + 1);
                break;
            case "DD":
                a.setUTCDate(a.getUTCDate() + c * f);
                break;
            case "WW":
                a.setUTCDate(a.getUTCDate() + c * f * 7);
                break;
            case "hh":
                a.setUTCHours(a.getUTCHours() + c * f);
                break;
            case "mm":
                a.setUTCMinutes(a.getUTCMinutes() + c * f);
                break;
            case "ss":
                a.setUTCSeconds(a.getUTCSeconds() + c * f);
                break;
            case "fff":
                a.setUTCMilliseconds(a.getUTCMilliseconds() + c * f)
        }
        return a
    }
})();
