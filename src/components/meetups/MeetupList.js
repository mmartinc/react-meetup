import { useContext } from 'react';
import { MeetupsContext } from './../../context/MeetupsContext';
import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

export default function MeetupList() {
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

  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem key={meetup.id} meetup={meetup} />
      ))}
    </ul>
  );
}
