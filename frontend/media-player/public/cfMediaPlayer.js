/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, W = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), G = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (W && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (r) => new lt(typeof r == "string" ? r : r + "", void 0, K), ft = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new lt(e, r, K);
}, $t = (r, t) => {
  if (W) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = R.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, Q = W ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ut(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: mt, defineProperty: vt, getOwnPropertyDescriptor: gt, getOwnPropertyNames: _t, getOwnPropertySymbols: yt, getPrototypeOf: bt } = Object, _ = globalThis, X = _.trustedTypes, wt = X ? X.emptyScript : "", B = _.reactiveElementPolyfillSupport, P = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? wt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, F = (r, t) => !mt(r, t), tt = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: F };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let S = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && vt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = gt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [..._t(e), ...yt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Q(s));
    } else t !== void 0 && e.push(Q(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $t(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : D).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : D;
      this._$Em = s, this[s] = a.fromAttribute(e, l.type) ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    var s;
    if (t !== void 0) {
      const o = this.constructor, n = this[t];
      if (i ?? (i = o.getPropertyOptions(t)), !((i.hasChanged ?? F)(n, e) || i.useDefault && i.reflect && n === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[P("elementProperties")] = /* @__PURE__ */ new Map(), S[P("finalized")] = /* @__PURE__ */ new Map(), B == null || B({ ReactiveElement: S }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, z = k.trustedTypes, et = z ? z.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ht = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, dt = "?" + g, At = `<${dt}>`, x = document, U = () => x.createComment(""), O = (r) => r === null || typeof r != "object" && typeof r != "function", J = Array.isArray, xt = (r) => J(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, st = />/g, b = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), rt = /'/g, ot = /"/g, ct = /^(?:script|style|textarea|title)$/i, St = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), v = St(1), E = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), w = x.createTreeWalker(x, 129);
function pt(r, t) {
  if (!J(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return et !== void 0 ? et.createHTML(t) : t;
}
const Et = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = T;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let d, u, h = -1, $ = 0;
    for (; $ < a.length && (n.lastIndex = $, u = n.exec(a), u !== null); ) $ = n.lastIndex, n === T ? u[1] === "!--" ? n = it : u[1] !== void 0 ? n = st : u[2] !== void 0 ? (ct.test(u[2]) && (s = RegExp("</" + u[2], "g")), n = b) : u[3] !== void 0 && (n = b) : n === b ? u[0] === ">" ? (n = s ?? T, h = -1) : u[1] === void 0 ? h = -2 : (h = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? b : u[3] === '"' ? ot : rt) : n === ot || n === rt ? n = b : n === it || n === st ? n = T : (n = b, s = void 0);
    const m = n === b && r[l + 1].startsWith("/>") ? " " : "";
    o += n === T ? a + At : h >= 0 ? (i.push(d), a.slice(0, h) + ht + a.slice(h) + g + m) : a + g + (h === -2 ? l : m);
  }
  return [pt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [d, u] = Et(t, e);
    if (this.el = H.createElement(d, i), w.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = w.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(ht)) {
          const $ = u[n++], m = s.getAttribute(h).split(g), L = /([.?@])?(.*)/.exec($);
          a.push({ type: 1, index: o, name: L[2], strings: m, ctor: L[1] === "." ? Tt : L[1] === "?" ? Pt : L[1] === "@" ? kt : j }), s.removeAttribute(h);
        } else h.startsWith(g) && (a.push({ type: 6, index: o }), s.removeAttribute(h));
        if (ct.test(s.tagName)) {
          const h = s.textContent.split(g), $ = h.length - 1;
          if ($ > 0) {
            s.textContent = z ? z.emptyScript : "";
            for (let m = 0; m < $; m++) s.append(h[m], U()), w.nextNode(), a.push({ type: 2, index: ++o });
            s.append(h[$], U());
          }
        }
      } else if (s.nodeType === 8) if (s.data === dt) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(g, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += g.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = x.createElement("template");
    return i.innerHTML = t, i;
  }
}
function C(r, t, e = r, i) {
  var n, l;
  if (t === E) return t;
  let s = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = C(r, s._$AS(r, t.values), s, i)), t;
}
class Ct {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? x).importNode(e, !0);
    w.currentNode = s;
    let o = w.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new N(o, o.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (d = new Mt(o, this, t)), this._$AV.push(d), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = w.nextNode(), n++);
    }
    return w.currentNode = x, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), O(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(pt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const n = new Ct(s, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new N(this.O(U()), this.O(U()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = C(this, t, e, 0), n = !O(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = o[0], a = 0; a < o.length - 1; a++) d = C(this, l[i + a], e, a), d === E && (d = this._$AH[a]), n || (n = !O(d) || d !== this._$AH[a]), d === c ? t = c : t !== c && (t += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Tt extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Pt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class kt extends j {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? c) === E) return;
    const i = this._$AH, s = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== c && (i === c || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Mt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const I = k.litHtmlPolyfillSupport;
I == null || I(H, N), (k.litHtmlVersions ?? (k.litHtmlVersions = [])).push("3.3.0");
const Ut = (r, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new N(t.insertBefore(U(), o), o, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis;
class M extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ut(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
var at;
M._$litElement$ = !0, M.finalized = !0, (at = A.litElementHydrateSupport) == null || at.call(A, { LitElement: M });
const q = A.litElementPolyfillSupport;
q == null || q({ LitElement: M });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: F }, Nt = (r = Ht, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, r);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Y(r) {
  return (t, e) => typeof e == "object" ? Nt(r, t, e) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(r) {
  return Y({ ...r, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = (r, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(r, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Z(r, t) {
  return (e, i, s) => {
    const o = (n) => {
      var l;
      return ((l = n.renderRoot) == null ? void 0 : l.querySelector(r)) ?? null;
    };
    return Lt(e, i, { get() {
      return o(this);
    } });
  };
}
var Rt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, f = (r, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Dt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = (i ? n(t, e, s) : n(s)) || s);
  return i && s && Rt(t, e, s), s;
};
let p = class extends M {
  constructor() {
    super(...arguments), this.src = "", this.subs = [], this._duration = 100, this._currentTime = 0, this._formattedTime = "", this._paused = !1, this._showControls = !1, this._timer = null, this._volume = 1, this._selectedSubtitle = { language: "", url: "" }, this.handleKeyDown = (r) => {
      switch (r.key) {
        case " ":
          r.preventDefault(), this.toggle();
          break;
        case "ArrowLeft":
          r.preventDefault(), this.video.currentTime = this.video.currentTime - 5;
          break;
        case "ArrowRight":
          r.preventDefault(), this.video.currentTime = this.video.currentTime + 5;
          break;
        case "ArrowUp":
          r.preventDefault(), this.video.volume >= 1 && (this.video.volume = 1), this.video.volume += 0.05, this._volume += 0.05;
          break;
        case "ArrowDown":
          r.preventDefault(), this.video.volume <= 0 && (this.video.volume = 0), this.video.volume -= 0.05, this._volume -= 0.05;
          break;
      }
    }, this.handleLoadedMetadata = () => {
      this._duration = this.video.duration;
    }, this.handleTimeUpdate = () => {
      this._currentTime = this.video.currentTime;
    };
  }
  firstUpdated() {
    this.video.addEventListener("loadedmetadata", this.handleLoadedMetadata), this.video.addEventListener("timeupdate", this.handleTimeUpdate), document.addEventListener("keydown", (r) => this.handleKeyDown(r)), this.video.play();
  }
  disconnectedCallback() {
    this.video.removeEventListener("loadedmetadata", this.handleLoadedMetadata), this.video.removeEventListener("timeupdate", this.handleTimeUpdate), document.removeEventListener("keydown", this.handleKeyDown);
  }
  onTimeUpdate() {
    this.video && (this._currentTime = this.video.currentTime, this._formattedTime = this.formatTime(this.video.currentTime));
  }
  onLoadedMetadata() {
    this.video && (this._duration = this.video.duration, this.video.play());
  }
  toggle() {
    this.video && (this.video.paused ? (this.video.play(), this._paused = !1) : (this.video.pause(), this._paused = !0));
  }
  formatTime(r) {
    const t = Math.floor(r / 3600), e = Math.floor(r % 3600 / 60), i = Math.floor(r % 60), s = (o) => String(o).padStart(2, "0");
    return `${s(t)}:${s(e)}:${s(i)}`;
  }
  seek(r) {
    if (r.preventDefault(), this.video) {
      const t = r.target.valueAsNumber;
      this.video.currentTime = t, this._currentTime = t;
    }
  }
  handleVolumeChange(r) {
    r.preventDefault(), this.video && (this.video.volume = parseFloat(this.volumeSlider.value), this._volume = parseFloat(this.volumeSlider.value));
  }
  onMouseMove(r) {
    r.preventDefault(), clearTimeout(this._timer), this._timer = setTimeout(() => {
      this._showControls = !1;
    }, 3e3), this._showControls = !0;
  }
  switchSubtitle(r) {
    if (r === 1e12) {
      this._selectedSubtitle = { language: "", url: "" };
      return;
    }
    const t = this.subs[r];
    this._selectedSubtitle = t;
  }
  render() {
    const r = v`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        class="bi bi-volume-up-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"
        />
        <path
          d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"
        />
        <path
          d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"
        />
      </svg>
    `, t = v`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        class="bi bi-skip-start-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0z"
        />
      </svg>
    `, e = v`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        class="bi bi-skip-end-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0z"
        />
      </svg>
    `, i = v`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        class="bi bi-pause"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"
          stroke="white"
          stroke-width="1.25"
        />
      </svg>
    `, s = v`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        class="bi bi-play-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
        />
      </svg>
    `, o = v`
      <div class="controls">
        <div id="left-controls" class="lower-control-left">
          <button id="jump-start" class="play-pause">${t}</button>
          <button class="play-pause" @click=${this.toggle}>
            ${this._paused ? s : i}
          </button>
          <button id="jump-end" class="play-pause">${e}</button>
          <p
            style="margin: 0; padding: 0; padding-right: 8px; color: white; font-size: 0.75rem; display: flex;"
          >
            ${this._formattedTime}/${this.formatTime(this._duration)}
          </p>
        </div>
        <div id="center-control" class="upper-control">
          <input
            class="media-slider"
            id="range"
            type="range"
            step="0.1"
            min="0"
            .value=${String(this._currentTime)}
            max="${this._duration}"
            @input=${this.seek}
            style="width: 100%;"
          />
        </div>
        <div id="right-controls" class="lower-control-left">
          <select id="subs">
            <option @click=${() => this.switchSubtitle(1e12)}>
              None
            </option>
            ${this.subs.map(
      (n, l) => v`<option @click=${() => this.switchSubtitle(l)}>
                  ${n.language}
                </option>`
    )}
          </select>
          <button class="play-pause">${r}</button>
          <input
            style="height: 8px; width: 100px; margin-right: 4px;"
            class="media-slider"
            id="volume"
            min="0"
            max="1"
            step="0.01"
            type="range"
            @input=${this.handleVolumeChange}
            .value=${String(this._volume)}
          />
        </div>
      </div>
    `;
    return v`
      <div class="movie">
        <video
          id="video"
          class="video"
          @timeupdate=${this.onTimeUpdate}
          @loadedmetadata=${this.onLoadedMetadata}
          @click=${this.toggle}
          @mousemove=${this.onMouseMove}
        >
          <source src=${this.src} type="video/mp4" />
          <track
            label=${this._selectedSubtitle.language}
            kind="subtitles"
            srclang=${this._selectedSubtitle.language}
            src=${this._selectedSubtitle.url}
          />
        </video>
      </div>
      ${this._showControls ? o : null}
    `;
  }
};
p.styles = ft`
    .media-slider {
      height: 12px;
      appearance: none;
      background-color: rgba(48, 48, 48, 0.25);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      overflow: hidden;
    }
    .media-slider::-moz-range-thumb {
      appearance: none;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: -1207px 0 0 1200px white;
    }
    .media-slider::-webkit-slider-thumb {
      appearance: none;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: -1207px 0 0 1200px white;
    }

    .movie {
      z-index: 10;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      background-color: black;
    }
    .video {
      margin: 0;
      width: 100%;
      height: 100%;
    }

    .controls {
      margin-inline: 8px;
      padding: 4px;
      padding-right: 10px;
      z-index: 20;
      bottom: 2rem;
      gap: 8px;
      display: flex;
      flex-direction: row;
      position: fixed;
      width: calc(100% - 16px);
      animation: controls-fly 0.2s ease-in-out;
      box-sizing: border-box;
    }

    .upper-control {
      display: flex;
      align-items: center;
      padding: 8px;
      padding-inline: 10px;
      width: calc(100% - 8px);
      border-radius: 20px;
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    .lower-control {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      border-radius: 20px;
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    .lower-control-left {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 4px;
      padding-inline: 8px;
      border-radius: 20px;
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    select {
      color: white;
      padding: 5px;
      border: none;
      border-radius: 999px;
      background-color: transparent;
    }

    select:hover {
      background-color: rgba(48, 48, 48, 0.5);
      backdrop-filter: blur(10px);
    }

    .play-pause {
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
      border-radius: 999px;
    }
    .play-pause:hover {
      background-color: rgba(48, 48, 48, 0.25);
      backdrop-filter: blur(10px);
    }

    @keyframes controls-fly {
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
      0% {
        transform: translateY(50px);
        opacity: 0;
      }
    }
  `;
f([
  Y()
], p.prototype, "src", 2);
f([
  Y({ type: Array })
], p.prototype, "subs", 2);
f([
  y()
], p.prototype, "_duration", 2);
f([
  y()
], p.prototype, "_currentTime", 2);
f([
  y()
], p.prototype, "_formattedTime", 2);
f([
  y()
], p.prototype, "_paused", 2);
f([
  y()
], p.prototype, "_showControls", 2);
f([
  y()
], p.prototype, "_timer", 2);
f([
  y()
], p.prototype, "_volume", 2);
f([
  y()
], p.prototype, "_selectedSubtitle", 2);
f([
  Z("#video")
], p.prototype, "video", 2);
f([
  Z("#range")
], p.prototype, "seekSlider", 2);
f([
  Z("#volume")
], p.prototype, "volumeSlider", 2);
p = f([
  Ot("cf-media-player")
], p);
const Bt = p;
export {
  Bt as default
};
