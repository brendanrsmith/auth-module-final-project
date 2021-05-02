

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
        url: "/signup",
        type: "POST",
        data: userObj,
    }).done(function (response) {
        if (response.status === "success") {
            window.location.href = "/signin"
        } else {
            if (response.error.includes('duplicate')) {
                console.log("This user already exists!")
            } else if (response.error.includes("validation failed")) {
                console.log("Both fields are required");
            }
            console.log(response);
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
        url: "/signin",
        headers: {
            authorization: `Basic ${encoded}`
        },
        type: "POST",
    }).done(function (response) {
        if (response.status === "success") {
            window.location.href = "/dashboard"
        } else {
            console.log(response);
        }

    })
});


