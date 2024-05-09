#!/usr/bin/env node
"use strict";

var _bluebird = require("bluebird");

let execute = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (cmd) {
    const conf = yield (0, _utils.getConf)();

    const properties = (0, _utils.getProperties)();
    let handler;
    if (conf.environment) {
      handler = (0, _gitlabCi2.default)(conf.url, conf.token, conf.environment);
    } else {
      handler = (0, _gitlabCi2.default)(conf.url, conf.token);
    }
    const resp = yield handler.setVariables(properties, !cmd.doNotForce, conf.environment);

    console.log("Completed setting variables on Gitlab CI.");
    return resp;
  });

  return function execute(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _utils = require("./lib/utils");

var _gitlabCi = require("./lib/gitlab-ci");

var _gitlabCi2 = _interopRequireDefault(_gitlabCi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.description("Read all key/value pairs under gitlab.env.yml on the current directory and sets them as environment variables on Gitlab CI").option("--url <url>", "Your Gitlab project URL, e.g. https://gitlab.com/gitlab-org/gitlab-ce").option("--token <token>", "Your Gitlab token").option("--do-not-force", "Ignore variables if they already exist on gitlab CI. By default all variables are overridden").option("--environment <environment>", "override environment").parse(process.argv);

execute(_commander2.default);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nbGNpLXNldEFsbC5qcyJdLCJuYW1lcyI6WyJjbWQiLCJjb25mIiwicHJvcGVydGllcyIsImhhbmRsZXIiLCJlbnZpcm9ubWVudCIsInVybCIsInRva2VuIiwicmVzcCIsInNldFZhcmlhYmxlcyIsImRvTm90Rm9yY2UiLCJjb25zb2xlIiwibG9nIiwiZXhlY3V0ZSIsImRlc2NyaXB0aW9uIiwib3B0aW9uIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6Ijs7Ozs7c0NBTUEsV0FBdUJBLEdBQXZCLEVBQTRCO0FBQzFCLFVBQU1DLE9BQU8sTUFBTSxxQkFBbkI7O0FBRUEsVUFBTUMsYUFBYSwyQkFBbkI7QUFDQSxRQUFJQyxPQUFKO0FBQ0EsUUFBSUYsS0FBS0csV0FBVCxFQUFzQjtBQUNwQkQsZ0JBQVUsd0JBQVNGLEtBQUtJLEdBQWQsRUFBbUJKLEtBQUtLLEtBQXhCLEVBQStCTCxLQUFLRyxXQUFwQyxDQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0xELGdCQUFVLHdCQUFTRixLQUFLSSxHQUFkLEVBQW1CSixLQUFLSyxLQUF4QixDQUFWO0FBQ0Q7QUFDRCxVQUFNQyxPQUFPLE1BQU1KLFFBQVFLLFlBQVIsQ0FDakJOLFVBRGlCLEVBRWpCLENBQUNGLElBQUlTLFVBRlksRUFHakJSLEtBQUtHLFdBSFksQ0FBbkI7O0FBTUFNLFlBQVFDLEdBQVIsQ0FBWSwyQ0FBWjtBQUNBLFdBQU9KLElBQVA7QUFDRCxHOztrQkFsQmNLLE87Ozs7O0FBSmY7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBc0JBLG9CQUNHQyxXQURILENBRUksNEhBRkosRUFJR0MsTUFKSCxDQUtJLGFBTEosRUFNSSx1RUFOSixFQVFHQSxNQVJILENBUVUsaUJBUlYsRUFRNkIsbUJBUjdCLEVBU0dBLE1BVEgsQ0FVSSxnQkFWSixFQVdJLDhGQVhKLEVBYUdBLE1BYkgsQ0FhVSw2QkFiVixFQWF5QyxzQkFiekMsRUFjR0MsS0FkSCxDQWNTQyxRQUFRQyxJQWRqQjs7QUFnQkFMIiwiZmlsZSI6ImdsY2ktc2V0QWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBwcm9ncmFtIGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCB7IGdldENvbmYsIGdldFByb3BlcnRpZXMgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcbmltcG9ydCBnaXRsYWJDSSBmcm9tIFwiLi9saWIvZ2l0bGFiLWNpXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGUoY21kKSB7XG4gIGNvbnN0IGNvbmYgPSBhd2FpdCBnZXRDb25mKCk7XG5cbiAgY29uc3QgcHJvcGVydGllcyA9IGdldFByb3BlcnRpZXMoKTtcbiAgbGV0IGhhbmRsZXI7XG4gIGlmIChjb25mLmVudmlyb25tZW50KSB7XG4gICAgaGFuZGxlciA9IGdpdGxhYkNJKGNvbmYudXJsLCBjb25mLnRva2VuLCBjb25mLmVudmlyb25tZW50KTtcbiAgfSBlbHNlIHtcbiAgICBoYW5kbGVyID0gZ2l0bGFiQ0koY29uZi51cmwsIGNvbmYudG9rZW4pO1xuICB9XG4gIGNvbnN0IHJlc3AgPSBhd2FpdCBoYW5kbGVyLnNldFZhcmlhYmxlcyhcbiAgICBwcm9wZXJ0aWVzLFxuICAgICFjbWQuZG9Ob3RGb3JjZSxcbiAgICBjb25mLmVudmlyb25tZW50XG4gICk7XG5cbiAgY29uc29sZS5sb2coXCJDb21wbGV0ZWQgc2V0dGluZyB2YXJpYWJsZXMgb24gR2l0bGFiIENJLlwiKTtcbiAgcmV0dXJuIHJlc3A7XG59XG5cbnByb2dyYW1cbiAgLmRlc2NyaXB0aW9uKFxuICAgIFwiUmVhZCBhbGwga2V5L3ZhbHVlIHBhaXJzIHVuZGVyIGdpdGxhYi5lbnYueW1sIG9uIHRoZSBjdXJyZW50IGRpcmVjdG9yeSBhbmQgc2V0cyB0aGVtIGFzIGVudmlyb25tZW50IHZhcmlhYmxlcyBvbiBHaXRsYWIgQ0lcIlxuICApXG4gIC5vcHRpb24oXG4gICAgXCItLXVybCA8dXJsPlwiLFxuICAgIFwiWW91ciBHaXRsYWIgcHJvamVjdCBVUkwsIGUuZy4gaHR0cHM6Ly9naXRsYWIuY29tL2dpdGxhYi1vcmcvZ2l0bGFiLWNlXCJcbiAgKVxuICAub3B0aW9uKFwiLS10b2tlbiA8dG9rZW4+XCIsIFwiWW91ciBHaXRsYWIgdG9rZW5cIilcbiAgLm9wdGlvbihcbiAgICBcIi0tZG8tbm90LWZvcmNlXCIsXG4gICAgXCJJZ25vcmUgdmFyaWFibGVzIGlmIHRoZXkgYWxyZWFkeSBleGlzdCBvbiBnaXRsYWIgQ0kuIEJ5IGRlZmF1bHQgYWxsIHZhcmlhYmxlcyBhcmUgb3ZlcnJpZGRlblwiXG4gIClcbiAgLm9wdGlvbihcIi0tZW52aXJvbm1lbnQgPGVudmlyb25tZW50PlwiLCBcIm92ZXJyaWRlIGVudmlyb25tZW50XCIpXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5leGVjdXRlKHByb2dyYW0pO1xuIl19