export declare const README_PATH: string;
interface Readme {
    contents: string;
    sections: Record<string, Section>;
}
export interface Section {
    content: string;
}
export declare const getReadme: () => Promise<Readme>;
export declare const writeReadme: (readme: Readme) => Promise<void>;
export {};
