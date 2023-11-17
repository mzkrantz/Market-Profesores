import urlWebServices from '../controller/webServices.js';

export const login= async function(login)
{
    //url webservices
    let url = urlWebServices.login;
    //armo json con datos
    const formData = new URLSearchParams();
    formData.append('email', login.email);
    formData.append('password', login.password);
    console.log("dato",formData);
    console.log("url",url);
    try
    {
        let response = await fetch(url,{
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers:{
                'Accept':'application/x-www-form-urlencoded',
               // 'x-access-token': WebToken.webToken,
                'Origin':'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'},
            body: formData,
            
        });
        
        let rdo = response.status;
        console.log("response",response);
        let data = await response.json();
        console.log("jsonresponse",data);
            switch(rdo)
            {
                case 201:
                {
                    //guardo token
                    localStorage.setItem("x",data.loginUser.token);
                    //guardo usuario logueado
                    let user = data.loginUser.user;
                    localStorage.setItem("nombre",user.name);
                    localStorage.setItem("email",user.email);
                    localStorage.setItem("id", user.id)
                    
                    return ({rdo:0,mensaje:"Ok"});//correcto
                }
                case 202:
                {
                    //error mail
                    return ({rdo:1,mensaje:"El mail ingresado no existe en nuestra base."});
                }
                case 203:
                {
                    //error password
                    return ({rdo:1,mensaje:"La contraseña no es correcta."});
                }
                default:
                {
                    //otro error
                    return ({rdo:1,mensaje:"Ha ocurrido un error"});                
                }
            }
    }
    catch(error)
    {
        console.log("error",error);
    };
}

export const registration = async function(user) {
    // url webservices
    let url = urlWebServices.registration;
    // armo json con datos
    const formData = new URLSearchParams();
    formData.append('nombre', user.nombre);
    formData.append('apellido', user.apellido);
    formData.append('email', user.email);
    formData.append('telefono', user.phone);
    formData.append('password', user.password);
    console.log("dato", formData);
    console.log("url", url);
    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });

        let rdo = response.status;
        console.log("response", response);
        let data = await response.json();
        console.log("jsonresponse", data);
        switch (rdo) {
            case 201: {
                // guardo token
                localStorage.setItem("x", data.registerUser.token);
                // guardo usuario registrado
                let user = data.registerUser.user;
                localStorage.setItem("nombre", user.name);
                localStorage.setItem("email", user.email);
                ;

                return ({ rdo: 0, mensaje: "Ok" }); // correcto
            }
            case 202: {
                // error mail
                return ({ rdo: 1, mensaje: "El mail ingresado ya existe en nuestra base." });
            }
            default: {
                // otro error
                return ({ rdo: 1, mensaje: "Ha ocurrido un error" });
            }
        }
    } catch (error) {
        console.log("error", error);
    };
}



