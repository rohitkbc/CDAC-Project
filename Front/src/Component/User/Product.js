function Product({ product }) {
    return (
        <div className="row">
            <div class="col-sm-6">
                <div className="card" style={{ width: '20rem' }}>
                    <div className="text-center">
                        <img src={`http://localhost:8080/FarmersMarketplace/admin/${product.id}`} className="card-img-top" alt={product.stockItem}
                            style={{ width: '250px' }} />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title">{product.stockItem}</h5>
                        <p className="card-text"></p>
                        <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;