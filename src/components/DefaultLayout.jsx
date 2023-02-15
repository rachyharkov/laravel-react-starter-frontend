import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
  const {usernya, tokennya} = useStateContext()

  if(!tokennya) {
    return (
      <Navigate to="/login"/>
    )
  }

  return (
    <div className="DefaultLayout">
      <Outlet/>
    </div>
  )
}