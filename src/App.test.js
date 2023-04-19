import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Layout from './components/layout/Layout';
import AllMeetupsPage from './pages/AllMeetupsPage';
import FavoritesPage from './pages/Favorites';
import NewMeetupsPage from './pages/NewMeetup';
import { MeetupsProvider } from './context/MeetupsContext';

describe('App', () => {
  it('renders Layout and AllMeetupsPage on route /', () => {
    const app = mount(
      <MeetupsProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </MeetupsProvider>
    );
    expect(app.find(Layout)).toHaveLength(1);
    expect(app.find(AllMeetupsPage)).toHaveLength(1);
    expect(app.find(NewMeetupsPage)).toHaveLength(0);
    expect(app.find(FavoritesPage)).toHaveLength(0);
    app.unmount();
  });

  it('renders Layout and NewMeetupsPage on route /new-meetup', () => {
    const app = mount(
      <MeetupsProvider>
        <MemoryRouter initialEntries={['/new-meetup']}>
          <App />
        </MemoryRouter>
      </MeetupsProvider>
    );
    expect(app.find(Layout)).toHaveLength(1);
    expect(app.find(AllMeetupsPage)).toHaveLength(0);
    expect(app.find(NewMeetupsPage)).toHaveLength(1);
    expect(app.find(FavoritesPage)).toHaveLength(0);
    app.unmount();
  });

  it('renders FavoritesPage on route /favorites', () => {
    const app = mount(
      <MeetupsProvider>
        <MemoryRouter initialEntries={['/favorites']}>
          <App />
        </MemoryRouter>
      </MeetupsProvider>
    );
    expect(app.find(Layout)).toHaveLength(1);
    expect(app.find(AllMeetupsPage)).toHaveLength(0);
    expect(app.find(NewMeetupsPage)).toHaveLength(0);
    expect(app.find(FavoritesPage)).toHaveLength(1);
    app.unmount();
  });
});
