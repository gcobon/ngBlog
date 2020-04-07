export interface PostI{
    id?:string; // ? indica que puede ser opcional
    titlePost:string;
    contentPost:string;
    imagePost?:string;
    tagsPost:string;
    fileRef?:string;
}