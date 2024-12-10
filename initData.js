document.addEventListener('DOMContentLoaded', () => {
    const initialData = {
        "penduduk": [
            {
                "nik": "1234567890123456",
                "name": "ABDUL MOFUMOFU",
                "birthPlace": "SLEMAN",
                "birthDate": "1980-01-01",
                "gender": "LAKI-LAKI",
                "religion": "ISLAM",
                "address": "RT 01/RW 01, TRIHANGGO, GAMPING, KABUPPATEN SLEMAN, DAERAH ISTIMEWA YOGYAKARTA",
                "occupation": "MEMANCING",
                "nationality": "WNI",
                "status": "HIDUP"
            },
            {
                "nik": "6543210987654321",
                "name": "SUJATMIKO ARAFURU",
                "birthPlace": "MALANG",
                "birthDate": "1990-02-02",
                "gender": "LAKI-LAKI",
                "religion": "KRISTEN",
                "address": "RT 02/RW 02, TUNGGULWULUNG, LOWOKWARU, MALANG, JAWA TIMUR",
                "occupation": "PETANI",
                "nationality": "WNI",
                "status": "HIDUP"
            }
        ]
    };

    if (!localStorage.getItem('pendudukData')) {
        localStorage.setItem('pendudukData', JSON.stringify(initialData.penduduk));
    }
});
