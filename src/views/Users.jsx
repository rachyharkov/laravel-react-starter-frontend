import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import axiosClient from "../axios-client"
import Alert from "../components/Alert"

export default function Users() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getUsers()
  },[])

  const onDelete = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/users/${user.id}`)
          .then(({data}) => {
            Alert('Success!', 'Your file has been deleted.', 'success')
            getUsers()
          })
          .catch(err => {
            Alert('Error!', 'Your file has not been deleted.', 'error')
          })
      }
    })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false)
        console.log(data)
        setUsers(data.data)
      })
      .catch(err => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">Tambah</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className="text-center" style={{padding: '2rem'}}>
                <i className="fa fa-spinner fa-spin" style={{fontSize: 24}}></i>
              </td>
            </tr>
            </tbody>
          }
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link to={`/users/${u.id}`} className="btn-edit">Edit</Link>
                  &nbsp;
                  <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}