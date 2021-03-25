# meme-share

To Run: npm start

Insomnia export is added in resources/insomnia-export

Endpoint List:

1. Create user: POST /create-user
  
    Payload: fullName, username, password
    
    Response: Object containing created user 

2. Login: POST /login

    Paylod: username, password

    Response: Success message and http only cookie is set

3. Create meme: POST /create-meme

4. View meme: GET /view/:imageUrl

5. Update like: PUT /update-like

6. Get Status: GET /get-status

7. Get Image: GET /get-images