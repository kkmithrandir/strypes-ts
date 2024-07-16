let options = [
    '--require-module ts-node/register',
    '--require ./steps/*.steps.ts',
    'cucumber-js -f @cucumber/pretty-formatter',
    '--publish'
].join(' ');

let run_features = [
    './features/',
    options,
].join(' ');

module.exports = {
    test_runner: run_features
};