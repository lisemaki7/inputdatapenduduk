document.addEventListener('DOMContentLoaded', () => {
    const pendudukForm = document.getElementById('pendudukForm');
    const pendudukTable = document.getElementById('pendudukTable').getElementsByTagName('tbody')[0];
    const notification = document.getElementById('notification');

    // Function to show pages
    window.showPage = (pageId) => {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => (page.style.display = 'none'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) targetPage.style.display = 'block';
    };

    pendudukForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nik = document.getElementById('nik').value;
        const name = document.getElementById('name').value.toUpperCase();
        const birthPlace = document.getElementById('birthPlace').value.toUpperCase();
        const birthDate = document.getElementById('birthDate').value;
        const gender = document.querySelector('input[name="gender"]:checked').value.toUpperCase();
        const religion = document.getElementById('religion').value.toUpperCase();
        const province = document.getElementById('province').value.toUpperCase();
        const city = document.getElementById('city').value.toUpperCase();
        const district = document.getElementById('district').value.toUpperCase();
        const subdistrict = document.getElementById('subdistrict').value.toUpperCase();
        const rt = document.getElementById('rt').value;
        const rw = document.getElementById('rw').value;
        const occupation = document.getElementById('occupation').value.toUpperCase();
        const nationality = document.querySelector('input[name="nationality"]:checked').value.toUpperCase();
        const status = document.getElementById('status').value.toUpperCase();

        const address = `RT ${rt}/RW ${rw}, ${subdistrict}, ${district}, ${city}, ${province}`;
        const penduduk = { nik, name, birthPlace, birthDate, gender, religion, address, occupation, nationality, status };

        addPendudukToTable(penduduk);
        savePendudukData(penduduk);

        pendudukForm.reset();
        showNotification(notification);
    });

    const addPendudukToTable = (penduduk) => {
        const row = pendudukTable.insertRow();
        row.insertCell(0).textContent = penduduk.nik;
        row.insertCell(1).textContent = penduduk.name;
        // Continue filling the table as in your script...
    };

    const savePendudukData = (penduduk) => {
        let data = JSON.parse(localStorage.getItem('pendudukData')) || [];
        data.push(penduduk);
        localStorage.setItem('pendudukData', JSON.stringify(data));
    };

    const showNotification = (notificationElement) => {
        notificationElement.style.display = 'block';
        setTimeout(() => (notificationElement.style.display = 'none'), 3000);
    };
});
