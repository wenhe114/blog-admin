
// require.context('../components', true, /index\.js$/)
// const files: any = import.meta.globEager("./modules/*.ts")
const files:any=require.context('@/api/modules', true, /\.ts$/);
console.log(11111,files,files.keys());

let filesArry=files.keys()
for (let i = 0; i < filesArry.length; i++) {
    let file_name = filesArry[i].split('/')[1].split(".")[0];
    let moduleFiles = files(filesArry[i]).default
    console.log(moduleFiles);
}

// export default MyServer;

export const RESP_SUCCESS = 1; // 响应成功的状态码
export const RESP_AUTH_FAILURE = 3003; // 认证失败的状态码

