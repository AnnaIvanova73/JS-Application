function solve() {
    let infoSpan = document.querySelector('.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    function depart() {
        let idStop = infoSpan.getAttribute('data-next-stop') ? infoSpan.getAttribute('data-next-stop') : `depot`;

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${idStop}`)
            .then(res => res.json())
            .then(data => {
                let {name, next} = data;
                infoSpan.textContent = `Next stop ${name}`;
                infoSpan.setAttribute('data-next-stop', next)
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${infoSpan.textContent}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();