import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout() {

  const {tokennya} = useStateContext()

  if(tokennya) {
    return <Navigate to="/"/>
  }

  return (
    <div className="GuestLayout">
      <div className="GuestLayout__content">
        For Guest Users Only
        <Outlet/>
      </div>
    </div>
  )
}