import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="GuestLayout">
      <div className="GuestLayout__content">
        For Guest Users Only
        <Outlet/>
      </div>
    </div>
  )
}