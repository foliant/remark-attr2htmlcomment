const visit = require('unist-util-visit')
//const {SKIP} = require('unist-util-visit')
const {html} = require('mdast-builder')

function plugin() {
  return transformer
}

function replace(node,parent,myindex) {
  if ( node.value.lastIndexOf('{.') >= 0 ) {
             // add html comment with contents of attribute tag
             var match = node.value.substring( node.value.lastIndexOf('{.') );
             //console.log( match.substring(2, match.length -1) );
             var newnode = html('<!--rehype:class=' + match.substring(2, match.length -1) +  '-->');
             parent.children.splice(myindex+1,0,newnode);
             // remove (class) attribute tag from node value 
             node.value = node.value.substring(0, node.value.lastIndexOf('{.') );            
   }
}

function transformer (tree) {
  visit(tree, (node,index,parent) => {
    //console.log(node.type);
    var myindex = index; 

    // Hoe diep we moeten gaan is afhankelijk van type node.
    if (node.type === 'heading') { 
      if (node.children) {
       var lastchild = node.children[node.children.length-1];
       //console.log(lastchild.type);
       if( lastchild.value && lastchild.value.endsWith('}') ) {
         //console.log(lastchild.value);
         replace(lastchild,parent,myindex);
       }
     }
   }
   if (node.type === 'paragraph' ) {
     // TODO
   }
   if (node.type === 'list' ) {
     if (node.children) {
       var lastchild = node.children[node.children.length-1];
         if( lastchild.children ) {
           var newchild = lastchild.children[lastchild.children.length-1];
           if( newchild.children ) replace(newchild.children[newchild.children.length-1],parent,myindex);
         }
     }
   }
   if (node.type === 'blockquote') {
     if (node.children) {
       node.children.forEach(function(child,index) {
         if( child.children ) {
           var newchild = child.children[child.children.length-1];
           replace(newchild,parent,myindex);
         } 
       })
     }
   }
  })
}

module.exports = plugin