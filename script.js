// Khai báo mảng chuẩn để kiểm tra chiến thắng
const mangChuan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, null];
let mangHienTai = [...mangChuan];

let dangChoi = false;
let demGio = null;
let giay = 0;
let soBuocDi = 0;
let danhSachLichSu = [];
let viTriVuaDi = -1;

// Bảng màu y hệt yêu cầu đề bài
const bangMau = {
    1: "bg-green-100 text-green-500",
    2: "bg-red-100 text-red-500",
    3: "bg-blue-100 text-blue-500",
    4: "bg-purple-100 text-purple-500",
    5: "bg-yellow-100 text-yellow-500",
    6: "bg-pink-100 text-pink-500",
    7: "bg-indigo-100 text-indigo-500",
    8: "bg-gray-100 text-gray-500",
    9: "bg-emerald-100 text-emerald-500",
    10: "bg-amber-100 text-amber-500",
    11: "bg-lime-100 text-lime-500"
};

// Lấy các element trên DOM
const divBanCo = document.getElementById("banCo");
const btnChoi = document.getElementById("btnChoi");
const textDongHo = document.getElementById("hienThiGio");
const tbodyLichSu = document.getElementById("bangLichSu");
const khungThang = document.getElementById("khungThang");
const textThongBao = document.getElementById("thongBaoKetQua");

// Hàm vẽ lại bàn cờ mỗi khi có thay đổi
function veBanCo() {
    divBanCo.innerHTML = "";
    
    for (let i = 0; i < mangHienTai.length; i++) {
        let giaTri = mangHienTai[i];
        let oDiv = document.createElement("div");
        oDiv.classList.add("o-so");

        if (giaTri === null) {
            oDiv.classList.add("bg-black", "text-transparent");
            if (i === viTriVuaDi) {
                oDiv.classList.add("hieu-ung-di-chuyen");
            }
        } else {
            let classMau = bangMau[giaTri].split(" ");
            for (let c of classMau) {
                oDiv.classList.add(c);
            }
            oDiv.innerText = giaTri;
            if (i === viTriVuaDi) {
                oDiv.classList.add("hieu-ung-di-chuyen");
            }
        }
        divBanCo.appendChild(oDiv);
    }
}

// Xử lý nút Bắt đầu / Kết thúc
function xuLyNutChoi() {
    if (dangChoi == false) {
        // Bắt đầu game mới
        dangChoi = true;
        soBuocDi = 0;
        giay = 0;
        viTriVuaDi = -1;
        textDongHo.innerText = "00:00";

        btnChoi.innerText = "Kết thúc";
        btnChoi.className = "px-8 py-2.5 rounded font-medium text-white bg-red-500 hover:bg-red-600 shadow-sm transition";

        // Chạy đồng hồ đếm giây
        clearInterval(demGio);
        demGio = setInterval(function() {
            giay++;
            let phut = Math.floor(giay / 60);
            let s = giay % 60;
            let mStr = phut < 10 ? "0" + phut : phut;
            let sStr = s < 10 ? "0" + s : s;
            textDongHo.innerText = mStr + ":" + sStr;
        }, 1000);

        // Trộn bàn cờ 100 lần
        tronBanCo100Lan();
    } else {
        // Bấm kết thúc giữa chừng
        dungGame();
        mangHienTai = [...mangChuan];
        viTriVuaDi = -1;
        veBanCo();
    }
}

function dungGame() {
    dangChoi = false;
    clearInterval(demGio);
    btnChoi.innerText = "Bắt đầu";
    btnChoi.className = "px-8 py-2.5 rounded font-medium text-white bg-green-500 hover:bg-green-600 shadow-sm transition";
}

// Thuật toán trộn 100 lần ngẫu nhiên hợp lệ
function tronBanCo100Lan() {
    for (let k = 0; k < 100; k++) {
        let oTrong = mangHienTai.indexOf(null);
        let hang = Math.floor(oTrong / 4);
        let cot = oTrong % 4;
        let cacNuocDi = [];

        if (hang > 0) cacNuocDi.push(oTrong - 4);
        if (hang < 2) cacNuocDi.push(oTrong + 4);
        if (cot > 0) cacNuocDi.push(oTrong - 1);
        if (cot < 3) cacNuocDi.push(oTrong + 1);

        let randomStep = cacNuocDi[Math.floor(Math.random() * cacNuocDi.length)];
        
        // Đổi chỗ
        let tam = mangHienTai[oTrong];
        mangHienTai[oTrong] = mangHienTai[randomStep];
        mangHienTai[randomStep] = tam;
    }
    viTriVuaDi = -1;
    veBanCo();
}

// Bắt sự kiện bàn phím để di chuyển
window.addEventListener("keydown", function(e) {
    if (dangChoi == false) return;

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }

    let oTrong = mangHienTai.indexOf(null);
    let hang = Math.floor(oTrong / 4);
    let cot = oTrong % 4;
    let indexDich = -1;

    let phimBam = e.key.toLowerCase();

    if (phimBam === "arrowup" || phimBam === "w") {
        if (hang > 0) indexDich = oTrong - 4;
    } else if (phimBam === "arrowdown" || phimBam === "s") {
        if (hang < 2) indexDich = oTrong + 4;
    } else if (phimBam === "arrowleft" || phimBam === "a") {
        if (cot > 0) indexDich = oTrong - 1;
    } else if (phimBam === "arrowright" || phimBam === "d") {
        if (cot < 3) indexDich = oTrong + 1;
    }

    if (indexDich !== -1) {
        // Thực hiện đổi chỗ ô trống với ô đích
        let temp = mangHienTai[oTrong];
        mangHienTai[oTrong] = mangHienTai[indexDich];
        mangHienTai[indexDich] = temp;

        viTriVuaDi = indexDich;
        soBuocDi++;
        veBanCo();
        kiemTraThangCuoc();
    }
});

// Kiểm tra xem đã thắng chưa
function kiemTraThangCuoc() {
    let daThang = true;
    for (let i = 0; i < mangHienTai.length; i++) {
        if (mangHienTai[i] !== mangChuan[i]) {
            daThang = false;
            break;
        }
    }

    if (daThang) {
        dungGame();
        let thoiGianHienTai = textDongHo.innerText;
        textThongBao.innerText = "Bạn đã hoàn thành trong " + soBuocDi + " bước và thời gian " + thoiGianHienTai + "!";
        
        khungThang.classList.remove("hidden");
        khungThang.classList.add("flex");

        // Đẩy vào lịch sử
        danhSachLichSu.push({
            buoc: soBuocDi,
            time: thoiGianHienTai
        });
        hienThiLichSu();
    }
}

function dongModal() {
    khungThang.classList.remove("flex");
    khungThang.classList.add("hidden");
    mangHienTai = [...mangChuan];
    viTriVuaDi = -1;
    veBanCo();
}

// Hiển thị bảng lịch sử
function hienThiLichSu() {
    tbodyLichSu.innerHTML = "";
    for (let i = 0; i < danhSachLichSu.length; i++) {
        let item = danhSachLichSu[i];
        let tr = document.createElement("tr");
        tr.className = "hover:bg-gray-50 border-b border-gray-100";
        tr.innerHTML = `
            <td class="p-3 text-center font-medium">${i + 1}</td>
            <td class="p-3">${item.buoc} bước</td>
            <td class="p-3">${item.time}</td>
        `;
        tbodyLichSu.appendChild(tr);
    }
}

// Chạy khởi tạo lần đầu khi load trang
veBanCo();