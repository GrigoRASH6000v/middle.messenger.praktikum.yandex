import { expect } from 'chai';
import { sum } from './sum.js';

describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
      expect(hello("mocha"), "Hello mocha");
    });
  });