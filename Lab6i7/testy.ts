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
const nextYear = ((new Date).getFullYear() + 1) + "-05-22";
const fullName = 'Piotr Nawrot';

describe('DateInForm', function () {
    it('form should be blocked with date smaller than current', async function() {
        await driver.get(path);
        const dateInput = await driver.find('input[type=date]');
        driver.executeScript('arguments[0].value = arguments[1]', dateInput, myBirthday);

        const nameInput = await driver.find('input[name=name]');
        nameInput.sendKeys(fullName);

        expect(await (await driver.find('input[type=submit]')).isDisplayed()).to.equal(false);
    });
});

describe('validSubmit1', function () {
    it('wrong name or surname, only one word in the field', async function() {
        await driver.get(path);
        const dateInput = await driver.find('input[type=date]');
        const nameInput = await driver.find('input[name=name]');

        driver.executeScript('arguments[0].value = arguments[1]', dateInput, nextYear);
        driver.executeScript('arguments[0].value = arguments[1]', nameInput, 'word');

        expect(await (await driver.find('input[type=submit]')).isDisplayed()).to.equal(false);
    });
});

describe('validSubmit2', function () {
    it('missing name and surname', async function() {
        await driver.get(path);
        const dateInput = await driver.find('input[type=date]');
        const nameInput = await driver.find('input[name=name]');

        nameInput.sendKeys('');
        driver.executeScript('arguments[0].value = arguments[1]', dateInput, nextYear);

        expect(await (await driver.find('input[type=submit]')).isDisplayed()).to.equal(false);
    });
});

describe('validSubmit3', function () {
    it('form is ok so submit should be displayed', async function() {
        await driver.get(path);
        const dateInput = await driver.find('input[type=date]');
        const nameInput = await driver.find('input[name=name]');

        nameInput.sendKeys(fullName);
        driver.executeScript('arguments[0].value = arguments[1]', dateInput, nextYear);

        expect(await (await driver.find('input[type=submit]')).isDisplayed()).to.equal(true);
    });
});