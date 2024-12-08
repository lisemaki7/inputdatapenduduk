document.addEventListener('DOMContentLoaded', () => {
    const pendudukForm = document.getElementById('pendudukForm');
    const pendudukTable = document.getElementById('pendudukTable').getElementsByTagName('tbody')[0];
    const notification = document.getElementById('notification');
    let editingNIK = null;

    // Load data from localStorage on page load
    loadPendudukData();

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

        const penduduk = {
            nik: nik,
            name: name,
            birthPlace: birthPlace,
            birthDate: birthDate,
            gender: gender,
            religion: religion,
            address: address,
            occupation: occupation,
            nationality: nationality,
            status: status
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
        editButton.addEventListener('click', () => editPendudukData(penduduk.nik));
        editCell.appendChild(editButton);
    }

    function savePendudukData(penduduk) {
        let pendudukData = JSON.parse(localStorage.getItem('pendudukData')) || [];
        pendudukData.push(penduduk);
        localStorage.setItem('pendudukData', JSON.stringify(pendudukData));
    }

    function loadPendudukData() {
        let pendudukData = JSON.parse(localStorage.getItem('pendudukData')) || [];
        pendudukData.forEach(penduduk => {
            addPendudukToTable(penduduk);
        });
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

    function editPendudukData(nik) {
        let pendudukData = JSON.parse(localStorage.getItem('pendudukData')) || [];
        const penduduk = pendudukData.find(p => p.nik === nik);

        if (penduduk) {
            document.getElementById('editNik').value = penduduk.nik;
            document.getElementById('editName').value = penduduk.name;
            document.getElementById('editBirthPlace').value = penduduk.birthPlace;
            document.getElementById('editBirthDate').value = penduduk.birthDate;
            document.querySelector(`input[name="editGender"][value="${penduduk.gender}"]`).checked = true;
            document.getElementById('editReligion').value = penduduk.religion;

            const addressParts = penduduk.address.split(', ');
            document.getElementById('editProvince').value = addressParts[5];
            document.getElementById('editCity').value = addressParts[4];
            document.getElementById('editDistrict').value = addressParts[3];
            document.getElementById('editSubdistrict').value = addressParts[2];
            document.getElementById('editRT').value = addressParts[1].split(' ')[1];
            document.getElementById('editRW').value = addressParts[0].split(' ')[1];

            document.getElementById('editOccupation').value = penduduk.occupation;
            document.querySelector(`input[name="editNationality"][value="${penduduk.nationality}"]`).checked = true;
            document.getElementById('editStatus').value = penduduk.status;

            document.getElementById('editOverlay').style.display = 'flex';
        }
    }

    document.getElementById('editPendudukForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const nik = document.getElementById('editNik').value;
        const name = document.getElementById('editName').value.toUpperCase();
        const birthPlace = document.getElementById('editBirthPlace').value.toUpperCase();
        const birthDate = document.getElementById('editBirthDate').value;
        const gender = document.querySelector('input[name="editGender"]:checked').value.toUpperCase();
        const religion = document.getElementById('editReligion').value.toUpperCase();
        const province = document.getElementById('editProvince').value.toUpperCase();
        const city = document.getElementById('editCity').value.toUpperCase();
        const district = document.getElementById('editDistrict').value.toUpperCase();
        const subdistrict = document.getElementById('editSubdistrict').value.toUpperCase();
        const rt = document.getElementById('editRT').value;
        const rw = document.getElementById('editRW').value;
        const occupation = document.getElementById('editOccupation').value.toUpperCase();
        const nationality = document.querySelector('input[name="editNationality"]:checked').value.toUpperCase();
        const status = document.getElementById('editStatus').value.toUpperCase();

        const address = `RT ${rt}/RW ${rw}, ${subdistrict}, ${district}, ${city}, ${province}`;
        const updatedPenduduk = {
            nik: nik,
            name: name,
            birthPlace: birthPlace,
            birthDate: birthDate,
            gender: gender,
            religion: religion,
            address: address,
            occupation: occupation,
            nationality: nationality,
            status: status
        };

        updatePendudukData(nik, updatedPenduduk);

        document.getElementById('editOverlay').style.display = 'none';
    });

    function showNotification(notificationElement) {
        notificationElement.style.display = 'block';
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 3000);
    }
});
