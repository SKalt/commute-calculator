/* global ENV */
import {debug} from 'debug';
if (ENV != 'production'){
  debug.enable('*');
} else {
  debug.disable();
}
export default debug;
