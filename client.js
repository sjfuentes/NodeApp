console.log('Client-side code running');

    const inputName = document.getElementById("name");
    const inputLastName = document.getElementById("lastname");

        const button = document.getElementById('add-user');
        button.addEventListener('click', function (e) {
            console.log('button was clicked');
            fetch('/clicked', { method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:{
                        name: "John",
                        lastname: "Doe"
                }
                    })
                })
                .then(function (request, response) {
                    if (response.ok) {
                        console.log('Click was recorded');
                        return;
                    }
                    throw new Error('Request failed.');
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

        const button1 = document.getElementById('show-user');
        let ul = document.querySelector('#users')
        // button1.addEventListener('click', function (e) {

        //         fetch('/clicks', { method: 'GET' })
        //             .then(function (response) {
        //                 if (response.ok){
        //                     console.log("ok");
        //                     //console.log(response.json);
        //                     //response.json()
        //                 }
        //                 throw new Error('Request failed.');
        //             })
        //             // .then(raw => raw.json())
        //             // .then(data =>{
        //             //     ul.innerHTML = data.map( i => `
        //             //         <li>
        //             //             My name is ${i.name} ${i.lastname}
        //             //         </lis>
        //             //     `).join('')
        //             // })
        //             .then(function (data) {
        //                 console.log(data);
        //                 document.getElementById('user').innerHTML = `My name is ${data.recordSet}`;
        //             })
        //             .catch(function (error) {
        //                 console.log(error);
        //             });
        // });