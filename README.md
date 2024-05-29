

# **DocuChat**

DocuChat is a full-stack application for uploading PDF files, processing their content into vector embeddings, and interacting with the content through a chat interface.

## **Features**

- **Project Creation**: Upload PDF files with title and description.
- **PDF Processing**: Backend processes PDFs to generate vector embeddings.
- **Dashboard**: View project statuses: 'creating', 'failed', 'created'.
- **Chat Interface**: Ask questions and get answers based on PDF content.

## **Tech Stack**

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Worker Queue**: BullMQ
- **Vector Embeddings**: cohere
- **Cloud Storage**:Firebase
- **Containerization**: Docker

## **Getting Started**

### **Prerequisites**

- Node.js
- Docker
- Firebase
- PostgreSQL instance

### **Setup Instructions**

### **Frontend**

1. Navigate to the **`client`** directory:
    
    ```bash
    
    cd docuchat
    
    ```
    
2. Install dependencies:
    
    ```bash

    npm install
    
    ```
    
3. Start the frontend:
    
    ```bash

    npm start
    
    ```
    

### **Backend**

1. Build the Docker image:
    
    ```bash

    cd docuchat/server
    docker build -t docuchat-backend .
    
    ```
    
2. Create a **`.env`** file in the **`backend`** directory:
    
    ```
    # PostgreSQL
    PG_USERNAME=postgres
    PG_PASSWORD=mysecretpassword
    PG_DATABASE=postgres
    PG_HOST=db
    PG_PORT=5432
    
    # Firebase
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    
    # CoHere API Key
    COHERE_API_KEY=your_cohere_api_key
    
    # Application
    PORT=3000
    
    ```
    
3. Start the backend and worker with Docker Compose:
   ```
    docker-compose up
    
    ```
    

##
