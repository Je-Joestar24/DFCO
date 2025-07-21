# DFCO - Devil Fruit Collection Organization

[![GitHub Repo stars](https://img.shields.io/github/stars/Je-Joestar24/DFCO?style=social)](https://github.com/Je-Joestar24/DFCO/stargazers)

The Devil Fruit Collection Organization (DFCO) is a dynamic, single-page web application designed for fans to browse, explore, and purchase a variety of devil fruit products. This project showcases a modern frontend architecture using pure HTML, CSS, and JavaScript (ES6+), with a strong emphasis on clean code, modularity, and a rich user experience.

<!-- Optional: Add a screenshot or GIF of the application here -->
<!-- ![DFCO Application Demo](./images/demo.gif) -->

## ✨ Features

- **Interactive UI**: A clean, intuitive, and fully responsive interface built with modern CSS techniques.
- **Dynamic Product Viewing**: Users can view detailed information about each devil fruit in an interactive modal.
- **Shopping Cart**: Fully functional cart with features to add, remove, and update item quantities.
- **User Authentication**: Simple and secure sign-up/login functionality to manage user sessions.
- **Data Persistence**: Leverages `localStorage` and `sessionStorage` to maintain user and cart state across sessions, ensuring a seamless shopping experience.
- **Client-Side Routing**: A custom-built router handles navigation between different views (Home, Products, Cart, etc.) without page reloads.
- **Modular Codebase**: JavaScript is organized into modules for views, templates, state management, and utilities, following modern development patterns.

## 🛠️ Technologies Used

This project is built exclusively with frontend technologies:

- **HTML5**: Semantic markup for better structure and accessibility.
- **CSS3**: Advanced styling with Flexbox, Grid, custom animations, and a responsive design that works across all modern browsers.
- **JavaScript (ES6+)**:
  - **Vanilla JS**: No frameworks were used to demonstrate core JavaScript proficiency.
  - **ES6 Modules**: For a modular and maintainable codebase.
  - **Async/Await**: For handling asynchronous operations like fetching product data.
- **JSON**: Used for storing product data locally.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Git](https://git-scm.com/) installed on your computer to clone the repository.

### Installation

1.  **Clone the repository:**
    Open your terminal or command prompt and run the following command:
    ```bash
    git clone https://github.com/Je-Joestar24/DFCO.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd DFCO
    ```

3.  **Run the application:**
    This is a pure client-side application. However, due to browser security policies (CORS) regarding `fetch` requests for local files, you'll need to serve the files using a local web server.

    **Option 1: Using the VS Code Live Server Extension**
    If you are using Visual Studio Code, the easiest way to run the project is by installing the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension. Once installed, simply right-click the `index.html` file and select "Open with Live Server".

    **Option 2: Using Python's built-in server**
    If you have Python installed, you can run a simple HTTP server from the project's root directory:
    ```bash
    # For Python 3
    python -m http.server
    # For Python 2
    python -m SimpleHTTPServer
    ```
    Then, open your web browser and go to `http://localhost:8000`.

    **Option 3: Using Node.js `http-server`**
    If you have Node.js installed, you can use the `http-server` package:
    ```bash
    # Install http-server globally
    npm install -g http-server

    # Run the server from the project root
    http-server
    ```
    Then, open your web browser and navigate to the provided local address (usually `http://localhost:8080`).

## 📂 Project Structure

The repository is organized as follows:

```
DFCO/
├── css/              # All CSS styles, organized by component/view
├── images/           # All static images and assets
├── js/               # JavaScript source code
│   ├── templates/    # JS modules for generating HTML templates
│   ├── util/         # Utility functions, router, and state management
│   └── views/        # JS modules for each application view (page)
├── json/             # JSON files containing devil fruit data
├── index.html        # Main HTML entry point
└── README.md         # This file
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Je-Joestar24/DFCO/issues).

## 👤 Author

**Jejomar Parrilla**
- GitHub: [@Je-Joestar24](https://github.com/Je-Joestar24)
- Email: jpar1252003@gmail.com