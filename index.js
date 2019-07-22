const pugPlainLoader = require('pug-plain-loader');
const loaderUtils = require('loader-utils');
const appRoot = require('app-root-path');



function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generatingBackPath(count) {
    let str = '';
    for(let i = 0; i < count; i++) {
        str += '../'
    }
    return str;
}

function joinAlias(alias) {
    let arr = [];
    for (let key in alias) {
        arr.push(escapeRegExp(key));
    }   
    return  arr.join('|');
}

function replacePath(alias, source, pathToRoot) {
    let replaceStringRegExp = /^\s*(include|extends)\s+.*?$/mg;
    let replaceAliasRegExp = new RegExp('\\s+(' + joinAlias(alias) + ')');
    return source.replace(replaceStringRegExp, function(replaceStr) {
        let replaceRes = replaceStr.replace(replaceAliasRegExp, function(val, group) {
            return val.replace(group, pathToRoot + alias[group]);
        })
        return replaceRes || replaceStr;
    })
}

function preparePath(alias, resourcePath, source) {
    let filePathRegExp = new RegExp(escapeRegExp(appRoot.path) + '(?<path>.*)');
    let pathSplit = resourcePath.match(filePathRegExp).groups.path.match(/\\/g).length;
    let pathToRoot = generatingBackPath(pathSplit - 1);
    return replacePath(alias, source, pathToRoot);
}

module.exports = function(source) {
    const WEBPACK_OPTIONS = loaderUtils.getOptions(this);
    let pugString;
    try {
       pugString = Object.keys(WEBPACK_OPTIONS.alias).length > 0 ? preparePath(WEBPACK_OPTIONS.alias, this.resourcePath, source) : source;
    } catch(e) {
       pugString = source;
    }
    return pugPlainLoader.call(this, pugString)
}