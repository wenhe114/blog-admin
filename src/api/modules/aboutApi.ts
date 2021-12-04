import request from "@/request/fetch";

export async function getAboutInfoApi() {
    return await request({url:"/blogApi/about",method:"GET"})
}


export async function updateAboutApi(body:any) {
    return await request({url:"/blogApi/about/update",method:"PUT",body,dataType:"json"})
}