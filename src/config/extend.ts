const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
import { think } from 'thinkjs';
// import Upload from '../extend/upload'

module.exports = [
  view, // make application support view
  model(think.app),
  cache,
  session
];
