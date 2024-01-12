import { Link } from "react-router-dom"

import jadx1 from "../assets/jadx1.png"
import jadx2 from "../assets/jadx2.png"
import jadx3 from "../assets/jadx3.png"


export const postMetadata = {
    title: "Reversing JD Sport's Mobile App (Part 2)",
    date: "December 6, 2023",
    author: "Cole Banman",
}
export default function JDSports(){
    return (
        <div className="w-5/6">

            <div role="alert" className="alert alert-warning w-full h-18 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Warning: a few months after integrating this API into my bot, JD Sports patched it. This article is for educational purposes only.</span>
            </div>
            
            <h1 className="font-black text-4xl text-gray-200">Reversing JD Sport's Mobile App</h1>
            
            <h1 className="font-bold text-sm text-gray-400">
                {postMetadata.date}
                <br/>
                {postMetadata.author}
            </h1>

            

            <h2 className="font-bold text-lg text-gray-300 mt-4">Goal: integrate the API into a sellable component</h2>

            <h1 className="heading">Editing the API request for our use case </h1>
            <h2 className="paragraph mt-4">
                As we can see from the request body, the phone is submitting a store number and a UPC code to the API.

                <div className="mockup-code m-3">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`{"storeNumber": "...", "upc": "..."}`}</code></pre>
                </div>

                After converting this into Python code, we can start to see how the API works. It returns the following body: 

                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-4">See Body (Large)</div>
                    <div className="mockup-code m-3 dropdown-content z-[1] menu p-2 shadow-lg">
                    <pre className=" text-purple-500" data-prefix=">">
                    <code>

                        {
                            `{
                                "description":"DUNK LOW RETRO",
                                "styleId":"DD1391",
                                "colorId":"100",
                                "colorDesc":"WHITE/BLACK-WHITE",
                                "vendorId":"NIKE USA INC",
                                "departmentId":"113",
                                "departmentName":"MENS NIKE BASKETBALL",
                                "originalRetail":110.00,
                                "originalRetailCents":11000,
                                "currentRetail":110.00,
                                "currentRetailCents":11000,
                                "productId":"prod2823495",
                                "displayName":"Nike Dunk Low Retro Casual Shoes",
                                "brand":"NIKE",
                                "imageUrl":"https://media.jdsports.com/s/jdsports/DD1391_100?$App_L$",
                                "barcodeType":"STYLE_COLOR",
                                "skus":[
                                   {
                                      "sku":"3136408",
                                      "upc":"194502875980",
                                      "size":"6.0",
                                      "quantity":0,
                                      "webQuantity":0
                                   },
                                   {
                                      "sku":"3136409",
                                      "upc":"194502875997",
                                      "size":"6.5",
                                      "quantity":2,
                                      "webQuantity":0
                                   },
                                   ...
                                ],
                                "reviews":{
                                   "reviews":[
                                      ...
                                   ],
                                   "nextOffset":11
                                },
                                "reviewsRecommendPercent":99,
                                "reviewsCount":373,
                                "reviewsMetaScore":4.92,
                                "tryOnFlag":true
                             }`
                        }
                    
                    </code>
                    </pre>
                </div>
                </div>

                This is a lot of information, but we can see that it contains the product's name, price, and a list of sizes that are in stock. This is exactly what we need to create
                our custom stock checker.

                


                
            </h2>

            <h1 className="heading">Going a Step Further</h1>

            <h2 className="paragraph mt-4">
                as seen in the request body, we use a product UPC along with store number to get stock. while this works fine, it's less than ideal
                since not every use will have a shoe UPC on hand. To fix this, let's dive into the app's source code to see if there's another parameter
                we could use.
            </h2>

            <h1 className="heading">JADX</h1>

            <h2 className="paragraph mt-4">
                After decompiling the app's source code using <Link className="link" target={"_blank"} to="https://github.com/skylot/jadx">JADX</Link>, 
                we can search for the API URL to see how the app is using it. (see image below)

                <img src={jadx1} alt="JADX" className="w-1/2 mt-2 shadow-xl rounded-sm"/>

                after searching for it, we can see that the source code shows the body parameters along with other contents of the API. (see image below)

                <img src={jadx2} alt="JADX" className="w-1/2 mt-2 shadow-xl rounded-sm"/>

                After clicking on the "StoreProductRequestData" class, we can see all optional parameters of the API. (see image below)

                <img src={jadx3} alt="JADX" className="w-1/2 mt-2 shadow-xl rounded-sm mb-1"/>

                The most interesting paramerts here are "color" and "style", as these are the two parameters that we can use to search for a product. 
                They follow the common "SKU" format, which is a combination of the product's style and color. SKUs are much easier to find than UPCs,
                so this is a big win for us. Let's test it out.

                <br/>

                Using the following request body, we can now see the API returns the same response -- it works!

                <div className="mockup-code m-3">
                    <pre className=" text-purple-500" data-prefix=">"><code>{`{"storeNumber": "...", "color": "...", "style": "..."}`}</code></pre>
                </div>

            </h2>

            <h1 className="heading">Conclusion</h1>
            <h2 className="paragraph mt-4">
                With our new found knowledge of the API, we can turn it into a sellable component -- use your imagination.
            </h2>

            <h1 className="heading">Disclaimer: </h1>
            <h2 className="paragraph mt-4">
                This article is for educational purposes only. I do not condone the use of this information for malicious purposes.
            </h2>


            </div>
    )
}