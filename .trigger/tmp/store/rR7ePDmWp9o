import {
  task
} from "./chunk-NL3CHZZW.mjs";
import {
  __commonJS,
  __name,
  __require,
  __toESM,
  init_esm
} from "./chunk-244PAGAH.mjs";

// node_modules/@prisma/client/runtime/library.js
var require_library = __commonJS({
  "node_modules/@prisma/client/runtime/library.js"(exports, module) {
    "use strict";
    init_esm();
    var Ll = Object.create;
    var Rt = Object.defineProperty;
    var Nl = Object.getOwnPropertyDescriptor;
    var Ol = Object.getOwnPropertyNames;
    var Fl = Object.getPrototypeOf;
    var Ml = Object.prototype.hasOwnProperty;
    var X = /* @__PURE__ */ __name((e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports), "X");
    var Nr = /* @__PURE__ */ __name((e, r) => {
      for (var t in r) Rt(e, t, { get: r[t], enumerable: true });
    }, "Nr");
    var ro = /* @__PURE__ */ __name((e, r, t, n) => {
      if (r && typeof r == "object" || typeof r == "function") for (let i of Ol(r)) !Ml.call(e, i) && i !== t && Rt(e, i, { get: /* @__PURE__ */ __name(() => r[i], "get"), enumerable: !(n = Nl(r, i)) || n.enumerable });
      return e;
    }, "ro");
    var _ = /* @__PURE__ */ __name((e, r, t) => (t = e != null ? Ll(Fl(e)) : {}, ro(r || !e || !e.__esModule ? Rt(t, "default", { value: e, enumerable: true }) : t, e)), "_");
    var $l = /* @__PURE__ */ __name((e) => ro(Rt({}, "__esModule", { value: true }), e), "$l");
    var Eo = X((Cd, Bn) => {
      "use strict";
      var v = Bn.exports;
      Bn.exports.default = v;
      var D = "\x1B[", qr = "\x1B]", mr = "\x07", Lt = ";", yo = process.env.TERM_PROGRAM === "Apple_Terminal";
      v.cursorTo = (e, r) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        return typeof r != "number" ? D + (e + 1) + "G" : D + (r + 1) + ";" + (e + 1) + "H";
      };
      v.cursorMove = (e, r) => {
        if (typeof e != "number") throw new TypeError("The `x` argument is required");
        let t = "";
        return e < 0 ? t += D + -e + "D" : e > 0 && (t += D + e + "C"), r < 0 ? t += D + -r + "A" : r > 0 && (t += D + r + "B"), t;
      };
      v.cursorUp = (e = 1) => D + e + "A";
      v.cursorDown = (e = 1) => D + e + "B";
      v.cursorForward = (e = 1) => D + e + "C";
      v.cursorBackward = (e = 1) => D + e + "D";
      v.cursorLeft = D + "G";
      v.cursorSavePosition = yo ? "\x1B7" : D + "s";
      v.cursorRestorePosition = yo ? "\x1B8" : D + "u";
      v.cursorGetPosition = D + "6n";
      v.cursorNextLine = D + "E";
      v.cursorPrevLine = D + "F";
      v.cursorHide = D + "?25l";
      v.cursorShow = D + "?25h";
      v.eraseLines = (e) => {
        let r = "";
        for (let t = 0; t < e; t++) r += v.eraseLine + (t < e - 1 ? v.cursorUp() : "");
        return e && (r += v.cursorLeft), r;
      };
      v.eraseEndLine = D + "K";
      v.eraseStartLine = D + "1K";
      v.eraseLine = D + "2K";
      v.eraseDown = D + "J";
      v.eraseUp = D + "1J";
      v.eraseScreen = D + "2J";
      v.scrollUp = D + "S";
      v.scrollDown = D + "T";
      v.clearScreen = "\x1Bc";
      v.clearTerminal = process.platform === "win32" ? `${v.eraseScreen}${D}0f` : `${v.eraseScreen}${D}3J${D}H`;
      v.beep = mr;
      v.link = (e, r) => [qr, "8", Lt, Lt, r, mr, e, qr, "8", Lt, Lt, mr].join("");
      v.image = (e, r = {}) => {
        let t = `${qr}1337;File=inline=1`;
        return r.width && (t += `;width=${r.width}`), r.height && (t += `;height=${r.height}`), r.preserveAspectRatio === false && (t += ";preserveAspectRatio=0"), t + ":" + e.toString("base64") + mr;
      };
      v.iTerm = { setCwd: /* @__PURE__ */ __name((e = process.cwd()) => `${qr}50;CurrentDir=${e}${mr}`, "setCwd"), annotation: /* @__PURE__ */ __name((e, r = {}) => {
        let t = `${qr}1337;`, n = typeof r.x < "u", i = typeof r.y < "u";
        if ((n || i) && !(n && i && typeof r.length < "u")) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
        return e = e.replace(/\|/g, ""), t += r.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", r.length > 0 ? t += (n ? [e, r.length, r.x, r.y] : [r.length, e]).join("|") : t += e, t + mr;
      }, "annotation") };
    });
    var Vn = X((Sd, bo) => {
      "use strict";
      bo.exports = (e, r = process.argv) => {
        let t = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = r.indexOf(t + e), i = r.indexOf("--");
        return n !== -1 && (i === -1 || n < i);
      };
    });
    var Po = X((Rd, xo) => {
      "use strict";
      var uu = __require("os"), wo = __require("tty"), pe = Vn(), { env: G } = process, Ve;
      pe("no-color") || pe("no-colors") || pe("color=false") || pe("color=never") ? Ve = 0 : (pe("color") || pe("colors") || pe("color=true") || pe("color=always")) && (Ve = 1);
      "FORCE_COLOR" in G && (G.FORCE_COLOR === "true" ? Ve = 1 : G.FORCE_COLOR === "false" ? Ve = 0 : Ve = G.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(G.FORCE_COLOR, 10), 3));
      function jn(e) {
        return e === 0 ? false : { level: e, hasBasic: true, has256: e >= 2, has16m: e >= 3 };
      }
      __name(jn, "jn");
      function Un(e, r) {
        if (Ve === 0) return 0;
        if (pe("color=16m") || pe("color=full") || pe("color=truecolor")) return 3;
        if (pe("color=256")) return 2;
        if (e && !r && Ve === void 0) return 0;
        let t = Ve || 0;
        if (G.TERM === "dumb") return t;
        if (process.platform === "win32") {
          let n = uu.release().split(".");
          return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? Number(n[2]) >= 14931 ? 3 : 2 : 1;
        }
        if ("CI" in G) return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((n) => n in G) || G.CI_NAME === "codeship" ? 1 : t;
        if ("TEAMCITY_VERSION" in G) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(G.TEAMCITY_VERSION) ? 1 : 0;
        if (G.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in G) {
          let n = parseInt((G.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (G.TERM_PROGRAM) {
            case "iTerm.app":
              return n >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        return /-256(color)?$/i.test(G.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(G.TERM) || "COLORTERM" in G ? 1 : t;
      }
      __name(Un, "Un");
      function cu(e) {
        let r = Un(e, e && e.isTTY);
        return jn(r);
      }
      __name(cu, "cu");
      xo.exports = { supportsColor: cu, stdout: jn(Un(true, wo.isatty(1))), stderr: jn(Un(true, wo.isatty(2))) };
    });
    var Co = X((Ad, To) => {
      "use strict";
      var pu = Po(), dr = Vn();
      function vo(e) {
        if (/^\d{3,4}$/.test(e)) {
          let t = /(\d{1,2})(\d{2})/.exec(e);
          return { major: 0, minor: parseInt(t[1], 10), patch: parseInt(t[2], 10) };
        }
        let r = (e || "").split(".").map((t) => parseInt(t, 10));
        return { major: r[0], minor: r[1], patch: r[2] };
      }
      __name(vo, "vo");
      function Qn(e) {
        let { env: r } = process;
        if ("FORCE_HYPERLINK" in r) return !(r.FORCE_HYPERLINK.length > 0 && parseInt(r.FORCE_HYPERLINK, 10) === 0);
        if (dr("no-hyperlink") || dr("no-hyperlinks") || dr("hyperlink=false") || dr("hyperlink=never")) return false;
        if (dr("hyperlink=true") || dr("hyperlink=always") || "NETLIFY" in r) return true;
        if (!pu.supportsColor(e) || e && !e.isTTY || process.platform === "win32" || "CI" in r || "TEAMCITY_VERSION" in r) return false;
        if ("TERM_PROGRAM" in r) {
          let t = vo(r.TERM_PROGRAM_VERSION);
          switch (r.TERM_PROGRAM) {
            case "iTerm.app":
              return t.major === 3 ? t.minor >= 1 : t.major > 3;
            case "WezTerm":
              return t.major >= 20200620;
            case "vscode":
              return t.major > 1 || t.major === 1 && t.minor >= 72;
          }
        }
        if ("VTE_VERSION" in r) {
          if (r.VTE_VERSION === "0.50.0") return false;
          let t = vo(r.VTE_VERSION);
          return t.major > 0 || t.minor >= 50;
        }
        return false;
      }
      __name(Qn, "Qn");
      To.exports = { supportsHyperlink: Qn, stdout: Qn(process.stdout), stderr: Qn(process.stderr) };
    });
    var Ro = X((Id, Br) => {
      "use strict";
      var mu = Eo(), Gn = Co(), So = /* @__PURE__ */ __name((e, r, { target: t = "stdout", ...n } = {}) => Gn[t] ? mu.link(e, r) : n.fallback === false ? e : typeof n.fallback == "function" ? n.fallback(e, r) : `${e} (​${r}​)`, "So");
      Br.exports = (e, r, t = {}) => So(e, r, t);
      Br.exports.stderr = (e, r, t = {}) => So(e, r, { target: "stderr", ...t });
      Br.exports.isSupported = Gn.stdout;
      Br.exports.stderr.isSupported = Gn.stderr;
    });
    var Mo = X((Jd, Ru) => {
      Ru.exports = { name: "dotenv", version: "16.0.3", description: "Loads environment variables from .env file", main: "lib/main.js", types: "lib/main.d.ts", exports: { ".": { require: "./lib/main.js", types: "./lib/main.d.ts", default: "./lib/main.js" }, "./config": "./config.js", "./config.js": "./config.js", "./lib/env-options": "./lib/env-options.js", "./lib/env-options.js": "./lib/env-options.js", "./lib/cli-options": "./lib/cli-options.js", "./lib/cli-options.js": "./lib/cli-options.js", "./package.json": "./package.json" }, scripts: { "dts-check": "tsc --project tests/types/tsconfig.json", lint: "standard", "lint-readme": "standard-markdown", pretest: "npm run lint && npm run dts-check", test: "tap tests/*.js --100 -Rspec", prerelease: "npm test", release: "standard-version" }, repository: { type: "git", url: "git://github.com/motdotla/dotenv.git" }, keywords: ["dotenv", "env", ".env", "environment", "variables", "config", "settings"], readmeFilename: "README.md", license: "BSD-2-Clause", devDependencies: { "@types/node": "^17.0.9", decache: "^4.6.1", dtslint: "^3.7.0", sinon: "^12.0.1", standard: "^16.0.4", "standard-markdown": "^7.1.0", "standard-version": "^9.3.2", tap: "^15.1.6", tar: "^6.1.11", typescript: "^4.5.4" }, engines: { node: ">=12" } };
    });
    var qo = X((Hd, $t) => {
      "use strict";
      var Au = __require("fs"), $o = __require("path"), Iu = __require("os"), _u = Mo(), ku = _u.version, Du = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
      function Lu(e) {
        let r = {}, t = e.toString();
        t = t.replace(/\r\n?/mg, `
`);
        let n;
        for (; (n = Du.exec(t)) != null; ) {
          let i = n[1], o = n[2] || "";
          o = o.trim();
          let s = o[0];
          o = o.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), s === '"' && (o = o.replace(/\\n/g, `
`), o = o.replace(/\\r/g, "\r")), r[i] = o;
        }
        return r;
      }
      __name(Lu, "Lu");
      function Wn(e) {
        console.log(`[dotenv@${ku}][DEBUG] ${e}`);
      }
      __name(Wn, "Wn");
      function Nu(e) {
        return e[0] === "~" ? $o.join(Iu.homedir(), e.slice(1)) : e;
      }
      __name(Nu, "Nu");
      function Ou(e) {
        let r = $o.resolve(process.cwd(), ".env"), t = "utf8", n = !!(e && e.debug), i = !!(e && e.override);
        e && (e.path != null && (r = Nu(e.path)), e.encoding != null && (t = e.encoding));
        try {
          let o = Mt.parse(Au.readFileSync(r, { encoding: t }));
          return Object.keys(o).forEach(function(s) {
            Object.prototype.hasOwnProperty.call(process.env, s) ? (i === true && (process.env[s] = o[s]), n && Wn(i === true ? `"${s}" is already defined in \`process.env\` and WAS overwritten` : `"${s}" is already defined in \`process.env\` and was NOT overwritten`)) : process.env[s] = o[s];
          }), { parsed: o };
        } catch (o) {
          return n && Wn(`Failed to load ${r} ${o.message}`), { error: o };
        }
      }
      __name(Ou, "Ou");
      var Mt = { config: Ou, parse: Lu };
      $t.exports.config = Mt.config;
      $t.exports.parse = Mt.parse;
      $t.exports = Mt;
    });
    var Go = X((ef, Qo) => {
      "use strict";
      Qo.exports = (e) => {
        let r = e.match(/^[ \t]*(?=\S)/gm);
        return r ? r.reduce((t, n) => Math.min(t, n.length), 1 / 0) : 0;
      };
    });
    var Ho = X((rf, Jo) => {
      "use strict";
      var qu = Go();
      Jo.exports = (e) => {
        let r = qu(e);
        if (r === 0) return e;
        let t = new RegExp(`^[ \\t]{${r}}`, "gm");
        return e.replace(t, "");
      };
    });
    var Yn = X((tf, Bu) => {
      Bu.exports = { name: "@prisma/engines-version", version: "5.10.0-34.5a9203d0590c951969e85a7d07215503f4672eb9", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "5a9203d0590c951969e85a7d07215503f4672eb9" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.15", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Zn = X((Bt) => {
      "use strict";
      Object.defineProperty(Bt, "__esModule", { value: true });
      Bt.enginesVersion = void 0;
      Bt.enginesVersion = Yn().prisma.enginesVersion;
    });
    var ni = X((Rf, zo) => {
      "use strict";
      zo.exports = (e, r = 1, t) => {
        if (t = { indent: " ", includeEmptyLines: false, ...t }, typeof e != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e}\``);
        if (typeof r != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof r}\``);
        if (typeof t.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof t.indent}\``);
        if (r === 0) return e;
        let n = t.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return e.replace(n, t.indent.repeat(r));
      };
    });
    var es = X((_f, Xo) => {
      "use strict";
      Xo.exports = ({ onlyFirst: e = false } = {}) => {
        let r = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(r, e ? void 0 : "g");
      };
    });
    var ai = X((kf, rs) => {
      "use strict";
      var zu = es();
      rs.exports = (e) => typeof e == "string" ? e.replace(zu(), "") : e;
    });
    var ts = X((Nf, jt) => {
      "use strict";
      jt.exports = (e = {}) => {
        let r;
        if (e.repoUrl) r = e.repoUrl;
        else if (e.user && e.repo) r = `https://github.com/${e.user}/${e.repo}`;
        else throw new Error("You need to specify either the `repoUrl` option or both the `user` and `repo` options");
        let t = new URL(`${r}/issues/new`), n = ["body", "title", "labels", "template", "milestone", "assignee", "projects"];
        for (let i of n) {
          let o = e[i];
          if (o !== void 0) {
            if (i === "labels" || i === "projects") {
              if (!Array.isArray(o)) throw new TypeError(`The \`${i}\` option should be an array`);
              o = o.join(",");
            }
            t.searchParams.set(i, o);
          }
        }
        return t.toString();
      };
      jt.exports.default = jt.exports;
    });
    var Ji = X((x0, $a) => {
      "use strict";
      $a.exports = /* @__PURE__ */ function() {
        function e(r, t, n, i, o) {
          return r < t || n < t ? r > n ? n + 1 : r + 1 : i === o ? t : t + 1;
        }
        __name(e, "e");
        return function(r, t) {
          if (r === t) return 0;
          if (r.length > t.length) {
            var n = r;
            r = t, t = n;
          }
          for (var i = r.length, o = t.length; i > 0 && r.charCodeAt(i - 1) === t.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && r.charCodeAt(s) === t.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a = 0, l, u, c, p, m, f, g, h, A, T, C, E, I = [];
          for (l = 0; l < i; l++) I.push(l + 1), I.push(r.charCodeAt(s + l));
          for (var me = I.length - 1; a < o - 3; ) for (A = t.charCodeAt(s + (u = a)), T = t.charCodeAt(s + (c = a + 1)), C = t.charCodeAt(s + (p = a + 2)), E = t.charCodeAt(s + (m = a + 3)), f = a += 4, l = 0; l < me; l += 2) g = I[l], h = I[l + 1], u = e(g, u, c, A, h), c = e(u, c, p, T, h), p = e(c, p, m, C, h), f = e(p, m, f, E, h), I[l] = f, m = p, p = c, c = u, u = g;
          for (; a < o; ) for (A = t.charCodeAt(s + (u = a)), f = ++a, l = 0; l < me; l += 2) g = I[l], I[l] = f = e(g, u, f, A, I[l + 1]), u = g;
          return f;
        };
      }();
    });
    var id = {};
    Nr(id, { Debug: /* @__PURE__ */ __name(() => Nn, "Debug"), Decimal: /* @__PURE__ */ __name(() => Te, "Decimal"), Extensions: /* @__PURE__ */ __name(() => kn, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => hr, "MetricsClient"), NotFoundError: /* @__PURE__ */ __name(() => Le, "NotFoundError"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => S, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => V, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => ue, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => j, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => K, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => Dn, "Public"), Sql: /* @__PURE__ */ __name(() => oe, "Sql"), defineDmmfProperty: /* @__PURE__ */ __name(() => is, "defineDmmfProperty"), detectRuntime: /* @__PURE__ */ __name(() => fn, "detectRuntime"), empty: /* @__PURE__ */ __name(() => ss, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => _l, "getPrismaClient"), join: /* @__PURE__ */ __name(() => os, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => kl, "makeStrictEnum"), objectEnumValues: /* @__PURE__ */ __name(() => Gt, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => hi, "raw"), sqltag: /* @__PURE__ */ __name(() => yi, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => Dl, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => Wr, "warnOnce") });
    module.exports = $l(id);
    var kn = {};
    Nr(kn, { defineExtension: /* @__PURE__ */ __name(() => to, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => no, "getExtensionContext") });
    function to(e) {
      return typeof e == "function" ? e : (r) => r.$extends(e);
    }
    __name(to, "to");
    function no(e) {
      return e;
    }
    __name(no, "no");
    var Dn = {};
    Nr(Dn, { validator: /* @__PURE__ */ __name(() => io, "validator") });
    function io(...e) {
      return (r) => r;
    }
    __name(io, "io");
    var At = {};
    Nr(At, { $: /* @__PURE__ */ __name(() => uo, "$"), bgBlack: /* @__PURE__ */ __name(() => Wl, "bgBlack"), bgBlue: /* @__PURE__ */ __name(() => Zl, "bgBlue"), bgCyan: /* @__PURE__ */ __name(() => eu, "bgCyan"), bgGreen: /* @__PURE__ */ __name(() => zl, "bgGreen"), bgMagenta: /* @__PURE__ */ __name(() => Xl, "bgMagenta"), bgRed: /* @__PURE__ */ __name(() => Kl, "bgRed"), bgWhite: /* @__PURE__ */ __name(() => ru, "bgWhite"), bgYellow: /* @__PURE__ */ __name(() => Yl, "bgYellow"), black: /* @__PURE__ */ __name(() => Ql, "black"), blue: /* @__PURE__ */ __name(() => Ye, "blue"), bold: /* @__PURE__ */ __name(() => W, "bold"), cyan: /* @__PURE__ */ __name(() => _e, "cyan"), dim: /* @__PURE__ */ __name(() => Ie, "dim"), gray: /* @__PURE__ */ __name(() => Or, "gray"), green: /* @__PURE__ */ __name(() => Me, "green"), grey: /* @__PURE__ */ __name(() => Hl, "grey"), hidden: /* @__PURE__ */ __name(() => jl, "hidden"), inverse: /* @__PURE__ */ __name(() => Vl, "inverse"), italic: /* @__PURE__ */ __name(() => Bl, "italic"), magenta: /* @__PURE__ */ __name(() => Gl, "magenta"), red: /* @__PURE__ */ __name(() => ce, "red"), reset: /* @__PURE__ */ __name(() => ql, "reset"), strikethrough: /* @__PURE__ */ __name(() => Ul, "strikethrough"), underline: /* @__PURE__ */ __name(() => ee, "underline"), white: /* @__PURE__ */ __name(() => Jl, "white"), yellow: /* @__PURE__ */ __name(() => de, "yellow") });
    var Ln;
    var oo;
    var so;
    var ao;
    var lo = true;
    typeof process < "u" && ({ FORCE_COLOR: Ln, NODE_DISABLE_COLORS: oo, NO_COLOR: so, TERM: ao } = process.env || {}, lo = process.stdout && process.stdout.isTTY);
    var uo = { enabled: !oo && so == null && ao !== "dumb" && (Ln != null && Ln !== "0" || lo) };
    function F(e, r) {
      let t = new RegExp(`\\x1b\\[${r}m`, "g"), n = `\x1B[${e}m`, i = `\x1B[${r}m`;
      return function(o) {
        return !uo.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(t, i + n) : o) + i;
      };
    }
    __name(F, "F");
    var ql = F(0, 0);
    var W = F(1, 22);
    var Ie = F(2, 22);
    var Bl = F(3, 23);
    var ee = F(4, 24);
    var Vl = F(7, 27);
    var jl = F(8, 28);
    var Ul = F(9, 29);
    var Ql = F(30, 39);
    var ce = F(31, 39);
    var Me = F(32, 39);
    var de = F(33, 39);
    var Ye = F(34, 39);
    var Gl = F(35, 39);
    var _e = F(36, 39);
    var Jl = F(37, 39);
    var Or = F(90, 39);
    var Hl = F(90, 39);
    var Wl = F(40, 49);
    var Kl = F(41, 49);
    var zl = F(42, 49);
    var Yl = F(43, 49);
    var Zl = F(44, 49);
    var Xl = F(45, 49);
    var eu = F(46, 49);
    var ru = F(47, 49);
    var tu = 100;
    var co = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Fr = [];
    var po = Date.now();
    var nu = 0;
    globalThis.DEBUG ?? (globalThis.DEBUG = process.env.DEBUG ?? "");
    globalThis.DEBUG_COLORS ?? (globalThis.DEBUG_COLORS = process.env.DEBUG_COLORS ? process.env.DEBUG_COLORS === "true" : true);
    var Mr = { enable(e) {
      typeof e == "string" && (globalThis.DEBUG = e);
    }, disable() {
      let e = globalThis.DEBUG;
      return globalThis.DEBUG = "", e;
    }, enabled(e) {
      let r = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), t = r.some((i) => i === "" || i[0] === "-" ? false : e.match(RegExp(i.split("*").join(".*") + "$"))), n = r.some((i) => i === "" || i[0] !== "-" ? false : e.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return t && !n;
    }, log: /* @__PURE__ */ __name((...e) => {
      let [r, t, ...n] = e, i;
      typeof __require == "function" && typeof process < "u" && typeof process.stderr < "u" && typeof process.stderr.write == "function" ? i = /* @__PURE__ */ __name((...o) => {
        let s = __require("util");
        process.stderr.write(s.format(...o) + `
`);
      }, "i") : i = console.warn ?? console.log, i(`${r} ${t}`, ...n);
    }, "log"), formatters: {} };
    function iu(e) {
      let r = { color: co[nu++ % co.length], enabled: Mr.enabled(e), namespace: e, log: Mr.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, t = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = r;
        if (n.length !== 0 && Fr.push([o, ...n]), Fr.length > tu && Fr.shift(), Mr.enabled(o) || i) {
          let l = n.map((c) => typeof c == "string" ? c : ou(c)), u = `+${Date.now() - po}ms`;
          po = Date.now(), globalThis.DEBUG_COLORS ? a(At[s](W(o)), ...l, At[s](u)) : a(o, ...l, u);
        }
      }, "t");
      return new Proxy(t, { get: /* @__PURE__ */ __name((n, i) => r[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => r[i] = o, "set") });
    }
    __name(iu, "iu");
    var Nn = new Proxy(iu, { get: /* @__PURE__ */ __name((e, r) => Mr[r], "get"), set: /* @__PURE__ */ __name((e, r, t) => Mr[r] = t, "set") });
    function ou(e, r = 2) {
      let t = /* @__PURE__ */ new Set();
      return JSON.stringify(e, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (t.has(i)) return "[Circular *]";
          t.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, r);
    }
    __name(ou, "ou");
    function mo(e = 7500) {
      let r = Fr.map(([t, ...n]) => `${t} ${n.map((i) => typeof i == "string" ? i : JSON.stringify(i)).join(" ")}`).join(`
`);
      return r.length < e ? r : r.slice(-e);
    }
    __name(mo, "mo");
    function fo() {
      Fr.length = 0;
    }
    __name(fo, "fo");
    var N = Nn;
    var go = _(__require("fs"));
    function On() {
      let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY;
      if (!(e && go.default.existsSync(e)) && process.arch === "ia32") throw new Error('The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)');
    }
    __name(On, "On");
    var Fn = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    var It = "libquery_engine";
    function _t(e, r) {
      let t = r === "url";
      return e.includes("windows") ? t ? "query_engine.dll.node" : `query_engine-${e}.dll.node` : e.includes("darwin") ? t ? `${It}.dylib.node` : `${It}-${e}.dylib.node` : t ? `${It}.so.node` : `${It}-${e}.so.node`;
    }
    __name(_t, "_t");
    var ko = _(__require("child_process"));
    var Jn = _(__require("fs/promises"));
    var Ot = _(__require("os"));
    var ke = Symbol.for("@ts-pattern/matcher");
    var su = Symbol.for("@ts-pattern/isVariadic");
    var Dt = "@ts-pattern/anonymous-select-key";
    var Mn = /* @__PURE__ */ __name((e) => !!(e && typeof e == "object"), "Mn");
    var kt = /* @__PURE__ */ __name((e) => e && !!e[ke], "kt");
    var we = /* @__PURE__ */ __name((e, r, t) => {
      if (kt(e)) {
        let n = e[ke](), { matched: i, selections: o } = n.match(r);
        return i && o && Object.keys(o).forEach((s) => t(s, o[s])), i;
      }
      if (Mn(e)) {
        if (!Mn(r)) return false;
        if (Array.isArray(e)) {
          if (!Array.isArray(r)) return false;
          let n = [], i = [], o = [];
          for (let s of e.keys()) {
            let a = e[s];
            kt(a) && a[su] ? o.push(a) : o.length ? i.push(a) : n.push(a);
          }
          if (o.length) {
            if (o.length > 1) throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");
            if (r.length < n.length + i.length) return false;
            let s = r.slice(0, n.length), a = i.length === 0 ? [] : r.slice(-i.length), l = r.slice(n.length, i.length === 0 ? 1 / 0 : -i.length);
            return n.every((u, c) => we(u, s[c], t)) && i.every((u, c) => we(u, a[c], t)) && (o.length === 0 || we(o[0], l, t));
          }
          return e.length === r.length && e.every((s, a) => we(s, r[a], t));
        }
        return Object.keys(e).every((n) => {
          let i = e[n];
          return (n in r || kt(o = i) && o[ke]().matcherType === "optional") && we(i, r[n], t);
          var o;
        });
      }
      return Object.is(r, e);
    }, "we");
    var Be = /* @__PURE__ */ __name((e) => {
      var r, t, n;
      return Mn(e) ? kt(e) ? (r = (t = (n = e[ke]()).getSelectionKeys) == null ? void 0 : t.call(n)) != null ? r : [] : Array.isArray(e) ? $r(e, Be) : $r(Object.values(e), Be) : [];
    }, "Be");
    var $r = /* @__PURE__ */ __name((e, r) => e.reduce((t, n) => t.concat(r(n)), []), "$r");
    function fe(e) {
      return Object.assign(e, { optional: /* @__PURE__ */ __name(() => au(e), "optional"), and: /* @__PURE__ */ __name((r) => B(e, r), "and"), or: /* @__PURE__ */ __name((r) => lu(e, r), "or"), select: /* @__PURE__ */ __name((r) => r === void 0 ? ho(e) : ho(r, e), "select") });
    }
    __name(fe, "fe");
    function au(e) {
      return fe({ [ke]: () => ({ match: /* @__PURE__ */ __name((r) => {
        let t = {}, n = /* @__PURE__ */ __name((i, o) => {
          t[i] = o;
        }, "n");
        return r === void 0 ? (Be(e).forEach((i) => n(i, void 0)), { matched: true, selections: t }) : { matched: we(e, r, n), selections: t };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => Be(e), "getSelectionKeys"), matcherType: "optional" }) });
    }
    __name(au, "au");
    function B(...e) {
      return fe({ [ke]: () => ({ match: /* @__PURE__ */ __name((r) => {
        let t = {}, n = /* @__PURE__ */ __name((i, o) => {
          t[i] = o;
        }, "n");
        return { matched: e.every((i) => we(i, r, n)), selections: t };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => $r(e, Be), "getSelectionKeys"), matcherType: "and" }) });
    }
    __name(B, "B");
    function lu(...e) {
      return fe({ [ke]: () => ({ match: /* @__PURE__ */ __name((r) => {
        let t = {}, n = /* @__PURE__ */ __name((i, o) => {
          t[i] = o;
        }, "n");
        return $r(e, Be).forEach((i) => n(i, void 0)), { matched: e.some((i) => we(i, r, n)), selections: t };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => $r(e, Be), "getSelectionKeys"), matcherType: "or" }) });
    }
    __name(lu, "lu");
    function k(e) {
      return { [ke]: () => ({ match: /* @__PURE__ */ __name((r) => ({ matched: !!e(r) }), "match") }) };
    }
    __name(k, "k");
    function ho(...e) {
      let r = typeof e[0] == "string" ? e[0] : void 0, t = e.length === 2 ? e[1] : typeof e[0] == "string" ? void 0 : e[0];
      return fe({ [ke]: () => ({ match: /* @__PURE__ */ __name((n) => {
        let i = { [r ?? Dt]: n };
        return { matched: t === void 0 || we(t, n, (o, s) => {
          i[o] = s;
        }), selections: i };
      }, "match"), getSelectionKeys: /* @__PURE__ */ __name(() => [r ?? Dt].concat(t === void 0 ? [] : Be(t)), "getSelectionKeys") }) });
    }
    __name(ho, "ho");
    function Ee(e) {
      return typeof e == "number";
    }
    __name(Ee, "Ee");
    function Ze(e) {
      return typeof e == "string";
    }
    __name(Ze, "Ze");
    function $e(e) {
      return typeof e == "bigint";
    }
    __name($e, "$e");
    var yd = fe(k(function(e) {
      return true;
    }));
    var Xe = /* @__PURE__ */ __name((e) => Object.assign(fe(e), { startsWith: /* @__PURE__ */ __name((r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && n.startsWith(t)))));
      var t;
    }, "startsWith"), endsWith: /* @__PURE__ */ __name((r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && n.endsWith(t)))));
      var t;
    }, "endsWith"), minLength: /* @__PURE__ */ __name((r) => Xe(B(e, ((t) => k((n) => Ze(n) && n.length >= t))(r))), "minLength"), maxLength: /* @__PURE__ */ __name((r) => Xe(B(e, ((t) => k((n) => Ze(n) && n.length <= t))(r))), "maxLength"), includes: /* @__PURE__ */ __name((r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && n.includes(t)))));
      var t;
    }, "includes"), regex: /* @__PURE__ */ __name((r) => {
      return Xe(B(e, (t = r, k((n) => Ze(n) && !!n.match(t)))));
      var t;
    }, "regex") }), "Xe");
    var Ed = Xe(k(Ze));
    var be = /* @__PURE__ */ __name((e) => Object.assign(fe(e), { between: /* @__PURE__ */ __name((r, t) => be(B(e, ((n, i) => k((o) => Ee(o) && n <= o && i >= o))(r, t))), "between"), lt: /* @__PURE__ */ __name((r) => be(B(e, ((t) => k((n) => Ee(n) && n < t))(r))), "lt"), gt: /* @__PURE__ */ __name((r) => be(B(e, ((t) => k((n) => Ee(n) && n > t))(r))), "gt"), lte: /* @__PURE__ */ __name((r) => be(B(e, ((t) => k((n) => Ee(n) && n <= t))(r))), "lte"), gte: /* @__PURE__ */ __name((r) => be(B(e, ((t) => k((n) => Ee(n) && n >= t))(r))), "gte"), int: /* @__PURE__ */ __name(() => be(B(e, k((r) => Ee(r) && Number.isInteger(r)))), "int"), finite: /* @__PURE__ */ __name(() => be(B(e, k((r) => Ee(r) && Number.isFinite(r)))), "finite"), positive: /* @__PURE__ */ __name(() => be(B(e, k((r) => Ee(r) && r > 0))), "positive"), negative: /* @__PURE__ */ __name(() => be(B(e, k((r) => Ee(r) && r < 0))), "negative") }), "be");
    var bd = be(k(Ee));
    var qe = /* @__PURE__ */ __name((e) => Object.assign(fe(e), { between: /* @__PURE__ */ __name((r, t) => qe(B(e, ((n, i) => k((o) => $e(o) && n <= o && i >= o))(r, t))), "between"), lt: /* @__PURE__ */ __name((r) => qe(B(e, ((t) => k((n) => $e(n) && n < t))(r))), "lt"), gt: /* @__PURE__ */ __name((r) => qe(B(e, ((t) => k((n) => $e(n) && n > t))(r))), "gt"), lte: /* @__PURE__ */ __name((r) => qe(B(e, ((t) => k((n) => $e(n) && n <= t))(r))), "lte"), gte: /* @__PURE__ */ __name((r) => qe(B(e, ((t) => k((n) => $e(n) && n >= t))(r))), "gte"), positive: /* @__PURE__ */ __name(() => qe(B(e, k((r) => $e(r) && r > 0))), "positive"), negative: /* @__PURE__ */ __name(() => qe(B(e, k((r) => $e(r) && r < 0))), "negative") }), "qe");
    var wd = qe(k($e));
    var xd = fe(k(function(e) {
      return typeof e == "boolean";
    }));
    var Pd = fe(k(function(e) {
      return typeof e == "symbol";
    }));
    var vd = fe(k(function(e) {
      return e == null;
    }));
    var $n = { matched: false, value: void 0 };
    function pr(e) {
      return new qn(e, $n);
    }
    __name(pr, "pr");
    var qn = class e {
      static {
        __name(this, "e");
      }
      constructor(r, t) {
        this.input = void 0, this.state = void 0, this.input = r, this.state = t;
      }
      with(...r) {
        if (this.state.matched) return this;
        let t = r[r.length - 1], n = [r[0]], i;
        r.length === 3 && typeof r[1] == "function" ? i = r[1] : r.length > 2 && n.push(...r.slice(1, r.length - 1));
        let o = false, s = {}, a = /* @__PURE__ */ __name((u, c) => {
          o = true, s[u] = c;
        }, "a"), l = !n.some((u) => we(u, this.input, a)) || i && !i(this.input) ? $n : { matched: true, value: t(o ? Dt in s ? s[Dt] : s : this.input, this.input) };
        return new e(this.input, l);
      }
      when(r, t) {
        if (this.state.matched) return this;
        let n = !!r(this.input);
        return new e(this.input, n ? { matched: true, value: t(this.input, this.input) } : $n);
      }
      otherwise(r) {
        return this.state.matched ? this.state.value : r(this.input);
      }
      exhaustive() {
        if (this.state.matched) return this.state.value;
        let r;
        try {
          r = JSON.stringify(this.input);
        } catch {
          r = this.input;
        }
        throw new Error(`Pattern matching error: no pattern matches value ${r}`);
      }
      run() {
        return this.exhaustive();
      }
      returnType() {
        return this;
      }
    };
    var Do = __require("util");
    var Ao = _(Ro());
    function Vr(e) {
      return (0, Ao.default)(e, e, { fallback: ee });
    }
    __name(Vr, "Vr");
    var du = { warn: de("prisma:warn") };
    var fu = { warn: /* @__PURE__ */ __name(() => !process.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function jr(e, ...r) {
      fu.warn() && console.warn(`${du.warn} ${e}`, ...r);
    }
    __name(jr, "jr");
    var gu = (0, Do.promisify)(ko.default.exec);
    var ie = N("prisma:get-platform");
    var hu = ["1.0.x", "1.1.x", "3.0.x"];
    async function Lo() {
      let e = Ot.default.platform(), r = process.arch;
      if (e === "freebsd") {
        let s = await Ft("freebsd-version");
        if (s && s.trim().length > 0) {
          let l = /^(\d+)\.?/.exec(s);
          if (l) return { platform: "freebsd", targetDistro: `freebsd${l[1]}`, arch: r };
        }
      }
      if (e !== "linux") return { platform: e, arch: r };
      let t = await Eu(), n = await Su(), i = wu({ arch: r, archFromUname: n, familyDistro: t.familyDistro }), { libssl: o } = await xu(i);
      return { platform: "linux", libssl: o, arch: r, archFromUname: n, ...t };
    }
    __name(Lo, "Lo");
    function yu(e) {
      let r = /^ID="?([^"\n]*)"?$/im, t = /^ID_LIKE="?([^"\n]*)"?$/im, n = r.exec(e), i = n && n[1] && n[1].toLowerCase() || "", o = t.exec(e), s = o && o[1] && o[1].toLowerCase() || "", a = pr({ id: i, idLike: s }).with({ id: "alpine" }, ({ id: l }) => ({ targetDistro: "musl", familyDistro: l, originalDistro: l })).with({ id: "raspbian" }, ({ id: l }) => ({ targetDistro: "arm", familyDistro: "debian", originalDistro: l })).with({ id: "nixos" }, ({ id: l }) => ({ targetDistro: "nixos", originalDistro: l, familyDistro: "nixos" })).with({ id: "debian" }, { id: "ubuntu" }, ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).with({ id: "rhel" }, { id: "centos" }, { id: "fedora" }, ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).when(({ idLike: l }) => l.includes("debian") || l.includes("ubuntu"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "debian", originalDistro: l })).when(({ idLike: l }) => i === "arch" || l.includes("arch"), ({ id: l }) => ({ targetDistro: "debian", familyDistro: "arch", originalDistro: l })).when(({ idLike: l }) => l.includes("centos") || l.includes("fedora") || l.includes("rhel") || l.includes("suse"), ({ id: l }) => ({ targetDistro: "rhel", familyDistro: "rhel", originalDistro: l })).otherwise(({ id: l }) => ({ targetDistro: void 0, familyDistro: void 0, originalDistro: l }));
      return ie(`Found distro info:
${JSON.stringify(a, null, 2)}`), a;
    }
    __name(yu, "yu");
    async function Eu() {
      let e = "/etc/os-release";
      try {
        let r = await Jn.default.readFile(e, { encoding: "utf-8" });
        return yu(r);
      } catch {
        return { targetDistro: void 0, familyDistro: void 0, originalDistro: void 0 };
      }
    }
    __name(Eu, "Eu");
    function bu(e) {
      let r = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);
      if (r) {
        let t = `${r[1]}.x`;
        return No(t);
      }
    }
    __name(bu, "bu");
    function Io(e) {
      let r = /libssl\.so\.(\d)(\.\d)?/.exec(e);
      if (r) {
        let t = `${r[1]}${r[2] ?? ".0"}.x`;
        return No(t);
      }
    }
    __name(Io, "Io");
    function No(e) {
      let r = (() => {
        if (Fo(e)) return e;
        let t = e.split(".");
        return t[1] = "0", t.join(".");
      })();
      if (hu.includes(r)) return r;
    }
    __name(No, "No");
    function wu(e) {
      return pr(e).with({ familyDistro: "musl" }, () => (ie('Trying platform-specific paths for "alpine"'), ["/lib"])).with({ familyDistro: "debian" }, ({ archFromUname: r }) => (ie('Trying platform-specific paths for "debian" (and "ubuntu")'), [`/usr/lib/${r}-linux-gnu`, `/lib/${r}-linux-gnu`])).with({ familyDistro: "rhel" }, () => (ie('Trying platform-specific paths for "rhel"'), ["/lib64", "/usr/lib64"])).otherwise(({ familyDistro: r, arch: t, archFromUname: n }) => (ie(`Don't know any platform-specific paths for "${r}" on ${t} (${n})`), []));
    }
    __name(wu, "wu");
    async function xu(e) {
      let r = 'grep -v "libssl.so.0"', t = await _o(e);
      if (t) {
        ie(`Found libssl.so file using platform-specific paths: ${t}`);
        let o = Io(t);
        if (ie(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "libssl-specific-path" };
      }
      ie('Falling back to "ldconfig" and other generic paths');
      let n = await Ft(`ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${r}`);
      if (n || (n = await _o(["/lib64", "/usr/lib64", "/lib"])), n) {
        ie(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);
        let o = Io(n);
        if (ie(`The parsed libssl version is: ${o}`), o) return { libssl: o, strategy: "ldconfig" };
      }
      let i = await Ft("openssl version -v");
      if (i) {
        ie(`Found openssl binary with version: ${i}`);
        let o = bu(i);
        if (ie(`The parsed openssl version is: ${o}`), o) return { libssl: o, strategy: "openssl-binary" };
      }
      return ie("Couldn't find any version of libssl or OpenSSL in the system"), {};
    }
    __name(xu, "xu");
    async function _o(e) {
      for (let r of e) {
        let t = await Pu(r);
        if (t) return t;
      }
    }
    __name(_o, "_o");
    async function Pu(e) {
      try {
        return (await Jn.default.readdir(e)).find((t) => t.startsWith("libssl.so.") && !t.startsWith("libssl.so.0"));
      } catch (r) {
        if (r.code === "ENOENT") return;
        throw r;
      }
    }
    __name(Pu, "Pu");
    async function er() {
      let { binaryTarget: e } = await Oo();
      return e;
    }
    __name(er, "er");
    function vu(e) {
      return e.binaryTarget !== void 0;
    }
    __name(vu, "vu");
    async function Hn() {
      let { memoized: e, ...r } = await Oo();
      return r;
    }
    __name(Hn, "Hn");
    var Nt = {};
    async function Oo() {
      if (vu(Nt)) return Promise.resolve({ ...Nt, memoized: true });
      let e = await Lo(), r = Tu(e);
      return Nt = { ...e, binaryTarget: r }, { ...Nt, memoized: false };
    }
    __name(Oo, "Oo");
    function Tu(e) {
      let { platform: r, arch: t, archFromUname: n, libssl: i, targetDistro: o, familyDistro: s, originalDistro: a } = e;
      r === "linux" && !["x64", "arm64"].includes(t) && jr(`Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures. If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`);
      let l = "1.1.x";
      if (r === "linux" && i === void 0) {
        let c = pr({ familyDistro: s }).with({ familyDistro: "debian" }, () => "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, add this command to your Dockerfile, or switch to an image that already has OpenSSL installed.").otherwise(() => "Please manually install OpenSSL and try installing Prisma again.");
        jr(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`);
      }
      let u = "debian";
      if (r === "linux" && o === void 0 && jr(`Prisma doesn't know which engines to download for the Linux distro "${a}". Falling back to Prisma engines built "${u}".
Please report your experience by creating an issue at ${Vr("https://github.com/prisma/prisma/issues")} so we can add your distro to the list of known supported distros.`), r === "darwin" && t === "arm64") return "darwin-arm64";
      if (r === "darwin") return "darwin";
      if (r === "win32") return "windows";
      if (r === "freebsd") return o;
      if (r === "openbsd") return "openbsd";
      if (r === "netbsd") return "netbsd";
      if (r === "linux" && o === "nixos") return "linux-nixos";
      if (r === "linux" && t === "arm64") return `${o === "musl" ? "linux-musl-arm64" : "linux-arm64"}-openssl-${i || l}`;
      if (r === "linux" && t === "arm") return `linux-arm-openssl-${i || l}`;
      if (r === "linux" && o === "musl") {
        let c = "linux-musl";
        return !i || Fo(i) ? c : `${c}-openssl-${i}`;
      }
      return r === "linux" && o && i ? `${o}-openssl-${i}` : (r !== "linux" && jr(`Prisma detected unknown OS "${r}" and may not work as expected. Defaulting to "linux".`), i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`);
    }
    __name(Tu, "Tu");
    async function Cu(e) {
      try {
        return await e();
      } catch {
        return;
      }
    }
    __name(Cu, "Cu");
    function Ft(e) {
      return Cu(async () => {
        let r = await gu(e);
        return ie(`Command "${e}" successfully returned "${r.stdout}"`), r.stdout;
      });
    }
    __name(Ft, "Ft");
    async function Su() {
      return typeof Ot.default.machine == "function" ? Ot.default.machine() : (await Ft("uname -m"))?.trim();
    }
    __name(Su, "Su");
    function Fo(e) {
      return e.startsWith("1.");
    }
    __name(Fo, "Fo");
    var zn = _(qo());
    var qt = _(__require("fs"));
    var fr = _(__require("path"));
    function Bo(e) {
      let r = e.ignoreProcessEnv ? {} : process.env, t = /* @__PURE__ */ __name((n) => n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function(o, s) {
        let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
        if (!a) return o;
        let l = a[1], u, c;
        if (l === "\\") c = a[0], u = c.replace("\\$", "$");
        else {
          let p = a[2];
          c = a[0].substring(l.length), u = Object.hasOwnProperty.call(r, p) ? r[p] : e.parsed[p] || "", u = t(u);
        }
        return o.replace(c, u);
      }, n) ?? n, "t");
      for (let n in e.parsed) {
        let i = Object.hasOwnProperty.call(r, n) ? r[n] : e.parsed[n];
        e.parsed[n] = t(i);
      }
      for (let n in e.parsed) r[n] = e.parsed[n];
      return e;
    }
    __name(Bo, "Bo");
    var Kn = N("prisma:tryLoadEnv");
    function Ur({ rootEnvPath: e, schemaEnvPath: r }, t = { conflictCheck: "none" }) {
      let n = Vo(e);
      t.conflictCheck !== "none" && Fu(n, r, t.conflictCheck);
      let i = null;
      return jo(n?.path, r) || (i = Vo(r)), !n && !i && Kn("No Environment variables loaded"), i?.dotenvResult.error ? console.error(ce(W("Schema Env Error: ")) + i.dotenvResult.error) : { message: [n?.message, i?.message].filter(Boolean).join(`
`), parsed: { ...n?.dotenvResult?.parsed, ...i?.dotenvResult?.parsed } };
    }
    __name(Ur, "Ur");
    function Fu(e, r, t) {
      let n = e?.dotenvResult.parsed, i = !jo(e?.path, r);
      if (n && r && i && qt.default.existsSync(r)) {
        let o = zn.default.parse(qt.default.readFileSync(r)), s = [];
        for (let a in o) n[a] === o[a] && s.push(a);
        if (s.length > 0) {
          let a = fr.default.relative(process.cwd(), e.path), l = fr.default.relative(process.cwd(), r);
          if (t === "error") {
            let u = `There is a conflict between env var${s.length > 1 ? "s" : ""} in ${ee(a)} and ${ee(l)}
Conflicting env vars:
${s.map((c) => `  ${W(c)}`).join(`
`)}

We suggest to move the contents of ${ee(l)} to ${ee(a)} to consolidate your env vars.
`;
            throw new Error(u);
          } else if (t === "warn") {
            let u = `Conflict for env var${s.length > 1 ? "s" : ""} ${s.map((c) => W(c)).join(", ")} in ${ee(a)} and ${ee(l)}
Env vars from ${ee(l)} overwrite the ones from ${ee(a)}
      `;
            console.warn(`${de("warn(prisma)")} ${u}`);
          }
        }
      }
    }
    __name(Fu, "Fu");
    function Vo(e) {
      if (Mu(e)) {
        Kn(`Environment variables loaded from ${e}`);
        let r = zn.default.config({ path: e, debug: process.env.DOTENV_CONFIG_DEBUG ? true : void 0 });
        return { dotenvResult: Bo(r), message: Ie(`Environment variables loaded from ${fr.default.relative(process.cwd(), e)}`), path: e };
      } else Kn(`Environment variables not found at ${e}`);
      return null;
    }
    __name(Vo, "Vo");
    function jo(e, r) {
      return e && r && fr.default.resolve(e) === fr.default.resolve(r);
    }
    __name(jo, "jo");
    function Mu(e) {
      return !!(e && qt.default.existsSync(e));
    }
    __name(Mu, "Mu");
    var Uo = "library";
    function Qr(e) {
      let r = $u();
      return r || (e?.config.engineType === "library" ? "library" : e?.config.engineType === "binary" ? "binary" : Uo);
    }
    __name(Qr, "Qr");
    function $u() {
      let e = process.env.PRISMA_CLIENT_ENGINE_TYPE;
      return e === "library" ? "library" : e === "binary" ? "binary" : void 0;
    }
    __name($u, "$u");
    var Vu = _(Zn());
    var M = _(__require("path"));
    var ju = _(Zn());
    var df = N("prisma:engines");
    function Wo() {
      return M.default.join(__dirname, "../");
    }
    __name(Wo, "Wo");
    var ff = "libquery-engine";
    M.default.join(__dirname, "../query-engine-darwin");
    M.default.join(__dirname, "../query-engine-darwin-arm64");
    M.default.join(__dirname, "../query-engine-debian-openssl-1.0.x");
    M.default.join(__dirname, "../query-engine-debian-openssl-1.1.x");
    M.default.join(__dirname, "../query-engine-debian-openssl-3.0.x");
    M.default.join(__dirname, "../query-engine-linux-static-x64");
    M.default.join(__dirname, "../query-engine-linux-static-arm64");
    M.default.join(__dirname, "../query-engine-rhel-openssl-1.0.x");
    M.default.join(__dirname, "../query-engine-rhel-openssl-1.1.x");
    M.default.join(__dirname, "../query-engine-rhel-openssl-3.0.x");
    M.default.join(__dirname, "../libquery_engine-darwin.dylib.node");
    M.default.join(__dirname, "../libquery_engine-darwin-arm64.dylib.node");
    M.default.join(__dirname, "../libquery_engine-debian-openssl-1.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-debian-openssl-1.1.x.so.node");
    M.default.join(__dirname, "../libquery_engine-debian-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-1.1.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-arm64-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-musl.so.node");
    M.default.join(__dirname, "../libquery_engine-linux-musl-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-rhel-openssl-1.0.x.so.node");
    M.default.join(__dirname, "../libquery_engine-rhel-openssl-1.1.x.so.node");
    M.default.join(__dirname, "../libquery_engine-rhel-openssl-3.0.x.so.node");
    M.default.join(__dirname, "../query_engine-windows.dll.node");
    var Xn = _(__require("fs"));
    var Ko = N("chmodPlusX");
    function ei(e) {
      if (process.platform === "win32") return;
      let r = Xn.default.statSync(e), t = r.mode | 64 | 8 | 1;
      if (r.mode === t) {
        Ko(`Execution permissions of ${e} are fine`);
        return;
      }
      let n = t.toString(8).slice(-3);
      Ko(`Have to call chmodPlusX on ${e}`), Xn.default.chmodSync(e, n);
    }
    __name(ei, "ei");
    function ri(e) {
      let r = e.e, t = /* @__PURE__ */ __name((a) => `Prisma cannot find the required \`${a}\` system library in your system`, "t"), n = r.message.includes("cannot open shared object file"), i = `Please refer to the documentation about Prisma's system requirements: ${Vr("https://pris.ly/d/system-requirements")}`, o = `Unable to require(\`${Ie(e.id)}\`).`, s = pr({ message: r.message, code: r.code }).with({ code: "ENOENT" }, () => "File does not exist.").when(({ message: a }) => n && a.includes("libz"), () => `${t("libz")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libgcc_s"), () => `${t("libgcc_s")}. Please install it and try again.`).when(({ message: a }) => n && a.includes("libssl"), () => {
        let a = e.platformInfo.libssl ? `openssl-${e.platformInfo.libssl}` : "openssl";
        return `${t("libssl")}. Please install ${a} and try again.`;
      }).when(({ message: a }) => a.includes("GLIBC"), () => `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`).when(({ message: a }) => e.platformInfo.platform === "linux" && a.includes("symbol not found"), () => `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`).otherwise(() => `The Prisma engines do not seem to be compatible with your system. ${i}`);
      return `${o}
${s}

Details: ${r.message}`;
    }
    __name(ri, "ri");
    var De;
    ((r) => {
      let e;
      ((E) => (E.findUnique = "findUnique", E.findUniqueOrThrow = "findUniqueOrThrow", E.findFirst = "findFirst", E.findFirstOrThrow = "findFirstOrThrow", E.findMany = "findMany", E.create = "create", E.createMany = "createMany", E.update = "update", E.updateMany = "updateMany", E.upsert = "upsert", E.delete = "delete", E.deleteMany = "deleteMany", E.groupBy = "groupBy", E.count = "count", E.aggregate = "aggregate", E.findRaw = "findRaw", E.aggregateRaw = "aggregateRaw"))(e = r.ModelAction || (r.ModelAction = {}));
    })(De || (De = {}));
    var Gr = _(__require("path"));
    function ti(e) {
      return Gr.default.sep === Gr.default.posix.sep ? e : e.split(Gr.default.sep).join(Gr.default.posix.sep);
    }
    __name(ti, "ti");
    var Yo = _(ni());
    function oi(e) {
      return String(new ii(e));
    }
    __name(oi, "oi");
    var ii = class {
      static {
        __name(this, "ii");
      }
      constructor(r) {
        this.config = r;
      }
      toString() {
        let { config: r } = this, t = r.provider.fromEnvVar ? `env("${r.provider.fromEnvVar}")` : r.provider.value, n = JSON.parse(JSON.stringify({ provider: t, binaryTargets: Uu(r.binaryTargets) }));
        return `generator ${r.name} {
${(0, Yo.default)(Qu(n), 2)}
}`;
      }
    };
    function Uu(e) {
      let r;
      if (e.length > 0) {
        let t = e.find((n) => n.fromEnvVar !== null);
        t ? r = `env("${t.fromEnvVar}")` : r = e.map((n) => n.native ? "native" : n.value);
      } else r = void 0;
      return r;
    }
    __name(Uu, "Uu");
    function Qu(e) {
      let r = Object.keys(e).reduce((t, n) => Math.max(t, n.length), 0);
      return Object.entries(e).map(([t, n]) => `${t.padEnd(r)} = ${Gu(n)}`).join(`
`);
    }
    __name(Qu, "Qu");
    function Gu(e) {
      return JSON.parse(JSON.stringify(e, (r, t) => Array.isArray(t) ? `[${t.map((n) => JSON.stringify(n)).join(", ")}]` : JSON.stringify(t)));
    }
    __name(Gu, "Gu");
    var Hr = {};
    Nr(Hr, { error: /* @__PURE__ */ __name(() => Wu, "error"), info: /* @__PURE__ */ __name(() => Hu, "info"), log: /* @__PURE__ */ __name(() => Ju, "log"), query: /* @__PURE__ */ __name(() => Ku, "query"), should: /* @__PURE__ */ __name(() => Zo, "should"), tags: /* @__PURE__ */ __name(() => Jr, "tags"), warn: /* @__PURE__ */ __name(() => si, "warn") });
    var Jr = { error: ce("prisma:error"), warn: de("prisma:warn"), info: _e("prisma:info"), query: Ye("prisma:query") };
    var Zo = { warn: /* @__PURE__ */ __name(() => !process.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function Ju(...e) {
      console.log(...e);
    }
    __name(Ju, "Ju");
    function si(e, ...r) {
      Zo.warn() && console.warn(`${Jr.warn} ${e}`, ...r);
    }
    __name(si, "si");
    function Hu(e, ...r) {
      console.info(`${Jr.info} ${e}`, ...r);
    }
    __name(Hu, "Hu");
    function Wu(e, ...r) {
      console.error(`${Jr.error} ${e}`, ...r);
    }
    __name(Wu, "Wu");
    function Ku(e, ...r) {
      console.log(`${Jr.query} ${e}`, ...r);
    }
    __name(Ku, "Ku");
    function Vt(e, r) {
      if (!e) throw new Error(`${r}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(Vt, "Vt");
    function rr(e, r) {
      throw new Error(r);
    }
    __name(rr, "rr");
    function li(e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }
    __name(li, "li");
    var ui = /* @__PURE__ */ __name((e, r) => e.reduce((t, n) => (t[r(n)] = n, t), {}), "ui");
    function gr(e, r) {
      let t = {};
      for (let n of Object.keys(e)) t[n] = r(e[n], n);
      return t;
    }
    __name(gr, "gr");
    function ci(e, r) {
      if (e.length === 0) return;
      let t = e[0];
      for (let n = 1; n < e.length; n++) r(t, e[n]) < 0 && (t = e[n]);
      return t;
    }
    __name(ci, "ci");
    function w(e, r) {
      Object.defineProperty(e, "name", { value: r, configurable: true });
    }
    __name(w, "w");
    var ns = /* @__PURE__ */ new Set();
    var Wr = /* @__PURE__ */ __name((e, r, ...t) => {
      ns.has(e) || (ns.add(e), si(r, ...t));
    }, "Wr");
    var V = class extends Error {
      static {
        __name(this, "V");
      }
      constructor(r, { code: t, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(r), this.name = "PrismaClientKnownRequestError", this.code = t, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    w(V, "PrismaClientKnownRequestError");
    var Le = class extends V {
      static {
        __name(this, "Le");
      }
      constructor(r, t) {
        super(r, { code: "P2025", clientVersion: t }), this.name = "NotFoundError";
      }
    };
    w(Le, "NotFoundError");
    var S = class e extends Error {
      static {
        __name(this, "e");
      }
      constructor(r, t, n) {
        super(r), this.name = "PrismaClientInitializationError", this.clientVersion = t, this.errorCode = n, Error.captureStackTrace(e);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    w(S, "PrismaClientInitializationError");
    var ue = class extends Error {
      static {
        __name(this, "ue");
      }
      constructor(r, t) {
        super(r), this.name = "PrismaClientRustPanicError", this.clientVersion = t;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    w(ue, "PrismaClientRustPanicError");
    var j = class extends Error {
      static {
        __name(this, "j");
      }
      constructor(r, { clientVersion: t, batchRequestIdx: n }) {
        super(r), this.name = "PrismaClientUnknownRequestError", this.clientVersion = t, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    w(j, "PrismaClientUnknownRequestError");
    var K = class extends Error {
      static {
        __name(this, "K");
      }
      constructor(t, { clientVersion: n }) {
        super(t);
        this.name = "PrismaClientValidationError";
        this.clientVersion = n;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    w(K, "PrismaClientValidationError");
    var hr = class {
      static {
        __name(this, "hr");
      }
      constructor(r) {
        this._engine = r;
      }
      prometheus(r) {
        return this._engine.metrics({ format: "prometheus", ...r });
      }
      json(r) {
        return this._engine.metrics({ format: "json", ...r });
      }
    };
    function Kr(e) {
      let r;
      return { get() {
        return r || (r = { value: e() }), r.value;
      } };
    }
    __name(Kr, "Kr");
    function is(e, r) {
      let t = Kr(() => Yu(r));
      Object.defineProperty(e, "dmmf", { get: /* @__PURE__ */ __name(() => t.get(), "get") });
    }
    __name(is, "is");
    function Yu(e) {
      return { datamodel: { models: pi(e.models), enums: pi(e.enums), types: pi(e.types) } };
    }
    __name(Yu, "Yu");
    function pi(e) {
      return Object.entries(e).map(([r, t]) => ({ name: r, ...t }));
    }
    __name(pi, "pi");
    var Qt = Symbol();
    var mi = /* @__PURE__ */ new WeakMap();
    var Ne = class {
      static {
        __name(this, "Ne");
      }
      constructor(r) {
        r === Qt ? mi.set(this, `Prisma.${this._getName()}`) : mi.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return mi.get(this);
      }
    };
    var zr = class extends Ne {
      static {
        __name(this, "zr");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var Yr = class extends zr {
      static {
        __name(this, "Yr");
      }
    };
    di(Yr, "DbNull");
    var Zr = class extends zr {
      static {
        __name(this, "Zr");
      }
    };
    di(Zr, "JsonNull");
    var Xr = class extends zr {
      static {
        __name(this, "Xr");
      }
    };
    di(Xr, "AnyNull");
    var Gt = { classes: { DbNull: Yr, JsonNull: Zr, AnyNull: Xr }, instances: { DbNull: new Yr(Qt), JsonNull: new Zr(Qt), AnyNull: new Xr(Qt) } };
    function di(e, r) {
      Object.defineProperty(e, "name", { value: r, configurable: true });
    }
    __name(di, "di");
    function et(e) {
      return { ok: false, error: e, map() {
        return et(e);
      }, flatMap() {
        return et(e);
      } };
    }
    __name(et, "et");
    var fi = class {
      static {
        __name(this, "fi");
      }
      constructor() {
        this.registeredErrors = [];
      }
      consumeError(r) {
        return this.registeredErrors[r];
      }
      registerNewError(r) {
        let t = 0;
        for (; this.registeredErrors[t] !== void 0; ) t++;
        return this.registeredErrors[t] = { error: r }, t;
      }
    };
    var gi = /* @__PURE__ */ __name((e) => {
      let r = new fi(), t = tr(r, e.startTransaction.bind(e)), n = { errorRegistry: r, queryRaw: tr(r, e.queryRaw.bind(e)), executeRaw: tr(r, e.executeRaw.bind(e)), provider: e.provider, startTransaction: /* @__PURE__ */ __name(async (...i) => (await t(...i)).map((s) => Zu(r, s)), "startTransaction") };
      return e.getConnectionInfo && (n.getConnectionInfo = Xu(r, e.getConnectionInfo.bind(e))), n;
    }, "gi");
    var Zu = /* @__PURE__ */ __name((e, r) => ({ provider: r.provider, options: r.options, queryRaw: tr(e, r.queryRaw.bind(r)), executeRaw: tr(e, r.executeRaw.bind(r)), commit: tr(e, r.commit.bind(r)), rollback: tr(e, r.rollback.bind(r)) }), "Zu");
    function tr(e, r) {
      return async (...t) => {
        try {
          return await r(...t);
        } catch (n) {
          let i = e.registerNewError(n);
          return et({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(tr, "tr");
    function Xu(e, r) {
      return (...t) => {
        try {
          return r(...t);
        } catch (n) {
          let i = e.registerNewError(n);
          return et({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Xu, "Xu");
    var Sl = _(Yn());
    var Rl = __require("async_hooks");
    var Al = __require("events");
    var Il = _(__require("fs"));
    var Ct = _(__require("path"));
    var oe = class e {
      static {
        __name(this, "e");
      }
      constructor(r, t) {
        if (r.length - 1 !== t.length) throw r.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${r.length} strings to have ${r.length - 1} values`);
        let n = t.reduce((s, a) => s + (a instanceof e ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = r[0];
        let i = 0, o = 0;
        for (; i < t.length; ) {
          let s = t[i++], a = r[i];
          if (s instanceof e) {
            this.strings[o] += s.strings[0];
            let l = 0;
            for (; l < s.values.length; ) this.values[o++] = s.values[l++], this.strings[o] = s.strings[l];
            this.strings[o] += a;
          } else this.values[o++] = s, this.strings[o] = a;
        }
      }
      get text() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for (; t < r; ) n += `$${t}${this.strings[t++]}`;
        return n;
      }
      get sql() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for (; t < r; ) n += `?${this.strings[t++]}`;
        return n;
      }
      get statement() {
        let r = this.strings.length, t = 1, n = this.strings[0];
        for (; t < r; ) n += `:${t}${this.strings[t++]}`;
        return n;
      }
      inspect() {
        return { text: this.text, sql: this.sql, values: this.values };
      }
    };
    function os(e, r = ",", t = "", n = "") {
      if (e.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new oe([t, ...Array(e.length - 1).fill(r), n], e);
    }
    __name(os, "os");
    function hi(e) {
      return new oe([e], []);
    }
    __name(hi, "hi");
    var ss = hi("");
    function yi(e, ...r) {
      return new oe(e, r);
    }
    __name(yi, "yi");
    function rt(e) {
      return { getKeys() {
        return Object.keys(e);
      }, getPropertyValue(r) {
        return e[r];
      } };
    }
    __name(rt, "rt");
    function te(e, r) {
      return { getKeys() {
        return [e];
      }, getPropertyValue() {
        return r();
      } };
    }
    __name(te, "te");
    var xe = class {
      static {
        __name(this, "xe");
      }
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(r) {
        return this._map.get(r)?.value;
      }
      set(r, t) {
        this._map.set(r, { value: t });
      }
      getOrCreate(r, t) {
        let n = this._map.get(r);
        if (n) return n.value;
        let i = t();
        return this.set(r, i), i;
      }
    };
    function nr(e) {
      let r = new xe();
      return { getKeys() {
        return e.getKeys();
      }, getPropertyValue(t) {
        return r.getOrCreate(t, () => e.getPropertyValue(t));
      }, getPropertyDescriptor(t) {
        return e.getPropertyDescriptor?.(t);
      } };
    }
    __name(nr, "nr");
    var us = __require("util");
    var Jt = { enumerable: true, configurable: true, writable: true };
    function Ht(e) {
      let r = new Set(e);
      return { getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => Jt, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((t, n) => r.has(n), "has"), set: /* @__PURE__ */ __name((t, n, i) => r.add(n) && Reflect.set(t, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...r], "ownKeys") };
    }
    __name(Ht, "Ht");
    var as = Symbol.for("nodejs.util.inspect.custom");
    function Pe(e, r) {
      let t = ec(r), n = /* @__PURE__ */ new Set(), i = new Proxy(e, { get(o, s) {
        if (n.has(s)) return o[s];
        let a = t.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a = t.get(s);
        return a ? a.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = ls(Reflect.ownKeys(o), t), a = ls(Array.from(t.keys()), t);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        return t.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let l = t.get(s);
        return l ? l.getPropertyDescriptor ? { ...Jt, ...l?.getPropertyDescriptor(s) } : Jt : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      } });
      return i[as] = function(o, s, a = us.inspect) {
        let l = { ...this };
        return delete l[as], a(l, s);
      }, i;
    }
    __name(Pe, "Pe");
    function ec(e) {
      let r = /* @__PURE__ */ new Map();
      for (let t of e) {
        let n = t.getKeys();
        for (let i of n) r.set(i, t);
      }
      return r;
    }
    __name(ec, "ec");
    function ls(e, r) {
      return e.filter((t) => r.get(t)?.has?.(t) ?? true);
    }
    __name(ls, "ls");
    function tt(e) {
      return { getKeys() {
        return e;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(tt, "tt");
    function yr(e, r) {
      return { batch: e, transaction: r?.kind === "batch" ? { isolationLevel: r.options.isolationLevel } : void 0 };
    }
    __name(yr, "yr");
    var Er = class {
      static {
        __name(this, "Er");
      }
      constructor(r = 0, t) {
        this.context = t;
        this.lines = [];
        this.currentLine = "";
        this.currentIndent = 0;
        this.currentIndent = r;
      }
      write(r) {
        return typeof r == "string" ? this.currentLine += r : r.write(this), this;
      }
      writeJoined(r, t) {
        let n = t.length - 1;
        for (let i = 0; i < t.length; i++) this.write(t[i]), i !== n && this.write(r);
        return this;
      }
      writeLine(r) {
        return this.write(r).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let r = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, r?.(), this;
      }
      withIndent(r) {
        return this.indent(), r(this), this.unindent(), this;
      }
      afterNextNewline(r) {
        return this.afterNextNewLineCallback = r, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(r) {
        return this.marginSymbol = r, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let r = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + r.slice(1) : r;
      }
    };
    function cs(e) {
      return e.substring(0, 1).toLowerCase() + e.substring(1);
    }
    __name(cs, "cs");
    function br(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    __name(br, "br");
    function Wt(e) {
      return e.toString() !== "Invalid Date";
    }
    __name(Wt, "Wt");
    var wr = 9e15;
    var Ge = 1e9;
    var Ei = "0123456789abcdef";
    var zt = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    var Yt = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    var bi = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -wr, maxE: wr, crypto: false };
    var fs;
    var Oe;
    var x = true;
    var Xt = "[DecimalError] ";
    var Qe = Xt + "Invalid argument: ";
    var gs = Xt + "Precision limit exceeded";
    var hs = Xt + "crypto unavailable";
    var ys = "[object Decimal]";
    var re = Math.floor;
    var Q = Math.pow;
    var rc = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    var tc = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    var nc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    var Es = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    var he = 1e7;
    var b = 7;
    var ic = 9007199254740991;
    var oc = zt.length - 1;
    var wi = Yt.length - 1;
    var d = { toStringTag: ys };
    d.absoluteValue = d.abs = function() {
      var e = new this.constructor(this);
      return e.s < 0 && (e.s = 1), y(e);
    };
    d.ceil = function() {
      return y(new this.constructor(this), this.e + 1, 2);
    };
    d.clampedTo = d.clamp = function(e, r) {
      var t, n = this, i = n.constructor;
      if (e = new i(e), r = new i(r), !e.s || !r.s) return new i(NaN);
      if (e.gt(r)) throw Error(Qe + r);
      return t = n.cmp(e), t < 0 ? e : n.cmp(r) > 0 ? r : new i(n);
    };
    d.comparedTo = d.cmp = function(e) {
      var r, t, n, i, o = this, s = o.d, a = (e = new o.constructor(e)).d, l = o.s, u = e.s;
      if (!s || !a) return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ l < 0 ? 1 : -1;
      if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0;
      if (l !== u) return l;
      if (o.e !== e.e) return o.e > e.e ^ l < 0 ? 1 : -1;
      for (n = s.length, i = a.length, r = 0, t = n < i ? n : i; r < t; ++r) if (s[r] !== a[r]) return s[r] > a[r] ^ l < 0 ? 1 : -1;
      return n === i ? 0 : n > i ^ l < 0 ? 1 : -1;
    };
    d.cosine = d.cos = function() {
      var e, r, t = this, n = t.constructor;
      return t.d ? t.d[0] ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + b, n.rounding = 1, t = sc(n, vs(n, t)), n.precision = e, n.rounding = r, y(Oe == 2 || Oe == 3 ? t.neg() : t, e, r, true)) : new n(1) : new n(NaN);
    };
    d.cubeRoot = d.cbrt = function() {
      var e, r, t, n, i, o, s, a, l, u, c = this, p = c.constructor;
      if (!c.isFinite() || c.isZero()) return new p(c);
      for (x = false, o = c.s * Q(c.s * c, 1 / 3), !o || Math.abs(o) == 1 / 0 ? (t = z(c.d), e = c.e, (o = (e - t.length + 1) % 3) && (t += o == 1 || o == -2 ? "0" : "00"), o = Q(t, 1 / 3), e = re((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new p(t), n.s = c.s) : n = new p(o.toString()), s = (e = p.precision) + 3; ; ) if (a = n, l = a.times(a).times(a), u = l.plus(c), n = O(u.plus(c).times(a), u.plus(l), s + 2, 1), z(a.d).slice(0, s) === (t = z(n.d)).slice(0, s)) if (t = t.slice(s - 3, s + 1), t == "9999" || !i && t == "4999") {
        if (!i && (y(a, e + 1, 0), a.times(a).times(a).eq(c))) {
          n = a;
          break;
        }
        s += 4, i = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (y(n, e + 1, 1), r = !n.times(n).times(n).eq(c));
        break;
      }
      return x = true, y(n, e, p.rounding, r);
    };
    d.decimalPlaces = d.dp = function() {
      var e, r = this.d, t = NaN;
      if (r) {
        if (e = r.length - 1, t = (e - re(this.e / b)) * b, e = r[e], e) for (; e % 10 == 0; e /= 10) t--;
        t < 0 && (t = 0);
      }
      return t;
    };
    d.dividedBy = d.div = function(e) {
      return O(this, new this.constructor(e));
    };
    d.dividedToIntegerBy = d.divToInt = function(e) {
      var r = this, t = r.constructor;
      return y(O(r, new t(e), 0, 1, 1), t.precision, t.rounding);
    };
    d.equals = d.eq = function(e) {
      return this.cmp(e) === 0;
    };
    d.floor = function() {
      return y(new this.constructor(this), this.e + 1, 3);
    };
    d.greaterThan = d.gt = function(e) {
      return this.cmp(e) > 0;
    };
    d.greaterThanOrEqualTo = d.gte = function(e) {
      var r = this.cmp(e);
      return r == 1 || r === 0;
    };
    d.hyperbolicCosine = d.cosh = function() {
      var e, r, t, n, i, o = this, s = o.constructor, a = new s(1);
      if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
      if (o.isZero()) return a;
      t = s.precision, n = s.rounding, s.precision = t + Math.max(o.e, o.sd()) + 4, s.rounding = 1, i = o.d.length, i < 32 ? (e = Math.ceil(i / 3), r = (1 / rn(4, e)).toString()) : (e = 16, r = "2.3283064365386962890625e-10"), o = xr(s, 1, o.times(r), new s(1), true);
      for (var l, u = e, c = new s(8); u--; ) l = o.times(o), o = a.minus(l.times(c.minus(l.times(c))));
      return y(o, s.precision = t, s.rounding = n, true);
    };
    d.hyperbolicSine = d.sinh = function() {
      var e, r, t, n, i = this, o = i.constructor;
      if (!i.isFinite() || i.isZero()) return new o(i);
      if (r = o.precision, t = o.rounding, o.precision = r + Math.max(i.e, i.sd()) + 4, o.rounding = 1, n = i.d.length, n < 3) i = xr(o, 2, i, i, true);
      else {
        e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, i = i.times(1 / rn(5, e)), i = xr(o, 2, i, i, true);
        for (var s, a = new o(5), l = new o(16), u = new o(20); e--; ) s = i.times(i), i = i.times(a.plus(s.times(l.times(s).plus(u))));
      }
      return o.precision = r, o.rounding = t, y(i, r, t, true);
    };
    d.hyperbolicTangent = d.tanh = function() {
      var e, r, t = this, n = t.constructor;
      return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 7, n.rounding = 1, O(t.sinh(), t.cosh(), n.precision = e, n.rounding = r)) : new n(t.s);
    };
    d.inverseCosine = d.acos = function() {
      var e, r = this, t = r.constructor, n = r.abs().cmp(1), i = t.precision, o = t.rounding;
      return n !== -1 ? n === 0 ? r.isNeg() ? ge(t, i, o) : new t(0) : new t(NaN) : r.isZero() ? ge(t, i + 4, o).times(0.5) : (t.precision = i + 6, t.rounding = 1, r = r.asin(), e = ge(t, i + 4, o).times(0.5), t.precision = i, t.rounding = o, e.minus(r));
    };
    d.inverseHyperbolicCosine = d.acosh = function() {
      var e, r, t = this, n = t.constructor;
      return t.lte(1) ? new n(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, n.rounding = 1, x = false, t = t.times(t).minus(1).sqrt().plus(t), x = true, n.precision = e, n.rounding = r, t.ln()) : new n(t);
    };
    d.inverseHyperbolicSine = d.asinh = function() {
      var e, r, t = this, n = t.constructor;
      return !t.isFinite() || t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, n.rounding = 1, x = false, t = t.times(t).plus(1).sqrt().plus(t), x = true, n.precision = e, n.rounding = r, t.ln());
    };
    d.inverseHyperbolicTangent = d.atanh = function() {
      var e, r, t, n, i = this, o = i.constructor;
      return i.isFinite() ? i.e >= 0 ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = o.precision, r = o.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? y(new o(i), e, r, true) : (o.precision = t = n - i.e, i = O(i.plus(1), new o(1).minus(i), t + e, 1), o.precision = e + 4, o.rounding = 1, i = i.ln(), o.precision = e, o.rounding = r, i.times(0.5))) : new o(NaN);
    };
    d.inverseSine = d.asin = function() {
      var e, r, t, n, i = this, o = i.constructor;
      return i.isZero() ? new o(i) : (r = i.abs().cmp(1), t = o.precision, n = o.rounding, r !== -1 ? r === 0 ? (e = ge(o, t + 4, n).times(0.5), e.s = i.s, e) : new o(NaN) : (o.precision = t + 6, o.rounding = 1, i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan(), o.precision = t, o.rounding = n, i.times(2)));
    };
    d.inverseTangent = d.atan = function() {
      var e, r, t, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, m = c.rounding;
      if (u.isFinite()) {
        if (u.isZero()) return new c(u);
        if (u.abs().eq(1) && p + 4 <= wi) return s = ge(c, p + 4, m).times(0.25), s.s = u.s, s;
      } else {
        if (!u.s) return new c(NaN);
        if (p + 4 <= wi) return s = ge(c, p + 4, m).times(0.5), s.s = u.s, s;
      }
      for (c.precision = a = p + 10, c.rounding = 1, t = Math.min(28, a / b + 2 | 0), e = t; e; --e) u = u.div(u.times(u).plus(1).sqrt().plus(1));
      for (x = false, r = Math.ceil(a / b), n = 1, l = u.times(u), s = new c(u), i = u; e !== -1; ) if (i = i.times(l), o = s.minus(i.div(n += 2)), i = i.times(l), s = o.plus(i.div(n += 2)), s.d[r] !== void 0) for (e = r; s.d[e] === o.d[e] && e--; ) ;
      return t && (s = s.times(2 << t - 1)), x = true, y(s, c.precision = p, c.rounding = m, true);
    };
    d.isFinite = function() {
      return !!this.d;
    };
    d.isInteger = d.isInt = function() {
      return !!this.d && re(this.e / b) > this.d.length - 2;
    };
    d.isNaN = function() {
      return !this.s;
    };
    d.isNegative = d.isNeg = function() {
      return this.s < 0;
    };
    d.isPositive = d.isPos = function() {
      return this.s > 0;
    };
    d.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    d.lessThan = d.lt = function(e) {
      return this.cmp(e) < 0;
    };
    d.lessThanOrEqualTo = d.lte = function(e) {
      return this.cmp(e) < 1;
    };
    d.logarithm = d.log = function(e) {
      var r, t, n, i, o, s, a, l, u = this, c = u.constructor, p = c.precision, m = c.rounding, f = 5;
      if (e == null) e = new c(10), r = true;
      else {
        if (e = new c(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1)) return new c(NaN);
        r = e.eq(10);
      }
      if (t = u.d, u.s < 0 || !t || !t[0] || u.eq(1)) return new c(t && !t[0] ? -1 / 0 : u.s != 1 ? NaN : t ? 0 : 1 / 0);
      if (r) if (t.length > 1) o = true;
      else {
        for (i = t[0]; i % 10 === 0; ) i /= 10;
        o = i !== 1;
      }
      if (x = false, a = p + f, s = Ue(u, a), n = r ? Zt(c, a + 10) : Ue(e, a), l = O(s, n, a, 1), nt(l.d, i = p, m)) do
        if (a += 10, s = Ue(u, a), n = r ? Zt(c, a + 10) : Ue(e, a), l = O(s, n, a, 1), !o) {
          +z(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = y(l, p + 1, 0));
          break;
        }
      while (nt(l.d, i += 10, m));
      return x = true, y(l, p, m);
    };
    d.minus = d.sub = function(e) {
      var r, t, n, i, o, s, a, l, u, c, p, m, f = this, g = f.constructor;
      if (e = new g(e), !f.d || !e.d) return !f.s || !e.s ? e = new g(NaN) : f.d ? e.s = -e.s : e = new g(e.d || f.s !== e.s ? f : NaN), e;
      if (f.s != e.s) return e.s = -e.s, f.plus(e);
      if (u = f.d, m = e.d, a = g.precision, l = g.rounding, !u[0] || !m[0]) {
        if (m[0]) e.s = -e.s;
        else if (u[0]) e = new g(f);
        else return new g(l === 3 ? -0 : 0);
        return x ? y(e, a, l) : e;
      }
      if (t = re(e.e / b), c = re(f.e / b), u = u.slice(), o = c - t, o) {
        for (p = o < 0, p ? (r = u, o = -o, s = m.length) : (r = m, t = c, s = u.length), n = Math.max(Math.ceil(a / b), s) + 2, o > n && (o = n, r.length = 1), r.reverse(), n = o; n--; ) r.push(0);
        r.reverse();
      } else {
        for (n = u.length, s = m.length, p = n < s, p && (s = n), n = 0; n < s; n++) if (u[n] != m[n]) {
          p = u[n] < m[n];
          break;
        }
        o = 0;
      }
      for (p && (r = u, u = m, m = r, e.s = -e.s), s = u.length, n = m.length - s; n > 0; --n) u[s++] = 0;
      for (n = m.length; n > o; ) {
        if (u[--n] < m[n]) {
          for (i = n; i && u[--i] === 0; ) u[i] = he - 1;
          --u[i], u[n] += he;
        }
        u[n] -= m[n];
      }
      for (; u[--s] === 0; ) u.pop();
      for (; u[0] === 0; u.shift()) --t;
      return u[0] ? (e.d = u, e.e = en(u, t), x ? y(e, a, l) : e) : new g(l === 3 ? -0 : 0);
    };
    d.modulo = d.mod = function(e) {
      var r, t = this, n = t.constructor;
      return e = new n(e), !t.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || t.d && !t.d[0] ? y(new n(t), n.precision, n.rounding) : (x = false, n.modulo == 9 ? (r = O(t, e.abs(), 0, 3, 1), r.s *= e.s) : r = O(t, e, 0, n.modulo, 1), r = r.times(e), x = true, t.minus(r));
    };
    d.naturalExponential = d.exp = function() {
      return xi(this);
    };
    d.naturalLogarithm = d.ln = function() {
      return Ue(this);
    };
    d.negated = d.neg = function() {
      var e = new this.constructor(this);
      return e.s = -e.s, y(e);
    };
    d.plus = d.add = function(e) {
      var r, t, n, i, o, s, a, l, u, c, p = this, m = p.constructor;
      if (e = new m(e), !p.d || !e.d) return !p.s || !e.s ? e = new m(NaN) : p.d || (e = new m(e.d || p.s === e.s ? p : NaN)), e;
      if (p.s != e.s) return e.s = -e.s, p.minus(e);
      if (u = p.d, c = e.d, a = m.precision, l = m.rounding, !u[0] || !c[0]) return c[0] || (e = new m(p)), x ? y(e, a, l) : e;
      if (o = re(p.e / b), n = re(e.e / b), u = u.slice(), i = o - n, i) {
        for (i < 0 ? (t = u, i = -i, s = c.length) : (t = c, n = o, s = u.length), o = Math.ceil(a / b), s = o > s ? o + 1 : s + 1, i > s && (i = s, t.length = 1), t.reverse(); i--; ) t.push(0);
        t.reverse();
      }
      for (s = u.length, i = c.length, s - i < 0 && (i = s, t = c, c = u, u = t), r = 0; i; ) r = (u[--i] = u[i] + c[i] + r) / he | 0, u[i] %= he;
      for (r && (u.unshift(r), ++n), s = u.length; u[--s] == 0; ) u.pop();
      return e.d = u, e.e = en(u, n), x ? y(e, a, l) : e;
    };
    d.precision = d.sd = function(e) {
      var r, t = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Qe + e);
      return t.d ? (r = bs(t.d), e && t.e + 1 > r && (r = t.e + 1)) : r = NaN, r;
    };
    d.round = function() {
      var e = this, r = e.constructor;
      return y(new r(e), e.e + 1, r.rounding);
    };
    d.sine = d.sin = function() {
      var e, r, t = this, n = t.constructor;
      return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + b, n.rounding = 1, t = lc(n, vs(n, t)), n.precision = e, n.rounding = r, y(Oe > 2 ? t.neg() : t, e, r, true)) : new n(NaN);
    };
    d.squareRoot = d.sqrt = function() {
      var e, r, t, n, i, o, s = this, a = s.d, l = s.e, u = s.s, c = s.constructor;
      if (u !== 1 || !a || !a[0]) return new c(!u || u < 0 && (!a || a[0]) ? NaN : a ? s : 1 / 0);
      for (x = false, u = Math.sqrt(+s), u == 0 || u == 1 / 0 ? (r = z(a), (r.length + l) % 2 == 0 && (r += "0"), u = Math.sqrt(r), l = re((l + 1) / 2) - (l < 0 || l % 2), u == 1 / 0 ? r = "5e" + l : (r = u.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + l), n = new c(r)) : n = new c(u.toString()), t = (l = c.precision) + 3; ; ) if (o = n, n = o.plus(O(s, o, t + 2, 1)).times(0.5), z(o.d).slice(0, t) === (r = z(n.d)).slice(0, t)) if (r = r.slice(t - 3, t + 1), r == "9999" || !i && r == "4999") {
        if (!i && (y(o, l + 1, 0), o.times(o).eq(s))) {
          n = o;
          break;
        }
        t += 4, i = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (y(n, l + 1, 1), e = !n.times(n).eq(s));
        break;
      }
      return x = true, y(n, l, c.rounding, e);
    };
    d.tangent = d.tan = function() {
      var e, r, t = this, n = t.constructor;
      return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 10, n.rounding = 1, t = t.sin(), t.s = 1, t = O(t, new n(1).minus(t.times(t)).sqrt(), e + 10, 0), n.precision = e, n.rounding = r, y(Oe == 2 || Oe == 4 ? t.neg() : t, e, r, true)) : new n(NaN);
    };
    d.times = d.mul = function(e) {
      var r, t, n, i, o, s, a, l, u, c = this, p = c.constructor, m = c.d, f = (e = new p(e)).d;
      if (e.s *= c.s, !m || !m[0] || !f || !f[0]) return new p(!e.s || m && !m[0] && !f || f && !f[0] && !m ? NaN : !m || !f ? e.s / 0 : e.s * 0);
      for (t = re(c.e / b) + re(e.e / b), l = m.length, u = f.length, l < u && (o = m, m = f, f = o, s = l, l = u, u = s), o = [], s = l + u, n = s; n--; ) o.push(0);
      for (n = u; --n >= 0; ) {
        for (r = 0, i = l + n; i > n; ) a = o[i] + f[n] * m[i - n - 1] + r, o[i--] = a % he | 0, r = a / he | 0;
        o[i] = (o[i] + r) % he | 0;
      }
      for (; !o[--s]; ) o.pop();
      return r ? ++t : o.shift(), e.d = o, e.e = en(o, t), x ? y(e, p.precision, p.rounding) : e;
    };
    d.toBinary = function(e, r) {
      return vi(this, 2, e, r);
    };
    d.toDecimalPlaces = d.toDP = function(e, r) {
      var t = this, n = t.constructor;
      return t = new n(t), e === void 0 ? t : (se(e, 0, Ge), r === void 0 ? r = n.rounding : se(r, 0, 8), y(t, e + t.e + 1, r));
    };
    d.toExponential = function(e, r) {
      var t, n = this, i = n.constructor;
      return e === void 0 ? t = ve(n, true) : (se(e, 0, Ge), r === void 0 ? r = i.rounding : se(r, 0, 8), n = y(new i(n), e + 1, r), t = ve(n, true, e + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
    };
    d.toFixed = function(e, r) {
      var t, n, i = this, o = i.constructor;
      return e === void 0 ? t = ve(i) : (se(e, 0, Ge), r === void 0 ? r = o.rounding : se(r, 0, 8), n = y(new o(i), e + i.e + 1, r), t = ve(n, false, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + t : t;
    };
    d.toFraction = function(e) {
      var r, t, n, i, o, s, a, l, u, c, p, m, f = this, g = f.d, h = f.constructor;
      if (!g) return new h(f);
      if (u = t = new h(1), n = l = new h(0), r = new h(n), o = r.e = bs(g) - f.e - 1, s = o % b, r.d[0] = Q(10, s < 0 ? b + s : s), e == null) e = o > 0 ? r : u;
      else {
        if (a = new h(e), !a.isInt() || a.lt(u)) throw Error(Qe + a);
        e = a.gt(r) ? o > 0 ? r : u : a;
      }
      for (x = false, a = new h(z(g)), c = h.precision, h.precision = o = g.length * b * 2; p = O(a, r, 0, 1, 1), i = t.plus(p.times(n)), i.cmp(e) != 1; ) t = n, n = i, i = u, u = l.plus(p.times(i)), l = i, i = r, r = a.minus(p.times(i)), a = i;
      return i = O(e.minus(t), n, 0, 1, 1), l = l.plus(i.times(u)), t = t.plus(i.times(n)), l.s = u.s = f.s, m = O(u, n, o, 1).minus(f).abs().cmp(O(l, t, o, 1).minus(f).abs()) < 1 ? [u, n] : [l, t], h.precision = c, x = true, m;
    };
    d.toHexadecimal = d.toHex = function(e, r) {
      return vi(this, 16, e, r);
    };
    d.toNearest = function(e, r) {
      var t = this, n = t.constructor;
      if (t = new n(t), e == null) {
        if (!t.d) return t;
        e = new n(1), r = n.rounding;
      } else {
        if (e = new n(e), r === void 0 ? r = n.rounding : se(r, 0, 8), !t.d) return e.s ? t : e;
        if (!e.d) return e.s && (e.s = t.s), e;
      }
      return e.d[0] ? (x = false, t = O(t, e, 0, r, 1).times(e), x = true, y(t)) : (e.s = t.s, t = e), t;
    };
    d.toNumber = function() {
      return +this;
    };
    d.toOctal = function(e, r) {
      return vi(this, 8, e, r);
    };
    d.toPower = d.pow = function(e) {
      var r, t, n, i, o, s, a = this, l = a.constructor, u = +(e = new l(e));
      if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new l(Q(+a, u));
      if (a = new l(a), a.eq(1)) return a;
      if (n = l.precision, o = l.rounding, e.eq(1)) return y(a, n, o);
      if (r = re(e.e / b), r >= e.d.length - 1 && (t = u < 0 ? -u : u) <= ic) return i = ws(l, a, t, n), e.s < 0 ? new l(1).div(i) : y(i, n, o);
      if (s = a.s, s < 0) {
        if (r < e.d.length - 1) return new l(NaN);
        if (e.d[r] & 1 || (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1) return a.s = s, a;
      }
      return t = Q(+a, u), r = t == 0 || !isFinite(t) ? re(u * (Math.log("0." + z(a.d)) / Math.LN10 + a.e + 1)) : new l(t + "").e, r > l.maxE + 1 || r < l.minE - 1 ? new l(r > 0 ? s / 0 : 0) : (x = false, l.rounding = a.s = 1, t = Math.min(12, (r + "").length), i = xi(e.times(Ue(a, n + t)), n), i.d && (i = y(i, n + 5, 1), nt(i.d, n, o) && (r = n + 10, i = y(xi(e.times(Ue(a, r + t)), r), r + 5, 1), +z(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = y(i, n + 1, 0)))), i.s = s, x = true, l.rounding = o, y(i, n, o));
    };
    d.toPrecision = function(e, r) {
      var t, n = this, i = n.constructor;
      return e === void 0 ? t = ve(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (se(e, 1, Ge), r === void 0 ? r = i.rounding : se(r, 0, 8), n = y(new i(n), e, r), t = ve(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + t : t;
    };
    d.toSignificantDigits = d.toSD = function(e, r) {
      var t = this, n = t.constructor;
      return e === void 0 ? (e = n.precision, r = n.rounding) : (se(e, 1, Ge), r === void 0 ? r = n.rounding : se(r, 0, 8)), y(new n(t), e, r);
    };
    d.toString = function() {
      var e = this, r = e.constructor, t = ve(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
      return e.isNeg() && !e.isZero() ? "-" + t : t;
    };
    d.truncated = d.trunc = function() {
      return y(new this.constructor(this), this.e + 1, 1);
    };
    d.valueOf = d.toJSON = function() {
      var e = this, r = e.constructor, t = ve(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
      return e.isNeg() ? "-" + t : t;
    };
    function z(e) {
      var r, t, n, i = e.length - 1, o = "", s = e[0];
      if (i > 0) {
        for (o += s, r = 1; r < i; r++) n = e[r] + "", t = b - n.length, t && (o += je(t)), o += n;
        s = e[r], n = s + "", t = b - n.length, t && (o += je(t));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(z, "z");
    function se(e, r, t) {
      if (e !== ~~e || e < r || e > t) throw Error(Qe + e);
    }
    __name(se, "se");
    function nt(e, r, t, n) {
      var i, o, s, a;
      for (o = e[0]; o >= 10; o /= 10) --r;
      return --r < 0 ? (r += b, i = 0) : (i = Math.ceil((r + 1) / b), r %= b), o = Q(10, b - r), a = e[i] % o | 0, n == null ? r < 3 ? (r == 0 ? a = a / 100 | 0 : r == 1 && (a = a / 10 | 0), s = t < 4 && a == 99999 || t > 3 && a == 49999 || a == 5e4 || a == 0) : s = (t < 4 && a + 1 == o || t > 3 && a + 1 == o / 2) && (e[i + 1] / o / 100 | 0) == Q(10, r - 2) - 1 || (a == o / 2 || a == 0) && (e[i + 1] / o / 100 | 0) == 0 : r < 4 ? (r == 0 ? a = a / 1e3 | 0 : r == 1 ? a = a / 100 | 0 : r == 2 && (a = a / 10 | 0), s = (n || t < 4) && a == 9999 || !n && t > 3 && a == 4999) : s = ((n || t < 4) && a + 1 == o || !n && t > 3 && a + 1 == o / 2) && (e[i + 1] / o / 1e3 | 0) == Q(10, r - 3) - 1, s;
    }
    __name(nt, "nt");
    function Kt(e, r, t) {
      for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
        for (o = i.length; o--; ) i[o] *= r;
        for (i[0] += Ei.indexOf(e.charAt(s++)), n = 0; n < i.length; n++) i[n] > t - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / t | 0, i[n] %= t);
      }
      return i.reverse();
    }
    __name(Kt, "Kt");
    function sc(e, r) {
      var t, n, i;
      if (r.isZero()) return r;
      n = r.d.length, n < 32 ? (t = Math.ceil(n / 3), i = (1 / rn(4, t)).toString()) : (t = 16, i = "2.3283064365386962890625e-10"), e.precision += t, r = xr(e, 1, r.times(i), new e(1));
      for (var o = t; o--; ) {
        var s = r.times(r);
        r = s.times(s).minus(s).times(8).plus(1);
      }
      return e.precision -= t, r;
    }
    __name(sc, "sc");
    var O = /* @__PURE__ */ function() {
      function e(n, i, o) {
        var s, a = 0, l = n.length;
        for (n = n.slice(); l--; ) s = n[l] * i + a, n[l] = s % o | 0, a = s / o | 0;
        return a && n.unshift(a), n;
      }
      __name(e, "e");
      function r(n, i, o, s) {
        var a, l;
        if (o != s) l = o > s ? 1 : -1;
        else for (a = l = 0; a < o; a++) if (n[a] != i[a]) {
          l = n[a] > i[a] ? 1 : -1;
          break;
        }
        return l;
      }
      __name(r, "r");
      function t(n, i, o, s) {
        for (var a = 0; o--; ) n[o] -= a, a = n[o] < i[o] ? 1 : 0, n[o] = a * s + n[o] - i[o];
        for (; !n[0] && n.length > 1; ) n.shift();
      }
      __name(t, "t");
      return function(n, i, o, s, a, l) {
        var u, c, p, m, f, g, h, A, T, C, E, I, me, le, Lr, U, ne, Ae, Y, cr, St = n.constructor, _n = n.s == i.s ? 1 : -1, Z = n.d, L = i.d;
        if (!Z || !Z[0] || !L || !L[0]) return new St(!n.s || !i.s || (Z ? L && Z[0] == L[0] : !L) ? NaN : Z && Z[0] == 0 || !L ? _n * 0 : _n / 0);
        for (l ? (f = 1, c = n.e - i.e) : (l = he, f = b, c = re(n.e / f) - re(i.e / f)), Y = L.length, ne = Z.length, T = new St(_n), C = T.d = [], p = 0; L[p] == (Z[p] || 0); p++) ;
        if (L[p] > (Z[p] || 0) && c--, o == null ? (le = o = St.precision, s = St.rounding) : a ? le = o + (n.e - i.e) + 1 : le = o, le < 0) C.push(1), g = true;
        else {
          if (le = le / f + 2 | 0, p = 0, Y == 1) {
            for (m = 0, L = L[0], le++; (p < ne || m) && le--; p++) Lr = m * l + (Z[p] || 0), C[p] = Lr / L | 0, m = Lr % L | 0;
            g = m || p < ne;
          } else {
            for (m = l / (L[0] + 1) | 0, m > 1 && (L = e(L, m, l), Z = e(Z, m, l), Y = L.length, ne = Z.length), U = Y, E = Z.slice(0, Y), I = E.length; I < Y; ) E[I++] = 0;
            cr = L.slice(), cr.unshift(0), Ae = L[0], L[1] >= l / 2 && ++Ae;
            do
              m = 0, u = r(L, E, Y, I), u < 0 ? (me = E[0], Y != I && (me = me * l + (E[1] || 0)), m = me / Ae | 0, m > 1 ? (m >= l && (m = l - 1), h = e(L, m, l), A = h.length, I = E.length, u = r(h, E, A, I), u == 1 && (m--, t(h, Y < A ? cr : L, A, l))) : (m == 0 && (u = m = 1), h = L.slice()), A = h.length, A < I && h.unshift(0), t(E, h, I, l), u == -1 && (I = E.length, u = r(L, E, Y, I), u < 1 && (m++, t(E, Y < I ? cr : L, I, l))), I = E.length) : u === 0 && (m++, E = [0]), C[p++] = m, u && E[0] ? E[I++] = Z[U] || 0 : (E = [Z[U]], I = 1);
            while ((U++ < ne || E[0] !== void 0) && le--);
            g = E[0] !== void 0;
          }
          C[0] || C.shift();
        }
        if (f == 1) T.e = c, fs = g;
        else {
          for (p = 1, m = C[0]; m >= 10; m /= 10) p++;
          T.e = p + c * f - 1, y(T, a ? o + T.e + 1 : o, s, g);
        }
        return T;
      };
    }();
    function y(e, r, t, n) {
      var i, o, s, a, l, u, c, p, m, f = e.constructor;
      e: if (r != null) {
        if (p = e.d, !p) return e;
        for (i = 1, a = p[0]; a >= 10; a /= 10) i++;
        if (o = r - i, o < 0) o += b, s = r, c = p[m = 0], l = c / Q(10, i - s - 1) % 10 | 0;
        else if (m = Math.ceil((o + 1) / b), a = p.length, m >= a) if (n) {
          for (; a++ <= m; ) p.push(0);
          c = l = 0, i = 1, o %= b, s = o - b + 1;
        } else break e;
        else {
          for (c = a = p[m], i = 1; a >= 10; a /= 10) i++;
          o %= b, s = o - b + i, l = s < 0 ? 0 : c / Q(10, i - s - 1) % 10 | 0;
        }
        if (n = n || r < 0 || p[m + 1] !== void 0 || (s < 0 ? c : c % Q(10, i - s - 1)), u = t < 4 ? (l || n) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (t == 4 || n || t == 6 && (o > 0 ? s > 0 ? c / Q(10, i - s) : 0 : p[m - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), r < 1 || !p[0]) return p.length = 0, u ? (r -= e.e + 1, p[0] = Q(10, (b - r % b) % b), e.e = -r || 0) : p[0] = e.e = 0, e;
        if (o == 0 ? (p.length = m, a = 1, m--) : (p.length = m + 1, a = Q(10, b - o), p[m] = s > 0 ? (c / Q(10, i - s) % Q(10, s) | 0) * a : 0), u) for (; ; ) if (m == 0) {
          for (o = 1, s = p[0]; s >= 10; s /= 10) o++;
          for (s = p[0] += a, a = 1; s >= 10; s /= 10) a++;
          o != a && (e.e++, p[0] == he && (p[0] = 1));
          break;
        } else {
          if (p[m] += a, p[m] != he) break;
          p[m--] = 0, a = 1;
        }
        for (o = p.length; p[--o] === 0; ) p.pop();
      }
      return x && (e.e > f.maxE ? (e.d = null, e.e = NaN) : e.e < f.minE && (e.e = 0, e.d = [0])), e;
    }
    __name(y, "y");
    function ve(e, r, t) {
      if (!e.isFinite()) return Ps(e);
      var n, i = e.e, o = z(e.d), s = o.length;
      return r ? (t && (n = t - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + je(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (o = "0." + je(-i - 1) + o, t && (n = t - s) > 0 && (o += je(n))) : i >= s ? (o += je(i + 1 - s), t && (n = t - i - 1) > 0 && (o = o + "." + je(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), t && (n = t - s) > 0 && (i + 1 === s && (o += "."), o += je(n))), o;
    }
    __name(ve, "ve");
    function en(e, r) {
      var t = e[0];
      for (r *= b; t >= 10; t /= 10) r++;
      return r;
    }
    __name(en, "en");
    function Zt(e, r, t) {
      if (r > oc) throw x = true, t && (e.precision = t), Error(gs);
      return y(new e(zt), r, 1, true);
    }
    __name(Zt, "Zt");
    function ge(e, r, t) {
      if (r > wi) throw Error(gs);
      return y(new e(Yt), r, t, true);
    }
    __name(ge, "ge");
    function bs(e) {
      var r = e.length - 1, t = r * b + 1;
      if (r = e[r], r) {
        for (; r % 10 == 0; r /= 10) t--;
        for (r = e[0]; r >= 10; r /= 10) t++;
      }
      return t;
    }
    __name(bs, "bs");
    function je(e) {
      for (var r = ""; e--; ) r += "0";
      return r;
    }
    __name(je, "je");
    function ws(e, r, t, n) {
      var i, o = new e(1), s = Math.ceil(n / b + 4);
      for (x = false; ; ) {
        if (t % 2 && (o = o.times(r), ms(o.d, s) && (i = true)), t = re(t / 2), t === 0) {
          t = o.d.length - 1, i && o.d[t] === 0 && ++o.d[t];
          break;
        }
        r = r.times(r), ms(r.d, s);
      }
      return x = true, o;
    }
    __name(ws, "ws");
    function ps(e) {
      return e.d[e.d.length - 1] & 1;
    }
    __name(ps, "ps");
    function xs(e, r, t) {
      for (var n, i = new e(r[0]), o = 0; ++o < r.length; ) if (n = new e(r[o]), n.s) i[t](n) && (i = n);
      else {
        i = n;
        break;
      }
      return i;
    }
    __name(xs, "xs");
    function xi(e, r) {
      var t, n, i, o, s, a, l, u = 0, c = 0, p = 0, m = e.constructor, f = m.rounding, g = m.precision;
      if (!e.d || !e.d[0] || e.e > 17) return new m(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
      for (r == null ? (x = false, l = g) : l = r, a = new m(0.03125); e.e > -2; ) e = e.times(a), p += 5;
      for (n = Math.log(Q(2, p)) / Math.LN10 * 2 + 5 | 0, l += n, t = o = s = new m(1), m.precision = l; ; ) {
        if (o = y(o.times(e), l, 1), t = t.times(++c), a = s.plus(O(o, t, l, 1)), z(a.d).slice(0, l) === z(s.d).slice(0, l)) {
          for (i = p; i--; ) s = y(s.times(s), l, 1);
          if (r == null) if (u < 3 && nt(s.d, l - n, f, u)) m.precision = l += 10, t = o = a = new m(1), c = 0, u++;
          else return y(s, m.precision = g, f, x = true);
          else return m.precision = g, s;
        }
        s = a;
      }
    }
    __name(xi, "xi");
    function Ue(e, r) {
      var t, n, i, o, s, a, l, u, c, p, m, f = 1, g = 10, h = e, A = h.d, T = h.constructor, C = T.rounding, E = T.precision;
      if (h.s < 0 || !A || !A[0] || !h.e && A[0] == 1 && A.length == 1) return new T(A && !A[0] ? -1 / 0 : h.s != 1 ? NaN : A ? 0 : h);
      if (r == null ? (x = false, c = E) : c = r, T.precision = c += g, t = z(A), n = t.charAt(0), Math.abs(o = h.e) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && t.charAt(1) > 3; ) h = h.times(e), t = z(h.d), n = t.charAt(0), f++;
        o = h.e, n > 1 ? (h = new T("0." + t), o++) : h = new T(n + "." + t.slice(1));
      } else return u = Zt(T, c + 2, E).times(o + ""), h = Ue(new T(n + "." + t.slice(1)), c - g).plus(u), T.precision = E, r == null ? y(h, E, C, x = true) : h;
      for (p = h, l = s = h = O(h.minus(1), h.plus(1), c, 1), m = y(h.times(h), c, 1), i = 3; ; ) {
        if (s = y(s.times(m), c, 1), u = l.plus(O(s, new T(i), c, 1)), z(u.d).slice(0, c) === z(l.d).slice(0, c)) if (l = l.times(2), o !== 0 && (l = l.plus(Zt(T, c + 2, E).times(o + ""))), l = O(l, new T(f), c, 1), r == null) if (nt(l.d, c - g, C, a)) T.precision = c += g, u = s = h = O(p.minus(1), p.plus(1), c, 1), m = y(h.times(h), c, 1), i = a = 1;
        else return y(l, T.precision = E, C, x = true);
        else return T.precision = E, l;
        l = u, i += 2;
      }
    }
    __name(Ue, "Ue");
    function Ps(e) {
      return String(e.s * e.s / 0);
    }
    __name(Ps, "Ps");
    function Pi(e, r) {
      var t, n, i;
      for ((t = r.indexOf(".")) > -1 && (r = r.replace(".", "")), (n = r.search(/e/i)) > 0 ? (t < 0 && (t = n), t += +r.slice(n + 1), r = r.substring(0, n)) : t < 0 && (t = r.length), n = 0; r.charCodeAt(n) === 48; n++) ;
      for (i = r.length; r.charCodeAt(i - 1) === 48; --i) ;
      if (r = r.slice(n, i), r) {
        if (i -= n, e.e = t = t - n - 1, e.d = [], n = (t + 1) % b, t < 0 && (n += b), n < i) {
          for (n && e.d.push(+r.slice(0, n)), i -= b; n < i; ) e.d.push(+r.slice(n, n += b));
          r = r.slice(n), n = b - r.length;
        } else n -= i;
        for (; n--; ) r += "0";
        e.d.push(+r), x && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
      } else e.e = 0, e.d = [0];
      return e;
    }
    __name(Pi, "Pi");
    function ac(e, r) {
      var t, n, i, o, s, a, l, u, c;
      if (r.indexOf("_") > -1) {
        if (r = r.replace(/(\d)_(?=\d)/g, "$1"), Es.test(r)) return Pi(e, r);
      } else if (r === "Infinity" || r === "NaN") return +r || (e.s = NaN), e.e = NaN, e.d = null, e;
      if (tc.test(r)) t = 16, r = r.toLowerCase();
      else if (rc.test(r)) t = 2;
      else if (nc.test(r)) t = 8;
      else throw Error(Qe + r);
      for (o = r.search(/p/i), o > 0 ? (l = +r.slice(o + 1), r = r.substring(2, o)) : r = r.slice(2), o = r.indexOf("."), s = o >= 0, n = e.constructor, s && (r = r.replace(".", ""), a = r.length, o = a - o, i = ws(n, new n(t), o, o * 2)), u = Kt(r, t, he), c = u.length - 1, o = c; u[o] === 0; --o) u.pop();
      return o < 0 ? new n(e.s * 0) : (e.e = en(u, c), e.d = u, x = false, s && (e = O(e, i, a * 4)), l && (e = e.times(Math.abs(l) < 54 ? Q(2, l) : ir.pow(2, l))), x = true, e);
    }
    __name(ac, "ac");
    function lc(e, r) {
      var t, n = r.d.length;
      if (n < 3) return r.isZero() ? r : xr(e, 2, r, r);
      t = 1.4 * Math.sqrt(n), t = t > 16 ? 16 : t | 0, r = r.times(1 / rn(5, t)), r = xr(e, 2, r, r);
      for (var i, o = new e(5), s = new e(16), a = new e(20); t--; ) i = r.times(r), r = r.times(o.plus(i.times(s.times(i).minus(a))));
      return r;
    }
    __name(lc, "lc");
    function xr(e, r, t, n, i) {
      var o, s, a, l, u = 1, c = e.precision, p = Math.ceil(c / b);
      for (x = false, l = t.times(t), a = new e(n); ; ) {
        if (s = O(a.times(l), new e(r++ * r++), c, 1), a = i ? n.plus(s) : n.minus(s), n = O(s.times(l), new e(r++ * r++), c, 1), s = a.plus(n), s.d[p] !== void 0) {
          for (o = p; s.d[o] === a.d[o] && o--; ) ;
          if (o == -1) break;
        }
        o = a, a = n, n = s, s = o, u++;
      }
      return x = true, s.d.length = p + 1, s;
    }
    __name(xr, "xr");
    function rn(e, r) {
      for (var t = e; --r; ) t *= e;
      return t;
    }
    __name(rn, "rn");
    function vs(e, r) {
      var t, n = r.s < 0, i = ge(e, e.precision, 1), o = i.times(0.5);
      if (r = r.abs(), r.lte(o)) return Oe = n ? 4 : 1, r;
      if (t = r.divToInt(i), t.isZero()) Oe = n ? 3 : 2;
      else {
        if (r = r.minus(t.times(i)), r.lte(o)) return Oe = ps(t) ? n ? 2 : 3 : n ? 4 : 1, r;
        Oe = ps(t) ? n ? 1 : 4 : n ? 3 : 2;
      }
      return r.minus(i).abs();
    }
    __name(vs, "vs");
    function vi(e, r, t, n) {
      var i, o, s, a, l, u, c, p, m, f = e.constructor, g = t !== void 0;
      if (g ? (se(t, 1, Ge), n === void 0 ? n = f.rounding : se(n, 0, 8)) : (t = f.precision, n = f.rounding), !e.isFinite()) c = Ps(e);
      else {
        for (c = ve(e), s = c.indexOf("."), g ? (i = 2, r == 16 ? t = t * 4 - 3 : r == 8 && (t = t * 3 - 2)) : i = r, s >= 0 && (c = c.replace(".", ""), m = new f(1), m.e = c.length - s, m.d = Kt(ve(m), 10, i), m.e = m.d.length), p = Kt(c, 10, i), o = l = p.length; p[--l] == 0; ) p.pop();
        if (!p[0]) c = g ? "0p+0" : "0";
        else {
          if (s < 0 ? o-- : (e = new f(e), e.d = p, e.e = o, e = O(e, m, t, n, 0, i), p = e.d, o = e.e, u = fs), s = p[t], a = i / 2, u = u || p[t + 1] !== void 0, u = n < 4 ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : s > a || s === a && (n === 4 || u || n === 6 && p[t - 1] & 1 || n === (e.s < 0 ? 8 : 7)), p.length = t, u) for (; ++p[--t] > i - 1; ) p[t] = 0, t || (++o, p.unshift(1));
          for (l = p.length; !p[l - 1]; --l) ;
          for (s = 0, c = ""; s < l; s++) c += Ei.charAt(p[s]);
          if (g) {
            if (l > 1) if (r == 16 || r == 8) {
              for (s = r == 16 ? 4 : 3, --l; l % s; l++) c += "0";
              for (p = Kt(c, i, r), l = p.length; !p[l - 1]; --l) ;
              for (s = 1, c = "1."; s < l; s++) c += Ei.charAt(p[s]);
            } else c = c.charAt(0) + "." + c.slice(1);
            c = c + (o < 0 ? "p" : "p+") + o;
          } else if (o < 0) {
            for (; ++o; ) c = "0" + c;
            c = "0." + c;
          } else if (++o > l) for (o -= l; o--; ) c += "0";
          else o < l && (c = c.slice(0, o) + "." + c.slice(o));
        }
        c = (r == 16 ? "0x" : r == 2 ? "0b" : r == 8 ? "0o" : "") + c;
      }
      return e.s < 0 ? "-" + c : c;
    }
    __name(vi, "vi");
    function ms(e, r) {
      if (e.length > r) return e.length = r, true;
    }
    __name(ms, "ms");
    function uc(e) {
      return new this(e).abs();
    }
    __name(uc, "uc");
    function cc(e) {
      return new this(e).acos();
    }
    __name(cc, "cc");
    function pc(e) {
      return new this(e).acosh();
    }
    __name(pc, "pc");
    function mc(e, r) {
      return new this(e).plus(r);
    }
    __name(mc, "mc");
    function dc(e) {
      return new this(e).asin();
    }
    __name(dc, "dc");
    function fc(e) {
      return new this(e).asinh();
    }
    __name(fc, "fc");
    function gc(e) {
      return new this(e).atan();
    }
    __name(gc, "gc");
    function hc(e) {
      return new this(e).atanh();
    }
    __name(hc, "hc");
    function yc(e, r) {
      e = new this(e), r = new this(r);
      var t, n = this.precision, i = this.rounding, o = n + 4;
      return !e.s || !r.s ? t = new this(NaN) : !e.d && !r.d ? (t = ge(this, o, 1).times(r.s > 0 ? 0.25 : 0.75), t.s = e.s) : !r.d || e.isZero() ? (t = r.s < 0 ? ge(this, n, i) : new this(0), t.s = e.s) : !e.d || r.isZero() ? (t = ge(this, o, 1).times(0.5), t.s = e.s) : r.s < 0 ? (this.precision = o, this.rounding = 1, t = this.atan(O(e, r, o, 1)), r = ge(this, o, 1), this.precision = n, this.rounding = i, t = e.s < 0 ? t.minus(r) : t.plus(r)) : t = this.atan(O(e, r, o, 1)), t;
    }
    __name(yc, "yc");
    function Ec(e) {
      return new this(e).cbrt();
    }
    __name(Ec, "Ec");
    function bc(e) {
      return y(e = new this(e), e.e + 1, 2);
    }
    __name(bc, "bc");
    function wc(e, r, t) {
      return new this(e).clamp(r, t);
    }
    __name(wc, "wc");
    function xc(e) {
      if (!e || typeof e != "object") throw Error(Xt + "Object expected");
      var r, t, n, i = e.defaults === true, o = ["precision", 1, Ge, "rounding", 0, 8, "toExpNeg", -wr, 0, "toExpPos", 0, wr, "maxE", 0, wr, "minE", -wr, 0, "modulo", 0, 9];
      for (r = 0; r < o.length; r += 3) if (t = o[r], i && (this[t] = bi[t]), (n = e[t]) !== void 0) if (re(n) === n && n >= o[r + 1] && n <= o[r + 2]) this[t] = n;
      else throw Error(Qe + t + ": " + n);
      if (t = "crypto", i && (this[t] = bi[t]), (n = e[t]) !== void 0) if (n === true || n === false || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[t] = true;
      else throw Error(hs);
      else this[t] = false;
      else throw Error(Qe + t + ": " + n);
      return this;
    }
    __name(xc, "xc");
    function Pc(e) {
      return new this(e).cos();
    }
    __name(Pc, "Pc");
    function vc(e) {
      return new this(e).cosh();
    }
    __name(vc, "vc");
    function Ts(e) {
      var r, t, n;
      function i(o) {
        var s, a, l, u = this;
        if (!(u instanceof i)) return new i(o);
        if (u.constructor = i, ds(o)) {
          u.s = o.s, x ? !o.d || o.e > i.maxE ? (u.e = NaN, u.d = null) : o.e < i.minE ? (u.e = 0, u.d = [0]) : (u.e = o.e, u.d = o.d.slice()) : (u.e = o.e, u.d = o.d ? o.d.slice() : o.d);
          return;
        }
        if (l = typeof o, l === "number") {
          if (o === 0) {
            u.s = 1 / o < 0 ? -1 : 1, u.e = 0, u.d = [0];
            return;
          }
          if (o < 0 ? (o = -o, u.s = -1) : u.s = 1, o === ~~o && o < 1e7) {
            for (s = 0, a = o; a >= 10; a /= 10) s++;
            x ? s > i.maxE ? (u.e = NaN, u.d = null) : s < i.minE ? (u.e = 0, u.d = [0]) : (u.e = s, u.d = [o]) : (u.e = s, u.d = [o]);
            return;
          } else if (o * 0 !== 0) {
            o || (u.s = NaN), u.e = NaN, u.d = null;
            return;
          }
          return Pi(u, o.toString());
        } else if (l !== "string") throw Error(Qe + o);
        return (a = o.charCodeAt(0)) === 45 ? (o = o.slice(1), u.s = -1) : (a === 43 && (o = o.slice(1)), u.s = 1), Es.test(o) ? Pi(u, o) : ac(u, o);
      }
      __name(i, "i");
      if (i.prototype = d, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = xc, i.clone = Ts, i.isDecimal = ds, i.abs = uc, i.acos = cc, i.acosh = pc, i.add = mc, i.asin = dc, i.asinh = fc, i.atan = gc, i.atanh = hc, i.atan2 = yc, i.cbrt = Ec, i.ceil = bc, i.clamp = wc, i.cos = Pc, i.cosh = vc, i.div = Tc, i.exp = Cc, i.floor = Sc, i.hypot = Rc, i.ln = Ac, i.log = Ic, i.log10 = kc, i.log2 = _c, i.max = Dc, i.min = Lc, i.mod = Nc, i.mul = Oc, i.pow = Fc, i.random = Mc, i.round = $c, i.sign = qc, i.sin = Bc, i.sinh = Vc, i.sqrt = jc, i.sub = Uc, i.sum = Qc, i.tan = Gc, i.tanh = Jc, i.trunc = Hc, e === void 0 && (e = {}), e && e.defaults !== true) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r = 0; r < n.length; ) e.hasOwnProperty(t = n[r++]) || (e[t] = this[t]);
      return i.config(e), i;
    }
    __name(Ts, "Ts");
    function Tc(e, r) {
      return new this(e).div(r);
    }
    __name(Tc, "Tc");
    function Cc(e) {
      return new this(e).exp();
    }
    __name(Cc, "Cc");
    function Sc(e) {
      return y(e = new this(e), e.e + 1, 3);
    }
    __name(Sc, "Sc");
    function Rc() {
      var e, r, t = new this(0);
      for (x = false, e = 0; e < arguments.length; ) if (r = new this(arguments[e++]), r.d) t.d && (t = t.plus(r.times(r)));
      else {
        if (r.s) return x = true, new this(1 / 0);
        t = r;
      }
      return x = true, t.sqrt();
    }
    __name(Rc, "Rc");
    function ds(e) {
      return e instanceof ir || e && e.toStringTag === ys || false;
    }
    __name(ds, "ds");
    function Ac(e) {
      return new this(e).ln();
    }
    __name(Ac, "Ac");
    function Ic(e, r) {
      return new this(e).log(r);
    }
    __name(Ic, "Ic");
    function _c(e) {
      return new this(e).log(2);
    }
    __name(_c, "_c");
    function kc(e) {
      return new this(e).log(10);
    }
    __name(kc, "kc");
    function Dc() {
      return xs(this, arguments, "lt");
    }
    __name(Dc, "Dc");
    function Lc() {
      return xs(this, arguments, "gt");
    }
    __name(Lc, "Lc");
    function Nc(e, r) {
      return new this(e).mod(r);
    }
    __name(Nc, "Nc");
    function Oc(e, r) {
      return new this(e).mul(r);
    }
    __name(Oc, "Oc");
    function Fc(e, r) {
      return new this(e).pow(r);
    }
    __name(Fc, "Fc");
    function Mc(e) {
      var r, t, n, i, o = 0, s = new this(1), a = [];
      if (e === void 0 ? e = this.precision : se(e, 1, Ge), n = Math.ceil(e / b), this.crypto) if (crypto.getRandomValues) for (r = crypto.getRandomValues(new Uint32Array(n)); o < n; ) i = r[o], i >= 429e7 ? r[o] = crypto.getRandomValues(new Uint32Array(1))[0] : a[o++] = i % 1e7;
      else if (crypto.randomBytes) {
        for (r = crypto.randomBytes(n *= 4); o < n; ) i = r[o] + (r[o + 1] << 8) + (r[o + 2] << 16) + ((r[o + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(r, o) : (a.push(i % 1e7), o += 4);
        o = n / 4;
      } else throw Error(hs);
      else for (; o < n; ) a[o++] = Math.random() * 1e7 | 0;
      for (n = a[--o], e %= b, n && e && (i = Q(10, b - e), a[o] = (n / i | 0) * i); a[o] === 0; o--) a.pop();
      if (o < 0) t = 0, a = [0];
      else {
        for (t = -1; a[0] === 0; t -= b) a.shift();
        for (n = 1, i = a[0]; i >= 10; i /= 10) n++;
        n < b && (t -= b - n);
      }
      return s.e = t, s.d = a, s;
    }
    __name(Mc, "Mc");
    function $c(e) {
      return y(e = new this(e), e.e + 1, this.rounding);
    }
    __name($c, "$c");
    function qc(e) {
      return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
    }
    __name(qc, "qc");
    function Bc(e) {
      return new this(e).sin();
    }
    __name(Bc, "Bc");
    function Vc(e) {
      return new this(e).sinh();
    }
    __name(Vc, "Vc");
    function jc(e) {
      return new this(e).sqrt();
    }
    __name(jc, "jc");
    function Uc(e, r) {
      return new this(e).sub(r);
    }
    __name(Uc, "Uc");
    function Qc() {
      var e = 0, r = arguments, t = new this(r[e]);
      for (x = false; t.s && ++e < r.length; ) t = t.plus(r[e]);
      return x = true, y(t, this.precision, this.rounding);
    }
    __name(Qc, "Qc");
    function Gc(e) {
      return new this(e).tan();
    }
    __name(Gc, "Gc");
    function Jc(e) {
      return new this(e).tanh();
    }
    __name(Jc, "Jc");
    function Hc(e) {
      return y(e = new this(e), e.e + 1, 1);
    }
    __name(Hc, "Hc");
    d[Symbol.for("nodejs.util.inspect.custom")] = d.toString;
    d[Symbol.toStringTag] = "Decimal";
    var ir = d.constructor = Ts(bi);
    zt = new ir(zt);
    Yt = new ir(Yt);
    var Te = ir;
    function Pr(e) {
      return ir.isDecimal(e) ? true : e !== null && typeof e == "object" && typeof e.s == "number" && typeof e.e == "number" && typeof e.toFixed == "function" && Array.isArray(e.d);
    }
    __name(Pr, "Pr");
    var it = class {
      static {
        __name(this, "it");
      }
      constructor(r, t, n, i, o) {
        this.modelName = r, this.name = t, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let r = this.isList ? "List" : "", t = this.isEnum ? "Enum" : "";
        return `${r}${t}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function vr(e) {
      return e instanceof it;
    }
    __name(vr, "vr");
    var tn = class {
      static {
        __name(this, "tn");
      }
      constructor(r) {
        this.value = r;
      }
      write(r) {
        r.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    var nn = /* @__PURE__ */ __name((e) => e, "nn");
    var on = { bold: nn, red: nn, green: nn, dim: nn, enabled: false };
    var Cs = { bold: W, red: ce, green: Me, dim: Ie, enabled: true };
    var Tr = { write(e) {
      e.writeLine(",");
    } };
    var Ce = class {
      static {
        __name(this, "Ce");
      }
      constructor(r) {
        this.contents = r;
        this.isUnderlined = false;
        this.color = (r2) => r2;
      }
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(r) {
        return this.color = r, this;
      }
      write(r) {
        let t = r.getCurrentLineLength();
        r.write(this.color(this.contents)), this.isUnderlined && r.afterNextNewline(() => {
          r.write(" ".repeat(t)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    var Je = class {
      static {
        __name(this, "Je");
      }
      constructor() {
        this.hasError = false;
      }
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Cr = class extends Je {
      static {
        __name(this, "Cr");
      }
      constructor() {
        super(...arguments);
        this.items = [];
      }
      addItem(t) {
        return this.items.push(new tn(t)), this;
      }
      getField(t) {
        return this.items[t];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((n) => n.value.getPrintWidth())) + 2;
      }
      write(t) {
        if (this.items.length === 0) {
          this.writeEmpty(t);
          return;
        }
        this.writeWithItems(t);
      }
      writeEmpty(t) {
        let n = new Ce("[]");
        this.hasError && n.setColor(t.context.colors.red).underline(), t.write(n);
      }
      writeWithItems(t) {
        let { colors: n } = t.context;
        t.writeLine("[").withIndent(() => t.writeJoined(Tr, this.items).newLine()).write("]"), this.hasError && t.afterNextNewline(() => {
          t.writeLine(n.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    var Ss = ": ";
    var sn = class {
      static {
        __name(this, "sn");
      }
      constructor(r, t) {
        this.name = r;
        this.value = t;
        this.hasError = false;
      }
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + Ss.length;
      }
      write(r) {
        let t = new Ce(this.name);
        this.hasError && t.underline().setColor(r.context.colors.red), r.write(t).write(Ss).write(this.value);
      }
    };
    var J = class e extends Je {
      static {
        __name(this, "e");
      }
      constructor() {
        super(...arguments);
        this.fields = {};
        this.suggestions = [];
      }
      addField(t) {
        this.fields[t.name] = t;
      }
      addSuggestion(t) {
        this.suggestions.push(t);
      }
      getField(t) {
        return this.fields[t];
      }
      getDeepField(t) {
        let [n, ...i] = t, o = this.getField(n);
        if (!o) return;
        let s = o;
        for (let a of i) {
          let l;
          if (s.value instanceof e ? l = s.value.getField(a) : s.value instanceof Cr && (l = s.value.getField(Number(a))), !l) return;
          s = l;
        }
        return s;
      }
      getDeepFieldValue(t) {
        return t.length === 0 ? this : this.getDeepField(t)?.value;
      }
      hasField(t) {
        return !!this.getField(t);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(t) {
        delete this.fields[t];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(t) {
        return this.getField(t)?.value;
      }
      getDeepSubSelectionValue(t) {
        let n = this;
        for (let i of t) {
          if (!(n instanceof e)) return;
          let o = n.getSubSelectionValue(i);
          if (!o) return;
          n = o;
        }
        return n;
      }
      getDeepSelectionParent(t) {
        let n = this.getSelectionParent();
        if (!n) return;
        let i = n;
        for (let o of t) {
          let s = i.value.getFieldValue(o);
          if (!s || !(s instanceof e)) return;
          let a = s.getSelectionParent();
          if (!a) return;
          i = a;
        }
        return i;
      }
      getSelectionParent() {
        let t = this.getField("select");
        if (t?.value instanceof e) return { kind: "select", value: t.value };
        let n = this.getField("include");
        if (n?.value instanceof e) return { kind: "include", value: n.value };
      }
      getSubSelectionValue(t) {
        return this.getSelectionParent()?.value.fields[t].value;
      }
      getPrintWidth() {
        let t = Object.values(this.fields);
        return t.length == 0 ? 2 : Math.max(...t.map((i) => i.getPrintWidth())) + 2;
      }
      write(t) {
        let n = Object.values(this.fields);
        if (n.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(t);
          return;
        }
        this.writeWithContents(t, n);
      }
      writeEmpty(t) {
        let n = new Ce("{}");
        this.hasError && n.setColor(t.context.colors.red).underline(), t.write(n);
      }
      writeWithContents(t, n) {
        t.writeLine("{").withIndent(() => {
          t.writeJoined(Tr, [...n, ...this.suggestions]).newLine();
        }), t.write("}"), this.hasError && t.afterNextNewline(() => {
          t.writeLine(t.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    var H = class extends Je {
      static {
        __name(this, "H");
      }
      constructor(t) {
        super();
        this.text = t;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(t) {
        let n = new Ce(this.text);
        this.hasError && n.underline().setColor(t.context.colors.red), t.write(n);
      }
    };
    var Ti = class {
      static {
        __name(this, "Ti");
      }
      constructor(r) {
        this.errorMessages = [];
        this.arguments = r;
      }
      write(r) {
        r.write(this.arguments);
      }
      addErrorMessage(r) {
        this.errorMessages.push(r);
      }
      renderAllMessages(r) {
        return this.errorMessages.map((t) => t(r)).join(`
`);
      }
    };
    function an(e) {
      return new Ti(Rs(e));
    }
    __name(an, "an");
    function Rs(e) {
      let r = new J();
      for (let [t, n] of Object.entries(e)) {
        let i = new sn(t, As(n));
        r.addField(i);
      }
      return r;
    }
    __name(Rs, "Rs");
    function As(e) {
      if (typeof e == "string") return new H(JSON.stringify(e));
      if (typeof e == "number" || typeof e == "boolean") return new H(String(e));
      if (typeof e == "bigint") return new H(`${e}n`);
      if (e === null) return new H("null");
      if (e === void 0) return new H("undefined");
      if (Pr(e)) return new H(`new Prisma.Decimal("${e.toFixed()}")`);
      if (e instanceof Uint8Array) return Buffer.isBuffer(e) ? new H(`Buffer.alloc(${e.byteLength})`) : new H(`new Uint8Array(${e.byteLength})`);
      if (e instanceof Date) {
        let r = Wt(e) ? e.toISOString() : "Invalid Date";
        return new H(`new Date("${r}")`);
      }
      return e instanceof Ne ? new H(`Prisma.${e._getName()}`) : vr(e) ? new H(`prisma.${cs(e.modelName)}.$fields.${e.name}`) : Array.isArray(e) ? Kc(e) : typeof e == "object" ? Rs(e) : new H(Object.prototype.toString.call(e));
    }
    __name(As, "As");
    function Kc(e) {
      let r = new Cr();
      for (let t of e) r.addItem(As(t));
      return r;
    }
    __name(Kc, "Kc");
    function Is(e) {
      if (e === void 0) return "";
      let r = an(e);
      return new Er(0, { colors: on }).write(r).toString();
    }
    __name(Is, "Is");
    var zc = "P2037";
    function or({ error: e, user_facing_error: r }, t, n) {
      return r.error_code ? new V(Yc(r, n), { code: r.error_code, clientVersion: t, meta: r.meta, batchRequestIdx: r.batch_request_idx }) : new j(e, { clientVersion: t, batchRequestIdx: r.batch_request_idx });
    }
    __name(or, "or");
    function Yc(e, r) {
      let t = e.message;
      return (r === "postgresql" || r === "postgres" || r === "mysql") && e.error_code === zc && (t += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), t;
    }
    __name(Yc, "Yc");
    var ot = "<unknown>";
    function _s(e) {
      var r = e.split(`
`);
      return r.reduce(function(t, n) {
        var i = ep(n) || tp(n) || op(n) || up(n) || ap(n);
        return i && t.push(i), t;
      }, []);
    }
    __name(_s, "_s");
    var Zc = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    var Xc = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    function ep(e) {
      var r = Zc.exec(e);
      if (!r) return null;
      var t = r[2] && r[2].indexOf("native") === 0, n = r[2] && r[2].indexOf("eval") === 0, i = Xc.exec(r[2]);
      return n && i != null && (r[2] = i[1], r[3] = i[2], r[4] = i[3]), { file: t ? null : r[2], methodName: r[1] || ot, arguments: t ? [r[2]] : [], lineNumber: r[3] ? +r[3] : null, column: r[4] ? +r[4] : null };
    }
    __name(ep, "ep");
    var rp = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function tp(e) {
      var r = rp.exec(e);
      return r ? { file: r[2], methodName: r[1] || ot, arguments: [], lineNumber: +r[3], column: r[4] ? +r[4] : null } : null;
    }
    __name(tp, "tp");
    var np = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
    var ip = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    function op(e) {
      var r = np.exec(e);
      if (!r) return null;
      var t = r[3] && r[3].indexOf(" > eval") > -1, n = ip.exec(r[3]);
      return t && n != null && (r[3] = n[1], r[4] = n[2], r[5] = null), { file: r[3], methodName: r[1] || ot, arguments: r[2] ? r[2].split(",") : [], lineNumber: r[4] ? +r[4] : null, column: r[5] ? +r[5] : null };
    }
    __name(op, "op");
    var sp = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
    function ap(e) {
      var r = sp.exec(e);
      return r ? { file: r[3], methodName: r[1] || ot, arguments: [], lineNumber: +r[4], column: r[5] ? +r[5] : null } : null;
    }
    __name(ap, "ap");
    var lp = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function up(e) {
      var r = lp.exec(e);
      return r ? { file: r[2], methodName: r[1] || ot, arguments: [], lineNumber: +r[3], column: r[4] ? +r[4] : null } : null;
    }
    __name(up, "up");
    var Ci = class {
      static {
        __name(this, "Ci");
      }
      getLocation() {
        return null;
      }
    };
    var Si = class {
      static {
        __name(this, "Si");
      }
      constructor() {
        this._error = new Error();
      }
      getLocation() {
        let r = this._error.stack;
        if (!r) return null;
        let n = _s(r).find((i) => {
          if (!i.file) return false;
          let o = ti(i.file);
          return o !== "<anonymous>" && !o.includes("@prisma") && !o.includes("/packages/client/src/runtime/") && !o.endsWith("/runtime/binary.js") && !o.endsWith("/runtime/library.js") && !o.endsWith("/runtime/edge.js") && !o.endsWith("/runtime/edge-esm.js") && !o.startsWith("internal/") && !i.methodName.includes("new ") && !i.methodName.includes("getCallSite") && !i.methodName.includes("Proxy.") && i.methodName.split(".").length < 4;
        });
        return !n || !n.file ? null : { fileName: n.file, lineNumber: n.lineNumber, columnNumber: n.column };
      }
    };
    function He(e) {
      return e === "minimal" ? typeof $EnabledCallSite == "function" && e !== "minimal" ? new $EnabledCallSite() : new Ci() : new Si();
    }
    __name(He, "He");
    var ks = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Sr(e = {}) {
      let r = pp(e);
      return Object.entries(r).reduce((n, [i, o]) => (ks[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(Sr, "Sr");
    function pp(e = {}) {
      return typeof e._count == "boolean" ? { ...e, _count: { _all: e._count } } : e;
    }
    __name(pp, "pp");
    function ln(e = {}) {
      return (r) => (typeof e._count == "boolean" && (r._count = r._count._all), r);
    }
    __name(ln, "ln");
    function Ds(e, r) {
      let t = ln(e);
      return r({ action: "aggregate", unpacker: t, argsMapper: Sr })(e);
    }
    __name(Ds, "Ds");
    function mp(e = {}) {
      let { select: r, ...t } = e;
      return typeof r == "object" ? Sr({ ...t, _count: r }) : Sr({ ...t, _count: { _all: true } });
    }
    __name(mp, "mp");
    function dp(e = {}) {
      return typeof e.select == "object" ? (r) => ln(e)(r)._count : (r) => ln(e)(r)._count._all;
    }
    __name(dp, "dp");
    function Ls(e, r) {
      return r({ action: "count", unpacker: dp(e), argsMapper: mp })(e);
    }
    __name(Ls, "Ls");
    function fp(e = {}) {
      let r = Sr(e);
      if (Array.isArray(r.by)) for (let t of r.by) typeof t == "string" && (r.select[t] = true);
      else typeof r.by == "string" && (r.select[r.by] = true);
      return r;
    }
    __name(fp, "fp");
    function gp(e = {}) {
      return (r) => (typeof e?._count == "boolean" && r.forEach((t) => {
        t._count = t._count._all;
      }), r);
    }
    __name(gp, "gp");
    function Ns(e, r) {
      return r({ action: "groupBy", unpacker: gp(e), argsMapper: fp })(e);
    }
    __name(Ns, "Ns");
    function Os(e, r, t) {
      if (r === "aggregate") return (n) => Ds(n, t);
      if (r === "count") return (n) => Ls(n, t);
      if (r === "groupBy") return (n) => Ns(n, t);
    }
    __name(Os, "Os");
    function Fs(e, r) {
      let t = r.fields.filter((i) => !i.relationName), n = ui(t, (i) => i.name);
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new it(e, o, s.type, s.isList, s.kind === "enum");
      }, ...Ht(Object.keys(n)) });
    }
    __name(Fs, "Fs");
    var Ms = /* @__PURE__ */ __name((e) => Array.isArray(e) ? e : e.split("."), "Ms");
    var Ri = /* @__PURE__ */ __name((e, r) => Ms(r).reduce((t, n) => t && t[n], e), "Ri");
    var $s = /* @__PURE__ */ __name((e, r, t) => Ms(r).reduceRight((n, i, o, s) => Object.assign({}, Ri(e, s.slice(0, o)), { [i]: n }), t), "$s");
    function hp(e, r) {
      return e === void 0 || r === void 0 ? [] : [...r, "select", e];
    }
    __name(hp, "hp");
    function yp(e, r, t) {
      return r === void 0 ? e ?? {} : $s(r, t, e || true);
    }
    __name(yp, "yp");
    function Ai(e, r, t, n, i, o) {
      let a = e._runtimeDataModel.models[r].fields.reduce((l, u) => ({ ...l, [u.name]: u }), {});
      return (l) => {
        let u = He(e._errorFormat), c = hp(n, i), p = yp(l, o, c), m = t({ dataPath: c, callsite: u })(p), f = Ep(e, r);
        return new Proxy(m, { get(g, h) {
          if (!f.includes(h)) return g[h];
          let T = [a[h].type, t, h], C = [c, p];
          return Ai(e, ...T, ...C);
        }, ...Ht([...f, ...Object.getOwnPropertyNames(m)]) });
      };
    }
    __name(Ai, "Ai");
    function Ep(e, r) {
      return e._runtimeDataModel.models[r].fields.filter((t) => t.kind === "object").map((t) => t.name);
    }
    __name(Ep, "Ep");
    var Qs = _(ni());
    var Us = _(__require("fs"));
    var qs = { keyword: _e, entity: _e, value: /* @__PURE__ */ __name((e) => W(Ye(e)), "value"), punctuation: Ye, directive: _e, function: _e, variable: /* @__PURE__ */ __name((e) => W(Ye(e)), "variable"), string: /* @__PURE__ */ __name((e) => W(Me(e)), "string"), boolean: de, number: _e, comment: Or };
    var bp = /* @__PURE__ */ __name((e) => e, "bp");
    var un = {};
    var wp = 0;
    var P = { manual: un.Prism && un.Prism.manual, disableWorkerMessageHandler: un.Prism && un.Prism.disableWorkerMessageHandler, util: { encode: /* @__PURE__ */ __name(function(e) {
      if (e instanceof ye) {
        let r = e;
        return new ye(r.type, P.util.encode(r.content), r.alias);
      } else return Array.isArray(e) ? e.map(P.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
    }, "encode"), type: /* @__PURE__ */ __name(function(e) {
      return Object.prototype.toString.call(e).slice(8, -1);
    }, "type"), objId: /* @__PURE__ */ __name(function(e) {
      return e.__id || Object.defineProperty(e, "__id", { value: ++wp }), e.__id;
    }, "objId"), clone: /* @__PURE__ */ __name(function e(r, t) {
      let n, i, o = P.util.type(r);
      switch (t = t || {}, o) {
        case "Object":
          if (i = P.util.objId(r), t[i]) return t[i];
          n = {}, t[i] = n;
          for (let s in r) r.hasOwnProperty(s) && (n[s] = e(r[s], t));
          return n;
        case "Array":
          return i = P.util.objId(r), t[i] ? t[i] : (n = [], t[i] = n, r.forEach(function(s, a) {
            n[a] = e(s, t);
          }), n);
        default:
          return r;
      }
    }, "e") }, languages: { extend: /* @__PURE__ */ __name(function(e, r) {
      let t = P.util.clone(P.languages[e]);
      for (let n in r) t[n] = r[n];
      return t;
    }, "extend"), insertBefore: /* @__PURE__ */ __name(function(e, r, t, n) {
      n = n || P.languages;
      let i = n[e], o = {};
      for (let a in i) if (i.hasOwnProperty(a)) {
        if (a == r) for (let l in t) t.hasOwnProperty(l) && (o[l] = t[l]);
        t.hasOwnProperty(a) || (o[a] = i[a]);
      }
      let s = n[e];
      return n[e] = o, P.languages.DFS(P.languages, function(a, l) {
        l === s && a != e && (this[a] = o);
      }), o;
    }, "insertBefore"), DFS: /* @__PURE__ */ __name(function e(r, t, n, i) {
      i = i || {};
      let o = P.util.objId;
      for (let s in r) if (r.hasOwnProperty(s)) {
        t.call(r, s, r[s], n || s);
        let a = r[s], l = P.util.type(a);
        l === "Object" && !i[o(a)] ? (i[o(a)] = true, e(a, t, null, i)) : l === "Array" && !i[o(a)] && (i[o(a)] = true, e(a, t, s, i));
      }
    }, "e") }, plugins: {}, highlight: /* @__PURE__ */ __name(function(e, r, t) {
      let n = { code: e, grammar: r, language: t };
      return P.hooks.run("before-tokenize", n), n.tokens = P.tokenize(n.code, n.grammar), P.hooks.run("after-tokenize", n), ye.stringify(P.util.encode(n.tokens), n.language);
    }, "highlight"), matchGrammar: /* @__PURE__ */ __name(function(e, r, t, n, i, o, s) {
      for (let h in t) {
        if (!t.hasOwnProperty(h) || !t[h]) continue;
        if (h == s) return;
        let A = t[h];
        A = P.util.type(A) === "Array" ? A : [A];
        for (let T = 0; T < A.length; ++T) {
          let C = A[T], E = C.inside, I = !!C.lookbehind, me = !!C.greedy, le = 0, Lr = C.alias;
          if (me && !C.pattern.global) {
            let U = C.pattern.toString().match(/[imuy]*$/)[0];
            C.pattern = RegExp(C.pattern.source, U + "g");
          }
          C = C.pattern || C;
          for (let U = n, ne = i; U < r.length; ne += r[U].length, ++U) {
            let Ae = r[U];
            if (r.length > e.length) return;
            if (Ae instanceof ye) continue;
            if (me && U != r.length - 1) {
              C.lastIndex = ne;
              var p = C.exec(e);
              if (!p) break;
              var c = p.index + (I ? p[1].length : 0), m = p.index + p[0].length, a = U, l = ne;
              for (let L = r.length; a < L && (l < m || !r[a].type && !r[a - 1].greedy); ++a) l += r[a].length, c >= l && (++U, ne = l);
              if (r[U] instanceof ye) continue;
              u = a - U, Ae = e.slice(ne, l), p.index -= ne;
            } else {
              C.lastIndex = 0;
              var p = C.exec(Ae), u = 1;
            }
            if (!p) {
              if (o) break;
              continue;
            }
            I && (le = p[1] ? p[1].length : 0);
            var c = p.index + le, p = p[0].slice(le), m = c + p.length, f = Ae.slice(0, c), g = Ae.slice(m);
            let Y = [U, u];
            f && (++U, ne += f.length, Y.push(f));
            let cr = new ye(h, E ? P.tokenize(p, E) : p, Lr, p, me);
            if (Y.push(cr), g && Y.push(g), Array.prototype.splice.apply(r, Y), u != 1 && P.matchGrammar(e, r, t, U, ne, true, h), o) break;
          }
        }
      }
    }, "matchGrammar"), tokenize: /* @__PURE__ */ __name(function(e, r) {
      let t = [e], n = r.rest;
      if (n) {
        for (let i in n) r[i] = n[i];
        delete r.rest;
      }
      return P.matchGrammar(e, t, r, 0, 0, false), t;
    }, "tokenize"), hooks: { all: {}, add: /* @__PURE__ */ __name(function(e, r) {
      let t = P.hooks.all;
      t[e] = t[e] || [], t[e].push(r);
    }, "add"), run: /* @__PURE__ */ __name(function(e, r) {
      let t = P.hooks.all[e];
      if (!(!t || !t.length)) for (var n = 0, i; i = t[n++]; ) i(r);
    }, "run") }, Token: ye };
    P.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: true }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: true, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, boolean: /\b(?:true|false)\b/, function: /\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
    P.languages.javascript = P.languages.extend("clike", { "class-name": [P.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: true }], keyword: [{ pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: true }, { pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/, function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/ });
    P.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
    P.languages.insertBefore("javascript", "keyword", { regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: true, greedy: true }, "function-variable": { pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: true, inside: P.languages.javascript }, { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: P.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: true, inside: P.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/, lookbehind: true, inside: P.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ });
    P.languages.markup && P.languages.markup.tag.addInlined("script", "javascript");
    P.languages.js = P.languages.javascript;
    P.languages.typescript = P.languages.extend("javascript", { keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/, builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/ });
    P.languages.ts = P.languages.typescript;
    function ye(e, r, t, n, i) {
      this.type = e, this.content = r, this.alias = t, this.length = (n || "").length | 0, this.greedy = !!i;
    }
    __name(ye, "ye");
    ye.stringify = function(e, r) {
      return typeof e == "string" ? e : Array.isArray(e) ? e.map(function(t) {
        return ye.stringify(t, r);
      }).join("") : xp(e.type)(e.content);
    };
    function xp(e) {
      return qs[e] || bp;
    }
    __name(xp, "xp");
    function Bs(e) {
      return Pp(e, P.languages.javascript);
    }
    __name(Bs, "Bs");
    function Pp(e, r) {
      return P.tokenize(e, r).map((n) => ye.stringify(n)).join("");
    }
    __name(Pp, "Pp");
    var Vs = _(Ho());
    function js(e) {
      return (0, Vs.default)(e);
    }
    __name(js, "js");
    var cn = class e {
      static {
        __name(this, "e");
      }
      static read(r) {
        let t;
        try {
          t = Us.default.readFileSync(r, "utf-8");
        } catch {
          return null;
        }
        return e.fromContent(t);
      }
      static fromContent(r) {
        let t = r.split(/\r?\n/);
        return new e(1, t);
      }
      constructor(r, t) {
        this.firstLineNumber = r, this.lines = t;
      }
      get lastLineNumber() {
        return this.firstLineNumber + this.lines.length - 1;
      }
      mapLineAt(r, t) {
        if (r < this.firstLineNumber || r > this.lines.length + this.firstLineNumber) return this;
        let n = r - this.firstLineNumber, i = [...this.lines];
        return i[n] = t(i[n]), new e(this.firstLineNumber, i);
      }
      mapLines(r) {
        return new e(this.firstLineNumber, this.lines.map((t, n) => r(t, this.firstLineNumber + n)));
      }
      lineAt(r) {
        return this.lines[r - this.firstLineNumber];
      }
      prependSymbolAt(r, t) {
        return this.mapLines((n, i) => i === r ? `${t} ${n}` : `  ${n}`);
      }
      slice(r, t) {
        let n = this.lines.slice(r - 1, t).join(`
`);
        return new e(r, js(n).split(`
`));
      }
      highlight() {
        let r = Bs(this.toString());
        return new e(this.firstLineNumber, r.split(`
`));
      }
      toString() {
        return this.lines.join(`
`);
      }
    };
    var vp = { red: ce, gray: Or, dim: Ie, bold: W, underline: ee, highlightSource: /* @__PURE__ */ __name((e) => e.highlight(), "highlightSource") };
    var Tp = { red: /* @__PURE__ */ __name((e) => e, "red"), gray: /* @__PURE__ */ __name((e) => e, "gray"), dim: /* @__PURE__ */ __name((e) => e, "dim"), bold: /* @__PURE__ */ __name((e) => e, "bold"), underline: /* @__PURE__ */ __name((e) => e, "underline"), highlightSource: /* @__PURE__ */ __name((e) => e, "highlightSource") };
    function Cp({ message: e, originalMethod: r, isPanic: t, callArguments: n }) {
      return { functionName: `prisma.${r}()`, message: e, isPanic: t ?? false, callArguments: n };
    }
    __name(Cp, "Cp");
    function Sp({ callsite: e, message: r, originalMethod: t, isPanic: n, callArguments: i }, o) {
      let s = Cp({ message: r, originalMethod: t, isPanic: n, callArguments: i });
      if (!e || typeof window < "u" || process.env.NODE_ENV === "production") return s;
      let a = e.getLocation();
      if (!a || !a.lineNumber || !a.columnNumber) return s;
      let l = Math.max(1, a.lineNumber - 3), u = cn.read(a.fileName)?.slice(l, a.lineNumber), c = u?.lineAt(a.lineNumber);
      if (u && c) {
        let p = Ap(c), m = Rp(c);
        if (!m) return s;
        s.functionName = `${m.code})`, s.location = a, n || (u = u.mapLineAt(a.lineNumber, (g) => g.slice(0, m.openingBraceIndex))), u = o.highlightSource(u);
        let f = String(u.lastLineNumber).length;
        if (s.contextLines = u.mapLines((g, h) => o.gray(String(h).padStart(f)) + " " + g).mapLines((g) => o.dim(g)).prependSymbolAt(a.lineNumber, o.bold(o.red("→"))), i) {
          let g = p + f + 1;
          g += 2, s.callArguments = (0, Qs.default)(i, g).slice(g);
        }
      }
      return s;
    }
    __name(Sp, "Sp");
    function Rp(e) {
      let r = Object.keys(De.ModelAction).join("|"), n = new RegExp(String.raw`\.(${r})\(`).exec(e);
      if (n) {
        let i = n.index + n[0].length, o = e.lastIndexOf(" ", n.index) + 1;
        return { code: e.slice(o, i), openingBraceIndex: i };
      }
      return null;
    }
    __name(Rp, "Rp");
    function Ap(e) {
      let r = 0;
      for (let t = 0; t < e.length; t++) {
        if (e.charAt(t) !== " ") return r;
        r++;
      }
      return r;
    }
    __name(Ap, "Ap");
    function Ip({ functionName: e, location: r, message: t, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], l = r ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`))) : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)), r && a.push(s.underline(_p(r))), i) {
        a.push("");
        let u = [i.toString()];
        o && (u.push(o), u.push(s.dim(")"))), a.push(u.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(t), a.join(`
`);
    }
    __name(Ip, "Ip");
    function _p(e) {
      let r = [e.fileName];
      return e.lineNumber && r.push(String(e.lineNumber)), e.columnNumber && r.push(String(e.columnNumber)), r.join(":");
    }
    __name(_p, "_p");
    function Rr(e) {
      let r = e.showColors ? vp : Tp, t;
      return t = Sp(e, r), Ip(t, r);
    }
    __name(Rr, "Rr");
    function Gs(e, r, t, n) {
      return e === De.ModelAction.findFirstOrThrow || e === De.ModelAction.findUniqueOrThrow ? kp(r, t, n) : n;
    }
    __name(Gs, "Gs");
    function kp(e, r, t) {
      return async (n) => {
        if ("rejectOnNotFound" in n.args) {
          let o = Rr({ originalMethod: n.clientMethod, callsite: n.callsite, message: "'rejectOnNotFound' option is not supported" });
          throw new K(o, { clientVersion: r });
        }
        return await t(n).catch((o) => {
          throw o instanceof V && o.code === "P2025" ? new Le(`No ${e} found`, r) : o;
        });
      };
    }
    __name(kp, "kp");
    function Se(e) {
      return e.replace(/^./, (r) => r.toLowerCase());
    }
    __name(Se, "Se");
    var Dp = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Lp = ["aggregate", "count", "groupBy"];
    function Ii(e, r) {
      let t = e._extensions.getAllModelExtensions(r) ?? {}, n = [Np(e, r), Fp(e, r), rt(t), te("name", () => r), te("$name", () => r), te("$parent", () => e._appliedParent)];
      return Pe({}, n);
    }
    __name(Ii, "Ii");
    function Np(e, r) {
      let t = Se(r), n = Object.keys(De.ModelAction).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((l) => e._request(l), "s");
        s = Gs(o, r, e._clientVersion, s);
        let a = /* @__PURE__ */ __name((l) => (u) => {
          let c = He(e._errorFormat);
          return e._createPrismaPromise((p) => {
            let m = { args: u, dataPath: [], action: o, model: r, clientMethod: `${t}.${i}`, jsModelName: t, transaction: p, callsite: c };
            return s({ ...m, ...l });
          });
        }, "a");
        return Dp.includes(o) ? Ai(e, r, a) : Op(i) ? Os(e, i, a) : a({});
      } };
    }
    __name(Np, "Np");
    function Op(e) {
      return Lp.includes(e);
    }
    __name(Op, "Op");
    function Fp(e, r) {
      return nr(te("fields", () => {
        let t = e._runtimeDataModel.models[r];
        return Fs(r, t);
      }));
    }
    __name(Fp, "Fp");
    function Js(e) {
      return e.replace(/^./, (r) => r.toUpperCase());
    }
    __name(Js, "Js");
    var _i = Symbol();
    function st(e) {
      let r = [Mp(e), te(_i, () => e), te("$parent", () => e._appliedParent)], t = e._extensions.getAllClientExtensions();
      return t && r.push(rt(t)), Pe(e, r);
    }
    __name(st, "st");
    function Mp(e) {
      let r = Object.keys(e._runtimeDataModel.models), t = r.map(Se), n = [...new Set(r.concat(t))];
      return nr({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Js(i);
        if (e._runtimeDataModel.models[o] !== void 0) return Ii(e, o);
        if (e._runtimeDataModel.models[i] !== void 0) return Ii(e, i);
      }, getPropertyDescriptor(i) {
        if (!t.includes(i)) return { enumerable: false };
      } });
    }
    __name(Mp, "Mp");
    function Hs(e) {
      return e[_i] ? e[_i] : e;
    }
    __name(Hs, "Hs");
    function Ws(e) {
      if (typeof e == "function") return e(this);
      if (e.client?.__AccelerateEngine) {
        let t = e.client.__AccelerateEngine;
        this._originalClient._engine = new t(this._originalClient._accelerateEngineConfig);
      }
      let r = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return st(r);
    }
    __name(Ws, "Ws");
    function Ks({ result: e, modelName: r, select: t, extensions: n }) {
      let i = n.getAllComputedFields(r);
      if (!i) return e;
      let o = [], s = [];
      for (let a of Object.values(i)) {
        if (t) {
          if (!t[a.name]) continue;
          let l = a.needs.filter((u) => !t[u]);
          l.length > 0 && s.push(tt(l));
        }
        $p(e, a.needs) && o.push(qp(a, Pe(e, o)));
      }
      return o.length > 0 || s.length > 0 ? Pe(e, [...o, ...s]) : e;
    }
    __name(Ks, "Ks");
    function $p(e, r) {
      return r.every((t) => li(e, t));
    }
    __name($p, "$p");
    function qp(e, r) {
      return nr(te(e.name, () => e.compute(r)));
    }
    __name(qp, "qp");
    function pn({ visitor: e, result: r, args: t, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(r)) {
        for (let s = 0; s < r.length; s++) r[s] = pn({ result: r[s], args: t, modelName: i, runtimeDataModel: n, visitor: e });
        return r;
      }
      let o = e(r, i, t) ?? r;
      return t.include && zs({ includeOrSelect: t.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), t.select && zs({ includeOrSelect: t.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: e }), o;
    }
    __name(pn, "pn");
    function zs({ includeOrSelect: e, result: r, parentModelName: t, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(e)) {
        if (!s || r[o] == null) continue;
        let l = n.models[t].fields.find((c) => c.name === o);
        if (!l || l.kind !== "object" || !l.relationName) continue;
        let u = typeof s == "object" ? s : {};
        r[o] = pn({ visitor: i, result: r[o], args: u, modelName: l.type, runtimeDataModel: n });
      }
    }
    __name(zs, "zs");
    function Ys({ result: e, modelName: r, args: t, extensions: n, runtimeDataModel: i }) {
      return n.isEmpty() || e == null || typeof e != "object" || !i.models[r] ? e : pn({ result: e, args: t ?? {}, modelName: r, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((s, a, l) => Ks({ result: s, modelName: Se(a), select: l.select, extensions: n }), "visitor") });
    }
    __name(Ys, "Ys");
    function Zs(e) {
      if (e instanceof oe) return Bp(e);
      if (Array.isArray(e)) {
        let t = [e[0]];
        for (let n = 1; n < e.length; n++) t[n] = at(e[n]);
        return t;
      }
      let r = {};
      for (let t in e) r[t] = at(e[t]);
      return r;
    }
    __name(Zs, "Zs");
    function Bp(e) {
      return new oe(e.strings, e.values);
    }
    __name(Bp, "Bp");
    function at(e) {
      if (typeof e != "object" || e == null || e instanceof Ne || vr(e)) return e;
      if (Pr(e)) return new Te(e.toFixed());
      if (br(e)) return /* @__PURE__ */ new Date(+e);
      if (ArrayBuffer.isView(e)) return e.slice(0);
      if (Array.isArray(e)) {
        let r = e.length, t;
        for (t = Array(r); r--; ) t[r] = at(e[r]);
        return t;
      }
      if (typeof e == "object") {
        let r = {};
        for (let t in e) t === "__proto__" ? Object.defineProperty(r, t, { value: at(e[t]), configurable: true, enumerable: true, writable: true }) : r[t] = at(e[t]);
        return r;
      }
      rr(e, "Unknown value");
    }
    __name(at, "at");
    function ea(e, r, t, n = 0) {
      return e._createPrismaPromise((i) => {
        let o = r.customDataProxyFetch;
        return "transaction" in r && i !== void 0 && (r.transaction?.kind === "batch" && r.transaction.lock.then(), r.transaction = i), n === t.length ? e._executeRequest(r) : t[n]({ model: r.model, operation: r.model ? r.action : r.clientMethod, args: Zs(r.args ?? {}), __internalParams: r, query: /* @__PURE__ */ __name((s, a = r) => {
          let l = a.customDataProxyFetch;
          return a.customDataProxyFetch = ia(o, l), a.args = s, ea(e, a, t, n + 1);
        }, "query") });
      });
    }
    __name(ea, "ea");
    function ra(e, r) {
      let { jsModelName: t, action: n, clientMethod: i } = r, o = t ? n : i;
      if (e._extensions.isEmpty()) return e._executeRequest(r);
      let s = e._extensions.getAllQueryCallbacks(t ?? "$none", o);
      return ea(e, r, s);
    }
    __name(ra, "ra");
    function ta(e) {
      return (r) => {
        let t = { requests: r }, n = r[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? na(t, n, 0, e) : e(t);
      };
    }
    __name(ta, "ta");
    function na(e, r, t, n) {
      if (t === r.length) return n(e);
      let i = e.customDataProxyFetch, o = e.requests[0].transaction;
      return r[t]({ args: { queries: e.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: e, query(s, a = e) {
        let l = a.customDataProxyFetch;
        return a.customDataProxyFetch = ia(i, l), na(a, r, t + 1, n);
      } });
    }
    __name(na, "na");
    var Xs = /* @__PURE__ */ __name((e) => e, "Xs");
    function ia(e = Xs, r = Xs) {
      return (t) => e(r(t));
    }
    __name(ia, "ia");
    function sa(e, r, t) {
      let n = Se(t);
      return !r.result || !(r.result.$allModels || r.result[n]) ? e : Vp({ ...e, ...oa(r.name, e, r.result.$allModels), ...oa(r.name, e, r.result[n]) });
    }
    __name(sa, "sa");
    function Vp(e) {
      let r = new xe(), t = /* @__PURE__ */ __name((n, i) => r.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), e[n] ? e[n].needs.flatMap((o) => t(o, i)) : [n])), "t");
      return gr(e, (n) => ({ ...n, needs: t(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Vp, "Vp");
    function oa(e, r, t) {
      return t ? gr(t, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: jp(r, o, i) })) : {};
    }
    __name(oa, "oa");
    function jp(e, r, t) {
      let n = e?.[r]?.compute;
      return n ? (i) => t({ ...i, [r]: n(i) }) : t;
    }
    __name(jp, "jp");
    function aa(e, r) {
      if (!r) return e;
      let t = { ...e };
      for (let n of Object.values(r)) if (e[n.name]) for (let i of n.needs) t[i] = true;
      return t;
    }
    __name(aa, "aa");
    var mn = class {
      static {
        __name(this, "mn");
      }
      constructor(r, t) {
        this.extension = r;
        this.previous = t;
        this.computedFieldsCache = new xe();
        this.modelExtensionsCache = new xe();
        this.queryCallbacksCache = new xe();
        this.clientExtensions = Kr(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        this.batchCallbacks = Kr(() => {
          let r2 = this.previous?.getAllBatchQueryCallbacks() ?? [], t2 = this.extension.query?.$__internalBatch;
          return t2 ? r2.concat(t2) : r2;
        });
      }
      getAllComputedFields(r) {
        return this.computedFieldsCache.getOrCreate(r, () => sa(this.previous?.getAllComputedFields(r), this.extension, r));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(r) {
        return this.modelExtensionsCache.getOrCreate(r, () => {
          let t = Se(r);
          return !this.extension.model || !(this.extension.model[t] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(r) : { ...this.previous?.getAllModelExtensions(r), ...this.extension.model.$allModels, ...this.extension.model[t] };
        });
      }
      getAllQueryCallbacks(r, t) {
        return this.queryCallbacksCache.getOrCreate(`${r}:${t}`, () => {
          let n = this.previous?.getAllQueryCallbacks(r, t) ?? [], i = [], o = this.extension.query;
          return !o || !(o[r] || o.$allModels || o[t] || o.$allOperations) ? n : (o[r] !== void 0 && (o[r][t] !== void 0 && i.push(o[r][t]), o[r].$allOperations !== void 0 && i.push(o[r].$allOperations)), r !== "$none" && o.$allModels !== void 0 && (o.$allModels[t] !== void 0 && i.push(o.$allModels[t]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[t] !== void 0 && i.push(o[t]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var dn = class e {
      static {
        __name(this, "e");
      }
      constructor(r) {
        this.head = r;
      }
      static empty() {
        return new e();
      }
      static single(r) {
        return new e(new mn(r));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(r) {
        return new e(new mn(r, this.head));
      }
      getAllComputedFields(r) {
        return this.head?.getAllComputedFields(r);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(r) {
        return this.head?.getAllModelExtensions(r);
      }
      getAllQueryCallbacks(r, t) {
        return this.head?.getAllQueryCallbacks(r, t) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    var la = N("prisma:client");
    var ua = { Vercel: "vercel", "Netlify CI": "netlify" };
    function ca({ postinstall: e, ciName: r, clientVersion: t }) {
      if (la("checkPlatformCaching:postinstall", e), la("checkPlatformCaching:ciName", r), e === true && r && r in ua) {
        let n = `Prisma has detected that this project was built on ${r}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ua[r]}-build`;
        throw console.error(n), new S(n, t);
      }
    }
    __name(ca, "ca");
    function pa(e, r) {
      return e ? e.datasources ? e.datasources : e.datasourceUrl ? { [r[0]]: { url: e.datasourceUrl } } : {} : {};
    }
    __name(pa, "pa");
    var Up = "Cloudflare-Workers";
    var Qp = "node";
    function fn() {
      return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : globalThis.navigator?.userAgent === Up ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : globalThis.process?.release?.name === Qp ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
    }
    __name(fn, "fn");
    var ha = _(__require("fs"));
    var lt = _(__require("path"));
    function gn(e) {
      let { runtimeBinaryTarget: r } = e;
      return `Add "${r}" to \`binaryTargets\` in the "schema.prisma" file and run \`prisma generate\` after saving it:

${Gp(e)}`;
    }
    __name(gn, "gn");
    function Gp(e) {
      let { generator: r, generatorBinaryTargets: t, runtimeBinaryTarget: n } = e, i = { fromEnvVar: null, value: n }, o = [...t, i];
      return oi({ ...r, binaryTargets: o });
    }
    __name(Gp, "Gp");
    function We(e) {
      let { runtimeBinaryTarget: r } = e;
      return `Prisma Client could not locate the Query Engine for runtime "${r}".`;
    }
    __name(We, "We");
    function Ke(e) {
      let { searchedLocations: r } = e;
      return `The following locations have been searched:
${[...new Set(r)].map((i) => `  ${i}`).join(`
`)}`;
    }
    __name(Ke, "Ke");
    function ma(e) {
      let { runtimeBinaryTarget: r } = e;
      return `${We(e)}

This happened because \`binaryTargets\` have been pinned, but the actual deployment also required "${r}".
${gn(e)}

${Ke(e)}`;
    }
    __name(ma, "ma");
    function hn(e) {
      return `We would appreciate if you could take the time to share some information with us.
Please help us by answering a few questions: https://pris.ly/${e}`;
    }
    __name(hn, "hn");
    function yn(e) {
      let { errorStack: r } = e;
      return r?.match(/\/\.next|\/next@|\/next\//) ? `

We detected that you are using Next.js, learn how to fix this: https://pris.ly/d/engine-not-found-nextjs.` : "";
    }
    __name(yn, "yn");
    function da(e) {
      let { queryEngineName: r } = e;
      return `${We(e)}${yn(e)}

This is likely caused by a bundler that has not copied "${r}" next to the resulting bundle.
Ensure that "${r}" has been copied next to the bundle or in "${e.expectedLocation}".

${hn("engine-not-found-bundler-investigation")}

${Ke(e)}`;
    }
    __name(da, "da");
    function fa(e) {
      let { runtimeBinaryTarget: r, generatorBinaryTargets: t } = e, n = t.find((i) => i.native);
      return `${We(e)}

This happened because Prisma Client was generated for "${n?.value ?? "unknown"}", but the actual deployment required "${r}".
${gn(e)}

${Ke(e)}`;
    }
    __name(fa, "fa");
    function ga(e) {
      let { queryEngineName: r } = e;
      return `${We(e)}${yn(e)}

This is likely caused by tooling that has not copied "${r}" to the deployment folder.
Ensure that you ran \`prisma generate\` and that "${r}" has been copied to "${e.expectedLocation}".

${hn("engine-not-found-tooling-investigation")}

${Ke(e)}`;
    }
    __name(ga, "ga");
    var Jp = N("prisma:client:engines:resolveEnginePath");
    var Hp = /* @__PURE__ */ __name(() => new RegExp("runtime[\\\\/]library\\.m?js$"), "Hp");
    async function ya(e, r) {
      let t = { binary: process.env.PRISMA_QUERY_ENGINE_BINARY, library: process.env.PRISMA_QUERY_ENGINE_LIBRARY }[e] ?? r.prismaPath;
      if (t !== void 0) return t;
      let { enginePath: n, searchedLocations: i } = await Wp(e, r);
      if (Jp("enginePath", n), n !== void 0 && e === "binary" && ei(n), n !== void 0) return r.prismaPath = n;
      let o = await er(), s = r.generator?.binaryTargets ?? [], a = s.some((m) => m.native), l = !s.some((m) => m.value === o), u = __filename.match(Hp()) === null, c = { searchedLocations: i, generatorBinaryTargets: s, generator: r.generator, runtimeBinaryTarget: o, queryEngineName: Ea(e, o), expectedLocation: lt.default.relative(process.cwd(), r.dirname), errorStack: new Error().stack }, p;
      throw a && l ? p = fa(c) : l ? p = ma(c) : u ? p = da(c) : p = ga(c), new S(p, r.clientVersion);
    }
    __name(ya, "ya");
    async function Wp(engineType, config) {
      let binaryTarget = await er(), searchedLocations = [], dirname = eval("__dirname"), searchLocations = [config.dirname, lt.default.resolve(dirname, ".."), config.generator?.output?.value ?? dirname, lt.default.resolve(dirname, "../../../.prisma/client"), "/tmp/prisma-engines", config.cwd];
      __filename.includes("resolveEnginePath") && searchLocations.push(Wo());
      for (let e of searchLocations) {
        let r = Ea(engineType, binaryTarget), t = lt.default.join(e, r);
        if (searchedLocations.push(e), ha.default.existsSync(t)) return { enginePath: t, searchedLocations };
      }
      return { enginePath: void 0, searchedLocations };
    }
    __name(Wp, "Wp");
    function Ea(e, r) {
      return e === "library" ? _t(r, "fs") : `query-engine-${r}${r === "windows" ? ".exe" : ""}`;
    }
    __name(Ea, "Ea");
    var ki = _(ai());
    function ba(e) {
      return e ? e.replace(/".*"/g, '"X"').replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, (r) => `${r[0]}5`) : "";
    }
    __name(ba, "ba");
    function wa(e) {
      return e.split(`
`).map((r) => r.replace(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/, "").replace(/\+\d+\s*ms$/, "")).join(`
`);
    }
    __name(wa, "wa");
    var xa = _(ts());
    function Pa({ title: e, user: r = "prisma", repo: t = "prisma", template: n = "bug_report.yml", body: i }) {
      return (0, xa.default)({ user: r, repo: t, template: n, title: e, body: i });
    }
    __name(Pa, "Pa");
    function va({ version: e, binaryTarget: r, title: t, description: n, engineVersion: i, database: o, query: s }) {
      let a = mo(6e3 - (s?.length ?? 0)), l = wa((0, ki.default)(a)), u = n ? `# Description
\`\`\`
${n}
\`\`\`` : "", c = (0, ki.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${r?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? ba(s) : ""}
\`\`\`
`), p = Pa({ title: t, body: c });
      return `${t}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${ee(p)}

If you want the Prisma team to look into it, please open the link above 🙏
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
    }
    __name(va, "va");
    function Ar({ inlineDatasources: e, overrideDatasources: r, env: t, clientVersion: n }) {
      let i, o = Object.keys(e)[0], s = e[o]?.url, a = r[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = t[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw new S(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new S("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(Ar, "Ar");
    var En = class extends Error {
      static {
        __name(this, "En");
      }
      constructor(r, t) {
        super(r), this.clientVersion = t.clientVersion, this.cause = t.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var ae = class extends En {
      static {
        __name(this, "ae");
      }
      constructor(r, t) {
        super(r, t), this.isRetryable = t.isRetryable ?? true;
      }
    };
    function R(e, r) {
      return { ...e, isRetryable: r };
    }
    __name(R, "R");
    var Ir = class extends ae {
      static {
        __name(this, "Ir");
      }
      constructor(t) {
        super("This request must be retried", R(t, true));
        this.name = "ForcedRetryError";
        this.code = "P5001";
      }
    };
    w(Ir, "ForcedRetryError");
    var sr = class extends ae {
      static {
        __name(this, "sr");
      }
      constructor(t, n) {
        super(t, R(n, false));
        this.name = "InvalidDatasourceError";
        this.code = "P6001";
      }
    };
    w(sr, "InvalidDatasourceError");
    var ar = class extends ae {
      static {
        __name(this, "ar");
      }
      constructor(t, n) {
        super(t, R(n, false));
        this.name = "NotImplementedYetError";
        this.code = "P5004";
      }
    };
    w(ar, "NotImplementedYetError");
    var $ = class extends ae {
      static {
        __name(this, "$");
      }
      constructor(r, t) {
        super(r, t), this.response = t.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
          let i = `(The request id was: ${n})`;
          this.message = this.message + " " + i;
        }
      }
    };
    var lr = class extends $ {
      static {
        __name(this, "lr");
      }
      constructor(t) {
        super("Schema needs to be uploaded", R(t, true));
        this.name = "SchemaMissingError";
        this.code = "P5005";
      }
    };
    w(lr, "SchemaMissingError");
    var Di = "This request could not be understood by the server";
    var ut = class extends $ {
      static {
        __name(this, "ut");
      }
      constructor(t, n, i) {
        super(n || Di, R(t, false));
        this.name = "BadRequestError";
        this.code = "P5000";
        i && (this.code = i);
      }
    };
    w(ut, "BadRequestError");
    var ct = class extends $ {
      static {
        __name(this, "ct");
      }
      constructor(t, n) {
        super("Engine not started: healthcheck timeout", R(t, true));
        this.name = "HealthcheckTimeoutError";
        this.code = "P5013";
        this.logs = n;
      }
    };
    w(ct, "HealthcheckTimeoutError");
    var pt = class extends $ {
      static {
        __name(this, "pt");
      }
      constructor(t, n, i) {
        super(n, R(t, true));
        this.name = "EngineStartupError";
        this.code = "P5014";
        this.logs = i;
      }
    };
    w(pt, "EngineStartupError");
    var mt = class extends $ {
      static {
        __name(this, "mt");
      }
      constructor(t) {
        super("Engine version is not supported", R(t, false));
        this.name = "EngineVersionNotSupportedError";
        this.code = "P5012";
      }
    };
    w(mt, "EngineVersionNotSupportedError");
    var Li = "Request timed out";
    var dt = class extends $ {
      static {
        __name(this, "dt");
      }
      constructor(t, n = Li) {
        super(n, R(t, false));
        this.name = "GatewayTimeoutError";
        this.code = "P5009";
      }
    };
    w(dt, "GatewayTimeoutError");
    var Kp = "Interactive transaction error";
    var ft = class extends $ {
      static {
        __name(this, "ft");
      }
      constructor(t, n = Kp) {
        super(n, R(t, false));
        this.name = "InteractiveTransactionError";
        this.code = "P5015";
      }
    };
    w(ft, "InteractiveTransactionError");
    var zp = "Request parameters are invalid";
    var gt = class extends $ {
      static {
        __name(this, "gt");
      }
      constructor(t, n = zp) {
        super(n, R(t, false));
        this.name = "InvalidRequestError";
        this.code = "P5011";
      }
    };
    w(gt, "InvalidRequestError");
    var Ni = "Requested resource does not exist";
    var ht = class extends $ {
      static {
        __name(this, "ht");
      }
      constructor(t, n = Ni) {
        super(n, R(t, false));
        this.name = "NotFoundError";
        this.code = "P5003";
      }
    };
    w(ht, "NotFoundError");
    var Oi = "Unknown server error";
    var _r = class extends $ {
      static {
        __name(this, "_r");
      }
      constructor(t, n, i) {
        super(n || Oi, R(t, true));
        this.name = "ServerError";
        this.code = "P5006";
        this.logs = i;
      }
    };
    w(_r, "ServerError");
    var Fi = "Unauthorized, check your connection string";
    var yt = class extends $ {
      static {
        __name(this, "yt");
      }
      constructor(t, n = Fi) {
        super(n, R(t, false));
        this.name = "UnauthorizedError";
        this.code = "P5007";
      }
    };
    w(yt, "UnauthorizedError");
    var Mi = "Usage exceeded, retry again later";
    var Et = class extends $ {
      static {
        __name(this, "Et");
      }
      constructor(t, n = Mi) {
        super(n, R(t, true));
        this.name = "UsageExceededError";
        this.code = "P5008";
      }
    };
    w(Et, "UsageExceededError");
    async function Yp(e) {
      let r;
      try {
        r = await e.text();
      } catch {
        return { type: "EmptyError" };
      }
      try {
        let t = JSON.parse(r);
        if (typeof t == "string") switch (t) {
          case "InternalDataProxyError":
            return { type: "DataProxyError", body: t };
          default:
            return { type: "UnknownTextError", body: t };
        }
        if (typeof t == "object" && t !== null) {
          if ("is_panic" in t && "message" in t && "error_code" in t) return { type: "QueryEngineError", body: t };
          if ("EngineNotStarted" in t || "InteractiveTransactionMisrouted" in t || "InvalidRequestError" in t) {
            let n = Object.values(t)[0].reason;
            return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: t } : { type: "DataProxyError", body: t };
          }
        }
        return { type: "UnknownJsonError", body: t };
      } catch {
        return r === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: r };
      }
    }
    __name(Yp, "Yp");
    async function bt(e, r) {
      if (e.ok) return;
      let t = { clientVersion: r, response: e }, n = await Yp(e);
      if (n.type === "QueryEngineError") throw new V(n.body.message, { code: n.body.error_code, clientVersion: r });
      if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new _r(t, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
          if (n.body.EngineNotStarted.reason === "SchemaMissing") return new lr(t);
          if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new mt(t);
          if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
            throw new pt(t, i, o);
          }
          if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
            throw new S(i, r, o);
          }
          if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
            let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
            throw new ct(t, i);
          }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
          let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
          throw new ft(t, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new gt(t, n.body.InvalidRequestError.reason);
      }
      if (e.status === 401 || e.status === 403) throw new yt(t, kr(Fi, n));
      if (e.status === 404) return new ht(t, kr(Ni, n));
      if (e.status === 429) throw new Et(t, kr(Mi, n));
      if (e.status === 504) throw new dt(t, kr(Li, n));
      if (e.status >= 500) throw new _r(t, kr(Oi, n));
      if (e.status >= 400) throw new ut(t, kr(Di, n));
    }
    __name(bt, "bt");
    function kr(e, r) {
      return r.type === "EmptyError" ? e : `${e}: ${JSON.stringify(r)}`;
    }
    __name(kr, "kr");
    function Ta(e) {
      let r = Math.pow(2, e) * 50, t = Math.ceil(Math.random() * r) - Math.ceil(r / 2), n = r + t;
      return new Promise((i) => setTimeout(() => i(n), n));
    }
    __name(Ta, "Ta");
    function Ca(e) {
      if (!!e.generator?.previewFeatures.some((t) => t.toLowerCase().includes("metrics"))) throw new S("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e.clientVersion);
    }
    __name(Ca, "Ca");
    function Zp(e) {
      return e[0] * 1e3 + e[1] / 1e6;
    }
    __name(Zp, "Zp");
    function Sa(e) {
      return new Date(Zp(e));
    }
    __name(Sa, "Sa");
    var Ra = { "@prisma/debug": "workspace:*", "@prisma/engines-version": "5.10.0-34.5a9203d0590c951969e85a7d07215503f4672eb9", "@prisma/fetch-engine": "workspace:*", "@prisma/get-platform": "workspace:*" };
    var wt = class extends ae {
      static {
        __name(this, "wt");
      }
      constructor(t, n) {
        super(`Cannot fetch data from service:
${t}`, R(n, true));
        this.name = "RequestError";
        this.code = "P5010";
      }
    };
    w(wt, "RequestError");
    async function ur(e, r, t = (n) => n) {
      let n = r.clientVersion;
      try {
        return typeof fetch == "function" ? await t(fetch)(e, r) : await t($i)(e, r);
      } catch (i) {
        let o = i.message ?? "Unknown error";
        throw new wt(o, { clientVersion: n });
      }
    }
    __name(ur, "ur");
    function em(e) {
      return { ...e.headers, "Content-Type": "application/json" };
    }
    __name(em, "em");
    function rm(e) {
      return { method: e.method, headers: em(e) };
    }
    __name(rm, "rm");
    function tm(e, r) {
      return { text: /* @__PURE__ */ __name(() => Promise.resolve(Buffer.concat(e).toString()), "text"), json: /* @__PURE__ */ __name(() => Promise.resolve().then(() => JSON.parse(Buffer.concat(e).toString())), "json"), ok: r.statusCode >= 200 && r.statusCode <= 299, status: r.statusCode, url: r.url, headers: new qi(r.headers) };
    }
    __name(tm, "tm");
    async function $i(e, r = {}) {
      let t = nm("https"), n = rm(r), i = [], { origin: o } = new URL(e);
      return new Promise((s, a) => {
        let l = t.request(e, n, (u) => {
          let { statusCode: c, headers: { location: p } } = u;
          c >= 301 && c <= 399 && p && (p.startsWith("http") === false ? s($i(`${o}${p}`, r)) : s($i(p, r))), u.on("data", (m) => i.push(m)), u.on("end", () => s(tm(i, u))), u.on("error", a);
        });
        l.on("error", a), l.end(r.body ?? "");
      });
    }
    __name($i, "$i");
    var nm = typeof __require < "u" ? __require : () => {
    };
    var qi = class {
      static {
        __name(this, "qi");
      }
      constructor(r = {}) {
        this.headers = /* @__PURE__ */ new Map();
        for (let [t, n] of Object.entries(r)) if (typeof n == "string") this.headers.set(t, n);
        else if (Array.isArray(n)) for (let i of n) this.headers.set(t, i);
      }
      append(r, t) {
        this.headers.set(r, t);
      }
      delete(r) {
        this.headers.delete(r);
      }
      get(r) {
        return this.headers.get(r) ?? null;
      }
      has(r) {
        return this.headers.has(r);
      }
      set(r, t) {
        this.headers.set(r, t);
      }
      forEach(r, t) {
        for (let [n, i] of this.headers) r.call(t, i, n, this);
      }
    };
    var im = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/;
    var Aa = N("prisma:client:dataproxyEngine");
    async function om(e, r) {
      let t = Ra["@prisma/engines-version"], n = r.clientVersion ?? "unknown";
      if (process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return process.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
      if (e.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
      let [i, o] = n?.split("-") ?? [];
      if (o === void 0 && im.test(i)) return i;
      if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        if (e.startsWith("localhost") || e.startsWith("127.0.0.1")) return "0.0.0";
        let [s] = t.split("-") ?? [], [a, l, u] = s.split("."), c = sm(`<=${a}.${l}.${u}`), p = await ur(c, { clientVersion: n });
        if (!p.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${p.status} ${p.statusText}, response body: ${await p.text() || "<empty body>"}`);
        let m = await p.text();
        Aa("length of body fetched from unpkg.com", m.length);
        let f;
        try {
          f = JSON.parse(m);
        } catch (g) {
          throw console.error("JSON.parse error: body fetched from unpkg.com: ", m), g;
        }
        return f.version;
      }
      throw new ar("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
    }
    __name(om, "om");
    async function Ia(e, r) {
      let t = await om(e, r);
      return Aa("version", t), t;
    }
    __name(Ia, "Ia");
    function sm(e) {
      return encodeURI(`https://unpkg.com/prisma@${e}/package.json`);
    }
    __name(sm, "sm");
    var _a = 3;
    var Bi = N("prisma:client:dataproxyEngine");
    var Vi = class {
      static {
        __name(this, "Vi");
      }
      constructor({ apiKey: r, tracingHelper: t, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = r, this.tracingHelper = t, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: r, interactiveTransaction: t } = {}) {
        let n = { Authorization: `Bearer ${this.apiKey}`, "Prisma-Engine-Hash": this.engineHash };
        this.tracingHelper.isEnabled() && (n.traceparent = r ?? this.tracingHelper.getTraceParent()), t && (n["X-transaction-id"] = t.id);
        let i = this.buildCaptureSettings();
        return i.length > 0 && (n["X-capture-telemetry"] = i.join(", ")), n;
      }
      buildCaptureSettings() {
        let r = [];
        return this.tracingHelper.isEnabled() && r.push("tracing"), this.logLevel && r.push(this.logLevel), this.logQueries && r.push("query"), r;
      }
    };
    var xt = class {
      static {
        __name(this, "xt");
      }
      constructor(r) {
        this.name = "DataProxyEngine";
        Ca(r), this.config = r, this.env = { ...r.env, ...typeof process < "u" ? process.env : {} }, this.inlineSchema = btoa(r.inlineSchema), this.inlineDatasources = r.inlineDatasources, this.inlineSchemaHash = r.inlineSchemaHash, this.clientVersion = r.clientVersion, this.engineHash = r.engineVersion, this.logEmitter = r.logEmitter, this.tracingHelper = r.tracingHelper;
      }
      apiKey() {
        return this.headerBuilder.apiKey;
      }
      version() {
        return this.engineHash;
      }
      async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
          let [r, t] = this.extractHostAndApiKey();
          this.host = r, this.headerBuilder = new Vi({ apiKey: t, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel, logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await Ia(r, this.config), Bi("host", this.host);
        })(), await this.startPromise;
      }
      async stop() {
      }
      propagateResponseExtensions(r) {
        r?.logs?.length && r.logs.forEach((t) => {
          switch (t.level) {
            case "debug":
            case "error":
            case "trace":
            case "warn":
            case "info":
              break;
            case "query": {
              let n = typeof t.attributes.query == "string" ? t.attributes.query : "";
              if (!this.tracingHelper.isEnabled()) {
                let [i] = n.split("/* traceparent");
                n = i;
              }
              this.logEmitter.emit("query", { query: n, timestamp: Sa(t.timestamp), duration: Number(t.attributes.duration_ms), params: t.attributes.params, target: t.attributes.target });
            }
          }
        }), r?.traces?.length && this.tracingHelper.createEngineSpan({ span: true, spans: r.traces });
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
      }
      async url(r) {
        return await this.start(), `https://${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${r}`;
      }
      async uploadSchema() {
        let r = { name: "schemaUpload", internal: true };
        return this.tracingHelper.runInChildSpan(r, async () => {
          let t = await ur(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
          t.ok || Bi("schema response status", t.status);
          let n = await bt(t, this.clientVersion);
          if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
          this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        });
      }
      request(r, { traceparent: t, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({ body: r, traceparent: t, interactiveTransaction: n, customDataProxyFetch: i });
      }
      async requestBatch(r, { traceparent: t, transaction: n, customDataProxyFetch: i }) {
        let o = n?.kind === "itx" ? n.options : void 0, s = yr(r, n), { batchResult: a, elapsed: l } = await this.requestInternal({ body: s, customDataProxyFetch: i, interactiveTransaction: o, traceparent: t });
        return a.map((u) => "errors" in u && u.errors.length > 0 ? or(u.errors[0], this.clientVersion, this.config.activeProvider) : { data: u, elapsed: l });
      }
      requestInternal({ body: r, traceparent: t, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({ actionGerund: "querying", callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
          o(s);
          let a = await ur(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: t, interactiveTransaction: i }), body: JSON.stringify(r), clientVersion: this.clientVersion }, n);
          a.ok || Bi("graphql response status", a.status), await this.handleError(await bt(a, this.clientVersion));
          let l = await a.json(), u = l.extensions;
          if (u && this.propagateResponseExtensions(u), l.errors) throw l.errors.length === 1 ? or(l.errors[0], this.config.clientVersion, this.config.activeProvider) : new j(l.errors, { clientVersion: this.config.clientVersion });
          return l;
        }, "callback") });
      }
      async transaction(r, t, n) {
        let i = { start: "starting", commit: "committing", rollback: "rolling back" };
        return this.withRetry({ actionGerund: `${i[r]} transaction`, callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          if (r === "start") {
            let s = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a = await this.url("transaction/start");
            o(a);
            let l = await ur(a, { method: "POST", headers: this.headerBuilder.build({ traceparent: t.traceparent }), body: s, clientVersion: this.clientVersion });
            await this.handleError(await bt(l, this.clientVersion));
            let u = await l.json(), c = u.extensions;
            c && this.propagateResponseExtensions(c);
            let p = u.id, m = u["data-proxy"].endpoint;
            return { id: p, payload: { endpoint: m } };
          } else {
            let s = `${n.payload.endpoint}/${r}`;
            o(s);
            let a = await ur(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: t.traceparent }), clientVersion: this.clientVersion });
            await this.handleError(await bt(a, this.clientVersion));
            let u = (await a.json()).extensions;
            u && this.propagateResponseExtensions(u);
            return;
          }
        }, "callback") });
      }
      extractHostAndApiKey() {
        let r = { clientVersion: this.clientVersion }, t = Object.keys(this.inlineDatasources)[0], n = Ar({ inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources, clientVersion: this.clientVersion, env: this.env }), i;
        try {
          i = new URL(n);
        } catch {
          throw new sr(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\``, r);
        }
        let { protocol: o, host: s, searchParams: a } = i;
        if (o !== "prisma:") throw new sr(`Error validating datasource \`${t}\`: the URL must start with the protocol \`prisma://\``, r);
        let l = a.get("api_key");
        if (l === null || l.length < 1) throw new sr(`Error validating datasource \`${t}\`: the URL must contain a valid API key`, r);
        return [s, l];
      }
      metrics() {
        throw new ar("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
      }
      async withRetry(r) {
        for (let t = 0; ; t++) {
          let n = /* @__PURE__ */ __name((i) => {
            this.logEmitter.emit("info", { message: `Calling ${i} (n=${t})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }, "n");
          try {
            return await r.callback({ logHttpCall: n });
          } catch (i) {
            if (!(i instanceof ae) || !i.isRetryable) throw i;
            if (t >= _a) throw i instanceof Ir ? i.cause : i;
            this.logEmitter.emit("warn", { message: `Attempt ${t + 1}/${_a} failed for ${r.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            let o = await Ta(t);
            this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }
        }
      }
      async handleError(r) {
        if (r instanceof lr) throw await this.uploadSchema(), new Ir({ clientVersion: this.clientVersion, cause: r });
        if (r) throw r;
      }
    };
    function ka(e) {
      if (e?.kind === "itx") return e.options.id;
    }
    __name(ka, "ka");
    var Ui = _(__require("os"));
    var Da = _(__require("path"));
    var ji = Symbol("PrismaLibraryEngineCache");
    function am() {
      let e = globalThis;
      return e[ji] === void 0 && (e[ji] = {}), e[ji];
    }
    __name(am, "am");
    function lm(e) {
      let r = am();
      if (r[e] !== void 0) return r[e];
      let t = Da.default.toNamespacedPath(e), n = { exports: {} }, i = 0;
      return process.platform !== "win32" && (i = Ui.default.constants.dlopen.RTLD_LAZY | Ui.default.constants.dlopen.RTLD_DEEPBIND), process.dlopen(n, t, i), r[e] = n.exports, n.exports;
    }
    __name(lm, "lm");
    var La = { async loadLibrary(e) {
      let r = await Hn(), t = await ya("library", e);
      try {
        return e.tracingHelper.runInChildSpan({ name: "loadLibrary", internal: true }, () => lm(t));
      } catch (n) {
        let i = ri({ e: n, platformInfo: r, id: t });
        throw new S(i, e.clientVersion);
      }
    } };
    var Qi;
    var Na = { async loadLibrary(e) {
      let { clientVersion: r, adapter: t, engineWasm: n } = e;
      if (t === void 0) throw new S(`The \`adapter\` option for \`PrismaClient\` is required in this context (${fn()})`, r);
      if (n === void 0) throw new S("WASM engine was unexpectedly `undefined`", r);
      Qi === void 0 && (Qi = (async () => {
        let o = n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new S("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", r);
        let a = { "./query_engine_bg.js": o }, l = new WebAssembly.Instance(s, a);
        return o.__wbg_set_wasm(l.exports), o.QueryEngine;
      })());
      let i = await Qi;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var um = "P2036";
    var Re = N("prisma:client:libraryEngine");
    function cm(e) {
      return e.item_type === "query" && "query" in e;
    }
    __name(cm, "cm");
    function pm(e) {
      return "level" in e ? e.level === "error" && e.message === "PANIC" : false;
    }
    __name(pm, "pm");
    var Oa = [...Fn, "native"];
    var Fa = 0;
    var Pt = class {
      static {
        __name(this, "Pt");
      }
      constructor(r, t) {
        this.name = "LibraryEngine";
        this.libraryLoader = t ?? La, r.engineWasm !== void 0 && (this.libraryLoader = t ?? Na), this.config = r, this.libraryStarted = false, this.logQueries = r.logQueries ?? false, this.logLevel = r.logLevel ?? "error", this.logEmitter = r.logEmitter, this.datamodel = r.inlineSchema, r.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(r.overrideDatasources)[0], i = r.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary(), this.checkForTooManyEngines();
      }
      checkForTooManyEngines() {
        Fa === 10 && console.warn(`${de("warn(prisma-client)")} This is the 10th instance of Prisma Client being started. Make sure this is intentional.`);
      }
      async transaction(r, t, n) {
        await this.start();
        let i = JSON.stringify(t), o;
        if (r === "start") {
          let a = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          o = await this.engine?.startTransaction(a, i);
        } else r === "commit" ? o = await this.engine?.commitTransaction(n.id, i) : r === "rollback" && (o = await this.engine?.rollbackTransaction(n.id, i));
        let s = this.parseEngineResponse(o);
        if (mm(s)) {
          let a = this.getExternalAdapterError(s);
          throw a ? a.error : new V(s.message, { code: s.error_code, clientVersion: this.config.clientVersion, meta: s.meta });
        }
        return s;
      }
      async instantiateLibrary() {
        if (Re("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        On(), this.binaryTarget = await this.getCurrentBinaryTarget(), await this.loadEngine(), this.version();
      }
      async getCurrentBinaryTarget() {
        {
          if (this.binaryTarget) return this.binaryTarget;
          let r = await er();
          if (!Oa.includes(r)) throw new S(`Unknown ${ce("PRISMA_QUERY_ENGINE_LIBRARY")} ${ce(W(r))}. Possible binaryTargets: ${Me(Oa.join(", "))} or a path to the query engine library.
You may have to run ${Me("prisma generate")} for your changes to take effect.`, this.config.clientVersion);
          return r;
        }
      }
      parseEngineResponse(r) {
        if (!r) throw new j("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(r);
        } catch {
          throw new j("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let r = new WeakRef(this), { adapter: t } = this.config;
            t && Re("Using driver adapter: %O", t), this.engine = new this.QueryEngineConstructor({ datamodel: this.datamodel, env: process.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json" }, (n) => {
              r.deref()?.logger(n);
            }, t), Fa++;
          } catch (r) {
            let t = r, n = this.parseInitError(t.message);
            throw typeof n == "string" ? t : new S(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(r) {
        let t = this.parseEngineResponse(r);
        if (t) {
          if ("span" in t) {
            this.config.tracingHelper.createEngineSpan(t);
            return;
          }
          t.level = t?.level.toLowerCase() ?? "unknown", cm(t) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: t.query, params: t.params, duration: Number(t.duration_ms), target: t.module_path }) : pm(t) ? this.loggerRustPanic = new ue(Gi(this, `${t.message}: ${t.reason} in ${t.file}:${t.line}:${t.column}`), this.config.clientVersion) : this.logEmitter.emit(t.level, { timestamp: /* @__PURE__ */ new Date(), message: t.message, target: t.module_path });
        }
      }
      parseInitError(r) {
        try {
          return JSON.parse(r);
        } catch {
        }
        return r;
      }
      parseRequestError(r) {
        try {
          return JSON.parse(r);
        } catch {
        }
        return r;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return Re(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let r = /* @__PURE__ */ __name(async () => {
          Re("library starting");
          try {
            let t = { traceparent: this.config.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(t)), this.libraryStarted = true, Re("library started");
          } catch (t) {
            let n = this.parseInitError(t.message);
            throw typeof n == "string" ? t : new S(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "r");
        return this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan("connect", r), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return Re("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) return;
        let r = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setTimeout(n, 5)), Re("library stopping");
          let t = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(t)), this.libraryStarted = false, this.libraryStoppingPromise = void 0, Re("library stopped");
        }, "r");
        return this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan("disconnect", r), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(r) {
        return this.library?.debugPanic(r);
      }
      async request(r, { traceparent: t, interactiveTransaction: n }) {
        Re(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: t }), o = JSON.stringify(r);
        try {
          await this.start(), this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let s = this.parseEngineResponse(await this.executingQueryPromise);
          if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new j(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: s, elapsed: 0 };
        } catch (s) {
          if (s instanceof S) throw s;
          if (s.code === "GenericFailure" && s.message?.startsWith("PANIC:")) throw new ue(Gi(this, s.message), this.config.clientVersion);
          let a = this.parseRequestError(s.message);
          throw typeof a == "string" ? s : new j(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(r, { transaction: t, traceparent: n }) {
        Re("requestBatch");
        let i = yr(r, t);
        await this.start(), this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), ka(t));
        let o = await this.executingQueryPromise, s = this.parseEngineResponse(o);
        if (s.errors) throw s.errors.length === 1 ? this.buildQueryError(s.errors[0]) : new j(JSON.stringify(s.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: a, errors: l } = s;
        if (Array.isArray(a)) return a.map((u) => u.errors && u.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(u.errors[0]) : { data: u, elapsed: 0 });
        throw l && l.length === 1 ? new Error(l[0].error) : new Error(JSON.stringify(s));
      }
      buildQueryError(r) {
        if (r.user_facing_error.is_panic) return new ue(Gi(this, r.user_facing_error.message), this.config.clientVersion);
        let t = this.getExternalAdapterError(r.user_facing_error);
        return t ? t.error : or(r, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(r) {
        if (r.error_code === um && this.config.adapter) {
          let t = r.meta?.id;
          Vt(typeof t == "number", "Malformed external JS error received from the engine");
          let n = this.config.adapter.errorRegistry.consumeError(t);
          return Vt(n, "External error with reported id was not registered"), n;
        }
      }
      async metrics(r) {
        await this.start();
        let t = await this.engine.metrics(JSON.stringify(r));
        return r.format === "prometheus" ? t : this.parseEngineResponse(t);
      }
    };
    function mm(e) {
      return typeof e == "object" && e !== null && e.error_code !== void 0;
    }
    __name(mm, "mm");
    function Gi(e, r) {
      return va({ binaryTarget: e.binaryTarget, title: r, version: e.config.clientVersion, engineVersion: e.versionInfo?.commit, database: e.config.activeProvider, query: e.lastQuery });
    }
    __name(Gi, "Gi");
    function Ma({ copyEngine: e = true }, r) {
      let t;
      try {
        t = Ar({ inlineDatasources: r.inlineDatasources, overrideDatasources: r.overrideDatasources, env: { ...r.env, ...process.env }, clientVersion: r.clientVersion });
      } catch {
      }
      e && t?.startsWith("prisma://") && Wr("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let n = Qr(r.generator), i = !!(t?.startsWith("prisma://") || !e), o = !!r.adapter, s = n === "library", a = n === "binary";
      if (i && o || o && false) {
        let l;
        throw e ? t?.startsWith("prisma://") ? l = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : l = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : l = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new K(l.join(`
`), { clientVersion: r.clientVersion });
      }
      if (i) return new xt(r);
      if (s) return new Pt(r);
      throw new K("Invalid client engine type, please use `library` or `binary`", { clientVersion: r.clientVersion });
    }
    __name(Ma, "Ma");
    function bn({ generator: e }) {
      return e?.previewFeatures ?? [];
    }
    __name(bn, "bn");
    var Ua = _(Ji());
    function Va(e, r) {
      let t = ja(e), n = dm(t), i = gm(n);
      i ? wn(i, r) : r.addErrorMessage(() => "Unknown error");
    }
    __name(Va, "Va");
    function ja(e) {
      return e.errors.flatMap((r) => r.kind === "Union" ? ja(r) : [r]);
    }
    __name(ja, "ja");
    function dm(e) {
      let r = /* @__PURE__ */ new Map(), t = [];
      for (let n of e) {
        if (n.kind !== "InvalidArgumentType") {
          t.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = r.get(i);
        o ? r.set(i, { ...n, argument: { ...n.argument, typeNames: fm(o.argument.typeNames, n.argument.typeNames) } }) : r.set(i, n);
      }
      return t.push(...r.values()), t;
    }
    __name(dm, "dm");
    function fm(e, r) {
      return [...new Set(e.concat(r))];
    }
    __name(fm, "fm");
    function gm(e) {
      return ci(e, (r, t) => {
        let n = qa(r), i = qa(t);
        return n !== i ? n - i : Ba(r) - Ba(t);
      });
    }
    __name(gm, "gm");
    function qa(e) {
      let r = 0;
      return Array.isArray(e.selectionPath) && (r += e.selectionPath.length), Array.isArray(e.argumentPath) && (r += e.argumentPath.length), r;
    }
    __name(qa, "qa");
    function Ba(e) {
      switch (e.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(Ba, "Ba");
    var Fe = class {
      static {
        __name(this, "Fe");
      }
      constructor(r, t) {
        this.name = r;
        this.value = t;
        this.isRequired = false;
      }
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(r) {
        let { colors: { green: t } } = r.context;
        r.addMarginSymbol(t(this.isRequired ? "+" : "?")), r.write(t(this.name)), this.isRequired || r.write(t("?")), r.write(t(": ")), typeof this.value == "string" ? r.write(t(this.value)) : r.write(this.value);
      }
    };
    var xn = class {
      static {
        __name(this, "xn");
      }
      constructor() {
        this.fields = [];
      }
      addField(r, t) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${r}: ${t}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(r) {
        let { colors: { green: t } } = r.context;
        r.writeLine(t("{")).withIndent(() => {
          r.writeJoined(Tr, this.fields).newLine();
        }).write(t("}")).addMarginSymbol(t("+"));
      }
    };
    function wn(e, r) {
      switch (e.kind) {
        case "IncludeAndSelect":
          hm(e, r);
          break;
        case "IncludeOnScalar":
          ym(e, r);
          break;
        case "EmptySelection":
          Em(e, r);
          break;
        case "UnknownSelectionField":
          bm(e, r);
          break;
        case "UnknownArgument":
          wm(e, r);
          break;
        case "UnknownInputField":
          xm(e, r);
          break;
        case "RequiredArgumentMissing":
          Pm(e, r);
          break;
        case "InvalidArgumentType":
          vm(e, r);
          break;
        case "InvalidArgumentValue":
          Tm(e, r);
          break;
        case "ValueTooLarge":
          Cm(e, r);
          break;
        case "SomeFieldsMissing":
          Sm(e, r);
          break;
        case "TooManyFieldsGiven":
          Rm(e, r);
          break;
        case "Union":
          Va(e, r);
          break;
        default:
          throw new Error("not implemented: " + e.kind);
      }
    }
    __name(wn, "wn");
    function hm(e, r) {
      let t = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      t && t instanceof J && (t.getField("include")?.markAsError(), t.getField("select")?.markAsError()), r.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green("`include`")} or ${n.green("`select`")}, but ${n.red("not both")} at the same time.`);
    }
    __name(hm, "hm");
    function ym(e, r) {
      let [t, n] = Pn(e.selectionPath), i = e.outputType, o = r.arguments.getDeepSelectionParent(t)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new Fe(s.name, "true"));
      r.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${vt(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(ym, "ym");
    function Em(e, r) {
      let t = e.outputType, n = r.arguments.getDeepSelectionParent(e.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), Ja(n, t)), r.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(t.name)} must not be empty. ${vt(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(t.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(Em, "Em");
    function bm(e, r) {
      let [t, n] = Pn(e.selectionPath), i = r.arguments.getDeepSelectionParent(t);
      i && (i.value.getField(n)?.markAsError(), Ja(i.value, e.outputType)), r.addErrorMessage((o) => {
        let s = [`Unknown field ${o.red(`\`${n}\``)}`];
        return i && s.push(`for ${o.bold(i.kind)} statement`), s.push(`on model ${o.bold(`\`${e.outputType.name}\``)}.`), s.push(vt(o)), s.join(" ");
      });
    }
    __name(bm, "bm");
    function wm(e, r) {
      let t = e.argumentPath[0], n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      n instanceof J && (n.getField(t)?.markAsError(), Am(n, e.arguments)), r.addErrorMessage((i) => Qa(i, t, e.arguments.map((o) => o.name)));
    }
    __name(wm, "wm");
    function xm(e, r) {
      let [t, n] = Pn(e.argumentPath), i = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      if (i instanceof J) {
        i.getDeepField(e.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(t);
        o instanceof J && Ha(o, e.inputType);
      }
      r.addErrorMessage((o) => Qa(o, n, e.inputType.fields.map((s) => s.name)));
    }
    __name(xm, "xm");
    function Qa(e, r, t) {
      let n = [`Unknown argument \`${e.red(r)}\`.`], i = _m(r, t);
      return i && n.push(`Did you mean \`${e.green(i)}\`?`), t.length > 0 && n.push(vt(e)), n.join(" ");
    }
    __name(Qa, "Qa");
    function Pm(e, r) {
      let t;
      r.addErrorMessage((l) => t?.value instanceof H && t.value.text === "null" ? `Argument \`${l.green(o)}\` must not be ${l.red("null")}.` : `Argument \`${l.green(o)}\` is missing.`);
      let n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      if (!(n instanceof J)) return;
      let [i, o] = Pn(e.argumentPath), s = new xn(), a = n.getDeepFieldValue(i);
      if (a instanceof J) if (t = a.getField(o), t && a.removeField(o), e.inputTypes.length === 1 && e.inputTypes[0].kind === "object") {
        for (let l of e.inputTypes[0].fields) s.addField(l.name, l.typeNames.join(" | "));
        a.addSuggestion(new Fe(o, s).makeRequired());
      } else {
        let l = e.inputTypes.map(Ga).join(" | ");
        a.addSuggestion(new Fe(o, l).makeRequired());
      }
    }
    __name(Pm, "Pm");
    function Ga(e) {
      return e.kind === "list" ? `${Ga(e.elementType)}[]` : e.name;
    }
    __name(Ga, "Ga");
    function vm(e, r) {
      let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      n instanceof J && n.getDeepFieldValue(e.argumentPath)?.markAsError(), r.addErrorMessage((i) => {
        let o = vn("or", e.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(t)}\`: Invalid value provided. Expected ${o}, provided ${i.red(e.inferredType)}.`;
      });
    }
    __name(vm, "vm");
    function Tm(e, r) {
      let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      n instanceof J && n.getDeepFieldValue(e.argumentPath)?.markAsError(), r.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(t)}\``];
        if (e.underlyingError && o.push(`: ${e.underlyingError}`), o.push("."), e.argument.typeNames.length > 0) {
          let s = vn("or", e.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(Tm, "Tm");
    function Cm(e, r) {
      let t = e.argument.name, n = r.arguments.getDeepSubSelectionValue(e.selectionPath), i;
      if (n instanceof J) {
        let s = n.getDeepField(e.argumentPath)?.value;
        s?.markAsError(), s instanceof H && (i = s.text);
      }
      r.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(t)}\``), s.join(" ");
      });
    }
    __name(Cm, "Cm");
    function Sm(e, r) {
      let t = e.argumentPath[e.argumentPath.length - 1], n = r.arguments.getDeepSubSelectionValue(e.selectionPath);
      if (n instanceof J) {
        let i = n.getDeepFieldValue(e.argumentPath);
        i instanceof J && Ha(i, e.inputType);
      }
      r.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(t)}\` of type ${i.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 ? e.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${vn("or", e.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`), o.push(vt(i)), o.join(" ");
      });
    }
    __name(Sm, "Sm");
    function Rm(e, r) {
      let t = e.argumentPath[e.argumentPath.length - 1], n = r.arguments.getDeepSubSelectionValue(e.selectionPath), i = [];
      if (n instanceof J) {
        let o = n.getDeepFieldValue(e.argumentPath);
        o instanceof J && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      r.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(t)}\` of type ${o.bold(e.inputType.name)} needs`];
        return e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : e.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${vn("and", i.map((a) => o.red(a)))}. Please choose`), e.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${e.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(Rm, "Rm");
    function Ja(e, r) {
      for (let t of r.fields) e.hasField(t.name) || e.addSuggestion(new Fe(t.name, "true"));
    }
    __name(Ja, "Ja");
    function Am(e, r) {
      for (let t of r) e.hasField(t.name) || e.addSuggestion(new Fe(t.name, t.typeNames.join(" | ")));
    }
    __name(Am, "Am");
    function Ha(e, r) {
      if (r.kind === "object") for (let t of r.fields) e.hasField(t.name) || e.addSuggestion(new Fe(t.name, t.typeNames.join(" | ")));
    }
    __name(Ha, "Ha");
    function Pn(e) {
      let r = [...e], t = r.pop();
      if (!t) throw new Error("unexpected empty path");
      return [r, t];
    }
    __name(Pn, "Pn");
    function vt({ green: e, enabled: r }) {
      return "Available options are " + (r ? `listed in ${e("green")}` : "marked with ?") + ".";
    }
    __name(vt, "vt");
    function vn(e, r) {
      if (r.length === 1) return r[0];
      let t = [...r], n = t.pop();
      return `${t.join(", ")} ${e} ${n}`;
    }
    __name(vn, "vn");
    var Im = 3;
    function _m(e, r) {
      let t = 1 / 0, n;
      for (let i of r) {
        let o = (0, Ua.default)(e, i);
        o > Im || o < t && (t = o, n = i);
      }
      return n;
    }
    __name(_m, "_m");
    function Tn({ args: e, errors: r, errorFormat: t, callsite: n, originalMethod: i, clientVersion: o }) {
      let s = an(e);
      for (let p of r) wn(p, s);
      let a = t === "pretty" ? Cs : on, l = s.renderAllMessages(a), u = new Er(0, { colors: a }).write(s).toString(), c = Rr({ message: l, callsite: n, originalMethod: i, showColors: t === "pretty", callArguments: u });
      throw new K(c, { clientVersion: o });
    }
    __name(Tn, "Tn");
    var km = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", update: "updateOne", updateMany: "updateMany", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    function Wa({ modelName: e, action: r, args: t, runtimeDataModel: n, extensions: i, callsite: o, clientMethod: s, errorFormat: a, clientVersion: l }) {
      let u = new Hi({ runtimeDataModel: n, modelName: e, action: r, rootArgs: t, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: l });
      return { modelName: e, action: km[r], query: Wi(t, u) };
    }
    __name(Wa, "Wa");
    function Wi({ select: e, include: r, ...t } = {}, n) {
      return { arguments: za(t, n), selection: Dm(e, r, n) };
    }
    __name(Wi, "Wi");
    function Dm(e, r, t) {
      return e && r && t.throwValidationError({ kind: "IncludeAndSelect", selectionPath: t.getSelectionPath() }), e ? Om(e, t) : Lm(t, r);
    }
    __name(Dm, "Dm");
    function Lm(e, r) {
      let t = {};
      return e.model && !e.isRawAction() && (t.$composites = true, t.$scalars = true), r && Nm(t, r, e), t;
    }
    __name(Lm, "Lm");
    function Nm(e, r, t) {
      for (let [n, i] of Object.entries(r)) {
        let o = t.findField(n);
        o && o?.kind !== "object" && t.throwValidationError({ kind: "IncludeOnScalar", selectionPath: t.getSelectionPath().concat(n), outputType: t.getOutputTypeDescription() }), i === true ? e[n] = true : typeof i == "object" && (e[n] = Wi(i, t.nestSelection(n)));
      }
    }
    __name(Nm, "Nm");
    function Om(e, r) {
      let t = {}, n = r.getComputedFields(), i = aa(e, n);
      for (let [o, s] of Object.entries(i)) {
        let a = r.findField(o);
        n?.[o] && !a || (s === true ? t[o] = true : typeof s == "object" && (t[o] = Wi(s, r.nestSelection(o))));
      }
      return t;
    }
    __name(Om, "Om");
    function Ka(e, r) {
      if (e === null) return null;
      if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
      if (typeof e == "bigint") return { $type: "BigInt", value: String(e) };
      if (br(e)) {
        if (Wt(e)) return { $type: "DateTime", value: e.toISOString() };
        r.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r.getSelectionPath(), argumentPath: r.getArgumentPath(), argument: { name: r.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (vr(e)) return { $type: "FieldRef", value: { _ref: e.name, _container: e.modelName } };
      if (Array.isArray(e)) return Fm(e, r);
      if (ArrayBuffer.isView(e)) return { $type: "Bytes", value: Buffer.from(e).toString("base64") };
      if (Mm(e)) return e.values;
      if (Pr(e)) return { $type: "Decimal", value: e.toFixed() };
      if (e instanceof Ne) {
        if (e !== Gt.instances[e._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: e._getName() };
      }
      if ($m(e)) return e.toJSON();
      if (typeof e == "object") return za(e, r);
      r.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r.getSelectionPath(), argumentPath: r.getArgumentPath(), argument: { name: r.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(e)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(Ka, "Ka");
    function za(e, r) {
      if (e.$type) return { $type: "Raw", value: e };
      let t = {};
      for (let n in e) {
        let i = e[n];
        i !== void 0 && (t[n] = Ka(i, r.nestArgument(n)));
      }
      return t;
    }
    __name(za, "za");
    function Fm(e, r) {
      let t = [];
      for (let n = 0; n < e.length; n++) {
        let i = r.nestArgument(String(n)), o = e[n];
        o === void 0 && r.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${r.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: "Can not use `undefined` value within array. Use `null` or filter out `undefined` values" }), t.push(Ka(o, i));
      }
      return t;
    }
    __name(Fm, "Fm");
    function Mm(e) {
      return typeof e == "object" && e !== null && e.__prismaRawParameters__ === true;
    }
    __name(Mm, "Mm");
    function $m(e) {
      return typeof e == "object" && e !== null && typeof e.toJSON == "function";
    }
    __name($m, "$m");
    var Hi = class e {
      static {
        __name(this, "e");
      }
      constructor(r) {
        this.params = r;
        this.params.modelName && (this.model = this.params.runtimeDataModel.models[this.params.modelName]);
      }
      throwValidationError(r) {
        Tn({ errors: [r], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.model)) return { name: this.params.modelName, fields: this.model.fields.map((r) => ({ name: r.name, typeName: "boolean", isRelation: r.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(r) {
        return this.model?.fields.find((t) => t.name === r);
      }
      nestSelection(r) {
        let t = this.findField(r), n = t?.kind === "object" ? t.type : void 0;
        return new e({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(r) });
      }
      nestArgument(r) {
        return new e({ ...this.params, argumentPath: this.params.argumentPath.concat(r) });
      }
    };
    var Ya = /* @__PURE__ */ __name((e) => ({ command: e }), "Ya");
    var Za = /* @__PURE__ */ __name((e) => e.strings.reduce((r, t, n) => `${r}@P${n}${t}`), "Za");
    function Tt(e) {
      try {
        return Xa(e, "fast");
      } catch {
        return Xa(e, "slow");
      }
    }
    __name(Tt, "Tt");
    function Xa(e, r) {
      return JSON.stringify(e.map((t) => qm(t, r)));
    }
    __name(Xa, "Xa");
    function qm(e, r) {
      return typeof e == "bigint" ? { prisma__type: "bigint", prisma__value: e.toString() } : br(e) ? { prisma__type: "date", prisma__value: e.toJSON() } : Te.isDecimal(e) ? { prisma__type: "decimal", prisma__value: e.toJSON() } : Buffer.isBuffer(e) ? { prisma__type: "bytes", prisma__value: e.toString("base64") } : Bm(e) || ArrayBuffer.isView(e) ? { prisma__type: "bytes", prisma__value: Buffer.from(e).toString("base64") } : typeof e == "object" && r === "slow" ? rl(e) : e;
    }
    __name(qm, "qm");
    function Bm(e) {
      return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer ? true : typeof e == "object" && e !== null ? e[Symbol.toStringTag] === "ArrayBuffer" || e[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Bm, "Bm");
    function rl(e) {
      if (typeof e != "object" || e === null) return e;
      if (typeof e.toJSON == "function") return e.toJSON();
      if (Array.isArray(e)) return e.map(el);
      let r = {};
      for (let t of Object.keys(e)) r[t] = el(e[t]);
      return r;
    }
    __name(rl, "rl");
    function el(e) {
      return typeof e == "bigint" ? e.toString() : rl(e);
    }
    __name(el, "el");
    var Vm = /^(\s*alter\s)/i;
    var tl = N("prisma:client");
    function Ki(e, r, t, n) {
      if (!(e !== "postgresql" && e !== "cockroachdb") && t.length > 0 && Vm.exec(r)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(Ki, "Ki");
    var zi = /* @__PURE__ */ __name(({ clientMethod: e, activeProvider: r }) => (t) => {
      let n = "", i;
      if (Array.isArray(t)) {
        let [o, ...s] = t;
        n = o, i = { values: Tt(s || []), __prismaRawParameters__: true };
      } else switch (r) {
        case "sqlite":
        case "mysql": {
          n = t.sql, i = { values: Tt(t.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = t.text, i = { values: Tt(t.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = Za(t), i = { values: Tt(t.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${r} provider does not support ${e}`);
      }
      return i?.values ? tl(`prisma.${e}(${n}, ${i.values})`) : tl(`prisma.${e}(${n})`), { query: n, parameters: i };
    }, "zi");
    var nl = { requestArgsToMiddlewareArgs(e) {
      return [e.strings, ...e.values];
    }, middlewareArgsToRequestArgs(e) {
      let [r, ...t] = e;
      return new oe(r, t);
    } };
    var il = { requestArgsToMiddlewareArgs(e) {
      return [e];
    }, middlewareArgsToRequestArgs(e) {
      return e[0];
    } };
    function Yi(e) {
      return function(t) {
        let n, i = /* @__PURE__ */ __name((o = e) => {
          try {
            return o === void 0 || o?.kind === "itx" ? n ?? (n = ol(t(o))) : ol(t(o));
          } catch (s) {
            return Promise.reject(s);
          }
        }, "i");
        return { then(o, s) {
          return i().then(o, s);
        }, catch(o) {
          return i().catch(o);
        }, finally(o) {
          return i().finally(o);
        }, requestTransaction(o) {
          let s = i(o);
          return s.requestTransaction ? s.requestTransaction(o) : s;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(Yi, "Yi");
    function ol(e) {
      return typeof e.then == "function" ? e : Promise.resolve(e);
    }
    __name(ol, "ol");
    var sl = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, async createEngineSpan() {
    }, getActiveContext() {
    }, runInChildSpan(e, r) {
      return r();
    } };
    var Zi = class {
      static {
        __name(this, "Zi");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(r) {
        return this.getGlobalTracingHelper().getTraceParent(r);
      }
      createEngineSpan(r) {
        return this.getGlobalTracingHelper().createEngineSpan(r);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(r, t) {
        return this.getGlobalTracingHelper().runInChildSpan(r, t);
      }
      getGlobalTracingHelper() {
        return globalThis.PRISMA_INSTRUMENTATION?.helper ?? sl;
      }
    };
    function al(e) {
      return e.includes("tracing") ? new Zi() : sl;
    }
    __name(al, "al");
    function ll(e, r = () => {
    }) {
      let t, n = new Promise((i) => t = i);
      return { then(i) {
        return --e === 0 && t(r()), i?.(n);
      } };
    }
    __name(ll, "ll");
    var jm = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var ul = jm;
    function cl(e) {
      return typeof e == "string" ? e : e.reduce((r, t) => {
        let n = typeof t == "string" ? t : t.level;
        return n === "query" ? r : r && (t === "info" || r === "info") ? "info" : n;
      }, void 0);
    }
    __name(cl, "cl");
    var Cn = class {
      static {
        __name(this, "Cn");
      }
      constructor() {
        this._middlewares = [];
      }
      use(r) {
        this._middlewares.push(r);
      }
      get(r) {
        return this._middlewares[r];
      }
      has(r) {
        return !!this._middlewares[r];
      }
      length() {
        return this._middlewares.length;
      }
    };
    var ml = _(ai());
    function Sn(e) {
      return typeof e.batchRequestIdx == "number";
    }
    __name(Sn, "Sn");
    function Rn(e) {
      return e === null ? e : Array.isArray(e) ? e.map(Rn) : typeof e == "object" ? Um(e) ? Qm(e) : gr(e, Rn) : e;
    }
    __name(Rn, "Rn");
    function Um(e) {
      return e !== null && typeof e == "object" && typeof e.$type == "string";
    }
    __name(Um, "Um");
    function Qm({ $type: e, value: r }) {
      switch (e) {
        case "BigInt":
          return BigInt(r);
        case "Bytes":
          return Buffer.from(r, "base64");
        case "DateTime":
          return new Date(r);
        case "Decimal":
          return new Te(r);
        case "Json":
          return JSON.parse(r);
        default:
          rr(r, "Unknown tagged value");
      }
    }
    __name(Qm, "Qm");
    function pl(e) {
      if (e.action !== "findUnique" && e.action !== "findUniqueOrThrow") return;
      let r = [];
      return e.modelName && r.push(e.modelName), e.query.arguments && r.push(Xi(e.query.arguments)), r.push(Xi(e.query.selection)), r.join("");
    }
    __name(pl, "pl");
    function Xi(e) {
      return `(${Object.keys(e).sort().map((t) => {
        let n = e[t];
        return typeof n == "object" && n !== null ? `(${t} ${Xi(n)})` : t;
      }).join(" ")})`;
    }
    __name(Xi, "Xi");
    var Gm = { aggregate: false, aggregateRaw: false, createMany: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateOne: true, upsertOne: true };
    function eo(e) {
      return Gm[e];
    }
    __name(eo, "eo");
    var An = class {
      static {
        __name(this, "An");
      }
      constructor(r) {
        this.options = r;
        this.tickActive = false;
        this.batches = {};
      }
      request(r) {
        let t = this.options.batchBy(r);
        return t ? (this.batches[t] || (this.batches[t] = [], this.tickActive || (this.tickActive = true, process.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[t].push({ request: r, resolve: n, reject: i });
        })) : this.options.singleLoader(r);
      }
      dispatchBatches() {
        for (let r in this.batches) {
          let t = this.batches[r];
          delete this.batches[r], t.length === 1 ? this.options.singleLoader(t[0].request).then((n) => {
            n instanceof Error ? t[0].reject(n) : t[0].resolve(n);
          }).catch((n) => {
            t[0].reject(n);
          }) : (t.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(t.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < t.length; i++) t[i].reject(n);
            else for (let i = 0; i < t.length; i++) {
              let o = n[i];
              o instanceof Error ? t[i].reject(o) : t[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < t.length; i++) t[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    var Jm = N("prisma:client:request_handler");
    var In = class {
      static {
        __name(this, "In");
      }
      constructor(r, t) {
        this.logEmitter = t, this.client = r, this.dataloader = new An({ batchLoader: ta(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((p) => p.protocolQuery), l = this.client._tracingHelper.getTraceParent(s), u = n.some((p) => eo(p.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: l, transaction: Hm(o), containsWrite: u, customDataProxyFetch: i })).map((p, m) => {
            if (p instanceof Error) return p;
            try {
              return this.mapQueryEngineResult(n[m], p);
            } catch (f) {
              return f;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? dl(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: eo(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : pl(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(r) {
        try {
          return await this.dataloader.request(r);
        } catch (t) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = r;
          this.handleAndLogRequestError({ error: t, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a });
        }
      }
      mapQueryEngineResult({ dataPath: r, unpacker: t }, n) {
        let i = n?.data, o = n?.elapsed, s = this.unpack(i, r, t);
        return process.env.PRISMA_CLIENT_GET_TIME ? { data: s, elapsed: o } : s;
      }
      handleAndLogRequestError(r) {
        try {
          this.handleRequestError(r);
        } catch (t) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: t.message, target: r.clientMethod, timestamp: /* @__PURE__ */ new Date() }), t;
        }
      }
      handleRequestError({ error: r, clientMethod: t, callsite: n, transaction: i, args: o, modelName: s }) {
        if (Jm(r), Wm(r, i) || r instanceof Le) throw r;
        if (r instanceof V && Km(r)) {
          let l = fl(r.meta);
          Tn({ args: o, errors: [l], callsite: n, errorFormat: this.client._errorFormat, originalMethod: t, clientVersion: this.client._clientVersion });
        }
        let a = r.message;
        if (n && (a = Rr({ callsite: n, originalMethod: t, isPanic: r.isPanic, showColors: this.client._errorFormat === "pretty", message: a })), a = this.sanitizeMessage(a), r.code) {
          let l = s ? { modelName: s, ...r.meta } : r.meta;
          throw new V(a, { code: r.code, clientVersion: this.client._clientVersion, meta: l, batchRequestIdx: r.batchRequestIdx });
        } else {
          if (r.isPanic) throw new ue(a, this.client._clientVersion);
          if (r instanceof j) throw new j(a, { clientVersion: this.client._clientVersion, batchRequestIdx: r.batchRequestIdx });
          if (r instanceof S) throw new S(a, this.client._clientVersion);
          if (r instanceof ue) throw new ue(a, this.client._clientVersion);
        }
        throw r.clientVersion = this.client._clientVersion, r;
      }
      sanitizeMessage(r) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, ml.default)(r) : r;
      }
      unpack(r, t, n) {
        if (!r || (r.data && (r = r.data), !r)) return r;
        let i = Object.values(r)[0], o = t.filter((a) => a !== "select" && a !== "include"), s = Rn(Ri(i, o));
        return n ? n(s) : s;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function Hm(e) {
      if (e) {
        if (e.kind === "batch") return { kind: "batch", options: { isolationLevel: e.isolationLevel } };
        if (e.kind === "itx") return { kind: "itx", options: dl(e) };
        rr(e, "Unknown transaction kind");
      }
    }
    __name(Hm, "Hm");
    function dl(e) {
      return { id: e.id, payload: e.payload };
    }
    __name(dl, "dl");
    function Wm(e, r) {
      return Sn(e) && r?.kind === "batch" && e.batchRequestIdx !== r.index;
    }
    __name(Wm, "Wm");
    function Km(e) {
      return e.code === "P2009" || e.code === "P2012";
    }
    __name(Km, "Km");
    function fl(e) {
      if (e.kind === "Union") return { kind: "Union", errors: e.errors.map(fl) };
      if (Array.isArray(e.selectionPath)) {
        let [, ...r] = e.selectionPath;
        return { ...e, selectionPath: r };
      }
      return e;
    }
    __name(fl, "fl");
    var gl = "5.10.0";
    var hl = gl;
    function yl(e) {
      return e.map((r) => {
        let t = {};
        for (let n of Object.keys(r)) t[n] = El(r[n]);
        return t;
      });
    }
    __name(yl, "yl");
    function El({ prisma__type: e, prisma__value: r }) {
      switch (e) {
        case "bigint":
          return BigInt(r);
        case "bytes":
          return Buffer.from(r, "base64");
        case "decimal":
          return new Te(r);
        case "datetime":
        case "date":
          return new Date(r);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${r}Z`);
        case "array":
          return r.map(El);
        default:
          return r;
      }
    }
    __name(El, "El");
    var Pl = _(Ji());
    var q = class extends Error {
      static {
        __name(this, "q");
      }
      constructor(r) {
        super(r + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    w(q, "PrismaClientConstructorValidationError");
    var bl = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "__internal"];
    var wl = ["pretty", "colorless", "minimal"];
    var xl = ["info", "query", "warn", "error"];
    var Ym = { datasources: /* @__PURE__ */ __name((e, { datasourceNames: r }) => {
      if (e) {
        if (typeof e != "object" || Array.isArray(e)) throw new q(`Invalid value ${JSON.stringify(e)} for "datasources" provided to PrismaClient constructor`);
        for (let [t, n] of Object.entries(e)) {
          if (!r.includes(t)) {
            let i = Dr(t, r) || ` Available datasources: ${r.join(", ")}`;
            throw new q(`Unknown datasource ${t} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new q(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new q(`Invalid value ${JSON.stringify(e)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new q(`Invalid value ${JSON.stringify(o)} for datasource "${t}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((e, r) => {
      if (e === null) return;
      if (e === void 0) throw new q('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!bn(r).includes("driverAdapters")) throw new q('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (Qr() === "binary") throw new q('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((e) => {
      if (typeof e < "u" && typeof e != "string") throw new q(`Invalid value ${JSON.stringify(e)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((e) => {
      if (e) {
        if (typeof e != "string") throw new q(`Invalid value ${JSON.stringify(e)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!wl.includes(e)) {
          let r = Dr(e, wl);
          throw new q(`Invalid errorFormat ${e} provided to PrismaClient constructor.${r}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      if (!Array.isArray(e)) throw new q(`Invalid value ${JSON.stringify(e)} for "log" provided to PrismaClient constructor.`);
      function r(t) {
        if (typeof t == "string" && !xl.includes(t)) {
          let n = Dr(t, xl);
          throw new q(`Invalid log level "${t}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(r, "r");
      for (let t of e) {
        r(t);
        let n = { level: r, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = Dr(i, o);
            throw new q(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (t && typeof t == "object") for (let [i, o] of Object.entries(t)) if (n[i]) n[i](o);
        else throw new q(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let r = e.maxWait;
      if (r != null && r <= 0) throw new q(`Invalid value ${r} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let t = e.timeout;
      if (t != null && t <= 0) throw new q(`Invalid value ${t} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), __internal: /* @__PURE__ */ __name((e) => {
      if (!e) return;
      let r = ["debug", "engine", "configOverride"];
      if (typeof e != "object") throw new q(`Invalid value ${JSON.stringify(e)} for "__internal" to PrismaClient constructor`);
      for (let [t] of Object.entries(e)) if (!r.includes(t)) {
        let n = Dr(t, r);
        throw new q(`Invalid property ${JSON.stringify(t)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function vl(e, r) {
      for (let [t, n] of Object.entries(e)) {
        if (!bl.includes(t)) {
          let i = Dr(t, bl);
          throw new q(`Unknown property ${t} provided to PrismaClient constructor.${i}`);
        }
        Ym[t](n, r);
      }
      if (e.datasourceUrl && e.datasources) throw new q('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(vl, "vl");
    function Dr(e, r) {
      if (r.length === 0 || typeof e != "string") return "";
      let t = Zm(e, r);
      return t ? ` Did you mean "${t}"?` : "";
    }
    __name(Dr, "Dr");
    function Zm(e, r) {
      if (r.length === 0) return null;
      let t = r.map((i) => ({ value: i, distance: (0, Pl.default)(e, i) }));
      t.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = t[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(Zm, "Zm");
    function Tl(e) {
      return e.length === 0 ? Promise.resolve([]) : new Promise((r, t) => {
        let n = new Array(e.length), i = null, o = false, s = 0, a = /* @__PURE__ */ __name(() => {
          o || (s++, s === e.length && (o = true, i ? t(i) : r(n)));
        }, "a"), l = /* @__PURE__ */ __name((u) => {
          o || (o = true, t(u));
        }, "l");
        for (let u = 0; u < e.length; u++) e[u].then((c) => {
          n[u] = c, a();
        }, (c) => {
          if (!Sn(c)) {
            l(c);
            return;
          }
          c.batchRequestIdx === u ? l(c) : (i || (i = c), a());
        });
      });
    }
    __name(Tl, "Tl");
    var ze = N("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Xm = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((e) => e, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((e) => e, "middlewareArgsToRequestArgs") };
    var ed = Symbol.for("prisma.client.transaction.id");
    var rd = { id: 0, nextId() {
      return ++this.id;
    } };
    function _l(e) {
      class r {
        static {
          __name(this, "r");
        }
        constructor(n) {
          this._originalClient = this;
          this._middlewares = new Cn();
          this._createPrismaPromise = Yi();
          this.$extends = Ws;
          e = n?.__internal?.configOverride?.(e) ?? e, ca(e), n && vl(n, e);
          let i = n?.adapter ? gi(n.adapter) : void 0, o = new Al.EventEmitter().on("error", () => {
          });
          this._extensions = dn.empty(), this._previewFeatures = bn(e), this._clientVersion = e.clientVersion ?? hl, this._activeProvider = e.activeProvider, this._tracingHelper = al(this._previewFeatures);
          let s = { rootEnvPath: e.relativeEnvPaths.rootEnvPath && Ct.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath), schemaEnvPath: e.relativeEnvPaths.schemaEnvPath && Ct.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath) }, a = !i && Ur(s, { conflictCheck: "none" }) || e.injectableEdgeEnv?.();
          try {
            let l = n ?? {}, u = l.__internal ?? {}, c = u.debug === true;
            c && N.enable("prisma:client");
            let p = Ct.default.resolve(e.dirname, e.relativePath);
            Il.default.existsSync(p) || (p = e.dirname), ze("dirname", e.dirname), ze("relativePath", e.relativePath), ze("cwd", p);
            let m = u.engine || {};
            if (l.errorFormat ? this._errorFormat = l.errorFormat : process.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : process.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = e.runtimeDataModel, this._engineConfig = { cwd: p, dirname: e.dirname, enableDebugLogs: c, allowTriggerPanic: m.allowTriggerPanic, datamodelPath: Ct.default.join(e.dirname, e.filename ?? "schema.prisma"), prismaPath: m.binaryPath ?? void 0, engineEndpoint: m.endpoint, generator: e.generator, showColors: this._errorFormat === "pretty", logLevel: l.log && cl(l.log), logQueries: l.log && !!(typeof l.log == "string" ? l.log === "query" : l.log.find((f) => typeof f == "string" ? f === "query" : f.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: e.engineWasm, clientVersion: e.clientVersion, engineVersion: e.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e.activeProvider, inlineSchema: e.inlineSchema, overrideDatasources: pa(l, e.datasourceNames), inlineDatasources: e.inlineDatasources, inlineSchemaHash: e.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: l.transactionOptions?.maxWait ?? 2e3, timeout: l.transactionOptions?.timeout ?? 5e3, isolationLevel: l.transactionOptions?.isolationLevel }, logEmitter: o, isBundled: e.isBundled, adapter: i }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: Ar, getBatchRequestPayload: yr, prismaGraphQLToJSError: or, PrismaClientUnknownRequestError: j, PrismaClientInitializationError: S, PrismaClientKnownRequestError: V, debug: N("prisma:client:accelerateEngine"), engineVersion: Sl.version, clientVersion: e.clientVersion } }, ze("clientVersion", e.clientVersion), this._engine = Ma(e, this._engineConfig), this._requestHandler = new In(this, o), l.log) for (let f of l.log) {
              let g = typeof f == "string" ? f : f.emit === "stdout" ? f.level : null;
              g && this.$on(g, (h) => {
                Hr.log(`${Hr.tags[g] ?? ""}`, h.message || h.query);
              });
            }
            this._metrics = new hr(this._engine);
          } catch (l) {
            throw l.clientVersion = this._clientVersion, l;
          }
          return this._appliedParent = st(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i);
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            fo();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: zi({ clientMethod: i, activeProvider: a }), callsite: He(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = Cl(n, i);
              return Ki(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new K("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (Ki(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (e.activeProvider !== "mongodb") throw new K(`The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: Ya, callsite: He(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: zi({ clientMethod: i, activeProvider: a }), callsite: He(this._errorFormat), dataPath: [], middlewareArgsMapper: s }).then(yl);
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Cl(n, i));
            throw new K("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = rd.nextId(), s = ll(n.length), a = n.map((l, u) => {
            if (l?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let c = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, p = { kind: "batch", id: o, index: u, isolationLevel: c, lock: s };
            return l.requestTransaction?.(p) ?? l;
          });
          return Tl(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), l;
          try {
            let u = { kind: "itx", ...a };
            l = await n(this._createItxClient(u)), await this._engine.transaction("commit", o, a);
          } catch (u) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), u;
          }
          return l;
        }
        _createItxClient(n) {
          return st(Pe(Hs(this), [te("_appliedParent", () => this._appliedParent._createItxClient(n)), te("_createPrismaPromise", () => Yi(n)), te(ed, () => n.id), tt(ul)]));
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Xm, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = -1, l = /* @__PURE__ */ __name(async (u) => {
            let c = this._middlewares.get(++a);
            if (c) return this._tracingHelper.runInChildSpan(s.middleware, (A) => c(u, (T) => (A?.end(), l(T))));
            let { runInTransaction: p, args: m, ...f } = u, g = { ...n, ...f };
            m && (g.args = i.middlewareArgsToRequestArgs(m)), n.transaction !== void 0 && p === false && delete g.transaction;
            let h = await ra(this, g);
            return g.model ? Ys({ result: h, modelName: g.model, args: g.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel }) : h;
          }, "l");
          return this._tracingHelper.runInChildSpan(s.operation, () => new Rl.AsyncResource("prisma-client-request").runInAsyncScope(() => l(o)));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: l, argsMapper: u, transaction: c, unpacker: p, otelParentCtx: m, customDataProxyFetch: f }) {
          try {
            n = u ? u(n) : n;
            let g = { name: "serialize" }, h = this._tracingHelper.runInChildSpan(g, () => Wa({ modelName: l, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion }));
            return N.enabled("prisma:client") && (ze("Prisma Client call:"), ze(`prisma.${i}(${Is(n)})`), ze("Generated request:"), ze(JSON.stringify(h, null, 2) + `
`)), c?.kind === "batch" && await c.lock, this._requestHandler.request({ protocolQuery: h, modelName: l, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: c, unpacker: p, otelParentCtx: m, otelChildCtx: this._tracingHelper.getActiveContext(), customDataProxyFetch: f });
          } catch (g) {
            throw g.clientVersion = this._clientVersion, g;
          }
        }
        get $metrics() {
          if (!this._hasPreviewFlag("metrics")) throw new K("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: this._clientVersion });
          return this._metrics;
        }
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
      }
      return r;
    }
    __name(_l, "_l");
    function Cl(e, r) {
      return td(e) ? [new oe(e, r), nl] : [e, il];
    }
    __name(Cl, "Cl");
    function td(e) {
      return Array.isArray(e) && Array.isArray(e.raw);
    }
    __name(td, "td");
    var nd = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function kl(e) {
      return new Proxy(e, { get(r, t) {
        if (t in r) return r[t];
        if (!nd.has(t)) throw new TypeError(`Invalid enum value: ${String(t)}`);
      } });
    }
    __name(kl, "kl");
    function Dl(e) {
      Ur(e, { conflictCheck: "warn" });
    }
    __name(Dl, "Dl");
  }
});

// node_modules/.prisma/client/index.js
var require_client = __commonJS({
  "node_modules/.prisma/client/index.js"(exports2) {
    init_esm();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      NotFoundError: NotFoundError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw2,
      Decimal: Decimal2,
      Debug: Debug2,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      detectRuntime: detectRuntime2
    } = require_library();
    var Prisma = {};
    exports2.Prisma = Prisma;
    exports2.$Enums = {};
    Prisma.prismaVersion = {
      client: "5.10.0",
      engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.NotFoundError = NotFoundError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join2;
    Prisma.raw = raw2;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    var path = __require("path");
    exports2.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      Serializable: "Serializable"
    });
    exports2.Prisma.WorkflowRunScalarFieldEnum = {
      id: "id",
      createdAt: "createdAt",
      status: "status",
      scope: "scope",
      payload: "payload"
    };
    exports2.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports2.Prisma.ModelName = {
      WorkflowRun: "WorkflowRun"
    };
    var config2 = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "C:\\Users\\user\\Downloads\\Assignment_Fullstack\\assignment-fullstack\\node_modules\\@prisma\\client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "windows",
            "native": true
          }
        ],
        "previewFeatures": []
      },
      "relativeEnvPaths": {
        "rootEnvPath": "../../../.env",
        "schemaEnvPath": "../../../.env"
      },
      "relativePath": "../../../prisma",
      "clientVersion": "5.10.0",
      "engineVersion": "5a9203d0590c951969e85a7d07215503f4672eb9",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "sqlite",
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": 'generator client {\r\n  provider = "prisma-client-js"\r\n}\r\n\r\ndatasource db {\r\n  provider = "sqlite"\r\n  url      = env("DATABASE_URL")\r\n}\r\n\r\nmodel WorkflowRun {\r\n  id        String   @id @default(cuid())\r\n  createdAt DateTime @default(now())\r\n  status    String\r\n  scope     String\r\n  payload   String\r\n}\r\n',
      "inlineSchemaHash": "350347f323ee08158b203021deaa542a58b96eced48c940137a433ab6679a621",
      "copyEngine": true
    };
    var fs2 = __require("fs");
    config2.dirname = __dirname;
    if (!fs2.existsSync(path.join(__dirname, "schema.prisma"))) {
      const alternativePaths = [
        "node_modules/.prisma/client",
        ".prisma/client"
      ];
      const alternativePath = alternativePaths.find((altPath) => {
        return fs2.existsSync(path.join(process.cwd(), altPath, "schema.prisma"));
      }) ?? alternativePaths[0];
      config2.dirname = path.join(process.cwd(), alternativePath);
      config2.isBundled = true;
    }
    config2.runtimeDataModel = JSON.parse('{"models":{"WorkflowRun":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"cuid","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"scope","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"payload","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports2.Prisma, config2.runtimeDataModel);
    config2.engineWasm = void 0;
    var { warnEnvConflicts: warnEnvConflicts2 } = require_library();
    warnEnvConflicts2({
      rootEnvPath: config2.relativeEnvPaths.rootEnvPath && path.resolve(config2.dirname, config2.relativeEnvPaths.rootEnvPath),
      schemaEnvPath: config2.relativeEnvPaths.schemaEnvPath && path.resolve(config2.dirname, config2.relativeEnvPaths.schemaEnvPath)
    });
    var PrismaClient2 = getPrismaClient2(config2);
    exports2.PrismaClient = PrismaClient2;
    Object.assign(exports2, Prisma);
    path.join(__dirname, "query_engine-windows.dll.node");
    path.join(process.cwd(), "node_modules/.prisma/client/query_engine-windows.dll.node");
    path.join(__dirname, "schema.prisma");
    path.join(process.cwd(), "node_modules/.prisma/client/schema.prisma");
  }
});

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports2, module2) {
    init_esm();
    module2.exports = { ...require_client() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports2, module2) {
    init_esm();
    module2.exports = {
      ...require_default()
    };
  }
});

// src/trigger/workflow.ts
init_esm();

// src/lib/execution/engine.ts
init_esm();

// src/lib/execution/ExecutorRegistry.ts
init_esm();

// src/lib/execution/nodes/TextNodeExecutor.ts
init_esm();
var TextNodeExecutor = class {
  static {
    __name(this, "TextNodeExecutor");
  }
  async execute(input, context) {
    context.log("text", "Executing Text Node...");
    const textValue = input.value || "Default Text";
    context.log("text", `Generated text: "${textValue}"`);
    return {
      text: textValue
    };
  }
};

// src/lib/execution/nodes/DebugNodeExecutor.ts
init_esm();
var DebugNodeExecutor = class {
  static {
    __name(this, "DebugNodeExecutor");
  }
  async execute(input, context) {
    context.log("debug", "Executing Debug Node...");
    const inputs = Object.entries(input).map(([key, val]) => `${key}: ${val}`).join(", ");
    context.log("debug", `Received inputs: { ${inputs} }`);
    return input;
  }
};

// src/lib/execution/nodes/LLMNodeExecutor.ts
init_esm();
var LLMNodeExecutor = class {
  static {
    __name(this, "LLMNodeExecutor");
  }
  async execute(input, context) {
    context.log(this.constructor.name, "LLMNodeExecutor is deprecated. engine.ts now handles LLM nodes directly.");
    throw new Error(
      "LLMNodeExecutor should not be called directly. execution/engine.ts should intercept 'llm' nodes."
    );
  }
};

// src/lib/execution/nodes/VisionNodeExecutor.ts
init_esm();
var VisionNodeExecutor = class {
  static {
    __name(this, "VisionNodeExecutor");
  }
  async execute(input, context) {
    context.log(this.constructor.name, "VisionNodeExecutor is currently disabled due to Groq migration.");
    throw new Error(
      "Vision Node is not yet supported in the Groq migration. Please check back later."
    );
  }
};

// src/lib/execution/ExecutorRegistry.ts
var executorRegistry = {
  text: TextNodeExecutor,
  debug: DebugNodeExecutor,
  llm: LLMNodeExecutor,
  vision: VisionNodeExecutor
};

// src/lib/execution/engine.ts
var getExecutionOrder = /* @__PURE__ */ __name((nodes, edges) => {
  const inDegree = /* @__PURE__ */ new Map();
  const adjList = /* @__PURE__ */ new Map();
  nodes.forEach((node) => {
    inDegree.set(node.id, 0);
    adjList.set(node.id, []);
  });
  edges.forEach((edge) => {
    const source = edge.source;
    const target = edge.target;
    if (!inDegree.has(source) || !inDegree.has(target)) return;
    adjList.get(source)?.push(target);
    inDegree.set(target, (inDegree.get(target) || 0) + 1);
  });
  const queue = [];
  inDegree.forEach((degree, id2) => {
    if (degree === 0) {
      queue.push(id2);
    }
  });
  const executionOrder = [];
  while (queue.length > 0) {
    const currentId = queue.shift();
    executionOrder.push(currentId);
    const neighbors = adjList.get(currentId) || [];
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  if (executionOrder.length !== nodes.length) {
    throw new Error("Cycle detected in workflow: Execution flow contains circular dependencies.");
  }
  return executionOrder;
}, "getExecutionOrder");
async function executeGeminiNode(prompt, apiKey) {
  console.log(`🚀 Sending prompt to Gemini via fetch...`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API Error: ${response.status} - ${errorBody}`);
  }
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini response missing text content");
  console.log("✅ Gemini response received length:", text.length);
  return text;
}
__name(executeGeminiNode, "executeGeminiNode");
async function executeLLMNode({ prompt }) {
  if (process.env.GEMINI_API_KEY) {
    try {
      return await executeGeminiNode(prompt, process.env.GEMINI_API_KEY);
    } catch (error) {
      console.error("⚠️ Gemini failed, falling back to other providers if available:", error.message);
    }
  }
  if (process.env.GROQ_API_KEY) {
    console.log(`🚀 Sending prompt to Groq (Llama 3.1) via fetch: "${prompt.substring(0, 50)}..."`);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          // Updated from decommissioned model
          messages: [{ role: "user", content: prompt }]
        })
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq API Error: ${response.status} - ${errorBody}`);
      }
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "No response";
      console.log("✅ Groq response received length:", text.length);
      return text;
    } catch (error) {
      console.error("❌ Groq API execution error:", error);
      if (process.env.GEMINI_API_KEY) throw error;
    }
  }
  if (!process.env.GROQ_API_KEY && !process.env.GEMINI_API_KEY) {
    console.warn("⚠️ No API key found, using mock response");
    return "This is a mock AI response for demonstration purposes. (No API keys configured)";
  }
  throw new Error("Detailed LLM execution failed. Check server logs for provider errors.");
}
__name(executeLLMNode, "executeLLMNode");
var runWorkflow = /* @__PURE__ */ __name(async (nodes, edges, onStatusChange) => {
  const executionOrder = getExecutionOrder(nodes, edges);
  const context = {
    executionId: crypto.randomUUID(),
    nodeResults: /* @__PURE__ */ new Map(),
    logs: [],
    log: /* @__PURE__ */ __name((nodeId, message) => {
      console.log(`[${nodeId}] ${message}`);
      context.logs.push({
        nodeId,
        message,
        timestamp: Date.now()
      });
    }, "log")
  };
  for (const nodeId of executionOrder) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) continue;
    console.log("🔥 EXECUTING NODE", node.id, node.type);
    const nodeType = node.type || "unknown";
    if (nodeType.toLowerCase().includes("llm") || nodeType.toLowerCase().includes("ai")) {
      try {
        if (onStatusChange) onStatusChange(nodeId, "running");
        const inputEdges = edges.filter((e) => e.target === nodeId);
        const inputs = { ...node.data };
        for (const edge of inputEdges) {
          const sourceResult = context.nodeResults.get(edge.source);
          if (sourceResult) {
            Object.assign(inputs, sourceResult);
          }
        }
        const prompt = inputs.text || inputs.prompt || inputs.value || "";
        if (!prompt) {
          throw new Error("LLM node received empty prompt");
        }
        const startTime = Date.now();
        context.log(nodeId, `Executing LLM Node with prompt: "${prompt.substring(0, 50)}..."`);
        const geminiText = await executeLLMNode({
          prompt
        });
        const endTime = Date.now();
        const duration = endTime - startTime;
        context.log(nodeId, `Generated ${geminiText.length} characters in ${duration}ms`);
        context.nodeResults.set(nodeId, {
          output: geminiText,
          // ← MUST be a string
          _meta: {
            type: nodeType,
            label: node.data.label,
            startTime,
            endTime,
            duration
          }
        });
        if (onStatusChange) onStatusChange(nodeId, "completed");
        continue;
      } catch (error) {
        context.log(nodeId, `Error in LLM execution: ${error.message}`);
        console.error(`[${nodeId}] Full Error Stack:`, error);
        if (onStatusChange) onStatusChange(nodeId, "error");
        throw error;
      }
    }
    const ExecutorClass = executorRegistry[nodeType];
    if (!ExecutorClass) {
      context.log(nodeId, `No executor found for type: ${nodeType}`);
      continue;
    }
    try {
      if (onStatusChange) onStatusChange(nodeId, "running");
      const executor = new ExecutorClass();
      const inputEdges = edges.filter((e) => e.target === nodeId);
      const inputs = { ...node.data };
      for (const edge of inputEdges) {
        const sourceResult = context.nodeResults.get(edge.source);
        if (sourceResult) {
          Object.assign(inputs, sourceResult);
        }
      }
      const startTime = Date.now();
      const output = await executor.execute(inputs, context);
      const endTime = Date.now();
      const duration = endTime - startTime;
      context.nodeResults.set(nodeId, {
        ...output,
        _meta: {
          type: nodeType,
          label: node.data.label,
          startTime,
          endTime,
          duration
        }
      });
      if (onStatusChange) onStatusChange(nodeId, "completed");
    } catch (error) {
      context.log(nodeId, `Error executing node: ${error.message}`);
      if (onStatusChange) onStatusChange(nodeId, "error");
      throw error;
    }
  }
  return context;
}, "runWorkflow");

// src/lib/prisma.ts
init_esm();
var import_client = __toESM(require_default2());
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma ?? new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/trigger/workflow.ts
var workflowTask = task({
  id: "workflow-task",
  maxDuration: 600,
  // 10 minutes
  run: /* @__PURE__ */ __name(async (payload) => {
    console.log("🚀 Starting workflow execution...");
    console.log(`📊 Received ${payload.nodes.length} nodes and ${payload.edges.length} edges.`);
    const nodeStatus = {};
    payload.nodes.forEach((node) => {
      nodeStatus[node.id] = "idle";
    });
    try {
      const context = await runWorkflow(payload.nodes, payload.edges, (nodeId, status) => {
        console.log(`[${nodeId}] ➡️ ${status}`);
        nodeStatus[nodeId] = status;
      });
      const llmNodeResult = Array.from(context.nodeResults.values()).find((r) => typeof r.output === "string" && r.output.length > 0);
      console.log("✅ Workflow execution complete.");
      const result = {
        success: true,
        executionId: context.executionId,
        results: Object.fromEntries(context.nodeResults),
        llmResponse: llmNodeResult ? { text: llmNodeResult.output } : void 0,
        logs: context.logs,
        nodeStatus,
        nodesExecuted: context.logs.filter((l) => l.message.includes("Executing")).length
      };
      try {
        await prisma.workflowRun.create({
          data: {
            status: "success",
            scope: "full",
            payload: JSON.stringify(result)
            // Manual serialization
          }
        });
        console.log("✅ Run saved to DB");
      } catch (dbError) {
        console.error("❌ Failed to save run to DB:", dbError);
      }
      return result;
    } catch (error) {
      console.error("❌ Workflow failed:", error);
      const failedResult = {
        success: false,
        error: error.message || "Unknown error occurred",
        stack: error.stack,
        failedAt: (/* @__PURE__ */ new Date()).toISOString(),
        nodeStatus
        // Include partial status even on failure
      };
      try {
        await prisma.workflowRun.create({
          data: {
            status: "failed",
            scope: "full",
            payload: JSON.stringify(failedResult)
          }
        });
        console.log("✅ Failed run saved to DB");
      } catch (dbError) {
        console.error("❌ Failed to save run to DB:", dbError);
      }
      return failedResult;
    }
  }, "run")
});

export {
  workflowTask
};
/*! Bundled license information:

@prisma/client/runtime/library.js:
  (*! Bundled license information:
  
  decimal.js/decimal.mjs:
    (*!
     *  decimal.js v10.4.3
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Licence
     *)
  *)
*/
//# sourceMappingURL=chunk-JKOYZINX.mjs.map
