var url = 'http://localhost:52777/api/';//"http://10.90.29.241/wsproductos/api/productos/";
var esNuevo;


function limpiar(){
    esNuevo=true;
    document.getElementById('txtid').value='';
    document.getElementById('txtNom').value='';
    document.getElementById('txtDireccion').value='';
    document.getElementById('txtTelefono').value='';
    document.getElementById('txtCorreo').value='';
    document.getElementById('txtTarjeta').value='';
    document.getElementById('txtTotal').value='';
    document.getElementById('lista').innerHTML='';

}

function consultar(){
    var urlTemp = url + 'facturas/consultar/'+document.getElementById('txtid').value;
    var request = new XMLHttpRequest();
    request.open("GET", urlTemp, false);
    
	request.onload = function() {
        if (JSON.stringify(request.response) != '' && JSON.stringify(request.response) != null && JSON.stringify(request.response) != 'null'){
            var objeto = JSON.stringify(request.response)
            imprimirEncabezado(objeto);
        }
    }
    request.send();


}
//*********************ELIMINAR FACTURA************************ */
function eliminar(){
    var urlTemp = url + 'facturas/eliminar/'+document.getElementById('txtid').value;
    var request = new XMLHttpRequest();
    request.open("DELETE", urlTemp, false);
    
	request.onload = function() {
        if (request.statusText=="OK" ){
            alert("Factura elmininada correctamente");
            limpiar();
        }else{
            alert("La factura no existe");
        }
    }
    request.send();
}

/*****************************MODIFICAR FACTURA*************************** */
function modificar(){
    
    if (validarCampos()){
        var request = new XMLHttpRequest();
        var urlTemp = url + 'facturas/modificar/'+document.getElementById('txtid').value;
        request.open("PUT", urlTemp, true);

        var dato={
            nomCliente:document.getElementById('txtNom').value
            ,direccion: document.getElementById('txtDireccion').value
            ,telefono: document.getElementById('txtTelefono').value
            ,email: document.getElementById('txtCorreo').value
            ,numTarjeta: document.getElementById('txtTarjeta').value
            ,monto: document.getElementById('txtTotal').value

        };
        request.onload = function() {
            if (request.response != '' && request.response != null){
                if (request.statusText=="OK" ){
                    alert("Factura modificada correctamente");
                    limpiar();
                }else{
                    alert("La factura no existe");
                }
            }
        }
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(dato));
    }else{
        alert('Debe completar todos los datos')
    }   
}

/*****************************INSERTAR FACTURA*************************** */
function guardar(){
    
    if (validarCampos()){
        var request = new XMLHttpRequest();
    
        request.open("POST", url + 'facturas/insertar/', true);

        var dato={
            nomCliente:document.getElementById('txtNom').value
            ,direccion: document.getElementById('txtDireccion').value
            ,telefono: document.getElementById('txtTelefono').value
            ,email: document.getElementById('txtCorreo').value
            ,numTarjeta: document.getElementById('txtTarjeta').value
            ,monto: document.getElementById('txtTotal').value

        };
        request.onload = function() {
            if (request.response != '' && request.response != null){
                consultar();
                insertarDetalle();
            }
        }
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(dato));
    }else{
        alert('Debe completar todos los datos')
    }   
}


function imprimirEncabezado(json){
    //var rows='<tbody>';
    if (Array.isArray(json)){
        json.forEach(function(element) {
            
        document.getElementById('txtNom').value=objeto.nomCliente;
        document.getElementById('txtDireccion').value=objeto.direccion;
        document.getElementById('txtTelefono').value=objeto.telefono;
        document.getElementById('txtCorreo').value=objeto.email;
        document.getElementById('txtTarjeta').value=objeto.numTarjeta;
        document.getElementById('txtTotal').value=objeto.montoTotal;
        }, this);
    }else{
        
        document.getElementById('txtNom').value=objeto.nomCliente;
        document.getElementById('txtDireccion').value=objeto.direccion;
        document.getElementById('txtTelefono').value=objeto.telefono;
        document.getElementById('txtCorreo').value=objeto.email;
        document.getElementById('txtTarjeta').value=objeto.numTarjeta;
        document.getElementById('txtTotal').value=objeto.montoTotal;
    }
    
}

function validarCampos(){
    var correcto=false;
    if(
    document.getElementById('txtNom').value !='' &&
    document.getElementById('txtDireccion').value !='' &&
    document.getElementById('txtTelefono').value !='' &&
    document.getElementById('txtCorreo').value !='' &&
    document.getElementById('txtTarjeta').value !=''){


        correcto=true;
    }

    return correcto;
}






