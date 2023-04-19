import { createContext, useEffect, useReducer } from 'react';
import { FETCH_URL } from '../utils/constants';

export const MeetupsContext = createContext(null);
export const MeetupsDispatchContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEETUP':
      return [...state, action.payload];
    case 'TOGGLE_FAVORITE':
      return state.map((meetup) => {
        if (meetup.id === action.payload) {
          return { ...meetup, isFavorite: !meetup.isFavorite };
        }
        return meetup;
      });
    case 'REMOVE_MEETUP':
      return state.filter((meetup) => meetup.id !== action.payload);
    default:
      return state;
  }
};

export const MeetupsProvider = ({ children }) => {
  const [meetups, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const response = await fetch(FETCH_URL);
        const meetupsData = await response.json();
        meetupsData.forEach((meetup) => {
          const meetupWithFavorite = { ...meetup, isFavorite: false };
          dispatch({ type: 'ADD_MEETUP', payload: meetupWithFavorite });
        });
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchMeetups();
  }, []);

  return (
    <MeetupsContext.Provider value={meetups}>
      <MeetupsDispatchContext.Provider value={dispatch}>
        {children}
      </MeetupsDispatchContext.Provider>
    </MeetupsContext.Provider>
  );
};
