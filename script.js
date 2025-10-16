let keranjang = [];

function tambahKeKeranjang(menu, harga) {
  const item = keranjang.find(i => i.nama === menu);
  if (item) {
    item.jumlah += 1;
  } else {
    keranjang.push({ nama: menu, harga: harga, jumlah: 1 });
  }
  tampilkanKeranjang();
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  tampilkanKeranjang();
}

function tampilkanKeranjang() {
  const daftar = document.getElementById("daftarKeranjang");
  daftar.innerHTML = "";
  let total = 0;

  keranjang.forEach((item, index) => {
    total += item.harga * item.jumlah;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nama} (${item.jumlah}x) - Rp${item.harga * item.jumlah}
      <button onclick="hapusItem(${index})">Hapus</button>
    `;
    daftar.appendChild(li);
  });

  document.getElementById("totalHarga").innerText = `Total: Rp${total.toLocaleString()}`;
}

function kirimPesanan() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const nama = prompt("Masukkan nama Anda:");
  if (!nama) return;

  let pesanText = `Halo, saya ingin memesan:\n\n`;
  keranjang.forEach(item => {
    pesanText += `🍜 ${item.nama} (${item.jumlah}x) - Rp${(item.harga * item.jumlah).toLocaleString()}\n`;
  });

  const total = keranjang.reduce((sum, i) => sum + i.harga * i.jumlah, 0);
  pesanText += `\nTotal: Rp${total.toLocaleString()}\nAtas nama: ${nama}`;

  const noWa = "6289693457312";
  const url = `https://wa.me/${noWa}?text=${encodeURIComponent(pesanText)}`;

  window.open(url, "_blank");
}