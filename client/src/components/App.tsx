import * as React from 'react';

import Navbar from './layout/Navbar';
import Main from './layout/Main';

function App() {
  return (
    <div>
      <Navbar isLoggedIn={false} logoutUser={() => 'Logged out!'} />
      <Main />
    </div>
  );
}

export default App;
