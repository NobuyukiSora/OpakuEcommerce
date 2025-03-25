import {createContext, ReactNode, useState} from 'react';
import {getAllProducts, insertProduct, Product} from './database';

export const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined,
);

export const DatabaseProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product[]>([]);

  const addProduct = (item: Product) => {
    insertProduct(item);
    refreshProduct();
  };

  const refreshProduct = () => {
    getAllProducts(setProduct);
  };
  const deleteProduct = (id: string) => {
    deleteProduct(id);
    refreshProduct();
  };

  return (
    <DatabaseContext.Provider
      value={{product, addProduct, refreshProduct, deleteProduct}}>
      {children}
    </DatabaseContext.Provider>
  );
};

export interface DatabaseContextProps {
  product: Product[];
  addProduct: (item: Product) => void;
  refreshProduct: () => void;
  deleteProduct: (id: string) => void;
}
