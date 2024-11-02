# Movies Search App

A single-page movie search application using [The Movie Database (TMDb) API](https://developers.themoviedb.org/). This app allows users to search for movies, view results in a paginated format, and sort/filter results based on release date and rating.

## Key Features

1. **Movie Search by Name**  
   - Users can search for movies by name using an input search field.
   - The app will make requests to the TMDb API to fetch movies based on the user's input.
   - Use TMDb's Search API for fetching movies:
     - Example: `https://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=Jack`
     - Refer to the [API Documentation](https://developer.themoviedb.org/docs/search-and-query-for-details) for more details.

2. **Pagination**  
   - Display search results in a paginated format, showing a set number of movies per page.
   - Provide navigation controls to move between pages.

3. **Sorting**  
   - Sort results by:
     - **Release Date**: Show the latest releases first.
     - **Rating**: Order by highest rating.
   - Implement sorting as a dropdown or buttons to toggle between options.

4. **Filter by Rating**  
   - Add a filter option for rating to limit the displayed movies based on a minimum rating.
