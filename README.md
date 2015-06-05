# Styleguide
#### A tool to make creating and maintaining styleguides easy.
#####v2.0.0

For downloads, how to get started and detailed documentation please refer to the [Styleguide Website](http://hugeinc.github.io/styleguide/)

### Know issues
1 - You should allow unregistered applications to run in order to use the Start.app file. You can do so in Settings > Security & Privacy

2 - The compiled offline version have a smaller issue on Chrome. Chrome have a security policy of not allowing communication with iframes under file:// protocol, so any interaction that needs such communication will be removed (basically the sidebar menu). This is only for the offline compiled version.

3 - If you are a Mac user and after running the Start.app you have this error:

```
npm ERR! Please try running this command again as root/Administrator.
```
You have probably installed Node with sudo or root permission. You will need to fix permissions to the .npm folder with the following command:

```
sudo chown -R $(whoami) ~/.npm
```

After that, try running the Start.app again.
 
4 - If you have XCode installed but have not agreed with the License you will get this error:
```
Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.
```
Open XCode and accept the license, then try running Start.app again.
