class Storage {
    storeItem(item) {

        let usersList;
        if (localStorage.getItem("usersPrunedge") === null) {
            usersList = {}
            usersList = { ...item };

            // Set ls
            localStorage.setItem("usersPrunedge", JSON.stringify(usersList));
        } else {
            // Get what is already in ls
            usersList = JSON.parse(localStorage.getItem("usersPrunedge"));
            // Push new item
            if (item.length >= 1) { usersList = [...item]; }
            if (item.length === 0) { usersList.push(item); }
            // Reset ls
            localStorage.setItem("usersPrunedge", JSON.stringify(usersList));
        }
    }

    getItemsFromStorage() {
        let usersList;
        if (localStorage.getItem("usersPrunedge") === null) {
            usersList = {};
            return usersList;
        } else {
            usersList = JSON.parse(localStorage.getItem("usersPrunedge"));
        }
        return usersList;
    }

    updateItemStorage(updatedItem) {
        let usersList = JSON.parse(localStorage.getItem("usersPrunedge"));

        usersList.forEach(function (item, index) {
            if (updatedItem._id === item._id) {
                usersList.splice(index, 1, updatedItem);
            }
        });
        localStorage.setItem("usersPrunedge", JSON.stringify(usersList));
    }

    deleteItemFromStorage(id) {
        let usersList = JSON.parse(localStorage.getItem("usersPrunedge"));

        usersList.forEach(function (item, index) {
            if (id === item._id) {
                usersList.splice(index, 1);
            }
        });
        localStorage.setItem("usersPrunedge", JSON.stringify(usersList));
    }
    clearItemsFromStorage() {
        localStorage.removeItem("usersPrunedge");
    }

    nameLast() {
        return "how are you";
    }
}
// module.exports = NoteStorage;
export default Storage;
