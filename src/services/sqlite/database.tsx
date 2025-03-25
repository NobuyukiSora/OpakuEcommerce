import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'spendingApp.db',
    location: 'default',
  },
  () => {},
  (error: any) => {
    console.log(error);
  },
);

export const createTables = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY,
          title TEXT,
          description TEXT,
          category TEXT,
          price REAL,
          discountPercentage REAL,
          rating REAL,
          stock INTEGER,
          brand TEXT,
          sku TEXT,
          weight REAL,
          width REAL,
          height REAL,
          depth REAL,
          warrantyInformation TEXT,
          shippingInformation TEXT,
          availabilityStatus TEXT,
          returnPolicy TEXT,
          minimumOrderQuantity INTEGER,
          createdAt TEXT,
          updatedAt TEXT,
          barcode TEXT,
          qrCode TEXT,
          thumbnail TEXT
        );`,
      [],
      () => console.log('Products table created successfully'),
      error => console.error('Error creating products table:', error),
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS product_tags (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          tag TEXT,
          FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );`,
      [],
      () => console.log('Product tags table created successfully'),
      error => console.error('Error creating product tags table:', error),
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS product_images (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          image_url TEXT,
          FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );`,
      [],
      () => console.log('Product images table created successfully'),
      error => console.error('Error creating product images table:', error),
    );
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS product_reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          rating INTEGER,
          comment TEXT,
          date TEXT,
          reviewer_name TEXT,
          reviewer_email TEXT,
          FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );`,
      [],
      () => console.log('Product reviews table created successfully'),
      error => console.error('Error creating product reviews table:', error),
    );
  });
};

export const insertProduct = (product: Product) => {
  const props = [
    product.id,
    product.title,
    product.description,
    product.category,
    product.price,
    product.discountPercentage,
    product.rating,
    product.stock,
    product.brand,
    product.sku,
    product.weight,
    product.dimensions.width,
    product.dimensions.height,
    product.dimensions.depth,
    product.warrantyInformation,
    product.shippingInformation,
    product.availabilityStatus,
    product.returnPolicy,
    product.minimumOrderQuantity,
    product.meta.createdAt,
    product.meta.updatedAt,
    product.meta.barcode,
    product.meta.qrCode,
    product.thumbnail,
  ];

  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO products 
        (id, title, description, category, price, discountPercentage, rating, stock, brand, sku, weight, width, height, depth, 
         warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, 
         createdAt, updatedAt, barcode, qrCode, thumbnail) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      props,
      (_, result) => {
        console.log('Product inserted successfully!');

        product.tags.forEach((tag: any) => {
          txn.executeSql(
            `INSERT INTO product_tags (product_id, tag) VALUES (?, ?);`,
            [product.id, tag],
            () => console.log('Tag inserted successfully'),
            (_, error) => console.error('Error inserting tag:', error),
          );
        });

        product.images.forEach((imageUrl: any) => {
          txn.executeSql(
            `INSERT INTO product_images (product_id, image_url) VALUES (?, ?);`,
            [product.id, imageUrl],
            () => console.log('Image inserted successfully'),
            (_, error) => console.error('Error inserting image:', error),
          );
        });

        product.reviews.forEach((review: Review) => {
          txn.executeSql(
            `INSERT INTO product_reviews (product_id, rating, comment, date, reviewer_name, reviewer_email) 
              VALUES (?, ?, ?, ?, ?, ?);`,
            [
              product.id,
              review.rating,
              review.comment,
              review.date,
              review.reviewerName,
              review.reviewerEmail,
            ],
            () => console.log('Review inserted successfully'),
            (_, error) => console.error('Error inserting review:', error),
          );
        });
      },
      (_, error) => console.error('Error inserting product:', error),
    );
  });
};

export const getAllProducts = (
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>,
) => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM products;`,
      [],
      (_, result) => {
        let products: Product[] = [];

        for (let i = 0; i < result.rows.length; i++) {
          products.push(result.rows.item(i));
        }

        products.forEach(product => {
          txn.executeSql(
            `SELECT tag FROM product_tags WHERE product_id = ?;`,
            [product.id],
            (_, tagsResult) => {
              let tags: string[] = [];
              for (let i = 0; i < tagsResult.rows.length; i++) {
                tags.push(tagsResult.rows.item(i).tag);
              }
              product.tags = tags;
            },
            (_, error) => console.error('Error fetching tags:', error),
          );

          txn.executeSql(
            `SELECT image_url FROM product_images WHERE product_id = ?;`,
            [product.id],
            (_, imagesResult) => {
              let images: string[] = [];
              for (let i = 0; i < imagesResult.rows.length; i++) {
                images.push(imagesResult.rows.item(i).image_url);
              }
              product.images = images;
            },
            (_, error) => console.error('Error fetching images:', error),
          );

          txn.executeSql(
            `SELECT * FROM product_reviews WHERE product_id = ?;`,
            [product.id],
            (_, reviewsResult) => {
              let reviews: any[] = [];
              for (let i = 0; i < reviewsResult.rows.length; i++) {
                reviews.push(reviewsResult.rows.item(i));
              }
              product.reviews = reviews;
            },
            (_, error) => console.error('Error fetching reviews:', error),
          );
        });
        if (setProducts) setProducts(products);
      },
      (_, error) => console.error('Error fetching products:', error),
    );
  });
};

export const deleteProduct = (productId: any) => {
  db.transaction(txn => {
    txn.executeSql(`DELETE FROM product_tags WHERE product_id = ?;`, [
      productId,
    ]);
    txn.executeSql(`DELETE FROM product_images WHERE product_id = ?;`, [
      productId,
    ]);
    txn.executeSql(`DELETE FROM product_reviews WHERE product_id = ?;`, [
      productId,
    ]);
    txn.executeSql(
      `DELETE FROM products WHERE id = ?;`,
      [productId],
      () => {
        console.log('Product deleted successfully');
      },
      (_, error) => {
        console.error('Error deleting product:', error);
      },
    );
  });
};

export type Product = {
  id: any;
  title: any;
  description: any;
  category: any;
  price: any;
  discountPercentage: any;
  rating: any;
  stock: any;
  brand: any;
  sku: any;
  weight: any;
  dimensions: {width: any; height: any; depth: any};
  warrantyInformation: any;
  shippingInformation: any;
  availabilityStatus: any;
  returnPolicy: any;
  minimumOrderQuantity: any;
  meta: {createdAt: any; updatedAt: any; barcode: any; qrCode: any};
  thumbnail: any;
  tags: any[];
  images: any[];
  reviews: {
    rating: any;
    comment: any;
    date: any;
    reviewerName: any;
    reviewerEmail: any;
  }[];
};

type Review = {
  rating: any;
  comment: any;
  date: any;
  reviewerName: any;
  reviewerEmail: any;
};
