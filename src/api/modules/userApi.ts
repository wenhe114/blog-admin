import request from "@/request/fetch";

export async function getUserListApi() {
    return await request({url:"/blogApi/users",method:"GET"})
}