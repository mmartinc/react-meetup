import classes from './MeetupItem.module.css';
import Card from '../ui/Card';
import { useContext } from 'react';
import { MeetupsDispatchContext } from '../../context/MeetupsContext';

export default function MeetupItem(props) {
  const { meetup } = props;
  const dispatch = useContext(MeetupsDispatchContext);

  return (
    <li className={classes.item} data-test='meet-up-item'>
      <Card>
        <div className={classes.image}>
          <img src={meetup.image} alt={meetup.title} />
        </div>
        <div className={classes.content}>
          <h3>{meetup.title}</h3>
          <address>{meetup.address}</address>
          <p>{meetup.description}</p>
        </div>
        <div className={classes.actions}>
          <button
            onClick={() => {
              dispatch({
                type: 'TOGGLE_FAVORITE',
                payload: meetup.id,
              });
            }}
          >
            {meetup.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <button
            onClick={() =>
              dispatch({ type: 'REMOVE_MEETUP', payload: meetup.id })
            }
          >
            Remove Meetup
          </button>
        </div>
      </Card>
    </li>
  );
}
