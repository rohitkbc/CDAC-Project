import httpClient from '../http-common';

const farmersList = () => {
    return httpClient.get('/farmer/list');
};

const removeFarmer = (id) => {
    return httpClient.get(`/admin/removefarmer/${id}`);
};

const addFarmer = (data) => {
    return httpClient.post('/admin/newfarmer', data);
};

const updateFarmer = (data, farmerid) => {
    return httpClient.post(`/admin/updatefarmer/${farmerid}`, data);
};

const getFarmerDetails = (farmerid) => {
    return httpClient.get(`/farmer/farmerdetails/${farmerid}`);
};

const getProductList = () => {
    return httpClient.get(`/farmer/allproducts`);
};

const removeProduct = (id) => {
    return httpClient.get(`/admin/removeproduct/${id}`);
}

const getSpecificProductDetails = (farmerid, productid) => {
    return httpClient.get(`/farmer/products/${farmerid}/${productid}`);
}

export default { farmersList, removeFarmer, addFarmer, updateFarmer, getFarmerDetails, getProductList, removeProduct, getSpecificProductDetails }