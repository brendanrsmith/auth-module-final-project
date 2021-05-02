$(document).ready(function () {
    const currentUserUl = $("#currentUser ul");
    const allUserUl = $("#allUsers ul");


    $.ajax({
        url: "/users",
        method: "GET"
    }).done(function (response) {
        let allUserList = response.map(user => {
            return `<li>${user.username}</li>`;
        }).join("");

        allUserUl.html(allUserList);
    })

    const id = Cookies.get("id").split(":").pop().split('"')[1];

    $.ajax({
        url: `/users/${id}`,
        method: "GET"
    }).done(function (response) {
        currentUserUl.html(`<li>${response.username}</li>`);

        if (response.role === "admin") {
            $("#allUsers").show();
        }
    })


});