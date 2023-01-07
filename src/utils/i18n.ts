import * as i18next from 'i18next';
import locales from '../locales';
class I18n {
    public static async init() {
        const localeTrans = await locales();
        await i18next.init({
            fallbackLng: 'en',
            resources: {
                en: {
                    translation: localeTrans.english,
                },
                vi: {
                    translation: localeTrans.vietnam,
                },
            },
        });
        return i18next;
    }
}

export default I18n;
