export type MintNFT = {
  version: "0.1.0";
  name: "mint_nft";
  instructions: [
    {
      name: "initialize";
      accounts: [
        { name: "user"; isMut: true; isSigner: true },
        { name: "vault"; isMut: true; isSigner: false },
        { name: "config"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false }
      ];
      args: [
        { name: "admin"; type: "publicKey" },
        { name: "primaryTreasury"; type: "publicKey" },
        { name: "secondaryTreasury"; type: "publicKey" },
        { name: "collection"; type: "publicKey" }
      ];
    },
    {
      name: "createCollection";
      accounts: [
        { name: "user"; isMut: true; isSigner: true },
        { name: "mint"; isMut: true; isSigner: true },
        { name: "mintAuthority"; isMut: false; isSigner: false },
        { name: "metadata"; isMut: true; isSigner: false },
        { name: "masterEdition"; isMut: true; isSigner: false },
        { name: "destination"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false },
        { name: "associatedTokenProgram"; isMut: false; isSigner: false },
        { name: "tokenMetadataProgram"; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: "mintNft";
      accounts: [
        { name: "owner"; isMut: true; isSigner: true },
        { name: "mint"; isMut: true; isSigner: true },
        { name: "destination"; isMut: true; isSigner: false },
        { name: "metadata"; isMut: true; isSigner: false },
        { name: "masterEdition"; isMut: true; isSigner: false },
        { name: "mintAuthority"; isMut: false; isSigner: false },
        { name: "nftInfo"; isMut: true; isSigner: false },
        { name: "vault"; isMut: true; isSigner: false },
        { name: "config"; isMut: true; isSigner: false },
        { name: "collectionMint"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false },
        { name: "tokenProgram"; isMut: false; isSigner: false },
        { name: "associatedTokenProgram"; isMut: false; isSigner: false },
        { name: "tokenMetadataProgram"; isMut: false; isSigner: false }
      ];
      args: [{ name: "id"; type: "u64" }];
    },
    {
      name: "verifyCollection";
      accounts: [
        { name: "authority"; isMut: false; isSigner: true },
        { name: "metadata"; isMut: true; isSigner: false },
        { name: "mint"; isMut: false; isSigner: false },
        { name: "mintAuthority"; isMut: false; isSigner: false },
        { name: "collectionMint"; isMut: false; isSigner: false },
        { name: "collectionMetadata"; isMut: true; isSigner: false },
        { name: "collectionMasterEdition"; isMut: false; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false },
        { name: "sysvarInstruction"; isMut: false; isSigner: false },
        { name: "tokenMetadataProgram"; isMut: false; isSigner: false }
      ];
      args: [];
    },
    {
      name: "withdraw";
      accounts: [
        { name: "vault"; isMut: true; isSigner: false },
        { name: "config"; isMut: true; isSigner: false },
        { name: "user"; isMut: true; isSigner: true }
      ];
      args: [{ name: "amount"; type: "u64" }];
    },
    {
      name: "updateConfig";
      accounts: [
        { name: "config"; isMut: true; isSigner: false },
        { name: "user"; isMut: true; isSigner: true }
      ];
      args: [
        { name: "admin"; type: "publicKey" },
        { name: "primaryTreasury"; type: "publicKey" },
        { name: "secondaryTreasury"; type: "publicKey" },
        { name: "collection"; type: "publicKey" }
      ];
    }
  ];
  accounts: [
    {
      name: "Config";
      type: {
        kind: "struct";
        fields: [
          { name: "admin"; type: "publicKey" },
          { name: "primaryTreasury"; type: "publicKey" },
          { name: "secondaryTreasury"; type: "publicKey" },
          { name: "collection"; type: "publicKey" },
          { name: "primaryBalance"; type: "u64" },
          { name: "secondaryBalance"; type: "u64" }
        ];
      };
    },
    {
      name: "NftInfo";
      type: {
        kind: "struct";
        fields: [
          { name: "id"; type: "u64" },
          { name: "address"; type: "publicKey" },
          { name: "collection"; type: "publicKey" }
        ];
      };
    }
  ];
  errors: [
    { code: 6000; name: "UnauthorizedCaller"; msg: "Insufficient caller" },
    {
      code: 6001;
      name: "UnauthorizedCollection";
      msg: "Insufficient collection";
    },
    { code: 6002; name: "InsufficientAmount"; msg: "Insufficient amount" }
  ];
};

export const IDL: MintNFT = {
  version: "0.1.0",
  name: "mint_nft",
  instructions: [
    {
      name: "initialize",
      accounts: [
        { name: "user", isMut: true, isSigner: true },
        { name: "vault", isMut: true, isSigner: false },
        { name: "config", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "admin", type: "publicKey" },
        { name: "primaryTreasury", type: "publicKey" },
        { name: "secondaryTreasury", type: "publicKey" },
        { name: "collection", type: "publicKey" },
      ],
    },
    {
      name: "createCollection",
      accounts: [
        { name: "user", isMut: true, isSigner: true },
        { name: "mint", isMut: true, isSigner: true },
        { name: "mintAuthority", isMut: false, isSigner: false },
        { name: "metadata", isMut: true, isSigner: false },
        { name: "masterEdition", isMut: true, isSigner: false },
        { name: "destination", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "associatedTokenProgram", isMut: false, isSigner: false },
        { name: "tokenMetadataProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "mintNft",
      accounts: [
        { name: "owner", isMut: true, isSigner: true },
        { name: "mint", isMut: true, isSigner: true },
        { name: "destination", isMut: true, isSigner: false },
        { name: "metadata", isMut: true, isSigner: false },
        { name: "masterEdition", isMut: true, isSigner: false },
        { name: "mintAuthority", isMut: false, isSigner: false },
        { name: "nftInfo", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "config", isMut: true, isSigner: false },
        { name: "collectionMint", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "associatedTokenProgram", isMut: false, isSigner: false },
        { name: "tokenMetadataProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "id", type: "u64" }],
    },
    {
      name: "verifyCollection",
      accounts: [
        { name: "authority", isMut: false, isSigner: true },
        { name: "metadata", isMut: true, isSigner: false },
        { name: "mint", isMut: false, isSigner: false },
        { name: "mintAuthority", isMut: false, isSigner: false },
        { name: "collectionMint", isMut: false, isSigner: false },
        { name: "collectionMetadata", isMut: true, isSigner: false },
        { name: "collectionMasterEdition", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "sysvarInstruction", isMut: false, isSigner: false },
        { name: "tokenMetadataProgram", isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: "withdraw",
      accounts: [
        { name: "vault", isMut: true, isSigner: false },
        { name: "config", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: true },
      ],
      args: [{ name: "amount", type: "u64" }],
    },
    {
      name: "updateConfig",
      accounts: [
        { name: "config", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: true },
      ],
      args: [
        { name: "admin", type: "publicKey" },
        { name: "primaryTreasury", type: "publicKey" },
        { name: "secondaryTreasury", type: "publicKey" },
        { name: "collection", type: "publicKey" },
      ],
    },
  ],
  accounts: [
    {
      name: "Config",
      type: {
        kind: "struct",
        fields: [
          { name: "admin", type: "publicKey" },
          { name: "primaryTreasury", type: "publicKey" },
          { name: "secondaryTreasury", type: "publicKey" },
          { name: "collection", type: "publicKey" },
          { name: "primaryBalance", type: "u64" },
          { name: "secondaryBalance", type: "u64" },
        ],
      },
    },
    {
      name: "NftInfo",
      type: {
        kind: "struct",
        fields: [
          { name: "id", type: "u64" },
          { name: "address", type: "publicKey" },
          { name: "collection", type: "publicKey" },
        ],
      },
    },
  ],
  errors: [
    { code: 6000, name: "UnauthorizedCaller", msg: "Insufficient caller" },
    {
      code: 6001,
      name: "UnauthorizedCollection",
      msg: "Insufficient collection",
    },
    { code: 6002, name: "InsufficientAmount", msg: "Insufficient amount" },
  ],
};

// export type Counter = {
//   "version": "0.2.0",
//   "name": "counter",
//   "instructions": [
//     {
//       "name": "initialize",
//       "accounts": [
//         {
//           "name": "user",
//           "isMut": true,
//           "isSigner": true
//         },
//         {
//           "name": "counter",
//           "isMut": true,
//           "isSigner": false,
//           "pda": {
//             "seeds": [
//               {
//                 "kind": "const",
//                 "type": "string",
//                 "value": "counter"
//               }
//             ]
//           }
//         },
//         {
//           "name": "systemProgram",
//           "isMut": false,
//           "isSigner": false
//         }
//       ],
//       "args": []
//     },
//     {
//       "name": "increment",
//       "accounts": [
//         {
//           "name": "counter",
//           "isMut": true,
//           "isSigner": false,
//           "pda": {
//             "seeds": [
//               {
//                 "kind": "const",
//                 "type": "string",
//                 "value": "counter"
//               }
//             ]
//           }
//         }
//       ],
//       "args": []
//     }
//   ],
//   "accounts": [
//     {
//       "name": "counter",
//       "type": {
//         "kind": "struct",
//         "fields": [
//           {
//             "name": "count",
//             "type": "u64"
//           },
//           {
//             "name": "bump",
//             "type": "u8"
//           }
//         ]
//       }
//     }
//   ]
// };

// export const IDL: Counter = {
//   "version": "0.2.0",
//   "name": "counter",
//   "instructions": [
//     {
//       "name": "initialize",
//       "accounts": [
//         {
//           "name": "user",
//           "isMut": true,
//           "isSigner": true
//         },
//         {
//           "name": "counter",
//           "isMut": true,
//           "isSigner": false,
//           "pda": {
//             "seeds": [
//               {
//                 "kind": "const",
//                 "type": "string",
//                 "value": "counter"
//               }
//             ]
//           }
//         },
//         {
//           "name": "systemProgram",
//           "isMut": false,
//           "isSigner": false
//         }
//       ],
//       "args": []
//     },
//     {
//       "name": "increment",
//       "accounts": [
//         {
//           "name": "counter",
//           "isMut": true,
//           "isSigner": false,
//           "pda": {
//             "seeds": [
//               {
//                 "kind": "const",
//                 "type": "string",
//                 "value": "counter"
//               }
//             ]
//           }
//         }
//       ],
//       "args": []
//     }
//   ],
//   "accounts": [
//     {
//       "name": "counter",
//       "type": {
//         "kind": "struct",
//         "fields": [
//           {
//             "name": "count",
//             "type": "u64"
//           },
//           {
//             "name": "bump",
//             "type": "u8"
//           }
//         ]
//       }
//     }
//   ]
// };
