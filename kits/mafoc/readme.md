# Mafoc

Mafoc is a chain indexer written in haskell.

Though it's library to build new indexers with, it also has a [quite a
few of them built
in](https://captainhaskell.ee/mafoc/docs/category/indexers). Some of
thes output JSON directly (`addressbalance` and `deposit` can be used
to monitor activity on an address), while others write to sqlite
database.

Indexers are easiest run with docker, e.g:
```
docker run --rm -it markus77/mafoc deposit "$CARDANO_NODE_SOCKET_PATH" \
    --address addr1.. \
    --address addr1..
```

To build Mafoc locally, one would need to do it in nix (be sure to use
[nix
cache](https://github.com/input-output-hk/cardano-ledger#nix-cache)):
```bash
nix develop
cabal build mafoc:exe:mafoc
```



## Environment

Mafoc needs access to a Cardano Node, which you can run locally, or
use the common instance provided by
[Demeter.run](https://demeter.run), which also provides the socket
path environment variable used above.
