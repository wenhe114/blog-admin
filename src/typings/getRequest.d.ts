// 发送http请求的方法
export type TFHttpSend = (config: IRequestConfig) => Promise<IBusinessResp | null>