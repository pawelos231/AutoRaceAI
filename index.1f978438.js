// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"5evvV":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "8fdf439d1f978438";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"7elyk":[function(require,module,exports) {
var _carsCanvas = require("./modules/CarsCanvas");
const canvas = new (0, _carsCanvas.CarCanvas)();
canvas.animate(); /*
setInterval(() => {
  canvas.animate();
}, 6);
*/ 

},{"./modules/CarsCanvas":"dtogI"}],"dtogI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CarCanvas", ()=>CarCanvas);
var _entitiesDimmensions = require("../constants/DefaultValues/EntitiesDimmensions");
var _car = require("./entities/Car");
var _carTypes = require("../types/CarTypes");
var _road = require("./entities/Road");
var _colors = require("../constants/DefaultValues/colors");
var _common = require("./Common");
var _classNames = require("../constants/classNames");
var _index = require("../network/index");
var _getRandomValue = require("../helpers/getRandomValue");
var _geneticAlgorithm = require("../network/geneticAlgorithm");
var _neuralNetworkConsts = require("../constants/DefaultValues/neuralNetworkConsts");
var _traffic = require("../data/traffic");
var _commonTypes = require("../types/CommonTypes");
const POPULATION_LOCAL_STORAGE_KEY = "population";
const ROAD_WIDTH_MULTIPLIER = 0.9;
const CARS_TO_TRAIN_COUNT = 250;
class CarCanvas extends (0, _common.Common) {
    constructor(){
        var _a, _b;
        super();
        this.ctx = null;
        this.bestCar = null;
        this.cleanUpOfCars();
        this.population = [];
        this.canvas = this.bindElementById((0, _classNames.CAR_CANVAS_ID));
        this.initCanvas();
        this.save();
        this.traffic = [];
        this.road = new (0, _road.Road)(((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.width) / 2, ((_b = this.canvas) === null || _b === void 0 ? void 0 : _b.width) * ROAD_WIDTH_MULTIPLIER);
        this.generation = 0;
        const pop = localStorage.getItem(POPULATION_LOCAL_STORAGE_KEY);
        if (pop) {
            const item = JSON.parse(pop);
            if (CARS_TO_TRAIN_COUNT > item.population.length) {
                let count = 0;
                for(let i = 0; i < CARS_TO_TRAIN_COUNT; i++){
                    count++;
                    if (count >= item.population.length - 1) count = 0;
                    console.log(count);
                    this.population[i] = JSON.parse(JSON.stringify(item.population[count]));
                }
            } else if (CARS_TO_TRAIN_COUNT < item.population.length) {
                const ws = item.population.length / CARS_TO_TRAIN_COUNT;
                const selected = item.population.slice(0, Math.floor(item.population.length / ws));
                this.population = selected;
            } else this.population = item.population;
            this.generation = item.generation;
        }
        this.cars = this.generateCars(CARS_TO_TRAIN_COUNT);
        this.traffic = this.generateMockTrafficNonRandom();
    }
    initCanvas() {
        this.canvas.width = (0, _entitiesDimmensions.CANVAS_WIDTH);
        this.canvas.height = (0, _entitiesDimmensions.CANVAS_HEIGHT);
        this.ctx = this.canvas.getContext("2d");
    }
    shouldCarsTrain() {
        var _a;
        this.bestCar = this.cars.find((car)=>{
            return car.y == Math.min(...this.cars.map((c)=>c.y));
        });
        if (this.bestCar.y < (0, _entitiesDimmensions.END_OF_MAP_TOP)) {
            (0, _geneticAlgorithm.GeneticAlgorithm).trainNeuralNetworks(this.cars, this.population, this.traffic.map((car)=>car.y));
            this.population = (0, _geneticAlgorithm.GeneticAlgorithm).evolvePopulation(this.population, (_a = this.cars[0].sensor) === null || _a === void 0 ? void 0 : _a.rayCount, this.generation, this.population[0].fitness);
            this.population.sort((a, b)=>b.fitness - a.fitness);
            const bestFit = this.population[0].fitness;
            const averageFit = this.population.reduce((a, b)=>a + b.fitness, 0) / this.population.length;
            console.log("BEST FIT:", bestFit, "\n AVG FIT:", averageFit);
            const localBrain = JSON.parse(localStorage.getItem((0, _classNames.BEST_CAR_LOCAL)));
            if (localBrain && bestFit > localBrain.fitness) {
                this.cars[0].brain = this.population[0];
                this.bestCar.brain = this.population[0];
                this.saveBestCarToStorage();
            }
            if (!localBrain) localStorage.setItem((0, _classNames.BEST_CAR_LOCAL), JSON.stringify(this.population[0]));
            this.generation++;
            this.cars = this.generateCars(CARS_TO_TRAIN_COUNT);
            this.traffic = this.generateMockTrafficNonRandom();
        }
    }
    animate() {
        var _a, _b, _c, _d;
        this.shouldCarsTrain();
        for(let i = 0; i < this.traffic.length; i++)this.traffic[i].update(this.road.borders, []);
        for(let i = 0; i < this.cars.length; i++){
            if (!this.cars[i].damaged) this.cars[i].update(this.road.borders, this.traffic);
            if (this.cars[i].damaged && this.cars[i].snapshotOfTraffic.length == 0) this.cars[i].snapshotOfTraffic = this.traffic.map((car)=>car.y);
        }
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        (_a = this.ctx) === null || _a === void 0 || _a.save();
        (_b = this.ctx) === null || _b === void 0 || _b.translate(0, -this.bestCar.y + ((_c = this.canvas) === null || _c === void 0 ? void 0 : _c.height) * 0.7);
        this.road.draw(this.ctx);
        for (const car of this.traffic)car.draw(this.ctx, (0, _colors.BLUE));
        this.ctx.globalAlpha = 0.2;
        for (const car of this.cars)if (!car.damaged) car.draw(this.ctx, (0, _colors.BLACK));
        this.ctx.globalAlpha = 1;
        this.bestCar.draw(this.ctx, (0, _colors.BLACK), true);
        (_d = this.ctx) === null || _d === void 0 || _d.restore();
        this.DrawGeneerationNumber();
        requestAnimationFrame(this.animate.bind(this));
    }
    generateCars(N) {
        const cars = [];
        this.cars = [];
        let population = [];
        if (this.population.length == 0) console.log("CREATING NEW POPULATION");
        else console.log("USING OLD POPULATION");
        for(let i = 1; i <= N; i++){
            let car = new (0, _car.Car)(this.road.getLaneCenter(1), (0, _entitiesDimmensions.CAR_Y_POS), (0, _entitiesDimmensions.CAR_WIDTH), (0, _entitiesDimmensions.CAR_HEIGHT), (0, _carTypes.VehicleType).AI, (0, _carTypes.VehicleSpeed).FAST, this.road.getLaneCenter.bind(this.road), this.road.laneCount);
            if (this.population.length == 0) {
                population.push(JSON.parse(JSON.stringify(car.brain)));
                if (localStorage.getItem((0, _classNames.BEST_CAR_LOCAL))) {
                    car.brain = JSON.parse(localStorage.getItem((0, _classNames.BEST_CAR_LOCAL)));
                    if (i > 15) (0, _index.NeuralNetwork).mutate(car.brain, (0, _neuralNetworkConsts.DEFAULT_MUTATION_AMOUNT));
                }
            } else {
                console.log("es");
                if (localStorage.getItem((0, _classNames.BEST_CAR_LOCAL))) {
                    if (i < 15) car.brain = JSON.parse(localStorage.getItem((0, _classNames.BEST_CAR_LOCAL)));
                    else car.brain = JSON.parse(JSON.stringify(this.population[i - 15]));
                }
            }
            cars.push(car);
        }
        if (this.population.length == 0) this.population = population;
        else for(let i = 15; i < 30; i++)this.population[i] = JSON.parse(localStorage.getItem((0, _classNames.BEST_CAR_LOCAL)));
        return cars;
    }
    saveBestCarToStorage() {
        localStorage.setItem((0, _classNames.BEST_CAR_LOCAL), JSON.stringify(this.bestCar.brain));
    }
    savePopulation() {
        const popToSave = {
            population: this.population,
            generation: this.generation
        };
        localStorage.setItem(POPULATION_LOCAL_STORAGE_KEY, JSON.stringify(popToSave));
    }
    deleteSavedPop() {
        localStorage.removeItem(POPULATION_LOCAL_STORAGE_KEY);
    }
    save() {
        let save = this.bindElementByClass("save");
        let savePop = this.bindElementByClass("population");
        let discardPop = this.bindElementByClass("dicardPopulation");
        save.addEventListener("click", ()=>{
            this.saveBestCarToStorage();
            this.displayMessageAtTheTopOfTheScreen("SAVED CAR", (0, _commonTypes.Logger).Message);
        });
        savePop.addEventListener("click", ()=>{
            this.displayMessageAtTheTopOfTheScreen("SAVED POPULATION", (0, _commonTypes.Logger).Message);
            this.savePopulation();
        });
        discardPop.addEventListener("click", ()=>{
            this.deleteSavedPop();
            this.displayMessageAtTheTopOfTheScreen("DISCARDED POPULATION", (0, _commonTypes.Logger).Message);
        });
    }
    generateMockTrafficNonRandom() {
        const traffic = [];
        const MOCKED = (0, _traffic.TRAFFIC_MOCK_DATA)(this.road);
        for(let i = 0; i < MOCKED.length; i++)traffic.push(new (0, _car.Car)(MOCKED[i].x, MOCKED[i].y, 30, 60, (0, _carTypes.VehicleType).NPC, (0, _carTypes.VehicleSpeed).SLOW, this.road.getLaneCenter.bind(this.road), this.road.laneCount));
        return traffic;
    }
    generateRandomTraffic(numberOfCarsToGenerate) {
        const traffic = [];
        for(let i = 0; i < numberOfCarsToGenerate; i++)traffic.push(new (0, _car.Car)(this.road.getLaneCenter((0, _getRandomValue.getRandomValueBetweenNums)(0, 3)), -(i * 170) - 300, (0, _getRandomValue.getRandomValueBetweenNums)(30, 40), (0, _getRandomValue.getRandomValueBetweenNums)(60, 70), (0, _carTypes.VehicleType).NPC, (0, _carTypes.VehicleSpeed).SLOW, this.road.getLaneCenter.bind(this.road), this.road.laneCount));
        return traffic;
    }
    cleanUpNpcs() {
        for(let i = 0; i < this.traffic.length; i++)if (Math.abs(this.bestCar.y) - Math.abs(this.traffic[i].y) > 1000) this.traffic.splice(i, 1);
    }
    cleanUpAi() {
        for(let i = 0; i < this.cars.length; i++)if (this.cars[i].damaged) this.cars.splice(i, 1);
    }
    cleanUpOfCars() {
        setInterval(()=>{
        //this.cleanUpNpcs();
        }, 1000);
    }
    DrawGeneerationNumber() {
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        const x = 100;
        const y = 30;
        this.ctx.fillText(`Generation: ${this.generation} `, x, y);
    }
}

},{"../constants/DefaultValues/EntitiesDimmensions":"l716V","./entities/Car":"eA12T","../types/CarTypes":"7CgJ2","./entities/Road":"2DTSZ","../constants/DefaultValues/colors":"f3k95","./Common":"3kiHY","../constants/classNames":"jfrLV","../network/index":"cn8q1","../helpers/getRandomValue":"7cvHn","../network/geneticAlgorithm":"bqr25","../constants/DefaultValues/neuralNetworkConsts":"2yrzt","../data/traffic":"38RLM","../types/CommonTypes":"7mK6X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l716V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CANVAS_HEIGHT", ()=>CANVAS_HEIGHT);
parcelHelpers.export(exports, "CANVAS_WIDTH", ()=>CANVAS_WIDTH);
parcelHelpers.export(exports, "CAR_WIDTH", ()=>CAR_WIDTH);
parcelHelpers.export(exports, "CAR_HEIGHT", ()=>CAR_HEIGHT);
parcelHelpers.export(exports, "CAR_X_POX", ()=>CAR_X_POX);
parcelHelpers.export(exports, "CAR_Y_POS", ()=>CAR_Y_POS);
parcelHelpers.export(exports, "infinity", ()=>infinity);
parcelHelpers.export(exports, "DEFAULT_LANE_COUNT", ()=>DEFAULT_LANE_COUNT);
parcelHelpers.export(exports, "DEFAULT_LINE_WIDTH", ()=>DEFAULT_LINE_WIDTH);
parcelHelpers.export(exports, "END_OF_MAP_TOP", ()=>END_OF_MAP_TOP);
parcelHelpers.export(exports, "END_OF_MAP_BOTTOM", ()=>END_OF_MAP_BOTTOM);
const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = 500;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 150;
const CAR_X_POX = 250;
const CAR_Y_POS = 250;
const infinity = 1000000;
const DEFAULT_LANE_COUNT = 3;
const DEFAULT_LINE_WIDTH = 5;
const END_OF_MAP_TOP = -20000;
const END_OF_MAP_BOTTOM = 1000;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"eA12T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Car", ()=>Car);
var _carTypes = require("../../types/CarTypes");
var _inputController = require("../../helpers/InputController");
var _sensor = require("../Sensor");
var _polyIntersect = require("../../utility/polyIntersect");
var _colors = require("../../constants/DefaultValues/colors");
var _index = require("../../network/index");
var _common = require("../Common");
var _commonTypes = require("../../types/CommonTypes");
var _entitiesDimmensions = require("../../constants/DefaultValues/EntitiesDimmensions");
class Car extends (0, _common.Common) {
    constructor(x, y, width, height, vehicleType, maxSpeed = 3, getLaneCenter, laneCount){
        super();
        // Additional Car Properties
        this.polygon = [];
        this.sensor = null;
        this.brain = null;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.obstaclesCrossed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;
        this.carType = vehicleType;
        this.isDone = false;
        this.destination = (0, _entitiesDimmensions.END_OF_MAP_TOP);
        this.getLaneCenter = getLaneCenter;
        this.laneCount = laneCount;
        this.createdAt = Date.now();
        this.snapshotOfTraffic = [];
        this.useBrain = vehicleType == (0, _carTypes.VehicleType).AI;
        if (vehicleType != (0, _carTypes.VehicleType).NPC) {
            this.sensor = new (0, _sensor.Sensor)();
            this.brain = new (0, _index.NeuralNetwork)([
                this.sensor.rayCount,
                7,
                4
            ]);
        }
        this.controls = new (0, _inputController.InputController)(vehicleType);
    }
    upDownControlls() {
        if (this.controls.forward) this.speed += this.acceleration;
        if (this.controls.reverse) this.speed -= this.acceleration;
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if (this.speed < -this.maxSpeed / 1.7) this.speed = -this.maxSpeed / 1.7;
        if (this.speed > 0) this.speed -= this.friction;
        if (this.speed < 0) this.speed += this.friction;
        if (Math.abs(this.speed) < this.friction) this.speed = 0;
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }
    leftRightControlls() {
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) this.angle += 0.03 * flip;
            if (this.controls.right) this.angle -= 0.03 * flip;
        }
    }
    assesDamage(roadBorders, traffic) {
        for(let i = 0; i < roadBorders.length; i++){
            if ((0, _polyIntersect.polyInstersect)(this.polygon, roadBorders[i])) return true;
        }
        for(let i = 0; i < traffic.length; i++){
            if ((0, _polyIntersect.polyInstersect)(this.polygon, traffic[i].polygon)) return true;
        }
        return false;
    }
    update(roadBorders, traffic) {
        if (!this.damaged) {
            this.upDownControlls();
            this.leftRightControlls();
            this.polygon = this.createPolygon();
            this.damaged = this.assesDamage(roadBorders, traffic);
        }
        if (this.sensor) {
            this.sensor.update(this.x, this.y, this.angle, roadBorders, traffic);
            const offsets = this.sensor.readings.map((reading)=>{
                return reading == null ? 0 : 1 - reading.offset;
            });
            const outputs = (0, _index.NeuralNetwork).feedForward(offsets, this.brain);
            if (this.useBrain) {
                this.controls.forward = Boolean(outputs[0]);
                this.controls.left = Boolean(outputs[1]);
                this.controls.right = Boolean(outputs[2]);
                this.controls.reverse = Boolean(outputs[3]);
            }
            if (this.y < (0, _entitiesDimmensions.END_OF_MAP_TOP)) {
                this.isDone = true;
                this.displayMessageAtTheTopOfTheScreen("OUT OF MAP", (0, _commonTypes.Logger).Warn);
            }
        }
    }
    createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });
        return points;
    }
    normalizeDistance() {
        const minValue = 1000;
        const maxValue = -10000;
        const clampedDistance = Math.max(this.y, maxValue);
        const normalizedValue = 1 - (clampedDistance - maxValue) / (minValue - maxValue);
        return normalizedValue;
    }
    evaluateTrafficScore(trafficPosY) {
        const TRAFFIC_COUNT = 50; //for now
        let sum = 0;
        if (this.snapshotOfTraffic.length == 0) {
            for(let i = 0; i < TRAFFIC_COUNT; i++)if (this.y < trafficPosY[i]) sum += 1;
            return sum / TRAFFIC_COUNT;
        } else {
            for(let i = 0; i < TRAFFIC_COUNT; i++)if (this.y < this.snapshotOfTraffic[i]) sum += 1;
            return sum / TRAFFIC_COUNT;
        }
    }
    calculateFitness(trafficPosY) {
        if (this.carType !== (0, _carTypes.VehicleType).AI) return;
        const FRAMES_PER_SEC = 144;
        let expectedTime = Math.abs((0, _entitiesDimmensions.END_OF_MAP_TOP)) / (FRAMES_PER_SEC * this.maxSpeed);
        if (this.damaged) expectedTime = Math.abs((0, _entitiesDimmensions.END_OF_MAP_TOP)) / (FRAMES_PER_SEC * this.maxSpeed) * this.normalizeDistance();
        const finishTime = Date.now() - this.createdAt;
        const normalizedFinishTimeFitnessValue = expectedTime / (finishTime / 1000);
        const maxValue = 300;
        const minValue = 0;
        let bestDistanceFromCenter = 0;
        for(let i = 0; i < this.laneCount; i++){
            const distanceFromLaneCenter = Math.abs(this.x - this.getLaneCenter(i));
            const normalizedValue = (maxValue - distanceFromLaneCenter) / (maxValue - minValue);
            bestDistanceFromCenter = Math.max(bestDistanceFromCenter, normalizedValue);
        }
        const weightForTime = 5;
        const weightForObstaclesCrossed = 50;
        const maxFitness = 1;
        const trafficScore = this.evaluateTrafficScore(trafficPosY);
        const fitness = (normalizedFinishTimeFitnessValue * weightForTime + trafficScore * weightForObstaclesCrossed + this.normalizeDistance() + bestDistanceFromCenter + this.speed / this.maxSpeed) / (maxFitness * 58);
        return Math.max(fitness, 0);
    }
    draw(ctx, color, drawSensor = false) {
        ctx.beginPath();
        if (this.damaged) ctx.fillStyle = (0, _colors.RED);
        else ctx.fillStyle = color;
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i = 1; i < this.polygon.length; i++)ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        ctx.fill();
        if (this.sensor && drawSensor) this.sensor.draw(ctx);
    }
}

},{"../../types/CarTypes":"7CgJ2","../../helpers/InputController":"17t1F","../Sensor":"82QdO","../../utility/polyIntersect":"ku4Tq","../../constants/DefaultValues/colors":"f3k95","../../network/index":"cn8q1","../Common":"3kiHY","../../types/CommonTypes":"7mK6X","../../constants/DefaultValues/EntitiesDimmensions":"l716V","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7CgJ2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "VehicleType", ()=>VehicleType);
parcelHelpers.export(exports, "VehicleSprite", ()=>VehicleSprite);
parcelHelpers.export(exports, "VehicleSpeed", ()=>VehicleSpeed);
var VehicleType;
(function(VehicleType) {
    VehicleType["AI"] = "AI";
    VehicleType["NPC"] = "NPC";
    VehicleType["PLAYER"] = "PLAYER";
})(VehicleType || (VehicleType = {}));
var VehicleSprite;
(function(VehicleSprite) {
    VehicleSprite["NORMAL"] = "NORMAL";
    VehicleSprite["TRUCK"] = "TRUCK";
    VehicleSprite["MOTOR"] = "MOTOR";
})(VehicleSprite || (VehicleSprite = {}));
var VehicleSpeed;
(function(VehicleSpeed) {
    VehicleSpeed[VehicleSpeed["SLOW"] = 2] = "SLOW";
    VehicleSpeed[VehicleSpeed["AVERAGE"] = 3] = "AVERAGE";
    VehicleSpeed[VehicleSpeed["FAST"] = 4] = "FAST";
    VehicleSpeed[VehicleSpeed["ULTRA_FAST"] = 5] = "ULTRA_FAST";
})(VehicleSpeed || (VehicleSpeed = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"17t1F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InputController", ()=>InputController);
var _controllEnums = require("../constants/controllEnums");
var _carTypes = require("../types/CarTypes");
class InputController {
    constructor(carType){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        switch(carType){
            case (0, _carTypes.VehicleType).NPC:
                this.forward = true;
                break;
            case (0, _carTypes.VehicleType).PLAYER:
                this.addKeyBoardListeners();
                break;
            default:
                this.addKeyBoardListeners();
        }
    }
    addKeyBoardListeners() {
        window.addEventListener("keydown", (e)=>{
            switch(e.key){
                case (0, _controllEnums.CarControls).LEFT:
                    this.left = true;
                    break;
                case (0, _controllEnums.CarControls).RIGHT:
                    this.right = true;
                    break;
                case (0, _controllEnums.CarControls).BACK:
                    this.reverse = true;
                    break;
                case (0, _controllEnums.CarControls).FORWARD:
                    this.forward = true;
                    break;
            }
            window.addEventListener("keyup", (e)=>{
                switch(e.key){
                    case (0, _controllEnums.CarControls).LEFT:
                        this.left = false;
                        break;
                    case (0, _controllEnums.CarControls).RIGHT:
                        this.right = false;
                        break;
                    case (0, _controllEnums.CarControls).BACK:
                        this.reverse = false;
                        break;
                    case (0, _controllEnums.CarControls).FORWARD:
                        this.forward = false;
                        break;
                }
            });
        });
    }
}

},{"../constants/controllEnums":"JRXDi","../types/CarTypes":"7CgJ2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"JRXDi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CarControls", ()=>CarControls);
var CarControls;
(function(CarControls) {
    CarControls["LEFT"] = "ArrowLeft";
    CarControls["RIGHT"] = "ArrowRight";
    CarControls["FORWARD"] = "ArrowUp";
    CarControls["BACK"] = "ArrowDown";
})(CarControls || (CarControls = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"82QdO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sensor", ()=>Sensor);
var _lerp = require("../math/lerp");
var _colors = require("../constants/DefaultValues/colors");
var _intersections = require("../math/intersections");
const DEFAULT_RAY_COUNT = 15;
class Sensor {
    constructor(rayCount = DEFAULT_RAY_COUNT){
        this.rayCount = rayCount;
        this.rayLength = 280;
        this.raySpread = Math.PI / 1.5;
        this.rays = [];
        this.readings = [];
    }
    castRays(x, y, angle) {
        this.rays = [];
        for(let i = 0; i < this.rayCount; i++){
            const rayAngle = (0, _lerp.lerp)(this.raySpread / 2, -this.raySpread / 2, this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)) + angle;
            const start = {
                x,
                y
            };
            const end = {
                x: x - Math.sin(rayAngle) * this.rayLength,
                y: y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([
                start,
                end
            ]);
        }
    }
    update(x, y, angle, roadBorders, traffic) {
        this.castRays(x, y, angle);
        this.readings = [];
        for(let i = 0; i < this.rays.length; i++)this.readings.push(this.getReading(this.rays[i], roadBorders, traffic));
    }
    getReading(ray, roadBorders, traffic) {
        let touches = [];
        for(let i = 0; i < roadBorders.length; i++){
            const touch = (0, _intersections.getIntersection)(ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]);
            if (touch) touches.push(touch);
        }
        for(let i = 0; i < traffic.length; i++){
            const poly = traffic[i].polygon;
            for(let j = 0; j < poly.length; j++){
                const value = (0, _intersections.getIntersection)(ray[0], ray[1], poly[j], poly[(j + 1) % poly.length]);
                if (value) touches.push(value);
            }
        }
        if (touches.length === 0) return null;
        else {
            const offsets = touches.map((e)=>e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find((e)=>e.offset == minOffset);
        }
    }
    draw(ctx) {
        for(let i = 0; i < this.rayCount; i++){
            let end = this.rays[i][1];
            if (this.readings[i]) end = this.readings[i];
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = (0, _colors.YELLOW);
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = (0, _colors.BLACK);
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}

},{"../math/lerp":"gblfB","../constants/DefaultValues/colors":"f3k95","../math/intersections":"8m8CD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gblfB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lerp", ()=>lerp);
const lerp = (A, B, t)=>{
    return A + (B - A) * t;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f3k95":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WHITE", ()=>WHITE);
parcelHelpers.export(exports, "YELLOW", ()=>YELLOW);
parcelHelpers.export(exports, "BLACK", ()=>BLACK);
parcelHelpers.export(exports, "RED", ()=>RED);
parcelHelpers.export(exports, "BLUE", ()=>BLUE);
const WHITE = "white";
const YELLOW = "yellow";
const BLACK = "#000";
const RED = "#FF0000";
const BLUE = "#0000ff";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8m8CD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getIntersection", ()=>getIntersection);
var _lerp = require("./lerp");
const getIntersection = (A, B, C, D)=>{
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return {
            x: (0, _lerp.lerp)(A.x, B.x, t),
            y: (0, _lerp.lerp)(A.y, B.y, t),
            offset: t
        };
    }
    return null;
};

},{"./lerp":"gblfB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ku4Tq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "polyInstersect", ()=>polyInstersect);
var _intersections = require("../math/intersections");
const polyInstersect = (poly1, poly2)=>{
    for(let i = 0; i < poly1.length; i++)for(let j = 0; j < poly2.length; j++){
        const touch = (0, _intersections.getIntersection)(poly1[i], poly1[(i + 1) % poly1.length], poly2[j], poly2[(j + 1) % poly2.length]);
        if (touch) return true;
    }
    return false;
};

},{"../math/intersections":"8m8CD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cn8q1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NeuralNetwork", ()=>NeuralNetwork);
var _level = require("./level");
var _lerp = require("../math/lerp");
class NeuralNetwork {
    constructor(neuronCounts){
        this.levels = [];
        for(let i = 0; i < neuronCounts.length - 1; i++)this.levels.push(new (0, _level.Level)(neuronCounts[i], neuronCounts[i + 1]));
        this.fitness = 0;
    }
    static feedForward(givenInputs, network) {
        let outputs = (0, _level.Level).feedForward(givenInputs, network.levels[0]);
        for(let i = 1; i < network.levels.length; i++)outputs = (0, _level.Level).feedForward(outputs, network.levels[i]);
        return outputs;
    }
    static mutate(network, amount = 1) {
        network.levels.forEach((level)=>{
            for(let i = 0; i < level.biases.length; i++)level.biases[i] = (0, _lerp.lerp)(level.biases[i], Math.random() * 2 - 1, amount);
            for(let i = 0; i < level.weights.length; i++)for(let j = 0; j < level.weights[i].length; j++)level.weights[i][j] = (0, _lerp.lerp)(level.weights[i][j], Math.random() * 2 - 1, amount);
        });
    }
    clone() {
        const clonedNetwork = new NeuralNetwork([]);
        clonedNetwork.levels = this.levels.map((level)=>level.clone());
        clonedNetwork.fitness = this.fitness;
        return clonedNetwork;
    }
}

},{"./level":"4NTAB","../math/lerp":"gblfB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4NTAB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Level", ()=>Level);
class Level {
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weights = [];
        for(let i = 0; i < inputCount; i++)this.weights[i] = new Array(outputCount);
        Level.randomize(this);
    }
    static randomize(level) {
        for(let i = 0; i < level.inputs.length; i++)for(let j = 0; j < level.outputs.length; j++)level.weights[i][j] = Math.random() * 2 - 1;
        for(let i = 0; i < level.biases.length; i++)level.biases[i] = Math.random() * 2 - 1;
    }
    static feedForward(givenInputs, level) {
        level.inputs = [
            ...givenInputs
        ];
        for(let i = 0; i < level.outputs.length; i++){
            let sum = 0;
            for(let j = 0; j < level.inputs.length; j++)sum += level.inputs[j] * level.weights[j][i];
            if (sum > level.biases[i]) level.outputs[i] = 1;
            else level.outputs[i] = 0;
        }
        return level.outputs;
    }
    clone() {
        return JSON.parse(JSON.stringify(this));
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3kiHY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Common", ()=>Common);
var _classNames = require("../constants/classNames");
var _commonTypes = require("../types/CommonTypes");
class Common {
    constructor(...elementId){
        if (elementId && elementId[0]) this.elementId = this.bindElementById(elementId[0]);
        else this.elementId = undefined;
    }
    bindElementById(elementToFindById) {
        const element = document.getElementById(elementToFindById);
        if (!element) throw new Error(`Nie znaleziono elementu ${elementToFindById}`);
        return element;
    }
    bindElementByClass(elementToFindByClass) {
        const element = document.documentElement.querySelector("." + elementToFindByClass);
        if (!element) throw new Error(`Nie znaleziono elementu ${elementToFindByClass}`);
        return element;
    }
    changeVisbilityOfGivenElement(element, flag) {
        flag ? element === null || element === void 0 || element.classList.remove((0, _classNames.HIDDEN)) : element === null || element === void 0 || element.classList.add((0, _classNames.HIDDEN));
    }
    bindMultipleElements(elementsTobBind) {
        const elements = document.querySelectorAll("." + elementsTobBind);
        if (!elements) throw new Error(`Nie znaleziono elementu ${elementsTobBind}`);
        return elements;
    }
    displayMessageAtTheTopOfTheScreen(message, status) {
        if (status > 2 || status < 0) throw new Error("Nieprawidłowy status wiadomości, wprowadź wartości z enuma Errors");
        const messageNode = this.bindElementByClass("MESSAGE");
        this.changeVisbilityOfGivenElement(messageNode, true);
        switch(status){
            case (0, _commonTypes.Logger).Error:
                messageNode.style.color = "red";
                break;
            case (0, _commonTypes.Logger).Message:
                messageNode.style.color = "green";
                break;
            case (0, _commonTypes.Logger).Warn:
                messageNode.style.color = "orange";
                break;
        }
        this.changeVisbilityOfGivenElement(messageNode, true);
        setTimeout(()=>{
            this.changeVisbilityOfGivenElement(messageNode, false);
        }, 1500);
        messageNode.textContent = message;
    }
}

},{"../constants/classNames":"jfrLV","../types/CommonTypes":"7mK6X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jfrLV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HIDDEN", ()=>HIDDEN);
parcelHelpers.export(exports, "CAR_CANVAS_ID", ()=>CAR_CANVAS_ID);
parcelHelpers.export(exports, "NEURAL_NETWORK_CANVAS_ID", ()=>NEURAL_NETWORK_CANVAS_ID);
parcelHelpers.export(exports, "BEST_CAR_LOCAL", ()=>BEST_CAR_LOCAL);
const HIDDEN = "hidden";
const CAR_CANVAS_ID = "carCanvas";
const NEURAL_NETWORK_CANVAS_ID = "neuralNetworkCanvas";
const BEST_CAR_LOCAL = "bestCarBrain";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7mK6X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Logger", ()=>Logger);
var Logger;
(function(Logger) {
    Logger[Logger["Message"] = 0] = "Message";
    Logger[Logger["Warn"] = 1] = "Warn";
    Logger[Logger["Error"] = 2] = "Error";
})(Logger || (Logger = {}));

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2DTSZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Road", ()=>Road);
var _entitiesDimmensions = require("../../constants/DefaultValues/EntitiesDimmensions");
var _colors = require("../../constants/DefaultValues/colors");
var _lerp = require("../../math/lerp");
class Road {
    constructor(x, width, laneCount = (0, _entitiesDimmensions.DEFAULT_LANE_COUNT)){
        this.left = x - width / 2;
        this.right = x + width / 2;
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.top = -(0, _entitiesDimmensions.infinity);
        this.bottom = (0, _entitiesDimmensions.infinity);
        const topLeft = {
            x: this.left,
            y: this.top
        };
        const topRight = {
            x: this.right,
            y: this.top
        };
        const bottomLeft = {
            x: this.left,
            y: this.bottom
        };
        const bottomRight = {
            x: this.right,
            y: this.bottom
        };
        this.borders = [
            [
                topLeft,
                bottomLeft
            ],
            [
                topRight,
                bottomRight
            ]
        ];
    }
    drawLine(x, dashed = false, ctx) {
        ctx.setLineDash(dashed ? [
            20,
            20
        ] : []);
        ctx.beginPath();
        ctx.moveTo(x, this.top);
        ctx.lineTo(x, this.bottom);
        ctx.stroke();
    }
    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth;
    }
    draw(ctx) {
        if (!ctx) return;
        ctx.lineWidth = (0, _entitiesDimmensions.DEFAULT_LINE_WIDTH);
        ctx.strokeStyle = (0, _colors.WHITE);
        for(let i = 1; i <= this.laneCount - 1; i++){
            const x = (0, _lerp.lerp)(this.left, this.right, i / this.laneCount);
            this.drawLine(x, true, ctx);
        }
        ctx.setLineDash([]);
        this.borders.forEach((border)=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}

},{"../../constants/DefaultValues/EntitiesDimmensions":"l716V","../../constants/DefaultValues/colors":"f3k95","../../math/lerp":"gblfB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7cvHn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getRandomValueBetweenNums", ()=>getRandomValueBetweenNums);
const getRandomValueBetweenNums = (num1, num2)=>{
    return Math.floor(Math.random() * (num2 - num1)) + num1;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bqr25":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "GeneticAlgorithm", ()=>GeneticAlgorithm);
var _index = require("./index");
var _neuralNetworkConsts = require("../constants/DefaultValues/neuralNetworkConsts");
function getMutationAmount(currentGeneration, initialMutationAmount, decayRate, bestFitness) {
    const mutationAmount = initialMutationAmount / (1 + decayRate * currentGeneration) / (1 + bestFitness);
    const minMutationAmount = 0.01;
    return Math.max(mutationAmount, minMutationAmount);
}
class GeneticAlgorithm {
    static trainNeuralNetworks(cars, population, traffic) {
        for(let i = 0; i < cars.length; i++){
            const fitness = cars[i].calculateFitness(traffic);
            cars[i].brain.fitness = fitness || 0;
            population[i] = cars[i].brain;
        }
    }
    static evolvePopulation(population, rayCount, generation, bestFit) {
        const newGeneration = [];
        const selectedNets = GeneticAlgorithm.selection(population);
        while(newGeneration.length < population.length){
            const parent1 = GeneticAlgorithm.getRandomElement(selectedNets);
            const parent2 = GeneticAlgorithm.getRandomElement(selectedNets);
            const offspring = GeneticAlgorithm.crossover(parent1, parent2, rayCount);
            newGeneration.push(offspring);
        }
        const mutation_amount = getMutationAmount(generation, (0, _neuralNetworkConsts.DEFAULT_MUTATION_AMOUNT), 0.016, bestFit);
        console.log("MUTATION AMOUNT:", mutation_amount);
        GeneticAlgorithm.mutate(newGeneration, mutation_amount);
        return newGeneration;
    }
    static selection(population) {
        const sortedPopulation = population.sort((a, b)=>b.fitness - a.fitness);
        // Choose the top 10% neural networks as selectedNets
        const selectedNets = sortedPopulation.slice(0, Math.ceil(sortedPopulation.length / 10));
        console.log(selectedNets);
        return selectedNets;
    }
    static crossover(parent1, parent2, raycount) {
        // Perform single-point crossover
        const child = new (0, _index.NeuralNetwork)([
            raycount,
            7,
            4
        ]);
        const crossoverPoint = Math.floor(Math.random() * parent1.levels.length);
        for(let i = 0; i < parent1.levels.length; i++)if (i < crossoverPoint) {
            child.levels[i] = JSON.parse(JSON.stringify(parent1.levels[i]));
            child.fitness = parent1.fitness;
        } else {
            child.levels[i] = JSON.parse(JSON.stringify(parent2.levels[i]));
            child.fitness = parent2.fitness;
        }
        return child;
    }
    static mutate(population, mutation) {
        for (const neuralNetwork of population)(0, _index.NeuralNetwork).mutate(neuralNetwork, mutation);
    }
    static getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}

},{"./index":"cn8q1","../constants/DefaultValues/neuralNetworkConsts":"2yrzt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2yrzt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_MUTATION_AMOUNT", ()=>DEFAULT_MUTATION_AMOUNT);
parcelHelpers.export(exports, "RANDOM_MUTATION", ()=>RANDOM_MUTATION);
const DEFAULT_MUTATION_AMOUNT = 0.4;
const RANDOM_MUTATION = (Math.random() * 2 - 1) / 2;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"38RLM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TRAFFIC_MOCK_DATA", ()=>TRAFFIC_MOCK_DATA);
const TRAFFIC_MOCK_DATA = (road)=>[
        {
            x: road.getLaneCenter(0),
            y: -300
        },
        {
            x: road.getLaneCenter(2),
            y: -480
        },
        {
            x: road.getLaneCenter(1),
            y: -660
        },
        {
            x: road.getLaneCenter(2),
            y: -840
        },
        {
            x: road.getLaneCenter(1),
            y: -1020
        },
        {
            x: road.getLaneCenter(2),
            y: -1200
        },
        {
            x: road.getLaneCenter(0),
            y: -1380
        },
        {
            x: road.getLaneCenter(2),
            y: -1560
        },
        {
            x: road.getLaneCenter(1),
            y: -1740
        },
        {
            x: road.getLaneCenter(0),
            y: -1920
        },
        {
            x: road.getLaneCenter(1),
            y: -2100
        },
        {
            x: road.getLaneCenter(2),
            y: -2280
        },
        {
            x: road.getLaneCenter(0),
            y: -2460
        },
        {
            x: road.getLaneCenter(1),
            y: -2640
        },
        {
            x: road.getLaneCenter(2),
            y: -2820
        },
        {
            x: road.getLaneCenter(1),
            y: -3000
        },
        {
            x: road.getLaneCenter(0),
            y: -3180
        },
        {
            x: road.getLaneCenter(1),
            y: -3360
        },
        {
            x: road.getLaneCenter(2),
            y: -3540
        },
        {
            x: road.getLaneCenter(0),
            y: -3720
        },
        {
            x: road.getLaneCenter(2),
            y: -3900
        },
        {
            x: road.getLaneCenter(1),
            y: -4080
        },
        {
            x: road.getLaneCenter(0),
            y: -4260
        },
        {
            x: road.getLaneCenter(1),
            y: -4440
        },
        {
            x: road.getLaneCenter(2),
            y: -4620
        },
        {
            x: road.getLaneCenter(1),
            y: -4800
        },
        {
            x: road.getLaneCenter(0),
            y: -4980
        },
        {
            x: road.getLaneCenter(2),
            y: -5160
        },
        {
            x: road.getLaneCenter(1),
            y: -5340
        },
        {
            x: road.getLaneCenter(0),
            y: -5520
        },
        {
            x: road.getLaneCenter(2),
            y: -5700
        },
        {
            x: road.getLaneCenter(1),
            y: -5880
        },
        {
            x: road.getLaneCenter(0),
            y: -6060
        },
        {
            x: road.getLaneCenter(1),
            y: -6240
        },
        {
            x: road.getLaneCenter(2),
            y: -6420
        },
        {
            x: road.getLaneCenter(0),
            y: -6600
        },
        {
            x: road.getLaneCenter(2),
            y: -6780
        },
        {
            x: road.getLaneCenter(1),
            y: -6960
        },
        {
            x: road.getLaneCenter(0),
            y: -7140
        },
        {
            x: road.getLaneCenter(1),
            y: -7320
        },
        {
            x: road.getLaneCenter(2),
            y: -7500
        },
        {
            x: road.getLaneCenter(0),
            y: -7680
        },
        {
            x: road.getLaneCenter(1),
            y: -7860
        },
        {
            x: road.getLaneCenter(2),
            y: -8040
        },
        {
            x: road.getLaneCenter(1),
            y: -8220
        },
        {
            x: road.getLaneCenter(0),
            y: -8400
        },
        {
            x: road.getLaneCenter(2),
            y: -8580
        },
        {
            x: road.getLaneCenter(1),
            y: -8760
        },
        {
            x: road.getLaneCenter(0),
            y: -8940
        },
        {
            x: road.getLaneCenter(1),
            y: -9120
        }
    ];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["5evvV","7elyk"], "7elyk", "parcelRequire0799")

//# sourceMappingURL=index.1f978438.js.map
