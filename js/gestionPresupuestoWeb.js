'use strict';
/*
function mostrarDatoEnId(idElemento, valor){

    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;

}

function mostrarGastoWeb(idElemento, gasto){
    let bloque = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    divGasto.id = "gasto-editar";

    let divDescripcion = document.createElement('div');
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = `${gasto.descripcion}`;

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.textContent = `${gasto.fecha}`;

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.textContent = `${gasto.valor}`;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = "gasto-etiquetas";
    
    // boton editar
    let botonEditar = document.createElement('button');
    botonEditar.className = "gasto-editar";
    botonEditar.id = "gasto-editar";
    botonEditar.type = "button";
    botonEditar.textContent = "Editar gasto";
    // evento editar
    let eventoEditar = new EditarHandle();
    eventoEditar.gasto = gasto;
    botonEditar.addEventListener("click", eventoEditar);

    // boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.id = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar gasto";
    // evento borrar
    let eventoBorrar = new BorrarHandle();
    eventoBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", eventoBorrar);
     // boton editar form
    let botonEditarForm = document.createElement("button");
    botonEditarForm.className = "gasto-editar-formulario";
    botonEditarForm.id = "gasto-editar-formulario";
    botonEditarForm.type = "button";
    botonEditarForm.textContent = "Editar (formulario)";
    // evento editar form
    let eventoEditarForm = new EditarHandleFormulario();
    eventoEditarForm.gasto = gasto;
    botonEditarForm.addEventListener("click", eventoEditarForm);

    for (let eti of gasto.etiquetas) {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = `${eti}`;
        divEtiquetas.append(spanEtiqueta);

        let eventoBorrarEti = new BorrarEtiquetasHandle();
        eventoBorrarEti.gasto = gasto;
        eventoBorrarEti.etiqueta = eti;
        spanEtiqueta.addEventListener('click', eventoBorrarEti);
    }
        bloque.append(divGasto);
        divGasto.append(divDescripcion);
        divGasto.append(divFecha);
        divGasto.append(divValor);
        divGasto.append(divEtiquetas);
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
        divGasto.append(botonEditarForm);

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let bloque = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elemento in agrup)
    {
        bloque += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elemento} </span>
                        <span class="agrupacion-dato-valor">${agrup[elemento]}</span>
                        </div> `;


    }
    bloque += `</div>`;
    document.getElementById(idElemento).innerHTML += bloque;
}

function repintar(){
let presupuesto = gestionPresupuesto.mostrarPresupuesto();
mostrarDatoEnId("presupuesto", presupuesto);

let gastos_totales = gestionPresupuesto.calcularTotalGastos();
mostrarDatoEnId("gastos-totales", gastos_totales) ;

let balance_total = gestionPresupuesto.calcularBalance()
mostrarDatoEnId("balance-total", balance_total)

document.getElementById("listado-gastos-completo").innerHTML = "";
let listado_gastos_completo = gestionPresupuesto.listarGastos()
for(let gasto of listado_gastos_completo){
    mostrarGastoWeb("listado-gastos-completo", gasto)
}
}

function actualizarPresupuestoWeb(){
    let presupuesto = parseFloat(prompt("Introduce un presupuesto"))
    gestionPresupuesto.actualizarPresupuesto(presupuesto)
    repintar()
}
let actualizarPre = document.getElementById("actualizarpresupuesto");
actualizarPre.addEventListener('click',actualizarPresupuestoWeb);

function nuevoGastoWeb(){
let descripcion = prompt("dime la descripcion del gasto");
let valor = parseFloat(prompt("dime el valor del gasto"));
let fecha = Date.parse(prompt("dime la fecha del gasto"));
let etiquetas = prompt("dime las etiquetas del gasto separadas por comas");
let arrayEtiquetas = etiquetas.split(',')

let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,arrayEtiquetas)
gestionPresupuesto.anyadirGasto(nuevoGasto)
repintar()
}
let agregarGasto = document.getElementById("anyadirgasto");
agregarGasto.addEventListener('click',nuevoGastoWeb);

function nuevoGastoWebFormulario(){

    let formularioAbajo = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = formularioAbajo.querySelector("form");
    let controlesprincipales = document.getElementById("controlesprincipales");
    document.getElementById("anyadirgasto-formulario").disabled = true;
    
    controlesprincipales.append(formulario);

    let enviarGasto = new EnviarGastoHandle();
    enviarGasto.formulario = formulario; 
    formulario.addEventListener("submit", enviarGasto);

    let botonCancelar = formulario.querySelector("button.cancelar");
    let eventoCancelar = new CancelarFormularioHandle();
    botonCancelar.addEventListener("click", eventoCancelar)
}
let anyadirFormulario = document.getElementById("anyadirgasto-formulario");
anyadirFormulario.addEventListener("click", nuevoGastoWebFormulario);

function EditarHandle() {
    this.handleEvent = function(e){
    let descripcion = prompt("dime la descripcion del gasto", this.gasto.descripcion);
    this.gasto.actualizarDescripcion(descripcion)

    let valor = parseFloat(prompt("dime el valor del gasto"));
    this.gasto.actualizarValor(parseFloat(valor));

    let fecha = ("dime la fecha del gasto con formato yyyy-mm-dd")
    this.gasto.actualizarFecha(fecha);

    let etiquetas = prompt("dime las etiquetas del gasto separadas por comas");
    let arrayEtiquetas = etiquetas.split(',');
    this.gasto.anyadirEtiquetas(...arrayEtiquetas);

    repintar()
    }
}
function filtrarGastosWeb(){
    this.handleEvent = function(e){

        e.preventDefault();

        let plantillaForm = document.getElementById("filtrar-gastos");
        let datosForm = plantillaForm.querySelector("form");
        let objeto = {
            etiquetasTiene : gestionPresupuesto.transformarListadoEtiquetas(datosForm.elements["formulario-filtrado-etiquetas-tiene"].value),
            descripcionContiene : datosForm.elements["formulario-filtrado-descripcion"].value,
            valorMinimo : datosForm.elements["formulario-filtrado-valor-minimo"].value,
            valorMaximo : datosForm.elements["formulario-filtrado-valor-maximo"].value,
            fechaDesde : datosForm.elements["formulario-filtrado-fecha-desde"].value,
            fechaHasta : datosForm.elements["formulario-filtrado-fecha-hasta"].value
        }

        
        
        let gastosFiltrados = gestionPresupuesto.filtrarGastos(objeto);

        document.getElementById("listado-gastos-completo").innerHTML = "";

        for(let filtro of gastosFiltrados)
        {
            mostrarGastoWeb("listado-gastos-completo", filtro);
        }
    }
}
let eventoFormularioFiltrado = new filtrarGastosWeb();
let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", eventoFormularioFiltrado);

function BorrarHandle(){

    this.handleEvent = function(e){

        gestionPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    }
}
function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){
        
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}
function EnviarGastoHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
     
         let descripcion = this.formulario.elements.descripcion.value;
         let valor = parseFloat(this.formulario.elements.valor.value);
         let fecha = this.formulario.elements.fecha.value;
         let etiquetas = this.formulario.elements.etiquetas.value;



        let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
        gestionPresupuesto.anyadirGasto(gastoNuevo);
        repintar();

        document.getElementById("anyadirgasto-formulario").disabled = false;
    }
}

function CancelarFormularioHandle(){

    this.handleEvent = function(e){
        
        document.getElementById("anyadirgasto-formulario").disabled = false;
        e.currentTarget.parentNode.remove(); // borras formulario
        repintar();
    }
}

function EditarHandleFormulario(){

    this.handleEvent = function(e){
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
    
        let btnEditarF = e.currentTarget;
        btnEditarF.after(formulario); // mete el formulario abajo del boton
        btnEditarF.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let enviarGasto = new SubmitHandle();
        enviarGasto.formulario = formulario; 
        enviarGasto.gasto = this.gasto;
        formulario.addEventListener("submit", enviarGasto);

        let cancelarFormBoton = formulario.querySelector("button.cancelar");
        let eventCancelar = new CancelarFormularioHandle();
        cancelarFormBoton.addEventListener("click", eventCancelar);
    }
}

function SubmitHandle(){

    this.handleEvent = function(e){
        e.preventDefault();
 
        let descripcion = this.formulario.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descripcion);

        let valor = this.formulario.elements.valor.value;
        valor = parseFloat(valor);
        this.gasto.actualizarValor(valor);

        let fecha = this.formulario.elements.fecha.value;
        this.gasto.actualizarFecha(fecha);

        let etiquetas = this.formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiquetas);


        repintar();
    }
} 
 */

import * as gestionPresupuesto from './gestionPresupuesto.js'

let btnActualizar = document.getElementById('actualizarpresupuesto')
btnActualizar.onclick = actualizarPresupuestoWeb;

let btnAnyadir = document.getElementById('anyadirgasto')
btnAnyadir.onclick = nuevoGastoWeb;

let btnAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirGastoFormulario.addEventListener('click', nuevoGastoWebFormulario);

let btnGuardarGastos = document.getElementById("guardar-gastos");
btnGuardarGastos.addEventListener('click', new guardarGastosWeb);

let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.addEventListener('click', new cargarGastosWeb);


function nuevoGastoWebFormulario(){
    
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    let boton = document.getElementById("anyadirgasto-formulario");
    boton.disabled = true;
    document.getElementById("controlesprincipales").append(formulario);
    

    let anyadirGastoFromHandler = new AnyadirGastoFormularioHandler();
    anyadirGastoFromHandler.formulario = formulario;
    anyadirGastoFromHandler.boton = boton;

    formulario.addEventListener("submit",anyadirGastoFromHandler);

    let botonCancelar = formulario.querySelector("button.cancelar");
    let handlerBotonCancelar = new CancelarBotonFormulario();
    handlerBotonCancelar.formulario = formulario;
    handlerBotonCancelar.boton = boton;
    handlerBotonCancelar.elem = document.getElementById("controlesprincipales");

    botonCancelar.addEventListener("click", handlerBotonCancelar);

    let btnEnviarAPI = formulario.querySelector("button.gasto-enviar-api");
    btnEnviarAPI.addEventListener("click", enviarAPIHandle);    

    repintar();
    
}

function repintar(){
    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';
    let h1 = document.createElement('h1');
    let texto = "Presupuesto actual"
    h1.append(texto);
    document.getElementById('presupuesto').innerHTML = '';
    divGasto.append(h1);
    document.getElementById('balance-total').innerHTML = '';
    document.getElementById('gastos-totales').innerHTML = '';
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());

    document.getElementById('listado-gastos-completo').innerHTML = '';
    let gastos = gestionPresupuesto.listarGastos();
    gastos.forEach(exp => {mostrarGastoWeb('listado-gastos-completo', exp);});
    
    document.getElementById('listado-gastos-filtrado-1').innerHTML = '';
    let gastosFilt = gestionPresupuesto.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-1', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-2').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo:50});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-2', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-3').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMinimo:200,etiquetasTiene:['seguros']});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);});

    document.getElementById('listado-gastos-filtrado-4').innerHTML = '';
    gastosFilt = gestionPresupuesto.filtrarGastos({valorMaximo:50,etiquetasTiene:['comida','transporte']});
    gastosFilt.forEach(gastoFiltrado => {mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);});

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");

    
}
 function actualizarPresupuestoWeb(){
    let pres = parseFloat(prompt('Introduce un nuevo presupuesto:'));
    gestionPresupuesto.actualizarPresupuesto(pres);    
    repintar();
 }

 function nuevoGastoWeb(){
    let desc = prompt('Introduce la descripción del nuevo gasto:');
    let valor = parseFloat(prompt('Introduce el valor del nuevo gasto:'));
    let fecha = prompt('Introduce una fecha para el nuevo gasto con este formato(aaaa-mm-dd):');
    let etiq = prompt('Introduce las etiquetas(etiqueta1, etiqueta2, etiqueta3):');
    let etiquetas = etiq.split(',');
    let gasto = new gestionPresupuesto.CrearGasto(desc,valor,fecha);
    etiquetas.forEach(label => {gasto.anyadirEtiquetas(label);});
    gestionPresupuesto.anyadirGasto(gasto);

    repintar();
 }

 
 function AnyadirGastoFormularioHandler(){
    this.handleEvent = function(){
        let descForm = this.formulario.elements.descripcion.value;
        let valForm = this.formulario.elements.valor.value;
        let fechForm = this.formulario.elements.fecha.value;
        let etForm = this.formulario.elements.etiquetas.value;
        let etiqForm = new Array();
        etiqForm = etForm.split(",");
        let gastoForm = new gestionPresupuesto.CrearGasto(descForm,parseFloat(valForm), fechForm, ...etiqForm);
        gestionPresupuesto.anyadirGasto(gastoForm);
        this.boton.disabled = false;
        document.getElementById("controlesprincipales").removeChild(this.formulario);
        repintar();
    }
}

 function AplicarEditForm(){
    this.handleEvent = function(event){
        event.preventDefault();
        this.gasto.actualizarDescripcion(this.formulario.elements.descripcion.value);
        this.gasto.actualizarFecha(this.formulario.elements.fecha.value);
        this.gasto.actualizarValor(parseFloat(this.formulario.elements.valor.value));
        let etiqForm = new Array();
        etiqForm = this.formulario.elements.etiquetas.value.split(",");
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiqForm);
        this.boton.disabled = false;
        this.elem.removeChild(this.formulario);
        console.log(gestionPresupuesto.calcularTotalGastos());
        repintar();

    }
}

function CancelarBotonFormulario(){
    this.handleEvent = function(){
        this.boton.disabled = false;
        this.elem.removeChild(this.formulario);
    }
}

function EditarHandleFormulario(){
    this.handleEvent = function(){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");
        this.elem.append(formulario);
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toLocaleDateString();
        formulario.elements.etiquetas.value = this.gasto.etiquetas.toString();

        let aplicarEdit = new AplicarEditForm();
        aplicarEdit.gasto = this.gasto;
        aplicarEdit.formulario = formulario;
        aplicarEdit.boton = this.boton;
        aplicarEdit.elem = this.elem;

        formulario.addEventListener("submit", aplicarEdit);
        this.boton.disabled = true;
    
        let botonCancelar = formulario.querySelector("button.cancelar");
        let handlerBotonCancelar = new CancelarBotonFormulario();
        handlerBotonCancelar.formulario = formulario;
        handlerBotonCancelar.boton = this.boton;
        handlerBotonCancelar.elem = this.elem;
        botonCancelar.addEventListener("click", handlerBotonCancelar);   

        let actualizarAPI = new ActualizarAPIHandle();
        actualizarAPI.gasto = this.gasto;

        let btnActualizarAPI = formulario.querySelector("button.gasto-enviar-api");
        btnActualizarAPI.addEventListener("click", actualizarAPI);    
    }
}
 function EditarHandle(){
    this.handleEvent = function()
    {
        let etiquetas = new Array();
        let desc = prompt('Introduce la descripción:');
        let valor = parseFloat(prompt('Introduce el valor:'));
        let fecha = prompt('Introduce una fecha con este formato(aaaa-mm-dd):');
        let etiq = prompt('Introduce las etiquetas(etiqueta1, etiqueta2, etiqueta3):');
        
        etiquetas = etiq.split(',');
        
        desc !== '' && this.gasto.actualizarDescripcion(desc);
        valor >= 0 && this.gasto.actualizarValor(valor);
        fecha !=='' && this.gasto.actualizarFecha(fecha);

        this.gasto.etiquetas = etiquetas;
        repintar();
    };
 }

 function BorrarHandle(){
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
 }
 function BorrarEtiquetasHandle(){
    this.handleEvent = function()
    {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
 }

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML= `<br> ${valor} <br>`;
}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento); 
    
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';

    let texto = "<h2> Presupuesto </h2>";                                                                          

    let divPresupuesto = document.createElement('div');
    divPresupuesto.className = 'presupuesto';

    let divGastoPresupuesto = document.createElement('div');
    divGastoPresupuesto.className = 'presupuesto';
    divGastoPresupuesto.textContent = texto;

    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.className = 'gasto-descripcion'; 
    divGastoDescripcion.textContent = gasto.descripcion;

    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = 'gasto-fecha'; 
    divGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    
    let divGastoValor = document.createElement('div');
    divGastoValor.className = 'gasto-valor'; 
    divGastoValor.textContent = gasto.valor + '';
    
    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas'; 

    elem.append(divGasto);
    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);
    divGasto.append(divPresupuesto);
    let spacio = "______________________________________________________"
    let br = document.createElement('br');
    gasto.etiquetas.forEach(label =>
        {
            let borraEti = new BorrarEtiquetasHandle();
            borraEti.gasto = gasto;
            borraEti.etiqueta = label;
            
            let spanH = document.createElement('span');
            spanH.className = 'gasto-etiquetas-etiqueta';
            spanH.textContent = label + '';  
            if(idElemento == "listado-gastos-completo"){
                spanH.addEventListener("click", borraEti);
            }

            divGastoEtiquetas.append(spanH);   
                 
        });
    
    
    divGasto.append(divGastoEtiquetas);
    
     
    let botonEditar = document.createElement('button');
    botonEditar.className = 'gasto-editar';
    botonEditar.type = 'button';
    botonEditar.textContent = 'Editar';

    let editarHandle = new EditarHandle();
    editarHandle.gasto = gasto;
    botonEditar.addEventListener('click', editarHandle);    

    let botonBorrar = document.createElement('button');
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.type = 'button';
    botonBorrar.textContent = 'Borrar';

    let evBorrarAPI = new BorrarAPIHandle();
    evBorrarAPI.gasto = gasto;

    let btnBorrarAPI = document.createElement("button");
    btnBorrarAPI.className = "gasto-borrar-api";
    btnBorrarAPI.type = "button";
    btnBorrarAPI.textContent = "Borrar (API)";
    btnBorrarAPI.addEventListener('click', evBorrarAPI);

    let borrarHandle = new BorrarHandle();
    borrarHandle.gasto = gasto;
    botonBorrar.addEventListener('click', borrarHandle);
    
    let botonEditarF=document.createElement("button");
    botonEditarF.className="gasto-editar-formulario";
    botonEditarF.type="button";
    botonEditarF.textContent="Editar Form";

    let editHaForm = new EditarHandleFormulario();
    editHaForm.gasto=gasto;
    editHaForm.boton=botonEditarF;
    editHaForm.elem= divGasto;
    botonEditarF.addEventListener("click",editHaForm);

    botonEditarF.addEventListener("click", editHaForm);

    if(idElemento == "listado-gastos-completo"){
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);
        divGasto.append(botonEditarF);
        divGasto.append(br);
        divGasto.append(spacio);
        divGasto.append(br);
        
    } 
    divGasto.append(br);
    divGasto.append(spacio);
    divGasto.append(br);
}    

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);
    let texto = "";
    for (let [clave, valor] of Object.entries(agrup)) {
        texto += "<div class='agrupacion-dato'> <span class='agrupacion-dato-clave'> " + clave + " </span>" +
            "<span class='agrupacion-dato-valor'> " + valor + "\n </span></div>";
        
    };
    elem.innerHTML += "<div class='agrupacion'><h1>Gastos agrupados por " + periodo + " </h1>" + texto;
    
}
let formularioFiltro = document.getElementById("formulario-filtrado");

let handlerFiltro = new filtrarGastosWeb();
formularioFiltro.addEventListener("submit", handlerFiltro);

function filtrarGastosWeb(){
    this.handleEvent = function(event){
        event.preventDefault();
        let d = document.getElementById("formulario-filtrado-descripcion").value;
        let vm = parseFloat(document.getElementById("formulario-filtrado-valor-minimo").value);
        let vmax =  parseFloat(document.getElementById("formulario-filtrado-valor-maximo").value);
        let etF = document.getElementById("formulario-filtrado-etiquetas-tiene").value;
        let fechH = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let fechD = document.getElementById("formulario-filtrado-fecha-desde").value;
        
        let filtro = {};

        if(etF.length > 0){
            filtro.etiquetasTiene = gestionPresupuesto.transformarListadoEtiquetas(etF);
        }
        if(d != ""){
            filtro.descripcionContiene = d;
        }
        if(vm != "" && typeof vm !== "undefined" && !isNaN(vm)){
            filtro.valorMinimo = vm;
        }

        if(vmax != "" && typeof vmax !== "undefined" && !isNaN(vmax)){
            filtro.valorMaximo = vmax;
        }

        if(Date.parse(fechD)){
            filtro.fechaDesde = fechD;
        }

        if(Date.parse(fechH)){
            filtro.fechaHasta = fechH;
        }

        console.log(filtro);

        document.getElementById("listado-gastos-completo").innerHTML="";
        let gastosFiltrado = gestionPresupuesto.filtrarGastos(filtro);
        gastosFiltrado.forEach(g => {
            mostrarGastoWeb("listado-gastos-completo" , g);
        })

    }
}
function cargarGastosWeb(){
    this.handleEvent = function(event){
    let listaGastosStorage = localStorage.getItem('GestorGastosDWEC');
    listaGastosStorage = JSON.parse(listaGastosStorage);

    if(listaGastosStorage){
        gestionPresupuesto.cargarGastos(listaGastosStorage);
    }else{
        listaGastosStorage = [];
        gestionPresupuesto.cargarGastos(listaGastosStorage);
    }
    repintar();
    }
}

function guardarGastosWeb(){
    this.handleEvent = function(event){
      
    let listaGastos = gestionPresupuesto.listarGastos();
    localStorage.setItem('GestorGastosDWEC', JSON.stringify(listaGastos));
    }
}

let btnCargarGastosApi = document.getElementById("cargar-gastos-api");
btnCargarGastosApi.addEventListener('click', new cargarGastosApi);



function cargarGastosApi(){
    let usuario = document.getElementById('nombre_usuario').value;

    if(usuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`;

        fetch(url, {

            method: "GET",
        })
        .then(response => response.json())

        .then(function(gastosAPI)
        {

            gestionPresupuesto.cargarGastos(gastosAPI);
            repintar();
        })
        .catch(err => alert(err));
    }else
    {
        alert('No has introducido usuario');
    }
}

function BorrarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let usuario = document.getElementById('nombre_usuario').value;
        if(usuario != '')
        {
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`;
            fetch(url, 
            {

                method: "DELETE",
            })
            .then(function(response)
            {
                if(!response.ok)
                {
                    alert("Error "+ response.status +": no existe gasto con ese id");
                }
                else
                {
                    alert("GASTO BORRADO");

                    cargarGastosApi();

                }
            })
            .catch(err => alert(err));
        }
        else
        {
            alert('No ha introducido un usuario');
        }
    }
}
function enviarAPIHandle()
{
    let usuario = document.getElementById('nombre_usuario').value;

    if(usuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${NUsuario}`;    
        var form = document.querySelector("#controlesprincipales form");
        let descrip = form.elements.descripcion.value;
        let val = form.elements.valor.value;
        let fech = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;

        val = parseFloat(val);
        etiq = etiq.split(',');

        let gastoAPI =
        {
            descripcion: descrip,
            valor: val,
            fecha: fech,
            etiquetas: etiq
        };

        fetch(url, {
            method: "POST",
            headers:
            {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(gastoAPI)
    })
    .then(function(response)
    {
        if(!response.ok)
        {
            alert("Error "+response.status+": no se ha creado el gasto");
        }
        else
        {

            alert("Gasto creado");
            cargarGastosApi();
        }
    })
    .catch(err => alert(err));         

}
    else
    {

        alert('No has introducido el usuario');
    }

}
function ActualizarAPIHandle()
{
    this.handleEvent = function(e)
    {
        let usuario = document.getElementById('nombre_usuario').value;

        if(usuario != '')
        {
            let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
            var form = document.querySelector(".gasto form");
            let descrip = form.elements.descripcion.value;
            let val = form.elements.valor.value;
            let fech = form.elements.fecha.value;
            let etiq = form.elements.etiquetas.value;
            val = parseFloat(val);
            etiq = etiq.split(',');

            let gastoAPI = 
            {

                descripcion: descrip,
                valor: val,
                fecha: fech,
                etiquetas: etiq
            };
            fetch(url, {

                method: "PUT",
                headers:
                {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gastoAPI)
            })

            .then(function(response)
            {
                if(!response.ok)
                {
                    alert("Error "+response.status+": no se ha actualizado el gasto");
                }else
                {
                    alert("Gasto actualizado");
                    cargarGastosApi();
                }
            })
            .catch(err => alert(err));
        }else
        {
            alert('No has introducido usuario');
        }
    }
}// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo

export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    nuevoGastoWebFormulario,
    filtrarGastosWeb,
    EditarHandleFormulario,
    guardarGastosWeb,
    cargarGastosWeb,

}