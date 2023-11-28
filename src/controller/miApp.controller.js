import urlWebServices from "../controller/webServices.js";

export const login = async function (login) {
  //url webservices
  let url = urlWebServices.login;
  //armo json con datos
  const formData = new URLSearchParams();
  formData.append("email", login.email);
  formData.append("password", login.password);
  try {
    let response = await fetch(url, {
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        // 'x-access-token': WebToken.webToken,
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    let rdo = response.status;
    let data = await response.json();
    switch (rdo) {
      case 201: {
        //guardo token
        localStorage.setItem("x", data.loginUser.token);
        //guardo usuario logueado
        let user = data.loginUser.user;
        localStorage.setItem("nombre", user.name);
        localStorage.setItem("email", user.email);

        return { rdo: 0, mensaje: "Ok" }; //correcto
      }
      case 202: {
        //error mail
        return {
          rdo: 1,
          mensaje: "El mail ingresado no existe en nuestra base.",
        };
      }
      case 203: {
        //error password
        return { rdo: 1, mensaje: "La contraseña no es correcta." };
      }
      default: {
        //otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const registration = async function (user) {
  // url webservices
  let url = urlWebServices.registration;
  // armo json con datos

  try {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Origin: "http://localhost:3000",
      },
      body: user,
    });

    let rdo = response.status;
    console.log(rdo);
    console.log("Controller");
    let data = await response.json();

    // Imprime toda la respuesta del servidor
    console.log("Server response:", data);

    switch (rdo) {
      case 201: {
        if (data && data.token) {
          // guardo token
          localStorage.setItem("x", data.token);

          // guardo usuario registrado
          let user = data.user;
          if (user) {
            localStorage.setItem("nombre", user.name);
            localStorage.setItem("email", user.email);
          }
        }
        console.log("Response 201:", { rdo: 0, mensaje: "Ok" });
        return { rdo: 0, mensaje: "Ok" }; // correcto
      }
      case 400: {
        // error mail
        return {
          rdo: 1,
          mensaje: "El mail ingresado ya existe en nuestra base.",
        };
      }
      default: {
        // otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }

  // Asegúrate de manejar la lógica de retorno para todos los casos
  return { rdo: 1, mensaje: "Ha ocurrido un error inesperado" };
};

export const profesorPorMail = async function () {
  // url webservices
  let url = urlWebServices.profesorPorCorreo; // Reemplaza con la ruta de tu endpoint

  let token = localStorage.getItem("x");
  let email = localStorage.getItem("email");

  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "x-access-token": token,
        email: email,
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    let rdo = response.status;
    let data = await response.json();
    switch (rdo) {
      case 200: {
        localStorage.setItem("profesorId", data.data._id);
        return { rdo: 0, mensaje: "Ok", profesor: data }; // correcto
      }
      case 404: {
        // No se encontró el profesor
        return {
          rdo: 1,
          mensaje: "No se encontró el profesor con ese correo electrónico.",
        };
      }
      default: {
        // otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const actualizar = async function (formData) {
  // url webservices
  let url = urlWebServices.actualizar; // Reemplaza con la ruta de tu endpoint

  let token = localStorage.getItem("x");

  try {
    let response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "x-access-token": token,
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let rdo = response.status;
    console.log("response", response);
    let data = await response.json();
    console.log("jsonresponse", data);
    switch (rdo) {
      case 200: {
        // Procesa los datos aquí
        return { rdo: 0, mensaje: "Ok", profesor: data }; // correcto
      }
      case 404: {
        // No se encontró el profesor
        return {
          rdo: 1,
          mensaje: "No se encontró el profesor con ese correo electrónico.",
        };
      }
      default: {
        // otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const crearCurso = async function (formData) {
  // url webservices
  let url = urlWebServices.crearCurso; // Reemplaza con la ruta de tu endpoint

  let token = localStorage.getItem("x");
  let profesorId = localStorage.getItem("profesorId");

  formData.set("teacher", profesorId);

  try {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "x-access-token": token,
        Accept: "*/*",
        Origin: "http://localhost:3000",
      },
      body: formData,
    });

    let rdo = response.status;
    console.log("response", response);
    let data = await response.json();
    console.log("jsonresponse", data);
    switch (rdo) {
      case 201: {
        // Procesa los datos aquí
        return { rdo: 0, mensaje: "Ok", curso: data }; // correcto
      }
      case 404: {
        // No se encontró el curso
        return { rdo: 1, mensaje: "No se encontró el curso con ese ID." };
      }
      default: {
        // otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const misCursos = async function () {
  // url webservices
  let url = urlWebServices.misCursos; // Reemplaza con la ruta de tu endpoint

  let token = localStorage.getItem("x");
  let profesorId = localStorage.getItem("profesorId");

  try {
    console.log("profesorId", profesorId);
    let response = await fetch(url + profesorId, {
      method: "GET",
      mode: "cors",
      headers: {
        "x-access-token": token,
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
    });

    let rdo = response.status;
    console.log("response", response);
    let data = await response.json();
    console.log("jsonresponse", data);
    switch (rdo) {
      case 200: {
        // Procesa los datos aquí
        return { rdo: 0, mensaje: "Ok", cursos: data }; // correcto
      }
      case 404: {
        // No se encontraron cursos
        return { rdo: 1, mensaje: "No se encontraron cursos." };
      }
      default: {
        // otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const eliminarCurso = async function (idCurso) {
  // URL del web service
  let url = urlWebServices.misCursos;
  let token = localStorage.getItem("x");

  // Armo json con datos
  const formData = new URLSearchParams();
  formData.append("id", idCurso);

  try {
    let response = await fetch(url + idCurso, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "x-access-token": token,
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    let rdo = response.status;

    switch (rdo) {
      case 204: {
        // Asumiendo que el servidor devuelve 200 cuando la eliminación es exitosa
        return { rdo: 0, mensaje: "Curso eliminado correctamente" };
      }
      case 404: {
        // Asumiendo que el servidor devuelve 404 cuando el curso no se encuentra
        return { rdo: 1, mensaje: "El curso no existe" };
      }
      default: {
        return { rdo: 1, mensaje: "Error al eliminar el curso" };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al eliminar el curso" };
  }
};

export const actualizarCurso = async function (id, cursoData) {
  let url = urlWebServices.misCursos;
  let token = localStorage.getItem("x");

  try {
    let response = await fetch(url + id, {
      method: "PATCH",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "x-access-token": token,
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cursoData),
    });

    let rdo = response.status;

    switch (rdo) {
      case 200: {
        // Asumiendo que el servidor devuelve 200 cuando la actualización es exitosa
        console.log("cursoData:", cursoData);
        return { rdo: 0, mensaje: "Curso actualizado correctamente" };
      }
      case 404: {
        // Asumiendo que el servidor devuelve 404 cuando el curso no se encuentra
        return { rdo: 1, mensaje: "El curso no existe" };
      }
      default: {
        return { rdo: 1, mensaje: "Error al actualizar el curso" };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al actualizar el curso" };
  }
};

export const obtenerTodosLosCursosPublicados = async function (page = 1, limit = 10) {
  let url = urlWebServices.misCursos;

  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    let rdo = response.status;

    switch (rdo) {
      case 200: {
        // Asumiendo que el servidor devuelve 200 cuando la solicitud es exitosa
        let responseData = await response.json();

        // Inicializar un array para almacenar los cursos con published en true
        let cursosPublicados = [];

        for (const curso of responseData.data.docs) {
          if (curso.published === true) {
            cursosPublicados.push(curso);
          }
        }

        return {
          rdo: 0,
          data: cursosPublicados,
          mensaje: "Cursos recibidos exitosamente",
        };
      }
      default: {
        return { rdo: 1, mensaje: "Error al obtener los cursos" };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al obtener los cursos" };
  }
};

export const obtenerProfesorPorId = async function (profesorId) {
  // url del servicio web
  let url = urlWebServices.obtenerProfesorPorId; // Reemplaza con la ruta de tu endpoint

  console.log("url:", url + profesorId);

  try {
    let response = await fetch(url + profesorId, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
    });

    console.log("response", response);
    let data = await response.json();
    console.log("jsonresponse", data);

    switch (response.status) {
      case 200: {
        // Procesa los datos aquí
        return { rdo: 0, mensaje: "Ok", profesor: data }; // correcto
      }
      case 404: {
        // No se encontró el profesor
        return { rdo: 1, mensaje: "No se encontró el profesor con ese ID." };
      }
      default: {
        // otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const enviarComentario = async function (data) {
  // url del servicio web
  let url = urlWebServices.enviarComentario; // Reemplaza con la ruta de tu endpoint

  try {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.nombre,
        comentario: data.comentario,
        idCurso: data.idCurso,
        nombreCurso: data.nombreCurso,
        idProfesor: data.idProfesor,
        calificacion: data.calificacion,
      }),
    });

    console.log("response", response);
    let responseData = await response.json();
    console.log("jsonresponse", responseData);

    switch (response.status) {
      case 200: {
        // Procesa los datos aquí
        return { rdo: 0, mensaje: "Comentario enviado correctamente" }; // correcto
      }
      case 404: {
        // No se encontró el curso
        return { rdo: 1, mensaje: "No se encontró el curso con ese ID." };
      }
      default: {
        // otro error
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getComentariosByCursoId = async function (cursoId) {
  // url del servicio web
  let url = urlWebServices.getComentariosByCursoId; // Reemplaza con la ruta de tu endpoint

  console.log("url:", url + cursoId);

  try {
    let response = await fetch(url + cursoId, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();

    switch (response.status) {
      case 200: {
        // Procesa los datos aquí
        return responseData; // Retorna los comentarios obtenidos correctamente
      }
      case 404: {
        // No se encontró el curso
        throw new Error("No se encontró el curso con ese ID.");
      }
      default: {
        // otro error
        throw new Error("Ha ocurrido un error");
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getComentariosByProfesorId = async function () {
  let profesorId = localStorage.getItem("profesorId");
  // URL del servicio web
  let url = urlWebServices.getComentariosByProfesorId;

  try {
    let response = await fetch(url + profesorId, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();

    switch (response.status) {
      case 200: {
        return responseData;
      }
      case 404: {
        throw new Error("No se encontró el profesor con ese ID.");
      }
      default: {
        // Otro error
        throw new Error("Ha ocurrido un error");
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const updateEstadoPublicacion = async function (comentarioId) {
  // URL del servicio web
  let url = urlWebServices.updateEstadoPublicacion;
  let token = localStorage.getItem("x");

  try {
    let response = await fetch(url + comentarioId, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    let responseData = await response.json();

    switch (response.status) {
      case 200: {
        return responseData;
      }
      case 404: {
        throw new Error("No se encontró el comentario con ese ID.");
      }
      default: {
        // Otro error
        throw new Error("Ha ocurrido un error");
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const eliminarComentario = async function (comentarioId) {
  let url = urlWebServices.eliminarComentario;
  let token = localStorage.getItem("x");

  try {
    let response = await fetch(url + comentarioId, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    let responseData = await response.json();

    switch (response.status) {
      case 200: {
        return responseData;
      }
      case 404: {
        throw new Error("No se encontró el comentario con ese ID.");
      }
      default: {
        // Otro error
        throw new Error("Ha ocurrido un error");
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
