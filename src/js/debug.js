/* global ENV */
import {debug} from 'debug';
if (ENV != 'production'){
  debug.disable('*');
  debug.enable('app:*');
} else {
  debug.disable();
}
export default debug;
