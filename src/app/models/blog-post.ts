export class BlogPost {
    // status: string[];
    //_id: string;
    slug: string;
    content: string;
    contentPreview: string;
    title: string;
    author: string;
    category: string[] = [];
    //Created_date: string;
    date: string;
    published: boolean;
    //assign vals from json to properties
    constructor(values: Object = {}) {

        Object.assign(this, values);
    }
}
