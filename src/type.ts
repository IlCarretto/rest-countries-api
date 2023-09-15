export interface Theme {
    currentTheme: string;
    toggleTheme: () => void;
}

export interface Country {
    name: string;
    population: number;
    region: string;
    flags: {
        png: string;
        svg: string;
    }
    capital: string[];
}