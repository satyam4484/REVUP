import axiosClient from "./apiClient.js";

export const getToken =  (data) => {
    return axiosClient().post('token',JSON.stringify(data));
    // getToken({"email":"aa@gmail.com","password":"aa"});
}

export const getUser =(data) => {
    return axiosClient().get('user').then(response => response.data);
}

export const getUserData =(data) => {
    return axiosClient().post('user/userdata',JSON.stringify(data)).then(response => response.data);
}

export const getContact  = () => {
    return axiosClient().get('user/contact').then(response => response.data);
}
export const updateContact  = (data) => {
    return axiosClient().patch(`user/contact`,JSON.stringify(data)).then(response => response.data);
}

export const getUserProfile = () => {
    return axiosClient().get('user/profile').then(response => response.data);
}

export const updateUserProfile = (data) => {
    return axiosClient().patch('user/profile',data).then(response => response.data);
}

export const validateEmail = (data) => {
    return axiosClient().post('user/validate',data).then(response => response.data)
}


export const createUser = (data) => {
    return axiosClient().post('user/create/',JSON.stringify(data)).then(response => response.data);
}

export const getUserSkills = () => {
    return axiosClient().get('user/skill').then(response => response.data);
}
export const removeUserSkills = (id) => {
    return axiosClient().delete(`user/skill/${id}`).then(response => response.data);
}
export const addUserSkills = (data) => {
    return axiosClient().post('user/skill',JSON.stringify(data)).then(response => response.data);
}


export const getUserJobs = (data) => {
    return axiosClient().post('get_user_jobs',JSON.stringify(data)).then(response => response.data);
}

export const changePassword = (data) => {
    return axiosClient().post('user/password-change',JSON.stringify(data)).then(response => response.data)
}

// otp 

export const getOtp = (id) => {
    return axiosClient().get(`user/sendotp/${id}`).then(response => response.data)
}

export const validateOtp = (data) => {
    return axiosClient().post('user/otpvalidate',JSON.stringify(data)).then(response =>response.data)
}


// job status 

export const getJobStatus = (data) => {
    return axiosClient().post('jobs/status',JSON.stringify(data)).then(response => response.data);
}
// jobs

export const getJobs = (offset,id,title) => {
    return axiosClient().get(`jobs${id !== 0?'/'+id:`?offset=${offset}&limit=4&title=${title}`}`).then(response => response.data)
}
export const addJob = (data) => {
    return axiosClient().post('jobs',JSON.stringify(data)).then(response => response.data);
}
export const updateJob = (data,id) => {
    return axiosClient().patch(`jobs/${id}/`,JSON.stringify(data)).then(response => response.data);
}


export const getJobByOrganization = (data) => {
    return axiosClient().post('jobs/organization',JSON.stringify(data)).then(response => response.data);
}

export const deleteJob = (id) => {
    return axiosClient().delete(`jobs/${id}`).then(response => response.data);
}
export const getCompanyJob = (id) => {
    return axiosClient().get(`job_company/${id?id:''}`).then(response => response.data);
}

export const jobsQuery = (data) => {
    return axiosClient().post('job_company/',JSON.stringify(data)).then(response => response.data);
}

export const checkJobApplied = (id) =>{
    return axiosClient().get(`job_applied/${id}`).then(response => response.data)
}


// job preference
export const getJobPreference = (id)=>{
    return axiosClient().get(`user/preference/${id?id:''}`).then(response => response.data)
}

export const updatePreference = (id,data)=>{
    return axiosClient().patch(`user/preference/${id}`,JSON.stringify(data)).then(response=>response.data)
}

export const addPreference = (data)=>{
    return axiosClient().post('user/preference/',JSON.stringify(data)).then(response => response.data);
}

export const removeJobPreference = (id)=>{
    return axiosClient().delete(`user/preference/${id}`).then(response => response.data)
}