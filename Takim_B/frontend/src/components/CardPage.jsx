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
        <div className="h-10 md:h-44 sm:h-40">
        <h2 className="text-xl font-bold mb-1">Sepet</h2>
        <div className="max-h-28 sm:max-h-32 md:max-h-36 overflow-y-auto ">
            <ul>
                {products.map((product) => (
                    // <li key={product.id} className="border-b py-2 justify-between items-center flex flex-wrap ">
                    //     <span className="w-full sm:w-auto">{product.name} - ${product.price}</span>
                    //     <button
                    //         onClick={() => handleReturn(product.id)}
                    //         className="py-1 px-1 sm:px-2 md:px-3 bg-primary shadow-lg text-white p-1 rounded-l-2xl rounded-r-2xl flex items-center ml-0 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto justify-center"
                    //     >
                    //         iade
                    //         <img className="ml-2 w-4 h-4 sm:w-auto sm:h-auto" src={remove}
                    //         ></img>

                    //     </button>
                    // </li>
                     <li key={product.id} className="border-b py-2 flex flex-col justify-between items-start mb-4 ">
                     {/* <span className="w-full sm:w-auto">{product.name} - ${product.price}</span> */}
                     {/* <span className="w-full sm:w-auto">{product.name} - {product.quantity} Adet x ${product.price} -- ${(product.price * product.quantity).toFixed(2)}</span> */}
                     <div className="w-full flex flex-col sm:flex-row justify-between items-start mb-2">
                                <span>{product.id}- ({product.quantity} Adet x ${product.price})</span>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row justify-between items-start">
                                <span>{product.name}</span>
                                <span>${(product.price * product.quantity).toFixed(2)}</span>
                            </div>
                     <button
                         onClick={() => handleReturn(product.id)}
                         className="py-1 px-1 sm:px-2 md:px-3 bg-primary shadow-lg text-white p-1 rounded-l-2xl rounded-r-2xl flex items-center ml-0 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto justify-center"
                     >
                         iade
                         <img className="ml-2 w-4 h-4 sm:w-auto sm:h-auto" src={remove}
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

