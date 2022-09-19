# Table of Contents
- [Description](#description)
- [Features](#features)
- [How to use the Project](#how-to-use-the-project)
- [Demo](#demo)
- [Prerequisits](#prerequisits)
- [Installation](#installation)
- [License](#license)

___

## Description 

>*(Ongoing Project)*

 A markdown-based recipe application (some syntax inspired by [Cooklang](https://github.com/cooklang/cooklang-ts)) that tries to tone-down recipe management to the absolute essential by being focused on text files, allowing for all the modern interactivity we're used to and other advanced features, while making use of a clean and pleasant user interface (I hope!) to manage your personal recipe database. 
 Some highlights from this management approach are:
 - Markdown is portable,  platform independent and future proof;
 - The text-based recognition syntax is easy to get a handle of so the base file is kept as human-readable as possible;
 - Note-down a recipe anywhere! Just open any text editor, anywhere, note it using the syntax and import it to the application at a later date;
 - The recipe information can be saved as a file and managed locally, avoiding databases (as of now the application still uses the `localStorage`);

The project makes use of HTML, SCSS and JavaScript using the MVC architecture. The used bundler is Vite.

___

## Features

>*Updated as development progresses*

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
- [ ] Implement a 'Neuromorphic' application design (Ongoing... )
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

___

## How to Use the Project?

>*Updated as development progresses*

- To enter an ingredient use `@ingredient`for a single worded ingredient or `@long ingredient_` for multiple words ingredients. 
>**EXAMPLE:** Slice an @apple and use @soft butter_ to cook.
	
- To enter a unit-less quantity for that ingredient use `@ingredient_(Num)` or `@long ingredient_(Num)`
>**EXAMPLE:** Slice @apple_(6) and use @soft butter_(1) to cook. 

- To enter a quantity with units associated to it use `@ingredient_(Num&Unit)` or `@long ingredient_(Num&Unit)`
>**EXAMPLE:** Slice @apple_(500&grams) and use @soft butter_(150&grams) to cook. 

- To identify any cookware use `#cookware` or `#long cookware_`
>**EXAMPLE:** Slice @apple_(500&grams) and use @soft butter_(150&grams). Cook it on and #oven using an #iron skillet_ 

- Each `\n` (line break) is considered a step.
>**EXAMPLE:** Slice @apple_(500&grams) and use @soft butter_(150&grams). *(STEP 1)* <br>
>Cook it on and #oven using an #iron skillet_ *STEP 2)*

___

## Demo

Live view by clicking the badge: [![Netlify Status](https://api.netlify.com/api/v1/badges/f9a7f8d3-58ca-44ed-a038-ae8d2efd31a5/deploy-status)](https://sos-animal.netlify.app/)

You can also clone the project and open it in localhost 😄

___

## Prerequisits

Before cloning/forking this project, make sure you have the following tools installed:
- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/)

___

## Installation

1.  Fork the project
2.  Clone the project
3.  Follow the instructions in the console:
4.  Navigate to the project directory cd sos-animals
5.  Install the dependencies npm install
6.  Run the project npm start

___

## License
MIT