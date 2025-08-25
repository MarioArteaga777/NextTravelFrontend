const API_URL ='http://localhost:8080/apiCliente';

export async function ObtenerDatosClientes() {
    const res = await fetch(`${API_URL}/clientes`);
    return res.json();
}

export async function crearClientes(datos){
    await fetch(`${API_URL}/clientesInsertar`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    });
}

export async function ActualizarCliente(id, data){
    await fetch(`${API_URL}/clientes/${id}`,{
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    });
}


export async function BorrarCliente(id){
    await fetch(`${API_URL}/clientes/${id}`,{
        method:'DELETE'
    });
}
    

