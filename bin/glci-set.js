#!/usr/bin/env node
"use strict";

var _bluebird = require("bluebird");

let execute = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (cmd) {
    let resp = null;
    const conf = yield (0, _utils.getConf)();

    if (!conf.key || !conf.value) {
      console.error("No key/value pair given.");
      process.exit(1);
    }

    let handler;
    if (conf.environment) {
      handler = (0, _gitlabCi2.default)(conf.url, conf.token, conf.environment);
    } else {
      handler = (0, _gitlabCi2.default)(conf.url, conf.token);
    }
    const existingKeys = (yield handler.listVariables()).map(function (variable) {
      return variable.key;
    });

    const keyExists = existingKeys.includes(conf.key);

    if (keyExists && cmd.doNotForce) {
      console.log(`Skipping ${conf.key}, already set.`);
      return undefined;
    }

    if (keyExists) {
      resp = yield handler.updateVariable(conf.key, conf.value);
    } else {
      resp = yield handler.createVariable(conf.key, conf.value);
    }

    console.log("Completed setting variable on Gitlab CI.");
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

_commander2.default.description("Set given key/value pair as environment variables on Gitlab CI").option("--url <url>", "Your Gitlab project URL, e.g. https://gitlab.com/gitlab-org/gitlab-ce").option("--token <token>", "Your Gitlab token").option("--key <key>", "Your Gitlab CI variable").option("--value <value>", "Your Gitlab CI value").option("--do-not-force", "Ignore variable if it already exists on gitlab CI. By default variable is overridden").option("--environment <environment>", "override environment").parse(process.argv);

execute(_commander2.default);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nbGNpLXNldC5qcyJdLCJuYW1lcyI6WyJjbWQiLCJyZXNwIiwiY29uZiIsImtleSIsInZhbHVlIiwiY29uc29sZSIsImVycm9yIiwicHJvY2VzcyIsImV4aXQiLCJoYW5kbGVyIiwiZW52aXJvbm1lbnQiLCJ1cmwiLCJ0b2tlbiIsImV4aXN0aW5nS2V5cyIsImxpc3RWYXJpYWJsZXMiLCJtYXAiLCJ2YXJpYWJsZSIsImtleUV4aXN0cyIsImluY2x1ZGVzIiwiZG9Ob3RGb3JjZSIsImxvZyIsInVuZGVmaW5lZCIsInVwZGF0ZVZhcmlhYmxlIiwiY3JlYXRlVmFyaWFibGUiLCJleGVjdXRlIiwiZGVzY3JpcHRpb24iLCJvcHRpb24iLCJwYXJzZSIsImFyZ3YiXSwibWFwcGluZ3MiOiI7Ozs7O3NDQU1BLFdBQXVCQSxHQUF2QixFQUE0QjtBQUMxQixRQUFJQyxPQUFPLElBQVg7QUFDQSxVQUFNQyxPQUFPLE1BQU0scUJBQW5COztBQUVBLFFBQUksQ0FBQ0EsS0FBS0MsR0FBTixJQUFhLENBQUNELEtBQUtFLEtBQXZCLEVBQThCO0FBQzVCQyxjQUFRQyxLQUFSLENBQWMsMEJBQWQ7QUFDQUMsY0FBUUMsSUFBUixDQUFhLENBQWI7QUFDRDs7QUFFRCxRQUFJQyxPQUFKO0FBQ0EsUUFBSVAsS0FBS1EsV0FBVCxFQUFzQjtBQUNwQkQsZ0JBQVUsd0JBQVNQLEtBQUtTLEdBQWQsRUFBbUJULEtBQUtVLEtBQXhCLEVBQStCVixLQUFLUSxXQUFwQyxDQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0xELGdCQUFVLHdCQUFTUCxLQUFLUyxHQUFkLEVBQW1CVCxLQUFLVSxLQUF4QixDQUFWO0FBQ0Q7QUFDRCxVQUFNQyxlQUFlLENBQUMsTUFBTUosUUFBUUssYUFBUixFQUFQLEVBQWdDQyxHQUFoQyxDQUNuQixVQUFDQyxRQUFEO0FBQUEsYUFBY0EsU0FBU2IsR0FBdkI7QUFBQSxLQURtQixDQUFyQjs7QUFJQSxVQUFNYyxZQUFZSixhQUFhSyxRQUFiLENBQXNCaEIsS0FBS0MsR0FBM0IsQ0FBbEI7O0FBRUEsUUFBSWMsYUFBYWpCLElBQUltQixVQUFyQixFQUFpQztBQUMvQmQsY0FBUWUsR0FBUixDQUFhLFlBQVdsQixLQUFLQyxHQUFJLGdCQUFqQztBQUNBLGFBQU9rQixTQUFQO0FBQ0Q7O0FBRUQsUUFBSUosU0FBSixFQUFlO0FBQ2JoQixhQUFPLE1BQU1RLFFBQVFhLGNBQVIsQ0FBdUJwQixLQUFLQyxHQUE1QixFQUFpQ0QsS0FBS0UsS0FBdEMsQ0FBYjtBQUNELEtBRkQsTUFFTztBQUNMSCxhQUFPLE1BQU1RLFFBQVFjLGNBQVIsQ0FBdUJyQixLQUFLQyxHQUE1QixFQUFpQ0QsS0FBS0UsS0FBdEMsQ0FBYjtBQUNEOztBQUVEQyxZQUFRZSxHQUFSLENBQVksMENBQVo7QUFDQSxXQUFPbkIsSUFBUDtBQUNELEc7O2tCQWxDY3VCLE87Ozs7O0FBSmY7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBc0NBLG9CQUNHQyxXQURILENBQ2UsZ0VBRGYsRUFFR0MsTUFGSCxDQUdJLGFBSEosRUFJSSx1RUFKSixFQU1HQSxNQU5ILENBTVUsaUJBTlYsRUFNNkIsbUJBTjdCLEVBT0dBLE1BUEgsQ0FPVSxhQVBWLEVBT3lCLHlCQVB6QixFQVFHQSxNQVJILENBUVUsaUJBUlYsRUFRNkIsc0JBUjdCLEVBU0dBLE1BVEgsQ0FVSSxnQkFWSixFQVdJLHNGQVhKLEVBYUdBLE1BYkgsQ0FhVSw2QkFiVixFQWF5QyxzQkFiekMsRUFjR0MsS0FkSCxDQWNTcEIsUUFBUXFCLElBZGpCOztBQWdCQUoiLCJmaWxlIjoiZ2xjaS1zZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHByb2dyYW0gZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0IHsgZ2V0Q29uZiB9IGZyb20gXCIuL2xpYi91dGlsc1wiO1xuaW1wb3J0IGdpdGxhYkNJIGZyb20gXCIuL2xpYi9naXRsYWItY2lcIjtcblxuYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZShjbWQpIHtcbiAgbGV0IHJlc3AgPSBudWxsO1xuICBjb25zdCBjb25mID0gYXdhaXQgZ2V0Q29uZigpO1xuXG4gIGlmICghY29uZi5rZXkgfHwgIWNvbmYudmFsdWUpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiTm8ga2V5L3ZhbHVlIHBhaXIgZ2l2ZW4uXCIpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIGxldCBoYW5kbGVyO1xuICBpZiAoY29uZi5lbnZpcm9ubWVudCkge1xuICAgIGhhbmRsZXIgPSBnaXRsYWJDSShjb25mLnVybCwgY29uZi50b2tlbiwgY29uZi5lbnZpcm9ubWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaGFuZGxlciA9IGdpdGxhYkNJKGNvbmYudXJsLCBjb25mLnRva2VuKTtcbiAgfVxuICBjb25zdCBleGlzdGluZ0tleXMgPSAoYXdhaXQgaGFuZGxlci5saXN0VmFyaWFibGVzKCkpLm1hcChcbiAgICAodmFyaWFibGUpID0+IHZhcmlhYmxlLmtleVxuICApO1xuXG4gIGNvbnN0IGtleUV4aXN0cyA9IGV4aXN0aW5nS2V5cy5pbmNsdWRlcyhjb25mLmtleSk7XG5cbiAgaWYgKGtleUV4aXN0cyAmJiBjbWQuZG9Ob3RGb3JjZSkge1xuICAgIGNvbnNvbGUubG9nKGBTa2lwcGluZyAke2NvbmYua2V5fSwgYWxyZWFkeSBzZXQuYCk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChrZXlFeGlzdHMpIHtcbiAgICByZXNwID0gYXdhaXQgaGFuZGxlci51cGRhdGVWYXJpYWJsZShjb25mLmtleSwgY29uZi52YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzcCA9IGF3YWl0IGhhbmRsZXIuY3JlYXRlVmFyaWFibGUoY29uZi5rZXksIGNvbmYudmFsdWUpO1xuICB9XG5cbiAgY29uc29sZS5sb2coXCJDb21wbGV0ZWQgc2V0dGluZyB2YXJpYWJsZSBvbiBHaXRsYWIgQ0kuXCIpO1xuICByZXR1cm4gcmVzcDtcbn1cblxucHJvZ3JhbVxuICAuZGVzY3JpcHRpb24oXCJTZXQgZ2l2ZW4ga2V5L3ZhbHVlIHBhaXIgYXMgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9uIEdpdGxhYiBDSVwiKVxuICAub3B0aW9uKFxuICAgIFwiLS11cmwgPHVybD5cIixcbiAgICBcIllvdXIgR2l0bGFiIHByb2plY3QgVVJMLCBlLmcuIGh0dHBzOi8vZ2l0bGFiLmNvbS9naXRsYWItb3JnL2dpdGxhYi1jZVwiXG4gIClcbiAgLm9wdGlvbihcIi0tdG9rZW4gPHRva2VuPlwiLCBcIllvdXIgR2l0bGFiIHRva2VuXCIpXG4gIC5vcHRpb24oXCItLWtleSA8a2V5PlwiLCBcIllvdXIgR2l0bGFiIENJIHZhcmlhYmxlXCIpXG4gIC5vcHRpb24oXCItLXZhbHVlIDx2YWx1ZT5cIiwgXCJZb3VyIEdpdGxhYiBDSSB2YWx1ZVwiKVxuICAub3B0aW9uKFxuICAgIFwiLS1kby1ub3QtZm9yY2VcIixcbiAgICBcIklnbm9yZSB2YXJpYWJsZSBpZiBpdCBhbHJlYWR5IGV4aXN0cyBvbiBnaXRsYWIgQ0kuIEJ5IGRlZmF1bHQgdmFyaWFibGUgaXMgb3ZlcnJpZGRlblwiXG4gIClcbiAgLm9wdGlvbihcIi0tZW52aXJvbm1lbnQgPGVudmlyb25tZW50PlwiLCBcIm92ZXJyaWRlIGVudmlyb25tZW50XCIpXG4gIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuXG5leGVjdXRlKHByb2dyYW0pO1xuIl19