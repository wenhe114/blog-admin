import request from "@/request/fetch";

export async function uploadCoverApi(body:any) {
    return await request({url:"/blogApi/upload/cover",method:"POST",dataType:"formdata",body})
}

// export async function uploadCoverApi(body:any) {
//     return await request({url:"/testfile/files/",method:"POST",body,dataType:"formdata"})
// }
// md上传图片
export async function uploadMdImageApi(body:any) {
    return await request({url:"/blogApi/upload/mdimg",method:"POST",dataType:"formdata",body})
}
export async function addContentApi(params:any) {
    return await request({url:"/blogApi/content/add",method:"POST",body:{...params},dataType:"json"})
}

export async function getContentListApi(params:any) {
    return await request({url:"/blogApi/contents/list",method:"GET",body:params,dataType:"urlencoded"})
}

export async function updateContentApi(body:any) {
    return await request({url:"/blogApi/content/update",method:"PUT",body,dataType:"json"})
}

export async function deleteContentApi(body:any) {
    return await request({url:"/blogApi/content/delete/{id}",method:"DELETE",body})
}