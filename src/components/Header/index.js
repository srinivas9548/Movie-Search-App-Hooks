import { IoMoon, IoSunny, IoSearch } from "react-icons/io5";

import MovieContext from "../../context/MovieContext";

import './index.css'

const Header = (props) => {
    const { searchInput, onChangeSearchInput, onClickSearchBtn } = props

    const onChangeKeyDown = (event) => {
        if (event.key === "Enter") {
            onClickSearchBtn()
        }
    }

    return (
        <MovieContext.Consumer>
            {value => {
                const { lightTheme, changeTheme, isSearchbarOpen, toggleSearchbar } = value

                const navHeaderClassName = lightTheme ? 'light' : 'dark'
                const movieHeadingClassName = lightTheme ? 'light' : 'dark'
                const searchBtnClassName = lightTheme ? 'light' : 'dark'
                const searchIconClassName = lightTheme ? 'light' : 'dark'

                return (
                    <nav className={`nav-header ${navHeaderClassName}`}>
                        <div className="nav-content">
                            <div className="nav-mobile-container">
                                <h1 className={`movie-name-heading ${movieHeadingClassName}`}>MOVIE NAME</h1>
                                <IoSearch onClick={toggleSearchbar} className={`search-mobile-icon ${searchIconClassName}`} />
                                {lightTheme ? (
                                    <IoMoon className="dark-icon" onClick={changeTheme} />
                                ) : (
                                    <IoSunny className="light-icon" onClick={changeTheme} />
                                )}
                            </div>
                            <div className="nav-desktop-container">
                                <h1 className={`movie-name-heading ${movieHeadingClassName}`}>MOVIE NAME</h1>
                                <input
                                    type="search"
                                    className="input-search-box"
                                    placeholder="Search Movie Name"
                                    value={searchInput}
                                    onChange={onChangeSearchInput}
                                    onKeyDown={onChangeKeyDown}
                                />
                                <button
                                    type="button"
                                    className={`search-button ${searchBtnClassName}`}
                                    onClick={onClickSearchBtn}
                                >
                                    Search
                                </button>
                                {lightTheme ? (
                                    <IoMoon className="dark-icon" onClick={changeTheme} />
                                ) : (
                                    <IoSunny className="light-icon" onClick={changeTheme} />
                                )}
                            </div>
                        </div>

                        {/* is Search bar open */}
                        {isSearchbarOpen && (
                            <div className="search-bar-container">
                                <input
                                    type="search"
                                    className="input-search-box"
                                    placeholder="Search Movie Name"
                                    value={searchInput}
                                    onChange={onChangeSearchInput}
                                    onKeyDown={onChangeKeyDown}
                                />
                                <button
                                    type="button"
                                    className={`search-button ${searchBtnClassName}`}
                                    onClick={onClickSearchBtn}
                                >
                                    Search
                                </button>
                            </div>
                        )}
                    </nav>
                )
            }}
        </MovieContext.Consumer>
    )
}

export default Header