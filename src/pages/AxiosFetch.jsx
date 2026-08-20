import { useState, useEffect } from "react";
import axios from "axios";

export const AxiosFetch = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axios.get('https://fakestoreapi.com/products', {cancelToken: source.token})
        .then((res) => {
            setProducts(res.data)
            console.log(res.data)
            setLoading(false);
        })
         .catch((err) => {
            if (!axios.isCancel(err)) {
                setError(err.message)
                setLoading(false);
            }
        });
        return () => source.cancel('Component unmounted')
    }, [])
    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error: {error}</div>;

    return(
        <div>
            <div>
                {products && products.map((product) => (
                    <div key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}



