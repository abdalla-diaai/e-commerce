import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartPage() {
    return (
        <div className="container my-3 py-3" style={{height: "80vh", overflow: "scroll"}}>
            <h5 className="mb-4">Shopping Cart</h5>
            <div className="row">
                <div className="col-md-8">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default CartPage;