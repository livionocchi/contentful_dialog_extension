import React from 'react';
import ReactDOM from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import Dialog from './components/Dialog'
import Field from './components/Field'
import 'bootstrap/dist/css/bootstrap.min.css';

export const initialize = sdk => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    ReactDOM.render(<Dialog sdk={sdk} />, document.getElementById('root'));
  } else {
    ReactDOM.render(<Field sdk={sdk} />, document.getElementById('root'));
  }
};

init(initialize);
