const urlApi = "http://localhost:4000/";
console.log("url",urlApi);

const urlWebServices = {
    login:urlApi +"api/users/login",
    registration: urlApi +"api/users/registration",
    profesorPorCorreo: urlApi +"api/profesores/profesorPorCorreo",
    actualizar: urlApi +"api/profesores/actualizar",
   
}


export default urlWebServices;