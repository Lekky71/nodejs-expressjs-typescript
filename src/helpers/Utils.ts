/* istanbul ignore file */
/**
 * Clean sensitive data from a string
 *
 * @param str
 * @param filters
 */
export const cleanStr = (str: any, filters: string[]): any => {
  if (typeof str !== 'string') {
    return str;
  }

  filters.forEach(filter => {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regx = new RegExp(filter, 'gi');
    str = str.replace(regx, '****');
  });

  return str;
};

/**
 * Clean sensitive data from object
 *
 * @param obj
 * @param filters
 */
export const cleanObj = (obj: any, filters: string[]): any => {
  if ('object' !== typeof obj) {
    return obj;
  }

  let _obj: any = {};

  for (let [key, value] of Object.entries(obj)) {
    // eslint-disable-next-line security/detect-object-injection
    _obj[key] = 'object' === typeof value ? cleanObj(value, filters) : cleanStr(value, filters);
  }

  return _obj;
};
