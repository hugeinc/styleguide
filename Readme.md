# Huge Styleguide
####v1.1.0

Welcome to the Huge Styleguide project! There are several tools to help you create styleguides on the web, but all of them are directed to developers. And even for developers, it might not satisfy the case where you want a beautiful and functional styleguide published fast.

The motivation for this project is to create something easy enough for everyone that might need to use it.

- [Demo](http://brasil.proto.hugeinc.com/huge-styleguide/)

user: huge  
passw: St*l&GuId3
  
# How to get started
The only basic requirement you need to have in order to begin working the Styleguide is to have a Localhost. You can do that very easily with Codekit or Pre-pos. If you are a developer or are not afraid of the command line, just use the built-in Grunt.

- [Download the zip of the Styleguide files here](http://brasil.proto.hugeinc.com/huge-styleguide/downloads/styleguide_v1.0.1.zip) (user: huge / passw: St*l&GuId3)
- Access the folder you downloaded through your localhost. That is it! No installs or configuration needed, you have the Styleguide running.
  
# Use example
If you just started a Styleguide, your first steps might be the following:

- Open /styleguide/config.json and type the client name, choose the language (based on the lang.json file), the logo image that appear on the sidebar (120x120, located in /styleguide/assets/images) and remove from the config any modules you don't want.
- Add your web fonts files to the /styleguide/assets/fonts folder
- Add your images to the /styleguide/assets/images folder
- Go to the /modules folder and change the config.json of the modules you want, like Introduction, Buttons, Typography, Buttons, etc.
- Customize the SCSS files of these modules.
- Check in the browser to see if everything is ok
- Deploy to a server
- Send the link to the team/client!
  
# Folder structure and files
The following section provide more detail on the structure of the Styleguide. Basically you need to keep in mind what to change, and what not to change:

#### What to change: .json, .handlebars and .scss files. You might use .js files under your modules.
#### What not to change: .html, and the /structure folder.  
  
If you really don't want to work with SCSS, you can write CSS on the /assets/styles folder, at the bottom of the stylesheet file.
  
You just need to change what is bold. All the rest just provides structure:
  
- index.html: This is the main HTML file
- config.codekit: Codekit configuration
- prepos.cfg: Prepos configuration
- /styleguide:
	- **config.json: Basic configuration of your Styleguide**
	- **lang.json: Basic general language configuration**
	- styleguide.html: Styleguide HTML
	- **styleguide.scss: Main styleguide SCSS file for imports**
	- /assets: Assets of your styleguide
		- **/fonts: Put your fonts here**
		- **/images: Put your images here**
		- /scripts: This is just a scripts destination folder
			- styleguide.js
		- /styles: This is just a CSS destination folder
			- styleguide.css: **Use this file if you don't want to work with SCSS (write at the bottom)**
	- /modules: Each section of the styleguide
		- /moduleName
			- **moduleName.scss: Styles of the module**
			- **moduleName.js: Optional Javascript of the module**
			- **config.json: Configuration of the module**
	- /structure: **DON'T CHANGE** this folder unless you are contributing to the core of the project
  
# How it works
The Styleguide is completely modular. This means that everything outside of the /modules folder is just a skeleton for them.

There are 3 basic file types that are interacting on the Styleguide: .json, .handlebars and .scss.

- Handlebars files are a HTML template engine, that in this project holds the structure of any module. Generally you don't need to touch these files.
- JSON files are data that populates HTMLs (handlebars). The config file on the /styleguide folder of the project for example holds the client name, language, logo image and modules (where you enable/disable or change there order).
- SCSS files holds the stylesheet. It uses Sass so you can create variables and nesting. Every module have its own stylesheet.

The Styleguide loads every config file and fill the templates with their data. Together with their styles they will compose each section of the Styleguide.

Forget about the /structure folder if you are not contributing to the core of the project, it is just what makes everything work together.
  
### Modules
Every part of the Styleguide is a module. For example: introduction, colors and typography are modules. Each module has 4 files:

- config.json: Data of the module (just for structure, no styles). Every item on this file have a correspondent item on the .handlebars file.
- moduleName.scss: Styles of the module, always preceded by the module id.
- moduleName.js: Optional javascript file for interactions (for a gallery for example).
- moduleName.handlebars: HTML structure as a template. You will just change this if you are creating a new module or changing the structure of the module. Other than that use JSON for changing the data.

#### If you want to know more about those files:
- [How to use SCSS](http://sass-lang.com/guide)
- [More about Handlebars](http://handlebarsjs.com/)
- [What is JSON](http://www.w3schools.com/json/)

## I don't have a localhost
If you don't have a localhost you have a few options:  
- [Codekit](https://incident57.com/codekit/)  
- [Prepos](https://prepros.io/)  
- [Grunt](http://gruntjs.com/)

If you are a developer, just go with Grunt, it is used by default on the project. If not, choose one of the other options.

### Using Codekit
- Open Codekit
- Drag and drop the Styleguide folder into Codekit
- Hit "Serve"

### Using Prepos
- Open Prepos
- Drag and drop the Styleguide folder into Prepos
- Hit "Live preview"

### Using Grunt (developers)
- Go to the /styleguide/structure on the command line
- sudo npm install
- grunt serve
