import { useState, useEffect } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch('https://fakestoreapi.com/products', {signal: controller.signal})
        .then((res) => {
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }
            return res.json()
           
        })
        .then((data) => {
            console.log(data)
            setProducts(data)
            setLoading(false)
        })
        .catch((err) => {
            if (err.name === 'AbortError') {
                setError(err.message)
                setLoading(false)
            }
        })
        return controller.abort();
    }, []);

    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error: {error}</div>;

    return(
        <div>
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <img src={product.image} alt="product" />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}