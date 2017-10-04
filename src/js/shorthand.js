/**
 * Shorthand for document.querySelectorAll
 * @param  {String} selector a css selector
 * @return {Element[]} an array of element objects
 */
function select(selector){
  return Array.from(document.querySelectorAll(selector));
}
/**
 * Shorthand for document.getElementById
 * @param  {String} selector a css selector
 * @return {Element} an element
 */
function id(id){
  return document.getElementById(id);
}
/**
 * Shorthand for do
 * @param  {String} selector a css selector
 * @return {Element|null}          [description]
 */
function first(selector){
  return document.querySelector(selector);
}

select.byId = id;
select.first = first;
export default select;
