import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout showTag />}>
                    <Route index element={<Home />} />
                    <Route path="/:type" element={<Home />} />
                </Route>

                <Route path="/" element={<Layout />}>
                    <Route path="/video/:id" element={<Details />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
