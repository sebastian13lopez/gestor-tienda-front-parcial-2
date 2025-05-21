function products(){    
    document.getElementById('cardHeader').innerHTML= '<h5>Listado de usuarios </h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/products?page=1'

    fetch(REQRES_ENDPOINT, {
      method: 'GET' , 
      headers: {
        'Content-type' : 'application/json',
        'x-api-key': 'reqres-free-v1'
      } 
    })
    .then((response) =>{
        return response.json().then(
            data =>{
                return{
                    status: response.status,
                    info: data
                }
            }
        )
    })

    .then((result) =>{
        console.log('resultado' , result)
        if(result.status === 200){
            let listProduct = `
            <table class="table">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Año</th>
            <th scope="col">Color</th>
            </tr>
            </thead>
            <tbody>
            `
            result.info.data.forEach(element => {
                listProduct = listProduct + `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.year}</td>
                    <td><input type='color' value='${element.color}'></td>
                </tr>
                `
            });
            listProduct = listProduct + `
              </tbody>
            </table>
            `
            document.getElementById('info').innerHTML = listProduct
        }else{
            document.getElementById('info').innerHTML = 'No existen usuarios'
        }
    })
}