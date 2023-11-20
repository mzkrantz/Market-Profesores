const urlApi = "http://localhost:4000/";
console.log("url",urlApi);

const urlWebServices = {
    login:urlApi +"api/users/login",
    registration: urlApi +"api/users/registration",
    profesorPorCorreo: urlApi +"api/profesores/profesorPorCorreo",
    actualizar: urlApi +"api/profesores/actualizar",
    crearCurso: urlApi +"api/cursos/",
    misCursos: urlApi +"api/cursos/",
    obtenerProfesorPorId: urlApi +"api/profesores/",

   
}


export default urlWebServices;