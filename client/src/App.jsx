import { Route, Routes, useNavigate } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { LoginPage } from "./pages/loginpage";
import { RegisterPage } from "./pages/registerpage";
import { CommunityPage } from "./pages/community-page";
import { ExplorePage } from "./pages/explore-page";
import ProtectedRoute from "./components/protected-route";
import { CommunityPostPage } from "./pages/community-post-page";
import { CreatePostPage } from "./pages/create-post-page";
import { Provider } from "react-redux";
import SearchPage from "./pages/search-page";
import store from "./redux/store";
import { initiateSocketConnection } from "./utils/socket";
import { useEffect } from "react";
import { loginUser } from "./utils/auth";
import ProfilePopover  from "./pages/ProfilePopover";
import "../../client/src/App.css";

function App() {
  initiateSocketConnection();
  const navigate = useNavigate();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#user=")) {
      const user = JSON.parse(decodeURIComponent(hash.slice(6)));
      loginUser(user);
      navigate("/explore");
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />

          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />

          <Route path="/community/:communityId" element={<CommunityPage />} />
          <Route
            path="/community/:communityId/:postId"
            element={<CommunityPostPage />}
          />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/jsx" element={<ProfilePopover/>}/> TESTING */}
        </Routes>
      </Provider>
    </>
  );
}

export default App;