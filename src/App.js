import "./App.css";
import InputForm from "./Components/InputForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Users } from "./Components/Users";
import Payment from "./Components/Payment.js";
function App() {
    let f = localStorage.getItem("Name");

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/register"
                        element={f == null ? <InputForm /> : <Payment />}
                    />
                    <Route path="/" element={<Users />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
