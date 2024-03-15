import { atom } from 'recoil'

export const titleAtom = atom({
    key: "titleAtom",
    default: ''
})

export const contentAtom = atom({
    key: "contentAtom",
    default: ''
})

export const blogsAtom = atom({
    key: "blogsAtom",
    default: ""
})

export const allBlogsAtom = atom({
    key: "allBlogsAtom",
    default: []
})