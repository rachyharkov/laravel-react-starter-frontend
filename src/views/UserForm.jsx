import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client"

export default function UserForm() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if(id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`).then(({data}) => {
        setUser(data)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })
    },[])
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if(user.id) {
      axiosClient.put(`/users/${user.id}`, user).then(({data}) => {
        navigate('/users')
      }).catch(err => {
        const response = err.response
        if(response && response.status == 422) {
          // console.log(response.data.errors)
          setErrors(response.data.errors)
        }
      })
    } else {
      axiosClient.post('/users', user).then(({data}) => {
        navigate('/users')
      }).catch(err => {
        const response = err.response
        if(response && response.status == 422) {
          // console.log(response.data.errors)
          setErrors(response.data.errors)
        }
      })
    }
  }

  // console.log(user)

  return (
    <>
      {user.id && <h1>Edit User: { user.name }</h1>}
      {!user.id && <h1>Add User</h1>}

      <div className="card animated fadeInDown">
        {loading && <div className="text-center"><i className="fa fa-spinner fa-spin"></i></div>}

        {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>}

          {!loading &&
            <form onSubmit={onSubmit}>
              <input placeholder="Name" value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} type="text" name="name" />
              <input placeholder="Email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} type="email" name="email" />
              <input placeholder="Password" onChange={ev => setUser({...user, password: ev.target.value})} type="password" name="password" />
              <input placeholder="Password Confirm" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} type="password" name="password_confirmation" />
              <button className="btn">Submit</button>
            </form>
          }
      </div>
    </>
  )
}