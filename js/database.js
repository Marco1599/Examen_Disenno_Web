function insertList(key, object) {
    var list = [];
    list = getList(key);
    let primaryKey = list.length + 1;
    object.id = primaryKey;
    list.push(object);
    localStorage.setItem(key, JSON.stringify(list));
}

function getList(key) {
    var list = [];
    var storagerList = localStorage.getItem(key);
    if (storagerList == null) {
        list = [];
    }
    else {
        list = JSON.parse(storagerList);
    }
    return list;
}


function deleteFromTable(key, objectId) {
    var carreras = getList(key);

    if (!carreras) {
        return false;
    }
    var newCarrera = [];
    carreras.forEach((element) => {
        if (element.id != objectId) {
            newCarrera.push(element);
        }
    });
    newCarrera = cambiarId(newCarrera);
    saveList(key, newCarrera);
    return newCarrera;
}
function cambiarId(list) {
    for (let i = 0; i < list.length; i++) {
        list[i].id = i + 1;
    }
    return list;
}
function saveList(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}