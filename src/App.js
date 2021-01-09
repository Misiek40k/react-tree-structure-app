import { Fragment } from 'react';

import Header from './components/layout/Header/Header';
import DataTreeRoot from './components/layout/DataTreeRoot/DataTreeRoot';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <DataTreeRoot />
      </main>
    </Fragment>
  );
};

export default App;
