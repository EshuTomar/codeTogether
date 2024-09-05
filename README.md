# CodeTogether

**CodeTogether** is a real-time code collaboration web application that enables developers to write, edit, and share code simultaneously in a collaborative environment. It's designed to enhance teamwork and streamline the coding process, making it easier to work on projects together, no matter where team members are located.

## Features

- **Real-Time Collaboration**: Multiple users can work on the same codebase simultaneously with changes reflected in real-time.
- **Syntax Highlighting**: Supports syntax highlighting for various programming languages.
- **Chat Integration**: In-app chat feature to facilitate communication among collaborators.
- **Version Control**: Keeps track of changes with an integrated version control system.
- **Multi-User Support**: Invite team members to collaborate on a project with ease.
- **Customizable Themes**: Choose between different editor themes to suit your preferences.
- **Language Support**: Compatible with a wide range of programming languages.
- **Autosave & Recovery**: Automatically saves progress and offers recovery options in case of unexpected interruptions.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: WebSockets (Socket.IO)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/EshuTomar/codeTogether.git
    cd codeTogether
    ```

2. **Install dependencies for the frontend and backend:**
    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGODB_URI=<Your MongoDB URI>
    PORT=5000
    ```

4. **Run the application:**

    ```bash
    # Start the backend server
    cd server
    npm start

    # Start the frontend development server
    cd ../client
    npm start
    ```

5. **Access the application:**

    Open your browser and navigate to `http://localhost:3000` to start collaborating.

   ---
   

## Contributing

Contributions are welcome! If you'd like to contribute to **CodeTogether**, please fork the repository, create a new branch, and submit a pull request.


