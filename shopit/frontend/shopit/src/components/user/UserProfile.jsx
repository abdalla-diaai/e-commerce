import OrderHistoryContainer from "./OrderHistoryContainer";
import UserInfo from "./UserInfo";

function UserProfile() {
    return (
        <div className="container my-5">
            <UserInfo />
            <OrderHistoryContainer />
        </div>
    );
};

export default UserProfile;