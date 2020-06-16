import { expect } from "chai";
import "mocha";
import { Memes, MemesCollection } from "../ts/Memes";

describe("Memes tests", () => {
    it('Class constructor', () => {
        const meme = new Memes(1, "name", 2, "url");

        expect(meme.price).to.equal(2);
    });

    it('Price change', () => {
        const meme = new Memes(1, "name", 2, "url");
        expect(meme.price).to.equal(2);
        meme.change_price(3);
        expect(meme.price).to.equal(3);
    });

    it('Price change and history check', () => {
        const meme = new Memes(1, "name", 2, "url");
        expect(meme.price).to.equal(2);

        meme.change_price(3);
        expect(meme.price).to.equal(3);

        expect(meme.priceHistory.length).to.equal(1);
        expect(meme.priceHistory[0]).to.equal(2);
    });
});

describe("MemesCollection tests", () => {
    it('Class constructor', () => {
        const memesCollection = new MemesCollection();

        expect(memesCollection.memesCollection.length).to.equal(0);
    });

    it('Best memes', () => {
        const memesCollection = new MemesCollection();

        memesCollection.add(new Memes(1, "name", 5, "url"));
        memesCollection.add(new Memes(2, "name", 6, "url"));
        memesCollection.add(new Memes(3, "name", 7, "url"));
        memesCollection.add(new Memes(4, "name", 8, "url"));

        expect(memesCollection.best_memes().length).to.equal(3);
        expect(memesCollection.best_memes()[0].price).to.equal(8);
        expect(memesCollection.best_memes()[1].price).to.equal(7);
        expect(memesCollection.best_memes()[2].price).to.equal(6);
    });

    it('Best memes, quantity < 3', () => {
        const memesCollection = new MemesCollection();

        memesCollection.add(new Memes(1, "name", 5, "url"));
        memesCollection.add(new Memes(2, "name", 6, "url"));

        expect(memesCollection.best_memes().length).to.equal(2);
        expect(memesCollection.best_memes()[0].price).to.equal(6);
        expect(memesCollection.best_memes()[1].price).to.equal(5);
    });

    it('Get meme', () => {
        const memesCollection = new MemesCollection();
        const memes = new Memes(1, "name", 5, "url");

        memesCollection.add(memes);
        memesCollection.add(new Memes(2, "name", 6, "url"));
        memesCollection.add(new Memes(3, "name", 7, "url"));
        memesCollection.add(new Memes(4, "name", 8, "url"));

        expect(memesCollection.get_meme(1)).to.equal(memes);
        expect(memesCollection.get_meme(5)).to.equal(null);
    });
})