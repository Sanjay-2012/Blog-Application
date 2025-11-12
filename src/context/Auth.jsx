import  { createContext, useEffect, useReducer } from 'react'

const initialState = {
  user: localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) :null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null
}

const authReducer = (state, action) => {
  switch(action.type){
    case "LOGIN_SUCCESS" : 
      return {
        user:action.payload,
        token:action.token,
        role:action.role
      }
    case "LOGOUT_SUCCESS" :
      return {
        user:null,
        token:null,
        role:null
      }
  }

}

export const AuthContext = createContext(initialState)

const Auth = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
    localStorage.setItem("token", state.token)
    localStorage.setItem("role", state.role)
  }, [state])
  return (
    <AuthContext.Provider value={{
      user:state.user,
      token:state.token,
      dispatch
    }}>
      {children} {/* <App /> */}
    </AuthContext.Provider>
  )
}

export default Auth