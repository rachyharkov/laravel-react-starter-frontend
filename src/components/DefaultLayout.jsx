import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
  const {usernya, tokennya, setUsernya} = useStateContext()

  if(!tokennya) {
    return (
      <Navigate to="/login"/>
    )
  }

  const onLogout = (ev) => {
    ev.preventDefault()
  }
  useEffect(() => {
    axiosClient.get('/user').then(({data}) => {
      console.log(data)
      setUsernya(data)
    }).catch(err => {
      console.log(err)
    })
  },[])

  // debugger

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {usernya.name}
            <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}