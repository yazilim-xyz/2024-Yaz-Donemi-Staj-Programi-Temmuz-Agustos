import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, removeItem } from '../features/products/productSlice';
import remove from '../assets/images/png/remove.png'
import { FaUndo } from 'react-icons/fa'; 
const CardPage = () => {

    const products = useSelector(selectProducts);
    const dispatch = useDispatch();

    const handleReturn = (id) => {
        dispatch(removeItem(id));
    };

    return (
        <div className="">
            <h2 className="text-xl font-bold mb-4">Sepet</h2>
            <div className="max-h-44  overflow-y-auto">
                <ul>
                    {products.map((product) => (
                        <li key={product.id} className="border-b py-2 justify-between items-center flex">
                            {product.name} - ${product.price}
                            <button
                                onClick={() => handleReturn(product.id)}
                                className="bg-primary py-1 shadow-lg text-white p-1 rounded-l-2xl rounded-r-2xl flex items-center justify-between ml-4"
                            >
                                iade
                                <img className="ml-2" src={remove}
                                ></img>

                            </button>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );

}

export default CardPage

