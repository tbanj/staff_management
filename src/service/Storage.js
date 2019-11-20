class Storage {
    storeItem(item) {

        let usersList;
        if (localStorage.getItem("currentUser") === null) {
            usersList = {}
            usersList = { ...item };

            // Set ls
            localStorage.setItem("currentUser", JSON.stringify(usersList));
        } else {
            // Get what is already in ls
            usersList = JSON.parse(localStorage.getItem("currentUser"));
            // Push new item
            if (item.length >= 1) { usersList = [...item]; }
            if (item.length === 0) { usersList.push(item); }
            // Reset ls
            localStorage.setItem("currentUser", JSON.stringify(usersList));
        }
    }

    getItemsFromStorage() {
        let usersList;
        if (localStorage.getItem("currentUser")) {
            usersList = localStorage.getItem("currentUser");
            return usersList;
        }

    }


    deleteItemFromStorage(id) {
        let usersList = JSON.parse(localStorage.getItem("currentUser"));

        usersList.forEach(function (item, index) {
            if (id === item._id) {
                usersList.splice(index, 1);
            }
        });
        localStorage.setItem("currentUser", JSON.stringify(usersList));
    }
    clearItemsFromStorage() {
        localStorage.removeItem("currentUser");
    }

    nameLast() {
        return "how are you";
    }
}
// module.exports = NoteStorage;
export default Storage;
