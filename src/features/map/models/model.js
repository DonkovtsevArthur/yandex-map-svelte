import { createStore, sample } from 'effector';

import { changeInfo } from './events';

export const infoPopup = createStore({});

infoPopup.on(changeInfo, (_, newInfo) => newInfo);

infoPopup.watch((on) => console.log(on));
