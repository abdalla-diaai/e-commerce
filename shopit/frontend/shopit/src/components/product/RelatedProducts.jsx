import ProductCard from "../home/ProductCard";

function RelatedProducts({ related }) {
    return (
        <>
            {related.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </>
    );
};

export default RelatedProducts;