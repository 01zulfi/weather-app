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

const getWeatherData = async (cityName) => {
  const [metricUnitsPromise, imperialUnitsPromise] = await Promise.all([
    fetch(getAPILink(cityName, "metric")),
    fetch(getAPILink(cityName, "imperial")),
  ]);
  const dataInMetricUnits = await metricUnitsPromise.json();
  const dataInImperialUnits = await imperialUnitsPromise.json();
  console.log(dataInMetricUnits, dataInImperialUnits);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWM7QUFDbEI7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJ6QjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZROztBQUU5QjtBQUNBLHNFQUFzRSxTQUFTLFNBQVMsTUFBTTtBQUM5RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx5REFBZ0I7QUFDcEIsR0FBRztBQUNIOztBQUVBLGlFQUFlLGlCQUFpQixFQUFDOzs7Ozs7O1VDdkJqQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNnQjs7QUFFdEQsNERBQWlCO0FBQ2pCLG9FQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvUHVic3ViLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvV2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHVic3ViIGZyb20gXCIuL1B1YnN1YlwiO1xuXG5jb25zdCBmb3JtRnVuY3Rpb24gPSAoKSA9PiB7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgY2l0eU5hbWUgPSBmb3JtLmNpdHlOYW1lSW5wdXQ7XG4gICAgcHVic3ViLnB1Ymxpc2goXCJnZXRDaXR5TmFtZVwiLCBjaXR5TmFtZS52YWx1ZSk7XG4gICAgZm9ybS5yZXNldCgpO1xuICB9KTtcbn07XG5cbmNvbnN0IGRvbU1vZHVsZSA9IHtcbiAgZXhlY3V0ZTogKCkgPT4ge1xuICAgIGZvcm1GdW5jdGlvbigpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tTW9kdWxlO1xuIiwiY29uc3QgcHVic3ViID0ge1xuICBldmVudHM6IHt9LFxuICBwdWJsaXNoOiAoZXZlbnROYW1lLCBkYXRhKSA9PiB7XG4gICAgaWYgKHB1YnN1Yi5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgcHVic3ViLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhkYXRhKSk7XG4gICAgfVxuICB9LFxuICBzdWJzY3JpYmU6IChldmVudE5hbWUsIGNhbGxiYWNrKSA9PiB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHB1YnN1Yi5ldmVudHNbZXZlbnROYW1lXSkpIHtcbiAgICAgIHB1YnN1Yi5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICBwdWJzdWIuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwdWJzdWI7XG4iLCJpbXBvcnQgcHVic3ViIGZyb20gXCIuL1B1YnN1YlwiO1xuXG5jb25zdCBnZXRBUElMaW5rID0gKGNpdHlOYW1lLCB1bml0cykgPT4ge1xuICBjb25zdCBBUElMaW5rID0gYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlOYW1lfSZ1bml0cz0ke3VuaXRzfSZBUFBJRD00NDliMDUzNzExNTQwMTZlNDIyNWZlMWY4ODVhNjM0ZWA7XG4gIHJldHVybiBBUElMaW5rO1xufTtcblxuY29uc3QgZ2V0V2VhdGhlckRhdGEgPSBhc3luYyAoY2l0eU5hbWUpID0+IHtcbiAgY29uc3QgW21ldHJpY1VuaXRzUHJvbWlzZSwgaW1wZXJpYWxVbml0c1Byb21pc2VdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGZldGNoKGdldEFQSUxpbmsoY2l0eU5hbWUsIFwibWV0cmljXCIpKSxcbiAgICBmZXRjaChnZXRBUElMaW5rKGNpdHlOYW1lLCBcImltcGVyaWFsXCIpKSxcbiAgXSk7XG4gIGNvbnN0IGRhdGFJbk1ldHJpY1VuaXRzID0gYXdhaXQgbWV0cmljVW5pdHNQcm9taXNlLmpzb24oKTtcbiAgY29uc3QgZGF0YUluSW1wZXJpYWxVbml0cyA9IGF3YWl0IGltcGVyaWFsVW5pdHNQcm9taXNlLmpzb24oKTtcbiAgY29uc29sZS5sb2coZGF0YUluTWV0cmljVW5pdHMsIGRhdGFJbkltcGVyaWFsVW5pdHMpO1xufTtcblxuY29uc3Qgd2VhdGhlckRhdGFNb2R1bGUgPSB7XG4gIGV4ZWN1dGU6ICgpID0+IHtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKFwiZ2V0Q2l0eU5hbWVcIiwgZ2V0V2VhdGhlckRhdGEpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlckRhdGFNb2R1bGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb21Nb2R1bGUgZnJvbSBcIi4vbW9kdWxlcy9ET01cIjtcbmltcG9ydCB3ZWF0aGVyRGF0YU1vZHVsZSBmcm9tIFwiLi9tb2R1bGVzL1dlYXRoZXJEYXRhXCI7XG5cbmRvbU1vZHVsZS5leGVjdXRlKCk7XG53ZWF0aGVyRGF0YU1vZHVsZS5leGVjdXRlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=