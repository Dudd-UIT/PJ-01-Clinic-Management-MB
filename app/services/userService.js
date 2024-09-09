import axios from '../setup/axios';

export const loginUser = (email, password) => {
  return axios.post('/account/login', {
    email,
    password,
  });
};

export const verifyUser = email => {
  return axios.post('/account/verify', {
    email,
  });
};

export const confirmUser = (email, otp) => {
  return axios.post('/account/confirm', {
    email,
    otp,
  });
};

export const registerUserTK_BN = formData => {
  return axios.post('/account/register/tk-bn', formData);
};

export const registerUserTK = formData => {
  return axios.post('/account/register/tk', formData);
};

export const updateUser = formData => {
  return axios.post('/benhnhan/update', formData);
};

export const changeUserPassword = (username, oldPassword, newPassword) => {
  return axios.post("/account/changePassword", {
    username,
    oldPassword,
    newPassword
  });
};

export const logoutUser = () => {
  return axios.post("/account/logout");
};
