import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../../api';

function ProductCard({ product }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src= { `${ BASE_URL }${ product.image }` } />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;