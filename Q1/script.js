const sendbtn = document.querySelector('#send');
const resetbtn = document.querySelector('#reset');
const inputs = document.querySelectorAll('input');

// send button
sendbtn.onclick = () => {
    inputs.forEach(item => {
        if (item.value !== '') {
            console.log(item.value)
        }
    });
}

// reset button
resetbtn.onclick = () => {
    inputs.forEach(item => item.value = '');
}
