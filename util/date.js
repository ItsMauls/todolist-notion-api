// Buat objek Date dengan tanggal tertentu

export const dateNow = () => {
    const namaBulan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Buat objek Date untuk mendapatkan tanggal dan waktu terkini
    const sekarang = new Date();

    // Dapatkan bulan, tanggal, dan tahun dari objek Date
    const bulan = namaBulan[sekarang.getMonth()];
    const tanggal = sekarang.getDate();
    const tahun = sekarang.getFullYear();

    // Dapatkan jam, menit, dan detik dari objek Date
    const jam = sekarang.getHours();
    const menit = sekarang.getMinutes();
    const detik = sekarang.getSeconds();

    // Format tanggal sesuai dengan format yang diinginkan
    const formattedDate = `${bulan}, ${tanggal} ${tahun} ${jam}:${menit}:${detik}`;

    return new Date(formattedDate);
}
