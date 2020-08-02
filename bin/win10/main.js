document.querySelectorAll('.toInvisible').forEach(x => {
    x.addEventListener('click', () => {
        document.getElementById('messageBox').classList.add('isInvisible');
    })
})