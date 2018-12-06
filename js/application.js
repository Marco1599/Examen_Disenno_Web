function validateInputsCarrera() {
    var nombre = document.getElementById('inputNombre').value.trim();
    var codigo = document.getElementById('inputCodigo').value.trim();


    var newCarrera = {
        codigo: codigo,
        nombre: nombre
    };
    if (nombre == "" || codigo == "") {
        alert("Ingrese todos los datos");
    }
    else {
        insertList('carreras', newCarrera);
        location.reload(true);
    }
}

function loadCarreras() {
    var carreras = getList('carreras');
    if (carreras.length == 0) {
        document.getElementById('table').style.display = "none";
    }
    else {
        loadTableCarreras(carreras);
    }
}


function loadTableCarreras(object) {
    var table = jQuery('#table');
    var rows = "";
    object.forEach((carrera, index) => {
        var row = `<tr><td>${carrera.nombre}</td><td>${carrera.codigo}</td>`;
        row += `<td class='text-center'> <a data-toggle="modal" href="#editar" onclick="editCarrera(this)" data-id="${carrera.id}" data-entity="table" class=" link edit" >Editar</a>  -  <a  onclick="deleteCarrera(this);" data-id="${carrera.id}" data-entity="table" class="link delete">Eliminar</a>  </td>`;
        rows += row + '</tr>';
    });
    if (!rows == "") {
        var rows = "<thead class='text-center'><tr><th scope='col'>Nombre</th><th scope='col'>Codigo</th><th scope='col'>Acciones</th></tr></thead>" + '<tbody>' + rows + '</tbody>';
        table.html(rows);
    }
    else {
        table.html(rows);
    }
}

function editCarrera(element) {
    var object = jQuery(element).data();
    loadCarrera(object.id);
}

function loadCarrera(object) {
    var list = getList('carreras');
    for (var i = 0; i < list.length; i++) {
        if (object == list[i].id) {
            jQuery("#inputName").val(list[i].nombre);
            jQuery("#inputCod").val(list[i].codigo);
        }
    }
    sessionStorage.setItem('idCarrera', object);
}

function saveEditedCarrera() {
    var id = sessionStorage.getItem('idCarrera');
    var nombre = document.getElementById('inputName').value.trim();
    var codigo = document.getElementById('inputCod').value.trim();

    if (nombre == "" || codigo == "") {
        alert("Ingrese todos los datos");
    }
    else {
        var list = getList('carreras');
        for (var i = 0; i < list.length; i++) {
            if (id == list[i].id) {
                list[i].nombre = nombre;
                list[i].codigo = codigo;
            }
        }
        saveList('carreras', list);
        location.reload(true);
    }
}

function deleteCarrera(element) {
    var object = jQuery(element).data();
    var newObject = deleteFromTable('carreras', object.id);
    loadTableCarreras(newObject);
}




function validateInputsCurso() {
    var nombre = document.getElementById('inputNombre').value.trim();
    var codigo = document.getElementById('inputCodigo').value.trim();
    var creditos = document.getElementById('inputCred').value.trim();

    var newCurso = {
        codigo: codigo,
        nombre: nombre,
        creditos: creditos
    };
    if (nombre == "" || codigo == "" || creditos == "") {
        alert("Ingrese todos los datos");
    }
    else if (!validateCarrera(codigo)) {
        alert("Codigo de carrera no existente")
    }
    else {
        insertList('cursos', newCurso);
        location.reload(true);
    }
}
function validateCarrera(codigo) {
    var carreras = getList('carreras');
    var acceso = false;
    carreras.forEach((carrera, index) => {
        if (carrera.codigo == codigo) {
            acceso = true;
        }
    });
    return acceso;

}
function loadCursos() {
    var cursos = getList('cursos');
    if (cursos.length == 0) {
        document.getElementById('table').style.display = "none";
    }
    else {
        loadTableCursos(cursos);
    }
}


function loadTableCursos(object) {
    var table = jQuery('#table');
    var rows = "";
    object.forEach((curso, index) => {
        var row = `<tr><td>${curso.nombre}</td><td>${curso.codigo}</td> <td>${curso.creditos}</td>`;
        row += `<td class='text-center'> <a data-toggle="modal" href="#editar" onclick="editCurso(this)" data-id="${curso.id}" data-entity="table" class=" link edit" >Editar</a>  -  <a  onclick="deleteCurso(this);" data-id="${curso.id}" data-entity="table" class="link delete">Eliminar</a>  </td>`;
        rows += row + '</tr>';
    });
    if (!rows == "") {
        var rows = "<thead class='text-center'><tr><th scope='col'>Nombre</th><th scope='col'>Codigo</th><th scope='col'>Creditos</th><th scope='col'>Acciones</th></tr></thead>" + '<tbody>' + rows + '</tbody>';
        table.html(rows);
    }
    else {
        table.html(rows);
    }
}

function editCurso(element) {
    var object = jQuery(element).data();
    loadCurso(object.id);
}

function loadCurso(object) {
    var list = getList('cursos');
    for (var i = 0; i < list.length; i++) {
        if (object == list[i].id) {
            jQuery("#inputName").val(list[i].nombre);
            jQuery("#inputCod").val(list[i].codigo);
            jQuery("#inputCreditos").val(list[i].creditos);
        }
    }
    sessionStorage.setItem('idCurso', object);
}

function saveEditedCurso() {
    var id = sessionStorage.getItem('idCurso');
    var nombre = document.getElementById('inputName').value.trim();
    var codigo = document.getElementById('inputCod').value.trim();
    var creditos = document.getElementById('inputCreditos').value.trim();


    if (nombre == "" || codigo == "" || creditos == "") {
        alert("Ingrese todos los datos");
    }
    else if (!validateCarrera(codigo)) {
        alert("Codigo de carrera no existente")
    }
    else {
        var list = getList('cursos');
        for (var i = 0; i < list.length; i++) {
            if (id == list[i].id) {
                list[i].nombre = nombre;
                list[i].codigo = codigo;
                list[i].creditos = creditos;
            }
        }
        saveList('cursos', list);
        location.reload(true);
    }
}

function deleteCurso(element) {
    var object = jQuery(element).data();
    var newObject = deleteFromTable('cursos', object.id);
    loadTableCarreras(newObject);
}

function bindEvents() {
    jQuery('#btnGuardarCarrera').bind('click', validateInputsCarrera);
    jQuery('#btnGuardarEditCarrera').bind('click', saveEditedCarrera);
    jQuery('#btnGuardarCurso').bind('click', validateInputsCurso);
    jQuery('#btnGuardarEditCurso').bind('click', saveEditedCurso);


}

bindEvents();