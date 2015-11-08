# Styleguide [![Build Status](https://travis-ci.org/hugeinc/styleguide.svg?branch=master)](https://travis-ci.org/hugeinc/styleguide)
#### A tool to make creating and maintaining styleguides easy.
#####v2.0.5

For downloads, how to get started and detailed documentation please refer to the [Styleguide Website](http://hugeinc.github.io/styleguide/)

#### Thanks to
- [Node.js](http://nodejs.org)
- [Harp.js](http://harpjs.com)
- [Node Livereload](https://www.npmjs.com/package/livereload)
- [Node Watch](https://www.npmjs.com/package/watch)

### Known issues
1 - You should allow unregistered applications to run in order to use the Start.app file. You can do so in Settings > Security & Privacy

2 - The compiled offline version have a smaller issue on Chrome. Chrome have a security policy of not allowing communication with iframes under file:// protocol, so any interaction that needs such communication will be removed (basically the sidebar menu). This is only for the offline compiled version.

3 - If you are a Mac user and after running the Start.app you have this error:

```
npm ERR! Please try running this command again as root/Administrator.
```
You have probably installed Node with sudo or root permission. You will need to fix permissions to the .npm folder with the following command:

```
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

After that, try running the Start.app again.

4 - If you have XCode installed but have not agreed with the License you will get this error:
```
Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.
```
Open XCode and accept the license, then try running Start.app again.

5 - If you get a **404 - No data received** error, you might have a port conflict, there are two ways you can change the port number (default to **9241**):
- Change the PORT variable inside styleguide/structure/_node-files/watch.js
- Set an environment variable (PORT or STYLEGUIDE_PORT):

    If you are running the Styleguide manually, in the last step you might do:

    ```
    PORT=7000 node watch.js
    ```
    or
    ```
    STYLEGUIDE_PORT=7000 node watch.js
    ```
    The Start.app is self contained, and for security reasons it does not have access to external variables.
    If you want to change the port for the Start.app it is recommended to change the watch.js file.
    You can, if you want, add a variable to your .bashrc file and it will be available for the Start.app:
    ```
    touch ~/.bashrc
    echo 'export PORT=1234' >> ~/.bashrc
    ```
    or
    ```
    echo 'export STYLEGUIDE_PORT=1234' >> ~/.bashrc
    ```
