"use client"

import React from "react";
import { Loader } from "@googlemaps/js-api-loader"
import { BottomSheet } from "react-spring-bottom-sheet";
import Image from 'next/image';
import FormInput from "@/components/FormElements/FormInput";
import { useAuth } from "@/providers/AuthProvider";

const loader = new Loader({
    apiKey: process.env.NEXT_GOOGLEMAP_API_KEY || '',
    version: "weekly",
});


export default function RidersHome() {

    // Hooks
    const { user } = useAuth()

    // State
    const [currentCoordinates, setCurrentCoordinates] = React.useState({ lat: 6.458985, lng: 3.601521 })

    // Helpers
    const requestCurrentPosition = ()=>{
        navigator.geolocation.getCurrentPosition(({ coords })=>{
            setCurrentCoordinates({
                lat: coords.latitude,
                lng: coords.longitude
            })
        })
    }

    React.useEffect(()=>{
        requestCurrentPosition();
    },[])

    React.useEffect(()=>{

        if (typeof window !== undefined){
            loader.importLibrary('maps')
            .then(async () => {

                const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
                let map = new Map(document.getElementById("ii-map") as HTMLElement, {
                    center: currentCoordinates,
                    zoom: 16,
                    disableDefaultUI: true,
                });
            });
        }
        
    },[currentCoordinates])

    return(
        <div className="h-screen w-screen relative">

            {/** Search & Profile */}
            <div className="fixed top-0 left-0 w-screen z-30">
                <div className="flex items-center gap-4 p-2">
                    <div 
                        className="bg-white p-1 rounded-full flex items-center justify-center"
                        role="button"
                        data-hs-overlay="#hs-overlay-dashboard-rider"
                    >
                        <Image
                            src={'/images/svgs/profile-avatar.svg'}
                            loading="lazy"
                            alt={"User avatar"}
                            width={45}
                            height={45}
                        />
                    </div>
                    <form action="" className="w-full">
                        <FormInput
                            className="rounded-full shadow-lg"
                            placeholder="Enter Tracking ID"
                        />
                    </form>
                </div>
            </div>
            <div id="ii-map" className="absolute w-screen h-screen top-0 left-0">

                <BottomSheet 
                    open 
                    snapPoints={()=> 200}
                    blocking={false}
                >
                    <div className="p-4 text-black">
                        <p className="text-xl">
                            Hello <span className="font-semibold">{user?.rider?.fullName}</span>
                        </p>
                        <div className="mt-4">
                            <p className="text-sm">
                                You do not have a delivery request right now
                            </p>
                        </div>
                    </div>
                </BottomSheet>
            </div>
        </div>
    )
}