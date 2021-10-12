/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pubsub */ "./src/modules/Pubsub.js");


const formFunction = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = form.cityNameInput;
    _Pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].publish("getCityName", cityName.value);
    form.reset();
  });
};

const domModule = {
  execute: () => {
    formFunction();
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domModule);


/***/ }),

/***/ "./src/modules/Pubsub.js":
/*!*******************************!*\
  !*** ./src/modules/Pubsub.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const pubsub = {
  events: {},
  publish: (eventName, data) => {
    if (pubsub.events[eventName]) {
      pubsub.events[eventName].forEach((callback) => callback(data));
    }
  },
  subscribe: (eventName, callback) => {
    if (!Array.isArray(pubsub.events[eventName])) {
      pubsub.events[eventName] = [];
    }
    pubsub.events[eventName].push(callback);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pubsub);


/***/ }),

/***/ "./src/modules/WeatherData.js":
/*!************************************!*\
  !*** ./src/modules/WeatherData.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pubsub */ "./src/modules/Pubsub.js");


const getAPILink = (cityName, units) => {
  const APILink = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&APPID=449b05371154016e4225fe1f885a634e`;
  return APILink;
};

const extractRequiredData = (metric, imperial) => ({ ...metric, ...imperial });

const getWeatherData = async (cityName) => {
  const [metricUnitsPromise, imperialUnitsPromise] = await Promise.all([
    fetch(getAPILink(cityName, "metric")),
    fetch(getAPILink(cityName, "imperial")),
  ]);
  const dataInMetricUnits = await metricUnitsPromise.json();
  const dataInImperialUnits = await imperialUnitsPromise.json();
  console.log(dataInMetricUnits, dataInImperialUnits);
  extractRequiredData(dataInMetricUnits, dataInImperialUnits);
};

const weatherDataModule = {
  execute: () => {
    _Pubsub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe("getCityName", getWeatherData);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherDataModule);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DOM */ "./src/modules/DOM.js");
/* harmony import */ var _modules_WeatherData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/WeatherData */ "./src/modules/WeatherData.js");



_modules_DOM__WEBPACK_IMPORTED_MODULE_0__["default"].execute();
_modules_WeatherData__WEBPACK_IMPORTED_MODULE_1__["default"].execute();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWM7QUFDbEI7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJ6QjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZROztBQUU5QjtBQUNBLHNFQUFzRSxTQUFTLFNBQVMsTUFBTTtBQUM5RjtBQUNBOztBQUVBLHFEQUFxRCx3QkFBd0I7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHlEQUFnQjtBQUNwQixHQUFHO0FBQ0g7O0FBRUEsaUVBQWUsaUJBQWlCLEVBQUM7Ozs7Ozs7VUMxQmpDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ2dCOztBQUV0RCw0REFBaUI7QUFDakIsb0VBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9QdWJzdWIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9XZWF0aGVyRGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJzdWIgZnJvbSBcIi4vUHVic3ViXCI7XG5cbmNvbnN0IGZvcm1GdW5jdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBjaXR5TmFtZSA9IGZvcm0uY2l0eU5hbWVJbnB1dDtcbiAgICBwdWJzdWIucHVibGlzaChcImdldENpdHlOYW1lXCIsIGNpdHlOYW1lLnZhbHVlKTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gIH0pO1xufTtcblxuY29uc3QgZG9tTW9kdWxlID0ge1xuICBleGVjdXRlOiAoKSA9PiB7XG4gICAgZm9ybUZ1bmN0aW9uKCk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb21Nb2R1bGU7XG4iLCJjb25zdCBwdWJzdWIgPSB7XG4gIGV2ZW50czoge30sXG4gIHB1Ymxpc2g6IChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICBpZiAocHVic3ViLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICBwdWJzdWIuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGRhdGEpKTtcbiAgICB9XG4gIH0sXG4gIHN1YnNjcmliZTogKGV2ZW50TmFtZSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHVic3ViLmV2ZW50c1tldmVudE5hbWVdKSkge1xuICAgICAgcHVic3ViLmV2ZW50c1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIHB1YnN1Yi5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcbiIsImltcG9ydCBwdWJzdWIgZnJvbSBcIi4vUHVic3ViXCI7XG5cbmNvbnN0IGdldEFQSUxpbmsgPSAoY2l0eU5hbWUsIHVuaXRzKSA9PiB7XG4gIGNvbnN0IEFQSUxpbmsgPSBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eU5hbWV9JnVuaXRzPSR7dW5pdHN9JkFQUElEPTQ0OWIwNTM3MTE1NDAxNmU0MjI1ZmUxZjg4NWE2MzRlYDtcbiAgcmV0dXJuIEFQSUxpbms7XG59O1xuXG5jb25zdCBleHRyYWN0UmVxdWlyZWREYXRhID0gKG1ldHJpYywgaW1wZXJpYWwpID0+ICh7IC4uLm1ldHJpYywgLi4uaW1wZXJpYWwgfSk7XG5cbmNvbnN0IGdldFdlYXRoZXJEYXRhID0gYXN5bmMgKGNpdHlOYW1lKSA9PiB7XG4gIGNvbnN0IFttZXRyaWNVbml0c1Byb21pc2UsIGltcGVyaWFsVW5pdHNQcm9taXNlXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBmZXRjaChnZXRBUElMaW5rKGNpdHlOYW1lLCBcIm1ldHJpY1wiKSksXG4gICAgZmV0Y2goZ2V0QVBJTGluayhjaXR5TmFtZSwgXCJpbXBlcmlhbFwiKSksXG4gIF0pO1xuICBjb25zdCBkYXRhSW5NZXRyaWNVbml0cyA9IGF3YWl0IG1ldHJpY1VuaXRzUHJvbWlzZS5qc29uKCk7XG4gIGNvbnN0IGRhdGFJbkltcGVyaWFsVW5pdHMgPSBhd2FpdCBpbXBlcmlhbFVuaXRzUHJvbWlzZS5qc29uKCk7XG4gIGNvbnNvbGUubG9nKGRhdGFJbk1ldHJpY1VuaXRzLCBkYXRhSW5JbXBlcmlhbFVuaXRzKTtcbiAgZXh0cmFjdFJlcXVpcmVkRGF0YShkYXRhSW5NZXRyaWNVbml0cywgZGF0YUluSW1wZXJpYWxVbml0cyk7XG59O1xuXG5jb25zdCB3ZWF0aGVyRGF0YU1vZHVsZSA9IHtcbiAgZXhlY3V0ZTogKCkgPT4ge1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoXCJnZXRDaXR5TmFtZVwiLCBnZXRXZWF0aGVyRGF0YSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVyRGF0YU1vZHVsZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbU1vZHVsZSBmcm9tIFwiLi9tb2R1bGVzL0RPTVwiO1xuaW1wb3J0IHdlYXRoZXJEYXRhTW9kdWxlIGZyb20gXCIuL21vZHVsZXMvV2VhdGhlckRhdGFcIjtcblxuZG9tTW9kdWxlLmV4ZWN1dGUoKTtcbndlYXRoZXJEYXRhTW9kdWxlLmV4ZWN1dGUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==