import * as sqlite from 'sqlite3';
import {DbHandlerOpen, DbHandlerAll, DbHandlerRun, DbHandlerGet} from "./DBWrapper"

export class Memes {
    id: number;
    name: string;
    url: string;
    priceHistory: [number, string][];

    constructor(id: number, name: string, price: number, url: string) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.priceHistory = [[price, "Initial"]];
    }

    getCurrentPrice() : number {
        return this.priceHistory[0][0];
    }

    change_price(newPrice: number, nick : string) {
        this.priceHistory.unshift([newPrice, nick]);
    }

    flatPrices(): string {
        return this.priceHistory.map((val) => `${val[0]},${val[1]}`).join(';');
    }

    save(db: sqlite.Database)  {
        return DbHandlerRun(db, `INSERT OR REPLACE INTO memes (id, name, url, prices) VALUES (${this.id}, '${this.name}', '${this.url}', '${this.flatPrices()}');`, []);
    }
}

export class MemesCollection {
    add(db: sqlite.Database, meme: Memes) {
        return meme.save(db);
    }

    updateMemePrice(db: sqlite.Database, memeID : number, newPrice: number, username : string) : Promise<Memes> {
        return new Promise<Memes> (async (resolve, reject) => {
            await DbHandlerRun(db, "BEGIN IMMEDIATE;", []);
            this.get_meme(db, memeID).then(async (meme) => {
                if (meme === null || isNaN(newPrice)){
                    await DbHandlerRun(db, "ROLLBACK;", []);
                    return reject();
                } else {
                    meme.change_price(newPrice, username);
                    meme.save(db).then(async() => {
                        await DbHandlerRun(db, "COMMIT;", []);
                        resolve(meme);
                    }).catch(async () => {
                        return this.updateMemePrice(db, memeID, newPrice, username);
                    })
                }
            }).catch(async () => {
                return this.updateMemePrice(db, memeID, newPrice, username);
            })
        })
    }

    mostExpensiveMemes(db: sqlite.Database): Promise<Memes[]> {
        return new Promise((resolve, reject) => {
            db.all(`SELECT id, name, url, prices FROM memes;`, (err, rows) => {
                if(err) {
                    reject('DB Error');
                    return;
                }

                const memes : Memes[] = [];

                for (const row of rows) {
                    const parsedPrices: [number, string][] = [];

                    for(const priceAuthor of row.prices.split(';')) {
                        const [price, by] = priceAuthor.split(',');
                        parsedPrices.push([price, by]);
                    }

                    const meme : Memes = new Memes(row.id, row.name, parsedPrices.pop()![0], row.url);

                    while(parsedPrices.length) {
                        meme.change_price(...parsedPrices.pop()!);
                    }

                    memes.push(meme);
                }

                resolve(memes.sort( (x : Memes, y : Memes) => {
                    return y.getCurrentPrice() - x.getCurrentPrice();
                }).slice(0, 3));
            });
        });
    }

    get_meme(db: sqlite.Database, id: number) : Promise<Memes> {
        return new Promise((resolve, reject) => {
            DbHandlerGet(db, 'SELECT id, name, url, prices FROM memes WHERE id = ?', [id]).then((row : any) => {
                const parsedPrices: [number, string][] = [];
                for(const priceAuthor of row.prices.split(';')) {
                    parsedPrices.push(priceAuthor.split(','));
                }

                const meme = new Memes(row.id, row.name, parsedPrices.pop()![0], row.url);
                while(parsedPrices.length) {
                    meme.change_price(...parsedPrices.pop()!);
                }

                if (row.id === id) {
                    return resolve(meme);
                }
            });
        });
    }
}