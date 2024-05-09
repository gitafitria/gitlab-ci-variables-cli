#!/usr/bin/env node
"use strict";

var _bluebird = require("bluebird");

let execute = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    const conf = yield (0, _utils.getConf)();

    let handler;
    if (conf.environment) {
      console.log({ env: conf.environment });
      handler = (0, _gitlabCi2.default)(conf.url, conf.token, conf.environment);
    } else {
      handler = (0, _gitlabCi2.default)(conf.url, conf.token);
    }
    const resp = yield handler.listVariables();

    console.log("Downloaded variables from Gitlab CI.");

    (0, _propertiesFile.savePropertiesFile)(`${process.cwd()}/${conf.output}`, resp);

    console.log(`Saved variables to ${conf.output}`);

    return resp;
  });

  return function execute() {
    return _ref.apply(this, arguments);
  };
})();

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _utils = require("./lib/utils");

var _propertiesFile = require("./lib/properties-file");

var _gitlabCi = require("./lib/gitlab-ci");

var _gitlabCi2 = _interopRequireDefault(_gitlabCi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.description("Read all key/value pairs from Gitlab API and save them to the specified output file").option("--url <url>", "Your Gitlab project URL, e.g. https://gitlab.com/gitlab-org/gitlab-ce").option("--token <token>", "Your Gitlab token").option("--output <output>", "The location to save the result to", "gitlab.env.yml").option("--environment <environment>", "The location to save the result to").parse(process.argv);

execute(_commander2.default);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nbGNpLWdldEFsbC5qcyJdLCJuYW1lcyI6WyJjb25mIiwiaGFuZGxlciIsImVudmlyb25tZW50IiwiY29uc29sZSIsImxvZyIsImVudiIsInVybCIsInRva2VuIiwicmVzcCIsImxpc3RWYXJpYWJsZXMiLCJwcm9jZXNzIiwiY3dkIiwib3V0cHV0IiwiZXhlY3V0ZSIsImRlc2NyaXB0aW9uIiwib3B0aW9uIiwicGFyc2UiLCJhcmd2Il0sIm1hcHBpbmdzIjoiOzs7OztzQ0FPQSxhQUF5QjtBQUN2QixVQUFNQSxPQUFPLE1BQU0scUJBQW5COztBQUVBLFFBQUlDLE9BQUo7QUFDQSxRQUFJRCxLQUFLRSxXQUFULEVBQXNCO0FBQ3BCQyxjQUFRQyxHQUFSLENBQVksRUFBRUMsS0FBS0wsS0FBS0UsV0FBWixFQUFaO0FBQ0FELGdCQUFVLHdCQUFTRCxLQUFLTSxHQUFkLEVBQW1CTixLQUFLTyxLQUF4QixFQUErQlAsS0FBS0UsV0FBcEMsQ0FBVjtBQUNELEtBSEQsTUFHTztBQUNMRCxnQkFBVSx3QkFBU0QsS0FBS00sR0FBZCxFQUFtQk4sS0FBS08sS0FBeEIsQ0FBVjtBQUNEO0FBQ0QsVUFBTUMsT0FBTyxNQUFNUCxRQUFRUSxhQUFSLEVBQW5COztBQUVBTixZQUFRQyxHQUFSLENBQVksc0NBQVo7O0FBRUEsNENBQW9CLEdBQUVNLFFBQVFDLEdBQVIsRUFBYyxJQUFHWCxLQUFLWSxNQUFPLEVBQW5ELEVBQXNESixJQUF0RDs7QUFFQUwsWUFBUUMsR0FBUixDQUFhLHNCQUFxQkosS0FBS1ksTUFBTyxFQUE5Qzs7QUFFQSxXQUFPSixJQUFQO0FBQ0QsRzs7a0JBbkJjSyxPOzs7OztBQUxmOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQXVCQSxvQkFDR0MsV0FESCxDQUVJLHFGQUZKLEVBSUdDLE1BSkgsQ0FLSSxhQUxKLEVBTUksdUVBTkosRUFRR0EsTUFSSCxDQVFVLGlCQVJWLEVBUTZCLG1CQVI3QixFQVNHQSxNQVRILENBVUksbUJBVkosRUFXSSxvQ0FYSixFQVlJLGdCQVpKLEVBY0dBLE1BZEgsQ0FjVSw2QkFkVixFQWN5QyxvQ0FkekMsRUFlR0MsS0FmSCxDQWVTTixRQUFRTyxJQWZqQjs7QUFpQkFKIiwiZmlsZSI6ImdsY2ktZ2V0QWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBwcm9ncmFtIGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCB7IGdldENvbmYgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcbmltcG9ydCB7IHNhdmVQcm9wZXJ0aWVzRmlsZSB9IGZyb20gXCIuL2xpYi9wcm9wZXJ0aWVzLWZpbGVcIjtcbmltcG9ydCBnaXRsYWJDSSBmcm9tIFwiLi9saWIvZ2l0bGFiLWNpXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGUoKSB7XG4gIGNvbnN0IGNvbmYgPSBhd2FpdCBnZXRDb25mKCk7XG5cbiAgbGV0IGhhbmRsZXI7XG4gIGlmIChjb25mLmVudmlyb25tZW50KSB7XG4gICAgY29uc29sZS5sb2coeyBlbnY6IGNvbmYuZW52aXJvbm1lbnQgfSk7XG4gICAgaGFuZGxlciA9IGdpdGxhYkNJKGNvbmYudXJsLCBjb25mLnRva2VuLCBjb25mLmVudmlyb25tZW50KTtcbiAgfSBlbHNlIHtcbiAgICBoYW5kbGVyID0gZ2l0bGFiQ0koY29uZi51cmwsIGNvbmYudG9rZW4pO1xuICB9XG4gIGNvbnN0IHJlc3AgPSBhd2FpdCBoYW5kbGVyLmxpc3RWYXJpYWJsZXMoKTtcblxuICBjb25zb2xlLmxvZyhcIkRvd25sb2FkZWQgdmFyaWFibGVzIGZyb20gR2l0bGFiIENJLlwiKTtcblxuICBzYXZlUHJvcGVydGllc0ZpbGUoYCR7cHJvY2Vzcy5jd2QoKX0vJHtjb25mLm91dHB1dH1gLCByZXNwKTtcblxuICBjb25zb2xlLmxvZyhgU2F2ZWQgdmFyaWFibGVzIHRvICR7Y29uZi5vdXRwdXR9YCk7XG5cbiAgcmV0dXJuIHJlc3A7XG59XG5cbnByb2dyYW1cbiAgLmRlc2NyaXB0aW9uKFxuICAgIFwiUmVhZCBhbGwga2V5L3ZhbHVlIHBhaXJzIGZyb20gR2l0bGFiIEFQSSBhbmQgc2F2ZSB0aGVtIHRvIHRoZSBzcGVjaWZpZWQgb3V0cHV0IGZpbGVcIlxuICApXG4gIC5vcHRpb24oXG4gICAgXCItLXVybCA8dXJsPlwiLFxuICAgIFwiWW91ciBHaXRsYWIgcHJvamVjdCBVUkwsIGUuZy4gaHR0cHM6Ly9naXRsYWIuY29tL2dpdGxhYi1vcmcvZ2l0bGFiLWNlXCJcbiAgKVxuICAub3B0aW9uKFwiLS10b2tlbiA8dG9rZW4+XCIsIFwiWW91ciBHaXRsYWIgdG9rZW5cIilcbiAgLm9wdGlvbihcbiAgICBcIi0tb3V0cHV0IDxvdXRwdXQ+XCIsXG4gICAgXCJUaGUgbG9jYXRpb24gdG8gc2F2ZSB0aGUgcmVzdWx0IHRvXCIsXG4gICAgXCJnaXRsYWIuZW52LnltbFwiXG4gIClcbiAgLm9wdGlvbihcIi0tZW52aXJvbm1lbnQgPGVudmlyb25tZW50PlwiLCBcIlRoZSBsb2NhdGlvbiB0byBzYXZlIHRoZSByZXN1bHQgdG9cIilcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmV4ZWN1dGUocHJvZ3JhbSk7XG4iXX0=