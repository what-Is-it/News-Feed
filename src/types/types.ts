export enum filterNews {
    all = 'all',
    firstSource = '3dnews',
    secondSource = 'habr'
}

export interface INews {
    parsedDescription: string | null,
    parsedImg?: string | null,
    parsedTime: string | null,
    parsedTitle: string | null,
    source: string | null
}