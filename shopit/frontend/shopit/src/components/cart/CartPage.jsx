import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import api from "../../api";
import Alert from 'react-bootstrap/Alert';


function CartPage() {

    const [items, setItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0.0);

    useEffect(() => {
        const cart_code = localStorage.getItem("cart_code");
        if (cart_code) {
            api.get(`get_cart?cart_code=${cart_code}`)
                .then(response => {
                    console.log(response.data);
                    setItems(response.data.items);
                    setSubTotal(response.data.sum_total);
                })
                .catch(err => {
                    console.log(err.message);
                });
        };

    }, []);

    if (items.length < 1) {
        return (
            <Alert key='danger' variant='danger'>
                Cart is empty!
            </Alert>
        );
    };

    return (
        <div className="container my-3 py-3" style={{ height: "80vh", overflow: "scroll" }}>
            <h5 className="mb-4">Shopping Cart</h5>
            <div className="row">
                <div className="col-md-8">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} items={items} setSubTotal={setSubTotal} />
                    ))}
                </div>
                <div>
                    <CartSummary subTotal={subTotal} />
                </div>
            </div>
        </div>
    );
};

export default CartPage;