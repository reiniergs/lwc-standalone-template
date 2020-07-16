/* proxy-compat-disable */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect() {
  // Don't apply polyfill when ProxyCompat is enabled.
  if ('getKey' in Proxy) {
    return false;
  }

  const proxy = new Proxy([3, 4], {});
  const res = [1, 2].concat(proxy);
  return res.length !== 4;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const {
  isConcatSpreadable
} = Symbol;
const {
  isArray
} = Array;
const {
  slice: ArraySlice,
  unshift: ArrayUnshift,
  shift: ArrayShift
} = Array.prototype;

function isObject(O) {
  return typeof O === 'object' ? O !== null : typeof O === 'function';
} // https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable


function isSpreadable(O) {
  if (!isObject(O)) {
    return false;
  }

  const spreadable = O[isConcatSpreadable];
  return spreadable !== undefined ? Boolean(spreadable) : isArray(O);
} // https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat


function ArrayConcatPolyfill(..._args) {
  const O = Object(this);
  const A = [];
  let N = 0;
  const items = ArraySlice.call(arguments);
  ArrayUnshift.call(items, O);

  while (items.length) {
    const E = ArrayShift.call(items);

    if (isSpreadable(E)) {
      let k = 0;
      const length = E.length;

      for (k; k < length; k += 1, N += 1) {
        if (k in E) {
          const subElement = E[k];
          A[N] = subElement;
        }
      }
    } else {
      A[N] = E;
      N += 1;
    }
  }

  return A;
}

function apply() {
  // eslint-disable-next-line no-extend-native
  Array.prototype.concat = ArrayConcatPolyfill;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


if (detect()) {
  apply();
}
/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function invariant(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}

function isTrue(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function isFalse(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function fail(msg) {
  throw new Error(msg);
}

var assert = /*#__PURE__*/Object.freeze({
  __proto__: null,
  invariant: invariant,
  isTrue: isTrue,
  isFalse: isFalse,
  fail: fail
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const {
  assign,
  create,
  defineProperties,
  defineProperty,
  freeze,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
  getPrototypeOf,
  hasOwnProperty,
  isFrozen,
  keys,
  seal,
  setPrototypeOf
} = Object;
const {
  isArray: isArray$1
} = Array;
const {
  filter: ArrayFilter,
  find: ArrayFind,
  indexOf: ArrayIndexOf,
  join: ArrayJoin,
  map: ArrayMap,
  push: ArrayPush,
  reduce: ArrayReduce,
  reverse: ArrayReverse,
  slice: ArraySlice$1,
  splice: ArraySplice,
  unshift: ArrayUnshift$1,
  forEach
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt,
  replace: StringReplace,
  slice: StringSlice,
  toLowerCase: StringToLowerCase
} = String.prototype;

function isUndefined(obj) {
  return obj === undefined;
}

function isNull(obj) {
  return obj === null;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function isObject$1(obj) {
  return typeof obj === 'object';
}

const OtS = {}.toString;

function toString(obj) {
  if (obj && obj.toString) {
    // Arrays might hold objects with "null" prototype So using
    // Array.prototype.toString directly will cause an error Iterate through
    // all the items and handle individually.
    if (isArray$1(obj)) {
      return ArrayJoin.call(ArrayMap.call(obj, toString), ',');
    }

    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS.call(obj);
  } else {
    return obj + emptyString;
  }
}

const emptyString = '';
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */

const AriaPropertyNames = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap = create(null);
const PropNameToAttrNameMap = create(null); // Synthetic creation of all AOM property descriptors for Custom Elements

forEach.call(AriaPropertyNames, propName => {
  // Typescript infers the wrong function type for this particular overloaded method:
  // https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap[attrName] = propName;
  PropNameToAttrNameMap[propName] = attrName;
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis

const _globalThis = function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }

  let _globalThis;

  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef

    _globalThis = __magic__; // @ts-ignore

    delete Object.prototype.__magic__;
  } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }

  return _globalThis;
}();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/*
 * In IE11, symbols are expensive.
 * Due to the nature of the symbol polyfill. This method abstract the
 * creation of symbols, so we can fallback to string when native symbols
 * are not supported. Note that we can't use typeof since it will fail when transpiling.
 */


const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';

function createHiddenField(key, namespace) {
  return hasNativeSymbolsSupport ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
}

const hiddenFieldsMap = new WeakMap();

function setHiddenField(o, field, value) {
  let valuesByField = hiddenFieldsMap.get(o);

  if (isUndefined(valuesByField)) {
    valuesByField = create(null);
    hiddenFieldsMap.set(o, valuesByField);
  }

  valuesByField[field] = value;
}

function getHiddenField(o, field) {
  const valuesByField = hiddenFieldsMap.get(o);

  if (!isUndefined(valuesByField)) {
    return valuesByField[field];
  }
}

const HTML_ATTRIBUTES_TO_PROPERTY = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys(HTML_ATTRIBUTES_TO_PROPERTY).forEach(attrName => {});
/** version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function detect$1(propName) {
  return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const nodeToAriaPropertyValuesMap = new WeakMap();

function getAriaPropertyMap(elm) {
  let map = nodeToAriaPropertyValuesMap.get(elm);

  if (map === undefined) {
    map = {};
    nodeToAriaPropertyValuesMap.set(elm, map);
  }

  return map;
}

function getNormalizedAriaPropertyValue(value) {
  return value == null ? null : String(value);
}

function createAriaPropertyPropertyDescriptor(propName, attrName) {
  return {
    get() {
      const map = getAriaPropertyMap(this);

      if (hasOwnProperty.call(map, propName)) {
        return map[propName];
      } // otherwise just reflect what's in the attribute


      return this.hasAttribute(attrName) ? this.getAttribute(attrName) : null;
    },

    set(newValue) {
      const normalizedValue = getNormalizedAriaPropertyValue(newValue);
      const map = getAriaPropertyMap(this);
      map[propName] = normalizedValue; // reflect into the corresponding attribute

      if (newValue === null) {
        this.removeAttribute(attrName);
      } else {
        this.setAttribute(attrName, newValue);
      }
    },

    configurable: true,
    enumerable: true
  };
}

function patch(propName) {
  // Typescript is inferring the wrong function type for this particular
  // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = PropNameToAttrNameMap[propName];
  const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
  Object.defineProperty(Element.prototype, propName, descriptor);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const ElementPrototypeAriaPropertyNames = keys(PropNameToAttrNameMap);

for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
  const propName = ElementPrototypeAriaPropertyNames[i];

  if (detect$1(propName)) {
    patch(propName);
  }
}
/* proxy-compat-disable */

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function invariant$1(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}

function isTrue$1(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function isFalse$2(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function fail$1(msg) {
  throw new Error(msg);
}

var assert$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  invariant: invariant$1,
  isTrue: isTrue$1,
  isFalse: isFalse$2,
  fail: fail$1
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const {
  assign: assign$1,
  create: create$1,
  defineProperties: defineProperties$1,
  defineProperty: defineProperty$1,
  freeze: freeze$1,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
  getOwnPropertyNames: getOwnPropertyNames$1,
  getPrototypeOf: getPrototypeOf$1,
  hasOwnProperty: hasOwnProperty$1,
  isFrozen: isFrozen$1,
  keys: keys$1,
  seal: seal$1,
  setPrototypeOf: setPrototypeOf$1
} = Object;
const {
  isArray: isArray$2
} = Array;
const {
  filter: ArrayFilter$1,
  find: ArrayFind$1,
  indexOf: ArrayIndexOf$1,
  join: ArrayJoin$1,
  map: ArrayMap$1,
  push: ArrayPush$1,
  reduce: ArrayReduce$1,
  reverse: ArrayReverse$1,
  slice: ArraySlice$2,
  splice: ArraySplice$1,
  unshift: ArrayUnshift$2,
  forEach: forEach$1
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$1,
  replace: StringReplace$1,
  slice: StringSlice$1,
  toLowerCase: StringToLowerCase$1
} = String.prototype;

function isUndefined$1(obj) {
  return obj === undefined;
}

function isNull$1(obj) {
  return obj === null;
}

function isTrue$1$1(obj) {
  return obj === true;
}

function isFalse$1$1(obj) {
  return obj === false;
}

function isFunction$1(obj) {
  return typeof obj === 'function';
}

function isObject$2(obj) {
  return typeof obj === 'object';
}

function isString(obj) {
  return typeof obj === 'string';
}

function isNumber(obj) {
  return typeof obj === 'number';
}

const OtS$1 = {}.toString;

function toString$1(obj) {
  if (obj && obj.toString) {
    // Arrays might hold objects with "null" prototype So using
    // Array.prototype.toString directly will cause an error Iterate through
    // all the items and handle individually.
    if (isArray$2(obj)) {
      return ArrayJoin$1.call(ArrayMap$1.call(obj, toString$1), ',');
    }

    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$1.call(obj);
  } else {
    return obj + emptyString$1;
  }
}

function getPropertyDescriptor(o, p) {
  do {
    const d = getOwnPropertyDescriptor$1(o, p);

    if (!isUndefined$1(d)) {
      return d;
    }

    o = getPrototypeOf$1(o);
  } while (o !== null);
}

const emptyString$1 = '';
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */

const AriaPropertyNames$1 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$1 = create$1(null);
const PropNameToAttrNameMap$1 = create$1(null); // Synthetic creation of all AOM property descriptors for Custom Elements

forEach$1.call(AriaPropertyNames$1, propName => {
  // Typescript infers the wrong function type for this particular overloaded method:
  // https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = StringToLowerCase$1.call(StringReplace$1.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$1[attrName] = propName;
  PropNameToAttrNameMap$1[propName] = attrName;
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis

const _globalThis$1 = function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }

  let _globalThis;

  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef

    _globalThis = __magic__; // @ts-ignore

    delete Object.prototype.__magic__;
  } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }

  return _globalThis;
}();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/*
 * In IE11, symbols are expensive.
 * Due to the nature of the symbol polyfill. This method abstract the
 * creation of symbols, so we can fallback to string when native symbols
 * are not supported. Note that we can't use typeof since it will fail when transpiling.
 */


const hasNativeSymbolsSupport$1 = Symbol('x').toString() === 'Symbol(x)';

function createHiddenField$1(key, namespace) {
  return hasNativeSymbolsSupport$1 ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
}

const hiddenFieldsMap$1 = new WeakMap();

function setHiddenField$1(o, field, value) {
  let valuesByField = hiddenFieldsMap$1.get(o);

  if (isUndefined$1(valuesByField)) {
    valuesByField = create$1(null);
    hiddenFieldsMap$1.set(o, valuesByField);
  }

  valuesByField[field] = value;
}

function getHiddenField$1(o, field) {
  const valuesByField = hiddenFieldsMap$1.get(o);

  if (!isUndefined$1(valuesByField)) {
    return valuesByField[field];
  }
}

const HTML_ATTRIBUTES_TO_PROPERTY$1 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$1(HTML_ATTRIBUTES_TO_PROPERTY$1).forEach(attrName => {});
/** version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

let nextTickCallbackQueue = [];
const SPACE_CHAR = 32;
const EmptyObject = seal$1(create$1(null));
const EmptyArray = seal$1([]);

function flushCallbackQueue() {
  {
    if (nextTickCallbackQueue.length === 0) {
      throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
    }
  }

  const callbacks = nextTickCallbackQueue;
  nextTickCallbackQueue = []; // reset to a new queue

  for (let i = 0, len = callbacks.length; i < len; i += 1) {
    callbacks[i]();
  }
}

function addCallbackToNextTick(callback) {
  {
    if (!isFunction$1(callback)) {
      throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
    }
  }

  if (nextTickCallbackQueue.length === 0) {
    Promise.resolve().then(flushCallbackQueue);
  }

  ArrayPush$1.call(nextTickCallbackQueue, callback);
}
/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const {
  create: create$1$1
} = Object;
const {
  splice: ArraySplice$1$1,
  indexOf: ArrayIndexOf$1$1,
  push: ArrayPush$1$1
} = Array.prototype;
const TargetToReactiveRecordMap = new WeakMap();

function isUndefined$1$1(obj) {
  return obj === undefined;
}

function getReactiveRecord(target) {
  let reactiveRecord = TargetToReactiveRecordMap.get(target);

  if (isUndefined$1$1(reactiveRecord)) {
    const newRecord = create$1$1(null);
    reactiveRecord = newRecord;
    TargetToReactiveRecordMap.set(target, newRecord);
  }

  return reactiveRecord;
}

let currentReactiveObserver = null;

function valueMutated(target, key) {
  const reactiveRecord = TargetToReactiveRecordMap.get(target);

  if (!isUndefined$1$1(reactiveRecord)) {
    const reactiveObservers = reactiveRecord[key];

    if (!isUndefined$1$1(reactiveObservers)) {
      for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
        const ro = reactiveObservers[i];
        ro.notify();
      }
    }
  }
}

function valueObserved(target, key) {
  // We should determine if an active Observing Record is present to track mutations.
  if (currentReactiveObserver === null) {
    return;
  }

  const ro = currentReactiveObserver;
  const reactiveRecord = getReactiveRecord(target);
  let reactiveObservers = reactiveRecord[key];

  if (isUndefined$1$1(reactiveObservers)) {
    reactiveObservers = [];
    reactiveRecord[key] = reactiveObservers;
  } else if (reactiveObservers[0] === ro) {
    return; // perf optimization considering that most subscriptions will come from the same record
  }

  if (ArrayIndexOf$1$1.call(reactiveObservers, ro) === -1) {
    ro.link(reactiveObservers);
  }
}

class ReactiveObserver {
  constructor(callback) {
    this.listeners = [];
    this.callback = callback;
  }

  observe(job) {
    const inceptionReactiveRecord = currentReactiveObserver;
    currentReactiveObserver = this;
    let error;

    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      currentReactiveObserver = inceptionReactiveRecord;

      if (error !== undefined) {
        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }
  /**
   * This method is responsible for disconnecting the Reactive Observer
   * from any Reactive Record that has a reference to it, to prevent future
   * notifications about previously recorded access.
   */


  reset() {
    const {
      listeners
    } = this;
    const len = listeners.length;

    if (len > 0) {
      for (let i = 0; i < len; i += 1) {
        const set = listeners[i];
        const pos = ArrayIndexOf$1$1.call(listeners[i], this);
        ArraySplice$1$1.call(set, pos, 1);
      }

      listeners.length = 0;
    }
  } // friend methods


  notify() {
    this.callback.call(undefined, this);
  }

  link(reactiveObservers) {
    ArrayPush$1$1.call(reactiveObservers, this); // we keep track of observing records where the observing record was added to so we can do some clean up later on

    ArrayPush$1$1.call(this.listeners, reactiveObservers);
  }

}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function componentValueMutated(vm, key) {
  valueMutated(vm.component, key);
}

function componentValueObserved(vm, key) {
  valueObserved(vm.component, key);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function getComponentTag(vm) {
  return `<${StringToLowerCase$1.call(vm.tagName)}>`;
} // TODO [#1695]: Unify getComponentStack and getErrorComponentStack


function getComponentStack(vm) {
  const stack = [];
  let prefix = '';

  while (!isNull$1(vm.owner)) {
    ArrayPush$1.call(stack, prefix + getComponentTag(vm));
    vm = vm.owner;
    prefix += '\t';
  }

  return ArrayJoin$1.call(stack, '\n');
}

function getErrorComponentStack(vm) {
  const wcStack = [];
  let currentVm = vm;

  while (!isNull$1(currentVm)) {
    ArrayPush$1.call(wcStack, getComponentTag(currentVm));
    currentVm = currentVm.owner;
  }

  return wcStack.reverse().join('\n\t');
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function logError(message, vm) {
  let msg = `[LWC error]: ${message}`;

  if (!isUndefined$1(vm)) {
    msg = `${msg}\n${getComponentStack(vm)}`;
  }

  try {
    throw new Error(msg);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.error(e);
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function handleEvent(event, vnode) {
  const {
    type
  } = event;
  const {
    data: {
      on
    }
  } = vnode;
  const handler = on && on[type]; // call event handler if exists

  if (handler) {
    handler.call(undefined, event);
  }
}

function createListener() {
  return function handler(event) {
    handleEvent(event, handler.vnode);
  };
}

function updateAllEventListeners(oldVnode, vnode) {
  if (isUndefined$1(oldVnode.listener)) {
    createAllEventListeners(vnode);
  } else {
    vnode.listener = oldVnode.listener;
    vnode.listener.vnode = vnode;
  }
}

function createAllEventListeners(vnode) {
  const {
    elm,
    data: {
      on
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(on)) {
    return;
  }

  const listener = vnode.listener = createListener();
  listener.vnode = vnode;
  let name;

  for (name in on) {
    renderer.addEventListener(elm, name, listener);
  }
}

var modEvents = {
  update: updateAllEventListeners,
  create: createAllEventListeners
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title']; // Few more exceptions that are using the attribute name to match the property in lowercase.
// this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
// and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
// Note: this list most be in sync with the compiler as well.

const HTMLPropertyNamesWithLowercasedReflectiveAttributes = ['accessKey', 'readOnly', 'tabIndex', 'bgColor', 'colSpan', 'rowSpan', 'contentEditable', 'dateTime', 'formAction', 'isMap', 'maxLength', 'useMap'];

function offsetPropertyErrorMessage(name) {
  return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
} // Global HTML Attributes & Properties
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


const globalHTMLProperties = assign$1(create$1(null), {
  accessKey: {
    attribute: 'accesskey'
  },
  accessKeyLabel: {
    readOnly: true
  },
  className: {
    attribute: 'class',
    error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
  },
  contentEditable: {
    attribute: 'contenteditable'
  },
  dataset: {
    readOnly: true,
    error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
  },
  dir: {
    attribute: 'dir'
  },
  draggable: {
    attribute: 'draggable'
  },
  dropzone: {
    attribute: 'dropzone',
    readOnly: true
  },
  hidden: {
    attribute: 'hidden'
  },
  id: {
    attribute: 'id'
  },
  inputMode: {
    attribute: 'inputmode'
  },
  lang: {
    attribute: 'lang'
  },
  slot: {
    attribute: 'slot',
    error: 'Using the `slot` property is an anti-pattern.'
  },
  spellcheck: {
    attribute: 'spellcheck'
  },
  style: {
    attribute: 'style'
  },
  tabIndex: {
    attribute: 'tabindex'
  },
  title: {
    attribute: 'title'
  },
  translate: {
    attribute: 'translate'
  },
  // additional "global attributes" that are not present in the link above.
  isContentEditable: {
    readOnly: true
  },
  offsetHeight: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetHeight')
  },
  offsetLeft: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetLeft')
  },
  offsetParent: {
    readOnly: true
  },
  offsetTop: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetTop')
  },
  offsetWidth: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetWidth')
  },
  role: {
    attribute: 'role'
  }
});
const AttrNameToPropNameMap$1$1 = assign$1(create$1(null), AttrNameToPropNameMap$1);
const PropNameToAttrNameMap$1$1 = assign$1(create$1(null), PropNameToAttrNameMap$1);
forEach$1.call(defaultDefHTMLPropertyNames, propName => {
  const attrName = StringToLowerCase$1.call(propName);
  AttrNameToPropNameMap$1$1[attrName] = propName;
  PropNameToAttrNameMap$1$1[propName] = attrName;
});
forEach$1.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
  const attrName = StringToLowerCase$1.call(propName);
  AttrNameToPropNameMap$1$1[attrName] = propName;
  PropNameToAttrNameMap$1$1[propName] = attrName;
});
const CAPS_REGEX = /[A-Z]/g;
/**
 * This method maps between property names
 * and the corresponding attribute name.
 */

function getAttrNameFromPropName(propName) {
  if (isUndefined$1(PropNameToAttrNameMap$1$1[propName])) {
    PropNameToAttrNameMap$1$1[propName] = StringReplace$1.call(propName, CAPS_REGEX, match => '-' + match.toLowerCase());
  }

  return PropNameToAttrNameMap$1$1[propName];
}

let controlledElement = null;
let controlledAttributeName;

function isAttributeLocked(elm, attrName) {
  return elm !== controlledElement || attrName !== controlledAttributeName;
}

function lockAttribute(_elm, _key) {
  controlledElement = null;
  controlledAttributeName = undefined;
}

function unlockAttribute(elm, key) {
  controlledElement = elm;
  controlledAttributeName = key;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const xlinkNS = 'http://www.w3.org/1999/xlink';
const xmlNS = 'http://www.w3.org/XML/1998/namespace';
const ColonCharCode = 58;

function updateAttrs(oldVnode, vnode) {
  const {
    data: {
      attrs
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(attrs)) {
    return;
  }

  let {
    data: {
      attrs: oldAttrs
    }
  } = oldVnode;

  if (oldAttrs === attrs) {
    return;
  }

  {
    assert$1.invariant(isUndefined$1(oldAttrs) || keys$1(oldAttrs).join(',') === keys$1(attrs).join(','), `vnode.data.attrs cannot change shape.`);
  }

  const elm = vnode.elm;
  const {
    setAttribute,
    removeAttribute
  } = renderer;
  let key;
  oldAttrs = isUndefined$1(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
  // this routine is only useful for data-* attributes in all kind of elements
  // and aria-* in standard elements (custom elements will use props for these)

  for (key in attrs) {
    const cur = attrs[key];
    const old = oldAttrs[key];

    if (old !== cur) {
      unlockAttribute(elm, key);

      if (StringCharCodeAt$1.call(key, 3) === ColonCharCode) {
        // Assume xml namespace
        setAttribute(elm, key, cur, xmlNS);
      } else if (StringCharCodeAt$1.call(key, 5) === ColonCharCode) {
        // Assume xlink namespace
        setAttribute(elm, key, cur, xlinkNS);
      } else if (isNull$1(cur)) {
        removeAttribute(elm, key);
      } else {
        setAttribute(elm, key, cur);
      }

      lockAttribute();
    }
  }
}

const emptyVNode = {
  data: {}
};
var modAttrs = {
  create: vnode => updateAttrs(emptyVNode, vnode),
  update: updateAttrs
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function isLiveBindingProp(sel, key) {
  // For properties with live bindings, we read values from the DOM element
  // instead of relying on internally tracked values.
  return sel === 'input' && (key === 'value' || key === 'checked');
}

function update(oldVnode, vnode) {
  const props = vnode.data.props;

  if (isUndefined$1(props)) {
    return;
  }

  const oldProps = oldVnode.data.props;

  if (oldProps === props) {
    return;
  }

  {
    assert$1.invariant(isUndefined$1(oldProps) || keys$1(oldProps).join(',') === keys$1(props).join(','), 'vnode.data.props cannot change shape.');
  }

  const isFirstPatch = isUndefined$1(oldProps);
  const {
    elm,
    sel,
    owner: {
      renderer
    }
  } = vnode;

  for (const key in props) {
    const cur = props[key]; // if it is the first time this element is patched, or the current value is different to the previous value...

    if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? renderer.getProperty(elm, key) : oldProps[key])) {
      renderer.setProperty(elm, key, cur);
    }
  }
}

const emptyVNode$1 = {
  data: {}
};
var modProps = {
  create: vnode => update(emptyVNode$1, vnode),
  update
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const classNameToClassMap = create$1(null);

function getMapFromClassName(className) {
  // Intentionally using == to match undefined and null values from computed style attribute
  if (className == null) {
    return EmptyObject;
  } // computed class names must be string


  className = isString(className) ? className : className + '';
  let map = classNameToClassMap[className];

  if (map) {
    return map;
  }

  map = create$1(null);
  let start = 0;
  let o;
  const len = className.length;

  for (o = 0; o < len; o++) {
    if (StringCharCodeAt$1.call(className, o) === SPACE_CHAR) {
      if (o > start) {
        map[StringSlice$1.call(className, start, o)] = true;
      }

      start = o + 1;
    }
  }

  if (o > start) {
    map[StringSlice$1.call(className, start, o)] = true;
  }

  classNameToClassMap[className] = map;

  {
    // just to make sure that this object never changes as part of the diffing algo
    freeze$1(map);
  }

  return map;
}

function updateClassAttribute(oldVnode, vnode) {
  const {
    elm,
    data: {
      className: newClass
    },
    owner: {
      renderer
    }
  } = vnode;
  const {
    data: {
      className: oldClass
    }
  } = oldVnode;

  if (oldClass === newClass) {
    return;
  }

  const classList = renderer.getClassList(elm);
  const newClassMap = getMapFromClassName(newClass);
  const oldClassMap = getMapFromClassName(oldClass);
  let name;

  for (name in oldClassMap) {
    // remove only if it is not in the new class collection and it is not set from within the instance
    if (isUndefined$1(newClassMap[name])) {
      classList.remove(name);
    }
  }

  for (name in newClassMap) {
    if (isUndefined$1(oldClassMap[name])) {
      classList.add(name);
    }
  }
}

const emptyVNode$2 = {
  data: {}
};
var modComputedClassName = {
  create: vnode => updateClassAttribute(emptyVNode$2, vnode),
  update: updateClassAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function updateStyleAttribute(oldVnode, vnode) {
  const {
    elm,
    data: {
      style: newStyle
    },
    owner: {
      renderer
    }
  } = vnode;
  const {
    getStyleDeclaration,
    removeAttribute
  } = renderer;

  if (oldVnode.data.style === newStyle) {
    return;
  }

  const style = getStyleDeclaration(elm);

  if (!isString(newStyle) || newStyle === '') {
    removeAttribute(elm, 'style');
  } else {
    style.cssText = newStyle;
  }
}

const emptyVNode$3 = {
  data: {}
};
var modComputedStyle = {
  create: vnode => updateStyleAttribute(emptyVNode$3, vnode),
  update: updateStyleAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The compiler takes care of transforming the inline classnames into an object. It's faster to set the
// different classnames properties individually instead of via a string.

function createClassAttribute(vnode) {
  const {
    elm,
    data: {
      classMap
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(classMap)) {
    return;
  }

  const classList = renderer.getClassList(elm);

  for (const name in classMap) {
    classList.add(name);
  }
}

var modStaticClassName = {
  create: createClassAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The compiler takes care of transforming the inline style into an object. It's faster to set the
// different style properties individually instead of via a string.

function createStyleAttribute(vnode) {
  const {
    elm,
    data: {
      styleMap
    },
    owner: {
      renderer
    }
  } = vnode;

  if (isUndefined$1(styleMap)) {
    return;
  }

  const style = renderer.getStyleDeclaration(elm);

  for (const name in styleMap) {
    style[name] = styleMap[name];
  }
}

var modStaticStyle = {
  create: createStyleAttribute
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
@license
Copyright (c) 2015 Simon Friis Vindum.
This code may only be used under the MIT License found at
https://github.com/snabbdom/snabbdom/blob/master/LICENSE
Code distributed by Snabbdom as part of the Snabbdom project at
https://github.com/snabbdom/snabbdom/
*/

function isUndef(s) {
  return s === undefined;
}

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function isVNode(vnode) {
  return vnode != null;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  const map = {};
  let j, key, ch; // TODO [#1637]: simplify this by assuming that all vnodes has keys

  for (j = beginIdx; j <= endIdx; ++j) {
    ch = children[j];

    if (isVNode(ch)) {
      key = ch.key;

      if (key !== undefined) {
        map[key] = j;
      }
    }
  }

  return map;
}

function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];

    if (isVNode(ch)) {
      ch.hook.create(ch);
      ch.hook.insert(ch, parentElm, before);
    }
  }
}

function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

    if (isVNode(ch)) {
      ch.hook.remove(ch, parentElm);
    }
  }
}

function updateDynamicChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  let before;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!isVNode(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
    } else if (!isVNode(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (!isVNode(newStartVnode)) {
      newStartVnode = newCh[++newStartIdx];
    } else if (!isVNode(newEndVnode)) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      newEndVnode.hook.move(oldStartVnode, parentElm, oldEndVnode.owner.renderer.nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }

      idxInOld = oldKeyToIdx[newStartVnode.key];

      if (isUndef(idxInOld)) {
        // New element
        newStartVnode.hook.create(newStartVnode);
        newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];

        if (isVNode(elmToMove)) {
          if (elmToMove.sel !== newStartVnode.sel) {
            // New element
            newStartVnode.hook.create(newStartVnode);
            newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
          } else {
            patchVnode(elmToMove, newStartVnode);
            oldCh[idxInOld] = undefined;
            newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }
  }

  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      const n = newCh[newEndIdx + 1];
      before = isVNode(n) ? n.elm : null;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
    } else {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
}

function updateStaticChildren(parentElm, oldCh, newCh) {
  const {
    length
  } = newCh;

  if (oldCh.length === 0) {
    // the old list is empty, we can directly insert anything new
    addVnodes(parentElm, null, newCh, 0, length);
    return;
  } // if the old list is not empty, the new list MUST have the same
  // amount of nodes, that's why we call this static children


  let referenceElm = null;

  for (let i = length - 1; i >= 0; i -= 1) {
    const vnode = newCh[i];
    const oldVNode = oldCh[i];

    if (vnode !== oldVNode) {
      if (isVNode(oldVNode)) {
        if (isVNode(vnode)) {
          // both vnodes must be equivalent, and se just need to patch them
          patchVnode(oldVNode, vnode);
          referenceElm = vnode.elm;
        } else {
          // removing the old vnode since the new one is null
          oldVNode.hook.remove(oldVNode, parentElm);
        }
      } else if (isVNode(vnode)) {
        // this condition is unnecessary
        vnode.hook.create(vnode); // insert the new node one since the old one is null

        vnode.hook.insert(vnode, parentElm, referenceElm);
        referenceElm = vnode.elm;
      }
    }
  }
}

function patchVnode(oldVnode, vnode) {
  if (oldVnode !== vnode) {
    vnode.elm = oldVnode.elm;
    vnode.hook.update(oldVnode, vnode);
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function generateDataDescriptor(options) {
  return assign$1({
    configurable: true,
    enumerable: true,
    writable: true
  }, options);
}

function generateAccessorDescriptor(options) {
  return assign$1({
    configurable: true,
    enumerable: true
  }, options);
}

let isDomMutationAllowed = false;

function unlockDomMutation() {

  isDomMutationAllowed = true;
}

function lockDomMutation() {

  isDomMutationAllowed = false;
}

function logMissingPortalError(name, type) {
  return logError(`The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`);
}

function patchElementWithRestrictions(elm, options) {

  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const descriptors = {
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on Element.`);
      }

    })
  }; // Apply extra restriction related to DOM manipulation if the element is not a portal.

  if (isFalse$1$1(options.isPortal)) {
    const {
      appendChild,
      insertBefore,
      removeChild,
      replaceChild
    } = elm;
    const originalNodeValueDescriptor = getPropertyDescriptor(elm, 'nodeValue');
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
    assign$1(descriptors, {
      appendChild: generateDataDescriptor({
        value(aChild) {
          logMissingPortalError('appendChild', 'method');
          return appendChild.call(this, aChild);
        }

      }),
      insertBefore: generateDataDescriptor({
        value(newNode, referenceNode) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('insertBefore', 'method');
          }

          return insertBefore.call(this, newNode, referenceNode);
        }

      }),
      removeChild: generateDataDescriptor({
        value(aChild) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('removeChild', 'method');
          }

          return removeChild.call(this, aChild);
        }

      }),
      replaceChild: generateDataDescriptor({
        value(newChild, oldChild) {
          logMissingPortalError('replaceChild', 'method');
          return replaceChild.call(this, newChild, oldChild);
        }

      }),
      nodeValue: generateAccessorDescriptor({
        get() {
          return originalNodeValueDescriptor.get.call(this);
        },

        set(value) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('nodeValue', 'property');
          }

          originalNodeValueDescriptor.set.call(this, value);
        }

      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },

        set(value) {
          logMissingPortalError('textContent', 'property');
          originalTextContentDescriptor.set.call(this, value);
        }

      }),
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },

        set(value) {
          logMissingPortalError('innerHTML', 'property');
          return originalInnerHTMLDescriptor.set.call(this, value);
        }

      })
    });
  }

  defineProperties$1(elm, descriptors);
}

const BLOCKED_SHADOW_ROOT_METHODS = ['cloneNode', 'getElementById', 'getSelection', 'elementsFromPoint', 'dispatchEvent'];

function getShadowRootRestrictionsDescriptors(sr) {
  // thing when using the real shadow root, because if that's the case,
  // the component will not work when running with synthetic shadow.


  const originalAddEventListener = sr.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, 'innerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(sr, 'textContent');
  const descriptors = {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on ShadowRoot.`);
      }

    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on ShadowRoot.`);
      }

    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into its Component's shadow root
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch


        return originalAddEventListener.apply(this, arguments);
      }

    })
  };
  forEach$1.call(BLOCKED_SHADOW_ROOT_METHODS, methodName => {
    descriptors[methodName] = generateAccessorDescriptor({
      get() {
        throw new Error(`Disallowed method "${methodName}" in ShadowRoot.`);
      }

    });
  });
  return descriptors;
} // Custom Elements Restrictions:
// -----------------------------


function getCustomElementRestrictionsDescriptors(elm) {

  const originalAddEventListener = elm.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
  return {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on HTMLElement.`);
      }

    }),
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on HTMLElement.`);
      }

    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },

      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on HTMLElement.`);
      }

    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into a lighting element node
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch


        return originalAddEventListener.apply(this, arguments);
      }

    })
  };
}

function getComponentRestrictionsDescriptors() {

  return {
    tagName: generateAccessorDescriptor({
      get() {
        throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does` + ` not know which tagName will be used to create the element, therefore writing` + ` code that check for that value is error prone.`);
      },

      configurable: true,
      enumerable: false
    })
  };
}

function getLightningElementPrototypeRestrictionsDescriptors(proto) {

  const originalDispatchEvent = proto.dispatchEvent;
  const descriptors = {
    dispatchEvent: generateDataDescriptor({
      value(event) {
        const vm = getAssociatedVM(this);

        if (!isNull$1(event) && isObject$2(event)) {
          const {
            type
          } = event;

          if (!/^[a-z][a-z0-9_]*$/.test(type)) {
            logError(`Invalid event type "${type}" dispatched in element ${getComponentTag(vm)}.` + ` Event name must start with a lowercase letter and followed only lowercase` + ` letters, numbers, and underscores`, vm);
          }
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch


        return originalDispatchEvent.apply(this, arguments);
      }

    })
  };
  forEach$1.call(getOwnPropertyNames$1(globalHTMLProperties), propName => {
    if (propName in proto) {
      return; // no need to redefine something that we are already exposing
    }

    descriptors[propName] = generateAccessorDescriptor({
      get() {
        const {
          error,
          attribute
        } = globalHTMLProperties[propName];
        const msg = [];
        msg.push(`Accessing the global HTML property "${propName}" is disabled.`);

        if (error) {
          msg.push(error);
        } else if (attribute) {
          msg.push(`Instead access it via \`this.getAttribute("${attribute}")\`.`);
        }

        logError(msg.join('\n'), getAssociatedVM(this));
      },

      set() {
        const {
          readOnly
        } = globalHTMLProperties[propName];

        if (readOnly) {
          logError(`The global HTML property \`${propName}\` is read-only.`, getAssociatedVM(this));
        }
      }

    });
  });
  return descriptors;
} // This routine will prevent access to certain properties on a shadow root instance to guarantee
// that all components will work fine in IE11 and other browsers without shadow dom support.


function patchShadowRootWithRestrictions(sr) {
  defineProperties$1(sr, getShadowRootRestrictionsDescriptors(sr));
}

function patchCustomElementWithRestrictions(elm) {
  const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm);
  const elmProto = getPrototypeOf$1(elm);
  setPrototypeOf$1(elm, create$1(elmProto, restrictionsDescriptors));
}

function patchComponentWithRestrictions(cmp) {
  defineProperties$1(cmp, getComponentRestrictionsDescriptors());
}

function patchLightningElementPrototypeWithRestrictions(proto) {
  defineProperties$1(proto, getLightningElementPrototypeRestrictionsDescriptors(proto));
}
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
// to inject at runtime.


const HTMLElementConstructor = typeof HTMLElement !== 'undefined' ? HTMLElement : function () {};
const HTMLElementPrototype = HTMLElementConstructor.prototype;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * This is a descriptor map that contains
 * all standard properties that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base HTML Element and
 * Base Lightning Element should support.
 */

const HTMLElementOriginalDescriptors = create$1(null);
forEach$1.call(keys$1(PropNameToAttrNameMap$1), propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});
forEach$1.call(defaultDefHTMLPropertyNames, propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
  // this category, so, better to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * This operation is called with a descriptor of an standard html property
 * that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
 * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
 */

function createBridgeToElementDescriptor(propName, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;

  if (!isFunction$1(get)) {
    {
      assert$1.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
    }

    throw new TypeError();
  }

  if (!isFunction$1(set)) {
    {
      assert$1.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
    }

    throw new TypeError();
  }

  return {
    enumerable,
    configurable,

    get() {
      const vm = getAssociatedVM(this);

      if (isBeingConstructed(vm)) {
        {
          logError(`The value of property \`${propName}\` can't be read from the constructor because the owner component hasn't set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }

        return;
      }

      componentValueObserved(vm, propName);
      return get.call(vm.elm);
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
        assert$1.invariant(!isUpdatingTemplate, `When updating the template of ${vmBeingRendered}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
        assert$1.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        assert$1.invariant(!isObject$2(newValue) || isNull$1(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
      }

      if (newValue !== vm.cmpProps[propName]) {
        vm.cmpProps[propName] = newValue;
        componentValueMutated(vm, propName);
      }

      return set.call(vm.elm, newValue);
    }

  };
}
/**
 * This class is the base class for any LWC element.
 * Some elements directly extends this class, others implement it via inheritance.
 **/


function BaseLightningElementConstructor() {
  var _a; // This should be as performant as possible, while any initialization should be done lazily


  if (isNull$1(vmBeingConstructed)) {
    throw new ReferenceError('Illegal constructor');
  }

  const vm = vmBeingConstructed;
  const {
    elm,
    mode,
    renderer,
    def: {
      ctor
    }
  } = vm;

  {
    (_a = renderer.assertInstanceOfHTMLElement) === null || _a === void 0 ? void 0 : _a.call(renderer, vm.elm, `Component creation requires a DOM element to be associated to ${vm}.`);
  }

  const component = this;
  const cmpRoot = renderer.attachShadow(elm, {
    mode,
    delegatesFocus: !!ctor.delegatesFocus,
    '$$lwc-synthetic-mode$$': true
  });
  vm.component = this;
  vm.cmpRoot = cmpRoot; // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
  // component creation and passes hooks to instrument all the component interactions with the
  // engine. We are intentionally hiding this argument from the formal API of LightningElement
  // because we don't want folks to know about it just yet.

  if (arguments.length === 1) {
    const {
      callHook,
      setHook,
      getHook
    } = arguments[0];
    vm.callHook = callHook;
    vm.setHook = setHook;
    vm.getHook = getHook;
  } // Linking elm, shadow root and component with the VM.


  associateVM(component, vm);
  associateVM(cmpRoot, vm);
  associateVM(elm, vm); // Adding extra guard rails in DEV mode.

  {
    patchCustomElementWithRestrictions(elm);
    patchComponentWithRestrictions(component);
    patchShadowRootWithRestrictions(cmpRoot);
  }

  return this;
}

BaseLightningElementConstructor.prototype = {
  constructor: BaseLightningElementConstructor,

  dispatchEvent(event) {
    const {
      elm,
      renderer: {
        dispatchEvent
      }
    } = getAssociatedVM(this);
    return dispatchEvent(elm, event);
  },

  addEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        addEventListener
      }
    } = vm;

    {
      const vmBeingRendered = getVMBeingRendered();
      assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert$1.invariant(isFunction$1(listener), `Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
    }

    const wrappedListener = getWrappedComponentsListener(vm, listener);
    addEventListener(elm, type, wrappedListener, options);
  },

  removeEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        removeEventListener
      }
    } = vm;
    const wrappedListener = getWrappedComponentsListener(vm, listener);
    removeEventListener(elm, type, wrappedListener, options);
  },

  hasAttribute(name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return !isNull$1(getAttribute(elm, name));
  },

  hasAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return !isNull$1(getAttribute(elm, name, namespace));
  },

  removeAttribute(name) {
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = getAssociatedVM(this);
    unlockAttribute(elm, name);
    removeAttribute(elm, name);
    lockAttribute();
  },

  removeAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = getAssociatedVM(this);
    unlockAttribute(elm, name);
    removeAttribute(elm, name, namespace);
    lockAttribute();
  },

  getAttribute(name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return getAttribute(elm, name);
  },

  getAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return getAttribute(elm, name, namespace);
  },

  setAttribute(name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;

    {
      assert$1.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }

    unlockAttribute(elm, name);
    setAttribute(elm, name, value);
    lockAttribute();
  },

  setAttributeNS(namespace, name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;

    {
      assert$1.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }

    unlockAttribute(elm, name);
    setAttribute(elm, name, value, namespace);
    lockAttribute();
  },

  getBoundingClientRect() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getBoundingClientRect
      }
    } = vm;

    {
      assert$1.isFalse(isBeingConstructed(vm), `this.getBoundingClientRect() should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM, instead, you can use it in one of the available life-cycle hooks.`);
    }

    return getBoundingClientRect(elm);
  },

  querySelector(selectors) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        querySelector
      }
    } = vm;

    {
      assert$1.isFalse(isBeingConstructed(vm), `this.querySelector() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }

    return querySelector(elm, selectors);
  },

  querySelectorAll(selectors) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        querySelectorAll
      }
    } = vm;

    {
      assert$1.isFalse(isBeingConstructed(vm), `this.querySelectorAll() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }

    return querySelectorAll(elm, selectors);
  },

  getElementsByTagName(tagNameOrWildCard) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getElementsByTagName
      }
    } = vm;

    {
      assert$1.isFalse(isBeingConstructed(vm), `this.getElementsByTagName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }

    return getElementsByTagName(elm, tagNameOrWildCard);
  },

  getElementsByClassName(names) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getElementsByClassName
      }
    } = vm;

    {
      assert$1.isFalse(isBeingConstructed(vm), `this.getElementsByClassName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }

    return getElementsByClassName(elm, names);
  },

  get isConnected() {
    const {
      elm,
      renderer: {
        isConnected
      }
    } = getAssociatedVM(this);
    return isConnected(elm);
  },

  get classList() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getClassList
      }
    } = vm;

    {
      // TODO [#1290]: this still fails in dev but works in production, eventually, we should
      // just throw in all modes
      assert$1.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
    }

    return getClassList(elm);
  },

  get template() {
    const vm = getAssociatedVM(this);
    return vm.cmpRoot;
  },

  get shadowRoot() {
    // From within the component instance, the shadowRoot is always reported as "closed".
    // Authors should rely on this.template instead.
    return null;
  },

  render() {
    const vm = getAssociatedVM(this);
    return vm.def.template;
  },

  toString() {
    const vm = getAssociatedVM(this);
    return `[object ${vm.def.name}]`;
  }

};
const lightningBasedDescriptors = create$1(null);

for (const propName in HTMLElementOriginalDescriptors) {
  lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
}

defineProperties$1(BaseLightningElementConstructor.prototype, lightningBasedDescriptors);
defineProperty$1(BaseLightningElementConstructor, 'CustomElementConstructor', {
  get() {
    // If required, a runtime-specific implementation must be defined.
    throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
  },

  configurable: true
});

{
  patchLightningElementPrototypeWithRestrictions(BaseLightningElementConstructor.prototype);
} // @ts-ignore


const BaseLightningElement = BaseLightningElementConstructor;

function internalWireFieldDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },

    set(value) {
      const vm = getAssociatedVM(this);
      /**
       * Reactivity for wired fields is provided in wiring.
       * We intentionally add reactivity here since this is just
       * letting the author to do the wrong thing, but it will keep our
       * system to be backward compatible.
       */

      if (value !== vm.cmpFields[key]) {
        vm.cmpFields[key] = value;
        componentValueMutated(vm, key);
      }
    },

    enumerable: true,
    configurable: true
  };
}
/**
 * Copyright (C) 2017 salesforce.com, inc.
 */


const {
  isArray: isArray$1$1
} = Array;
const {
  getPrototypeOf: getPrototypeOf$1$1,
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty,
  defineProperties: ObjectDefineProperties,
  isExtensible,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1$1,
  getOwnPropertyNames: getOwnPropertyNames$1$1,
  getOwnPropertySymbols,
  preventExtensions,
  hasOwnProperty: hasOwnProperty$1$1
} = Object;
const {
  push: ArrayPush$2,
  concat: ArrayConcat,
  map: ArrayMap$1$1
} = Array.prototype;
const OtS$1$1 = {}.toString;

function toString$1$1(obj) {
  if (obj && obj.toString) {
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$1$1.call(obj);
  } else {
    return obj + '';
  }
}

function isUndefined$2(obj) {
  return obj === undefined;
}

function isFunction$1$1(obj) {
  return typeof obj === 'function';
}

function isObject$1$1(obj) {
  return typeof obj === 'object';
}

const proxyToValueMap = new WeakMap();

function registerProxy(proxy, value) {
  proxyToValueMap.set(proxy, value);
}

const unwrap = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

function wrapValue(membrane, value) {
  return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
}
/**
 * Unwrap property descriptors will set value on original descriptor
 * We only need to unwrap if value is specified
 * @param descriptor external descrpitor provided to define new property on original value
 */


function unwrapDescriptor(descriptor) {
  if (hasOwnProperty$1$1.call(descriptor, 'value')) {
    descriptor.value = unwrap(descriptor.value);
  }

  return descriptor;
}

function lockShadowTarget(membrane, shadowTarget, originalTarget) {
  const targetKeys = ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
  targetKeys.forEach(key => {
    let descriptor = getOwnPropertyDescriptor$1$1(originalTarget, key); // We do not need to wrap the descriptor if configurable
    // Because we can deal with wrapping it when user goes through
    // Get own property descriptor. There is also a chance that this descriptor
    // could change sometime in the future, so we can defer wrapping
    // until we need to

    if (!descriptor.configurable) {
      descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
    }

    ObjectDefineProperty(shadowTarget, key, descriptor);
  });
  preventExtensions(shadowTarget);
}

class ReactiveProxyHandler {
  constructor(membrane, value) {
    this.originalTarget = value;
    this.membrane = membrane;
  }

  get(shadowTarget, key) {
    const {
      originalTarget,
      membrane
    } = this;
    const value = originalTarget[key];
    const {
      valueObserved
    } = membrane;
    valueObserved(originalTarget, key);
    return membrane.getProxy(value);
  }

  set(shadowTarget, key, value) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    const oldValue = originalTarget[key];

    if (oldValue !== value) {
      originalTarget[key] = value;
      valueMutated(originalTarget, key);
    } else if (key === 'length' && isArray$1$1(originalTarget)) {
      // fix for issue #236: push will add the new index, and by the time length
      // is updated, the internal length is already equal to the new length value
      // therefore, the oldValue is equal to the value. This is the forking logic
      // to support this use case.
      valueMutated(originalTarget, key);
    }

    return true;
  }

  deleteProperty(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    delete originalTarget[key];
    valueMutated(originalTarget, key);
    return true;
  }

  apply(shadowTarget, thisArg, argArray) {
    /* No op */
  }

  construct(target, argArray, newTarget) {
    /* No op */
  }

  has(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved
      }
    } = this;
    valueObserved(originalTarget, key);
    return key in originalTarget;
  }

  ownKeys(shadowTarget) {
    const {
      originalTarget
    } = this;
    return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
  }

  isExtensible(shadowTarget) {
    const shadowIsExtensible = isExtensible(shadowTarget);

    if (!shadowIsExtensible) {
      return shadowIsExtensible;
    }

    const {
      originalTarget,
      membrane
    } = this;
    const targetIsExtensible = isExtensible(originalTarget);

    if (!targetIsExtensible) {
      lockShadowTarget(membrane, shadowTarget, originalTarget);
    }

    return targetIsExtensible;
  }

  setPrototypeOf(shadowTarget, prototype) {
    {
      throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString$1$1(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
    }
  }

  getPrototypeOf(shadowTarget) {
    const {
      originalTarget
    } = this;
    return getPrototypeOf$1$1(originalTarget);
  }

  getOwnPropertyDescriptor(shadowTarget, key) {
    const {
      originalTarget,
      membrane
    } = this;
    const {
      valueObserved
    } = this.membrane; // keys looked up via hasOwnProperty need to be reactive

    valueObserved(originalTarget, key);
    let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);

    if (isUndefined$2(desc)) {
      return desc;
    }

    const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);

    if (!isUndefined$2(shadowDescriptor)) {
      return shadowDescriptor;
    } // Note: by accessing the descriptor, the key is marked as observed
    // but access to the value, setter or getter (if available) cannot observe
    // mutations, just like regular methods, in which case we just do nothing.


    desc = wrapDescriptor(membrane, desc, wrapValue);

    if (!desc.configurable) {
      // If descriptor from original target is not configurable,
      // We must copy the wrapped descriptor over to the shadow target.
      // Otherwise, proxy will throw an invariant error.
      // This is our last chance to lock the value.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
      ObjectDefineProperty(shadowTarget, key, desc);
    }

    return desc;
  }

  preventExtensions(shadowTarget) {
    const {
      originalTarget,
      membrane
    } = this;
    lockShadowTarget(membrane, shadowTarget, originalTarget);
    preventExtensions(originalTarget);
    return true;
  }

  defineProperty(shadowTarget, key, descriptor) {
    const {
      originalTarget,
      membrane
    } = this;
    const {
      valueMutated
    } = membrane;
    const {
      configurable
    } = descriptor; // We have to check for value in descriptor
    // because Object.freeze(proxy) calls this method
    // with only { configurable: false, writeable: false }
    // Additionally, method will only be called with writeable:false
    // if the descriptor has a value, as opposed to getter/setter
    // So we can just check if writable is present and then see if
    // value is present. This eliminates getter and setter descriptors

    if (hasOwnProperty$1$1.call(descriptor, 'writable') && !hasOwnProperty$1$1.call(descriptor, 'value')) {
      const originalDescriptor = getOwnPropertyDescriptor$1$1(originalTarget, key);
      descriptor.value = originalDescriptor.value;
    }

    ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));

    if (configurable === false) {
      ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
    }

    valueMutated(originalTarget, key);
    return true;
  }

}

function wrapReadOnlyValue(membrane, value) {
  return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
}

class ReadOnlyHandler {
  constructor(membrane, value) {
    this.originalTarget = value;
    this.membrane = membrane;
  }

  get(shadowTarget, key) {
    const {
      membrane,
      originalTarget
    } = this;
    const value = originalTarget[key];
    const {
      valueObserved
    } = membrane;
    valueObserved(originalTarget, key);
    return membrane.getReadOnlyProxy(value);
  }

  set(shadowTarget, key, value) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }

  deleteProperty(shadowTarget, key) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }

  apply(shadowTarget, thisArg, argArray) {
    /* No op */
  }

  construct(target, argArray, newTarget) {
    /* No op */
  }

  has(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved
      }
    } = this;
    valueObserved(originalTarget, key);
    return key in originalTarget;
  }

  ownKeys(shadowTarget) {
    const {
      originalTarget
    } = this;
    return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
  }

  setPrototypeOf(shadowTarget, prototype) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
    }
  }

  getOwnPropertyDescriptor(shadowTarget, key) {
    const {
      originalTarget,
      membrane
    } = this;
    const {
      valueObserved
    } = membrane; // keys looked up via hasOwnProperty need to be reactive

    valueObserved(originalTarget, key);
    let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);

    if (isUndefined$2(desc)) {
      return desc;
    }

    const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);

    if (!isUndefined$2(shadowDescriptor)) {
      return shadowDescriptor;
    } // Note: by accessing the descriptor, the key is marked as observed
    // but access to the value or getter (if available) cannot be observed,
    // just like regular methods, in which case we just do nothing.


    desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);

    if (hasOwnProperty$1$1.call(desc, 'set')) {
      desc.set = undefined; // readOnly membrane does not allow setters
    }

    if (!desc.configurable) {
      // If descriptor from original target is not configurable,
      // We must copy the wrapped descriptor over to the shadow target.
      // Otherwise, proxy will throw an invariant error.
      // This is our last chance to lock the value.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
      ObjectDefineProperty(shadowTarget, key, desc);
    }

    return desc;
  }

  preventExtensions(shadowTarget) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
    }
  }

  defineProperty(shadowTarget, key, descriptor) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }

}

function extract(objectOrArray) {
  if (isArray$1$1(objectOrArray)) {
    return objectOrArray.map(item => {
      const original = unwrap(item);

      if (original !== item) {
        return extract(original);
      }

      return item;
    });
  }

  const obj = ObjectCreate(getPrototypeOf$1$1(objectOrArray));
  const names = getOwnPropertyNames$1$1(objectOrArray);
  return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
    const item = objectOrArray[key];
    const original = unwrap(item);

    if (original !== item) {
      seed[key] = extract(original);
    } else {
      seed[key] = item;
    }

    return seed;
  }, obj);
}

const formatter = {
  header: plainOrProxy => {
    const originalTarget = unwrap(plainOrProxy); // if originalTarget is falsy or not unwrappable, exit

    if (!originalTarget || originalTarget === plainOrProxy) {
      return null;
    }

    const obj = extract(plainOrProxy);
    return ['object', {
      object: obj
    }];
  },
  hasBody: () => {
    return false;
  },
  body: () => {
    return null;
  }
}; // Inspired from paulmillr/es6-shim
// https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L176-L185

function getGlobal() {
  // the only reliable means to get the global object is `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  } // Gracefully degrade if not able to locate the global object


  return {};
}

function init() {

  const global = getGlobal(); // Custom Formatter for Dev Tools. To enable this, open Chrome Dev Tools
  //  - Go to Settings,
  //  - Under console, select "Enable custom formatters"
  // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview

  const devtoolsFormatters = global.devtoolsFormatters || [];
  ArrayPush$2.call(devtoolsFormatters, formatter);
  global.devtoolsFormatters = devtoolsFormatters;
}

{
  init();
}

function createShadowTarget(value) {
  let shadowTarget = undefined;

  if (isArray$1$1(value)) {
    shadowTarget = [];
  } else if (isObject$1$1(value)) {
    shadowTarget = {};
  }

  return shadowTarget;
}

const ObjectDotPrototype = Object.prototype;

function defaultValueIsObservable(value) {
  // intentionally checking for null
  if (value === null) {
    return false;
  } // treat all non-object types, including undefined, as non-observable values


  if (typeof value !== 'object') {
    return false;
  }

  if (isArray$1$1(value)) {
    return true;
  }

  const proto = getPrototypeOf$1$1(value);
  return proto === ObjectDotPrototype || proto === null || getPrototypeOf$1$1(proto) === null;
}

const defaultValueObserved = (obj, key) => {
  /* do nothing */
};

const defaultValueMutated = (obj, key) => {
  /* do nothing */
};

const defaultValueDistortion = value => value;

function wrapDescriptor(membrane, descriptor, getValue) {
  const {
    set,
    get
  } = descriptor;

  if (hasOwnProperty$1$1.call(descriptor, 'value')) {
    descriptor.value = getValue(membrane, descriptor.value);
  } else {
    if (!isUndefined$2(get)) {
      descriptor.get = function () {
        // invoking the original getter with the original target
        return getValue(membrane, get.call(unwrap(this)));
      };
    }

    if (!isUndefined$2(set)) {
      descriptor.set = function (value) {
        // At this point we don't have a clear indication of whether
        // or not a valid mutation will occur, we don't have the key,
        // and we are not sure why and how they are invoking this setter.
        // Nevertheless we preserve the original semantics by invoking the
        // original setter with the original target and the unwrapped value
        set.call(unwrap(this), membrane.unwrapProxy(value));
      };
    }
  }

  return descriptor;
}

class ReactiveMembrane {
  constructor(options) {
    this.valueDistortion = defaultValueDistortion;
    this.valueMutated = defaultValueMutated;
    this.valueObserved = defaultValueObserved;
    this.valueIsObservable = defaultValueIsObservable;
    this.objectGraph = new WeakMap();

    if (!isUndefined$2(options)) {
      const {
        valueDistortion,
        valueMutated,
        valueObserved,
        valueIsObservable
      } = options;
      this.valueDistortion = isFunction$1$1(valueDistortion) ? valueDistortion : defaultValueDistortion;
      this.valueMutated = isFunction$1$1(valueMutated) ? valueMutated : defaultValueMutated;
      this.valueObserved = isFunction$1$1(valueObserved) ? valueObserved : defaultValueObserved;
      this.valueIsObservable = isFunction$1$1(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
    }
  }

  getProxy(value) {
    const unwrappedValue = unwrap(value);
    const distorted = this.valueDistortion(unwrappedValue);

    if (this.valueIsObservable(distorted)) {
      const o = this.getReactiveState(unwrappedValue, distorted); // when trying to extract the writable version of a readonly
      // we return the readonly.

      return o.readOnly === value ? value : o.reactive;
    }

    return distorted;
  }

  getReadOnlyProxy(value) {
    value = unwrap(value);
    const distorted = this.valueDistortion(value);

    if (this.valueIsObservable(distorted)) {
      return this.getReactiveState(value, distorted).readOnly;
    }

    return distorted;
  }

  unwrapProxy(p) {
    return unwrap(p);
  }

  getReactiveState(value, distortedValue) {
    const {
      objectGraph
    } = this;
    let reactiveState = objectGraph.get(distortedValue);

    if (reactiveState) {
      return reactiveState;
    }

    const membrane = this;
    reactiveState = {
      get reactive() {
        const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue); // caching the reactive proxy after the first time it is accessed

        const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
        registerProxy(proxy, value);
        ObjectDefineProperty(this, 'reactive', {
          value: proxy
        });
        return proxy;
      },

      get readOnly() {
        const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue); // caching the readOnly proxy after the first time it is accessed

        const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
        registerProxy(proxy, value);
        ObjectDefineProperty(this, 'readOnly', {
          value: proxy
        });
        return proxy;
      }

    };
    objectGraph.set(distortedValue, reactiveState);
    return reactiveState;
  }

}
/** version: 0.26.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function valueDistortion(value) {
  return value;
}

const reactiveMembrane = new ReactiveMembrane({
  valueObserved,
  valueMutated,
  valueDistortion
});

function internalTrackDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);

      if (reactiveOrAnyValue !== vm.cmpFields[key]) {
        vm.cmpFields[key] = reactiveOrAnyValue;
        componentValueMutated(vm, key);
      }
    },

    enumerable: true,
    configurable: true
  };
}
/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const {
  assign: assign$1$1,
  create: create$2,
  defineProperties: defineProperties$1$1,
  defineProperty: defineProperty$1$1,
  freeze: freeze$1$1,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$2,
  getOwnPropertyNames: getOwnPropertyNames$2,
  getPrototypeOf: getPrototypeOf$2,
  hasOwnProperty: hasOwnProperty$2,
  isFrozen: isFrozen$1$1,
  keys: keys$1$1,
  seal: seal$1$1,
  setPrototypeOf: setPrototypeOf$1$1
} = Object;
const {
  filter: ArrayFilter$1$1,
  find: ArrayFind$1$1,
  indexOf: ArrayIndexOf$2,
  join: ArrayJoin$1$1,
  map: ArrayMap$2,
  push: ArrayPush$3,
  reduce: ArrayReduce$1$1,
  reverse: ArrayReverse$1$1,
  slice: ArraySlice$1$1,
  splice: ArraySplice$2,
  unshift: ArrayUnshift$1$1,
  forEach: forEach$1$1
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$1$1,
  replace: StringReplace$1$1,
  slice: StringSlice$1$1,
  toLowerCase: StringToLowerCase$1$1
} = String.prototype;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */


const AriaPropertyNames$1$1 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$2 = create$2(null);
const PropNameToAttrNameMap$2 = create$2(null); // Synthetic creation of all AOM property descriptors for Custom Elements

forEach$1$1.call(AriaPropertyNames$1$1, propName => {
  // Typescript infers the wrong function type for this particular overloaded method:
  // https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = StringToLowerCase$1$1.call(StringReplace$1$1.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$2[attrName] = propName;
  PropNameToAttrNameMap$2[propName] = attrName;
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis

const _globalThis$1$1 = function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }

  let _globalThis;

  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef

    _globalThis = __magic__; // @ts-ignore

    delete Object.prototype.__magic__;
  } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }

  return _globalThis;
}();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/*
 * In IE11, symbols are expensive.
 * Due to the nature of the symbol polyfill. This method abstract the
 * creation of symbols, so we can fallback to string when native symbols
 * are not supported. Note that we can't use typeof since it will fail when transpiling.
 */


const hasNativeSymbolsSupport$1$1 = Symbol('x').toString() === 'Symbol(x)';
const HTML_ATTRIBUTES_TO_PROPERTY$1$1 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$1$1(HTML_ATTRIBUTES_TO_PROPERTY$1$1).forEach(attrName => {});
/** version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (!_globalThis$1$1.lwcRuntimeFlags) {
  Object.defineProperty(_globalThis$1$1, 'lwcRuntimeFlags', {
    value: create$2(null)
  });
}

const runtimeFlags = _globalThis$1$1.lwcRuntimeFlags; // This function is not supported for use within components and is meant for

function createPublicPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);

      if (isBeingConstructed(vm)) {
        {
          logError(`Can’t read the value of property \`${toString$1(key)}\` from the constructor because the owner component hasn’t set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }

        return;
      }

      componentValueObserved(vm, key);
      return vm.cmpProps[key];
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      vm.cmpProps[key] = newValue;
      componentValueMutated(vm, key);
    },

    enumerable: true,
    configurable: true
  };
}

class AccessorReactiveObserver extends ReactiveObserver {
  constructor(vm, set) {
    super(() => {
      if (isFalse$1$1(this.debouncing)) {
        this.debouncing = true;
        addCallbackToNextTick(() => {
          if (isTrue$1$1(this.debouncing)) {
            const {
              value
            } = this;
            const {
              isDirty: dirtyStateBeforeSetterCall,
              component,
              idx
            } = vm;
            set.call(component, value); // de-bouncing after the call to the original setter to prevent
            // infinity loop if the setter itself is mutating things that
            // were accessed during the previous invocation.

            this.debouncing = false;

            if (isTrue$1$1(vm.isDirty) && isFalse$1$1(dirtyStateBeforeSetterCall) && idx > 0) {
              // immediate rehydration due to a setter driven mutation, otherwise
              // the component will get rendered on the second tick, which it is not
              // desirable.
              rerenderVM(vm);
            }
          }
        });
      }
    });
    this.debouncing = false;
  }

  reset(value) {
    super.reset();
    this.debouncing = false;

    if (arguments.length > 0) {
      this.value = value;
    }
  }

}

function createPublicAccessorDescriptor(key, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;

  if (!isFunction$1(get)) {
    {
      assert$1.invariant(isFunction$1(get), `Invalid compiler output for public accessor ${toString$1(key)} decorated with @api`);
    }

    throw new Error();
  }

  return {
    get() {
      {
        // Assert that the this value is an actual Component with an associated VM.
        getAssociatedVM(this);
      }

      return get.call(this);
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }

      if (set) {
        if (runtimeFlags.ENABLE_REACTIVE_SETTER) {
          let ro = vm.oar[key];

          if (isUndefined$1(ro)) {
            ro = vm.oar[key] = new AccessorReactiveObserver(vm, set);
          } // every time we invoke this setter from outside (through this wrapper setter)
          // we should reset the value and then debounce just in case there is a pending
          // invocation the next tick that is not longer relevant since the value is changing
          // from outside.


          ro.reset(newValue);
          ro.observe(() => {
            set.call(this, newValue);
          });
        } else {
          set.call(this, newValue);
        }
      } else {
        assert$1.fail(`Invalid attempt to set a new value for property ${toString$1(key)} of ${vm} that does not has a setter decorated with @api.`);
      }
    },

    enumerable,
    configurable
  };
}

function createObservedFieldPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },

    set(newValue) {
      const vm = getAssociatedVM(this);

      if (newValue !== vm.cmpFields[key]) {
        vm.cmpFields[key] = newValue;
        componentValueMutated(vm, key);
      }
    },

    enumerable: true,
    configurable: true
  };
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


var PropType;

(function (PropType) {
  PropType[PropType["Field"] = 0] = "Field";
  PropType[PropType["Set"] = 1] = "Set";
  PropType[PropType["Get"] = 2] = "Get";
  PropType[PropType["GetSet"] = 3] = "GetSet";
})(PropType || (PropType = {}));

function validateObservedField(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid field ${fieldName} declaration.`);
    }
  }
}

function validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @track ${fieldName} declaration.`);
    }
  }
}

function validateFieldDecoratedWithWire(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @wire(...) ${fieldName} field declaration.`);
    }
  }
}

function validateMethodDecoratedWithWire(Ctor, methodName, descriptor) {
  {
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse$1$1(descriptor.writable)) {
      assert$1.fail(`Compiler Error: Invalid @wire(...) ${methodName} method declaration.`);
    }
  }
}

function validateFieldDecoratedWithApi(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @api ${fieldName} field declaration.`);
    }
  }
}

function validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor) {
  {
    if (isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @api get ${fieldName} accessor declaration.`);
    } else if (isFunction$1(descriptor.set)) {
      assert$1.isTrue(isFunction$1(descriptor.get), `Compiler Error: Missing getter for property ${toString$1(fieldName)} decorated with @api in ${Ctor}. You cannot have a setter without the corresponding getter.`);
    } else if (!isFunction$1(descriptor.get)) {
      assert$1.fail(`Compiler Error: Missing @api get ${fieldName} accessor declaration.`);
    }
  }
}

function validateMethodDecoratedWithApi(Ctor, methodName, descriptor) {
  {
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse$1$1(descriptor.writable)) {
      assert$1.fail(`Compiler Error: Invalid @api ${methodName} method declaration.`);
    }
  }
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by user-land code.
 */


function registerDecorators(Ctor, meta) {
  const proto = Ctor.prototype;
  const {
    publicProps,
    publicMethods,
    wire,
    track,
    fields
  } = meta;
  const apiMethods = create$1(null);
  const apiFields = create$1(null);
  const wiredMethods = create$1(null);
  const wiredFields = create$1(null);
  const observedFields = create$1(null);
  const apiFieldsConfig = create$1(null);
  let descriptor;

  if (!isUndefined$1(publicProps)) {
    for (const fieldName in publicProps) {
      const propConfig = publicProps[fieldName];
      apiFieldsConfig[fieldName] = propConfig.config;
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

      if (propConfig.config > 0) {
        // accessor declaration
        {
          validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor);
        }

        if (isUndefined$1(descriptor)) {
          throw new Error();
        }

        descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
      } else {
        // field declaration
        {
          validateFieldDecoratedWithApi(Ctor, fieldName, descriptor);
        }

        descriptor = createPublicPropertyDescriptor(fieldName);
      }

      apiFields[fieldName] = descriptor;
      defineProperty$1(proto, fieldName, descriptor);
    }
  }

  if (!isUndefined$1(publicMethods)) {
    forEach$1.call(publicMethods, methodName => {
      descriptor = getOwnPropertyDescriptor$1(proto, methodName);

      {
        validateMethodDecoratedWithApi(Ctor, methodName, descriptor);
      }

      if (isUndefined$1(descriptor)) {
        throw new Error();
      }

      apiMethods[methodName] = descriptor;
    });
  }

  if (!isUndefined$1(wire)) {
    for (const fieldOrMethodName in wire) {
      const {
        adapter,
        method,
        config: configCallback,
        dynamic = []
      } = wire[fieldOrMethodName];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);

      if (method === 1) {
        {
          assert$1.isTrue(adapter, `@wire on method "${fieldOrMethodName}": adapter id must be truthy.`);
          validateMethodDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }

        if (isUndefined$1(descriptor)) {
          throw new Error();
        }

        wiredMethods[fieldOrMethodName] = descriptor;
        storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
      } else {
        {
          assert$1.isTrue(adapter, `@wire on field "${fieldOrMethodName}": adapter id must be truthy.`);
          validateFieldDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }

        descriptor = internalWireFieldDecorator(fieldOrMethodName);
        wiredFields[fieldOrMethodName] = descriptor;
        storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
        defineProperty$1(proto, fieldOrMethodName, descriptor);
      }
    }
  }

  if (!isUndefined$1(track)) {
    for (const fieldName in track) {
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

      {
        validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor);
      }

      descriptor = internalTrackDecorator(fieldName);
      defineProperty$1(proto, fieldName, descriptor);
    }
  }

  if (!isUndefined$1(fields)) {
    for (let i = 0, n = fields.length; i < n; i++) {
      const fieldName = fields[i];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);

      {
        validateObservedField(Ctor, fieldName, descriptor);
      }

      observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
    }
  }

  setDecoratorsMeta(Ctor, {
    apiMethods,
    apiFields,
    apiFieldsConfig,
    wiredMethods,
    wiredFields,
    observedFields
  });
  return Ctor;
}

const signedDecoratorToMetaMap = new Map();

function setDecoratorsMeta(Ctor, meta) {
  signedDecoratorToMetaMap.set(Ctor, meta);
}

const defaultMeta = {
  apiMethods: EmptyObject,
  apiFields: EmptyObject,
  apiFieldsConfig: EmptyObject,
  wiredMethods: EmptyObject,
  wiredFields: EmptyObject,
  observedFields: EmptyObject
};

function getDecoratorsMeta(Ctor) {
  const meta = signedDecoratorToMetaMap.get(Ctor);
  return isUndefined$1(meta) ? defaultMeta : meta;
}

const signedTemplateSet = new Set();

function defaultEmptyTemplate() {
  return [];
}

signedTemplateSet.add(defaultEmptyTemplate);

function isTemplateRegistered(tpl) {
  return signedTemplateSet.has(tpl);
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */


function registerTemplate(tpl) {
  signedTemplateSet.add(tpl); // chaining this method as a way to wrap existing
  // assignment of templates easily, without too much transformation

  return tpl;
}
/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker
 * Service and other similar libraries to sanitize vulnerable attributes.
 * This API is subject to change or being removed.
 */


function sanitizeAttribute(tagName, namespaceUri, attrName, attrValue) {
  // locker-service patches this function during runtime to sanitize vulnerable attributes.
  // when ran off-core this function becomes a noop and returns the user authored value.
  return attrValue;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// from the element instance, and get the value or set a new value on the component.
// This means that across different elements, similar names can get the exact same
// descriptor, so we can cache them:


const cachedGetterByKey = create$1(null);
const cachedSetterByKey = create$1(null);

function createGetter(key) {
  let fn = cachedGetterByKey[key];

  if (isUndefined$1(fn)) {
    fn = cachedGetterByKey[key] = function () {
      const vm = getAssociatedVM(this);
      const {
        getHook
      } = vm;
      return getHook(vm.component, key);
    };
  }

  return fn;
}

function createSetter(key) {
  let fn = cachedSetterByKey[key];

  if (isUndefined$1(fn)) {
    fn = cachedSetterByKey[key] = function (newValue) {
      const vm = getAssociatedVM(this);
      const {
        setHook
      } = vm;
      newValue = reactiveMembrane.getReadOnlyProxy(newValue);
      setHook(vm.component, key, newValue);
    };
  }

  return fn;
}

function createMethodCaller(methodName) {
  return function () {
    const vm = getAssociatedVM(this);
    const {
      callHook,
      component
    } = vm;
    const fn = component[methodName];
    return callHook(vm.component, fn, ArraySlice$2.call(arguments));
  };
}

function HTMLBridgeElementFactory(SuperClass, props, methods) {
  let HTMLBridgeElement;
  /**
   * Modern browsers will have all Native Constructors as regular Classes
   * and must be instantiated with the new keyword. In older browsers,
   * specifically IE11, those are objects with a prototype property defined,
   * since they are not supposed to be extended or instantiated with the
   * new keyword. This forking logic supports both cases, specifically because
   * wc.ts relies on the construction path of the bridges to create new
   * fully qualifying web components.
   */

  if (isFunction$1(SuperClass)) {
    HTMLBridgeElement = class extends SuperClass {};
  } else {
    HTMLBridgeElement = function () {
      // Bridge classes are not supposed to be instantiated directly in
      // browsers that do not support web components.
      throw new TypeError('Illegal constructor');
    }; // prototype inheritance dance


    setPrototypeOf$1(HTMLBridgeElement, SuperClass);
    setPrototypeOf$1(HTMLBridgeElement.prototype, SuperClass.prototype);
    defineProperty$1(HTMLBridgeElement.prototype, 'constructor', {
      writable: true,
      configurable: true,
      value: HTMLBridgeElement
    });
  }

  const descriptors = create$1(null); // expose getters and setters for each public props on the new Element Bridge

  for (let i = 0, len = props.length; i < len; i += 1) {
    const propName = props[i];
    descriptors[propName] = {
      get: createGetter(propName),
      set: createSetter(propName),
      enumerable: true,
      configurable: true
    };
  } // expose public methods as props on the new Element Bridge


  for (let i = 0, len = methods.length; i < len; i += 1) {
    const methodName = methods[i];
    descriptors[methodName] = {
      value: createMethodCaller(methodName),
      writable: true,
      configurable: true
    };
  }

  defineProperties$1(HTMLBridgeElement.prototype, descriptors);
  return HTMLBridgeElement;
}

const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor, getOwnPropertyNames$1(HTMLElementOriginalDescriptors), []);
freeze$1(BaseBridgeElement);
seal$1(BaseBridgeElement.prototype);
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function resolveCircularModuleDependency(fn) {
  return fn();
}

function isCircularModuleDependency(obj) {
  return isFunction$1(obj) && hasOwnProperty$1.call(obj, '__circular__');
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const CtorToDefMap = new WeakMap();

function getCtorProto(Ctor) {
  let proto = getPrototypeOf$1(Ctor);

  if (isNull$1(proto)) {
    throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
  } // covering the cases where the ref is circular in AMD


  if (isCircularModuleDependency(proto)) {
    const p = resolveCircularModuleDependency(proto);

    {
      if (isNull$1(p)) {
        throw new ReferenceError(`Circular module dependency for ${Ctor.name}, must resolve to a constructor that extends LightningElement.`);
      }
    } // escape hatch for Locker and other abstractions to provide their own base class instead
    // of our Base class without having to leak it to user-land. If the circular function returns
    // itself, that's the signal that we have hit the end of the proto chain, which must always
    // be base.


    proto = p === proto ? BaseLightningElement : p;
  }

  return proto;
}

function createComponentDef(Ctor) {
  {
    const ctorName = Ctor.name; // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
    // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);

    assert$1.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);
  }

  const decoratorsMeta = getDecoratorsMeta(Ctor);
  const {
    apiFields,
    apiFieldsConfig,
    apiMethods,
    wiredFields,
    wiredMethods,
    observedFields
  } = decoratorsMeta;
  const proto = Ctor.prototype;
  let {
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  } = proto;
  const superProto = getCtorProto(Ctor);
  const superDef = superProto !== BaseLightningElement ? getComponentInternalDef(superProto) : lightingElementDef;
  const bridge = HTMLBridgeElementFactory(superDef.bridge, keys$1(apiFields), keys$1(apiMethods));
  const props = assign$1(create$1(null), superDef.props, apiFields);
  const propsConfig = assign$1(create$1(null), superDef.propsConfig, apiFieldsConfig);
  const methods = assign$1(create$1(null), superDef.methods, apiMethods);
  const wire = assign$1(create$1(null), superDef.wire, wiredFields, wiredMethods);
  connectedCallback = connectedCallback || superDef.connectedCallback;
  disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
  renderedCallback = renderedCallback || superDef.renderedCallback;
  errorCallback = errorCallback || superDef.errorCallback;
  render = render || superDef.render;
  const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
  const name = Ctor.name || superDef.name; // installing observed fields into the prototype.

  defineProperties$1(proto, observedFields);
  const def = {
    ctor: Ctor,
    name,
    wire,
    props,
    propsConfig,
    methods,
    bridge,
    template,
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  };

  {
    freeze$1(Ctor.prototype);
  }

  return def;
}
/**
 * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
 * subject to change or being removed.
 */


function isComponentConstructor(ctor) {
  if (!isFunction$1(ctor)) {
    return false;
  } // Fast path: LightningElement is part of the prototype chain of the constructor.


  if (ctor.prototype instanceof BaseLightningElement) {
    return true;
  } // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
  // climb up the constructor prototype chain to check in case there are circular dependencies
  // to resolve.


  let current = ctor;

  do {
    if (isCircularModuleDependency(current)) {
      const circularResolved = resolveCircularModuleDependency(current); // If the circular function returns itself, that's the signal that we have hit the end
      // of the proto chain, which must always be a valid base constructor.

      if (circularResolved === current) {
        return true;
      }

      current = circularResolved;
    }

    if (current === BaseLightningElement) {
      return true;
    }
  } while (!isNull$1(current) && (current = getPrototypeOf$1(current))); // Finally return false if the LightningElement is not part of the prototype chain.


  return false;
}

function getComponentInternalDef(Ctor) {
  let def = CtorToDefMap.get(Ctor);

  if (isUndefined$1(def)) {
    if (isCircularModuleDependency(Ctor)) {
      const resolvedCtor = resolveCircularModuleDependency(Ctor);
      def = getComponentInternalDef(resolvedCtor); // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
      // look up the definition in cache instead of re-resolving and recreating the def.

      CtorToDefMap.set(Ctor, def);
      return def;
    }

    if (!isComponentConstructor(Ctor)) {
      throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
    }

    def = createComponentDef(Ctor);
    CtorToDefMap.set(Ctor, def);
  }

  return def;
}
/** Set prototype for public methods and properties on the element. No DOM Patching occurs here. */


function setElementProto(elm, def) {
  setPrototypeOf$1(elm, def.bridge.prototype);
}

const lightingElementDef = {
  ctor: BaseLightningElement,
  name: BaseLightningElement.name,
  props: lightningBasedDescriptors,
  propsConfig: EmptyObject,
  methods: EmptyObject,
  wire: EmptyObject,
  bridge: BaseBridgeElement,
  template: defaultEmptyTemplate,
  render: BaseLightningElement.prototype.render
};
var PropDefType;

(function (PropDefType) {
  PropDefType["any"] = "any";
})(PropDefType || (PropDefType = {}));
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const noop = () => void 0;

function observeElementChildNodes(elm) {
  elm.$domManual$ = true;
}

function setElementShadowToken(elm, token) {
  elm.$shadowToken$ = token;
}

function updateNodeHook(oldVnode, vnode) {
  const {
    elm,
    text,
    owner: {
      renderer
    }
  } = vnode;

  if (oldVnode.text !== text) {
    {
      unlockDomMutation();
    }

    renderer.setText(elm, text);

    {
      lockDomMutation();
    }
  }
}

function insertNodeHook(vnode, parentNode, referenceNode) {
  const {
    renderer
  } = vnode.owner;

  {
    unlockDomMutation();
  }

  renderer.insert(vnode.elm, parentNode, referenceNode);

  {
    lockDomMutation();
  }
}

function removeNodeHook(vnode, parentNode) {
  const {
    renderer
  } = vnode.owner;

  {
    unlockDomMutation();
  }

  renderer.remove(vnode.elm, parentNode);

  {
    lockDomMutation();
  }
}

function createElmHook(vnode) {
  modEvents.create(vnode); // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.

  modAttrs.create(vnode);
  modProps.create(vnode);
  modStaticClassName.create(vnode);
  modStaticStyle.create(vnode);
  modComputedClassName.create(vnode);
  modComputedStyle.create(vnode);
}

var LWCDOMMode;

(function (LWCDOMMode) {
  LWCDOMMode["manual"] = "manual";
})(LWCDOMMode || (LWCDOMMode = {}));

function fallbackElmHook(elm, vnode) {
  const {
    owner
  } = vnode;

  if (isTrue$1$1(owner.renderer.syntheticShadow)) {
    const {
      data: {
        context
      }
    } = vnode;
    const {
      shadowAttribute
    } = owner.context;

    if (!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === LWCDOMMode.manual) {
      // this element will now accept any manual content inserted into it
      observeElementChildNodes(elm);
    } // when running in synthetic shadow mode, we need to set the shadowToken value
    // into each element from the template, so they can be styled accordingly.


    setElementShadowToken(elm, shadowAttribute);
  }

  {
    const {
      data: {
        context
      }
    } = vnode;
    const isPortal = !isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === LWCDOMMode.manual;
    patchElementWithRestrictions(elm, {
      isPortal
    });
  }
}

function updateElmHook(oldVnode, vnode) {
  // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.
  modAttrs.update(oldVnode, vnode);
  modProps.update(oldVnode, vnode);
  modComputedClassName.update(oldVnode, vnode);
  modComputedStyle.update(oldVnode, vnode);
}

function insertCustomElmHook(vnode) {
  const vm = getAssociatedVM(vnode.elm);
  appendVM(vm);
}

function updateChildrenHook(oldVnode, vnode) {
  const {
    children,
    owner
  } = vnode;
  const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
  runWithBoundaryProtection(owner, owner.owner, noop, () => {
    fn(vnode.elm, oldVnode.children, children);
  }, noop);
}

function allocateChildrenHook(vnode) {
  const vm = getAssociatedVM(vnode.elm); // A component with slots will re-render because:
  // 1- There is a change of the internal state.
  // 2- There is a change on the external api (ex: slots)
  //
  // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
  // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
  // in a reused VCustomElement, there won't be any slotted children.
  // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
  //
  // In case #2, we will always get a fresh VCustomElement.

  const children = vnode.aChildren || vnode.children;
  vm.aChildren = children;

  if (isTrue$1$1(vm.renderer.syntheticShadow)) {
    // slow path
    allocateInSlot(vm, children); // save the allocated children in case this vnode is reused.

    vnode.aChildren = children; // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

    vnode.children = EmptyArray;
  }
}

function createViewModelHook(elm, vnode) {
  if (!isUndefined$1(getAssociatedVMIfPresent(elm))) {
    // There is a possibility that a custom element is registered under tagName,
    // in which case, the initialization is already carry on, and there is nothing else
    // to do here since this hook is called right after invoking `document.createElement`.
    return;
  }

  const {
    sel,
    mode,
    ctor,
    owner
  } = vnode;
  const def = getComponentInternalDef(ctor);
  setElementProto(elm, def);

  if (isTrue$1$1(owner.renderer.syntheticShadow)) {
    const {
      shadowAttribute
    } = owner.context; // when running in synthetic shadow mode, we need to set the shadowToken value
    // into each element from the template, so they can be styled accordingly.

    setElementShadowToken(elm, shadowAttribute);
  }

  createVM(elm, def, {
    mode,
    owner,
    tagName: sel,
    renderer: owner.renderer
  });

  {
    assert$1.isTrue(isArray$2(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
  }
}

function createCustomElmHook(vnode) {
  modEvents.create(vnode); // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.

  modAttrs.create(vnode);
  modProps.create(vnode);
  modStaticClassName.create(vnode);
  modStaticStyle.create(vnode);
  modComputedClassName.create(vnode);
  modComputedStyle.create(vnode);
}

function createChildrenHook(vnode) {
  const {
    elm,
    children
  } = vnode;

  for (let j = 0; j < children.length; ++j) {
    const ch = children[j];

    if (ch != null) {
      ch.hook.create(ch);
      ch.hook.insert(ch, elm, null);
    }
  }
}

function rerenderCustomElmHook(vnode) {
  const vm = getAssociatedVM(vnode.elm);

  {
    assert$1.isTrue(isArray$2(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
  }

  rerenderVM(vm);
}

function updateCustomElmHook(oldVnode, vnode) {
  // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.
  modAttrs.update(oldVnode, vnode);
  modProps.update(oldVnode, vnode);
  modComputedClassName.update(oldVnode, vnode);
  modComputedStyle.update(oldVnode, vnode);
}

function removeElmHook(vnode) {
  // this method only needs to search on child vnodes from template
  // to trigger the remove hook just in case some of those children
  // are custom elements.
  const {
    children,
    elm
  } = vnode;

  for (let j = 0, len = children.length; j < len; ++j) {
    const ch = children[j];

    if (!isNull$1(ch)) {
      ch.hook.remove(ch, elm);
    }
  }
}

function removeCustomElmHook(vnode) {
  // for custom elements we don't have to go recursively because the removeVM routine
  // will take care of disconnecting any child VM attached to its shadow as well.
  removeVM(getAssociatedVM(vnode.elm));
} // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
// in a template, and will require a more complex diffing algo.

function markAsDynamicChildren(children) {
  FromIteration.set(children, 1);
}

function hasDynamicChildren(children) {
  return FromIteration.has(children);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const CHAR_S = 115;
const CHAR_V = 118;
const CHAR_G = 103;
const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
const SymbolIterator = Symbol.iterator;
const TextHook = {
  create: vnode => {
    const {
      renderer
    } = vnode.owner;
    const elm = renderer.createText(vnode.text);
    linkNodeToShadow(elm, vnode);
    vnode.elm = elm;
  },
  update: updateNodeHook,
  insert: insertNodeHook,
  move: insertNodeHook,
  remove: removeNodeHook
}; // insert is called after update, which is used somewhere else (via a module)
// to mark the vm as inserted, that means we cannot use update as the main channel
// to rehydrate when dirty, because sometimes the element is not inserted just yet,
// which breaks some invariants. For that reason, we have the following for any
// Custom Element that is inserted via a template.

const ElementHook = {
  create: vnode => {
    const {
      sel,
      data: {
        ns
      },
      owner: {
        renderer
      }
    } = vnode;
    const elm = renderer.createElement(sel, ns);
    linkNodeToShadow(elm, vnode);
    fallbackElmHook(elm, vnode);
    vnode.elm = elm;
    createElmHook(vnode);
  },
  update: (oldVnode, vnode) => {
    updateElmHook(oldVnode, vnode);
    updateChildrenHook(oldVnode, vnode);
  },
  insert: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
    createChildrenHook(vnode);
  },
  move: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
  },
  remove: (vnode, parentNode) => {
    removeNodeHook(vnode, parentNode);
    removeElmHook(vnode);
  }
};
const CustomElementHook = {
  create: vnode => {
    const {
      sel,
      owner: {
        renderer
      }
    } = vnode;
    const elm = renderer.createElement(sel);
    linkNodeToShadow(elm, vnode);
    createViewModelHook(elm, vnode);
    vnode.elm = elm;
    allocateChildrenHook(vnode);
    createCustomElmHook(vnode);
  },
  update: (oldVnode, vnode) => {
    updateCustomElmHook(oldVnode, vnode); // in fallback mode, the allocation will always set children to
    // empty and delegate the real allocation to the slot elements

    allocateChildrenHook(vnode); // in fallback mode, the children will be always empty, so, nothing
    // will happen, but in native, it does allocate the light dom

    updateChildrenHook(oldVnode, vnode); // this will update the shadowRoot

    rerenderCustomElmHook(vnode);
  },
  insert: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
    const vm = getAssociatedVM(vnode.elm);

    {
      assert$1.isTrue(vm.state === VMState.created, `${vm} cannot be recycled.`);
    }

    runConnectedCallback(vm);
    createChildrenHook(vnode);
    insertCustomElmHook(vnode);
  },
  move: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
  },
  remove: (vnode, parentNode) => {
    removeNodeHook(vnode, parentNode);
    removeCustomElmHook(vnode);
  }
};

function linkNodeToShadow(elm, vnode) {
  // TODO [#1164]: this should eventually be done by the polyfill directly
  elm.$shadowResolver$ = vnode.owner.cmpRoot.$shadowResolver$;
} // TODO [#1136]: this should be done by the compiler, adding ns to every sub-element


function addNS(vnode) {
  const {
    data,
    children,
    sel
  } = vnode;
  data.ns = NamespaceAttributeForSVG; // TODO [#1275]: review why `sel` equal `foreignObject` should get this `ns`

  if (isArray$2(children) && sel !== 'foreignObject') {
    for (let j = 0, n = children.length; j < n; ++j) {
      const childNode = children[j];

      if (childNode != null && childNode.hook === ElementHook) {
        addNS(childNode);
      }
    }
  }
}

function addVNodeToChildLWC(vnode) {
  ArrayPush$1.call(getVMBeingRendered().velements, vnode);
} // [h]tml node


function h(sel, data, children) {
  const vmBeingRendered = getVMBeingRendered();

  {
    assert$1.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
    assert$1.isTrue(isObject$2(data), `h() 2nd argument data must be an object.`);
    assert$1.isTrue(isArray$2(children), `h() 3rd argument children must be an array.`);
    assert$1.isTrue('key' in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`); // checking reserved internal data properties

    assert$1.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert$1.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }

    forEach$1.call(children, childVnode => {
      if (childVnode != null) {
        assert$1.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
      }
    });
  }

  const {
    key
  } = data;
  let text, elm;
  const vnode = {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: ElementHook,
    owner: vmBeingRendered
  };

  if (sel.length === 3 && StringCharCodeAt$1.call(sel, 0) === CHAR_S && StringCharCodeAt$1.call(sel, 1) === CHAR_V && StringCharCodeAt$1.call(sel, 2) === CHAR_G) {
    addNS(vnode);
  }

  return vnode;
} // [t]ab[i]ndex function


function ti(value) {
  // if value is greater than 0, we normalize to 0
  // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
  // If value is less than -1, we don't care
  const shouldNormalize = value > 0 && !(isTrue$1$1(value) || isFalse$1$1(value));

  {
    const vmBeingRendered = getVMBeingRendered();

    if (shouldNormalize) {
      logError(`Invalid tabindex value \`${toString$1(value)}\` in template for ${vmBeingRendered}. This attribute must be set to 0 or -1.`, vmBeingRendered);
    }
  }

  return shouldNormalize ? 0 : value;
} // [s]lot element node


function s(slotName, data, children, slotset) {
  {
    assert$1.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
    assert$1.isTrue(isObject$2(data), `s() 2nd argument data must be an object.`);
    assert$1.isTrue(isArray$2(children), `h() 3rd argument children must be an array.`);
  }

  if (!isUndefined$1(slotset) && !isUndefined$1(slotset[slotName]) && slotset[slotName].length !== 0) {
    children = slotset[slotName];
  }

  const vnode = h('slot', data, children);

  if (vnode.owner.renderer.syntheticShadow) {
    // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
    sc(children);
  }

  return vnode;
} // [c]ustom element node


function c(sel, Ctor, data, children = EmptyArray) {
  const vmBeingRendered = getVMBeingRendered();

  {
    assert$1.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
    assert$1.isTrue(isFunction$1(Ctor), `c() 2nd argument Ctor must be a function.`);
    assert$1.isTrue(isObject$2(data), `c() 3nd argument data must be an object.`);
    assert$1.isTrue(arguments.length === 3 || isArray$2(children), `c() 4nd argument data must be an array.`); // checking reserved internal data properties

    assert$1.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert$1.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }

    if (arguments.length === 4) {
      forEach$1.call(children, childVnode => {
        if (childVnode != null) {
          assert$1.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
        }
      });
    }
  }

  const {
    key
  } = data;
  let text, elm;
  const vnode = {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: CustomElementHook,
    ctor: Ctor,
    owner: vmBeingRendered,
    mode: 'open'
  };
  addVNodeToChildLWC(vnode);
  return vnode;
} // [i]terable node


function i(iterable, factory) {
  const list = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

  sc(list);
  const vmBeingRendered = getVMBeingRendered();

  if (isUndefined$1(iterable) || iterable === null) {
    {
      logError(`Invalid template iteration for value "${toString$1(iterable)}" in ${vmBeingRendered}. It must be an Array or an iterable Object.`, vmBeingRendered);
    }

    return list;
  }

  {
    assert$1.isFalse(isUndefined$1(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString$1(iterable)}\` in ${vmBeingRendered}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
  }

  const iterator = iterable[SymbolIterator]();

  {
    assert$1.isTrue(iterator && isFunction$1(iterator.next), `Invalid iterator function for "${toString$1(iterable)}" in ${vmBeingRendered}.`);
  }

  let next = iterator.next();
  let j = 0;
  let {
    value,
    done: last
  } = next;
  let keyMap;
  let iterationError;

  {
    keyMap = create$1(null);
  }

  while (last === false) {
    // implementing a look-back-approach because we need to know if the element is the last
    next = iterator.next();
    last = next.done; // template factory logic based on the previous collected value

    const vnode = factory(value, j, j === 0, last);

    if (isArray$2(vnode)) {
      ArrayPush$1.apply(list, vnode);
    } else {
      ArrayPush$1.call(list, vnode);
    }

    {
      const vnodes = isArray$2(vnode) ? vnode : [vnode];
      forEach$1.call(vnodes, childVnode => {
        if (!isNull$1(childVnode) && isObject$2(childVnode) && !isUndefined$1(childVnode.sel)) {
          const {
            key
          } = childVnode;

          if (isString(key) || isNumber(key)) {
            if (keyMap[key] === 1 && isUndefined$1(iterationError)) {
              iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. A key with value "${childVnode.key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
            }

            keyMap[key] = 1;
          } else if (isUndefined$1(iterationError)) {
            iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Set a unique "key" value on all iterated child elements.`;
          }
        }
      });
    } // preparing next value


    j += 1;
    value = next.value;
  }

  {
    if (!isUndefined$1(iterationError)) {
      logError(iterationError, vmBeingRendered);
    }
  }

  return list;
}
/**
 * [f]lattening
 */


function f(items) {
  {
    assert$1.isTrue(isArray$2(items), 'flattening api can only work with arrays.');
  }

  const len = items.length;
  const flattened = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

  sc(flattened);

  for (let j = 0; j < len; j += 1) {
    const item = items[j];

    if (isArray$2(item)) {
      ArrayPush$1.apply(flattened, item);
    } else {
      ArrayPush$1.call(flattened, item);
    }
  }

  return flattened;
} // [t]ext node


function t(text) {
  const data = EmptyObject;
  let sel, children, key, elm;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: TextHook,
    owner: getVMBeingRendered()
  };
} // [d]ynamic value to produce a text vnode


function d(value) {
  if (value == null) {
    return null;
  }

  return t(value);
} // [b]ind function


function b(fn) {
  const vmBeingRendered = getVMBeingRendered();

  if (isNull$1(vmBeingRendered)) {
    throw new Error();
  }

  const vm = vmBeingRendered;
  return function (event) {
    invokeEventListener(vm, fn, vm.component, event);
  };
} // [k]ey function


function k(compilerKey, obj) {
  switch (typeof obj) {
    case 'number':
    case 'string':
      return compilerKey + ':' + obj;

    case 'object':
      {
        assert$1.fail(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
      }

  }
} // [g]lobal [id] function


function gid(id) {
  const vmBeingRendered = getVMBeingRendered();

  if (isUndefined$1(id) || id === '') {
    {
      logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered);
    }

    return id;
  } // We remove attributes when they are assigned a value of null


  if (isNull$1(id)) {
    return null;
  }

  return `${id}-${vmBeingRendered.idx}`;
} // [f]ragment [id] function


function fid(url) {
  const vmBeingRendered = getVMBeingRendered();

  if (isUndefined$1(url) || url === '') {
    {
      if (isUndefined$1(url)) {
        logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered);
      }
    }

    return url;
  } // We remove attributes when they are assigned a value of null


  if (isNull$1(url)) {
    return null;
  } // Apply transformation only for fragment-only-urls


  if (/^#/.test(url)) {
    return `${url}-${vmBeingRendered.idx}`;
  }

  return url;
}
/**
 * Map to store an index value assigned to any dynamic component reference ingested
 * by dc() api. This allows us to generate a unique unique per template per dynamic
 * component reference to avoid diffing algo mismatches.
 */


const DynamicImportedComponentMap = new Map();
let dynamicImportedComponentCounter = 0;
/**
 * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
 */

function dc(sel, Ctor, data, children) {
  {
    assert$1.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
    assert$1.isTrue(isObject$2(data), `dc() 3nd argument data must be an object.`);
    assert$1.isTrue(arguments.length === 3 || isArray$2(children), `dc() 4nd argument data must be an array.`);
  } // null or undefined values should produce a null value in the VNodes


  if (Ctor == null) {
    return null;
  }

  if (!isComponentConstructor(Ctor)) {
    throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
  }

  let idx = DynamicImportedComponentMap.get(Ctor);

  if (isUndefined$1(idx)) {
    idx = dynamicImportedComponentCounter++;
    DynamicImportedComponentMap.set(Ctor, idx);
  } // the new vnode key is a mix of idx and compiler key, this is required by the diffing algo
  // to identify different constructors as vnodes with different keys to avoid reusing the
  // element used for previous constructors.


  data.key = `dc:${idx}:${data.key}`;
  return c(sel, Ctor, data, children);
}
/**
 * slow children collection marking mechanism. this API allows the compiler to signal
 * to the engine that a particular collection of children must be diffed using the slow
 * algo based on keys due to the nature of the list. E.g.:
 *
 *   - slot element's children: the content of the slot has to be dynamic when in synthetic
 *                              shadow mode because the `vnode.children` might be the slotted
 *                              content vs default content, in which case the size and the
 *                              keys are not matching.
 *   - children that contain dynamic components
 *   - children that are produced by iteration
 *
 */


function sc(vnodes) {
  {
    assert$1.isTrue(isArray$2(vnodes), 'sc() api can only work with arrays.');
  } // We have to mark the vnodes collection as dynamic so we can later on
  // choose to use the snabbdom virtual dom diffing algo instead of our
  // static dummy algo.


  markAsDynamicChildren(vnodes);
  return vnodes;
}

var api$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  h: h,
  ti: ti,
  s: s,
  c: c,
  i: i,
  f: f,
  t: t,
  d: d,
  b: b,
  k: k,
  gid: gid,
  fid: fid,
  dc: dc,
  sc: sc
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function createShadowStyleVNode(content) {
  return h('style', {
    key: 'style',
    attrs: {
      type: 'text/css'
    }
  }, [t(content)]);
}

function updateSyntheticShadowAttributes(vm, template) {
  const {
    elm,
    context,
    renderer
  } = vm;
  const {
    stylesheets: newStylesheets,
    stylesheetTokens: newStylesheetTokens
  } = template;
  let newHostAttribute;
  let newShadowAttribute; // Reset the styling token applied to the host element.

  const oldHostAttribute = context.hostAttribute;

  if (!isUndefined$1(oldHostAttribute)) {
    renderer.removeAttribute(elm, oldHostAttribute);
  } // Apply the new template styling token to the host element, if the new template has any
  // associated stylesheets.


  if (!isUndefined$1(newStylesheetTokens) && !isUndefined$1(newStylesheets) && newStylesheets.length !== 0) {
    newHostAttribute = newStylesheetTokens.hostAttribute;
    newShadowAttribute = newStylesheetTokens.shadowAttribute;
    renderer.setAttribute(elm, newHostAttribute, '');
  } // Update the styling tokens present on the context object.


  context.hostAttribute = newHostAttribute;
  context.shadowAttribute = newShadowAttribute;
}

function evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, nativeShadow) {
  const content = [];

  for (let i = 0; i < stylesheets.length; i++) {
    const stylesheet = stylesheets[i];

    if (isArray$2(stylesheet)) {
      ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, hostSelector, shadowSelector, nativeShadow));
    } else {
      ArrayPush$1.call(content, stylesheet(hostSelector, shadowSelector, nativeShadow));
    }
  }

  return content;
}

function getStylesheetsContent(vm, template) {
  const {
    stylesheets,
    stylesheetTokens: tokens
  } = template;
  const {
    syntheticShadow
  } = vm.renderer;
  let content = [];

  if (!isUndefined$1(stylesheets) && !isUndefined$1(tokens)) {
    const hostSelector = syntheticShadow ? `[${tokens.hostAttribute}]` : '';
    const shadowSelector = syntheticShadow ? `[${tokens.shadowAttribute}]` : '';
    content = evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, !syntheticShadow);
  }

  return content;
}

function createStylesheet(vm, stylesheets) {
  const {
    renderer
  } = vm;

  if (renderer.syntheticShadow) {
    for (let i = 0; i < stylesheets.length; i++) {
      renderer.insertGlobalStylesheet(stylesheets[i]);
    }

    return null;
  } else {
    const shadowStyleSheetContent = ArrayJoin$1.call(stylesheets, '\n');
    return createShadowStyleVNode(shadowStyleSheetContent);
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


var GlobalMeasurementPhase;

(function (GlobalMeasurementPhase) {
  GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
  GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
})(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
// JSDom (used in Jest) for example doesn't implement the UserTiming APIs.


const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

function getMarkName(phase, vm) {
  // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
  // the right measures for components that are recursive.
  return `${getComponentTag(vm)} - ${phase} - ${vm.idx}`;
}

function getMeasureName(phase, vm) {
  return `${getComponentTag(vm)} - ${phase}`;
}

function start(markName) {
  performance.mark(markName);
}

function end(measureName, markName) {
  performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
  // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

  performance.clearMarks(markName);
  performance.clearMarks(measureName);
}

function noop$1() {
  /* do nothing */
}

const startMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = getMarkName(phase, vm);
  start(markName);
};
const endMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = getMarkName(phase, vm);
  const measureName = getMeasureName(phase, vm);
  end(measureName, markName);
};
const startGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
  start(markName);
};
const endGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
  end(phase, markName);
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

let isUpdatingTemplate = false;
let vmBeingRendered = null;

function getVMBeingRendered() {
  return vmBeingRendered;
}

function setVMBeingRendered(vm) {
  vmBeingRendered = vm;
}

function validateSlots(vm, html) {

  const {
    cmpSlots
  } = vm;
  const {
    slots = EmptyArray
  } = html;

  for (const slotName in cmpSlots) {
    // eslint-disable-next-line lwc-internal/no-production-assert
    assert$1.isTrue(isArray$2(cmpSlots[slotName]), `Slots can only be set to an array, instead received ${toString$1(cmpSlots[slotName])} for slot "${slotName}" in ${vm}.`);

    if (slotName !== '' && ArrayIndexOf$1.call(slots, slotName) === -1) {
      // TODO [#1297]: this should never really happen because the compiler should always validate
      // eslint-disable-next-line lwc-internal/no-production-assert
      logError(`Ignoring unknown provided slot name "${slotName}" in ${vm}. Check for a typo on the slot attribute.`, vm);
    }
  }
}

function evaluateTemplate(vm, html) {
  {
    assert$1.isTrue(isFunction$1(html), `evaluateTemplate() second argument must be an imported template instead of ${toString$1(html)}`);
  }

  const isUpdatingTemplateInception = isUpdatingTemplate;
  const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
  let vnodes = [];
  runWithBoundaryProtection(vm, vm.owner, () => {
    // pre
    vmBeingRendered = vm;

    {
      startMeasure('render', vm);
    }
  }, () => {
    // job
    const {
      component,
      context,
      cmpSlots,
      cmpTemplate,
      tro,
      renderer
    } = vm;
    tro.observe(() => {
      // Reset the cache memoizer for template when needed.
      if (html !== cmpTemplate) {
        // Perf opt: do not reset the shadow root during the first rendering (there is
        // nothing to reset).
        if (!isNull$1(cmpTemplate)) {
          // It is important to reset the content to avoid reusing similar elements
          // generated from a different template, because they could have similar IDs,
          // and snabbdom just rely on the IDs.
          resetShadowRoot(vm);
        } // Check that the template was built by the compiler.


        if (!isTemplateRegistered(html)) {
          throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
        }

        vm.cmpTemplate = html; // Create a brand new template cache for the swapped templated.

        context.tplCache = create$1(null); // Update the synthetic shadow attributes on the host element if necessary.

        if (renderer.syntheticShadow) {
          updateSyntheticShadowAttributes(vm, html);
        } // Evaluate, create stylesheet and cache the produced VNode for future
        // re-rendering.


        const stylesheetsContent = getStylesheetsContent(vm, html);
        context.styleVNode = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
      }

      if (undefined !== 'production') {
        // validating slots in every rendering since the allocated content might change over time
        validateSlots(vm, html);
      } // right before producing the vnodes, we clear up all internal references
      // to custom elements from the template.


      vm.velements = []; // Set the global flag that template is being updated

      isUpdatingTemplate = true;
      vnodes = html.call(undefined, api$1, component, cmpSlots, context.tplCache);
      const {
        styleVNode
      } = context;

      if (!isNull$1(styleVNode)) {
        ArrayUnshift$2.call(vnodes, styleVNode);
      }
    });
  }, () => {
    // post
    isUpdatingTemplate = isUpdatingTemplateInception;
    vmBeingRendered = vmOfTemplateBeingUpdatedInception;

    {
      endMeasure('render', vm);
    }
  });

  {
    assert$1.invariant(isArray$2(vnodes), `Compiler should produce html functions that always return an array.`);
  }

  return vnodes;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


function addErrorComponentStack(vm, error) {
  if (!isFrozen$1(error) && isUndefined$1(error.wcStack)) {
    const wcStack = getErrorComponentStack(vm);
    defineProperty$1(error, 'wcStack', {
      get() {
        return wcStack;
      }

    });
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


let isInvokingRender = false;
let vmBeingConstructed = null;

function isBeingConstructed(vm) {
  return vmBeingConstructed === vm;
}

const noop$2 = () => void 0;

function invokeComponentCallback(vm, fn, args) {
  const {
    component,
    callHook,
    owner
  } = vm;
  let result;
  runWithBoundaryProtection(vm, owner, noop$2, () => {
    // job
    result = callHook(component, fn, args);
  }, noop$2);
  return result;
}

function invokeComponentConstructor(vm, Ctor) {
  const vmBeingConstructedInception = vmBeingConstructed;
  let error;

  {
    startMeasure('constructor', vm);
  }

  vmBeingConstructed = vm;
  /**
   * Constructors don't need to be wrapped with a boundary because for root elements
   * it should throw, while elements from template are already wrapped by a boundary
   * associated to the diffing algo.
   */

  try {
    // job
    const result = new Ctor(); // Check indirectly if the constructor result is an instance of LightningElement. Using
    // the "instanceof" operator would not work here since Locker Service provides its own
    // implementation of LightningElement, so we indirectly check if the base constructor is
    // invoked by accessing the component on the vm.

    if (vmBeingConstructed.component !== result) {
      throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
    }
  } catch (e) {
    error = Object(e);
  } finally {
    {
      endMeasure('constructor', vm);
    }

    vmBeingConstructed = vmBeingConstructedInception;

    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error); // re-throwing the original error annotated after restoring the context

      throw error; // eslint-disable-line no-unsafe-finally
    }
  }
}

function invokeComponentRenderMethod(vm) {
  const {
    def: {
      render
    },
    callHook,
    component,
    owner
  } = vm;
  const isRenderBeingInvokedInception = isInvokingRender;
  const vmBeingRenderedInception = getVMBeingRendered();
  let html;
  let renderInvocationSuccessful = false;
  runWithBoundaryProtection(vm, owner, () => {
    // pre
    isInvokingRender = true;
    setVMBeingRendered(vm);
  }, () => {
    // job
    vm.tro.observe(() => {
      html = callHook(component, render);
      renderInvocationSuccessful = true;
    });
  }, () => {
    // post
    isInvokingRender = isRenderBeingInvokedInception;
    setVMBeingRendered(vmBeingRenderedInception);
  }); // If render() invocation failed, process errorCallback in boundary and return an empty template

  return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
}

function invokeComponentRenderedCallback(vm) {
  const {
    def: {
      renderedCallback
    },
    component,
    callHook,
    owner
  } = vm;

  if (!isUndefined$1(renderedCallback)) {
    runWithBoundaryProtection(vm, owner, () => {
      {
        startMeasure('renderedCallback', vm);
      }
    }, () => {
      // job
      callHook(component, renderedCallback);
    }, () => {
      // post
      {
        endMeasure('renderedCallback', vm);
      }
    });
  }
}

function invokeEventListener(vm, fn, thisValue, event) {
  const {
    callHook,
    owner
  } = vm;
  runWithBoundaryProtection(vm, owner, noop$2, () => {
    // job
    if (undefined !== 'production') {
      assert$1.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
    }

    callHook(thisValue, fn, [event]);
  }, noop$2);
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const signedTemplateMap = new Map();
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */

function registerComponent(Ctor, {
  tmpl
}) {
  signedTemplateMap.set(Ctor, tmpl); // chaining this method as a way to wrap existing assignment of component constructor easily,
  // without too much transformation

  return Ctor;
}

function getComponentRegisteredTemplate(Ctor) {
  return signedTemplateMap.get(Ctor);
}

function createComponent(vm, Ctor) {
  // create the component instance
  invokeComponentConstructor(vm, Ctor);

  if (isUndefined$1(vm.component)) {
    throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
  }
}

function getTemplateReactiveObserver(vm) {
  return new ReactiveObserver(() => {
    const {
      isDirty
    } = vm;

    if (isFalse$1$1(isDirty)) {
      markComponentAsDirty(vm);
      scheduleRehydration(vm);
    }
  });
}

function renderComponent(vm) {
  {
    assert$1.invariant(vm.isDirty, `${vm} is not dirty.`);
  }

  vm.tro.reset();
  const vnodes = invokeComponentRenderMethod(vm);
  vm.isDirty = false;
  vm.isScheduled = false;

  {
    assert$1.invariant(isArray$2(vnodes), `${vm}.render() should always return an array of vnodes instead of ${vnodes}`);
  }

  return vnodes;
}

function markComponentAsDirty(vm) {
  {
    const vmBeingRendered = getVMBeingRendered();
    assert$1.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
    assert$1.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
    assert$1.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered}.`);
  }

  vm.isDirty = true;
}

const cmpEventListenerMap = new WeakMap();

function getWrappedComponentsListener(vm, listener) {
  if (!isFunction$1(listener)) {
    throw new TypeError(); // avoiding problems with non-valid listeners
  }

  let wrappedListener = cmpEventListenerMap.get(listener);

  if (isUndefined$1(wrappedListener)) {
    wrappedListener = function (event) {
      invokeEventListener(vm, listener, undefined, event);
    };

    cmpEventListenerMap.set(listener, wrappedListener);
  }

  return wrappedListener;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const Services = create$1(null);

function invokeServiceHook(vm, cbs) {
  {
    assert$1.isTrue(isArray$2(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
  }

  const {
    component,
    def,
    context
  } = vm;

  for (let i = 0, len = cbs.length; i < len; ++i) {
    cbs[i].call(undefined, component, {}, def, context);
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


var VMState;

(function (VMState) {
  VMState[VMState["created"] = 0] = "created";
  VMState[VMState["connected"] = 1] = "connected";
  VMState[VMState["disconnected"] = 2] = "disconnected";
})(VMState || (VMState = {}));

let idx = 0;
/** The internal slot used to associate different objects the engine manipulates with the VM */

const ViewModelReflection = createHiddenField$1('ViewModel', 'engine');

function callHook(cmp, fn, args = []) {
  return fn.apply(cmp, args);
}

function setHook(cmp, prop, newValue) {
  cmp[prop] = newValue;
}

function getHook(cmp, prop) {
  return cmp[prop];
}

function rerenderVM(vm) {
  rehydrate(vm);
}

function connectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  startGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm); // Usually means moving the element from one place to another, which is observable via
  // life-cycle hooks.

  if (vm.state === VMState.connected) {
    disconnectRootElement(elm);
  }

  runConnectedCallback(vm);
  rehydrate(vm);
  endGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);
}

function disconnectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  resetComponentStateWhenRemoved(vm);
}

function appendVM(vm) {
  rehydrate(vm);
} // just in case the component comes back, with this we guarantee re-rendering it
// while preventing any attempt to rehydration until after reinsertion.


function resetComponentStateWhenRemoved(vm) {
  const {
    state
  } = vm;

  if (state !== VMState.disconnected) {
    const {
      oar,
      tro
    } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

    tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

    for (const key in oar) {
      oar[key].reset();
    }

    runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

    runShadowChildNodesDisconnectedCallback(vm);
    runLightChildNodesDisconnectedCallback(vm);
  }
} // this method is triggered by the diffing algo only when a vnode from the
// old vnode.children is removed from the DOM.


function removeVM(vm) {
  {
    assert$1.isTrue(vm.state === VMState.connected || vm.state === VMState.disconnected, `${vm} must have been connected.`);
  }

  resetComponentStateWhenRemoved(vm);
}

function createVM(elm, def, options) {
  const {
    mode,
    owner,
    renderer,
    tagName
  } = options;
  const vm = {
    elm,
    def,
    idx: idx++,
    state: VMState.created,
    isScheduled: false,
    isDirty: true,
    tagName,
    mode,
    owner,
    renderer,
    children: EmptyArray,
    aChildren: EmptyArray,
    velements: EmptyArray,
    cmpProps: create$1(null),
    cmpFields: create$1(null),
    cmpSlots: create$1(null),
    oar: create$1(null),
    cmpTemplate: null,
    context: {
      hostAttribute: undefined,
      shadowAttribute: undefined,
      styleVNode: null,
      tplCache: EmptyObject,
      wiredConnecting: EmptyArray,
      wiredDisconnecting: EmptyArray
    },
    tro: null,
    component: null,
    cmpRoot: null,
    callHook,
    setHook,
    getHook
  };
  vm.tro = getTemplateReactiveObserver(vm);

  {
    vm.toString = () => {
      return `[object:vm ${def.name} (${vm.idx})]`;
    };
  } // Create component instance associated to the vm and the element.


  createComponent(vm, def.ctor); // Initializing the wire decorator per instance only when really needed

  if (isFalse$1$1(renderer.ssr) && hasWireAdapters(vm)) {
    installWireAdapters(vm);
  }

  return vm;
}

function assertIsVM(obj) {
  if (isNull$1(obj) || !isObject$2(obj) || !('cmpRoot' in obj)) {
    throw new TypeError(`${obj} is not a VM.`);
  }
}

function associateVM(obj, vm) {
  setHiddenField$1(obj, ViewModelReflection, vm);
}

function getAssociatedVM(obj) {
  const vm = getHiddenField$1(obj, ViewModelReflection);

  {
    assertIsVM(vm);
  }

  return vm;
}

function getAssociatedVMIfPresent(obj) {
  const maybeVm = getHiddenField$1(obj, ViewModelReflection);

  {
    if (!isUndefined$1(maybeVm)) {
      assertIsVM(maybeVm);
    }
  }

  return maybeVm;
}

function rehydrate(vm) {
  if (isTrue$1$1(vm.isDirty)) {
    const children = renderComponent(vm);
    patchShadowRoot(vm, children);
  }
}

function patchShadowRoot(vm, newCh) {
  const {
    cmpRoot,
    children: oldCh
  } = vm; // caching the new children collection

  vm.children = newCh;

  if (newCh.length > 0 || oldCh.length > 0) {
    // patch function mutates vnodes by adding the element reference,
    // however, if patching fails it contains partial changes.
    if (oldCh !== newCh) {
      const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
      runWithBoundaryProtection(vm, vm, () => {
        // pre
        {
          startMeasure('patch', vm);
        }
      }, () => {
        // job
        fn(cmpRoot, oldCh, newCh);
      }, () => {
        // post
        {
          endMeasure('patch', vm);
        }
      });
    }
  }

  if (vm.state === VMState.connected) {
    // If the element is connected, that means connectedCallback was already issued, and
    // any successive rendering should finish with the call to renderedCallback, otherwise
    // the connectedCallback will take care of calling it in the right order at the end of
    // the current rehydration process.
    runRenderedCallback(vm);
  }
}

function runRenderedCallback(vm) {
  if (isTrue$1$1(vm.renderer.ssr)) {
    return;
  }

  const {
    rendered
  } = Services;

  if (rendered) {
    invokeServiceHook(vm, rendered);
  }

  invokeComponentRenderedCallback(vm);
}

let rehydrateQueue = [];

function flushRehydrationQueue() {
  startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);

  {
    assert$1.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
  }

  const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
  rehydrateQueue = []; // reset to a new queue

  for (let i = 0, len = vms.length; i < len; i += 1) {
    const vm = vms[i];

    try {
      rehydrate(vm);
    } catch (error) {
      if (i + 1 < len) {
        // pieces of the queue are still pending to be rehydrated, those should have priority
        if (rehydrateQueue.length === 0) {
          addCallbackToNextTick(flushRehydrationQueue);
        }

        ArrayUnshift$2.apply(rehydrateQueue, ArraySlice$2.call(vms, i + 1));
      } // we need to end the measure before throwing.


      endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // re-throwing the original error will break the current tick, but since the next tick is
      // already scheduled, it should continue patching the rest.

      throw error; // eslint-disable-line no-unsafe-finally
    }
  }

  endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
}

function runConnectedCallback(vm) {
  const {
    state
  } = vm;

  if (state === VMState.connected) {
    return; // nothing to do since it was already connected
  }

  vm.state = VMState.connected; // reporting connection

  const {
    connected
  } = Services;

  if (connected) {
    invokeServiceHook(vm, connected);
  }

  if (hasWireAdapters(vm)) {
    connectWireAdapters(vm);
  }

  const {
    connectedCallback
  } = vm.def;

  if (!isUndefined$1(connectedCallback)) {
    {
      startMeasure('connectedCallback', vm);
    }

    invokeComponentCallback(vm, connectedCallback);

    {
      endMeasure('connectedCallback', vm);
    }
  }
}

function hasWireAdapters(vm) {
  return getOwnPropertyNames$1(vm.def.wire).length > 0;
}

function runDisconnectedCallback(vm) {
  {
    assert$1.isTrue(vm.state !== VMState.disconnected, `${vm} must be inserted.`);
  }

  if (isFalse$1$1(vm.isDirty)) {
    // this guarantees that if the component is reused/reinserted,
    // it will be re-rendered because we are disconnecting the reactivity
    // linking, so mutations are not automatically reflected on the state
    // of disconnected components.
    vm.isDirty = true;
  }

  vm.state = VMState.disconnected; // reporting disconnection

  const {
    disconnected
  } = Services;

  if (disconnected) {
    invokeServiceHook(vm, disconnected);
  }

  if (hasWireAdapters(vm)) {
    disconnectWireAdapters(vm);
  }

  const {
    disconnectedCallback
  } = vm.def;

  if (!isUndefined$1(disconnectedCallback)) {
    {
      startMeasure('disconnectedCallback', vm);
    }

    invokeComponentCallback(vm, disconnectedCallback);

    {
      endMeasure('disconnectedCallback', vm);
    }
  }
}

function runShadowChildNodesDisconnectedCallback(vm) {
  const {
    velements: vCustomElementCollection
  } = vm; // Reporting disconnection for every child in inverse order since they are
  // inserted in reserved order.

  for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
    const {
      elm
    } = vCustomElementCollection[i]; // There are two cases where the element could be undefined:
    // * when there is an error during the construction phase, and an error
    //   boundary picks it, there is a possibility that the VCustomElement
    //   is not properly initialized, and therefore is should be ignored.
    // * when slotted custom element is not used by the element where it is
    //   slotted into it, as  a result, the custom element was never
    //   initialized.

    if (!isUndefined$1(elm)) {
      const childVM = getAssociatedVMIfPresent(elm); // The VM associated with the element might be associated undefined
      // in the case where the VM failed in the middle of its creation,
      // eg: constructor throwing before invoking super().

      if (!isUndefined$1(childVM)) {
        resetComponentStateWhenRemoved(childVM);
      }
    }
  }
}

function runLightChildNodesDisconnectedCallback(vm) {
  const {
    aChildren: adoptedChildren
  } = vm;
  recursivelyDisconnectChildren(adoptedChildren);
}
/**
 * The recursion doesn't need to be a complete traversal of the vnode graph,
 * instead it can be partial, when a custom element vnode is found, we don't
 * need to continue into its children because by attempting to disconnect the
 * custom element itself will trigger the removal of anything slotted or anything
 * defined on its shadow.
 */


function recursivelyDisconnectChildren(vnodes) {
  for (let i = 0, len = vnodes.length; i < len; i += 1) {
    const vnode = vnodes[i];

    if (!isNull$1(vnode) && isArray$2(vnode.children) && !isUndefined$1(vnode.elm)) {
      // vnode is a VElement with children
      if (isUndefined$1(vnode.ctor)) {
        // it is a VElement, just keep looking (recursively)
        recursivelyDisconnectChildren(vnode.children);
      } else {
        // it is a VCustomElement, disconnect it and ignore its children
        resetComponentStateWhenRemoved(getAssociatedVM(vnode.elm));
      }
    }
  }
} // This is a super optimized mechanism to remove the content of the shadowRoot without having to go
// into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
// children VNodes might not be representing the current state of the DOM.


function resetShadowRoot(vm) {
  const {
    children,
    cmpRoot,
    renderer
  } = vm;

  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];

    if (!isNull$1(child) && !isUndefined$1(child.elm)) {
      renderer.remove(child.elm, cmpRoot);
    }
  }

  vm.children = EmptyArray;
  runShadowChildNodesDisconnectedCallback(vm);
  vm.velements = EmptyArray;
}

function scheduleRehydration(vm) {
  if (isTrue$1$1(vm.renderer.ssr) || isTrue$1$1(vm.isScheduled)) {
    return;
  }

  vm.isScheduled = true;

  if (rehydrateQueue.length === 0) {
    addCallbackToNextTick(flushRehydrationQueue);
  }

  ArrayPush$1.call(rehydrateQueue, vm);
}

function getErrorBoundaryVM(vm) {
  let currentVm = vm;

  while (!isNull$1(currentVm)) {
    if (!isUndefined$1(currentVm.def.errorCallback)) {
      return currentVm;
    }

    currentVm = currentVm.owner;
  }
} // slow path routine
// NOTE: we should probably more this routine to the synthetic shadow folder
// and get the allocation to be cached by in the elm instead of in the VM


function allocateInSlot(vm, children) {
  {
    assert$1.invariant(isObject$2(vm.cmpSlots), `When doing manual allocation, there must be a cmpSlots object available.`);
  }

  const {
    cmpSlots: oldSlots
  } = vm;
  const cmpSlots = vm.cmpSlots = create$1(null);

  for (let i = 0, len = children.length; i < len; i += 1) {
    const vnode = children[i];

    if (isNull$1(vnode)) {
      continue;
    }

    const {
      data
    } = vnode;
    const slotName = data.attrs && data.attrs.slot || '';
    const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
    // which might have similar keys. Each vnode will always have a key that
    // starts with a numeric character from compiler. In this case, we add a unique
    // notation for slotted vnodes keys, e.g.: `@foo:1:1`

    if (!isUndefined$1(vnode.key)) {
      vnode.key = `@${slotName}:${vnode.key}`;
    }

    ArrayPush$1.call(vnodes, vnode);
  }

  if (isFalse$1$1(vm.isDirty)) {
    // We need to determine if the old allocation is really different from the new one
    // and mark the vm as dirty
    const oldKeys = keys$1(oldSlots);

    if (oldKeys.length !== keys$1(cmpSlots).length) {
      markComponentAsDirty(vm);
      return;
    }

    for (let i = 0, len = oldKeys.length; i < len; i += 1) {
      const key = oldKeys[i];

      if (isUndefined$1(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
        markComponentAsDirty(vm);
        return;
      }

      const oldVNodes = oldSlots[key];
      const vnodes = cmpSlots[key];

      for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
        if (oldVNodes[j] !== vnodes[j]) {
          markComponentAsDirty(vm);
          return;
        }
      }
    }
  }
}

function runWithBoundaryProtection(vm, owner, pre, job, post) {
  let error;
  pre();

  try {
    job();
  } catch (e) {
    error = Object(e);
  } finally {
    post();

    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error);
      const errorBoundaryVm = isNull$1(owner) ? undefined : getErrorBoundaryVM(owner);

      if (isUndefined$1(errorBoundaryVm)) {
        throw error; // eslint-disable-line no-unsafe-finally
      }

      resetShadowRoot(vm); // remove offenders

      {
        startMeasure('errorCallback', errorBoundaryVm);
      } // error boundaries must have an ErrorCallback


      const errorCallback = errorBoundaryVm.def.errorCallback;
      invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);

      {
        endMeasure('errorCallback', errorBoundaryVm);
      }
    }
  }
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
const WireMetaMap = new Map();

function noop$3() {}

class WireContextRegistrationEvent extends CustomEvent {
  constructor(adapterToken, {
    setNewContext,
    setDisconnectedCallback
  }) {
    super(adapterToken, {
      bubbles: true,
      composed: true
    });
    defineProperties$1(this, {
      setNewContext: {
        value: setNewContext
      },
      setDisconnectedCallback: {
        value: setDisconnectedCallback
      }
    });
  }

}

function createFieldDataCallback(vm, name) {
  const {
    cmpFields
  } = vm;
  return value => {
    if (value !== vm.cmpFields[name]) {
      // storing the value in the underlying storage
      cmpFields[name] = value;
      componentValueMutated(vm, name);
    }
  };
}

function createMethodDataCallback(vm, method) {
  return value => {
    // dispatching new value into the wired method
    invokeComponentCallback(vm, method, [value]);
  };
}

function createConfigWatcher(vm, wireDef, callbackWhenConfigIsReady) {
  const {
    component
  } = vm;
  const {
    configCallback
  } = wireDef;
  let hasPendingConfig = false; // creating the reactive observer for reactive params when needed

  const ro = new ReactiveObserver(() => {
    if (hasPendingConfig === false) {
      hasPendingConfig = true; // collect new config in the micro-task

      Promise.resolve().then(() => {
        hasPendingConfig = false; // resetting current reactive params

        ro.reset(); // dispatching a new config due to a change in the configuration

        callback();
      });
    }
  });

  const callback = () => {
    let config;
    ro.observe(() => config = configCallback(component)); // eslint-disable-next-line lwc-internal/no-invalid-todo
    // TODO: dev-mode validation of config based on the adapter.configSchema
    // @ts-ignore it is assigned in the observe() callback

    callbackWhenConfigIsReady(config);
  };

  return callback;
}

function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
  const {
    adapter
  } = wireDef;
  const adapterContextToken = getAdapterToken(adapter);

  if (isUndefined$1(adapterContextToken)) {
    return; // no provider found, nothing to be done
  }

  const {
    elm,
    renderer,
    context: {
      wiredConnecting,
      wiredDisconnecting
    }
  } = vm; // waiting for the component to be connected to formally request the context via the token

  ArrayPush$1.call(wiredConnecting, () => {
    // This event is responsible for connecting the host element with another
    // element in the composed path that is providing contextual data. The provider
    // must be listening for a special dom event with the name corresponding to the value of
    // `adapterContextToken`, which will remain secret and internal to this file only to
    // guarantee that the linkage can be forged.
    const contextRegistrationEvent = new WireContextRegistrationEvent(adapterContextToken, {
      setNewContext(newContext) {
        // eslint-disable-next-line lwc-internal/no-invalid-todo
        // TODO: dev-mode validation of config based on the adapter.contextSchema
        callbackWhenContextIsReady(newContext);
      },

      setDisconnectedCallback(disconnectCallback) {
        // adds this callback into the disconnect bucket so it gets disconnected from parent
        // the the element hosting the wire is disconnected
        ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
      }

    });
    renderer.dispatchEvent(elm, contextRegistrationEvent);
  });
}

function createConnector(vm, name, wireDef) {
  const {
    method,
    adapter,
    configCallback,
    dynamic
  } = wireDef;
  const hasDynamicParams = dynamic.length > 0;
  const {
    component
  } = vm;
  const dataCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
  let context;
  let connector; // Workaround to pass the component element associated to this wire adapter instance.

  defineProperty$1(dataCallback, DeprecatedWiredElementHost, {
    value: vm.elm
  });
  defineProperty$1(dataCallback, DeprecatedWiredParamsMeta, {
    value: dynamic
  });
  runWithBoundaryProtection(vm, vm, noop$3, () => {
    // job
    connector = new adapter(dataCallback);
  }, noop$3);

  const updateConnectorConfig = config => {
    // every time the config is recomputed due to tracking,
    // this callback will be invoked with the new computed config
    runWithBoundaryProtection(vm, vm, noop$3, () => {
      // job
      connector.update(config, context);
    }, noop$3);
  }; // Computes the current wire config and calls the update method on the wire adapter.
  // This initial implementation may change depending on the specific wire instance, if it has params, we will need
  // to observe changes in the next tick.


  let computeConfigAndUpdate = () => {
    updateConnectorConfig(configCallback(component));
  };

  if (hasDynamicParams) {
    // This wire has dynamic parameters: we wait for the component instance is created and its values set
    // in order to call the update(config) method.
    Promise.resolve().then(() => {
      computeConfigAndUpdate = createConfigWatcher(vm, wireDef, updateConnectorConfig);
      computeConfigAndUpdate();
    });
  } else {
    computeConfigAndUpdate();
  } // if the adapter needs contextualization, we need to watch for new context and push it alongside the config


  if (!isUndefined$1(adapter.contextSchema)) {
    createContextWatcher(vm, wireDef, newContext => {
      // every time the context is pushed into this component,
      // this callback will be invoked with the new computed context
      if (context !== newContext) {
        context = newContext; // Note: when new context arrives, the config will be recomputed and pushed along side the new
        // context, this is to preserve the identity characteristics, config should not have identity
        // (ever), while context can have identity

        computeConfigAndUpdate();
      }
    });
  } // @ts-ignore the boundary protection executes sync, connector is always defined


  return connector;
}

const AdapterToTokenMap = new Map();

function getAdapterToken(adapter) {
  return AdapterToTokenMap.get(adapter);
}

function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }

  const method = descriptor.value;
  const def = {
    adapter,
    method,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}

function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }

  const def = {
    adapter,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}

function installWireAdapters(vm) {
  const {
    context,
    def: {
      wire
    }
  } = vm;
  const wiredConnecting = context.wiredConnecting = [];
  const wiredDisconnecting = context.wiredDisconnecting = [];

  for (const fieldNameOrMethod in wire) {
    const descriptor = wire[fieldNameOrMethod];
    const wireDef = WireMetaMap.get(descriptor);

    {
      assert$1.invariant(wireDef, `Internal Error: invalid wire definition found.`);
    }

    if (!isUndefined$1(wireDef)) {
      const adapterInstance = createConnector(vm, fieldNameOrMethod, wireDef);
      ArrayPush$1.call(wiredConnecting, () => adapterInstance.connect());
      ArrayPush$1.call(wiredDisconnecting, () => adapterInstance.disconnect());
    }
  }
}

function connectWireAdapters(vm) {
  const {
    wiredConnecting
  } = vm.context;

  for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
    wiredConnecting[i]();
  }
}

function disconnectWireAdapters(vm) {
  const {
    wiredDisconnecting
  } = vm.context;
  runWithBoundaryProtection(vm, vm, noop$3, () => {
    // job
    for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
      wiredDisconnecting[i]();
    }
  }, noop$3);
}
/* version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const globalStylesheets = create(null);
const globalStylesheetsParentElement = document.head || document.body || document; // TODO [#0]: Evaluate how we can extract the `$shadowToken$` property name in a shared package
// to avoid having to synchronize it between the different modules.

const useSyntheticShadow = hasOwnProperty.call(Element.prototype, '$shadowToken$');
const renderer = {
  ssr: false,
  syntheticShadow: useSyntheticShadow,

  createElement(tagName, namespace) {
    return isUndefined(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
  },

  createText(content) {
    return document.createTextNode(content);
  },

  insert(node, parent, anchor) {
    parent.insertBefore(node, anchor);
  },

  remove(node, parent) {
    parent.removeChild(node);
  },

  nextSibling(node) {
    return node.nextSibling;
  },

  attachShadow(element, options) {
    return element.attachShadow(options);
  },

  setText(node, content) {
    node.nodeValue = content;
  },

  getProperty(node, key) {
    return node[key];
  },

  setProperty(node, key, value) {
    {
      if (node instanceof Element && !(key in node)) {
        // TODO [#1297]: Move this validation to the compiler
        assert.fail(`Unknown public property "${key}" of element <${node.tagName}>. This is likely a typo on the corresponding attribute "${getAttrNameFromPropName(key)}".`);
      }
    }

    node[key] = value;
  },

  getAttribute(element, name, namespace) {
    return isUndefined(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
  },

  setAttribute(element, name, value, namespace) {
    return isUndefined(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
  },

  removeAttribute(element, name, namespace) {
    if (isUndefined(namespace)) {
      element.removeAttribute(name);
    } else {
      element.removeAttributeNS(namespace, name);
    }
  },

  addEventListener(target, type, callback, options) {
    target.addEventListener(type, callback, options);
  },

  removeEventListener(target, type, callback, options) {
    target.removeEventListener(type, callback, options);
  },

  dispatchEvent(target, event) {
    return target.dispatchEvent(event);
  },

  getClassList(element) {
    return element.classList;
  },

  getStyleDeclaration(element) {
    // TODO [#0]: How to avoid this type casting? Shall we use a different type interface to
    // represent elements in the engine?
    return element.style;
  },

  getBoundingClientRect(element) {
    return element.getBoundingClientRect();
  },

  querySelector(element, selectors) {
    return element.querySelector(selectors);
  },

  querySelectorAll(element, selectors) {
    return element.querySelectorAll(selectors);
  },

  getElementsByTagName(element, tagNameOrWildCard) {
    return element.getElementsByTagName(tagNameOrWildCard);
  },

  getElementsByClassName(element, names) {
    return element.getElementsByClassName(names);
  },

  isConnected(node) {
    return node.isConnected;
  },

  insertGlobalStylesheet(content) {
    if (!isUndefined(globalStylesheets[content])) {
      return;
    }

    globalStylesheets[content] = true;
    const elm = document.createElement('style');
    elm.type = 'text/css';
    elm.textContent = content;
    globalStylesheetsParentElement.appendChild(elm);
  },

  assertInstanceOfHTMLElement(elm, msg) {
    assert.invariant(elm instanceof HTMLElement, msg);
  }

};

function buildCustomElementConstructor(Ctor) {
  var _a;

  const def = getComponentInternalDef(Ctor); // generating the hash table for attributes to avoid duplicate fields and facilitate validation
  // and false positives in case of inheritance.

  const attributeToPropMap = create(null);

  for (const propName in def.props) {
    attributeToPropMap[getAttrNameFromPropName(propName)] = propName;
  }

  return _a = class extends def.bridge {
    constructor() {
      super();
      createVM(this, def, {
        mode: 'open',
        owner: null,
        tagName: this.tagName,
        renderer
      });
    }

    connectedCallback() {
      connectRootElement(this);
    }

    disconnectedCallback() {
      disconnectRootElement(this);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
      if (oldValue === newValue) {
        // Ignore same values.
        return;
      }

      const propName = attributeToPropMap[attrName];

      if (isUndefined(propName)) {
        // Ignore unknown attributes.
        return;
      }

      if (!isAttributeLocked(this, attrName)) {
        // Ignore changes triggered by the engine itself during:
        // * diffing when public props are attempting to reflect to the DOM
        // * component via `this.setAttribute()`, should never update the prop
        // Both cases, the setAttribute call is always wrapped by the unlocking of the
        // attribute to be changed
        return;
      } // Reflect attribute change to the corresponding property when changed from outside.


      this[propName] = newValue;
    }

  }, // Specify attributes for which we want to reflect changes back to their corresponding
  // properties via attributeChangedCallback.
  _a.observedAttributes = keys(attributeToPropMap), _a;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const ConnectingSlot = createHiddenField('connecting', 'engine');
const DisconnectingSlot = createHiddenField('disconnecting', 'engine');

function callNodeSlot(node, slot) {
  {
    assert.isTrue(node, `callNodeSlot() should not be called for a non-object`);
  }

  const fn = getHiddenField(node, slot);

  if (!isUndefined(fn)) {
    fn(node);
  }

  return node; // for convenience
} // Monkey patching Node methods to be able to detect the insertions and removal of root elements
// created via createElement.


const {
  appendChild,
  insertBefore,
  removeChild,
  replaceChild
} = Node.prototype;
assign(Node.prototype, {
  appendChild(newChild) {
    const appendedNode = appendChild.call(this, newChild);
    return callNodeSlot(appendedNode, ConnectingSlot);
  },

  insertBefore(newChild, referenceNode) {
    const insertedNode = insertBefore.call(this, newChild, referenceNode);
    return callNodeSlot(insertedNode, ConnectingSlot);
  },

  removeChild(oldChild) {
    const removedNode = removeChild.call(this, oldChild);
    return callNodeSlot(removedNode, DisconnectingSlot);
  },

  replaceChild(newChild, oldChild) {
    const replacedNode = replaceChild.call(this, newChild, oldChild);
    callNodeSlot(replacedNode, DisconnectingSlot);
    callNodeSlot(newChild, ConnectingSlot);
    return replacedNode;
  }

});
/**
 * EXPERIMENTAL: This function is almost identical to document.createElement with the slightly
 * difference that in the options, you can pass the `is` property set to a Constructor instead of
 * just a string value. The intent is to allow the creation of an element controlled by LWC without
 * having to register the element as a custom element.
 *
 * @example
 * ```
 * const el = createElement('x-foo', { is: FooCtor });
 * ```
 */

function createElement(sel, options) {
  if (!isObject$1(options) || isNull(options)) {
    throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString(options)}".`);
  }

  const Ctor = options.is;

  if (!isFunction(Ctor)) {
    throw new TypeError(`"createElement" function expects an "is" option with a valid component constructor.`);
  }

  const element = document.createElement(sel); // There is a possibility that a custom element is registered under tagName, in which case, the
  // initialization is already carry on, and there is nothing else to do here.

  if (!isUndefined(getAssociatedVMIfPresent(element))) {
    return element;
  }

  const def = getComponentInternalDef(Ctor);
  setElementProto(element, def);
  createVM(element, def, {
    tagName: sel,
    mode: options.mode !== 'closed' ? 'open' : 'closed',
    owner: null,
    renderer
  });
  setHiddenField(element, ConnectingSlot, connectRootElement);
  setHiddenField(element, DisconnectingSlot, disconnectRootElement);
  return element;
}
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */


const ComponentConstructorToCustomElementConstructorMap = new Map();

function getCustomElementConstructor(Ctor) {
  if (Ctor === BaseLightningElement) {
    throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
  }

  let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);

  if (isUndefined(ce)) {
    ce = buildCustomElementConstructor(Ctor);
    ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
  }

  return ce;
}
/**
 * This static getter builds a Web Component class from a LWC constructor so it can be registered
 * as a new element via customElements.define() at any given time. E.g.:
 *
 *      import Foo from 'ns/foo';
 *      customElements.define('x-foo', Foo.CustomElementConstructor);
 *      const elm = document.createElement('x-foo');
 *
 */


defineProperty(BaseLightningElement, 'CustomElementConstructor', {
  get() {
    return getCustomElementConstructor(this);
  }

});
freeze(BaseLightningElement);
seal(BaseLightningElement.prototype);
/* version: 1.7.7 */

/* proxy-compat-disable */
function invariant$2(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}

function isTrue$2(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function isFalse$1(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}

function fail$2(msg) {
  throw new Error(msg);
}

var assert$2 = Object.freeze({
  __proto__: null,
  invariant: invariant$2,
  isTrue: isTrue$2,
  isFalse: isFalse$1,
  fail: fail$2
});
const {
  assign: assign$2,
  create: create$3,
  defineProperties: defineProperties$2,
  defineProperty: defineProperty$2,
  freeze: freeze$2,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$3,
  getOwnPropertyNames: getOwnPropertyNames$3,
  getPrototypeOf: getPrototypeOf$3,
  hasOwnProperty: hasOwnProperty$3,
  isFrozen: isFrozen$2,
  keys: keys$2,
  seal: seal$2,
  setPrototypeOf: setPrototypeOf$2
} = Object;
const {
  isArray: isArray$3
} = Array;
const {
  filter: ArrayFilter$2,
  find: ArrayFind$2,
  indexOf: ArrayIndexOf$3,
  join: ArrayJoin$2,
  map: ArrayMap$3,
  push: ArrayPush$4,
  reduce: ArrayReduce$2,
  reverse: ArrayReverse$2,
  slice: ArraySlice$3,
  splice: ArraySplice$3,
  unshift: ArrayUnshift$3,
  forEach: forEach$2
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$2,
  replace: StringReplace$2,
  slice: StringSlice$2,
  toLowerCase: StringToLowerCase$2
} = String.prototype;

function isUndefined$3(obj) {
  return obj === undefined;
}

function isNull$2(obj) {
  return obj === null;
}

function isTrue$1$2(obj) {
  return obj === true;
}

function isFalse$1$2(obj) {
  return obj === false;
}

function isFunction$2(obj) {
  return typeof obj === 'function';
}

function isObject$3(obj) {
  return typeof obj === 'object';
}

const OtS$2 = {}.toString;

function toString$2(obj) {
  if (obj && obj.toString) {
    if (isArray$3(obj)) {
      return ArrayJoin$2.call(ArrayMap$3.call(obj, toString$2), ',');
    }

    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$2.call(obj);
  } else {
    return obj + emptyString$2;
  }
}

function getPropertyDescriptor$1(o, p) {
  do {
    const d = getOwnPropertyDescriptor$3(o, p);

    if (!isUndefined$3(d)) {
      return d;
    }

    o = getPrototypeOf$3(o);
  } while (o !== null);
}

const emptyString$2 = '';
const AriaPropertyNames$2 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$3 = create$3(null);
const PropNameToAttrNameMap$3 = create$3(null);
forEach$2.call(AriaPropertyNames$2, propName => {
  const attrName = StringToLowerCase$2.call(StringReplace$2.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$3[attrName] = propName;
  PropNameToAttrNameMap$3[propName] = attrName;
});

const _globalThis$2 = function () {
  if (typeof globalThis === 'object') {
    return globalThis;
  }

  let _globalThis;

  try {
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    });
    _globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (ex) {} finally {
    if (typeof _globalThis === 'undefined') {
      _globalThis = window;
    }
  }

  return _globalThis;
}();

const hasNativeSymbolsSupport$2 = Symbol('x').toString() === 'Symbol(x)';

function createHiddenField$2(key, namespace) {
  return hasNativeSymbolsSupport$2 ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
}

const hiddenFieldsMap$2 = new WeakMap();

function setHiddenField$2(o, field, value) {
  let valuesByField = hiddenFieldsMap$2.get(o);

  if (isUndefined$3(valuesByField)) {
    valuesByField = create$3(null);
    hiddenFieldsMap$2.set(o, valuesByField);
  }

  valuesByField[field] = value;
}

function getHiddenField$2(o, field) {
  const valuesByField = hiddenFieldsMap$2.get(o);

  if (!isUndefined$3(valuesByField)) {
    return valuesByField[field];
  }
}

const HTML_ATTRIBUTES_TO_PROPERTY$2 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$2(HTML_ATTRIBUTES_TO_PROPERTY$2).forEach(attrName => {});
const {
  DOCUMENT_POSITION_CONTAINED_BY,
  DOCUMENT_POSITION_CONTAINS,
  DOCUMENT_POSITION_PRECEDING,
  DOCUMENT_POSITION_FOLLOWING,
  ELEMENT_NODE,
  TEXT_NODE,
  CDATA_SECTION_NODE,
  PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE,
  DOCUMENT_FRAGMENT_NODE
} = Node;
const {
  appendChild: appendChild$1,
  cloneNode,
  compareDocumentPosition,
  insertBefore: insertBefore$1,
  removeChild: removeChild$1,
  replaceChild: replaceChild$1,
  hasChildNodes
} = Node.prototype;
const {
  contains
} = HTMLElement.prototype;
const firstChildGetter = getOwnPropertyDescriptor$3(Node.prototype, 'firstChild').get;
const lastChildGetter = getOwnPropertyDescriptor$3(Node.prototype, 'lastChild').get;
const textContentGetter = getOwnPropertyDescriptor$3(Node.prototype, 'textContent').get;
const parentNodeGetter = getOwnPropertyDescriptor$3(Node.prototype, 'parentNode').get;
const ownerDocumentGetter = getOwnPropertyDescriptor$3(Node.prototype, 'ownerDocument').get;
const parentElementGetter = hasOwnProperty$3.call(Node.prototype, 'parentElement') ? getOwnPropertyDescriptor$3(Node.prototype, 'parentElement').get : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'parentElement').get;
const textContextSetter = getOwnPropertyDescriptor$3(Node.prototype, 'textContent').set;
const childNodesGetter = hasOwnProperty$3.call(Node.prototype, 'childNodes') ? getOwnPropertyDescriptor$3(Node.prototype, 'childNodes').get : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'childNodes').get;
const isConnected = hasOwnProperty$3.call(Node.prototype, 'isConnected') ? getOwnPropertyDescriptor$3(Node.prototype, 'isConnected').get : function () {
  const doc = ownerDocumentGetter.call(this);
  return doc === null || (compareDocumentPosition.call(doc, this) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
};
const {
  addEventListener,
  getAttribute,
  getBoundingClientRect,
  getElementsByTagName,
  getElementsByTagNameNS,
  hasAttribute,
  querySelector,
  querySelectorAll,
  removeAttribute,
  removeEventListener,
  setAttribute
} = Element.prototype;
const attachShadow = hasOwnProperty$3.call(Element.prototype, 'attachShadow') ? Element.prototype.attachShadow : () => {
  throw new TypeError('attachShadow() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill and use Lightning Web Components');
};
const childElementCountGetter = getOwnPropertyDescriptor$3(Element.prototype, 'childElementCount').get;
const firstElementChildGetter = getOwnPropertyDescriptor$3(Element.prototype, 'firstElementChild').get;
const lastElementChildGetter = getOwnPropertyDescriptor$3(Element.prototype, 'lastElementChild').get;
const innerHTMLDescriptor = hasOwnProperty$3.call(Element.prototype, 'innerHTML') ? getOwnPropertyDescriptor$3(Element.prototype, 'innerHTML') : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'innerHTML');
const innerHTMLGetter = innerHTMLDescriptor.get;
const innerHTMLSetter = innerHTMLDescriptor.set;
const outerHTMLDescriptor = hasOwnProperty$3.call(Element.prototype, 'outerHTML') ? getOwnPropertyDescriptor$3(Element.prototype, 'outerHTML') : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'outerHTML');
const outerHTMLGetter = outerHTMLDescriptor.get;
const outerHTMLSetter = outerHTMLDescriptor.set;
const tagNameGetter = getOwnPropertyDescriptor$3(Element.prototype, 'tagName').get;
const tabIndexDescriptor = getOwnPropertyDescriptor$3(HTMLElement.prototype, 'tabIndex');
const tabIndexGetter = tabIndexDescriptor.get;
const tabIndexSetter = tabIndexDescriptor.set;
const matches = hasOwnProperty$3.call(Element.prototype, 'matches') ? Element.prototype.matches : Element.prototype.msMatchesSelector;
const childrenGetter = hasOwnProperty$3.call(Element.prototype, 'children') ? getOwnPropertyDescriptor$3(Element.prototype, 'children').get : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'children').get;
const {
  getElementsByClassName
} = HTMLElement.prototype;
const shadowRootGetter = hasOwnProperty$3.call(Element.prototype, 'shadowRoot') ? getOwnPropertyDescriptor$3(Element.prototype, 'shadowRoot').get : () => null;
let assignedNodes, assignedElements;

if (typeof HTMLSlotElement !== 'undefined') {
  assignedNodes = HTMLSlotElement.prototype.assignedNodes;
  assignedElements = HTMLSlotElement.prototype.assignedElements;
} else {
  assignedNodes = () => {
    throw new TypeError("assignedNodes() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
  };

  assignedElements = () => {
    throw new TypeError("assignedElements() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
  };
}

const dispatchEvent = 'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent;
const eventTargetGetter = getOwnPropertyDescriptor$3(Event.prototype, 'target').get;
const eventCurrentTargetGetter = getOwnPropertyDescriptor$3(Event.prototype, 'currentTarget').get;
const focusEventRelatedTargetGetter = getOwnPropertyDescriptor$3(FocusEvent.prototype, 'relatedTarget').get;
const DocumentPrototypeActiveElement = getOwnPropertyDescriptor$3(Document.prototype, 'activeElement').get;
const elementFromPoint = hasOwnProperty$3.call(Document.prototype, 'elementFromPoint') ? Document.prototype.elementFromPoint : Document.prototype.msElementFromPoint;
const defaultViewGetter = getOwnPropertyDescriptor$3(Document.prototype, 'defaultView').get;
const {
  createComment,
  querySelectorAll: querySelectorAll$1,
  getElementById,
  getElementsByClassName: getElementsByClassName$1,
  getElementsByTagName: getElementsByTagName$1,
  getElementsByTagNameNS: getElementsByTagNameNS$1
} = Document.prototype;
const {
  getElementsByName
} = HTMLDocument.prototype;
const {
  addEventListener: windowAddEventListener,
  removeEventListener: windowRemoveEventListener
} = window;
const MO = MutationObserver;
const MutationObserverObserve = MO.prototype.observe;

function detect$2() {
  return typeof HTMLSlotElement === 'undefined';
}

const {
  createElement: createElement$1
} = Document.prototype;
const CHAR_S$1 = 115;
const CHAR_L = 108;
const CHAR_O = 111;
const CHAR_T = 116;

function apply$1() {
  class HTMLSlotElement {}

  setPrototypeOf$2(HTMLSlotElement, HTMLElement.constructor);
  setPrototypeOf$2(HTMLSlotElement.prototype, HTMLElement.prototype);
  Window.prototype.HTMLSlotElement = HTMLSlotElement;
  defineProperty$2(Document.prototype, 'createElement', {
    value: function (tagName, _options) {
      const elm = createElement$1.apply(this, ArraySlice$3.call(arguments));

      if (tagName.length === 4 && StringCharCodeAt$2.call(tagName, 0) === CHAR_S$1 && StringCharCodeAt$2.call(tagName, 1) === CHAR_L && StringCharCodeAt$2.call(tagName, 2) === CHAR_O && StringCharCodeAt$2.call(tagName, 3) === CHAR_T) {
        setPrototypeOf$2(elm, HTMLSlotElement.prototype);
      }

      return elm;
    }
  });
}

if (detect$2()) {
  apply$1();
}

const {
  assign: assign$1$2,
  create: create$1$2,
  defineProperties: defineProperties$1$2,
  defineProperty: defineProperty$1$2,
  freeze: freeze$1$2,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1$2,
  getOwnPropertyNames: getOwnPropertyNames$1$2,
  getPrototypeOf: getPrototypeOf$1$2,
  hasOwnProperty: hasOwnProperty$1$2,
  isFrozen: isFrozen$1$2,
  keys: keys$1$2,
  seal: seal$1$2,
  setPrototypeOf: setPrototypeOf$1$2
} = Object;
const {
  filter: ArrayFilter$1$2,
  find: ArrayFind$1$2,
  indexOf: ArrayIndexOf$1$2,
  join: ArrayJoin$1$2,
  map: ArrayMap$1$2,
  push: ArrayPush$1$2,
  reduce: ArrayReduce$1$2,
  reverse: ArrayReverse$1$2,
  slice: ArraySlice$1$2,
  splice: ArraySplice$1$2,
  unshift: ArrayUnshift$1$2,
  forEach: forEach$1$2
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$1$2,
  replace: StringReplace$1$2,
  slice: StringSlice$1$2,
  toLowerCase: StringToLowerCase$1$2
} = String.prototype;
const AriaPropertyNames$1$2 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$1$2 = create$1$2(null);
const PropNameToAttrNameMap$1$2 = create$1$2(null);
forEach$1$2.call(AriaPropertyNames$1$2, propName => {
  const attrName = StringToLowerCase$1$2.call(StringReplace$1$2.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$1$2[attrName] = propName;
  PropNameToAttrNameMap$1$2[propName] = attrName;
});

const _globalThis$1$2 = function () {
  if (typeof globalThis === 'object') {
    return globalThis;
  }

  let _globalThis;

  try {
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    });
    _globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (ex) {} finally {
    if (typeof _globalThis === 'undefined') {
      _globalThis = window;
    }
  }

  return _globalThis;
}();

const hasNativeSymbolsSupport$1$2 = Symbol('x').toString() === 'Symbol(x)';
const HTML_ATTRIBUTES_TO_PROPERTY$1$2 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$1$2(HTML_ATTRIBUTES_TO_PROPERTY$1$2).forEach(attrName => {});

if (!_globalThis$1$2.lwcRuntimeFlags) {
  Object.defineProperty(_globalThis$1$2, 'lwcRuntimeFlags', {
    value: create$1$2(null)
  });
}

const runtimeFlags$1 = _globalThis$1$2.lwcRuntimeFlags;

function getOwnerDocument(node) {
  const doc = ownerDocumentGetter.call(node);
  return doc === null ? node : doc;
}

function getOwnerWindow(node) {
  const doc = getOwnerDocument(node);
  const win = defaultViewGetter.call(doc);

  if (win === null) {
    throw new TypeError();
  }

  return win;
}

let skipGlobalPatching;

function isGlobalPatchingSkipped(node) {
  if (isUndefined$3(skipGlobalPatching)) {
    const ownerDocument = getOwnerDocument(node);
    skipGlobalPatching = ownerDocument.body && getAttribute.call(ownerDocument.body, 'data-global-patching-bypass') === 'temporary-bypass';
  }

  return isTrue$1$2(skipGlobalPatching);
}

function arrayFromCollection(collection) {
  const size = collection.length;
  const cloned = [];

  if (size > 0) {
    for (let i = 0; i < size; i++) {
      cloned[i] = collection[i];
    }
  }

  return cloned;
}

function pathComposer(startNode, composed) {
  const composedPath = [];
  let current = startNode;
  const startRoot = startNode instanceof Window ? startNode : startNode.getRootNode();

  while (!isNull$2(current)) {
    composedPath.push(current);
    let assignedSlot = null;

    if (current instanceof Element) {
      assignedSlot = current.assignedSlot;
    }

    if (!isNull$2(assignedSlot)) {
      current = assignedSlot;
    } else if (current instanceof ShadowRoot && (composed || current !== startRoot)) {
      current = current.host;
    } else {
      current = current.parentNode;
    }
  }

  let doc;

  if (startNode instanceof Window) {
    doc = startNode.document;
  } else {
    doc = getOwnerDocument(startNode);
  }

  if (composedPath[composedPath.length - 1] === doc) {
    composedPath.push(window);
  }

  return composedPath;
}

function retarget(refNode, path) {
  if (isNull$2(refNode)) {
    return null;
  }

  const refNodePath = pathComposer(refNode, true);
  const p$ = path;

  for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
    ancestor = p$[i];
    root = ancestor instanceof Window ? ancestor : ancestor.getRootNode();

    if (root !== lastRoot) {
      rootIdx = refNodePath.indexOf(root);
      lastRoot = root;
    }

    if (!(root instanceof SyntheticShadowRoot) || !isUndefined$3(rootIdx) && rootIdx > -1) {
      return ancestor;
    }
  }

  return null;
}

var EventListenerContext;

(function (EventListenerContext) {
  EventListenerContext[EventListenerContext["CUSTOM_ELEMENT_LISTENER"] = 1] = "CUSTOM_ELEMENT_LISTENER";
  EventListenerContext[EventListenerContext["SHADOW_ROOT_LISTENER"] = 2] = "SHADOW_ROOT_LISTENER";
})(EventListenerContext || (EventListenerContext = {}));

const eventToContextMap = new WeakMap();

function isChildNode(root, node) {
  return !!(compareDocumentPosition.call(root, node) & DOCUMENT_POSITION_CONTAINED_BY);
}

const GET_ROOT_NODE_CONFIG_FALSE = {
  composed: false
};

function getRootNodeHost(node, options) {
  let rootNode = node.getRootNode(options);

  if ('mode' in rootNode && 'delegatesFocus' in rootNode) {
    rootNode = getHost(rootNode);
  }

  return rootNode;
}

function targetGetter() {
  const originalCurrentTarget = eventCurrentTargetGetter.call(this);
  const originalTarget = eventTargetGetter.call(this);
  const composedPath = pathComposer(originalTarget, this.composed);
  const doc = getOwnerDocument(originalTarget);

  if (!(originalCurrentTarget instanceof Node)) {
    if (isNull$2(originalCurrentTarget) && isUndefined$3(getNodeOwnerKey(originalTarget))) {
      return originalTarget;
    }

    return retarget(doc, composedPath);
  } else if (originalCurrentTarget === doc || originalCurrentTarget === doc.body) {
    if (isUndefined$3(getNodeOwnerKey(originalTarget))) {
      return originalTarget;
    }

    return retarget(doc, composedPath);
  }

  const eventContext = eventToContextMap.get(this);
  const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
  return retarget(currentTarget, composedPath);
}

function composedPathValue() {
  const originalTarget = eventTargetGetter.call(this);
  const originalCurrentTarget = eventCurrentTargetGetter.call(this);
  return isNull$2(originalCurrentTarget) ? [] : pathComposer(originalTarget, this.composed);
}

function patchEvent(event) {
  if (eventToContextMap.has(event)) {
    return;
  }

  defineProperties$2(event, {
    target: {
      get: targetGetter,
      enumerable: true,
      configurable: true
    },
    composedPath: {
      value: composedPathValue,
      writable: true,
      enumerable: true,
      configurable: true
    },
    srcElement: {
      get: targetGetter,
      enumerable: true,
      configurable: true
    },
    path: {
      get: composedPathValue,
      enumerable: true,
      configurable: true
    }
  });
  const originalRelatedTargetDescriptor = getPropertyDescriptor$1(event, 'relatedTarget');

  if (!isUndefined$3(originalRelatedTargetDescriptor)) {
    const relatedTargetGetter = originalRelatedTargetDescriptor.get;
    defineProperty$2(event, 'relatedTarget', {
      get() {
        const eventContext = eventToContextMap.get(this);
        const originalCurrentTarget = eventCurrentTargetGetter.call(this);
        const relatedTarget = relatedTargetGetter.call(this);

        if (isNull$2(relatedTarget)) {
          return null;
        }

        const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
        return retarget(currentTarget, pathComposer(relatedTarget, true));
      },

      enumerable: true,
      configurable: true
    });
  }

  eventToContextMap.set(event, 0);
}

const customElementToWrappedListeners = new WeakMap();

function getEventMap(elm) {
  let listenerInfo = customElementToWrappedListeners.get(elm);

  if (isUndefined$3(listenerInfo)) {
    listenerInfo = create$3(null);
    customElementToWrappedListeners.set(elm, listenerInfo);
  }

  return listenerInfo;
}

const shadowRootEventListenerMap = new WeakMap();

function getWrappedShadowRootListener(sr, listener) {
  if (!isFunction$2(listener)) {
    throw new TypeError();
  }

  let shadowRootWrappedListener = shadowRootEventListenerMap.get(listener);

  if (isUndefined$3(shadowRootWrappedListener)) {
    shadowRootWrappedListener = function (event) {
      const {
        composed
      } = event;
      const target = eventTargetGetter.call(event);
      const currentTarget = eventCurrentTargetGetter.call(event);

      if (target !== currentTarget) {
        const rootNode = getRootNodeHost(target, {
          composed
        });

        if (isChildNode(rootNode, currentTarget) || composed === false && rootNode === currentTarget) {
          listener.call(sr, event);
        }
      }
    };

    shadowRootWrappedListener.placement = EventListenerContext.SHADOW_ROOT_LISTENER;

    {
      shadowRootWrappedListener.original = listener;
    }

    shadowRootEventListenerMap.set(listener, shadowRootWrappedListener);
  }

  return shadowRootWrappedListener;
}

const customElementEventListenerMap = new WeakMap();

function getWrappedCustomElementListener(elm, listener) {
  if (!isFunction$2(listener)) {
    throw new TypeError();
  }

  let customElementWrappedListener = customElementEventListenerMap.get(listener);

  if (isUndefined$3(customElementWrappedListener)) {
    customElementWrappedListener = function (event) {
      if (isValidEventForCustomElement(event)) {
        listener.call(elm, event);
      }
    };

    customElementWrappedListener.placement = EventListenerContext.CUSTOM_ELEMENT_LISTENER;

    {
      customElementWrappedListener.original = listener;
    }

    customElementEventListenerMap.set(listener, customElementWrappedListener);
  }

  return customElementWrappedListener;
}

function domListener(evt) {
  patchEvent(evt);
  let immediatePropagationStopped = false;
  let propagationStopped = false;
  const {
    type,
    stopImmediatePropagation,
    stopPropagation
  } = evt;
  const currentTarget = eventCurrentTargetGetter.call(evt);
  const listenerMap = getEventMap(currentTarget);
  const listeners = listenerMap[type];
  defineProperty$2(evt, 'stopImmediatePropagation', {
    value() {
      immediatePropagationStopped = true;
      stopImmediatePropagation.call(evt);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty$2(evt, 'stopPropagation', {
    value() {
      propagationStopped = true;
      stopPropagation.call(evt);
    },

    writable: true,
    enumerable: true,
    configurable: true
  });
  const bookkeeping = ArraySlice$3.call(listeners);

  function invokeListenersByPlacement(placement) {
    forEach$2.call(bookkeeping, listener => {
      if (isFalse$1$2(immediatePropagationStopped) && listener.placement === placement) {
        if (ArrayIndexOf$3.call(listeners, listener) !== -1) {
          listener.call(undefined, evt);
        }
      }
    });
  }

  eventToContextMap.set(evt, EventListenerContext.SHADOW_ROOT_LISTENER);
  invokeListenersByPlacement(EventListenerContext.SHADOW_ROOT_LISTENER);

  if (isFalse$1$2(immediatePropagationStopped) && isFalse$1$2(propagationStopped)) {
    eventToContextMap.set(evt, EventListenerContext.CUSTOM_ELEMENT_LISTENER);
    invokeListenersByPlacement(EventListenerContext.CUSTOM_ELEMENT_LISTENER);
  }

  eventToContextMap.set(evt, 0);
}

function attachDOMListener(elm, type, wrappedListener) {
  const listenerMap = getEventMap(elm);
  let cmpEventHandlers = listenerMap[type];

  if (isUndefined$3(cmpEventHandlers)) {
    cmpEventHandlers = listenerMap[type] = [];
  }

  if (cmpEventHandlers.length === 0) {
    addEventListener.call(elm, type, domListener);
  }

  ArrayPush$4.call(cmpEventHandlers, wrappedListener);
}

function detachDOMListener(elm, type, wrappedListener) {
  const listenerMap = getEventMap(elm);
  let p;
  let listeners;

  if (!isUndefined$3(listeners = listenerMap[type]) && (p = ArrayIndexOf$3.call(listeners, wrappedListener)) !== -1) {
    ArraySplice$3.call(listeners, p, 1);

    if (listeners.length === 0) {
      removeEventListener.call(elm, type, domListener);
    }
  }
}

function isValidEventForCustomElement(event) {
  const target = eventTargetGetter.call(event);
  const currentTarget = eventCurrentTargetGetter.call(event);
  const {
    composed
  } = event;
  return composed === true || target === currentTarget || isChildNode(getRootNodeHost(target, GET_ROOT_NODE_CONFIG_FALSE), currentTarget);
}

function addCustomElementEventListener(elm, type, listener, _options) {
  {
    if (!isFunction$2(listener)) {
      throw new TypeError(`Invalid second argument for Element.addEventListener() in ${toString$2(elm)} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
  }

  const wrappedListener = getWrappedCustomElementListener(elm, listener);
  attachDOMListener(elm, type, wrappedListener);
}

function removeCustomElementEventListener(elm, type, listener, _options) {
  const wrappedListener = getWrappedCustomElementListener(elm, listener);
  detachDOMListener(elm, type, wrappedListener);
}

function addShadowRootEventListener(sr, type, listener, _options) {
  {
    if (!isFunction$2(listener)) {
      throw new TypeError(`Invalid second argument for ShadowRoot.addEventListener() in ${toString$2(sr)} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
  }

  const elm = getHost(sr);
  const wrappedListener = getWrappedShadowRootListener(sr, listener);
  attachDOMListener(elm, type, wrappedListener);
}

function removeShadowRootEventListener(sr, type, listener, _options) {
  const elm = getHost(sr);
  const wrappedListener = getWrappedShadowRootListener(sr, listener);
  detachDOMListener(elm, type, wrappedListener);
}

function getTextContent(node) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      {
        const childNodes = getFilteredChildNodes(node);
        let content = '';

        for (let i = 0, len = childNodes.length; i < len; i += 1) {
          const currentNode = childNodes[i];

          if (currentNode.nodeType !== COMMENT_NODE) {
            content += getTextContent(currentNode);
          }
        }

        return content;
      }

    default:
      return node.nodeValue;
  }
}

const Items = createHiddenField$2('StaticNodeListItems', 'synthetic-shadow');

function StaticNodeList() {
  throw new TypeError('Illegal constructor');
}

StaticNodeList.prototype = create$3(NodeList.prototype, {
  constructor: {
    writable: true,
    configurable: true,
    value: StaticNodeList
  },
  item: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(index) {
      return this[index];
    }

  },
  length: {
    enumerable: true,
    configurable: true,

    get() {
      return getHiddenField$2(this, Items).length;
    }

  },
  forEach: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(cb, thisArg) {
      forEach$2.call(getHiddenField$2(this, Items), cb, thisArg);
    }

  },
  entries: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items), (v, i) => [i, v]);
    }

  },
  keys: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items), (_v, i) => i);
    }

  },
  values: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return getHiddenField$2(this, Items);
    }

  },
  [Symbol.iterator]: {
    writable: true,
    configurable: true,

    value() {
      let nextIndex = 0;
      return {
        next: () => {
          const items = getHiddenField$2(this, Items);
          return nextIndex < items.length ? {
            value: items[nextIndex++],
            done: false
          } : {
            done: true
          };
        }
      };
    }

  },
  [Symbol.toStringTag]: {
    configurable: true,

    get() {
      return 'NodeList';
    }

  },
  toString: {
    writable: true,
    configurable: true,

    value() {
      return '[object NodeList]';
    }

  }
});
setPrototypeOf$2(StaticNodeList, NodeList);

function createStaticNodeList(items) {
  const nodeList = create$3(StaticNodeList.prototype);
  setHiddenField$2(nodeList, Items, items);
  forEach$2.call(items, (item, index) => {
    defineProperty$2(nodeList, index, {
      value: item,
      enumerable: true,
      configurable: true
    });
  });
  return nodeList;
}

const Items$1 = createHiddenField$2('StaticHTMLCollectionItems', 'synthetic-shadow');

function StaticHTMLCollection() {
  throw new TypeError('Illegal constructor');
}

StaticHTMLCollection.prototype = create$3(HTMLCollection.prototype, {
  constructor: {
    writable: true,
    configurable: true,
    value: StaticHTMLCollection
  },
  item: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(index) {
      return this[index];
    }

  },
  length: {
    enumerable: true,
    configurable: true,

    get() {
      return getHiddenField$2(this, Items$1).length;
    }

  },
  namedItem: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(name) {
      if (name === '') {
        return null;
      }

      const items = getHiddenField$2(this, Items$1);

      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[len];

        if (name === getAttribute.call(item, 'id') || name === getAttribute.call(item, 'name')) {
          return item;
        }
      }

      return null;
    }

  },
  forEach: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(cb, thisArg) {
      forEach$2.call(getHiddenField$2(this, Items$1), cb, thisArg);
    }

  },
  entries: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items$1), (v, i) => [i, v]);
    }

  },
  keys: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items$1), (v, i) => i);
    }

  },
  values: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      return getHiddenField$2(this, Items$1);
    }

  },
  [Symbol.iterator]: {
    writable: true,
    configurable: true,

    value() {
      let nextIndex = 0;
      return {
        next: () => {
          const items = getHiddenField$2(this, Items$1);
          return nextIndex < items.length ? {
            value: items[nextIndex++],
            done: false
          } : {
            done: true
          };
        }
      };
    }

  },
  [Symbol.toStringTag]: {
    configurable: true,

    get() {
      return 'HTMLCollection';
    }

  },
  toString: {
    writable: true,
    configurable: true,

    value() {
      return '[object HTMLCollection]';
    }

  }
});
setPrototypeOf$2(StaticHTMLCollection, HTMLCollection);

function createStaticHTMLCollection(items) {
  const collection = create$3(StaticHTMLCollection.prototype);
  setHiddenField$2(collection, Items$1, items);
  forEach$2.call(items, (item, index) => {
    defineProperty$2(collection, index, {
      value: item,
      enumerable: true,
      configurable: true
    });
  });
  return collection;
}

function getInnerHTML(node) {
  let s = '';
  const childNodes = getFilteredChildNodes(node);

  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    s += getOuterHTML(childNodes[i]);
  }

  return s;
}

const escapeAttrRegExp = /[&\u00A0"]/g;
const escapeDataRegExp = /[&\u00A0<>]/g;
const {
  replace,
  toLowerCase
} = String.prototype;

function escapeReplace(c) {
  switch (c) {
    case '&':
      return '&amp;';

    case '<':
      return '&lt;';

    case '>':
      return '&gt;';

    case '"':
      return '&quot;';

    case '\u00A0':
      return '&nbsp;';

    default:
      return '';
  }
}

function escapeAttr(s) {
  return replace.call(s, escapeAttrRegExp, escapeReplace);
}

function escapeData(s) {
  return replace.call(s, escapeDataRegExp, escapeReplace);
}

const voidElements = new Set(['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
const plaintextParents = new Set(['STYLE', 'SCRIPT', 'XMP', 'IFRAME', 'NOEMBED', 'NOFRAMES', 'PLAINTEXT', 'NOSCRIPT']);

function getOuterHTML(node) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      {
        const {
          attributes: attrs
        } = node;
        const tagName = tagNameGetter.call(node);
        let s = '<' + toLowerCase.call(tagName);

        for (let i = 0, attr; attr = attrs[i]; i++) {
          s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
        }

        s += '>';

        if (voidElements.has(tagName)) {
          return s;
        }

        return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
      }

    case TEXT_NODE:
      {
        const {
          data,
          parentNode
        } = node;

        if (parentNode instanceof Element && plaintextParents.has(tagNameGetter.call(parentNode))) {
          return data;
        }

        return escapeData(data);
      }

    case CDATA_SECTION_NODE:
      {
        return `<!CDATA[[${node.data}]]>`;
      }

    case PROCESSING_INSTRUCTION_NODE:
      {
        return `<?${node.target} ${node.data}?>`;
      }

    case COMMENT_NODE:
      {
        return `<!--${node.data}-->`;
      }

    default:
      {
        return '';
      }
  }
}

const InternalSlot = createHiddenField$2('shadowRecord', 'synthetic-shadow');
const {
  createDocumentFragment
} = document;

function getInternalSlot(root) {
  const record = getHiddenField$2(root, InternalSlot);

  if (isUndefined$3(record)) {
    throw new TypeError();
  }

  return record;
}

const ShadowRootResolverKey = '$shadowResolver$';
const ShadowResolverPrivateKey = '$$ShadowResolverKey$$';
defineProperty$2(Node.prototype, ShadowRootResolverKey, {
  set(fn) {
    this[ShadowResolverPrivateKey] = fn;
    setNodeOwnerKey(this, fn.nodeKey);
  },

  get() {
    return this[ShadowResolverPrivateKey];
  },

  configurable: true,
  enumerable: true
});

function getShadowRootResolver(node) {
  return node[ShadowRootResolverKey];
}

function setShadowRootResolver(node, fn) {
  node[ShadowRootResolverKey] = fn;
}

function isDelegatingFocus(host) {
  return getInternalSlot(host).delegatesFocus;
}

function getHost(root) {
  return getInternalSlot(root).host;
}

function getShadowRoot(elm) {
  return getInternalSlot(elm).shadowRoot;
}

function isHostElement(elm) {
  return !isUndefined$3(getHiddenField$2(elm, InternalSlot));
}

let uid = 0;

function attachShadow$1(elm, options) {
  if (!isUndefined$3(getHiddenField$2(elm, InternalSlot))) {
    throw new Error(`Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.`);
  }

  const {
    mode,
    delegatesFocus
  } = options;
  const doc = getOwnerDocument(elm);
  const sr = createDocumentFragment.call(doc);
  const record = {
    mode,
    delegatesFocus: !!delegatesFocus,
    host: elm,
    shadowRoot: sr
  };
  setHiddenField$2(sr, InternalSlot, record);
  setHiddenField$2(elm, InternalSlot, record);

  const shadowResolver = () => sr;

  const x = shadowResolver.nodeKey = uid++;
  setNodeKey(elm, x);
  setShadowRootResolver(sr, shadowResolver);
  setPrototypeOf$2(sr, SyntheticShadowRoot.prototype);
  return sr;
}

const SyntheticShadowRootDescriptors = {
  constructor: {
    writable: true,
    configurable: true,
    value: SyntheticShadowRoot
  },
  toString: {
    writable: true,
    configurable: true,

    value() {
      return `[object ShadowRoot]`;
    }

  }
};
const ShadowRootDescriptors = {
  activeElement: {
    enumerable: true,
    configurable: true,

    get() {
      const host = getHost(this);
      const doc = getOwnerDocument(host);
      const activeElement = DocumentPrototypeActiveElement.call(doc);

      if (isNull$2(activeElement)) {
        return activeElement;
      }

      if ((compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) === 0) {
        return null;
      }

      let node = activeElement;

      while (!isNodeOwnedBy(host, node)) {
        node = parentElementGetter.call(node);
      }

      if (isSlotElement(node)) {
        return null;
      }

      return node;
    }

  },
  delegatesFocus: {
    configurable: true,

    get() {
      return getInternalSlot(this).delegatesFocus;
    }

  },
  elementFromPoint: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(left, top) {
      const host = getHost(this);
      const doc = getOwnerDocument(host);
      const element = elementFromPoint.call(doc, left, top);

      if (isNull$2(element)) {
        return element;
      }

      return retarget(this, pathComposer(element, true));
    }

  },
  elementsFromPoint: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(_left, _top) {
      throw new Error();
    }

  },
  getSelection: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      throw new Error();
    }

  },
  host: {
    enumerable: true,
    configurable: true,

    get() {
      return getHost(this);
    }

  },
  mode: {
    configurable: true,

    get() {
      return getInternalSlot(this).mode;
    }

  },
  styleSheets: {
    enumerable: true,
    configurable: true,

    get() {
      throw new Error();
    }

  }
};
const NodePatchDescriptors = {
  insertBefore: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(newChild, refChild) {
      insertBefore$1.call(getHost(this), newChild, refChild);
      return newChild;
    }

  },
  removeChild: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(oldChild) {
      removeChild$1.call(getHost(this), oldChild);
      return oldChild;
    }

  },
  appendChild: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(newChild) {
      appendChild$1.call(getHost(this), newChild);
      return newChild;
    }

  },
  replaceChild: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(newChild, oldChild) {
      replaceChild$1.call(getHost(this), newChild, oldChild);
      return oldChild;
    }

  },
  addEventListener: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(type, listener, options) {
      addShadowRootEventListener(this, type, listener);
    }

  },
  removeEventListener: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(type, listener, options) {
      removeShadowRootEventListener(this, type, listener);
    }

  },
  baseURI: {
    enumerable: true,
    configurable: true,

    get() {
      return getHost(this).baseURI;
    }

  },
  childNodes: {
    enumerable: true,
    configurable: true,

    get() {
      return createStaticNodeList(shadowRootChildNodes(this));
    }

  },
  compareDocumentPosition: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(otherNode) {
      const host = getHost(this);

      if (this === otherNode) {
        return 0;
      } else if (this.contains(otherNode)) {
        return 20;
      } else if (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) {
        return 37;
      } else {
        return 35;
      }
    }

  },
  contains: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(otherNode) {
      if (this === otherNode) {
        return true;
      }

      const host = getHost(this);
      return (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 && isNodeOwnedBy(host, otherNode);
    }

  },
  firstChild: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      return childNodes[0] || null;
    }

  },
  lastChild: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      return childNodes[childNodes.length - 1] || null;
    }

  },
  hasChildNodes: {
    writable: true,
    enumerable: true,
    configurable: true,

    value() {
      const childNodes = getInternalChildNodes(this);
      return childNodes.length > 0;
    }

  },
  isConnected: {
    enumerable: true,
    configurable: true,

    get() {
      return isConnected.call(getHost(this));
    }

  },
  nextSibling: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  previousSibling: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  nodeName: {
    enumerable: true,
    configurable: true,

    get() {
      return '#document-fragment';
    }

  },
  nodeType: {
    enumerable: true,
    configurable: true,

    get() {
      return 11;
    }

  },
  nodeValue: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  ownerDocument: {
    enumerable: true,
    configurable: true,

    get() {
      return getHost(this).ownerDocument;
    }

  },
  parentElement: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  parentNode: {
    enumerable: true,
    configurable: true,

    get() {
      return null;
    }

  },
  textContent: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      let textContent = '';

      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        const currentNode = childNodes[i];

        if (currentNode.nodeType !== COMMENT_NODE) {
          textContent += getTextContent(currentNode);
        }
      }

      return textContent;
    },

    set(v) {
      const host = getHost(this);
      textContextSetter.call(host, v);
    }

  },
  getRootNode: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(options) {
      return !isUndefined$3(options) && isTrue$1$2(options.composed) ? getHost(this).getRootNode(options) : this;
    }

  }
};
const ElementPatchDescriptors = {
  innerHTML: {
    enumerable: true,
    configurable: true,

    get() {
      const childNodes = getInternalChildNodes(this);
      let innerHTML = '';

      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        innerHTML += getOuterHTML(childNodes[i]);
      }

      return innerHTML;
    },

    set(v) {
      const host = getHost(this);
      innerHTMLSetter.call(host, v);
    }

  }
};
const ParentNodePatchDescriptors = {
  childElementCount: {
    enumerable: true,
    configurable: true,

    get() {
      return this.children.length;
    }

  },
  children: {
    enumerable: true,
    configurable: true,

    get() {
      return createStaticHTMLCollection(ArrayFilter$2.call(shadowRootChildNodes(this), elm => elm instanceof Element));
    }

  },
  firstElementChild: {
    enumerable: true,
    configurable: true,

    get() {
      return this.children[0] || null;
    }

  },
  lastElementChild: {
    enumerable: true,
    configurable: true,

    get() {
      const {
        children
      } = this;
      return children.item(children.length - 1) || null;
    }

  },
  querySelector: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(selectors) {
      return shadowRootQuerySelector(this, selectors);
    }

  },
  querySelectorAll: {
    writable: true,
    enumerable: true,
    configurable: true,

    value(selectors) {
      return createStaticNodeList(shadowRootQuerySelectorAll(this, selectors));
    }

  }
};
assign$2(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);

function SyntheticShadowRoot() {
  throw new TypeError('Illegal constructor');
}

SyntheticShadowRoot.prototype = create$3(DocumentFragment.prototype, SyntheticShadowRootDescriptors);

function getIE11FakeShadowRootPlaceholder(host) {
  const shadowRoot = getShadowRoot(host);
  let c = shadowRoot.$$placeholder$$;

  if (!isUndefined$3(c)) {
    return c;
  }

  const doc = getOwnerDocument(host);
  c = shadowRoot.$$placeholder$$ = createComment.call(doc, '');
  defineProperties$2(c, {
    childNodes: {
      get() {
        return shadowRoot.childNodes;
      },

      enumerable: true,
      configurable: true
    },
    tagName: {
      get() {
        return `#shadow-root (${shadowRoot.mode})`;
      },

      enumerable: true,
      configurable: true
    }
  });
  return c;
}

function foldSlotElement(slot) {
  let parent = parentElementGetter.call(slot);

  while (!isNull$2(parent) && isSlotElement(parent)) {
    slot = parent;
    parent = parentElementGetter.call(slot);
  }

  return slot;
}

function isNodeSlotted(host, node) {
  {
    assert$2.invariant(host instanceof HTMLElement, `isNodeSlotted() should be called with a host as the first argument instead of ${host}`);
    assert$2.invariant(node instanceof Node, `isNodeSlotted() should be called with a node as the second argument instead of ${node}`);
    assert$2.invariant(compareDocumentPosition.call(node, host) & DOCUMENT_POSITION_CONTAINS, `isNodeSlotted() should never be called with a node that is not a child node of ${host}`);
  }

  const hostKey = getNodeKey(host);
  let currentElement = node instanceof Element ? node : parentElementGetter.call(node);

  while (!isNull$2(currentElement) && currentElement !== host) {
    const elmOwnerKey = getNodeNearestOwnerKey(currentElement);
    const parent = parentElementGetter.call(currentElement);

    if (elmOwnerKey === hostKey) {
      return isSlotElement(currentElement);
    } else if (parent === host) {
      return false;
    } else if (!isNull$2(parent) && getNodeNearestOwnerKey(parent) !== elmOwnerKey) {
      if (isSlotElement(parent)) {
        currentElement = getNodeOwner(foldSlotElement(parent));

        if (!isNull$2(currentElement)) {
          if (currentElement === host) {
            return true;
          } else if (getNodeNearestOwnerKey(currentElement) === hostKey) {
            return true;
          }
        }
      } else {
        return false;
      }
    } else {
      currentElement = parent;
    }
  }

  return false;
}

function getNodeOwner(node) {
  if (!(node instanceof Node)) {
    return null;
  }

  const ownerKey = getNodeNearestOwnerKey(node);

  if (isUndefined$3(ownerKey)) {
    return null;
  }

  let nodeOwner = node;

  while (!isNull$2(nodeOwner) && getNodeKey(nodeOwner) !== ownerKey) {
    nodeOwner = parentNodeGetter.call(nodeOwner);
  }

  if (isNull$2(nodeOwner)) {
    return null;
  }

  return nodeOwner;
}

function isSlotElement(node) {
  return node instanceof HTMLSlotElement;
}

function isNodeOwnedBy(owner, node) {
  {
    assert$2.invariant(owner instanceof HTMLElement, `isNodeOwnedBy() should be called with an element as the first argument instead of ${owner}`);
    assert$2.invariant(node instanceof Node, `isNodeOwnedBy() should be called with a node as the second argument instead of ${node}`);
    assert$2.invariant(compareDocumentPosition.call(node, owner) & DOCUMENT_POSITION_CONTAINS, `isNodeOwnedBy() should never be called with a node that is not a child node of ${owner}`);
  }

  const ownerKey = getNodeNearestOwnerKey(node);
  return isUndefined$3(ownerKey) || getNodeKey(owner) === ownerKey;
}

function shadowRootChildNodes(root) {
  const elm = getHost(root);
  return getAllMatches(elm, arrayFromCollection(childNodesGetter.call(elm)));
}

function getAllSlottedMatches(host, nodeList) {
  const filteredAndPatched = [];

  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];

    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
      ArrayPush$4.call(filteredAndPatched, node);
    }
  }

  return filteredAndPatched;
}

function getFirstSlottedMatch(host, nodeList) {
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];

    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
      return node;
    }
  }

  return null;
}

function getAllMatches(owner, nodeList) {
  const filteredAndPatched = [];

  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];
    const isOwned = isNodeOwnedBy(owner, node);

    if (isOwned) {
      ArrayPush$4.call(filteredAndPatched, node);
    }
  }

  return filteredAndPatched;
}

function getFirstMatch(owner, nodeList) {
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    if (isNodeOwnedBy(owner, nodeList[i])) {
      return nodeList[i];
    }
  }

  return null;
}

function shadowRootQuerySelector(root, selector) {
  const elm = getHost(root);
  const nodeList = arrayFromCollection(querySelectorAll.call(elm, selector));
  return getFirstMatch(elm, nodeList);
}

function shadowRootQuerySelectorAll(root, selector) {
  const elm = getHost(root);
  const nodeList = querySelectorAll.call(elm, selector);
  return getAllMatches(elm, arrayFromCollection(nodeList));
}

function getFilteredChildNodes(node) {
  let children;

  if (!isHostElement(node) && !isSlotElement(node)) {
    children = childNodesGetter.call(node);
    return arrayFromCollection(children);
  }

  if (isHostElement(node)) {
    const slots = arrayFromCollection(querySelectorAll.call(node, 'slot'));
    const resolver = getShadowRootResolver(getShadowRoot(node));
    return ArrayReduce$2.call(slots, (seed, slot) => {
      if (resolver === getShadowRootResolver(slot)) {
        ArrayPush$4.apply(seed, getFilteredSlotAssignedNodes(slot));
      }

      return seed;
    }, []);
  } else {
    children = arrayFromCollection(childNodesGetter.call(node));
    const resolver = getShadowRootResolver(node);
    return ArrayReduce$2.call(children, (seed, child) => {
      if (resolver === getShadowRootResolver(child)) {
        ArrayPush$4.call(seed, child);
      }

      return seed;
    }, []);
  }
}

function getFilteredSlotAssignedNodes(slot) {
  const owner = getNodeOwner(slot);

  if (isNull$2(owner)) {
    return [];
  }

  const childNodes = arrayFromCollection(childNodesGetter.call(slot));
  return ArrayReduce$2.call(childNodes, (seed, child) => {
    if (!isNodeOwnedBy(owner, child)) {
      ArrayPush$4.call(seed, child);
    }

    return seed;
  }, []);
}

const OwnKey = '$$OwnKey$$';
const OwnerKey = '$$OwnerKey$$';
const hasNativeSymbolsSupport$2$1 = Symbol('x').toString() === 'Symbol(x)';

function getNodeOwnerKey(node) {
  return node[OwnerKey];
}

function setNodeOwnerKey(node, value) {
  {
    defineProperty$2(node, OwnerKey, {
      value,
      configurable: true
    });
  }
}

function getNodeKey(node) {
  return node[OwnKey];
}

function setNodeKey(node, value) {
  {
    defineProperty$2(node, OwnKey, {
      value
    });
  }
}

function getNodeNearestOwnerKey(node) {
  let ownerNode = node;
  let ownerKey;

  while (!isNull$2(ownerNode)) {
    ownerKey = getNodeOwnerKey(ownerNode);

    if (!isUndefined$3(ownerKey)) {
      return ownerKey;
    }

    ownerNode = parentNodeGetter.call(ownerNode);
  }
}

function isNodeShadowed(node) {
  return !isUndefined$3(getNodeOwnerKey(node));
}

function isNodeDeepShadowed(node) {
  return !isUndefined$3(getNodeNearestOwnerKey(node));
}

function hasMountedChildren(node) {
  return isSlotElement(node) || isHostElement(node);
}

function getShadowParent(node, value) {
  const owner = getNodeOwner(node);

  if (value === owner) {
    return getShadowRoot(owner);
  } else if (value instanceof Element) {
    if (getNodeNearestOwnerKey(node) === getNodeNearestOwnerKey(value)) {
      return value;
    } else if (!isNull$2(owner) && isSlotElement(value)) {
      const slotOwner = getNodeOwner(value);

      if (!isNull$2(slotOwner) && isNodeOwnedBy(owner, slotOwner)) {
        return slotOwner;
      }
    }
  }

  return null;
}

function hasChildNodesPatched() {
  return getInternalChildNodes(this).length > 0;
}

function firstChildGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  return childNodes[0] || null;
}

function lastChildGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  return childNodes[childNodes.length - 1] || null;
}

function textContentGetterPatched() {
  return getTextContent(this);
}

function textContentSetterPatched(value) {
  textContextSetter.call(this, value);
}

function parentNodeGetterPatched() {
  const value = parentNodeGetter.call(this);

  if (isNull$2(value)) {
    return value;
  }

  return getShadowParent(this, value);
}

function parentElementGetterPatched() {
  const value = parentNodeGetter.call(this);

  if (isNull$2(value)) {
    return null;
  }

  const parentNode = getShadowParent(this, value);
  return parentNode instanceof Element ? parentNode : null;
}

function compareDocumentPositionPatched(otherNode) {
  if (this.getRootNode() === otherNode) {
    return 10;
  } else if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
    return 35;
  }

  return compareDocumentPosition.call(this, otherNode);
}

function containsPatched(otherNode) {
  if (otherNode == null || getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
    return false;
  }

  return (compareDocumentPosition.call(this, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
}

function cloneNodePatched(deep) {
  const clone = cloneNode.call(this, false);

  if (!deep) {
    return clone;
  }

  const childNodes = getInternalChildNodes(this);

  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    clone.appendChild(childNodes[i].cloneNode(true));
  }

  return clone;
}

function childNodesGetterPatched() {
  if (this instanceof Element && isHostElement(this)) {
    const owner = getNodeOwner(this);
    const childNodes = isNull$2(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));

    if ( isFalse$1$2(hasNativeSymbolsSupport$2$1) && isExternalChildNodeAccessorFlagOn()) {
      ArrayUnshift$3.call(childNodes, getIE11FakeShadowRootPlaceholder(this));
    }

    return createStaticNodeList(childNodes);
  }

  return childNodesGetter.call(this);
}

const nativeGetRootNode = Node.prototype.getRootNode;
const getDocumentOrRootNode = !isUndefined$3(nativeGetRootNode) ? nativeGetRootNode : function () {
  let node = this;
  let nodeParent;

  while (!isNull$2(nodeParent = parentNodeGetter.call(node))) {
    node = nodeParent;
  }

  return node;
};

function getNearestRoot(node) {
  const ownerNode = getNodeOwner(node);

  if (isNull$2(ownerNode)) {
    return getDocumentOrRootNode.call(node);
  }

  return getShadowRoot(ownerNode);
}

function getRootNodePatched(options) {
  const composed = isUndefined$3(options) ? false : !!options.composed;
  return isTrue$1$2(composed) ? getDocumentOrRootNode.call(this, options) : getNearestRoot(this);
}

defineProperties$2(Node.prototype, {
  firstChild: {
    get() {
      if (hasMountedChildren(this)) {
        return firstChildGetterPatched.call(this);
      }

      return firstChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  lastChild: {
    get() {
      if (hasMountedChildren(this)) {
        return lastChildGetterPatched.call(this);
      }

      return lastChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  textContent: {
    get() {
      if (!runtimeFlags$1.ENABLE_NODE_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return textContentGetterPatched.call(this);
        }

        return textContentGetter.call(this);
      }

      if (isGlobalPatchingSkipped(this)) {
        return textContentGetter.call(this);
      }

      return textContentGetterPatched.call(this);
    },

    set: textContentSetterPatched,
    enumerable: true,
    configurable: true
  },
  parentNode: {
    get() {
      if (isNodeShadowed(this)) {
        return parentNodeGetterPatched.call(this);
      }

      return parentNodeGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  parentElement: {
    get() {
      if (isNodeShadowed(this)) {
        return parentElementGetterPatched.call(this);
      }

      return parentElementGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  childNodes: {
    get() {
      if (hasMountedChildren(this)) {
        return childNodesGetterPatched.call(this);
      }

      return childNodesGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  hasChildNodes: {
    value() {
      if (hasMountedChildren(this)) {
        return hasChildNodesPatched.call(this);
      }

      return hasChildNodes.call(this);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  compareDocumentPosition: {
    value(otherNode) {
      if (isGlobalPatchingSkipped(this)) {
        return compareDocumentPosition.call(this, otherNode);
      }

      return compareDocumentPositionPatched.call(this, otherNode);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  contains: {
    value(otherNode) {
      if (this === otherNode) {
        return true;
      }

      if (!runtimeFlags$1.ENABLE_NODE_PATCH) {
        if (otherNode == null) {
          return false;
        }

        if (isNodeShadowed(this) || isHostElement(this)) {
          return containsPatched.call(this, otherNode);
        }

        return contains.call(this, otherNode);
      }

      if (isGlobalPatchingSkipped(this)) {
        return contains.call(this, otherNode);
      }

      return containsPatched.call(this, otherNode);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  cloneNode: {
    value(deep) {
      if (!runtimeFlags$1.ENABLE_NODE_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return cloneNodePatched.call(this, deep);
        }

        return cloneNode.call(this, deep);
      }

      if (isTrue$1$2(deep)) {
        if (isGlobalPatchingSkipped(this)) {
          return cloneNode.call(this, deep);
        }

        return cloneNodePatched.call(this, deep);
      }

      return cloneNode.call(this, deep);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  getRootNode: {
    value: getRootNodePatched,
    enumerable: true,
    configurable: true,
    writable: true
  },
  isConnected: {
    enumerable: true,
    configurable: true,

    get() {
      return isConnected.call(this);
    }

  }
});
let internalChildNodeAccessorFlag = false;

function isExternalChildNodeAccessorFlagOn() {
  return !internalChildNodeAccessorFlag;
}

const getInternalChildNodes =  isFalse$1$2(hasNativeSymbolsSupport$2$1) ? function (node) {
  internalChildNodeAccessorFlag = true;
  let childNodes;
  let error = null;

  try {
    childNodes = node.childNodes;
  } catch (e) {
    error = e;
  } finally {
    internalChildNodeAccessorFlag = false;

    if (!isNull$2(error)) {
      throw error;
    }
  }

  return childNodes;
} : function (node) {
  return node.childNodes;
};

if (hasOwnProperty$3.call(HTMLElement.prototype, 'contains')) {
  defineProperty$2(HTMLElement.prototype, 'contains', getOwnPropertyDescriptor$3(Node.prototype, 'contains'));
}

if (hasOwnProperty$3.call(HTMLElement.prototype, 'parentElement')) {
  defineProperty$2(HTMLElement.prototype, 'parentElement', getOwnPropertyDescriptor$3(Node.prototype, 'parentElement'));
}

function elemFromPoint(left, top) {
  const element = elementFromPoint.call(this, left, top);

  if (isNull$2(element)) {
    return element;
  }

  return retarget(this, pathComposer(element, true));
}

Document.prototype.elementFromPoint = elemFromPoint;
defineProperty$2(Document.prototype, 'activeElement', {
  get() {
    let node = DocumentPrototypeActiveElement.call(this);

    if (isNull$2(node)) {
      return node;
    }

    while (!isUndefined$3(getNodeOwnerKey(node))) {
      node = parentElementGetter.call(node);

      if (isNull$2(node)) {
        return null;
      }
    }

    if (node.tagName === 'HTML') {
      node = this.body;
    }

    return node;
  },

  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementById', {
  value() {
    const elm = getElementById.apply(this, ArraySlice$3.call(arguments));

    if (isNull$2(elm)) {
      return null;
    }

    return isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm) ? elm : null;
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'querySelector', {
  value() {
    const elements = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFind$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return !isUndefined$3(filtered) ? filtered : null;
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'querySelectorAll', {
  value() {
    const elements = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticNodeList(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementsByClassName', {
  value() {
    const elements = arrayFromCollection(getElementsByClassName$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementsByTagName', {
  value() {
    const elements = arrayFromCollection(getElementsByTagName$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementsByTagNameNS', {
  value() {
    const elements = arrayFromCollection(getElementsByTagNameNS$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(getOwnPropertyDescriptor$3(HTMLDocument.prototype, 'getElementsByName') ? HTMLDocument.prototype : Document.prototype, 'getElementsByName', {
  value() {
    const elements = arrayFromCollection(getElementsByName.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticNodeList(filtered);
  },

  writable: true,
  enumerable: true,
  configurable: true
});
Object.defineProperty(window, 'ShadowRoot', {
  value: SyntheticShadowRoot,
  configurable: true,
  writable: true
});

function doesEventNeedsPatch(e) {
  const originalTarget = eventTargetGetter.call(e);
  return originalTarget instanceof Node && isNodeDeepShadowed(originalTarget);
}

function isValidEventListener(listener) {
  return isFunction$2(listener) || !isNull$2(listener) && isObject$3(listener) && isFunction$2(listener.handleEvent);
}

function getEventListenerWrapper(listener) {
  if ('$$lwcEventWrapper$$' in listener) {
    return listener.$$lwcEventWrapper$$;
  }

  const isHandlerFunction = isFunction$2(listener);

  const wrapperFn = listener.$$lwcEventWrapper$$ = function (e) {
    if (doesEventNeedsPatch(e)) {
      patchEvent(e);
    }

    return isHandlerFunction ? listener.call(this, e) : listener.handleEvent && listener.handleEvent(e);
  };

  return wrapperFn;
}

function windowAddEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }

  const wrapperFn = getEventListenerWrapper(listener);
  windowAddEventListener.call(this, type, wrapperFn, optionsOrCapture);
}

function windowRemoveEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }

  const wrapperFn = getEventListenerWrapper(listener);
  windowRemoveEventListener.call(this, type, wrapperFn || listener, optionsOrCapture);
}

function addEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }

  const wrapperFn = getEventListenerWrapper(listener);
  addEventListener.call(this, type, wrapperFn, optionsOrCapture);
}

function removeEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }

  const wrapperFn = getEventListenerWrapper(listener);
  removeEventListener.call(this, type, wrapperFn || listener, optionsOrCapture);
}

window.addEventListener = windowAddEventListener$1;
window.removeEventListener = windowRemoveEventListener$1;
const protoToBePatched = typeof EventTarget !== 'undefined' ? EventTarget.prototype : Node.prototype;
defineProperties$2(protoToBePatched, {
  addEventListener: {
    value: addEventListener$1,
    enumerable: true,
    writable: true,
    configurable: true
  },
  removeEventListener: {
    value: removeEventListener$1,
    enumerable: true,
    writable: true,
    configurable: true
  }
});
const composedDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');

function detect$1$1() {
  if (!composedDescriptor) {
    return false;
  }

  let clickEvent = new Event('click');
  const button = document.createElement('button');
  button.addEventListener('click', event => clickEvent = event);
  button.click();
  return !composedDescriptor.get.call(clickEvent);
}

const originalClickDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'click');

function handleClick(event) {
  Object.defineProperty(event, 'composed', {
    configurable: true,
    enumerable: true,

    get() {
      return true;
    }

  });
}

function apply$1$1() {
  HTMLElement.prototype.click = function () {
    addEventListener.call(this, 'click', handleClick);

    try {
      originalClickDescriptor.value.call(this);
    } finally {
      removeEventListener.call(this, 'click', handleClick);
    }
  };
}

if (detect$1$1()) {
  apply$1$1();
}

function detect$2$1() {
  return new Event('test', {
    composed: true
  }).composed !== true;
}

function apply$2() {
  const composedEvents = assign$2(create$3(null), {
    beforeinput: 1,
    blur: 1,
    click: 1,
    compositionend: 1,
    compositionstart: 1,
    compositionupdate: 1,
    copy: 1,
    cut: 1,
    dblclick: 1,
    DOMActivate: 1,
    DOMFocusIn: 1,
    DOMFocusOut: 1,
    drag: 1,
    dragend: 1,
    dragenter: 1,
    dragleave: 1,
    dragover: 1,
    dragstart: 1,
    drop: 1,
    focus: 1,
    focusin: 1,
    focusout: 1,
    gotpointercapture: 1,
    input: 1,
    keydown: 1,
    keypress: 1,
    keyup: 1,
    lostpointercapture: 1,
    mousedown: 1,
    mouseenter: 1,
    mouseleave: 1,
    mousemove: 1,
    mouseout: 1,
    mouseover: 1,
    mouseup: 1,
    paste: 1,
    pointercancel: 1,
    pointerdown: 1,
    pointerenter: 1,
    pointerleave: 1,
    pointermove: 1,
    pointerout: 1,
    pointerover: 1,
    pointerup: 1,
    touchcancel: 1,
    touchend: 1,
    touchmove: 1,
    touchstart: 1,
    wheel: 1
  });
  const EventConstructor = Event;

  function PatchedEvent(type, eventInitDict) {
    const event = new EventConstructor(type, eventInitDict);
    const isComposed = !!(eventInitDict && eventInitDict.composed);
    Object.defineProperties(event, {
      composed: {
        get() {
          return isComposed;
        },

        configurable: true,
        enumerable: true
      }
    });
    return event;
  }

  PatchedEvent.prototype = EventConstructor.prototype;
  PatchedEvent.AT_TARGET = EventConstructor.AT_TARGET;
  PatchedEvent.BUBBLING_PHASE = EventConstructor.BUBBLING_PHASE;
  PatchedEvent.CAPTURING_PHASE = EventConstructor.CAPTURING_PHASE;
  PatchedEvent.NONE = EventConstructor.NONE;
  window.Event = PatchedEvent;
  Object.defineProperties(Event.prototype, {
    composed: {
      get() {
        const {
          type
        } = this;
        return composedEvents[type] === 1;
      },

      configurable: true,
      enumerable: true
    }
  });
}

if (detect$2$1()) {
  apply$2();
}

const CustomEventConstructor = CustomEvent;

function PatchedCustomEvent(type, eventInitDict) {
  const event = new CustomEventConstructor(type, eventInitDict);
  const isComposed = !!(eventInitDict && eventInitDict.composed);
  Object.defineProperties(event, {
    composed: {
      get() {
        return isComposed;
      },

      configurable: true,
      enumerable: true
    }
  });
  return event;
}

PatchedCustomEvent.prototype = CustomEventConstructor.prototype;
window.CustomEvent = PatchedCustomEvent;

if (typeof ClipboardEvent !== 'undefined') {
  const isComposedType = assign$2(create$3(null), {
    copy: 1,
    cut: 1,
    paste: 1
  });
  defineProperties$2(ClipboardEvent.prototype, {
    composed: {
      get() {
        const {
          type
        } = this;
        return isComposedType[type] === 1;
      },

      configurable: true,
      enumerable: true
    }
  });
}

function detect$3() {
  return typeof HTMLIFrameElement !== 'undefined';
}

function apply$3() {
  const desc = getOwnPropertyDescriptor$3(HTMLIFrameElement.prototype, 'contentWindow');
  const {
    get: originalGetter
  } = desc;

  desc.get = function () {
    const original = originalGetter.call(this);

    if (isNull$2(original) || isUndefined$3(getNodeOwnerKey(this))) {
      return original;
    }

    return wrapIframeWindow(original);
  };

  defineProperty$2(HTMLIFrameElement.prototype, 'contentWindow', desc);
}

function wrapIframeWindow(win) {
  return {
    addEventListener() {
      return win.addEventListener.apply(win, arguments);
    },

    blur() {
      return win.blur.apply(win, arguments);
    },

    close() {
      return win.close.apply(win, arguments);
    },

    focus() {
      return win.focus.apply(win, arguments);
    },

    postMessage() {
      return win.postMessage.apply(win, arguments);
    },

    removeEventListener() {
      return win.removeEventListener.apply(win, arguments);
    },

    get closed() {
      return win.closed;
    },

    get frames() {
      return win.frames;
    },

    get length() {
      return win.length;
    },

    get location() {
      return win.location;
    },

    set location(value) {
      win.location = value;
    },

    get opener() {
      return win.opener;
    },

    get parent() {
      return win.parent;
    },

    get self() {
      return win.self;
    },

    get top() {
      return win.top;
    },

    get window() {
      return win.window;
    }

  };
}

if (detect$3()) {
  apply$3();
}

const OriginalMutationObserver = MutationObserver;
const {
  disconnect: originalDisconnect,
  observe: originalObserve,
  takeRecords: originalTakeRecords
} = OriginalMutationObserver.prototype;
const wrapperLookupField = '$$lwcObserverCallbackWrapper$$';
const observerLookupField = '$$lwcNodeObservers$$';
const observerToNodesMap = new WeakMap();

function getNodeObservers(node) {
  return node[observerLookupField];
}

function setNodeObservers(node, observers) {
  node[observerLookupField] = observers;
}

function retargetMutationRecord(originalRecord) {
  const {
    addedNodes,
    removedNodes,
    target,
    type
  } = originalRecord;
  const retargetedRecord = create$3(MutationRecord.prototype);
  defineProperties$2(retargetedRecord, {
    addedNodes: {
      get() {
        return addedNodes;
      },

      enumerable: true,
      configurable: true
    },
    removedNodes: {
      get() {
        return removedNodes;
      },

      enumerable: true,
      configurable: true
    },
    type: {
      get() {
        return type;
      },

      enumerable: true,
      configurable: true
    },
    target: {
      get() {
        return target.shadowRoot;
      },

      enumerable: true,
      configurable: true
    }
  });
  return retargetedRecord;
}

function isQualifiedObserver(observer, target) {
  let parentNode = target;

  while (!isNull$2(parentNode)) {
    const parentNodeObservers = getNodeObservers(parentNode);

    if (!isUndefined$3(parentNodeObservers) && (parentNodeObservers[0] === observer || ArrayIndexOf$3.call(parentNodeObservers, observer) !== -1)) {
      return true;
    }

    parentNode = parentNode.parentNode;
  }

  return false;
}

function filterMutationRecords(mutations, observer) {
  return ArrayReduce$2.call(mutations, (filteredSet, record) => {
    const {
      target,
      addedNodes,
      removedNodes,
      type
    } = record;

    if (type === 'childList' && !isUndefined$3(getNodeKey(target))) {
      if (addedNodes.length > 0) {
        const sampleNode = addedNodes[0];

        if (isQualifiedObserver(observer, sampleNode)) {
          const nodeObservers = getNodeObservers(target);

          if (nodeObservers && (nodeObservers[0] === observer || ArrayIndexOf$3.call(nodeObservers, observer) !== -1)) {
            ArrayPush$4.call(filteredSet, record);
          } else {
            ArrayPush$4.call(filteredSet, retargetMutationRecord(record));
          }
        }
      } else {
        const shadowRoot = target.shadowRoot;
        const sampleNode = removedNodes[0];

        if (getNodeNearestOwnerKey(target) === getNodeNearestOwnerKey(sampleNode) && isQualifiedObserver(observer, target)) {
          ArrayPush$4.call(filteredSet, record);
        } else if (shadowRoot) {
          const shadowRootObservers = getNodeObservers(shadowRoot);

          if (shadowRootObservers && (shadowRootObservers[0] === observer || ArrayIndexOf$3.call(shadowRootObservers, observer) !== -1)) {
            ArrayPush$4.call(filteredSet, retargetMutationRecord(record));
          }
        }
      }
    } else {
      if (isQualifiedObserver(observer, target)) {
        ArrayPush$4.call(filteredSet, record);
      }
    }

    return filteredSet;
  }, []);
}

function getWrappedCallback(callback) {
  let wrappedCallback = callback[wrapperLookupField];

  if (isUndefined$3(wrappedCallback)) {
    wrappedCallback = callback[wrapperLookupField] = (mutations, observer) => {
      const filteredRecords = filterMutationRecords(mutations, observer);

      if (filteredRecords.length === 0) {
        return;
      }

      callback.call(observer, filteredRecords, observer);
    };
  }

  return wrappedCallback;
}

function PatchedMutationObserver(callback) {
  const wrappedCallback = getWrappedCallback(callback);
  const observer = new OriginalMutationObserver(wrappedCallback);
  return observer;
}

function patchedDisconnect() {
  originalDisconnect.call(this);
  const observedNodes = observerToNodesMap.get(this);

  if (!isUndefined$3(observedNodes)) {
    forEach$2.call(observedNodes, observedNode => {
      const observers = observedNode[observerLookupField];

      if (!isUndefined$3(observers)) {
        const index = ArrayIndexOf$3.call(observers, this);

        if (index !== -1) {
          ArraySplice$3.call(observers, index, 1);
        }
      }
    });
    observedNodes.length = 0;
  }
}

function patchedObserve(target, options) {
  let targetObservers = getNodeObservers(target);

  if (isUndefined$3(targetObservers)) {
    targetObservers = [];
    setNodeObservers(target, targetObservers);
  }

  if (ArrayIndexOf$3.call(targetObservers, this) === -1) {
    ArrayPush$4.call(targetObservers, this);
  }

  if (target instanceof SyntheticShadowRoot) {
    target = target.host;
  }

  if (observerToNodesMap.has(this)) {
    const observedNodes = observerToNodesMap.get(this);

    if (ArrayIndexOf$3.call(observedNodes, target) === -1) {
      ArrayPush$4.call(observedNodes, target);
    }
  } else {
    observerToNodesMap.set(this, [target]);
  }

  return originalObserve.call(this, target, options);
}

function patchedTakeRecords() {
  return filterMutationRecords(originalTakeRecords.call(this), this);
}

PatchedMutationObserver.prototype = OriginalMutationObserver.prototype;
PatchedMutationObserver.prototype.disconnect = patchedDisconnect;
PatchedMutationObserver.prototype.observe = patchedObserve;
PatchedMutationObserver.prototype.takeRecords = patchedTakeRecords;
defineProperty$2(window, 'MutationObserver', {
  value: PatchedMutationObserver,
  configurable: true,
  writable: true
});
let observer;
const observerConfig = {
  childList: true
};
const SlotChangeKey = createHiddenField$2('slotchange', 'synthetic-shadow');

function initSlotObserver() {
  return new MO(mutations => {
    const slots = [];
    forEach$2.call(mutations, mutation => {
      {
        assert$2.invariant(mutation.type === 'childList', `Invalid mutation type: ${mutation.type}. This mutation handler for slots should only handle "childList" mutations.`);
      }

      const {
        target: slot
      } = mutation;

      if (ArrayIndexOf$3.call(slots, slot) === -1) {
        ArrayPush$4.call(slots, slot);
        dispatchEvent.call(slot, new CustomEvent('slotchange'));
      }
    });
  });
}

function getFilteredSlotFlattenNodes(slot) {
  const childNodes = arrayFromCollection(childNodesGetter.call(slot));
  return ArrayReduce$2.call(childNodes, (seed, child) => {
    if (child instanceof Element && isSlotElement(child)) {
      ArrayPush$4.apply(seed, getFilteredSlotFlattenNodes(child));
    } else {
      ArrayPush$4.call(seed, child);
    }

    return seed;
  }, []);
}

function assignedSlotGetterPatched() {
  const parentNode = parentNodeGetter.call(this);

  if (isNull$2(parentNode) || !isSlotElement(parentNode) || getNodeNearestOwnerKey(parentNode) === getNodeNearestOwnerKey(this)) {
    return null;
  }

  return parentNode;
}

defineProperties$2(HTMLSlotElement.prototype, {
  addEventListener: {
    value(type, listener, options) {
      HTMLElement.prototype.addEventListener.call(this, type, listener, options);

      if (type === 'slotchange' && !getHiddenField$2(this, SlotChangeKey)) {
        setHiddenField$2(this, SlotChangeKey, true);

        if (!observer) {
          observer = initSlotObserver();
        }

        MutationObserverObserve.call(observer, this, observerConfig);
      }
    },

    writable: true,
    enumerable: true,
    configurable: true
  },
  assignedElements: {
    value(options) {
      if (isNodeShadowed(this)) {
        const flatten = !isUndefined$3(options) && isTrue$1$2(options.flatten);
        const nodes = flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
        return ArrayFilter$2.call(nodes, node => node instanceof Element);
      } else {
        return assignedElements.apply(this, ArraySlice$3.call(arguments));
      }
    },

    writable: true,
    enumerable: true,
    configurable: true
  },
  assignedNodes: {
    value(options) {
      if (isNodeShadowed(this)) {
        const flatten = !isUndefined$3(options) && isTrue$1$2(options.flatten);
        return flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
      } else {
        return assignedNodes.apply(this, ArraySlice$3.call(arguments));
      }
    },

    writable: true,
    enumerable: true,
    configurable: true
  },
  name: {
    get() {
      const name = getAttribute.call(this, 'name');
      return isNull$2(name) ? '' : name;
    },

    set(value) {
      setAttribute.call(this, 'name', value);
    },

    enumerable: true,
    configurable: true
  },
  childNodes: {
    get() {
      if (isNodeShadowed(this)) {
        const owner = getNodeOwner(this);
        const childNodes = isNull$2(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
        return createStaticNodeList(childNodes);
      }

      return childNodesGetter.call(this);
    },

    enumerable: true,
    configurable: true
  }
});
defineProperties$2(Text.prototype, {
  assignedSlot: {
    get: assignedSlotGetterPatched,
    enumerable: true,
    configurable: true
  }
});

function getNonPatchedFilteredArrayOfNodes(context, unfilteredNodes) {
  let filtered;
  const ownerKey = getNodeOwnerKey(context);

  if (!isUndefined$3(ownerKey)) {
    if (isHostElement(context)) {
      const owner = getNodeOwner(context);

      if (isNull$2(owner)) {
        filtered = [];
      } else if (getNodeKey(context)) {
        filtered = getAllSlottedMatches(context, unfilteredNodes);
      } else {
        filtered = getAllMatches(owner, unfilteredNodes);
      }
    } else {
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
    }
  } else if (context instanceof HTMLBodyElement) {
    filtered = ArrayFilter$2.call(unfilteredNodes, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
  } else {
    filtered = ArraySlice$3.call(unfilteredNodes);
  }

  return filtered;
}

var ShadowDomSemantic;

(function (ShadowDomSemantic) {
  ShadowDomSemantic[ShadowDomSemantic["Disabled"] = 0] = "Disabled";
  ShadowDomSemantic[ShadowDomSemantic["Enabled"] = 1] = "Enabled";
})(ShadowDomSemantic || (ShadowDomSemantic = {}));

function innerHTMLGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  let innerHTML = '';

  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    innerHTML += getOuterHTML(childNodes[i]);
  }

  return innerHTML;
}

function outerHTMLGetterPatched() {
  return getOuterHTML(this);
}

function attachShadowPatched(options) {
  if (isTrue$1$2(options['$$lwc-synthetic-mode$$'])) {
    return attachShadow$1(this, options);
  } else {
    return attachShadow.call(this, options);
  }
}

function shadowRootGetterPatched() {
  if (isHostElement(this)) {
    const shadow = getShadowRoot(this);

    if (shadow.mode === 'open') {
      return shadow;
    }
  }

  return shadowRootGetter.call(this);
}

function childrenGetterPatched() {
  const owner = getNodeOwner(this);
  const childNodes = isNull$2(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
  return createStaticHTMLCollection(ArrayFilter$2.call(childNodes, node => node instanceof Element));
}

function childElementCountGetterPatched() {
  return this.children.length;
}

function firstElementChildGetterPatched() {
  return this.children[0] || null;
}

function lastElementChildGetterPatched() {
  const {
    children
  } = this;
  return children.item(children.length - 1) || null;
}

defineProperties$2(Element.prototype, {
  innerHTML: {
    get() {
      if (!runtimeFlags$1.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return innerHTMLGetterPatched.call(this);
        }

        return innerHTMLGetter.call(this);
      }

      if (isGlobalPatchingSkipped(this)) {
        return innerHTMLGetter.call(this);
      }

      return innerHTMLGetterPatched.call(this);
    },

    set(v) {
      innerHTMLSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  },
  outerHTML: {
    get() {
      if (!runtimeFlags$1.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return outerHTMLGetterPatched.call(this);
        }

        return outerHTMLGetter.call(this);
      }

      if (isGlobalPatchingSkipped(this)) {
        return outerHTMLGetter.call(this);
      }

      return outerHTMLGetterPatched.call(this);
    },

    set(v) {
      outerHTMLSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  },
  attachShadow: {
    value: attachShadowPatched,
    enumerable: true,
    writable: true,
    configurable: true
  },
  shadowRoot: {
    get: shadowRootGetterPatched,
    enumerable: true,
    configurable: true
  },
  children: {
    get() {
      if (hasMountedChildren(this)) {
        return childrenGetterPatched.call(this);
      }

      return childrenGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  childElementCount: {
    get() {
      if (hasMountedChildren(this)) {
        return childElementCountGetterPatched.call(this);
      }

      return childElementCountGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  firstElementChild: {
    get() {
      if (hasMountedChildren(this)) {
        return firstElementChildGetterPatched.call(this);
      }

      return firstElementChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  lastElementChild: {
    get() {
      if (hasMountedChildren(this)) {
        return lastElementChildGetterPatched.call(this);
      }

      return lastElementChildGetter.call(this);
    },

    enumerable: true,
    configurable: true
  },
  assignedSlot: {
    get: assignedSlotGetterPatched,
    enumerable: true,
    configurable: true
  }
});

if (hasOwnProperty$3.call(HTMLElement.prototype, 'innerHTML')) {
  defineProperty$2(HTMLElement.prototype, 'innerHTML', getOwnPropertyDescriptor$3(Element.prototype, 'innerHTML'));
}

if (hasOwnProperty$3.call(HTMLElement.prototype, 'outerHTML')) {
  defineProperty$2(HTMLElement.prototype, 'outerHTML', getOwnPropertyDescriptor$3(Element.prototype, 'outerHTML'));
}

if (hasOwnProperty$3.call(HTMLElement.prototype, 'children')) {
  defineProperty$2(HTMLElement.prototype, 'children', getOwnPropertyDescriptor$3(Element.prototype, 'children'));
}

function querySelectorPatched() {
  const nodeList = arrayFromCollection(querySelectorAll.apply(this, ArraySlice$3.call(arguments)));

  if (isHostElement(this)) {
    const owner = getNodeOwner(this);

    if (isNull$2(owner)) {
      return null;
    } else if (getNodeKey(this)) {
      return getFirstSlottedMatch(this, nodeList);
    } else {
      return getFirstMatch(owner, nodeList);
    }
  } else if (isNodeShadowed(this)) {
    const ownerKey = getNodeOwnerKey(this);

    if (!isUndefined$3(ownerKey)) {
      const elm = ArrayFind$2.call(nodeList, elm => getNodeNearestOwnerKey(elm) === ownerKey);
      return isUndefined$3(elm) ? null : elm;
    } else {
      if (!runtimeFlags$1.ENABLE_NODE_LIST_PATCH) {
        return nodeList.length === 0 ? null : nodeList[0];
      }

      const contextNearestOwnerKey = getNodeNearestOwnerKey(this);
      const elm = ArrayFind$2.call(nodeList, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
      return isUndefined$3(elm) ? null : elm;
    }
  } else {
    if (!runtimeFlags$1.ENABLE_NODE_LIST_PATCH) {
      if (!(this instanceof HTMLBodyElement)) {
        const elm = nodeList[0];
        return isUndefined$3(elm) ? null : elm;
      }
    }

    const elm = ArrayFind$2.call(nodeList, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(this));
    return isUndefined$3(elm) ? null : elm;
  }
}

function getFilteredArrayOfNodes(context, unfilteredNodes, shadowDomSemantic) {
  let filtered;

  if (isHostElement(context)) {
    const owner = getNodeOwner(context);

    if (isNull$2(owner)) {
      filtered = [];
    } else if (getNodeKey(context)) {
      filtered = getAllSlottedMatches(context, unfilteredNodes);
    } else {
      filtered = getAllMatches(owner, unfilteredNodes);
    }
  } else if (isNodeShadowed(context)) {
    const ownerKey = getNodeOwnerKey(context);

    if (!isUndefined$3(ownerKey)) {
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
    } else if (shadowDomSemantic === ShadowDomSemantic.Enabled) {
      const contextNearestOwnerKey = getNodeNearestOwnerKey(context);
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
    } else {
      filtered = ArraySlice$3.call(unfilteredNodes);
    }
  } else {
    if (context instanceof HTMLBodyElement || shadowDomSemantic === ShadowDomSemantic.Enabled) {
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
    } else {
      filtered = ArraySlice$3.call(unfilteredNodes);
    }
  }

  return filtered;
}

defineProperties$2(Element.prototype, {
  querySelector: {
    value: querySelectorPatched,
    writable: true,
    enumerable: true,
    configurable: true
  },
  querySelectorAll: {
    value() {
      const nodeList = arrayFromCollection(querySelectorAll.apply(this, ArraySlice$3.call(arguments)));

      if (!runtimeFlags$1.ENABLE_NODE_LIST_PATCH) {
        const filteredResults = getFilteredArrayOfNodes(this, nodeList, ShadowDomSemantic.Disabled);
        return createStaticNodeList(filteredResults);
      }

      return createStaticNodeList(getFilteredArrayOfNodes(this, nodeList, ShadowDomSemantic.Enabled));
    },

    writable: true,
    enumerable: true,
    configurable: true
  }
});

{
  defineProperties$2(Element.prototype, {
    getElementsByClassName: {
      value() {
        const elements = arrayFromCollection(getElementsByClassName.apply(this, ArraySlice$3.call(arguments)));

        if (!runtimeFlags$1.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }

        const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
        return createStaticHTMLCollection(filteredResults);
      },

      writable: true,
      enumerable: true,
      configurable: true
    },
    getElementsByTagName: {
      value() {
        const elements = arrayFromCollection(getElementsByTagName.apply(this, ArraySlice$3.call(arguments)));

        if (!runtimeFlags$1.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }

        const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
        return createStaticHTMLCollection(filteredResults);
      },

      writable: true,
      enumerable: true,
      configurable: true
    },
    getElementsByTagNameNS: {
      value() {
        const elements = arrayFromCollection(getElementsByTagNameNS.apply(this, ArraySlice$3.call(arguments)));

        if (!runtimeFlags$1.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }

        const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
        return createStaticHTMLCollection(filteredResults);
      },

      writable: true,
      enumerable: true,
      configurable: true
    }
  });
}

if (hasOwnProperty$3.call(HTMLElement.prototype, 'getElementsByClassName')) {
  defineProperty$2(HTMLElement.prototype, 'getElementsByClassName', getOwnPropertyDescriptor$3(Element.prototype, 'getElementsByClassName'));
}

const FocusableSelector = `
    [contenteditable],
    [tabindex],
    a[href],
    area[href],
    audio[controls],
    button,
    iframe,
    input,
    select,
    textarea,
    video[controls]
`;
const formElementTagNames = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);

function filterSequentiallyFocusableElements(elements) {
  return elements.filter(element => {
    if (hasAttribute.call(element, 'tabindex')) {
      return getAttribute.call(element, 'tabindex') === '0';
    }

    if (formElementTagNames.has(tagNameGetter.call(element))) {
      return !hasAttribute.call(element, 'disabled');
    }

    return true;
  });
}

const DidAddMouseDownListener = createHiddenField$2('DidAddMouseDownListener', 'synthetic-shadow');

function isVisible(element) {
  const {
    width,
    height
  } = getBoundingClientRect.call(element);
  const noZeroSize = width > 0 || height > 0;
  const isAreaElement = element.tagName === 'AREA';
  return (noZeroSize || isAreaElement) && getComputedStyle(element).visibility !== 'hidden';
}

function isTabbable(element) {
  if (isHostElement(element) && isDelegatingFocus(element)) {
    return false;
  }

  return matches.call(element, FocusableSelector) && isVisible(element);
}

function hostElementFocus() {
  const _rootNode = this.getRootNode();

  if (_rootNode === this) {
    const focusable = querySelector.call(this, FocusableSelector);

    if (!isNull$2(focusable)) {
      focusable.focus.apply(focusable, arguments);
    }

    return;
  }

  const rootNode = _rootNode;

  if (rootNode.activeElement === this) {
    return;
  }

  const focusables = arrayFromCollection(querySelectorAll.call(this, FocusableSelector));
  let didFocus = false;

  while (!didFocus && focusables.length !== 0) {
    const focusable = focusables.shift();
    focusable.focus.apply(focusable, arguments);
    const currentRootNode = focusable.getRootNode();
    didFocus = currentRootNode.activeElement === focusable;
  }
}

function getTabbableSegments(host) {
  const doc = getOwnerDocument(host);
  const all = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll$1.call(doc, FocusableSelector)));
  const inner = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll.call(host, FocusableSelector)));

  {
    assert$2.invariant(getAttribute.call(host, 'tabindex') === '-1' || isDelegatingFocus(host), `The focusin event is only relevant when the tabIndex property is -1 on the host.`);
  }

  const firstChild = inner[0];
  const lastChild = inner[inner.length - 1];
  const hostIndex = ArrayIndexOf$3.call(all, host);
  const firstChildIndex = hostIndex > -1 ? hostIndex : ArrayIndexOf$3.call(all, firstChild);
  const lastChildIndex = inner.length === 0 ? firstChildIndex + 1 : ArrayIndexOf$3.call(all, lastChild) + 1;
  const prev = ArraySlice$3.call(all, 0, firstChildIndex);
  const next = ArraySlice$3.call(all, lastChildIndex);
  return {
    prev,
    inner,
    next
  };
}

function getActiveElement(host) {
  const doc = getOwnerDocument(host);
  const activeElement = DocumentPrototypeActiveElement.call(doc);

  if (isNull$2(activeElement)) {
    return activeElement;
  }

  return (compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 ? activeElement : null;
}

function relatedTargetPosition(host, relatedTarget) {
  const pos = compareDocumentPosition.call(host, relatedTarget);

  if (pos & DOCUMENT_POSITION_CONTAINED_BY) {
    return 0;
  } else if (pos & DOCUMENT_POSITION_PRECEDING) {
    return 1;
  } else if (pos & DOCUMENT_POSITION_FOLLOWING) {
    return 2;
  }

  return -1;
}

function muteEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

function muteFocusEventsDuringExecution(win, func) {
  windowAddEventListener.call(win, 'focusin', muteEvent, true);
  windowAddEventListener.call(win, 'focusout', muteEvent, true);
  func();
  windowRemoveEventListener.call(win, 'focusin', muteEvent, true);
  windowRemoveEventListener.call(win, 'focusout', muteEvent, true);
}

function focusOnNextOrBlur(segment, target, relatedTarget) {
  const win = getOwnerWindow(relatedTarget);
  const next = getNextTabbable(segment, relatedTarget);

  if (isNull$2(next)) {
    muteFocusEventsDuringExecution(win, () => {
      target.blur();
    });
  } else {
    muteFocusEventsDuringExecution(win, () => {
      next.focus();
    });
  }
}

let letBrowserHandleFocus = false;

function disableKeyboardFocusNavigationRoutines() {
  letBrowserHandleFocus = true;
}

function enableKeyboardFocusNavigationRoutines() {
  letBrowserHandleFocus = false;
}

function skipHostHandler(event) {
  if (letBrowserHandleFocus) {
    enableKeyboardFocusNavigationRoutines();
    return;
  }

  const host = eventCurrentTargetGetter.call(event);
  const target = eventTargetGetter.call(event);

  if (host !== target) {
    return;
  }

  const relatedTarget = focusEventRelatedTargetGetter.call(event);

  if (isNull$2(relatedTarget)) {
    return;
  }

  const segments = getTabbableSegments(host);
  const position = relatedTargetPosition(host, relatedTarget);

  if (position === 1) {
    const findTabbableElms = isTabbableFrom.bind(null, host.getRootNode());
    const first = ArrayFind$2.call(segments.inner, findTabbableElms);

    if (!isUndefined$3(first)) {
      const win = getOwnerWindow(first);
      muteFocusEventsDuringExecution(win, () => {
        first.focus();
      });
    } else {
      focusOnNextOrBlur(segments.next, target, relatedTarget);
    }
  } else if (host === target) {
    focusOnNextOrBlur(ArrayReverse$2.call(segments.prev), target, relatedTarget);
  }
}

function skipShadowHandler(event) {
  if (letBrowserHandleFocus) {
    enableKeyboardFocusNavigationRoutines();
    return;
  }

  const relatedTarget = focusEventRelatedTargetGetter.call(event);

  if (isNull$2(relatedTarget)) {
    return;
  }

  const host = eventCurrentTargetGetter.call(event);
  const segments = getTabbableSegments(host);

  if (ArrayIndexOf$3.call(segments.inner, relatedTarget) !== -1) {
    return;
  }

  const target = eventTargetGetter.call(event);
  const position = relatedTargetPosition(host, relatedTarget);

  if (position === 1) {
    focusOnNextOrBlur(segments.next, target, relatedTarget);
  }

  if (position === 2) {
    focusOnNextOrBlur(ArrayReverse$2.call(segments.prev), target, relatedTarget);
  }
}

function isTabbableFrom(fromRoot, toElm) {
  if (!isTabbable(toElm)) {
    return false;
  }

  const ownerDocument = getOwnerDocument(toElm);
  let root = toElm.getRootNode();

  while (root !== ownerDocument && root !== fromRoot) {
    const sr = root;
    const host = sr.host;

    if (getAttribute.call(host, 'tabindex') === '-1') {
      return false;
    }

    root = host && host.getRootNode();
  }

  return true;
}

function getNextTabbable(tabbables, relatedTarget) {
  const len = tabbables.length;

  if (len > 0) {
    for (let i = 0; i < len; i += 1) {
      const next = tabbables[i];

      if (isTabbableFrom(relatedTarget.getRootNode(), next)) {
        return next;
      }
    }
  }

  return null;
}

function handleFocus(elm) {
  {
    assert$2.invariant(isDelegatingFocus(elm), `Invalid attempt to handle focus event for ${toString$2(elm)}. ${toString$2(elm)} should have delegates focus true, but is not delegating focus`);
  }

  bindDocumentMousedownMouseupHandlers(elm);
  ignoreFocusIn(elm);
  addEventListener.call(elm, 'focusin', skipHostHandler, true);
}

function ignoreFocus(elm) {
  removeEventListener.call(elm, 'focusin', skipHostHandler, true);
}

function bindDocumentMousedownMouseupHandlers(elm) {
  const ownerDocument = getOwnerDocument(elm);

  if (!getHiddenField$2(ownerDocument, DidAddMouseDownListener)) {
    setHiddenField$2(ownerDocument, DidAddMouseDownListener, true);
    addEventListener.call(ownerDocument, 'mousedown', disableKeyboardFocusNavigationRoutines, true);
    addEventListener.call(ownerDocument, 'mouseup', () => {
      setTimeout(enableKeyboardFocusNavigationRoutines);
    }, true);
  }
}

function handleFocusIn(elm) {
  {
    assert$2.invariant(tabIndexGetter.call(elm) === -1, `Invalid attempt to handle focus in  ${toString$2(elm)}. ${toString$2(elm)} should have tabIndex -1, but has tabIndex ${tabIndexGetter.call(elm)}`);
  }

  bindDocumentMousedownMouseupHandlers(elm);
  ignoreFocus(elm);
  addEventListener.call(elm, 'focusin', skipShadowHandler, true);
}

function ignoreFocusIn(elm) {
  removeEventListener.call(elm, 'focusin', skipShadowHandler, true);
}

const {
  blur,
  focus
} = HTMLElement.prototype;

function tabIndexGetterPatched() {
  if (isDelegatingFocus(this) && isFalse$1$2(hasAttribute.call(this, 'tabindex'))) {
    return 0;
  }

  return tabIndexGetter.call(this);
}

function tabIndexSetterPatched(value) {
  const delegatesFocus = isDelegatingFocus(this);
  const prevValue = tabIndexGetter.call(this);
  const prevHasAttr = hasAttribute.call(this, 'tabindex');
  tabIndexSetter.call(this, value);
  const currValue = tabIndexGetter.call(this);
  const currHasAttr = hasAttribute.call(this, 'tabindex');
  const didValueChange = prevValue !== currValue;

  if (prevHasAttr && (didValueChange || isFalse$1$2(currHasAttr))) {
    if (prevValue === -1) {
      ignoreFocusIn(this);
    }

    if (prevValue === 0 && delegatesFocus) {
      ignoreFocus(this);
    }
  }

  if (isFalse$1$2(currHasAttr)) {
    return;
  }

  if (prevHasAttr && currHasAttr && isFalse$1$2(didValueChange)) {
    return;
  }

  if (currValue === -1) {
    handleFocusIn(this);
  }

  if (currValue === 0 && delegatesFocus) {
    handleFocus(this);
  }
}

function blurPatched() {
  if (isDelegatingFocus(this)) {
    const currentActiveElement = getActiveElement(this);

    if (!isNull$2(currentActiveElement)) {
      currentActiveElement.blur();
      return;
    }
  }

  return blur.call(this);
}

function focusPatched() {
  disableKeyboardFocusNavigationRoutines();

  if (isHostElement(this) && isDelegatingFocus(this)) {
    hostElementFocus.call(this);
    return;
  }

  focus.apply(this, arguments);
  enableKeyboardFocusNavigationRoutines();
}

defineProperties$2(HTMLElement.prototype, {
  tabIndex: {
    get() {
      if (isHostElement(this)) {
        return tabIndexGetterPatched.call(this);
      }

      return tabIndexGetter.call(this);
    },

    set(v) {
      if (isHostElement(this)) {
        return tabIndexSetterPatched.call(this, v);
      }

      return tabIndexSetter.call(this, v);
    },

    enumerable: true,
    configurable: true
  },
  blur: {
    value() {
      if (isHostElement(this)) {
        return blurPatched.call(this);
      }

      blur.call(this);
    },

    enumerable: true,
    writable: true,
    configurable: true
  },
  focus: {
    value() {
      focusPatched.apply(this, arguments);
    },

    enumerable: true,
    writable: true,
    configurable: true
  }
});
const {
  addEventListener: superAddEventListener,
  removeEventListener: superRemoveEventListener
} = Node.prototype;

function addEventListenerPatched(type, listener, options) {
  if (isHostElement(this)) {
    addCustomElementEventListener(this, type, listener);
  } else {
    superAddEventListener.call(this, type, listener, options);
  }
}

function removeEventListenerPatched(type, listener, options) {
  if (isHostElement(this)) {
    removeCustomElementEventListener(this, type, listener);
  } else {
    superRemoveEventListener.call(this, type, listener, options);
  }
}

if (typeof EventTarget !== 'undefined') {
  defineProperties$2(EventTarget.prototype, {
    addEventListener: {
      value: addEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    },
    removeEventListener: {
      value: removeEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    }
  });
} else {
  defineProperties$2(Node.prototype, {
    addEventListener: {
      value: addEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    },
    removeEventListener: {
      value: removeEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    }
  });
}

const ShadowTokenKey = '$shadowToken$';
const ShadowTokenPrivateKey = '$$ShadowTokenKey$$';

function getShadowToken(node) {
  return node[ShadowTokenKey];
}

function setShadowToken(node, shadowToken) {
  node[ShadowTokenKey] = shadowToken;
}

defineProperty$2(Element.prototype, ShadowTokenKey, {
  set(shadowToken) {
    const oldShadowToken = this[ShadowTokenPrivateKey];

    if (!isUndefined$3(oldShadowToken) && oldShadowToken !== shadowToken) {
      removeAttribute.call(this, oldShadowToken);
    }

    if (!isUndefined$3(shadowToken)) {
      setAttribute.call(this, shadowToken, '');
    }

    this[ShadowTokenPrivateKey] = shadowToken;
  },

  get() {
    return this[ShadowTokenPrivateKey];
  },

  configurable: true
});
const DomManualPrivateKey = '$$DomManualKey$$';

const DocumentResolverFn = function () {};

let portalObserver;
const portalObserverConfig = {
  childList: true
};

function adoptChildNode(node, fn, shadowToken) {
  const previousNodeShadowResolver = getShadowRootResolver(node);

  if (previousNodeShadowResolver === fn) {
    return;
  }

  setShadowRootResolver(node, fn);

  if (node instanceof Element) {
    setShadowToken(node, shadowToken);

    if (isHostElement(node)) {
      return;
    }

    if (isUndefined$3(previousNodeShadowResolver)) {
      MutationObserverObserve.call(portalObserver, node, portalObserverConfig);
    }

    const childNodes = childNodesGetter.call(node);

    for (let i = 0, len = childNodes.length; i < len; i += 1) {
      adoptChildNode(childNodes[i], fn, shadowToken);
    }
  }
}

function initPortalObserver() {
  return new MO(mutations => {
    forEach$2.call(mutations, mutation => {
      const {
        target: elm,
        addedNodes,
        removedNodes
      } = mutation;
      const fn = getShadowRootResolver(elm);
      const shadowToken = getShadowToken(elm);

      for (let i = 0, len = removedNodes.length; i < len; i += 1) {
        const node = removedNodes[i];

        if (!(compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
          adoptChildNode(node, DocumentResolverFn, undefined);
        }
      }

      for (let i = 0, len = addedNodes.length; i < len; i += 1) {
        const node = addedNodes[i];

        if (compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          adoptChildNode(node, fn, shadowToken);
        }
      }
    });
  });
}

function markElementAsPortal(elm) {
  if (isUndefined$3(portalObserver)) {
    portalObserver = initPortalObserver();
  }

  if (isUndefined$3(getShadowRootResolver(elm))) {
    throw new Error(`Invalid Element`);
  }

  MutationObserverObserve.call(portalObserver, elm, portalObserverConfig);
}

defineProperty$2(Element.prototype, '$domManual$', {
  set(v) {
    this[DomManualPrivateKey] = v;

    if (isTrue$1$2(v)) {
      markElementAsPortal(this);
    }
  },

  get() {
    return this[DomManualPrivateKey];
  },

  configurable: true
});
/** version: 1.7.7 */

function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";article", shadowSelector, ",aside", shadowSelector, ",details", shadowSelector, ",figcaption", shadowSelector, ",figure", shadowSelector, ",footer", shadowSelector, ",header", shadowSelector, ",hgroup", shadowSelector, ",main", shadowSelector, ",menu", shadowSelector, ",nav", shadowSelector, ",section", shadowSelector, ",summary", shadowSelector, " {display: block;}\naudio", shadowSelector, ",canvas", shadowSelector, ",progress", shadowSelector, ",video", shadowSelector, " {display: inline-block;vertical-align: baseline;}\naudio:not([controls])", shadowSelector, " {display: none;height: 0;}\ntemplate", shadowSelector, " {display: none;}\na", shadowSelector, " {background-color: transparent;}\na:active", shadowSelector, ",a:hover", shadowSelector, " {outline: 0;}\nabbr[title]", shadowSelector, " {border-bottom: 1px dotted;}\nb", shadowSelector, ",strong", shadowSelector, " {font-weight: bold;}\ndfn", shadowSelector, " {font-style: italic;}\nh1", shadowSelector, " {font-size: 2em;margin: 0.67em 0;}\nmark", shadowSelector, " {background: #ff0;color: #000;}\nsmall", shadowSelector, " {font-size: 80%;}\nsub", shadowSelector, ",sup", shadowSelector, " {font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;}\nsup", shadowSelector, " {top: -0.5em;}\nsub", shadowSelector, " {bottom: -0.25em;}\nimg", shadowSelector, " {border: 0;}\nfigure", shadowSelector, " {margin: 1em 40px;}\nhr", shadowSelector, " {-moz-box-sizing: content-box;-webkit-box-sizing: content-box;box-sizing: content-box;height: 0;}\npre", shadowSelector, " {overflow: auto;}\ncode", shadowSelector, ",kbd", shadowSelector, ",pre", shadowSelector, ",samp", shadowSelector, " {font-family: monospace, monospace;font-size: 1em;}\nbutton", shadowSelector, ",input", shadowSelector, ",optgroup", shadowSelector, ",select", shadowSelector, ",textarea", shadowSelector, " {color: inherit;font: inherit;margin: 0;}\nbutton", shadowSelector, " {overflow: visible;}\nbutton", shadowSelector, ",select", shadowSelector, " {text-transform: none;}\nbutton", shadowSelector, ",input[type=\"button\"]", shadowSelector, ",input[type=\"reset\"]", shadowSelector, ",input[type=\"submit\"]", shadowSelector, " {-webkit-appearance: button;cursor: pointer;}\nbutton[disabled]", shadowSelector, ",input[disabled]", shadowSelector, " {cursor: default;}\nbutton", shadowSelector, "::-moz-focus-inner,input", shadowSelector, "::-moz-focus-inner {border: 0;padding: 0;}\ninput", shadowSelector, " {line-height: normal;}\ninput[type=\"checkbox\"]", shadowSelector, ",input[type=\"radio\"]", shadowSelector, " {-webkit-box-sizing: border-box;box-sizing: border-box;padding: 0;}\ninput[type=\"number\"]", shadowSelector, "::-webkit-inner-spin-button,input[type=\"number\"]", shadowSelector, "::-webkit-outer-spin-button {height: auto;}\ninput[type=\"search\"]", shadowSelector, " {-webkit-appearance: textfield;-moz-box-sizing: content-box;-webkit-box-sizing: content-box;box-sizing: content-box;}\ninput[type=\"search\"]", shadowSelector, "::-webkit-search-cancel-button,input[type=\"search\"]", shadowSelector, "::-webkit-search-decoration {-webkit-appearance: none;}\nfieldset", shadowSelector, " {border: 1px solid #c0c0c0;margin: 0 2px;padding: 0.35em 0.625em 0.75em;}\nlegend", shadowSelector, " {border: 0;padding: 0;}\ntextarea", shadowSelector, " {overflow: auto;}\noptgroup", shadowSelector, " {font-weight: bold;}\ntable", shadowSelector, " {border-collapse: collapse;border-spacing: 0;}\ntd", shadowSelector, ",th", shadowSelector, " {padding: 0;}\n*", shadowSelector, ",*", shadowSelector, ":before,*", shadowSelector, ":after {-webkit-box-sizing: border-box;box-sizing: border-box;}\n", shadowSelector, "::-webkit-input-placeholder {color: #706e6b;font-weight: 400;}\n", shadowSelector, "::-moz-placeholder {color: #706e6b;font-weight: 400;}\n:-ms-input-placeholder", shadowSelector, " {color: #706e6b;font-weight: 400;}\n", shadowSelector, "::-ms-input-placeholder {color: #706e6b;font-weight: 400;}\n", shadowSelector, "::placeholder {color: #706e6b;font-weight: 400;}\n", shadowSelector, "::-moz-selection {background: #d8edff;text-shadow: none;color: #080707;}\n", shadowSelector, "::selection {background: #d8edff;text-shadow: none;color: #080707;}\nh1", shadowSelector, ",h2", shadowSelector, ",h3", shadowSelector, ",h4", shadowSelector, ",h5", shadowSelector, ",h6", shadowSelector, ",p", shadowSelector, ",ol", shadowSelector, ",ul", shadowSelector, ",dl", shadowSelector, ",fieldset", shadowSelector, " {margin: 0;padding: 0;}\ndd", shadowSelector, ",figure", shadowSelector, " {margin: 0;}\nabbr[title]", shadowSelector, " {text-decoration: none;}\nabbr[title]", shadowSelector, ",fieldset", shadowSelector, ",hr", shadowSelector, " {border: 0;}\nhr", shadowSelector, " {padding: 0;}\nh1", shadowSelector, ",h2", shadowSelector, ",h3", shadowSelector, ",h4", shadowSelector, ",h5", shadowSelector, ",h6", shadowSelector, " {font-weight: inherit;font-size: 1em;}\nol", shadowSelector, ",ul", shadowSelector, " {list-style: none;}\na", shadowSelector, " {color: #006dcc;text-decoration: none;-webkit-transition: color 0.1s linear;transition: color 0.1s linear;}\na:hover", shadowSelector, ",a:focus", shadowSelector, " {text-decoration: underline;color: #005fb2;}\na:active", shadowSelector, " {color: #005fb2;}\na", shadowSelector, ",button", shadowSelector, " {cursor: pointer;}\nb", shadowSelector, ",strong", shadowSelector, ",dfn", shadowSelector, " {font-weight: 700;}\nmark", shadowSelector, " {background-color: #fff03f;color: #080707;}\nabbr[title]", shadowSelector, " {cursor: help;}\ninput[type=\"search\"]", shadowSelector, " {-webkit-box-sizing: border-box;box-sizing: border-box;}\ntable", shadowSelector, " {width: 100%;}\ncaption", shadowSelector, ",th", shadowSelector, ",td", shadowSelector, " {text-align: left;}\nhr", shadowSelector, " {display: block;margin: 2rem 0;border-top: 1px solid #dddbda;height: 1px;clear: both;}\naudio", shadowSelector, ",canvas", shadowSelector, ",iframe", shadowSelector, ",img", shadowSelector, ",svg", shadowSelector, ",video", shadowSelector, " {vertical-align: middle;}\nimg", shadowSelector, " {max-width: 100%;height: auto;}\n"].join('');
}
var stylesheet0 = [stylesheet];

function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-accordion", shadowSelector, " {position: relative;}\n.slds-accordion__list-item", shadowSelector, " {border-top: 1px solid #dddbda;}\n.slds-accordion__list-item:first-child", shadowSelector, " {border-top: 0;}\n.slds-accordion__summary", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;}\n.slds-accordion__summary-heading", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-flex: 1;-ms-flex-positive: 1;flex-grow: 1;min-width: 0;font-size: 1rem;line-height: 1.25;}\n.slds-accordion__summary-heading", shadowSelector, " .slds-button:focus", shadowSelector, " {text-decoration: underline;-webkit-box-shadow: none;box-shadow: none;}\n.slds-accordion__summary-action", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-flex: 1;-ms-flex-positive: 1;flex-grow: 1;-webkit-box-align: center;-ms-flex-align: center;align-items: center;min-width: 0;}\n.slds-accordion__summary-action-icon", shadowSelector, " {-ms-flex-negative: 0;flex-shrink: 0;-webkit-transform: rotate(-90deg);transform: rotate(-90deg);}\n[dir=\"rtl\"]", shadowSelector, " .slds-accordion__summary-action-icon", shadowSelector, " {-webkit-transform: rotate(90deg);transform: rotate(90deg);}\n@media (min-width: 64em) {.slds-accordion__summary-content", shadowSelector, " {max-width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}\n}.slds-accordion__section", shadowSelector, " {padding: 0.75rem;}\n.slds-accordion__content", shadowSelector, " {overflow: hidden;visibility: hidden;opacity: 0;height: 0;}\n.slds-is-open", shadowSelector, " > .slds-accordion__summary", shadowSelector, " {margin-bottom: 0.75rem;}\n.slds-is-open", shadowSelector, " > .slds-accordion__summary", shadowSelector, " .slds-accordion__summary-action-icon", shadowSelector, " {-webkit-transform: rotate(0deg);transform: rotate(0deg);}\n.slds-is-open", shadowSelector, " > .slds-accordion__content", shadowSelector, " {overflow: visible;visibility: visible;opacity: 1;height: auto;}\n"].join('');
}
var stylesheet1 = [stylesheet$1];

function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-avatar", shadowSelector, " {width: 2rem;height: 2rem;overflow: hidden;display: inline-block;vertical-align: middle;border-radius: 0.25rem;line-height: 1;font-size: 0.875rem;color: white;}\n.slds-avatar:hover", shadowSelector, ",.slds-avatar:focus:hover", shadowSelector, " {color: currentColor;}\n.slds-avatar.slds-avatar_group-image-small", shadowSelector, " {background: url(\"/assets/images/group_avatar_96.png\") top left/cover no-repeat;}\n.slds-avatar.slds-avatar_group-image-medium", shadowSelector, " {background: url(\"/assets/images/group_avatar_160.png\") top left/cover no-repeat;}\n.slds-avatar.slds-avatar_group-image-large", shadowSelector, " {background: url(\"/assets/images/group_avatar_200.png\") top left/cover no-repeat;}\n.slds-avatar.slds-avatar_profile-image-small", shadowSelector, " {background: url(\"/assets/images/profile_avatar_96.png\") top left/cover no-repeat;}\n.slds-avatar.slds-avatar_profile-image-medium", shadowSelector, " {background: url(\"/assets/images/profile_avatar_160.png\") top left/cover no-repeat;}\n.slds-avatar.slds-avatar_profile-image-large", shadowSelector, " {background: url(\"/assets/images/profile_avatar_200.png\") top left/cover no-repeat;}\n.slds-avatar_x-small", shadowSelector, " {width: 1.25rem;height: 1.25rem;font-size: 0.625rem;}\n.slds-avatar_x-small", shadowSelector, " .slds-icon", shadowSelector, " {width: 1.25rem;height: 1.25rem;}\n.slds-avatar_small", shadowSelector, " {width: 1.5rem;height: 1.5rem;font-size: 0.625rem;}\n.slds-avatar_small", shadowSelector, " .slds-icon", shadowSelector, " {width: 1.5rem;height: 1.5rem;}\n.slds-avatar_medium", shadowSelector, " {width: 2rem;height: 2rem;font-size: 0.875rem;}\n.slds-avatar_medium", shadowSelector, " .slds-icon", shadowSelector, " {width: 2rem;height: 2rem;}\n.slds-avatar_large", shadowSelector, " {width: 3rem;height: 3rem;font-size: 1.125rem;font-weight: 300;line-height: 1.25;}\n.slds-avatar_large", shadowSelector, " .slds-icon", shadowSelector, " {width: 3rem;height: 3rem;}\n.slds-avatar_circle", shadowSelector, " {border-radius: 50%;}\n.slds-avatar_empty", shadowSelector, " {border: 1px dashed #dddbda;}\n.slds-avatar__initials", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;-ms-flex-line-pack: center;align-content: center;-webkit-box-align: center;-ms-flex-align: center;align-items: center;margin: auto;height: 100%;text-shadow: 0 0 1px rgba(0, 0, 0, 0.8);}\n.slds-avatar__initials[title]", shadowSelector, " {cursor: default;text-decoration: none;}\n.slds-avatar__initials:hover", shadowSelector, " {color: white;cursor: default;}\n.slds-avatar__initials_inverse", shadowSelector, " {background-color: #f3f2f2;color: #3e3e3c;text-shadow: none;}\n.slds-avatar__initials_inverse:hover", shadowSelector, " {color: #3e3e3c;}\n"].join('');
}
var stylesheet2 = [stylesheet$2];

function stylesheet$3(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-badge", shadowSelector, " {background-color: #ecebea;padding: 0.25rem 0.5rem;border-radius: 15rem;font-size: 0.75rem;font-weight: 700;line-height: normal;color: #080707;white-space: nowrap;display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}\n.slds-badge", shadowSelector, " + .slds-badge", shadowSelector, " {margin-left: 0.5rem;}\n.slds-badge:empty", shadowSelector, " {padding: 0;}\n.slds-badge_inverse", shadowSelector, " {background-color: #706e6b;color: white;}\n.slds-badge_lightest", shadowSelector, " {border: 1px solid #dddbda;background-color: white;font-size: 0.75rem;text-transform: none;letter-spacing: normal;}\n.slds-badge__icon", shadowSelector, " {color: #706e6b;vertical-align: middle;display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;line-height: 1;}\n.slds-badge__icon.slds-badge__icon_inverse", shadowSelector, " {color: currentColor;}\n.slds-badge__icon_left", shadowSelector, " {margin-right: 0.25rem;}\n.slds-badge__icon_right", shadowSelector, " {margin-left: 0.25rem;}\n"].join('');
}
var stylesheet3 = [stylesheet$3];

function stylesheet$4(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-breadcrumb", shadowSelector, " {}\n.slds-breadcrumb", shadowSelector, " .slds-list__item", shadowSelector, ",.slds-breadcrumb__item", shadowSelector, " {position: relative;}\n.slds-breadcrumb", shadowSelector, " .slds-list__item", shadowSelector, ":before,.slds-breadcrumb__item", shadowSelector, ":before {content: \">\";position: absolute;left: -0.25rem;}\n.slds-breadcrumb", shadowSelector, " .slds-list__item", shadowSelector, " > a", shadowSelector, ",.slds-breadcrumb__item", shadowSelector, " > a", shadowSelector, " {display: block;padding: 0 0.5rem;}\n.slds-breadcrumb", shadowSelector, " .slds-list__item", shadowSelector, " > a:hover", shadowSelector, ",.slds-breadcrumb__item", shadowSelector, " > a:hover", shadowSelector, " {text-decoration: none;}\n.slds-breadcrumb", shadowSelector, " .slds-list__item:first-child", shadowSelector, " > a", shadowSelector, ",.slds-breadcrumb__item:first-child", shadowSelector, " > a", shadowSelector, " {padding-left: 0;}\n.slds-breadcrumb", shadowSelector, " .slds-list__item:first-child", shadowSelector, ":before,.slds-breadcrumb__item:first-child", shadowSelector, ":before {content: \"\";}\n.slds-breadcrumb", shadowSelector, " .slds-dropdown-trigger", shadowSelector, " {margin-right: 0.5rem;}\n"].join('');
}
var stylesheet4 = [stylesheet$4];

function stylesheet$5(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-button-group", shadowSelector, ",.slds-button-group-list", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n.slds-button-group", shadowSelector, " .slds-button", shadowSelector, ",.slds-button-group-list", shadowSelector, " .slds-button", shadowSelector, " {border-radius: 0;border-width: 1px;}\n.slds-button-group", shadowSelector, " .slds-button:focus", shadowSelector, ",.slds-button-group-list", shadowSelector, " .slds-button:focus", shadowSelector, " {z-index: 1;}\n.slds-button-group", shadowSelector, " .slds-button", shadowSelector, " + .slds-button", shadowSelector, ",.slds-button-group", shadowSelector, " .slds-button", shadowSelector, " + .slds-button_last", shadowSelector, " .slds-button", shadowSelector, ",.slds-button-group-list", shadowSelector, " li", shadowSelector, " + li", shadowSelector, " .slds-button", shadowSelector, " {margin-left: -1px;}\n.slds-button-group", shadowSelector, " .slds-button_brand", shadowSelector, " + .slds-button_last", shadowSelector, " .slds-button_icon-brand", shadowSelector, ",.slds-button-group-list", shadowSelector, " li:last-child", shadowSelector, " .slds-button_icon-brand", shadowSelector, " {-webkit-box-shadow: inset 1px 0 0 white;box-shadow: inset 1px 0 0 white;}\n.slds-button-group-list", shadowSelector, " li:first-child", shadowSelector, " .slds-button", shadowSelector, ",.slds-button-group", shadowSelector, " .slds-button:first-child", shadowSelector, " {border-radius: 0.25rem 0 0 0.25rem;}\n.slds-button-group", shadowSelector, " .slds-button:last-child", shadowSelector, ",.slds-button-group-list", shadowSelector, " li:last-child", shadowSelector, " .slds-button", shadowSelector, ",.slds-button-group", shadowSelector, " .slds-button_last", shadowSelector, " .slds-button", shadowSelector, ",.slds-button-group", shadowSelector, " .slds-button.slds-button_last", shadowSelector, ",.slds-button-group", shadowSelector, " .slds-button_last", shadowSelector, " .slds-button:only-child", shadowSelector, ",.slds-button-group", shadowSelector, " .slds-button.slds-button_last", shadowSelector, " {border-radius: 0 0.25rem 0.25rem 0;}\n.slds-button-group", shadowSelector, " .slds-button:only-child", shadowSelector, ",.slds-button-group-list", shadowSelector, " li:only-child", shadowSelector, " .slds-button", shadowSelector, " {border-radius: 0.25rem;}\n.slds-button.slds-button_first.slds-button_first", shadowSelector, " {border-right: 0;border-radius: 0.25rem 0 0 0.25rem;}\n.slds-button.slds-button_middle.slds-button_middle", shadowSelector, " {border-radius: 0;margin-left: -1px;}\n.slds-button.slds-button_last.slds-button_last", shadowSelector, " {border-radius: 0 0.25rem 0.25rem 0;margin-left: -1px;}\n.slds-button-group", shadowSelector, " + .slds-button-group", shadowSelector, ",.slds-button-group", shadowSelector, " + .slds-button-group-list", shadowSelector, ",.slds-button-group", shadowSelector, " + .slds-button", shadowSelector, ",.slds-button-group-list", shadowSelector, " + .slds-button-group-list", shadowSelector, ",.slds-button-group-list", shadowSelector, " + .slds-button-group", shadowSelector, ",.slds-button-group-list", shadowSelector, " + .slds-button", shadowSelector, " {margin-left: 0.25rem;}\n"].join('');
}
var stylesheet5 = [stylesheet$5];

function stylesheet$6(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-button-group-row", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n.slds-button-group-row", shadowSelector, " .slds-button-group-item", shadowSelector, " + .slds-button-group-item", shadowSelector, " {margin-left: 0.25rem;}\n.slds-button-group-row", shadowSelector, " .slds-button-group-item", shadowSelector, " .slds-button", shadowSelector, " {margin: 0;}\n"].join('');
}
var stylesheet6 = [stylesheet$6];

function stylesheet$7(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-button_icon", shadowSelector, ",.slds-button_icon-inverse", shadowSelector, ",.slds-button_icon-container", shadowSelector, ",.slds-button_icon-border", shadowSelector, ",.slds-button_icon-border-filled", shadowSelector, ",.slds-button_icon-border-inverse", shadowSelector, ",.slds-button_icon-more", shadowSelector, ",.slds-button_icon-error", shadowSelector, " {line-height: 1;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;color: #706e6b;-ms-flex-negative: 0;flex-shrink: 0;}\n.slds-button_icon-container", shadowSelector, ",.slds-button_icon-border", shadowSelector, ",.slds-button_icon-border-filled", shadowSelector, ",.slds-button_icon-border-inverse", shadowSelector, ",.slds-button_icon-brand", shadowSelector, ",.slds-button_icon-more", shadowSelector, ",.slds-button_icon-container-more", shadowSelector, " {width: 2rem;height: 2rem;}\n.slds-button_icon-border-filled", shadowSelector, ",.slds-button_icon-border", shadowSelector, " {line-height: 1;vertical-align: middle;color: #706e6b;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;border-color: #dddbda;}\n.slds-button_icon-border-filled[disabled]", shadowSelector, ",.slds-button_icon-border-filled:disabled", shadowSelector, ",.slds-button_icon-border[disabled]", shadowSelector, ",.slds-button_icon-border:disabled", shadowSelector, " {color: #dddbda;}\n.slds-button_icon-border-inverse", shadowSelector, " {background-color: rgba(0, 0, 0, 0);border-color: #dddbda;}\n.slds-button_icon-border-inverse[disabled]", shadowSelector, ",.slds-button_icon-border-inverse:disabled", shadowSelector, " {background-color: rgba(0, 0, 0, 0);border-color: rgba(255, 255, 255, 0.15);}\n.slds-button_icon-brand", shadowSelector, " {background-color: #0070d2;border-color: #0070d2;color: white;}\n.slds-button_icon-brand:link", shadowSelector, ",.slds-button_icon-brand:visited", shadowSelector, ",.slds-button_icon-brand:active", shadowSelector, " {color: white;}\n.slds-button_icon-brand:hover", shadowSelector, ",.slds-button_icon-brand:focus", shadowSelector, " {background-color: #005fb2;border-color: #005fb2;color: white;}\n.slds-button_icon-brand:active", shadowSelector, " {background-color: #005fb2;border-color: #005fb2;}\n.slds-button_icon-brand[disabled]", shadowSelector, ",.slds-button_icon-brand:disabled", shadowSelector, " {background: #c9c7c5;border-color: #c9c7c5;color: white;}\n.slds-button_icon-border-filled", shadowSelector, " {background-color: white;}\n.slds-button_icon-border-filled[disabled]", shadowSelector, ",.slds-button_icon-border-filled:disabled", shadowSelector, " {border-color: #dddbda;background-color: white;}\n.slds-button_icon-inverse", shadowSelector, ",.slds-button_icon-border-inverse", shadowSelector, " {color: white;}\n.slds-button_icon-inverse:hover", shadowSelector, ",.slds-button_icon-inverse:focus", shadowSelector, ",.slds-button_icon-border-inverse:hover", shadowSelector, ",.slds-button_icon-border-inverse:focus", shadowSelector, " {color: rgba(255, 255, 255, 0.75);}\n.slds-button_icon-inverse:focus", shadowSelector, ",.slds-button_icon-border-inverse:focus", shadowSelector, " {outline: none;-webkit-box-shadow: 0 0 3px #ecebea;box-shadow: 0 0 3px #ecebea;border: 1px solid #ecebea;}\n.slds-button_icon-inverse:active", shadowSelector, ",.slds-button_icon-border-inverse:active", shadowSelector, " {color: rgba(255, 255, 255, 0.5);}\n.slds-button_icon-inverse[disabled]", shadowSelector, ",.slds-button_icon-inverse:disabled", shadowSelector, ",.slds-button_icon-border-inverse[disabled]", shadowSelector, ",.slds-button_icon-border-inverse:disabled", shadowSelector, " {color: rgba(255, 255, 255, 0.15);}\n.slds-button_icon-error", shadowSelector, ",.slds-button_icon-error:hover", shadowSelector, ",.slds-button_icon-error:active", shadowSelector, ",.slds-button_icon-error:focus", shadowSelector, " {color: #c23934;}\n.slds-button_icon-current-color", shadowSelector, " {color: currentColor;}\n.slds-button_icon-small", shadowSelector, " {width: 1.5rem;height: 1.5rem;}\n.slds-button_icon-x-small", shadowSelector, " {width: 1.25rem;height: 1.25rem;line-height: 1;}\n.slds-button_icon-x-small", shadowSelector, " .slds-button__icon", shadowSelector, " {width: 0.75rem;height: 0.75rem;}\n.slds-button_icon-xx-small", shadowSelector, " {width: 1rem;height: 1rem;line-height: 1;}\n.slds-button_icon-xx-small", shadowSelector, " .slds-button__icon", shadowSelector, " {width: 0.5rem;height: 0.5rem;}\n.slds-button_icon-more", shadowSelector, " {width: auto;line-height: 1.875rem;padding: 0 0.5rem;background-color: white;border-color: #dddbda;color: #706e6b;}\n.slds-button_icon-more:hover", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-more:focus", shadowSelector, " .slds-button__icon", shadowSelector, " {fill: #0070d2;}\n.slds-button_icon-more:active", shadowSelector, " .slds-button__icon", shadowSelector, " {fill: #005fb2;}\n.slds-button_icon-more[disabled]", shadowSelector, ",.slds-button_icon-more:disabled", shadowSelector, " {cursor: default;}\n.slds-button_icon-more[disabled]", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-more:disabled", shadowSelector, " .slds-button__icon", shadowSelector, " {fill: #dddbda;}\n.slds-button_icon-container-more", shadowSelector, " {width: auto;line-height: 1.875rem;padding: 0 0.5rem;vertical-align: middle;}\n.slds-button__icon_hint", shadowSelector, " {fill: #b0adab;}\n.slds-button__icon_inverse-hint", shadowSelector, " {fill: rgba(255, 255, 255, 0.5);}\n.slds-hint-parent", shadowSelector, " .slds-button_icon-border-inverse", shadowSelector, " {border-color: rgba(255, 255, 255, 0.5);}\n.slds-hint-parent", shadowSelector, " .slds-button_icon-border-inverse:focus", shadowSelector, " {border-color: rgba(255, 255, 255, 0.75);}\n.slds-hint-parent:hover", shadowSelector, " .slds-button_icon-border-inverse", shadowSelector, ",.slds-hint-parent:focus", shadowSelector, " .slds-button_icon-border-inverse", shadowSelector, " {border-color: rgba(255, 255, 255, 0.75);}\n.slds-hint-parent:hover", shadowSelector, " .slds-button__icon_hint", shadowSelector, ",.slds-hint-parent:focus", shadowSelector, " .slds-button__icon_hint", shadowSelector, " {fill: #706e6b;}\n.slds-hint-parent:hover", shadowSelector, " .slds-button__icon_inverse-hint", shadowSelector, ",.slds-hint-parent:focus", shadowSelector, " .slds-button__icon_inverse-hint", shadowSelector, " {fill: rgba(255, 255, 255, 0.75);}\n.slds-hint-parent:hover", shadowSelector, " .slds-button:disabled", shadowSelector, " .slds-button__icon_hint", shadowSelector, ",.slds-hint-parent:focus", shadowSelector, " .slds-button:disabled", shadowSelector, " .slds-button__icon_hint", shadowSelector, " {fill: currentColor;}\n"].join('');
}
var stylesheet7 = [stylesheet$7];

function stylesheet$8(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-button_icon-container.slds-is-selected", shadowSelector, ",.slds-button_icon-border.slds-is-selected", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected", shadowSelector, " {background-color: #0070d2;border-color: #0070d2;color: white;}\n.slds-button_icon-container.slds-is-selected:link", shadowSelector, ",.slds-button_icon-container.slds-is-selected:visited", shadowSelector, ",.slds-button_icon-container.slds-is-selected:active", shadowSelector, ",.slds-button_icon-border.slds-is-selected:link", shadowSelector, ",.slds-button_icon-border.slds-is-selected:visited", shadowSelector, ",.slds-button_icon-border.slds-is-selected:active", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:link", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:visited", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:active", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:link", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:visited", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:active", shadowSelector, " {color: white;}\n.slds-button_icon-container.slds-is-selected:hover", shadowSelector, ",.slds-button_icon-container.slds-is-selected:focus", shadowSelector, ",.slds-button_icon-border.slds-is-selected:hover", shadowSelector, ",.slds-button_icon-border.slds-is-selected:focus", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:hover", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:focus", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:hover", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:focus", shadowSelector, " {background-color: #005fb2;border-color: #005fb2;color: white;}\n.slds-button_icon-container.slds-is-selected:active", shadowSelector, ",.slds-button_icon-border.slds-is-selected:active", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:active", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:active", shadowSelector, " {background-color: #005fb2;border-color: #005fb2;}\n.slds-button_icon-container.slds-is-selected", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border.slds-is-selected", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected", shadowSelector, " .slds-button__icon", shadowSelector, " {fill: white;}\n.slds-button_icon-container.slds-is-selected:hover", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-container.slds-is-selected:focus", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border.slds-is-selected:hover", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border.slds-is-selected:focus", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:hover", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:focus", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:hover", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:focus", shadowSelector, " .slds-button__icon", shadowSelector, " {fill: white;}\n.slds-button_icon-container.slds-is-selected[disabled]", shadowSelector, ",.slds-button_icon-container.slds-is-selected:disabled", shadowSelector, ",.slds-button_icon-border.slds-is-selected[disabled]", shadowSelector, ",.slds-button_icon-border.slds-is-selected:disabled", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected[disabled]", shadowSelector, ",.slds-button_icon-border-filled.slds-is-selected:disabled", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected[disabled]", shadowSelector, ",.slds-button_icon-border-inverse.slds-is-selected:disabled", shadowSelector, " {background: #c9c7c5;border-color: #c9c7c5;color: white;}\n"].join('');
}
var stylesheet8 = [stylesheet$8];

function stylesheet$9(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-button", shadowSelector, " {position: relative;display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;padding: 0;background: transparent;background-clip: border-box;border: 1px solid transparent;border-radius: 0.25rem;line-height: 1.875rem;text-decoration: none;color: #0070d2;-webkit-appearance: none;white-space: normal;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}\n.slds-button:hover", shadowSelector, ",.slds-button:focus", shadowSelector, ",.slds-button:active", shadowSelector, ",.slds-button:visited", shadowSelector, " {text-decoration: none;}\n.slds-button:hover", shadowSelector, ",.slds-button:focus", shadowSelector, " {color: #005fb2;}\n.slds-button:focus", shadowSelector, " {outline: 0;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-button:active", shadowSelector, " {color: #005fb2;}\n.slds-button[disabled]", shadowSelector, ",.slds-button:disabled", shadowSelector, " {color: #dddbda;}\n.slds-button[disabled]", shadowSelector, " *", shadowSelector, ",.slds-button:disabled", shadowSelector, " *", shadowSelector, " {pointer-events: none;}\n.slds-button", shadowSelector, " a", shadowSelector, " {color: currentColor;}\n.slds-button:hover", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button:focus", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button:active", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button[disabled]", shadowSelector, " .slds-button__icon", shadowSelector, ",.slds-button:disabled", shadowSelector, " .slds-button__icon", shadowSelector, " {fill: currentColor;pointer-events: none;}\n.slds-button", shadowSelector, " + .slds-button-group", shadowSelector, ",.slds-button", shadowSelector, " + .slds-button-group-list", shadowSelector, " {margin-left: 0.25rem;}\n.slds-button", shadowSelector, " + .slds-button", shadowSelector, " {margin-left: 0.25rem;}\na.slds-button", shadowSelector, " {text-align: center;}\na.slds-button:focus", shadowSelector, " {outline: 0;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\na.slds-button_inverse:focus", shadowSelector, ",a.slds-button--inverse:focus", shadowSelector, " {outline: none;-webkit-box-shadow: 0 0 3px #ecebea;box-shadow: 0 0 3px #ecebea;border: 1px solid #ecebea;}\n.slds-button_reset", shadowSelector, " {font-size: inherit;color: inherit;line-height: inherit;padding: 0;background: transparent;border: 0;text-align: inherit;}\n.slds-button_neutral", shadowSelector, " {padding-left: 1rem;padding-right: 1rem;text-align: center;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;border-color: #dddbda;background-color: white;}\n.slds-button_neutral:hover", shadowSelector, ",.slds-button_neutral:focus", shadowSelector, " {background-color: #f4f6f9;}\n.slds-button_neutral:active", shadowSelector, " {background-color: #eef1f6;}\n.slds-button_neutral[disabled]", shadowSelector, ",.slds-button_neutral:disabled", shadowSelector, " {background-color: white;cursor: default;}\n.slds-button_brand", shadowSelector, " {padding-left: 1rem;padding-right: 1rem;text-align: center;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;background-color: #0070d2;border-color: #0070d2;color: white;}\n.slds-button_brand:link", shadowSelector, ",.slds-button_brand:visited", shadowSelector, ",.slds-button_brand:active", shadowSelector, " {color: white;}\n.slds-button_brand:hover", shadowSelector, ",.slds-button_brand:focus", shadowSelector, " {background-color: #005fb2;border-color: #005fb2;color: white;}\n.slds-button_brand:active", shadowSelector, " {background-color: #005fb2;border-color: #005fb2;}\n.slds-button_brand[disabled]", shadowSelector, ",.slds-button_brand:disabled", shadowSelector, " {background: #c9c7c5;border-color: #c9c7c5;color: white;}\n.slds-button_outline-brand", shadowSelector, " {padding-left: 1rem;padding-right: 1rem;text-align: center;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;border-color: #dddbda;background-color: white;border-color: #0070d2;}\n.slds-button_outline-brand:hover", shadowSelector, ",.slds-button_outline-brand:focus", shadowSelector, " {background-color: #f4f6f9;}\n.slds-button_outline-brand:active", shadowSelector, " {background-color: #eef1f6;}\n.slds-button_outline-brand[disabled]", shadowSelector, ",.slds-button_outline-brand:disabled", shadowSelector, " {border-color: #dddbda;color: #dddbda;background-color: white;}\n.slds-button_inverse", shadowSelector, " {padding-left: 1rem;padding-right: 1rem;text-align: center;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;background-color: rgba(0, 0, 0, 0);border-color: #dddbda;}\n.slds-button_inverse:hover", shadowSelector, ",.slds-button_inverse:focus", shadowSelector, " {background-color: #f4f6f9;}\n.slds-button_inverse[disabled]", shadowSelector, ",.slds-button_inverse:disabled", shadowSelector, " {background-color: rgba(0, 0, 0, 0);border-color: rgba(255, 255, 255, 0.15);}\n.slds-button_inverse", shadowSelector, ",.slds-button_inverse:link", shadowSelector, ",.slds-button_inverse:visited", shadowSelector, ",.slds-button_icon-border-inverse", shadowSelector, ",.slds-button_icon-border-inverse:link", shadowSelector, ",.slds-button_icon-border-inverse:visited", shadowSelector, " {color: #ecebea;}\n.slds-button_inverse:hover", shadowSelector, ",.slds-button_inverse:focus", shadowSelector, ",.slds-button_inverse:active", shadowSelector, ",.slds-button_icon-border-inverse:hover", shadowSelector, ",.slds-button_icon-border-inverse:focus", shadowSelector, ",.slds-button_icon-border-inverse:active", shadowSelector, " {color: #0070d2;}\n.slds-button_inverse:focus", shadowSelector, ",.slds-button_icon-border-inverse:focus", shadowSelector, " {outline: none;-webkit-box-shadow: 0 0 3px #ecebea;box-shadow: 0 0 3px #ecebea;border: 1px solid #ecebea;}\n.slds-button_inverse[disabled]", shadowSelector, ",.slds-button_inverse:disabled", shadowSelector, ",.slds-button_icon-border-inverse[disabled]", shadowSelector, ",.slds-button_icon-border-inverse:disabled", shadowSelector, " {color: rgba(255, 255, 255, 0.5);}\n.slds-button_destructive", shadowSelector, " {padding-left: 1rem;padding-right: 1rem;text-align: center;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;background-color: #c23934;border-color: #c23934;color: white;}\n.slds-button_destructive:link", shadowSelector, ",.slds-button_destructive:visited", shadowSelector, ",.slds-button_destructive:active", shadowSelector, " {color: white;}\n.slds-button_destructive:hover", shadowSelector, ",.slds-button_destructive:focus", shadowSelector, " {background-color: #a61a14;color: white;}\n.slds-button_destructive:active", shadowSelector, " {background-color: #870500;border-color: #870500;}\n.slds-button_destructive[disabled]", shadowSelector, ",.slds-button_destructive:disabled", shadowSelector, " {background: #c9c7c5;border-color: #c9c7c5;color: white;}\n.slds-button_text-destructive", shadowSelector, " {padding-left: 1rem;padding-right: 1rem;text-align: center;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;border-color: #dddbda;background-color: white;color: #c23934;}\n.slds-button_text-destructive:hover", shadowSelector, ",.slds-button_text-destructive:focus", shadowSelector, " {background-color: #f4f6f9;}\n.slds-button_text-destructive:active", shadowSelector, " {background-color: #eef1f6;}\n.slds-button_text-destructive:focus", shadowSelector, ",.slds-button_text-destructive:hover", shadowSelector, " {color: #a12b2b;}\n.slds-button_text-destructive[disabled]", shadowSelector, ",.slds-button_text-destructive:disabled", shadowSelector, " {color: #dddbda;background-color: white;}\n.slds-button_success", shadowSelector, " {padding-left: 1rem;padding-right: 1rem;text-align: center;vertical-align: middle;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;border: 1px solid #dddbda;-webkit-transition: border 0.15s linear;transition: border 0.15s linear;background-color: #4bca81;border-color: #4bca81;color: #080707;}\n.slds-button_success:link", shadowSelector, ",.slds-button_success:visited", shadowSelector, ",.slds-button_success:active", shadowSelector, " {color: #080707;}\n.slds-button_success:hover", shadowSelector, ",.slds-button_success:focus", shadowSelector, " {background-color: #04844b;border-color: #04844b;color: white;}\n.slds-button_success:active", shadowSelector, " {background-color: #04844b;border-color: #04844b;}\n.slds-button_success[disabled]", shadowSelector, ",.slds-button_success:disabled", shadowSelector, " {background: #c9c7c5;border-color: #c9c7c5;color: white;}\n.slds-button__icon", shadowSelector, " {width: 0.875rem;height: 0.875rem;fill: currentColor;}\n.slds-button__icon_large", shadowSelector, " {width: 1.5rem;height: 1.5rem;}\n.slds-button__icon_small", shadowSelector, " {width: 0.75rem;height: 0.75rem;}\n.slds-button__icon_x-small", shadowSelector, " {width: 0.5rem;height: 0.5rem;}\n.slds-button__icon_left", shadowSelector, " {margin-right: 0.5rem;}\n.slds-button__icon_right", shadowSelector, " {margin-left: 0.5rem;}\n.slds-button_full-width", shadowSelector, " {font-size: inherit;color: inherit;line-height: inherit;padding: 0;background: transparent;border: 0;text-align: inherit;width: 100%;display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-flex: 1;-ms-flex-positive: 1;flex-grow: 1;-webkit-box-align: center;-ms-flex-align: center;align-items: center;-webkit-box-pack: justify;-ms-flex-pack: justify;justify-content: space-between;}\n.slds-button_full-width:focus", shadowSelector, " {-webkit-box-shadow: none;box-shadow: none;}\n.slds-button_stretch", shadowSelector, " {-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;width: 100%;}\n"].join('');
}
var stylesheet9 = [stylesheet$9];

function stylesheet$a(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-button_neutral.slds-is-selected", shadowSelector, " {border-color: transparent;background-color: transparent;}\n.slds-button_neutral.slds-is-selected:hover:not([disabled])", shadowSelector, ",.slds-button_neutral.slds-is-selected:focus:not([disabled])", shadowSelector, " {border-color: #dddbda;background-color: #f4f6f9;}\n.slds-button_neutral.slds-is-selected:active:not([disabled])", shadowSelector, " {background-color: #eef1f6;}\n.slds-button_inverse.slds-is-selected", shadowSelector, " {border-color: transparent;}\n.slds-button_stateful", shadowSelector, " .slds-text-selected", shadowSelector, ",.slds-button_stateful", shadowSelector, " .slds-text-selected-focus", shadowSelector, ",.slds-button_stateful", shadowSelector, " .slds-text-not-selected", shadowSelector, " {-webkit-box-align: center;-ms-flex-align: center;align-items: center;}\n.slds-not-selected", shadowSelector, " {}\n.slds-not-selected", shadowSelector, " .slds-text-selected", shadowSelector, " {display: none;}\n.slds-not-selected", shadowSelector, " .slds-text-selected-focus", shadowSelector, " {display: none;}\n.slds-not-selected", shadowSelector, " .slds-text-not-selected", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n.slds-is-selected-clicked", shadowSelector, " .slds-text-selected", shadowSelector, ",.slds-is-selected[disabled]", shadowSelector, " .slds-text-selected", shadowSelector, ",.slds-is-selected[disabled]:hover", shadowSelector, " .slds-text-selected", shadowSelector, ",.slds-is-selected[disabled]:focus", shadowSelector, " .slds-text-selected", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n.slds-is-selected-clicked", shadowSelector, " .slds-text-selected-focus", shadowSelector, ",.slds-is-selected[disabled]", shadowSelector, " .slds-text-selected-focus", shadowSelector, ",.slds-is-selected[disabled]:hover", shadowSelector, " .slds-text-selected-focus", shadowSelector, ",.slds-is-selected[disabled]:focus", shadowSelector, " .slds-text-selected-focus", shadowSelector, " {display: none;}\n.slds-is-selected-clicked", shadowSelector, " .slds-text-not-selected", shadowSelector, ",.slds-is-selected[disabled]", shadowSelector, " .slds-text-not-selected", shadowSelector, ",.slds-is-selected[disabled]:hover", shadowSelector, " .slds-text-not-selected", shadowSelector, ",.slds-is-selected[disabled]:focus", shadowSelector, " .slds-text-not-selected", shadowSelector, " {display: none;}\n.slds-is-selected", shadowSelector, " .slds-text-not-selected", shadowSelector, " {display: none;}\n.slds-is-selected", shadowSelector, " .slds-text-selected", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n.slds-is-selected", shadowSelector, " .slds-text-selected-focus", shadowSelector, " {display: none;}\n.slds-is-selected:hover", shadowSelector, " .slds-text-not-selected", shadowSelector, ",.slds-is-selected:focus", shadowSelector, " .slds-text-not-selected", shadowSelector, " {display: none;}\n.slds-is-selected:hover", shadowSelector, " .slds-text-selected", shadowSelector, ",.slds-is-selected:focus", shadowSelector, " .slds-text-selected", shadowSelector, " {display: none;}\n.slds-is-selected:hover", shadowSelector, " .slds-text-selected-focus", shadowSelector, ",.slds-is-selected:focus", shadowSelector, " .slds-text-selected-focus", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n"].join('');
}
var stylesheet10 = [stylesheet$a];

function stylesheet$b(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-card", shadowSelector, " {position: relative;padding: 0;background: white;border: 1px solid #dddbda;border-radius: 0.25rem;background-clip: padding-box;-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);}\n.slds-card", shadowSelector, " + .slds-card", shadowSelector, " {margin-top: 1rem;}\n.slds-card__body_inner", shadowSelector, " {padding: 0 1rem;}\n.slds-card__header", shadowSelector, " {padding: 0.75rem 1rem 0;margin: 0 0 0.75rem;}\n.slds-card__header-title", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;font-size: 1rem;line-height: 1.25;}\n.slds-card__header-link", shadowSelector, " {color: inherit;font-weight: 700;}\n.slds-card__body", shadowSelector, " {margin-top: 0.75rem;margin-bottom: 0.75rem;}\n.slds-card__body:empty", shadowSelector, ",.slds-card__footer:empty", shadowSelector, " {display: none;}\n.slds-card__footer", shadowSelector, " {padding: 0.75rem 1rem;margin-top: 0.75rem;text-align: center;font-size: 0.8125rem;border-top: 1px solid #dddbda;}\n.slds-card__footer-action", shadowSelector, " {display: block;}\n.slds-card__tile", shadowSelector, " {margin-top: 0.75rem;}\n.slds-region__pinned-left", shadowSelector, " .slds-card", shadowSelector, ",.slds-region__pinned-left", shadowSelector, " .slds-card-wrapper", shadowSelector, ",.slds-region__pinned-left", shadowSelector, " .slds-card_boundary", shadowSelector, ",.slds-region__pinned-left", shadowSelector, " .slds-tabs_card", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-card", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-card-wrapper", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-card_boundary", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-tabs_card", shadowSelector, " {border-radius: 0;border: 0;border-bottom: 1px solid #dddbda;-webkit-box-shadow: none;box-shadow: none;}\n.slds-region__pinned-left", shadowSelector, " .slds-card:last-child", shadowSelector, ",.slds-region__pinned-left", shadowSelector, " .slds-card-wrapper:last-child", shadowSelector, ",.slds-region__pinned-left", shadowSelector, " .slds-card_boundary:last-child", shadowSelector, ",.slds-region__pinned-left", shadowSelector, " .slds-tabs_card:last-child", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-card:last-child", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-card-wrapper:last-child", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-card_boundary:last-child", shadowSelector, ",.slds-region__pinned-right", shadowSelector, " .slds-tabs_card:last-child", shadowSelector, " {border-bottom: 0;}\n.slds-card-wrapper", shadowSelector, " {padding: 1rem;background: white;border: 1px solid #dddbda;border-radius: 0.25rem;background-clip: padding-box;-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);}\n.slds-card-wrapper", shadowSelector, " .slds-card__header", shadowSelector, ",.slds-card-wrapper", shadowSelector, " .slds-card__body", shadowSelector, ",.slds-card-wrapper", shadowSelector, " .slds-card__footer", shadowSelector, " {padding-left: 0;padding-right: 0;}\n"].join('');
}
var stylesheet11 = [stylesheet$b];

function stylesheet$c(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-carousel", shadowSelector, " {position: relative;}\n.slds-carousel__stage", shadowSelector, " {position: relative;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;overflow: hidden;}\n.slds-carousel__panels", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-transition: -webkit-transform 250ms ease-in;transition: -webkit-transform 250ms ease-in;transition: transform 250ms ease-in;transition: transform 250ms ease-in, -webkit-transform 250ms ease-in;min-height: 0%;}\n.slds-carousel__panel", shadowSelector, " {-webkit-box-flex: 0;-ms-flex: 0 0 100%;flex: 0 0 100%;max-width: 100%;}\n.slds-carousel__panel-action", shadowSelector, " {display: block;border: 1px solid #dddbda;border-radius: 0.25rem;}\n.slds-carousel__panel-action:focus", shadowSelector, " {outline: 0;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;border-color: #005fb2;outline: 0;}\n.slds-carousel__image", shadowSelector, " {border-top-left-radius: 0.25rem;border-top-right-radius: 0.25rem;overflow: hidden;}\n.slds-carousel__image", shadowSelector, " > img", shadowSelector, " {width: 100%;}\n.slds-carousel__content", shadowSelector, " {background: white;padding: 0.75rem;border-bottom-left-radius: 0.25rem;border-bottom-right-radius: 0.25rem;text-align: center;height: 6.625rem;overflow-x: hidden;overflow-y: auto;}\n.slds-carousel__content-title", shadowSelector, " {font-size: 1rem;font-weight: 600;}\n.slds-carousel__indicators", shadowSelector, " {-ms-flex-item-align: center;align-self: center;margin: 0.5rem 0;}\n.slds-carousel__indicator", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;margin: 0 0.25rem;}\n.slds-carousel__indicator-action", shadowSelector, " {width: 1rem;height: 1rem;background: white;border: 1px solid #dddbda;border-radius: 50%;}\n.slds-carousel__indicator-action.slds-is-active", shadowSelector, ",.slds-carousel__indicator-action.slds-is-active:hover", shadowSelector, " {background: #0070d2;border-color: #0070d2;}\n.slds-carousel__indicator-action:hover", shadowSelector, " {background-color: #fafaf9;}\n.slds-carousel__indicator-action:focus", shadowSelector, " {outline: 0;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;background-color: #005fb2;border-color: #005fb2;outline: 0;}\n.slds-carousel__autoplay", shadowSelector, " {position: absolute;left: 0;bottom: 0.25rem;}\n"].join('');
}
var stylesheet12 = [stylesheet$c];

function stylesheet$d(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-checkbox", shadowSelector, " {display: inline-block;position: relative;}\n.slds-checkbox", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {width: 1rem;height: 1rem;display: inline-block;position: relative;vertical-align: middle;border: 1px solid #dddbda;border-radius: 0.125rem;background: white;-webkit-transition: border 0.1s linear, background-color 0.1s linear;transition: border 0.1s linear, background-color 0.1s linear;}\n.slds-checkbox", shadowSelector, " .slds-checkbox__label", shadowSelector, " .slds-form-element__label", shadowSelector, " {display: inline;vertical-align: middle;font-size: 0.8125rem;}\n.slds-checkbox", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " {width: 1px;height: 1px;border: 0;clip: rect(0 0 0 0);margin: -1px;overflow: hidden;padding: 0;position: absolute;pointer-events: auto;}\n.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ":after,.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ":after,.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, ":after {display: block;content: \"\";height: 0.25rem;width: 0.5rem;position: absolute;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0) rotate(-45deg);transform: translate3d(-50%, -50%, 0) rotate(-45deg);border-bottom: 2px solid #0070d2;border-left: 2px solid #0070d2;}\n.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:focus", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ",.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:focus", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ",.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:focus", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {content: \"\";border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:focus:checked", shadowSelector, " > .slds-checkbox_faux", shadowSelector, ",.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:focus:checked", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ",.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:focus:checked", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {border-color: #1589ee;background-color: white;}\n.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:indeterminate", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ":after,.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:indeterminate", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ":after,.slds-checkbox", shadowSelector, " [type=\"checkbox\"]:indeterminate", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, ":after {content: \"\";display: block;position: absolute;top: 50%;left: 50%;width: 0.5rem;height: 2px;background: #0070d2;border: 0;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);}\n.slds-checkbox", shadowSelector, " [type=\"checkbox\"][disabled]", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ",.slds-checkbox", shadowSelector, " [type=\"checkbox\"][disabled]", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ",.slds-checkbox", shadowSelector, " [type=\"checkbox\"][disabled]", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {background-color: #ecebea;border-color: #c9c7c5;}\n.slds-checkbox", shadowSelector, " [type=\"checkbox\"][disabled]", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ":after,.slds-checkbox", shadowSelector, " [type=\"checkbox\"][disabled]", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ":after,.slds-checkbox", shadowSelector, " [type=\"checkbox\"][disabled]", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, ":after {border-color: #969492;}\n.slds-checkbox.slds-checkbox_stacked", shadowSelector, " .slds-checkbox__label", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;-webkit-box-align: start;-ms-flex-align: start;align-items: flex-start;}\n.slds-checkbox.slds-checkbox_stacked", shadowSelector, " .slds-form-element__label", shadowSelector, " {font-size: 0.75rem;}\n.slds-checkbox.slds-checkbox_stacked", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {-webkit-box-ordinal-group: 2;-ms-flex-order: 1;order: 1;margin-bottom: 1px;}\n.slds-checkbox.slds-checkbox_stacked", shadowSelector, " .slds-required", shadowSelector, " {float: left;}\n.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {border-color: #c23934;border-width: 2px;}\n.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {border-color: #c23934;background-color: white;}\n.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ":after,.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ":after,.slds-has-error", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]:checked", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, ":after {border-color: #d4504c;}\n.slds-form-element", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " + .slds-checkbox_faux", shadowSelector, ",.slds-form-element", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " ~ .slds-checkbox_faux", shadowSelector, ",.slds-form-element", shadowSelector, " .slds-checkbox", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " + .slds-checkbox__label", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {margin-right: 0.5rem;}\n"].join('');
}
var stylesheet13 = [stylesheet$d];

function stylesheet$e(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-checkbox_standalone", shadowSelector, " {pointer-events: none;}\n.slds-checkbox_standalone", shadowSelector, " [type=\"checkbox\"]", shadowSelector, " {width: 1rem;height: 1rem;margin: 0;clip: auto;opacity: 0;}\n.slds-checkbox_standalone", shadowSelector, " .slds-checkbox_faux", shadowSelector, " {display: block;}\n"].join('');
}
var stylesheet14 = [stylesheet$e];

function stylesheet$f(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-combobox_container", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;position: relative;}\n.slds-combobox_container.slds-is-open", shadowSelector, " .slds-dropdown", shadowSelector, " {display: block;}\n.slds-combobox_container.slds-has-selection", shadowSelector, " .slds-combobox__input-value", shadowSelector, ",.slds-combobox_container.slds-has-selection", shadowSelector, " .slds-combobox__input-value:focus", shadowSelector, " {-webkit-box-shadow: 0 0 0 2px #fff inset, 0 0 0 3px #dddbda inset;box-shadow: 0 0 0 2px #fff inset, 0 0 0 3px #dddbda inset;}\n.slds-combobox_container.slds-has-icon-only", shadowSelector, " .slds-combobox__input", shadowSelector, ",.slds-combobox_container.slds-has-icon-only", shadowSelector, " .slds-combobox__input:focus", shadowSelector, ",.slds-combobox_container.slds-has-icon-only", shadowSelector, " .slds-combobox__input.slds-has-focus", shadowSelector, " {width: 0;pointer-events: auto;}\n.slds-combobox_container.slds-has-icon-only", shadowSelector, " .slds-input__icon", shadowSelector, " {z-index: 2;pointer-events: none;}\n.slds-combobox", shadowSelector, " {position: static;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;-webkit-box-flex: 1;-ms-flex: 1 1 auto;flex: 1 1 auto;}\n.slds-combobox__form-element", shadowSelector, " {-webkit-box-flex: 1;-ms-flex: 1 1 auto;flex: 1 1 auto;}\n[role=\"combobox\"]", shadowSelector, " input[readonly]", shadowSelector, " {padding-left: 0.75rem;border-color: #dddbda;background-color: white;font-size: inherit;font-weight: 400;}\n[role=\"combobox\"]", shadowSelector, " input[readonly]:focus", shadowSelector, ",[role=\"combobox\"]", shadowSelector, " input[readonly].slds-has-focus", shadowSelector, " {border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n[role=\"combobox\"]", shadowSelector, " input[readonly][disabled]", shadowSelector, " {background-color: #ecebea;border-color: #c9c7c5;}\n.slds-listbox_inline", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-ms-flex-negative: 0;flex-shrink: 0;-webkit-box-align: center;-ms-flex-align: center;align-items: center;margin-left: 0.125rem;margin-right: 0.125rem;}\n.slds-listbox_inline", shadowSelector, " li", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;}\n.slds-listbox_inline", shadowSelector, " li", shadowSelector, " + li", shadowSelector, " {padding-left: 0.125rem;}\n.slds-listbox_horizontal", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}\n.slds-listbox_horizontal", shadowSelector, " li", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;}\n.slds-listbox_horizontal", shadowSelector, " li", shadowSelector, " + li", shadowSelector, " {padding-left: 0.125rem;}\n.slds-listbox__option:hover", shadowSelector, " {cursor: pointer;}\n.slds-listbox__option:focus", shadowSelector, " {outline: 0;}\n.slds-listbox__option", shadowSelector, " .slds-truncate", shadowSelector, " {display: inline-block;vertical-align: middle;}\n.slds-listbox__option[aria-disabled=\"true\"]", shadowSelector, " {color: #dddbda;}\n.slds-listbox__option-header", shadowSelector, " {font-size: 0.875rem;font-weight: 700;}\n.slds-listbox__option-icon", shadowSelector, " {width: 1.5rem;display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-ms-flex-line-pack: center;align-content: center;-webkit-box-align: center;-ms-flex-align: center;align-items: center;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;color: #706e6b;}\n.slds-listbox__option[aria-disabled=\"true\"]", shadowSelector, " .slds-listbox__option-icon", shadowSelector, " {color: currentColor;}\n.slds-listbox_vertical", shadowSelector, " {}\n.slds-listbox_vertical", shadowSelector, " .slds-listbox__option:focus", shadowSelector, ",.slds-listbox_vertical", shadowSelector, " .slds-listbox__option:hover", shadowSelector, ",.slds-listbox_vertical", shadowSelector, " .slds-listbox__option.slds-has-focus", shadowSelector, " {background-color: #f3f2f2;text-decoration: none;}\n.slds-listbox_vertical", shadowSelector, " .slds-listbox__option[aria-disabled=\"true\"]", shadowSelector, ",.slds-listbox_vertical", shadowSelector, " .slds-listbox__option[role=\"presentation\"]:hover", shadowSelector, " {background-color: transparent;cursor: default;}\n.slds-listbox_vertical", shadowSelector, " .slds-listbox__option_entity", shadowSelector, " {padding: 0.25rem 0.75rem;}\n.slds-listbox_vertical", shadowSelector, " .slds-listbox__option_entity", shadowSelector, " .slds-media__figure", shadowSelector, " {margin-right: 0.5rem;}\n.slds-listbox_vertical", shadowSelector, " .slds-listbox__option_plain", shadowSelector, " {padding: 0.5rem 0.75rem;}\n.slds-listbox_vertical", shadowSelector, " .slds-listbox__option_term", shadowSelector, " {padding: 0.5rem 0.75rem;}\n.slds-listbox_vertical", shadowSelector, " .slds-listbox__option_has-meta", shadowSelector, " .slds-media__figure", shadowSelector, " {margin-top: 0.25rem;}\n[class*=\"slds-input-has-icon_left\"]", shadowSelector, " .slds-combobox__input[value]", shadowSelector, ",[class*=\"slds-input-has-icon--left\"]", shadowSelector, " .slds-combobox__input[value]", shadowSelector, ",[class*=\"slds-input-has-icon_left\"]", shadowSelector, " .slds-combobox__input.slds-combobox__input-value", shadowSelector, ",[class*=\"slds-input-has-icon--left\"]", shadowSelector, " .slds-combobox__input.slds-combobox__input-value", shadowSelector, " {padding-left: 2.25rem;}\n.slds-combobox__input-entity-icon", shadowSelector, " {width: 1.25rem;height: 1.25rem;position: absolute;top: 50%;left: calc(0.25rem + 1px);-webkit-transform: translateY(-50%);transform: translateY(-50%);z-index: 2;}\n.slds-combobox__input-entity-icon", shadowSelector, " .slds-icon", shadowSelector, " {width: 1.25rem;height: 1.25rem;}\n.slds-combobox_container__icon", shadowSelector, " {color: #b0adab;}\n.slds-listbox__icon-selected", shadowSelector, " {opacity: 0;fill: #0070d2;}\n.slds-listbox__option.slds-is-selected", shadowSelector, " .slds-listbox__icon-selected", shadowSelector, " {opacity: 1;}\n.slds-listbox__option.slds-is-selected", shadowSelector, " .slds-listbox__option-icon", shadowSelector, " {color: #0070d2;}\n.slds-listbox__option-text_entity", shadowSelector, " {max-width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: block;margin-bottom: 0.125rem;}\n.slds-listbox__option-meta", shadowSelector, " {display: block;margin-top: -0.25rem;color: #3e3e3c;}\n.slds-listbox__option[aria-disabled=\"true\"]", shadowSelector, " .slds-listbox__option-meta", shadowSelector, " {color: currentColor;}\n.slds-listbox_object-switcher", shadowSelector, " {-ms-flex-negative: 0;flex-shrink: 0;padding: 0.125rem;}\n.slds-combobox_object-switcher", shadowSelector, " {-ms-flex-negative: 0;flex-shrink: 0;}\n.slds-combobox_object-switcher", shadowSelector, " .slds-combobox__input", shadowSelector, " {width: 7.5rem;-webkit-transition: width 80ms linear;transition: width 80ms linear;font-size: 0.75rem;color: #706e6b;}\n.slds-combobox_object-switcher", shadowSelector, " .slds-combobox__input:focus", shadowSelector, ",.slds-combobox_object-switcher", shadowSelector, " .slds-combobox__input.slds-has-focus", shadowSelector, " {width: 10rem;}\n.slds-combobox__input", shadowSelector, " {}\n.slds-combobox__input:focus", shadowSelector, ",.slds-combobox__input.slds-has-focus", shadowSelector, " {border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-combobox-group", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;}\n.slds-combobox-group", shadowSelector, " .slds-combobox_container", shadowSelector, " {-webkit-box-flex: 1;-ms-flex: 1 1 auto;flex: 1 1 auto;}\n.slds-combobox-group", shadowSelector, " .slds-combobox__input", shadowSelector, ",.slds-combobox-group", shadowSelector, " .slds-combobox_object-switcher__button", shadowSelector, " {border-radius: 0;margin-left: -1px;margin-right: -1px;position: relative;}\n.slds-combobox-group", shadowSelector, " .slds-combobox__input:focus", shadowSelector, ",.slds-combobox-group", shadowSelector, " .slds-combobox__input.slds-has-focus", shadowSelector, ",.slds-combobox-group", shadowSelector, " .slds-combobox_object-switcher__button:focus", shadowSelector, ",.slds-combobox-group", shadowSelector, " .slds-combobox_object-switcher__button.slds-has-focus", shadowSelector, " {z-index: 1;}\n.slds-combobox-group.slds-has-selection", shadowSelector, " .slds-combobox-addon_start", shadowSelector, " .slds-combobox__input", shadowSelector, " {border-bottom-left-radius: 0;}\n.slds-combobox-group.slds-has-selection", shadowSelector, " .slds-combobox-addon_end", shadowSelector, " .slds-combobox__input", shadowSelector, " {border-bottom-right-radius: 0;}\n.slds-combobox-group.slds-has-selection", shadowSelector, " ~ .slds-listbox_selection-group", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;position: relative;background: white;border: 1px solid #dddbda;border-top: 0;border-bottom-left-radius: 0.25rem;border-bottom-right-radius: 0.25rem;left: -1px;}\n.slds-combobox-group", shadowSelector, " .slds-listbox_horizontal", shadowSelector, " li", shadowSelector, " + li", shadowSelector, " {padding: 0.125rem;}\n.slds-listbox_selection-group", shadowSelector, " {position: relative;padding: 0;padding-right: 3.75rem;height: 1.875rem;overflow: hidden;}\n.slds-listbox_selection-group.slds-is-expanded", shadowSelector, " {height: auto;padding: 0;}\n.slds-listbox_selection-group", shadowSelector, " .slds-listbox", shadowSelector, " {padding: 0 0 0.125rem;}\n.slds-listbox_selection-group", shadowSelector, " .slds-listbox-item", shadowSelector, " {padding: 0.125rem 0.125rem 0;}\n.slds-listbox_selection-group", shadowSelector, " .slds-listbox-toggle", shadowSelector, " {position: absolute;top: 50%;-webkit-transform: translateY(-50%);transform: translateY(-50%);right: 0.5rem;}\n.slds-listbox_selection-group", shadowSelector, " .slds-listbox-toggle", shadowSelector, " .slds-button", shadowSelector, " {line-height: 1;}\n.slds-combobox-addon_start", shadowSelector, " .slds-combobox__input", shadowSelector, " {border-top-right-radius: 0;border-bottom-right-radius: 0;border-top-left-radius: 4px;border-bottom-left-radius: 4px;}\n.slds-combobox-addon_end", shadowSelector, " .slds-combobox__input", shadowSelector, " {border-top-right-radius: 4px;border-bottom-right-radius: 4px;border-top-left-radius: 0;border-bottom-left-radius: 0;}\n.slds-has-inline-listbox", shadowSelector, ",.slds-has-object-switcher", shadowSelector, " {-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-direction: row;flex-direction: row;background: white;border: 1px solid #dddbda;border-radius: 0.25rem;}\n.slds-has-inline-listbox", shadowSelector, " .slds-combobox", shadowSelector, ",.slds-has-object-switcher", shadowSelector, " .slds-combobox", shadowSelector, " {-ms-flex-preferred-size: 50%;flex-basis: 50%;-ms-flex-negative: 0;flex-shrink: 0;}\n.slds-has-inline-listbox", shadowSelector, " .slds-combobox__input", shadowSelector, ",.slds-has-object-switcher", shadowSelector, " .slds-combobox__input", shadowSelector, " {min-height: 100%;line-height: calc(1.875rem - 2px);border: 0;padding-top: 0.125rem;padding-bottom: 0.125rem;}\n.slds-has-inline-listbox", shadowSelector, " .slds-combobox__input:focus", shadowSelector, ",.slds-has-inline-listbox", shadowSelector, " .slds-combobox__input:active", shadowSelector, ",.slds-has-object-switcher", shadowSelector, " .slds-combobox__input:focus", shadowSelector, ",.slds-has-object-switcher", shadowSelector, " .slds-combobox__input:active", shadowSelector, " {outline: 0;-webkit-box-shadow: none;box-shadow: none;}\n.slds-has-inline-listbox", shadowSelector, " .slds-listbox_object-switcher", shadowSelector, " ~ .slds-listbox_inline", shadowSelector, ",.slds-has-inline-listbox", shadowSelector, " .slds-combobox_container__icon", shadowSelector, " ~ .slds-listbox_inline", shadowSelector, ",.slds-has-object-switcher", shadowSelector, " .slds-listbox_object-switcher", shadowSelector, " ~ .slds-listbox_inline", shadowSelector, ",.slds-has-object-switcher", shadowSelector, " .slds-combobox_container__icon", shadowSelector, " ~ .slds-listbox_inline", shadowSelector, " {margin-left: 0.5rem;}\n.slds-has-inline-listbox.slds-has-icon_left", shadowSelector, ",.slds-has-object-switcher.slds-has-icon_left", shadowSelector, " {padding-left: 2.25rem;}\n.slds-has-inline-listbox.slds-has-icon_left", shadowSelector, " .slds-combobox_container__icon", shadowSelector, ",.slds-has-object-switcher.slds-has-icon_left", shadowSelector, " .slds-combobox_container__icon", shadowSelector, " {width: 1rem;height: 1rem;position: absolute;left: 1.125rem;top: 50%;margin-top: -0.5rem;}\n.slds-has-inline-listbox", shadowSelector, " [role=\"listbox\"]", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;padding: 0 0.125rem;}\n.slds-has-inline-listbox", shadowSelector, " .slds-combobox__input-value", shadowSelector, " {-webkit-box-shadow: 0 0 0 2px #fff inset, 0 0 0 3px #dddbda inset;box-shadow: 0 0 0 2px #fff inset, 0 0 0 3px #dddbda inset;}\n"].join('');
}
var stylesheet15 = [stylesheet$f];

function stylesheet$g(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-table", shadowSelector, " {background-color: white;font-size: inherit;}\n.slds-table", shadowSelector, " th", shadowSelector, ",.slds-table", shadowSelector, " td", shadowSelector, " {padding: 0.25rem 0.5rem;white-space: nowrap;position: relative;}\n.slds-table", shadowSelector, " th", shadowSelector, " {font-weight: 400;}\n.slds-table", shadowSelector, " th:focus", shadowSelector, " {outline: 0;}\n.slds-table", shadowSelector, " thead", shadowSelector, " th", shadowSelector, " {background-color: #fafaf9;color: #514f4d;padding: 0.25rem 0.5rem;font-weight: 700;line-height: normal;}\n.slds-table:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, ",.slds-table:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:focus", shadowSelector, " {outline: 0;}\n.slds-table:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > td", shadowSelector, ",.slds-table:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > th", shadowSelector, ",.slds-table:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:focus", shadowSelector, " > td", shadowSelector, ",.slds-table:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:focus", shadowSelector, " > th", shadowSelector, " {background-color: #f3f2f2;}\n.slds-table", shadowSelector, " tbody", shadowSelector, " tr.slds-is-selected", shadowSelector, " > td", shadowSelector, ",.slds-table", shadowSelector, " tbody", shadowSelector, " tr.slds-is-selected", shadowSelector, " > th", shadowSelector, ",.slds-table:not(.slds-no-row-hover)", shadowSelector, " tr.slds-is-selected:hover", shadowSelector, " > td", shadowSelector, ",.slds-table:not(.slds-no-row-hover)", shadowSelector, " tr.slds-is-selected:hover", shadowSelector, " > th", shadowSelector, " {background-color: #ecebea;}\n.slds-table", shadowSelector, " tbody", shadowSelector, " tr.slds-is-selected", shadowSelector, " a", shadowSelector, ",.slds-table:not(.slds-no-row-hover)", shadowSelector, " tr.slds-is-selected:hover", shadowSelector, " a", shadowSelector, " {color: #00396b;}\n.slds-table", shadowSelector, " .slds-cell-wrap", shadowSelector, " {white-space: pre-line;overflow-wrap: break-word;word-wrap: break-word;}\n.slds-table", shadowSelector, " .slds-cell-shrink", shadowSelector, " {width: 1%;}\n.slds-table", shadowSelector, " .slds-cell-buffer_left", shadowSelector, " {padding-left: 1.5rem;}\n.slds-table", shadowSelector, " .slds-cell-buffer_right", shadowSelector, " {padding-right: 1.5rem;}\n.slds-table", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " {counter-increment: row-number;}\n.slds-table", shadowSelector, " .slds-row-number", shadowSelector, ":after {content: counter(row-number);}\n.slds-table", shadowSelector, " th:focus", shadowSelector, ",.slds-table", shadowSelector, " [role=\"gridcell\"]:focus", shadowSelector, " {outline: 0;}\n.slds-table", shadowSelector, " th:focus", shadowSelector, ",.slds-table", shadowSelector, " th.slds-has-focus", shadowSelector, ",.slds-table", shadowSelector, " [role=\"gridcell\"]:focus", shadowSelector, ",.slds-table", shadowSelector, " [role=\"gridcell\"].slds-has-focus", shadowSelector, " {-webkit-box-shadow: #0070d2 0 0 0 1px inset;box-shadow: #0070d2 0 0 0 1px inset;}\n.slds-table", shadowSelector, " th:active", shadowSelector, ",.slds-table", shadowSelector, " [role=\"gridcell\"]:active", shadowSelector, " {-webkit-box-shadow: none;box-shadow: none;}\n.slds-table", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, " {margin-right: 0;}\n.slds-table_cell-buffer", shadowSelector, " tr", shadowSelector, " > th:first-child", shadowSelector, ",.slds-table_cell-buffer", shadowSelector, " tr", shadowSelector, " > td:first-child", shadowSelector, " {padding-left: 1.5rem;}\n.slds-table_cell-buffer", shadowSelector, " tr", shadowSelector, " > th:last-child", shadowSelector, ",.slds-table_cell-buffer", shadowSelector, " tr", shadowSelector, " > td:last-child", shadowSelector, " {padding-right: 1.5rem;}\n.slds-table_bordered", shadowSelector, " {border-collapse: separate;border-top: 1px solid #dddbda;border-bottom: 1px solid #dddbda;}\n.slds-table_bordered", shadowSelector, " thead", shadowSelector, " > tr", shadowSelector, " + tr", shadowSelector, " > th", shadowSelector, " {border-top: 1px solid #dddbda;}\n.slds-table_bordered", shadowSelector, " tbody", shadowSelector, " td", shadowSelector, ",.slds-table_bordered", shadowSelector, " tbody", shadowSelector, " th", shadowSelector, " {border-top: 1px solid #dddbda;}\n.slds-table_bordered:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > td:not(.slds-has-focus)", shadowSelector, ",.slds-table_bordered:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > th:not(.slds-has-focus)", shadowSelector, ",.slds-table_bordered:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:focus", shadowSelector, " > td:not(.slds-has-focus)", shadowSelector, ",.slds-table_bordered:not(.slds-no-row-hover)", shadowSelector, " tbody", shadowSelector, " tr:focus", shadowSelector, " > th:not(.slds-has-focus)", shadowSelector, " > th:not(.slds-has-focus)", shadowSelector, " {-webkit-box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;box-shadow: #dddbda 0 -1px 0 inset, #dddbda 0 1px 0 inset;}\n.slds-table_col-bordered", shadowSelector, " td", shadowSelector, " + td", shadowSelector, ",.slds-table_col-bordered", shadowSelector, " th", shadowSelector, " + th", shadowSelector, ",.slds-table_col-bordered", shadowSelector, " th", shadowSelector, " + td", shadowSelector, ",.slds-table_col-bordered", shadowSelector, " td", shadowSelector, " + th", shadowSelector, " {border-left: 1px solid #dddbda;}\n.slds-table_striped", shadowSelector, " tbody", shadowSelector, " tr:nth-of-type(even)", shadowSelector, " > td", shadowSelector, ",.slds-table_striped", shadowSelector, " tbody", shadowSelector, " tr:nth-of-type(even)", shadowSelector, " > th", shadowSelector, " {background-color: #f3f2f2;}\n.slds-table_fixed-layout", shadowSelector, " {table-layout: fixed;width: 100%;white-space: nowrap;}\n.slds-table_fixed-layout", shadowSelector, " thead", shadowSelector, " {background-color: white;}\n.slds-table_fixed-layout", shadowSelector, " tbody", shadowSelector, " {-webkit-transform: translateZ(0);transform: translateZ(0);}\n.slds-table_fixed-layout", shadowSelector, " .slds-cell-shrink", shadowSelector, " {width: 3rem;}\n.slds-table_fixed-layout", shadowSelector, " .slds-cell-shrink:nth-child(n).slds-cell-shrink:nth-child(n)", shadowSelector, " {padding-left: 0;padding-right: 0;}\n.slds-table_fixed-layout", shadowSelector, " .slds-cell-shrink:first-child", shadowSelector, " {text-align: right;padding-right: 0.5rem;}\n.slds-table_fixed-layout", shadowSelector, " .slds-cell-shrink:last-child", shadowSelector, " {text-align: left;padding-left: 0.5rem;}\n.slds-is-sortable", shadowSelector, " .slds-th__action:hover", shadowSelector, ",.slds-is-sortable", shadowSelector, " .slds-th__action:focus", shadowSelector, ",.slds-is-sortable.slds-has-focus", shadowSelector, " .slds-th__action", shadowSelector, ",.slds-is-sortable.slds-has-focus", shadowSelector, " .slds-th__action:hover", shadowSelector, ",.slds-is-sortable.slds-has-focus", shadowSelector, " .slds-th__action:focus", shadowSelector, " {background-color: white;color: currentColor;}\n.slds-is-sortable", shadowSelector, " .slds-th__action:hover", shadowSelector, " .slds-is-sortable__icon", shadowSelector, ",.slds-is-sortable", shadowSelector, " .slds-th__action:focus", shadowSelector, " .slds-is-sortable__icon", shadowSelector, ",.slds-is-sortable.slds-has-focus", shadowSelector, " .slds-th__action", shadowSelector, " .slds-is-sortable__icon", shadowSelector, ",.slds-is-sortable.slds-has-focus", shadowSelector, " .slds-th__action:hover", shadowSelector, " .slds-is-sortable__icon", shadowSelector, ",.slds-is-sortable.slds-has-focus", shadowSelector, " .slds-th__action:focus", shadowSelector, " .slds-is-sortable__icon", shadowSelector, " {display: inline-block;fill: #0070d2;}\n.slds-th__action", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;padding: 0.25rem 0.5rem;height: 2rem;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}\n.slds-th__action:focus", shadowSelector, ",.slds-th__action:hover", shadowSelector, " {outline: 0;background-color: white;}\n.slds-th__action_form", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n.slds-th__action-button", shadowSelector, " {position: absolute;-webkit-transform: translateY(-50%);transform: translateY(-50%);top: 50%;right: 0.25rem;}\n.slds-has-button-menu", shadowSelector, " .slds-th__action", shadowSelector, " {padding-right: 2rem;}\n.slds-has-button-menu", shadowSelector, " .slds-th__action-button", shadowSelector, " {right: 0.75rem;}\n.slds-is-sortable__icon", shadowSelector, " {width: 0.75rem;height: 0.75rem;margin-left: 0.25rem;display: none;}\n.slds-is-sorted", shadowSelector, " {}\n.slds-is-sorted", shadowSelector, " .slds-is-sortable__icon", shadowSelector, " {display: inline-block;}\n.slds-is-sorted_asc", shadowSelector, " .slds-is-sortable__icon", shadowSelector, " {-webkit-transform: rotate(180deg);transform: rotate(180deg);}\n.slds-table_column-1-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(1)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-2-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(2)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-3-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(3)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-4-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(4)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-5-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(5)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-6-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(6)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-7-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(7)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-8-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(8)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-9-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(9)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-10-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(10)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-11-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(11)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-12-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(12)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-13-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(13)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-14-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(14)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n.slds-table_column-15-wrap", shadowSelector, " tbody", shadowSelector, " tr", shadowSelector, " > *:nth-child(15)", shadowSelector, " .slds-truncate", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;white-space: normal;}\n[class*=\"slds-table_column-\"]", shadowSelector, " tr", shadowSelector, " td", shadowSelector, " .slds-truncate", shadowSelector, " {overflow: hidden;position: relative;max-height: 3.25rem;}\n[class*=\"slds-table_column-\"]", shadowSelector, " tr", shadowSelector, " td", shadowSelector, " .slds-truncate", shadowSelector, ":after {content: \"\";position: absolute;top: 2.25rem;bottom: 0;right: 0;width: 50%;background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), color-stop(69%, white));background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 69%);}\n[class*=\"slds-table_column-\"]", shadowSelector, " tr:hover", shadowSelector, " td", shadowSelector, " .slds-truncate", shadowSelector, ":after {background: -webkit-gradient(linear, left top, right top, from(rgba(250, 250, 249, 0)), color-stop(69%, #fafaf9));background: linear-gradient(to right, rgba(250, 250, 249, 0) 0%, #fafaf9 69%);}\n.slds-table_resizable-cols", shadowSelector, " thead", shadowSelector, " th", shadowSelector, " {padding: 0;}\n.slds-table_resizable-cols", shadowSelector, " thead", shadowSelector, " th:last-of-type", shadowSelector, " .slds-resizable__handle", shadowSelector, " {width: 0.75rem;right: 0;}\n.slds-table_resizable-cols", shadowSelector, " thead", shadowSelector, " th:last-of-type", shadowSelector, " .slds-resizable__handle", shadowSelector, " .slds-resizable__divider", shadowSelector, ":before,.slds-table_resizable-cols", shadowSelector, " thead", shadowSelector, " th:last-of-type", shadowSelector, " .slds-resizable__handle", shadowSelector, " .slds-resizable__divider", shadowSelector, ":after {right: 0;}\n.slds-resizable", shadowSelector, " {max-width: 100%;}\n.slds-resizable__handle", shadowSelector, " {width: 1.5rem;height: 100%;position: absolute;top: 0;right: -0.75rem;}\n.slds-resizable__divider", shadowSelector, " {position: absolute;right: 0;top: 0;width: 100%;height: 100%;display: block;cursor: col-resize;z-index: 5000;}\n.slds-resizable__divider", shadowSelector, ":before,.slds-resizable__divider", shadowSelector, ":after {height: 100%;content: \" \";display: block;position: absolute;top: 0;right: 0.75rem;}\n.slds-resizable__divider", shadowSelector, ":before {background-color: #b0adab;height: 100%;width: 1px;}\n.slds-resizable__divider", shadowSelector, ":after {background-color: #0070d2;width: 1px;height: 100vh;opacity: 0;}\n.slds-resizable__divider:hover", shadowSelector, ":before,.slds-resizable__divider:focus", shadowSelector, ":before,.slds-resizable__divider:active", shadowSelector, ":before {background-color: #0070d2;width: 0.25rem;}\n.slds-resizable__divider:hover", shadowSelector, ":after,.slds-resizable__divider:focus", shadowSelector, ":after,.slds-resizable__divider:active", shadowSelector, ":after {opacity: 1;}\n.slds-resizable__input:focus", shadowSelector, " ~ .slds-resizable__handle", shadowSelector, " .slds-resizable__divider", shadowSelector, ":before {background-color: #0070d2;width: 0.25rem;}\n.slds-resizable__input:focus", shadowSelector, " ~ .slds-resizable__handle", shadowSelector, " .slds-resizable__divider", shadowSelector, ":after {opacity: 1;}\n"].join('');
}
var stylesheet16 = [stylesheet$g];

function stylesheet$h(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-table_header-hidden", shadowSelector, " {border-top: 0;}\n"].join('');
}
var stylesheet17 = [stylesheet$h];

function stylesheet$i(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-table_edit_container:focus", shadowSelector, " {outline: none;}\n.slds-table_edit_container:focus", shadowSelector, ":before {content: \" \";position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 1;background-color: #fafaf9;-webkit-box-shadow: 0 0 0 4px #1589ee inset;box-shadow: 0 0 0 4px #1589ee inset;}\n.slds-table_edit_container:focus", shadowSelector, " .slds-table_edit_container-message", shadowSelector, " {display: block;position: absolute;top: 50%;left: 50%;width: 20rem;margin-top: -2.25rem;margin-left: -10rem;background-color: white;text-align: center;z-index: 1;}\n.slds-table_edit_container-message", shadowSelector, " {display: none;}\n.slds-table_edit", shadowSelector, " {}\n.slds-table_edit", shadowSelector, " thead", shadowSelector, " th", shadowSelector, " {padding: 0;}\n.slds-table_edit", shadowSelector, " .slds-cell-error", shadowSelector, " {padding-left: 0;}\n.slds-table_edit:not(.slds-no-cell-focus)", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > .slds-cell-edit.slds-has-focus", shadowSelector, " {background-color: white;-webkit-box-shadow: #0070d2 0 0 0 1px inset;box-shadow: #0070d2 0 0 0 1px inset;}\n.slds-table_edit.slds-table", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > .slds-cell-edit:hover", shadowSelector, " {background-color: white;}\n.slds-table_edit.slds-table", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > .slds-cell-edit.slds-is-edited", shadowSelector, " {background-color: #faffbd;}\n.slds-table_edit.slds-table", shadowSelector, " tbody", shadowSelector, " tr:hover", shadowSelector, " > .slds-cell-edit.slds-has-error", shadowSelector, " {background-color: #faffbd;-webkit-box-shadow: #c23934 0 0 0 2px inset;box-shadow: #c23934 0 0 0 2px inset;}\n.slds-table_edit", shadowSelector, " .slds-button__icon_edit:focus", shadowSelector, " {fill: #1589ee;}\n.slds-has-focus", shadowSelector, " .slds-th__action", shadowSelector, " {background-color: white;-webkit-box-shadow: #005fb2 0 0 0 1px inset;box-shadow: #005fb2 0 0 0 1px inset;}\n.slds-has-focus.slds-is-resizable", shadowSelector, " .slds-th__action", shadowSelector, ",.slds-has-focus.slds-is-resizable", shadowSelector, " .slds-th__action:focus", shadowSelector, ",.slds-has-focus.slds-is-resizable", shadowSelector, " .slds-th__action:hover", shadowSelector, ",.slds-has-focus.slds-is-resizable", shadowSelector, " .slds-th__action:focus:hover", shadowSelector, ",.slds-is-resizable", shadowSelector, " .slds-th__action:focus", shadowSelector, ",.slds-is-resizable", shadowSelector, " .slds-th__action:focus:hover", shadowSelector, " {background-color: white;-webkit-box-shadow: #005fb2 0 0 0 1px inset, #005fb2 -0.25rem 0 0 inset;box-shadow: #005fb2 0 0 0 1px inset, #005fb2 -0.25rem 0 0 inset;}\n.slds-table", shadowSelector, " .slds-cell-edit", shadowSelector, " {outline: 0;}\n.slds-table", shadowSelector, " .slds-cell-edit.slds-has-focus", shadowSelector, " {background-color: white;-webkit-box-shadow: #005fb2 0 0 0 1px inset;box-shadow: #005fb2 0 0 0 1px inset;}\n.slds-table", shadowSelector, " .slds-cell-edit.slds-has-focus", shadowSelector, " .slds-button__icon_edit", shadowSelector, ",.slds-table", shadowSelector, " .slds-cell-edit.slds-has-focus", shadowSelector, " .slds-button__icon_lock", shadowSelector, " {opacity: 1;}\n.slds-table", shadowSelector, " .slds-cell-edit.slds-has-focus:hover", shadowSelector, " {-webkit-box-shadow: #005fb2 0 0 0 1px inset;box-shadow: #005fb2 0 0 0 1px inset;}\n.slds-table", shadowSelector, " .slds-cell-edit.slds-has-focus", shadowSelector, " a:focus", shadowSelector, " {text-decoration: underline;outline: none;}\n.slds-table", shadowSelector, " .slds-cell-edit.slds-is-edited", shadowSelector, ",.slds-table", shadowSelector, " .slds-cell-edit.slds-is-edited:hover", shadowSelector, " {background-color: #faffbd;}\n.slds-table", shadowSelector, " .slds-cell-edit.slds-has-error", shadowSelector, ",.slds-table", shadowSelector, " .slds-cell-edit.slds-has-error:hover", shadowSelector, " {background-color: #faffbd;-webkit-box-shadow: #c23934 0 0 0 2px inset;box-shadow: #c23934 0 0 0 2px inset;}\n.slds-cell-edit__button", shadowSelector, " {width: 1.25rem;height: 1.25rem;-ms-flex-negative: 0;flex-shrink: 0;}\n.slds-cell-edit__button:focus", shadowSelector, " .slds-button__icon_edit", shadowSelector, " {opacity: 1;}\n.slds-no-cell-focus", shadowSelector, " .slds-has-focus", shadowSelector, " {background: #f3f2f2;-webkit-box-shadow: none;box-shadow: none;}\n.slds-no-cell-focus", shadowSelector, " .slds-has-focus", shadowSelector, " .slds-th__action", shadowSelector, ",.slds-no-cell-focus", shadowSelector, " .slds-has-focus", shadowSelector, " .slds-th__action:hover", shadowSelector, ",.slds-no-cell-focus", shadowSelector, " .slds-has-focus", shadowSelector, " .slds-th__action:focus", shadowSelector, ",.slds-no-cell-focus", shadowSelector, " .slds-has-focus", shadowSelector, " .slds-th__action:focus:hover", shadowSelector, " {color: inherit;background-color: white;-webkit-box-shadow: none;box-shadow: none;}\n.slds-no-cell-focus", shadowSelector, " .slds-has-focus", shadowSelector, " .slds-button__icon_edit", shadowSelector, " {opacity: 1;}\n.slds-no-cell-focus", shadowSelector, " .slds-has-focus.slds-is-resizable:hover", shadowSelector, " .slds-th__action", shadowSelector, " {background-color: white;-webkit-box-shadow: #dddbda -0.25rem 0 0 inset;box-shadow: #dddbda -0.25rem 0 0 inset;}\n.slds-no-cell-focus", shadowSelector, " .slds-is-sortable.slds-has-focus", shadowSelector, " .slds-is-sortable__icon", shadowSelector, " {display: none;}\n.slds-no-cell-focus", shadowSelector, " .slds-is-sorted.slds-has-focus", shadowSelector, " .slds-is-sortable__icon", shadowSelector, " {display: inline-block;fill: #706e6b;}\n.slds-no-cell-focus", shadowSelector, " .slds-is-edited", shadowSelector, ",.slds-no-cell-focus", shadowSelector, " .slds-is-edited:hover", shadowSelector, " {background-color: #faffbd;}\n.slds-no-cell-focus", shadowSelector, " .slds-has-error", shadowSelector, ",.slds-no-cell-focus", shadowSelector, " .slds-has-error:hover", shadowSelector, " {background-color: #faffbd;-webkit-box-shadow: #c23934 0 0 0 2px inset;box-shadow: #c23934 0 0 0 2px inset;}\n.slds-no-cell-focus", shadowSelector, " thead", shadowSelector, " .slds-has-focus:hover", shadowSelector, " {color: #006dcc;}\n.slds-no-cell-focus", shadowSelector, " thead", shadowSelector, " .slds-has-focus:hover", shadowSelector, " .slds-is-sortable__icon", shadowSelector, " {display: inline-block;fill: #006dcc;}\n.slds-hint-parent", shadowSelector, " .slds-cell-edit", shadowSelector, " .slds-button__icon_edit", shadowSelector, ",.slds-hint-parent", shadowSelector, " .slds-cell-edit", shadowSelector, " .slds-button__icon_lock", shadowSelector, " {opacity: 0;}\n.slds-hint-parent", shadowSelector, " .slds-cell-edit:hover", shadowSelector, " .slds-button__icon_edit", shadowSelector, ",.slds-hint-parent", shadowSelector, " .slds-cell-edit:focus", shadowSelector, " .slds-button__icon_edit", shadowSelector, " {opacity: 0.5;}\n.slds-hint-parent", shadowSelector, " .slds-cell-edit:hover", shadowSelector, " .slds-button__icon_edit:hover", shadowSelector, ",.slds-hint-parent", shadowSelector, " .slds-cell-edit:hover", shadowSelector, " .slds-button__icon_edit:focus", shadowSelector, ",.slds-hint-parent", shadowSelector, " .slds-cell-edit:focus", shadowSelector, " .slds-button__icon_edit:hover", shadowSelector, ",.slds-hint-parent", shadowSelector, " .slds-cell-edit:focus", shadowSelector, " .slds-button__icon_edit:focus", shadowSelector, " {fill: #1589ee;opacity: 1;}\n.slds-hint-parent", shadowSelector, " .slds-cell-edit:hover", shadowSelector, " .slds-button__icon_lock", shadowSelector, ",.slds-hint-parent", shadowSelector, " .slds-cell-edit:focus", shadowSelector, " .slds-button__icon_lock", shadowSelector, " {opacity: 0.5;}\n.slds-hint-parent", shadowSelector, " .slds-cell-edit.slds-has-focus", shadowSelector, " .slds-button__icon_edit", shadowSelector, " {fill: #706e6b;opacity: 1;}\n.slds-form-element__label_edit", shadowSelector, " {margin: 0 0.125rem 0;}\n.slds-popover_edit", shadowSelector, " {border-top: 0;border-top-left-radius: 0;border-top-right-radius: 0;}\n.slds-popover_edit", shadowSelector, " .slds-popover__body", shadowSelector, " {padding: 0.25rem 0.25rem 0.25rem 0;}\n.slds-popover_edit", shadowSelector, " .slds-form-element__help", shadowSelector, " {width: 100%;padding-left: 0.75rem;}\n"].join('');
}
var stylesheet18 = [stylesheet$i];

function stylesheet$j(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-dueling-list", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;clear: left;}\n.slds-dueling-list__column", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;}\n.slds-dueling-list__column", shadowSelector, " .slds-button", shadowSelector, " {margin: 0.25rem;}\n.slds-dueling-list__column", shadowSelector, " .slds-button:first-of-type", shadowSelector, " {margin-top: 1.5rem;}\n.slds-dueling-list__column_responsive", shadowSelector, " {-webkit-box-flex: 0;-ms-flex: 0 1 15rem;flex: 0 1 15rem;-ms-flex-wrap: wrap;flex-wrap: wrap;overflow: hidden;min-width: 6rem;}\n.slds-dueling-list__column_responsive", shadowSelector, " .slds-dueling-list__options", shadowSelector, " {width: auto;max-width: 100%;}\n.slds-dueling-list__options", shadowSelector, ",.slds-picklist__options", shadowSelector, " {border: 1px solid #dddbda;border-radius: 0.25rem;padding: 0.25rem 0;width: 15rem;height: 15rem;background-color: white;overflow: auto;}\n.slds-dueling-list__options", shadowSelector, " [aria-selected=\"true\"]", shadowSelector, ",.slds-picklist__options", shadowSelector, " [aria-selected=\"true\"]", shadowSelector, " {background-color: #0070d2;color: white;}\n.slds-dueling-list__options", shadowSelector, " [aria-selected=\"true\"]:hover", shadowSelector, ",.slds-dueling-list__options", shadowSelector, " [aria-selected=\"true\"]:focus", shadowSelector, ",.slds-picklist__options", shadowSelector, " [aria-selected=\"true\"]:hover", shadowSelector, ",.slds-picklist__options", shadowSelector, " [aria-selected=\"true\"]:focus", shadowSelector, " {background: #005fb2;color: white;}\n.slds-dueling-list__options", shadowSelector, " .slds-is-grabbed", shadowSelector, ",.slds-picklist__options", shadowSelector, " .slds-is-grabbed", shadowSelector, " {-webkit-transform: rotate(3deg);transform: rotate(3deg);}\n.slds-dueling-list__options.slds-is-disabled", shadowSelector, ",.slds-picklist__options.slds-is-disabled", shadowSelector, " {background-color: #ecebea;border-color: #c9c7c5;color: #3e3e3c;}\n.slds-dueling-list__options.slds-is-disabled:hover", shadowSelector, ",.slds-picklist__options.slds-is-disabled:hover", shadowSelector, " {cursor: not-allowed;}\n.slds-dueling-list__options.slds-is-disabled", shadowSelector, " .slds-listbox__option:hover", shadowSelector, ",.slds-picklist__options.slds-is-disabled", shadowSelector, " .slds-listbox__option:hover", shadowSelector, " {cursor: not-allowed;background-color: transparent;}\n.slds-dueling-list__options.slds-is-disabled", shadowSelector, " .slds-listbox__option:focus", shadowSelector, ",.slds-picklist__options.slds-is-disabled", shadowSelector, " .slds-listbox__option:focus", shadowSelector, " {background-color: transparent;}\n"].join('');
}
var stylesheet19 = [stylesheet$j];

function stylesheet$k(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-file-selector", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;}\n.slds-file-selector__dropzone", shadowSelector, " {padding: 0.125rem;border: 1px dashed #dddbda;border-radius: 0.25rem;}\n.slds-file-selector__dropzone.slds-has-drag-over", shadowSelector, " {outline: 0;border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;border-style: solid;}\n.slds-file-selector__input:focus", shadowSelector, " ~ .slds-file-selector__body", shadowSelector, " > .slds-file-selector__button", shadowSelector, " {-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-file-selector__input[disabled]", shadowSelector, " ~ .slds-file-selector__body", shadowSelector, " {color: #dddbda;}\n.slds-file-selector__input[disabled]", shadowSelector, " ~ .slds-file-selector__body", shadowSelector, " > .slds-file-selector__button", shadowSelector, " {background: #e0e5ee;border-color: rgba(0, 0, 0, 0);color: white;}\n.slds-file-selector__input[disabled]", shadowSelector, " ~ .slds-file-selector__body", shadowSelector, " > .slds-file-selector__body-icon", shadowSelector, " {fill: currentColor;}\n.slds-file-selector__button", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}\n.slds-file-selector_files", shadowSelector, " {}\n.slds-file-selector_files", shadowSelector, " .slds-file-selector__body", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}\n.slds-file-selector_files", shadowSelector, " .slds-file-selector__text", shadowSelector, " {margin-left: 0.5rem;margin-right: 0.75rem;}\n.slds-file-selector_images", shadowSelector, " {display: block;}\n.slds-file-selector_images", shadowSelector, " .slds-file-selector__dropzone", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;-ms-flex-line-pack: center;align-content: center;-webkit-box-align: center;-ms-flex-align: center;align-items: center;margin: auto;padding: 1rem;}\n.slds-file-selector_images", shadowSelector, " .slds-file-selector__body", shadowSelector, " {text-align: center;}\n.slds-file-selector_images", shadowSelector, " .slds-file-selector__text", shadowSelector, " {margin-top: 0.75rem;}\n.slds-file-selector_integrated", shadowSelector, " {width: 100%;height: 100%;position: relative;display: block;}\n.slds-file-selector__dropzone_integrated", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;-ms-flex-line-pack: center;align-content: center;-webkit-box-align: center;-ms-flex-align: center;align-items: center;margin: auto;position: absolute;top: 0;left: 0;right: 0;bottom: 0;border: 0;opacity: 0;z-index: -1;}\n.slds-file-selector__dropzone_integrated.slds-has-drag", shadowSelector, " {background: rgba(255, 255, 255, 0.75);opacity: 1;z-index: 8000;}\n.slds-file-selector__dropzone_integrated.slds-has-drag-over", shadowSelector, " {background: #fafaf9;-webkit-box-shadow: 0 0 0 4px #1589ee inset;box-shadow: 0 0 0 4px #1589ee inset;}\n.slds-file-selector__body_integrated", shadowSelector, " {width: 12rem;height: 12rem;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;-ms-flex-line-pack: center;align-content: center;-webkit-box-align: center;-ms-flex-align: center;align-items: center;margin: auto;background: white;-webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);border: 1px solid #dddbda;border-radius: 0.25rem;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;}\n.slds-file-selector__text_integrated", shadowSelector, " {margin-top: 0.75rem;}\n"].join('');
}
var stylesheet20 = [stylesheet$k];

function stylesheet$l(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-form-element", shadowSelector, " {position: relative;min-width: 0;}\n.slds-form-element__label", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: auto;-ms-hyphens: auto;hyphens: auto;display: inline-block;color: #3e3e3c;font-size: 0.75rem;padding-right: 0.5rem;padding-top: 0.25rem;margin-bottom: 0.125rem;}\n.slds-form-element__label:empty", shadowSelector, " {margin: 0;}\n.slds-form-element__control", shadowSelector, " {clear: left;position: relative;}\n.slds-form-element__control", shadowSelector, " .slds-radio", shadowSelector, ",.slds-form-element__control", shadowSelector, " .slds-checkbox", shadowSelector, " {display: block;}\n.slds-form-element__icon", shadowSelector, " {display: inline-block;position: relative;padding-top: 0.25rem;vertical-align: top;line-height: 1;z-index: 1;}\n.slds-form-element__icon", shadowSelector, " .slds-button_icon", shadowSelector, " {position: relative;}\n.slds-form-element__help", shadowSelector, ",.slds-form-element__helper", shadowSelector, " {font-size: 0.75rem;margin-top: 0.125rem;display: block;}\n.slds-form-element_edit", shadowSelector, " .slds-form-element__static", shadowSelector, " {width: calc(100% - 1.5rem);}\n.slds-form-element_readonly", shadowSelector, " {-ms-flex-preferred-size: 0%;flex-basis: 0%;border-bottom: 1px solid #dddbda;margin-bottom: 0;}\n.slds-form-element_readonly", shadowSelector, " .slds-form-element__control", shadowSelector, " {padding-top: 0.125rem;padding-bottom: 0.125rem;}\n.slds-form-element_readonly", shadowSelector, " .slds-form-element__label", shadowSelector, " {margin-bottom: 0;}\n.slds-form-element__legend", shadowSelector, " {font-weight: 700;float: left;}\n.slds-form-element__addon", shadowSelector, " {display: inline-block;margin: 0 0.5rem;-ms-flex-item-align: center;align-self: center;}\n.slds-form-element__static", shadowSelector, " {overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;display: inline-block;font-size: 0.875rem;font-weight: 400;color: #080707;width: 100%;}\n.slds-form-element__static.slds-text-longform", shadowSelector, " *:last-child", shadowSelector, " {margin-bottom: 0;}\n.slds-form-element__static:empty", shadowSelector, " {min-height: calc(1.25rem + 1px);vertical-align: bottom;}\n.slds-form-element__static--edit", shadowSelector, " {width: calc(100% - 1.5rem);}\n.slds-required", shadowSelector, " {color: #c23934;margin: 0 0.125rem;}\n.slds-has-error", shadowSelector, " .slds-form-element__help", shadowSelector, " {color: #c23934;}\n"].join('');
}
var stylesheet21 = [stylesheet$l];

function stylesheet$m(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-form-element_compound", shadowSelector, " .slds-form-element__row", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;margin-bottom: 0.25rem;margin-left: -0.25rem;margin-right: -0.25rem;}\n.slds-form-element_compound", shadowSelector, " .slds-form-element__row", shadowSelector, " .slds-form-element__label", shadowSelector, " {padding-top: 0;}\n.slds-form-element_compound", shadowSelector, " .slds-form-element", shadowSelector, " {padding-left: 0.25rem;padding-right: 0.25rem;}\n"].join('');
}
var stylesheet22 = [stylesheet$m];

function stylesheet$n(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-form-element_horizontal", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " {display: block;}\n.slds-form-element_horizontal:not(.slds-form-element_readonly)", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element:not(.slds-form-element_readonly)", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element_horizontal:not(.slds-form-element_readonly)", shadowSelector, " {margin-bottom: 0.5rem;}\n.slds-form-element_horizontal:not([class*=\"slds-size\"])", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element:not([class*=\"slds-size\"])", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element_horizontal:not([class*=\"slds-size\"])", shadowSelector, " {width: 100%;-ms-flex-preferred-size: 100%;flex-basis: 100%;}\n.slds-form-element_horizontal:not(.slds-is-editing)", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element:not(.slds-is-editing)", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element_horizontal:not(.slds-is-editing)", shadowSelector, " {padding: 0.25rem 0.25rem;}\n.slds-form-element_horizontal", shadowSelector, " .slds-form-element", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " {padding: 0;margin-bottom: 0;}\n.slds-form-element_horizontal.slds-is-edited", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element.slds-is-edited", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element_horizontal.slds-is-edited", shadowSelector, " {padding-top: 1.25rem;}\n@media (min-width: 48em) {.slds-form-element_horizontal.slds-form-element_1-col", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element.slds-form-element_1-col", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal.slds-form-element_1-col", shadowSelector, " .slds-form-element__label", shadowSelector, " {max-width: calc((50% - 33.333%) - 1.25rem);}\n.slds-form-element_horizontal.slds-form-element_1-col", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element.slds-form-element_1-col", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal.slds-form-element_1-col", shadowSelector, " .slds-form-element__control", shadowSelector, " {padding-left: calc((50% - 33.333%) - (0.25rem * 2));}\n}@media (min-width: 48em) {.slds-form-element_horizontal", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-form-element__label", shadowSelector, " {float: left;max-width: calc(33% - 1.25rem);-ms-flex-preferred-size: calc(33% - 1.25rem);flex-basis: calc(33% - 1.25rem);margin-bottom: 0;position: relative;z-index: 1;}\n.slds-form-element_horizontal", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-form-element__control", shadowSelector, " {padding-left: 33%;clear: none;}\n.slds-form-element_horizontal", shadowSelector, " .slds-form-element__control", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__control", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-form-element__control", shadowSelector, " .slds-form-element__control", shadowSelector, " {padding-left: 0;}\n.slds-form-element_horizontal", shadowSelector, " .slds-form-element__icon", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__icon", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-form-element__icon", shadowSelector, " {float: left;padding-top: 0.25rem;}\n.slds-form-element_horizontal", shadowSelector, " .slds-checkbox_standalone", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-checkbox_standalone", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-checkbox_standalone", shadowSelector, " {padding: 0.25rem 0;}\n.slds-form-element_horizontal", shadowSelector, " .slds-checkbox:not(.slds-checkbox_stacked)", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form-element_horizontal", shadowSelector, " .slds-radio", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-checkbox:not(.slds-checkbox_stacked)", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-radio", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-checkbox:not(.slds-checkbox_stacked)", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-radio", shadowSelector, " .slds-form-element__label", shadowSelector, " {position: relative;float: none;max-width: 100%;width: auto;}\n.slds-form-element_horizontal", shadowSelector, " .slds-form-element__row", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form-element_horizontal", shadowSelector, " .slds-form-element__row", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form-element_horizontal", shadowSelector, " .slds-dueling-list__column", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__row", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__row", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-dueling-list__column", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-form-element__row", shadowSelector, " .slds-form-element__label", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-form-element__row", shadowSelector, " .slds-form-element__control", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-dueling-list__column", shadowSelector, " .slds-form-element__label", shadowSelector, " {width: auto;max-width: 100%;-ms-flex-preferred-size: auto;flex-basis: auto;float: none;position: relative;padding-left: 0;margin-bottom: 0;}\n.slds-form-element_horizontal", shadowSelector, " .slds-dueling-list", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-dueling-list", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-dueling-list", shadowSelector, " {clear: none;}\n.slds-form-element_horizontal", shadowSelector, " .slds-input-has-icon_left", shadowSelector, " .slds-input__icon", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-input-has-icon_left", shadowSelector, " .slds-input__icon", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-input-has-icon_left", shadowSelector, " .slds-input__icon", shadowSelector, " {left: calc(33% + 0.75rem);}\n.slds-form-element_horizontal", shadowSelector, " .slds-input-has-icon_left-right", shadowSelector, " .slds-input__icon_left", shadowSelector, ", .slds-form_horizontal", shadowSelector, " .slds-form-element", shadowSelector, " .slds-input-has-icon_left-right", shadowSelector, " .slds-input__icon_left", shadowSelector, ", .slds-form_stacked", shadowSelector, " .slds-form-element_horizontal", shadowSelector, " .slds-input-has-icon_left-right", shadowSelector, " .slds-input__icon_left", shadowSelector, " {left: calc(33% + 0.75rem);}\n}"].join('');
}
var stylesheet23 = [stylesheet$n];

function stylesheet$o(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-form__row", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-left: -0.75rem;margin-right: -0.75rem;}\n.slds-form__item", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-flex: 1;-ms-flex: 1 1 0%;flex: 1 1 0%;min-width: 280px;padding-left: 0.75rem;padding-right: 0.75rem;}\n.slds-is-edited", shadowSelector, " {background: #faffbd;}\n.slds-is-edited", shadowSelector, " .slds-form-element__undo", shadowSelector, " {top: -1.25rem;right: 0.25rem;}\n.slds-form-element__undo", shadowSelector, " {position: absolute;top: 0;right: 0;}\n"].join('');
}
var stylesheet24 = [stylesheet$o];

function stylesheet$p(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-form-element_stacked", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " {display: block;}\n.slds-form-element_stacked:not(.slds-form-element_readonly)", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element:not(.slds-form-element_readonly)", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked:not(.slds-form-element_readonly)", shadowSelector, " {margin-bottom: 0.5rem;}\n.slds-form-element_stacked:not(.slds-is-editing)", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element:not(.slds-is-editing)", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked:not(.slds-is-editing)", shadowSelector, " {padding: 0 0.25rem;}\n.slds-form-element_stacked", shadowSelector, " .slds-form-element", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " .slds-form-element", shadowSelector, " {padding: 0;margin-bottom: 0;}\n.slds-form-element_stacked:not([class*=\"slds-size\"])", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element:not([class*=\"slds-size\"])", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked:not([class*=\"slds-size\"])", shadowSelector, " {width: 100%;-ms-flex-preferred-size: 100%;flex-basis: 100%;}\n.slds-form-element_stacked", shadowSelector, " .slds-checkbox", shadowSelector, ",.slds-form-element_stacked", shadowSelector, " .slds-radio", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, " .slds-checkbox", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, " .slds-radio", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " .slds-checkbox", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " .slds-radio", shadowSelector, " {display: block;}\n.slds-form-element_stacked", shadowSelector, " .slds-form-element__label", shadowSelector, ",.slds-form-element_stacked", shadowSelector, " .slds-form-element__control", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__label", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__control", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " .slds-form-element__label", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " .slds-form-element__control", shadowSelector, " {border-bottom: 0;padding-left: 0;}\n.slds-form-element_stacked", shadowSelector, " .slds-form-element__control", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__control", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " .slds-form-element__control", shadowSelector, " {width: 100%;-ms-flex-preferred-size: 100%;flex-basis: 100%;clear: left;}\n.slds-form-element_stacked", shadowSelector, " .slds-form-element__icon", shadowSelector, ",.slds-form_stacked", shadowSelector, " .slds-form-element", shadowSelector, " .slds-form-element__icon", shadowSelector, ",.slds-form_horizontal", shadowSelector, " .slds-form-element_stacked", shadowSelector, " .slds-form-element__icon", shadowSelector, " {float: none;padding-top: 0.25rem;}\n"].join('');
}
var stylesheet25 = [stylesheet$p];

function stylesheet$q(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-icon_container", shadowSelector, ",.slds-icon__container", shadowSelector, " {display: inline-block;border-radius: 0.25rem;line-height: 1;}\n.slds-icon_container_circle", shadowSelector, ",.slds-icon__container_circle", shadowSelector, " {padding: 0.5rem;border-radius: 50%;}\n[dir=\"rtl\"]", shadowSelector, " .slds-icon_flip", shadowSelector, " {-webkit-transform: scaleX(-1);transform: scaleX(-1);}\n[class*=\"slds-icon-action-\"]", shadowSelector, " {padding: 0.5rem;border-radius: 50%;}\n.slds-icon-action-new-custom18", shadowSelector, " {background-color: #4dca76;}\n.slds-icon-action-new-custom29", shadowSelector, " {background-color: #bdd25f;}\n.slds-icon-action-edit-groups", shadowSelector, " {background-color: #34becd;}\n.slds-icon-action-new-custom9", shadowSelector, " {background-color: #6b9ee2;}\n.slds-icon-action-log-a-call", shadowSelector, " {background-color: #48c3cc;}\n.slds-icon-action-new-custom19", shadowSelector, " {background-color: #3abeb1;}\n.slds-icon-action-filter", shadowSelector, " {background-color: #fd90b5;}\n.slds-icon-action-user-activation", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-opportunity-competitor", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-action-canvas", shadowSelector, " {background-color: #8199af;}\n.slds-icon-action-change-record-type", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-new-notebook", shadowSelector, " {background-color: #e6d478;}\n.slds-icon-action-docusign", shadowSelector, " {background-color: #5080db;}\n.slds-icon-action-share-link", shadowSelector, " {background-color: #7a9ae6;}\n.slds-icon-action-add-file", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-action-edit-relationship", shadowSelector, " {background-color: #1dccbf;}\n.slds-icon-action-notebook", shadowSelector, " {background-color: #e6d478;}\n.slds-icon-action-new-lead", shadowSelector, " {background-color: #f88962;}\n.slds-icon-action-new-custom-object", shadowSelector, " {background-color: #a7d44d;}\n.slds-icon-action-new-account", shadowSelector, " {background-color: #7f8de1;}\n.slds-icon-action-question-post-action", shadowSelector, " {background-color: #32af5c;}\n.slds-icon-action-share-file", shadowSelector, " {background-color: #baac93;}\n.slds-icon-action-default-custom-object", shadowSelector, " {background-color: #8199af;}\n.slds-icon-action-opportunity-team-member", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-action-add-photo-video", shadowSelector, " {background-color: #00cdc0;}\n.slds-icon-action-sort", shadowSelector, " {background-color: #fab9a5;}\n.slds-icon-action-call", shadowSelector, " {background-color: #1fcaa0;}\n.slds-icon-action-concur", shadowSelector, " {background-color: #4cc3c7;}\n.slds-icon-action-reject", shadowSelector, " {background-color: #00c6b7;}\n.slds-icon-action-share-poll", shadowSelector, " {background-color: #699be1;}\n.slds-icon-action-following", shadowSelector, " {background-color: #7dcf64;}\n.slds-icon-action-defer", shadowSelector, " {background-color: #ef7ead;}\n.slds-icon-action-opportunity-line-item", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-action-social-post", shadowSelector, " {background-color: #ea74a2;}\n.slds-icon-action-share-post", shadowSelector, " {background-color: #65cae4;}\n.slds-icon-action-view-relationship", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-action-upload", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-remove-relationship", shadowSelector, " {background-color: #ef6e64;}\n.slds-icon-action-freeze-user", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-new-person-account", shadowSelector, " {background-color: #7f8de1;}\n.slds-icon-action-bug", shadowSelector, " {background-color: #ef6e5d;}\n.slds-icon-action-apex", shadowSelector, " {background-color: #696e71;}\n.slds-icon-action-new-opportunity", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-action-fallback", shadowSelector, " {background-color: #9895ee;}\n.slds-icon-action-dial-in", shadowSelector, " {background-color: #8b9ae3;}\n.slds-icon-action-approval", shadowSelector, " {background-color: #00c6b7;}\n.slds-icon-action-change-owner", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-new-task", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-action-priority", shadowSelector, " {background-color: #fbb439;}\n.slds-icon-action-remove", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-web-link", shadowSelector, " {background-color: #56aadf;}\n.slds-icon-action-leave-group", shadowSelector, " {background-color: #f39e58;}\n.slds-icon-action-manage-perm-sets", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-close", shadowSelector, " {background-color: #ef6e64;}\n.slds-icon-action-google-news", shadowSelector, " {background-color: #f5675b;}\n.slds-icon-action-announcement", shadowSelector, " {background-color: #fe8f60;}\n.slds-icon-action-back", shadowSelector, " {background-color: #0dc2d9;}\n.slds-icon-action-new-custom90", shadowSelector, " {background-color: #22a48a;}\n.slds-icon-action-download", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-new-custom80", shadowSelector, " {background-color: #659ad5;}\n.slds-icon-action-new-custom91", shadowSelector, " {background-color: #bf7b66;}\n.slds-icon-action-search", shadowSelector, " {background-color: #48adeb;}\n.slds-icon-action-new-event", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-action-new-custom70", shadowSelector, " {background-color: #e769b4;}\n.slds-icon-action-new-custom81", shadowSelector, " {background-color: #da627f;}\n.slds-icon-action-new-custom92", shadowSelector, " {background-color: #517e82;}\n.slds-icon-action-refresh", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-share-thanks", shadowSelector, " {background-color: #e9696e;}\n.slds-icon-action-update", shadowSelector, " {background-color: #81b4d6;}\n.slds-icon-action-email", shadowSelector, " {background-color: #95aec5;}\n.slds-icon-action-join-group", shadowSelector, " {background-color: #779ef2;}\n.slds-icon-action-new-custom60", shadowSelector, " {background-color: #bf5a88;}\n.slds-icon-action-new-custom71", shadowSelector, " {background-color: #e36ee3;}\n.slds-icon-action-new-custom82", shadowSelector, " {background-color: #d15b97;}\n.slds-icon-action-new-custom93", shadowSelector, " {background-color: #904d4c;}\n.slds-icon-action-edit", shadowSelector, " {background-color: #1dccbf;}\n.slds-icon-action-quote", shadowSelector, " {background-color: #88c651;}\n.slds-icon-action-dropbox", shadowSelector, " {background-color: #52aef9;}\n.slds-icon-action-description", shadowSelector, " {background-color: #7dc37d;}\n.slds-icon-action-map", shadowSelector, " {background-color: #76c6ee;}\n.slds-icon-action-user", shadowSelector, " {background-color: #65cae4;}\n.slds-icon-action-reset-password", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-new-custom50", shadowSelector, " {background-color: #49bcd3;}\n.slds-icon-action-new-custom61", shadowSelector, " {background-color: #f57376;}\n.slds-icon-action-new-custom72", shadowSelector, " {background-color: #8d9bfb;}\n.slds-icon-action-new-custom83", shadowSelector, " {background-color: #e7806f;}\n.slds-icon-action-new-custom94", shadowSelector, " {background-color: #439cba;}\n.slds-icon-action-clone", shadowSelector, " {background-color: #6ca1e9;}\n.slds-icon-action-script", shadowSelector, " {background-color: #0070d2;}\n.slds-icon-action-delete", shadowSelector, " {background-color: #e6717c;}\n.slds-icon-action-new-custom40", shadowSelector, " {background-color: #83c75e;}\n.slds-icon-action-new-custom51", shadowSelector, " {background-color: #d8c760;}\n.slds-icon-action-new-custom62", shadowSelector, " {background-color: #6b92dc;}\n.slds-icon-action-new-custom73", shadowSelector, " {background-color: #679ef0;}\n.slds-icon-action-new-custom84", shadowSelector, " {background-color: #f6707b;}\n.slds-icon-action-new-custom95", shadowSelector, " {background-color: #8bcf6a;}\n.slds-icon-action-share", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-new-custom30", shadowSelector, " {background-color: #f59f71;}\n.slds-icon-action-new-custom41", shadowSelector, " {background-color: #43b5b5;}\n.slds-icon-action-new-custom52", shadowSelector, " {background-color: #ee8e6f;}\n.slds-icon-action-new-custom63", shadowSelector, " {background-color: #7ccf60;}\n.slds-icon-action-new-custom74", shadowSelector, " {background-color: #41c8a0;}\n.slds-icon-action-new-custom85", shadowSelector, " {background-color: #f26891;}\n.slds-icon-action-new-custom96", shadowSelector, " {background-color: #6d9de3;}\n.slds-icon-action-log-event", shadowSelector, " {background-color: #6ca1e9;}\n.slds-icon-action-new-group", shadowSelector, " {background-color: #83b6ff;}\n.slds-icon-action-new-custom20", shadowSelector, " {background-color: #48c7c8;}\n.slds-icon-action-new-custom31", shadowSelector, " {background-color: #eb687f;}\n.slds-icon-action-new-custom42", shadowSelector, " {background-color: #cfd05b;}\n.slds-icon-action-info", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-new-custom53", shadowSelector, " {background-color: #f36e83;}\n.slds-icon-action-new-custom64", shadowSelector, " {background-color: #618fd8;}\n.slds-icon-action-new-custom75", shadowSelector, " {background-color: #cd9f65;}\n.slds-icon-action-new-custom86", shadowSelector, " {background-color: #e260ab;}\n.slds-icon-action-flow", shadowSelector, " {background-color: #0079bc;}\n.slds-icon-action-new-custom97", shadowSelector, " {background-color: #dd6085;}\n.slds-icon-action-submit-for-approval", shadowSelector, " {background-color: #50cc7a;}\n.slds-icon-action-new", shadowSelector, " {background-color: #33bce7;}\n.slds-icon-action-new-campaign", shadowSelector, " {background-color: #f49756;}\n.slds-icon-action-new-custom10", shadowSelector, " {background-color: #6488e3;}\n.slds-icon-action-new-custom21", shadowSelector, " {background-color: #8a7aed;}\n.slds-icon-action-new-custom32", shadowSelector, " {background-color: #38c393;}\n.slds-icon-action-new-custom43", shadowSelector, " {background-color: #7f93f9;}\n.slds-icon-action-new-custom54", shadowSelector, " {background-color: #ea70b1;}\n.slds-icon-action-new-custom65", shadowSelector, " {background-color: #f279ab;}\n.slds-icon-action-new-custom76", shadowSelector, " {background-color: #db6d7a;}\n.slds-icon-action-new-custom87", shadowSelector, " {background-color: #d876e5;}\n.slds-icon-action-new-custom98", shadowSelector, " {background-color: #e1be5c;}\n.slds-icon-action-new-case", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-action-new-custom100", shadowSelector, " {background-color: #e15d76;}\n.slds-icon-action-new-custom1", shadowSelector, " {background-color: #ff7b84;}\n.slds-icon-action-new-contact", shadowSelector, " {background-color: #a094ed;}\n.slds-icon-action-office-365", shadowSelector, " {background-color: #ff8041;}\n.slds-icon-action-new-custom11", shadowSelector, " {background-color: #8784ea;}\n.slds-icon-action-new-custom22", shadowSelector, " {background-color: #8b85f9;}\n.slds-icon-action-new-custom33", shadowSelector, " {background-color: #97cf5d;}\n.slds-icon-action-new-custom44", shadowSelector, " {background-color: #c8ca58;}\n.slds-icon-action-new-custom55", shadowSelector, " {background-color: #d66ee0;}\n.slds-icon-action-new-custom66", shadowSelector, " {background-color: #d8be5f;}\n.slds-icon-action-new-custom77", shadowSelector, " {background-color: #b55d5b;}\n.slds-icon-action-new-custom88", shadowSelector, " {background-color: #996fe6;}\n.slds-icon-action-new-custom99", shadowSelector, " {background-color: #f0856e;}\n.slds-icon-action-add-contact", shadowSelector, " {background-color: #a094ed;}\n.slds-icon-action-evernote", shadowSelector, " {background-color: #86c86f;}\n.slds-icon-action-new-custom2", shadowSelector, " {background-color: #cfd05c;}\n.slds-icon-action-lead-convert", shadowSelector, " {background-color: #f88962;}\n.slds-icon-action-new-custom12", shadowSelector, " {background-color: #dc71d1;}\n.slds-icon-action-new-custom23", shadowSelector, " {background-color: #b070e6;}\n.slds-icon-action-new-custom34", shadowSelector, " {background-color: #d58a6a;}\n.slds-icon-action-new-custom45", shadowSelector, " {background-color: #d95879;}\n.slds-icon-action-new-custom56", shadowSelector, " {background-color: #718deb;}\n.slds-icon-action-new-custom67", shadowSelector, " {background-color: #f87d76;}\n.slds-icon-action-recall", shadowSelector, " {background-color: #4a698d;}\n.slds-icon-action-new-custom78", shadowSelector, " {background-color: #5a95dd;}\n.slds-icon-action-new-custom89", shadowSelector, " {background-color: #3e99be;}\n.slds-icon-action-follow", shadowSelector, " {background-color: #31b9f8;}\n.slds-icon-action-record", shadowSelector, " {background-color: #7dc37d;}\n.slds-icon-action-new-custom3", shadowSelector, " {background-color: #ecb46c;}\n.slds-icon-action-new-note", shadowSelector, " {background-color: #e6d478;}\n.slds-icon-action-new-custom13", shadowSelector, " {background-color: #df6184;}\n.slds-icon-action-new-custom24", shadowSelector, " {background-color: #e56798;}\n.slds-icon-action-new-custom35", shadowSelector, " {background-color: #e9637e;}\n.slds-icon-action-new-custom46", shadowSelector, " {background-color: #67a5e7;}\n.slds-icon-action-new-custom57", shadowSelector, " {background-color: #5a9cdd;}\n.slds-icon-action-new-custom68", shadowSelector, " {background-color: #f26979;}\n.slds-icon-action-new-custom79", shadowSelector, " {background-color: #8ed363;}\n.slds-icon-action-new-child-case", shadowSelector, " {background-color: #fa975c;}\n.slds-icon-action-new-custom4", shadowSelector, " {background-color: #e1d951;}\n.slds-icon-action-new-custom14", shadowSelector, " {background-color: #3cc2b3;}\n.slds-icon-action-new-custom25", shadowSelector, " {background-color: #e46fbe;}\n.slds-icon-action-new-custom36", shadowSelector, " {background-color: #d472d4;}\n.slds-icon-action-new-custom47", shadowSelector, " {background-color: #5fcc64;}\n.slds-icon-action-new-custom58", shadowSelector, " {background-color: #34b59d;}\n.slds-icon-action-new-custom69", shadowSelector, " {background-color: #ed6387;}\n.slds-icon-action-new-custom5", shadowSelector, " {background-color: #9fdb66;}\n.slds-icon-action-goal", shadowSelector, " {background-color: #56aadf;}\n.slds-icon-action-new-custom15", shadowSelector, " {background-color: #f77e75;}\n.slds-icon-action-new-custom26", shadowSelector, " {background-color: #7698f0;}\n.slds-icon-action-new-custom37", shadowSelector, " {background-color: #8c89f2;}\n.slds-icon-action-new-custom48", shadowSelector, " {background-color: #ef697f;}\n.slds-icon-action-new-custom59", shadowSelector, " {background-color: #e3d067;}\n.slds-icon-action-new-custom6", shadowSelector, " {background-color: #54c473;}\n.slds-icon-action-log-this-event", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-action-new-custom16", shadowSelector, " {background-color: #e9af67;}\n.slds-icon-action-new-custom27", shadowSelector, " {background-color: #5ab0d2;}\n.slds-icon-action-new-custom38", shadowSelector, " {background-color: #53b6d7;}\n.slds-icon-action-new-custom49", shadowSelector, " {background-color: #e25c80;}\n.slds-icon-action-new-custom7", shadowSelector, " {background-color: #6a89e5;}\n.slds-icon-action-more", shadowSelector, " {background-color: #62b7ed;}\n.slds-icon-action-add-relationship", shadowSelector, " {background-color: #62b7ed;}\n.slds-icon-action-new-custom17", shadowSelector, " {background-color: #acd360;}\n.slds-icon-action-new-custom28", shadowSelector, " {background-color: #89c059;}\n.slds-icon-action-new-custom39", shadowSelector, " {background-color: #4fbe75;}\n.slds-icon-action-password-unlock", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-check", shadowSelector, " {background-color: #54698d;}\n.slds-icon-action-update-status", shadowSelector, " {background-color: #1ec7be;}\n.slds-icon-action-preview", shadowSelector, " {background-color: #7f8de1;}\n.slds-icon-action-new-custom8", shadowSelector, " {background-color: #50ceb9;}\n.slds-icon-custom-custom110", shadowSelector, ",.slds-icon-custom-110", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom100", shadowSelector, ",.slds-icon-custom-100", shadowSelector, " {background-color: #e15d76;color: white;}\n.slds-icon-custom-custom111", shadowSelector, ",.slds-icon-custom-111", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom1", shadowSelector, ",.slds-icon-custom-1", shadowSelector, " {background-color: #ff7b84;color: white;}\n.slds-icon-custom-custom101", shadowSelector, ",.slds-icon-custom-101", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom112", shadowSelector, ",.slds-icon-custom-112", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom2", shadowSelector, ",.slds-icon-custom-2", shadowSelector, " {background-color: #cfd05c;color: white;}\n.slds-icon-custom-custom102", shadowSelector, ",.slds-icon-custom-102", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom113", shadowSelector, ",.slds-icon-custom-113", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom90", shadowSelector, ",.slds-icon-custom-90", shadowSelector, " {background-color: #22a48a;color: white;}\n.slds-icon-custom-custom3", shadowSelector, ",.slds-icon-custom-3", shadowSelector, " {background-color: #ecb46c;color: white;}\n.slds-icon-custom-custom103", shadowSelector, ",.slds-icon-custom-103", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom80", shadowSelector, ",.slds-icon-custom-80", shadowSelector, " {background-color: #659ad5;color: white;}\n.slds-icon-custom-custom91", shadowSelector, ",.slds-icon-custom-91", shadowSelector, " {background-color: #bf7b66;color: white;}\n.slds-icon-custom-custom4", shadowSelector, ",.slds-icon-custom-4", shadowSelector, " {background-color: #e1d951;color: white;}\n.slds-icon-custom-custom104", shadowSelector, ",.slds-icon-custom-104", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom70", shadowSelector, ",.slds-icon-custom-70", shadowSelector, " {background-color: #e769b4;color: white;}\n.slds-icon-custom-custom81", shadowSelector, ",.slds-icon-custom-81", shadowSelector, " {background-color: #da627f;color: white;}\n.slds-icon-custom-custom92", shadowSelector, ",.slds-icon-custom-92", shadowSelector, " {background-color: #517e82;color: white;}\n.slds-icon-custom-custom5", shadowSelector, ",.slds-icon-custom-5", shadowSelector, " {background-color: #9fdb66;color: white;}\n.slds-icon-custom-custom105", shadowSelector, ",.slds-icon-custom-105", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom60", shadowSelector, ",.slds-icon-custom-60", shadowSelector, " {background-color: #bf5a88;color: white;}\n.slds-icon-custom-custom71", shadowSelector, ",.slds-icon-custom-71", shadowSelector, " {background-color: #e36ee3;color: white;}\n.slds-icon-custom-custom82", shadowSelector, ",.slds-icon-custom-82", shadowSelector, " {background-color: #d15b97;color: white;}\n.slds-icon-custom-custom93", shadowSelector, ",.slds-icon-custom-93", shadowSelector, " {background-color: #904d4c;color: white;}\n.slds-icon-custom-custom6", shadowSelector, ",.slds-icon-custom-6", shadowSelector, " {background-color: #54c473;color: white;}\n.slds-icon-custom-custom106", shadowSelector, ",.slds-icon-custom-106", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom50", shadowSelector, ",.slds-icon-custom-50", shadowSelector, " {background-color: #49bcd3;color: white;}\n.slds-icon-custom-custom61", shadowSelector, ",.slds-icon-custom-61", shadowSelector, " {background-color: #f57376;color: white;}\n.slds-icon-custom-custom72", shadowSelector, ",.slds-icon-custom-72", shadowSelector, " {background-color: #8d9bfb;color: white;}\n.slds-icon-custom-custom83", shadowSelector, ",.slds-icon-custom-83", shadowSelector, " {background-color: #e7806f;color: white;}\n.slds-icon-custom-custom94", shadowSelector, ",.slds-icon-custom-94", shadowSelector, " {background-color: #439cba;color: white;}\n.slds-icon-custom-custom7", shadowSelector, ",.slds-icon-custom-7", shadowSelector, " {background-color: #6a89e5;color: white;}\n.slds-icon-custom-custom107", shadowSelector, ",.slds-icon-custom-107", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom40", shadowSelector, ",.slds-icon-custom-40", shadowSelector, " {background-color: #83c75e;color: white;}\n.slds-icon-custom-custom51", shadowSelector, ",.slds-icon-custom-51", shadowSelector, " {background-color: #d8c760;color: white;}\n.slds-icon-custom-custom62", shadowSelector, ",.slds-icon-custom-62", shadowSelector, " {background-color: #6b92dc;color: white;}\n.slds-icon-custom-custom73", shadowSelector, ",.slds-icon-custom-73", shadowSelector, " {background-color: #679ef0;color: white;}\n.slds-icon-custom-custom84", shadowSelector, ",.slds-icon-custom-84", shadowSelector, " {background-color: #f6707b;color: white;}\n.slds-icon-custom-custom95", shadowSelector, ",.slds-icon-custom-95", shadowSelector, " {background-color: #8bcf6a;color: white;}\n.slds-icon-custom-custom8", shadowSelector, ",.slds-icon-custom-8", shadowSelector, " {background-color: #50ceb9;color: white;}\n.slds-icon-custom-custom108", shadowSelector, ",.slds-icon-custom-108", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom30", shadowSelector, ",.slds-icon-custom-30", shadowSelector, " {background-color: #f59f71;color: white;}\n.slds-icon-custom-custom41", shadowSelector, ",.slds-icon-custom-41", shadowSelector, " {background-color: #43b5b5;color: white;}\n.slds-icon-custom-custom52", shadowSelector, ",.slds-icon-custom-52", shadowSelector, " {background-color: #ee8e6f;color: white;}\n.slds-icon-custom-custom63", shadowSelector, ",.slds-icon-custom-63", shadowSelector, " {background-color: #7ccf60;color: white;}\n.slds-icon-custom-custom74", shadowSelector, ",.slds-icon-custom-74", shadowSelector, " {background-color: #41c8a0;color: white;}\n.slds-icon-custom-custom85", shadowSelector, ",.slds-icon-custom-85", shadowSelector, " {background-color: #f26891;color: white;}\n.slds-icon-custom-custom96", shadowSelector, ",.slds-icon-custom-96", shadowSelector, " {background-color: #6d9de3;color: white;}\n.slds-icon-custom-custom9", shadowSelector, ",.slds-icon-custom-9", shadowSelector, " {background-color: #6b9ee2;color: white;}\n.slds-icon-custom-custom109", shadowSelector, ",.slds-icon-custom-109", shadowSelector, " {background-color: #f28b00;color: white;}\n.slds-icon-custom-custom20", shadowSelector, ",.slds-icon-custom-20", shadowSelector, " {background-color: #48c7c8;color: white;}\n.slds-icon-custom-custom31", shadowSelector, ",.slds-icon-custom-31", shadowSelector, " {background-color: #eb687f;color: white;}\n.slds-icon-custom-custom42", shadowSelector, ",.slds-icon-custom-42", shadowSelector, " {background-color: #cfd05b;color: white;}\n.slds-icon-custom-custom53", shadowSelector, ",.slds-icon-custom-53", shadowSelector, " {background-color: #f36e83;color: white;}\n.slds-icon-custom-custom64", shadowSelector, ",.slds-icon-custom-64", shadowSelector, " {background-color: #618fd8;color: white;}\n.slds-icon-custom-custom75", shadowSelector, ",.slds-icon-custom-75", shadowSelector, " {background-color: #cd9f65;color: white;}\n.slds-icon-custom-custom86", shadowSelector, ",.slds-icon-custom-86", shadowSelector, " {background-color: #e260ab;color: white;}\n.slds-icon-custom-custom97", shadowSelector, ",.slds-icon-custom-97", shadowSelector, " {background-color: #dd6085;color: white;}\n.slds-icon-custom-custom10", shadowSelector, ",.slds-icon-custom-10", shadowSelector, " {background-color: #6488e3;color: white;}\n.slds-icon-custom-custom21", shadowSelector, ",.slds-icon-custom-21", shadowSelector, " {background-color: #8a7aed;color: white;}\n.slds-icon-custom-custom32", shadowSelector, ",.slds-icon-custom-32", shadowSelector, " {background-color: #38c393;color: white;}\n.slds-icon-custom-custom43", shadowSelector, ",.slds-icon-custom-43", shadowSelector, " {background-color: #7f93f9;color: white;}\n.slds-icon-custom-custom54", shadowSelector, ",.slds-icon-custom-54", shadowSelector, " {background-color: #ea70b1;color: white;}\n.slds-icon-custom-custom65", shadowSelector, ",.slds-icon-custom-65", shadowSelector, " {background-color: #f279ab;color: white;}\n.slds-icon-custom-custom76", shadowSelector, ",.slds-icon-custom-76", shadowSelector, " {background-color: #db6d7a;color: white;}\n.slds-icon-custom-custom87", shadowSelector, ",.slds-icon-custom-87", shadowSelector, " {background-color: #d876e5;color: white;}\n.slds-icon-custom-custom98", shadowSelector, ",.slds-icon-custom-98", shadowSelector, " {background-color: #e1be5c;color: white;}\n.slds-icon-custom-custom11", shadowSelector, ",.slds-icon-custom-11", shadowSelector, " {background-color: #8784ea;color: white;}\n.slds-icon-custom-custom22", shadowSelector, ",.slds-icon-custom-22", shadowSelector, " {background-color: #8b85f9;color: white;}\n.slds-icon-custom-custom33", shadowSelector, ",.slds-icon-custom-33", shadowSelector, " {background-color: #97cf5d;color: white;}\n.slds-icon-custom-custom44", shadowSelector, ",.slds-icon-custom-44", shadowSelector, " {background-color: #c8ca58;color: white;}\n.slds-icon-custom-custom55", shadowSelector, ",.slds-icon-custom-55", shadowSelector, " {background-color: #d66ee0;color: white;}\n.slds-icon-custom-custom66", shadowSelector, ",.slds-icon-custom-66", shadowSelector, " {background-color: #d8be5f;color: white;}\n.slds-icon-custom-custom77", shadowSelector, ",.slds-icon-custom-77", shadowSelector, " {background-color: #b55d5b;color: white;}\n.slds-icon-custom-custom88", shadowSelector, ",.slds-icon-custom-88", shadowSelector, " {background-color: #996fe6;color: white;}\n.slds-icon-custom-custom99", shadowSelector, ",.slds-icon-custom-99", shadowSelector, " {background-color: #f0856e;color: white;}\n.slds-icon-custom-custom12", shadowSelector, ",.slds-icon-custom-12", shadowSelector, " {background-color: #dc71d1;color: white;}\n.slds-icon-custom-custom23", shadowSelector, ",.slds-icon-custom-23", shadowSelector, " {background-color: #b070e6;color: white;}\n.slds-icon-custom-custom34", shadowSelector, ",.slds-icon-custom-34", shadowSelector, " {background-color: #d58a6a;color: white;}\n.slds-icon-custom-custom45", shadowSelector, ",.slds-icon-custom-45", shadowSelector, " {background-color: #d95879;color: white;}\n.slds-icon-custom-custom56", shadowSelector, ",.slds-icon-custom-56", shadowSelector, " {background-color: #718deb;color: white;}\n.slds-icon-custom-custom67", shadowSelector, ",.slds-icon-custom-67", shadowSelector, " {background-color: #f87d76;color: white;}\n.slds-icon-custom-custom78", shadowSelector, ",.slds-icon-custom-78", shadowSelector, " {background-color: #5a95dd;color: white;}\n.slds-icon-custom-custom89", shadowSelector, ",.slds-icon-custom-89", shadowSelector, " {background-color: #3e99be;color: white;}\n.slds-icon-custom-custom13", shadowSelector, ",.slds-icon-custom-13", shadowSelector, " {background-color: #df6184;color: white;}\n.slds-icon-custom-custom24", shadowSelector, ",.slds-icon-custom-24", shadowSelector, " {background-color: #e56798;color: white;}\n.slds-icon-custom-custom35", shadowSelector, ",.slds-icon-custom-35", shadowSelector, " {background-color: #e9637e;color: white;}\n.slds-icon-custom-custom46", shadowSelector, ",.slds-icon-custom-46", shadowSelector, " {background-color: #67a5e7;color: white;}\n.slds-icon-custom-custom57", shadowSelector, ",.slds-icon-custom-57", shadowSelector, " {background-color: #5a9cdd;color: white;}\n.slds-icon-custom-custom68", shadowSelector, ",.slds-icon-custom-68", shadowSelector, " {background-color: #f26979;color: white;}\n.slds-icon-custom-custom79", shadowSelector, ",.slds-icon-custom-79", shadowSelector, " {background-color: #8ed363;color: white;}\n.slds-icon-custom-custom14", shadowSelector, ",.slds-icon-custom-14", shadowSelector, " {background-color: #3cc2b3;color: white;}\n.slds-icon-custom-custom25", shadowSelector, ",.slds-icon-custom-25", shadowSelector, " {background-color: #e46fbe;color: white;}\n.slds-icon-custom-custom36", shadowSelector, ",.slds-icon-custom-36", shadowSelector, " {background-color: #d472d4;color: white;}\n.slds-icon-custom-custom47", shadowSelector, ",.slds-icon-custom-47", shadowSelector, " {background-color: #5fcc64;color: white;}\n.slds-icon-custom-custom58", shadowSelector, ",.slds-icon-custom-58", shadowSelector, " {background-color: #34b59d;color: white;}\n.slds-icon-custom-custom69", shadowSelector, ",.slds-icon-custom-69", shadowSelector, " {background-color: #ed6387;color: white;}\n.slds-icon-custom-custom15", shadowSelector, ",.slds-icon-custom-15", shadowSelector, " {background-color: #f77e75;color: white;}\n.slds-icon-custom-custom26", shadowSelector, ",.slds-icon-custom-26", shadowSelector, " {background-color: #7698f0;color: white;}\n.slds-icon-custom-custom37", shadowSelector, ",.slds-icon-custom-37", shadowSelector, " {background-color: #8c89f2;color: white;}\n.slds-icon-custom-custom48", shadowSelector, ",.slds-icon-custom-48", shadowSelector, " {background-color: #ef697f;color: white;}\n.slds-icon-custom-custom59", shadowSelector, ",.slds-icon-custom-59", shadowSelector, " {background-color: #e3d067;color: white;}\n.slds-icon-custom-custom16", shadowSelector, ",.slds-icon-custom-16", shadowSelector, " {background-color: #e9af67;color: white;}\n.slds-icon-custom-custom27", shadowSelector, ",.slds-icon-custom-27", shadowSelector, " {background-color: #5ab0d2;color: white;}\n.slds-icon-custom-custom38", shadowSelector, ",.slds-icon-custom-38", shadowSelector, " {background-color: #53b6d7;color: white;}\n.slds-icon-custom-custom49", shadowSelector, ",.slds-icon-custom-49", shadowSelector, " {background-color: #e25c80;color: white;}\n.slds-icon-custom-custom17", shadowSelector, ",.slds-icon-custom-17", shadowSelector, " {background-color: #acd360;color: white;}\n.slds-icon-custom-custom28", shadowSelector, ",.slds-icon-custom-28", shadowSelector, " {background-color: #89c059;color: white;}\n.slds-icon-custom-custom39", shadowSelector, ",.slds-icon-custom-39", shadowSelector, " {background-color: #4fbe75;color: white;}\n.slds-icon-custom-custom18", shadowSelector, ",.slds-icon-custom-18", shadowSelector, " {background-color: #4dca76;color: white;}\n.slds-icon-custom-custom29", shadowSelector, ",.slds-icon-custom-29", shadowSelector, " {background-color: #bdd25f;color: white;}\n.slds-icon-custom-custom19", shadowSelector, ",.slds-icon-custom-19", shadowSelector, " {background-color: #3abeb1;color: white;}\n.slds-icon-standard-task-2", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-standard-contact", shadowSelector, " {background-color: #a094ed;}\n.slds-icon-standard-multi-select-checkbox", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-work-order", shadowSelector, " {background-color: #50e3c2;}\n.slds-icon-standard-post", shadowSelector, " {background-color: #65cae4;}\n.slds-icon-standard-global-constant", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-carousel", shadowSelector, " {background-color: #6bbd6e;}\n.slds-icon-standard-work-contract", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-resource-skill", shadowSelector, " {background-color: #45c173;}\n.slds-icon-standard-system-and-global-variable", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-segments", shadowSelector, " {background-color: #f28b00;}\n.slds-icon-standard-goals", shadowSelector, " {background-color: #56aadf;}\n.slds-icon-standard-case-wrap-up", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-investment-account", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-standard-store", shadowSelector, " {background-color: #04844b;}\n.slds-icon-standard-output", shadowSelector, " {background-color: #439cba;}\n.slds-icon-standard-store-group", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-all", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-picklist-choice", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-choice", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-app", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-standard-default", shadowSelector, " {background-color: #8199af;}\n.slds-icon-standard-case-milestone", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-today", shadowSelector, " {background-color: #ef7ead;}\n.slds-icon-standard-buyer-account", shadowSelector, " {background-color: #04844b;}\n.slds-icon-standard-lead-list", shadowSelector, " {background-color: #f88962;}\n.slds-icon-standard-work-plan-template", shadowSelector, " {background-color: #449488;}\n.slds-icon-standard-shift", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-product-item-transaction", shadowSelector, " {background-color: #f88962;}\n.slds-icon-standard-apex", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-reply-text", shadowSelector, " {background-color: #f88965;}\n.slds-icon-standard-answer-private", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-asset-downtime-period", shadowSelector, " {background-color: #317a92;}\n.slds-icon-standard-opportunity-contact-role", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-retail-banking-console", shadowSelector, " {background-color: #00afa0;}\n.slds-icon-standard-channel-program-members", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-apps-admin", shadowSelector, " {background-color: #9895ee;}\n.slds-icon-standard-datadotcom", shadowSelector, " {background-color: #1589ee;}\n.slds-icon-standard-settings", shadowSelector, " {background-color: #04844b;}\n.slds-icon-standard-product-item", shadowSelector, " {background-color: #769ed9;}\n.slds-icon-standard-metrics", shadowSelector, " {background-color: #56aadf;}\n.slds-icon-standard-topic2", shadowSelector, " {background-color: #56aad0;}\n.slds-icon-standard-partner-fund-allocation", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-approval", shadowSelector, " {background-color: #50cc7a;}\n.slds-icon-standard-work-queue", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-iot-orchestrations", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-visualforce-page", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-standard-person-account", shadowSelector, " {background-color: #7f8de1;}\n.slds-icon-standard-entity", shadowSelector, " {background-color: #f88962;}\n.slds-icon-standard-service-territory-location", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-entitlement-policy", shadowSelector, " {background-color: #04844b;}\n.slds-icon-standard-order-item", shadowSelector, " {background-color: #769ed3;}\n.slds-icon-standard-read-receipts", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-standard-javascript-button", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-standard-maintenance-asset", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-work-plan-rule", shadowSelector, " {background-color: #449488;}\n.slds-icon-standard-loop", shadowSelector, " {background-color: #ff9a3c;}\n.slds-icon-standard-portal-roles-and-subordinates", shadowSelector, " {background-color: #7a9ae6;}\n.slds-icon-standard-work-capacity-limit", shadowSelector, " {background-color: #0079bc;}\n.slds-icon-standard-employee-organization", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-constant", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-marketing-actions", shadowSelector, " {background-color: #6bbd6e;}\n.slds-icon-standard-case-transcript", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-timesheet-entry", shadowSelector, " {background-color: #7dc37d;}\n.slds-icon-standard-multi-picklist", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-visit-templates", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-task", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-standard-answer-best", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-asset-action", shadowSelector, " {background-color: #317a92;}\n.slds-icon-standard-orders", shadowSelector, " {background-color: #769ed9;}\n.slds-icon-standard-past-chat", shadowSelector, " {background-color: #f88960;}\n.slds-icon-standard-feedback", shadowSelector, " {background-color: #6da1ea;}\n.slds-icon-standard-action-list-component", shadowSelector, " {background-color: #5876a3;}\n.slds-icon-standard-opportunity-splits", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-standard-messaging-user", shadowSelector, " {background-color: #34becd;}\n.slds-icon-standard-trailhead", shadowSelector, " {background-color: #032e61;}\n.slds-icon-standard-entitlements", shadowSelector, " {background-color: #b781d3;}\n.slds-icon-standard-formula", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-case-log-a-call", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-thanks-loading", shadowSelector, " {background-color: #b8c3ce;}\n.slds-icon-standard-job-family", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-service-appointment-capacity-usage", shadowSelector, " {background-color: #0079bc;}\n.slds-icon-standard-channel-program-levels", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-letterhead", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-email-chatter", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-announcement", shadowSelector, " {background-color: #62b7ed;}\n.slds-icon-standard-bot", shadowSelector, " {background-color: #54698f;}\n.slds-icon-standard-macros", shadowSelector, " {background-color: #47cfd2;}\n.slds-icon-standard-dashboard-ea", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-job-profile", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-steps", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-asset-relationship", shadowSelector, " {background-color: #fa975c;}\n.slds-icon-standard-high-velocity-sales", shadowSelector, " {background-color: #47cfc9;}\n.slds-icon-standard-brand", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-visits", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-einstein-replies", shadowSelector, " {background-color: #f88965;}\n.slds-icon-standard-coaching", shadowSelector, " {background-color: #f67594;}\n.slds-icon-standard-record-lookup", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-lightning-component", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-search", shadowSelector, " {background-color: #62b7ed;}\n.slds-icon-standard-connected-apps", shadowSelector, " {background-color: #9895ee;}\n.slds-icon-standard-work-type-group", shadowSelector, " {background-color: #0079bc;}\n.slds-icon-standard-education", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-work-type", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-environment-hub", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-cms", shadowSelector, " {background-color: #88c651;}\n.slds-icon-standard-call-coaching", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-salesforce-cms", shadowSelector, " {background-color: #00a1df;}\n.slds-icon-standard-thanks", shadowSelector, " {background-color: #e9696e;}\n.slds-icon-standard-service-territory-member", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-user-role", shadowSelector, " {background-color: #8fc96e;}\n.slds-icon-standard-work-capacity-usage", shadowSelector, " {background-color: #0079bc;}\n.slds-icon-standard-record-create", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-campaign-members", shadowSelector, " {background-color: #f49756;}\n.slds-icon-standard-retail-banking", shadowSelector, " {background-color: #00d2be;}\n.slds-icon-standard-portal-roles", shadowSelector, " {background-color: #fb8950;}\n.slds-icon-standard-calibration", shadowSelector, " {background-color: #47cfd2;}\n.slds-icon-standard-answer-public", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-display-text", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-unmatched", shadowSelector, " {background-color: #62b7ed;}\n.slds-icon-standard-partners", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-email-iq", shadowSelector, " {background-color: #a094ed;}\n.slds-icon-standard-service-crew", shadowSelector, " {background-color: #fa975c;}\n.slds-icon-standard-voice-call", shadowSelector, " {background-color: #30c85a;}\n.slds-icon-standard-cancel-checkout", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-resource-capacity", shadowSelector, " {background-color: #45c173;}\n.slds-icon-standard-channel-programs", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-quip", shadowSelector, " {background-color: #d3451d;}\n.slds-icon-standard-quip-sheet", shadowSelector, " {background-color: #30c85a;}\n.slds-icon-standard-timeslot", shadowSelector, " {background-color: #fab24c;}\n.slds-icon-standard-live-chat", shadowSelector, " {background-color: #f88960;}\n.slds-icon-standard-job-position", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-sobject-collection", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-user", shadowSelector, " {background-color: #34becd;}\n.slds-icon-standard-client", shadowSelector, " {background-color: #00d2be;}\n.slds-icon-standard-scheduling-constraints", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-screen", shadowSelector, " {background-color: #1589ee;}\n.slds-icon-standard-portal", shadowSelector, " {background-color: #aec770;}\n.slds-icon-standard-partner-fund-request", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-resource-preference", shadowSelector, " {background-color: #45c173;}\n.slds-icon-standard-first-non-empty", shadowSelector, " {background-color: #e9696e;}\n.slds-icon-standard-customer-360", shadowSelector, " {background-color: #032e61;}\n.slds-icon-standard-employee-job", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-resource-absence", shadowSelector, " {background-color: #45c173;}\n.slds-icon-standard-text-template", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-entitlement-template", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-lightning-usage", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-entitlement", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-empty", shadowSelector, " {background-color: #8199af;}\n.slds-icon-standard-text", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-delegated-account", shadowSelector, " {background-color: #04844b;}\n.slds-icon-standard-fulfillment-order", shadowSelector, " {background-color: #b9ac91;}\n.slds-icon-standard-case-email", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-account", shadowSelector, " {background-color: #7f8de1;}\n.slds-icon-standard-assignment", shadowSelector, " {background-color: #ff9a3c;}\n.slds-icon-standard-wealth-management-console", shadowSelector, " {background-color: #00afa0;}\n.slds-icon-standard-task2", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-standard-code-playground", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-social", shadowSelector, " {background-color: #ea74a2;}\n.slds-icon-standard-endorsement", shadowSelector, " {background-color: #8b9ae3;}\n.slds-icon-standard-folder", shadowSelector, " {background-color: #8b9ae3;}\n.slds-icon-standard-service-crew-member", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-flow", shadowSelector, " {background-color: #0079bc;}\n.slds-icon-standard-expense-report-entry", shadowSelector, " {background-color: #3a3180;}\n.slds-icon-standard-employee", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-omni-supervisor", shadowSelector, " {background-color: #8a76f0;}\n.slds-icon-standard-asset-object", shadowSelector, " {background-color: #317a92;}\n.slds-icon-standard-product", shadowSelector, " {background-color: #b781d3;}\n.slds-icon-standard-topic", shadowSelector, " {background-color: #56aadf;}\n.slds-icon-standard-product-required", shadowSelector, " {background-color: #ef6e64;}\n.slds-icon-standard-dynamic-record-choice", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-process", shadowSelector, " {background-color: #0079bc;}\n.slds-icon-standard-people", shadowSelector, " {background-color: #34becd;}\n.slds-icon-standard-reward", shadowSelector, " {background-color: #e9696e;}\n.slds-icon-standard-employee-contact", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-performance", shadowSelector, " {background-color: #f8b156;}\n.slds-icon-standard-case-comment", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-sales-channel", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-apex-plugin", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-campaign", shadowSelector, " {background-color: #f49756;}\n.slds-icon-standard-contact-request", shadowSelector, " {background-color: #fb8954;}\n.slds-icon-standard-business-hours", shadowSelector, " {background-color: #7dc37d;}\n.slds-icon-standard-evernote", shadowSelector, " {background-color: #86c86f;}\n.slds-icon-standard-service-territory", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-customer-lifecycle-analytics", shadowSelector, " {background-color: #9274df;}\n.slds-icon-standard-case", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-currency", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-record", shadowSelector, " {background-color: #7dc37d;}\n.slds-icon-standard-queue", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-schedule-objective", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-contract-line-item", shadowSelector, " {background-color: #6ec06e;}\n.slds-icon-standard-skill-entity", shadowSelector, " {background-color: #8b9ae3;}\n.slds-icon-standard-skill", shadowSelector, " {background-color: #fa975c;}\n.slds-icon-standard-operating-hours", shadowSelector, " {background-color: #6b9ee2;}\n.slds-icon-standard-custom", shadowSelector, " {background-color: #8199af;}\n.slds-icon-standard-related-list", shadowSelector, " {background-color: #59bcab;}\n.slds-icon-standard-bot-training", shadowSelector, " {background-color: #5876a3;}\n.slds-icon-standard-case-change-status", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-insurance-console", shadowSelector, " {background-color: #00afa0;}\n.slds-icon-standard-contract", shadowSelector, " {background-color: #6ec06e;}\n.slds-icon-standard-sobject", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-sales-cadence-target", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-photo", shadowSelector, " {background-color: #d7d1d1;}\n.slds-icon-standard-apps", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-timesheet", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-drafts", shadowSelector, " {background-color: #6ca1e9;}\n.slds-icon-standard-outcome", shadowSelector, " {background-color: #ff9a3c;}\n.slds-icon-standard-work-order-item", shadowSelector, " {background-color: #33a8dc;}\n.slds-icon-standard-pricebook", shadowSelector, " {background-color: #b781d3;}\n.slds-icon-standard-scan-card", shadowSelector, " {background-color: #f39e58;}\n.slds-icon-standard-note", shadowSelector, " {background-color: #e6d478;}\n.slds-icon-standard-buyer-group", shadowSelector, " {background-color: #04844b;}\n.slds-icon-standard-opportunity", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-standard-news", shadowSelector, " {background-color: #7f8de1;}\n.slds-icon-standard-display-rich-text", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-strategy", shadowSelector, " {background-color: #4bc071;}\n.slds-icon-standard-call-history", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-webcart", shadowSelector, " {background-color: #04844b;}\n.slds-icon-standard-report", shadowSelector, " {background-color: #2ecbbe;}\n.slds-icon-standard-groups", shadowSelector, " {background-color: #779ef2;}\n.slds-icon-standard-data-model", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-dashboard", shadowSelector, " {background-color: #ef6e64;}\n.slds-icon-standard-generic-loading", shadowSelector, " {background-color: #b8c3ce;}\n.slds-icon-standard-number-input", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-address", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-standard-entity-milestone", shadowSelector, " {background-color: #f49756;}\n.slds-icon-standard-wealth-management", shadowSelector, " {background-color: #00d2be;}\n.slds-icon-standard-customers", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-story", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-service-appointment", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-maintenance-plan", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-data-integration-hub", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-work-plan-template-entry", shadowSelector, " {background-color: #449488;}\n.slds-icon-standard-hierarchy", shadowSelector, " {background-color: #34becd;}\n.slds-icon-standard-partner-marketing-budget", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-asset-action-source", shadowSelector, " {background-color: #317a92;}\n.slds-icon-standard-skill-requirement", shadowSelector, " {background-color: #fa975c;}\n.slds-icon-standard-location", shadowSelector, " {background-color: #4bc076;}\n.slds-icon-standard-radio-button", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-avatar-loading", shadowSelector, " {background-color: #b8c3ce;}\n.slds-icon-standard-article", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-invocable-action", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-proposition", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-snippets", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-customer-portal-users", shadowSelector, " {background-color: #3c97db;}\n.slds-icon-standard-actions-and-buttons", shadowSelector, " {background-color: #fcb95b;}\n.slds-icon-standard-record-update", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-shift-type", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-log-a-call", shadowSelector, " {background-color: #48c3cc;}\n.slds-icon-standard-quotes", shadowSelector, " {background-color: #88c651;}\n.slds-icon-standard-question-feed", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-kanban", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-work-plan", shadowSelector, " {background-color: #449488;}\n.slds-icon-standard-shift-template", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-merge", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-expense", shadowSelector, " {background-color: #3a3180;}\n.slds-icon-standard-dataset", shadowSelector, " {background-color: #b070e6;}\n.slds-icon-standard-product-consumed", shadowSelector, " {background-color: #55bc9c;}\n.slds-icon-standard-canvas", shadowSelector, " {background-color: #8199af;}\n.slds-icon-standard-forecasts", shadowSelector, " {background-color: #6bbd6e;}\n.slds-icon-standard-relationship", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-service-resource", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-filter", shadowSelector, " {background-color: #1539ee;}\n.slds-icon-standard-sales-path", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-events", shadowSelector, " {background-color: #3c97db;}\n.slds-icon-standard-sms", shadowSelector, " {background-color: #88c651;}\n.slds-icon-standard-rtc-presence", shadowSelector, " {background-color: #47cfd2;}\n.slds-icon-standard-avatar", shadowSelector, " {background-color: #62b7ed;}\n.slds-icon-standard-record-delete", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-solution", shadowSelector, " {background-color: #8fc972;}\n.slds-icon-standard-partner-fund-claim", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-individual", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-custom-notification", shadowSelector, " {background-color: #6bb7e4;}\n.slds-icon-standard-date-input", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-catalog", shadowSelector, " {background-color: #027e46;}\n.slds-icon-standard-template", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-shipment", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-event", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-insurance", shadowSelector, " {background-color: #00d2be;}\n.slds-icon-standard-live-chat-visitor", shadowSelector, " {background-color: #f68960;}\n.slds-icon-standard-textarea", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-work-step", shadowSelector, " {background-color: #449488;}\n.slds-icon-standard-picklist-type", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-survey", shadowSelector, " {background-color: #319fd6;}\n.slds-icon-standard-link", shadowSelector, " {background-color: #7a9ae6;}\n.slds-icon-standard-messaging-session", shadowSelector, " {background-color: #34becd;}\n.slds-icon-standard-list-email", shadowSelector, " {background-color: #8baeb5;}\n.slds-icon-standard-recycle-bin", shadowSelector, " {background-color: #1589e4;}\n.slds-icon-standard-document", shadowSelector, " {background-color: #baac93;}\n.slds-icon-standard-product-transfer", shadowSelector, " {background-color: #f88962;}\n.slds-icon-standard-instore-locations", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-recent", shadowSelector, " {background-color: #6ca1e9;}\n.slds-icon-standard-shift-preferences", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-password", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-expense-report", shadowSelector, " {background-color: #3a3180;}\n.slds-icon-standard-branch-merge", shadowSelector, " {background-color: #e9696e;}\n.slds-icon-standard-insights", shadowSelector, " {background-color: #ec94ed;}\n.slds-icon-standard-dropbox", shadowSelector, " {background-color: #52aef9;}\n.slds-icon-standard-employee-job-position", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-file", shadowSelector, " {background-color: #baac93;}\n.slds-icon-standard-currency-input", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-variable", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-team-member", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-agent-session", shadowSelector, " {background-color: #f88960;}\n.slds-icon-standard-group-loading", shadowSelector, " {background-color: #b8c3ce;}\n.slds-icon-standard-lead", shadowSelector, " {background-color: #f88962;}\n.slds-icon-standard-email", shadowSelector, " {background-color: #95aec5;}\n.slds-icon-standard-service-contract", shadowSelector, " {background-color: #8a76f0;}\n.slds-icon-standard-decision", shadowSelector, " {background-color: #ff9a3c;}\n.slds-icon-standard-snippet", shadowSelector, " {background-color: #a094ed;}\n.slds-icon-standard-entitlement-process", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-contact-list", shadowSelector, " {background-color: #a094ed;}\n.slds-icon-standard-planogram", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-activations", shadowSelector, " {background-color: #b070e6;}\n.slds-icon-standard-scheduling-policy", shadowSelector, " {background-color: #eb7092;}\n.slds-icon-standard-channel-program-history", shadowSelector, " {background-color: #0eb58a;}\n.slds-icon-standard-question-best", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-collection-variable", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-sales-value", shadowSelector, " {background-color: #3c97dd;}\n.slds-icon-standard-knowledge", shadowSelector, " {background-color: #ec94ed;}\n.slds-icon-standard-date-time", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-category", shadowSelector, " {background-color: #027e46;}\n.slds-icon-standard-data-streams", shadowSelector, " {background-color: #ef6e64;}\n.slds-icon-standard-textbox", shadowSelector, " {background-color: #969492;}\n.slds-icon-standard-lead-insights", shadowSelector, " {background-color: #22b0e6;}\n.slds-icon-standard-waits", shadowSelector, " {background-color: #ff9a3c;}\n.slds-icon-standard-concur", shadowSelector, " {background-color: #4cc3c7;}\n.slds-icon-standard-feed", shadowSelector, " {background-color: #62b7ed;}\n.slds-icon-standard-sort", shadowSelector, " {background-color: #1539ee;}\n.slds-icon-standard-messaging-conversation", shadowSelector, " {background-color: #34becd;}\n.slds-icon-standard-service-report", shadowSelector, " {background-color: #7e8be4;}\n.slds-icon-standard-iot-context", shadowSelector, " {background-color: #2a739e;}\n.slds-icon-standard-asset-state-period", shadowSelector, " {background-color: #317a92;}\n.slds-icon-standard-call", shadowSelector, " {background-color: #f2cf5b;}\n.slds-icon-standard-stage", shadowSelector, " {background-color: #ff9a3c;}\n.slds-icon-standard-sales-cadence", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-product-request-line-item", shadowSelector, " {background-color: #88c651;}\n.slds-icon-standard-return-order-line-item", shadowSelector, " {background-color: #009688;}\n.slds-icon-standard-chart", shadowSelector, " {background-color: #1fcaa0;}\n.slds-icon-standard-quick-text", shadowSelector, " {background-color: #62b7e5;}\n.slds-icon-standard-home", shadowSelector, " {background-color: #ef7ead;}\n.slds-icon-standard-sossession", shadowSelector, " {background-color: #54698d;}\n.slds-icon-standard-employee-asset", shadowSelector, " {background-color: #00a1e0;}\n.slds-icon-standard-stage-collection", shadowSelector, " {background-color: #ff9a3c;}\n.slds-icon-standard-product-request", shadowSelector, " {background-color: #88c651;}\n.slds-icon-standard-logging", shadowSelector, " {background-color: #00a1df;}\n.slds-icon-standard-assigned-resource", shadowSelector, " {background-color: #45c173;}\n.slds-icon-standard-return-order", shadowSelector, " {background-color: #009688;}\n.slds-icon-standard-poll", shadowSelector, " {background-color: #699be1;}\n.slds-icon-standard-household", shadowSelector, " {background-color: #00afa0;}\n.slds-icon-standard-work-step-template", shadowSelector, " {background-color: #449488;}\n.slds-icon", shadowSelector, " {width: 2rem;height: 2rem;fill: white;}\n[class*=\"slds-icon-standard-\"]", shadowSelector, " .slds-icon", shadowSelector, ",[class*=\"slds-icon-standard-\"].slds-icon", shadowSelector, ",[class*=\"slds-icon-action-\"]", shadowSelector, " .slds-icon", shadowSelector, ",[class*=\"slds-icon-action-\"].slds-icon", shadowSelector, ",[class*=\"slds-icon-custom-\"]", shadowSelector, " .slds-icon", shadowSelector, ",[class*=\"slds-icon-custom-\"].slds-icon", shadowSelector, " {border-radius: 0.25rem;}\n.slds-icon_xx-small", shadowSelector, " {width: 0.875rem;height: 0.875rem;line-height: 1;}\n.slds-icon_x-small", shadowSelector, " {width: 1rem;height: 1rem;line-height: 1;}\n.slds-icon_small", shadowSelector, " {width: 1.5rem;height: 1.5rem;line-height: 1;}\n.slds-icon_large", shadowSelector, " {width: 3rem;height: 3rem;}\n.slds-icon-text-default", shadowSelector, " {fill: #706e6b;}\n.slds-icon-text-warning", shadowSelector, " {fill: #ffb75d;}\n.slds-icon-text-success", shadowSelector, " {fill: #027e46;}\n.slds-icon-text-error", shadowSelector, " {fill: #c23934;}\n.slds-icon-text-light", shadowSelector, " {fill: #b0adab;}\n.slds-current-color", shadowSelector, " .slds-icon", shadowSelector, " {fill: currentColor;}\n.slds-icon_disabled", shadowSelector, " {background-color: currentColor;}\n"].join('');
}
var stylesheet26 = [stylesheet$q];

function stylesheet$r(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-input", shadowSelector, " {background-color: white;border: 1px solid #dddbda;border-radius: 0.25rem;width: 100%;-webkit-transition: border 0.1s linear, background-color 0.1s linear;transition: border 0.1s linear, background-color 0.1s linear;display: inline-block;padding: 0 1rem 0 0.75rem;line-height: 1.875rem;min-height: calc(1.875rem + (1px * 2));}\n.slds-input:required", shadowSelector, " {-webkit-box-shadow: none;box-shadow: none;}\n.slds-input:focus", shadowSelector, ",.slds-input:active", shadowSelector, " {outline: 0;border-color: #1589ee;background-color: white;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-input[disabled]", shadowSelector, ",.slds-input.slds-is-disabled", shadowSelector, " {background-color: #ecebea;border-color: #c9c7c5;cursor: not-allowed;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}\n.slds-input[disabled]:focus", shadowSelector, ",.slds-input[disabled]:active", shadowSelector, ",.slds-input.slds-is-disabled:focus", shadowSelector, ",.slds-input.slds-is-disabled:active", shadowSelector, " {-webkit-box-shadow: none;box-shadow: none;}\n.slds-input[readonly]", shadowSelector, " {padding-left: 0;border-color: transparent;background-color: transparent;font-size: 0.875rem;font-weight: 400;}\n.slds-input[type=\"search\"]", shadowSelector, "::-ms-clear {display: none;width: 0;height: 0;}\n.slds-input[type=\"url\"]", shadowSelector, ",.slds-input[type=\"tel\"]", shadowSelector, ",.slds-input[type=\"email\"]", shadowSelector, " {direction: ltr;text-align: left;}\n.slds-input_bare", shadowSelector, " {background-color: transparent;border: 0;padding-top: 0;padding-bottom: 0;padding-left: 0.75rem;color: #080707;line-height: 1.875rem;}\n.slds-input_bare:focus", shadowSelector, ",.slds-input_bare:active", shadowSelector, " {outline: 0;-webkit-box-shadow: none;box-shadow: none;}\n.slds-input_height", shadowSelector, " {min-height: calc(1.875rem + (1px * 2));}\n.slds-input_borders", shadowSelector, " {padding-left: 0.75rem;border-color: #dddbda;}\n.slds-input-has-icon", shadowSelector, " {position: relative;}\n.slds-input-has-icon", shadowSelector, " .slds-input__icon", shadowSelector, " {width: 0.875rem;height: 0.875rem;position: absolute;top: 50%;margin-top: -0.4375rem;line-height: 1;border: 0;z-index: 2;fill: #b0adab;}\n.slds-input-has-icon", shadowSelector, " .slds-input__icon:not(button)", shadowSelector, " {pointer-events: none;}\n.slds-input-has-icon_left", shadowSelector, " .slds-input__icon", shadowSelector, " {left: 0.75rem;}\n.slds-input-has-icon_left", shadowSelector, " .slds-input", shadowSelector, ",.slds-input-has-icon_left", shadowSelector, " .slds-input_bare", shadowSelector, " {padding-left: 2rem;}\n.slds-input-has-icon_right", shadowSelector, " .slds-input__icon", shadowSelector, " {right: 0.75rem;}\n.slds-input-has-icon_right", shadowSelector, " .slds-input", shadowSelector, ",.slds-input-has-icon_right", shadowSelector, " .slds-input_bare", shadowSelector, " {padding-right: 2rem;}\n.slds-input-has-icon_left-right", shadowSelector, " {}\n.slds-input-has-icon_left-right", shadowSelector, " .slds-input__icon_left", shadowSelector, " {left: 0.75rem;}\n.slds-input-has-icon_left-right", shadowSelector, " .slds-input__icon_right", shadowSelector, " {right: 0.75rem;}\n.slds-input-has-icon_left-right", shadowSelector, " .slds-input", shadowSelector, ",.slds-input-has-icon_left-right", shadowSelector, " .slds-input_bare", shadowSelector, " {padding: 0 2rem;}\n.slds-input-has-icon_group-right", shadowSelector, " .slds-input", shadowSelector, ",.slds-input-has-icon_group-right", shadowSelector, " .slds-input_bare", shadowSelector, " {padding-right: 3.5rem;}\n.slds-input__icon-group", shadowSelector, " {position: absolute;height: 1rem;margin-top: -0.5rem;}\n.slds-input__icon-group_right", shadowSelector, " {right: 0;top: 50%;}\n.slds-input__icon-group_right", shadowSelector, " .slds-input__icon_right", shadowSelector, " {right: 0.5rem;}\n.slds-input__icon-group_right", shadowSelector, " .slds-input__spinner", shadowSelector, " {right: 1.5rem;left: auto;}\n.slds-input-has-fixed-addon", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;}\n.slds-input:required:focus", shadowSelector, " {-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-has-error", shadowSelector, " .slds-input", shadowSelector, " {background-color: white;border-color: #c23934;-webkit-box-shadow: #c23934 0 0 0 1px inset;box-shadow: #c23934 0 0 0 1px inset;background-clip: padding-box;}\n.slds-has-error", shadowSelector, " .slds-input:focus", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-input:active", shadowSelector, " {-webkit-box-shadow: #c23934 0 0 0 1px inset, 0 0 3px #0070d2;box-shadow: #c23934 0 0 0 1px inset, 0 0 3px #0070d2;}\n.slds-has-error", shadowSelector, " .slds-input__icon", shadowSelector, " {fill: #c23934;color: #c23934;}\n"].join('');
}
var stylesheet27 = [stylesheet$r];

function stylesheet$s(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-map_container", shadowSelector, " {-webkit-box-flex: 3;-ms-flex: 3 1 auto;flex: 3 1 auto;}\n.slds-map", shadowSelector, " {position: relative;min-width: 23.75rem;width: 100%;max-height: 100%;}\n.slds-map", shadowSelector, ":before {content: \"\";display: block;height: 0;width: 100%;padding-top: 56.25%;}\n.slds-map", shadowSelector, " iframe", shadowSelector, " {position: absolute;top: 0;left: 0;right: 0;height: 100%;width: 100%;border: 0;}\n.slds-has-coordinates", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;overflow: auto;max-height: 41.25rem;background: white;}\n.slds-has-coordinates", shadowSelector, " .slds-map", shadowSelector, ":before {padding-top: 75%;}\n.slds-coordinates", shadowSelector, " {overflow: auto;-webkit-box-flex: 1;-ms-flex: 1 1 auto;flex: 1 1 auto;}\n.slds-coordinates__header", shadowSelector, " {padding: 1rem;}\n.slds-coordinates__title", shadowSelector, " {font-size: 1rem;font-weight: 700;}\n.slds-coordinates__item-action", shadowSelector, " {padding: 0.5rem 1rem;width: 100%;}\n.slds-coordinates__item-action", shadowSelector, " .slds-text-link", shadowSelector, " {display: block;}\n.slds-coordinates__item-action:hover", shadowSelector, ",.slds-coordinates__item-action:focus", shadowSelector, " {background-color: #f3f2f2;outline: 0;}\n.slds-coordinates__item-action:hover", shadowSelector, " .slds-text-link", shadowSelector, ",.slds-coordinates__item-action:focus", shadowSelector, " .slds-text-link", shadowSelector, " {text-decoration: underline;}\n.slds-coordinates__item-action:active", shadowSelector, " {background-color: #ecebea;}\n.slds-coordinates__item-action[aria-pressed=\"true\"]", shadowSelector, " {background-color: #ecebea;}\n.slds-coordinates__item-action[aria-pressed=\"true\"]", shadowSelector, " .slds-text-link", shadowSelector, " {color: #00396b;}\n"].join('');
}
var stylesheet28 = [stylesheet$s];

function stylesheet$t(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-dropdown-trigger", shadowSelector, " {position: relative;display: inline-block;}\n.slds-dropdown-trigger", shadowSelector, " .slds-dropdown", shadowSelector, " {top: 100%;}\n.slds-dropdown-trigger", shadowSelector, " .slds-dropdown_bottom", shadowSelector, " {top: auto;}\n.slds-dropdown-trigger_hover", shadowSelector, " .slds-dropdown", shadowSelector, " {visibility: hidden;opacity: 0;-webkit-transition: opacity 0.1s linear, visibility 0.1s linear;transition: opacity 0.1s linear, visibility 0.1s linear;}\n.slds-dropdown-trigger_hover:hover", shadowSelector, ",.slds-dropdown-trigger_hover:focus", shadowSelector, " {outline: 0;}\n.slds-dropdown-trigger_hover:hover", shadowSelector, " .slds-dropdown", shadowSelector, ",.slds-dropdown-trigger_hover:focus", shadowSelector, " .slds-dropdown", shadowSelector, " {visibility: visible;opacity: 1;-webkit-transition: opacity 0.1s linear, visibility 0.1s linear;transition: opacity 0.1s linear, visibility 0.1s linear;}\n.slds-dropdown-trigger_click", shadowSelector, " {}\n.slds-dropdown-trigger_click", shadowSelector, " .slds-dropdown", shadowSelector, ",.slds-dropdown-trigger_click:hover", shadowSelector, " .slds-dropdown", shadowSelector, " {display: none;}\n.slds-dropdown-trigger_click.slds-is-open", shadowSelector, " .slds-dropdown", shadowSelector, " {display: block;visibility: visible;opacity: 1;}\n.slds-dropdown-trigger", shadowSelector, " > [class*=\"slds-button_icon\"]", shadowSelector, " ~ .slds-dropdown_left[class*=\"slds-nubbin\"]", shadowSelector, ",.slds-dropdown-trigger", shadowSelector, " > [class*=\"slds-button--icon\"]", shadowSelector, " ~ .slds-dropdown--left[class*=\"slds-nubbin\"]", shadowSelector, " {left: -0.5rem;}\n.slds-dropdown-trigger", shadowSelector, " > [class*=\"slds-button_icon\"]", shadowSelector, " ~ .slds-dropdown_right[class*=\"slds-nubbin\"]", shadowSelector, ",.slds-dropdown-trigger", shadowSelector, " > [class*=\"slds-button--icon\"]", shadowSelector, " ~ .slds-dropdown--right[class*=\"slds-nubbin\"]", shadowSelector, " {right: -0.5rem;}\n.slds-dropdown", shadowSelector, " {position: absolute;z-index: 7000;left: 50%;float: left;min-width: 6rem;max-width: 20rem;margin-top: 0.125rem;margin-bottom: 0.125rem;border: 1px solid #dddbda;border-radius: 0.25rem;padding: 0.25rem 0;font-size: 0.75rem;background: white;-webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);-webkit-transform: translateX(-50%);transform: translateX(-50%);}\n.slds-dropdown_left", shadowSelector, " {left: 0;right: auto;-webkit-transform: translateX(0);transform: translateX(0);}\n.slds-dropdown_right", shadowSelector, " {left: auto;right: 0;-webkit-transform: translateX(0);transform: translateX(0);}\n.slds-dropdown_bottom", shadowSelector, " {bottom: 100%;}\n.slds-dropdown_xx-small", shadowSelector, " {min-width: 6rem;}\n.slds-dropdown_x-small", shadowSelector, " {min-width: 12rem;}\n.slds-dropdown_small", shadowSelector, " {min-width: 15rem;}\n.slds-dropdown_medium", shadowSelector, " {min-width: 20rem;}\n.slds-dropdown_large", shadowSelector, " {min-width: 25rem;max-width: 512px;}\n.slds-dropdown_fluid", shadowSelector, " {min-width: 12rem;max-width: 100%;width: 100%;}\n.slds-dropdown_length-5", shadowSelector, " {-webkit-overflow-scrolling: touch;max-height: calc(((1rem * 1.5) + 1rem) * 5);overflow-y: auto;}\n.slds-dropdown_length-7", shadowSelector, " {-webkit-overflow-scrolling: touch;max-height: calc(((1rem * 1.5) + 1rem) * 7);overflow-y: auto;}\n.slds-dropdown_length-10", shadowSelector, " {-webkit-overflow-scrolling: touch;max-height: calc(((1rem * 1.5) + 1rem) * 10);overflow-y: auto;}\n.slds-dropdown_length-with-icon-5", shadowSelector, " {-webkit-overflow-scrolling: touch;max-height: calc((1.5rem + 1rem) * 5);overflow-y: auto;}\n.slds-dropdown_length-with-icon-7", shadowSelector, " {-webkit-overflow-scrolling: touch;max-height: calc((1.5rem + 1rem) * 7);overflow-y: auto;}\n.slds-dropdown_length-with-icon-10", shadowSelector, " {-webkit-overflow-scrolling: touch;max-height: calc((1.5rem + 1rem) * 10);overflow-y: auto;}\n.slds-dropdown_inverse", shadowSelector, " {background: #061c3f;border-color: #061c3f;}\n.slds-dropdown_inverse", shadowSelector, " .slds-dropdown__item", shadowSelector, " > a", shadowSelector, " {color: white;}\n.slds-dropdown_inverse", shadowSelector, " .slds-dropdown__item", shadowSelector, " > a:hover", shadowSelector, ",.slds-dropdown_inverse", shadowSelector, " .slds-dropdown__item", shadowSelector, " > a:focus", shadowSelector, " {color: rgba(255, 255, 255, 0.75);background-color: transparent;}\n.slds-dropdown_inverse", shadowSelector, " .slds-dropdown__item", shadowSelector, " > a:active", shadowSelector, " {color: rgba(255, 255, 255, 0.5);background-color: transparent;}\n.slds-dropdown_inverse", shadowSelector, " .slds-dropdown__item", shadowSelector, " > a[aria-disabled=\"true\"]", shadowSelector, " > a[aria-disabled=\"true\"]", shadowSelector, " {color: rgba(255, 255, 255, 0.15);cursor: default;}\n.slds-dropdown_inverse", shadowSelector, " .slds-dropdown__item", shadowSelector, " > a[aria-disabled=\"true\"]:hover", shadowSelector, " {background-color: transparent;}\n.slds-dropdown", shadowSelector, " mark", shadowSelector, " {font-weight: 700;background-color: transparent;color: inherit;}\n.slds-dropdown[class*=\"slds-nubbin_top\"]", shadowSelector, ",.slds-dropdown[class*=\"slds-nubbin--top\"]", shadowSelector, " {margin-top: 0.5rem;}\n.slds-dropdown[class*=\"slds-nubbin_bottom\"]", shadowSelector, ",.slds-dropdown[class*=\"slds-nubbin--bottom\"]", shadowSelector, " {margin-bottom: 0.5rem;}\n.slds-dropdown__header", shadowSelector, " {font-size: 0.875rem;font-weight: 700;padding: 0.5rem 0.75rem;}\n.slds-dropdown__item", shadowSelector, " {line-height: 1.5;font-weight: 400;}\n.slds-dropdown__item", shadowSelector, " > a", shadowSelector, " {position: relative;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: justify;-ms-flex-pack: justify;justify-content: space-between;-webkit-box-align: center;-ms-flex-align: center;align-items: center;padding: 0.5rem 0.75rem;color: #080707;white-space: nowrap;cursor: pointer;}\n.slds-dropdown__item", shadowSelector, " > a:hover", shadowSelector, ",.slds-dropdown__item", shadowSelector, " > a:focus", shadowSelector, " {outline: 0;text-decoration: none;background-color: #f3f2f2;}\n.slds-dropdown__item", shadowSelector, " > a:active", shadowSelector, " {text-decoration: none;background-color: #ecebea;}\n.slds-dropdown__item", shadowSelector, " > a[aria-disabled=\"true\"]", shadowSelector, " {color: #dddbda;cursor: default;}\n.slds-dropdown__item", shadowSelector, " > a[aria-disabled=\"true\"]:hover", shadowSelector, " {background-color: transparent;}\n.slds-dropdown__item", shadowSelector, " > a[aria-disabled=\"true\"]", shadowSelector, " .slds-icon", shadowSelector, " {fill: #dddbda;}\n.slds-dropdown__item", shadowSelector, " > a.slds-has-error", shadowSelector, " {background: #c23934;}\n.slds-dropdown__item", shadowSelector, " > a.slds-has-success", shadowSelector, " {background: #04844b;}\n.slds-dropdown__item", shadowSelector, " > a.slds-has-error", shadowSelector, ",.slds-dropdown__item", shadowSelector, " > a.slds-has-success", shadowSelector, " {color: white;}\n.slds-dropdown__item", shadowSelector, " > a.slds-has-warning", shadowSelector, " {background: #ffb75d;}\n.slds-dropdown__item", shadowSelector, " > a.slds-has-warning", shadowSelector, " .slds-indicator_unread", shadowSelector, " {background-color: currentColor;}\n.slds-dropdown__item", shadowSelector, " > a.slds-has-warning", shadowSelector, " .slds-indicator_unsaved", shadowSelector, " {color: currentColor;}\n.slds-dropdown__item", shadowSelector, " > a.slds-has-error:hover", shadowSelector, ",.slds-dropdown__item", shadowSelector, " > a.slds-has-error:focus", shadowSelector, ",.slds-dropdown__item", shadowSelector, " > a.slds-has-success:hover", shadowSelector, ",.slds-dropdown__item", shadowSelector, " > a.slds-has-success:focus", shadowSelector, ",.slds-dropdown__item", shadowSelector, " > a.slds-has-warning:hover", shadowSelector, ",.slds-dropdown__item", shadowSelector, " > a.slds-has-warning:focus", shadowSelector, " {text-decoration: underline;}\n.slds-dropdown__item", shadowSelector, " .slds-icon_selected", shadowSelector, " {opacity: 0;-webkit-transition: opacity 0.05s ease;transition: opacity 0.05s ease;}\n.slds-dropdown__item.slds-is-selected", shadowSelector, " .slds-icon_selected", shadowSelector, " {opacity: 1;}\n.slds-dropdown__item.slds-has-notification", shadowSelector, " .slds-indicator_unsaved", shadowSelector, " {top: -0.375rem;}\n[dir=\"rtl\"]", shadowSelector, " .slds-dropdown_center", shadowSelector, ",[dir=\"rtl\"]", shadowSelector, " .slds-dropdown--center", shadowSelector, " {left: auto;right: auto;-webkit-transform: translateX(calc(50% - (0.875rem / 2)));transform: translateX(calc(50% - (0.875rem / 2)));}\n"].join('');
}
var stylesheet29 = [stylesheet$t];

function stylesheet$u(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-pill", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;-webkit-box-pack: justify;-ms-flex-pack: justify;justify-content: space-between;line-height: 1.5;max-width: 100%;padding: 0.125rem;border: 1px solid #dddbda;border-radius: 0.25rem;background-color: white;position: relative;min-height: 1.625rem;}\n.slds-pill", shadowSelector, " + .slds-pill", shadowSelector, " {margin-left: 0.125rem;}\n.slds-pill:hover", shadowSelector, " {background-color: #f4f6f9;}\n.slds-pill:focus", shadowSelector, " {outline: 0;border-radius: 0.25rem;border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-pill", shadowSelector, " a", shadowSelector, " {text-decoration: none;}\n.slds-pill_bare", shadowSelector, " {background-color: transparent;border: 0;}\n.slds-pill_bare:hover", shadowSelector, " {background-color: transparent;}\n.slds-pill__container", shadowSelector, ",.slds-pill-container", shadowSelector, ",.slds-pill_container", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;min-height: calc(1.875rem + 2px);padding: 0.125rem;border: 1px solid #dddbda;border-radius: 0.25rem;background-color: white;}\n.slds-pill__container", shadowSelector, " .slds-listbox_inline", shadowSelector, ",.slds-pill-container", shadowSelector, " .slds-listbox_inline", shadowSelector, ",.slds-pill_container", shadowSelector, " .slds-listbox_inline", shadowSelector, " {margin-left: 0;margin-right: 0;}\n.slds-pill__container_bare", shadowSelector, ",.slds-pill_container_bare", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;padding: 0.125rem;border: 0;border-radius: 0;background-color: transparent;}\n.slds-pill__label", shadowSelector, " {white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}\n.slds-pill__label:focus", shadowSelector, " {outline: 0;border-radius: 0.25rem;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-pill__icon", shadowSelector, ",.slds-pill__icon_container", shadowSelector, " {width: 1.25rem;height: 1.25rem;margin-right: 0.25rem;}\n.slds-pill__icon", shadowSelector, " .slds-icon", shadowSelector, ",.slds-pill__icon", shadowSelector, " .slds-avatar", shadowSelector, ",.slds-pill__icon_container", shadowSelector, " .slds-icon", shadowSelector, ",.slds-pill__icon_container", shadowSelector, " .slds-avatar", shadowSelector, " {width: 1.25rem;height: 1.25rem;display: block;font-size: 0.625rem;}\n.slds-pill__icon", shadowSelector, " ~ .slds-pill__action", shadowSelector, ",.slds-pill__icon_container", shadowSelector, " ~ .slds-pill__action", shadowSelector, " {padding-left: calc(1.25rem + 0.25rem + 2px);}\n.slds-pill__remove", shadowSelector, " {width: 1rem;height: 1rem;display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;margin-left: 0.25rem;border-radius: 0.125rem;}\n.slds-pill__remove", shadowSelector, " svg", shadowSelector, " {width: 0.875rem;height: 0.875rem;}\n.slds-pill_link", shadowSelector, " {border: 0;padding: 0;}\n.slds-pill_link", shadowSelector, " .slds-pill__icon_container", shadowSelector, " {display: inline-block;position: absolute;top: 50%;left: 0.125rem;-webkit-transform: translateY(-50%);transform: translateY(-50%);}\n.slds-pill_link", shadowSelector, " .slds-pill__remove", shadowSelector, " {position: absolute;top: 50%;right: 0.125rem;-webkit-transform: translateY(-50%);transform: translateY(-50%);}\n.slds-pill__action", shadowSelector, " {padding: 0.125rem;padding-right: calc(1rem + 0.25rem + 2px);border: 1px solid #dddbda;border-radius: 0.25rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;-webkit-box-flex: 1;-ms-flex-positive: 1;flex-grow: 1;}\n.slds-pill__action:focus", shadowSelector, " {outline: 0;border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-has-error", shadowSelector, " {border-color: #c23934;}\n.slds-has-error", shadowSelector, " .slds-pill__label", shadowSelector, " {font-weight: 700;color: #c23934;}\n.slds-has-error", shadowSelector, " .slds-pill__action", shadowSelector, " {border-color: #c23934;}\n"].join('');
}
var stylesheet30 = [stylesheet$u];

function stylesheet$v(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-progress-bar", shadowSelector, " {-moz-appearance: none;-webkit-appearance: none;appearance: none;display: block;width: 100%;height: 0.5rem;background: #dddbda;border: 0;position: relative;}\n.slds-progress-bar_x-small", shadowSelector, " {height: 0.125rem;}\n.slds-progress-bar_small", shadowSelector, " {height: 0.25rem;}\n.slds-progress-bar_medium", shadowSelector, " {height: 0.5rem;}\n.slds-progress-bar_large", shadowSelector, " {height: 0.75rem;}\n.slds-progress-bar_circular", shadowSelector, " {border-radius: 0.5rem;}\n.slds-progress-bar_circular", shadowSelector, " .slds-progress-bar__value", shadowSelector, " {border-radius: 0.5rem;}\n.slds-progress-bar__value", shadowSelector, " {display: block;background: #5eb4ff;height: 100%;}\n.slds-progress-bar__value_success", shadowSelector, " {background: #4bca81;}\n"].join('');
}
var stylesheet31 = [stylesheet$v];

function stylesheet$w(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-progress-bar_vertical", shadowSelector, " {height: 100%;width: 0.5rem;}\n.slds-progress-bar_vertical.slds-progress-bar_x-small", shadowSelector, " {width: 0.125rem;}\n.slds-progress-bar_vertical.slds-progress-bar_small", shadowSelector, " {width: 0.25rem;}\n.slds-progress-bar_vertical.slds-progress-bar_medium", shadowSelector, " {width: 0.5rem;}\n.slds-progress-bar_vertical.slds-progress-bar_large", shadowSelector, " {width: 0.75rem;}\n"].join('');
}
var stylesheet32 = [stylesheet$w];

function stylesheet$x(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-radio", shadowSelector, " {display: inline-block;}\n.slds-radio", shadowSelector, " .slds-radio_faux", shadowSelector, " {width: 1rem;height: 1rem;display: inline-block;position: relative;vertical-align: middle;border: 1px solid #dddbda;border-radius: 50%;background: white;-webkit-transition: border 0.1s linear, background-color 0.1s linear;transition: border 0.1s linear, background-color 0.1s linear;}\n.slds-radio", shadowSelector, " .slds-form-element__label", shadowSelector, " {display: inline;vertical-align: middle;font-size: 0.8125rem;}\n.slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " {width: 1px;height: 1px;border: 0;clip: rect(0 0 0 0);margin: -1px;overflow: hidden;padding: 0;position: absolute;}\n.slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio_faux", shadowSelector, ",.slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ",.slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, " {background: white;}\n.slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio_faux", shadowSelector, ":after,.slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ":after,.slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, ":after {width: 0.5rem;height: 0.5rem;content: \"\";position: absolute;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);border-radius: 50%;background: #0070d2;}\n.slds-radio", shadowSelector, " [type=\"radio\"]:focus", shadowSelector, " + .slds-radio_faux", shadowSelector, ",.slds-radio", shadowSelector, " [type=\"radio\"]:focus", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ",.slds-radio", shadowSelector, " [type=\"radio\"]:focus", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, " {border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-radio", shadowSelector, " [type=\"radio\"][disabled]", shadowSelector, " {cursor: not-allowed;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}\n.slds-radio", shadowSelector, " [type=\"radio\"][disabled]", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ",.slds-radio", shadowSelector, " [type=\"radio\"][disabled]", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, " {background-color: #ecebea;border-color: #c9c7c5;}\n.slds-radio", shadowSelector, " [type=\"radio\"][disabled]", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ":after,.slds-radio", shadowSelector, " [type=\"radio\"][disabled]", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, ":after {background: #969492;}\n.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " + .slds-radio_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, " {border-color: #c23934;border-width: 2px;}\n.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, " {background: white;}\n.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio_faux", shadowSelector, ":after,.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ":after,.slds-has-error", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]:checked", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, ":after {background: #d4504c;}\n.slds-form-element", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " + .slds-radio_faux", shadowSelector, ",.slds-form-element", shadowSelector, " .slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " ~ .slds-radio_faux", shadowSelector, ",.slds-radio", shadowSelector, " [type=\"radio\"]", shadowSelector, " + .slds-radio__label", shadowSelector, " .slds-radio_faux", shadowSelector, " {margin-right: 0.5rem;}\n"].join('');
}
var stylesheet33 = [stylesheet$x];

function stylesheet$y(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-rich-text-editor", shadowSelector, " {border: 1px solid #dddbda;border-radius: 0.25rem;}\n.slds-rich-text-editor_toolbar-only", shadowSelector, " {border: 0;border-radius: 0;}\n.slds-rich-text-editor__toolbar", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;-webkit-box-align: start;-ms-flex-align: start;align-items: flex-start;white-space: nowrap;position: relative;padding: 0.5rem 0.5rem 0.25rem 0.5rem;border-top-left-radius: 0.25rem;border-top-right-radius: 0.25rem;border-bottom: 1px solid #dddbda;background-color: #f3f2f2;}\n.slds-rich-text-editor__col", shadowSelector, " {-ms-flex-item-align: center;align-self: center;}\n.slds-rich-text-editor__col", shadowSelector, " + .slds-rich-text-editor__col", shadowSelector, " {margin-left: 0.5rem;}\n.slds-rich-text-editor__col_grow", shadowSelector, " {-webkit-box-flex: 1;-ms-flex-positive: 1;flex-grow: 1;}\n.slds-rich-text-editor__toolbar_bottom", shadowSelector, " {border-radius: 0 0 0.25rem 0.25rem;border-top: 1px solid #dddbda;border-bottom: 0;}\n.slds-rich-text-editor__toolbar_detached", shadowSelector, " {border-radius: 0;border-top: 0;border-bottom: 0;}\n.slds-rich-text-editor", shadowSelector, " .slds-button-group-list", shadowSelector, " {margin-right: 0.25rem;margin-bottom: 0.25rem;margin-left: 0;}\n.slds-rich-text-editor", shadowSelector, " .slds-button-group-list:last-child", shadowSelector, " {margin-right: 0;}\n.slds-rich-text-editor__select", shadowSelector, " {margin-right: 0.25rem;margin-bottom: 0.25rem;}\n.slds-rich-text-editor__select_x-small", shadowSelector, " {max-width: 12rem;width: auto;}\n.slds-rich-text-editor__select_xx-small", shadowSelector, " {max-width: 6rem;width: auto;}\n.slds-region_narrow", shadowSelector, " .slds-combobox", shadowSelector, " {max-width: 11rem;}\n.slds-rich-text-editor.slds-has-focus", shadowSelector, " {border-color: #1589ee;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-rich-text-editor.slds-has-error", shadowSelector, " {border: 2px solid #c23934;}\n.slds-rich-text-editor.slds-has-error", shadowSelector, " .slds-input", shadowSelector, " {border-color: #dddbda;-webkit-box-shadow: none;box-shadow: none;}\n.slds-rich-text-editor.slds-has-error", shadowSelector, " .slds-form-element__help", shadowSelector, " {background: white;margin-top: 0;border-radius: 0 0 0.125rem 0.125rem;}\n.slds-rich-text-area__content", shadowSelector, " {overflow-y: auto;min-height: 6rem;max-height: 15rem;padding: 1rem;background-color: white;}\n.slds-picklist__label[disabled]", shadowSelector, " .slds-icon", shadowSelector, " {fill: #dddbda;}\n[contenteditable]:focus", shadowSelector, " {outline: none;}\n.slds-rich-text-editor__textarea:last-child", shadowSelector, " .slds-rich-text-area__content", shadowSelector, " {border-radius: 0 0 0.25rem 0.25rem;}\n.slds-rich-text-editor__textarea:first-child", shadowSelector, " .slds-rich-text-area__content", shadowSelector, " {border-radius: 0.25rem 0.25rem 0 0;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-editor", shadowSelector, " {white-space: pre-wrap;word-wrap: break-word;-webkit-user-select: text;-moz-user-select: text;-ms-user-select: text;user-select: text;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-editor.ql-blank", shadowSelector, ":before {color: #54698d;content: attr(data-placeholder);pointer-events: none;position: absolute;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-editor", shadowSelector, " a", shadowSelector, " {text-decoration: underline;}\n.slds-rich-text-editor__textarea", shadowSelector, " .overflow-menu", shadowSelector, " {z-index: 2;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-active", shadowSelector, " {background-color: #eef1f6;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-clipboard", shadowSelector, " {position: absolute !important;margin: -1px !important;border: 0 !important;padding: 0 !important;width: 1px !important;height: 1px !important;overflow: hidden !important;clip: rect(0 0 0 0) !important;}\n.slds-rich-text-editor__textarea", shadowSelector, " p", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " pre", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " blockquote", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h1", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h2", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h3", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h4", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h5", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h6", shadowSelector, " {counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " {margin: 0;padding: 0;padding-left: 1.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " > li", shadowSelector, " {list-style-type: none;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " > li", shadowSelector, " {list-style-type: none;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " > li", shadowSelector, ":before {content: \"•\";vertical-align: middle;display: inline-block;line-height: normal;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul[data-checked=\"true\"]", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " ul[data-checked=\"false\"]", shadowSelector, " {pointer-events: none;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul[data-checked=\"true\"]", shadowSelector, " > li", shadowSelector, ":before {color: #777;cursor: pointer;pointer-events: all;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul[data-checked=\"false\"]", shadowSelector, " > li", shadowSelector, ":before {color: #777;cursor: pointer;pointer-events: all;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul[data-checked=\"true\"]", shadowSelector, " > li", shadowSelector, ":before {content: \"☑\";}\n.slds-rich-text-editor__textarea", shadowSelector, " ul[data-checked=\"false\"]", shadowSelector, " > li", shadowSelector, ":before {content: \"☐\";}\n.slds-rich-text-editor__textarea", shadowSelector, " li", shadowSelector, ":before {display: inline-block;margin-right: 0.3em;text-align: right;white-space: nowrap;width: 1.2em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li:not(.ql-direction-rtl)", shadowSelector, ":before {margin-left: -1.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li", shadowSelector, " {padding-left: 1.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li", shadowSelector, " {counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment: list-num;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li", shadowSelector, ":before {content: counter(list-num, decimal) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-1", shadowSelector, " {counter-increment: list-1;counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-1", shadowSelector, ":before {content: counter(list-1, lower-alpha) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-2", shadowSelector, " {counter-increment: list-2;counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-2", shadowSelector, ":before {content: counter(list-2, lower-roman) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-3", shadowSelector, " {counter-increment: list-3;counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-3", shadowSelector, ":before {content: counter(list-3, decimal) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-4", shadowSelector, " {counter-increment: list-4;counter-reset: list-5 list-6 list-7 list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-4", shadowSelector, ":before {content: counter(list-4, lower-alpha) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-5", shadowSelector, " {counter-increment: list-5;counter-reset: list-6 list-7 list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-5", shadowSelector, ":before {content: counter(list-5, lower-roman) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-6", shadowSelector, " {counter-increment: list-6;counter-reset: list-7 list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-6", shadowSelector, ":before {content: counter(list-6, decimal) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-7", shadowSelector, " {counter-increment: list-7;counter-reset: list-8 list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-7", shadowSelector, ":before {content: counter(list-7, lower-alpha) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-8", shadowSelector, " {counter-increment: list-8;counter-reset: list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-8", shadowSelector, ":before {content: counter(list-8, lower-roman) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-9", shadowSelector, " {counter-increment: list-9;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " li.ql-indent-9", shadowSelector, ":before {content: counter(list-9, decimal) \". \";}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-1", shadowSelector, ":before {content: \"◦\";}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-2", shadowSelector, ":before,.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-3", shadowSelector, ":before,.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-4", shadowSelector, ":before,.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-5", shadowSelector, ":before,.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-6", shadowSelector, ":before,.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-7", shadowSelector, ":before,.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " li.ql-indent-8", shadowSelector, ":before {content: \"▪\";}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-1:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 4.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-1.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 4.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-2:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 7.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-2.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 7.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-3:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 10.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-3.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 10.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-4:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 13.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-4.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 13.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-5:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 16.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-5.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 16.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-6:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 19.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-6.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 19.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-7:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 22.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-7.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 22.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-8:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 25.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-8.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 25.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-9:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 28.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, " li.ql-indent-9.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 28.5em;}\n.slds-rich-text-editor__textarea", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " {line-height: 1.5;overflow-wrap: break-word;word-wrap: break-word;-webkit-hyphens: manual;-ms-hyphens: manual;hyphens: manual;}\n.slds-rich-text-editor__textarea", shadowSelector, " h1", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h1", shadowSelector, " {font-size: 1.5rem;}\n.slds-rich-text-editor__textarea", shadowSelector, " h2", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h2", shadowSelector, " {font-size: 1.125rem;font-weight: 700;}\n.slds-rich-text-editor__textarea", shadowSelector, " h3", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h3", shadowSelector, " {font-size: 1.125rem;}\n.slds-rich-text-editor__textarea", shadowSelector, " h4", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h4", shadowSelector, " {font-size: 0.875rem;font-weight: 700;}\n.slds-rich-text-editor__textarea", shadowSelector, " h5", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h5", shadowSelector, " {font-size: 0.875rem;}\n.slds-rich-text-editor__textarea", shadowSelector, " h6", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h6", shadowSelector, " {font-size: 0.75rem;font-weight: 700;}\n.slds-rich-text-editor__textarea", shadowSelector, " h1", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h2", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h3", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h4", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h5", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " h6", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " dl", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " img", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h1", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h2", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h3", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h4", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h5", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " h6", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ul", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " dl", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " img", shadowSelector, " {margin-bottom: 0.75rem;}\n.slds-rich-text-editor__textarea", shadowSelector, " blockquote", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " blockquote", shadowSelector, " {margin: 2rem 1.5rem;}\n.slds-rich-text-editor__textarea", shadowSelector, " ins", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ins", shadowSelector, " {color: #027e46;text-decoration: underline;}\n.slds-rich-text-editor__textarea", shadowSelector, " del", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " del", shadowSelector, " {color: #c23934;text-decoration: line-through;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ul", shadowSelector, " {margin-left: 1.5rem;list-style: disc;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " {list-style: circle;margin-bottom: 0;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " ul", shadowSelector, " {list-style: square;}\n.slds-rich-text-editor__textarea", shadowSelector, " ul", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ul", shadowSelector, " ol", shadowSelector, " {margin-left: 1.5rem;list-style: decimal;margin-bottom: 0;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ol", shadowSelector, " {margin-left: 1.5rem;list-style: decimal;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " {list-style: lower-alpha;margin-bottom: 0;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " ol", shadowSelector, " {list-style: lower-roman;}\n.slds-rich-text-editor__textarea", shadowSelector, " ol", shadowSelector, " ul", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " ol", shadowSelector, " ul", shadowSelector, " {margin-left: 1.5rem;list-style: disc;margin-bottom: 0;}\n.slds-rich-text-editor__textarea", shadowSelector, " dd", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " dd", shadowSelector, " {margin-left: 2.5rem;}\n.slds-rich-text-editor__textarea", shadowSelector, " abbr[title]", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " acronym[title]", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " abbr[title]", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " acronym[title]", shadowSelector, " {border-bottom: 1px dotted;cursor: help;}\n.slds-rich-text-editor__textarea", shadowSelector, " table", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " table", shadowSelector, " {overflow-wrap: normal;word-wrap: normal;word-break: normal;width: auto;}\n.slds-rich-text-editor__textarea", shadowSelector, " table", shadowSelector, " caption", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " table", shadowSelector, " caption", shadowSelector, " {text-align: center;}\n.slds-rich-text-editor__textarea", shadowSelector, " th", shadowSelector, ",.slds-rich-text-editor__textarea", shadowSelector, " td", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " th", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " td", shadowSelector, " {padding: 0.5rem;}\n.slds-rich-text-editor__textarea", shadowSelector, " .sans-serif", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .sans-serif", shadowSelector, " {font-family: sans-serif;}\n.slds-rich-text-editor__textarea", shadowSelector, " .courier", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .courier", shadowSelector, " {font-family: courier;}\n.slds-rich-text-editor__textarea", shadowSelector, " .verdana", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .verdana", shadowSelector, " {font-family: verdana;}\n.slds-rich-text-editor__textarea", shadowSelector, " .tahoma", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .tahoma", shadowSelector, " {font-family: tahoma;}\n.slds-rich-text-editor__textarea", shadowSelector, " .garamond", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .garamond", shadowSelector, " {font-family: garamond;}\n.slds-rich-text-editor__textarea", shadowSelector, " .serif", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .serif", shadowSelector, " {font-family: serif;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-1:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-1:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 3em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-1.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-1.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 3em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-2:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-2:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 6em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-2.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-2.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 6em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-3:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-3:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 9em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-3.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-3.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 9em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-4:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-4:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 12em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-4.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-4.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 12em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-5:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-5:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 15em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-5.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-5.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 15em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-6:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-6:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 18em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-6.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-6.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 18em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-7:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-7:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 21em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-7.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-7.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 21em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-8:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-8:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 24em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-8.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-8.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 24em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-9:not(.ql-direction-rtl)", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-9:not(.ql-direction-rtl)", shadowSelector, " {padding-left: 27em;}\n.slds-rich-text-editor__textarea", shadowSelector, " .ql-indent-9.ql-direction-rtl.ql-align-right", shadowSelector, ",.slds-rich-text-editor__output", shadowSelector, " .ql-indent-9.ql-direction-rtl.ql-align-right", shadowSelector, " {padding-right: 27em;}\n"].join('');
}
var stylesheet34 = [stylesheet$y];

function stylesheet$z(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-slider", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;position: relative;}\n.slds-slider__range", shadowSelector, " {-moz-appearance: none;-webkit-appearance: none;appearance: none;width: 100%;background: transparent;border-radius: 0.125rem;}\n.slds-slider__range:focus", shadowSelector, " {outline: 0;}\n.slds-slider__range", shadowSelector, "::-webkit-slider-thumb {-moz-appearance: none;-webkit-appearance: none;appearance: none;width: 1rem;height: 1rem;border-radius: 50%;background: #0070d2;border: 0;-webkit-box-shadow: rgba(0, 0, 0, 0.16) 0 2px 3px;box-shadow: rgba(0, 0, 0, 0.16) 0 2px 3px;cursor: pointer;-webkit-transition: background 0.15s ease-in-out;transition: background 0.15s ease-in-out;margin-top: calc(((1rem / 2) - (4px / 2)) * -1);}\n.slds-slider__range::-webkit-slider-thumb:hover", shadowSelector, " {background-color: #005fb2;}\n.slds-slider__range", shadowSelector, "::-webkit-slider-runnable-track {width: 100%;height: 4px;cursor: pointer;background: #ecebea;border-radius: 0.125rem;}\n.slds-slider__range", shadowSelector, "::-moz-range-thumb {-moz-appearance: none;-webkit-appearance: none;appearance: none;width: 1rem;height: 1rem;border-radius: 50%;background: #0070d2;border: 0;box-shadow: rgba(0, 0, 0, 0.16) 0 2px 3px;cursor: pointer;-moz-transition: background 0.15s ease-in-out;transition: background 0.15s ease-in-out;}\n.slds-slider__range::-moz-range-thumb:hover", shadowSelector, " {background-color: #005fb2;}\n.slds-slider__range", shadowSelector, "::-moz-range-track {width: 100%;height: 4px;cursor: pointer;background: #ecebea;border-radius: 0.125rem;}\n.slds-slider__range", shadowSelector, "::-ms-track {width: 100%;height: 4px;cursor: pointer;background: #ecebea;border-radius: 0.125rem;border-color: transparent;color: transparent;cursor: pointer;}\n.slds-slider__range", shadowSelector, "::-ms-thumb {-moz-appearance: none;-webkit-appearance: none;appearance: none;width: 1rem;height: 1rem;border-radius: 50%;background: #0070d2;border: 0;box-shadow: rgba(0, 0, 0, 0.16) 0 2px 3px;cursor: pointer;-ms-transition: background 0.15s ease-in-out;transition: background 0.15s ease-in-out;margin-top: calc(4px / 4);}\n.slds-slider__range::-ms-thumb:hover", shadowSelector, " {background-color: #005fb2;}\n.slds-slider__range:focus", shadowSelector, "::-webkit-slider-thumb {background-color: #005fb2;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-slider__range:active", shadowSelector, "::-webkit-slider-thumb {background-color: #005fb2;}\n.slds-slider__range:focus", shadowSelector, "::-moz-range-thumb {background-color: #005fb2;box-shadow: 0 0 3px #0070d2;}\n.slds-slider__range:active", shadowSelector, "::-moz-range-thumb {background-color: #005fb2;}\n.slds-slider__range[disabled]", shadowSelector, "::-webkit-slider-thumb {background-color: #ecebea;cursor: default;}\n.slds-slider__range[disabled]", shadowSelector, "::-webkit-slider-runnable-track {background-color: #ecebea;cursor: default;}\n.slds-slider__range[disabled]", shadowSelector, "::-moz-range-thumb {background-color: #ecebea;cursor: default;}\n.slds-slider__range[disabled]", shadowSelector, "::-moz-range-track {background-color: #ecebea;}\n.slds-slider__range[disabled]", shadowSelector, "::-ms-thumb {background-color: #ecebea;cursor: default;}\n.slds-slider__range[disabled]", shadowSelector, "::-ms-track {background-color: #ecebea;cursor: default;}\n.slds-slider__value", shadowSelector, " {padding: 0 0.5rem;}\n.slds-slider-label__label", shadowSelector, " {display: block;}\n.slds-slider_vertical", shadowSelector, " {height: 13.875rem;}\n.slds-slider_vertical", shadowSelector, " .slds-slider__range", shadowSelector, " {width: 12rem;height: 1rem;-webkit-transform: rotate(-90deg);transform: rotate(-90deg);-webkit-transform-origin: 6rem 6rem;transform-origin: 6rem 6rem;}\n.slds-slider_vertical", shadowSelector, " .slds-slider__value", shadowSelector, " {position: absolute;left: 0;bottom: 0;padding: 0;}\n"].join('');
}
var stylesheet35 = [stylesheet$z];

function stylesheet$A(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-tabs_default", shadowSelector, " {display: block;width: 100%;background-color: white;}\n.slds-tabs_default", shadowSelector, " .slds-tabs__item_overflow", shadowSelector, " {overflow: visible;}\n.slds-tabs_default__nav", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: start;-ms-flex-align: start;align-items: flex-start;border-bottom: 1px solid #dddbda;}\n.slds-tabs_default__item", shadowSelector, " {color: #3e3e3c;position: relative;padding: 0 0.75rem;margin-bottom: -1px;}\n.slds-tabs_default__item", shadowSelector, ":after {display: block;content: \"\";bottom: 0;left: 0;right: 0;height: 0;position: absolute;}\n.slds-tabs_default__item.slds-active", shadowSelector, ",.slds-tabs_default__item.slds-is-active", shadowSelector, " {color: #080707;}\n.slds-tabs_default__item.slds-active", shadowSelector, ":after,.slds-tabs_default__item.slds-is-active", shadowSelector, ":after {background-color: #1589ee;height: 0.1875rem;}\n.slds-tabs_default__item.slds-active", shadowSelector, " .slds-tabs_default__link", shadowSelector, ",.slds-tabs_default__item.slds-is-active", shadowSelector, " .slds-tabs_default__link", shadowSelector, " {font-weight: 700;}\n.slds-tabs_default__item.slds-active", shadowSelector, " .slds-tabs_default__link:hover", shadowSelector, ",.slds-tabs_default__item.slds-is-active", shadowSelector, " .slds-tabs_default__link:hover", shadowSelector, " {color: currentColor;}\n.slds-tabs_default__item:hover", shadowSelector, ":after {height: 0.125rem;background-color: #007add;-webkit-transition: height 300ms;transition: height 300ms;}\n.slds-tabs_default__item:focus", shadowSelector, ",.slds-tabs_default__item.slds-has-focus", shadowSelector, " {outline: 0;}\n.slds-tabs_default__item:focus", shadowSelector, ":after,.slds-tabs_default__item.slds-has-focus", shadowSelector, ":after {height: 3px;background-color: #1589ee;}\n.slds-tabs_default__item", shadowSelector, " .slds-tabs_default__link:focus", shadowSelector, " {-webkit-box-shadow: none;box-shadow: none;}\n.slds-tabs_default__item.slds-has-notification", shadowSelector, " {background: #f3f2f2;}\n.slds-tabs_default__item.slds-has-notification", shadowSelector, ":after {background-color: #dddbda;}\n.slds-tabs_default__item.slds-has-notification:hover", shadowSelector, ":after {background-color: #0070d2;}\n.slds-tabs_default__item.slds-has-notification", shadowSelector, " .slds-indicator_unread", shadowSelector, " {display: inline-block;height: 0.375rem;width: 0.375rem;position: relative;top: auto;left: auto;}\n.slds-tabs_default__item.slds-is-unsaved", shadowSelector, " .slds-indicator_unread", shadowSelector, " {margin-left: -0.35rem;}\n.slds-tabs_default__item.slds-has-notification", shadowSelector, " .slds-indicator_unsaved", shadowSelector, " {top: -0.25rem;}\n.slds-tabs_default__link", shadowSelector, " {max-width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display: block;text-decoration: none;cursor: pointer;height: 2.5rem;line-height: 2.5rem;color: currentColor;border: 0;text-transform: inherit;z-index: 1;}\n.slds-tabs_default__link:focus", shadowSelector, " {outline: 0;}\n.slds-tabs_default__link:hover", shadowSelector, ",.slds-tabs_default__link:focus", shadowSelector, " {text-decoration: none;-webkit-box-shadow: none;box-shadow: none;color: currentColor;}\n.slds-tabs_default__link[tabindex=\"0\"]:focus", shadowSelector, " {text-decoration: underline;}\n.slds-tabs_default__overflow-button", shadowSelector, " {display: -webkit-inline-box;display: -ms-inline-flexbox;display: inline-flex;height: 2.5rem;line-height: 2.5rem;}\n.slds-tabs_default__overflow-button", shadowSelector, " .slds-button", shadowSelector, " {line-height: inherit;color: #3e3e3c;-webkit-box-shadow: none;box-shadow: none;}\n.slds-tabs_default__overflow-button", shadowSelector, " .slds-button:focus", shadowSelector, " {text-decoration: underline;}\n.slds-tabs_default__overflow-button.slds-has-error", shadowSelector, " .slds-button", shadowSelector, ",.slds-tabs_default__overflow-button.slds-has-success", shadowSelector, " .slds-button", shadowSelector, " {color: white;}\n.slds-tabs_default__content", shadowSelector, " {position: relative;padding: 1rem 0;}\n.slds-tabs_medium", shadowSelector, " .slds-tabs_default__item", shadowSelector, " {font-size: 1rem;}\n.slds-tabs_large", shadowSelector, " .slds-tabs_default__item", shadowSelector, " {font-size: 1.25rem;}\n.slds-tabs__left-icon", shadowSelector, " {margin-right: 0.5rem;}\n.slds-tabs__left-icon:empty", shadowSelector, " {margin-right: 0;}\n.slds-tabs__right-icon", shadowSelector, " {margin-left: 0.5rem;}\n"].join('');
}
var stylesheet36 = [stylesheet$A];

function stylesheet$B(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-tabs-mobile__container", shadowSelector, " {position: relative;overflow: hidden;}\n.slds-panel__body", shadowSelector, " .slds-tabs-mobile", shadowSelector, " {margin-left: -0.75rem;margin-right: -0.75rem;}\n.slds-panel__body", shadowSelector, " .slds-tabs-mobile:first-child", shadowSelector, " {margin-top: -0.75rem;}\n.slds-panel__body", shadowSelector, " .slds-tabs-mobile:first-child", shadowSelector, " .slds-tabs-mobile__item:first-child", shadowSelector, " {border-top: 0;}\n.slds-tabs-mobile", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;background-color: white;}\n.slds-tabs-mobile__item", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;border-top: 1px solid #dddbda;height: 2.75rem;-webkit-box-align: stretch;-ms-flex-align: stretch;align-items: stretch;color: #2b2826;font-size: 1rem;padding: 0 0.75rem;}\n.slds-tabs-mobile__item:active", shadowSelector, " {background-color: #ecebea;}\n.slds-tabs-mobile__item:last-child", shadowSelector, " {border-bottom: 1px solid #dddbda;}\n.slds-tabs-mobile__group", shadowSelector, " .slds-tabs-mobile__container", shadowSelector, " + .slds-tabs-mobile__container", shadowSelector, " .slds-tabs-mobile__item:first-child", shadowSelector, " {border-top: 0;}\n"].join('');
}
var stylesheet37 = [stylesheet$B];

function stylesheet$C(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-textarea", shadowSelector, " {background-color: white;border: 1px solid #dddbda;border-radius: 0.25rem;width: 100%;-webkit-transition: border 0.1s linear, background-color 0.1s linear;transition: border 0.1s linear, background-color 0.1s linear;-webkit-appearance: none;resize: vertical;padding: 0.5rem 0.75rem;}\n.slds-textarea:required", shadowSelector, " {-webkit-box-shadow: none;box-shadow: none;}\n.slds-textarea:focus", shadowSelector, ",.slds-textarea:active", shadowSelector, " {outline: 0;border-color: #1589ee;background-color: white;-webkit-box-shadow: 0 0 3px #0070d2;box-shadow: 0 0 3px #0070d2;}\n.slds-textarea[disabled]", shadowSelector, ",.slds-textarea.slds-is-disabled", shadowSelector, " {background-color: #ecebea;border-color: #c9c7c5;cursor: not-allowed;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}\n.slds-textarea[disabled]:focus", shadowSelector, ",.slds-textarea[disabled]:active", shadowSelector, ",.slds-textarea.slds-is-disabled:focus", shadowSelector, ",.slds-textarea.slds-is-disabled:active", shadowSelector, " {-webkit-box-shadow: none;box-shadow: none;}\n.slds-has-error", shadowSelector, " .slds-textarea", shadowSelector, " {background-color: white;border-color: #c23934;-webkit-box-shadow: #c23934 0 0 0 1px inset;box-shadow: #c23934 0 0 0 1px inset;background-clip: padding-box;}\n.slds-has-error", shadowSelector, " .slds-textarea:focus", shadowSelector, ",.slds-has-error", shadowSelector, " .slds-textarea:active", shadowSelector, " {-webkit-box-shadow: #c23934 0 0 0 1px inset, 0 0 3px #0070d2;box-shadow: #c23934 0 0 0 1px inset, 0 0 3px #0070d2;}\n"].join('');
}
var stylesheet38 = [stylesheet$C];

function stylesheet$D(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-tile", shadowSelector, " {}\n.slds-tile", shadowSelector, " + .slds-tile", shadowSelector, " {margin-top: 0.5rem;}\n.slds-tile__detail", shadowSelector, " {position: relative;}\n.slds-tile__meta", shadowSelector, " {color: #080707;}\n.slds-tile_board", shadowSelector, " {position: relative;}\n.slds-tile_board__icon", shadowSelector, " {width: 1rem;height: 1rem;position: absolute;bottom: 0.25rem;right: 0.25rem;}\n.slds-tile_board", shadowSelector, " .slds-has-alert", shadowSelector, " {padding-right: 1.5rem;}\n"].join('');
}
var stylesheet39 = [stylesheet$D];

function stylesheet$E(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-table_tree", shadowSelector, " {}\n.slds-table_tree", shadowSelector, " .slds-tree__item", shadowSelector, " {line-height: 1.5rem;}\n.slds-table_tree", shadowSelector, " .slds-tree__item", shadowSelector, " a", shadowSelector, " {color: #006dcc;}\n.slds-table_tree", shadowSelector, " .slds-tree__item", shadowSelector, " a:hover", shadowSelector, " {text-decoration: underline;}\n.slds-table_tree", shadowSelector, " .slds-button", shadowSelector, " {-ms-flex-item-align: center;align-self: center;}\n.slds-table_tree", shadowSelector, " .slds-button:not(.slds-th__action-button).slds-button:not(.slds-th__action-button)", shadowSelector, " {margin-top: 0;}\n.slds-table_tree", shadowSelector, " [aria-level=\"1\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 1.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"2\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 2.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"3\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 3.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"4\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 4.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"5\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 5.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"6\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 6.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"7\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 7.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"8\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 8.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"9\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 9.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"10\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 10.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"11\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 11.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"12\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 12.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"13\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 13.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"14\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 14.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"15\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 15.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"16\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 16.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"17\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 17.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"18\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 18.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"19\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 19.5rem;}\n.slds-table_tree", shadowSelector, " [aria-level=\"20\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 20.5rem;}\n"].join('');
}
var stylesheet40 = [stylesheet$E];

function stylesheet$F(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-tree-container", shadowSelector, ",.slds-tree_container", shadowSelector, " {min-width: 7.5rem;max-width: 25rem;}\n.slds-tree-container", shadowSelector, " > .slds-text-heading_label", shadowSelector, ",.slds-tree_container", shadowSelector, " > .slds-text-heading_label", shadowSelector, " {margin-bottom: 0.5rem;}\n.slds-tree__item", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;padding: 0.375rem 0 0.375rem 1rem;}\n.slds-tree__item.slds-is-hovered", shadowSelector, ",.slds-tree__item:hover", shadowSelector, " {background: #f3f2f2;cursor: pointer;}\n.slds-tree__item", shadowSelector, " .slds-is-disabled", shadowSelector, " {visibility: hidden;}\n.slds-tree", shadowSelector, " [role=\"treeitem\"]:focus", shadowSelector, " {outline: 0;}\n.slds-tree", shadowSelector, " [role=\"treeitem\"]:focus", shadowSelector, " > .slds-tree__item", shadowSelector, " {background: #f3f2f2;cursor: pointer;text-decoration: underline;}\n.slds-tree", shadowSelector, " [role=\"treeitem\"][aria-selected=\"true\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {background: rgba(21, 137, 238, 0.1);-webkit-box-shadow: #1589ee 4px 0 0 inset;box-shadow: #1589ee 4px 0 0 inset;}\n[dir=\"rtl\"]", shadowSelector, " .slds-tree", shadowSelector, " [role=\"treeitem\"][aria-selected=\"true\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {-webkit-box-shadow: #1589ee -4px 0 0 inset;box-shadow: #1589ee -4px 0 0 inset;}\n.slds-tree", shadowSelector, " [role=\"treeitem\"]", shadowSelector, " > [role=\"group\"]", shadowSelector, " {display: none;}\n.slds-tree", shadowSelector, " [role=\"treeitem\"][aria-expanded=\"true\"]", shadowSelector, " > [role=\"group\"]", shadowSelector, " {display: block;}\n[aria-expanded=\"false\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " .slds-button__icon", shadowSelector, " {-webkit-transition: 0.2s -webkit-transform ease-in-out;transition: 0.2s -webkit-transform ease-in-out;transition: 0.2s transform ease-in-out;transition: 0.2s transform ease-in-out, 0.2s -webkit-transform ease-in-out;-webkit-transform: rotate(0deg);transform: rotate(0deg);}\n[aria-expanded=\"true\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " .slds-button__icon", shadowSelector, " {-webkit-transition: 0.2s -webkit-transform ease-in-out;transition: 0.2s -webkit-transform ease-in-out;transition: 0.2s transform ease-in-out;transition: 0.2s transform ease-in-out, 0.2s -webkit-transform ease-in-out;-webkit-transform: rotate(90deg);transform: rotate(90deg);}\n[dir=\"rtl\"]", shadowSelector, " [aria-expanded=\"true\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " .slds-button__icon", shadowSelector, " {-webkit-transform: rotate(-90deg);transform: rotate(-90deg);}\n[aria-level=\"1\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 1rem;}\n[aria-level=\"2\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 2rem;}\n[aria-level=\"3\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 3rem;}\n[aria-level=\"4\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 4rem;}\n[aria-level=\"5\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 5rem;}\n[aria-level=\"6\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 6rem;}\n[aria-level=\"7\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 7rem;}\n[aria-level=\"8\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 8rem;}\n[aria-level=\"9\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 9rem;}\n[aria-level=\"10\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 10rem;}\n[aria-level=\"11\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 11rem;}\n[aria-level=\"12\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 12rem;}\n[aria-level=\"13\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 13rem;}\n[aria-level=\"14\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 14rem;}\n[aria-level=\"15\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 15rem;}\n[aria-level=\"16\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 16rem;}\n[aria-level=\"17\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 17rem;}\n[aria-level=\"18\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 18rem;}\n[aria-level=\"19\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 19rem;}\n[aria-level=\"20\"]", shadowSelector, " > .slds-tree__item", shadowSelector, " {padding-left: 20rem;}\n.slds-tree__item-label", shadowSelector, " {display: block;}\n.slds-tree__item-meta", shadowSelector, " {display: block;color: #3e3e3c;}\n.slds-tree__item", shadowSelector, " .slds-button", shadowSelector, " {-ms-flex-item-align: start;align-self: flex-start;margin-top: 0.125rem;}\n.slds-tree__item", shadowSelector, " .slds-pill", shadowSelector, " {margin-left: 0.75rem;}\n.slds-tree__group-header", shadowSelector, " {font-size: 0.875rem;font-weight: 700;}\n"].join('');
}
var stylesheet41 = [stylesheet$F];

function stylesheet$G(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-nav-vertical", shadowSelector, " {position: relative;}\n.slds-nav-vertical_compact", shadowSelector, " .slds-nav-vertical__title", shadowSelector, ",.slds-nav-vertical_compact", shadowSelector, " .slds-nav-vertical__action", shadowSelector, " {padding: 0.25rem 1.5rem;}\n.slds-nav-vertical_shade", shadowSelector, " .slds-is-active.slds-nav-vertical__item", shadowSelector, ":before {background: white;}\n.slds-nav-vertical_shade", shadowSelector, " .slds-nav-vertical__item:hover", shadowSelector, ":before {background: white;}\n.slds-nav-vertical_shade", shadowSelector, " .slds-is-active", shadowSelector, " .slds-nav-vertical__action", shadowSelector, " {border-color: #dddbda;}\n.slds-nav-vertical__title", shadowSelector, " {padding: 0.5rem 1rem;padding-left: 1.5rem;font-size: 1rem;font-weight: 700;}\n.slds-nav-vertical__title:not(:first-of-type)", shadowSelector, " {margin-top: 0.5rem;}\n.slds-nav-vertical__section:not(:first-of-type)", shadowSelector, " {margin-top: 0.5rem;}\n.slds-nav-vertical__item", shadowSelector, " {position: relative;}\n.slds-nav-vertical__item", shadowSelector, ":before {position: absolute;top: 0;right: 0;bottom: 0;left: 0;content: \"\";}\n.slds-nav-vertical__item:hover", shadowSelector, ":before,.slds-nav-vertical__item.slds-is-active", shadowSelector, ":before {background: rgba(21, 137, 238, 0.1);}\n.slds-nav-vertical__action", shadowSelector, " {position: relative;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;width: 100%;padding: 0.5rem 1.5rem 0.5rem 2rem;color: #080707;border-top: 1px solid transparent;border-bottom: 1px solid transparent;border-radius: 0;-webkit-box-shadow: inset 0 0 0 #1589ee;box-shadow: inset 0 0 0 #1589ee;cursor: pointer;}\n.slds-nav-vertical__action:active", shadowSelector, ",.slds-nav-vertical__action:hover", shadowSelector, ",.slds-nav-vertical__action:focus", shadowSelector, " {color: currentColor;}\n.slds-nav-vertical__action:hover", shadowSelector, " {text-decoration: none;-webkit-box-shadow: inset 0.125rem 0 0 #1589ee;box-shadow: inset 0.125rem 0 0 #1589ee;}\n[dir=\"rtl\"]", shadowSelector, " .slds-nav-vertical__action:hover", shadowSelector, " {-webkit-box-shadow: inset -0.125rem 0 0 #1589ee;box-shadow: inset -0.125rem 0 0 #1589ee;}\n.slds-nav-vertical__action:focus", shadowSelector, " {outline: 0;text-decoration: underline;}\n.slds-nav-vertical__item.slds-is-active", shadowSelector, " .slds-nav-vertical__action", shadowSelector, " {font-weight: bold;-webkit-box-shadow: inset 0.25rem 0 0 #1589ee;box-shadow: inset 0.25rem 0 0 #1589ee;}\n[dir=\"rtl\"]", shadowSelector, " .slds-nav-vertical__item.slds-is-active", shadowSelector, " .slds-nav-vertical__action", shadowSelector, " {-webkit-box-shadow: inset -0.25rem 0 0 #1589ee;box-shadow: inset -0.25rem 0 0 #1589ee;}\n"].join('');
}
var stylesheet42 = [stylesheet$G];

function stylesheet$H(hostSelector, shadowSelector, nativeShadow) {
  return ["@charset \"UTF-8\";.slds-vertical-tabs", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;overflow: hidden;border: 1px solid #dddbda;border-radius: 0.25rem;}\n.slds-vertical-tabs__nav", shadowSelector, " {width: 12rem;border-right: 1px solid #dddbda;background: #f3f2f2;}\n.slds-vertical-tabs__nav-item", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;overflow: hidden;border-bottom: 1px solid #dddbda;color: #3e3e3c;}\n.slds-vertical-tabs__nav-item:last-child", shadowSelector, " {margin-bottom: -1px;}\n.slds-vertical-tabs__link", shadowSelector, " {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-flex: 1;-ms-flex: 1 1 0%;flex: 1 1 0%;-webkit-box-align: center;-ms-flex-align: center;align-items: center;min-width: 0;padding: 0.75rem;color: currentColor;}\n.slds-vertical-tabs__link:hover", shadowSelector, " {background: #dddbda;color: #080707;text-decoration: none;}\n.slds-vertical-tabs__link:focus", shadowSelector, " {outline: 0;}\n.slds-vertical-tabs__left-icon", shadowSelector, " {margin-right: 0.5rem;}\n.slds-vertical-tabs__left-icon:empty", shadowSelector, " {margin-right: 0;}\n.slds-vertical-tabs__right-icon", shadowSelector, " {margin-left: auto;}\n.slds-vertical-tabs__content", shadowSelector, " {-webkit-box-flex: 1;-ms-flex: 1;flex: 1;padding: 1rem;background: white;}\n.slds-vertical-tabs__nav-item.slds-is-active", shadowSelector, " {margin-right: -1px;border-right: 0;background: white;color: #006dcc;}\n.slds-vertical-tabs__nav-item.slds-is-active", shadowSelector, " .slds-vertical-tabs__link:hover", shadowSelector, " {background: white;color: currentColor;}\n.slds-vertical-tabs__nav-item.slds-has-focus", shadowSelector, " {text-decoration: underline;}\n"].join('');
}
var stylesheet43 = [stylesheet$H];

var stylesheet0$1 = [stylesheet0, stylesheet1, stylesheet2, stylesheet3, stylesheet4, stylesheet5, stylesheet6, stylesheet7, stylesheet8, stylesheet9, stylesheet10, stylesheet11, stylesheet12, stylesheet13, stylesheet14, stylesheet15, stylesheet16, stylesheet17, stylesheet18, stylesheet19, stylesheet20, stylesheet21, stylesheet22, stylesheet23, stylesheet24, stylesheet25, stylesheet26, stylesheet27, stylesheet28, stylesheet29, stylesheet30, stylesheet31, stylesheet32, stylesheet33, stylesheet34, stylesheet35, stylesheet36, stylesheet37, stylesheet38, stylesheet39, stylesheet40, stylesheet41, stylesheet42, stylesheet43];

var _implicitStylesheets = [stylesheet0$1];

function stylesheet$I(hostSelector, shadowSelector, nativeShadow) {
  return ["_:-ms-lang(x)", shadowSelector, ", svg", shadowSelector, " {pointer-events: none;}\n"].join('');
}
var _implicitStylesheets$1 = [stylesheet$I];

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    fid: api_scoped_frag_id,
    h: api_element
  } = $api;
  return [api_element("svg", {
    className: $cmp.computedClass,
    attrs: {
      "focusable": "false",
      "data-key": $cmp.name,
      "aria-hidden": "true"
    },
    key: 1
  }, [api_element("use", {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
    },
    key: 0
  }, [])])];
}

var _tmpl = registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets$1) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$1);
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
  shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
};

var dir = 'ltr';

const proto = {
  add(className) {
    if (typeof className === 'string') {
      this[className] = true;
    } else {
      Object.assign(this, className);
    }

    return this;
  },

  invert() {
    Object.keys(this).forEach(key => {
      this[key] = !this[key];
    });
    return this;
  },

  toString() {
    return Object.keys(this).filter(key => this[key]).join(' ');
  }

};
function classSet(config) {
  if (typeof config === 'string') {
    const key = config;
    config = {};
    config[key] = true;
  }

  return Object.assign(Object.create(proto), config);
}

/**
 * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
 * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
 * @param  {string|array} arguments - string(s) to be injected into the `string` param
 * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
 */
function formatLabel(str) {
  const args = Array.prototype.slice.call(arguments, 1);
  let replacements = args;

  if (Array.isArray(args[0])) {
    [replacements] = args;
  }

  return str.replace(/{(\d+)}/g, (match, i) => {
    return replacements[i];
  });
}

function classListMutation(classList, config) {
  Object.keys(config).forEach(key => {
    if (typeof key === 'string' && key.length) {
      if (config[key]) {
        classList.add(key);
      } else {
        classList.remove(key);
      }
    }
  });
}

/**
A string normalization utility for attributes.
@param {String} value - The value to normalize.
@param {Object} config - The optional configuration object.
@param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
@param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
@return {String} - The normalized value.
**/
function normalizeString(value, config = {}) {
  const {
    fallbackValue = '',
    validValues,
    toLowerCase = true
  } = config;
  let normalized = typeof value === 'string' && value.trim() || '';
  normalized = toLowerCase ? normalized.toLowerCase() : normalized;

  if (validValues && validValues.indexOf(normalized) === -1) {
    normalized = fallbackValue;
  }

  return normalized;
}
/**
A boolean normalization utility for attributes.
@param {Any} value - The value to normalize.
@return {Boolean} - The normalized value.
**/

function normalizeBoolean(value) {
  return typeof value === 'string' || !!value;
}

const isIE11 = isIE11Test(navigator);
const isChrome = isChromeTest(navigator);
const isSafari = isSafariTest(navigator); // The following functions are for tests only

function isIE11Test(navigator) {
  // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
  return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
}
function isChromeTest(navigator) {
  // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}
function isSafariTest(navigator) {
  // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * Set an attribute on an element, if it's a normal element
 * it will use setAttribute, if it's an LWC component
 * it will use the public property
 *
 * @param {HTMLElement} element The element to act on
 * @param {String} attribute the attribute to set
 * @param {Any} value the value to set
 */
function smartSetAttribute(element, attribute, value) {
  if (element.tagName.match(/^LIGHTNING/i)) {
    attribute = attribute.replace(/-\w/g, m => m[1].toUpperCase());
    element[attribute] = value ? value : null;
  } else if (value) {
    element.setAttribute(attribute, value);
  } else {
    element.removeAttribute(attribute);
  }
}

/**
 * @param {HTMLElement} element Element to act on
 * @param {Object} values values and attributes to set, if the value is
 *                        falsy it the attribute will be removed
 */

function synchronizeAttrs(element, values) {
  if (!element) {
    return;
  }

  const attributes = Object.keys(values);
  attributes.forEach(attribute => {
    smartSetAttribute(element, attribute, values[attribute]);
  });
}

/*
 * Regex to test a string for an ISO8601 Date. The following formats are matched.
 * Note that if a time element is present (e.g. 'T'), the string should have a time zone designator (Z or +hh:mm or -hh:mm).
 *
 *  YYYY
 *  YYYY-MM
 *  YYYY-MM-DD
 *  YYYY-MM-DDThh:mmTZD
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.STZD
 *
 *
 * @see: https://www.w3.org/TR/NOTE-datetime
 */
const ISO8601_STRICT_PATTERN = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z){1})?)?)?$/i;
/* Regex to test a string for an ISO8601 partial time or full time:
 * hh:mm
 * hh:mm:ss
 * hh:mm:ss.S
 * full time = partial time + TZD
 */

const ISO8601_TIME_PATTERN = /^\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
const STANDARD_TIME_FORMAT = 'HH:mm:ss.SSS';
const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
const TIME_SEPARATOR = 'T';
const TIMEZONE_INDICATOR = /(Z|([+-])(\d{2}):(\d{2}))$/;
function isValidISODateTimeString(dateTimeString) {
  return isValidISO8601String(dateTimeString) && isValidDate(dateTimeString);
}
function isValidISOTimeString(timeString) {
  if (!isValidISO8601TimeString(timeString)) {
    return false;
  }

  const timeOnly = removeTimeZoneSuffix(timeString);
  return isValidDate(`2018-09-09T${timeOnly}Z`);
}
function removeTimeZoneSuffix(dateTimeString) {
  if (typeof dateTimeString === 'string') {
    return dateTimeString.split(TIMEZONE_INDICATOR)[0];
  }

  return dateTimeString;
}

function isValidISO8601String(dateTimeString) {
  if (typeof dateTimeString !== 'string') {
    return false;
  }

  return ISO8601_STRICT_PATTERN.test(dateTimeString);
}

function isValidISO8601TimeString(timeString) {
  if (typeof timeString !== 'string') {
    return false;
  }

  return ISO8601_TIME_PATTERN.test(timeString);
}

function isValidDate(value) {
  // Date.parse returns NaN if the argument doesn't represent a valid date
  const timeStamp = Date.parse(value);
  return isFinite(timeStamp);
}

var _tmpl$1 = void 0;

var labelSecondsLater = 'in a few seconds';

var labelSecondsAgo = 'a few seconds ago';

const fallbackFutureLabel = 'in {0} {1}'; // e.g. in 1 minute

const fallbackPastLabel = '{0} {1} ago'; // e.g. 1 minute ago

const fallbackPluralSuffix = 's'; // plural suffix for the units, e.g. in 10 minutes
// The threshold values come from moment.js

const units = {
  SECONDS: {
    name: 'second',
    threshold: 45
  },
  // a few seconds to minute
  MINUTES: {
    name: 'minute',
    threshold: 45
  },
  // minutes to hour
  HOURS: {
    name: 'hour',
    threshold: 22
  },
  // hours to day
  DAYS: {
    name: 'day',
    threshold: 26
  },
  // days to month
  MONTHS: {
    name: 'month',
    threshold: 11
  },
  // months to year
  YEARS: {
    name: 'year'
  }
};
const SECOND_TO_MILLISECONDS = 1000;
const MINUTE_TO_MILLISECONDS = 6e4; // 60 * SECOND_TO_MILLISECONDS;

const HOUR_TO_MILLISECONDS = 36e5; // 60 * MINUTE_TO_MILLISECONDS

const DAY_TO_MILLISECONDS = 864e5; // 24 * HOUR_TO_MILLISECONDS;

class Duration {
  constructor(milliseconds) {
    this.milliseconds = 0;

    if (typeof milliseconds !== 'number') {
      this.isValid = false; // eslint-disable-next-line no-console

      console.warn(`The value of milliseconds passed into Duration must be of type number,
                but we are getting the ${typeof milliseconds} value "${milliseconds}" instead.
                `);
      return;
    }

    this.isValid = true;
    this.milliseconds = milliseconds;
  }

  humanize(locale) {
    if (!this.isValid) {
      return '';
    }

    const unit = findBestUnitMatch(this);

    if (unit === units.SECONDS) {
      const isLater = this.milliseconds > 0;
      return isLater ? labelSecondsLater : labelSecondsAgo;
    }

    return format(locale, this.asIn(unit), unit.name);
  }

  asIn(unit) {
    switch (unit) {
      case units.SECONDS:
        return Math.round(this.milliseconds / SECOND_TO_MILLISECONDS);

      case units.MINUTES:
        return Math.round(this.milliseconds / MINUTE_TO_MILLISECONDS);

      case units.HOURS:
        return Math.round(this.milliseconds / HOUR_TO_MILLISECONDS);

      case units.DAYS:
        return Math.round(this.milliseconds / DAY_TO_MILLISECONDS);

      case units.MONTHS:
        return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS));

      case units.YEARS:
      default:
        return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS) / 12);
    }
  }

}

registerDecorators(Duration, {
  fields: ["milliseconds"]
});

var Duration$1 = registerComponent(Duration, {
  tmpl: _tmpl$1
});

function daysToMonth(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  // 400 years have 12 months === 4800
  const daysToMonthRatio = 4800 / 146097;
  return days * daysToMonthRatio;
}

function findBestUnitMatch(duration) {
  // Traversing the object keys in order from Seconds to Years
  // http://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties
  const match = Object.keys(units).find(key => {
    const unit = units[key]; // Year is the max and doesn't have a threshold

    return unit === units.YEARS || Math.abs(duration.asIn(unit)) < unit.threshold;
  });
  return units[match];
}

function format(locale, value, unit) {
  if ('Intl' in window && Intl.RelativeTimeFormat) {
    const formatter = new Intl.RelativeTimeFormat(locale, {
      style: 'long',
      numeric: 'always'
    });
    return formatter.format(value, unit);
  }

  return fallbackFormatter(value, unit);
}

function fallbackFormatter(value, unit) {
  // eslint-disable-next-line no-console
  console.warn(`The current environment does not support formatters for relative time.`);
  const absoluteValue = Math.abs(value);
  const unitString = absoluteValue !== 1 ? unit + fallbackPluralSuffix : unit;
  const label = value > 0 ? fallbackFutureLabel : fallbackPastLabel;
  return formatLabel(label, absoluteValue, unitString);
}

// default implementation of localization service for en-US locale. This covers the current usage of the localizationService in the code base.
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE_FORMAT = {
  short: 'M/d/yyyy',
  medium: 'MMM d, yyyy',
  long: 'MMMM d, yyyy'
};
const TIME_FORMAT = {
  short: 'h:mm a',
  medium: 'h:mm:ss a',
  long: 'h:mm:ss a'
}; // The parseTime method normalizes the time format so that minor deviations are accepted

const TIME_FORMAT_SIMPLE = {
  short: 'h:m a',
  medium: 'h:m:s a',
  long: 'h:m:s a'
}; // Only works with dates and iso strings
// formats the date object by ignoring the timezone offset
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDate(date, 'YYYY-MM-DD') -> 2019-03-11

function formatDate(value, format) {
  let isUTC = false;
  let dateString = value;

  if (typeof value === 'string') {
    dateString = value.split(TIME_SEPARATOR)[0];
    isUTC = true;
  }

  return formatDateInternal(dateString, format, isUTC);
} // Only works with date objects.
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateUTC(date, 'YYYY-MM-DD') -> 2019-03-10


function formatDateUTC(value, format) {
  return formatDateInternal(value, format, true);
} // Only works with a date object


function formatTime(date, format) {
  if (!isDate(date)) {
    return new Date('');
  }

  const hours = (date.getHours() + 11) % 12 + 1;
  const suffix = date.getHours() >= 12 ? 'PM' : 'AM';

  switch (format) {
    case STANDARD_TIME_FORMAT:
      // 16:12:32.000
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${doublePad(date.getMilliseconds())}`;

    case TIME_FORMAT.short:
      // 4:12 PM;
      return `${hours}:${pad(date.getMinutes())} ${suffix}`;

    case TIME_FORMAT.medium:
    case TIME_FORMAT.long:
    default:
      // 4:12:32 PM;
      return `${hours}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${suffix}`;
  }
} // Only works with a date object
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateTimeUTC(date) -> 2019-03-10  1:00:00 PM


function formatDateTimeUTC(value) {
  if (!isDate(value)) {
    return new Date('');
  }

  const date = new Date(value.getTime());
  return `${formatDateUTC(date)}, ${formatTime(addTimezoneOffset(date))}`;
} // parses ISO8601 date/time strings. Currently only used to parse ISO time strings without a TZD. Some examples:
// 20:00:00.000             -> Feb 26 2019 20:00:00 GMT-0500
// 2019-03-11               -> Mar 11 2019 00:00:00 GMT-0400
// 2019-03-11T00:00:00.000Z -> Mar 10 2019 20:00:00 GMT-0400


function parseDateTimeISO8601(value) {
  let isoString = null;
  let shouldAddOffset = true;

  if (isValidISOTimeString(value)) {
    isoString = `${getTodayInISO()}T${addTimezoneSuffix(value)}`;
  } else if (isValidISODateTimeString(value)) {
    if (value.indexOf(TIME_SEPARATOR) > 0) {
      isoString = addTimezoneSuffix(value);
      shouldAddOffset = false;
    } else {
      isoString = `${value}T00:00:00.000Z`;
    }
  }

  if (isoString) {
    // Browsers differ on how they treat iso strings without a timezone offset (local vs utc time)
    const parsedDate = new Date(isoString);

    if (shouldAddOffset) {
      addTimezoneOffset(parsedDate);
    }

    return parsedDate;
  }

  return null;
} // called by the datepicker and calendar for parsing iso and formatted date strings
// called by the timepicker to parse the formatted time string


function parseDateTime(value, format) {
  if (format === STANDARD_DATE_FORMAT && isValidISODateTimeString(value)) {
    return parseDateTimeISO8601(value);
  }

  if (Object.values(DATE_FORMAT).includes(format)) {
    return parseFormattedDate(value, format);
  }

  if (Object.values(TIME_FORMAT_SIMPLE).includes(format)) {
    return parseFormattedTime(value);
  }

  return null;
} // The input to this method is always an ISO string with timezone offset.


function parseDateTimeUTC(value) {
  return parseDateTimeISO8601(addTimezoneSuffix(value));
}

function isBefore(date1, date2, unit) {
  const normalizedDate1 = getDate(date1);
  const normalizedDate2 = getDate(date2);

  if (!normalizedDate1 || !normalizedDate2) {
    return false;
  }

  return startOf(normalizedDate1, unit).getTime() < startOf(normalizedDate2, unit).getTime();
} // unit can be millisecond, minute, day


function isAfter(date1, date2, unit) {
  const normalizedDate1 = getDate(date1);
  const normalizedDate2 = getDate(date2);

  if (!normalizedDate1 || !normalizedDate2) {
    return false;
  }

  return startOf(normalizedDate1, unit).getTime() > startOf(normalizedDate2, unit).getTime();
} // We're not doing timezone conversion in the default config. Only converting from UTC to system timezone


function UTCToWallTime(date, timezone, callback) {
  const utcDate = new Date(date.getTime());
  callback(subtractTimezoneOffset(utcDate));
} // We're not doing timezone conversion in the default config. Only converting from system timezone to UTC


function WallTimeToUTC(date, timezone, callback) {
  const localDate = new Date(date.getTime());
  callback(addTimezoneOffset(localDate));
} // We're assuming en-US locale so we don't need translation between calendar systems


function translateToOtherCalendar(date) {
  return date;
} // We're assuming en-US locale so we don't need translation between calendar systems


function translateFromOtherCalendar(date) {
  return date;
} // We're assuming en-US locale so we don't need translation of digits


function translateToLocalizedDigits(input) {
  return input;
} // We're assuming en-US locale so we don't need translation of digits


function translateFromLocalizedDigits(input) {
  return input;
} // This is called from the numberFormat library when the value exceeds the safe length.
// We currently rely on aura to format large numbers


function getNumberFormat() {
  return {
    format: value => {
      // eslint-disable-next-line no-console
      console.warn(`The current environment does not support large numbers and the original value of ${value} will be returned.`);
      return value;
    }
  };
} // relativeDateTime (currently the only user of duration) uses unit="minutes"
// The default implementation here assumes the unit is always minutes.


function duration(minutes) {
  return new Duration$1(minutes * 60 * 1000);
}

function displayDuration(value) {
  return value.humanize('en');
} // parses a time string formatted in en-US locale i.e. h:mm:ss a


function parseFormattedTime(value) {
  // for time strings it's easier to just split on :.\s
  const values = value.trim().split(/[:.\s*]/); // at least two parts i.e. 12 PM, and at most 5 parts i.e. 12:34:21.432 PM

  const length = values.length;

  if (!values || length < 2 || length > 5) {
    return null;
  }

  const ampm = values[length - 1];
  const isBeforeNoon = ampm.toLowerCase() === 'am';
  const isAfternoon = ampm.toLowerCase() === 'pm'; // remove ampm

  values.splice(-1, 1);
  const allNumbers = values.every(item => !isNaN(item));

  if (!isAfternoon && !isBeforeNoon || !allNumbers) {
    return null;
  }

  const hours = values[0];
  const hour24 = pad(isAfternoon ? hours % 12 + 12 : hours % 12);
  const minutes = length >= 3 && values[1] || '0';
  const seconds = length >= 4 && values[2] || '0';
  const milliseconds = length === 5 && values[3] || '0';
  const newDate = new Date(getTodayInISO());
  newDate.setHours(hour24, minutes, seconds, milliseconds);
  return isDate(newDate) ? newDate : null;
} // parses a date string formatted in en-US locale, i.e. MMM d, yyyy


function parseFormattedDate(value, format) {
  // default to medium style pattern
  let pattern = /^([a-zA-Z]{3})\s*(\d{1,2}),\s*(\d{4})$/;

  switch (format) {
    case DATE_FORMAT.short:
      pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      break;

    case DATE_FORMAT.long:
      pattern = /^([a-zA-Z]+)\s*(\d{1,2}),\s*(\d{4})$/;
      break;
  } // matches[1]: month, matches[2]: day, matches[3]: year


  const match = pattern.exec(value.trim());

  if (!match) {
    return null;
  }

  let month = match[1];
  const day = match[2];
  const year = match[3]; // for long and medium style formats, we need to find the month index

  if (format !== DATE_FORMAT.short) {
    month = MONTH_NAMES.findIndex(item => item.toLowerCase().includes(month.toLowerCase())); // the actual month for the ISO string is 1 more than the index

    month += 1;
  }

  const isoValue = `${year}-${pad(month)}-${pad(day)}`;
  const newDate = new Date(`${isoValue}T00:00:00.000Z`);
  return isDate(newDate) ? addTimezoneOffset(newDate) : null;
}

function formatDateInternal(value, format, isUTC) {
  const date = getDate(value);

  if (!date) {
    // return Invalid Date
    return new Date('');
  }

  if (isUTC && isDate(value)) {
    // if value is an ISO string, we already add the timezone offset when parsing the date string.
    addTimezoneOffset(date);
  }

  switch (format) {
    case STANDARD_DATE_FORMAT:
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

    case DATE_FORMAT.short:
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    case DATE_FORMAT.long:
      return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    case DATE_FORMAT.medium:
    default:
      {
        const shortMonthName = MONTH_NAMES[date.getMonth()].substring(0, 3);
        return `${shortMonthName} ${date.getDate()}, ${date.getFullYear()}`;
      }
  }
} // unit can be 'day' or 'minute', otherwise will default to milliseconds. These are the only units that are currently used in the codebase.


function startOf(date, unit) {
  switch (unit) {
    case 'day':
      date.setHours(0);
      date.setMinutes(0);
    // falls through

    case 'minute':
      date.setSeconds(0);
      date.setMilliseconds(0);
      break;
  }

  return date;
}

function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
}

function addTimezoneSuffix(value) {
  // first remove TZD if the string has one, and then add Z
  return removeTimeZoneSuffix(value) + 'Z';
}

function addTimezoneOffset(date) {
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date;
}

function subtractTimezoneOffset(date) {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}

function getDate(value) {
  if (!value) {
    return null;
  }

  if (isDate(value)) {
    return new Date(value.getTime());
  }

  if (isFinite(value) && (typeof value === 'number' || typeof value === 'string')) {
    return new Date(parseInt(value, 10));
  }

  if (typeof value === 'string') {
    return parseDateTimeISO8601(value);
  }

  return null;
}

function getTodayInISO() {
  return new Date().toISOString().split('T')[0];
}

function pad(n) {
  return Number(n) < 10 ? '0' + n : n;
}

function doublePad(n) {
  return Number(n) < 10 ? '00' + n : Number(n) < 100 ? '0' + n : n;
}

var localizationService = {
  formatDate,
  formatDateUTC,
  formatTime,
  formatDateTimeUTC,
  parseDateTimeISO8601,
  parseDateTime,
  parseDateTimeUTC,
  isBefore,
  isAfter,
  UTCToWallTime,
  WallTimeToUTC,
  translateToOtherCalendar,
  translateFromOtherCalendar,
  translateToLocalizedDigits,
  translateFromLocalizedDigits,
  getNumberFormat,
  duration,
  displayDuration
};

function getConfigFromAura($A) {
  return {
    getLocalizationService() {
      return $A.localizationService;
    },

    getPathPrefix() {
      return $A.getContext().getPathPrefix();
    },

    getToken(name) {
      return $A.getToken(name);
    }

  };
}

function createStandAloneConfig() {
  return {
    getLocalizationService() {
      return localizationService;
    },

    getPathPrefix() {
      return ''; // @sfdc.playground path-prefix DO-NOT-REMOVE-COMMENT
    },

    getToken(name) {
      return name; // @sfdc.playground token DO-NOT-REMOVE-COMMENT
    },

    getOneConfig() {
      return {
        densitySetting: ''
      };
    }

  };
}

function getDefaultConfig() {
  return window.$A !== undefined && window.$A.localizationService ? getConfigFromAura(window.$A) : createStandAloneConfig();
}

let PROVIDED_IMPL = getDefaultConfig();
function getPathPrefix() {
  return PROVIDED_IMPL && PROVIDED_IMPL.getPathPrefix && PROVIDED_IMPL.getPathPrefix() || '';
}
function getToken(name) {
  return PROVIDED_IMPL && PROVIDED_IMPL.getToken && PROVIDED_IMPL.getToken(name);
}
function getIconSvgTemplates() {
  return PROVIDED_IMPL && PROVIDED_IMPL.iconSvgTemplates;
}

// Taken from https://github.com/jonathantneal/svg4everybody/pull/139
// Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
const inIframe = window.top !== window.self;
const isIframeInEdge = isEdgeUA && inIframe;
var isIframeInEdge$1 = registerComponent(isIframeInEdge, {
  tmpl: _tmpl$1
});

// Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
function fetchSvg(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr);
        }
      }
    };
  });
}

// Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
// Modify at your own risk!

const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
const webkitUA = /\bAppleWebKit\/(\d+)\b/;
const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
const supportsSvg = !isIE && !isIframeInEdge$1;
var supportsSvg$1 = registerComponent(supportsSvg, {
  tmpl: _tmpl$1
});

/**
This polyfill injects SVG sprites into the document for clients that don't
fully support SVG. We do this globally at the document level for performance
reasons. This causes us to lose namespacing of IDs across sprites. For example,
if both #image from utility sprite and #image from doctype sprite need to be
rendered on the page, both end up as #image from the doctype sprite (last one
wins). SLDS cannot change their image IDs due to backwards-compatibility
reasons so we take care of this issue at runtime by adding namespacing as we
polyfill SVG elements.

For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
replace the "#approval" id with "#${namespace}-approval" and a similar
operation is done on the corresponding symbol element.
**/
const svgTagName = /svg/i;

const isSvgElement = el => el && svgTagName.test(el.nodeName);

const requestCache = {};
const symbolEls = {};
const svgFragments = {};
const spritesContainerId = 'slds-svg-sprites';
let spritesEl;
function polyfill(el) {
  if (!supportsSvg$1 && isSvgElement(el)) {
    if (!spritesEl) {
      spritesEl = document.createElement('svg');
      spritesEl.xmlns = 'http://www.w3.org/2000/svg';
      spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
      spritesEl.style.display = 'none';
      spritesEl.id = spritesContainerId;
      document.body.insertBefore(spritesEl, document.body.childNodes[0]);
    }

    Array.from(el.getElementsByTagName('use')).forEach(use => {
      // We access the href differently in raptor and in aura, probably
      // due to difference in the way the svg is constructed.
      const src = use.getAttribute('xlink:href') || use.getAttribute('href');

      if (src) {
        // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
        // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
        const parts = src.split('#');
        const url = parts[0];
        const id = parts[1];
        const namespace = url.replace(/[^\w]/g, '-');
        const href = `#${namespace}-${id}`;

        if (url.length) {
          // set the HREF value to no longer be an external reference
          if (use.getAttribute('xlink:href')) {
            use.setAttribute('xlink:href', href);
          } else {
            use.setAttribute('href', href);
          } // only insert SVG content if it hasn't already been retrieved


          if (!requestCache[url]) {
            requestCache[url] = fetchSvg(url);
          }

          requestCache[url].then(svgContent => {
            // create a document fragment from the svgContent returned (is parsed by HTML parser)
            if (!svgFragments[url]) {
              const svgFragment = document.createRange().createContextualFragment(svgContent);
              svgFragments[url] = svgFragment;
            }

            if (!symbolEls[href]) {
              const svgFragment = svgFragments[url];
              const symbolEl = svgFragment.querySelector(`#${id}`);
              symbolEls[href] = true;
              symbolEl.id = `${namespace}-${id}`;
              spritesEl.appendChild(symbolEl);
            }
          });
        }
      }
    });
  }
}

const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
const underscoreRe = /_/g;
let pathPrefix;
const tokenNameMap = Object.assign(Object.create(null), {
  action: 'lightning.actionSprite',
  custom: 'lightning.customSprite',
  doctype: 'lightning.doctypeSprite',
  standard: 'lightning.standardSprite',
  utility: 'lightning.utilitySprite'
});
const tokenNameMapRtl = Object.assign(Object.create(null), {
  action: 'lightning.actionSpriteRtl',
  custom: 'lightning.customSpriteRtl',
  doctype: 'lightning.doctypeSpriteRtl',
  standard: 'lightning.standardSpriteRtl',
  utility: 'lightning.utilitySpriteRtl'
});
const defaultTokenValueMap = Object.assign(Object.create(null), {
  'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
  'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
  'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
  'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
  'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
  'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
  'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
  'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
  'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
  'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
});

const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];

const getBaseIconPath = (category, direction) => {
  const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
  return getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
};

const getMatchAtIndex = index => iconName => {
  const result = validNameRe.exec(iconName);
  return result ? result[index] : '';
};

const getCategory = getMatchAtIndex(1);
const getName = getMatchAtIndex(2);
const isValidName = iconName => validNameRe.test(iconName);
const getIconPath = (iconName, direction = 'ltr') => {
  pathPrefix = pathPrefix !== undefined ? pathPrefix : getPathPrefix();

  if (isValidName(iconName)) {
    const baseIconPath = getBaseIconPath(getCategory(iconName), direction);

    if (baseIconPath) {
      // This check was introduced the following MS-Edge issue:
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
      // If and when this get fixed, we can safely remove this block of code.
      if (isIframeInEdge$1) {
        // protocol => 'https:' or 'http:'
        // host => hostname + port
        const origin = `${window.location.protocol}//${window.location.host}`;
        return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
      }

      return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
    }
  }

  return '';
};
const computeSldsClass = iconName => {
  if (isValidName(iconName)) {
    const category = getCategory(iconName);
    const name = getName(iconName).replace(underscoreRe, '-');
    return `slds-icon-${category}-${name}`;
  }

  return '';
};

class LightningPrimitiveIcon extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.iconName = void 0;
    this.src = void 0;
    this.svgClass = void 0;
    this.size = 'medium';
    this.variant = void 0;
    this.privateIconSvgTemplates = getIconSvgTemplates();
  }

  get inlineSvgProvided() {
    return !!this.privateIconSvgTemplates;
  }

  renderedCallback() {
    if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
      this.prevIconName = this.iconName;
      const svgElement = this.template.querySelector('svg');
      polyfill(svgElement);
    }
  }

  get href() {
    return this.src || getIconPath(this.iconName, dir);
  }

  get name() {
    return getName(this.iconName);
  }

  get normalizedSize() {
    return normalizeString(this.size, {
      fallbackValue: 'medium',
      validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
    });
  }

  get normalizedVariant() {
    // NOTE: Leaving a note here because I just wasted a bunch of time
    // investigating why both 'bare' and 'inverse' are supported in
    // lightning-primitive-icon. lightning-icon also has a deprecated
    // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
    // that no classes should be applied. So this component needs to
    // support both 'bare' and 'inverse' while lightning-icon only needs to
    // support 'inverse'.
    return normalizeString(this.variant, {
      fallbackValue: '',
      validValues: ['bare', 'error', 'inverse', 'warning', 'success']
    });
  }

  get computedClass() {
    const {
      normalizedSize,
      normalizedVariant
    } = this;
    const classes = classSet(this.svgClass);

    if (normalizedVariant !== 'bare') {
      classes.add('slds-icon');
    }

    switch (normalizedVariant) {
      case 'error':
        classes.add('slds-icon-text-error');
        break;

      case 'warning':
        classes.add('slds-icon-text-warning');
        break;

      case 'success':
        classes.add('slds-icon-text-success');
        break;

      case 'inverse':
      case 'bare':
        break;

      default:
        // if custom icon is set, we don't want to set
        // the text-default class
        if (!this.src) {
          classes.add('slds-icon-text-default');
        }

    }

    if (normalizedSize !== 'medium') {
      classes.add(`slds-icon_${normalizedSize}`);
    }

    return classes.toString();
  }

  resolveTemplate() {
    const name = this.iconName;

    if (isValidName(name)) {
      const [spriteName, iconName] = name.split(':');
      const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];

      if (template) {
        return template;
      }
    }

    return _tmpl;
  }

  render() {
    if (this.inlineSvgProvided) {
      return this.resolveTemplate();
    }

    return _tmpl;
  }

}

registerDecorators(LightningPrimitiveIcon, {
  publicProps: {
    iconName: {
      config: 0
    },
    src: {
      config: 0
    },
    svgClass: {
      config: 0
    },
    size: {
      config: 0
    },
    variant: {
      config: 0
    }
  },
  fields: ["privateIconSvgTemplates"]
});

var _lightningPrimitiveIcon = registerComponent(LightningPrimitiveIcon, {
  tmpl: _tmpl
});

function tmpl$1($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    h: api_element
  } = $api;
  return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.state.iconName,
      "size": $cmp.size,
      "variant": $cmp.variant,
      "src": $cmp.state.src
    },
    key: 0
  }, []), $cmp.alternativeText ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_dynamic($cmp.alternativeText)]) : null];
}

var _tmpl$2 = registerTemplate(tmpl$1);
tmpl$1.stylesheets = [];
tmpl$1.stylesheetTokens = {
  hostAttribute: "lightning-icon_icon-host",
  shadowAttribute: "lightning-icon_icon"
};

/**
 * Represents a visual element that provides context and enhances usability.
 */

class LightningIcon extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.state = {};
    this.alternativeText = void 0;
  }

  /**
   * A uri path to a custom svg sprite, including the name of the resouce,
   * for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart
   * @type {string}
   */
  get src() {
    return this.privateSrc;
  }

  set src(value) {
    this.privateSrc = value; // if value is not present, then we set the state back
    // to the original iconName that was passed
    // this might happen if the user sets a custom icon, then
    // decides to revert back to SLDS by removing the src attribute

    if (!value) {
      this.state.iconName = this.iconName;
      this.classList.remove('slds-icon-standard-default');
    } // if isIE11 and the src is set
    // we'd like to show the 'standard:default' icon instead
    // for performance reasons.


    if (value && isIE11) {
      this.setDefault();
      return;
    }

    this.state.src = value;
  }
  /**
   * The Lightning Design System name of the icon.
   * Names are written in the format 'utility:down' where 'utility' is the category,
   * and 'down' is the specific icon to be displayed.
   * @type {string}
   * @required
   */


  get iconName() {
    return this.privateIconName;
  }

  set iconName(value) {
    this.privateIconName = value; // if src is set, we don't need to validate
    // iconName

    if (this.src) {
      return;
    }

    if (isValidName(value)) {
      const isAction = getCategory(value) === 'action'; // update classlist only if new iconName is different than state.iconName
      // otherwise classListMutation receives class:true and class: false and removes slds class

      if (value !== this.state.iconName) {
        classListMutation(this.classList, {
          'slds-icon_container_circle': isAction,
          [computeSldsClass(value)]: true,
          [computeSldsClass(this.state.iconName)]: false
        });
      }

      this.state.iconName = value;
    } else {
      console.warn(`<lightning-icon> Invalid icon name ${value}`); // eslint-disable-line no-console
      // Invalid icon names should render a blank icon. Remove any
      // classes that might have been previously added.

      classListMutation(this.classList, {
        'slds-icon_container_circle': false,
        [computeSldsClass(this.state.iconName)]: false
      });
      this.state.iconName = undefined;
    }
  }
  /**
   * The size of the icon. Options include xx-small, x-small, small, medium, or large.
   * The default is medium.
   * @type {string}
   * @default medium
   */


  get size() {
    return normalizeString(this.state.size, {
      fallbackValue: 'medium',
      validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
    });
  }

  set size(value) {
    this.state.size = value;
  }
  /**
   * The variant changes the appearance of a utility icon.
   * Accepted variants include inverse, success, warning, and error.
   * Use the inverse variant to implement a white fill in utility icons on dark backgrounds.
   * @type {string}
   */


  get variant() {
    return normalizeVariant(this.state.variant, this.state.iconName);
  }

  set variant(value) {
    this.state.variant = value;
  }

  connectedCallback() {
    this.classList.add('slds-icon_container');
  }

  setDefault() {
    this.state.src = undefined;
    this.state.iconName = 'standard:default';
    this.classList.add('slds-icon-standard-default');
  }

}

registerDecorators(LightningIcon, {
  publicProps: {
    alternativeText: {
      config: 0
    },
    src: {
      config: 3
    },
    iconName: {
      config: 3
    },
    size: {
      config: 3
    },
    variant: {
      config: 3
    }
  },
  track: {
    state: 1
  }
});

var _lightningIcon = registerComponent(LightningIcon, {
  tmpl: _tmpl$2
});

function normalizeVariant(variant, iconName) {
  // Unfortunately, the `bare` variant was implemented to do what the
  // `inverse` variant should have done. Keep this logic for as long as
  // we support the `bare` variant.
  if (variant === 'bare') {
    // TODO: Deprecation warning using strippable assertion
    variant = 'inverse';
  }

  if (getCategory(iconName) === 'utility') {
    return normalizeString(variant, {
      fallbackValue: '',
      validValues: ['error', 'inverse', 'warning', 'success']
    });
  }

  return 'inverse';
}

function tmpl$2($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    h: api_element,
    d: api_dynamic,
    s: api_slot
  } = $api;
  return [api_element("article", {
    className: $cmp.computedWrapperClassNames,
    key: 14
  }, [api_element("div", {
    classMap: {
      "slds-card__header": true,
      "slds-grid": true
    },
    key: 9
  }, [api_element("header", {
    classMap: {
      "slds-media": true,
      "slds-media_center": true,
      "slds-has-flexi-truncate": true
    },
    key: 8
  }, [$cmp.hasIcon ? api_element("div", {
    classMap: {
      "slds-media__figure": true
    },
    key: 1
  }, [api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": $cmp.iconName,
      "size": "small"
    },
    key: 0
  }, [])]) : null, api_element("div", {
    classMap: {
      "slds-media__body": true
    },
    key: 5
  }, [api_element("h2", {
    classMap: {
      "slds-card__header-title": true
    },
    key: 4
  }, [api_element("span", {
    classMap: {
      "slds-text-heading_small": true,
      "slds-truncate": true
    },
    key: 3
  }, [$cmp.hasStringTitle ? api_dynamic($cmp.title) : null, !$cmp.hasStringTitle ? api_slot("title", {
    attrs: {
      "name": "title"
    },
    key: 2
  }, [], $slotset) : null])])]), api_element("div", {
    classMap: {
      "slds-no-flex": true
    },
    key: 7
  }, [api_slot("actions", {
    attrs: {
      "name": "actions"
    },
    key: 6
  }, [], $slotset)])])]), api_element("div", {
    classMap: {
      "slds-card__body": true
    },
    key: 11
  }, [api_slot("", {
    key: 10
  }, [], $slotset)]), $cmp.showFooter ? api_element("div", {
    classMap: {
      "slds-card__footer": true
    },
    key: 13
  }, [api_slot("footer", {
    attrs: {
      "name": "footer"
    },
    key: 12
  }, [], $slotset)]) : null])];
}

var _tmpl$3 = registerTemplate(tmpl$2);
tmpl$2.slots = ["title", "actions", "", "footer"];
tmpl$2.stylesheets = [];
tmpl$2.stylesheetTokens = {
  hostAttribute: "lightning-card_card-host",
  shadowAttribute: "lightning-card_card"
};

function isNarrow(variant) {
  return typeof variant === 'string' && variant.toLowerCase() === 'narrow';
}
function isBase(variant) {
  return typeof variant === 'string' && variant.toLowerCase() === 'base';
}

/**
 * Cards apply a container around a related grouping of information.
 * @slot title Placeholder for the card title, which can be represented by a header or h1 element.
 * The title is displayed at the top of the card, after the icon.
 * Alternatively, use the title attribute if you don't need to pass in extra markup in your title.
 * @slot actions Placeholder for actionable components, such as lightning-button or lightning-button-menu.
 * Actions are displayed on the top corner of the card after the title.
 * @slot footer Placeholder for the card footer, which is displayed at the bottom of the card and is usually optional.
 * For example, the footer can display a "View All" link to navigate to a list view.
 * @slot default Placeholder for your content in the card body.
 */

class LightningCard extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.title = void 0;
    this.iconName = void 0;
    this.privateVariant = 'base';
    this.showFooter = true;
  }

  set variant(value) {
    if (isNarrow(value) || isBase(value)) {
      this.privateVariant = value;
    } else {
      this.privateVariant = 'base';
    }
  }
  /**
   * The variant changes the appearance of the card.
   * Accepted variants include base or narrow.
   * This value defaults to base.
   *
   * @type {string}
   * @default base
   */


  get variant() {
    return this.privateVariant;
  }

  renderedCallback() {
    // initial check for no items
    if (this.footerSlot) {
      this.showFooter = this.footerSlot.assignedElements().length !== 0;
    }
  }

  get footerSlot() {
    return this.template.querySelector('slot[name=footer]');
  }

  get computedWrapperClassNames() {
    return classSet('slds-card').add({
      'slds-card_narrow': isNarrow(this.privateVariant)
    });
  }

  get hasIcon() {
    return !!this.iconName;
  }

  get hasStringTitle() {
    return !!this.title;
  }

}

registerDecorators(LightningCard, {
  publicProps: {
    title: {
      config: 0
    },
    iconName: {
      config: 0
    },
    variant: {
      config: 3
    }
  },
  track: {
    privateVariant: 1,
    showFooter: 1
  }
});

var _lightningCard = registerComponent(LightningCard, {
  tmpl: _tmpl$3
});

function tmpl$3($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "name": $cmp.name,
      "accesskey": $cmp.computedAccessKey,
      "title": $cmp.computedTitle,
      "type": $cmp.normalizedType,
      "value": $cmp.value,
      "aria-label": $cmp.computedAriaLabel,
      "aria-expanded": $cmp.computedAriaExpanded,
      "aria-live": $cmp.computedAriaLive,
      "aria-atomic": $cmp.computedAriaAtomic
    },
    props: {
      "disabled": $cmp.disabled
    },
    key: 2,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
      "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
    }
  }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 0
  }, []) : null, api_dynamic($cmp.label), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 1
  }, []) : null])];
}

var _tmpl$4 = registerTemplate(tmpl$3);
tmpl$3.stylesheets = [];
tmpl$3.stylesheetTokens = {
  hostAttribute: "lightning-button_button-host",
  shadowAttribute: "lightning-button_button"
};

function tmpl$4($api, $cmp, $slotset, $ctx) {
  return [];
}

var _tmpl$5 = registerTemplate(tmpl$4);
tmpl$4.stylesheets = [];
tmpl$4.stylesheetTokens = {
  hostAttribute: "lightning-primitiveButton_primitiveButton-host",
  shadowAttribute: "lightning-primitiveButton_primitiveButton"
};

const ARIA_DESCRIBEDBY = 'aria-describedby';
const ARIA_CONTROLS = 'aria-controls';
/**
 * Primitive for button, buttonIcon and buttonIconStateful
 */

class LightningPrimitiveButton extends BaseLightningElement {
  /**
   * Specifies whether this button should be displayed in a disabled state.
   * Disabled buttons can't be clicked. This value defaults to false.
   *
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.state.disabled;
  }

  set disabled(value) {
    this.state.disabled = normalizeBoolean(value);
  }

  set accessKey(value) {
    this.state.accesskey = value;
  }
  /**
   * Specifies a shortcut key to activate or focus an element.
   *
   * @type {string}
   */


  get accessKey() {
    return this.state.accesskey;
  }

  get computedAccessKey() {
    return this.state.accesskey;
  }
  /**
   * Displays tooltip text when the mouse cursor moves over the element.
   *
   * @type {string}
   */


  get title() {
    return this.state.title;
  }

  set title(value) {
    this.state.title = value;
  }
  /**
   * Label describing the button to assistive technologies.
   *
   * @type {string}
   */


  get ariaLabel() {
    return this.state.ariaLabel;
  }

  set ariaLabel(value) {
    this.state.ariaLabel = value;
  }

  get computedAriaLabel() {
    return this.state.ariaLabel;
  }
  /**
   * A space-separated list of element IDs that provide descriptive labels for the button.
   *
   * @type {string}
   */


  get ariaDescribedBy() {
    return this.state.ariaDescribedBy;
  }

  set ariaDescribedBy(value) {
    this.state.ariaDescribedBy = value;
    const button = this.template.querySelector('button');
    synchronizeAttrs(button, {
      [ARIA_DESCRIBEDBY]: value
    });
  }
  /**
   * A space-separated list of element IDs whose presence or content is controlled by this button.
   *
   * @type {string}
   */


  get ariaControls() {
    return this.state.ariaControls;
  }

  set ariaControls(value) {
    this.state.ariaControls = value;
    const button = this.template.querySelector('button');
    synchronizeAttrs(button, {
      [ARIA_CONTROLS]: value
    });
  }
  /**
   * Indicates whether an element that the button controls is expanded or collapsed.
   * Valid values are 'true' or 'false'. The default value is undefined.
   *
   * @type {string}
   * @default undefined
   */


  get ariaExpanded() {
    return this.state.ariaExpanded;
  }

  set ariaExpanded(value) {
    this.state.ariaExpanded = normalizeString(value, {
      fallbackValue: undefined,
      validValues: ['true', 'false']
    });
  }

  get computedAriaExpanded() {
    return this.state.ariaExpanded || null;
  }

  set ariaLive(value) {
    this.state.ariaLive = value;
  }
  /**
   * Indicates that the button can be updated when it doesn't have focus.
   * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
   * technologies to notify users of updates at a low priority, generally without interrupting.
   * The assertive value causes assistive technologies to notify users immediately,
   * potentially clearing queued speech updates.
   *
   * @type {string}
   */


  get ariaLive() {
    return this.state.ariaLive;
  }

  get computedAriaLive() {
    return this.state.ariaLive;
  }
  /**
   * Indicates whether assistive technologies present all, or only parts of,
   * the changed region. Valid values are 'true' or 'false'.
   *
   * @type {string}
   */


  get ariaAtomic() {
    return this.state.ariaAtomic || null;
  }

  set ariaAtomic(value) {
    this.state.ariaAtomic = normalizeString(value, {
      fallbackValue: undefined,
      validValues: ['true', 'false']
    });
  }

  get computedAriaAtomic() {
    return this.state.ariaAtomic || null;
  }
  /**
   * Sets focus on the element.
   */


  focus() {}

  constructor() {
    super(); // Workaround for an IE11 bug where click handlers on button ancestors
    // receive the click event even if the button element has the `disabled`
    // attribute set.

    this._initialized = false;
    this.state = {
      accesskey: null,
      ariaAtomic: null,
      ariaControls: null,
      ariaDescribedBy: null,
      ariaExpanded: null,
      ariaLabel: null,
      ariaLive: null,
      disabled: false
    };

    if (isIE11) {
      this.template.addEventListener('click', event => {
        if (this.disabled) {
          event.stopImmediatePropagation();
        }
      });
    }
  }

  renderedCallback() {
    if (!this._initialized) {
      const button = this.template.querySelector('button');
      synchronizeAttrs(button, {
        [ARIA_CONTROLS]: this.state.ariaControls,
        [ARIA_DESCRIBEDBY]: this.state.ariaDescribedBy
      });
      this._initialized = true;
    }
  }

}

registerDecorators(LightningPrimitiveButton, {
  publicProps: {
    disabled: {
      config: 3
    },
    accessKey: {
      config: 3
    },
    title: {
      config: 3
    },
    ariaLabel: {
      config: 3
    },
    ariaDescribedBy: {
      config: 3
    },
    ariaControls: {
      config: 3
    },
    ariaExpanded: {
      config: 3
    },
    ariaLive: {
      config: 3
    },
    ariaAtomic: {
      config: 3
    }
  },
  publicMethods: ["focus"],
  track: {
    state: 1
  },
  fields: ["_initialized"]
});

var LightningPrimitiveButton$1 = registerComponent(LightningPrimitiveButton, {
  tmpl: _tmpl$5
});

/**
 * A clickable element used to perform an action.
 */

class LightningButton extends LightningPrimitiveButton$1 {
  constructor(...args) {
    super(...args);
    this.name = void 0;
    this.value = void 0;
    this.label = void 0;
    this.variant = 'neutral';
    this.iconName = void 0;
    this.iconPosition = 'left';
    this.type = 'button';
    this.title = null;
    this._order = null;
  }

  render() {
    return _tmpl$4;
  }

  get computedButtonClass() {
    return classSet('slds-button').add({
      'slds-button_neutral': this.normalizedVariant === 'neutral',
      'slds-button_brand': this.normalizedVariant === 'brand',
      'slds-button_outline-brand': this.normalizedVariant === 'brand-outline',
      'slds-button_destructive': this.normalizedVariant === 'destructive',
      'slds-button_text-destructive': this.normalizedVariant === 'destructive-text',
      'slds-button_inverse': this.normalizedVariant === 'inverse',
      'slds-button_success': this.normalizedVariant === 'success',
      'slds-button_first': this._order === 'first',
      'slds-button_middle': this._order === 'middle',
      'slds-button_last': this._order === 'last'
    }).toString();
  }

  get computedTitle() {
    return this.title;
  }

  get normalizedVariant() {
    return normalizeString(this.variant, {
      fallbackValue: 'neutral',
      validValues: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
    });
  }

  get normalizedType() {
    return normalizeString(this.type, {
      fallbackValue: 'button',
      validValues: ['button', 'reset', 'submit']
    });
  }

  get normalizedIconPosition() {
    return normalizeString(this.iconPosition, {
      fallbackValue: 'left',
      validValues: ['left', 'right']
    });
  }

  get showIconLeft() {
    return this.iconName && this.normalizedIconPosition === 'left';
  }

  get showIconRight() {
    return this.iconName && this.normalizedIconPosition === 'right';
  }

  get computedIconClass() {
    return classSet('slds-button__icon').add({
      'slds-button__icon_left': this.normalizedIconPosition === 'left',
      'slds-button__icon_right': this.normalizedIconPosition === 'right'
    }).toString();
  }

  handleButtonFocus() {
    this.dispatchEvent(new CustomEvent('focus'));
  }

  handleButtonBlur() {
    this.dispatchEvent(new CustomEvent('blur'));
  }
  /**
   * Sets focus on the button.
   */


  focus() {
    if (this._connected) {
      this.template.querySelector('button').focus();
    }
  }
  /**
   * Clicks the button.
   */


  click() {
    if (this._connected) {
      this.template.querySelector('button').click();
    }
  }
  /**
   * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
   * @param {String} order -  The order string (first, middle, last)
   */


  setOrder(order) {
    this._order = order;
  }
  /**
   * Once we are connected, we fire a register event so the button-group (or other) component can register
   * the buttons.
   */


  connectedCallback() {
    this._connected = true;
    const privatebuttonregister = new CustomEvent('privatebuttonregister', {
      bubbles: true,
      detail: {
        callbacks: {
          setOrder: this.setOrder.bind(this),
          setDeRegistrationCallback: deRegistrationCallback => {
            this._deRegistrationCallback = deRegistrationCallback;
          }
        }
      }
    });
    this.dispatchEvent(privatebuttonregister);
  }

  renderedCallback() {
    // initialize aria attributes in primitiveButton
    super.renderedCallback(); // button is inherit from primitiveButton, button.css not working in this case.
    // change host style to disable pointer event.

    this.template.host.style.pointerEvents = this.disabled ? 'none' : '';
  }

  disconnectedCallback() {
    this._connected = false;

    if (this._deRegistrationCallback) {
      this._deRegistrationCallback();
    }
  }

}

LightningButton.delegatesFocus = true;

registerDecorators(LightningButton, {
  publicProps: {
    name: {
      config: 0
    },
    value: {
      config: 0
    },
    label: {
      config: 0
    },
    variant: {
      config: 0
    },
    iconName: {
      config: 0
    },
    iconPosition: {
      config: 0
    },
    type: {
      config: 0
    }
  },
  publicMethods: ["focus", "click"],
  track: {
    title: 1,
    _order: 1
  }
});

var _lightningButton = registerComponent(LightningButton, {
  tmpl: _tmpl$4
});
LightningButton.interopMap = {
  exposeNativeEvent: {
    click: true,
    focus: true,
    blur: true
  }
};

function tmpl$5($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element
  } = $api;
  return [api_custom_element("lightning-card", _lightningCard, {
    props: {
      "title": "Hello, this is LWC on Code Sandbox!"
    },
    key: 1
  }, [api_custom_element("lightning-button", _lightningButton, {
    props: {
      "label": "click me!"
    },
    key: 0
  }, [])])];
}

var _tmpl$6 = registerTemplate(tmpl$5);
tmpl$5.stylesheets = [];

if (_implicitStylesheets) {
  tmpl$5.stylesheets.push.apply(tmpl$5.stylesheets, _implicitStylesheets);
}
tmpl$5.stylesheetTokens = {
  hostAttribute: "foo-app_app-host",
  shadowAttribute: "foo-app_app"
};

class FooApp extends BaseLightningElement {}

var FooApp$1 = registerComponent(FooApp, {
  tmpl: _tmpl$6
});

document.querySelector('#main').appendChild(createElement('foo-app', {
  is: FooApp$1
}));
