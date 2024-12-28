import { useState } from 'react';
import api, { BASE_URL } from "../../api";
import { toast } from 'react-toastify'; 


function CartItem({item, items, setSubTotal}) {
    const [quantity, setQuantity] = useState(item.quantity);
    const itemData = {quantity: quantity, item_id: item.id};

    function updateCartItem() {
        api.patch('update_quantity/', itemData)
        .then(response => {
            console.log(response.data);
            setSubTotal(items.map((cartItem) => cartItem.id === item.id ? response.data.data : cartItem).reduce((acc, curr) => acc + curr.total, 0));
            toast.success('Cart item updated successfully!');
        })
        .catch(err => {
            console.log(err.message);
        });
    };

    return (
    <div className="cart-item d-flex align-items-center mb-3 p-3"
    style={{ backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
        <img src={`${BASE_URL}${item.product.image}`} alt="Product Image" className="img-fluid" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px'}}/>
        <div className="ms-3 flex-grow-1">
            <h5 className="mb-1">{item.product.name}</h5>
            <p className="mb-0 text-muted">{item.product.price}</p>
        </div>
        <div className="d-flex align-items-center">
            <input type="number" min={1} className="form-control me-3" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{width: '70px'}}/>
            <button className="btn btn-info btn-sm" onClick={updateCartItem}>Update</button>
            <button className="btn btn-danger btn-sm">Remove</button>
        </div>
    </div>
    );
};

export default CartItem;