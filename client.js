console.log('Client-side code running');

        const button = document.getElementById('add-user');
    button.addEventListener('click', function (e) {
            let inputName = document.getElementById("name").value;
            let inputLastName = document.getElementById("lastname").value;
            console.log('button was clicked');
            fetch('/clicked', { method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:{
                        name: inputName,
                        lastname: inputLastName
                }
                    })
            })
        .then(response => response.status==="200" ? console.log("ok") : "no")
    });

        const button1 = document.getElementById('show-user');
        let ul = document.querySelector('#users')
        button1.addEventListener('click', function (e) {
            fetch('/clicks', { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
                }
                return response.text();
            })
            .then((text) => { 
                let data = JSON.parse(text).recordset
                var list = document.createElement("ul");
                for (let i of data) {
                let item = document.createElement("li");
                item.innerHTML = `${i.name} ${i.lastname}` ;
                list.appendChild(item);
                }                 
                document.getElementById("users").appendChild(list);
            })
            .catch((error) => console.log("error"));
        });