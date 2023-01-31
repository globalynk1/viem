import { expect, test } from 'vitest'

import { encodeFunctionResult } from './encodeFunctionResult'

test('returns ()', () => {
  expect(
    encodeFunctionResult({
      abi: [
        {
          inputs: [],
          name: 'foo',
          outputs: [],
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      functionName: 'foo',
      result: undefined,
    }),
  ).toEqual('0x')
  expect(
    encodeFunctionResult({
      abi: [
        {
          inputs: [],
          name: 'foo',
          outputs: [],
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      functionName: 'foo',
      result: [undefined],
    }),
  ).toEqual('0x')
  expect(
    encodeFunctionResult({
      abi: [
        {
          inputs: [],
          name: 'foo',
          outputs: [],
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      functionName: 'foo',
      result: [],
    }),
  ).toEqual('0x')
})

test('returns (address)', () => {
  expect(
    encodeFunctionResult({
      abi: [
        {
          inputs: [],
          name: 'foo',
          outputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
      ] as const,
      functionName: 'foo',
      result: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  ).toEqual(
    '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac',
  )
})

test('returns (Bar)', () => {
  expect(
    encodeFunctionResult({
      abi: [
        {
          inputs: [],
          name: 'bar',
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: 'address',
                      name: 'sender',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'x',
                      type: 'uint256',
                    },
                    {
                      internalType: 'bool',
                      name: 'y',
                      type: 'bool',
                    },
                  ],
                  internalType: 'struct Example.Foo',
                  name: 'foo',
                  type: 'tuple',
                },
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'uint32',
                  name: 'z',
                  type: 'uint32',
                },
              ],
              internalType: 'struct Example.Bar',
              name: 'res',
              type: 'tuple',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      functionName: 'bar',
      result: [
        {
          foo: {
            sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            x: 69420n,
            y: true,
          },
          sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          z: 69,
        },
      ],
    }),
  ).toEqual(
    '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000010f2c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000000045',
  )
})

test('returns (Bar, string)', () => {
  expect(
    encodeFunctionResult({
      abi: [
        {
          inputs: [],
          name: 'baz',
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: 'address',
                      name: 'sender',
                      type: 'address',
                    },
                    {
                      internalType: 'uint256',
                      name: 'x',
                      type: 'uint256',
                    },
                    {
                      internalType: 'bool',
                      name: 'y',
                      type: 'bool',
                    },
                  ],
                  internalType: 'struct Example.Foo',
                  name: 'foo',
                  type: 'tuple',
                },
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'uint32',
                  name: 'z',
                  type: 'uint32',
                },
              ],
              internalType: 'struct Example.Bar',
              name: 'res',
              type: 'tuple',
            },
            {
              internalType: 'string',
              name: 'bob',
              type: 'string',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      functionName: 'baz',
      result: [
        {
          foo: {
            sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            x: 69420n,
            y: true,
          },
          sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
          z: 69,
        },
        'wagmi',
      ],
    }),
  ).toEqual(
    '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000010f2c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac000000000000000000000000000000000000000000000000000000000000004500000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000',
  )
})

test("error: function doesn't exist", () => {
  expect(() =>
    encodeFunctionResult({
      abi: [
        {
          inputs: [],
          name: 'foo',
          outputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      functionName: 'baz',
      result: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `
    "Function \\"baz\\" not found on ABI.
    Make sure you are using the correct ABI and that the function exists on it.

    Docs: https://viem.sh/docs/contract/encodeFunctionResult

    Version: viem@1.0.2"
  `,
  )
})

test("error: function doesn't exist", () => {
  expect(() =>
    encodeFunctionResult({
      abi: [
        // @ts-expect-error
        {
          inputs: [],
          name: 'foo',
          stateMutability: 'pure',
          type: 'function',
        },
      ],
      functionName: 'foo',
      result: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `
    "Function \\"foo\\" does not contain any \`outputs\` on ABI.
    Cannot decode function result without knowing what the parameter types are.
    Make sure you are using the correct ABI and that the function exists on it.

    Docs: https://viem.sh/docs/contract/encodeFunctionResult

    Version: viem@1.0.2"
  `,
  )
})
