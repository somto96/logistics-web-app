"use client"

import React from "react";
import { useDebounce } from "./useDebounce";


export default function usePredictions(
  searchTerm: string, 
  shouldFetch: boolean = false, 
  types?: string[]
) {

    // Ref
    const autocomplete = React.useRef<google.maps.places.AutocompleteService>();

    const [predictions, setPredictions] = React.useState<google.maps.places.AutocompletePrediction[]>([]);

    React.useEffect(()=>{
        if (!shouldFetch) {
            setPredictions([]);
        }
    }, [shouldFetch])

    React.useEffect(()=>{
        if (typeof window !== undefined){
            if (!autocomplete.current) {
                autocomplete.current = new google.maps.places.AutocompleteService();
            }
        }
    },[])
     
      function getPlacePredictions(input: string) {
       
        autocomplete.current?.getPlacePredictions(
          { input, componentRestrictions: { country: "ng" }, types },
          data => {
            if (data) {
                setPredictions(data)
            }
          }
        );
      }
    

    const handleSearchChange = async ()=>{
        if (searchTerm.trim() === '') return
        if (!shouldFetch) return

        getPlacePredictions(searchTerm)
    }

    useDebounce(handleSearchChange, 400, [searchTerm]);

    return predictions;
    
}