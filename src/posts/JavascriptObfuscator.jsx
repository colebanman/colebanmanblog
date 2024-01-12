import { Link } from "react-router-dom"
import jdsports1 from "../assets/jdsports1.png"
import jdsports2 from "../assets/jdsports2.png"


export const postMetadata = {
    title: "Creating a Javascript Obfuscator",
    date: "January 10, 2023",
    author: "Cole Banman",
}
export default function JSObfuscator(){
    return (
        <div className="w-5/6">
            
            <h1 className="font-black text-4xl text-gray-200">Creating a Javascript Obfuscator</h1>
            
            <h1 className="font-bold text-sm text-gray-400">
                {postMetadata.date}
                <br/>
                {postMetadata.author}
            </h1>

            <h2 className="font-bold text-lg text-gray-300 mt-4">Goal: Create a Javascript Obfuscator that can be used to hide the source code to scripts,
            preventing reverse engineering and malicious use.</h2>

            <h3>
                After researching several different anti-bot companies, I've found that all of them use some form of Javascript Obfuscation to hide their code.
                Ex: 
                <Link className="link" target={"_blank"} to="https://www.cloudflare.com/application-services/products/bot-management/"> Cloudflare</Link>,
                <Link className="link" target={"_blank"} to="https://www.akamai.com/products/bot-manager"> Akamai</Link>, and many others.

            </h3>

            <h1 className="heading">What is Obfuscation?</h1>
            <h2 className="paragraph mt-4">
                Obfuscation is the process of making code more difficult to understand. 
                For example -- renaming variable types to random strings, removing whitespaces and comments, etc. See below.
            </h2>

            <h2 className="heading border-none text-lg">Un-obfuscated Code</h2>

            <div className="mockup-code m-3">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`function hi() {
                        console.log("Hello World!");
                      }
                      hi();`}</code></pre>
            </div>

            <h2 className="heading border-none text-lg">Obfuscated Code</h2>
            <div className="mockup-code m-3">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`(function (c, d) {
    var h = b;
    var e = c();
    while (!![]) {
        try {
            var f = parseInt(h(0x12d)) ......`}</code></pre>
            </div>

            <h2 className="paragraph mt-4">
                As you can see, the obfuscated code is much more difficult to understand. But how do companies get this?
            </h2>

            <h1 className="heading">Babel AST</h1>
            <h2 className="paragraph mt-4">
                Babel AST is a tool that allows you to convert Javascript code into an Abstract Syntax Tree (AST). 
                By traversing the AST we can perform several techniques to obfuscate the code.
                See Babel here: <Link className="link" target={"_blank"} to="https://babeljs.io/">https://babeljs.io/</Link>
            </h2>

            <h1 className="heading">Setting Up</h1>
            <h2 className="paragraph mt-4">
                To start, we need to install Babel and a few other packages. Create a new Javascript project using <code className="text-purple-500">npm init</code> and install the following packages:
                <div className="mockup-code m-3">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`npm install @babel/core @babel/parser @babel/generator`}</code></pre>
                </div>

                Next, create a file called <code className="text-purple-500">obfuscate.js</code> and add the following code:

                <div className="mockup-code m-3 normal-case">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`const fs = require('fs');`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`const path = require('path');`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`const babel = require('@babel/core');`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`const parser = require('@babel/parser');`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`const generate = require('@babel/generator').default;`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`const traverse = require('@babel/traverse').default;`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`const t = require('@babel/types');`}</code></pre>
                </div>

                This will import all of the packages we need to start obfuscating code.

            </h2>

            <h1 className="heading">Adding Functions</h1>

            <h2 className="paragraph mt-4">
                Next, we need to add some functions that will be used to obfuscate the code. Add the following code to the bottom of <code className="text-purple-500">obfuscate.js</code>.
                <br/>
                Let's start with our first function -- something that can generate unique, random names for each variable.

                <div className="mockup-code m-3 normal-case">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`function generateRandomName() {`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`  return '_' + Math.random().toString(16).substr(2, 8);`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`}`}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{``}</code></pre>
                    <pre className=" text-purple-500" data-prefix=">"><code>{`// Example: _f3d4b5a2`}</code></pre>
                </div>

                <br/>

                Now, let's start to use Babel to parse the code. Add the following code to the bottom of <code className="text-purple-500">obfuscate.js</code>.

                <br/>

                First, let's add our initial code that we want to obfuscate into our file.

                <div className="mockup-code m-3 normal-case">
                <pre className=" text-purple-500" data-prefix=">"><code>{`function hi() {
    const msg = "Hello World!";
    console.log(msg);
};`.split('\n').map((line, index) => (
                        <pre className=" text-purple-500" data-prefix=">" key={index}><code>{line}</code></pre>
                    ))}
                    </code></pre>
                    
                </div>

                <br/>

                Next, let's make our first Babel function. This one will be able to rename all variables using our first function.

                <div className="mockup-code m-3 normal-case">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`
                        function obfuscateVariableNames(code) {
                            const ast = parser.parse(code, { sourceType: "module" });
                            const renamedVariables = new Map();

                            traverse(ast, {
                                // Handle variable declarations
                                VariableDeclarator(path) {
                                    const originalName = path.node.id.name;
                                    // Check if the variable name has not been renamed in the current scope
                                    if (!path.scope.hasBinding(renamedVariables.get(originalName))) {
                                        // Generate a new name and store it
                                        const newName = generateRandomName();
                                        renamedVariables.set(originalName, newName);
                                        path.scope.rename(originalName, newName);
                                    }
                                },
                                FunctionDeclaration(path) {
                                    // Rename the function name if it has not been renamed in the current scope
                                    const originalName = path.node.id.name;
                                    if (!path.scope.hasBinding(renamedVariables.get(originalName))) {
                                        const newName = generateRandomName();
                                        renamedVariables.set(originalName, newName);
                                        path.scope.rename(originalName, newName);
                                    }
                                },
                                FunctionExpression(path) {
                                    // Rename the function name if it has not been renamed in the current scope
                                    if (path.node.id && !path.scope.hasBinding(renamedVariables.get(path.node.id.name))) {
                                        const newName = generateRandomName();
                                        renamedVariables.set(path.node.id.name, newName);
                                        path.scope.rename(path.node.id.name, newName);
                                    }
                                },
                            });

                            return generate(ast, {}).code;
                        }
                    `.split('\n').map((line, index) => (
                        <pre className=" text-purple-500" data-prefix=">" key={index}><code>{line}</code></pre>
                    ))}
                    </code></pre>
                </div>
    



            </h2>

            <h1 className="heading">Testing</h1>

            <h2 className="paragraph mt-4">
                Now that we have our code, let's test it out. Add the following code to the bottom of <code className="text-purple-500">obfuscate.js</code>.
                
                <br/>

                <div className="mockup-code m-3 normal-case">
                <pre className=" text-purple-500" data-prefix=">"><code>{`const obfuscatedCode = obfuscateVariableNames(code); // returns obfuscated code
console.log(obfuscatedCode); // prints obfuscated code`.split('\n').map((line, index) => (
                        <pre className=" text-purple-500" data-prefix=">" key={index}><code>{line}</code></pre>
                    ))}
                    </code></pre>
                    </div>
                

                After running it, we can see that the code has been obfuscated. See below.
                <br/>

                <div className="mockup-code m-3 normal-case">
                <pre className=" text-purple-500" data-prefix=">"><code>{`function _f3d4b5a2() {
    const _f3d4b5a3 = "Hello World!";
    console.log(_f3d4b5a3);
};`.split('\n').map((line, index) => (
                        <pre className=" text-purple-500" data-prefix=">" key={index}><code>{line}</code></pre>
                    ))}
                    </code></pre>
                    
                </div>
            </h2>

            <h1 className="heading">Conclusion</h1>
            <h2 className="paragraph mt-4">
                This is just one of the many ways that you can obfuscate code. There are many other techniques that can be used to make the code even more difficult to understand.
                This is just a starting point. Use it as inspiration.
            </h2>


            </div>
    )
}