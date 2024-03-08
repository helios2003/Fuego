import { atom } from "recoil"

export const nameAtom = atom({
    key: 'name',
    default: ''
})

export const emailAtom = atom({
    key: 'username',
    default: ''
})

export const passwordAtom = atom({
    key: 'password',
    default: ''
})

export const idAtom = atom({
    key: 'idAtom',
    default: ''
})