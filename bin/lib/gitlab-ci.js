"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require("bluebird");

exports.default = gitlabCI;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _urlParse = require("url-parse");

var _urlParse2 = _interopRequireDefault(_urlParse);

var _isPrimitive = require("is-primitive");

var _isPrimitive2 = _interopRequireDefault(_isPrimitive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides utility functions to simplify interacting with a GitLab CI project through the API
 *
 * @param {string} url
 * @param {string} token
 * @param {string} environment - optional
 *
 * @return {object} utility functions wrapped in an object
 */
function gitlabCI(url, token, environment = "*") {

  /**
   * Create project variable
   *
   * @param key
   * @param value
   *
   * @return {Promise<Object>} variable object
   */
  let createVariable = (() => {
    var _ref = (0, _bluebird.coroutine)(function* (key, value, environment_scope = "*") {
      const response = yield (0, _axios2.default)({
        method: "post",
        url: `${apiUrl}?${tokenQueryString}`,
        data: {
          key,
          value: serialiseValue(value),
          environment_scope
        }
      });

      console.log(`Created new variable ${key} = ${JSON.stringify(value)}`);

      return response.data;
    });

    return function createVariable(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

  /**
   * Update project variable
   *
   * @param key
   * @param value
   *
   * @return {Promise<Object>} variable object
   */


  let updateVariable = (() => {
    var _ref2 = (0, _bluebird.coroutine)(function* (key, value) {
      const response = yield (0, _axios2.default)({
        method: "put",
        url: `${apiUrl}/${key}?${tokenQueryString}`,
        data: {
          key,
          value: serialiseValue(value)
        }
      });

      console.log(`Updated variable ${key} = ${JSON.stringify(value)}`);

      return response.data;
    });

    return function updateVariable(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })();

  /**
   * Get all variables for project
   *
   * @return {Promise<Array>} array of variable objects
   */


  let listVariables = (() => {
    var _ref3 = (0, _bluebird.coroutine)(function* () {
      console.log(`>>>>>>>>> link = ${apiUrl}?${tokenQueryString}&${perPageQueryString}&${environmentFilter}`);
      const response = yield _axios2.default.get(`${apiUrl}?${tokenQueryString}&${perPageQueryString}&${environmentFilter}`);

      console.log({ response, data: response.data });
      return response.data;
    });

    return function listVariables() {
      return _ref3.apply(this, arguments);
    };
  })();

  /**
   * Set project variables
   *
   * @param {Object} properties
   * @param forceUpdate if true, override existing values, otherwise ignore them
   *
   * @return {Promise<Array>} array of variable objects
   */


  let setVariables = (() => {
    var _ref4 = (0, _bluebird.coroutine)(function* (properties, forceUpdate, environment_scope) {
      if (!properties) {
        return null;
      }

      const existingKeys = (yield listVariables()).map(function (variable) {
        return variable.key;
      });
      const keysToSet = Object.keys(properties);

      const promises = keysToSet.map((() => {
        var _ref5 = (0, _bluebird.coroutine)(function* (key) {
          const value = properties[key];
          const keyExists = existingKeys.includes(key);

          if (keyExists && !forceUpdate) {
            console.log(`Skipped variable ${key}, already set for project.`);
            return undefined;
          }

          let variable;
          if (keyExists) {
            // Update variable
            variable = yield updateVariable(key, value);
          } else {
            // Create variable
            variable = yield createVariable(key, value, environment_scope);
          }

          return variable;
        });

        return function (_x8) {
          return _ref5.apply(this, arguments);
        };
      })());

      const variables = yield Promise.all(promises);

      return variables.filter(function (variable) {
        return variable;
      });
    });

    return function setVariables(_x5, _x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  })();

  const parsedUrl = new _urlParse2.default(url);
  const perPageDefault = 100;

  // Construct project id by encoding namespace/projectName
  const projectId = parsedUrl.pathname.split("/").filter(x => x).join("%2F");

  const apiUrl = `${parsedUrl.origin}/api/v4/projects/${projectId}/variables`;
  const tokenQueryString = `private_token=${token}`;
  const perPageQueryString = `per_page=${perPageDefault}`;
  const environmentFilter = `filter[environment_scope]=${environment}`;

  /**
   * Will serialise a value using `JSON.stringify` if it is not primative.
   *
   * @param {any} value
   * @return {string|number|boolean}
   */
  function serialiseValue(value) {
    if (!(0, _isPrimitive2.default)(value)) {
      return JSON.stringify(value);
    }

    return value;
  }

  return {
    createVariable,
    updateVariable,
    listVariables,
    setVariables
  };
}
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2l0bGFiLWNpLmpzIl0sIm5hbWVzIjpbImdpdGxhYkNJIiwidXJsIiwidG9rZW4iLCJlbnZpcm9ubWVudCIsImtleSIsInZhbHVlIiwiZW52aXJvbm1lbnRfc2NvcGUiLCJyZXNwb25zZSIsIm1ldGhvZCIsImFwaVVybCIsInRva2VuUXVlcnlTdHJpbmciLCJkYXRhIiwic2VyaWFsaXNlVmFsdWUiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWF0ZVZhcmlhYmxlIiwidXBkYXRlVmFyaWFibGUiLCJwZXJQYWdlUXVlcnlTdHJpbmciLCJlbnZpcm9ubWVudEZpbHRlciIsImdldCIsImxpc3RWYXJpYWJsZXMiLCJwcm9wZXJ0aWVzIiwiZm9yY2VVcGRhdGUiLCJleGlzdGluZ0tleXMiLCJtYXAiLCJ2YXJpYWJsZSIsImtleXNUb1NldCIsIk9iamVjdCIsImtleXMiLCJwcm9taXNlcyIsImtleUV4aXN0cyIsImluY2x1ZGVzIiwidW5kZWZpbmVkIiwidmFyaWFibGVzIiwiUHJvbWlzZSIsImFsbCIsImZpbHRlciIsInNldFZhcmlhYmxlcyIsInBhcnNlZFVybCIsInBlclBhZ2VEZWZhdWx0IiwicHJvamVjdElkIiwicGF0aG5hbWUiLCJzcGxpdCIsIngiLCJqb2luIiwib3JpZ2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFhd0JBLFE7O0FBYnhCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7OztBQVNlLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCQyxLQUF2QixFQUE4QkMsY0FBYyxHQUE1QyxFQUFpRDs7QUE2QjlEOzs7Ozs7OztBQTdCOEQ7QUFBQSx3Q0FxQzlELFdBQThCQyxHQUE5QixFQUFtQ0MsS0FBbkMsRUFBMENDLG9CQUFvQixHQUE5RCxFQUFtRTtBQUNqRSxZQUFNQyxXQUFXLE1BQU0scUJBQU07QUFDM0JDLGdCQUFRLE1BRG1CO0FBRTNCUCxhQUFNLEdBQUVRLE1BQU8s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QVosQ0FBeEI7O0FBRUEsYUFBT0ksVUFBVUcsTUFBVixDQUFpQixVQUFDWCxRQUFEO0FBQUEsZUFBY0EsUUFBZDtBQUFBLE9BQWpCLENBQVA7QUFDRCxLQXZJNkQ7O0FBQUEsb0JBcUcvQ1ksWUFyRytDO0FBQUE7QUFBQTtBQUFBOztBQUM5RCxRQUFNQyxZQUFZLHVCQUFRdkMsR0FBUixDQUFsQjtBQUNBLFFBQU13QyxpQkFBaUIsR0FBdkI7O0FBRUE7QUFDQSxRQUFNQyxZQUFZRixVQUFVRyxRQUFWLENBQ2ZDLEtBRGUsQ0FDVCxHQURTLEVBRWZOLE1BRmUsQ0FFUE8sQ0FBRCxJQUFPQSxDQUZDLEVBR2ZDLElBSGUsQ0FHVixLQUhVLENBQWxCOztBQUtBLFFBQU1yQyxTQUFVLEdBQUUrQixVQUFVTyxNQUFPLG9CQUFtQkwsU0FBVSxZQUFoRTtBQUNBLFFBQU1oQyxtQkFBb0IsaUJBQWdCUixLQUFNLEVBQWhEO0FBQ0EsUUFBTWlCLHFCQUFzQixZQUFXc0IsY0FBZSxFQUF0RDtBQUNBLFFBQU1yQixvQkFBcUIsNkJBQTRCakIsV0FBWSxFQUFuRTs7QUFFQTs7Ozs7O0FBTUEsV0FBU1MsY0FBVCxDQUF3QlAsS0FBeEIsRUFBK0I7QUFDN0IsUUFBSSxDQUFDLDJCQUFZQSxLQUFaLENBQUwsRUFBeUI7QUFDdkIsYUFBT1UsS0FBS0MsU0FBTCxDQUFlWCxLQUFmLENBQVA7QUFDRDs7QUFFRCxXQUFPQSxLQUFQO0FBQ0Q7O0FBOEdELFNBQU87QUFDTFksa0JBREs7QUFFTEMsa0JBRks7QUFHTEksaUJBSEs7QUFJTGlCO0FBSkssR0FBUDtBQU1EIiwiZmlsZSI6ImdpdGxhYi1jaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBVUkwgZnJvbSBcInVybC1wYXJzZVwiO1xuaW1wb3J0IGlzUHJpbWl0aXZlIGZyb20gXCJpcy1wcmltaXRpdmVcIjtcblxuLyoqXG4gKiBQcm92aWRlcyB1dGlsaXR5IGZ1bmN0aW9ucyB0byBzaW1wbGlmeSBpbnRlcmFjdGluZyB3aXRoIGEgR2l0TGFiIENJIHByb2plY3QgdGhyb3VnaCB0aGUgQVBJXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHBhcmFtIHtzdHJpbmd9IHRva2VuXG4gKiBAcGFyYW0ge3N0cmluZ30gZW52aXJvbm1lbnQgLSBvcHRpb25hbFxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gdXRpbGl0eSBmdW5jdGlvbnMgd3JhcHBlZCBpbiBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2l0bGFiQ0kodXJsLCB0b2tlbiwgZW52aXJvbm1lbnQgPSBcIipcIikge1xuICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHVybCk7XG4gIGNvbnN0IHBlclBhZ2VEZWZhdWx0ID0gMTAwO1xuXG4gIC8vIENvbnN0cnVjdCBwcm9qZWN0IGlkIGJ5IGVuY29kaW5nIG5hbWVzcGFjZS9wcm9qZWN0TmFtZVxuICBjb25zdCBwcm9qZWN0SWQgPSBwYXJzZWRVcmwucGF0aG5hbWVcbiAgICAuc3BsaXQoXCIvXCIpXG4gICAgLmZpbHRlcigoeCkgPT4geClcbiAgICAuam9pbihcIiUyRlwiKTtcblxuICBjb25zdCBhcGlVcmwgPSBgJHtwYXJzZWRVcmwub3JpZ2lufS9hcGkvdjQvcHJvamVjdHMvJHtwcm9qZWN0SWR9L3ZhcmlhYmxlc2A7XG4gIGNvbnN0IHRva2VuUXVlcnlTdHJpbmcgPSBgcHJpdmF0ZV90b2tlbj0ke3Rva2VufWA7XG4gIGNvbnN0IHBlclBhZ2VRdWVyeVN0cmluZyA9IGBwZXJfcGFnZT0ke3BlclBhZ2VEZWZhdWx0fWA7XG4gIGNvbnN0IGVudmlyb25tZW50RmlsdGVyID0gYGZpbHRlcltlbnZpcm9ubWVudF9zY29wZV09JHtlbnZpcm9ubWVudH1gO1xuXG4gIC8qKlxuICAgKiBXaWxsIHNlcmlhbGlzZSBhIHZhbHVlIHVzaW5nIGBKU09OLnN0cmluZ2lmeWAgaWYgaXQgaXMgbm90IHByaW1hdGl2ZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlXG4gICAqIEByZXR1cm4ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIHNlcmlhbGlzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKCFpc1ByaW1pdGl2ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBwcm9qZWN0IHZhcmlhYmxlXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn0gdmFyaWFibGUgb2JqZWN0XG4gICAqL1xuICBhc3luYyBmdW5jdGlvbiBjcmVhdGVWYXJpYWJsZShrZXksIHZhbHVlLCBlbnZpcm9ubWVudF9zY29wZSA9IFwiKlwiKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcyh7XG4gICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgdXJsOiBgJHthcGlVcmx9PyR7dG9rZW5RdWVyeVN0cmluZ31gLFxuICAgICAgZGF0YToge1xuICAgICAgICBrZXksXG4gICAgICAgIHZhbHVlOiBzZXJpYWxpc2VWYWx1ZSh2YWx1ZSksXG4gICAgICAgIGVudmlyb25tZW50X3Njb3BlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnNvbGUubG9nKGBDcmVhdGVkIG5ldyB2YXJpYWJsZSAke2tleX0gPSAke0pTT04uc3RyaW5naWZ5KHZhbHVlKX1gKTtcblxuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBwcm9qZWN0IHZhcmlhYmxlXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8T2JqZWN0Pn0gdmFyaWFibGUgb2JqZWN0XG4gICAqL1xuICBhc3luYyBmdW5jdGlvbiB1cGRhdGVWYXJpYWJsZShrZXksIHZhbHVlKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcyh7XG4gICAgICBtZXRob2Q6IFwicHV0XCIsXG4gICAgICB1cmw6IGAke2FwaVVybH0vJHtrZXl9PyR7dG9rZW5RdWVyeVN0cmluZ31gLFxuICAgICAgZGF0YToge1xuICAgICAgICBrZXksXG4gICAgICAgIHZhbHVlOiBzZXJpYWxpc2VWYWx1ZSh2YWx1ZSksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coYFVwZGF0ZWQgdmFyaWFibGUgJHtrZXl9ID0gJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHZhcmlhYmxlcyBmb3IgcHJvamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPEFycmF5Pn0gYXJyYXkgb2YgdmFyaWFibGUgb2JqZWN0c1xuICAgKi9cbiAgYXN5bmMgZnVuY3Rpb24gbGlzdFZhcmlhYmxlcygpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGA+Pj4+Pj4+Pj4gbGluayA9ICR7YXBpVXJsfT8ke3Rva2VuUXVlcnlTdHJpbmd9JiR7cGVyUGFnZVF1ZXJ5U3RyaW5nfSYke2Vudmlyb25tZW50RmlsdGVyfWBcbiAgICApO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KFxuICAgICAgYCR7YXBpVXJsfT8ke3Rva2VuUXVlcnlTdHJpbmd9JiR7cGVyUGFnZVF1ZXJ5U3RyaW5nfSYke2Vudmlyb25tZW50RmlsdGVyfWBcbiAgICApO1xuXG4gICAgY29uc29sZS5sb2coeyByZXNwb25zZSwgZGF0YTogcmVzcG9uc2UuZGF0YSB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcHJvamVjdCB2YXJpYWJsZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIGZvcmNlVXBkYXRlIGlmIHRydWUsIG92ZXJyaWRlIGV4aXN0aW5nIHZhbHVlcywgb3RoZXJ3aXNlIGlnbm9yZSB0aGVtXG4gICAqXG4gICAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXk+fSBhcnJheSBvZiB2YXJpYWJsZSBvYmplY3RzXG4gICAqL1xuICBhc3luYyBmdW5jdGlvbiBzZXRWYXJpYWJsZXMocHJvcGVydGllcywgZm9yY2VVcGRhdGUsIGVudmlyb25tZW50X3Njb3BlKSB7XG4gICAgaWYgKCFwcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBleGlzdGluZ0tleXMgPSAoYXdhaXQgbGlzdFZhcmlhYmxlcygpKS5tYXAoXG4gICAgICAodmFyaWFibGUpID0+IHZhcmlhYmxlLmtleVxuICAgICk7XG4gICAgY29uc3Qga2V5c1RvU2V0ID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IGtleXNUb1NldC5tYXAoYXN5bmMgKGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICBjb25zdCBrZXlFeGlzdHMgPSBleGlzdGluZ0tleXMuaW5jbHVkZXMoa2V5KTtcblxuICAgICAgaWYgKGtleUV4aXN0cyAmJiAhZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFNraXBwZWQgdmFyaWFibGUgJHtrZXl9LCBhbHJlYWR5IHNldCBmb3IgcHJvamVjdC5gKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgbGV0IHZhcmlhYmxlO1xuICAgICAgaWYgKGtleUV4aXN0cykge1xuICAgICAgICAvLyBVcGRhdGUgdmFyaWFibGVcbiAgICAgICAgdmFyaWFibGUgPSBhd2FpdCB1cGRhdGVWYXJpYWJsZShrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyZWF0ZSB2YXJpYWJsZVxuICAgICAgICB2YXJpYWJsZSA9IGF3YWl0IGNyZWF0ZVZhcmlhYmxlKGtleSwgdmFsdWUsIGVudmlyb25tZW50X3Njb3BlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhcmlhYmxlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdmFyaWFibGVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgcmV0dXJuIHZhcmlhYmxlcy5maWx0ZXIoKHZhcmlhYmxlKSA9PiB2YXJpYWJsZSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVZhcmlhYmxlLFxuICAgIHVwZGF0ZVZhcmlhYmxlLFxuICAgIGxpc3RWYXJpYWJsZXMsXG4gICAgc2V0VmFyaWFibGVzLFxuICB9O1xufVxuIl19