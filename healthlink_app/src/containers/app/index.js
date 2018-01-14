import React from 'react';
import { Route, Link } from 'react-router-dom'
// import Home from '../home'
// import About from '../about'
import RxList from '../prescriptions';

const App = () => (
  <div>
    <main>
      <Route path="/" component={RxList} />
    </main>
  </div>
)

export default App
