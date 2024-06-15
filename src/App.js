import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ManageBeneficiaries from '../src/component/ManageBeneficiaries';
import AddBeneficiary from '../src/component//AddBeneficiary';
import EditBeneficiary from '../src/component//EditBeneficiary';
import ViewBeneficiary from '../src/component/ViewBeneficiary';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ManageBeneficiaries />} />
          <Route path="/add" element={<AddBeneficiary />} />
          <Route path="/edit/:id" element={<EditBeneficiary />} />
          <Route path="/view/:id" element={<ViewBeneficiary />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
