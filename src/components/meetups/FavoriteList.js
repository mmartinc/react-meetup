import { useContext } from 'react';
import { MeetupsContext } from '../../context/MeetupsContext';
import MeetupItem from './MeetupItem';
import styles from './FavoriteList.module.css';

export default function FavoriteList() {
  const meetups = useContext(MeetupsContext);

  if (!meetups) return <p>Loading...</p>;

  if (meetups.error) {
    return (
      <>
        <h2>There was an error loading the meetups list</h2>
        <p>{meetups.error}</p>
      </>
    );
  }

  if (meetups.length === 0) {
    return <p>No meetups found.</p>;
  }

  const favoriteMeetups = meetups.filter((meetup) => meetup.isFavorite);

  if (favoriteMeetups.length === 0) {
    return <p>No favorite meetups found. Start adding some!</p>;
  }

  return (
    <ul className={styles.list}>
      {favoriteMeetups.map((meetup) => (
        <MeetupItem key={meetup.id} meetup={meetup} />
      ))}
    </ul>
  );
}
