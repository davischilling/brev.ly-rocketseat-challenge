import { Query } from "./IRepository";

export interface ICSVGenerator {
    generateCSV(query: Query): Promise<{
        csvUrl: string,
    }>;
}