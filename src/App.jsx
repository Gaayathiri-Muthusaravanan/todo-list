import Header from "./shared/Header";
import './App.css';

import { Routes,Route } from "react-router";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";
import ProfilePage from "./pages/ProfilePage";
import RequireAuth from "./components/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
 
  return (
   <div id="appContainer">
    <Header/>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path='/todos'
          element={
            <RequireAuth>
              <TodosPage />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
  </div>
  );
}

export default App
