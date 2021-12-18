import request from "@/request/fetch";

export async function getIconListApi() {
    return await request({url:"/blogApi/icon/list",method:"GET"})
}

export async function addIconApi(body:any) {
    return await request({url:"/blogApi/icon/add",method:"POST",body})
}

export async function updateIconApi(body:any) {
    return await request({url:"/blogApi/icon/update",method:"PUT",body})
}

export async function deleteIconApi(body:any) {
    return await request({url:"/blogApi/icon/delete/{id}",method:"DELETE",body})
}