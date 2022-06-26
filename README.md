# Tensorgo Task Backend

### Steps to start server
1. Run "npm install" to install the dependencies.
2. Run "npm start" to start the development server.
3. Server will start on IP "127.0.0.1" and PORT "4000".

### API Endpoints
Method        | EndPoint                                  | Description
------------- | -------------                             | -------------
GET           | http://127.0.0.1:4000/api/v1/users/load   |Load Go Rest Data
GET           | http://127.0.0.1:4000/api/v1/users        | Get All Users
PUT           | http://127.0.0.1:4000/api/v1/users/2364   | Update User
PUT           | http://127.0.0.1:4000/api/v1/users/export | Export CSV
