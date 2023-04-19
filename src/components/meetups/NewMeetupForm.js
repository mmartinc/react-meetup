import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';
import { useContext, useEffect, useState } from 'react';
import {
  MeetupsDispatchContext,
  MeetupsContext,
} from '../../context/MeetupsContext';

export default function NewMeetupForm() {
  function submitHandler(event) {
    event.preventDefault();
  }

  const meetups = useContext(MeetupsContext);
  const nextId = `m${meetups.length + 1}`;
  const dispatch = useContext(MeetupsDispatchContext);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    const isFormValid = () => {
      return (
        title !== '' && image !== '' && address !== '' && description !== ''
      );
    };
    setIsButtonDisabled(!isFormValid());
  }, [title, image, address, description]);

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input
            type='text'
            required
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input
            type='url'
            required
            id='image'
            value={image}
            onChange={handleImageChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            required
            id='address'
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button
            disabled={isButtonDisabled}
            onClick={() => {
              dispatch({
                type: 'ADD_MEETUP',
                payload: {
                  id: nextId,
                  title: title,
                  image: image,
                  address: address,
                  description: description,
                  isFavorite: false,
                },
              });
              setTitle('');
              setImage('');
              setAddress('');
              setDescription('');
            }}
          >
            Add Meetup
          </button>
        </div>
      </form>
    </Card>
  );
}
