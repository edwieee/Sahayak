import { ServiceItem, ServicesData } from "../types/services";

let currentData: ServicesData | null = null;

export const loadLanguageData = async (lang: string) => {
    try {
        const response = await fetch(`/data/languages/${lang}.json`);
        currentData = await response.json();
        return currentData;
    } catch (error) {
        console.error(`Failed to load language data for ${lang}:`, error);
        // Fallback to English
        const response = await fetch(`/data/languages/en.json`);
        currentData = await response.json();
        return currentData;
    }
};

export const getAllItems = (): (ServiceItem & { category: string })[] => {
    if (!currentData) return [];
    return currentData.categories.flatMap(cat =>
        cat.items.map(item => ({ ...item, category: cat.category }))
    );
};

export const searchServices = (query: string): (ServiceItem & { category: string })[] => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];

    const allItems = getAllItems();

    return allItems.filter(item => {
        const inTitle = item.title.toLowerCase().includes(normalizedQuery);
        const inDescription = item.description.toLowerCase().includes(normalizedQuery);
        const inKeywords = item.keywords.some(k => k.toLowerCase().includes(normalizedQuery));

        return inTitle || inDescription || inKeywords;
    }).sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        if (aTitle === normalizedQuery) return -1;
        if (bTitle === normalizedQuery) return 1;

        return 0;
    });
};

export const getItemsByCategory = (category: string): ServiceItem[] => {
    if (!currentData) return [];
    const found = currentData.categories.find(c => c.category === category);
    return found ? found.items : [];
};

export const getItemById = (id: string): (ServiceItem & { category: string }) | undefined => {
    return getAllItems().find(item => item.id === id);
};
