axios.get('/userDetails')
    .then(function (response) {
        document.getElementById('userName').innerText = response.data.name;
    })
    .catch(function (error) {
        console.log(error);
    });
