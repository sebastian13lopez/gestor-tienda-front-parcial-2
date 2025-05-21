function users(page = 1) {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>';
    const limit = 10;
    const offset = (page - 1) * limit;
    const API_ENDPOINT = `https://api.escuelajs.co/api/v1/users?limit=${limit}&offset=${offset}`;
    
    fetch(API_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => {
                return {
                    status: response.status,
                    info: data
                };
            });
        } else {
            throw new Error('Failed to fetch users');
        }
    })
    .then((result) => {
        console.log("resultado ", result);
        if (result.status === 200 && result.info.length > 0) {
            let listusers = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>`;
            
            result.info.forEach(element => {
                listusers = listusers + `   
                <tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td><img src="${element.avatar}" class="img-thumbnail" alt="Avatar del usuario" style="max-width: 50px;"></td>
                    <td>${element.role}</td>
                    <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
                </tr>
                `;
            });
            
            listusers = listusers + `
                </tbody>
            </table>    
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item ${page == 1 ? 'disabled' : ''}">
                        <a class="page-link" href="#" aria-label="Previous" onclick="users('${parseInt(page) - 1}')">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item ${page == 1 ? 'active' : ''}"><a class="page-link" href="#" onclick="users('1')">1</a></li>
                    <li class="page-item ${page == 2 ? 'active' : ''}"><a class="page-link" href="#" onclick="users('2')">2</a></li>
                    <li class="page-item ${page == 3 ? 'active' : ''}"><a class="page-link" href="#" onclick="users('3')">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" onclick="users('${parseInt(page) + 1}')">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
            `;
            
            document.getElementById("info").innerHTML = listusers;
        } 
        else {
            document.getElementById("info").innerHTML = "No existen usuarios en la Base de Datos";
        }
    })
    .catch(error => {
        console.error("Error fetching users:", error);
        document.getElementById("info").innerHTML = "Error al cargar los usuarios: " + error.message;
    });
}

function getUser(idUser) {
    const API_ENDPOINT = `https://api.escuelajs.co/api/v1/users/${idUser}`;
    
    fetch(API_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => {
                return {
                    status: response.status,
                    body: data
                };
            });
        } else {
            throw new Error('User not found');
        }
    })
    .then((response) => {
        if (response.status === 200) {
            const user = response.body;
            const modalUser = `
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card">
                                <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                                <div class="card-body">
                                    <h5 class="card-title">Información del Usuario</h5>
                                    <p class="card-text"><strong>Nombre:</strong> ${user.name}</p>
                                    <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                                    <p class="card-text"><strong>Rol:</strong> ${user.role}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            
            const existingModal = document.getElementById('modalUser');
            if (existingModal) {
                existingModal.remove();
            }
            
            document.body.insertAdjacentHTML('beforeend', modalUser);
            const modalElement = document.getElementById('modalUser');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
        else {
            document.getElementById('info').innerHTML = 
            '<h3>No se encontró el usuario en la API</h3>';
        }
    })
    .catch(error => {
        console.error("Error fetching user:", error);
        document.getElementById('info').innerHTML = 
        `<h3>Error al cargar el usuario: ${error.message}</h3>`;
    });
}