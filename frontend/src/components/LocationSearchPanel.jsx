import React from "react";

const LocationSearchPanel=(props)=>{

    const location=[
        "24B, Near Kapoor's cafe, Sheriyans Coding School, Bhopal",
        "24A, Near 24/7 cafe, Alex Coding School, Rajkot",
        "25B, Sheriyans Coding School, Bhopal",
        "23B, Near Singhaniya's cafe, Sheriyans Coding School, Ajmer",
        "22C, Near Kapoor's Kitchen, Dev Complex, Durg",
        "15A, Near Karnavati CLub, Sheriyans School, Gandhinagar",
        "24B, Near Sekhavat's Hotels, Jaypur",
        "24C, Sham Nersing Home, Rajkot",
        "24D, National Highway, Gurukul School, Bhuj",
    ]

    return(
        <div className="flex flex-col gap-5 overflow-auto max-h-[100%] scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">

            {/* sample data */}

            {
                location.map(function(elem,idx){
                    return <div onClick={ () => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} 
                    className="flex border-4 border-gray-100 active:border-orange-500 items-center justify-start bg-gray-100 rounded-2xl p-2 gap-3">
                
                    <h2 className="bg-gray-300 h-10 w-16 flex justify-center items-center rounded-full"><i className="ri-map-pin-2-line "></i></h2>
    
                    <h4 className="font-medium">{elem}</h4>
    
                </div>
                })
            }
            
            

        </div>
    )
}


export default LocationSearchPanel