import OrderSummary from "./OrderSummary";
import PaymentSection from "./PaymentSection";
import useCartData from "../../hooks/useCartData";

function CheckoutPage() {
    const cart_code = localStorage.getItem("cart_code");
    const { items, subTotal, loading, setItems, setSubTotal } = useCartData(cart_code);

    return (
        <div>
            <OrderSummary items={items} subTotal={subTotal} />
            <PaymentSection />
        </div>
    );
};

export default CheckoutPage;