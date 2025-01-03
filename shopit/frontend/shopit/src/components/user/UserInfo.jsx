function UserInfo() {
    return (
        <div className="row m-4">
            <div className="col-md-3 py-3 card">
                <img src="" alt="user profile" className="img-fluid rounded-circle mb-3 mx-auto" />
                <h4>Abdalla Diaai</h4>
                <p className="text-muted">abdalla.diaai@outlook.com</p>
                <button className="btn mt-2">Edit</button>
            </div>
            <div className="col-md-9">
                <div className="card">
                    <div className="card-header">
                        <h5>Account Overview</h5>

                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>Full Name:</strong> Abdalla Diaai
                                </p>
                                <p>
                                    <strong>Email:</strong> abdalla.diaai@outlook.com
                                </p>
                                <p>
                                    <strong>Phone:</strong> +447507516808
                                </p>

                            </div>
                            <div className="col-md-6">
                                <p>
                                    <strong>City:</strong> London
                                </p>
                                <p>
                                    <strong>Country:</strong> UK
                                </p>
                                <p>
                                    <strong>Member since:</strong> Jan 2025
                                </p>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserInfo;