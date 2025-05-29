import { test, expect } from '@playwright/test';
import { api } from '../fetch-api';
import jsonPaladin from '../paladin.json'
import { ClassModel } from '../api-generated/models/ClassModel';
import { classIndex } from '../api-generated/models/ClassIndex';


test('Compare property on returned object to an imported .json object', async () => {
  const apiPaladin = await api.getApi2014ClassesIndex( { params: { _index: "paladin" } } )
  const expectedPaladin : ClassModel = jsonPaladin; // raw expected .json converted to object of correct type for comparison
  expect(apiPaladin.data.index).toEqual(expectedPaladin.index) // comparing the value of a property on both the recieved and expected objects
})

test.describe("Implemented in a for loop", () => {

  for(const characterClass of classIndex){ // classIndex created from the API
    test.describe(`${characterClass}`, () => {
      
      const apiPromise = api.getApi2014ClassesIndex( { params: { _index: characterClass } } ) // reuses data when possible to not perform unneeded calls
      
      test('index property matches', async () => {
        const apiResolved = await apiPromise; // playwright does not like using an await in test.describe(). Other frameworks would probably handled this more efficiently
        const actual = apiResolved.data.index
        expect(actual).toEqual(characterClass)
      })
      
      test('name property matches', async () => {
        const apiResolved = await apiPromise;
        const actual = apiResolved.data.name;
        const expected = capitalizeString(characterClass) // each name matches it's index with the first letter capitalized
        expect(actual).toEqual(expected)
      })
    })
  }
})

function capitalizeString(toCapitalize: string) : string {
  const result = toCapitalize[0].toUpperCase() + toCapitalize.slice(1);
  return result;
}