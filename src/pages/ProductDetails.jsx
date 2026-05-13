import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { CartContext } from '../context/CartContext'

const ProductDetails = () => {
    const {slug}= useParams()
    const [product,setProduct]=useState(null)
    const [quantity,setQuantity]=useState(1);
    const {addToCart}=useContext(CartContext);

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                console.log(slug)
                const res= await api.get(`/catalog/products/${slug}/`)
                setProduct(res.data)
                console.log(product)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct();
    },[slug])

    if(!product){
        return <h1>Loading...</h1>
    }

    return (

        <div className='max-w-7xl mx-auto p-6'>
            
            <div className='grid md:grid-cols-2 gap-10'>
                <div
                className='bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center'
                >
                    <img
                    src={product.images[0]?.image}
                    alt={product.name}
                    className='w-full max-h-[500px] object-contain'
                    />
                </div>
                <div >
                <h1 className='text-3xl font-bold text-gray-900 leading-tight'>{product.name}</h1>
                <p className='text-4xl font-bold text-blue-600 mt-6'> ₹ {product.price}</p> 
                <p className='text-gray-600 mt-6 leading-relaxed'>{product.description}</p>  
                <p className='mt-6 text-green-600 font-semibold'>In Stock: {product.stock}</p>
                <div className='flex items-center gap-4 mt-8'>
                    <button onClick={()=>
                        quantity>1 &&setQuantity(quantity-1)
                    }
                    className='w-10 h-10 rounded-lg border text-xl font-bold hover:bg-gray-100'>-</button>
                    <span className='text-xl font-semibold'>{quantity}</span>
                    <button
                    onClick={()=>
                        setQuantity(quantity+1)
                    } 
                    className='w-10 h-10 rounded-lg border text-xl font-bold hover:bg-gray-100'
                    >+</button>
                </div>      
                <div className='flex gap-4 mt-8'>
                    <button onClick={() => addToCart(product, quantity)}
                    className='flex-1 bg-blue-600 hover:bg-blue-700 text-white
                     py-4 rounded-xl font-semibold transition cursor-pointer'> Add to Cart </button>
                    <button className='flex-1 bg-black hover:bg-gray-800 text-white
                     py-4 rounded-xl font-semibold transition'>Buy Now</button>
                </div>           
                </div>
            </div>

        </div>

    )

}

export default ProductDetails