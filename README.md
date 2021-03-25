# meme-share

To Run: npm start

Endpoint List:

1. Create user: POST /create-user
  
    Payload: fullName, username, password
    
    Response: Object containing created user 

2. Login: POST /login

    Paylod: username, password

    Response: Success message and http only cookie is set