#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).command('set', 'set a variable').command('setAll', 'set all variables').command('getAll', 'load all variables').parse(process.argv);

if (!process.argv.slice(1).length) {
  _commander2.default.outputHelp();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nbGNpLmpzIl0sIm5hbWVzIjpbInZlcnNpb24iLCJjb21tYW5kIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsInNsaWNlIiwibGVuZ3RoIiwib3V0cHV0SGVscCJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxvQkFDR0EsT0FESCxDQUNXLGtCQUFXQSxPQUR0QixFQUVHQyxPQUZILENBRVcsS0FGWCxFQUVrQixnQkFGbEIsRUFHR0EsT0FISCxDQUdXLFFBSFgsRUFHcUIsbUJBSHJCLEVBSUdBLE9BSkgsQ0FJVyxRQUpYLEVBSXFCLG9CQUpyQixFQUtHQyxLQUxILENBS1NDLFFBQVFDLElBTGpCOztBQU9BLElBQUksQ0FBQ0QsUUFBUUMsSUFBUixDQUFhQyxLQUFiLENBQW1CLENBQW5CLEVBQXNCQyxNQUEzQixFQUFtQztBQUNqQyxzQkFBUUMsVUFBUjtBQUNEIiwiZmlsZSI6ImdsY2kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHByb2dyYW0gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCBucG1QYWNrYWdlIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5cbnByb2dyYW1cbiAgLnZlcnNpb24obnBtUGFja2FnZS52ZXJzaW9uKVxuICAuY29tbWFuZCgnc2V0JywgJ3NldCBhIHZhcmlhYmxlJylcbiAgLmNvbW1hbmQoJ3NldEFsbCcsICdzZXQgYWxsIHZhcmlhYmxlcycpXG4gIC5jb21tYW5kKCdnZXRBbGwnLCAnbG9hZCBhbGwgdmFyaWFibGVzJylcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmICghcHJvY2Vzcy5hcmd2LnNsaWNlKDEpLmxlbmd0aCkge1xuICBwcm9ncmFtLm91dHB1dEhlbHAoKTtcbn1cbiJdfQ==