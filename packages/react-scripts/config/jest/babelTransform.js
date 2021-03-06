/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const babelJest = require('babel-jest');
const getCustomConfig = require('../get-custom-config');
const customConfig = getCustomConfig(false);
const tsc = require('typescript');

const babelTransformer = babelJest.createTransformer({
  presets: [require.resolve('babel-preset-react-app')].concat(customConfig.presets),
  plugins: [].concat(customConfig.babelPlugins),
  babelrc: false
});

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      src = tsc.transpile(
          src,
          {
            module: tsc.ModuleKind.CommonJS,
            jsx: tsc.JsxEmit.React
          },
          path,
          []
      );
    }

    return babelTransformer.process(src, path);
  }
};
