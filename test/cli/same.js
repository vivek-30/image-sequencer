looksSame = require('looks-same');
looksSame(process.argv[2], process.argv[3], function(error, {equal}) {
  // equal will be true, if images looks the same
  console.log(equal ? 1 : 0);
});
