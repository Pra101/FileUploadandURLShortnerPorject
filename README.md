# File Upload and Short Link Generation Platform Project Made By Prahalad Singh, 

Hosted on: https://farmart-app.onrender.com/ (Note: hosting was done on a free Instance, which gets down after inactivity. If you really want to test the deployed app do, let me know I will restart the server.)

#### This project follows the `separation of concerns` policies, And hence the code base is separated between two different entities.
These are:

## 1. *Farmart-client*: 
which generally deals with the frontend aspect of the Project and acts as a medium between end-user and server to communicate. Implemented using React and Axios for creating API Calls to the backend.

### FarMart Client Features

- JWT Authentication & Authorization Flow for User Login, Register, Logout
- Project Structure for React Redux JWT Authentication, Router, Axios
- Working with Redux Actions, Reducers, and Store using redux-toolkit
- Storing JWT in HttpOnly Cookies
- Creating React Function Components with Hooks and form Validation
- React Function Components for accessing protected Resources (Authorization)
- Dynamic Navigation Bar in React App

#Runs on PORT = 3000(default react port)

```shell
  npm install
  npm start
```
## 2. *Farmart-server*: which generally deals with
1. Operates `Express` as the server.
2. Users `mongoose` to interact with MongoDB atlas.
3. Uses `cors` library for handling Cross Origins.
4. For Authentication and Authorization this application has inbuild session keys exchange policies and uses `jsonwebtoken` library to create tokens and to store them as cookies in the browser itself.
5. Use `bcrypt` library to deal with passwords to prevent XSS attacks.
6. The server uses `multer` to deal with huge blob files for upload.
7. Protected against cross-site scripting (XSS) and cross-site request forgery (CSRF)
attacks.

## Creating and Connecting to AMAZON S3 Bucket

### AWS: Create IAM User
Create IAM user AWS with [ **Access type**: `Programmatic access` ], I named mine `ex3_s333`

1. Next step "**Set permissions**" -> Click "**Attach existing policies directly**"
2. Then search with the keyword "`s3`"
3. To make things simple I chose/checked option "**AmazonS3FullAccess**" policy name
4. Click "**Next:Tags**", I am not setting tags here.
5. Finish the process, click "**Next:Review**" -> click -> "**Create user**"
6. For ease of use, **REMEMBER** to download the CSV (contains this new user's access info) -> Save file -> Keep it safe ;)

### AWS: Create a bucket
To do so, from **"Servises"** -> click **"S3"**
- Click "**Create bucket**"
- Enter a valid + unique name. I named it "`mygallerybucket33`", then click "**Next**"
- I will keep everything default in "**Configure option**" section, click -> "**Next**"
- This step "**Set permissions**", 
    - ***`Uncheck`*** -> "**Block all public access**"
    - ***`Check`*** -> "**Block public access to buckets and objects granted through new public bucket or access point policies**"
    - ***`Check`*** -> "**Block public and cross-account access to buckets and objects through any public bucket or access point policies**"
    - **NOTE**: *Information are given below the checkboxes there, please read them to understand what they do.*
    - Acknowledge the alert checkbox.
    - Click -> **Next**
    - Click -> **Create bucket**
- You will find the created bucket in the bucket list
- Click to open your bucket, I clicked mine "`mygallerybucket33`"
- We need to make it publicly accessible, so click on **"Permissions"**
    - Click -> "**Access Control List**"
    - Navigate to "**Public access**" section and click -> "**Everyone**"
    - A pop up "**Everyone**" will appear to set further option
        - Under "**Access to the objects**" 
        - Check -> "`List objects`" and 
        <!-- - Check -> "`Write objects`" -->
        - Click -> **Save**
- Notice: The bucket is now publicly accessible.


### Enviroment Variables that needs to be set before Building the Application.
    1. In Farmat server Add .env file
        PORT=4050
        AWS_BUCKET_NAME=<Name of the AWS bucket created>
        AWS_REGION=<aws-region of your AWS S3 bucket>
        AWS_ACCESS_KEY_ID=<Your AWS Access Key>
        AWS_SECRET_KEY=<Your AWS secret Key>
        AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE=1
        AWS_PUBLIC_FOLDER=public_asset
        URL_SHORT=http://localhost:4050/

## Creating and Connecting to a MongoDB Atlas Cluster

In this guide, we'll walk you through the process of creating and connecting to a MongoDB Atlas cluster, which is a cloud-based MongoDB database service provided by MongoDB, Inc.

### Prerequisites

Before you begin, make sure you have the following:

- A MongoDB Atlas account (Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- MongoDB Compass (Download and install it from [MongoDB Compass](https://www.mongodb.com/try/download/compass))

### Creating a MongoDB Atlas Cluster

1. **Sign in to MongoDB Atlas:** Log in to your MongoDB Atlas account.

2. **Create a New Cluster:**
   - Click on the "Clusters" tab in the MongoDB Atlas dashboard.
   - Click the "Build a New Cluster" button.

3. **Configure Your Cluster:**
   - Choose your cloud provider, region, and cluster tier based on your requirements.
   - Configure additional settings like cluster name, backup options, and more.

4. **Create the Cluster:**
   - Click the "Create Cluster" button to initiate the cluster creation process.
   - It may take a few minutes for your cluster to be provisioned.

### Connecting to Your MongoDB Atlas Cluster

1. **Whitelist Your IP Address:**
   - In the MongoDB Atlas dashboard, navigate to the "Network Access" tab.
   - Add your IP address to the IP Whitelist. This allows your IP to connect to the cluster.

2. **Create a Database User:**
   - In the dashboard, go to the "Database Access" tab.
   - Click the "Add New Database User" button and provide a username and password for your database user.

3. **Get Your Connection String:**
   - In the dashboard, click the "Clusters" tab and select your cluster.
   - Click the "Connect" button.
   - Choose "Connect Your Application" and copy the connection string.

4. **Connect Using MongoDB Compass:**
   - Open MongoDB Compass.
   - Click "Connect" in the top-left corner.
   - Choose "Connect using MongoDB Compass."
   - Paste your connection string in the provided field and click "Connect."

Now, you are connected to your MongoDB Atlas cluster using MongoDB Compass.

### Connect to MongoDB Atlas Using Code

After creating the cluster you will get a connection URL for nodejs to the Atlas
you need to paste your atlas key in the given server.js file. You can find the place in the server.js similar to the code given below.

```javascript
 // NOTE IF YOUR PASSWORD CONTAINS ANY SPECIAL CHAR THEN USE URIENCODE AND THEN PASS YOUR PASSWORD FROM THAT: YOU CAN FIND MORE INFO ON STACKOVERFLOW.
 
db.mongoose
  .connect(`<ADD YOUR MONGOBD ATLAS LINK>`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
```
## Building And running the Farmart-sever

```shell
    npm install
    npm start
```
This app runs on PORT: 4050

### Implementation choises
    1. Express for backend in JavaScipt.
    2. React for frontend in JavaScript.
    3. Choose MongoDB for storing MetaData.
    4. Choose S3 Bucket for storing Blob Files.

### Challenges Faced
    1. It was a challenge to connect aws S3 bucket due to rigid Authentication at AWS. After creating an IAM user then also it was unable to connect so it needed full Authentication Access to AWS and some policy code needed to be upgraded for deployment.
    2. Connecting to MongoDB was a little challenging as it required an IP Address and other tokens.
    3. Building the authentication flow for JSON web tokens was a bit difficult to implement.
    4. Creating a responsive UI.
    5. Adding middleware to restrict the size and type of File being uploaded.

### Improvements that can be added
    1. Search Functionality for the user using `regex`.
    2. UI can be made more responsive.

### UNDER OPEN SOURCE MIT LICENSE
    1. This software is free to use and could be taken for commercial applications.
    2. Made By Prahalad Singh, I strive to make not just a website but an experience.
