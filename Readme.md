# Huge Styleguide
  
####v2.0.0-alpha

This is a development branch of the Huge Styleguide. The following tasks are yet to be finished (by order of importance):  

- Dynamically write the date of the last change with Node.js
- Reintegrate and test JSON lint
- Reintegrate and test JSHint
- Reintegrate and test JSCS
- Change hamburguer icon
- Write Code Standards document
- Better transitions
- Open Source and happyness
  

### How to use

##### Mac users
Double click Start.app

### Know issues
If you are a Mac user and after running the Start.app you have this error:

```
npm ERR! Please try running this command again as root/Administrator.
```
You have probably installed Node with sudo or root permission. You will need to fix permissions to the .npm folder with the following command:

```
sudo chown -R $(whoami) ~/.npm
```

After that, try running the Start.app again.