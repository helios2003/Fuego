import { atom } from 'recoil'

export const titleAtom = atom({
    key: "titleAtom",
    default: ''
})

export const contentAtom = atom({
    key: "contentAtom",
    default: ''
})