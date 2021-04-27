//Using Logics in Pug

//app.py
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
  ]

//card.pug
  section#content
    ul
      each color in colors   //each declares for the loop
          li= color
    h2= prompt
    if hint   // if there is a hint, the hint shows up on the page
      p
        i Hint: #{hint}
        
        
//Template Inheritance
Template inheritance works via the block and extends keywords.
        
block content
let Pug know what any template extending the layout can inject its HTML here

in the child template
1. tell the template that it extends or inherits from the layout file
// extends layout.pug   (extends keyword + path to the file)
2. tell the template to inject the content in the content block
// block content  (it will the place at the block content keyword at the layout.pug)


//layout.pug
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    include includes/header.pug   //using include keyword then the path to the file 
    block content
    include includes/footer.pug   // be more specific for the header and footer 


//questions
A good use for a conditional in a template might be to hide a menu for accessing user account data unless a user is signed in.
One Pug file can load another Pug file.
What is an example of something Pug templates are capable of? Rendering a list of elements based on an array of data
What is the conventional name of the Pug file that holds the topmost elements, like <html>, <body>, stylesheets, etc? layout.pug


  
