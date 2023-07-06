const BASE_URL = "https://648d73062de8d0ea11e7da28.mockapi.io/Products";

var productServ={
getList: ()=> {
    return axios({
    url:BASE_URL,
    method:"GET",
});
},
delete: (id)=>{
    return axios({
        url:`${BASE_URL}/${id}`,
    method:"DELETE",
    });
},
create:(product)=>{
   return axios({
        url: BASE_URL,
        method:"POST",
        data: product,
    });
},
getById:function (id) {
    return axios({
        url:`${BASE_URL}/${id}`,
        method:"GET",
    });
},
update:function(id,product){
    return axios({
        url:`${BASE_URL}/${id}`,
        method:"PUT",
        data: product,
    });
},

};