interface CourseName {
  name: string;
}

interface CourseContent {
    content: string
}

interface CourseLength {
    length: number
}

interface CourseFields extends CourseName, CourseContent, CourseLength {

}

interface CourseSystemFieldsInterface {
    date: Date;
}

interface CourseModel extends CourseSystemFieldsInterface, CourseFields {
    clearContent(): void,
    updateName(name: string): void;
    updateContent(content: string);

    onContentUpdate(): void;
}

function createCourse(courseData: CourseFields): CourseModel {
    let course:  CourseModel = {
        name: courseData.name,
        length: courseData.length,
        content: courseData.content,
        date: new Date,
        clearContent: function () {
            this.name = '';
            this.content = '';
            this.length = '';
        },

        updateName: function (name: string): void {
            this.name = name
        },

        updateContent: function (content: string): void {
            this.content = content
        },

        onContentUpdate: function (): void {
            this.date = new Date
        }

    };

     return course;
}
