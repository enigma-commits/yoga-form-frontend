import React, { useEffect } from "react";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = (props) => {
    const navigate = useNavigate();
    const [cardNumber, handleCardNumberChange] = useState("");
    const [expiryMonth, handleCardExpiryMonthChange] = useState("");
    const [expiryYear, handleCardExpiryYearChange] = useState("");
    const [cvv, handleCardCVVChange] = useState("");
    const name = localStorage.getItem("Name");
    const email = localStorage.getItem("Email");
    const batch = localStorage.getItem("batch");
    if(name==null){
        window.location.reload();
    }
    function editDetails() {
        localStorage.removeItem("Name");
        window.location.reload();
    }
    function validate(){
        if(cardNumber.toString().length<16){
            alert("Invalid Card Number");
            return false;
        }
        if(expiryMonth.toString().length===0){
            alert("Invalid Expiry Month");
            return false;
        }
        if(expiryYear.toString().length!==4){
            alert("Invalid Expiry Year");
            return false;
        }
        if(cvv.toString().length!==3){
            alert("Invalid CVV");
            return false;
        }
        const date = new Date();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        if(year>parseInt(expiryYear)){
            alert("Expired Card");
            return false;
        }
        if(year===parseInt(expiryYear) && month>=parseInt(expiryMonth)){
            alert("Expired Card");
            return false;
        }
        return true;
    }
    async function registerUser() {
        if(!validate()){
            return;
        }
        await axios
            .post("https://yoga-form-backend.onrender.com/register", {
                Name: name,
                Email: email,
                Batch: batch,
            })
            .then((res) => {
                alert(res.data.Message);
                localStorage.removeItem("Name");
                navigate("/");
            })
            .catch((err) => {
                alert(err);
            });
    }
    return (
        <div className="PaymentForm">
            <h1>Payment Form </h1>
            <p> Please verify your details before Payment. </p>
            <label>Name:</label>
            <input
                name="name"
                className="Name"
                type={"text"}
                value={name}
                readOnly
            />
            <label>Email:</label>
            <input
                name="email"
                className="Email"
                type="text"
                value={email}
                readOnly
            />
            <label>Batch:</label>
            <input
                name="batch"
                className="Batch"
                type="text"
                value={batch}
                readOnly
            />
            <label>Amount: </label>
            <input
                name="amount"
                type={"number"}
                value={"500"}
                className="Name"
                readOnly
            />
            <div className="Card">
                <div
                    className={
                        cardNumber.toString().length > 0
                            ? cardNumber.toString()[0] === "4"
                                ? "visa"
                                : cardNumber.toString()[0] === "5"
                                ? "master"
                                : cardNumber.toString()[0] === "6"
                                ? "rupay"
                                : "nocard"
                            : "nocard"
                    }
                ></div>
                <input
                    placeholder="Card Number"
                    type="number"
                    value={cardNumber}
                    className="cardNumber"
                    onChange={(e) => {
                        if (e.target.value.toString().length <= 16)
                            handleCardNumberChange(e.target.value);
                    }}
                />
                <input
                    placeholder="MM"
                    type="number"
                    className="cardExpiry"
                    value={expiryMonth}
                    onChange={(e) => {
                        if (e.target.value.toString().length <= 2)
                            handleCardExpiryMonthChange(e.target.value);
                    }}
                />
                <input
                    placeholder="YYYY"
                    type="number"
                    className="cardExpiryYear"
                    value={expiryYear}
                    onChange={(e) => {
                        if (e.target.value.toString().length <= 4)
                            handleCardExpiryYearChange(e.target.value);
                    }}
                />
                <input
                    placeholder="CVV"
                    type="number"
                    className="cardCVV"
                    value={cvv}
                    onChange={(e) => {
                        if (e.target.value.toString().length <= 3)
                            handleCardCVVChange(e.target.value);
                    }}
                />
            </div>
            <input
                name="submit"
                type={"submit"}
                className="Submit"
                onClick={registerUser}
            />
            <button className="Submit" onClick={editDetails}>
                Change Info
            </button>
        </div>
    );
};

export default Payment;
