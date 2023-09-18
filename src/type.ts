export interface Theme {
    currentTheme: string;
    toggleTheme: () => void;
}

export interface Country {
    name: string;
    population: number;
    region: string;
    flags: string;
    capital: string[];
    native?: string;
    subregion?: string;
    tld?: string;
    currencies?: string[];
    languages?: Object;
    borders?: string[];
}