let $ = require('jquery');
let fs = require('fs');
let filename = 'productos';
let i = 0;

$('#add-to-list').on('click', () => {
    let nombre = $('#nombre').val();
    let precio = parseFloat($('#precio').val()).toFixed(2);

    fs.appendFile(filename, `${nombre},${precio}\n`, (err) => {
        if(err) {
            console.log(err);
        }
    });

    addEntry(nombre, precio);
})

function addEntry(nombre, precio) {
    if(nombre && precio) {
        i++;
        let row = `<tr><td>${i}</td><td>${nombre}</td><td>${precio}</td><tr>`;
        $('#contact-table').append(row);
    }
}

function loadAndDisplayContacts() {  
    //Check if file exists
    if(fs.existsSync(filename)) {
        let data = fs.readFileSync(filename, 'utf8').split('\n');

        data.forEach((producto, index) => {
            let [ nombre, precio ] = producto.split(',');
            addEntry(nombre, precio);
        })
    } else {
        console.log("Creating new file.");
        fs.writeFile(filename, '', (err) => {
            if(err) {
                console.log(err);
            }
        })
    }
}

loadAndDisplayContacts();