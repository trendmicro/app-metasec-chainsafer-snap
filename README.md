# ChainSafer Snap

Realtime risk check when use metamask send transaction.

## Folder Structure

```
|-- Project
    |-- images                      --- snap logo defined
    |-- src
        |-- constants               --- constants defined
        |-- controller              --- controller handler, like call api...
            |-- types               --- controller types struct defined
        |-- helpers                 --- utils
            |-- types               --- parser tool struct defined
            |--parser               --- parser tool
                |---types           --- convert struct method
                |---pgw             --- pgw api struct defined
    |-- index.ts                    --- metamask event handler defined
```

## Run

```
> npm install
> npm start
```

## Manual install

visit our snap [website](https://chainsafer.nexone.io/snap/#/) for manual install
