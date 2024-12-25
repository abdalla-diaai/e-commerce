import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import RelatedProducts from './RelatedProducts';
import { useParams, Link } from 'react-router-dom';
import api, { BASE_URL } from "../../api";


function ProductPage() {
    const [product, setProduct] = useState([]);
    const [related, setRelated] = useState([]);

    const { slug } = useParams()
    useEffect(() => {
        api.get(`product_details/${slug}`)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
                setRelated(response.data.similar_products)
            })
            .catch((err) => {
                console.log('Error', err);
            });
    }, [slug]);

    return (
        <>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header>
                    <img src={`${BASE_URL}${product.image}`} alt="" />
                </Card.Header>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                </Card.Body>
                <Link to={`/products/${product.slug}`}>
                    <Button variant="primary">Go somewhere</Button>
                </ Link>
            </Card>
            <section>
                <RelatedProducts related={related} />
            </section>
        </>
    );
};

export default ProductPage;