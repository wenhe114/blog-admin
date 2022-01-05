import request from "@/request/fetch";

export async function getResourceListApi(params:any="") {
    return await request({url:"/blogApi/resource/list",method:"GET",body:params,dataType:"urlencoded"})
}


export async function addResourceApi(params:any) {
    return await request({url:"/blogApi/resource/add",method:"POST",body:{...params},dataType:"json"})
}

export async function updateResourcApi(body:any) {
    return await request({url:"/blogApi/resource/update",method:"PUT",body,dataType:"json"})
}

export async function deleteResourceApi(body:any) {
    return await request({url:"/blogApi/resource/delete/{id}",method:"DELETE",body})
}

export async function getResourceTypeListApi() {
    return await request({url:"/blogApi/resourceType/list",method:"GET"})
}


export async function addResourceTypeApi(params:any) {
    return await request({url:"/blogApi/resourceType/add",method:"POST",body:{...params},dataType:"json"})
}

export async function updateResourceTypeApi(body:any) {
    return await request({url:"/blogApi/resourceType/update",method:"PUT",body,dataType:"json"})
}

export async function deleteResourceTypeApi(body:any) {
    return await request({url:"/blogApi/resourceType/delete/{id}",method:"DELETE",body})
}