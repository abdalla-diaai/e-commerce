import OrderHistoryContainer from "./OrderHistoryContainer";
import UserInfo from "./UserInfo";
import React, { useEffect, useState } from "react";
import api from "../../api";

function UserProfile() {

    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        api.get('user_info/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`
            }
        })
        .then(response => {
            console.log(response.data);
            setUserInfo(response.data);
            setLoading(false);
        }
        )
        .catch(error => {
            console.log(error);
            setLoading(false);
        }
        );
    }
    , []);


    return (
        <div className="container my-5">
            <UserInfo />
            <OrderHistoryContainer />
        </div>
    );
};

export default UserProfile;