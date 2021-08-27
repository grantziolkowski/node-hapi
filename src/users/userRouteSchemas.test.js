const Joi = require('joi');
const { createUserPayloadSchema, getUserParamsSchema } = require('./userRouteSchemas');

describe('userRouteSchemas', () => {
  describe('createUserPayloadSchema', () => {
    const validPayload = {
      firstName: 'Bobby',
      lastName: 'Strider',
      email: 'bobby.strider@test.com',
    };

    describe('valid payload', () => {
      it('does not throw an error', () => {
        expect(() => Joi.assert(validPayload, createUserPayloadSchema)).not.toThrow();
      });
    });

    describe('when firstName is undefined', () => {
      it('throws an error', () => {
        const invalidPayload = {
          ...validPayload,
          firstName: undefined,
        };
        expect(() => Joi.assert(invalidPayload, createUserPayloadSchema)).toThrow();
      });
    });

    describe('when lastName is undefined', () => {
      it('throws an error', () => {
        const invalidPayload = {
          ...validPayload,
          lastName: undefined,
        };
        expect(() => Joi.assert(invalidPayload, createUserPayloadSchema)).toThrow();
      });
    });

    describe('when email is undefined', () => {
      it('throws an error', () => {
        const invalidPayload = {
          ...validPayload,
          email: undefined,
        };
        expect(() => Joi.assert(invalidPayload, createUserPayloadSchema)).toThrow();
      });
    });

    describe('when email has invalid format', () => {
      it('throws an error', () => {
        const invalidPayload = {
          ...validPayload,
          email: 'this is an email',
        };
        expect(() => Joi.assert(invalidPayload, createUserPayloadSchema)).toThrow();
      });
    });
  });

  describe('getUserParamsSchema', () => {
    const validParams = {
      id: 'e375f014-1ee5-429c-b25e-382d2b765f1a',
    };

    describe('valid params', () => {
      it('does not throw an error', () => {
        expect(() => Joi.assert(validParams, getUserParamsSchema)).not.toThrow();
      });
    });

    describe('when id is not a uuid', () => {
      it('throws an error', () => {
        const invalidParams = {
          id: 'test-id',
        };
        expect(() => Joi.assert(invalidParams, getUserParamsSchema)).toThrow();
      });
    });
  });
});
