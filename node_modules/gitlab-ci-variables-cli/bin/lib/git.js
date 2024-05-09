'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _gitUrlParse = require('git-url-parse');

var _gitUrlParse2 = _interopRequireDefault(_gitUrlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieves the URL to a Gitlab project from parsing the git remote `origin`.
 *
 * @param {function} getRemoteFn function that can get the remote URL
 * @return {Promise<string>}
 */
exports.default = (() => {
  var _ref = (0, _bluebird.coroutine)(function* (getRemoteFn) {
    const remote = yield getRemoteFn();
    const parts = (0, _gitUrlParse2.default)(remote);
    const protocol = parts.protocol === 'ssh' ? 'https' : parts.protocol;

    return `${protocol}://${parts.resource}/${parts.full_name}`;
  });

  function getUrlFromGitRemote(_x) {
    return _ref.apply(this, arguments);
  }

  return getUrlFromGitRemote;
})();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2l0LmpzIl0sIm5hbWVzIjpbImdldFJlbW90ZUZuIiwicmVtb3RlIiwicGFydHMiLCJwcm90b2NvbCIsInJlc291cmNlIiwiZnVsbF9uYW1lIiwiZ2V0VXJsRnJvbUdpdFJlbW90ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7Ozs7Ozs7c0NBTWUsV0FBbUNBLFdBQW5DLEVBQWdEO0FBQzdELFVBQU1DLFNBQVMsTUFBTUQsYUFBckI7QUFDQSxVQUFNRSxRQUFRLDJCQUFNRCxNQUFOLENBQWQ7QUFDQSxVQUFNRSxXQUFXRCxNQUFNQyxRQUFOLEtBQW1CLEtBQW5CLEdBQTJCLE9BQTNCLEdBQXFDRCxNQUFNQyxRQUE1RDs7QUFFQSxXQUFRLEdBQUVBLFFBQVMsTUFBS0QsTUFBTUUsUUFBUyxJQUFHRixNQUFNRyxTQUFVLEVBQTFEO0FBQ0QsRzs7V0FONkJDLG1COzs7O1NBQUFBLG1CIiwiZmlsZSI6ImdpdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXJzZSBmcm9tICdnaXQtdXJsLXBhcnNlJztcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIFVSTCB0byBhIEdpdGxhYiBwcm9qZWN0IGZyb20gcGFyc2luZyB0aGUgZ2l0IHJlbW90ZSBgb3JpZ2luYC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBnZXRSZW1vdGVGbiBmdW5jdGlvbiB0aGF0IGNhbiBnZXQgdGhlIHJlbW90ZSBVUkxcbiAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZ2V0VXJsRnJvbUdpdFJlbW90ZShnZXRSZW1vdGVGbikge1xuICBjb25zdCByZW1vdGUgPSBhd2FpdCBnZXRSZW1vdGVGbigpO1xuICBjb25zdCBwYXJ0cyA9IHBhcnNlKHJlbW90ZSk7XG4gIGNvbnN0IHByb3RvY29sID0gcGFydHMucHJvdG9jb2wgPT09ICdzc2gnID8gJ2h0dHBzJyA6IHBhcnRzLnByb3RvY29sO1xuXG4gIHJldHVybiBgJHtwcm90b2NvbH06Ly8ke3BhcnRzLnJlc291cmNlfS8ke3BhcnRzLmZ1bGxfbmFtZX1gO1xufVxuIl19