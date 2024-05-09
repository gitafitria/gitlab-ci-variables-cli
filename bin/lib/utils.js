'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperties = exports.getConf = undefined;

var _bluebird = require('bluebird');

let getConf = (() => {
  var _ref = (0, _bluebird.coroutine)(function* () {
    const conf = (0, _rc2.default)('gitlab');
    const errors = [];

    // Check for token
    if (!conf.token) {
      if (!process.env.GITLAB_TOKEN) {
        errors.push('No Gitlab token given.');
      } else {
        conf.token = process.env.GITLAB_TOKEN;
        console.log('Using token from environment variable GITLAB_TOKEN.');
      }
    }

    if (conf.config) {
      console.log(`Using token from ${conf.config}.`);
    }

    // If there is no url provided, get it!
    if (!conf.url) {
      try {
        conf.url = yield (0, _git2.default)(_gitRemoteOriginUrl2.default);
        console.log('No URL specified, using git remote `origin`.');
      } catch (err) {
        errors.push('No Gitlab project URL given.');
      }
    }

    if (!conf.output) {
      conf.output = gitlabEnvFileName;
    }

    if (errors.length > 0) {
      console.error(errors.join('\n'));
      process.exit(1);
    }

    return conf;
  });

  return function getConf() {
    return _ref.apply(this, arguments);
  };
})();

var _rc = require('rc');

var _rc2 = _interopRequireDefault(_rc);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gitRemoteOriginUrl = require('git-remote-origin-url');

var _gitRemoteOriginUrl2 = _interopRequireDefault(_gitRemoteOriginUrl);

var _git = require('./git');

var _git2 = _interopRequireDefault(_git);

var _propertiesFile = require('./properties-file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gitlabEnvFileName = 'gitlab.env.yml';

function getProperties() {
  const cwd = process.cwd();
  const path = `${cwd}/${gitlabEnvFileName}`;

  if (!_fs2.default.existsSync(path)) {
    console.error(`${gitlabEnvFileName} does not exist`);
    process.exit(1);
  }

  return (0, _propertiesFile.loadPropertiesFile)(path);
}

exports.getConf = getConf;
exports.getProperties = getProperties;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvdXRpbHMuanMiXSwibmFtZXMiOlsiY29uZiIsImVycm9ycyIsInRva2VuIiwicHJvY2VzcyIsImVudiIsIkdJVExBQl9UT0tFTiIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiY29uZmlnIiwidXJsIiwiZXJyIiwib3V0cHV0IiwiZ2l0bGFiRW52RmlsZU5hbWUiLCJsZW5ndGgiLCJlcnJvciIsImpvaW4iLCJleGl0IiwiZ2V0Q29uZiIsImdldFByb3BlcnRpZXMiLCJjd2QiLCJwYXRoIiwiZXhpc3RzU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztzQ0FRQSxhQUF5QjtBQUN2QixVQUFNQSxPQUFPLGtCQUFHLFFBQUgsQ0FBYjtBQUNBLFVBQU1DLFNBQVMsRUFBZjs7QUFFQTtBQUNBLFFBQUksQ0FBQ0QsS0FBS0UsS0FBVixFQUFpQjtBQUNmLFVBQUksQ0FBQ0MsUUFBUUMsR0FBUixDQUFZQyxZQUFqQixFQUErQjtBQUM3QkosZUFBT0ssSUFBUCxDQUFZLHdCQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0xOLGFBQUtFLEtBQUwsR0FBYUMsUUFBUUMsR0FBUixDQUFZQyxZQUF6QjtBQUNBRSxnQkFBUUMsR0FBUixDQUFZLHFEQUFaO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJUixLQUFLUyxNQUFULEVBQWlCO0FBQ2ZGLGNBQVFDLEdBQVIsQ0FBYSxvQkFBbUJSLEtBQUtTLE1BQU8sR0FBNUM7QUFDRDs7QUFFRDtBQUNBLFFBQUksQ0FBQ1QsS0FBS1UsR0FBVixFQUFlO0FBQ2IsVUFBSTtBQUNGVixhQUFLVSxHQUFMLEdBQVcsTUFBTSxnREFBakI7QUFDQUgsZ0JBQVFDLEdBQVIsQ0FBWSw4Q0FBWjtBQUNELE9BSEQsQ0FHRSxPQUFPRyxHQUFQLEVBQVk7QUFDWlYsZUFBT0ssSUFBUCxDQUFZLDhCQUFaO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJLENBQUNOLEtBQUtZLE1BQVYsRUFBa0I7QUFDaEJaLFdBQUtZLE1BQUwsR0FBY0MsaUJBQWQ7QUFDRDs7QUFFRCxRQUFJWixPQUFPYSxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCUCxjQUFRUSxLQUFSLENBQWNkLE9BQU9lLElBQVAsQ0FBWSxJQUFaLENBQWQ7QUFDQWIsY0FBUWMsSUFBUixDQUFhLENBQWI7QUFDRDs7QUFFRCxXQUFPakIsSUFBUDtBQUNELEc7O2tCQXRDY2tCLE87Ozs7O0FBUmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLE1BQU1MLG9CQUFvQixnQkFBMUI7O0FBMENBLFNBQVNNLGFBQVQsR0FBeUI7QUFDdkIsUUFBTUMsTUFBTWpCLFFBQVFpQixHQUFSLEVBQVo7QUFDQSxRQUFNQyxPQUFRLEdBQUVELEdBQUksSUFBR1AsaUJBQWtCLEVBQXpDOztBQUVBLE1BQUksQ0FBQyxhQUFHUyxVQUFILENBQWNELElBQWQsQ0FBTCxFQUEwQjtBQUN4QmQsWUFBUVEsS0FBUixDQUFlLEdBQUVGLGlCQUFrQixpQkFBbkM7QUFDQVYsWUFBUWMsSUFBUixDQUFhLENBQWI7QUFDRDs7QUFFRCxTQUFPLHdDQUFtQkksSUFBbkIsQ0FBUDtBQUNEOztRQUdDSCxPLEdBQUFBLE87UUFDQUMsYSxHQUFBQSxhIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJjIGZyb20gJ3JjJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgZ2l0UmVtb3RlT3JpZ2luVXJsIGZyb20gJ2dpdC1yZW1vdGUtb3JpZ2luLXVybCc7XG5pbXBvcnQgZ2V0VXJsRnJvbUdpdFJlbW90ZSBmcm9tICcuL2dpdCc7XG5pbXBvcnQgeyBsb2FkUHJvcGVydGllc0ZpbGUgfSBmcm9tICcuL3Byb3BlcnRpZXMtZmlsZSc7XG5cbmNvbnN0IGdpdGxhYkVudkZpbGVOYW1lID0gJ2dpdGxhYi5lbnYueW1sJztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29uZigpIHtcbiAgY29uc3QgY29uZiA9IHJjKCdnaXRsYWInKTtcbiAgY29uc3QgZXJyb3JzID0gW107XG5cbiAgLy8gQ2hlY2sgZm9yIHRva2VuXG4gIGlmICghY29uZi50b2tlbikge1xuICAgIGlmICghcHJvY2Vzcy5lbnYuR0lUTEFCX1RPS0VOKSB7XG4gICAgICBlcnJvcnMucHVzaCgnTm8gR2l0bGFiIHRva2VuIGdpdmVuLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25mLnRva2VuID0gcHJvY2Vzcy5lbnYuR0lUTEFCX1RPS0VOO1xuICAgICAgY29uc29sZS5sb2coJ1VzaW5nIHRva2VuIGZyb20gZW52aXJvbm1lbnQgdmFyaWFibGUgR0lUTEFCX1RPS0VOLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb25mLmNvbmZpZykge1xuICAgIGNvbnNvbGUubG9nKGBVc2luZyB0b2tlbiBmcm9tICR7Y29uZi5jb25maWd9LmApO1xuICB9XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gdXJsIHByb3ZpZGVkLCBnZXQgaXQhXG4gIGlmICghY29uZi51cmwpIHtcbiAgICB0cnkge1xuICAgICAgY29uZi51cmwgPSBhd2FpdCBnZXRVcmxGcm9tR2l0UmVtb3RlKGdpdFJlbW90ZU9yaWdpblVybCk7XG4gICAgICBjb25zb2xlLmxvZygnTm8gVVJMIHNwZWNpZmllZCwgdXNpbmcgZ2l0IHJlbW90ZSBgb3JpZ2luYC4nKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVycm9ycy5wdXNoKCdObyBHaXRsYWIgcHJvamVjdCBVUkwgZ2l2ZW4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25mLm91dHB1dCkge1xuICAgIGNvbmYub3V0cHV0ID0gZ2l0bGFiRW52RmlsZU5hbWU7XG4gIH1cblxuICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG5cbiAgcmV0dXJuIGNvbmY7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnRpZXMoKSB7XG4gIGNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG4gIGNvbnN0IHBhdGggPSBgJHtjd2R9LyR7Z2l0bGFiRW52RmlsZU5hbWV9YDtcblxuICBpZiAoIWZzLmV4aXN0c1N5bmMocGF0aCkpIHtcbiAgICBjb25zb2xlLmVycm9yKGAke2dpdGxhYkVudkZpbGVOYW1lfSBkb2VzIG5vdCBleGlzdGApO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHJldHVybiBsb2FkUHJvcGVydGllc0ZpbGUocGF0aCk7XG59XG5cbmV4cG9ydCB7XG4gIGdldENvbmYsXG4gIGdldFByb3BlcnRpZXMsXG59O1xuIl19