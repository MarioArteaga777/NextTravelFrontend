const API_URL = "http://localhost:8080/apiEmpleados";


export async function ObtenerEmpleados(){
    const res = await fetch(`${API_URL}/empleados`)
    return res.json();  
}

export async function CrearEmpleados(datos){
    await fetch(`${API_URL}/insertarEmpleados`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(datos)
    });
}

export async function ActualizarEmpleados(dui, data){
    await fetch(`${API_URL}/modificarEmpleado/${dui}`,{
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    });
}

export async function BorrarEmpleados(dui){
    await fetch(`${API_URL}/eliminarEmpleado/${dui}`,{
        method:'DELETE'
    });
}

