import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
export default function InputForm() {
    const navigate = useNavigate();
    const [name, changeName] = useState("");
    const [age, changeAge] = useState();
    const [email, changeEmail] = useState("");
    const [batch, changeBatch] = useState("6-7 AM");
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };
    function handleSubmit() {
        if (name.length > 100 || name.length < 3) {
            alert("Name length should be in between 3 to 100.");
            return;
        }
        if (!validateEmail(email)) {
            alert("Invalid Email");
            return;
        }
        if (!(age >= 18 && age <= 65)) {
            alert("Age should be in between 18 to 65");
            return;
        }
        localStorage.setItem("Name", name);
        localStorage.setItem("Email", email);
        localStorage.setItem("batch", batch);
        window.location.reload();
    }
    return (
        <div className="Form">
            <h1 className="Title">Admission/ Fee Form</h1>
            <label> Name </label>
            <input
                type={"text"}
                className="Name"
                value={name}
                onChange={(e) => changeName(e.target.value)}
            />
            <label> Age </label>
            <input
                type={"number"}
                className="Age"
                value={age}
                onChange={(e) => changeAge(e.target.value)}
            />

            <label> Email </label>
            <input
                type={"email"}
                className="Email"
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
            />

            <label>Choose a batch:</label>
            <select
                name="batch"
                id="batch"
                className="Batch"
                value={batch}
                onChange={(e) => changeBatch(e.target.value)}
            >
                <option value="6-7 AM">6-7 AM</option>
                <option value="7-8 AM">7-8 AM</option>
                <option value="8-9 AM">8-9 AM</option>
                <option value="5-6 PM">5-6 PM</option>
            </select>

            <input type={"submit"} className="Submit" onClick={handleSubmit} />
        </div>
    );
}
