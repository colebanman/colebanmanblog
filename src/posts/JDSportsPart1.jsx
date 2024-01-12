import { Link } from "react-router-dom"
import jdsports1 from "../assets/jdsports1.png"
import jdsports2 from "../assets/jdsports2.png"


export const postMetadata = {
    title: "Reversing JD Sport's Mobile App (Part 1)",
    date: "December 5, 2023",
    author: "Cole Banman",
}
export default function JDSports(){
    return (
        <div className="w-5/6">
            
            <h1 className="font-black text-4xl text-gray-200">Reversing JD Sport's Mobile App</h1>
            
            <h1 className="font-bold text-sm text-gray-400">
                {postMetadata.date}
                <br/>
                {postMetadata.author}
            </h1>

            <h2 className="font-bold text-lg text-gray-300 mt-4">Goal: Gain access to JD Sport's inventory system to 
            find out which of my stores have a profitable shoe.</h2>

            <h3>Throughout my experiences in sneaker-reselling, I've noticed that the large company
                JD Sports always had the newest releases of Jordans, Yeezys, and other hyped shoes.
                They had them instore, but I could never find out what time they would be put on shelves. 
                The solution? Monitoring their inventory system to see when I could go and buy the shoes.
            </h3>

            <h1 className="heading">Research</h1>
            <h2 className="paragraph">Starting my search, I needed to find a point
            on there website that had potential to be reverse-engineered into my goal.
            I found that their website had a "Store Locator" feature that allowed you to find your local store,
            and if a shoe on their website was in stock, it would show up on the store's page. 
            
            </h2>
            
            <div className="flex flex-row mt-4">
                <img src={jdsports1} alt="JD Sports Store Locator" className="w-72 shadow-xl rounded-sm"/>
                <div className="flex flex-col">
                    <text className="ml-4 mt-8">{"<--- Store Stock Lookup"}</text>
                    <text className="ml-4 mt-28">{"<--- In Stock Stores"}</text>
                </div>
            </div>

            <h2 className="paragraph mt-4">
                Although this was promising, I was 
                quick to learn that this feature was only available
                for products that were in-stock online. This meant that
                profitable shoes that weren't in stock or an in-store exclusive 
                couldn't be found using this method.
            </h2>

            <h2 className="paragraph mt-4">
                The next step was to check the mobile app. By installing an 
                <Link className="link" target={"_blank"} to="https://developer.android.com/studio"> Android Emulator.</Link>
                I was able to run the app on my computer and use a tool called 
                <Link className="link" target={"_blank"} to="https://proxyman.io/"> Proxyman</Link>
                to monitor the network requests that the app was making.
            </h2>

            <h1 className="heading">The Main Problem</h1>
            <h2 className="paragraph mt-4">
                As a measure to prevent reverse-engineering, the app was using
                a technique called SSL Pinning. This meant any request that
                the app made to the server was encrypted using a key that was 
                stored on the app. This meant that Proxyman couldn't read the
                requests, and I couldn't see what the app was doing.

                After doing research, I found a tool called <Link className="link" target={"_blank"} to="https://frida.re/docs/android/">Frida</Link> that
                could be used to bypass SSL Pinning. 
            </h2>

            <h1 className="heading">The Setup</h1>
            <h2 className="paragraph mt-4">
                After opening the app in the Android Emulator, I was able to open a terminal 
                window and run the command seen in the image below. This command would 
                inject pre-made code into the app that would allow Proxyman to bypass the SSL Pinning.
            </h2>
            <img src={jdsports2} alt="Frida in Command Line" className="w-3/4 mt-2 shadow-xl rounded-sm"/>

            
        </div>
    
    )
    }