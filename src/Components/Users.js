import React, { useEffect, useState } from "react";
import { Columns } from "./Columns";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Users = (props) => {
    const navigate = useNavigate();
    const [user,setUser] =useState([]);
    useEffect(()=>{
        const fetchUser = async()=>{
            await axios.get("https://yoga-form-backend.onrender.com/").then((foundUser)=>{
                setUser(foundUser.data.user);
                // console.log(foundUser);
                // console.log(user);
            }).catch((err)=>{
                console.log(err);
            })
        }
        fetchUser();
    },[])
    function routeToForm() {
        navigate("/register");
    }
    return (
        <div className="Users">
            <h1> Registered Users</h1>
            <table className="TableData">
                <tr>
                    <td className="TableNameTop">Name</td>
                    <td className="TableEmailTop">Email</td>
                    <td className="TableBatchTop">Batch</td>
                </tr>
                {user.map((userData) => (
                    <Columns
                        Name={userData.Name}
                        Email={userData.Email}
                        Batch={userData.Batch}
                    />
                ))}
            </table>
            <div>
                <button className="RegisterBTN" onClick={routeToForm}>
                    Register/ Re-Enrol
                </button>
            </div>
        </div>
    );
};
