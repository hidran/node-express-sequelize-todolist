document.addEventListener('DOMContentLoaded', () => {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(ele => {
        //ele.style.opacity = '80';
        setTimeout(() => {
            ele.parentNode.removeChild(ele);
        }, 5000);
    });

});

async function showConfirmMsg(title = '', msg = '', forname) {
    const resp = await Swal.fire({
        title: title || 'Are you sure?',
        text: msg || 'You won\'t be able to revert this!',
        icon: 'warning',
        // input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'DELETE',
        //showLoaderOnConfirm: true,
    });

    if (resp.value) {
        if (document.forms[forname]) {
            document.forms[forname].submit();
        }
    }
}

