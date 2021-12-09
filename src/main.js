'use strict';

function getStartButtonElement() {
  const START_BUTTON_SELECTOR =
    'button.abstract_link.web_tracker_item_action-button.is-play.is-button';

  return document.querySelector(START_BUTTON_SELECTOR);
}

function getStopButtonElement() {
  const STOP_BUTTON_SELECTOR =
    'button.abstract_link.web_tracker_item_action-button.is-stop.is-button';

  return document.querySelector(STOP_BUTTON_SELECTOR);
}

function getDescriptionInputElement() {
  const DESCRIPTION_SELECTOR = 'input#description';

  return document.querySelector(DESCRIPTION_SELECTOR);
}

//#region Configuration

const INTERVAL_IN_MINUTES = 60;

const TRACKING_DESCRIPTION = 'Wallow';

//#endregion

const INTERVAL_IN_MILLISECONDS = INTERVAL_IN_MINUTES * 60 * 1000;

async function main() {
  const RANDOM_INTERVAL_OFFSET =
    INTERVAL_IN_MILLISECONDS + getRandomIntervalOffset();

  startTracking();

  await sleep(RANDOM_INTERVAL_OFFSET);

  stopTracking();

  // Start again
  main();
}

function startTracking() {
  getStartButtonElement().click();

  const DESCRIPTION_INPUT_ELEMENT = getDescriptionInputElement();

  triggerReactInputChange(DESCRIPTION_INPUT_ELEMENT, TRACKING_DESCRIPTION);
}

function stopTracking() {
  getStopButtonElement().click();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomIntervalOffset() {
  // Random number between 0 and 10
  const RANDOM_NUMBER = Math.floor(Math.random() * 10);

  const RANDOM_INTERVAL_OFFSET = RANDOM_NUMBER * 60 * 1000;
  return RANDOM_INTERVAL_OFFSET;
}

function triggerReactInputChange(node, value = '') {
  const AVAILABLE_INPUT_TYPES = [
    window.HTMLInputElement,
    window.HTMLTextAreaElement,
  ];

  // only process the change on elements we know have a value setter in their constructor
  if (AVAILABLE_INPUT_TYPES.indexOf(node.__proto__.constructor) > -1) {
    const SET_VALUE = Object.getOwnPropertyDescriptor(node.__proto__, 'value')
      .set;

    const INPUT_EVENT = new Event('input', { bubbles: true });

    SET_VALUE.call(node, value);

    node.dispatchEvent(INPUT_EVENT);
  }
}

// Start the script
main();
