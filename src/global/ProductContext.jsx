import React, { createContext, useState, useEffect } from 'react';
import { db } from '../conifg/Config';
import { collection, onSnapshot } from 'firebase/firestore';

export const ProductContext = createContext();

const productsRef = collection(db, 'products');

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(productsRef, (snapshot) => {
            const updatedProducts = [];
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    updatedProducts.push({
                        id: change.doc.id,
                        ...change.doc.data()
                    });
                }
            });
            setProducts((prevProducts) => [...prevProducts, ...updatedProducts]);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};
