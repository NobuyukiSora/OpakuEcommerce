import {createContext, ReactNode, useState} from 'react';
import {getAllProducts, insertProduct, Product, removeProduct} from './database';

export const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined,
);

export const DatabaseProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (item: Product) => {
    insertProduct(item);
    refreshProduct();
  };

  const refreshProduct = () => {
    getAllProducts(setProducts);
  };
  const deleteProduct = (id: string) => {
    removeProduct(id);
    refreshProduct();
  };

  return (
    <DatabaseContext.Provider
      value={{products, addProduct, refreshProduct, deleteProduct}}>
      {children}
    </DatabaseContext.Provider>
  );
};

export interface DatabaseContextProps {
  products: Product[];
  addProduct: (item: Product) => void;
  refreshProduct: () => void;
  deleteProduct: (id: string) => void;
}
