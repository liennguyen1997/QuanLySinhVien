
var mangSinhVien = [];
var validate = new Validation();
//Định nghĩa sự kiện click khi người dùng bấm nút xác nhận
document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo ra đối tượng sinh viên chứa thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log('Sinh viên', sv);

    //Kiểm tra hợp lệ
    //Kiểm tra rỗng
    var valid = true;

    valid = validate.kiemTraRong(sv.maSinhVien, 'Mã Sinh Viên', '.kiemTraRong-maSinhVien')
        & validate.kiemTraRong(sv.tenSinhVien, 'Tên sinh viên', '.kiemTraRong-tenSinhVien')
        & validate.kiemTraRong(sv.email, 'Email', '.kiemTraRong-email')
        & validate.kiemTraRong(sv.soDienThoai, 'Số điện thoại', '.kiemTraRong-soDienThoai')
        & validate.kiemTraRong(sv.diemToan, 'Điểm Toán', '.kiemTraRong-diemToan')
        & validate.kiemTraRong(sv.diemLy, 'Điểm Lý', '.kiemTraRong-diemLy')
        & validate.kiemTraRong(sv.diemHoa, 'Điểm Hóa', '.kiemTraRong-diemHoa')
        & validate.kiemTraRong(sv.diemRenLuyen, 'Điểm Rèn Luyện', '.kiemTraRong-diemRenLuyen')

    // return;

    //Kiểm tra định dạng dữ liêu
    //Kiểm tra định dạng email

    valid &= validate.kiemTraEmail(sv.email, 'Email', '.kiemTraDinhDang-email');

    //Kiểm tra định dạng tenSinhVien
    valid &= validate.kiemTraTatCaCacKyTu(sv.tenSinhVien, 'Tên Sinh Viên', '.kiemTraDinhDang-tenSinhVien');
    //Kiểm tra định dạng số điện thoại & điểm tất cả phải nhập số 

    valid &= validate.kiemTraTatCaLaSo(sv.maSinhVien, 'Mã Sinh Viên', '.kiemTraDinhDang-maSinhVien')
        & validate.kiemTraTatCaLaSo(sv.soDienThoai, 'Số điện thoại', '.kiemTraDinhDang-soDienThoai');

    //Kiểm tra Giá Trị
    valid &= validate.kiemTraGiaTri(sv.diemToan, 'Điểm Toán', '.kiemTraGiaTri-diemToan', 0, 10)
        & validate.kiemTraGiaTri(sv.diemLy, 'Điểm Lý', '.kiemTraGiaTri-diemLy', 0, 10)
        & validate.kiemTraGiaTri(sv.diemHoa, 'Điểm Hóa', '.kiemTraGiaTri-diemHoa', 0, 10)
        & validate.kiemTraGiaTri(sv.diemRenLuyen, 'Điểm Rèn Luyện', '.kiemTraGiaTri-diemRenLuyen', 0, 10)

    //Kiêm tra độ dài

    valid &= validate.kiemTraDoDaiChuoi(sv.email, 'Email', '.kiemTraDoDaiChuoi-email', 6, 32);
    valid &= validate.kiemTraDoDaiChuoi(sv.tenSinhVien, 'Tên sinh viên', '.kiemTraDoDaiChuoi-tenSinhVien', 6, 50);

    if (!valid) {
        return;
    }
    // 0 không phải là false

    /*
    var valid = true;
    //.trim(): hàm js loại bỏ khoảng trống đầu và cuối của chuỗi.
    if (sv.maSinhVien.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-maSinhVien').innerHTML = 'MSSV không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-maSinhVien').innerHTML = '';
    }

    if (sv.tenSinhVien.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-tenSinhVien').innerHTML = 'Tên Sinh Viên không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-tenSinhVien').innerHTML = '';
    }

    if (sv.email.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-email').innerHTML = 'Email không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-email').innerHTML = '';
    }
    if (sv.soDienThoai.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-soDienThoai').innerHTML = 'Số điện thoại không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-soDienThoai').innerHTML = '';
    }

    if (sv.diemToan.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-diemToan').innerHTML = 'điểm Toán không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-diemToan').innerHTML = '';
    }

    if (sv.diemLy.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-diemLy').innerHTML = 'Điểm Lý không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-diemLy').innerHTML = '';
    }
    if (sv.diemHoa.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-diemHoa').innerHTML = 'Điểm Hóa không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-diemHoa').innerHTML = '';
    }
    if (sv.diemRenLuyen.trim() === '') {
        //Dom đến thẻ lỗi kiemTraRong-maSinhVien => ghi nội dung lỗi vào innerHTML
        document.querySelector('.kiemTraRong-diemRenLuyen').innerHTML = 'Điểm rèn luyện không được bỏ trống!';
        valid = false;
    } else {
        document.querySelector('.kiemTraRong-diemRenLuyen').innerHTML = '';
    }
    if (valid === false) {
        return;
    }
    */



    //Thêm 1 sinh viên vào mảng
    mangSinhVien.push(sv);
    console.log('mảng sinh viên', mangSinhVien);
    //Taọ bảng

    renderTable(mangSinhVien);

    luuLocalStorage();



    // //Tạo thẻ tr sinh viên, Cú pháp tạo thẻ : document.createElement('tenThe');
    // var trSinhVien = document.createElement('tr');

    // //Tạo thẻ tdMaSinhVien => Chứa nội dung sv.maSinhVien
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sv.maSinhVien;

    // //Tạo thẻ tdTenSinhVien
    // var tdTenSinhVien = document.createElement('td');
    // tdTenSinhVien.innerHTML = sv.tenSinhVien;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sv.email;
    // var tdSoDienThoai = document.createElement('td');
    // tdSoDienThoai.innerHTML = sv.soDienThoai;
    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sv.tinhDiemTrungBinh();
    // var tdXepLoai = document.createElement('td');
    // tdXepLoai.innerHTML = sv.xepLoai();

    // //Tạo ra td chức năng
    // var tdChucNang = document.createElement('td');

    // var buttonXoa = document.createElement('button');
    // buttonXoa.innerHTML = 'Xóa';
    // buttonXoa.className = 'btn btn-danger';
    // buttonXoa.onclick = function () {
    //     //this: là nút xóa
    //     //this vị trí hiện tại là thẻ button => .parentElement là thẻ td => td.parentElement =>thẻ tr => .remove() :xóa
    //     this.parentElement.parentElement.remove();
    // }

    // //Add button vào td
    // tdChucNang.appendChild(buttonXoa);
    // //Chèn thẻ con vào thẻ cha : theCha.appendChild(theCon)
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdSoDienThoai);
    // trSinhVien.appendChild(tdDiemTrungBinh);
    // trSinhVien.appendChild(tdXepLoai);
    // trSinhVien.appendChild(tdChucNang);


    // //Dom đến thẻ tbody => appendChild thẻ tr vào
    // document.querySelector('#tableSinhVien').appendChild(trSinhVien);

}


var renderTable = function (arrSV) {
    //Từ mảng sinh viên tạo ra 1 chuỗi html nhiều thẻ tr dựa vào vòng lặp
    var noiDungTable = '';
    for (var index = 0; index < arrSV.length; index++) {
        //Mỗi lần lặp lấy ra 1 đối tượng sinhVien
        var sinhVien = arrSV[index];

        var sv = new SinhVien(sinhVien.maSinhVien, sinhVien.tenSinhVien, sinhVien.loaiSinhVien, sinhVien.email, sinhVien.soDienThoai, sinhVien.diemToan, sinhVien.diemLy, sinhVien.diemHoa, sinhVien.diemRenLuyen);
        // sv.maSinhVien = sinhVien.maSinhVien;
        // sv.tenSinhVien = sinhVien.tenSinhVien;
        // sv.email = sinhVien.email;
        // sv.soDienThoai = sinhVien.soDienThoai;
        // sv.diemToan = sinhVien.diemToan;
        // sv.diemLy = sinhVien.diemLy;
        // sv.diemHoa = sinhVien.diemHoa;
        // sv.diemRenLuyen = sinhVien.diemRenLuyen;
        // sv.loaiSinhVien = sinhVien.loaiSinhVien;
        //Tạo ra 1 chuỗi + dồn vào nội dung <tr></tr>
        noiDungTable += `
                <tr>
                    <td>${sv.maSinhVien}</td>
                    <td>${sv.tenSinhVien}</td>
                    <td>${sv.email}</td>
                    <td>${sv.soDienThoai}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.xepLoai()}</td>
                    <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button></td>
                    <td><button class="btn btn-primary" onclick="chinhSua('${sv.maSinhVien}')">Sửa</button></td>
                </tr>            
        `
    }
    console.log(noiDungTable);
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}

// Cài đặt sự kiện cho nút button xoá

var xoaSinhVien = function (maSV) {
    //mangSinhVien = [{ma:1,ten:'a'},{ma:2,ten:'b'},{ma:3,ten:'c'}];

    for (var index = mangSinhVien.length - 1; index >= 0; index--) {
        //Moi lan duyet lay ra 1 doi tuong sinh vien
        var sv = mangSinhVien[index];

        //lay ma sinh vien cua tung doi tuong so sanh voi maSV duoc click

        if (sv.maSinhVien === maSV) {
            //splice laf ham xoa phan tu cua mang dự vào index
            mangSinhVien.splice(index, 1);
        }
    }
    //sau khi xóa dữ liệu trong mảng gọi hàm tạo lại table truyền vào mảng sinh vien đã xóa
    renderTable(mangSinhVien);
}

var chinhSua = function (maSV) {
    document.querySelector('#maSinhVien').disabled = true;
    //Từ mã sinh viên => tìm sinh viên trong mnangSinhVien

    for (var index = 0; index < mangSinhVien.length; index++) {
        //Mỗi lần duyệt mảng lấy ra 1 đối tượng sinh viên
        var sv = mangSinhVien[index];
        //So sánh nếu maSV truyền vào === với đối tượng đang duyệt => gán ngược lại lên các control phía trên

        if (maSV === sv.maSinhVien) {
            document.querySelector('#maSinhVien').value = sv.maSinhVien;
            document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
            document.querySelector('#email').value = sv.email;
            document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
            document.querySelector('#soDienThoai').value = sv.soDienThoai;
            document.querySelector('#diemToan').value = sv.diemToan;
            document.querySelector('#diemLy').value = sv.diemLy;
            document.querySelector('#diemHoa').value = sv.diemHoa;
            document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
        }
    }
}

//viết hàm lưu trữ dữ liệu xuống máy tính client
var luuLocalStorage = function () {
    // Biến mảng sinh viên thành chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    //Đem chuỗi mangSinhVien lưu vào localStorage
    localStorage.setItem('mangSinhVien', sMangSinhVien);
}

//Viết phương thức lấy dữ liệu từ localstorage ==> khi người dùng vừa vào trang web

var layMangSinhVienStorage = function () {

    //Kiểm tra dữ liệu có trong localStorage không
    if (localStorage.getItem('mangSinhVien')) {
        //Lấy dữ liệu được lưu trữ trong localstorage ra ngoài
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        //Biến dữ liệu từ chuỗi chuyển về object js gần vào mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        //Sau khi lấy dữ liệu ra gọi hàm tạo bảng
        renderTable(mangSinhVien);
    }
}

layMangSinhVienStorage();

// Cập nhật thông tin người dùng sau khi thay đổi gán vào đối tượng sinhVien
document.querySelector('#btnLuuThongTin').onclick = function () {
    // Lấy thông tin người dùng sau lhi thay đổi gán vào đối tượng sinhVien
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    // Tìm trong mangSinhVien đối tượng cùng mã => cập nhật lại giá trị

    for (var i = 0; i < mangSinhVien.length; i++) {
        var sinhVienCapNhat = mangSinhVien[i];
        //Tìm ra sinhVien trong mảng có mã = với mã sv tren giao diện => cập nhật giá trị

        if (sinhVienCapNhat.maSinhVien === sv.maSinhVien) {
            sinhVienCapNhat.maSinhVien = sv.maSinhVien;
            sinhVienCapNhat.tenSinhVien = sv.tenSinhVien;
            sinhVienCapNhat.loaiSinhVien = sv.loaiSinhVien;
            sinhVienCapNhat.email = sv.email;
            sinhVienCapNhat.soDienThoai = sv.soDienThoai;
            sinhVienCapNhat.diemToan = sv.diemToan;
            sinhVienCapNhat.diemLy = sv.diemLy;
            sinhVienCapNhat.diemHoa = sv.diemHoa;
            sinhVienCapNhat.diemRenLuyen = sv.diemRenLuyen;
        }
    }
    //Gọi hàm tạo bảng
    renderTable(mangSinhVien);

    //Gọi hàm lưu vào localsrorage
    luuLocalStorage();
    document.querySelector('#maSinhVien').disable = false;
}

