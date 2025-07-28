# API Documentation

## Stock Management API Documentation

This API documentation provides details about the available routes and their functionalities in the Stock Management application.

## Base URL

The base URL for all the routes is:  http://localhost:5000


## Authentication Routes

### Login

- **URL**: `/api/login`
- **Method**: `POST`
- **Description**: Authenticates a user and generates an authentication token.
- **Request Body**:
  - `email`: User's email (string)
  - `password`: User's password (string)

### Register

- **URL**: `/api/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  - `email`: User's email (string)
  - `password`: User's password (string)

### Logout

- **URL**: `/api/logout`
- **Method**: `GET`
- **Description**: Logs out the user by invalidating their authentication token.
- **Authentication Required**: Yes

## Product Routes

### Get All Products

- **URL**: `/api/products`
- **Method**: `GET`
- **Description**: Retrieves a list of all products in the system.
- **Authentication Required**: Yes

### Create Product

- **URL**: `/api/products`
- **Method**: `POST`
- **Description**: Adds a new product to the system.
- **Authentication Required**: Yes
- **Request Body**:
  - `nama`: Product's name (string)
  - `deskripsi`: Product's description (string)
  - `harga`: Product's price (number)

### Update Product

- **URL**: `/api/products/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing product by its ID.
- **Authentication Required**: Yes
- **Request Body**:
  - `nama`: Product's name (string)
  - `deskripsi`: Product's description (string)
  - `harga`: Product's price (number)

### Delete Product

- **URL**: `/api/products/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a product by its ID.
- **Authentication Required**: Yes

## Stock Routes

### Get All Stocks

- **URL**: `/api/stock`
- **Method**: `GET`
- **Description**: Retrieves a list of all stock items.
- **Authentication Required**: Yes

### Add Stock

- **URL**: `/api/stock`
- **Method**: `POST`
- **Description**: Adds stock to a product in the system.
- **Authentication Required**: Yes
- **Request Body**:
  - `produk_id`: ID of the product (integer)
  - `kuantitas`: Quantity of the stock (integer)

### Update Stock

- **URL**: `/api/stock/{id}`
- **Method**: `PUT`
- **Description**: Updates the stock quantity of a specific product by its ID.
- **Authentication Required**: Yes
- **Request Body**:
  - `produk_id`: ID of the product (integer)
  - `kuantitas`: Updated quantity of the stock (integer)

### Delete Stock

- **URL**: `/api/stock/{id}`
- **Method**: `DELETE`
- **Description**: Deletes stock entry for a specific product by its ID.
- **Authentication Required**: Yes

## Purchase Routes

### Create Purchase

- **URL**: `/api/pembelian`
- **Method**: `POST`
- **Description**: Creates a new purchase transaction.
- **Request Body**:
  - `produk_id`: ID of the product being purchased (integer)
  - `kuantitas`: Quantity of the product being purchased (integer)
  - `status`: Status of the purchase (string: `pending`, `completed`, etc.)

### Get All Purchases

- **URL**: `/api/pembelian`
- **Method**: `GET`
- **Description**: Retrieves a list of all purchase transactions.
- **Authentication Required**: Yes

### Update Purchase

- **URL**: `/api/pembelian/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing purchase transaction by its ID.
- **Authentication Required**: Yes
- **Request Body**:
  - `produk_id`: ID of the product (integer)
  - `kuantitas`: Updated quantity (integer)
  - `status`: Updated purchase status (string)

### Delete Purchase

- **URL**: `/api/pembelian/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a specific purchase transaction by its ID.
- **Authentication Required**: Yes

## Error Responses

- **400 Bad Request**: The request was invalid, please check the request body or parameters.
- **401 Unauthorized**: Authentication is required or failed.
- **404 Not Found**: The requested resource was not found.
- **500 Internal Server Error**: An error occurred on the server.

## Conclusion

This documentation provides the necessary information to interact with the Stock Management API. Ensure to provide the appropriate authentication token for routes that require authentication. For more information or contributions, feel free to contact the API maintainer.
