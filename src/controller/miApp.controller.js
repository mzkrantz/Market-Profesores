import urlWebServices from "../controller/webServices.js";

export const login = async function (login) {
  let url = urlWebServices.login;
  const formData = new URLSearchParams();
  formData.append("email", login.email);
  formData.append("password", login.password);
  try {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        Origin: "http://localhost:3000",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    let rdo = response.status;
    let data = await response.json();
    switch (rdo) {
      case 201: {
        localStorage.setItem("x", data.loginUser.token);
        let user = data.loginUser.user;
        localStorage.setItem("nombre", user.nombre);
        localStorage.setItem("email", user.email);
        localStorage.setItem("profesorId", profesorPorMail().idProfesor);

        return { rdo: 0, mensaje: "Ok" };
      }
      case 202: {
        return {
          rdo: 1,
          mensaje: "El mail ingresado no existe en nuestra base.",
        };
      }
      case 203: {
        return { rdo: 1, mensaje: "La contraseña no es correcta." };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.error("error", error);
  }
};

export const registration = async function (user) {
  let url = urlWebServices.registration;

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
    let data = await response.json();

    switch (rdo) {
      case 201: {
        if (data && data.token) {
          localStorage.setItem("x", data.token);

          let user = data.user;
          if (user) {
            localStorage.setItem("nombre", user.name);
            localStorage.setItem("email", user.email);
          }
        }
        return { rdo: 0, mensaje: "Ok" };
      }
      case 400: {
        return {
          rdo: 1,
          mensaje: "El mail ingresado ya existe en nuestra base.",
        };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }

  return { rdo: 1, mensaje: "Ha ocurrido un error inesperado" };
};

export const profesorPorMail = async function () {
  let url = urlWebServices.profesorPorCorreo;

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
        return { rdo: 0, mensaje: "Ok", profesor: data };
      }
      case 404: {
        return {
          rdo: 1,
          mensaje: "No se encontró el profesor con ese correo electrónico.",
        };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const actualizar = async function (formData) {
  let url = urlWebServices.actualizar;

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
    let data = await response.json();
    switch (rdo) {
      case 200: {
        return { rdo: 0, mensaje: "Ok", profesor: data };
      }
      case 404: {
        return {
          rdo: 1,
          mensaje: "No se encontró el profesor con ese correo electrónico.",
        };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const crearCurso = async function (formData) {
  let url = urlWebServices.crearCurso;

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
    let data = await response.json();
    switch (rdo) {
      case 201: {
        return { rdo: 0, mensaje: "Ok", curso: data };
      }
      case 404: {
        return { rdo: 1, mensaje: "No se encontró el curso con ese ID." };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const misCursos = async function () {
  let url = urlWebServices.misCursos;

  let token = localStorage.getItem("x");
  let profesorId = localStorage.getItem("profesorId");

  try {
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
    let data = await response.json();
    switch (rdo) {
      case 200: {
        return { rdo: 0, mensaje: "Ok", cursos: data };
      }
      case 404: {
        return { rdo: 1, mensaje: "No se encontraron cursos." };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const eliminarCurso = async function (idCurso) {
  let url = urlWebServices.misCursos;
  let token = localStorage.getItem("x");

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
        return { rdo: 0, mensaje: "Curso eliminado correctamente" };
      }
      case 404: {
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
        return { rdo: 0, mensaje: "Curso actualizado correctamente" };
      }
      case 404: {
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

export const obtenerTodosLosCursosPublicados = async function (
  page = 1,
  limit = 10
) {
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
        let responseData = await response.json();

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

export const obtenerTodosLosProfesores = async function (page = 1, limit = 10) {
  let url = urlWebServices.obtenerTodosProfesores;

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
        let responseData = await response.json();

        let profesores = [];

        for (const profesor of responseData.data.docs) {
          profesores.push(profesor);
        }

        return {
          rdo: 0,
          data: profesores,
          mensaje: "Profesores recibidos exitosamente",
        };
      }
      default: {
        return { rdo: 1, mensaje: "Error al obtener los Profesores" };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al obtener los Profesores" };
  }
};

export const obtenerProfesorPorId = async function (profesorId) {
  let url = urlWebServices.obtenerProfesorPorId;

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
    let data = await response.json();

    switch (response.status) {
      case 200: {
        return { rdo: 0, mensaje: "Ok", profesor: data };
      }
      case 404: {
        return { rdo: 1, mensaje: "No se encontró el profesor con ese ID." };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const enviarComentario = async function (data) {
  let url = urlWebServices.enviarComentario;

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

    await response.json();

    switch (response.status) {
      case 200: {
        return { rdo: 0, mensaje: "Comentario enviado correctamente" };
      }
      case 404: {
        return { rdo: 1, mensaje: "No se encontró el curso con ese ID." };
      }
      default: {
        return { rdo: 1, mensaje: "Ha ocurrido un error" };
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getComentariosByCursoId = async function (cursoId) {
  let url = urlWebServices.getComentariosByCursoId;

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
        return responseData;
      }
      case 404: {
        throw new Error("No se encontró el curso con ese ID.");
      }
      default: {
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
        throw new Error("Ha ocurrido un error");
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const updateEstadoPublicacion = async function (comentarioId) {
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
        throw new Error("Ha ocurrido un error");
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const actualizarImagenCurso = async function (id, imagen) {
  let url = urlWebServices.actualizarImagenCurso;
  let token = localStorage.getItem("x");

  let formData = new FormData();
  formData.append("image", imagen);

  try {
    let response = await fetch(url + id + "/image", {
      method: "PATCH",
      mode: "cors",
      headers: {
        Accept: "*/*",
        Origin: "http://localhost:3000",
        "x-access-token": token,
      },
      body: formData,
    });

    let responseData = await response.json();

    switch (response.status) {
      case 200: {
        return responseData;
      }
      case 404: {
        throw new Error("No se encontró el curso con ese ID.");
      }
      default: {
        throw new Error("Ha ocurrido un error");
      }
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const enviarSolicitud = async function (formData) {
  let url = urlWebServices.enviarSolicitud;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    switch (response.status) {
      case 201: {
        const profesorResult = await obtenerProfesorPorId(formData.profesor);

        if (profesorResult.rdo === 0) {
          const profesor = profesorResult.profesor;

          const sendEmailResult = await sendEmailSolicitud(
            profesor.data.email,
            formData
          );

          if (sendEmailResult.rdo === 0) {
            return {
              rdo: 0,
              mensaje: "Solicitud enviada exitosamente y correo enviado",
            };
          } else {
            return {
              rdo: 1,
              mensaje:
                "Solicitud enviada, pero hubo un error al enviar el correo",
            };
          }
        } else {
          return {
            rdo: 1,
            mensaje: "Error al obtener información del profesor",
          };
        }
      }
      default: {
        return { rdo: 1, mensaje: "Error al enviar la solicitud" };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al enviar la solicitud" };
  }
};

export const obtenerSolicitudesPorProfesorId = async function () {
  let url = urlWebServices.obtenerSolicitudes;
  let token = localStorage.getItem("x");

  const profesorId = localStorage.getItem("profesorId");

  try {
    let response = await fetch(url + profesorId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    switch (response.status) {
      case 200: {
        let data = await response.json();
        return { rdo: 0, solicitudes: data };
      }
      default: {
        return { rdo: 1, mensaje: "Error al obtener las solicitudes" };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al obtener las solicitudes" };
  }
};

export const actualizarEstadoSolicitud = async function (
  solicitudId,
  nuevoEstado
) {
  let url = urlWebServices.actualizarEstadoSolicitud;
  let token = localStorage.getItem("x");

  try {
    let response = await fetch(url + solicitudId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        estado: nuevoEstado,
      }),
    });

    switch (response.status) {
      case 200: {
        return {
          rdo: 0,
          mensaje: "Estado de solicitud actualizado correctamente",
        };
      }
      default: {
        return {
          rdo: 1,
          mensaje: "Error al actualizar el estado de la solicitud",
        };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al actualizar el estado de la solicitud" };
  }
};

export const obtenerImagenUsuario = async function () {
  let email = localStorage.getItem("email");
  let url = `${urlWebServices.obtenerImagenUsuario}/${email}`;
  let token = localStorage.getItem("x");

  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    switch (response.status) {
      case 200: {
        let data = await response.json();
        return { rdo: 0, imagen: data.image };
      }
      default: {
        return { rdo: 1, mensaje: "Error al obtener la imagen del usuario" };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return { rdo: 1, mensaje: "Error al obtener la imagen del usuario" };
  }
};

export const sendEmailSolicitud = async (to, formData) => {
  let url = urlWebServices.mail;

  let emailData = {
    to: to,
    subject: "Nueva solicitud para el curso " + formData.cursoNombre,
    text: `
    Hemos recibido una nueva solicitud para el curso "${formData.cursoNombre}".<br>
    Nombre del solicitante: ${formData.nombre}.<br>
    Horario de contacto: ${formData.horario}.<br>
    Mensaje: ${formData.mensaje}.<br>
    <br><br>
    Para comunicarse con el solicitante, puede enviar un correo electrónico a:
    <a href="mailto:${formData.mail}">${formData.mail}</a>,
    o llamar al siguiente número: ${formData.telefono}.
  `,
  };
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      await response.json();
      return { rdo: 0 };
    } else {
      console.error("Error al enviar el correo. Estado:", response.status);
      return { rdo: 1 };
    }
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return { rdo: 1 };
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const response = await fetch(
      urlWebServices.mail + "/send-password-reset-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (!response.ok) {
      console.error("Error in request:", response);
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};

export const resetPassword = async (email, resetToken, newPassword) => {
  const url = urlWebServices.mail + "/reset-password/";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        resetToken: resetToken,
        newPassword: newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al reiniciar la contraseña");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al reiniciar la contraseña:", error);
    throw error;
  }
};
