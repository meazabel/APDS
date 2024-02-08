# APDS: Application development security

## A short introduction  to the application:  
The interdepartmental bulletin board is supposed to be a government application that 
users can use to upload issues for other users to review and edit.
The way the application is supposed to work is that there are Admin users set 
initially manually in the db. The admin users have privileges that the normal users 
don’t, to ensure the web app security. When a new user registers, then won’t 
immediately have access to the web application, they need to be verified by an admin 
first. This ensures that only government officials have access. 
Only Admins can verify other users, and only admins can delete issues or delete users.
Regular users can create issues and set an issue status (Open, In Progress, Closed).
After an issue has been created, it can also be edited to change its status.
I added Helmet to the backend to maximise security.

## Instructions
- cd BACKEND
- npm install
- cd ../FRONTEND
- npm install

in the BACKEND folder, run the following command to start the server:
- npm start

in the FRONTEND folder, run the following command to start the client:
- ng serve

### Login details 
Admin: mea  
Password: 1234

## Troubleshooting
### Error code "EACCES"
If you get the error code "EACCES" when starting the client, it might be because you dont have permission 
to access the port (default port is 4200), try running the following command in the FRONTEND folder:
- ng serve --port {port number}

I usually use 4000, so the command would be:
- ng serve --port 4000
### Error: Login unsuccessful
* If you are unable to login, it could be that the server is not running. 
Make sure the server is running before trying to login.


* It could be that you just registered a new user but they have not been verified yet. 
To verify a user, you must login as an admin, then go to the "Non Verified Users" 
tab, and verify the user.


* Check the test.http file in the BACKEND.
Try run the login POST request (line 21)
If response is OK/200 then the error could be caused by the
browser not "trusting" the certificate. This depends on what
browser you use, you can confirm the error by using the
shortcut (ctrl+shift+I) in the browser, then go to the "Console"
tab. If the certificate is not trusted, you can add it to the trusted certificates in 
the browser settings.


* It could be that the certificate has expired. In BACKEND/keys, remove old key and 
certificate, and get new ones:


* We generate our security certificates by downloading software from
  https://slproweb.com/products/Win32OpenSSL.html  


* Here is the version I downloaded: 

2024-02-03


* Win64 OpenSSL v3.2.1 --- 200MB (Recommended for software developers by the creators 
of OpenSSL). 


* After downloading and installing the software, we can generate our security certificates.


* In the terminal, navigate to wherever you installed OpenSSL and change to the “bin” folder.

 
* First generate the private key


* run:


* openssl genrsa -out privatekey.pem 1024  

If you get "openssl not recognized as an internal or external command" error, you need to add the 
path to the openssl bin folder to your system environment variables.
https://www.java.com/en/download/help/path.html


* create the certificate signing request.


* openssl req -new -key privatekey.pem -out certrequest.csr


* sign the certificate using your private key


* openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem


* Now you have the private key and the certificate. Copy them to the BACKEND/keys folder.


Mea_zabel@yahoo.com
