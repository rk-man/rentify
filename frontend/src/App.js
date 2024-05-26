import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import MyPropertiesPage from "./pages/MyPropertiesPage";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import HomePage from "./pages/HomePage";
import ViewProperty from "./pages/ViewProperty";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route element={<LoginPage />} path="/users/login" />
                <Route element={<RegisterPage />} path="/users/register" />
                <Route element={<MyPropertiesPage />} path="/properties" />
                <Route element={<AddProperty />} path="/properties/create" />
                <Route
                    element={<EditProperty />}
                    path="/properties/:propertyId/edit"
                />
                <Route element={<HomePage />} path="/" />
                <Route
                    path="/properties/:propertyId/view"
                    element={<ViewProperty />}
                />
            </Routes>
        </Router>
    );
}

export default App;
