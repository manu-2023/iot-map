# Firebase Configuration for Frontend

## Steps to Configure Firebase:

1. **Access Firebase Console**:
   - Navigate to the Firebase Console.
   - Go to **Project Settings** → **General**.

2. **Locate Your Web App Configuration**:
   - Scroll down to the **Your apps** section.
   - Open the code panel for your web app.

3. **Copy Firebase Configuration**:
   - Copy the `const firebaseConfig = { ... }` JSON content provided in the code panel.

4. **Create or Update `.env.local`**:
   - Add your Firebase configuration details in the following format in .env.local file:

     ```env
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_DATABASE_URL=your-database-url
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
     ```

5. **Save the File**:
   - Ensure the `.env.local` file is saved in the `frontend` folder.

6. **Restart the Development Server**:
   - If your development server is running, restart it to apply the new environment variables.