
// TOMBOL MULAI HEMAT ENERGI
const button = document.getElementById("actionButton");

button.addEventListener("click", function() {
    document.getElementById("statistik").scrollIntoView({
        behavior: "smooth"
    });
});


// DATA SIMULASI
const energyData = {
    months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni"
    ],

    usage: [420, 390, 350, 310, 280, 230],

    before: 420,
    after: 310,

    habits: {
        "Mematikan Lampu": 85,
        "Mematikan AC": 60,
        "Mencabut Charger": 70,
        "Mematikan Komputer": 75
    }
};


// MENGHITUNG TOTAL PENGGUNAAN LISTRIK
const totalUsage = energyData.usage.reduce(
    (total, value) => total + value, 0
);


// MENGHITUNG PERSENTASE PENGHEMATAN
const saving = (
    (energyData.before - energyData.after) /
    energyData.before
) * 100;


// MENGHITUNG RATA-RATA KEBIASAAN
const habitValues = Object.values(energyData.habits);

const averageHabit = habitValues.reduce(
    (total, value) => total + value, 0
) / habitValues.length;


// MENAMPILKAN DATA KE HTML
document.getElementById("totalUsage").textContent =
    totalUsage.toLocaleString("id-ID") + " kWh";

document.getElementById("savingValue").textContent =
    saving.toFixed(1) + "%";

document.getElementById("habitValue").textContent =
    Math.round(averageHabit) + "%";


// PENGATURAN GRAFIK
Chart.defaults.font.family = "Arial";
Chart.defaults.color = "#68756b";


// GRAFIK 1: PENGGUNAAN LISTRIK
new Chart(document.getElementById("usageChart"), {
    type: "bar",

    data: {
        labels: energyData.months,

        datasets: [{
            label: "Penggunaan Listrik",
            data: energyData.usage,
            backgroundColor: "#2e8b57",
            borderRadius: 7,
            barThickness: 30
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Penggunaan (kWh)"
                }
            }
        }
    }
});


// GRAFIK 2: PERBANDINGAN PENGGUNAAN
new Chart(document.getElementById("comparisonChart"), {
    type: "line",

    data: {
        labels: ["Sebelum Hemat Energi", "Sesudah Hemat Energi"],

        datasets: [{
            label: "Penggunaan Listrik",
            data: [energyData.before, energyData.after],
            borderColor: "#2e8b57",
            backgroundColor: "rgba(46, 139, 87, 0.15)",
            fill: true,
            tension: 0.3,
            pointRadius: 7,
            pointBackgroundColor: "#2e8b57"
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Penggunaan (kWh)"
                }
            }
        }
    }
});


// GRAFIK 3: KEBIASAAN HEMAT ENERGI
new Chart(document.getElementById("habitChart"), {
    type: "bar",

    data: {
        labels: Object.keys(energyData.habits),

        datasets: [{
            label: "Persentase",
            data: habitValues,

            backgroundColor: [
                "#2e8b57",
                "#69a77c",
                "#91bd9c",
                "#b5d4ba"
            ],

            borderRadius: 7
        }]
    },

    options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            x: {
                min: 0,
                max: 100,

                ticks: {
                    callback: function(value) {
                        return value + "%";
                    }
                }
            }
        }
    }
});


// HASIL ANALISIS OTOMATIS
function generateAnalysis() {

    const analysisText = document.getElementById("analysisText");

    const recommendationList =
        document.getElementById("recommendationList");

    const reduction =
        energyData.before - energyData.after;

    // MENAMPILKAN KESIMPULAN
    analysisText.textContent =
        `Penggunaan listrik mengalami penurunan dari
        ${energyData.before} kWh menjadi ${energyData.after} kWh.
        Penghematan mencapai ${reduction} kWh atau
        ${saving.toFixed(1)}%. Rata-rata kebiasaan hemat
        energi mencapai ${Math.round(averageHabit)}%.`;

    // MENYIAPKAN REKOMENDASI
    let recommendations = [];

    if (energyData.habits["Mematikan Lampu"] < 80) {
        recommendations.push(
            "💡 Biasakan mematikan lampu ketika ruangan tidak digunakan."
        );
    }

    if (energyData.habits["Mematikan AC"] < 80) {
        recommendations.push(
            "❄️ Gunakan AC seperlunya dan matikan saat ruangan kosong."
        );
    }

    if (energyData.habits["Mencabut Charger"] < 80) {
        recommendations.push(
            "🔌 Cabut charger setelah selesai digunakan."
        );
    }

    if (energyData.habits["Mematikan Komputer"] < 80) {
        recommendations.push(
            "💻 Matikan komputer setelah kegiatan belajar selesai."
        );
    }

    if (saving < 10) {
        recommendations.push(
            "📉 Tingkatkan program penghematan listrik secara rutin."
        );
    } else {
        recommendations.push(
            "🌱 Pertahankan kebiasaan hemat energi yang sudah diterapkan."
        );
    }

    // MENAMPILKAN REKOMENDASI
    recommendationList.innerHTML = "";

    recommendations.forEach(function(item) {

        const li = document.createElement("li");

        li.textContent = item;

        recommendationList.appendChild(li);

    });

}


// MENJALANKAN ANALISIS
generateAnalysis();
