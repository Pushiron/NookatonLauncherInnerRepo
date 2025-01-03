import { atom } from 'recoil';

export const titlebarBackBtn = atom({
    key: 'titlebar.backBtn',
    default: {
        show: false,
    },
});

export const titlebarTitle = atom({
    key: 'titlebar.title',
    default: {
        show: false,
        text: 'Nookaton Launcher v0.0.4 - Alpha',
    },
});

export const titlebarUser = atom({
    key: 'titlebar.user',
    default: {
        show: false,
        username: 'Test',
    },
});
