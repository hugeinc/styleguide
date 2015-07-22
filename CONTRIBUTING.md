# Contributing

## Git branching model
This repo branching model is **inspired by Git Flow**. Currently we have these types of branches:
- master - Latest release, stable
- develop - Main development, unstable
- release/ - Release archive
- feature/ - Specific features development
- example/ - Helpful examples
- hotfix/ - Emergency fixes for latest release

[Read the Git Flow reference](http://nvie.com/posts/a-successful-git-branching-model/).  
This repo uses [Semantic Versioning](http://semver.org/).

## Creating Modules

The good news is that whatever you create in the Styleguide will be treated as a module. This way we are able to add an awesome resource for the community.

Don't forget to read about ["How modules work"](http://hugeinc.github.io/styleguide/modules.html#how-they-work) and ["Module Structure"](http://hugeinc.github.io/styleguide/modules.html#modules-structure) before you move forward.

###_data.json
You can define a key-value in this file that will be used in your module.

Examples:

```json
"items": {
	"people": [
		{
			"name": "John",
			"age": "32"
		},
		{
			"name": "Kirsten",
			"age": "28"
		}
	]
}
```

### Jade
You can use all the info of _data.json inside the .jade file:

```html
table
	each folk in people
		tr
			td=folk.name
			td=folk.age
```

### Javascript
In case you need Javascript for your module, use the key scripts e and add the file path:

```json
"scripts": ["vendor/foundation.equalizer.js", "pricing-tables.js"]
```

## Changing Structure

### Dependencies
- <a href="http://nodejs.org" target="_blank">Node.js</a>
- <a href="http://harpjs.com" target="_blank">Harp.js</a>
- <a href="https://www.npmjs.com/package/livereload" target="_blank">Node Livereload</a>
- <a href="https://www.npmjs.com/package/watch" target="_blank">Node Watch</a>

### Harp
Harp is used for both serving files and compiling, such actions are done through the Start.app and Compile.add. The Start.app uses a Node.js file in order to configure Livereload and Harp together.

### Scripts
The source of the Start.app and Compile.app are inside of each app content: Contents/Resources/script

### Node Files
In the styleguide/structure/_node-files folder you will find the code that:  

- Start Harp
- Start Livereload
- Writes the current date to styleguide/_data.json file (on start and compile)
- Concatenate all modules javascript code into one file in styleguide/assets/scripts/styleguide.js
- Concatenate all modules stylesheet code into one file in styleguide/assets/styles/styleguide.js

### Structure CSS
In the folder styleguide/structure/styles is the stylesheet of the structure (header, sidebar and basic components), without any module specific code.

### Structure Javascript
In the folder styleguide/structure/scripts is the javascript of the structure (header, sidebar and basic components), without any module specific code.

### Modules Data
The styleguide/structure/_includes/modulesData.jade is responsible for collecting all necessary data of all modules into one object that will be used by all structure files.

### Pull Request
In order to do a Pull Request, you should first lint your code with styleguide/structure/_tests/_lint.sh (execute in the command line). Code with lint errors will not be accepted.

## Reporting Issues

Please use our <a href="http://github.com/hugeinc/styleguide">Github repository</a> to report issues. All issues must have:

- Your operating system (name and version)
- The browser you are using (name and version)
- The full copy of any error messages available
- A full description of how to reproduce the issue you have found
