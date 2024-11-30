document.addEventListener('DOMContentLoaded', () => {
    const pendudukForm = document.getElementById('pendudukForm');
    const pendudukTable = document.getElementById('pendudukTable').getElementsByTagName('tbody')[0];
    const notification = document.getElementById('notification');
    const deleteNotification = document.getElementById('deleteNotification');

    pendudukForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nik = document.getElementById('nik').value;
        const name = document.getElementById('name').value;
        const status = document.getElementById('status').value;
        const province = document.getElementById('province').value;
        const city = document.getElementById('city').value;
        const postalCode = document.getElementById('postalCode').value;
        const occupation = document.getElementById('occupation').value;
        
        const penduduk = {
            nik: nik,
            name: name,
            status: status,
            province: province,
            city: city,
            postalCode: postalCode,
            occupation: occupation
        };
        
        addPendudukToTable(penduduk);
        pendudukForm.reset();
        showNotification(notification);
    });

    function addPendudukToTable(penduduk) {
        const row = pendudukTable.insertRow();
        row.insertCell(0).textContent = penduduk.nik;
        row.insertCell(1).textContent = penduduk.name;
        row.insertCell(2).textContent = penduduk.status;
        row.insertCell(3).textContent = penduduk.province;
        row.insertCell(4).textContent = penduduk.city;
        row.insertCell(5).textContent = penduduk.postalCode;
        row.insertCell(6).textContent = penduduk.occupation;

        const deleteCell = row.insertCell(7);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => {
            pendudukTable.deleteRow(row.rowIndex - 1);
            showNotification(deleteNotification);
        };
        deleteCell.appendChild(deleteButton);

        // Simpan data ke dalam JSON (hanya contoh, tidak disimpan secara permanen)
        console.log(JSON.stringify(penduduk));
    }

    function showNotification(notificationElement) {
        notificationElement.style.display = 'block';
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 3000);
    }
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const targetPage = document.getElementById(pageId);
    targetPage.style.display = 'block';
}
