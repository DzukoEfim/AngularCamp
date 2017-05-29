interface ICourse {
    id ?: number;
    title: string,
    date ?: Date,
    duration: number,
    description: string,
    topRated ?: boolean,
    authors ?: Array<string>
}

export {
    ICourse
}
