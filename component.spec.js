const path = require('path')
const { expect } = require('chai')

const { parseVue } = require('./component')

const VUE_PATH = path.join(__dirname, 'fixtures/component.vue')

describe('@component', function () {
  describe('.parseVue', function () {
    beforeEach(function () {
      this.doclet = {}
      this.output = parseVue(VUE_PATH, this.doclet)
    })

    it('returns displayName', function () {
      expect(this.output.displayName).to.equal('grid')
    })
    
    it('returns prop types', function () {
      expect(this.output.props).to.have.lengthOf(5)
      expect(this.output.props[0]).to.deep.equal({
        description: 'object/array defaults should be returned from a factory function',
        name: 'msg',
        required: true,
        type: 'string|number',
        defaultValue: 'function()'
      })
      expect(this.output.props[1]).to.have.property('defaultValue', '\'something\'')
    })

    it('returns slots', function () {
      expect(this.output.slots).to.have.lengthOf(2)
      expect(this.output.slots[0]).to.deep.equal({
        name: 'header',
        description: 'Use this slot header',
      })
    })

    it('returns events', function () {
      expect(this.output.events).to.have.lengthOf(1)
      expect(this.output.events[0]).to.have.deep.equal({
        name: 'success',
        description: 'Success event.',
        type: 'object'
      })
    })
  })
})
