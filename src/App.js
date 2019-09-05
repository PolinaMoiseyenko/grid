import React from 'react';

import Grid from './Grid/Grid';
import { columns, pageSettings, defaultSettings } from './Grid/data.jsx';

class App extends React.Component {

  render() {
    return (
      <Grid columns={columns} pageSettings={pageSettings} defaultSettings={defaultSettings} />
    )
  }
}

export default App;
