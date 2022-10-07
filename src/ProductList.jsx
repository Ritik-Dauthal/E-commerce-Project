import React from 'react';
import Product from './Product';


function ProductList ({products}) {
 
  return (
    <div className="h-screen grid-cols-3 gap-2 space-y-2 overflow-y-scroll lg:grid">
      {products.map(function(item){
    return (
      
      <Product
        {...item}
        />
        );
    })}
  </div>
  );
}
export default ProductList ;