export class Memes {
    id: number;
    name: string;
    price: number;
    url: string;
    priceHistory: number[];

    constructor(id: number, name: string, price: number, url: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.url = url;
        this.priceHistory = [];
    }

    change_price(newPrice: number) {
        this.priceHistory.unshift(this.price);
        this.price = newPrice;
    }
}

export class MemesCollection {
    memesCollection : Memes[];

    constructor() {
        this.memesCollection = [];
    }

    add(memes : Memes) {
        this.memesCollection.push(memes);
    }

    best_memes() {
        return this.memesCollection.sort( (x : Memes, y : Memes) => {
            return y.price - x.price;
        }).slice(0, 3);
    }

    get_meme(id: number) : Memes | null {
        let memeResult = null;

        this.memesCollection.forEach((element : Memes) => {
            if (element.id === id)
                memeResult = element;
        });

        return memeResult;
    }
}