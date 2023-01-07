
const locales = async () => {
    const english = await import('../locales/en/english.json');
    const vietnam = await import('../locales/vi/vietnam.json');
    return { english, vietnam };
};

export default locales;
