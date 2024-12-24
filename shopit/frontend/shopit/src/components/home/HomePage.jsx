import React from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";
import api from "../../api";
import { useEffect, useState } from "react";
import LoadingContainer from "../ui/LoadingContainer";
import Error from "../ui/Error";

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true);
        api.get('products')
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
                setLoading(false);
                setError('')
            })
            .catch((err) => {
                console.log('Error', err);
                setError(err.message)
            });
    }, []);

    return (
        <>
            <Header />
            {/* if loading is true, display loading container otherwise display card container */}
            { loading ? <LoadingContainer /> : <CardContainer products={products}/> }
            {error && <Error error={error}/>};
            
        </>
    );
};

export default HomePage;