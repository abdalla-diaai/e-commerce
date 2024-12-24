import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import RelatedProducts from './RelatedProducts';
import { useParams } from 'react-router-dom';
import api from "../../api";


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
    }, []);

    return (
        <>
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header>Header</Card.Header>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            <section>
                <RelatedProducts related={related} />
            </section>
        </>
    );
};

export default ProductPage;