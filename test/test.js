const assert = require('assert');
const operations = require('../src/mixins');

it('should generate name', () => {
    assert.strictEqual(operations.methods.nameGenerator('Operation Ouch'), 'operationOuch');
});
it('should generate lookup name with id', () => {
    assert.strictEqual(operations.methods.lookupNameGenerator('Operatives', 'id'), 'operativesId');
});
it('should generate lookup with label title', () => {
   assert.strictEqual(operations.methods.lookupNameGenerator('Operatives', 'title'), 'operatives');
});
it('should find duplcates', () => {
   assert.strictEqual(operations.methods.uniqueFieldName([{type: 'inputtext',name: 'boo'},{type: 'inputtext', 'name':'boo'}]), true);
});
it('should not find duplcates', () => {
    assert.strictEqual(operations.methods.uniqueFieldName([{type: 'inputtext',name: 'boo'},{type: 'inputtext', 'name':'boos'}]), false);
});