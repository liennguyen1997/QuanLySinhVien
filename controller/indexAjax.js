// console.log(axios);
//Kết nối dữ liệu backend dựa vào thư vien axios
var svService = new SinhVienService();
var layDanhSachSinhVienApi = function () {
    //Tạo ra 1 object chứa các thuộc tính backend yêu cầu (url,method)
    // var objectAjax = {
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //BE cung cấp,
    //     method: 'GET' //backend cung cấp
    // }
    // var promise = axios(objectAjax); //Gọi đến backend lấy Data

    var promise = svService.layDanhSachSinhVien(); // Gọi đến backend lất data

    // Xử lý cho trường hợp gọi thành công
    promise.then(function (result) {
        console.log('Ket qua', result.data);
        //Lấy dữ liệu server trả về gọi hàm tạo table
        renderTable(result.data);
    });

    //xu ly cho truong hop that bai
    promise.catch(function (error) {
        console.log(error);

    })
}

var renderTable = function (mangSinhVien) {
    var noiDungTable = '';
    for (var i = 0; i < mangSinhVien.length; i++) {
        //Từ dữ liệu
        var sv = new SinhVien();

        sv.maSinhVien = mangSinhVien[i].maSinhVien;
        sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
        sv.loaiSinhVien = mangSinhVien[i].loaiSinhVien;
        sv.email = mangSinhVien[i].email;
        sv.diemToan = mangSinhVien[i].diemToan;
        sv.diemLy = mangSinhVien[i].diemLy;
        sv.diemHoa = mangSinhVien[i].diemHoa;
        sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;

        //Tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable += `
        <tr>
            <td>${sv.maSinhVien}</td>
            <td>${sv.tenSinhVien}</td>
            <td>${sv.email}</td>
            <td>${sv.tinhDiemTrungBinh()}</td>
            <td>${sv.xepLoai()}</td>
            <td>
                <button class="btn btn-danger" onclick = "xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
                <button class="btn btn-primary" onclick = "suaSinhVien('${sv.maSinhVien}')">Sửa</button>
            </td>
        </tr>
    `;
    }
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}

layDanhSachSinhVienApi();

//--Chức năng thêm sinh viên lưu trữ vào server thông qua api backend...
document.querySelector('#btnXacNhan').onclick = function () {
    //Lấy dữ liệu từ người dùng nhập vào
    var sv = new SinhVien();

    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log('Sinh viên', sv);

    // dùng axios đưa dữ liệu về server thông qua api backend cung cấp

    // var promise = axios({
    //     url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //Api backend cung cấp
    //     method: 'POST', //giao thức backend cung cấp
    //     data: sv //Dữ liệu gửi đi (Lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của Backend yêu cầu)
    // }); thay thể bằng
    var promise = svService.themSinhVien(sv); //ctr click để tới hàm đó

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSinhVienApi();

    });

    // Hàm thực thi khi lỗi xảy ra
    promise.catch(function (error) {
        console.log(error.response.data);

    })
}

//-----Xóa sinh viên

var xoaSinhVien = function (maSinhVien) {
    // alert(maSinhVien);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVien,
        method: 'DELETE',
    })

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSinhVienApi();

    });

    // Hàm thực thi khi lỗi xảy ra
    promise.catch(function (error) {
        console.log(error.response.data);
    })

}

//--- Sửa sinh viên
var suaSinhVien = function (maSinhVien) {
    // alert(maSinhVien);
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVien,
        method: 'GET',
    })

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {

        var sv = result.data;
        //Gán dữ liệu server trả về lên giao diện người dùng nhập thông tin 
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemHoa').value = sv.diemHoa;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
    });

    // Hàm thực thi khi lỗi xảy ra
    promise.catch(function (error) {
        console.log(error.response.data);
    })

}

// Chức năng lưu thông tin sinh viên server dựa vào api backend cung cấp

document.querySelector('#btnLuuThongTin').onclick = function () {
    //Lấy dữ liệu từ người dùng nhập vào đối tượng theo format dữ liệu của Backend yêu cầu
    var sv = new SinhVien();

    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log('Sinh viên', sv);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + sv.maSinhVien, //Api backend cung cấp
        method: 'PUT', //giao thức backend cung cấp
        data: sv //Dữ liệu gửi đi (Lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của Backend yêu cầu)
    });

    // Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    });

    // Hàm thực thi khi lỗi xảy ra
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}



