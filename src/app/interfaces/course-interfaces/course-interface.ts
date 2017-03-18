interface ICourse {
    id: number;
    title: string,
    creatingDate: string,
    duration: string,
    description: string
}

interface ICourseCreate {
    title: string,
    duration: string,
    description: string
}

export {
    ICourse,
    ICourseCreate
}
