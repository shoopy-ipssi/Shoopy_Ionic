export class Offer {
    private id:string;
    private title:string;
    private price:number;
    private sellingPlace: string;
    private mainPhotoPath:string;
    private description:string;
    private longDescription:string;

    constructor(id: string, title: string, price: number, sellingPlace: string, mainPhotoPath: string, description: string, longDescription: string) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.sellingPlace = sellingPlace;
        this.mainPhotoPath = mainPhotoPath;
        this.description = description;
        this.longDescription = longDescription;
    }

    public getId() : string {
        return this.id;
    }
    
    public getTitle() : string {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getPrice() : number {
        return this.price;
    }

    public setPrice(price: number) {
        this.price = price;
    }

    public getSellingPlace() : string {
        return this.sellingPlace;
    }

    public setSellingPlace(sellingPlace: string) {
        this.sellingPlace = sellingPlace;
    }    

    public getMainPhotoPath() : string {
        return this.mainPhotoPath;
    }

    public setMainPhotoPath(mainPhotoPath:string) {
        this.mainPhotoPath = mainPhotoPath;
    }

    public getDescription() : string {
        return this.description;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getLongDescription() : string {
        return this.longDescription;
    }

    public setLongDescription(longDescription: string) {
        this.longDescription = longDescription;
    }

}
