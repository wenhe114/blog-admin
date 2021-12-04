import { inject } from "vue"
type TBreadcrumb = {
    isShow: boolean
    list: {
        name: string
        path: string
    }[]
}
export function setBreadcrumb(data: TBreadcrumb) {
    let breadcrumb: any = inject("breadcrumb");
    breadcrumb.value = data
    return breadcrumb.value
}