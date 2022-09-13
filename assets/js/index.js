
$("#add_user").submit(function(e) {
    alert("Data Inserted Successfully")
})

$("#update_user").submit((event) => {
    event.preventDefault();

    let unindexed_array =$("#update_user").serializeArray();
    // console.log(unindexed_array)

    let data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })

    console.log(data);

    let request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function() {
        alert("data updated successfully");
    })
})

if(window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        let id = $(this).attr("data-id")

        let request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE",
        }

        if(confirm("do you want to delete")) {
            $.ajax(request).done(function() {
                alert("data delete successfully");
                location.reload()
            })
        }

    })
}