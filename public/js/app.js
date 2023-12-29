fetch("https://restcountries.com/v3.1/all")
    .then(respon => respon.json())
    .then(data => {
        const dropdownNegara = document.getElementById("negara");
        data.forEach(negara => {
            const opsi = document.createElement("option");
            opsi.value = negara.name.common;
            opsi.textContent = negara.name.common;
            dropdownNegara.appendChild(opsi);
        });
    })
    .catch(error => {
        console.error("Terjadi kesalahan:", error);
    });

document.getElementById("form-negara").addEventListener("submit", function (e) {
    e.preventDefault();
    const namaNegara = document.getElementById("negara").value;
    dapatkanInfoNegara(namaNegara);
});

function dapatkanInfoNegara(namaNegara) {
    const apiUrl = `https://restcountries.com/v3.1/name/${namaNegara}`;
    fetch(apiUrl)
        .then(respon => respon.json())
        .then(data => {
            const negara = data[0];
            document.getElementById("nama-negara").textContent = negara.name.common;
            document.getElementById("ibukota").textContent = negara.capital ? negara.capital[0] : "Tidak diketahui";
            document.getElementById("populasi").textContent = negara.population ? negara.population.toLocaleString() : "Tidak diketahui";
            document.getElementById("luas").textContent = negara.area ? negara.area.toLocaleString() : "Tidak diketahui";
            document.getElementById("bendera").src = negara.flags ? negara.flags.png : "";
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
        });
}
