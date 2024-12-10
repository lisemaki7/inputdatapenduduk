document.addEventListener('DOMContentLoaded', () => {
    const pendudukForm = document.getElementById('pendudukForm');
    const pendudukTable = document.getElementById('pendudukTable').getElementsByTagName('tbody')[0];
    const notification = document.getElementById('notification');
    let editingNIK = null;

    // Function to handle page navigation
    function showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.display = 'none'; // Hide all pages
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block'; // Show the target page
        }
    }

    // Attach event listeners to navigation buttons
    document.querySelectorAll('.navigation .tombol').forEach(button => {
        button.addEventListener('click', (event) => {
            const targetPage = event.target.getAttribute('data-target');
            showPage(targetPage);
        });
    });

    // Load existing data on page load
    loadPendudukData();

    pendudukForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const penduduk = {
            nik: document.getElementById('nik').value,
            name: document.getElementById('name').value.toUpperCase(),
            birthPlace: document.getElementById('birthPlace').value.toUpperCase(),
            birthDate: document.getElementById('birthDate').value,
            gender: document.querySelector('input[name="gender"]:checked').value.toUpperCase(),
            religion: document.getElementById('religion').value.toUpperCase(),
            address: `RT ${document.getElementById('rt').value}/RW ${document.getElementById('rw').value}, ${document.getElementById('subdistrict').value.toUpperCase()}, ${document.getElementById('district').value.toUpperCase()}, ${document.getElementById('city').value.toUpperCase()}, ${document.getElementById('province').value.toUpperCase()}`,
            occupation: document.getElementById('occupation').value.toUpperCase(),
            nationality: document.querySelector('input[name="nationality"]:checked').value.toUpperCase(),
            status: document.getElementById('status').value.toUpperCase()
        };

        if (editingNIK) {
            updatePendudukData(editingNIK, penduduk);
            editingNIK = null;
        } else {
            addPendudukToTable(penduduk);
            savePendudukData(penduduk);
        }

        pendudukForm.reset();
        showNotification(notification);
    });

    function addPendudukToTable(penduduk) {
        const row = pendudukTable.insertRow();
        row.insertCell(0).textContent = penduduk.nik;
        row.insertCell(1).textContent = penduduk.name;
        row.insertCell(2).textContent = penduduk.birthPlace;
        row.insertCell(3).textContent = penduduk.birthDate;
        row.insertCell(4).textContent = penduduk.gender;
        row.insertCell(5).textContent = penduduk.religion;
        row.insertCell(6).textContent = penduduk.address;
        row.insertCell(7).textContent = penduduk.occupation;
        row.insertCell(8).textContent = penduduk.nationality;
        row.insertCell(9).textContent = penduduk.status;

        const editCell = row.insertCell(10);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.type = 'button';
        editButton.addEventListener('click', () => {
            console.log(`Edit button clicked for NIK: ${penduduk.nik}`); // Debugging
            editPendudukData(penduduk.nik);
        });
        editCell.appendChild(editButton);
    }

    function savePendudukData(penduduk) {
        let pendudukData = JSON.parse(localStorage.getItem('pendudukData')) || [];
        pendudukData.push(penduduk);
        localStorage.setItem('pendudukData', JSON.stringify(pendudukData));
    }

    function loadPendudukData() {
        let pendudukData = JSON.parse(localStorage.getItem('pendudukData')) || [];
        pendudukData.forEach(penduduk => addPendudukToTable(penduduk));
    }

    function editPendudukData(nik) {
        console.log("Attempting to edit NIK:", nik);
    
        let pendudukData = JSON.parse(localStorage.getItem('pendudukData')) || [];
        const penduduk = pendudukData.find(p => p.nik === nik);
        if (!penduduk) {
            console.error(`No data found for NIK: ${nik}`);
            return;
        }
    
        console.log("Found data for editing:", penduduk);
    
        document.getElementById('nik').value = penduduk.nik;
        document.getElementById('name').value = penduduk.name;
        document.getElementById('birthPlace').value = penduduk.birthPlace;
        document.getElementById('birthDate').value = penduduk.birthDate;
    
        // Gender radio button
        const genderInput = document.querySelector(`input[name="gender"][value="${penduduk.gender.toLowerCase()}"]`);
        if (genderInput) {
            genderInput.checked = true;
        } else {
            console.error(`Gender value "${penduduk.gender}" does not match any radio button.`);
        }
    
        document.getElementById('religion').value = penduduk.religion;
    
        // Address
        const [rt, rw] = penduduk.address.match(/RT (\d+)\/RW (\d+)/).slice(1, 3);
        document.getElementById('rt').value = rt;
        document.getElementById('rw').value = rw;
    
        const addressParts = penduduk.address.split(', ');
        document.getElementById('subdistrict').value = addressParts[1];
        document.getElementById('district').value = addressParts[2];
        document.getElementById('city').value = addressParts[3];
        document.getElementById('province').value = addressParts[4];
    
        document.getElementById('occupation').value = penduduk.occupation;
    
        // Nationality radio button
        const nationalityInput = document.querySelector(`input[name="nationality"][value="${penduduk.nationality.toLowerCase()}"]`);
        if (nationalityInput) {
            nationalityInput.checked = true;
        } else {
            console.error(`Nationality value "${penduduk.nationality}" does not match any radio button.`);
        }
    
        document.getElementById('status').value = penduduk.status;
    
        editingNIK = nik; // Set the editing NIK
        showPage('inputPage'); // Navigate back to input page for editing
    }
    

    function updatePendudukData(oldNIK, newPenduduk) {
        let pendudukData = JSON.parse(localStorage.getItem('pendudukData')) || [];
        const index = pendudukData.findIndex(p => p.nik === oldNIK);
        if (index >= 0) {
            pendudukData[index] = newPenduduk;
            localStorage.setItem('pendudukData', JSON.stringify(pendudukData));
            refreshPendudukTable();
        }
    }

    function refreshPendudukTable() {
        while (pendudukTable.rows.length > 0) {
            pendudukTable.deleteRow(0);
        }
        loadPendudukData();
    }

    function showNotification(notificationElement) {
        notificationElement.style.display = 'block';
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 3000);
    }
});
