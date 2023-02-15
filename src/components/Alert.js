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

export const ToastSuccess = (title, text) => {
  Toast.fire({
    icon: 'success',
    title: title,
    text: text
  })
}

export const ToastError = (title, text) => {
  Toast.fire({
    icon: 'error',
    title: title,
    text: text
  })
}

export const ToastWarning = (title, text) => {
  Toast.fire({
    icon: 'warning',
    title: title,
    text: text
  })
}

export const ToastInfo = (title, text) => {
  Toast.fire({
    icon: 'info',
    title: title,
    text: text
  })
}

export default Alert;