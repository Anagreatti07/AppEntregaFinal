import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({ children }) {
    const [logado, setLogado] = useState(false);
    const [error, setError] = useState(false);

    async function Login(usuarioEmail, usuarioSenha) {
   

        if (usuarioEmail != "" && usuarioSenha != "") {
            await fetch('http://10.139.75.22:5251/api/Usuarios/GetAllUsuarios',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    usuarioEmail: usuarioEmail,
                    usuarioSenha: usuarioSenha,
                })
                
            })
                .then(res => (res.ok == true) ? res.json() : false)
                .then(json => {
                    setLogado((json.token) ? true : false);
                    setError((json.token) ? false : true);
                }
                )
                .catch(err => setError(true))
        } else {
            setError(true)
        }
        
    }

    return (
        <AuthContext.Provider value={{ logado: logado, Login, error: error, Error }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;