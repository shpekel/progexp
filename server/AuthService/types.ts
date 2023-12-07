interface BodyData {
    login: string
    password: string
    email?: string
}

interface ReqData {
    body: BodyData
}

export interface DataItem {
    req: ReqData
    res: any
}
