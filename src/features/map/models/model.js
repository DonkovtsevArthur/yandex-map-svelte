import { createStore } from 'effector';

import { changeInfo } from './events';

export const infoPopup = createStore({});

infoPopup.on(changeInfo, (_, newInfo) => newInfo);
