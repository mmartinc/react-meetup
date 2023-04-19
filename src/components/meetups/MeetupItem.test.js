import React from 'react';
import { shallow } from 'enzyme';
import MeetupItem from './MeetupItem';
import Card from '../ui/Card';
import { MeetupsDispatchContext } from '../../context/MeetupsContext';

describe('MeetupItem component', () => {
  const mockMeetup = {
    id: '1',
    image: 'test-image.jpg',
    title: 'Test Meetup',
    address: 'Test Street 123',
    description: 'This is a test meetup',
    isFavorite: false,
  };
  const mockDispatch = jest.fn();

  let realUseContext;
  let useContextMock;

  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    React.useContext = realUseContext;
  });

  it('renders correctly', () => {
    const wrapper = shallow(<MeetupItem meetup={mockMeetup} />, {
      wrappingComponent: MeetupsDispatchContext.Provider,
      wrappingComponentProps: { value: mockDispatch },
    });

    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.find(`[data-test="meet-up-item"]`)).toHaveLength(1);
    expect(wrapper.find(`img[src="${mockMeetup.image}"]`)).toHaveLength(1);
    expect(wrapper.find('h3').text()).toEqual(mockMeetup.title);
    expect(wrapper.find('address').text()).toEqual(mockMeetup.address);
    expect(wrapper.find('p').text()).toEqual(mockMeetup.description);
  });

  it('dispatches "TOGGLE_FAVORITE" action when "Add to Favorites" button is clicked', () => {
    useContextMock.mockReturnValue(mockDispatch);

    const wrapper = shallow(<MeetupItem meetup={mockMeetup} />, {
      wrappingComponent: MeetupsDispatchContext.Provider,
      wrappingComponentProps: { value: mockDispatch },
    });

    wrapper.find('button').first().props().onClick();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_FAVORITE',
      payload: mockMeetup.id,
    });
  });

  it('dispatches "REMOVE_MEETUP" action when "Remove Meetup" button is clicked', () => {
    useContextMock.mockReturnValue(mockDispatch);

    const wrapper = shallow(<MeetupItem meetup={mockMeetup} />, {
      wrappingComponent: MeetupsDispatchContext.Provider,
      wrappingComponentProps: { value: mockDispatch },
    });

    wrapper.find('button').last().props().onClick();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_MEETUP',
      payload: mockMeetup.id,
    });
  });
});
