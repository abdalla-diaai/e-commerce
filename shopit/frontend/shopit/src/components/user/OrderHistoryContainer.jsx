import OrderHistory from "./OrderHistory";

function OrderHistoryContainer() {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h5>Order History</h5>
                    </div>
                    <OrderHistory />

                </div>

            </div>

        </div>
    );
};

export default OrderHistoryContainer;