# Table of Contents

>*(This is an ongoing Project, so bugs and feature changes are expected)*

- [Description](#description)
- [Features](#features)
- [How to use the Project](#how-to-use-the-project)
- [Demo](#demo)
- [Prerequisits](#prerequisits)
- [Installation](#installation)
- [License](#license)

<br>

___

## Description 

<br>

 A markdown-based recipe application (some syntax inspired by [Cooklang](https://github.com/cooklang/cooklang-ts)) that tries to tone-down recipe management to the absolute essential by being focused on text files, allowing for all the modern interactivity we're used to and other advanced features, while making use of a clean and pleasant user interface (I hope!) to manage your personal recipe database. 
 Some highlights from this management approach are:
 - Markdown is portable,  platform independent and future proof;
 - The text-based recognition syntax is easy to get a handle of so the base file is kept as human-readable as possible;
 - Note-down a recipe anywhere! Just open any text editor, anywhere, note it using the syntax and import it to the application at a later date;
 - The recipe information can be saved as a file and managed locally, avoiding databases (as of now the application still uses the `localStorage`);

The project makes use of HTML, SCSS and JavaScript using the MVC architecture. The used bundler is Vite.

<br>

___

## Features

>*Updated as development progresses*

<br>

- [x] Ingredients extraction
- [x] Quantities extraction
- [x] Units extraction
- [x] Cookware extraction
- [x] Basic Steps recognition
- [x] Basic Rendering on Preview Mode
- [x] Preview/Edit Mode Switching
- [x] Save recipe to `localStorage` and render the bookmark
- [x] Render bookmark
- [x] Restrict similar recipe titles and recognise changes made to an already existing recipe
- [ ] Re-render saved changes
- [ ] Implement a 'Neumorphic' application design **[ONGOING]**
- [ ] Implement a Metadata block recognition (servings, recipe type, preparation time, cooking time, nutritional information, image links, more?)
- [ ] If metadata block has multiple images associate a gallery to the recipe
- [ ] Time recognition and extraction
- [ ] Servings conversion feature
- [ ] 'Cook Along' feature
- [ ] Syntax highlighting to distinguish between plain text and
	- [ ] Ingredients
	- [ ] Cookware
	- [ ] Input time
- [ ] Checkable ingredients list and steps
- [ ] Implement two viewing options for ingredients
	- [ ] Show ingredients' quantity and units on hover
	- [ ] Show ingredients' quantity and units on the step text by default. Hovering shows modal with recipes containing the same ingredient
- [ ] 'Search and show recipes by ingredient' when clicking an ingredient
- [ ] Handle database locally instead of using the `localStorage`

<br>

___

## How to Use the Project?

>*Updated as development progresses*

<br>

- To enter an ingredient use `@ingredient`for a single worded ingredient or `@long ingredient_` for multiple words ingredients. 
>**EXAMPLE:** Slice an @apple and use @soft butter_ to cook.
	
- To enter a unit-less quantity for that ingredient use `@ingredient_(Num)` or `@long ingredient_(Num)`
>**EXAMPLE:** Slice @apple_(6) and use @soft butter_(1) to cook. 

- To enter a quantity with units associated to it use `@ingredient_(Num&Unit)` or `@long ingredient_(Num&Unit)`
>**EXAMPLE:** Slice @apple_(500&grams) and use @soft butter_(150&grams) to cook. 

- To identify any cookware use `#cookware` or `#long cookware_`
>**EXAMPLE:** Slice @apple_(500&grams) and use @soft butter_(150&grams). Cook it on and #oven using an #iron skillet_ 

- Each `\n` (line break) is considered a step. Simply press 'ENTER' to go to a new line and add a new step.
>**EXAMPLE:**<br>
>Slice @apple_(500&grams) and use @soft butter_(150&grams). *(STEP 1)* <br>
>Cook it on and #oven using an #iron skillet_ *STEP 2)*


<br>

___

<br>

## Demo

Live view by clicking the badge: [![Netlify Status](https://api.netlify.com/api/v1/badges/7ffa5621-f971-4a83-8647-fcc6df6f9366/deploy-status)](https://markdown-recipe-app.netlify.app)

You can also clone the project and open it in localhost 😄

<br>

___

## Prerequisits

<br>

Before cloning/forking this project, make sure you have the following tools installed:
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

<br>

___

## Installation

<br>

1.  Fork the project
2.  Clone the project
3.  Follow the instructions in the console
4.  Navigate to the project directory `cd markdown-recipe-app`
5.  Install the dependencies `npm install`
6.  Run the project `npm run dev`

<br>

___

## License

MIT
