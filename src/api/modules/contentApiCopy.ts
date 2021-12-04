import { TFHttpSend } from "@/typings/getRequest"

// 创建实例
export default {
    /* vnc */
    // operatesHandle: { url: "/api/operate/operates/handle", method: 'POST', dataType: "json" },
    // switchInterfaceApi:{url:"/api/operate/operates/handle",method: 'POST', dataType: "json"},  
    /* webide */

    // runCodeApi: { url: "/api/operate/crypts/run", method: 'POST' },
    // taskDetailApi: { url: "/api/operate/crypts/info", method: 'GET' },
    // // 实验报告
    // experimentalReport: { url: "/report/record/create", method: 'POST' },
    // // updateTemplateReport: { url: '/report/record/student-update', method: 'POST', dataType: 'formdata' },
    // // 提交步骤/查看答案
    // stepActionApi: { url: "/api/operate/operates/step", method: 'POST' },

    // // 课程笔记
    // getNoteApi:{url: "/student-course/note", method: 'GET'},  // 
    // saveNoteApi:{url:"/student-course/setnote", method: 'POST', dataType: 'json'}, // 课程

    // 实训笔记
    // getTrainNoteApi:{url: "/student-train/note", method: 'GET'},  // 
    // saveTrainNoteApi:{url:"/student-train/savenote", method: 'POST', dataType: 'json'}, // 课程

    // // 实训资源列表
    // getTrainResourceApi:{url: "/student-train/resource", method: 'get'},

    // // 学生提问
    // studentQuestionApi:{url:"/api/operate/operates/handle", method: 'POST', dataType: 'json'},
    uploadCoverApi: { url: '/blogApi/upload/cover', method: 'POST', dataType: 'multipart/formdata' },
}

// 
export interface IContentApi {
    uploadCoverApi: TFHttpSend
}

// export const MODULE_NAME = "contentApi"