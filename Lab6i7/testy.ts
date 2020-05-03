import { fib } from "./fibo";
import { expect } from "chai";
import "mocha";

import { driver } from 'mocha-webdriver';

describe("Fibonacci", () => {
    it("should equal 0 for call with 0", () => {
        expect(fib(0)).to.equal(0);
    });

    it("should equal 1 for call with 1", () => {
        expect(fib(1)).to.equal(1);
    });

    it("should equal 13 for call with 7", () => {
        expect(fib(7)).to.equal(13);
    });

    it("should equal 55 for call with 10", () => {
        expect(fib(10)).to.equal(55);
    });

    it("should not equal 87 for call with 11", () => {
        expect(fib(11)).to.not.equal(87);
    });
});

function getCurrentDate() : string {
    return new Date().toISOString().slice(0, 10);
}

const path = `file://${process.cwd()}/strona.html`;
const myBirthday = '1999-05-22';
const currentDate = getCurrentDate();
const nextYear = ((new Date()).getFullYear() + 1) + "-05-22";
const fullName = 'Piotr Nawrot';
const origin = 'Radom';
const destination = 'Teneryfa';

async function fillData(name : string, date : string, from : string, to : string) {
    const nameInput = await driver.find('input[name=name]');
    await nameInput.clear();
    await nameInput.sendKeys(name);

    const dateInput = await driver.find('input[type=date]');
    await dateInput.clear();
    await dateInput.sendKeys(date);

    const fromInput = await driver.find('select[name=origin]');
    await fromInput.sendKeys(from);

    const toInput = await driver.find('select[name=destination]');
    await toInput.sendKeys(to);
}

describe('validSubmit', function () {
    it('form should be blocked with date smaller than current', async function() {
        await driver.get(path);
        await fillData(fullName, myBirthday, origin, destination);
        expect(await driver.find('input[type=submit]').isEnabled()).to.equal(false);
    });

    it('form is ok so submit should be displayed', async function() {
        await driver.get(path);
        await fillData(fullName, nextYear, origin, destination);
        expect(await driver.find('input[type=submit]').isEnabled()).to.equal(true);
    });

    it('wrong name or surname, only one word in the field', async function() {
        await driver.get(path);
        await fillData('name', nextYear, origin, destination);
        expect(await driver.find('input[type=submit]').isEnabled()).to.equal(false);
    });

    it('missing name and surname', async function() {
        await driver.get(path);
        await fillData('', nextYear, origin, destination);
        expect(await driver.find('input[type=submit]').isEnabled()).to.equal(false);
    });

    it('from correct to wrong data', async function() {
        await driver.get(path);
        await fillData(fullName, nextYear, origin, destination);
        expect(await driver.find('input[type=submit]').isEnabled()).to.equal(true);
        await fillData('', nextYear, origin, destination);
        expect(await driver.find('input[type=submit]').isEnabled()).to.equal(false);
    });
});

describe('confirmationCheck', function () {
    it('check of data in confirmation', async function() {
        await driver.get(path);
        await fillData(fullName, nextYear, origin, destination);
        expect(await driver.find('input[type=submit]').isEnabled()).to.equal(true);
        await driver.find('input[type=submit]').doClick();
        expect(await driver.find('#hide_square').isDisplayed()).to.equal(true);
        expect(await driver.find('#popup_messege').getText()).to.equal(
        "Udało się " +
        `Pasazer: ${fullName} ` +
        `Skąd: ${origin} ` +
        `Dokąd: ${destination} ` +
        `Data: ${nextYear}`);
        await driver.find('#close_popup').doClick();
        expect(await driver.find('#hide_square').isDisplayed()).to.equal(false);
    });
});