// sweetalert
import Swal from "sweetalert2";

// sweetalert
const Alert = (props) => {
    Swal.fire({
        title: props.title,
        text: props.text,
        icon: props.icon,
        button: props.button
    });
    return null;
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const ToastSuccess = (title) => {
  Toast.fire({
    icon: 'success',
    title: title,
  })
}

export const ToastError = (title) => {
  Toast.fire({
    icon: 'error',
    title: title,
  })
}

export const ToastWarning = (title) => {
  Toast.fire({
    icon: 'warning',
    title: title,
  })
}

export const ToastInfo = (title) => {
  Toast.fire({
    icon: 'info',
    title: title,
  })
}

export default Alert;