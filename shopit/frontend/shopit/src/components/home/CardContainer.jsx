import React from "react";
import ProductCard from "./ProductCard";

function CardContainer () {
    return (
        <section className="py-5" id="shop">
            <h4 style={{textAlign: "center"}}>ShopIT Products</h4>
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row justify-content-center">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />

                </div>
            </div>
        </section>
    );
};

export default CardContainer;