# Meetups Project with React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Short project solution

We create a quick access to the header top bar using an event listener added to the window, listening to the vertical direction of the page scroll. React Router v6 has been used to reflect the routes taken for SEO reasons. The application also includes a working meetup addition form, remove meetup button, a global context created using the useContext hook to provide a way of retrieving meetups data from a server as an initial state, and dispatch functions in order to manage this state. Finally, tests have been conducted on MeetupItem and App files to check if context and routing work correctly.

## Project solution

In order to create the animation for a quick access to the header top bar, we need to add an event listener to the window, listening to the vertical direction of the page scroll. For this, we use the useScrollDirection custom hook contained in @/components/layout/MainNavigation.js.
On this hook, we create a state with a default value of up, and we use an useEffect hook to track the position of the scrollbar. When the page is scrolled, it compares the previous scroll position with the current position, and depending on the difference, we set the scroll direction to either "up" or "down" if the direction has changed. Finally, the hook returns the current scroll direction.

We can see the hook in use in the MainNavigation component, under the scrollDirection constant. It then works as a boolean which activates or deactivates a certain class for the header, conveniently called "hide". If we take a look at the CSS module file for it, and since the header has been set a position: sticky and top: 0 attributes, in order to hide the bar, we position it 5rem over the top of the page. We round this off with a smooth animation under the header class.

Other improvements made to the MainNavigation file have been the creation of a working favorite meetups counter, attached to the meetups context, and an isActive class on the header links, which makes the current route stay illuminated.

Another requirement for the application was for it to reflect the routes taken for SEO reasons. In order to make this navigation work, we made use of the React Router v6 library. Its implementation was pretty simple, adding the BrowserRouter to the main index page, and adding the Routes element with the different routes to the App file. This removes a lot of clutter from the old file, and also lets us remove 3 constants from the @/utils/constants file, since we can get the same result from the route.

There are two main parts to consider here that were a little bit more tricky. In order to use the page layout, we need to position this as a route on top of the other ones in the App file. However, this isn't enough to make it work. In the @/components/layout/layout file, we change the children prop of the Layout to an Outlet component provided by React Router, which renders the child route element.

Another part to consider was the change in the MainNavigation file to Link components, instead of the usual a elements. This lets the user perform client navigation without the page updating.

On a third note, there is a requirement to make the favorites list work. A first step to making this favorites list work, was create a working meetups list, since the original MeetupList contained under the @/components/meetups was not iterating the list.

The approach we have taken for this was to make use of the useContext hook, to provide a global context for the application. Under a new route, @/context/MeetupsContext, we find code defining a way to retrieve meetups data from a server as an initial state (in this case a JSON file contained in the public folder), store it in a global context which we expose through a provider, and dispatch functions in order to manage this state, performing add, remove and update operations.

Then, the MeetupList file makes use of the useContext hook we previously talked about, displaying the current meetups contained in the state, mapping them in a list, through the MeetupItem component.

The new meetups stored in our context contain a new attribute, named isFavorite. As it suggests, it marks if the client has added this meetup to its favorites list. Therefore, the way of representing the FavoriteList is pretty simple, making use of the same MeetupList structure, but filtering the list to only contain those which contain a true isFavorite attribute.

Finally, as tests, the MeetupItem and App files are being tested, checking if context and routing work correctly. Some other things which were not explicit requirements but we considered important for the proper functioning of the application were:

- A working meetup addition form, which also restricts meetup input if any of the fields are empty.
- A remove meetup button to remove any undesired meetup.
