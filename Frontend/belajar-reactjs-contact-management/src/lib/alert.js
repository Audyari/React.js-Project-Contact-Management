import Swal from 'sweetalert2'

export const alertsukses = async (options) => {
    return await Swal.fire({
        icon: 'success',
        title: options.title || 'Success',
        text: options.message,
        showConfirmButton: true,
        timer: 3000
    })
}

export const alerterror = async (options) => {
    return await Swal.fire({
        icon: 'error',
        title: options.title || 'Error',
        text: options.message,
        showConfirmButton: true
    })
}

