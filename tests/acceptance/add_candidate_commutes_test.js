
Feature('Add candidate commutes');

Scenario('test something', (I) => {
  I.amOnPage('/');
  I.click('#add-commute.mode');
  // need a method to test for
  I.moveCursorTo(1,1); //TODO: get demo pixel coords
  I.click();
  I.moveCursorTo(1,1); //TODO: get demo pixel coords
  I.click();
});
