import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client'
import { Home } from './pages/Home/_Home.jsx'
import { BookPage } from './pages/BookPage/BookPage.jsx'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import books from '../public/data/books'
import { ChapterPage } from './pages/ChapterPage/ChapterPage.jsx'
import NavBar from './components/NavBar/NavBar.jsx'
import SplitScreen from './pages/SplitScreen/SplitScreen.jsx';
let routerList = [];

//each books page
for (let i = 0; i < books.length; i++) {
  let pathElement = {};
  pathElement["path"] = "/" + books[i].urlName;
  pathElement["element"] = <BookPage book={books[i]} />
  routerList.push(pathElement);
}

//each chapters page
for (let i = 0; i < books.length; i++) {
  for (let j = 0; j < books[i].numOfChapters + 1; j++) {
    let pathElement = {};
    pathElement["path"] = "/" + books[i].urlName + "/" + j;
    pathElement["element"] = <ChapterPage book={books[i]} chapter={j} />
    routerList.push(pathElement);
  }
}


const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/split-screen",
    element: <SplitScreen />,
  },
  ...routerList
])

export const LanguageContext = createContext();
export const ThemeContext = createContext();

function Main() {
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)
