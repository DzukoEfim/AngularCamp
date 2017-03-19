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

interface ICourseInfoForDelete {
    id: number,
    title: string
}

interface ICourseInfoForEdit extends ICourseCreate {
    id: number
}
export {
    ICourse,
    ICourseCreate,
    ICourseInfoForDelete,
    ICourseInfoForEdit
}
