const urlApi = "http://localhost:4000/";
console.log("url", urlApi);

const urlWebServices = {
  login: urlApi + "api/users/login",
  registration: urlApi + "api/users/registration",
  profesorPorCorreo: urlApi + "api/profesores/profesorPorCorreo",
  actualizar: urlApi + "api/profesores/actualizar",
  crearCurso: urlApi + "api/cursos/",
  misCursos: urlApi + "api/cursos/",
  obtenerTodosProfesores: urlApi + "api/profesores/",
  obtenerProfesorPorId: urlApi + "api/profesores/profesor/",
  enviarComentario: urlApi + "api/comentarios/",
  getComentariosByCursoId: urlApi + "api/comentarios/curso/",
  getComentariosByProfesorId: urlApi + "api/comentarios/profesor/",
  updateEstadoPublicacion: urlApi + "api/comentarios/",
  eliminarComentario: urlApi + "api/comentarios/",
  actualizarImagenCurso: urlApi + "api/cursos/",
};

export default urlWebServices;
