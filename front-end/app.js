

//Sign Up

$("#signup").on("submit", function (e) {
    e.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    const userObj = {
        username,
        password
    }

    $.ajax({
        url: "http://localhost:3000/signup",
        type: "POST",
        data: userObj,
    }).done(function (response) {
        if (response.status === "success") {
            window.location.href = "/signin"
        }
    })
})

//Sign in

$("#signin").on("submit", function (e) {
    e.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    const encoded = btoa(`${username}:${password}`);

    $.ajax({
        url: "http://localhost:3000/signin",
        headers: {
            authorization: `Basic ${encoded}`
        },
        type: "POST",
    }).done(function (response) {
        if (response.status === "success") {
            window.location.href = "/dashboard"
        }

    })
})
