import * as admin from "firebase-admin";

export const enum UserType {
    student = 0,
    teacher = 1,
    direction = 2,
    staff = 3
}

export interface User {
    avatarUrl: string,
    createdAt: admin.firestore.Timestamp,
    firstName: string,
    lastName: string,
    groups: Array<string>,
    school: admin.firestore.DocumentReference,
    type: UserType,
    usedCode: string
}

export interface Announcement {
    author: admin.firestore.DocumentReference,
    title: string,
    content: string,
    createdAt: admin.firestore.Timestamp
}

export interface Homework {
    author: admin.firestore.DocumentReference,
    title: string,
    description: string,
    subject: string,
    due: admin.firestore.Timestamp,
    createdAt: admin.firestore.Timestamp
}
