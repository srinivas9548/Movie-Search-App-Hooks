import React from "react";

const MovieContext = React.createContext({
    lightTheme: true,
    changeTheme: () => {},
    isSearchbarOpen: false,
    toggleSearchbar: () => {}

})

export default MovieContext