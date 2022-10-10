import httpClient from '../http-common';

const login = (data) => {
  return httpClient.post('/user/login', data);
};

const register = (data) => {
  return httpClient.post('/user/register', data);
};

const getCategory = () => {
  return httpClient.get('/admin/categorylist');
}

const removeCategory = (categoryid) => {
  return httpClient.get(`/admin/removecategory/${categoryid}`);
}

const addCategory = (categoryName) => {
  return httpClient.get(`/admin/addcategory/${categoryName}`);
}

const addProduct = (data, farmerId) => {
  return httpClient.post(`/admin/newproduct/${farmerId}`, data)
}

const addProductImage = (file, id) => {
  return httpClient.post(`/admin/${id}/image`, file);
};

const updateProduct = (id, form) => {
  return httpClient.put(`/admin/updateproduct/${id}`, form)
}

const orderDetails = () => {
  return httpClient.get('/admin/allorders');
}

const getUsersList = () => {
  return httpClient.get('/admin/allusers');
}

const getSpecificUserDetails = id => {
  return httpClient.get(`/admin/userdetails/${id}`)
}

const updateUser = (id, data) => {
  return httpClient.post(`/admin/updateuser/${id}`, data)
}

export default { login, register, getCategory, removeCategory, addCategory, addProduct, addProductImage, updateProduct, orderDetails,
                 getUsersList, getSpecificUserDetails, updateUser
              }