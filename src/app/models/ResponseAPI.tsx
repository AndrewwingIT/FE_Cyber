export default interface ResponseAPI {
    status: number;
    message: string;
    data: any;
}

export interface Introspect {
    userID: string;
    username: string;
    role: 'CUSTOMER' | 'ADMIN' | 'STAFF'; // thêm các role khác nếu cần
    userType: 'CUSTOMER' | 'ADMIN' | 'STAFF'; // giống role, giữ riêng nếu có logic khác
    auth: boolean;
}

// export interface FirebaseMessages {
//     collapseKey : string | undefined;
//     from : string;
//     messageId : string;
//     notification : {
//         body : string;
//         title : string;
//     };
// }