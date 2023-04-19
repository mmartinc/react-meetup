import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

import AllMeetupsPage from './pages/AllMeetupsPage';
import FavoritesPage from './pages/Favorites';
import NewMeetupsPage from './pages/NewMeetup';

import { MeetupsProvider } from './context/MeetupsContext';

function App() {
  return (
    <MeetupsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path='/' element={<AllMeetupsPage />} />
          <Route exact path='/new-meetup' element={<NewMeetupsPage />} />
          <Route exact path='/favorites' element={<FavoritesPage />} />
        </Route>
      </Routes>
    </MeetupsProvider>
  );
}

export default App;
