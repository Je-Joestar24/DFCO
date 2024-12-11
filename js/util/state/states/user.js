const user = {
    data: JSON.parse(sessionStorage.getItem("user")) || {
        isLoggedIn: false,
        name: "",
        email: "",
        cart: [],
        checkouts: []
    }

};

export default user;