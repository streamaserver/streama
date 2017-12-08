//= wrapped

_.mixin({
	formatString: formatString,
  formatStringEx: formatStringEx,
  joinBy: joinBy,
  joinCompact: joinCompact,
  joinCompactBy: joinCompactBy,
  asArray: asArray,
  getterSetter: getterSetter,
  watcher: watcher,
	replaceAll: replaceAll,
  isHex: isHex,
  href: href,
  objectToParams: objectToParams,
  formatFileSize: formatFileSize,
  pickDeep: pickDeep,
  isNamedFunction: isNamedFunction,
  isEqualBy: isEqualBy,
  rgbToHex: rgbToHex,
  findAndGetNext: findAndGetNext,
  findAndGetPrev: findAndGetPrev,
  subString: subString,
	acronym: acronym,
	isjQuery: isjQuery,
  randomInt: randomInt,
  randomFloat: randomFloat,
  randomBool: randomBool,
  isLikeNumber: isLikeNumber,
  hasValue: hasValue,
  or: or,
  compactStrict: compactStrict,
  orStrict: orStrict,
  isColorExp: isColorExp,
  hasOneOf: hasOneOf,
  maxWith: maxWith,
  tryParseNumber: tryParseNumber,
  clean: clean,
  keyByValue: keyByValue,
  deleteKeys: deleteKeys,
  deleteAllKeys: deleteAllKeys,
  hasKeys: hasKeys,
  changes: changes,
  joinKeyValues: joinKeyValues,
  guid: guid,
  insertOrReplaceBy: insertOrReplaceBy,
  insertOrUpdateBy: insertOrUpdateBy,
  spliceBy: spliceBy,
  updateBy: updateBy,
  removeAt: removeAt,
  move: move,
  toBlob: toBlob,
  getAspectRatio: getAspectRatio,
  gcd: gcd,
  parseUrl: parseUrl,
  extendUrlParams: extendUrlParams,
  splitToMap: splitToMap,
  search: search,
  keyByRemapValues: keyByRemapValues,
  remap: remap,
  pickValues: pickValues,
  filterByValues: filterByValues,
  bytes: bytes
});

/**
 * Replaces matching index tokens with value from arguments or array.
 *
 * @static
 * @memberOf _
 * @param {string} format - The string with replacement tokens.
 * @param {...string | string[] | object} tokens - The data used for the tokens to populate the format string.
 * @returns {string} The string with replaced tokens.
 * @example
 * _.formatString('Hallo {0}!', 'Welt') => 'Hallo Welt!'
 */
function formatString(format, tokens) {
  var values = [];

  if(_.isArray(tokens) || _.isObject(tokens)) {
    values = tokens;
  } else {
    values = _.takeRight(arguments, arguments.length - 1);
  }

  _.forEach(values, function(value, key) {
    format = _.replace(format, '{' + key + '}', _.isUndefined(value) ? '' : _.toString(value));
  });

  return format;
}

/**
 * Replaces matches for path tokens surrounded by single curly brackets in string with value from object. See _.get for path usage.
 *
 * @static
 * @memberOf _
 * @param {string} format - The string with replacement tokens.
 * @param {...*} data - The data used for the tokens to populate the format string.
 * @returns {string} The string with replaced tokens.
 * @example
 * _.formatStringEx('Hallo {[0]}!', 'Welt') => 'Hallo Welt!'
 */
function formatStringEx(format, data) {
  if(arguments.length > 2) {
    data = _.takeRight(arguments, arguments.length - 1);
  } else if (!(_.isArray(data) || _.isObject(data))) {
    data = [data];
  }

  return _.replace(format, /{(.+?)}/g, function(match, token) {
    return _.get(data, token);
  });
}


function joinBy(array, separator, iteratee) {
  return _.join(_.map(_.asArray(array), iteratee), separator);
}

function joinCompact(array, separator) {
  return _.join(_.compact(array), separator);
}

function joinCompactBy(array, separator, iteratee) {
  return _.join(_.map(_.compact(array), iteratee), separator);
}

function asArray(value) {
  return _.clean(_.isArray(value) ? value : [value]);
}

/**
 * Creates a ready to use GetSet-Function for ngModels with getterSetter option.
 *
 * @static
 * @memberOf _
 * @param {function} [onSet] - The function callback for setting the value.
 * @param {function} [onGet] - The function callback for getting the value.
 * @param {*|function} [value] - The default value for this GetSet-Function. Can be the value or a function which returns the value.
 * @returns {function} The GetSet-Function.
 */
function getterSetter(onSet, onGet, value) {
  value = (_.isFunction(value) ? value() : value);

  return function getterSetter(newValue) {
    if(arguments.length) {
      value = (_.isFunction(onSet) ? onSet(newValue, value) : newValue);
    }

    return (_.isFunction(onGet) ? onGet(value) : value);
  };
}

function watcher(onGet, onChange, interval, shouldDispose) {
  var lastValue;

  var timerId = setInterval(function() {
    var value = onGet();

    if(_.isFunction(shouldDispose) && shouldDispose()) {
      clearInterval(timerId);
    } else if(lastValue !== value) {
      lastValue = onChange(value, lastValue) || value;
    }
  }, interval || 100);

  return function() {
    clearInterval(timerId);
  };
}

function replaceAll(original, search, replacement) {
  return original.split(search).join(replacement);
}

function isHex(value) {
  return value.match(/^#(?:[0-9a-f]{3}){1,2}$/i);
}

function href(baseUrl, params) {
  var paramString = _.objectToParams(params);
  return baseUrl + (paramString ? '?' + paramString : '');
}

function objectToParams(params) {
  var paramMap = [];

  _.forEach(params, function(value, key) {
    if(_.isArray(value)) {
      _.forEach(value, function(value) {
        paramMap.push(createMapValue(key, value));
      });
    } else {
      paramMap.push(createMapValue(key, value));
    }
  });

  return (paramMap.length ? _.join(_.clean(paramMap), '&') : '');

  function createMapValue(key, value) {
    return (!_.isUndefined(key) && !_.isUndefined(value) ? encodeURIComponent(key) + '=' + encodeURIComponent(value) : null);
  }
}

function parseUrl(url) {
  var regex = /[?&]([^=#]+)=([^&#]*)/g;
  var params = {};
  var match;

  while((match = regex.exec(url))) {
    var key = decodeURIComponent(match[1]);
    var value = decodeURIComponent(match[2]);

    if(_.isLikeNumber(value)) {
      value = _.toNumber(value);
    } else switch(_.toLower(value)) {
      case 'true':
        value = true;
        break;
      case 'false':
        value = false;
        break;
      default:break;
    }

    if(_.has(params, key)) {
      if(_.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }
  }

  return {
    path: _.first(_.split(url, '?')),
    params: params
  };
}

function extendUrlParams(url, params) {
  var _url = _.parseUrl(url);
  return _url.path + '?' + _.objectToParams(angular.extend(_url.params, params));
}

/**
 * Formats a file size to a more readable string.
 * For better understanding read the sections "Main memory" and "Disk drives" at "https://en.wikipedia.org/wiki/Binary_prefix"
 *
 * @static
 * @memberOf _
 * @param {number} bytes - The size of the file in bytes.
 * @param {string} [unit='iec'] - The format of the output.
 * @param {number} [fraction=2] - The fraction of floating numbers
 * @returns {string | undefined} The formatted file size.
 * @example
 * _.formatFileSize(1000000, 'iec'); => '976.56 KiB'
 * _.formatFileSize(1000000, 'si'); => '1 MB'
 * _.formatFileSize(1000000, 'ip'); => '976.56 KB'
 */
function formatFileSize(bytes, unit, fraction){
  if(_.isNumber(bytes)) {
    var factors = {
      'si': [1000, 'k', 'B'], // International System of Units (SI) (base 10)
      'iec': [1024, 'K', 'iB'], // International Electrotechnical Commission (IEC) (base 2)
      'ip': [1024, 'K', 'B'] // Industry Practice (base 2)
    };

    var factor = factors[_.toLower(unit)] || factors.ip;
    /*jshint -W016 */
    var a = Math.log(bytes) / Math.log(factor[0]) | 0;
    /*jshint +W016 */
    var value = (bytes / Math.pow(factor[0], a));

    return _.formatStringEx('{value} {unit}', {
      value: (a ? value.toFixed(_.isUndefined(fraction) ? 2 : fraction) : value),
      unit: (a ? (factor[1] + 'MGTPEZY')[--a] + factor[2] : 'Bytes')
    });
  }

  return undefined;
}

/**
 * This method is like _.pick except that it recursively retrieves the values.
 *
 * @static
 * @memberOf _
 * @param {object} object - The source object.
 * @param {...(string|string[])} paths - The property paths to pick.
 * @param {number} [limit] - The maximal path depth where values are picked, after that full objects are taken. Has to be greater than 0 to take effect.
 * @returns {object} The new object.
 * @example
 *
 * var data = {a: 1, b: {a: 1, b: 2, c: {a: 1, b: 2}}};
 *
 * _.pickDeep(data, 'b.c.a');
 * // => {b: {c: {a: 1}}}
 *
 * _.pickDeep(data, 'b.c.a', 1);
 * // => {b: {a: 1, b: 2, c: {a: 1, b: 2}}}
 *
 * _.pickDeep(data, 'b.c.a', 2);
 * // => {b: {c: {a: 1, b: 2}}}
 */
function pickDeep(object, paths, limit) {
  var result = {};

  if(_.isString(paths)) {
    paths = [paths];
  }

  if(_.isArray(paths)) {
    _.forEach(paths, function(path) {
      if(_.isNumber(limit) && limit > 0) {
        path = _.join(_.split(path, '.', limit), '.');
      }

      _.set(result, path, _.get(object, path));
    });
  }

  return result;
}

/**
 * Checks if a function is anonymous.
 *
 * @static
 * @memberOf _
 * @param {function} fn - The function to check.
 * @returns {boolean} Returns false if the function is anonymous, else true.
 */
function isNamedFunction(fn) {
  return _.isFunction(fn) && _.hasValue(fn, 'name');
}

/**
 * Performs a deep comparison between two values from the given property value to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @param {array|object} value - The value to compare.
 * @param {array|object} other - The other value to compare.
 * @param {string|function} predicate - The predicate to compare by.
 * @returns {boolean} Returns true if the values are equivalent else false.
 */
function isEqualBy(value, other, predicate) {
  return _.isFunction(predicate) ? _.isEqual(predicate(value), predicate(other)) : _.isString(predicate) ? _.isEqual(_.get(value, predicate), _.get(other, predicate)) : _.isEqual(value, other);
}

/**
 * Converts an css rgb color value to hex.
 *
 * @static
 * @memberOf _
 * @param {string} value - The rgb value to convert.
 * @returns {string} The hex string.
 */
function rgbToHex(value) {
  var values = _.map(value.match(/\d+/g), function(value) {
    return _.padStart(parseInt(value, 10).toString(16), 2, '0');
  });

  return values.length > 2 ? formatStringEx('#{[0]}{[1]}{[2]}', values) : undefined;
}

/**
 * Iterates over elements of collection, returning the element after the first element predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @param {array|object} collection  - The collection to inspect.
 * @param {function} [predicate=_.identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to search from.
 * @returns {*} Returns the element after the matched element, else undefined.
 */
function findAndGetNext(collection, predicate, fromIndex) {
  return _.get(collection, _.findIndex(collection, predicate, fromIndex) + 1);
}

/**
 * Iterates over elements of collection, returning the element before the first element predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @param {array|object} collection - The collection to inspect.
 * @param {function} [predicate=_.identity] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to search from.
 * @returns {*} Returns the element before the matched element, else undefined.
 */
function findAndGetPrev(collection, predicate, fromIndex) {
  return _.get(collection, _.findIndex(collection, predicate, fromIndex) - 1);
}


/**
 * This method extracts the characters in a string between "start" and "end", not including "end" itself.
 * If "start" is greater than "end", this method will swap the two arguments, meaning _.subString(string, 1, 4) == _.subString(string, 4, 1).
 * If either "start" or "stop" is less than 0, it is treated as if it were 0.
 *
 * @static
 * @memberOf _
 * @param {string} string - The string to extract the characters.
 * @param {number} [start=0] - The position where to start the extraction. First character is at index 0.
 * @param {number} [end=string.length] - The position where to start the extraction. First character is at index 0.
 * @returns {string} A new String containing the extracted characters.
 */
function subString(string, start, end) {
  return _.isString(string) ? string.substring(start, end) : undefined;
}

function acronym(string) {
  return string ? string.match(/\b(\w)/g).join('') : undefined;
}

/**
 * Checks if the given object is a jQuery object.
 *
 * @static
 * @memberOf _
 * @param {Object} object - The object to check.
 * @returns {number} Returns true if the object was an jQuery object, else false.
 */
function isjQuery(object) {
  return (object && (object instanceof jQuery || object.constructor.prototype.jquery));
}

/**
 * Creates a random float between min and max.
 *
 * @static
 * @memberOf _
 * @param {number} [min=0] - The minimum value.
 * @param {number} [max=1] - The maximum value.
 * @returns {number} Returns the random float between min and max.
 */
function randomFloat(min, max) {
  min = _.isNumber(min) ? min : 0;
  max = _.isNumber(max) ? max : 1;
  return min + (Math.random() * (max - min));
}

/**
 * Creates a random integer between min and max.
 *
 * @static
 * @memberOf _
 * @param {number} [min=0] - The minimum value.
 * @param {number} [max=1] - The maximum value.
 * @returns {number} Returns the random integer between min and max.
 */
function randomInt(min, max) {
  return Math.round(randomFloat(min, max));
}

/**
 * Creates a random boolean.
 *
 * @static
 * @memberOf _
 * @returns {boolean} Returns true or false.
 */
function randomBool() {
  return Math.round(Math.random()) > 0;
}

/**
 * Checks if a string can be fully converted into a number.
 *
 * @static
 * @memberOf _
 * @param {string} value - The string to check.
 * @returns {boolean} Returns true if the string can be converted, else false.
 */
function isLikeNumber(value) {
  return value === _.toString(parseFloat(value));
}

/**
 * Checks if path is a direct property of object and has an value other than undefined.
 *
 * @static
 * @memberOf _
 * @param {Object} object - The object to query.
 * @param {Array|string} path - The path to check.
 * @param {*|Function} [predicate] - The value or function at the path to compare with.
 * @returns {boolean} Returns true if path exists and has an value, else false.
 */
function hasValue(object, path, predicate) {
  var value = _.get(object, path);
  var result = false;

  if(arguments.length < 3) {
    result = !_.isNil(value);
  } else if(_.isFunction(predicate)) {
    result = predicate(value);
  } else {
    result = _.eq(predicate, value);
  }

  return result;
}

/**
 * Returns the first object which is not falsey. The values `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @param {...*|Array} array - The array to query.
 * @returns {boolean} Returns the first element which is not falsey, `undefined` if there is none.
 */
function or(array) {
  return  _.first(_.compact(_.isArray(array) ? array : arguments));
}

/**
 * Returns the first object which is not nullish. The values null and `undefined` and `nullish`.
 *
 * @static
 * @memberOf _
 * @param {...*|Array} array - The array to query.
 * @returns {boolean} Returns the first element which is not nullish, undefined if there is none.
 */
function orStrict(array) {
  return  _.first(_.compactStrict(_.isArray(array) ? array : arguments));
}

/**
 * Creates an array with all nullish values removed. The values `undefined` and `nullish` are falsey.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, undefined, 2, '', 3, Null]);
 * // => [0, 1, false, 2 '', 3]
 */
function compactStrict(array) {
  var index = -1,
    length = array ? array.length : 0,
    resIndex = 0,
    result = [];

  while (++index < length) {
    var value = array[index];
    if (!_.isNil(value)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Computes the maximum value of `array` by value from path. If `array` is empty or falsey, defaultValue is returned.
 *
 * @static
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Array|Function|Object|string} [iteratee=_.identity]
 * @param {number} [defaultValue=undefined]
 * @returns {number} Returns the maximum value.
 */
function maxWith(array, iteratee, defaultValue) {
  return _.max(_.map(array, iteratee)) || defaultValue;
}

function tryParseNumber(value, defaultValue) {
  return isLikeNumber(value) ? parseInt(value, 10) : defaultValue;
}

function isColorExp(value) {
  var regex = /^(?:#(?:[A-Fa-f0-9]{3}){1,2}|(?:rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}|hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*|(?:rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}|hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,)\s*0*(?:\.\d+|1(?:\.0*)?)\s*)[)]|transparent|aqua(?:marine)?|azure|beige|bisque|black|blanchedalmond|blue(?:violet)?|(?:alice|dodger|cadet|midnight|powder|royal|sky|slate|steel)blue|(?:rosy|saddle|sandy)?brown|burlywood5|chartreuse|chocolate|coral|corn(?:flowerblue|silk)|crimson|cyan|dark(?:(?:slate)?blue|cyan|goldenrod|(?:olive|sea)?green|(?:slate)?gr[ae]y|khaki|magenta|orange|orchid|red|salmon|turquoise|violet)|deep(?:pink|skyblue)|firebrick|fuchsia|gainsboro|gold(?:enrod)?|(?:dim|slate)?gr[ae]y|(?:forest|lawn|spring)?green|greenyellow|honeydew|indigo|ivory|khaki|lavender(?:blush)?|lemonchiffon|light(?:(?:sky|steel)?blue|coral|cyan|goldenrodyellow|(?:slate)?gr[ae]y|green|pink|salmon|seagreen|yellow)|lime(?:green)?|linen|magenta|maroon|medium(?:aquamarine|(?:slate)?blue|orchid|purple|s(?:ea|pring)green|turquoise|violetred)|mintcream|mistyrose|moccasin|navy|oldlace|olive(?:drab)?|orange(?:red)?|orchid|pale(?:goldenrod|green|turquoise|violetred)|papayawhip|peachpuff|peru|(?:hot)?pink|plum|purple|(?:indian)?red|salmon|sea(?:green|shell)|sienna|silver|snow|tan|teal|thistle|tomato|turquoise|violet|wheat|whitesmoke|(?:antique|floral|ghost|navajo)?white|yellow(?:green)?)$/gm;
  return regex.exec(value) !== null;
}

/**
 * Checks if an object has one of the key-values in predicate.
 *
 * @static
 * @memberOf _
 * @param {Object} object - The object to query.
 * @param {Object} predicate - The key-values to check for.
 * @param {Boolean} defaultValue - The result if there are key-values in predicate.
 * @returns {boolean} Returns true if the object has at least one of the predicates key-values.
 */
function hasOneOf(object, predicate, defaultValue) {
  var result = _.isBoolean(defaultValue) ? defaultValue : !predicate;

  _.forEach(predicate, function(value, key) {
    var objectValue = _.get(object, key);

    if(_.isArray(value) && !_.isArray(objectValue)) {
      result = _.includes(value, object[key]);
    } else if(!_.isArray(value) && _.isArray(objectValue)) {
      result = _.includes(objectValue, value);
    } else {
      result = (objectValue === value);
    }

    return !result;
  });

  return result;
}

/**
 * Creates an array with all nil values removed. The values null and undefined are nil.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to clean.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.clean([0, 1, undefined, false, 2, '', null, 3]);
 * // => [0, 1, false, 2, '', 3]
 */
function clean(array) {
  return _.reject(array, _.isNil);
}

function keyByValue(collection, value) {
  return Object.keys(collection)[Object.values(collection).indexOf(value)];
}

/**
 * Deletes the given properties of an object.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to delete the properties from.
 * @param {Array} keys The properties to delete.
 * @returns {Object} Returns a new Object with the removed key values.
 */
function deleteKeys(object, keys) {
  var deleted = {};

  _.forEach(keys, function(key) {
    if(_.has(object, key)) {
      deleted[key] = object[key];
      delete object[key];
    }
  });

  return deleted;
}

/**
 * Deletes all owned properties of an object.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to delete the properties from.
 */
function deleteAllKeys(object) {
  deleteKeys(object, _.keys(object));
}

/**
 * Checks if an object has at least one own or inherited enumerable.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to delete the properties from.
 * @param {boolean} [inherit] Allow inherited enumerable.
 * @returns {boolean} Returns true if the object has at least one own or inherited enumerable.
 */
function hasKeys(object, inherit) {
  return (inherit ? _.keysIn : _.keys)(object).length > 0;
}

/**
 * Creates an object of key-values that changed in the other given object using SameValueZero for equality comparisons.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Object} other The other object to inspect.
 * @returns {boolean} Returns the new object with changed key-values.
 */
function changes(object, other) {
  return _.transform(_.assign({}, object, other), function(params, value, key) {
    if(object[key] !== other[key]) {
      params[key] = value;
    }
  });
}

/**
 * Converts all object path values into a string separated by separator.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {string|string[]} paths The property paths to pick.
 * @param {string} [separator=','] The element separator.
 * @param {Boolean} [filterNilValues=false] Ignore nil values.
 * @returns {string} Returns the joined string.
 */
function joinKeyValues(object, paths, separator, filterNilValues) {
  var values = _.pickValues(object, paths);

  if(filterNilValues) {
    values = _.compact(values);
  }

  return _.join(values, separator || ',');
}

/**
 * Creates an RFC4122 version 4 compliant GUID.
 *
 * @static
 * @memberOf _
 * @category String
 * @returns {string} Returns the GUID.
 */
function guid() {
  /*jshint -W016 */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0;
    var v = (c === 'x' ? r : (r&0x3|0x8));
    return v.toString(16);
  });
  /*jshint +W016 */
}

/**
 * Inserts or replaces an element in an array by a given predicate.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Array|Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @param {*} object The data.
 * @param {boolean} [insertAtFront=false] Insert new elements at the front of the array.
 * @returns {Array} Returns the array.
 */
function insertOrReplaceBy(array, predicate, object, insertAtFront) {
  if(_.isArray(array)) {
    if(!spliceBy(array, predicate, object, insertAtFront)) {
      array.push(object);
    }
  } else {
    return [object];
  }

  return array;
}

/**
 * Inserts or updates an element in an array by a given predicate.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Array|Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @param {*} object The data.
 * @param {boolean} [insertAtFront=false] Insert new elements at the front of the array.
 * @returns {Array} Returns the array.
 */
function insertOrUpdateBy(array, predicate, object, insertAtFront) {
  if(_.isArray(array)) {
    if(!updateBy(array, predicate, object, insertAtFront)) {
      array.push(object);
    }
  } else {
    return [object];
  }

  return array;
}

function spliceBy(array, predicate, object, forceInsert) {
  var index = _.findIndex(array, predicate);

  if(index > -1) {
    array.splice(index, 1, object);
  } else if(forceInsert) {
    array.splice(0, 0, object);
  }

  return forceInsert || index > -1;
}

function updateBy(array, predicate, object, forceInsert) {
  var index = _.findIndex(array, predicate);

  if(index > -1) {
    _.assign(array[index], object);
  } else if(forceInsert) {
    array.splice(0, 0, object);
  }

  return forceInsert || index > -1;
}

/**
 * Removes an element from array at index and returns the removed element.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {number} index The index of element to remove.
 * @returns {*} Returns the removed element.
 */
function removeAt(array, index) {
  return _.first(array.splice(index, 1));
}

/**
 * Moves an element inside an array by offset.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to modify.
 * @param {number} sourceIndex The index of element to move.
 * @param {number} [targetIndex] The index of element to move to.
 * @returns {*} Returns true if the array was mutated, else false.
 */
function move(array, sourceIndex, targetIndex) {
  if(!_.isNumber(targetIndex) || !_.isArray(array) || !_.inRange(targetIndex, 0, array.length)) {
    return false;
  }

  array.splice(targetIndex, 0, _.removeAt(array, sourceIndex));

  return true;
}

var BASE64_MARKER = ';base64,';
function toBlob(value) {
  if (value.indexOf(BASE64_MARKER) < 0) {
    return urlToBlob(value);
  }

  return base64ToBlob(value);
}

function base64ToBlob(data) {
  var parts = data.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);

  var uInt8Array = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}

function urlToBlob(url) {
  var parts = url.split(',');
  return new Blob([decodeURIComponent(parts[1])], {type: parts[0].split(':')[1]});
}

function getAspectRatio(width, height, isExact) {
  var _gcd = gcd(width, height);
  return (width / _gcd) + ':' + (height / _gcd);
}

/**
 * Gets the greatest common divider of two values.
 *
 * @static
 * @memberOf _
 * @category Number
 * @param {number} a The first value.
 * @param {number} b The second value.
 * @returns {number} Returns the greatest common divider.
 */
function gcd(a, b) {
  return b ? gcd(b, a % b) : Math.abs(a);
}


/**
 * Splits `string` by `separator` into `map`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {object} map The map with the binding indexies.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the split values.
 * @example
 *
 * _.split('a-b-c', '-', {key: 0, value: 1});
 * // => {key: 'a', value: 'b'}
 */
function splitToMap(string, separator, map, limit) {
  var values = _.split(string, separator, limit);

  return _.transform(map, function(newMap, index, key) {
    newMap[key] = values[index];
  });
}

function search(values, query) {
  var results = [];
  var queries = getSearchQueries(query);

  values = _.asArray(values);

  _.forEach(values, function(value, index) {
    var lowerCaseValue = value.toLowerCase();
    var matches = [];

    _.forEach(queries, function(query, index) {
      var sensitiveIndex =  value.indexOf(query);
      var insensitiveIndex = lowerCaseValue.indexOf(query);

      if(sensitiveIndex > -1) {
        _.insertOrUpdateBy(matches, {index: sensitiveIndex}, {
          index: sensitiveIndex,
          length: query.length
        });
      }

      if(insensitiveIndex > -1) {
        _.insertOrUpdateBy(matches, {index: insensitiveIndex}, {
          index: insensitiveIndex,
          length: query.length
        });
      }
    });

    if(matches.length > 0) {
      results.push({
        index: index,
        value: value,
        matches: matches
      });
    }
  });

  var baseScore = _.max(_.map(results, 'value.length'));

  _.forEach(results, function(result) {
    result.score = 0;

    _.forEach(result.matches, function(match) {
      result.score += (baseScore - match.index) * match.length;
    });
  });

  return _.orderBy(results, ['score'], ['desc']);

  function getSearchQueries(query) {
    var queries = _.split(query, ' ');
    var result = [];

    for(var i = 0; i < queries.length; i++) {
      for(var index = 0; index < queries.length - i; index++) {
        var length = i+1;
        var resultValue = [];

        for(var j = 0; j < length; j++) {
          resultValue.push(queries[index+j]);
        }

        result.push(_.join(resultValue, ' '));
      }
    }

    return result;
  }

}

function keyByRemapValues(collection, keyIteratee, valueIteratee) {
  return _.mapValues(_.keyBy(collection, keyIteratee), valueIteratee);
}

/**
 * Copies all key-values in a object to a new object with new keys.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {object} object - The source object
 * @param {object} [mapping] - The mapping info
 * @param {boolean} [copyAll=true] - Copies key-values when they are not specified in the mapping.
 * @returns {object} The remapped object.
 * @example
 *
 * _.remap({a: 'test', b: 123, c: true}, {a: 'name', b: 'value'});
 * // => {name: '123', value: 123, c: true}
 *
 * _.remap({a: 'test', b: 123, c: true}, {a: 'name', b: 'value'}, false);
 * // => {name: '123', value: 123}
 *
 * _.remap({a: 'test', c: true}, {a: 'name', b: 'value'});
 * // => {name: '123', value: undefined, c: true}
 *
 * _.remap({a: 'test', c: true}, {a: 'name', b: 'value'}, false);
 * // => {name: '123', value: undefined}
 */
function remap(object, mapping, copyAll) {
  var result = _.zipObject(_.values(mapping), []);

  _.forEach(object, function(value, key) {
    if(_.has(mapping, key)) {
      _.set(result, _.get(mapping, key), value);
    } else if(copyAll !== false) {
      _.set(result, key, value);
    }
  });

  return result;
}

/**
 * Creates an array composed of the picked object property values. Values are returned in the same order as paths.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {object} object - The source object.
 * @param {string|string[]} [paths] - The property paths to pick.
 * @returns {Array}  Returns the picked values.
 * @example
 *
 * _.pickValues({a: 'test', b: 123, c: true}, ['b','a']);
 * // => [123, 'test']
 */
function pickValues(object, paths) {
  return _.map(paths, function(path) {
    return _.get(object, path);
  });
}

/**
 * Iterates over elements of collection, returning an array of all elements that has a one of the values in the path.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array - The array to iterate over.
 * @param {Array} values - The values to check for.
 * @param {string} path - The path of the property to compare with.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.filterByValues([{id: 1}, {id: 2}, {id: 3}], [3, 2], 'id');
 * // => [{id: 3}, {id: 2}]
 */
function filterByValues(array, values, path) {
  return _.chain(array).keyBy(path).at(values).compact().value();
}


/**
 * Returns the number of bytes for a given value of type.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Number} value - The value.
 * @param {string} type - The type of the value.
 * @returns {Number} Returns the number of bytes.
 * @example
 *
 * _.bytes(10, 'MB');
 * // => 10485760
 *
 * _.bytes(1, 'TB');
 * // => 10995116277760
 *
 * _.bytes(15, 'KB');
 * // => 15360
 *
 * _.bytes(1, 'YB');
 * // => 1.8133887294219438e+25
 */
function bytes(value, type) {
  return value * Math.pow(2, (['KB','MB','GB','TB','PB','EB','ZB','YB'].indexOf(type) + 1) * 10);
}
