import { Routes, Route } from 'react-router-dom';
import Notices from './Pages/Notices';
import User from './Pages/User';
import Layout from './Pages/Layout/Layout';
import NotFound from './components/NotFound';
import LoginWrapper from './components/LoginWrapper';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Notices /> } />
        <Route path="/user" element={ <User /> } />
        <Route path="/login" element={ <LoginWrapper /> } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
