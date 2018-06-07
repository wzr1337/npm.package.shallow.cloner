# npm.package.shallow.cloner
shallow clone all dependencies from a package.json - ignoring sub dependencies


# use

```
npm run build && npm run clone -- -p <pathTo>/package.json -o ./tmp/
```




# Known Issues
## curl 56 SSLRead() return error -9806
This tool heavily uses concurrent, async git cloning.. Therefore increase your http git cache size to a reasonable size for your project:
```
$ git config --global http.postBuffer 16M
$ git config --global https.postBuffer 16M
```