# Album Viewer Mini-Site

This project is a mini-site built using TypeScript and ReactJS for viewing albums.
It allows users to manage albums and images associated with them.

## Features

- Display a list of users with their details and the number of albums they own, and a generated avatar.
- Add new user.
- Delete existing user.
- Edit user details.
- View albums of a specific user.
- Display album thumbnails with their names.
- Add new album.
- Delete existing album.
- Edit album details.
- View images in a gallery format while keeping responsiveness.
- View individual images in a carousel format.
- Handle empty state for albums.
- Implement loading state for images.
- Handle error state when an image fails to load.

## Data Handling

The project features a flexible data handling that can retrieve data either from local constants or from a MongoDB database.
While full integration with MongoDB is **not yet completed**, some queries have been implemented.
A data handler module (src/models/dataHandler.ts) fetched the initial data and determines the data source based on an environment variable,
allowing seamless switching between local and database data.

## Future Improvements

Given more time, here are some enhancements that could be made:

- **Authentication and Authorization:** Implement user authentication and manage permissions to allow users to view and perform CRUD operations only on their own albums/images. Include features such as making an album public or assigning specific permissions to other users.
- **Bulk Operations:** Enable bulk deletion of multiple users/albums/images at once.
- **Pagination:** Implement pagination for users and albums to efficiently manage large datasets.
- **Virtualization:** Implement virtualization to optimize rendering performance, especially for large lists of users and albums.
- **Tests:** Add comprehensive test coverage to ensure the reliability and stability of the application.
- **Multiple Image Upload:** Allow users to upload multiple images to a certain album.
- **Carousel Enhancements:** Include metadata for each image in the carousel, such as name, date of creation, location, and the album it belongs to.
- **User-Friendly Feedback:** Add user-friendly success and failure banners or notifications to enhance the user experience and provide clear feedback on operations.

## Usage

To run the project locally:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the development server using `npm start`.

## Credits

This project utilizes components from [Material-UI](https://material-ui.com/).

## Contributors

Ron Bershatsky

## License

This project is licensed under the [MIT License](LICENSE).

## Hope you enjoyed!
<img width="200px" src="https://robohash.org/1?set=set1">
