import request from "@/request/fetch";

export async function getMenuListApi() {
    return await request({url:"/blogApi/menu/list",method:"GET"})
}

export async function addMenuApi(body:any) {
    return await request({url:"/blogApi/menu/add",method:"POST",body})
}

export async function updateMenuApi(body:any) {
    return await request({url:"/blogApi/menu/update",method:"PUT",body})
}

export async function deleteMenuApi(body:any) {
    return await request({url:"/blogApi/menu/delete/{id}",method:"DELETE",body})
}