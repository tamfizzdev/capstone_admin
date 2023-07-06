

//lấy dssp từ server và render ra layout
var idProductUpdate = null;


function fetchProductList(){
    batLoading();
    productServ
    .getList()
    .then(function(res){
    renderProductList(res.data);
    tatLoading();
    let valueSearchInput = document.getElementById("search").value
    
// console.log(res.data);
}).catch(function(err){
    tatLoading();
});
}
fetchProductList();




// xóa sản phẩm
function xoaSP(id){
    batLoading();
    productServ
    .delete(id)
    .then(function(res){
        //sau khi xoa thanh cong tren server thi goi lai api lay daanh sach moi nhat tu server
        fetchProductList();
        tatLoading();
console.log(res);
}).catch(function(err){
    tatLoading();
});

}
//them san pham
function themSP(){
    var newProduct = layThongTinTuForm();
    productServ
    .create(newProduct)
    .then(function(res){
        //nếu thành công thì gọi lại api lấy danh sách mới nhất từ server
        fetchProductList();
        $('#myModal').modal("hide");
    })
    .catch(function(err){});
}

//sua san pham
function suaSP(id){
    idProductUpdate = id;
    $('#myModal').modal("show");
    batLoading();
    //gọi api lấy chi tiết, get id
    productServ
    .getById()
    .then(function (res) {
        tatLoading();
        showThongTinLenForm(res.data);
    })
    .catch(function (err) {
        tatLoading();
    });
    //đưa thông tin lên form

}

function capNhatSP(){
    var product = layThongTinTuForm();
    productServ
    .update(idProductUpdate,product)
    .then(function (res) {
        fetchProductList();
        $('#myModal').modal("hide");

    })
    .catch(function (err) {});
}

//tìm kiếm sản phẩm
let timKiemSP = () => {
    axios
    .get(`${BASE_URL}`)
    .then((res) => {
        let data = document.getElementById("search").value;
        let listSP = [];
        res.data.forEach((item) => {
              if(item.name == data){
                listSP.push(item);
            }
            else if(item.name == ""){
                renderProductList(res.data)
            }
        });
        renderProductList(listSP);
    })
    .catch((err)=>{
        console.log(err);
    });
};


//sắp xếp giá

let giaCaoDenThap = () => {
  axios
    .get(`${BASE_URL}`)
    .then((res) => {
      let SP = res.data;
      let sortedListSP = sortCaoDenThap(SP);
      renderProductList(sortedListSP);
    })
    .catch((err) => {
      console.log(err);
    });
};



let giaThapDenCao= () => {
  axios
    .get(`${BASE_URL}`)
    .then((res) => {
      let SP = res.data;
      let sortedListSP = sortThapDenCao(SP);
      renderProductList(sortedListSP);
    })
    .catch((err) => {
      console.log(err);
    });
};





//promise chaining, promise all
