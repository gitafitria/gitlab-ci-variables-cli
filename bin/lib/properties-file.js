"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPropertiesFile = loadPropertiesFile;
exports.savePropertiesFile = savePropertiesFile;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require("js-yaml");

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load properties file into properties object
 * A property is a key/value pair.
 *
 * @param path
 *
 * @return {Object} properties
 */
function loadPropertiesFile(path) {
  let doc;
  try {
    const contents = _fs2.default.readFileSync(path, "utf8");
    console.log({ contents });
    doc = _jsYaml2.default.safeLoad(contents);
  } catch (error) {
    console.log(error);
  }

  console.log({ doc });
  return doc;
}

/**
 * Save properties object into properties file
 * A property is a key/value pair.
 *
 * @param path
 * @param obj
 *
 */
function savePropertiesFile(path, obj) {
  const envVars = {};
  // group env based on its environment_scope
  obj.forEach(envVar => {
    if (!envVars[envVar.environment_scope]) {
      envVars[envVar.environment_scope] = [];
    }
    envVars[envVar.environment_scope].push(`${envVar.key}: ${envVar.value}`);
    // contents.push(`${envVar.key}: ${envVar.value}`);
  });

  const contents = [];
  Object.keys(envVars).forEach(env => {
    contents.push(`# environment_scope: ${env}`);
    contents.push(envVars[env].join("\n"));
  });

  try {
    // const string = yaml.safeDump(contents);
    _fs2.default.writeFileSync(path, contents.join("\n"), "utf8");
  } catch (error) {
    console.log(error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcHJvcGVydGllcy1maWxlLmpzIl0sIm5hbWVzIjpbImxvYWRQcm9wZXJ0aWVzRmlsZSIsInNhdmVQcm9wZXJ0aWVzRmlsZSIsInBhdGgiLCJkb2MiLCJjb250ZW50cyIsInJlYWRGaWxlU3luYyIsImNvbnNvbGUiLCJsb2ciLCJzYWZlTG9hZCIsImVycm9yIiwib2JqIiwiZW52VmFycyIsImZvckVhY2giLCJlbnZWYXIiLCJlbnZpcm9ubWVudF9zY29wZSIsInB1c2giLCJrZXkiLCJ2YWx1ZSIsIk9iamVjdCIsImtleXMiLCJlbnYiLCJqb2luIiwid3JpdGVGaWxlU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFXZ0JBLGtCLEdBQUFBLGtCO1FBc0JBQyxrQixHQUFBQSxrQjs7QUFqQ2hCOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7OztBQVFPLFNBQVNELGtCQUFULENBQTRCRSxJQUE1QixFQUFrQztBQUN2QyxNQUFJQyxHQUFKO0FBQ0EsTUFBSTtBQUNGLFVBQU1DLFdBQVcsYUFBR0MsWUFBSCxDQUFnQkgsSUFBaEIsRUFBc0IsTUFBdEIsQ0FBakI7QUFDQUksWUFBUUMsR0FBUixDQUFZLEVBQUVILFFBQUYsRUFBWjtBQUNBRCxVQUFNLGlCQUFLSyxRQUFMLENBQWNKLFFBQWQsQ0FBTjtBQUNELEdBSkQsQ0FJRSxPQUFPSyxLQUFQLEVBQWM7QUFDZEgsWUFBUUMsR0FBUixDQUFZRSxLQUFaO0FBQ0Q7O0FBRURILFVBQVFDLEdBQVIsQ0FBWSxFQUFFSixHQUFGLEVBQVo7QUFDQSxTQUFPQSxHQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUU8sU0FBU0Ysa0JBQVQsQ0FBNEJDLElBQTVCLEVBQWtDUSxHQUFsQyxFQUF1QztBQUM1QyxRQUFNQyxVQUFVLEVBQWhCO0FBQ0E7QUFDQUQsTUFBSUUsT0FBSixDQUFhQyxNQUFELElBQVk7QUFDdEIsUUFBSSxDQUFDRixRQUFRRSxPQUFPQyxpQkFBZixDQUFMLEVBQXdDO0FBQ3RDSCxjQUFRRSxPQUFPQyxpQkFBZixJQUFvQyxFQUFwQztBQUNEO0FBQ0RILFlBQVFFLE9BQU9DLGlCQUFmLEVBQWtDQyxJQUFsQyxDQUF3QyxHQUFFRixPQUFPRyxHQUFJLEtBQUlILE9BQU9JLEtBQU0sRUFBdEU7QUFDQTtBQUNELEdBTkQ7O0FBUUEsUUFBTWIsV0FBVyxFQUFqQjtBQUNBYyxTQUFPQyxJQUFQLENBQVlSLE9BQVosRUFBcUJDLE9BQXJCLENBQThCUSxHQUFELElBQVM7QUFDcENoQixhQUFTVyxJQUFULENBQWUsd0JBQXVCSyxHQUFJLEVBQTFDO0FBQ0FoQixhQUFTVyxJQUFULENBQWNKLFFBQVFTLEdBQVIsRUFBYUMsSUFBYixDQUFrQixJQUFsQixDQUFkO0FBQ0QsR0FIRDs7QUFLQSxNQUFJO0FBQ0Y7QUFDQSxpQkFBR0MsYUFBSCxDQUFpQnBCLElBQWpCLEVBQXVCRSxTQUFTaUIsSUFBVCxDQUFjLElBQWQsQ0FBdkIsRUFBNEMsTUFBNUM7QUFDRCxHQUhELENBR0UsT0FBT1osS0FBUCxFQUFjO0FBQ2RILFlBQVFDLEdBQVIsQ0FBWUUsS0FBWjtBQUNEO0FBQ0YiLCJmaWxlIjoicHJvcGVydGllcy1maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHlhbWwgZnJvbSBcImpzLXlhbWxcIjtcblxuLyoqXG4gKiBMb2FkIHByb3BlcnRpZXMgZmlsZSBpbnRvIHByb3BlcnRpZXMgb2JqZWN0XG4gKiBBIHByb3BlcnR5IGlzIGEga2V5L3ZhbHVlIHBhaXIuXG4gKlxuICogQHBhcmFtIHBhdGhcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHByb3BlcnRpZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQcm9wZXJ0aWVzRmlsZShwYXRoKSB7XG4gIGxldCBkb2M7XG4gIHRyeSB7XG4gICAgY29uc3QgY29udGVudHMgPSBmcy5yZWFkRmlsZVN5bmMocGF0aCwgXCJ1dGY4XCIpO1xuICAgIGNvbnNvbGUubG9nKHsgY29udGVudHMgfSk7XG4gICAgZG9jID0geWFtbC5zYWZlTG9hZChjb250ZW50cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG5cbiAgY29uc29sZS5sb2coeyBkb2MgfSk7XG4gIHJldHVybiBkb2M7XG59XG5cbi8qKlxuICogU2F2ZSBwcm9wZXJ0aWVzIG9iamVjdCBpbnRvIHByb3BlcnRpZXMgZmlsZVxuICogQSBwcm9wZXJ0eSBpcyBhIGtleS92YWx1ZSBwYWlyLlxuICpcbiAqIEBwYXJhbSBwYXRoXG4gKiBAcGFyYW0gb2JqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2F2ZVByb3BlcnRpZXNGaWxlKHBhdGgsIG9iaikge1xuICBjb25zdCBlbnZWYXJzID0ge307XG4gIC8vIGdyb3VwIGVudiBiYXNlZCBvbiBpdHMgZW52aXJvbm1lbnRfc2NvcGVcbiAgb2JqLmZvckVhY2goKGVudlZhcikgPT4ge1xuICAgIGlmICghZW52VmFyc1tlbnZWYXIuZW52aXJvbm1lbnRfc2NvcGVdKSB7XG4gICAgICBlbnZWYXJzW2VudlZhci5lbnZpcm9ubWVudF9zY29wZV0gPSBbXTtcbiAgICB9XG4gICAgZW52VmFyc1tlbnZWYXIuZW52aXJvbm1lbnRfc2NvcGVdLnB1c2goYCR7ZW52VmFyLmtleX06ICR7ZW52VmFyLnZhbHVlfWApO1xuICAgIC8vIGNvbnRlbnRzLnB1c2goYCR7ZW52VmFyLmtleX06ICR7ZW52VmFyLnZhbHVlfWApO1xuICB9KTtcblxuICBjb25zdCBjb250ZW50cyA9IFtdO1xuICBPYmplY3Qua2V5cyhlbnZWYXJzKS5mb3JFYWNoKChlbnYpID0+IHtcbiAgICBjb250ZW50cy5wdXNoKGAjIGVudmlyb25tZW50X3Njb3BlOiAke2Vudn1gKTtcbiAgICBjb250ZW50cy5wdXNoKGVudlZhcnNbZW52XS5qb2luKFwiXFxuXCIpKTtcbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICAvLyBjb25zdCBzdHJpbmcgPSB5YW1sLnNhZmVEdW1wKGNvbnRlbnRzKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHBhdGgsIGNvbnRlbnRzLmpvaW4oXCJcXG5cIiksIFwidXRmOFwiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cbiJdfQ==